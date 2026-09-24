#!/usr/bin/env python3
"""Independent MNX-131 calculation: exact piecewise integrals, stdlib only.

Run: python3 Z-sizing.py
Writes Z-sizing-results.json and prints the report's numerical tables.
q is trader inventory (minus MM inventory), u=q/(100*D0).
LABREV uses relative PRICE, as in the local MM code, not log price.
"""
import json
import math
from pathlib import Path

H = 0.005
BAND = 0.2                 # Flow-coordinate band: |u_flow| <= .05.
TAU = 300.0                # Minutes; five-hour e-fold.
COUNTS = (4.0, 1.0, 0.2)
JUMPS = (0.1, 0.2, 0.5)
MARKETS = {
    "ANTHTOP26": dict(p=.62, fair=.6529, D=142., cap=74000., binary=True),
    "RSENATE26": dict(p=.345, fair=.345, D=141., cap=74000., binary=True),
    "TAKEOFF": dict(p=.28, fair=.28, D=165., cap=91400., binary=True),
    "PNP27": dict(p=.03, fair=.03, D=165., cap=91400., binary=True),
    "LABREV": dict(p=196.5, fair=196.5, D=2.5, cap=195., binary=False),
}
SHAPES = [(name, k, r) for name, k, r in (
    ("C25", .2, .25), ("L", .2, 1.), ("S4", .2, 4.),
    ("C25 K50", .5, .25), ("S4 K50", .5, 4.),
    ("C50", .2, .5), ("S2", .2, 2.),
    ("C50 K50", .5, .5), ("S2 K50", .5, 2.))]


def logit(p):
    if p <= 0: return -math.inf
    if p >= 1: return math.inf
    return math.log(p / (1-p))


def sigmoid(x):
    if x >= 0: return 1 / (1 + math.exp(-x))
    e = math.exp(x)
    return e / (1 + e)


def softplus(x):
    return max(x, 0) + math.log1p(math.exp(-abs(x)))


def c(u, k, r):
    return math.copysign(min(abs(u), k) + r*max(abs(u)-k, 0), u)


def cinv(z, k, r):
    return min(z, k) + max(z-k, 0)/r


def t(phi):
    return math.copysign(max(4*abs(phi)-BAND, 0), phi)


def price(m, u, k, r, offset=0., flow=False, fair=None, h=H):
    f = m['fair'] if fair is None else fair
    z = c(u, k, r) + (t(u+offset) if flow else 0) + h
    return sigmoid(logit(f)+z) if m['binary'] else f*(1+z)


def integral(m, lo, hi, k, r, offset=0., flow=False, fair=None, h=H):
    """Integral of execution price du, exact on each affine-coordinate piece."""
    if lo == hi: return 0.
    if hi < lo:
        return -integral(m, hi, lo, k, r, offset, flow, fair, h)
    f = m['fair'] if fair is None else fair
    knots = [-k, 0., k]
    if flow: knots += [-offset-.05, -offset+.05]
    cuts = [lo] + sorted(set(x for x in knots if lo < x < hi)) + [hi]
    total = 0.
    for a, b in zip(cuts, cuts[1:]):
        za = c(a,k,r) + (t(a+offset) if flow else 0) + h
        zb = c(b,k,r) + (t(b+offset) if flow else 0) + h
        if m['binary']:
            xa, xb = logit(f)+za, logit(f)+zb
            total += (softplus(xb)-softplus(xa))*(b-a)/(xb-xa)
        else:
            total += f*(1+(za+zb)/2)*(b-a)
    return total


def endpoint(m, v, d, a, k, r, flow=False, u0=0., phi0=0., fair=None):
    f = m['fair'] if fair is None else fair
    gap = d*(logit(v)-logit(f)) if m['binary'] else d*(v/f-1)
    target = gap-H
    if target <= c(u0,k,r) + (t(phi0) if flow else 0): return u0
    lo, hi = u0, a
    for _ in range(60):
        mid = (lo+hi)/2
        impact = c(mid,k,r) + (t(phi0+mid-u0) if flow else 0)
        if impact < target: lo = mid
        else: hi = mid
    return (lo+hi)/2


