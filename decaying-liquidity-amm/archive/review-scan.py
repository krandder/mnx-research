import math, sys
sys.path.insert(0, '/tmp/pump-sim')
from importlib import import_module
m = import_module('review-settled-pump'.replace('-', '_')) if False else None
exec(open('/tmp/pump-sim/review-settled-pump.py').read().split('if __name__')[0])

R = Rule(a=1, b=10, L=2, s=0.5, tau=1)
print("== pump rate vs slice/wait, P0=20, Y=40, half-spread 5 bp charged per unit ==")
for slice_, wait_, pin in [(0.4, 6, 0.005), (1.0, 6, 0.005), (2.0, 6, 0.01), (2.0, 3, 0.01), (4.0, 3, 0.02), (5.0, 2, 0.02), (10.0, 2, 0.05)]:
    b, seed = pump(R, 20, 40, slice_, wait_, pin, verbose=False)
    print(f"slice={slice_:4} wait={wait_}tau pin={pin}: profit={-b.cash:9.2f} vol={b.vol:6.1f} t={b.t:7.1f}tau net@5bp={-b.cash-5*b.vol:9.2f} per-tau={(-b.cash-5*b.vol)/b.t:7.3f}")

print("== profit vs P0 (Y=2*P0, slice 0.4, wait 6) ==")
for P0 in [5, 10, 20, 40]:
    b, seed = pump(R, P0, 2 * P0, 0.4, 6, 0.005, verbose=False)
    print(f"P0={P0}: profit={-b.cash:9.2f} vol={b.vol:6.1f} net@5bp={-b.cash-5*b.vol:9.2f} maxpos={b.maxpos}")

print("== G on fiber P=P0 is unbounded below: G(P0, P0/2, F) = P0*F + const ==")
for F in [0, 50, 100, -100]:
    print(f"  G(20,10,F={F}) = {R.G(20,10,F):.3f}")

print("== restart with phi seeded 0 while P=8 (spec lens finding 1) ==")
b = Book(R, 8, 0.0, 0.0)
b.fill(4); b.wait(6); b.fill(-4)
print(f"  buy4/wait6/sell4 from (8,0,F): cost={b.cash:.3f}")
b = Book(R, 8, 4.0, 0.0)
b.fill(4); b.wait(6); b.fill(-4)
print(f"  same from settled (8,4,F): cost={b.cash:.3f}")

print("== misimplemented ladder: fill price uses s q + dT only (no A term), buy N units, wait, sell (attack lens C) ==")
def bad_cycle(q, hs):
    # ladder charges integral of F + s u + T(phi+u) over the fill but state F still updated per rule (34)
    b = Book(R)
    r = R
    cost_paid = b.F * q + r.s * q * q / 2 + r.V(q) - r.V(0)   # omits B and A(phi)q terms
    b.fill(q); b.wait(60)
    phi0 = b.phi; F = b.F
    cost_back = F * (-q) + r.s * q * q / 2 + r.V(phi0 - q) - r.V(phi0)
    return cost_paid + cost_back + hs * 2 * q
for q in [8.57, 15.1, 27.47]:
    print(f"  q={q}: trader cost at h=5: {bad_cycle(q,5):.2f}, at h=1: {bad_cycle(q,1):.2f}  (correct rule: {Book(R).fill(q) if False else ''}")
b = Book(R); b.fill(27.47); b.wait(60); b.fill(-27.47); print(f"  correct rule q=27.47 cost {b.cash:.2f}")

print("== patient slope: buy q=0.2 in 200 slices with long waits ==")
b = Book(R)
for _ in range(200):
    b.fill(0.001); b.wait(50)
print(f"  avg bp/unit = {b.cash/0.2:.3f}  vs s+2a={R.s+2*R.a}  vs s+1.5a={R.s+1.5*R.a}; fair moved {b.F:.4f} vs (s+a)q={(R.s+R.a)*0.2:.4f}")
