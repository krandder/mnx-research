// bun adversary.ts [M0|M1|M2|M3|M4] [--cap=16] [--curve='linear 10x'] [--json=/tmp/results.json]
// No dependencies. Cash flows use analytic primitives, including changing F inside M2 fills.
import { strict as assert } from "node:assert";

type Curve = { name: string; T: (x: number) => number; V: (x: number) => number; B: (x: number) => number };
type Rule = "M0" | "M1" | "M2" | "M3" | "M4";
type Op = { q: number } | { r: number };
type State = { p: number; x: number; f: number; cash: number; volume: number; peak: number };
type Best = { profit: number; volume: number; perUnit: number; peak: number; how: string; ops?: Op[] };
const CAP = Number(process.argv.find(a => a.startsWith("--cap="))?.slice(6) ?? 16), REPEATS = 32768;
assert(Number.isFinite(CAP) && CAP > 0);
const pwl = (name: string, slopes: number[], breaks: number[]): Curve => {
  const primitive = (x: number, power: number, divisor: number) => {
    const z = Math.abs(x);
    return (slopes[0] * z ** power + breaks.reduce((a, b, i) =>
      a + (slopes[i + 1] - slopes[i]) * Math.max(0, z - b) ** power, 0)) / divisor;
  };
  return { name, T: x => Math.sign(x) * primitive(x, 1, 1), V: x => primitive(x, 2, 2), B: x => primitive(x, 3, 6) };
};
const concave = (name: string, floor: number, a: number): Curve => ({
  name,
  T: x => floor * x + a * x / Math.hypot(1, x),
  V: x => floor * x * x / 2 + a * x * x / (Math.hypot(1, x) + 1),
  B: x => { const z = Math.abs(x); return floor * z ** 3 / 6 + a * ((z * Math.hypot(1, z) + Math.asinh(z)) / 2 - z); },
});
const curves: Curve[] = [
  pwl("linear 10x", [10], []), pwl("band 1/10 B2", [1, 10], [2]),
  pwl("band 0/10 B2", [0, 10], [2]), pwl("band 5/10 B2", [5, 10], [2]),
  pwl("sat a10 Q1", [10, 0], [1]), pwl("sat a10 Q3", [10, 0], [3]),
  pwl("four slopes", [2, 12, 1, 8], [1, 2, 4]),
  pwl("flat step", [1, 0, 2], [1, 2]),
  { name: "smooth convex", T: x => x + x ** 3, V: x => x * x / 2 + x ** 4 / 4, B: x => Math.abs(x) ** 3 / 6 + Math.abs(x) ** 5 / 20 },
  concave("smooth concave", 0, 10), concave("concave + x", 1, 9),
];
function simulator(c: Curve, rule: Rule, k: number) {
  const s: State = { p: 0, x: 0, f: 0, cash: 0, volume: 0, peak: 0 };
  const A = (x: number) => Math.sign(x) * c.V(x);
  const step = (op: Op) => {
    if ("r" in op) {
      assert(op.r > 0 && op.r <= 1); // All reported exact witnesses use finite waits.
      const y = s.x * op.r;
      if (rule === "M1") s.f += k * (c.T(s.x) - c.T(y));
      s.x = y;
    } else {
      const { q } = op, y = s.x + q;
      let cost = s.f * q + c.V(y) - c.V(s.x);
      if (rule === "M2") {
        cost += k * (c.B(y) - c.B(s.x) - A(s.x) * q);
        s.f += k * (A(y) - A(s.x));
      }
      if (rule === "M3") cost += k * (c.V(s.p + q) - c.V(s.p));
      if (rule === "M4") cost += k * c.T(s.p - s.x) * q;
      s.cash -= cost; s.volume += Math.abs(q); s.x = y; s.p += q;
      s.peak = Math.max(s.peak, Math.abs(s.p));
    }
  };
  const run = (ops: Op[]) => { for (const op of ops) step(op); };
  // c=P-phi is a weighted average of past positions, so this closure preserves |P|<=CAP.
  const close = () => {
    const h = s.p - s.x;
    const ops: Op[] = [{ q: -h - s.p }, { r: 0.5 }, { q: h }];
    run(ops); return ops;
  };
  return { s, step, run, close };
}
const mirror = (ops: Op[]): Op[] => ops.map(o => "q" in o ? { q: -o.q } : o);
function evaluate(c: Curve, rule: Rule, k: number, ops: Op[], how: string): Best {
  const sim = simulator(c, rule, k); sim.run(ops); const closure = sim.close();
  const profit = 2 * sim.s.cash, volume = 2 * sim.s.volume;
  return { profit, volume, perUnit: volume ? 2 * profit / volume : 0, peak: sim.s.peak, how, ops: [...ops, ...closure] };
}
function stairs(u: number, v: number, d: number, n: number): Op[] {
  const ops: Op[] = [{ q: u }];
  for (let i = 0; i < n; i++) ops.push({ r: 1 - d / u }, { q: i + 1 < n ? d : -(u + v - d) });
  for (let i = 0; i < n; i++) ops.push({ r: 1 - d / v }, { q: i + 1 < n ? -d : v - d });
  return ops;
}
function legacy(): Op[][] {
  const result: Op[][] = [];
  for (const q of [.5, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32].filter(q => q <= CAP)) for (const t of [.25, 1, 3, 50])
    for (const ni of [1, 2, 4, 8]) for (const no of [1, 2, 4, 8]) for (const sign of [1, -1]) for (const over of [0, .5, 1]) {
      const ops: Op[] = [];
      for (let i = 0; i < ni; i++) ops.push({ q: sign * q / ni }, { r: Math.exp(-t) });
      for (let i = 0; i < no; i++) ops.push({ q: -sign * q * (1 + over) / no }, { r: Math.exp(-t) });
      if (over) ops.push({ q: sign * q * over }, { r: Math.exp(-50) });
      ops.push({ r: Math.exp(-50) }); result.push(ops);
    }
  return result;
}
let seed = 0x5eed1234;
const random = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return (seed >>> 0) / 4294967296; };
const points = [.125, .25, .5, 1, 1.5, 2, 2.5, 3, 4, 6, 8, 12, 16, ...[24, 32].filter(x => x <= CAP)];
const legacyOps = legacy();