def event(m, v, d, a, k, r, mode='paced', hours=72, step_minutes=60):
    """Loss and quantity per b=100*D0; refills sweep hourly by default."""
    flow = mode != 'paced'
    u = endpoint(m,v,d,a,k,r,flow)
    paid = integral(m,0,d*u,k,r,flow=flow,h=d*H)
    # Signed cash paid to MM; d*u is signed trader inventory.
    phi = u
    if mode == 'refill':
        for _ in range(round(hours*60/step_minutes)):
            phi *= math.exp(-step_minutes/TAU)
            nxt = endpoint(m,v,d,a,k,r,True,u,phi)
            paid += integral(m,d*u,d*nxt,k,r,d*(phi-u),True,h=d*H)
            phi += nxt-u
            u = nxt
    loss = v*d*u-paid
    return dict(loss=max(0.,loss), units=u, cash=paid, impact=c(u,k,r))


def target(m,j,d):
    return max(0.,min(1.,m['p']+d*j)) if m['binary'] else m['p']*(1+d*j)


def events(m,a,k,r,mode='paced'):
    return [event(m,target(m,j,d),d,a,k,r,mode) for j in JUMPS for d in (1,-1)]


def expectation(es, multiplier=1.):
    return multiplier*sum(n*(es[2*i]['loss']+es[2*i+1]['loss'])/2
                          for i,n in enumerate(COUNTS))


def worst(m,a,k,r,edge=False):
    if not m['binary']:
        # Explicit STRESS only; no finite worst on an unbounded future.
        return [event(m,m['p']*(1+d*.5),d,a,k,r)['loss'] for d in (1,-1)]
    out=[]
    for d in (1,-1):
        u = endpoint(m,.99 if d>0 else .01,d,a,k,r) if edge else a
        cash=integral(m,0,d*u,k,r,h=d*H)
        out.append((1. if d>0 else 0.)*d*u-cash)
    return out


def range_cap(m,k,r):
    """No larger than quantity needed to reach the more distant 1%/99% edge.
    Future: only the explicitly requested +/-50% stress coverage.
    """
    z=max(logit(.99)-logit(m['fair']),logit(m['fair'])-logit(.01)) if m['binary'] else .5
    return cinv(z-H,k,r)


def size(m,k,r,multiplier=1.,terminal_guard=False):
    """Choose greatest coordinate coverage, then size the depth to E=$2500.
    If full edge coverage exceeds W=$15000, truncate range where both bind.
    No arbitrary solver ceiling, no integer trade-step artifacts.
    """
    a=range_cap(m,k,r)
    def ew(a):
        news=expectation(events(m,a,k,r),multiplier)
        ws=worst(m,a,k,r)
        terminal=m['p']*ws[0]+(1-m['p'])*ws[1] if m['binary'] else 0.
        return max(news,terminal) if terminal_guard else news, max(ws)
    e,w=ew(a)
    if w/e>6:
        lo,hi=1e-8,a
        for _ in range(65):
            mid=(lo+hi)/2
            em,wm=ew(mid)
            if wm/em>6: hi=mid
            else: lo=mid
        a=(lo+hi)/2
        e,w=ew(a)
    b=7500/e
    ws=worst(m,a,k,r)
    return dict(D=b/100,cap=b*a,a=a,E=b*e,W=b*w,
                E_news=b*expectation(events(m,a,k,r),multiplier),
                E_terminal=b*(m['p']*ws[0]+(1-m['p'])*ws[1]) if m['binary'] else None,
                edge_worst=[b*x for x in worst(m,a,k,r,True)],
                worst_directions=[b*x for x in worst(m,a,k,r)],
                liquidity=b/100/(1-m['fair']) if m['binary'] else b/100*m['fair'],
                events=[b*x['loss'] for x in events(m,a,k,r)])


def rs_snapshot(m,v,d,D,cap):
    """40 price-grid levels, stride 1, no unknown order/margin size limits.
    Local ladder sizes from the opposite spread boundary; not a live replay.
    """
    x=logit(m['fair']); grid=.005; b=100*D
    best=sigmoid(x+d*H)
    first=(math.ceil(best/grid-1e-10) if d>0 else math.floor(best/grid+1e-10))*grid
    quantity=loss=0.
    for i in range(40):
        p=first+d*i*grid
        if not 0<p<1 or d*(p-v)>1e-10: break
        distance=d*(logit(p)-(x-d*H))
        q=b*(distance if distance<=.05 else (distance+.2)/5)
        q=min(cap,q)
        loss+=d*(v-p)*max(0.,q-quantity)
        quantity=q
    return dict(loss=loss,units=quantity)


