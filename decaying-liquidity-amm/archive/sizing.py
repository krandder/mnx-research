"""Sizing and shape study for the prediction-market curve (MNX-131).

Coordinates: binaries in log-odds x = logit(p); LABREV (a future) in log price.
Slow curve C(P): permanent skew (coordinate units) of a held position P.
  near-fair slope c0 = 1/(100*D0), D0 = units per 1% of the coordinate.
  shapes beyond the knee K: 'concave' slope c0*f (f<1, deepens with position, v3 2.6.5),
  'linear' slope c0, 'steep' slope c0*g (g>1, liquidity floor D0/g).
Fast curve T(phi): today's two-channel model scaled with D0: a dead band of Phi_b units
  (the center band), then slope 1/(100*Dflow) with Dflow = D0/4; phi decays with tau = 5h.
Price for the next unit bought from the MM: coord = xF + C(P) + T(phi) + h.
Losses are to the MM, marked at the true post-news value p1 (expected-loss view) or at
resolution against the MM (worst-case view).
"""
import math, json, sys
import numpy as np

sig = lambda x: 1/(1+math.exp(-x))
logit = lambda p: math.log(p/(1-p))

def slow_slope(C, c0, K, shape, f, g):
    if abs(C) < K: return c0
    return c0*(f if shape == 'concave' else g if shape == 'steep' else 1.0)

class Book:
    def __init__(s, kind, p0, D0, shape, K=0.2, f=0.25, g=4.0, h=0.005, cap=1e18, band=0.2):
        s.kind, s.p0, s.D0, s.shape, s.K, s.f, s.g, s.h, s.cap = kind, p0, D0, shape, K, f, g, h, cap
        s.c0 = 1/(100*D0); s.Dflow = D0/4; s.Phib = band*100*D0
        s.x0 = logit(p0) if kind == 'binary' else math.log(p0)
    def val(s, x): return sig(x) if s.kind == 'binary' else math.exp(x)
    def C_of(s, P, dP=None):
        # integrate slow curve from 0 to P
        n = 400; C = 0.0; step = P/n
        for _ in range(n): C += slow_slope(C, s.c0, s.K, s.shape, s.f, s.g)*step
        return C
    def T_of(s, phi):
        a = abs(phi)
        return math.copysign(max(0.0, a-s.Phib)/(100*s.Dflow), phi) if phi else 0.0

def walk_paced(b, x_target, direction=1, stepfrac=1/2000):
    """Paced informed: phi ~ 0 on every slice; buys (direction +1) until the MM price reaches target or cap."""
    P = 0.0; C = 0.0; paid = 0.0; units = 0.0
    step = max(1.0, b.D0*100*abs(x_target-b.x0)*stepfrac)
    while units < b.cap:
        x = b.x0 + C + direction*b.h
        if (x - x_target)*direction >= 0: break
        q = min(step, b.cap-units)
        paid += b.val(b.x0 + C + direction*(b.h)) * q if direction > 0 else b.val(b.x0 + C - b.h)*q
        C += direction*slow_slope(C, b.c0, b.K, b.shape, b.f, b.g)*q
        units += q
    return units, paid, C

def mm_loss_paced(b, p1, direction):
    xt = logit(p1) if b.kind == 'binary' else math.log(p1)
    units, paid, C = walk_paced(b, xt, direction)
    v1 = p1
    loss = (v1*units - paid) if direction > 0 else (paid - v1*units)
    return loss, units, b.val(b.x0 + C)

def mm_loss_fast(b, p1, direction, hours=72, follows=False):
    """News jump: arbs sweep the instant curve to p1 at once; if the fair does not follow,
    they refill each hour as phi decays, for `hours`; if the fair follows (Polymarket), no refill."""
    xt = logit(p1) if b.kind == 'binary' else math.log(p1)
    P = 0.0; phi = 0.0; C = 0.0; paid = 0.0
    step = max(1.0, b.D0*100*abs(xt-b.x0)/3000)
    def sweep():
        nonlocal P, phi, C, paid
        while P < b.cap:
            x = b.x0 + C + b.T_of(phi) + direction*b.h
            if (x - xt)*direction >= 0: break
            q = min(step, b.cap-P)
            paid += b.val(x)*q
            C += direction*slow_slope(C, b.c0, b.K, b.shape, b.f, b.g)*q
            phi += direction*q; P += q
    sweep()
    if not follows:
        for _ in range(hours):
            phi *= math.exp(-1/5); sweep()
    v1 = p1
    loss = (v1*P - paid) if direction > 0 else (paid - v1*P)
    return loss, P

