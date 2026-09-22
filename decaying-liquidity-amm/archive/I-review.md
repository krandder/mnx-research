# Adversarial review of Theorem 5 and Choice B

Reviewed 2026-09-22. Targets: [G-storage.md](G-storage.md), Theorem 5 and equations (26)–(28), (32)–(39); [DECAYING_LIQUIDITY_AMM.md](DECAYING_LIQUIDITY_AMM.md); [gen-choiceb.ts](gen-choiceb.ts). Reproduction: `bun I-review-check.ts`, using the companion [check](I-review-check.ts).

## 1. Negative results first

**The exact, fixed-parameter theorem passes. The engineering proposal does not inherit its guarantee as written.** There is an exact profitable full-state cycle through quote-preserving parameter changes. The reference implementation gives repeatable roundoff credits. Ordinary nearest-tick rounding can turn exact zero-cost loops into profitable ones. Inherited flow and a predictable external fair adjustment both permit an individual trader to profit. Preserving a reservation at cutover does not preserve a ladder, and the suggested calibration materially increases permanent price response.

| Finding | Status |
|---|---|
| Fixed parameters, exact integrated fills, certified waits, from `(P,φ)=(0,0)` to `P=0` | **Proved safe**, including negative positions, crossings, and `s=0`. |
| Full `(P,φ,F)` closure from any finite initial state | **Proved:** total trader cost equals dissipation. |
| Basis-compensated parameter changes inside a loop | **Disproved:** an eight-action cycle below earns `0.5` and restores parameters and state. |
| Reference implementation's exact inverse / no roundoff credits | **Disproved in Bun:** `+8,-8` earns `5.684341886080802e-14` with exact numerical state restoration. |
| Nearest-tick block execution | **Disproved for the specified rounding rule:** `+0.20,-0.05,-0.15` earns `0.05`. |
| Individual safety after another trader displaces the book | **Disproved:** a one-unit short/wait/cover earns `14.048903834751901…`. |
| Two accounts jointly manufacture money under the exact rules | **No:** pooling their trades preserves the theorem. An individual account can profit at the other's expense. |
| External mark EMA moving `F` during a wait | **Outside the proof; profitable example:** `0.536269840763639…`. |
| A cap or reduce-only admission rule, without changing execution/state | **Proved safe as a restriction.** Favorable liquidation repricing is a different rule and can leak. |
| Convergent infinite schedules; correctly integrated continuous trading | **Proved extensions below**, subject to explicit endpoint/accounting conditions. |
| Backfill preserves every market's one chosen reservation | **Algebraically possible**, with an explicit coordinate and state mapping. |
| Therefore “no ladder moves”; unchanged reconfiguration; every market family | **Not established; the first implication is false.** |

The numerical profits below are in the model's `price-coordinate × asset-units`, called bp·units in the reference figures. They are not dollar profits without a specified, fixed conversion. Fees are zero. A constant absolute-price offset changes no flat-loop profit. Mathematical counterexamples, conditional implementation counterexamples, observed floating-point behavior, and unproved production applicability are distinguished throughout.

## 2. Exact and implementation counterexamples

Unless specified otherwise, use the reference parameters

\[
a=1,\quad b=10,\quad L=2,\quad s=1/2,\quad \tau=1,\quad F_0=0.
\]

Write `U=V+B`, `H(x)=s x²/2+U(x)`, and `π=−C` for profit. These are closed-form functions in the reviewed files; expressions in them specify exact profits, while decimal values are approximations. `W_r` means a wait of `−log(r)`; thus all waits with `r=1/2` below are finite.

### 2.1 Quote continuity at parameter changes does not prevent a pump

Keep `T,h,A,B` fixed. Permit changes between `s_H=1/2` and `s_L=0`. At fixed state, `R=F+T(φ)` does not contain `s`, so the proposal's price-preserving basis compensation is **zero** for every one of these changes.

Starting at rest with `s=s_H`, perform:

| Action | Result / cash consequence |
|---|---|
| 1. Buy `q=1` under `s_H` | `P=φ=1`, `F=1/2+A(1)`. |
| 2. Change `s` to `s_L` | Quote unchanged. |
| 3. Sell `1` under `s_L` | `P=φ=0`, `F=1/2`; accumulated **profit `1/4`**. |
| 4. Change `s` to `s_H` | Quote unchanged. |
| 5. Sell `1` under `s_H` | `P=φ=−1`, `F=−A(1)`. |
| 6. Change `s` to `s_L` | Quote unchanged. |
| 7. Buy `1` under `s_L` | `P=φ=F=0`; accumulated **profit `1/2`**. |
| 8. Restore `s_H` | The entire state **and configuration** now equal their initial values. |

For general `q` and `s_H>s_L≥0`, each half earns `(s_H−s_L)q²/2`, and the full cycle earns

\[
\boxed{\pi=(s_H-s_L)q^2>0.}
\]

This is exact algebra, independent of `T`, not a numerical artifact. No wait, external price change, or position larger than `|q|` is needed. A trader need not control configuration for a **single announced decrease** in `s` to be harvestable; controlling or predicting the repeated changes is necessary to repeat the complete cycle.

The failure also survives **nonzero** basis compensation. Keep `s,L` fixed and replace `(a,b)` by `(κa,κb)`, `0<κ<1`, while holding `q>0`. Then `T,h,A,B,V` all scale by `κ`. Buy `q` under the original curve, scale it down with `F←F+(1−κ)T(q)` to preserve `R`, sell `q` under the scaled curve, and restore the parameters at `φ=0`. This half earns

\[
\pi_{\rm half}=(1-\kappa)\{q[A(q)+T(q)]-U(q)\}>0,
\]

because `U′=A+T` is strictly increasing. Repeat the sign-reflected half; its fair shift cancels the first one's. The full state and original parameters return with profit `2π_half`. For `κ=1/2,q=1`, this is **`2.508644086393326…`**. Every reconfiguration preserves the current quote exactly, and every parameter tuple satisfies the strict Choice B domains.

More generally let `Δ` denote a parameter switch at fixed `P,φ`. Price-preserving compensation sets `ΔF=−ΔT(φ)`, but storage changes by

\[
J=\Delta G=\Delta U(\phi)-P[\Delta T(\phi)+\Delta A(\phi)]
       -\frac{\Delta s}{2}P^2.
\]

The accounting identity becomes `C=G_end−G_start+D−ΣJ`. Positive `J` is an unfunded addition to storage. Merely eliminating the price jump does not eliminate it.

**Mitigation:** freeze curve parameters over the certified experiment, change them at genuine rest `P=φ=0`, or make each configuration transition satisfy a storage inequality with its own funded cash transfer. A zero-cash change with `J≤0` is safe for this accounting. If a positive `J` is charged, that charge must actually be collected and included in trader cost; recording an operator adjustment alone does not prove trader safety. Changing only a positive `τ` changes the dissipation rate and does not change `G`; that particular change remains safe. Resetting `P`, erasing `φ`, or changing a basis is an additional transition needing its own check.

### 2.2 Ladder execution must dominate the integral, including partial fills

The executable marginal path through a fill is