def rs_roundtrip(m,v,d,D,cap,k=.2,r=1.):
    """Feasible buy/hold/sell (or mirror), with a known deterministic fair ramp.
    Optimize this TWO-TRADE family only, not all possible dynamic controls.
    Exit at ramp completion; return P to 0 and let residual flow decay.
    """
    b=100*D
    duration=abs(v-m['fair'])/.03
    decay=math.exp(-duration/TAU)
    def profit(u):
        entry=integral(m,0,d*u,k,r,flow=True,h=d*H)
        # Endpoint rows use the pre-resolution limit; an actual halt can
        # remove the exit opportunity, so these are hypothetical ramps.
        exit_fair=max(1e-12,min(1-1e-12,v))
        exit_cash=integral(m,0,d*u,k,r,offset=-d*u*(1-decay),flow=True,fair=exit_fair,h=-d*H)
        return b*(exit_cash-entry)
    # ponytail: coarse global scan plus golden search; this is one scalar,
    # and the output is a feasible attack lower bound, not an optimal-control proof.
    a=cap/b
    grid=[a*i/200 for i in range(201)]
    ix=max(range(len(grid)),key=lambda i:profit(grid[i]))
    lo,hi=grid[max(0,ix-1)],grid[min(200,ix+1)]
    for _ in range(65):
        x=lo+(hi-lo)*.38196601125
        y=lo+(hi-lo)*.61803398875
        if profit(x)<profit(y): lo=x
        else: hi=y
    u=(lo+hi)/2
    return dict(loss=profit(u),units=b*u,minutes=duration)


def ema_cycle(m,days=7.,k=.2,r=1.):
    """Own mark is the model's quote midpoint, fair is PRICE EMA, tau=7d.
    q=.05*b stays in the flow dead band on entry and exit.
    """
    u=.05
    f=m['fair']
    def derivative(f):
        mark=sigmoid(logit(f)+c(u,k,r)) if m['binary'] else f*(1+c(u,k,r))
        return (mark-f)/7
    n=2000
    dt=days/n
    for _ in range(n):
        a=derivative(f); b=derivative(f+a*dt/2)
        cc=derivative(f+b*dt/2); dd=derivative(f+cc*dt)
        f+=dt*(a+2*b+2*cc+dd)/6
    initial=integral(m,0,u,k,r,h=H)
    final=integral(m,0,u,k,r,fair=f,h=-H)
    return dict(fair_after=f,units=100*m['D']*u,profit=100*m['D']*(final-initial))


def check():
    m=MARKETS['RSENATE26']
    v=.545
    e=event(m,v,1,20,.2,1.)['loss']
    p=sigmoid(logit(m['fair'])+H)
    kl=v*math.log(v/p)+(1-v)*math.log((1-v)/(1-p))
    assert abs(e-kl)<1e-12
    assert abs(t(.05))<1e-15 and abs(t(.10)-.2)<1e-15
    # Independent midpoint quadrature, crossing BOTH knees, both directions.
    for binary in (True,False):
        mm=m if binary else MARKETS['LABREV']
        for d in (1,-1):
            n=40000; end=d*.7
            quad=sum(price(mm,end*(i+.5)/n,.2,.25,flow=True,h=d*H)
                     for i in range(n))*end/n
            exact=integral(mm,0,end,.2,.25,flow=True,h=d*H)
            assert abs(quad-exact)<2e-7
    # Signed cash, no artificial minimum one-unit trades; linear-price symmetry.
    lm=MARKETS['LABREV']
    assert abs(event(lm,1.1*lm['p'],1,1,.2,1)['loss']-
               lm['p']*.095**2/2)<1e-10
    for mm in MARKETS.values():
        for _,k,r in SHAPES:
            a=mm['cap']/(100*mm['D'])
            paced=events(mm,a,k,r)
            fast=events(mm,a,k,r,'sweep')
            ref=events(mm,a,k,r,'refill')
            assert all(x['loss']+1e-9>=z['loss']>=y['loss']-1e-9
                       for x,y,z in zip(paced,fast,ref))
            sz=size(mm,k,r)
            assert abs(sz['E']-2500)<1e-6 and sz['W']<=15000.000001
            guarded=size(mm,k,r,terminal_guard=True)
            assert guarded['E_news']<=2500.000001 and guarded['W']<=15000.000001
            if mm['binary']: assert guarded['E_terminal']<=2500.000001


