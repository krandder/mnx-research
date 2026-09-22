# Research brief: when may a decaying-liquidity AMM move its center without a money pump?

You are a mathematician. Produce theorems with proofs, or explicit counterexamples, for the model below. Where a claim resists proof, state it as a conjecture with the strongest partial result you can prove and the numerical evidence. Write plainly. Output a single markdown file. No code beyond what you need to check a claim; the simulation files sim7.ts and sim8.ts in this directory show the search that produced the tables (bun runs them; `bun sim7.ts`).

## Model

State: Φ ∈ ℝ (standing flow, units), F ∈ ℝ (center, bps), P ∈ ℝ (net units the trader holds; the market maker holds −P).
Curve: T: ℝ → ℝ, odd, increasing, T(0) = 0, piecewise smooth. Potential V(x) = ∫₀^x T, even, increasing in |x|.
Price for the next infinitesimal unit: R = F + T(Φ) (variants below add a term).
A trade of dq (signed) moves Φ and P by dq and costs the trader ∫ R over the walk: F·dq + [V(Φ+dq) − V(Φ)]. The walk retraces: selling after buying walks the same curve back.
Between trades (a "wait" of duration t) the state evolves autonomously: Φ → Φ·e^{−t/τ}, and F moves by a rule.
Spread is zero. There is one trader, starting from rest: Φ = 0, P = 0, F = F₀.
A loop is a finite sequence of trades and waits with P = 0 at the end. "Exact loop": Φ and F are also back at their start values (after a final long wait, Φ = 0 and F = F₀). "From rest, any end": only P = 0 is required.
A rule is safe if the trader's profit on every loop is ≤ 0.

Loop identity (prove it first): on an exact loop, profit = Σ over waits of [ −P_k·ΔF_k + (V(Φ_before) − V(Φ_after)) ]... with signs so that a fair moving toward the trader's position is a gain and the potential lost to decay is a loss. State it precisely and prove it; note what changes for non-exact loops.

## Mechanisms for F (and for the position)

M0. F fixed. Claim: safe for every T on exact loops and from rest. Prove.
M1. Fair-absorption: during a wait, F changes by ρ·(T(Φ_before) − T(Φ_after)), 0 ≤ ρ ≤ 1. Numerically safe for ρ ≤ 1 on linear T, ρ ≲ 0.9 on saturating T, ρ* between 0.25 and 0.6 on band curves (see table below). Tasks: (a) prove ρ ≤ 1 suffices for linear T; (b) find ρ*(T) exactly, at least for the two-slope band T(x) = a₀x on |x| ≤ B, a₀B + a(|x| − B) beyond, and for the saturating T(x) = a·min(|x|, Q*)·sign(x); (c) identify the worst loop; (d) conjecture the general functional ρ*(T) (a guess to test: ρ* = inf over q and partitions of [2V(q)/q − something] / T(q)); (e) is ρ* = 1 possible for any non-linear T?
M2. Fill-driven fair: during a trade, dF = λ·|T(Φ)|·dq (signed dq; F moves in the trade's direction by λ times the current skew magnitude), F unchanged during waits. Numerics: from-rest profit < 1 bp/unit for λ·cap ≤ 1 on all shapes, pump for λ·cap ≥ 2. Tasks: prove the safe region, or show the residual is a true small leak and bound it; explain why curvature drops out.
M3. Standing position skew: R = F + T(Φ) + S(P), S odd increasing, charged on the ladder (the walk integrates T; S(P) shifts the whole ladder and is retraced when P returns). F fixed. Claim: safe for every S and T (potential argument). Prove or refute.
M4. Handoff: R = F + T(Φ) + S(P − Φ). Fills leave P − Φ unchanged; decay moves Φ into P − Φ. Numerics: unsafe for every curved T at ρ ≥ 0.25 with S = ρT, including saturating T; safe only for linear T with S = T. Tasks: prove the sweep bound q·S(q) ≤ 2V(q), explain the lag mechanism, and characterize the safe S given T (conjecture: none besides the linear case reaches S = T).

## Numerical tables (bp per unit, spread 0; positive = trader profit; from `bun sim7.ts`, exact loops, M1)

| curve | ρ=0.25 | 0.5 | 0.6 | 0.75 | 0.9 | 1 |
|---|---|---|---|---|---|---|
| linear a=10 | −0.5 | −0.3 | −0.3 | −0.2 | −0.1 | 0.0 |
| band B=2, a₀=1, a=10 | 0.1 | 6.2 | 14.4 | 27.8 | 41.2 | 52.7 |
| band B=2, a₀=0 | 2.1 | 10.6 | 19.6 | 33.2 | 46.7 | 55.7 |
| band B=2, a₀=5 | −0.2 | −0.2 | −0.1 | 6.3 | 21.1 | 37.4 |
| sat Q*=3, a=10 | −0.5 | −0.3 | −0.3 | −0.2 | −0.1 | 0.0 |
| sat Q*=1, a=10 | −0.5 | −0.3 | −0.3 | −0.2 | 0.6 | 3.3 |

## Deliverable

One markdown file, sections: 1 loop identity (theorem + proof); 2 M0; 3 M1 with ρ*(T) results, proofs, worst loops, the general conjecture; 4 M2; 5 M3; 6 M4; 7 the map of the design space: for each mechanism and curve family, safe / safe-up-to-a-bound / unsafe, with the bound; 8 open questions, ranked. Be explicit about what is proved and what is conjectured. Prefer a sharp theorem for a special case over a vague general claim.