\[
R_x(u)=F+s u+A(\phi+u)-A(\phi)+T(\phi+u),
\]

not `F+T(φ+u)` with the starting fair frozen. The displacement of the next-unit quote is therefore

\[
I_\phi(u)=s u+A(\phi+u)-A(\phi)+T(\phi+u)-T(\phi).
\]

The proposal's “ladder is the curve's increments” is insufficient to specify this.

**Conditional counterexample: charge a whole slab at its pre-fill spot, but update state by the exact fill rule.** Buy one unit at `R_start=0`; the new spot is `s+A(1)+T(1)`. Sell it at that new spot. Both fills restore `(P,φ,F)=(0,0,0)`, but earn

\[
\pi=s+A(1)+T(1)=s+2h(1)=4.832444475392144\ldots.
\]

This is a counterexample to that discretization, **not a claim that the supplied generator uses it**. An additive half-spread `e` on both fills reduces this profit by `2e`; it does not supply an unconditional safety proof for arbitrary slab size.

**Conditional counterexample: round each correctly computed block-average price to the nearest tick.** Take `F_0=100`, tick size `1`, and no waits:

| Signed fill | Exact average price, approximately | Nearest tick | Trader's signed cash cost |
|---|---:|---:|---:|
| `+0.20` | `100.28829662586408` | `100` | `20` |
| `−0.05` | `100.52537150409513` | `101` | `−5.05` |
| `−0.15` | `100.20927166645373` | `100` | `−15` |

The exact unrounded costs telescope to zero. Rounded cost is **`−0.05`**, profit **`0.05`**, and the exact state returns to `(0,0,100)`. There are no tick ties. Account splitting is unnecessary.

**Mitigation:** enforce `c_executed(x,q)≥G(x')−G(x)` for every executable transition. For monotone marginal prices, price a positive-size ask slab at its far endpoint and a bid slab at its far, lower endpoint; outward rounding then adds cost. Alternatively use a common discrete potential and exact differences. A block-average price requires care if any prefix of the block can execute separately. Check every permitted partial fill and refresh/serialize state correctly; stale or concurrently replenished levels are not covered by the continuous formula. Rounding a signed cost upward is conservative for both trade signs. Nearest rounding is not.

### 2.3 Actual reference-code roundoff credits

Using the unmodified engine in `gen-choiceb.ts:2–14`, start at `(0,0,0,cash=0)`, execute `fill(8)`, then `fill(−8)`, with no wait. Bun produces

```text
P = 0, phi = 0, F = 0
cash = +5.684341886080802e-14
```

One hundred repetitions produce `cash=+5.6843418860808015e-12`, still with exactly zero numerical `P,φ,F`. This is a repeatable computational violation of exact inverse cash, although the unit amount is tiny. It does not disprove the real-arithmetic theorem. Whether an exchange's cash quantum makes it monetizable depends on a settlement policy absent from the generator.

There is a second, structural approximation: line 7 sets `h=a` for `|x|/L<1e−9`. In that branch the code's `A=2ax−T(x)` has

\[
A'=2a-T'\ne a=h\qquad(x\ne0).
\]

The corresponding `B` is not exactly a primitive of that `A` either. Even before floating-point error, the piecewise approximation is not exactly the proved curve. `log1p` helps but does not prevent cancellation in `b|x|−dL log1p(|x|/L)`, in `V`, or in differences of large primitive values. Finite floating-point numbers also cannot implement “every position size”: sufficiently large finite inputs overflow, and small increments at large states can disappear.

**Mitigation:** use consistent small-argument series, stable increment formulas, bounded validated numerical inputs, and conservative cash error bounds/rounding. A tolerance in a test that permits negative costs is not a conservative charge. A single fixed error allowance is not justified across unbounded magnitudes. The generator currently implements neither a fee nor an error charge.

### 2.4 Harvesting inherited displacement: one trader can profit

Victim A first buys `8` from rest, paying `H(8)=288.228382468650…`. The state is

\[
(P,\phi,F)=(8,8,4+A(8))=(8,8,33.255174742639\ldots).
\]

Fresh attacker B then **sells `1`, waits `log 2`, and buys `1`**. Its position is flat. During the wait global `P=7` and `φ` goes from `7` to `5.25`; after the cover global state is

\[
(8,6.25,32.830197121815\ldots).
\]

Its exact profit is

\[
\boxed{\pi=U(8)-U(7)-A(7)-U(6.25)+U(5.25)+A(5.25)
=14.048903834751901\ldots.}
\]

This is analytically positive: pair each unit of the sale from `φ=7+v` with the cover from `φ=5.25+v`, `0≤v≤1`. The former has a `T` advantage at least `1.75a`, and an additional nonnegative `A` advantage because `h` increases on the positive side. Reflect every sign to obtain the same profit after a negative displacement. The conservative `s` cancels; setting `s=0` does not remove the attack.

If A now sells its original eight units, its total loss is `63.410793591636…`; combined trader cost is `49.361889756884…`, which is nonnegative. B extracted value funded by A, not a violation of the aggregate storage accounting. The global state was not at rest when B began, and B did not restore it.

**Mitigation:** narrow the guarantee to aggregate from-rest cost or full-state closure. If individual immunity to predictable relaxation is required, modify execution—e.g. adequate side-dependent charges or restricted timing—and prove the modified rule. A small fixed spread does not universally erase a price drift of unrestricted magnitude. Calling the pre-existing displacement “already paid for” correctly describes the accounting but does not eliminate B's profit.

### 2.5 Two accounts: pooling is safe; accountwise protection is false

If both accounts are controlled by the same trader, use one chronological global sequence and sum their cash. If both end flat and the market started at rest, `Σq=0`; Theorem 5 applies unchanged. Merely assigning different account labels creates no profit. The state and its `P` must be per market, not switched to the currently executing account's position. An account-local cap does not bound global inventory, but this theorem needs no cap.

A separate no-wait example illustrates the distinction. From rest:

```text
attacker buys 1; victim buys 8; attacker sells 1; victim sells 8.
```

The attacker earns exactly `H(9)−H(8)−H(1)=89.131100840124396…`; the victim loses the same amount. The entire market returns to rest, total cash cost is zero, and `D=0`. Thus even a full-state-loop theorem says something about **total** customer cash, not each participant's allocation. It does not prevent sandwiching external orders. If both accounts belong to the attacker, their combined profit here is zero.

**Mitigation:** global, serialized state and aggregate accounting preserve the stated theorem. Protection against other traders' order exploitation requires a separate execution/ordering policy and a separate claim. No independent profitable two-account coalition strategy inside the exact hypotheses was found or is possible by the proof.

### 2.6 External mark average: an additional source of work

Let the external EMA be an additive component `E` of `F`, with `dE/dt=2−E`, `E(0)=0`. It contributes exactly `+1` to `F` over a wait of `log 2`. Start from rest, buy `1`, wait that long, then sell `1`.

Without the mark input, the exact cost of this schedule is

\[
C_0=U(1)+U(-1/4)-U(3/4)+A(3/4)-A(1)
=0.463730159236360953\ldots.
\]

With the mark input, profit is

