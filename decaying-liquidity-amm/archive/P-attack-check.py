"""Reproduce the finite-lot witnesses in P-attack.md.

Run: python3 P-attack-check.py
Uses the numpy/scipy already installed here. No simulation is used in the
reported profits: fractions, matrix exponentials and one-dimensional quadrature.
"""

from fractions import Fraction as F
from math import atan

import numpy as np
from scipy.integrate import quad, solve_ivp
from scipy.linalg import expm
from scipy.optimize import brentq


def additive(n, slow=1, active=1, prior_weights=(100, 1, 1),
             initial_external_buys=0):
    # V=0,+1,-1, independent A with P(A=1)=1/2; epsilon=1.
    prior = [F(x, sum(prior_weights)) for x in prior_weights]
    w = [p / 2 for p in prior for _ in range(2)]
    for a in (0, 1):
        w[2 + a] *= (1 + slow + active * a) ** initial_external_buys
    cash = F(0)
    for side in [1] * n + [-1] * n:
        for i, v in enumerate((0, 1, -1)):
            for a in (0, 1):
                w[2 * i + a] *= 1 + (slow + active * a) * (v == side)
        price = sum(v * sum(w[2 * i:2 * i + 2])
                    for i, v in enumerate((0, 1, -1))) / sum(w)
        cash += side * price
    return -cash


def tilted_matrices(alpha, delta=0.2):
    rates = np.array([[1., 3., 1. / 3], [1., 1. / 3, 3.]])
    generator = np.array([[-alpha, delta, delta],
                          [alpha / 2, -delta, 0],
                          [alpha / 2, 0, -delta]])
    killed = generator - np.diag(rates.sum(axis=0))
    moments = np.zeros((6, 6))
    moments[:3, :3] = moments[3:, 3:] = killed
    moments[3, 1], moments[3, 2] = delta, -delta
    return rates, killed, moments


def tilted_price(z):
    return (sum(z[3:]) + z[1] - z[2]) / sum(z[:3])


def tilted_fill(z, rates, side):
    z = z * np.tile(rates[side], 2)
    return z / sum(z[:3])


def tilted_sales(z, rates, n):
    proceeds = 0.
    for _ in range(n):
        z = tilted_fill(z, rates, 1)
        proceeds += tilted_price(z)
    return proceeds


def stopped_tilted(n=16, tau=0.001, alpha=0.000001,
                   prior_weights=(100., 1., 1.)):
    rates, killed, moments = tilted_matrices(alpha)
    z0 = np.array([*prior_weights, 0., 0., 0.]) / sum(prior_weights)
    bought = z0.copy()
    entry = 0.
    for _ in range(n):
        bought = tilted_fill(bought, rates, 0)
        entry += tilted_price(bought)

    def gain(t, side=None):
        z = expm(moments * t) @ bought
        if side is not None:
            z = tilted_fill(z, rates, side)
        return tilted_sales(z, rates, n) - entry

    def integrand(t):
        actual = expm(killed * t) @ z0[:3]
        return sum((rates[s] @ actual) * gain(t, s) for s in (0, 1))

    survival = sum(expm(killed * tau) @ z0[:3])
    event_profit, error = quad(integrand, 0, tau,
                               epsabs=2e-12, epsrel=2e-12)
    return gain(tau), survival * gain(tau) + event_profit, error, entry


def rational_quiet_certificate(n=16, tau=F(1, 1000),
                               lower=F(359425, 100000),
                               upper=F(359426, 100000),
                               prior_weights=(F(100), F(1), F(1))):
    # Taylor degree 20; the report bounds its remainder for both tested waits.
    alpha, delta = F(1, 10**6), F(1, 5)
    a = [[-alpha - 2, delta, delta],
         [alpha / 2, -delta - F(10, 3), F(0)],
         [alpha / 2, F(0), -delta - F(10, 3)]]
    mat = [[F(0) for _ in range(6)] for _ in range(6)]
    for i in range(3):
        for j in range(3):
            mat[i][j] = mat[i + 3][j + 3] = a[i][j]
    mat[3][1], mat[3][2] = delta, -delta
    assert max(sum(abs(x) for x in row) * tau for row in mat) < 4 * tau
    w0, wp, wm = prior_weights
    term = [w0, wp * F(3)**n, wm * F(3)**(-n), F(0), F(0), F(0)]
    z = term.copy()
    for k in range(1, 21):
        term = [tau / k * sum(mat[i][j] * term[j] for j in range(6))
                for i in range(6)]
        z = [x + y for x, y in zip(z, term)]
    entry = sum((wp * F(3)**i - wm * F(3)**(-i)) /
                (w0 + wp * F(3)**i + wm * F(3)**(-i))
                for i in range(1, n + 1))
    result = -entry
    for _ in range(n):
        z = [x * r for x, r in zip(z, [1, F(1, 3), 3] * 2)]
        result += (sum(z[3:]) + z[1] - z[2]) / sum(z[:3])
    # The distance to either endpoint greatly exceeds the omitted-series bound.
    assert lower < result < upper
    return float(result)


