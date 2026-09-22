// Worst-case taker profit (bps per unit, spread excluded) for candidate center rules.
// Curve T(phi): skew in bps for standing flow phi (units). h: half spread (bps).
type Curve = (phi: number) => number
const curves: Record<string, Curve> = {
  linear: (p) => 10 * p,
  band: (p) => (Math.abs(p) <= 2 ? 1 * p : Math.sign(p) * (2 + 10 * (Math.abs(p) - 2))),
  saturate: (p) => (Math.abs(p) <= 3 ? 10 * p : Math.sign(p) * 30),
}
const integ = (T: Curve, a: number, b: number) => {
  const n = 400
  let s = 0
  for (let i = 0; i < n; i++) s += T(a + ((i + 0.5) * (b - a)) / n)
  return (s * (b - a)) / n
}
// A rule quotes an ask price for cumulative unit x when buying, bid for unit x when selling,
// from state s; and evolves state over time. Prices exclude F0 (F tracked in state).
type State = { phi: number; F: number; pot: number; phiA: number; phiB: number }
type Rule = {
  buy: (s: State, q: number) => number // total paid for q, incl. state mutation
  sell: (s: State, q: number) => number // total received
  decay: (s: State, dt: number) => void
}
const tau = 1
const mk = (name: string, T: Curve, h: number): Rule => {
  const retraceCost = (s: State, q: number, dir: 1 | -1) => {
    const a = s.phi, b = s.phi + dir * q
    const amt = q * (s.F + dir * h) + integ(T, Math.min(a, b), Math.max(a, b))
    s.phi = b
    return amt // paid (dir=1) or received (dir=-1)
  }
  switch (name) {
    case 'retrace-rho0': // today minus position: retrace, decay, F fixed
    case 'retrace-rho1': // retrace, decay, F absorbs released skew fully
    case 'pot': { // retrace, decay, F absorbs mean paid impact
      return {
        buy: (s, q) => {
          const paid = retraceCost(s, q, 1)
          if (name === 'pot') { const t = T(s.phi - q); s.pot = (s.pot * Math.abs(s.phi - q) + Math.abs(t) * q) / Math.abs(s.phi) }
          return paid
        },
        sell: (s, q) => {
          const rec = retraceCost(s, q, -1)
          if (name === 'pot') { const t = T(s.phi + q); s.pot = Math.max(0, (s.pot * Math.abs(s.phi + q) - Math.abs(t) * q) / Math.max(1e-9, Math.abs(s.phi))) }
          return rec
        },
        decay: (s, dt) => {
          const before = T(s.phi)
          s.phi *= Math.exp(-dt / tau)
          if (name === 'retrace-rho1') s.F += before - T(s.phi)
          if (name === 'pot') { const spend = s.pot * (1 - Math.exp(-dt / tau)); s.F += Math.sign(s.phi) * spend; s.pot -= spend }
        },
      }
    }
    case 'per-side': // each side its own flow; F fixed
      return {
        buy: (s, q) => { const c = q * (s.F + h) + integ(T, s.phiA, s.phiA + q); s.phiA += q; return c },
        sell: (s, q) => { const r = q * (s.F - h) - integ(T, s.phiB, s.phiB + q); s.phiB += q; return r },
        decay: (s, dt) => { s.phiA *= Math.exp(-dt / tau); s.phiB *= Math.exp(-dt / tau) },
      }
    case 'clip-F': // retrace, decay, un-pushed side clipped at F (never above F for bids, never below for asks)
    case 'clip-2h': { // same, clipped at F+h for bids (retrace up to the full spread): unsafe
      const cap = name === 'clip-F' ? 0 : h
      return {
        buy: (s, q) => { // unit x at price max(F + T(phi+x), F - cap) + h
          const n = 200; let c = 0
          for (let i = 0; i < n; i++) { const x = s.phi + ((i + 0.5) * q) / n; c += Math.max(s.F + T(x), s.F - cap) + h }
          s.phi += q; return (c * q) / n
        },
        sell: (s, q) => {
          const n = 200; let r = 0
          for (let i = 0; i < n; i++) { const x = s.phi - ((i + 0.5) * q) / n; r += Math.min(s.F + T(x), s.F + cap) - h }
          s.phi -= q; return (r * q) / n
        },
        decay: (s, dt) => { s.phi *= Math.exp(-dt / tau) },
      }
    }
  }
  throw new Error(name)
}
const fresh = (): State => ({ phi: 0, F: 0, pot: 0, phiA: 0, phiB: 0 })
// Strategies: sweep-hold-sweep; split-buy then sweep-sell; sweep-sell then split-buy; reversal against standing skew;
// and the same with a third party flipping the skew during the hold.
function worst(name: string, T: Curve, h: number) {
  const r = mk(name, T, h)
  let best = -Infinity, how = '', bestF = -Infinity, howF = ''
  const qs = [0.5, 1, 2, 4, 8, 16], holds = [0, 0.25, 1, 3, 10], ns = [1, 4, 16]
  const stand = [0, 4, 16] // third-party standing flow before the taker
  for (const q of qs) for (const t of holds) for (const n of ns) for (const st of stand) for (const flip of [0, 1, -1]) for (const first of ['buy', 'sell'] as const) {
    const s = fresh()
    // third party builds standing flow
    if (st > 0) r.buy(s, st)
    let pnl = 0
    const leg = (dir: 'buy' | 'sell', size: number) => (dir === 'buy' ? (pnl -= r.buy(s, size)) : (pnl += r.sell(s, size)))
    const other = first === 'buy' ? 'sell' : 'buy'
    for (let i = 0; i < n; i++) { leg(first, q / n); r.decay(s, t / n) }
    if (flip) { // third party pushes hard in one direction, then time passes
      const dir = (flip === 1) === (first === 'buy') ? 'buy' : 'sell'
      dir === 'sell' ? r.sell(s, 3 * (st + q)) : r.buy(s, 3 * (st + q)); r.decay(s, t)
    }
    leg(other, q)
    const per = pnl / q
    const tag = `q=${q} hold=${t} split=${n} standing=${st} first=${first}`
    if (flip === 0) { if (per > best) { best = per; how = tag } } else if (per > bestF) { bestF = per; howF = tag + ` flip=${flip}` }
  }
  return { best, how, bestF, howF }
}
const h = Number(process.argv[2] ?? 0)
console.log(`half-spread h=${h} bps; profit in bps/unit (positive = pump)`)
for (const rule of ['retrace-rho0', 'retrace-rho1', 'pot', 'per-side', 'clip-F', 'clip-2h'])
  for (const [cn, T] of Object.entries(curves)) {
    const w = worst(rule, T, h)
    console.log(`${rule.padEnd(13)} ${cn.padEnd(9)} own:${w.best.toFixed(1).padStart(7)}  ${w.how.padEnd(48)} 3rd:${w.bestF.toFixed(1).padStart(7)}  ${w.howF}`)
  }