\[
\boxed{\pi=1-C_0=0.536269840763639046\ldots.}
\]

For a buy `Q`, any specified wait and a net external fair increase `Δ`, the profit changes by `QΔ`. For differentiable continuous external motion the correct identity is

\[
\boxed{C=G_e-G_0+D-\int P\,dF_{\rm ext}.}
\]

Include analogous `PΔF_ext` terms for jumps. Predictability, not speed, permits the example: making the EMA slower only lengthens the wait. An independently known positive external move gives a first-order gain in small `Q`, against second-order endogenous impact cost. If manipulating the external mark costs `K`, that cost must be subtracted; **no claim of net profitable manipulation of the actual external venue is established here**. The proposal does not specify its mark feed, manipulation cost, or update combination sufficiently to prove that.

**Mitigation:** state that the guarantee excludes exogenous-mark P&L, and track the external work term. For a stronger guarantee, freeze that input during the protected experiment or specify a funded/charged coupled mechanism. A stochastic fair-price/no-arbitrage argument would require its own filtration and execution assumptions. Overwriting the learned `F` with an EMA, instead of adding a clearly separated external component, also changes the specified mechanism.

The same accounting applies to a continuing decaying basis, not just the mark. The local `venue-rows.ts:52–57` exponentially decays a configured inventory-curve basis. Preserving that behavior after moving the basis into `F` would introduce another fair update during waits; freezing it instead changes the old behavior. The cutover must choose and account for one of these policies.

### 2.7 Cap and reduce-only: distinguish restriction from subsidy

**Proved non-exploit:** an operational cap that rejects risk-increasing fills, and reduce-only that admits only the subset reducing `|P|`, cannot create a negative loop if all accepted transitions retain the exact state and cost rules. Every admitted path was already among the theorem's paths. `P` must remain the actual signed accumulator; do not clip its stored value at the cap.

**Conditional exploit:** suppose a cap `C=1` triggers a “reduce-only close” that buys the maker's short unit back at its current spot as a flat slab. Buy one unit from rest at the exact integrated cost `H(1)=2.073800388998818…`, then sell it back through that override at `R_after=4.832444475392144…`. Updating state normally restores rest, but profit is

\[
\pi=R_{\rm after}-H(1)=2.758644086393326\ldots.
\]

This is an exact counterexample to that **repricing** rule, not to a pure cap. The inspected local market-maker code has a `lastResortClosingPrice` policy that can move closing quotes adversely for the maker (`packages/mm-core/src/ladder.ts:90–145`). That is a concrete integration surface needing review, not evidence that this exact schedule is executable on the deployed exchange: venue bands, both legs' admissibility, and order sizing matter.

**Mitigation:** preserve the fill inequality on reducing fills too. If forced liquidation knowingly executes at a loss relative to it, book that as an explicit subsidy/external-work term and exclude it from the endogenous no-pump claim. Neither a cap nor a `reduceOnly` flag supplies a missing price inequality.

## 3. Line-by-line mathematical verification

### 3.1 Hypotheses, including ones omitted from the short proposal

The general Theorem 5 assumes odd `T∈C¹`, `T′≥0`, `0<α<1`, the specified compatible `h`, a fixed conservative `S`, well-posed dynamics, and nonnegative relaxation speed. Choice B specializes to **`0<a<b`, `L>0`, `τ>0`, `s≥0`**, with finite real states, signed fills integrated along the live fair, and no other free state changes. `F` in the cost formula is the **pre-fill** `F`. The engineering proposal gives only `a<b` explicitly; the other domain conditions should be written down and validated.

The quantity `P` is the market's cumulative signed customer flow. For a single trader from market rest it equals that trader's position. With other traders it is their aggregate position change. It is not automatically an individual account's position. “Rest” in the theorem means `P=φ=0`; it does not merely mean no fills have arrived recently or `φ=P/2`.

### 3.2 Theorem 5, equations (18)–(22)

**(18): existence, parity and sign — correct.** On each bounded interval, continuous `T′` is bounded and `v^(−α)` is integrable on `(0,1)`. Thus

\[
h(x)=\alpha\int_0^1v^{-\alpha}T'(vx)\,dv
\]

is continuous. The derivative of an odd `C¹` function is even, so `h` is even; `T′≥0` gives `h≥0`. At zero, the integral is `αT′(0)/(1−α)`.

**Definition of `A,B,V` — correct on both half-lines.** `A′=h`, `B′=A`, `V′=T` by the fundamental theorem of calculus. `A,T` are odd, while `B,V` are even and nonnegative: for negative endpoints the integration orientation reverses the negative integrand. No assumption `P≥0` occurs here.

**(21), the key compatibility identity — correct, with a regularity clarification.** Interchanging the finite integrals gives

\[
A(x)=\alpha\int_0^1v^{-\alpha-1}T(vx)\,dv.
\]

Integrate the derivative of `v^(−α)T(vx)` over `0<v<1`. The boundary at zero vanishes because `T(vx)=O(v)` and `α<1`. Consequently

\[
x\int_0^1v^{-\alpha}T'(vx)\,dv=T(x)+A(x),
\quad\text{hence}\quad T+A=xh/\alpha.
\]

This argument works for either sign of `x`. The text's differential equation `xh′=(α−1)h+αT′` is valid for `x≠0`; it should **not** be read as asserting existence of `h′(0)`. The compatibility identity makes `h` differentiable away from zero even if only `T′` is continuous. The homogeneous solution on each half-line is a multiple of `|x|^(α−1)` and is singular at zero, so continuity eliminates both constants. This repairs a possible reading of the proof, not the theorem: no false smoothness assumption is needed.

**(20), trade derivative — correct.** For

\[
G=P[F-S(P)]+W(P)+U(\phi)-PA(\phi),\qquad U=V+B,
\]

the derivatives needed are

\[
G_P=F-PS'(P)-A(\phi),\qquad
G_F=P,\qquad G_\phi=T+A-Ph.
\]

Along a fill `dP=dφ=dq`, `dF=(S′+h)dq`, all the extra terms cancel:

\[
\frac{dG}{dq}=F-PS'-A+T+A-Ph+P(S'+h)=F+T=R.
\]

There is no sign restriction on `P,q,F`, and no division by `P` or `φ`.

**(22), wait derivative — correct.** Holding `P,F` fixed, compatibility gives

\[
G_\phi=\frac{h(\phi)}\alpha(\phi-\alpha P),\qquad
\dot G=-\frac{k h(\phi)}\alpha(\phi-\alpha P)^2\le0.
\]

At `φ=0`, the first expression is `−Ph(0)`, not necessarily zero, and the dissipation is `−kαh(0)P²`. At `φ=αP`, both are zero. Crossing `φ=0` introduces neither a jump nor an omitted boundary term because `G` is continuously differentiable in the variables used. Negative `P` is covered by the same square. Non-strict monotonicity is the right conclusion for general `h,k`; strictly positive dissipation requires a positive rate and displacement where `h>0`.

**Terminal argument — correct but limited.** At `P=0`, `G=U(φ)≥0`; at rest `G=0` for every finite `F₀`. `G` need not be nonnegative on all states. For a finite path, summing fill increments and inserting wait changes yields exactly