function search(c: Curve, rule: Rule, k: number): Best {
  seed = [...`${c.name}:${rule}:${k}`].reduce((s, ch) => Math.imul(s, 31) ^ ch.charCodeAt(0), 0x5eed1234);
  let best: Best = { profit: 0, volume: 0, perUnit: 0, peak: 0, how: "empty loop", ops: [] };
  const offer = (b: Best) => {
    if (b.peak > CAP + 1e-8 || b.profit <= 1e-8 || !Number.isFinite(b.perUnit)) return;
    if (b.perUnit > best.perUnit + 1e-10) best = b;
  };
  for (let i = 0; i < legacyOps.length; i++) offer(evaluate(c, rule, k, legacyOps[i], `legacy ${i}; finite closure; mirror`));

  // Equal decay DISTANCES, independent waits, arbitrary unequal trade sizes.
  // Exact O(1) summation avoids an artificial leg-count cutoff on this family.
  for (const u of points) for (const v of points) for (const f of [.125, .25, .5, .75, .9375]) {
    const d = Math.min(u, v) * f;
    const maxN = Math.floor((CAP - u) / d + 1 + 1e-9);
    if (maxN < 1 || v - d > CAP) continue;
    for (const n of new Set([1, 2, 3, 4, 8, 16, 32, 64, maxN].filter(n => n <= maxN))) {
      let half: number;
      const dh = c.V(u) - c.V(u - d), dl = c.V(v) - c.V(v - d);
      if (rule === "M1") {
        const a = c.T(u) - c.T(u - d), b = c.T(v) - c.T(v - d);
        half = k * d * (a - b) * n * n / 2 + n * (k * ((u - d / 2) * a + (v - d / 2) * b) - dh - dl);
      } else if (rule === "M2") {
        half = k * d * (dh - dl) * n * n / 2 + n * (k * ((u - d / 2) * dh + (v - d / 2) * dl
          - c.B(u) + c.B(u - d) - c.B(v) + c.B(v - d)) - dh - dl);
      } else if (rule === "M4" && u === v) {
        half = (2 * u - d) * k * c.T(n * d) - 2 * n * dh;
      } else if (rule === "M0" || rule === "M3") half = -n * (dh + dl);
      else continue;
      const volume = 4 * (u + v + (n - 2) * d);
      offer({ profit: 2 * half, volume, perUnit: 4 * half / volume, peak: Math.max(u + (n - 1) * d, v - d),
        how: `stairs u=${u} v=${v} d=${d} n=${n}; mirror` });
    }
  }

  // Preload h, repeat a two-wait cell, liquidate, then mirror. Repetition is exact:
  // later liquidation earns h*dF per cell, in addition to that cell's cash profit.
  for (const h of new Set([0, 1, 2, 3, 4, 6, 8, 12, 14, 15, 15.5, CAP * .75, CAP * .875, CAP * .9375, CAP - .5].filter(h => h >= 0 && h < CAP))) {
    const prep: Op[] = h ? [{ q: CAP }, { r: 1 - h / CAP }, { q: h - CAP }] : [];
    const base = simulator(c, rule, k); base.run(prep); const prepared = { ...base.s }; const close = base.close();
    for (const u of points) for (const v of [.015625, .03125, .0625, ...points]) for (const f of [.125, .5, .875]) {
      const d = Math.min(u, v) * f;
      if (h + u > CAP || h + d - v < -CAP) continue;
      const cell = stairs(u, v, d, 1), sim = simulator(c, rule, k);
      Object.assign(sim.s, prepared, { cash: 0, volume: 0 }); sim.run(cell);
      const df = sim.s.f - prepared.f, gain = sim.s.cash + h * df;
      if (gain <= 0) continue;
      for (const n of [1, 16, 256, REPEATS]) {
        const half = base.s.cash + n * gain, volume = 2 * (base.s.volume + n * sim.s.volume);
        offer({ profit: 2 * half, volume, perUnit: 4 * half / volume,
          peak: Math.max(base.s.peak, sim.s.peak), how: `reservoir h=${h} u=${u} v=${v} d=${d} n=${n}; mirror` });
      }
    }
  }

  // ponytail: seeded coordinate search, not a global optimizer or a safety certificate.
  // Position targets and wait factors vary independently; leg counts vary between 3 and 32.
  for (let restart = 0; restart < 12; restart++) {
    let targets = Array.from({ length: [3, 6, 12, 24][restart % 4] }, () => [CAP * (2 * random() - 1), Math.exp(-5 * random())]);
    const toOps = (ts: number[][]): Op[] => {
      let p = 0; const ops: Op[] = [];
      for (const [next, r] of ts) { ops.push({ q: next - p }, { r }); p = next; }
      return ops;
    };
    let current = evaluate(c, rule, k, toOps(targets), "free targets; finite closure; mirror"); offer(current);
    for (let i = 0; i < 350; i++) {
      const next = targets.map(t => [...t]);
      if (random() < .04 && next.length < 32) next.splice(Math.floor(random() * next.length), 0, [CAP * (2 * random() - 1), Math.exp(-8 * random())]);
      else if (random() < .04 && next.length > 3) next.splice(Math.floor(random() * next.length), 1);
      else {
        const j = Math.floor(random() * next.length), axis = random() < .65 ? 0 : 1;
        const scale = .02 + .5 * (1 - i / 350);
        next[j][axis] = Math.max(axis ? 1e-12 : -CAP, Math.min(axis ? 1 : CAP,
          next[j][axis] + (2 * random() - 1) * scale * (axis ? 1 : 2 * CAP)));
      }
      const candidate = evaluate(c, rule, k, toOps(next), "free targets; finite closure; mirror"); offer(candidate);
      if (candidate.perUnit >= current.perUnit) { targets = next; current = candidate; }
    }
  }
  return best;
}

