"""Small reproducible checks for O-lot-inequality.md; Python standard library."""

from fractions import Fraction as F
import math


def lot_profit(states, weights, likelihood, schedule):
    cost = F(0)
    for side in schedule:
        weights = [w * likelihood(x, side) for x, w in zip(states, weights)]
        price = sum(x[0] * w for x, w in zip(states, weights)) / sum(weights)
        cost += side * price
    return -cost


def additive_checks():
    states = [(-1, 1), (0, 1), (1, 1)]
    gain = lot_profit(states, [F(1, 100), F(1), F(1, 100)],
                      lambda x, s: 2 if x[0] * s > 0 else 1,
                      [1] * 4 + [-1] * 4)
    assert gain == F(588104677, 11211663918)
    print("three-point eight-lot profit:", gain, float(gain))

    p, e, nu, mu = F(1, 10000), F(1, 10), F(1, 10), F(9, 10)
    states = [(v, a) for v in (-1, 0, 1) for a in (0, 1)]
    weights = [pv * pa for pv in (p / 2, 1 - p, p / 2) for pa in (1 - e, e)]
    gain = lot_profit(states, weights,
                      lambda x, s: 1 + (nu + mu * x[1]) * (x[0] * s > 0),
                      [1] * 12 + [-1] * 12)
    assert F(160179, 1000000) < gain < F(160180, 1000000)
    print("six-state 24-lot profit (zero-duration limit):", float(gain))


def six_slots():
    plus = minus = F(1, 2)
    cost = F(0)
    for slot, side in enumerate((1, 1, -1, -1, -1, 1), 1):
        if slot in (2, 5):
            plus *= F(3 if side == 1 else 1, 4)
            minus *= F(3 if side == -1 else 1, 4)
        cost += side * (plus - minus) / (plus + minus)
    assert cost == -F(1, 2) and plus == minus
    print("six-slot profit:", -cost)


def tilted_death():
    # ponytail: five states suffice for the single-episode death witness.
    # States: zero, active positive/negative, spent positive/negative.
    w = [1.0, 0.01, 0.01, 0.0, 0.0]
    values = (0, 1, -1, 1, -1)
    cost = 0.0

    def fill(side):
        nonlocal w
        likelihood = (1.0, 3.0 ** side, 3.0 ** -side, 1.0, 1.0)
        w = [x * l for x, l in zip(w, likelihood)]
        return sum(v * x for v, x in zip(values, w)) / sum(w)

    for _ in range(6):
        cost += fill(1)
    beta = 1000 + 4 / 3
    z = math.exp(-beta * 0.02)
    retained = 1000 / beta
    for active, spent in ((1, 3), (2, 4)):
        w[spent] += retained * (1 - z) * w[active]
        w[active] *= z
    for _ in range(6):
        cost -= fill(-1)
    gain = -cost
    survival = math.exp(-1 / 15)
    lower = survival * gain - (1 - survival) * 12
    assert gain > 2.92 and lower > 1.95
    assert sum(F(20) ** k / math.factorial(k) for k in range(50)) > F(10**9, 3)
    print("tilted quiet profit:", gain)
    print("tilted actual-law expected-profit lower bound:", lower)


def entropic_checks():
    values, rho, gamma = (-1.0, 0.0, 1.0), (0.1, 0.8, 0.1), 0.7

    def potential(belief, position):
        return math.log(sum(w * math.exp(gamma * position * v)
                            for v, w in zip(values, belief))) / gamma

    def mean(belief):
        return sum(v * w for v, w in zip(values, belief))

    def storage(belief, position):
        return potential(belief, position) - position * mean(belief)

    for position in (-5, -1, 0, 1, 5):
        assert storage(rho, position) >= -1e-12
        for q in (-3, -1, 1, 3):
            weights = [w * math.exp(gamma * (position + q) * v)
                       for v, w in zip(values, rho)]
            price = sum(v * w for v, w in zip(values, weights)) / sum(weights)
            residual = q * price - (potential(rho, position + q) - potential(rho, position))
            assert residual >= -1e-12
        # Exact three-outcome external experiment: buy, sell, no event.
        plus = [0.01 * math.exp(gamma * v) for v in values]
        minus = [0.01 * math.exp(-gamma * v) for v in values]
        none = [1 - a - b for a, b in zip(plus, minus)]
        after = 0.0
        for likelihood in (plus, minus, none):
            mass = sum(w * l for w, l in zip(rho, likelihood))
            posterior = [w * l / mass for w, l in zip(rho, likelihood)]
            after += mass * storage(posterior, position)
        assert after <= storage(rho, position) + 1e-12
    print("entropic endpoint and external-observation inequalities: passed")


if __name__ == "__main__":
    six_slots()
    additive_checks()
    tilted_death()
    entropic_checks()