\[
\boxed{C=G_e-G_0+D,\qquad D=\sum_{\rm waits}(G^- -G^+)\ge0.}
\]

This proves the two asserted conclusions and no accountwise or externally driven extension. In a full-state loop `G_e=G_0` even when initial storage is negative. For an inventory-only loop from an arbitrary state, the boundary difference can be negative.

### 3.3 Choice B, equations (26)–(28) and (32)–(39)

| Equation | Verification and qualification |
|---|---|
| **(26)** `T` | It is odd, continuous, and strictly increasing. For `x>0`, differentiation gives `b−dL/(L+x)`; the even derivative extends continuously through zero. |
| **(27)** `V` | Differentiating on `x>0` gives `bx−dL log(1+x/L)=T(x)`. Evenness extends `V′=T` to `x<0`; at zero both derivatives agree. It is the cost of the **T component**, not the whole fill. |
| **(28)** `T′` | Exactly `a+d\|x\|/(L+\|x\|)`, hence `a≤T′<b` for finite arguments and limiting slope `b`. `T″(x)=sgn(x)dL/(L+\|x\|)²` away from zero: positive on the right, **negative on the left**. “Convex on each side” is false for signed `T`; the outward magnitude is convex. |
| **(32)** `h` | With `α=1/2`, substitute `v=u²` in (18): `h=∫₀¹T′(u²x)du=b−d∫₀¹(1+ru²)^(−1)du`, giving the arctangent formula. The limit at zero is `a`; `a≤h<b`, strictly increasing in `\|x\|`. |
| **(33)** `A` | For `x≠0`, `2xh′=T′−h`, so `(2xh−T)′=h`. At zero, the expansion below gives `A′(0)=a`. Thus the closed form is the stated primitive globally. |
| **(33)** `B` | Differentiate: `B′=(2A+2xh−T)/3=A`, using `T+A=2xh`. The value and derivative at zero agree. Alternatively integrate `T+A=2xA′`, which gives `V+B=2xA−2B`. |
| **(34)** fills | Along the fill, `F(u)=F+s u+A(φ+u)−A(φ)`. Integrating `F(u)+T(φ+u)` from `0` to signed `q` gives the stated cost. Reversing the oriented integral gives its negative, including fills that cross zero. |
| **(34)** waits | Solves `φ̇=−(φ−P/2)/τ` with fixed `P,F`, for `t≥0`. Negative elapsed time is not an allowed wait. |
| **(35)** fair gain | Differentiating `F(u)` gives exactly `s+h(φ+u)`. This is a mechanical response coefficient, not proof of an information interpretation. |
| **(36)** storage | Set `S(P)=sP`, `W(P)=sP²/2` in (20). This yields exactly `PF−sP²/2+U−PA`; dissipation is `2h(φ)(φ−P/2)²/τ`. |
| **(37)** from-rest identity | Follows directly from telescoping and `P_end=0`. Finite sums suffice; no cap is used. Some loops cost **zero**, e.g. every immediate fill/inverse pair. |
| **(38)** settled quote | After a single buy, `P=q`, `F=F₀+sq+A(q)`, and `φ→q/2`. The displayed quote is the limit, not the quote at every finite “long” wait. The retained skew is `T(q/2)`, generally not `T(q)/2`. |
| **(39)** urgent approximation | The series and its coefficient below agree. It is local with fixed parameters, and cannot replace either the exact gain or the shifted decay globally. |

The relevant expansions, valid on both sides with the indicated parity, are

\[
\begin{aligned}
T(x)&=ax+\frac d{2L}x|x|-\frac d{3L^2}x^3+O(|x|^4/L^3),\\
h(x)&=a+\frac d{3L}|x|-\frac d{5L^2}x^2+O(|x|^3/L^3),\\
A(x)&=ax+\frac d{6L}x|x|-\frac d{15L^2}x^3+O(|x|^4/L^3),\\
V(x)&=\frac a2x^2+\frac d{6L}|x|^3-\frac d{12L^2}x^4+O(|x|^5/L^3),\\
B(x)&=\frac a2x^2+\frac d{18L}|x|^3-\frac d{60L^2}x^4+O(|x|^5/L^3).
\end{aligned}
\]

In particular `h` has a cusp at zero, while `A′=h` is continuous. With `λ_eff=d/(3aL)` and the slow fair-gain floor interpreted as **`s+a`**,

\[
h-a-\lambda_{\rm eff}|T|
=-\left(\frac d{5L^2}+\frac{d^2}{6aL^2}\right)x^2
+O(|x|^3/L^3),
\]

as claimed. If the gain error is bounded by `M` along a monotone fill, the fair endpoint error is at most `M|q|` and its integrated cash error at most `Mq²/2`, assuming the same starting fair and flow path. This does not bound errors accumulated over arbitrary reconfigured or approximated schedules.

**`s=0` passes without qualification beyond the original domains.** The fill slope remains `h+T′≥2a>0`. Neither the wait sign nor terminal `U≥0` relies on `s`. More strongly, holding all other parameters fixed, the total contribution of `s` on an inventory round trip is conservative and cancels. The initial value of `F` likewise cancels on a flat loop. Increasing `s` is not a cure for the inherited-displacement attack.

## 4. Schedules that might evade a finite-fill statement

### 4.1 Countably many fills, Zeno sequences and limits

The conventions in `G-storage.md:9` explicitly start with finite paths. “Every schedule” in the abstract claim needs that qualifier or an admissibility extension.

**Proved extension:** for chronologically ordered finite prefixes let `C_n=G(x_n)−G(x_0)+D_n`. If the states converge to a finite `x_e`, and the ordered cost converges, continuity of `G` and monotonicity `D_n↑D` give the same identity at the limit. If `P_e=0` and the initial state is rest, the limit cost is nonnegative. If `D=+∞` with a finite limiting state, costs tend to `+∞`, not a profit. This argument does not itself require finite total variation once the prefix endpoint/cost limits exist. Bounded-variation limits with correctly converging execution costs are a familiar sufficient case.

For a sequence of already-flat finite schedules, every cost is nonnegative, so any finite limit is nonnegative as well. Arbitrarily many operations cannot change that fact.

**Not defined by the theorem:** an infinite sequence with no state limit, an undefined/reordered cash sum, a state reset at the accumulation time, or merely `P_n→0` while other terms such as `P_nF_n` do not have the required limit. Labeling vanishing units against a divergent price as a realized flat terminal state omits a boundary/liquidation condition. No profitable admissible limiting schedule was found; the argument above proves there is none in the specified convergent class. It is not a claim about every conceivable infinite-variation settlement convention.

### 4.2 Fills during waits

A finite number of instantaneous fills during a scheduled wait is handled by splitting that wait at the fill timestamps and recalculating the target using the new `P` after each fill. This is already a finite mixed schedule. A stale target is not the rule.

**Proved continuous-time extension:** let a locally integrable trading rate be `u(t)` and use

\[
\dot P=u,\qquad \dot\phi=u-(\phi-P/2)/\tau,\qquad
\dot F=(s+h(\phi))u,\qquad \dot C=(F+T(\phi))u.
\]