function verifyBest(c: Curve, rule: Rule, k: number, b: Best) {
  let ops = b.ops;
  if (!ops && b.how.startsWith("stairs")) {
    const [, u, v, d, n] = b.how.match(/u=(\S+) v=(\S+) d=(\S+) n=(\d+)/)!;
    ops = stairs(+u, +v, +d, +n);
  } else if (!ops && b.how.startsWith("reservoir")) {
    const [, h0, u, v, d, n] = b.how.match(/h=(\S+) u=(\S+) v=(\S+) d=(\S+) n=(\d+)/)!;
    const h = +h0, sim = simulator(c, rule, k);
    ops = h ? [{ q: CAP }, { r: 1 - h / CAP }, { q: h - CAP }] : [];
    const cell = stairs(+u, +v, +d, 1);
    for (let i = 0; i < +n; i++) ops.push(...cell);
    sim.run(ops); ops.push(...sim.close());
  }
  assert(ops);
  const sim = simulator(c, rule, k); sim.run(ops); sim.run(mirror(ops));
  const relativeError = Math.abs(sim.s.cash - b.profit) / (1 + Math.abs(b.profit));
  assert(relativeError < 2e-6, `${c.name} ${rule}: formula/replay mismatch ${relativeError}`);
  assert(Math.abs(sim.s.p) < 1e-7 && Math.abs(sim.s.x) < 1e-7 && Math.abs(sim.s.f) < 1e-5,
    `non-closed ${c.name} ${rule}: ${JSON.stringify(sim.s)}`);
  assert(sim.s.peak <= CAP + 1e-7);
  return relativeError;
}