def worst_resolution(b, direction):
    """Paced walk toward the far edge (0.99 / 0.01) or the cap, then resolution against the MM."""
    edge = 0.99 if direction > 0 else 0.01
    xt = logit(edge)
    units, paid, C = walk_paced(b, xt, direction)
    loss = (1.0*units - paid) if direction > 0 else (paid - 0.0*units)
    return loss, units

MARKETS = {  # symbol: (kind, p0, fair source follows?, note)
    'ANTHTOP26': ('binary', 0.62, False, 'fixed fair 0.6529 (stale risk)'),
    'RSENATE26': ('binary', 0.345, True, 'follows Polymarket, 3c/min slew'),
    'TAKEOFF':   ('binary', 0.28, False, 'mark-EMA on own book'),
    'PNP27':     ('binary', 0.03, False, 'not yet listed; assumed fair 0.03'),
    'LABREV':    ('future', 196.5, False, 'mark-EMA on own book; jumps in % of price'),
}
JUMPS_BIN = [0.10, 0.20, 0.50]
JUMPS_FUT = [0.10, 0.20, 0.50]
COUNTS = {0.10: 4, 0.20: 1, 0.50: 0.2}   # events over the budget horizon (assumption)

def event_losses(sym, D0, shape, cap, K=0.2):
    kind, p0, follows, _ = MARKETS[sym]
    b = Book(kind, p0, D0, shape, K=K, cap=cap)
    out = {}
    for j in (JUMPS_BIN if kind == 'binary' else JUMPS_FUT):
        per = []
        for d in (+1, -1):
            if kind == 'binary':
                p1 = min(0.99, p0 + j) if d > 0 else max(0.01, p0 - j)
                if abs(p1-p0) < 1e-9: continue
            else:
                p1 = p0*(1+j) if d > 0 else p0*(1-j)
            lp = mm_loss_paced(b, p1, d)[0] if not follows else 0.0
            lf = mm_loss_fast(b, p1, d, follows=follows)[0]
            per.append(max(lp, lf))
        out[j] = sum(per)/len(per) if per else 0.0
    exp = sum(COUNTS[j]*out[j] for j in out)
    if kind == 'binary':
        worst = max(worst_resolution(b, +1)[0], worst_resolution(b, -1)[0]) if not follows else \
                max(mm_loss_fast(b, 0.95, +1, follows=True)[0], mm_loss_fast(b, 0.05, -1, follows=True)[0])
    else:
        worst = max(mm_loss_paced(b, p0*1.5, +1)[0], mm_loss_paced(b, p0*0.5, -1)[0])
    return out, exp, worst

def near_fair_usd_per_cent(sym, D0):
    kind, p0, _, _ = MARKETS[sym]
    if kind == 'binary':
        units_per_cent = D0/(p0*(1-p0))   # 1c = 1/(p(1-p)) % of log-odds
        return units_per_cent*p0
    return D0*p0   # future: $ per 1% of price

def solve(sym, shape, K=0.2, target_exp=2500, target_worst=15000):
    # cap from worst case at a trial depth, then depth from the expected loss; iterate.
    lo, hi = 1.0, 20000.0
    cap = 1e18
    for _ in range(3):
        a, bnd = lo, hi
        for _ in range(40):
            mid = math.sqrt(a*bnd)
            e = event_losses(sym, mid, shape, cap, K)[1]
            if e > target_exp: bnd = mid
            else: a = mid
        D0 = a
        # cap: largest with worst <= target
        c_lo, c_hi = 10.0, 5e6
        for _ in range(40):
            cm = math.sqrt(c_lo*c_hi)
            w = event_losses(sym, D0, shape, cm, K)[2]
            if w > target_worst: c_hi = cm
            else: c_lo = cm
        cap = c_lo
    out, e, w = event_losses(sym, D0, shape, cap, K)
    return dict(D0=D0, cap=cap, exp=e, worst=w, per_event=out, usd_per_cent=near_fair_usd_per_cent(sym, D0))

if __name__ == '__main__':
    res = {}
    for sym in MARKETS:
        for shape in ('concave', 'linear', 'steep'):
            r = solve(sym, shape)
            res[f'{sym}/{shape}'] = r
            print(f"{sym:10s} {shape:8s} D0={r['D0']:8.1f} units/1%  cap={r['cap']:10.0f}  near-fair ${r['usd_per_cent']:7.0f}/{'1c' if MARKETS[sym][0]=='binary' else '1%'}  exp={r['exp']:7.0f}  worst={r['worst']:7.0f}  per-event " + ' '.join(f"{k:.2f}:{v:.0f}" for k, v in r['per_event'].items()), flush=True)
    json.dump(res, open('/tmp/pump-sim/sizing-results.json', 'w'), indent=1)