The chain rule gives

\[
\dot G=\dot C-2h(\phi)(\phi-P/2)^2/\tau.
\]

Thus simultaneous trading and relaxation do not create a loophole when work is integrated along this live path. Finite jumps can be combined with these continuous intervals using the original fill integrals. A finite-duration fill cannot be priced by (34) while secretly decaying `φ` inside it: (34) describes an instantaneous, nondecaying fill. Brownian/infinite-variation execution needs an explicit integration convention and the associated second-order terms; substituting stale `R dq` and dropping the block's quadratic cost is a different model.

### 4.3 Stop non-flat, wait, then close

Appending any finite wait and the closing fill `q=−P` gives another finite path from rest to `P=0`; it is covered exactly. Waiting at nonzero `P` moves toward `P/2`, not zero. A wait of infinite duration has a finite state limit at fixed `P,F`; taking that limit and then closing is safe by continuity.

For illustration, a single buy `Q`, wait multiplier `r`, and sale `−Q` costs

\[
C=U(Q)+U(x-Q)-U(x)+Q[A(x)-A(Q)],\qquad x=(1+r)Q/2.
\]

The storage proof proves this nonnegative for every `Q` and `0≤r≤1`, including `r=0` as a limit. It is independent of `s`. An intermediate mark-to-market gain is not realized flat cash. Nor does a final wait at `P=0` erase a loss: it simply converts residual `U(φ)` into more dissipation while leaving cash unchanged.

### 4.4 Further exact scope checks

There is no exploit from a pure admission cap or account relabeling, as proved above. Exact matching requires atomic chronological updates; duplicate/stale state, omitted fills, inventory resets, maker rebates, funding, borrowing and settlement cash flows are extra mechanisms. Positive absolute-price constraints and reserve solvency are absent from the mathematical model, which permits centered prices on all of `R`. The result does not guarantee an economically solvent unbounded book.

The full-state statement is not vacuous: starting from rest, concatenate

```text
+8, W_(1/2), −12, W_(1/2), +4
−8, W_(1/2), +12, W_(1/2), −4.
```

Each half closes `P,φ`; their fair changes cancel by reflection. The full path returns all three states in real arithmetic and costs `218.861614680799…`, exactly its dissipation. The companion check verifies this identity as well as immediate reversals at arbitrary signed starting states.

## 5. Cutover and calibration

### 5.1 What current local code actually represents

I inspected the local checkout at `/home/kelvin/market-maker` read-only. It is evidence about that checkout, **not a claim that a particular commit or every configuration row is deployed**. The canonical wiki search produced no matching Choice B/parameter dossier; local implementation sources supply the mapping evidence. No control database or live balances were read.

The relevant sources are [venue-rows.ts](/home/kelvin/market-maker/src/venue-rows.ts:70), [curve.ts](/home/kelvin/market-maker/packages/mm-core/src/curve.ts:114), [quote.ts](/home/kelvin/market-maker/packages/mm-core/src/quote.ts:79), and [SINGLE_COORDINATE_CONFIG.md](/home/kelvin/market-maker/proposals/SINGLE_COORDINATE_CONFIG.md:9).

Write `D_p=permanent_depth_units_per_1pct`, `f=far_liquidity_fraction`. The current derived transient depth and slopes are

\[
D_t=D_p\frac f{1-f},\quad k_p=100/D_p,\quad k_t=100/D_t.
\]

The transient-depth column named in the proposal is a retired input in this coordinate scheme. The source derives it from `D_p,f`.

For canonical `w=band_width_bps`, the internal flow band is `w(1−f)/f` bps and its size is

\[
k=\frac{w(1-f)}f\frac{D_t}{100}=\frac{wD_p}{100}.
\]

For a genuinely legacy flow-band range `r_bps`, the corresponding formula instead is `k=r_bps D_t/100`. Copying a bps field into `L` as units is dimensionally wrong. Copying the already converted `k` is a possible initial **scale choice**, not a shape-preserving conversion. Convert `flow_decay_minutes` to the chosen time unit as well; retaining its numerical value without its unit is not meaningful.

Current band smoothing uses `σ=k/20`. Without the optional growth-side enhancement, the transient slope at zero is

\[
t_0=k_t\,[1-1/\sqrt{1.01}]/2\approx0.002481404895\,k_t,
\]

and its far slope is `t_∞=k_t`. The full instantaneous slope adds `k_p`. Setting `s=k_p`, `a=t_0/2`, `b=t_∞/2` matches these two limiting instantaneous slopes, **if these are the intended old slopes**, but not the intervening function. With no band and no growth enhancement, the old transient slope is constant, so this literal mapping gives `a=b`; that is the linear boundary case, not the proposed strict `a<b` family. An unsmoothed zero-slope inner band would give `a=0`, also outside Choice B's stated strict assumptions.

The current `flow_saturation_units` does **not** make the price curve flat. `curve.ts:143–170` implements a growth-side factor whose derivative rises from `1` to `2` and then remains `2`. Beyond it the skew is still linear and unbounded. It also acts asymmetrically on the two sides. No single odd Choice B curve with one tail slope reproduces all those branches. Describing its removal as removing an infinite-depth wall misdescribes this implementation.

### 5.2 The new flow state is not the old EWMA

Set

\[
E=2\phi-P.
\]

Under the proposed rules, a fill sends `E←E+q`, and a wait gives `Ė=−E/τ`. Thus the exact relationship, for a consistently initialized history, is

\[
\boxed{\phi=(P+E)/2.}
\]

`E`, not `φ`, is the old ordinary signed exponentially decayed flow. This also shows why urgency in `h(φ)` is partly sensitivity to cumulative inventory: even if `E≈0`, `φ≈P/2` may be large.

The current flow accumulator uses maker signs: a maker purchase increases both its inventory `X` and its decayed flow `Φ` ([flow-accumulator.ts](/home/kelvin/market-maker/packages/mm-core/src/flow-accumulator.ts:16)). With aligned origins, customer-sign migration gives `P=−X`, `E=−Φ`, hence `φ=−(X+Φ)/2`. Origins, initial endowment, and any fills outside this accumulator must be specified; net fills since a new cutover and total existing maker inventory need not be the same number. Simply renaming `Φ` to `φ`, without the sign and state mapping, is not a history-preserving conversion. It can still define an arbitrary initial state, but then must be described as such.

### 5.3 The suggested slopes do not preserve permanent response

For an isolated infinitesimal buy `q` from rest,

\[
\Delta R_{\rm immediate}=(s+2a)q+O(q^2),\quad
\Delta F=(s+a)q+O(q^2),\quad
\Delta R_{\rm settled}=(s+3a/2)q+O(q^2).
\]

Consequently, with `s≥0,a>0`, the settled fraction is

\[
\boxed{\rho_{\rm settled}=\frac{s+3a/2}{s+2a}\ge\frac34.}
\]

