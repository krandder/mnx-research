"""Reproduce the numerical witnesses in N-manipulator.md (Python stdlib only)."""

import argparse
import math
import random
import statistics
from fractions import Fraction
from decimal import Decimal, localcontext


def additive(n=4, r=2, odds=Fraction(1, 100)):
    plus = minus = odds
    cost = 0
    for side in [1] * n + [-1] * n:
        if side == 1:
            plus *= r
        else:
            minus *= r
        cost += side * (plus - minus) / (1 + plus + minus)
    return -cost


def opportunity(n=12, probability=0.0001, activity=0.1, nu=0.1, mu=0.9):
    values = [-1.0, -1.0, 0.0, 0.0, 1.0, 1.0]
    coefficients = [nu, nu + mu] * 3
    weights = [p * a for p in (probability / 2, 1 - probability, probability / 2)
               for a in (1 - activity, activity)]
    cost = 0.0
    for side in [1] * n + [-1] * n:
        mean = sum(v * w for v, w in zip(values, weights))
        lo, hi = (mean, 1.0) if side == 1 else (-1.0, mean)
        for _ in range(70):
            price = (lo + hi) / 2
            residual = price - mean - side * sum(
                w * c * max(side * (v - price), 0) ** 2
                for v, w, c in zip(values, weights, coefficients))
            if residual > 0:
                hi = price
            else:
                lo = price
        price = (lo + hi) / 2
        raw = [w * (1 + c * max(side * (v - price), 0))
               for v, w, c in zip(values, weights, coefficients)]
        mass = sum(raw)
        weights = [w / mass for w in raw]
        assert abs(sum(v * w for v, w in zip(values, weights)) - price) < 1e-12
        cost += side * price
    return -cost


def opportunity_enclosure():
    """Outward-rounded interval certificate for the profit-sensitive example."""
    with localcontext() as ctx:
        ctx.prec = 60

        def point(value):
            d = Decimal(str(value))
            return d, d

        def add(a, b):
            return (a[0] + b[0]).next_minus(), (a[1] + b[1]).next_plus()

        def negate(a):
            return -a[1], -a[0]

        def mul(a, b):
            products = [x * y for x in a for y in b]
            return min(products).next_minus(), max(products).next_plus()

        def divide(a, b):
            assert b[0] > 0
            return mul(a, ((1 / b[1]).next_minus(), (1 / b[0]).next_plus()))

        def total(items):
            out = point(0)
            for item in items:
                out = add(out, item)
            return out

        def positive(a):
            return max(a[0], Decimal(0)), max(a[1], Decimal(0))

        values = [point(v) for v in (-1, -1, 0, 0, 1, 1)]
        coeffs = [point(c) for c in ('0.1', '1')] * 3
        weights = [point(w) for w in ('0.000045', '0.000005',
                   '0.89991', '0.09999', '0.000045', '0.000005')]
        cost = point(0)
        for side in [1] * 12 + [-1] * 12:
            sg = point(side)
            lo, hi = Decimal(-1), Decimal(1)
            for _ in range(170):
                mid = (lo + hi) / 2
                terms = []
                for v, w, c in zip(values, weights, coeffs):
                    edge = positive(mul(sg, add(v, negate(point(mid)))))
                    terms.append(mul(w, add(v, mul(sg, mul(c, mul(edge, edge))))))
                lower, upper = add(point(mid), negate(total(terms)))
                if lower > 0:
                    hi = mid
                elif upper < 0:
                    lo = mid
                else:
                    # f' >= 1: the zero lies in [mid-upper, mid-lower].
                    lo = max(lo, (mid - upper).next_minus())
                    hi = min(hi, (mid - lower).next_plus())
                    break
            price = lo, hi
            raw = []
            for v, w, c in zip(values, weights, coeffs):
                edge = positive(mul(sg, add(v, negate(price))))
                raw.append(mul(w, add(point(1), mul(c, edge))))
            mass = total(raw)
            weights = [divide(w, mass) for w in raw]
            cost = add(cost, mul(sg, price))
        return negate(cost)