def main():
    check()
    data={'assumptions':dict(half_spread=H,flow_band=BAND,flow_tau_minutes=TAU,
                            event_counts=COUNTS,clipping='true binaries to [0,1]',
                            LABREV='relative price; W denotes +/-50% stress only'),
          'markets':{},'rs_follow':[],'ema':{}}
    for sym,m in MARKETS.items():
        data['markets'][sym]={}
        for name,k,r in SHAPES:
            b=100*m['D']; a=m['cap']/b
            row=dict(knee=k,far_factor=r,
                     paced=[b*x['loss'] for x in events(m,a,k,r)],
                     sweep=[b*x['loss'] for x in events(m,a,k,r,'sweep')],
                     refill=[b*x['loss'] for x in events(m,a,k,r,'refill')],
                     event_units=[b*x['units'] for x in events(m,a,k,r)],
                     edge_worst=[b*x for x in worst(m,a,k,r,True)],
                     cap_worst=[b*x for x in worst(m,a,k,r)],
                     E=b*expectation(events(m,a,k,r)),
                     size=size(m,k,r),
                     guarded=size(m,k,r,terminal_guard=True),
                     guarded_half=size(m,k,r,.5,True),
                     guarded_double=size(m,k,r,2,True),
                     half_frequency=size(m,k,r,.5),
                     double_frequency=size(m,k,r,2))
            data['markets'][sym][name]=row
    m=MARKETS['RSENATE26']
    for v in (.395,.295,.445,.245,.545,.145,.845,0.,.01,.95,.05):
        d=1 if v>m['fair'] else -1
        row=dict(target=v,direction=d,minutes=abs(v-m['fair'])/.03,scales=[])
        for factor,cap in ((1,74000.),(5,369000.),(10,738000.)):
            D=m['D']*factor; b=100*D; a=cap/b
            e=event(m,v,d,a,.2,1.,'sweep')
            slow=event(m,v,d,a,.2,1.)
            # A 30-second complete-source stall: continuous marginal refill
            # earns zero; the hourly-style one-shot refill earns a tiny amount.
            phi=e['units']*math.exp(-.5/TAU)
            nxt=endpoint(m,v,d,a,.2,1.,True,e['units'],phi)
            cash=integral(m,d*e['units'],d*nxt,.2,1.,d*(phi-e['units']),True,h=d*H)
            delay_loss=b*(v*d*(nxt-e['units'])-cash)
            roundtrip=rs_roundtrip(m,v,d,D,cap)
            row['scales'].append(dict(factor=factor,D=D,cap=cap,loss=b*e['loss'],
                    units=b*e['units'],slow=b*slow['loss'],
                    all_strategy_bound=b*math.log(v/m['fair'] if d>0 else (1-v)/(1-m['fair'])),
                    resolution_loss=b*(e['loss']+((1-v) if d>0 else v)*e['units']),
                    stall30s_extra=delay_loss,roundtrip=roundtrip))
            row['scales'][-1]['snapshot']=rs_snapshot(m,v,d,D,cap)
            assert roundtrip['loss'] <= row['scales'][-1]['all_strategy_bound'] + 1e-7
        data['rs_follow'].append(row)
    for sym in ('TAKEOFF','PNP27','LABREV'):
        data['ema'][sym]=ema_cycle(MARKETS[sym])
    aligned=dict(MARKETS['ANTHTOP26'],fair=.62)
    data['anth_aligned']={name:size(aligned,k,r) for name,k,r in SHAPES[:3]}
    data['anth_existing_mismatch']={name:100*142*event(MARKETS['ANTHTOP26'],.62,-1,74000/14200,k,r)['loss'] for name,k,r in SHAPES[:3]}
    Path('Z-sizing-results.json').write_text(json.dumps(data,indent=2)+'\n')

    def fmt(x): return f'{x:,.0f}'
    def pair(xs): return ' / '.join(fmt(x) for x in xs)
    def table(headers,rows):
        print('| '+' | '.join(headers)+' |')
        print('| '+' | '.join(['---']*len(headers))+' |')
        for row in rows: print('| '+' | '.join(map(str,row))+' |')
        print()
    print('### Guarded sizes: news reserve AND expected terminal loss at most $2,500\n')
    table(['Market','Shape','D0','Cap units','Near $/1c','E news $','E terminal $','W cap $'],[
        [s,n,f"{v['guarded']['D']:.3f}",fmt(v['guarded']['cap']),fmt(v['guarded']['liquidity']),
         fmt(v['guarded']['E_news']),fmt(v['guarded']['E_terminal']),fmt(v['guarded']['W'])]
        for s,ss in data['markets'].items() if s!='LABREV' for n,v in ss.items()])
    print('### Guarded sizes: paced event losses at the proposed D0 and cap\n')
    table(['Market','Shape','+10','−10','+20','−20','+50','−50'],[
        [s,n]+[fmt(x) for x in v['guarded']['events']]
        for s,ss in data['markets'].items() if s!='LABREV' for n,v in ss.items()])
    print('### Guarded sizes: event-frequency sensitivity\n')
    table(['Market','Shape','Half counts: D0 / cap','Base: D0 / cap','Double: D0 / cap'],[
        [s,n]+[f"{v[key]['D']:.3f} / {v[key]['cap']:,.0f}" for key in ('guarded_half','guarded','guarded_double')]
        for s,ss in data['markets'].items() if s!='LABREV' for n,v in ss.items()])
    print('### Candidate size table: fixed-fair envelope\n')
    print('LABREV rows are conditional ±50% stress sizes; their true worst case is unbounded.\n')
    table(['Market','Shape','D0','Cap units','Near $/1c or 1%','E $','W cap + / − $'],[
        [s,n,f"{v['size']['D']:.3f}",fmt(v['size']['cap']),fmt(v['size']['liquidity']),
         fmt(v['size']['E']),pair(v['size']['worst_directions'])]
        for s,ss in data['markets'].items() for n,v in ss.items()])
    print('### At supplied depth and cap: event losses\n')
    print('Each cell is paced / initial sweep / sweep plus 72 hourly refills, in dollars.\n')
    table(['Market','Shape','+10','−10','+20','−20','+50','−50'],[
        [s,n]+[pair([v['paced'][i],v['sweep'][i],v['refill'][i]]) for i in range(6)]
        for s,ss in data['markets'].items() for n,v in ss.items()])
    print('### At supplied depth and cap: expected loss and resolution risk\n')
    print('LABREV entries in both risk columns are ±50% stresses, not resolution bounds.\n')
    table(['Market','Shape','E $','Walk to 1%/99%: + / − $','All the way to cap: + / − $'],[
        [s,n,fmt(v['E']),pair(v['edge_worst']),pair(v['cap_worst'])]
        for s,ss in data['markets'].items() for n,v in ss.items()])
    print('### At candidate size: paced event losses\n')
    table(['Market','Shape','+10','−10','+20','−20','+50','−50'],[
        [s,n]+[fmt(x) for x in v['size']['events']]
        for s,ss in data['markets'].items() for n,v in ss.items()])
    print('### Event-frequency sensitivity, re-solving BOTH limits\n')
    table(['Market','Shape','Half counts: D0 / cap','Base: D0 / cap','Double: D0 / cap'],[
        [s,n]+[f"{v[key]['D']:.3f} / {v[key]['cap']:,.0f}" for key in ('half_frequency','size','double_frequency')]
        for s,ss in data['markets'].items() for n,v in ss.items()])
    print('### RSENATE26: one initial sweep during a supported, continuous fair ramp\n')
    table(['True target','Catch-up min','Loss at 1x / 5x / 10x $','Filled units at 1x','1x marked at adverse resolution $'],[
        [f"{v['target']:.3f}",f"{v['minutes']:.2f}",pair([s['loss'] for s in v['scales']]),
         fmt(v['scales'][0]['units']),fmt(v['scales'][0]['resolution_loss'])] for v in data['rs_follow']])
    print('### RSENATE26: feasible informed hold-through-slew round trip\n')
    table(['Target','Profit/MM loss at 1x / 5x / 10x $','Optimal entry units within this two-trade family at 1x'],[
        [f"{v['target']:.3f}",pair([s['roundtrip']['loss'] for s in v['scales']]),fmt(v['scales'][0]['roundtrip']['units'])]
        for v in data['rs_follow']])
    print('### RSENATE26: conservative bound for ALL strategies during one monotone fair ramp\n')
    table(['Target','All-strategy bound at 1x / 5x / 10x $'],[
        [f"{v['target']:.3f}",pair([s['all_strategy_bound'] for s in v['scales']])]
        for v in data['rs_follow']])
    print('### RSENATE26: one 40-level ladder snapshot, before any replacement\n')
    table(['True target','Snapshot loss at 1x / 5x / 10x $','Filled units at 1x'],[
        [f"{v['target']:.3f}",pair([s['snapshot']['loss'] for s in v['scales']]),fmt(v['scales'][0]['snapshot']['units'])]
        for v in data['rs_follow']])
    print('### Own-mark EMA: seven-day, flow-band-sized round trip\n')
    table(['Market','Entry units','Fair after 7d','Round-trip profit / MM loss $'],[
        [s,f"{v['units']:,.2f}",f"{v['fair_after']:.6f}",f"{v['profit']:.2f}"] for s,v in data['ema'].items()])


if __name__ == '__main__':
    main()