The fair alone retains at least one half. Under `s=k_p`, `a=t_0/2`, an old linear local model with permanent fraction `f_0=k_p/(k_p+t_0)` changes to fair retention `(1+f_0)/2` and settled-price retention `(3+f_0)/4`. For `f_0=0.2`, these are **0.6 and 0.8**, not 0.2. The comparison uses the old **local** transient slope; a banded book's configured far fraction need not equal that local fraction.

This is an algebraic incompatibility, not merely a need for better fitting: `α=1/2,s≥0` cannot preserve a local settled fraction below 75%. Matching old immediate slope `k_p+t_0` and old settled slope `k_p` simultaneously would require `a=2t_0` and `s=k_p−3t_0`, which is inadmissible if `k_p<3t_0`. The proposal must make the changed retention explicit or choose a different family/target.

The patient-trading claim also needs correction. In the quasistatic limit of tiny slices followed by sufficient relaxation, `φ≈P/2`, and

\[
F(P)=F_0+sP+2A(P/2),\quad
R_{\rm slow}(P)=F_0+sP+2A(P/2)+T(P/2).
\]

Hence patient cost to acquire `q>0` is

\[
C_{\rm slow}=F_0q+\frac s2q^2+4B(q/2)+2V(q/2),
\]

with local path slope `s+3a/2`, not `s+2a`. The latter is the **within-fill marginal slope at `φ=0`**, not the amount each unit costs and not the slope of the fully relaxed accumulation path. Fair retention `(s+a)q` is only a small-`q/L` approximation. With the reference parameters and `q=8`, patient fair retention is `26.276478716782…`, versus the proposed approximation `12`; a sweep retains `33.255174742639…`. Taking smaller slices does not eliminate this discrepancy at fixed large inventory.

For a sweep followed by an ideal quasistatic unwind, the final fair shift is `A(q)−2A(q/2)>0` for `q>0`, since `h` increases. The positive cost follows from the dissipation already incurred while holding the sweep. That is a valid specified example; it does not validate the proposal's general patient-price statement.

### 5.4 Precisely what an `F` backfill preserves

Once `P_new,φ_new` and a common linear price coordinate have been chosen, the assignment

\[
\boxed{F_{\rm new}=R_{\rm old}-T_{\rm new}(\phi_{\rm new})}
\]

preserves **one scalar reservation** exactly in real arithmetic. Different markets can each receive their own `F`; there is no cross-market obstruction to this scalar equation. Include the old operator basis and current decayed reconfiguration basis when computing `R_old`, and sample all state at one consistent timestamp.

It does **not** preserve any of the following automatically:

* The marginal slope `s+h(φ)+T′(φ)`, any finite-fill average, or the full increment function `I_φ(q)`.
* Level quantities, tick locations after rounding, spread conversion, inventory/margin constraints, or partial-fill execution.
* The two distinct old reservation anchors when a growth-side defense is active (`quote.ts:152–167`, `ladder.ts:214–227`). One center plus an unchanged symmetric spread cannot in general match both.
* Wait drift or the settled quote, the historical fill-dependent fair, or initial storage.

For a simple shape counterexample, an old locally linear marginal path `R_old+Kq` and any strict `a<b` Choice B path can have equal anchors and equal initial slopes. Choice B's slope immediately changes with `|q|`, so its finite-distance quotes differ. Adding a constant `F` cannot fix that. “No ladder moves” does not follow even before tick rounding or caps.

A migrated nonzero `P,φ` is not theorem rest; Section 2.4 applies to its available displacement. One can deliberately initialize a new pricing origin at `P=φ=0` and preserve only the current center, but that discards the old flow/position pricing history and must be a stated policy, with physical risk inventory kept separately. There is no simultaneous, automatic preservation claim.

### 5.5 Currency and binary-market coordinates

The certificate prices the cash-integrable `R` appearing in `C=∫R dq`. In ordinary linear coordinates a fixed positive affine conversion to cash preserves flat-loop signs. Changing the conversion scale with the fair or mark introduces more terms. For binary markets the inspected implementation uses a logistic map of log odds ([binary.ts](/home/kelvin/market-maker/packages/mm-core/src/binary.ts:3)). One may match a reservation by setting the new coordinate to the inverse logistic of the old price, but

\[
\int \operatorname{logistic}(R/10000)\,dq
\ne\text{a fixed affine transform of }\int R\,dq.
\]

The displayed `G` therefore does not prove dollar-cash safety for that extension. A new cash-denominated certificate or a separate argument is required. This review does **not** claim a counterexample to every such transformed model; it identifies an unsupported “every market family” inference. Positive-price clamps, binary settlement, and margin liquidation are similarly additional rules.

## 6. Sentence and claim audit of the proposal

Line numbers refer to the reviewed 75-line `DECAYING_LIQUIDITY_AMM.md`. This inventory includes prose sentences, table claims, code annotations and the headline. **“Unsupported” does not always mean false:** a design decision, an empirical calibration, and a rollout plan are not conclusions of a theorem. “Conditional” means a true mathematical statement loses its force if applied to the unspecified production mechanism.

