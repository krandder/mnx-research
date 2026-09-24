# MNX-131 — slow-curve shape, event loss and sizing

Research brief 5; calculations against the supplied 2026-09-24 parameter snapshot. Dollar losses are positive costs to the MM. No production parameters were changed.

**Verdict.** Choose the steepening slow curve, far slope factor **4**, knee **0.20 log-odds**, with far coordinate liquidity **D0/4**. Concavity does the opposite of the required risk control: it sells more inventory into large information moves and forces a much smaller near-fair depth for the same reserve. Linear is a defensible fallback. Do **not** approve the RSENATE 5× proposal against these budgets: even its initial two-channel election sweep becomes **$16.1k** when marked at YES resolution, and a feasible hold-through-slew round trip earns **$15.6k**. A $2.5k *to-resolution* expectation also needs a terminal-information allowance; the reference's event counts alone omit it. The binary sizes below pass both the news stress reserve and a frozen-anchor terminal-information budget. TAKEOFF needs its own-mark feedback removed for those guarantees to apply; PNP27 should launch with an independent or fixed anchor. LABREV cannot have a finite $15k worst case with a positive symmetric position cap and no upper settlement bound. Its numerical stress size is useful, but is not a worst-case-approved size.

## Numbers for the operator

These are rounded **down** from the guarded sizing calculation. Near liquidity is YES traded notional per 1¢, evaluated at the quoting anchor. All four use K=0.20, far factor 4; flow depth remains D0/4, 100-bps total spread and a 5-hour flow e-fold. Caps are absolute **net MM inventory** limits in units, not order-size or gross-turnover limits.

| Market | D0 units / 1% | D_flow | Net cap units | Near $ / 1¢ | News reserve $ | Expected terminal envelope $ | Frozen-anchor worst $ | Condition on approval |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| ANTHTOP26 | 108.42 | 27.105 | 15,780 | 312 | 1,693 | 2,500 | 3,854 | Anchor 0.6529; true initial probability 0.62; start flat |
| RSENATE26 | 111.88 | 27.970 | 16,310 | 171 | 1,709 | 2,500 | 3,998 | Conservative frozen-anchor fallback; continuing external reprices require a cumulative loss ledger |
| TAKEOFF | 122.48 | 30.620 | 18,784 | 170 | 1,936 | 2,500 | 5,139 | Remove own-quote contribution to fair; otherwise the lifetime bound fails |
| PNP27 | 128.25 | 32.0625 | 27,787 | 132 | 2,500 | 537 | 13,055 | Assumed p=0.03; fixed or independent anchor; hypothetical listing |
| LABREV | **0 for an unconditional symmetric guarantee** | — | **0** | — | — | — | 0 | A nonzero size needs an enforced settlement bound or a separately specified loss-limiting mechanism |

For LABREV, the **conditional ±50% stress candidate** is D0=2.3116, D_flow=0.5779, cap=63.28 units, approximately **$454 per 1%**, news reserve $2,500 and ±50% paced loss **$4,083 each way**. Its actual worst case is **unbounded**. A halt after prices move does not itself cap the loss on existing short inventory.

The $15k number is a ceiling, not a target that should be spent. The common binaries hit the expected terminal budget first. PNP27's much smaller initial probability makes its adverse YES outcome the important tail constraint. Sizes based only on the reference's news-count proxy are larger; the complete comparison appears below.

## What was checked and what is assumed

Inputs come from [the brief](RESEARCH-BRIEF-5.md) and [the RSENATE proposal](RSENATE26-deeper-liquidity-proposal.md). The independent calculation is [Z-sizing.py](Z-sizing.py), with full-precision output in [Z-sizing-results.json](Z-sizing-results.json). It does not import or call [sizing.py](sizing.py). The canonical wiki was searched first; no matching market-parameter dossier was found. `UNIFIED_IMPACT_PERMANENCE_PROPOSAL.md` was not present in the searched local trees, so this report tests the §2.6.5 shape **as specified in the brief**, not an independently inspected implementation of that document. The local Linear read was unavailable because network DNS was blocked; no issue state was changed.

The local MM implementation resolves two ambiguities in the reference:

* [quote.ts](/home/kelvin/flow-deploy/market-maker/packages/mm-core/src/quote.ts:84) applies the 2000-bps dead band to **raw flow impact**, not to slow impact. [sizing.ts](/home/kelvin/flow-deploy/market-maker/packages/mm-core/src/sizing.ts:191) explicitly inverts `a*q + max(0,b*q-r)`. Thus the instant knee is at **0.05** slow log-odds today, not 0.20.
* Ordinary futures use **relative price**, `F*(1-skew)`, not `exp(log(F)-skew)`. The same files establish this. LABREV therefore uses relative-price coordinates here. Its K=0.20 / 0.50 sensitivities mean **20% / 50% price displacement**. Log price is not an equivalent convention for a 50% move. The ordinary-market implementation also has skew clamps whose configured values were not supplied; numerical LABREV curves assume the brief's unclamped model.

Every isolated event starts with zero inventory, zero flow and zero curve basis, and has immediate access to the stated marginal curve. Existing positions, their entry cash, pending orders, nonzero basis and flow require a new state-specific calculation. In particular, ANTHTOP's **0.62 true starting probability** and **0.6529 fixed quoting source** are kept distinct: targets are 0.62±jump, but execution starts at 0.6529. If 0.62 is actually the reservation center created by existing inventory/basis, neither a flat 0.62 book nor a flat 0.6529 book reconstructs its existing P&L. The aligned-0.62 sensitivity is included in the JSON. PNP27 uses TAKEOFF's supplied D=165 and cap=91,400 as its hypothetical baseline; “scaled like TAKEOFF” is otherwise underdetermined.

Execution has a half-spread h=0.005 **in coordinate units**, not half a cent. Binary dollar endpoints are bounded by 0 and 1. The scenario targets are:

| Market | +10 / −10 | +20 / −20 | +50 / −50 |
| --- | --- | --- | --- |
| ANTHTOP26 | .72 / .52 | .82 / .42 | **1.00** / .12 |
| RSENATE26 | .445 / .245 | .545 / .145 | .845 / **0.00** |
| TAKEOFF | .38 / .18 | .48 / .08 | .78 / **0.00** |
| PNP27 | .13 / **0.00** | .23 / **0.00** | .53 / **0.00** |
| LABREV | 216.15 / 176.85 | 235.80 / 157.20 | 294.75 / 98.25 |

Bold endpoints are clipped moves, not full nominal 10¢/20¢/50¢ changes. Unlike the reference, a true terminal probability is not changed to 1% or 99%. The **execution-edge** comparison does use 1%/99%, as in the proposal, and is separately marked at resolution 0/1. Sizing uses the more conservative **all-the-way-to-cap** loss, including any permitted trading beyond those edges.

## Independent derivation

Let q be signed inventory acquired **by traders from the MM**; MM inventory is −q. Put b=100 D0 and u=q/b. For far slope factor r and knee K, define

\[
c(u)=\operatorname{sgn}(u)\{\min(|u|,K)+r(|u|-K)_+\},\quad C(q)=c(q/b).
\]

The knee quantity is bK. Beyond it, **impact slope is multiplied by r** and depth is **divided by r**. C25 means r=.25, hence far depth 4D0; L means r=1; S4 means r=4, hence far depth D0/4. The sensitivity set also uses r=.5 and 2, each at K=.2 and .5. Linear does not depend on K, so its identical K=.5 row is not duplicated.

The positive liquidity floor is in **log-odds coordinate density**, not constant shares per cent at all probabilities. [M-space.md, construction M2–M6](M-space.md) provides a mathematical example of globally steepening impact with a positive far density. It supports feasibility of that shape, not an empirical calibration of the factor 4; the numerical risk comparisons here justify that operator choice within the requested candidate set.

For signed normalized flow φ, today's fast channel is

\[
T(\phi)=\operatorname{sgn}(\phi)(4|\phi|-.20)_+,\qquad
d\phi=du-\phi\,dt/(5\mathrm h).
\]

The flow dead-band quantity is **.05b=5D0 units**. Outside it today's linear instant slope is 5/b, so its depth is D0/5. The supplied pif=.2 is the ratio of permanent to total marginal impact there; **do not multiply losses by .2 again**. Keeping D_flow=D0/4 while changing the slow tail makes the far permanent fraction r/(r+4): .0588 for C25 and .5 for S4. Holding pif=.2 at every tail point would require changing the fast curve too and is a different design.

For a binary anchor f and direction d∈{+1,−1}, marginal execution price on a paced walk is

\[
\pi_d(u)=\sigma(\operatorname{logit}f+d[c(u)+h]),\quad u\ge0.
\]

For LABREV it is \(\pi_d(u)=f[1+d(c(u)+h)]\). Write a=cap/b. The optimal paced endpoint is the first equality π_d(u)=v, or a if reached first; no trade occurs if the initial quote is already unprofitable. Thus

\[
Q_d=b\,\min\{a,c^{-1}([d(x_v-x_f)-h]_+)\},\qquad
L_d(v)=b\int_0^{Q_d/b}d[v-\pi_d(u)]\,du.
\]

For LABREV replace \(d(x_v-x_f)\) by \(d(v/f-1)\). For binary v=0/1, use the appropriate infinite coordinate and stop at the cap. On a segment with coordinate A+s u,

\[
\int\sigma(A+s u)du=\frac{\log(1+e^{A+s u})}{s};
\]

the future integral is a quadratic polynomial. The code splits at every slow/flow knee, then evaluates these primitives exactly. There is no Euler stepping of C and no minimum one-unit trade.

For the linear, uncapped binary, letting \(f_d=\sigma(\operatorname{logit}f+dh)\), a profitable walk gives

\[
L_d(v)=b\,D_{KL}(\mathrm{Bern}(v)\Vert\mathrm{Bern}(f_d)).
\]