function selfCheck() {
  const linear = curves[0], sat = curves[4], band = curves[1];
  const check = (c: Curve, rule: Rule, k: number, ops: Op[], expected: number) => {
    const s = simulator(c, rule, k); s.run(ops);
    assert(Math.abs(s.s.cash - expected) < 1e-7 * (1 + Math.abs(expected)), `${rule}: ${s.s.cash} != ${expected}`);
    return s;
  };
  const m1 = stairs(1, 2, .5, 26);
  check(sat, "M1", .25, [...m1, ...mirror(m1)], 65 / 4);
  check(band, "M4", .25, stairs(1, 1, .5, 8), 9 / 4);
  check(sat, "M4", .25, stairs(5, 5, .5, 1), 15 / 8);
  const prep: Op[] = [{ q: 16 }, { r: 1 / 8 }, { q: -2 }];
  const full: Op[] = [...prep];
  for (let i = 0; i < REPEATS; i++) full.push(...stairs(2, 1 / 8, 1 / 16, 1));
  full.push({ q: -28 }, { r: .5 }, { q: 14 });
  const m2 = check(linear, "M2", 5 / 64, [...full, ...mirror(full)], 3110 / 3);
  assert(m2.s.peak === 16 && Math.abs(m2.s.f) < 1e-7);
  const midpoint = (a: number, b: number) => {
    let sum = 0; for (let i = 0; i < 200; i++) sum += band.T(a + (i + .5) * (b - a) / 200);
    return sum * (b - a) / 200;
  };
  assert(Math.abs(midpoint(0, 2) + midpoint(2, 3) - midpoint(0, 3) - 9 / 80000) < 1e-12);
  // Independent identities catch sign errors, stale-F fill pricing, and false safe-region leaks.
  for (const c of curves) for (let trial = 0; trial < 12; trial++) {
    const ops: Op[] = []; let p = 0;
    for (let i = 0; i < 16; i++) { const next = CAP * (2 * random() - 1); ops.push({ q: next - p }, { r: .05 + .9 * random() }); p = next; }
    for (const rule of ["M0", "M2", "M3"] as Rule[]) {
      const k = rule === "M2" ? 1 / CAP : 1, sim = simulator(c, rule, k);
      sim.run(ops); sim.close(); assert(sim.s.cash <= 1e-6, `safe-region violation ${rule} ${c.name}`);
    }
    const m0 = evaluate(c, "M0", 0, ops, ""), m3 = evaluate(c, "M3", 3, ops, "");
    assert(Math.abs(m0.profit - m3.profit) < 1e-6 * (1 + Math.abs(m0.profit)));
    const m4Bound = [1, .1, 0, .5, 0, 0, 1 / 6, .25, 0, 0, .1][curves.indexOf(c)];
    assert(evaluate(c, "M4", m4Bound, ops, "").profit <= 1e-6);
    const s = simulator(c, "M1", .37); let gain = 0, loss = 0;
    const run = (o: Op) => { const before = { ...s.s }; s.step(o); if ("r" in o) { gain += before.p * (s.s.f - before.f); loss += c.V(before.x) - c.V(s.s.x); } };
    for (const o of ops) run(o);
    const h = s.s.p - s.s.x;
    for (const o of [{ q: -h - s.s.p }, { r: .5 }, { q: h }]) run(o);
    assert(Math.abs(s.s.cash - gain + loss) < 1e-6 * (1 + Math.abs(s.s.cash)));
  }
  console.log("Self-checks passed: rational witnesses, exact closures, M0=M3, M2 cap bound, loop identity.");
}
selfCheck(); seed = 0x5eed1234;
if (process.argv.includes("--checks-only")) process.exit(0);
const chosen = process.argv.find(a => /^M[0-4]$/.test(a));
const chosenCurve = process.argv.find(a => a.startsWith("--curve="))?.slice(8);
const parameters: Record<Rule, number[]> = { M0: [0], M1: [.25, .5, .6, .75, .9, 1], M2: [.5 / CAP, 1 / CAP, 1.25 / CAP, 2 / CAP], M3: [1], M4: [.1, .25, .5, .75, 1] };
const results: { curve: string; rule: Rule; k: number; best: Best; replayError: number }[] = [];
console.log(`|P| <= ${CAP}; scores = profit / total bought; mirrored exact finite loops; reservoir N <= ${REPEATS}.`);
console.log(`Includes all ${legacyOps.length} sim7 cap-${CAP} schedules, finite closure + mirror; seeded free schedules and analytic families.`);
for (const rule of Object.keys(parameters) as Rule[]) {
  if (chosen && rule !== chosen) continue;
  const ks = parameters[rule];
  console.log(`\n${rule}${rule === "M2" ? ` (column = lambda*${CAP})` : " (column = rho; M3 uses S=T)"}`);
  console.log(`| Curve | ${ks.map(k => rule === "M2" ? k * CAP : k).join(" | ")} |`);
  console.log(`|---|${ks.map(() => "---:").join("|")}|`);
  for (const c of curves) {
    if (chosenCurve && c.name !== chosenCurve) continue;
    const row = ks.map(k => {
      const best = search(c, rule, k), replayError = verifyBest(c, rule, k, best);
      results.push({ curve: c.name, rule, k, best, replayError }); return best.perUnit.toFixed(6);
    });
    console.log(`| ${c.name} | ${row.join(" | ")} |`);
  }
}
const jsonArg = process.argv.find(a => a.startsWith("--json="));
if (jsonArg) await Bun.write(jsonArg.slice(7), JSON.stringify({ cap: CAP, repetitions: REPEATS, seed: "0x5eed1234", results }, null, 2));