def profit_sensitive_episode(prior_probabilities=(0.9, 0.05, 0.05),
                             initial_external_buys=0):
    # E-model (1)-(3), including the informed traders' quote response.
    values = np.repeat([0., 1., -1.], 2)
    activity = np.tile([0., 1.], 3)
    alpha = slow = 1e-6
    delta, tau = 1e5, 0.001
    coefficient = slow + activity
    generator = np.zeros((6, 6))
    for i in (0, 2, 4):
        generator[i, i], generator[i + 1, i] = -alpha, alpha
        generator[i, i + 1], generator[i + 1, i + 1] = delta, -delta
    prior = np.repeat(prior_probabilities, 2) / 2

    def rates(pi):
        pi = pi / sum(pi)
        mean = pi @ values
        ask = brentq(lambda p: p - mean - pi @
                     (coefficient * np.maximum(values - p, 0)**2),
                     mean, 1., xtol=1e-14)
        bid = brentq(lambda p: mean - p - pi @
                     (coefficient * np.maximum(p - values, 0)**2),
                     -1., mean, xtol=1e-14)
        return np.array([1 + coefficient * np.maximum(values - ask, 0),
                         1 + coefficient * np.maximum(bid - values, 0)])

    def trade(pi, side):
        pi = pi * rates(pi)[side]
        pi /= sum(pi)
        return pi, pi @ values

    for _ in range(initial_external_buys):
        prior, _ = trade(prior, 0)
    public = prior.copy()
    entry = 0.
    for _ in range(2):
        public, price = trade(public, 0)
        entry += price
    ideal = 2 * price - entry

    def gain(pi, side=None):
        if side is not None:
            pi, _ = trade(pi, side)
        result = -entry
        for _ in range(2):
            pi, p = trade(pi, 1)
            result += p
        return result

    def rhs(t, y):
        public, actual = y[:6], y[6:12]
        arrival = rates(public)
        total = arrival.sum(axis=0)
        dp = generator @ public - (total - public @ total) * public
        dw = generator @ actual - total * actual
        dg = sum((arrival[s] @ actual) * gain(public, s) for s in (0, 1))
        return np.r_[dp, dw, dg]

    solved = solve_ivp(rhs, [0, tau], np.r_[public, prior, 0.],
                       method="Radau", rtol=1e-10, atol=1e-12)
    assert solved.success
    final = solved.y[:, -1]
    expected = sum(final[6:12]) * gain(final[:6]) + final[-1]
    assert expected > 0.042
    return ideal, gain(final[:6]), expected


def static_reciprocal_check():
    # Exact isolated loop: +,+,+,-,-,- at y=0 and t=0.
    # U's stochastic safety is the storage proof in the report.
    weights = [F(100), F(1), F(1)]
    cost = F(0)
    y = 0
    for side in (1, 1, 1, -1, -1, -1):
        y += side
        up, down = F(3) ** y, F(3) ** (-y)
        cost += side * (up - down) / (weights[0] + up + down)
    assert cost > 0
    return cost


def six_slot():
    odds = F(1)
    cost = F(0)
    signs = (1, 1, -1, -1, -1, 1)
    for slot, sign in enumerate(signs, 1):
        if slot in (2, 5):
            odds *= F(3) ** sign
        cost += sign * (odds - 1) / (odds + 1)
    assert odds == 1 and sum(signs) == 0 and -cost == F(1, 2)
    return -cost


if __name__ == "__main__":
    exact = additive(6)
    assert exact == F(522697891519620636423341, 358157751111583598664255)
    print("E regime, six buys then six sells:", exact, float(exact))
    for n in (4, 8, 12, 20, 40):
        print("E regime, n =", n, "profit =", float(additive(n)))
    for alpha in (0., 0.000001, 0.02):
        quiet, expected, error, entry = stopped_tilted(alpha=alpha)
        print("Tilt, alpha =", alpha, "quiet =", quiet,
              "expected =", expected, "quadrature estimate =", error,
              "entry =", entry)
    assert stopped_tilted()[1] > 3.59
    assert stopped_tilted(alpha=0.02)[1] < 0
    print("Tilt, n=14, tau=0.01, alpha=1e-6:", stopped_tilted(n=14, tau=0.01))
    print("Rational quiet-path enclosure (3.59425, 3.59426):",
          rational_quiet_certificate())
    print("Rational quiet-path enclosure (3.60087, 3.60088):",
          rational_quiet_certificate(14, F(1, 100),
                                     F(360087, 100000), F(360088, 100000)))
    print("E profit-sensitive, retained-price limit / quiet / expected:",
          profit_sensitive_episode())
    print("Six-slot profit:", six_slot())
    print("Static reciprocal loop cost:", static_reciprocal_check())
    displaced = 1 + atan(3) - atan(4)
    assert displaced > 0
    print("Conservative right-endpoint displaced-start profit:", displaced)
    def static_price(y, exposure):
        return exposure * (F(3)**y - F(3)**(-y)) / (
            100 + exposure * (F(3)**y + F(3)**(-y)))
    static_displaced = static_price(5, F(1)) - static_price(6, F(1, 100))
    assert static_displaced == F(104386245804, 162979297675)
    print("Static reciprocal displaced-start quiet profit:", static_displaced,
          float(static_displaced))
    tagged_displaced = static_price(6, F(1)) - static_price(6, F(1, 100))
    assert tagged_displaced == F(958863906000, 1181706475291)
    print("Authenticated-U displaced-start quiet profit:", tagged_displaced,
          float(tagged_displaced))
    displaced_additive = additive(6, initial_external_buys=1)
    print("E-C after one outside buy, exact profit:", displaced_additive,
          float(displaced_additive))
    print("E-P after one outside buy, retained / quiet / expected:",
          profit_sensitive_episode(initial_external_buys=1))
    print("T after one outside buy, quiet / expected / quadrature / entry:",
          stopped_tilted(prior_weights=(100., 3., 1. / 3)))
    print("T displaced quiet enclosure (2.68746, 2.68747):",
          rational_quiet_certificate(lower=F(268746, 100000),
                                     upper=F(268747, 100000),
                                     prior_weights=(F(100), F(3), F(1, 3))))