| Location and sentence/claim | Assessment and required correction |
|---|---|
| **L1:** “Status: Proposed (2026-09-22). Report with figures and proofs: …” | Administrative/bibliographic assertion, not a theorem conclusion. The linked hosted page could not be fetched by the web tool; this review relies on the local targets, not an assumed copy of that page. |
| **L3:** “One curve, a fair that learns from urgent flow, and no money pump” | The first is a design description. “Learns” is an information interpretation not proved. “No money pump” needs the fixed-mechanism, exact-cash, initial/terminal-state qualifiers, especially with retained mark updates and parameter changes. |
| **L5:** “The market maker prices one curve.” | True of the specified ideal marginal path when the evolving fair is included. It does not establish that today's ladder or a proposed implementation actually executes that path. |
| **L5:** “Recent one-way flow pushes the price along it; the push fades when flow stops; part of every trade stays in the fair, and more of it stays when the trade lands while the price is already displaced.” | Mixed. A same-sign fresh burst does this, but relaxation can **raise** `R` when `φ<P/2`. For example `+8,W_(1/2),−6` leaves `P=2,φ=0`; the next wait raises `φ` toward `1`. Only excess relative to `P/2` decays. Fair gain depends on `\|φ\|`, not solely recent urgency or distance from the settled price. “Stays” means through waits; later fills can reverse it. |
| **L5:** “This proposal fixes the exact rule for that, replaces today's two-curve sum and its parameters with it, and states the property that makes it safe: no sequence of trades and waits by one trader, starting from a calm book and ending flat, can take money from the market maker, with no inventory limit needed for the proof.” | The ideal from-rest clause is proved. Replacement/compatibility is not. Define “calm” as `P=φ=0`, require no intervening external flow or free configuration/fair changes, and say finite schedules or specify admissible limits. A relaxed book carrying inventory is not the theorem's rest. |
| **L9:** “The obvious rule is ‘the fair moves by λ·\|skew\| per unit filled, and the skew decays to zero.’” | A definition of a different mechanism, not a consequence of Theorem 5. Signed fill integration and nonzero gain matter. |
| **L9:** “It is exploitable without a position limit: park a large resting position, then repeatedly buy a little while displaced …; the resting position earns the difference every cycle.” | Supported by separate zero-target results in `G-storage.md`, not by Theorem 5 alone. Those results require the stated nondegenerate curve, gain and execution assumptions. It is not an exploit of Choice B. |
| **L9:** “The same holds for any gain that varies with the skew, however it is bounded.” | Overbroad literally. Theorem 4 concerns continuous, even, nonconstant displacement-only gains, fixed fair during waits, and the specified zero-target reachability. It does not classify every state-dependent or discontinuous “gain,” and Theorem 5 itself uses a compatible varying gain with a different target. Restore the qualifiers. |
| **L9:** “Two exits exist: keep a hard position cap C and set λ·C ≤ 1, or do not decay the skew all the way to zero.” | These are two choices, not an exhaustive classification. The cap condition belongs to the literal `λ\|T\|` zero-target rule and its assumptions; it is not a safety bound for every bounded varying gain. Constant conservative gains and changed execution are other possibilities. |
| **L9:** “This proposal takes the second, so the position cap goes back to being a risk limit only.” | Correct for the exact rule with a pure admission cap. Unsupported if cap activation changes prices, state, liquidation or settlement; Section 2.7 supplies the distinction. |
| **L13:** Parameter sentence, including “slopes … at the touch and far out” and “s … what every unit leaves in the fair.” | Specify `0<a<b`, `L,τ>0`, `s≥0`. `a,b` are slopes of **T**, not total fill slopes. “Touch” equals the minimum only when `φ=0`. `s` is only the baseline permanent slope; the actual fair gain is `s+h`. These are parameter definitions, not empirical identification. |
| **L18:** `V` annotated “the cost of walking the curve from rest.” | Correct for the `T` component alone. Total from-rest fill cost is `F₀q+s q²/2+V(q)+B(q)`. |
| **L19:** `h` annotated “the fair's gain per unit at displacement x.” | Missing the additive `s` if read as total gain. `h` is its displacement-dependent component. |
| **L26–27:** Fill assignment followed by `cost = F·q+…` | Mathematically correct with **old `F`**; the presentation must make that evaluation order explicit. Using the already-updated `F` overcharges by `q[sq+A(φ+q)−A(φ)]`, destroys the exact identity and inverse claim, and is not the reference implementation. |
| **L30:** “The ladder is the curve's increments from the current φ, as today; bids and asks sit the half-spread away from R.” | Not an execution specification or theorem conclusion for the existing ladder. Use the complete `I_φ` in Section 2.2; include within-level execution, partial fills, quote refreshes, spread conversion and tick policy. Current growth-side and domain-bound anchors need not be symmetric. |
| **L30 and L61:** “A fill followed by its immediate inverse returns the state and the opposite cash exactly”; “Fill inverse … net zero cash.” | Proved for fee-free real-arithmetic formulas. False of the provided floating-point cash, and incompatible with claiming zero net cash after charging a positive spread/tolerance. State explicitly whether these are base-curve or executed-cash invariants. |
| **L34:** “At the touch the next unit costs s + 2a bp; far out, s + 2b.” | These are **slopes in bp/unit**, not next-unit prices. The current next-unit price is `F+T(φ)` and its slope is `s+h(φ)+T′(φ)`. The touch slope equals `s+2a` only at zero displacement. |
| **L34:** “Liquidity is 1/(s + 2a) units per bp at the touch, falling smoothly to a floor of 1/(s + 2b), never zero.” | True when describing outward movement from `φ=0`, with positive domains. False as a description of both sides of every displaced book: a reversal toward zero initially **increases** liquidity. The density is continuous but has a cusp at zero, so “smoothly” is not a differentiability claim. |
| **L34:** “There is no band edge and no saturation; a flat skew would be infinite depth at one price and is not offered.” | The formula has no flat tail. A flat **T alone** means infinite depth for that component, not necessarily for the executable curve when `s+h>0`. Current `flow_saturation_units` caps a derivative rather than flattening the skew; the replacement comparison is false for the inspected code. |
| **L35:** “Of each unit's cost, T′(φ) is temporary and comes back as φ relaxes; s + h(φ) stays in the fair.” | A decomposition of marginal **slope**, not cash cost. The `T` contribution is not wholly temporary: a held position retains `T(P/2)`. At a relaxed state, half the first-order `T′` response to an extra infinitesimal fill remains after the next relaxation. Fair increments persist through waits, not necessarily all subsequent fills. |
| **L35:** “h rises from a at rest to b far out: a trade that arrives while the price is displaced is treated as more informed than a trade on a calm book.” | The monotonicity is proved, with `b` attained only as a limit. “More informed” is a modeling interpretation, not a posterior or adverse-selection theorem; patient inventory also raises `h`. |
| **L36:** “After a wave … settles at F₀+s·q+A(q)+T(q/2) … half the flow stays …”; “That is the one departure from ‘the skew dies to zero’: with inventory on the book, half of it keeps pushing.” | The displayed asymptote and retained **units** are correct for a wave from rest. “One departure” is too broad as a compatibility claim: permanent sensitivity, patient accumulation, state mapping, price retention and reconfiguration all change. Half the units does not mean half the skew. |
| **L37:** “A patient trader who buys q in small slices on a calm book pays close to s + 2a per unit and leaves about (s + a)·q in the fair.” | False generally and dimensionally imprecise. Use the quasistatic formulas in Section 5.3; the fair approximation requires small cumulative `q/L`, not merely small slices. |
| **L37:** “A trader who sweeps pays the steep part and leaves more.” | Qualitative, requiring a comparison with the same quantity, start and specified patient schedule. For the quasistatic comparison it follows from monotonic `h`, not from the no-loop theorem alone. An arbitrarily small sweep need not reach a “steep part.” |
| **L37:** “A trader who sweeps and then unwinds patiently ends flat, has lost money, and has moved the fair: the case the operator asked for.” | Valid for the specified nonzero sweep/relaxation/quasistatic unwind, and illustrated by the generator's particular schedule. It is not a universal strictly positive loss/fair-change assertion for every schedule called “patient”; no-wait reversals have zero loss and zero fair change. |
| **L41, final sentence:** “It is the same certificate that shows today's rule (fair fixed, skew decaying to zero) is safe, extended to a moving fair; the shifted relaxation target is what makes the wait charge the resting position, which is what the pump needs to be free.” | The storage **method** extends an ideal fixed-reference rule, but is not a proof of today's entire ladder, mark, band, domain and risk machinery. Waits do not debit cash; they decrease storage. The first three sentences of L41 are correctly proved under Section 3's hypotheses. |
| **L43:** “Two things sit outside the guarantee … the external mark average … and the spread, which only adds to every loop's cost.” | Incomplete list: parameter changes, initialization, other traders, discretization/rounding, price-coordinate conversion, state resets and repriced liquidation also matter. A nonnegative additive spread with unchanged state is a provable extension, `C=ΔG+D+fees`; it is not established by calling every spread policy a pure fee. Rebates or state-changing policies need separate treatment. |
| **L49–50, replacement rows:** old depths/fraction → `a,b,L,s`; band/saturation → bend/no saturation | Proposed migration choices, not an exact mapping. Current derived depths, unit conversion, asymmetric branches and retained response prevent the implied direct equivalence; Section 5 gives the equations. |
| **L51, reservation row:** “reservation = fair − (a·X + b·curve(Φ))” → `R=F+T(φ)` | A schematic old equation omitting basis terms, market-specific price maps, growth-side anchors and clamps. The new standing effect is indeed distributed through `F` and the target; this does not preserve all old reservations/quotes. |
| **L52, state row:** old decaying `Φ` → new `φ`, retained `P,F` | The new dynamics are proved, but the migration is incomplete without a sign/origin mapping. The ordinary EWMA is `E=2φ−P`, not `φ`. |
| **L53, mark row:** “kept as an external input, slow, on the exchange mark” | An engineering choice outside fixed-`F` waits. “Slow” provides no safety bound. Define its work term and whether it adds to or overwrites the learned fair. |
| **L54, reconfiguration row:** “unchanged: any parameter change is offset so R does not jump” | Quote continuity can be arranged, but unchanged safety is false. Section 2.1 is an exact full-state counterexample, even with no jump at any switch. |
| **L56, first sentence:** “Starting values from today's rows: s …; a and b … half …; L …; τ ….” | A calibration proposal, not a theorem or a complete migration. See Section 5 for the derived row fields, units, incompatible branches, special cases, and changed retention. |
| **L56, second sentence:** “The backfill sets F so that R equals today's reservation on every market, so no ladder moves at cutover.” | First clause holds for one selected scalar anchor in a specified coordinate. The **“so” implication is false**: slopes, amounts, side anchors and future drift change. |
| **L60:** “Cost identity: for random schedules … on every market family … cash equals … to rounding; never negative.” | Exact arithmetic gives an identity for cash **cost** under the specified model. The generator's `cash` is its negative. Random tests cannot prove universality; the generator neither checks `G,D` nor tests every market family. Rounding and cash-coordinate transformations need their own implementation proof. |
| **L62:** “Shape: T convex on each side, T′ between a and b, retrace exact, spread a pure fee (the A group of the catalog, restated on T).” | Signed `T` is **concave** on the negative side. The derivative bound and ideal fill retracing hold. Pure-fee spread and preservation of a separate catalog's invariants are implementation requirements, not consequences of those facts. |
| **L63:** “Rounding: finite precision charges a conservative tolerance rather than granting repeated round-off credits.” | A desired requirement, **not implemented** by `gen-choiceb.ts`; Section 2.3 demonstrates the opposite. The report's recommendations in `G-storage.md:689` are not executable protection. |
| **L67:** “mm-core: curve, state … tests … . Goldens change on every scenario; the PR lists them.” | Work/validation plan. No PR or new mm-core implementation was supplied; changing every golden is neither proved nor necessary in scenarios with no affected quotes. Do not describe this as completed validation. |
| **L68:** “Control schema … backfill … preserve every reservation; dashboard … settled price F+T(P/2).” | Schema/dashboard work is a plan; it must include correct existing flow/timestamp handling. The settled-price formula is proved. Reservation preservation has only the scalar meaning in Section 5.4. |
| **L69:** “Testnet, then production with the operator's approval, in the usual order.” | Rollout policy, not mathematics or evidence of readiness. |
| **L74:** “s per market: today's permanent slope is the starting point, not a derivation.” | Correctly labels a choice. It does not address the unavoidable extra `h` and retained `T(P/2)` contributions. |
| **L75:** “A belief model whose posterior is exactly this rule does not exist on this state; the rule is mechanical, calibrated from flow … as described in the report.” | **Unproved nonexistence claim.** `G-storage.md:556–558` says no non-tautological exact model is **established**, and explains obstructions to particular interpretations. It does not rule out every possible stochastic observation/value model on this state. Suggested calibration mechanisms are not evidence of an executed fit; the generator uses hard-coded illustration parameters. Replace “does not exist” with “has not been established here.” |

