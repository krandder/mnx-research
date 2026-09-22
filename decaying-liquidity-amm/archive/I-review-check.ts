// Run: bun I-review-check.ts. Uses the reviewed engine, without generating figures.
import assert from 'node:assert/strict';
const source = (await Bun.file(new URL('./gen-choiceb.ts', import.meta.url)).text())
  .split('// svg helpers')[0];
function engine(slow = 0.5, scale = 1) {
  const js = new Bun.Transpiler({ loader: 'ts' }).transformSync(
    source.replace('s=0.5', `s=${slow}`)
      .replace('a=1,b=10', `a=${scale},b=${10 * scale}`));
  return new Function(js + '\nreturn {T,V,h,A,B,Tp,fill,wait,R,s};')();
}
const e = engine();
const init = (F = 0) => ({ P: 0, phi: 0, F, cash: 0 });
const U = (x: number) => e.V(x) + e.B(x);
const storage = (z: ReturnType<typeof init>, m = e) =>
  z.P * z.F - m.s * z.P ** 2 / 2 + m.V(z.phi) + m.B(z.phi) - z.P * m.A(z.phi);
function near(x: number, y: number, eps = 1e-9) {
  assert.ok(Math.abs(x - y) <= eps * (1 + Math.abs(x) + Math.abs(y)), `${x} != ${y}`);
}
// Independent quadrature: no use of A, B, or V in the h/T integrands.
function integral(f: (x: number) => number, x: number, y: number, n = 4096) {
  if (x > y) return -integral(f, y, x, n);
  if (x < 0 && y > 0) return integral(f, x, 0, n) + integral(f, 0, y, n);
  const dx = (y - x) / n;
  let sum = f(x) + f(y);
  for (let i = 1; i < n; ++i) sum += (i % 2 ? 4 : 2) * f(x + i * dx);
  return sum * dx / 3;
}
for (const x of [-20, -3, -0.2, 0, 0.2, 3, 20]) {
  near(e.h(x), integral(v => e.Tp(v * v * x), 0, 1));
  near(e.A(x), integral(e.h, 0, x));
  near(e.B(x), integral(e.A, 0, x));
  near(e.V(x), integral(e.T, 0, x));
}
for (const [phi, q] of [[-3, 5], [3, -5], [0, 2], [1, -1], [-7, -4]]) {
  const z = { P: -2, phi, F: 4, cash: 0 };
  const independent = integral(v => 4 + e.s * v + e.A(phi + v) - e.A(phi) + e.T(phi + v), 0, q);
  const before = storage(z);
  e.fill(z, q);
  near(-z.cash, independent);
  near(-z.cash, storage(z) - before);
  e.fill(z, -q);
  near(z.P, -2); near(z.phi, phi); near(z.F, 4); near(z.cash, 0);
}
let seed = 904;
const rnd = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32);
let maxResidual = 0, minCost = Infinity;
for (const m of [e, engine(0)]) {
  for (let n = 0; n < 400; ++n) {
    const z = init();
    let dissipation = 0;
    for (let k = 0; k < 20; ++k) {
      m.fill(z, 16 * rnd() - 8);
      const before = storage(z, m);
      m.wait(z, 4 * rnd());
      const loss = before - storage(z, m);
      assert.ok(loss >= -1e-9);
      dissipation += loss;
    }
    m.fill(z, -z.P);
    const residual = Math.abs(-z.cash - storage(z, m) - dissipation);
    maxResidual = Math.max(maxResidual, residual);
    minCost = Math.min(minCost, -z.cash);
    near(-z.cash, storage(z, m) + dissipation);
    assert.ok(z.cash <= 1e-9);
  }
}
// Negative P; waits crossing zero; s=0. Check dissipation by time integration too.
for (const m of [e, engine(0)]) {
  for (const [P, phi] of [[-4, 2], [4, -2], [-4, -7], [4, 7], [4, 2], [-4, -2]]) {
    const z = { P, phi, F: -3, cash: 0 }, t = 2;
    const D = integral(v => {
      const f = P / 2 + (phi - P / 2) * Math.exp(-v);
      return 2 * m.h(f) * (f - P / 2) ** 2;
    }, 0, t);
    const before = storage(z, m);
    m.wait(z, t);
    near(before - storage(z, m), D, 1e-7);
    assert.ok(D >= 0);
  }
}
const output: Record<string, unknown> = { maxResidual, minCost };
// Other trader funds the inherited displacement.
let z = init(); e.fill(z, 8); const entry = -z.cash; z.cash = 0;
e.fill(z, -1); e.wait(z, Math.log(2)); e.fill(z, 1);
const inheritedProfit = z.cash;
output.inherited = { profit: inheritedProfit, state: { ...z } };
assert.ok(inheritedProfit > 14);
z.cash = 0; e.fill(z, -8);
output.inheritedAllClosed = { victimLoss: entry - z.cash, aggregateCost: entry - z.cash - inheritedProfit };
// Account A's no-wait sandwich; B's closing trade makes aggregate cost zero.
z = init(); e.fill(z, 1); const openCash = z.cash; e.fill(z, 8);
const beforeExit = z.cash; e.fill(z, -1);
output.sandwichProfit = openCash + z.cash - beforeExit;
e.fill(z, -8); near(z.cash, 0);
// Additive external mark EMA moves F by 1 during the wait.
z = init(); e.fill(z, 1); e.wait(z, Math.log(2)); z.F += 1; e.fill(z, -1);
output.markProfit = z.cash; assert.ok(z.cash > 0.53);
// Quote-preserving changes of s; all state AND parameters return.
z = init(); const low = engine(0);
e.fill(z, 1); low.fill(z, -1); e.fill(z, -1); low.fill(z, 1);
output.reconfiguration = { ...z }; near(z.cash, 0.5); near(z.F, 0); near(z.P, 0); near(z.phi, 0);
// Nonzero basis compensation while scaling both curve slopes down and back.
z = init(); const reduced = engine(0.5, 0.5);
for (const sign of [1, -1]) {
  e.fill(z, sign);
  z.F += e.T(z.phi) - reduced.T(z.phi);
  reduced.fill(z, -sign);
  z.F += reduced.T(z.phi) - e.T(z.phi);
}
output.shapeReconfiguration = { ...z };
near(z.cash, e.A(1) + e.T(1) - U(1)); near(z.F, 0); near(z.P, 0); near(z.phi, 0);
// Nearest-tick block-average prices; q values are exact decimal schedule values.
z = init(100); const roundedLegs = []; let roundedCost = 0;
for (const q of [0.2, -0.05, -0.15]) {
  const before = z.cash; e.fill(z, q); const cost = before - z.cash;
  const average = cost / q, tickPrice = Math.round(average);
  roundedCost += q * tickPrice; roundedLegs.push({ q, average, tickPrice });
}
output.nearestTick = { roundedLegs, profit: -roundedCost };
near(-roundedCost, 0.05); near(z.P, 0); near(z.phi, 0); near(z.F, 100);
// Actual engine roundoff, without changing cash execution.
z = init(); for (let n = 0; n < 100; ++n) { e.fill(z, 8); e.fill(z, -8); }
output.roundoff100 = { ...z }; assert.ok(z.cash > 0); assert.equal(z.F, 0);
z = init(); e.fill(z, 1);
output.spotSlabs = { bothLegsProfit: e.R(z), reduceOnlyExitProfit: e.R(z) + z.cash };
output.patient8 = { fairShift: 4 + 2 * e.A(4), proposedApproximation: 12, sweepShift: 4 + e.A(8) };
output.settledSweep8 = 4 + e.A(8) + e.T(4);
// Nontrivial finite full-state loop with two waits in each half.
z = init(); let D = 0;
for (const sign of [1, -1]) {
  e.fill(z, sign * 8);
  let before = storage(z); e.wait(z, Math.log(2)); D += before - storage(z);
  e.fill(z, -sign * 12);
  before = storage(z); e.wait(z, Math.log(2)); D += before - storage(z);
  e.fill(z, sign * 4);
}
near(z.P, 0); near(z.phi, 0); near(z.F, 0); near(-z.cash, D);
output.fullStateLoop = { cost: -z.cash, dissipation: D, state: z };
console.log(JSON.stringify(output, null, 2));