class Tilt:
    """Three regimes; weights and unnormalized first moments of live value.

    ponytail: fixed +/-1 episode jumps suffice for these witnesses; no grid.
    Noise rate per side is one; r = exp(theta).
    """

    def __init__(self, alpha=0.02, delta=0.2, r=3.0, odds=None):
        self.alpha, self.delta, self.r = alpha, delta, r
        self.s = r + 1 / r - 2
        self.beta = delta + self.s
        discriminant = math.sqrt((alpha + self.beta) ** 2 - 4 * alpha * self.s)
        self.l0 = -2 * alpha * self.s / (alpha + self.beta + discriminant)
        self.l1 = -(alpha + self.beta + discriminant) / 2
        self.odds = alpha / (2 * (self.beta + self.l0)) if odds is None else odds

    def initial(self):
        o = self.odds
        return (1.0, o, o, 0.0, o, -o)

    def pair(self, x, y, dt):
        derivative = -self.alpha * x + self.delta * y
        c0 = (derivative - self.l1 * x) / (self.l0 - self.l1)
        c1 = x - c0
        z0, z1 = c0 * math.exp(self.l0 * dt), c1 * math.exp(self.l1 * dt)
        out0 = z0 + z1
        out1 = ((self.l0 + self.alpha) * z0 +
                (self.l1 + self.alpha) * z1) / self.delta
        return out0, out1, c0, c1

    def wait(self, x, dt):
        if dt == 0:
            return x
        p0, pp, pn, m0, mp, mn = x
        p0_new, pa_new, c0, c1 = self.pair(p0, pp + pn, dt)
        m0_new, ma_new, _, _ = self.pair(m0, mp + mn, dt)
        decay = math.exp(-self.beta * dt)
        pd_new = (pp - pn) * decay
        integral = 0.0
        for c, lam in ((c0, self.l0), (c1, self.l1)):
            denom = lam + self.beta
            integral += c * (dt * decay if abs(denom) < 1e-12 else
                            (math.exp(lam * dt) - decay) / denom)
        md_new = (mp - mn) * decay + self.alpha * integral
        mass = p0_new + pa_new
        return tuple(z / mass for z in (
            p0_new, (pa_new + pd_new) / 2, (pa_new - pd_new) / 2,
            m0_new, (ma_new + md_new) / 2, (ma_new - md_new) / 2))

    def fill(self, x, side):
        likelihood = (1.0, self.r ** side, self.r ** -side)
        mass = sum(x[i] * likelihood[i] for i in range(3))
        y = tuple(z * likelihood[i % 3] / mass for i, z in enumerate(x))
        return y, sum(y[3:])

    def fair(self, x):
        w = self.delta / (self.beta + self.l0)
        return (x[3] + w * (x[4] + x[5])) / (x[0] + w * (x[1] + x[2]))

    def quiet_profit(self, schedule):
        x, time, cost = self.initial(), 0.0, 0.0
        for when, side in schedule:
            x = self.wait(x, when - time)
            x, price = self.fill(x, side)
            cost += side * price
            time = when
        return -cost

    def sample_profit(self, schedule, rng):
        x = self.initial()
        u = rng.random() * sum(x[:3])
        regime = 0 if u < x[0] else (1 if u < x[0] + x[1] else -1)
        time, cost = 0.0, 0.0
        for when, side in schedule:
            while time < when:
                buy_rate = 1.0 if regime == 0 else self.r ** regime
                sell_rate = 1.0 if regime == 0 else self.r ** -regime
                switch_rate = self.alpha if regime == 0 else self.delta
                total = buy_rate + sell_rate + switch_rate
                dt = rng.expovariate(total)
                if time + dt >= when:
                    x = self.wait(x, when - time)
                    time = when
                    break
                x = self.wait(x, dt)
                time += dt
                pick = rng.random() * total
                if pick < buy_rate:
                    x, _ = self.fill(x, 1)
                elif pick < buy_rate + sell_rate:
                    x, _ = self.fill(x, -1)
                else:
                    regime = rng.choice((-1, 1)) if regime == 0 else 0
            x, price = self.fill(x, side)
            cost += side * price
        return -cost