For completeness, the remaining mathematical text is supported with the stated domains and execution convention: L17's formula/derivative; L20–21's primitives; L23's definition and rest initialization; L25–28's rules with pre-fill `F`; L41's first three storage sentences; and L73's general-`α` certificate. Section headings and “Curve and helper functions” are organizational text. Repeated claims above have all their locations listed. The exact formulas and the design plans should not be presented as evidence that the deployed execution satisfies them.

## 7. Reproduction, evidence and remaining unknowns

`bun gen-choiceb.ts` completed successfully, producing its expected figures JSON under `/tmp/pump-sim`. It reported scenario cost `89.56`, final fair `9.73`, and smallest sampled loop cost `31.14`. This file is a **figure generator**, not a validating test suite: it has no assertions of the storage identity, wait monotonicity, cash-integral equality or rounding policy. Its 2,000 random paths cover only one parameter tuple and moderate sizes. Positive samples are consistent with, but do not prove, the theorem.

There is a small figure error too: `gen-choiceb.ts:53–65` calls the quote after `3τ` “settled” and labels it with the limiting formula. It reports `54.9`; the actual limit after the eight-unit sweep is `4+A(8)+T(4)=53.480153546613…`. The finite-time sample has `φ=4+4e^(−3)`, not `4`. Its sliced unwind takes `8×7×0.05=2.8τ`, although the comment says `3τ`.

The added companion check uses the generator's actual engine prefix, not a silently corrected copy. It checks `h` against its integral definition; `A,B,V` against numerical integration; signed block cost against an independently integrated live-price path; wait dissipation across zero and at negative `P`; `s=0`; arbitrary-state immediate inverses to numerical tolerance; and 800 seeded 20-fill from-rest paths. It also asserts the observed counterexamples, so an overall successful run does **not** mean the known roundoff/modified-rule failures vanished.

Observed accounting residual across those random paths was at most `1.2505552149377763e−11`; minimum cost was `160.67887874265992`. The identities are proved in Section 3, not inferred from those tolerances. Separate 60-digit `mpmath` evaluation checked the inherited-flow, external-mark and sandwich expressions; the quoted long decimals agree with it. Small perturbations cannot remove the strictly positive profits in the exact examples. Floating-point-credit values are explicitly implementation observations instead.

Reviewed input SHA-256 values:

```text
G-storage.md
aea7cad684475fccd8107414b2495606ed31cd850231a1bb159246482c4f6de2
DECAYING_LIQUIDITY_AMM.md
6071f73406e652e34a03f863355e57d2d621b50b4eb384d235632adc642d2498
gen-choiceb.ts
87259ab10924ddb260b6f7152e8d0c90bcb1920bdc057b9cb87af43a6aa5b07c
```

**Proved:** the exact fixed-parameter certificate, its stated limiting/continuous extensions, the listed analytic counterexamples to added rules, and the algebraic migration limitations. **Observed:** the particular Bun rounding credit, sample checks and figure outputs. **Unproved here:** production executability/profit after actual fees, cash quanta, venue constraints and mark-manipulation costs; a storage-safe discretized/reconfigured deployed mechanism; safety after nonlinear price-coordinate conversion; an empirical calibration; and universal Bayesian-model nonexistence. There is no residual conjecture needed for the finite-schedule theorem itself.
