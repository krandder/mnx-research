import math, sys

class Rule:
    def __init__(s_, a, b, L, s, tau):
        s_.a, s_.b, s_.L, s_.s, s_.tau = a, b, L, s, tau
        s_.d = b - a
    def T(s_, x):
        r = abs(x) / s_.L
        return math.copysign(s_.b * abs(x) - s_.d * s_.L * math.log1p(r), x)
    def V(s_, x):
        r = abs(x) / s_.L
        return s_.b * x * x / 2 - s_.d * s_.L * ((abs(x) + s_.L) * math.log1p(r) - abs(x))
    def h(s_, x):
        r = abs(x) / s_.L
        if r < 1e-6:
            return s_.a + s_.d * (r / 3 - r * r / 5 + r ** 3 / 7)
        sr = math.sqrt(r)
        return s_.b - s_.d * math.atan(sr) / sr
    def A(s_, x):
        return 2 * x * s_.h(x) - s_.T(x)
    def B(s_, x):
        return (2 * x * s_.A(x) - s_.V(x)) / 3
    def G(s_, P, phi, F):
        return P * F - s_.s * P * P / 2 + s_.V(phi) + s_.B(phi) - P * s_.A(phi)

class Book:
    def __init__(self, rule, P=0.0, phi=0.0, F=0.0):
        self.r = rule; self.P = P; self.phi = phi; self.F = F
        self.cash = 0.0; self.D = 0.0; self.t = 0.0; self.fills = 0; self.waits = 0; self.vol = 0.0
        self.maxpos = 0.0; self.pos = 0.0
    def price(self):
        return self.F + self.r.T(self.phi)
    def fill(self, q):
        r = self.r
        phi0, phi1 = self.phi, self.phi + q
        cost = self.F * q + r.s * q * q / 2 + r.V(phi1) - r.V(phi0) + r.B(phi1) - r.B(phi0) - r.A(phi0) * q
        self.F += r.s * q + r.A(phi1) - r.A(phi0)
        self.phi = phi1; self.P += q
        self.cash += cost; self.fills += 1; self.vol += abs(q)
        self.pos += q; self.maxpos = max(self.maxpos, abs(self.pos))
        return cost
    def wait(self, t):
        g0 = self.r.G(self.P, self.phi, self.F)
        self.phi = self.P / 2 + (self.phi - self.P / 2) * math.exp(-t / self.r.tau)
        g1 = self.r.G(self.P, self.phi, self.F)
        self.D += g0 - g1; self.t += t; self.waits += 1

def pump(rule, P0, Y, slice_, wait_, pin_wait, verbose=True):
    # settled book after an earlier customer bought P0 from rest
    seed = Book(rule)
    seed.fill(P0); seed.wait(200 * rule.tau)
    b = Book(rule, seed.P, seed.phi, seed.F)
    G0 = rule.G(b.P, b.phi, b.F)
    n1 = int(round((P0 + 2 * Y) / slice_))
    for _ in range(n1):
        b.fill(-slice_); b.wait(wait_)
    b.fill(Y)
    # pin phi near 0 while buying the rest back to P=0
    guard = 0
    while abs(b.P) > 0.01 and guard < 200000:
        b.wait(pin_wait); b.fill(-b.phi); guard += 1
    b.fill(-b.P)
    n4 = int(round(P0 / slice_))
    for _ in range(n4):
        b.fill(slice_); b.wait(wait_)
    b.wait(60 * rule.tau)
    G1 = rule.G(b.P, b.phi, b.F)
    resid = b.cash - (G1 - G0 + b.D)
    if verbose:
        print(f"P0={P0} Y={Y}: cost={b.cash:.4f} (profit {-b.cash:.4f}) dF={b.F-seed.F:.4f} D={b.D:.4f} "
              f"P,phi=({b.P:.4f},{b.phi:.4f}) fills={b.fills} waits={b.waits} t={b.t:.0f} vol={b.vol:.1f} maxpos={b.maxpos:.1f} resid={resid:.2e}")
    return b, seed

if __name__ == "__main__":
    R = Rule(a=1, b=10, L=2, s=0.5, tau=1)
    pump(R, 20, 6, 0.4, 6, 0.02)
    pump(R, 20, 40, 0.4, 6, 0.005)
    # control: same schedule from true rest
    pump(R, 0, 6, 0.4, 6, 0.02)
    # repeat cycles from the state the first cycle leaves
    seed = Book(R); seed.fill(20); seed.wait(200)
    b = Book(R, seed.P, seed.phi, seed.F)
    tot = 0
    for c in range(5):
        c0 = b.cash
        for _ in range(80):
            b.fill(-0.4); b.wait(6)
        b.fill(6)
        g = 0
        while abs(b.P) > 0.01 and g < 100000:
            b.wait(0.02); b.fill(-b.phi); g += 1
        b.fill(-b.P)
        for _ in range(50):
            b.fill(0.4); b.wait(6)
        b.wait(60)
        print(f"cycle {c+1}: cost {b.cash-c0:.4f}  F={b.F:.4f} P={b.P:.4f} phi={b.phi:.4f}")
    # doc's own family
    R2 = Rule(a=0.2, b=1.1, L=1.7, s=0.13, tau=1)
    pump(R2, 17, 68, 0.4, 6, 0.005)
    # today's rule comparison: fair fixed on waits, phi -> 0, storage s P^2/2 + V(phi), cost = s(P+q/2)q + dV ... F += s q
    class Today:
        def __init__(self, r, P, F):
            self.r = r; self.P = P; self.phi = 0.0; self.F = F; self.cash = 0
        def fill(self, q):
            r = self.r
            self.cash += self.F * q + r.s * q * q / 2 + r.V(self.phi + q) - r.V(self.phi)
            self.F += r.s * q; self.phi += q; self.P += q
        def wait(self, t):
            self.phi *= math.exp(-t / self.r.tau)
    t = Today(R, 20, 0)
    for _ in range(80):
        t.fill(-0.4); t.wait(6)
    t.fill(6)
    g = 0
    while abs(t.P) > 0.01 and g < 100000:
        t.wait(0.02); t.fill(-t.phi); g += 1
    t.fill(-t.P)
    for _ in range(50):
        t.fill(0.4); t.wait(6)
    print(f"today's rule, same fills/waits: cost {t.cash:.4f}")