def burst(n, wait, gap=0.0):
    return [(0.0, 1)] * n + [(wait + k * gap, -1) for k in range(n)]


def self_check():
    assert additive() > 0
    assert abs(opportunity() - 0.1484014710930872) < 1e-10
    lo, hi = opportunity_enclosure()
    assert Decimal('0.14840147109') < lo < hi < Decimal('0.14840147110')
    model = Tilt()
    x = model.initial()
    x, _ = model.fill(x, 1)
    x, _ = model.fill(x, 1)
    y = model.wait(x, 0.7)
    z = model.wait(model.wait(x, 0.3), 0.4)
    assert max(abs(a - b) for a, b in zip(y, z)) < 1e-12
    assert abs(model.fair(x) - model.fair(y)) < 1e-12
    up, _ = model.fill(x, 1)
    back, _ = model.fill(up, -1)
    assert max(abs(a - b) for a, b in zip(x, back)) < 1e-12
    for dt in (0.0, 0.01, 0.7, 20.0):
        y = model.wait(x, dt)
        assert min(y[:3]) >= -1e-14
        assert abs(sum(y[:3]) - 1) < 1e-12
    # Independent check of the analytic wait against the forward equations.
    dt = 1e-6
    x = tuple(z / sum(x[:3]) for z in x)
    y = model.wait(x, dt)
    p0, pp, pn, m0, mp, mn = x
    a, d, b = model.alpha, model.delta, model.beta
    raw = (-a*p0+d*(pp+pn), a*p0/2-b*pp, a*p0/2-b*pn,
           -a*m0+d*(mp+mn), a*(m0+p0)/2-b*mp, a*(m0-p0)/2-b*mn)
    norm_derivative = sum(raw[:3])
    assert max(abs((y[i]-x[i])/dt - (raw[i]-x[i]*norm_derivative))
               for i in range(6)) < 1e-6


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--mc', type=int, default=0, help='paths per schedule')
    args = parser.parse_args()
    self_check()
    exact = additive()
    print('additive four buys/four sells:', exact, float(exact))
    print('profit-sensitive 12 buys/12 sells:', opportunity())
    print('profit-sensitive rigorous enclosure:', opportunity_enclosure())
    rapid = Tilt(alpha=0.0, delta=1000.0, odds=0.01)
    gap = 1e-8
    rapid_schedule = ([(gap*(k+1), 1) for k in range(6)] +
                      [(6*gap + 0.02 + gap*(k+1), -1) for k in range(6)])
    gain = rapid.quiet_profit(rapid_schedule)
    survival = math.exp(-(rapid.r + 1/rapid.r)*rapid_schedule[-1][0])
    print('tilted death, quiet gain:', gain)
    print('tilted death, expected-profit lower bound:', survival*gain-(1-survival)*12)
    recurrent = Tilt(alpha=0.02, delta=100000.0, odds=0.01)
    gap = 1e-11
    recurrent_schedule = ([(gap*(k+1), 1) for k in range(6)] +
                          [(6*gap + 0.0002 + gap*(k+1), -1) for k in range(6)])
    gain = recurrent.quiet_profit(recurrent_schedule)
    exposure = (recurrent.r + 1/recurrent.r)*recurrent_schedule[-1][0]
    survival = math.exp(-exposure)
    lower_bound = survival*gain - 144*(1-survival) - 12*exposure
    assert lower_bound > 2.8
    print('recurrent tilted death, quiet gain:', gain)
    print('recurrent tilted death, expected-profit lower bound:', lower_bound)
    if args.mc:
        model = Tilt()
        rng = random.Random(20260922)
        for n, wait, gap in ((6, 8, 0), (8, 8, 0), (8, 8, 8), (12, 8, 8)):
            schedule = burst(n, wait, gap)
            data = [model.sample_profit(schedule, rng) for _ in range(args.mc)]
            print('baseline tilt:', n, wait, gap,
                  'quiet', model.quiet_profit(schedule),
                  'mean', statistics.mean(data),
                  'SE', statistics.stdev(data)/math.sqrt(args.mc))
