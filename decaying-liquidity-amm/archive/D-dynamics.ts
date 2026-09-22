// Run: ~/.bun/bin/bun D-dynamics.ts
// Exact primitives; no dependencies, quadrature, or external price signal.
import assert from "node:assert/strict";

type Curve = { f: (x: number) => number; v: (x: number) => number };
const band = (inner: number, outer: number, B = 2): Curve => ({
  f: x => Math.sign(x) * (inner * Math.min(Math.abs(x), B) + outer * Math.max(0, Math.abs(x) - B)),
  v: x => {
    const u = Math.abs(x), z = Math.max(0, u - B);
    return inner * Math.min(u, B) ** 2 / 2 + inner * B * z + outer * z * z / 2;
  },
});
const T = band(1, 10);
type Model = { name: string; A: Curve; H: Curve; S: (c: number) => number };
const model = (name: string, ki: number, ko: number, h = 0, S = (_: number) => 0): Model =>
  ({ name, A: band(ki, ko), H: band(h, h), S });

class Walk {
  phi = 0;
  P = 0;
  F = 0;
  cost = 0;
  waitSum = 0;
  constructor(readonly m: Model) {}
  W(x: number) { return T.v(x) + this.m.H.v(x); }
  trade(q: number) {
    const x = this.phi, y = x + q, c = this.P - x;
    // Integrate the moving F throughout the fill, including h dq.
    this.cost += (this.F - this.m.H.f(x) + this.m.S(c)) * q + this.W(y) - this.W(x);
    this.F += this.m.H.f(y) - this.m.H.f(x);
    this.phi = y;
    this.P += q;
  }
  toPhi(x: number) { this.trade(x - this.phi); }
  wait(r: number) {
    assert(r > 0 && r < 1); // Finite exponential waits only.
    const x = this.phi, y = x * r;
    const dF = this.m.A.f(x) - this.m.A.f(y);
    const dG = dF - this.m.H.f(y) + this.m.H.f(x);
    this.waitSum += this.P * (dG + this.m.S(this.P - y) - this.m.S(this.P - x)) - this.W(x) + this.W(y);
    this.F += dF;
    this.phi = y;
  }
  check(tolerance = 1e-6) {
    assert(Math.abs(this.P) < 1e-8, "position must close");
    assert(Math.abs(-this.cost - (-this.W(this.phi) + this.waitSum)) < tolerance, "loop identity");
    return -this.cost;
  }
}

// The local block restores (P, phi, c), but may change F. Entry/exit restore
// P = phi = 0 exactly with two finite half-life waits.
function ratchet(w: Walk, C: number, n: number, sign = 1) {
  w.trade(sign * 2 * C);
  w.wait(0.5);
  w.toPhi(sign * 4);
  for (let i = 0; i < n; i++) {
    w.wait(0.75);              // 4 -> 3
    w.toPhi(-sign * 1.5);
    w.wait(1 / 3);             // -1.5 -> -0.5
    w.toPhi(sign * 4);
  }
  w.toPhi(-sign * 2 * C);
  w.wait(0.5);
  w.toPhi(0);
}

console.log("Profitable finite loops, band B=2, a0=1, a=10, h=S=0");
console.log("profile | C | blocks | any-end profit | final F | exact mirrored profit");
for (const [name, ki, ko, C, n] of [
  ["rho=0.01", 0.01, 0.1, 400, 260000],
  ["rho=0.05", 0.05, 0.5, 80, 9000],
  ["rho=0.10", 0.1, 1, 20, 3000],
  ["rho=0.25", 0.25, 2.5, 6, 110],
  ["rho inner=.05, outer=.10", 0.05, 1, 20, 2100],
] as const) {
  const w = new Walk(model(name, ki, ko));
  ratchet(w, C, n);
  const base = 3 * ko * C * C - 2 * (T.v(2 * C) - T.v(C));
  const block = C * (ko - ki) + 4 * ko + 0.5 * ki - 18;
  const predicted = base + n * block;
  const profit = w.check(0.02), finalF = w.F;
  assert(Math.abs(profit - predicted) < 0.02);
  assert(Math.abs(finalF - n * (ko - ki)) < 0.001);
  assert(profit > 0);
  ratchet(w, C, n, -1);
  const exactProfit = w.check(0.05);
  assert(Math.abs(w.phi) < 1e-8 && Math.abs(w.F) < 0.001);
  assert(Math.abs(exactProfit - 2 * predicted) < 0.05);
  console.log(`${name} | ${C} | ${n} | ${predicted.toFixed(3)} | ${(n * (ko - ki)).toFixed(3)} | ${(2 * predicted).toFixed(3)}`);
}

let seed = 0x62b30a1;
const random = () => ((seed = (Math.imul(1664525, seed) + 1013904223) >>> 0) / 2 ** 32);
const safe = [
  model("optimal rho: inner=1, outer=.1", 1, 1),
  model("kappa=.4, S(c)=.6c", 0.4, 0.4, 0, c => 0.6 * c),
  model("g=0, S(c)=.1T(c)", 0, 0, 0, c => 0.1 * T.f(c)),
  model("kappa=.5, S(c)=.5tanh(c)", 0.5, 0.5, 0, c => 0.5 * Math.tanh(c)),
  model("g=0, h=3", 0, 0, 3),
];
console.log("\nReproducible search: 5000 random any-end loops per proved-safe model");
for (const m of safe) {
  let best = -Infinity;
  for (let i = 0; i < 5000; i++) {
    const w = new Walk(m);
    for (let j = 0; j < 8; j++) {
      w.trade((2 * random() - 1) * 20);
      w.wait(0.01 + 0.98 * random());
    }
    w.trade(-w.P);
    const p = w.check();
    assert(p <= 1e-7, m.name);
    best = Math.max(best, p);
  }
  console.log(`${m.name}: largest sampled profit ${best.toFixed(6)}`);
}

console.log("\nSettled displacement of one positive sweep (analytic infinite-wait limit)");
console.log("q | optimal rho, F | g=0, h=3, F");
for (const q of [0.5, 1, 2, 4, 8, 16]) {
  const a = new Walk(safe[0]), b = new Walk(safe[4]);
  a.trade(q); b.trade(q);
  const Fa = a.F + a.m.A.f(a.phi), Fb = b.F + b.m.A.f(b.phi);
  assert(Math.abs(Fa - q) < 1e-10 && Math.abs(Fb - 3 * q) < 1e-10);
  console.log(`${q} | ${Fa} | ${Fb}`);
}

// A literal counterexample to a potential on mixed trade/wait paths.
const H = (x: number) => x ** 3 / 3; // h(phi) = phi^2
const fillIntegral = H(2) - H(0) + H(-1) - H(1.5) + H(0) - H(-0.5);
assert(Math.abs(fillIntegral - 1.25) < 1e-12);
assert(fillIntegral !== H(0) - H(0));
console.log("\nh(phi)=phi^2: buy 2, decay to 1.5, sell 2.5, decay to -.5, buy .5:");
console.log("P and phi return to zero, but integral h dq =", fillIntegral);
console.log("All identities, explicit pumps, and safe-family checks passed.");