This is an independent identity used as a numerical check. The connection between a cost-function market and a logarithmic scoring rule is described by [Hanson's original paper](https://mason.gmu.edu/~rhanson/mktscore.pdf); the piecewise curves and transient calculations here are derived directly, not taken from that paper.

For a binary, the requested resolution stress is

\[
W_+=b\int_0^{a_+}(1-\pi_+(u))du,\qquad
W_-=b\int_0^{a_-}\pi_-(u)du.
\]

Use a_d=min(a, quantity-to-1%/99%-edge divided by b) for the edge table; use a_d=a for the hard cap envelope. W=max(W_+,W_-). The finite-cap integral, rather than current position notional, is the loss. Without a cap or spread, the linear limits are \(-b\log f\) and \(-b\log(1-f)\). A finite positive far slope preserves finite binary loss; concavity increases its coefficient considerably.

Near a binary anchor, \(dq/dp=b/[p(1-p)]\), so **units/1¢=D0/[p(1-p)]** and **YES notional/1¢=D0/(1-p)**. NO/complement notional is D0/p; it is a different number, especially for PNP27. LABREV's near notional/1%=f D0. These are derivatives of the slow curve at flat inventory, not quantities guaranteed to be displayed on one price-grid rung.

## Expected loss, the terminal event and how sizing is selected

There is no measured jump-frequency data set in the brief. One flat Polymarket day cannot establish the rate of election or scientific-resolution tails. Treating 4×10¢, 1×20¢ and .2×50¢ as an empirically calibrated expectation would be unjustified.

For comparison, this report retains a transparent **gross news-markout stress model**: over the remaining budget horizon, independent Poisson counts have means (4,1,.2); each episode is assigned up/down probability 1/2 and starts from the displayed reference state. Its budget functional is

\[
E_N=4\bar L_{10}+\bar L_{20}+.2\bar L_{50},\qquad
\bar L_j=(L_{j,+}+L_{j,-})/2.
\]

There are 5.2 expected episodes; the chance of at least one nominal 50¢ episode is 1−exp(−.2)=18.1%. The rates per day are these counts divided by the remaining horizon, not identical daily rates for an election and a market running through 2027. It is a useful deliberately heavy-tail reserve: one material headline per several weeks, a larger repricing and a substantial tail allowance. It is **not** a fitted forecast. For LABREV, .1/.2/.5 mean relative-price jumps. ANTHTOP's already stale anchor is retained in every isolated event, conservatively charging the mismatch repeatedly; its one-time no-news paced correction alone costs **$31.15** at today's depth.

This stress construction is not a coherent martingale path for clipped binaries. For example, PNP27's fair .03 cannot support equally likely .13 and 0 posteriors while remaining a calibrated .03 probability. A martingale first-step weighting would use

\[
\Pr(\mathrm{up})=(p-p_-)/(p_+-p_-),
\]

which is 23.1%, 13.0%, 5.66% for PNP27's three upward jump sizes. Repeated moves also absorb at resolution and do not reset inventory for free. Accordingly **E_N is reported as a stress reserve**, not silently represented as realized expected P&L to settlement. Directionally hostile information, an underpriced launch and repeated operator re-anchoring are reasons to retain this conservative overlay rather than increase PNP liquidity on a thin actuarial assumption.

The defensible frozen-anchor **to-resolution information model** is separate: Y∼Bernoulli(p0), and an informed trader can eventually learn Y while the maker is still quoting long enough to pace to its cap. Its expected maximal loss is

\[
E_T=p_0W_++(1-p_0)W_-.
\]

This is both a clear pessimistic expectation and an upper envelope for less-than-perfect information in the frozen-anchor model. The same potential that bounds W bounds the entire path; independent news episodes do **not** repeatedly replenish this subsidy. Event frequency affects timing and transient execution, not that terminal frozen-anchor bound. This avoids adding the same inventory loss again at every news mark and at resolution. If the maker reliably stops before final information is tradable, one can replace the terminal model by an explicitly justified smaller exposure probability; none was supplied. It is particularly inappropriate to omit terminal information entirely for a fixed fair.

The operator table satisfies **both** E_N≤$2,500 and E_T≤$2,500, i.e. it budgets against max(E_N,E_T) across these two alternative risk models. It does not claim that their maximum is an expectation under a single joint stochastic process, or that it bounds a repeatedly re-anchored self-referential book. The proxy-only table budgets E_N alone. For ANTHTOP/RSENATE/TAKEOFF at proxy-only S4 sizing, E_T is **$3,691 / $3,657 / $3,228**, respectively; this is why the guarded table is smaller.

D0 and cap are not uniquely identified by two upper limits: a vanishingly small cap can support an arbitrarily large headline near-fair depth. The sizing rule here chooses **coverage first**. At each (K,r), let a_edge be the normalized quantity needed to reach the farther 1%/99% quote edge. Choose the largest a≤a_edge for which, after scaling b to the $2,500 expected envelope, bW(a)≤$15,000. If W binds, solve W(a)/E(a)=6. Otherwise retain full edge coverage. Then

\[
D0=2500/[100E(a)],\qquad cap=100D0\,a.
\]

Here E(a),W(a) are per-unit-b quantities. This is a specified coverage/liquidity tradeoff, not a claim of a unique economic optimum. The worst-case constraint uses **cap loss**, even when the nearer quote edge is reached first. LABREV's illustrative a_edge instead reaches the requested ±50% stress; its corresponding “W” is explicitly only that stress.

All knee/factor and half/double-frequency re-solves are tabulated below. If the news reserve alone binds and the normalized range is unchanged, halving counts doubles D0 and cap; doubling counts halves them. If the worst cap binds, the normalized range changes too, so inverse scaling is wrong. If E_T binds, halving news frequency buys **no** extra depth. For the recommended S4 curve, guarded D0 at half/base/double counts is:

| Market | Half | Base | Double |
| --- | ---: | ---: | ---: |
| ANTHTOP26 | 108.423 | 108.423 | 80.030 |
| RSENATE26 | 111.884 | 111.884 | 81.834 |
| TAKEOFF | 122.486 | 122.486 | 79.083 |
| PNP27 | 282.030 | 128.256 | 64.128 |

At half counts, PNP27's much larger near depth is accompanied by a **smaller cap, 16,002 units**, with W at $15k. This illustrates why both knobs must be shown together. A cumulative dollar-loss ledger is necessary whenever fair is re-anchored or risk limits are reset; a per-event cap does not bound the sum of separately funded episodes. Five separate $15k limits also permit $75k aggregate loss if tails coincide.

## Informed strategy: paced, sweep, refill and reversal

**With a frozen anchor, paced is optimal for every tested shape**, including against strategies that reverse direction, provided fills charge the marginal-curve integral and the initial state is at rest. For monotone buying, T≥0 only makes execution more expensive; for monotone selling it only makes receipts lower. The trader stops at true value or cap. Concavity changes the number of profitable units; it does not create a better strategy than avoiding transient impact.

There is also a global argument. In this proof only, φ is flow **in units**, with T rescaled accordingly, so fills move dq=dφ. Suppress spread initially, let R(q,φ)=V(F+C(q)+T(φ)), A(q)=∫₀^qR(z,0)dz and define

\[
G(q,\phi)=A(q-\phi)+\int_0^\phi R(q-\phi+z,z)dz.
\]

Fills move dq=dφ and charge dG. At fixed q,

\[
G_\phi=\int_0^\phi V'(F+C(q-\phi+z)+T(z))T'(z)dz
\]

has φ's sign, so exponential relaxation decreases G, and G(q,φ)≥A(q). Therefore total paid cash≥A(q_final) and informed profit≤vq_final−A(q_final), maximized by the paced walk. For a final long position use this potential with F+h: buys are exactly priced, while actual bid executions on any sells only increase cash cost relative to its ask-priced integral. Use F−h for a final short. Thus the claim includes the stated spread and arbitrary finite reversals. It requires a fixed F and starts from zero stored transient; it is not an “all initial states” theorem. The local [H-concave analysis](H-concave.md) explains the relevant distinction between a rest-state guarantee and extraction from an inherited transient.

Pacing need not literally reset φ to zero. It can consume the free-flow band 5D0 units once and then trade at **D0 units/hour**, keeping φ at its band edge. A zero-fast-impact walk of Q units therefore needs at least (Q−5D0)_+/D0 hours under this ideal control. Today's RSENATE slow walk to .95 requires about **15 days**, versus roughly 20 minutes of supported feed catch-up. Small slices at high frequency still accumulate flow; slicing alone does not eliminate it.

An initial sweep pays the instant C+T curve. A sweep followed by refills as flow decays can gain further markout, but never more than paced at fixed F. The tables simulate one initial sweep and **72 hourly** refill sweeps; they are a precisely defined strategy, not a claimed optimum at 72 hours. Continuous competitive refills at the true price have zero incremental markout even while inventory grows; a longer wait creates a larger price gap to harvest. Refilling does not make the original transient execution cost disappear. The main tables provide paced / initial sweep / hourly-refill loss for both directions of every requested scenario and sensitivity.

Changing fair breaks the fixed-F proof. Buying, holding through an externally predictable fair move, then selling can outperform the initial markout, even when some entry trades are temporarily above true value. It is a bet on future MM quotes. The RSENATE table below supplies a reproducible two-trade example; it is optimized **within that family**, not labeled a solution of the unrestricted finite-horizon control problem. Actual optimal timing then depends on replacement cadence, available inventory and other arbitrageurs, none of which the brief fixes.

## Own-mark EMA: information recovery versus feedback losses

A correct independent fair moving toward new information reduces future stale executions. It does **not** reverse the cash loss on inventory already acquired; marking that inventory against the MM's own rising mark is not economic recovery. Once fair includes the information and the inventory skew still represents the same information, the book can overshoot and expose the other side.

For the specified own-mark source, the more serious issue is feedback. Take the 7-day EMA as a **price EMA with a 7-day e-fold**, and let the MM dominate its own mark. After flow has decayed, a held trader long q leaves

\[
M=\sigma(\operatorname{logit}F+C(q)),\quad \dot F=(M-F)/(7\mathrm d)
\]

for a binary, or M=F(1+C(q)) for the future. Positive C makes F rise although no independent news arrives; negative C makes it fall. In log-odds, the binary drift is approximately C/(7d) for a small displacement. For the ordinary future, F(t)=F(0)exp(Ct/(7d)). This is a moving anchor chasing its own inventory premium, not an external signal converging to a fixed truth.

A small round trip already suffices. Buy q=.05b=5D0, so the flow channel stays in its band, hold seven days, then sell the same q. It is below every tested slow knee, so **all shapes** share this example. The exact price-EMA simulation gives TAKEOFF: q=825, F .28→.290300, profit **$6.89**; LABREV: q=12.5, F 196.5→206.574770, profit **$103.89**. If PNP inherits that source, q=825 gives F .03→.031526 and **$1.04**. These examples charge both spreads; 7 days is over 33 flow e-folds. They assume the quote midpoint is the EMA target; the exchange mark's exact median/print construction changes the numbers, but not the drift sign when the skew exceeds the spread. A “7-day half-life” instead of e-fold slows the example by ln2 and must not be silently substituted.

Thus an ordinary directional information trade can see further losses reduced as fair catches up, while a strategic holder can **deepen realized MM losses over days by exploiting the feedback**. Mirrored hold/unwind episodes can move the anchor back again. A net position cap limits each episode; it does not give a lifetime dollar bound on repeatable cycles. This agrees with the own-mark warning in [CHOICE-B-REVIEW.md](CHOICE-B-REVIEW.md), but the example above uses today's two-channel rule and is independently calculated. Remove the MM's own inventory/flow/spread contribution from the fair target, or use a fixed/independent target, before claiming the frozen-anchor sizing guarantee.

## RSENATE26: what the feed actually protects

With today's **linear** slow curve, initial flow zero and raw flow band B=.20,

\[
I(u)=u+(4u-.20)_+=\begin{cases}u,&u\le.05\\5u-.20,&u>.05.\end{cases}
\]

For coordinate gap δ=|logit(v)−logit(.345)|−h, a profitable initial sweep fills bδ when δ≤.05, and b(δ+.20)/5 otherwise, capped by inventory. Integrating price across those two segments produces the initial-sweep table; it is **not** the pure slow KL loss scaled blindly by pif.

Conditional on a continuously supported source moving at 3¢/minute, F(t)=.345+d min(.03t,|v−.345|), with t in minutes. Catch-up takes 3.33 minutes for 10¢, 6.67 for 20¢ and **20.17** for .95. Fair moves in **probability**, not at constant log-odds speed. Throughout these jumps, |d logit(F)/dt|≥.12/min; initial-flow relaxation is at most about .030/min for the listed .01/.95 targets. Therefore after an initial one-sided sweep, fair catches up faster than relaxation reopens that same-side opportunity: no further same-direction refill is available during the ideal ramp. Once the fair overshoots the inventory-adjusted quote, opposite-side opportunities can appear.

“3 ticks/minute” is a **maximum slew**, not a guaranteed minimum catch-up speed. [The fair provider](/home/kelvin/flow-deploy/market-maker/src/fair-price.ts:776) only moves toward a supported bid/ask boundary and retains the old anchor without directional support. Consequently these are conditional lag figures. A fresh but unsupported/stuck source can remain old without triggering staleness. The 30-second rule cancels on stale input; it does not cancel a fresh input solely because its fair is slewing. A complete 30-second source stall followed by cancellation does not allow hours of pacing: in the ideal curve, one additional sweep after 30 seconds adds less than **$0.003 at 1×** for the listed finite targets. Unknown order replacement races are outside that figure.

For election night, today / 5× / 10× gives:

| Exposure | Today | 5× | 10× |
| --- | ---: | ---: | ---: |
| Initial two-channel sweep, true v=.95 | $2,680 | $13,399 | $26,797 |
| Same filled position marked at YES=1 | $3,213 | **$16,064** | $32,128 |
| Filled units in that sweep | 10,661 | 53,305 | 106,611 |
| Feasible optimized entry/hold/unwind family, realized loss | $3,130 | **$15,648** | $31,296 |
| Entry units in that two-trade family | 18,843 | 94,216 | 188,432 |
| Supplied net cap | 74,000 | 369,000 | 738,000 |
| Frozen-fair paced loss to .95 | $11,712 | $58,559 | $117,117 |
| Frozen-fair adverse resolution after cap walk | $14,820 | $74,090 | $148,179 |

Neither entry strategy hits the cap. The fast slope and available stale-quote window bind first; reducing a 369k cap to, for example, 200k would not protect against either listed 5× election trade. A finite displayed ladder may bind earlier, as described below. The frozen-fair case is a different failure mode and must not be described as the normal 20-minute lag loss.

The separate v=0 row is the mathematical limit for the clipped −50¢ scenario. In the continuous curve, every positive bid is still profitable against zero, so that row does reach the cap, although remote fills add almost no dollar loss. Its fair-ramp/round-trip entries use the pre-resolution limit F→0; actual resolution or cancellation removes subsequent executions. A venue price floor and forty displayed levels also prevent interpreting that quantity as one live book sweep.

The hold-through-slew calculation buys signed q at F0 along C+T, waits t*=|v−F0|/.03, then unwinds at F1=v. At exit the signed flow is P−q(1−exp(−t*/300)); the code integrates that actual shifted transient on the way back. It includes both spreads and optimizes the entry quantity. There is a known future anchor move, so paced dominance from the previous section does not apply. These profits assume access to replenishing curves and absence of competing arbitrage that would remove the later overpriced quotes.

There is nevertheless a conservative **all-strategy bound** for a *single monotone ramp*, starting flat and ending at the true value. For current linear C(q)=q/b, use the potential above with a variable log-odds anchor x. Let J=q−φ be the exponentially averaged position. Since J and q remain within ±cap, maximizing G_x for an upward ramp sets q=cap≥J. Along that fill path total impact slope is at least 1/b; hence

\[
G_x\le b[1-\sigma(x)],\quad
\Pi_{\rm all}\le b\int_{x_0}^{x_1}[1-\sigma(x)]dx
=b\log(v/F_0).
\]

The downward counterpart is \(b\log[(1-v)/(1-F_0)]\). Terminal profit relative to the final fair is nonpositive after subtracting the potential, transient decay dissipates value, and spread only reduces profit. This bound includes arbitrary reversals and predictable fair-shift harvesting. It is deliberately loose, independent of slew duration, and applies to **today's linear C**; it is not the sharper initial-sweep figure. Both the bound and a feasible attack are tabulated below so a one-sweep calculation is never misrepresented as the maximum over all strategies. Repeated upward and downward external reprices require adding their risk allocations.

### Audit of the deeper-liquidity proposal

The proposal's **$215 / $1,076 / $2,153 per 1¢** figures are correct slow-curve YES notionals at .345. Its near-center **$243 / $1,216 / $2,432** are also consistent with today's actual .05 slow-coordinate instant knee: band quantity 5D0 times .345. They do not identify the proposed slow knee K=.20.

Its **74k / 369k / 738k caps** approximately reach .99 on the **linear slow curve**, ignoring flow and small spread/rounding differences. They are not caps derived from a $15k worst-loss constraint, and they do not transfer unchanged to a nonlinear slow curve. The notional multiplications at .99 are arithmetically right; exchange-cap enforcement and the distinction between YES notional and short collateral cannot be verified from that table alone.

The proposal's $301/$1,176/$11.8k single-market losses are approximately the **zero-spread pure-slow KL calculations** for +10¢/+20¢/.95. Their 5×/10× multipliers are correct for that model. With the stated spread, the .95 slow values are $11,712/$58,559/$117,117. For today's two-channel instant curve the initial values are $2,680/$13,399/$26,797 instead. The $75k “textbook” 5× binary bound is of the right order, but it is not an exposure certified away merely by a stale-source timer.

Under the stated (4,1,.2) news prior, even **initial sweeps only** produce expected markout **$1,140 / $5,701 / $11,403** at 1×/5×/10×. Thus the proposal's $1–3k at 5× requires a materially milder event prior than this brief. It also excludes predictable-anchor round trips and terminal exposure. Raising slew reduces the real time available to load inventory; it does **not** divide the already completed instantaneous sweep loss in proportion to catch-up time. In a frictionless instantaneous execution limit, the initial sweep cost is independent of the later slew speed.

## Grid, forty levels and operational scope

The analytic tables integrate a continuous curve, with replenishment when needed. They do not assert that 40 levels already display the whole binary domain. At .345, grid .005 and outward rounding give best ask .350 and bid .340; at stride 1, forty levels cover asks through .545 and bids through .145. A .95 jump initially reaches only that displayed ask range.

The additional snapshot table reproduces [the local ladder's](/home/kelvin/flow-deploy/market-maker/packages/mm-core/src/ladder.ts:419) price grid and [its cumulative quantity formula](/home/kelvin/flow-deploy/market-maker/packages/mm-core/src/sizing.ts:107), sizing from the **opposite spread boundary**. It assumes stride 1 and no binding per-order notional, margin, minimum lot or exchange-band restriction, since those values were not supplied. For .95, one such preexisting snapshot loses **$1,513 / $7,566 / $15,133**, filling **2,895 / 14,475 / 28,950** units. The continuous sweep requires additional ladder replacements; their cadence relative to the feed matters. A fast source could move before these fills arrive. Treat the continuous values as the ideal curve stress and the snapshot values as a conditional first-book calculation, not a reconstructed production fill log.

Grid rounding, order caps, lot sizes, quantity sizing from the opposite boundary, inventory basis, fair-support updates and quote refresh can alter execution. Outward rounding normally helps the MM on price, but the actual quantity convention differs too; no uniform “grid always makes every quoted bound smaller” claim is used here. Dollar-scale differences should not be read as production precision. The independent checks validate the specified mathematical model, not live deployment state.

## LABREV's missing worst-case endpoint

For any positive short inventory q, with entry receipts A and an unbounded settlement S,

\[
L(S)=qS-A\longrightarrow\infty.
\]

Neither log-price coordinates nor a cap of 195 units fixes this. A ±50% move is a stress, not a bound. Even the downside-to-zero is omitted by the reference: for the proxy-sized C25 / linear / S4 candidates, a paced long-inventory cap walk followed by S=0 loses **$26,891 / $15,025 / $10,300**. The corresponding largest *enforced* upside settlements that would keep that cap's short-side loss within $15k are approximately **$333.62 / $392.75 / $467.28**, respectively; these are required boundaries derived from cash flows, not facts about this contract. C25 still fails its downside at that candidate cap. Actual settlement bounds and any carry/contract multiplier would have to be specified before approving a symmetric nonzero worst-case size.

## Reference-simulator audit and reproduction

The reference gets the broad paced-loss setup and near-fair YES-notional conversion right. It has material limitations:

1. It assigns flow-band quantity .20×100D0, four times today's correct .20×100D_flow=.05×100D0. This overstates the initial cheap band.
2. It makes LABREV exponential in price, while the local rule is price-linear, and calls a ±50% loss its “worst”. That cannot establish a finite worst case.
3. It uses ANTHTOP .62 as the anchor despite recording fixed source .6529 in a note.
4. It silently clips true outcomes to .01/.99; the probability jump and resolution payoff are different objects.
5. It suppresses paced losses for RSENATE and replaces adverse resolution with a .95/.05 sweep. The true-price .95 markout is not the liability if YES settles at 1.
6. Its follows flag instantly stops refilling without modeling the slew, grid or known future fair move; it misses the hold/unwind strategy and own-mark EMA coupling.
7. It discretizes the slow curve and imposes a **minimum one-unit fill**. That creates scale-dependent errors, especially for LABREV's small quantities; it can step past the marginal stopping point.
8. Its cap solver has an arbitrary 5,000,000-unit search ceiling. When the true risk constraint never binds, it can report that ceiling as if it were an identified cap. Three outer alternations do not prove a simultaneous solution. Its solve bounds also exclude D0<1, which can matter under sensitivity.
9. Its event-count proxy omits terminal-information risk and has no coherent boundary/path model. It does not prove a to-resolution expected loss.

Run from this directory:

```bash
python3 Z-sizing.py > /tmp/Z-sizing-tables.md
```

This executes assertions, writes `Z-sizing-results.json` and regenerates the numerical appendix tables. Checks include the independent binary KL identity, independent 40,000-panel midpoint quadrature across **both** knees in both directions for binary and future prices, an analytic future-loss identity, paced ≥ hourly-refill ≥ initial-sweep comparisons for every market/shape, and both sizing budget inequalities for every shape. The Python standard library is sufficient. The fixed-F dominance proof and future unboundedness argument establish claims that a finite set of simulated paths could not.

## Numerical appendix

Dollar figures below are rounded; JSON retains precision. `+10/−10` etc mean cents for binaries and percent for LABREV, with the actual clipped target values given above. C25/C50/L/S2/S4 denote far slope factors .25/.5/1/2/4. `K50` changes the slow knee from .20 to .50. **Every LABREV “W”, “resolution” or “cap-worst” entry in the generic generated tables is only the named ±50% stress; actual unbounded-upside W is infinity.** Guarded tables exclude LABREV. The initial-event tables for RSENATE deliberately freeze fair for the shape comparison; the separate follow tables describe its feed.

<!-- NUMERICAL_TABLES -->

### Guarded sizes: news reserve AND expected terminal loss at most $2,500

| Market | Shape | D0 | Cap units | Near $/1c | E news $ | E terminal $ | W cap $ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ANTHTOP26 | C25 | 10.547 | 21,398 | 30 | 850 | 2,500 | 4,010 |
| ANTHTOP26 | L | 37.964 | 19,825 | 109 | 1,086 | 2,500 | 3,967 |
| ANTHTOP26 | S4 | 108.423 | 15,781 | 312 | 1,693 | 2,500 | 3,854 |
| ANTHTOP26 | C25 K50 | 12.351 | 23,946 | 36 | 665 | 2,500 | 4,064 |
| ANTHTOP26 | S4 K50 | 78.833 | 13,248 | 227 | 1,759 | 2,500 | 3,811 |
| ANTHTOP26 | C50 | 20.340 | 20,836 | 59 | 934 | 2,500 | 3,995 |
| ANTHTOP26 | S2 | 66.984 | 18,159 | 193 | 1,336 | 2,500 | 3,920 |
| ANTHTOP26 | C50 K50 | 22.447 | 22,321 | 65 | 831 | 2,500 | 4,026 |
| ANTHTOP26 | S2 K50 | 58.015 | 16,598 | 167 | 1,416 | 2,500 | 3,890 |
| RSENATE26 | C25 | 10.917 | 22,190 | 17 | 830 | 2,500 | 4,176 |
| RSENATE26 | L | 39.263 | 20,539 | 60 | 1,077 | 2,500 | 4,126 |
| RSENATE26 | S4 | 111.884 | 16,310 | 171 | 1,709 | 2,500 | 3,998 |
| RSENATE26 | C25 K50 | 12.798 | 24,860 | 20 | 654 | 2,500 | 4,238 |
| RSENATE26 | S4 K50 | 81.285 | 13,679 | 124 | 1,749 | 2,500 | 3,949 |
| RSENATE26 | C50 | 21.047 | 21,600 | 32 | 918 | 2,500 | 4,158 |
| RSENATE26 | S2 | 69.212 | 18,795 | 106 | 1,337 | 2,500 | 4,073 |
| RSENATE26 | C50 K50 | 23.242 | 23,155 | 35 | 821 | 2,500 | 4,194 |
| RSENATE26 | S2 K50 | 59.911 | 17,168 | 91 | 1,407 | 2,500 | 4,039 |
| TAKEOFF | C25 | 11.800 | 25,414 | 16 | 973 | 2,500 | 5,449 |
| TAKEOFF | L | 42.588 | 23,570 | 59 | 1,241 | 2,500 | 5,363 |
| TAKEOFF | S4 | 122.486 | 18,785 | 170 | 1,936 | 2,500 | 5,139 |
| TAKEOFF | C25 K50 | 13.754 | 28,387 | 19 | 751 | 2,500 | 5,556 |
| TAKEOFF | S4 K50 | 89.483 | 15,737 | 124 | 2,038 | 2,500 | 5,049 |
| TAKEOFF | C50 | 22.777 | 24,757 | 32 | 1,069 | 2,500 | 5,419 |
| TAKEOFF | S2 | 75.359 | 21,608 | 105 | 1,526 | 2,500 | 5,271 |
| TAKEOFF | C50 K50 | 25.070 | 26,497 | 35 | 944 | 2,500 | 5,480 |
| TAKEOFF | S2 K50 | 65.457 | 19,750 | 91 | 1,630 | 2,500 | 5,210 |
| PNP27 | C25 | 13.330 | 19,445 | 14 | 2,500 | 582 | 15,000 |
| PNP27 | L | 47.031 | 21,044 | 48 | 2,500 | 587 | 15,000 |
| PNP27 | S4 | 128.256 | 27,787 | 132 | 2,500 | 537 | 13,056 |
| PNP27 | C25 K50 | 16.398 | 18,340 | 17 | 2,500 | 578 | 15,000 |
| PNP27 | S4 K50 | 89.642 | 21,438 | 92 | 2,500 | 475 | 11,056 |
| PNP27 | C50 | 25.521 | 19,865 | 26 | 2,500 | 584 | 15,000 |
| PNP27 | S2 | 81.319 | 33,610 | 84 | 2,500 | 590 | 14,983 |
| PNP27 | C50 K50 | 28.875 | 18,944 | 30 | 2,500 | 582 | 15,000 |
| PNP27 | S2 K50 | 68.793 | 29,465 | 71 | 2,500 | 550 | 13,663 |

### Guarded sizes: paced event losses at the proposed D0 and cap

| Market | Shape | +10 | −10 | +20 | −20 | +50 | −50 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ANTHTOP26 | C25 | 14 | 86 | 195 | 338 | 1,574 | 2,263 |
| ANTHTOP26 | L | 38 | 139 | 258 | 423 | 1,601 | 2,326 |
| ANTHTOP26 | S4 | 98 | 276 | 418 | 641 | 1,670 | 2,488 |
| ANTHTOP26 | C25 K50 | 12 | 46 | 126 | 230 | 1,541 | 2,152 |
| ANTHTOP26 | S4 K50 | 78 | 287 | 467 | 730 | 1,696 | 2,605 |
| ANTHTOP26 | C50 | 23 | 105 | 217 | 368 | 1,584 | 2,286 |
| ANTHTOP26 | S2 | 63 | 195 | 324 | 513 | 1,629 | 2,393 |
| ANTHTOP26 | C50 K50 | 22 | 83 | 178 | 306 | 1,565 | 2,220 |
| ANTHTOP26 | S2 K50 | 58 | 211 | 360 | 573 | 1,648 | 2,463 |
| RSENATE26 | C25 | 41 | 50 | 245 | 326 | 2,007 | 1,617 |
| RSENATE26 | L | 82 | 90 | 324 | 397 | 2,085 | 1,644 |
| RSENATE26 | S4 | 185 | 193 | 526 | 580 | 2,284 | 1,711 |
| RSENATE26 | C25 K50 | 27 | 29 | 153 | 238 | 1,874 | 1,585 |
| RSENATE26 | S4 K50 | 169 | 186 | 594 | 650 | 2,420 | 1,737 |
| RSENATE26 | C50 | 56 | 64 | 273 | 351 | 2,035 | 1,627 |
| RSENATE26 | S2 | 125 | 132 | 407 | 472 | 2,167 | 1,671 |
| RSENATE26 | C50 K50 | 48 | 53 | 221 | 301 | 1,957 | 1,608 |
| RSENATE26 | S2 K50 | 125 | 137 | 456 | 521 | 2,250 | 1,689 |
| TAKEOFF | C25 | 52 | 69 | 292 | 460 | 2,190 | 1,353 |
| TAKEOFF | L | 97 | 113 | 377 | 529 | 2,282 | 1,387 |
| TAKEOFF | S4 | 214 | 228 | 598 | 710 | 2,519 | 1,474 |
| TAKEOFF | C25 K50 | 31 | 38 | 188 | 369 | 2,029 | 1,311 |
| TAKEOFF | S4 K50 | 204 | 236 | 685 | 790 | 2,692 | 1,509 |
| TAKEOFF | C50 | 68 | 85 | 322 | 484 | 2,223 | 1,365 |
| TAKEOFF | S2 | 145 | 160 | 468 | 604 | 2,379 | 1,422 |
| TAKEOFF | C50 K50 | 57 | 68 | 262 | 432 | 2,128 | 1,341 |
| TAKEOFF | S2 K50 | 149 | 173 | 527 | 656 | 2,482 | 1,446 |
| PNP27 | C25 | 432 | 136 | 1,387 | 136 | 5,889 | 136 |
| PNP27 | L | 449 | 141 | 1,362 | 141 | 5,545 | 141 |
| PNP27 | S4 | 492 | 149 | 1,307 | 149 | 4,736 | 149 |
| PNP27 | C25 K50 | 402 | 132 | 1,430 | 132 | 6,380 | 132 |
| PNP27 | S4 K50 | 521 | 147 | 1,292 | 147 | 4,293 | 147 |
| PNP27 | C50 | 438 | 138 | 1,378 | 138 | 5,764 | 138 |
| PNP27 | S2 | 467 | 145 | 1,338 | 145 | 5,197 | 145 |
| PNP27 | C50 K50 | 420 | 136 | 1,397 | 136 | 6,096 | 136 |
| PNP27 | S2 K50 | 485 | 145 | 1,325 | 145 | 4,900 | 145 |

### Guarded sizes: event-frequency sensitivity

| Market | Shape | Half counts: D0 / cap | Base: D0 / cap | Double: D0 / cap |
| --- | --- | --- | --- | --- |
| ANTHTOP26 | C25 | 10.547 / 21,398 | 10.547 / 21,398 | 10.547 / 21,398 |
| ANTHTOP26 | L | 37.964 / 19,825 | 37.964 / 19,825 | 37.964 / 19,825 |
| ANTHTOP26 | S4 | 108.423 / 15,781 | 108.423 / 15,781 | 80.030 / 11,648 |
| ANTHTOP26 | C25 K50 | 12.351 / 23,946 | 12.351 / 23,946 | 12.351 / 23,946 |
| ANTHTOP26 | S4 K50 | 78.833 / 13,248 | 78.833 / 13,248 | 56.021 / 9,414 |
| ANTHTOP26 | C50 | 20.340 / 20,836 | 20.340 / 20,836 | 20.340 / 20,836 |
| ANTHTOP26 | S2 | 66.984 / 18,159 | 66.984 / 18,159 | 62.656 / 16,986 |
| ANTHTOP26 | C50 K50 | 22.447 / 22,321 | 22.447 / 22,321 | 22.447 / 22,321 |
| ANTHTOP26 | S2 K50 | 58.015 / 16,598 | 58.015 / 16,598 | 51.203 / 14,649 |
| RSENATE26 | C25 | 10.917 / 22,190 | 10.917 / 22,190 | 10.917 / 22,190 |
| RSENATE26 | L | 39.263 / 20,539 | 39.263 / 20,539 | 39.263 / 20,539 |
| RSENATE26 | S4 | 111.884 / 16,310 | 111.884 / 16,310 | 81.834 / 11,930 |
| RSENATE26 | C25 K50 | 12.798 / 24,860 | 12.798 / 24,860 | 12.798 / 24,860 |
| RSENATE26 | S4 K50 | 81.285 / 13,679 | 81.285 / 13,679 | 58.108 / 9,778 |
| RSENATE26 | C50 | 21.047 / 21,600 | 21.047 / 21,600 | 21.047 / 21,600 |
| RSENATE26 | S2 | 69.212 / 18,795 | 69.212 / 18,795 | 64.686 / 17,566 |
| RSENATE26 | C50 K50 | 23.242 / 23,155 | 23.242 / 23,155 | 23.242 / 23,155 |
| RSENATE26 | S2 K50 | 59.911 / 17,168 | 59.911 / 17,168 | 53.232 / 15,254 |
| TAKEOFF | C25 | 11.800 / 25,414 | 11.800 / 25,414 | 11.800 / 25,414 |
| TAKEOFF | L | 42.588 / 23,570 | 42.588 / 23,570 | 42.588 / 23,570 |
| TAKEOFF | S4 | 122.486 / 18,785 | 122.486 / 18,785 | 79.083 / 12,129 |
| TAKEOFF | C25 K50 | 13.754 / 28,387 | 13.754 / 28,387 | 13.754 / 28,387 |
| TAKEOFF | S4 K50 | 89.483 / 15,737 | 89.483 / 15,737 | 54.882 / 9,652 |
| TAKEOFF | C50 | 22.777 / 24,757 | 22.777 / 24,757 | 22.777 / 24,757 |
| TAKEOFF | S2 | 75.359 / 21,608 | 75.359 / 21,608 | 61.722 / 17,697 |
| TAKEOFF | C50 K50 | 25.070 / 26,497 | 25.070 / 26,497 | 25.070 / 26,497 |
| TAKEOFF | S2 K50 | 65.457 / 19,750 | 65.457 / 19,750 | 50.203 / 15,148 |
| PNP27 | C25 | 37.366 / 15,961 | 13.330 / 19,445 | 6.640 / 21,025 |
| PNP27 | L | 119.254 / 15,972 | 47.031 / 21,044 | 23.476 / 18,937 |
| PNP27 | S4 | 282.030 / 16,002 | 128.256 / 27,787 | 64.128 / 13,894 |
| PNP27 | C25 K50 | 57.466 / 15,955 | 16.398 / 18,340 | 8.082 / 24,863 |
| PNP27 | S4 K50 | 187.499 / 16,030 | 89.642 / 21,438 | 44.821 / 10,719 |
| PNP27 | C50 | 68.706 / 15,965 | 25.521 / 19,865 | 12.723 / 20,271 |
| PNP27 | S2 | 191.724 / 15,983 | 81.319 / 33,610 | 40.660 / 16,805 |
| PNP27 | C50 K50 | 85.890 / 15,962 | 28.875 / 18,944 | 14.359 / 22,447 |
| PNP27 | S2 K50 | 154.953 / 15,985 | 68.793 / 29,465 | 34.397 / 14,732 |

### Candidate size table: fixed-fair envelope

LABREV rows are conditional ±50% stress sizes; their true worst case is unbounded.

| Market | Shape | D0 | Cap units | Near $/1c or 1% | E $ | W cap + / − $ |
| --- | --- | --- | --- | --- | --- | --- |
| ANTHTOP26 | C25 | 31.024 | 62,942 | 89 | 2,500 | 4,631 / 11,796 |
| ANTHTOP26 | L | 87.377 | 45,628 | 252 | 2,500 | 3,685 / 9,129 |
| ANTHTOP26 | S4 | 160.059 | 23,296 | 461 | 2,500 | 2,465 / 5,690 |
| ANTHTOP26 | C25 K50 | 46.648 | 70,652 | 134 | 2,500 | 5,722 / 15,000 |
| ANTHTOP26 | S4 K50 | 112.043 | 18,829 | 323 | 2,500 | 2,411 / 5,417 |
| ANTHTOP26 | C50 | 54.425 | 55,752 | 157 | 2,500 | 4,238 / 10,689 |
| ANTHTOP26 | S2 | 125.313 | 33,972 | 361 | 2,500 | 3,048 / 7,334 |
| ANTHTOP26 | C50 K50 | 67.549 | 67,170 | 195 | 2,500 | 4,709 / 12,114 |
| ANTHTOP26 | S2 K50 | 102.407 | 29,298 | 295 | 2,500 | 2,909 / 6,867 |
| RSENATE26 | C25 | 32.888 | 66,845 | 50 | 2,500 | 12,580 / 4,872 |
| RSENATE26 | L | 91.165 | 47,690 | 139 | 2,500 | 9,580 / 3,816 |
| RSENATE26 | S4 | 163.669 | 23,860 | 250 | 2,500 | 5,849 / 2,503 |
| RSENATE26 | C25 K50 | 49.791 | 53,514 | 76 | 2,500 | 15,000 / 5,739 |
| RSENATE26 | S4 K50 | 116.216 | 19,557 | 177 | 2,500 | 5,646 / 2,483 |
| RSENATE26 | C50 | 57.313 | 58,817 | 88 | 2,500 | 11,323 / 4,429 |
| RSENATE26 | S2 | 129.372 | 35,132 | 198 | 2,500 | 7,614 / 3,124 |
| RSENATE26 | C50 K50 | 70.813 | 70,547 | 108 | 2,500 | 12,777 / 4,899 |
| RSENATE26 | S2 K50 | 106.465 | 30,509 | 163 | 2,500 | 7,177 / 3,002 |
| TAKEOFF | C25 | 30.304 | 65,271 | 42 | 2,500 | 13,996 / 3,475 |
| TAKEOFF | L | 85.780 | 47,476 | 119 | 2,500 | 10,802 / 2,793 |
| TAKEOFF | S4 | 158.166 | 24,257 | 220 | 2,500 | 6,636 / 1,903 |
| TAKEOFF | C25 K50 | 46.990 | 36,782 | 65 | 2,500 | 15,000 / 3,816 |
| TAKEOFF | S4 K50 | 109.765 | 19,304 | 152 | 2,500 | 6,193 / 1,851 |
| TAKEOFF | C50 | 53.273 | 57,903 | 74 | 2,500 | 12,674 / 3,192 |
| TAKEOFF | S2 | 123.444 | 35,395 | 171 | 2,500 | 8,635 / 2,330 |
| TAKEOFF | C50 K50 | 66.427 | 70,208 | 92 | 2,500 | 14,522 / 3,553 |
| TAKEOFF | S2 K50 | 100.407 | 30,296 | 139 | 2,500 | 7,992 / 2,218 |
| PNP27 | C25 | 13.330 | 19,445 | 14 | 2,500 | 15,000 / 136 |
| PNP27 | L | 47.031 | 21,044 | 48 | 2,500 | 15,000 / 141 |
| PNP27 | S4 | 128.256 | 27,787 | 132 | 2,500 | 13,056 / 149 |
| PNP27 | C25 K50 | 16.398 | 18,340 | 17 | 2,500 | 15,000 / 132 |
| PNP27 | S4 K50 | 89.642 | 21,438 | 92 | 2,500 | 11,056 / 147 |
| PNP27 | C50 | 25.521 | 19,865 | 26 | 2,500 | 15,000 / 138 |
| PNP27 | S2 | 81.319 | 33,610 | 84 | 2,500 | 14,983 / 145 |
| PNP27 | C50 K50 | 28.875 | 18,944 | 30 | 2,500 | 15,000 / 136 |
| PNP27 | S2 K50 | 68.793 | 29,465 | 71 | 2,500 | 13,663 / 145 |
| LABREV | C25 | 1.451 | 200 | 285 | 2,500 | 7,216 / 7,216 |
| LABREV | L | 2.067 | 102 | 406 | 2,500 | 4,975 / 4,975 |
| LABREV | S4 | 2.312 | 63 | 454 | 2,500 | 4,083 / 4,083 |
| LABREV | C25 K50 | 2.067 | 102 | 406 | 2,500 | 4,975 / 4,975 |
| LABREV | S4 K50 | 2.067 | 102 | 406 | 2,500 | 4,975 / 4,975 |
| LABREV | C50 | 1.811 | 143 | 356 | 2,500 | 5,907 / 5,907 |
| LABREV | S2 | 2.224 | 77 | 437 | 2,500 | 4,403 / 4,403 |
| LABREV | C50 K50 | 2.067 | 102 | 406 | 2,500 | 4,975 / 4,975 |
| LABREV | S2 K50 | 2.067 | 102 | 406 | 2,500 | 4,975 / 4,975 |

### At supplied depth and cap: event losses

Each cell is paced / initial sweep / sweep plus 72 hourly refills, in dollars.

| Market | Shape | +10 | −10 | +20 | −20 | +50 | −50 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ANTHTOP26 | C25 | 192 / 63 / 98 | 1,153 / 176 / 334 | 2,627 / 284 / 520 | 4,546 / 446 / 887 | 14,732 / 1,506 / 1,506 | 25,057 / 2,171 / 3,504 |
| ANTHTOP26 | L | 141 / 63 / 79 | 520 / 176 / 226 | 963 / 284 / 353 | 1,581 / 445 / 573 | 5,988 / 1,399 / 1,399 | 8,701 / 2,039 / 2,414 |
| ANTHTOP26 | S4 | 129 / 63 / 74 | 361 / 176 / 196 | 547 / 283 / 300 | 840 / 442 / 471 | 2,197 / 1,172 / 1,172 | 3,259 / 1,758 / 1,812 |
| ANTHTOP26 | C25 K50 | 141 / 63 / 79 | 531 / 176 / 234 | 1,453 / 284 / 420 | 2,646 / 445 / 710 | 12,532 / 1,425 / 1,425 | 21,386 / 2,042 / 3,227 |
| ANTHTOP26 | S4 K50 | 141 / 63 / 79 | 517 / 176 / 225 | 841 / 284 / 332 | 1,315 / 445 / 529 | 3,066 / 1,344 / 1,344 | 4,692 / 2,033 / 2,121 |
| ANTHTOP26 | C50 | 158 / 63 / 85 | 731 / 176 / 267 | 1,518 / 284 / 424 | 2,569 / 445 / 707 | 10,152 / 1,466 / 1,466 | 15,957 / 2,122 / 2,943 |
| ANTHTOP26 | S2 | 133 / 63 / 75 | 414 / 176 / 206 | 686 / 283 / 318 | 1,087 / 443 / 505 | 3,474 / 1,298 / 1,298 | 5,073 / 1,914 / 2,064 |
| ANTHTOP26 | C50 K50 | 141 / 63 / 79 | 523 / 176 / 229 | 1,127 / 284 / 381 | 1,936 / 445 / 632 | 9,129 / 1,415 / 1,415 | 14,046 / 2,041 / 2,770 |
| ANTHTOP26 | S2 K50 | 141 / 63 / 79 | 518 / 176 / 225 | 882 / 284 / 339 | 1,403 / 445 / 544 | 4,053 / 1,375 / 1,375 | 6,028 / 2,036 / 2,219 |
| RSENATE26 | C25 | 533 / 111 / 203 | 643 / 117 / 210 | 3,162 / 341 / 676 | 4,209 / 398 / 717 | 22,550 / 1,880 / 3,282 | 14,579 / 1,484 / 1,484 |
| RSENATE26 | L | 294 / 111 / 143 | 323 / 117 / 148 | 1,162 / 341 / 441 | 1,426 / 394 / 485 | 7,488 / 1,776 / 2,142 | 5,903 / 1,379 / 1,379 |
| RSENATE26 | S4 | 234 / 111 / 128 | 243 / 117 / 131 | 662 / 341 / 367 | 730 / 387 / 406 | 2,878 / 1,555 / 1,610 | 2,166 / 1,155 / 1,155 |
| RSENATE26 | C25 K50 | 294 / 111 / 143 | 323 / 117 / 148 | 1,691 / 341 / 528 | 2,622 / 394 / 601 | 18,876 / 1,776 / 2,939 | 12,396 / 1,405 / 1,405 |
| RSENATE26 | S4 K50 | 294 / 111 / 143 | 323 / 117 / 148 | 1,030 / 341 / 415 | 1,127 / 394 / 445 | 4,198 / 1,776 / 1,869 | 3,023 / 1,325 / 1,325 |
| RSENATE26 | C50 | 373 / 111 / 163 | 430 / 117 / 170 | 1,829 / 341 / 540 | 2,354 / 396 / 583 | 13,634 / 1,841 / 2,637 | 10,023 / 1,445 / 1,445 |
| RSENATE26 | S2 | 254 / 111 / 133 | 270 / 117 / 137 | 829 / 341 / 392 | 962 / 391 / 433 | 4,415 / 1,678 / 1,826 | 3,424 / 1,280 / 1,280 |
| RSENATE26 | C50 K50 | 294 / 111 / 143 | 323 / 117 / 148 | 1,338 / 341 / 476 | 1,825 / 394 / 536 | 11,875 / 1,776 / 2,474 | 9,011 / 1,395 / 1,395 |
| RSENATE26 | S2 K50 | 294 / 111 / 143 | 323 / 117 / 148 | 1,074 / 341 / 424 | 1,227 / 394 / 458 | 5,294 / 1,776 / 1,960 | 3,996 / 1,355 / 1,355 |
| TAKEOFF | C25 | 733 / 137 / 258 | 970 / 150 / 269 | 4,077 / 420 / 852 | 6,427 / 551 / 939 | 27,776 / 2,215 / 4,143 | 13,734 / 1,354 / 1,354 |
| TAKEOFF | L | 377 / 137 / 178 | 439 / 150 / 188 | 1,460 / 420 / 548 | 2,051 / 538 / 643 | 8,840 / 2,094 / 2,593 | 5,372 / 1,260 / 1,260 |
| TAKEOFF | S4 | 288 / 137 / 157 | 307 / 150 / 164 | 806 / 419 / 451 | 957 / 512 / 531 | 3,394 / 1,837 / 1,914 | 1,992 / 1,062 / 1,062 |
| TAKEOFF | C25 K50 | 377 / 137 / 178 | 456 / 150 / 196 | 2,250 / 420 / 668 | 4,427 / 538 / 817 | 23,131 / 2,094 / 3,646 | 11,579 / 1,282 / 1,282 |
| TAKEOFF | S4 K50 | 377 / 137 / 178 | 435 / 150 / 186 | 1,263 / 420 / 510 | 1,457 / 538 / 584 | 4,964 / 2,094 / 2,233 | 2,788 / 1,213 / 1,213 |
| TAKEOFF | C50 | 496 / 137 / 205 | 616 / 150 / 219 | 2,332 / 420 / 677 | 3,509 / 546 / 768 | 16,103 / 2,170 / 3,250 | 9,222 / 1,319 / 1,319 |
| TAKEOFF | S2 | 317 / 137 / 164 | 351 / 150 / 172 | 1,024 / 420 / 483 | 1,322 / 526 / 572 | 5,209 / 1,980 / 2,184 | 3,127 / 1,172 / 1,172 |
| TAKEOFF | C50 K50 | 377 / 137 / 178 | 445 / 150 / 191 | 1,724 / 420 / 598 | 2,843 / 538 / 718 | 14,009 / 2,094 / 3,034 | 8,258 / 1,274 / 1,274 |
| TAKEOFF | S2 K50 | 377 / 137 / 178 | 436 / 150 / 186 | 1,329 / 420 / 523 | 1,655 / 538 / 604 | 6,256 / 2,094 / 2,353 | 3,658 / 1,239 / 1,239 |
| PNP27 | C25 | 5,338 / 397 / 987 | 1,296 / 127 / 127 | 14,478 / 1,170 / 3,046 | 1,296 / 127 / 127 | 41,898 / 4,681 / 9,660 | 1,296 / 127 / 127 |
| PNP27 | L | 1,575 / 380 / 542 | 498 / 119 / 119 | 4,780 / 1,087 / 1,582 | 498 / 119 / 119 | 19,453 / 4,220 / 5,958 | 498 / 119 / 119 |
| PNP27 | S4 | 633 / 346 / 375 | 192 / 102 / 102 | 1,682 / 912 / 989 | 192 / 102 / 102 | 6,093 / 3,241 / 3,474 | 192 / 102 / 102 |
| PNP27 | C25 K50 | 4,042 / 380 / 818 | 1,067 / 121 / 121 | 13,041 / 1,087 / 2,623 | 1,067 / 121 / 121 | 40,461 / 4,336 / 8,997 | 1,067 / 121 / 121 |
| PNP27 | S4 K50 | 958 / 380 / 446 | 271 / 115 / 115 | 2,378 / 1,087 / 1,218 | 271 / 115 / 115 | 7,903 / 3,973 / 4,313 | 271 / 115 / 115 |
| PNP27 | C50 | 2,831 / 391 / 731 | 853 / 124 / 124 | 8,910 / 1,139 / 2,203 | 853 / 124 / 124 | 35,141 / 4,510 / 8,246 | 853 / 124 / 124 |
| PNP27 | S2 | 947 / 365 / 435 | 295 / 112 / 112 | 2,715 / 1,009 / 1,213 | 295 / 112 / 112 | 10,546 / 3,785 / 4,461 | 295 / 112 / 112 |
| PNP27 | C50 K50 | 2,397 / 380 / 661 | 756 / 120 / 120 | 7,982 / 1,087 / 2,022 | 756 / 120 / 120 | 33,512 / 4,293 / 7,801 | 756 / 120 / 120 |
| PNP27 | S2 K50 | 1,164 / 380 / 478 | 348 / 118 / 118 | 3,179 / 1,087 / 1,340 | 348 / 118 / 118 | 11,753 / 4,110 / 4,893 | 348 / 118 / 118 |
| LABREV | C25 | 222 / 182 / 206 | 222 / 182 / 206 | 934 / 521 / 645 | 934 / 521 / 645 | 10,220 / 2,127 / 3,375 | 10,220 / 2,127 / 3,375 |
| LABREV | L | 222 / 182 / 206 | 222 / 182 / 206 | 934 / 521 / 645 | 934 / 521 / 645 | 6,018 / 2,127 / 2,726 | 6,018 / 2,127 / 2,726 |
| LABREV | S4 | 222 / 182 / 206 | 222 / 182 / 206 | 934 / 521 / 645 | 934 / 521 / 645 | 4,415 / 2,127 / 2,391 | 4,415 / 2,127 / 2,391 |
| LABREV | C25 K50 | 222 / 182 / 206 | 222 / 182 / 206 | 934 / 521 / 645 | 934 / 521 / 645 | 6,018 / 2,127 / 2,726 | 6,018 / 2,127 / 2,726 |
| LABREV | S4 K50 | 222 / 182 / 206 | 222 / 182 / 206 | 934 / 521 / 645 | 934 / 521 / 645 | 6,018 / 2,127 / 2,726 | 6,018 / 2,127 / 2,726 |
| LABREV | C50 | 222 / 182 / 206 | 222 / 182 / 206 | 934 / 521 / 645 | 934 / 521 / 645 | 8,155 / 2,127 / 3,169 | 8,155 / 2,127 / 3,169 |
| LABREV | S2 | 222 / 182 / 206 | 222 / 182 / 206 | 934 / 521 / 645 | 934 / 521 / 645 | 4,950 / 2,127 / 2,503 | 4,950 / 2,127 / 2,503 |
| LABREV | C50 K50 | 222 / 182 / 206 | 222 / 182 / 206 | 934 / 521 / 645 | 934 / 521 / 645 | 6,018 / 2,127 / 2,726 | 6,018 / 2,127 / 2,726 |
| LABREV | S2 K50 | 222 / 182 / 206 | 222 / 182 / 206 | 934 / 521 / 645 | 934 / 521 / 645 | 6,018 / 2,127 / 2,726 | 6,018 / 2,127 / 2,726 |

### At supplied depth and cap: expected loss and resolution risk

LABREV entries in both risk columns are ±50% stresses, not resolution bounds.

| Market | Shape | E $ | Walk to 1%/99%: + / − $ | All the way to cap: + / − $ |
| --- | --- | --- | --- | --- |
| ANTHTOP26 | C25 | 10,255 | 14,732 / 33,937 | 14,732 / 33,937 |
| ANTHTOP26 | L | 4,063 | 5,887 / 14,835 | 5,988 / 14,835 |
| ANTHTOP26 | S4 | 2,219 | 2,161 / 5,048 | 2,197 / 5,084 |
| ANTHTOP26 | C25 K50 | 6,787 | 12,532 / 30,266 | 12,532 / 30,266 |
| ANTHTOP26 | S4 K50 | 3,169 | 3,030 / 6,865 | 3,066 / 6,901 |
| ANTHTOP26 | C50 | 6,432 | 10,152 / 24,826 | 10,152 / 24,826 |
| ANTHTOP26 | S2 | 2,835 | 3,403 / 8,311 | 3,474 / 8,382 |
| ANTHTOP26 | C50 K50 | 5,178 | 9,129 / 22,847 | 9,129 / 22,847 |
| ANTHTOP26 | S2 K50 | 3,469 | 3,982 / 9,522 | 4,053 / 9,593 |
| RSENATE26 | C25 | 9,750 | 34,020 / 14,579 | 34,020 / 14,579 |
| RSENATE26 | L | 3,867 | 14,818 / 5,800 | 14,820 / 5,903 |
| RSENATE26 | S4 | 2,155 | 5,039 / 2,131 | 5,074 / 2,166 |
| RSENATE26 | C25 K50 | 6,517 | 30,346 / 12,396 | 30,346 / 12,396 |
| RSENATE26 | S4 K50 | 3,034 | 6,850 / 2,987 | 6,885 / 3,023 |
| RSENATE26 | C50 | 6,063 | 24,845 / 10,023 | 24,845 / 10,023 |
| RSENATE26 | S2 | 2,727 | 8,298 / 3,354 | 8,369 / 3,424 |
| RSENATE26 | C50 K50 | 4,904 | 22,866 / 9,011 | 22,866 / 9,011 |
| RSENATE26 | S2 K50 | 3,313 | 9,506 / 3,925 | 9,576 / 3,996 |
| TAKEOFF | C25 | 12,808 | 47,884 / 13,734 | 47,884 / 13,734 |
| TAKEOFF | L | 4,809 | 20,779 / 5,231 | 20,780 / 5,372 |
| TAKEOFF | S4 | 2,609 | 6,923 / 1,950 | 6,964 / 1,992 |
| TAKEOFF | C25 K50 | 8,475 | 43,239 / 11,579 | 43,239 / 11,579 |
| TAKEOFF | S4 K50 | 3,759 | 9,310 / 2,747 | 9,351 / 2,788 |
| TAKEOFF | C50 | 7,677 | 35,113 / 9,222 | 35,113 / 9,222 |
| TAKEOFF | S2 | 3,343 | 11,541 / 3,044 | 11,624 / 3,127 |
| TAKEOFF | C50 K50 | 6,153 | 32,518 / 8,258 | 32,518 / 8,258 |
| TAKEOFF | S2 K50 | 4,110 | 13,133 / 3,575 | 13,215 / 3,658 |
| PNP27 | C25 | 25,474 | 84,856 / 1,068 | 84,856 / 1,296 |
| PNP27 | L | 8,781 | 55,814 / 334 | 55,814 / 498 |
| PNP27 | S4 | 3,216 | 16,796 / 151 | 16,837 / 192 |
| PNP27 | C25 K50 | 21,425 | 83,419 / 752 | 83,419 / 1,067 |
| PNP27 | S4 K50 | 4,602 | 20,351 / 230 | 20,392 / 271 |
| PNP27 | C50 | 15,850 | 78,099 / 579 | 78,099 / 853 |
| PNP27 | S2 | 5,073 | 30,401 / 212 | 30,479 / 295 |
| PNP27 | C50 K50 | 14,102 | 76,470 / 474 | 76,470 / 756 |
| PNP27 | S2 K50 | 5,996 | 32,771 / 265 | 32,848 / 348 |
| LABREV | C25 | 3,865 | 10,220 / 10,220 | 10,220 / 10,220 |
| LABREV | L | 3,024 | 6,018 / 6,018 | 6,018 / 6,018 |
| LABREV | S4 | 2,704 | 4,415 / 4,415 | 4,415 / 4,415 |
| LABREV | C25 K50 | 3,024 | 6,018 / 6,018 | 6,018 / 6,018 |
| LABREV | S4 K50 | 3,024 | 6,018 / 6,018 | 6,018 / 6,018 |
| LABREV | C50 | 3,452 | 8,155 / 8,155 | 8,155 / 8,155 |
| LABREV | S2 | 2,811 | 4,950 / 4,950 | 4,950 / 4,950 |
| LABREV | C50 K50 | 3,024 | 6,018 / 6,018 | 6,018 / 6,018 |
| LABREV | S2 K50 | 3,024 | 6,018 / 6,018 | 6,018 / 6,018 |

### At candidate size: paced event losses

| Market | Shape | +10 | −10 | +20 | −20 | +50 | −50 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ANTHTOP26 | C25 | 42 | 252 | 574 | 993 | 4,631 | 6,657 |
| ANTHTOP26 | L | 87 | 320 | 593 | 973 | 3,685 | 5,354 |
| ANTHTOP26 | S4 | 145 | 407 | 617 | 946 | 2,465 | 3,673 |
| ANTHTOP26 | C25 K50 | 46 | 175 | 477 | 869 | 5,722 | 8,126 |
| ANTHTOP26 | S4 K50 | 112 | 408 | 663 | 1,037 | 2,411 | 3,702 |
| ANTHTOP26 | C50 | 61 | 280 | 582 | 985 | 4,238 | 6,116 |
| ANTHTOP26 | S2 | 117 | 365 | 605 | 959 | 3,048 | 4,477 |
| ANTHTOP26 | C50 K50 | 67 | 249 | 536 | 921 | 4,709 | 6,682 |
| ANTHTOP26 | S2 K50 | 102 | 373 | 636 | 1,012 | 2,909 | 4,347 |
| RSENATE26 | C25 | 124 | 150 | 737 | 982 | 6,047 | 4,872 |
| RSENATE26 | L | 190 | 209 | 751 | 922 | 4,841 | 3,816 |
| RSENATE26 | S4 | 271 | 282 | 769 | 848 | 3,341 | 2,503 |
| RSENATE26 | C25 K50 | 104 | 114 | 597 | 926 | 7,292 | 5,739 |
| RSENATE26 | S4 K50 | 242 | 266 | 849 | 929 | 3,460 | 2,483 |
| RSENATE26 | C50 | 152 | 175 | 743 | 957 | 5,542 | 4,429 |
| RSENATE26 | S2 | 233 | 248 | 761 | 883 | 4,051 | 3,124 |
| RSENATE26 | C50 K50 | 147 | 162 | 672 | 916 | 5,964 | 4,899 |
| RSENATE26 | S2 K50 | 222 | 244 | 811 | 926 | 3,998 | 3,002 |
| TAKEOFF | C25 | 135 | 178 | 749 | 1,180 | 5,625 | 3,475 |
| TAKEOFF | L | 196 | 228 | 759 | 1,066 | 4,596 | 2,793 |
| TAKEOFF | S4 | 276 | 294 | 773 | 917 | 3,253 | 1,903 |
| TAKEOFF | C25 K50 | 107 | 130 | 641 | 1,261 | 6,933 | 3,816 |
| TAKEOFF | S4 K50 | 251 | 289 | 840 | 969 | 3,302 | 1,851 |
| TAKEOFF | C50 | 160 | 199 | 753 | 1,133 | 5,199 | 3,192 |
| TAKEOFF | S2 | 238 | 262 | 766 | 989 | 3,897 | 2,330 |
| TAKEOFF | C50 K50 | 152 | 179 | 694 | 1,145 | 5,640 | 3,553 |
| TAKEOFF | S2 K50 | 229 | 266 | 808 | 1,007 | 3,807 | 2,218 |
| PNP27 | C25 | 432 | 136 | 1,387 | 136 | 5,889 | 136 |
| PNP27 | L | 449 | 141 | 1,362 | 141 | 5,545 | 141 |
| PNP27 | S4 | 492 | 149 | 1,307 | 149 | 4,736 | 149 |
| PNP27 | C25 K50 | 402 | 132 | 1,430 | 132 | 6,380 | 132 |
| PNP27 | S4 K50 | 521 | 147 | 1,292 | 147 | 4,293 | 147 |
| PNP27 | C50 | 438 | 138 | 1,378 | 138 | 5,764 | 138 |
| PNP27 | S2 | 467 | 145 | 1,338 | 145 | 5,197 | 145 |
| PNP27 | C50 K50 | 420 | 136 | 1,397 | 136 | 6,096 | 136 |
| PNP27 | S2 K50 | 485 | 145 | 1,325 | 145 | 4,900 | 145 |
| LABREV | C25 | 129 | 129 | 542 | 542 | 7,216 | 7,216 |
| LABREV | L | 183 | 183 | 772 | 772 | 4,975 | 4,975 |
| LABREV | S4 | 205 | 205 | 864 | 864 | 4,083 | 4,083 |
| LABREV | C25 K50 | 183 | 183 | 772 | 772 | 4,975 | 4,975 |
| LABREV | S4 K50 | 183 | 183 | 772 | 772 | 4,975 | 4,975 |
| LABREV | C50 | 161 | 161 | 676 | 676 | 5,907 | 5,907 |
| LABREV | S2 | 197 | 197 | 831 | 831 | 4,403 | 4,403 |
| LABREV | C50 K50 | 183 | 183 | 772 | 772 | 4,975 | 4,975 |
| LABREV | S2 K50 | 183 | 183 | 772 | 772 | 4,975 | 4,975 |

### Event-frequency sensitivity, re-solving BOTH limits

| Market | Shape | Half counts: D0 / cap | Base: D0 / cap | Double: D0 / cap |
| --- | --- | --- | --- | --- |
| ANTHTOP26 | C25 | 72.476 / 30,754 | 31.024 / 62,942 | 15.512 / 31,471 |
| ANTHTOP26 | L | 180.286 / 36,318 | 87.377 / 45,628 | 43.688 / 22,814 |
| ANTHTOP26 | S4 | 320.118 / 46,593 | 160.059 / 23,296 | 80.030 / 11,648 |
| ANTHTOP26 | C25 K50 | 133.297 / 29,804 | 46.648 / 70,652 | 23.231 / 45,040 |
| ANTHTOP26 | S4 K50 | 224.086 / 37,657 | 112.043 / 18,829 | 56.021 / 9,414 |
| ANTHTOP26 | C50 | 119.958 / 32,167 | 54.425 / 55,752 | 27.212 / 27,876 |
| ANTHTOP26 | S2 | 250.626 / 67,944 | 125.313 / 33,972 | 62.656 / 16,986 |
| ANTHTOP26 | C50 K50 | 159.467 / 31,251 | 67.549 / 67,170 | 33.775 / 33,585 |
| ANTHTOP26 | S2 K50 | 204.813 / 58,596 | 102.407 / 29,298 | 51.203 / 14,649 |
| RSENATE26 | C25 | 77.076 / 29,938 | 32.888 / 66,845 | 16.444 / 33,423 |
| RSENATE26 | L | 189.122 / 34,358 | 91.165 / 47,690 | 45.583 / 23,845 |
| RSENATE26 | S4 | 327.337 / 47,719 | 163.669 / 23,860 | 81.834 / 11,930 |
| RSENATE26 | C25 K50 | 140.888 / 29,350 | 49.791 / 53,514 | 24.477 / 47,547 |
| RSENATE26 | S4 K50 | 232.433 / 39,114 | 116.216 / 19,557 | 58.108 / 9,778 |
| RSENATE26 | C50 | 126.813 / 31,103 | 57.313 / 58,817 | 28.657 / 29,409 |
| RSENATE26 | S2 | 259.107 / 56,387 | 129.372 / 35,132 | 64.686 / 17,566 |
| RSENATE26 | C50 K50 | 166.100 / 30,627 | 70.813 / 70,547 | 35.406 / 35,273 |
| RSENATE26 | S2 K50 | 212.929 / 61,017 | 106.465 / 30,509 | 53.232 / 15,254 |
| TAKEOFF | C25 | 70.863 / 25,749 | 30.304 / 65,271 | 15.152 / 32,635 |
| TAKEOFF | L | 178.694 / 27,892 | 85.780 / 47,476 | 42.890 / 23,738 |
| TAKEOFF | S4 | 316.333 / 48,514 | 158.166 / 24,257 | 79.083 / 12,129 |
| TAKEOFF | C25 K50 | 135.122 / 25,306 | 46.990 / 36,782 | 22.887 / 47,234 |
| TAKEOFF | S4 K50 | 219.530 / 38,608 | 109.765 / 19,304 | 54.882 / 9,652 |
| TAKEOFF | C50 | 117.404 / 26,405 | 53.273 / 57,903 | 26.636 / 28,952 |
| TAKEOFF | S2 | 248.855 / 32,701 | 123.444 / 35,395 | 61.722 / 17,697 |
| TAKEOFF | C50 K50 | 156.575 / 26,076 | 66.427 / 70,208 | 33.214 / 35,104 |
| TAKEOFF | S2 K50 | 201.477 / 35,900 | 100.407 / 30,296 | 50.203 / 15,148 |
| PNP27 | C25 | 37.366 / 15,961 | 13.330 / 19,445 | 6.640 / 21,025 |
| PNP27 | L | 119.254 / 15,972 | 47.031 / 21,044 | 23.476 / 18,937 |
| PNP27 | S4 | 282.030 / 16,002 | 128.256 / 27,787 | 64.128 / 13,894 |
| PNP27 | C25 K50 | 57.466 / 15,955 | 16.398 / 18,340 | 8.082 / 24,863 |
| PNP27 | S4 K50 | 187.499 / 16,030 | 89.642 / 21,438 | 44.821 / 10,719 |
| PNP27 | C50 | 68.706 / 15,965 | 25.521 / 19,865 | 12.723 / 20,271 |
| PNP27 | S2 | 191.724 / 15,983 | 81.319 / 33,610 | 40.660 / 16,805 |
| PNP27 | C50 K50 | 85.890 / 15,962 | 28.875 / 18,944 | 14.359 / 22,447 |
| PNP27 | S2 K50 | 154.953 / 15,985 | 68.793 / 29,465 | 34.397 / 14,732 |
| LABREV | C25 | 2.902 / 401 | 1.451 / 200 | 0.726 / 100 |
| LABREV | L | 4.133 / 205 | 2.067 / 102 | 1.033 / 51 |
| LABREV | S4 | 4.623 / 127 | 2.312 / 63 | 1.156 / 32 |
| LABREV | C25 K50 | 4.133 / 205 | 2.067 / 102 | 1.033 / 51 |
| LABREV | S4 K50 | 4.133 / 205 | 2.067 / 102 | 1.033 / 51 |
| LABREV | C50 | 3.621 / 286 | 1.811 / 143 | 0.905 / 72 |
| LABREV | S2 | 4.447 / 155 | 2.224 / 77 | 1.112 / 39 |
| LABREV | C50 K50 | 4.133 / 205 | 2.067 / 102 | 1.033 / 51 |
| LABREV | S2 K50 | 4.133 / 205 | 2.067 / 102 | 1.033 / 51 |

### RSENATE26: one initial sweep during a supported, continuous fair ramp

| True target | Catch-up min | Loss at 1x / 5x / 10x $ | Filled units at 1x | 1x marked at adverse resolution $ |
| --- | --- | --- | --- | --- |
| 0.395 | 1.67 | 39 / 195 / 389 | 1,155 | 738 |
| 0.295 | 1.67 | 40 / 199 / 397 | 1,199 | 393 |
| 0.445 | 3.33 | 111 / 556 / 1,113 | 1,735 | 1,074 |
| 0.245 | 3.33 | 117 / 586 / 1,172 | 1,916 | 587 |
| 0.545 | 6.67 | 341 / 1,707 / 3,414 | 2,867 | 1,646 |
| 0.145 | 6.67 | 394 / 1,971 / 3,942 | 3,746 | 937 |
| 0.845 | 16.67 | 1,776 / 8,879 / 17,757 | 7,140 | 2,882 |
| 0.000 | 11.50 | 1,379 / 6,896 / 13,791 | 74,000 | 1,379 |
| 0.010 | 11.17 | 1,234 / 6,169 / 12,338 | 11,700 | 1,351 |
| 0.950 | 20.17 | 2,680 / 13,399 / 26,797 | 10,661 | 3,213 |
| 0.050 | 9.83 | 882 / 4,411 / 8,822 | 7,045 | 1,234 |

### RSENATE26: feasible informed hold-through-slew round trip

| Target | Profit/MM loss at 1x / 5x / 10x $ | Optimal entry units within this two-trade family at 1x |
| --- | --- | --- |
| 0.395 | 347 / 1,733 / 3,467 | 14,047 |
| 0.295 | 205 / 1,027 / 2,055 | 12,772 |
| 0.445 | 675 / 3,376 / 6,752 | 14,072 |
| 0.245 | 414 / 2,068 / 4,137 | 13,231 |
| 0.545 | 1,254 / 6,269 / 12,538 | 14,190 |
| 0.145 | 813 / 4,065 / 8,129 | 14,519 |
| 0.845 | 2,674 / 13,369 / 26,739 | 16,192 |
| 0.000 | 1,379 / 6,896 / 13,791 | 74,000 |
| 0.010 | 1,338 / 6,692 / 13,384 | 21,806 |
| 0.950 | 3,130 / 15,648 / 31,296 | 18,843 |
| 0.050 | 1,182 / 5,908 / 11,817 | 17,382 |

### RSENATE26: conservative bound for ALL strategies during one monotone fair ramp

| Target | All-strategy bound at 1x / 5x / 10x $ |
| --- | --- |
| 0.395 | 1,908 / 9,542 / 19,083 |
| 0.295 | 1,037 / 5,186 / 10,372 |
| 0.445 | 3,589 / 17,944 / 35,889 |
| 0.245 | 2,003 / 10,017 / 20,034 |
| 0.545 | 6,447 / 32,236 / 64,471 |
| 0.145 | 3,757 / 18,786 / 37,572 |
| 0.845 | 12,631 / 63,153 / 126,307 |
| 0.000 | 5,966 / 29,830 / 59,660 |
| 0.010 | 5,824 / 29,121 / 58,243 |
| 0.950 | 14,282 / 71,411 / 142,821 |
| 0.050 | 5,243 / 26,214 / 52,428 |

### RSENATE26: one 40-level ladder snapshot, before any replacement

| True target | Snapshot loss at 1x / 5x / 10x $ | Filled units at 1x |
| --- | --- | --- |
| 0.395 | 38 / 192 / 384 | 1,184 |
| 0.295 | 39 / 195 / 391 | 1,227 |
| 0.445 | 111 / 554 / 1,107 | 1,763 |
| 0.245 | 116 / 581 / 1,162 | 1,944 |
| 0.545 | 341 / 1,704 / 3,408 | 2,895 |
| 0.145 | 391 / 1,957 / 3,915 | 3,774 |
| 0.845 | 1,209 / 6,047 / 12,093 | 2,895 |
| 0.000 | 939 / 4,694 / 9,387 | 3,774 |
| 0.010 | 901 / 4,505 / 9,010 | 3,774 |
| 0.950 | 1,513 / 7,566 / 15,133 | 2,895 |
| 0.050 | 750 / 3,750 / 7,500 | 3,774 |

### Own-mark EMA: seven-day, flow-band-sized round trip

| Market | Entry units | Fair after 7d | Round-trip profit / MM loss $ |
| --- | --- | --- | --- |
| TAKEOFF | 825.00 | 0.290300 | 6.89 |
| PNP27 | 825.00 | 0.031526 | 1.04 |
| LABREV | 12.50 | 206.574770 | 103.89 |

