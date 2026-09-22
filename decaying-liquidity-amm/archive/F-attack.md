**F — Adversarial report on the information model behind the decaying-liquidity AMM**

Research brief 2, including the binding clarification that positions are unbounded. This report distinguishes an exact conditional expectation under a specified flow model, competitive execution prices, and a rule that remains safe when a trader controls its inputs. Those are three different requirements. All propositions below are proved under their stated assumptions; approximations and unresolved claims are identified explicitly.

The strongest negative results are these:

1. **Changing the urgent update from absolute displacement to squared displacement cannot repair the uncapped rule.** With the original decay, a fill-only update of the form `dF = [S′(P) + h(φ)] dq` is safe for all loops from rest only if the continuous, even function h is constant. This excludes every positive λ|T| update and every nonconstant quadratic replacement. The obstruction concerns the state architecture, not a missing Taylor coefficient.
2. **The proposed martingale bridge is false without a condition about interventions.** A rule can be an exact Bayesian posterior on every history of a full-support observational model and nevertheless offer a profitable deterministic sequence to someone who controls the orders. A six-fill example and a homogeneous Poisson example below restore both position and posterior. Positivity of path probabilities does not make a conditional distribution invariant to changing the mechanism that generates orders.
3. **An active-information alarm and a permanent-value estimate cannot generally share the same decaying state.** With exponentially distributed episode lifetimes, silence can make the probability of continued informed activity converge to zero while leaving a strictly positive posterior probability of a permanent value change. Complete forgetting is valid in a different model: an informed trader who would continue sending detectable orders forever.
4. **The simplest Poisson episode model does not have exponentially weighted signed volume as its sufficient statistic.** Activity, direction, elapsed exposure, and information already learned are distinct. An almost instantaneous buy–sell pair restores the AMM state but changes Bayesian beliefs about activity and the price of the next buy.
5. **Sparse priors do not establish global steepening.** A three-point prior steepens locally and eventually saturates. A Gaussian spike-and-slab prior has a finite, positive limiting slope but overshoots that slope, so it also fails the requested global shape. The correct curvature condition concerns posterior third moments and the likelihood, not a blanket classification of priors.

There is consequently no exact reconstruction satisfying all the brief's requested features within the proposed state and execution architecture. There is an exact, small Poisson filter, derived below; it has a different update law and additional belief state. There is also an explicitly Bayesian, uncapped replacement whose absence of profitable loops is proved directly. Neither result needs an operational inventory cap.

**Conventions and the uncapped obstruction.** A positive dq buys from the AMM. Trader cash cost is the integral of the contemporaneous quote, including changes of F during a fill. A position round trip starts and ends with the trader's inventory zero. An exact system loop additionally restores φ and F. Unless stated otherwise, constructions start at P = φ = 0, have finitely many operations and finite waits, and allow arbitrarily large but finite positions. Write β = 1/τ and

\[
V_T(x)=\int_0^x T(u)\,du.
\]

Assume T is odd, increasing, continuous, and locally absolutely continuous. Then V_T is even and nonnegative. The live S contribution is conservative: if G = F − S(P), then dG = h(φ)dq during fills, G is fixed during waits, and the contribution of S(P) to any position round trip is zero. Normalizing S(0) = 0 only changes the initial center.

**Theorem 1 — no nonconstant displacement-only permanent gain.** Suppose

\[
d\phi=dq-\beta\phi\,dt,\qquad
dG=h(\phi)dq,\qquad R=G+S(P)+T(\phi),
\]

where h is continuous and even. With unrestricted inventory and the execution convention above, safety on every finite exact loop from rest is equivalent to h being constant.

**Proof.** Put H(x) = ∫₀ˣ h(u)du; H is odd. For u,v>d>0, perform the cycle

\[
+u,\quad \phi:u\longmapsto u-d\text{ by waiting},\quad
-(u+v-d),\quad \phi:-v\longmapsto -v+d\text{ by waiting},\quad +(v-d).
\]

It restores P and φ but changes G by

\[
\eta=[H(u)-H(u-d)]-[H(v)-H(v-d)].
\tag{1}
\]

If this vanished for every u,v,d, all equal-length integrals of h on the positive half-line would agree; continuity would make h constant. Thus nonconstant h gives a cycle with η ≠ 0. Reflect its signs if necessary so η > 0. Let its cash cost excluding the conservative S contribution be K. Translating the cycle to any held inventory L does not change K or η: its net order is zero, and G and φ do not depend on the inventory offset.

Reach (P,φ) = (L,0) by buying 2L, waiting with decay multiplier 1/2, and selling L. Run the cycle N times. Exit by selling 2L, waiting with multiplier 1/2, and buying L. At zero inventory run the sign-reflected cycle N times, restoring G. Entry and exit have a fixed combined cost A_L and cancel their own changes in G. The entire strategy has cost

\[
C_N=A_L+N(2K-L\eta).
\tag{2}
\]

Choose finite L with Lη > 2K, then finite N making C_N < 0. All waits are finite and all states close. S contributes zero to the whole loop. Conversely, if h = b is constant, G = G₀ + bP, and both S(P) and bP integrate to zero on a position round trip. The remaining cost is

\[
C=V_T(\phi_e)+\beta\int_{\rm waits}\phi T(\phi)\,dt\ge0.
\tag{3}
\]

This proves both directions. The safety statement itself permits any constant b; a positive permanent response suggests b ≥ 0. ∎

For a concrete quadratic example, h(x) = x² and (u,v,d) = (2,1,1/2) give η = 5/4. Therefore the proposal “Bayes probably replaces |T| by a quadratic” does not solve the manipulation problem if the rest of the architecture is unchanged. The same theorem applies to h(x) = cT(x)² whenever it is nonconstant.

This independently recovers and extends the relevant implication of [D-dynamics-full.md](/home/kelvin/research/pump/D-dynamics-full.md). Its broader compensation condition is that, when a wait drift βφk(φ) is allowed in the center, k+h must be constant, with an appropriate nonnegative residual liquidity potential. A nonlinear fill gain can therefore be part of a safe change of coordinates if its wait drift and quote change together. It cannot be inserted alone.

For the original h = λ|T|, define A(x) = ∫₀ˣ|T(u)|du and B(x) = ∫₀ˣA(u)du. The exact storage identity from [M4-SAFETY.md](/home/kelvin/research/pump/M4-SAFETY.md), unaffected by adding live S(P), is

\[
C=V_T(\phi_e)+\lambda B(\phi_e)
+\beta\int_{\rm waits}\!
\left[\phi T(\phi)(1-\lambda P\operatorname{sgn}\phi)
+\lambda|\phi|V_T(\phi)\right]dt.
\tag{4}
\]

An actual bound |P| ≤ C makes λC ≤ 1 sufficient, and, for the nondegenerate curves in the brief, necessary. Equation (4) identifies its source: a cash-accounting multiplier involving held inventory. It is not a probability bound. With unbounded P, Theorem 1 excludes every λ > 0. Slow impact S cannot subsidize the loop because its cost cancels exactly.

**The martingale bridge needs repair.** Here is a counterexample to the bridge as written, even before considering zero-probability histories.

Let the permanent payoff v be ±1 with equal probabilities. Time is divided into repeating blocks of six order slots. In slots 2 and 5, an order sign agrees with v with probability 3/4. In the other slots its sign is an independent fair coin. Conditional on v, all signs are independent. Every finite sign history has strictly positive probability, even conditional on either payoff. Set every execution price equal to the exact posterior mean after observing that order.

The following deterministic input sequence has the displayed posterior prices:

| Slot | Order | Posterior execution price | Inventory after fill | Cash cost |
|---|---:|---:|---:|---:|
| 1 | +1 | 0 | 1 | 0 |
| 2 | +1 | 1/2 | 2 | 1/2 |
| 3 | −1 | 1/2 | 1 | −1/2 |
| 4 | −1 | 1/2 | 0 | −1/2 |
| 5 | −1 | 0 | −1 | 0 |
| 6 | +1 | 0 | 0 | 0 |

The two informative likelihood ratios cancel. The posterior and the six-slot phase return to their starting values. Cost is −1/2, hence profit is 1/2; the sequence can be repeated. The probability of this particular block under the observational model is 3/256, not zero.

There is no contradiction with Bayes or the martingale property. Under the observational model, the trader does not control the random informative signs. If an uninformed controller forces the displayed sequence, the original likelihood of those signs conditional on v is no longer the likelihood of the actual experiment. A genuine posterior under that forced-order experiment remains zero. Full support under one experiment does not preserve conditional expectations under another experiment, even if the new path law is absolutely continuous on every finite history space.

**A homogeneous Poisson posterior can offer the same kind of pump.** This example also removes the six-slot model's special trading calendar. Let v ∈ {0,+1,−1}, with prior probabilities 50/51,1/102,1/102. Noise arrives at rate 1 per side. Conditional on v=+1 there are extra Poisson buys at rate 1; conditional on v=−1 there are extra sells at rate 1. Conditional on v=0 there are none. These are permanent values and constant conditional intensities. All finite ordered histories have positive likelihood under every value.

Write x₊ and x₋ for the odds of +1 and −1 relative to zero. Initially x₊=x₋=0.01. Silence for t multiplies both by e⁻ᵗ; a buy doubles x₊; a sell doubles x₋. Execute each lot at its exact posterior after the fill,

\[
m=\frac{x_+-x_-}{1+x_++x_-}.
\]

Perform these operations, inserting a wait of g=0.001 immediately before **every** fill:

1. Buy one lot and wait log 2; repeat 100 times.
2. Buy 8 more lots.
3. Sell 108 lots.
4. Wait 8 log 2−216g, which is positive.

All fills have distinct times. The position returns to zero. There are 108 buys, 108 sells and total waiting time 108 log 2, so each final odds ratio is exactly 0.01. The entire posterior is restored. No inventory cap is assumed; the strategy's finite peak position is 108.

There is a simple analytic positive-profit bound. Each of the first 100 purchases costs at most 0.02/1.02 = 1/51. The next eight cost at most 8 altogether. Throughout the first 100 sales, x₊≥2.56 exp(−0.216)>2.00704 and x₋≤0.01, so each execution price exceeds 0.66. The remaining eight sales have nonnegative prices because buys still weakly outnumber sells. Profit therefore exceeds 66−100/51−8>56. Direct evaluation gives approximately **68.47355786**. This is a proved profitable exact loop in the observational Bayesian price map, with an explicit finite-time execution schedule and the side-conditioned prices already included.

The inference model above has an informed regime that does not die. To give it genuine recurrent Poisson episode clocks, retain the three permanent payoff values and let activity in each nonzero-value state switch off at rate δ>0 and on at rate α>0, initially active. The finite-history filter and cash costs vary continuously with α and δ. Therefore the same flat-inventory strategy remains profitable for sufficiently small positive α,δ. Exact posterior restoration is asserted only for α=δ=0; continuity establishes a profitable position round trip for positive episode rates. A zero-probability-history objection or a missing spread is not the explanation. In both cases the failure is using the passive-order likelihood unchanged under controlled orders.

**Theorem 2 — a valid conditional-expectation bridge.** Fix an admissible trader strategy and its actual probability law. At each of its fills i, let Gᵢ contain the public history, that fill's signed size qᵢ, and the trader information relevant to the strategy, including its knowledge of which orders it controls. Suppose pᵢ = E[v | Gᵢ], ∑qᵢ = 0, and summation and expectation can be interchanged for the relevant cash flows. A deterministic bound on this particular strategy's number and size of trades, with integrable v, suffices; no common bound across strategies is needed. Then expected cash profit is zero. Nonnegative execution fees make it nonpositive. If these hypotheses hold for every admissible strategy from every state, no strategy can have nonnegative profit almost surely and strictly positive profit with positive probability.

**Proof.** Because qᵢ is Gᵢ-measurable,

\[
E[q_i(v-p_i)]=0.
\]

Sum over fills and use ∑qᵢv = 0. Fees subtract from profit. A nonnegative integrable random variable that is positive with positive probability has positive expectation, giving the final assertion. ∎

The additional information and the actual-law condition matter. A competitive maker ordinarily conditions on the anonymous public fill, not on private knowledge of trader type or future plans. The tower identity then proves zero expected maker profit across the mixture of traders. It does not by itself prove the displayed identity for a privately selected subgroup or for a deviating persistent trader. A model must supply the missing strategy argument, a suitable filtration/likelihood consistency condition, or a direct pathwise cost proof. Calling the trader “uninformed” does not settle this: knowing that one's own forthcoming orders are artificial is information about the observation mechanism.

There are four further limits to the bridge:

- **Null histories.** In continuous-time Poisson models, an exact prescribed timestamp has probability zero. With v ≡ 0, a price equal to zero except for a special buy price −1 at time 1 and sell price +1 at time 2 is a posterior version almost surely at exogenous Poisson fills, but a controller targeting those timestamps earns 2. Continuous versions and support on neighborhoods eliminate this particular trick; they do not eliminate the intervention counterexample above.
- **A quiet-path profit is not necessarily a sure profit.** A trader who shorts a pre-existing positive transient displacement and buys after a quiet wait may profit on that path. Other traders can arrive during the wait. The from-rest storage theorem and an expected-profit theorem under random external flow address different experiments. An inventory round trip also need not restore the entire market state.
- **A cap changes the admissible strategies.** A posterior defined only for a capped market says nothing about an extension outside its support. Clamping a posterior price or gain is not automatically Bayesian. The uncapped interpretation here cannot use either maneuver.
- **Admissibility still matters without an inventory cap.** Optional stopping and summing martingale gains require integrability or uniform integrability. Doubling schemes with unbounded loss exposure do not become covered merely because they stop almost surely. Our finite pumps do not use that loophole.

“Including the fill” also changes the execution contract. In a Glosten–Milgrom market the ask is E[v | history, a buy arrives now], and the bid conditions on a sell. A block's quantity, timing, and the event that it reaches a particular marginal unit can be informative. Treating every infinitesimal child as an independent new trader requires a model of parent orders and stopping; it cannot be assumed because the implementation slices an order.

Kyle's auction execution price is also set after observing that auction's aggregate order flow. It is not the previous auction's posterior quoted unconditionally to an arbitrary block. In a continuous model with continuous prices, pre- and post-fill distinctions can vanish in a specified scaling limit. That does not justify omitting finite-order adverse selection in a finite-rate Poisson model. These distinctions follow the trading mechanisms in [Glosten–Milgrom (1985)](https://business.columbia.edu/sites/default/files-efs/pubfiles/1538/bid.pdf) and [Kyle (1985)](https://people.stern.nyu.edu/lpederse/courses/LAP/papers/Information%2CFundamental/Kyle85.pdf).

**The exact Bayes law.** Let Z be a hidden state containing the permanent payoff v and the activity of informed traders. Conditional on Z and public history, buy and sell arrivals have intensities r₊(Z) and r₋(Z). Let π be the current conditional distribution and r̄ₛ = π(rₛ). At a fill of sign s, Bayes' rule gives

\[
\pi^s(dz)=\frac{r_s(z)\pi(dz)}{\bar r_s},\qquad
m^s=\frac{\pi(vr_s)}{\bar r_s},\qquad
\boxed{\Delta m_s=\frac{\operatorname{Cov}_\pi(v,r_s)}{\bar r_s}.}
\tag{5}
\]

For an observed size q, replace rₛ by its marked intensity rₛ(z)fₛ(q | z,history). This is the exact finite-fill update, not a differential in an arbitrarily chosen unit of volume.

For a finite-state hidden Markov model with row generator Q, the unnormalized column probabilities u evolve between fills according to

\[
\dot u=Q^T u-\operatorname{diag}(r_++r_-)u,
\qquad
u^s=\operatorname{diag}(r_s)u.
\tag{6}
\]

Normalization gives π. If the hidden payoff is permanent, Qv = 0, and therefore

\[
\left.\dot m\right|_{\rm no\ fill}
=-\operatorname{Cov}_\pi(v,r_++r_-),
\qquad
dm=\sum_{s=\pm}\Delta m_s\,(dN_s-\bar r_sdt).
\tag{7}
\]

The same first-moment identity holds for a hidden value process with zero generator drift and an integrable terminal payoff. With new permanent information jumps, the hidden state must retain their value consequences after activity ends.

**Proof of (5)–(7).** The conditional likelihood of a sign-s event in dt is rₛ(z)dt. The likelihood of no event is 1−[r₊(z)+r₋(z)]dt. Multiply prior weights by these likelihoods, include hidden-state transitions, and normalize. Taking the first moment gives the covariance formulas. The compensator in the last equation is exactly the negative no-fill drift. ∎

A posterior martingale can thus move deterministically during a quiet interval. The conditional expectation of its possible jumps offsets that drift. “A martingale cannot decay between trades” would be an incorrect objection. The correct objections are to the particular decay coordinate, its state sufficiency, and the likelihood of informed traders stopping.

**Theorem 3 — stopping activity does not erase permanent information.** Fix 0<p<1. Suppose, conditional on the current history, either v = 0 with probability 1−p, or v = a > 0 with probability p and an active informed buyer is present. Noise buys and sells arrive at rate ε per side. The informed buyer trades at rate μ>0 until an independent exponential death time D of rate δ; v remains a after D. Conditional on no trades for t units of time,

\[
L(t)=E[e^{-\mu\min(D,t)}]
=\frac{\delta}{\delta+\mu}
+\frac{\mu}{\delta+\mu}e^{-(\delta+\mu)t},
\]
\[
m(t)=a\frac{pL(t)}{1-p+pL(t)},\qquad
\boxed{m(\infty)=a\frac{p\delta}{\delta+\mu(1-p)}>0}
\tag{8}
\]

when p,δ > 0. Yet the posterior probability that the informed buyer is still active is

\[
\frac{p e^{-(\delta+\mu)t}}{1-p+pL(t)}\longrightarrow0.
\tag{9}
\]

**Proof.** Conditional on D, no informed order arrives with probability exp[−μmin(D,t)]. Integrating over D gives L. The common noise-survival factor exp(−2εt) cancels from Bayes' rule. Remaining active and producing no order requires surviving both clocks, giving (9). ∎

For p = 1/2 and δ = μ, the value estimate falls from a/2 to a/3, while the activity probability tends to zero. No inventory bound appears.

If δ = 0, instead,

\[
p_t=\frac{pe^{-\mu t}}{1-p+pe^{-\mu t}}\longrightarrow0.
\tag{10}
\]

Complete forgetting is consistent with a permanent payoff in this model: an indefinitely active informed buyer would almost surely eventually trade, so increasingly long silence rejects that hypothesis. But (10) is logistic survival updating, not exponential decay in signed units. For p < 1 its approximation p exp(−μt) has exact error

\[
p_t-pe^{-\mu t}
=\frac{p^2e^{-\mu t}(1-e^{-\mu t})}{1-p+pe^{-\mu t}}
\le\frac{p^2}{4(1-p)}.
\tag{11}
\]

If informed trading stops because a target has been completed or the price has reached the value, silence can have the same likelihood under completed information as under noise. Its evidential effect can then vanish. At the extreme, once v has been publicly learned exactly, the posterior is v forever; no amount of silence can restore uncertainty about that same permanent payoff. Automatically decaying an untransferred price displacement after such revelation is inconsistent with Bayes. A stopping policy depending on mispricing must be included in rₛ(Z,history,quotes), rather than represented by an independent alarm timer.

**An exact four-state Poisson model.** The smallest model used here that separates permanent information from recurrent activity has a permanent sign Y ∈ {−1,+1}, payoff v = F₀+aY, and activity A ∈ {0,1}. An independent Poisson activation clock of rate α switches A from 0 to 1 when inactive; a deactivation clock of rate δ switches it back. Clock rings in the other state have no effect. Thus episode starts have hazard α while inactive and lifetimes are exponential with rate δ. These are alternating episodes, not overlapping independent information jumps.

Noise orders arrive at ε per side. Always-present slow informed orders arrive at rate ν in direction Y. An active episode adds informed orders at rate μ in direction Y. Every order is one fixed lot. The signed intensities are

\[
r_s(Y,A)=\epsilon+(\nu+\mu A)\mathbf1_{\{Y=s\}}.
\tag{12}
\]

This is a completely specified inference model, with bounded rates and full support for finite ordered arrival histories when ε > 0. It is not a solved strategic competition equilibrium: μ and the stopping policy are primitives. A model with fresh permanent jumps at every activation must enlarge the hidden value state; it must not reset the payoff at deactivation.

The posterior has three independent moments

\[
d=E[Y\mid\mathcal H],\qquad e=E[A\mid\mathcal H],\qquad
z=E[YA\mid\mathcal H],\qquad m=F_0+ad.
\]

Here e is an activity alarm, d a directional value estimate, and z their interaction. During no-fill intervals, (7) gives the exact equations

\[
\dot e=\alpha(1-e)-\delta e-\mu e(1-e),
\]
\[
\dot d=-\mu(z-de),\qquad
\dot z=\alpha d-(\alpha+\delta)z-\mu z(1-e).
\tag{13}
\]

At a sign-s fill, put

\[
D_s=\epsilon+\frac\nu2(1+sd)+\frac\mu2(e+sz).
\]

Then the exact price change is

\[
\boxed{\Delta m_s
=\frac{a}{2D_s}\left\{s\nu(1-d^2)
+\mu[z-de+s(e-dz)]\right\}.}
\tag{14}
\]

The other moments follow by the same normalization (5), or by keeping the four probabilities. The price conditioned on a buy is m+Δm₊; the price conditioned on a sell is m+Δm₋. Thus (12)–(14), including silence, give an exact recursive solution, rather than an unspecified filtering problem. Conditional payoff variance is a²(1−d²): it can be small when informed activity is high and the direction has become nearly certain. Neither activity nor a large signed value estimate is universally a volatility estimate.

For a closed-form wait-and-fill solution, let uᵧ = (uᵧ₀,uᵧ₁)ᵀ be the unnormalized weights for Y=y. Removing the common survival factor exp[−(2ε+ν)t], a wait of length t maps both sign vectors by exp(𝔅t), where

\[
\mathcal B=\begin{pmatrix}-\alpha&\delta\\\alpha&-\delta-\mu\end{pmatrix}.
\tag{15}
\]

A buy multiplies u₊ by diag(ε+ν, ε+ν+μ) and u₋ by εI; a sell exchanges these roles. The posterior price is

\[
m=F_0+a\frac{\mathbf1^Tu_+-\mathbf1^Tu_-}
{\mathbf1^Tu_++\mathbf1^Tu_-}.
\tag{16}
\]

These two-by-two matrix exponentials and diagonal multiplications solve any finite history exactly. No inventory appears in them.

The two decay exponents of −𝔅 are

\[
k_0=\frac{\alpha+\delta+\mu-\Delta}{2},\quad
k_1=\frac{\alpha+\delta+\mu+\Delta}{2},\quad
\Delta=\sqrt{(\alpha+\delta+\mu)^2-4\alpha\mu}.
\tag{17}
\]

With positive α,δ,μ, choose the positive left eigenvector

\[
\ell=(1,w)^T,\qquad
w=\frac{\delta}{\delta+\mu-k_0}=1-\frac{k_0}{\alpha},\qquad
\ell^T\mathcal B=-k_0\ell^T.
\]

There is even a useful **fill-only center** in this exact model:

\[
\boxed{F=F_0+a\frac{\ell^Tu_+-\ell^Tu_-}
{\ell^Tu_++\ell^Tu_-}.}
\tag{18}
\]

It is the limiting value estimate after an increasingly long continuation with no fills. It is not an independent permanent component of v, nor is it the ordinary current posterior mean. Conditioning on literally no trades forever has probability zero when noise continues; (18) is the well-defined limit of the finite-silence conditional means.

**Proof and exact decay.** Along a wait both ℓᵀuᵧ are multiplied by exp(−k₀t), so F does not change. Spectral decomposition in (16) gives constants c₀>0,c₁,d₀,d₁, depending on the history at the beginning of the wait, such that

\[
m(t)-F_0=a\frac{d_0+d_1e^{-\Delta t}}{c_0+c_1e^{-\Delta t}},\qquad
F-F_0=a\frac{d_0}{c_0}.
\]

Consequently, if U₀ = m(0)−F and r = c₁/c₀,

\[
\boxed{m(t)-F=U_0\frac{(1+r)e^{-\Delta t}}{1+re^{-\Delta t}}.}
\tag{19}
\]

This is a fractional-linear function of an exponential. It is not a fixed T evaluated at an additive signed-volume statistic. The parameter r is another piece of belief state and changes at fills. If |r|<1, replacing (19) by U₀exp(−Δt) has the explicit uniform error bound

\[
\left|m(t)-F-U_0e^{-\Delta t}\right|
\le\frac{|U_0||r|}{4(1-|r|)}.
\tag{20}
\]

The difference before taking the bound is U₀r exp(−Δt)[1−exp(−Δt)]/[1+r exp(−Δt)]. This proves (19)–(20). ∎

Thus an effective small-mode time constant is τ_eff = 1/Δ, derived from activation, death, and informative order intensity. It is generally neither 1/δ nor 1/(α+δ). Noise intensity affects the fill likelihoods and the belief state reached, even though its common no-fill survival factor cancels from (17).

There is also an exact fill update for this particular center. Define the normalized tilted weights

\[
\widetilde\pi(Y,A)=\frac{\ell_A u_{Y,A}}{\sum_{y,b}\ell_b u_{y,b}}.
\]

Equation (18) is Ẽ[v], and diagonal likelihood multiplication commutes with this tilt. Therefore

\[
\boxed{\Delta F_s
=\frac{\operatorname{Cov}_{\widetilde\pi}(v,r_s)}
{E_{\widetilde\pi}[r_s]}.}
\tag{21}
\]

Formula (14), with d,e,z replaced by their tilted versions, is an explicit expression for (21). This is an exact answer to “what replaces the fill-time law?” for a defined, fill-only F. It needs the remaining belief coordinates, is different on the two sides, and is paired with (19) and the conditional execution prices. It does not reduce to h(|m−F|), much less a universal λ|T| or a quadratic in displacement.

For example, in a symmetric tilted state with d̃ = z̃ = 0, let ẽ be arbitrary. For a unit lot,

\[
\Delta F_s=s\,a\frac{\nu+\mu\widetilde e}{2\epsilon+\nu+\mu\widetilde e}.
\tag{22}
\]

Such a state has m−F = 0 for every ẽ, yet its gain depends on ẽ. With L = 2ε+ν, its gain magnitude has the expansion

\[
|\Delta F_s|
=\frac{a\nu}{L}+\frac{2a\epsilon\mu}{L^2}\widetilde e
-\frac{2a\epsilon\mu^2\widetilde e^2}{L^2(L+\mu\widetilde e)}.
\tag{23}
\]

The last displayed term is the exact remainder after the constant and linear terms. For a lot of u units, divide the gain by u to express it per unit. Equation (23) provides a slow-information baseline and a locally activity-proportional increment, with error at most 2aεμ²ẽ²/L³ per lot. It does not make the baseline an arbitrary S′(P). Once the value becomes nearly certain, Bayesian gains shrink; ν > 0 does not imply a positive uniform lower bound on information gain.

The four-state rule is Bayesian and has zero expected maker profit under its specified exogenous flow law. **I do not infer universal manipulation resistance from that fact.** Its strategic extension needs a model of controlled order submission, or an independent cost proof. The explicitly safe Bayesian special case appears below.

**Theorem 4 — signed retracing discards information the episode model needs.** Take ν = 0 in (12), with symmetric Y and independent activity probability e ∈ (0,1). Consider a buy and a sell in an arbitrarily short interval. In the zero-duration limit their joint intensity likelihood is ε² when inactive and ε(ε+μ) when active, independent of Y. The posterior remains directionally symmetric, but its activity probability becomes

\[
e'=\frac{e(\epsilon+\mu)}{\epsilon+\mu e}>e.
\tag{24}
\]

The next buy's posterior price displacement changes from aμe/(2ε+μe) to aμe′/(2ε+μe′), a strictly larger number.

**Proof.** Multiply the two Poisson event intensities and normalize. The no-fill and hidden-transition corrections vanish with the interval length. Both formulas for the next buy follow from (5). ∎

In the AMM, an immediate buy followed by its exact reverse retraces the fill ODE and restores (F,P,φ). In the limit of a vanishing but positive wait, all three state changes tend to zero. The Bayesian change (24) does not. Each positive-width arrival window has positive probability, so this is not rescued by noting that simultaneous Poisson jumps have probability zero. Continuity of the proposed state rule is enough for the contradiction. The model's next-fill posterior cannot be a continuous function of the AMM's restored state. The failure already occurs for a binary permanent payoff with Poisson activity; changing the curvature of T cannot cure it.

A useful exactly solved three-point example makes the lost variables visible. Let J ∈ {0,−a,+a}, with probabilities 1−p,p/2,p/2, where 0<p<1. Conditional on J ≠ 0, informed orders of its sign arrive at rate μ forever; noise arrives at ε per side. After B buys, D sells and elapsed time t, set n = B+D, k = B−D and

\[
c=\tfrac12\log(1+\mu/\epsilon),\qquad
\eta=\frac{p}{1-p}\exp[-\mu t+cn].
\]

The exact posterior mean is

\[
\boxed{E[J\mid B,D,t]=a\frac{\eta\sinh(ck)}{1+\eta\cosh(ck)}.}
\tag{25}
\]

**Proof.** The unnormalized weights, after removing the common noise likelihood, are 1−p, (p/2)e^(−μt)(1+μ/ε)^B, and (p/2)e^(−μt)(1+μ/ε)^D. Taking their signed first moment gives (25). ∎

It depends on total count n as well as signed count k and elapsed exposure t. Two opposite orders add evidence about event occurrence even when net count is zero. For the analytic cross-section holding n and t fixed, let w = η/(1+η). Its expansion is T(k) = awck + aw(1−3w)c³k³/6 + O(k⁵): w<1/3 gives local steepening from explicit Poisson primitives. Its price remains bounded by a. An actual fill changes n too, and at a given n only the corresponding feasible count pairs exist. Calling this cross-section the executable T(φ) would conceal the missing update.

There is a second exact incompatibility in the most familiar scalar filter. For a binary active/inactive hypothesis with activation α, death δ, noise buy intensity ε and extra active buy intensity μ, let O = p/(1−p) be activity odds. A buy multiplies O by K = 1+μ/ε, so L = log O has a constant jump log K. Silence gives

\[
\dot O=\alpha+(\alpha-\delta-\mu)O-\delta O^2,
\]
\[
\dot L=\alpha e^{-L}+\alpha-\delta-\mu-\delta e^L.
\tag{26}
\]

Thus the coordinate with additive likelihood jumps does not have linear mean reversion. A fractional-linear transformation of O can make its no-fill dynamics exponential, but then fills are fractional-linear updates, not additive unit increments. Around the positive quiet fixed point O*, the relaxation rate is Δ from (17). If x = (O−O*)/[(K−1)O*], a buy gives exactly x⁺ = 1+Kx, rather than 1+x. Replacing this by an additive unit jump drops the term (K−1)x; linearizing the wait drops a quadratic term. This explains a local exponentially weighted filter under weak likelihood increments. It does not prove scalar sufficiency, and a one-sided activity detector does not even assign a negative unit of evidence to an uninformative sell.

**A further global exclusion for ordinary finite-rate models.** If m = F+T(φ) is the posterior of a permanent payoff, F is constant during waits, total predictable fill intensity is bounded by Λ, and every fill changes m by at most M, equation (7) requires

\[
\beta|\phi|T'(\phi)\le\Lambda M.
\tag{27}
\]

If T′ ≥ a₀ > 0 and φ is unbounded, this is impossible. A positive far density floor bounds T′ above, so bounded lots and bounded permanent gain imply such an M. Ordinary single-episode Poisson intensities are bounded. The model can escape (27) only by changing an assumption, for example using unbounded state-dependent intensities, larger belief-dependent price jumps, additional no-fill center motion, or a different decay coordinate. Allowing overlapping episodes with unbounded counts changes the intensity assumption; it does not by itself prove the required scalar filter.

These are precise exclusions for the natural Poisson models and the stated architecture. A theorem about *any conceivable* Poisson-labeled model would be too broad without restrictions on its likelihood and the origin of its payoff. In particular, an abstract shot-noise martingale can be engineered. Given a smooth increasing T with 0<a₀≤T′≤a∞, let φ decay at −βφ and jump by ±u. Put d₊ = T(x+u)−T(x)>0, d₋ = T(x)−T(x−u)>0, and b(x)=βxT′(x)−ε(d₊−d₋). Choose rates

\[
r_+(x)=\epsilon+\frac{b(x)^+}{d_+(x)},\qquad
r_-(x)=\epsilon+\frac{[-b(x)]^+}{d_-(x)}.
\tag{28}
\]

Then the generator applied to T is zero. The rates grow at most linearly, giving a nonexplosive finite-horizon process with the moment bounds needed for T(φ) to be a true martingale. Setting v = T(φ_H) at a finite terminal horizon H makes T(φ_t) = E[v | history] exactly. This construction permits steepening and exponential decay in units. It defines the payoff from future flow and uses engineered state-dependent residual intensities; it supplies neither exogenous permanent information nor independent constant-rate informed episodes. It is a warning against an unrestricted impossibility claim, not a rationalization of the operator's story.

**Which priors steepen? The exact structure theorem is a moment identity.** In a separate, transparent observation model, take Y_obs = J+ξ with ξ ∼ N(0,σ²), independent of a symmetric jump prior. Assume the moments needed below are finite. Let T(y) = E[J | Y_obs=y]. Direct differentiation of the normalized likelihood gives

\[
\boxed{T'(y)=\frac{\operatorname{Var}(J\mid y)}{\sigma^2},\qquad
T''(y)=\frac{E[(J-T(y))^3\mid y]}{\sigma^4}.}
\tag{29}
\]

**Proof.** The posterior is the exponential tilt, with parameter y/σ², of the measure exp[−J²/(2σ²)]π₀(dJ). Derivatives of its log normalizer are its cumulants. The chain rule proves (29). ∎

Consequently, global steepening on y > 0 is equivalent to a nonnegative posterior third central moment there. Local cubic steepening at zero is equivalent to positive fourth cumulant of the posterior at observation zero. It is a condition on the *posterior tilted by the likelihood*, not just the unconditional jump prior. If y = gφ, multiply the slope in (29) by g and its second derivative by g².

For a binary jump ±a, the exact response is

\[
T(y)=a\tanh(ay/\sigma^2).
\tag{30}
\]

It is bounded and its slope decreases to zero. More generally, a bounded payoff has bounded posterior mean. It cannot support an unbounded increasing skew along an unrestricted one-directional flow path whose fair also moves in that direction. A bounded binary information component can coexist with an unbounded *execution cost*, but that cost is then not purely its posterior mean.

For a three-point prior with masses 1−p,p/2,p/2 at 0,+a,−a, define

\[
w=\frac{p e^{-a^2/(2\sigma^2)}}{1-p+p e^{-a^2/(2\sigma^2)}}.
\]

Its exact response and expansion are

\[
T(y)=a\frac{w\sinh(ay/\sigma^2)}{1-w+w\cosh(ay/\sigma^2)},
\]
\[
T(y)=\frac{wa^2}{\sigma^2}y
+\frac{w(1-3w)a^4}{6\sigma^6}y^3+O(y^5).
\tag{31}
\]

For 0<w<1/3 this has the desired shrinkage and follow-through near zero. Nevertheless, T(y) → a and T′(y) → 0. Sparse bounded jumps prove local steepening, not the requested far density floor.

An unbounded spike-and-slab prior is not enough either. Let J have prior (1−p)δ₀+pN(0,s²), with 0<p<1 and positive s²,σ², and define

\[
\gamma=\frac{s^2}{s^2+\sigma^2},\qquad
K=\frac{1-p}{p}\sqrt{\frac{s^2+\sigma^2}{\sigma^2}},\qquad
w(y)=\frac1{1+K e^{-\gamma y^2/(2\sigma^2)}}.
\]

Then

\[
T(y)=\gamma y w(y),\qquad
T'(y)=\gamma w(y)+\frac{\gamma^2y^2}{\sigma^2}w(y)[1-w(y)].
\tag{32}
\]

The touch slope is γw(0), and the far slope is γ. But

\[
T'(y)-\gamma
=\gamma[1-w(y)]\left[-1+\frac{\gamma y^2}{\sigma^2}w(y)\right]>0
\]

for sufficiently large finite y. Since it tends back to zero, the slope must decrease somewhere. The implied book thins beyond its limiting density and then thickens again. This is an exact counterexample to the proposed inference from sparse information to globally steepening liquidity.

A Laplace prior is a useful alternative endpoint benchmark. For π₀(j) ∝ exp(−|j|/b), write Φ_N for the standard normal distribution function and

\[
A_y=e^{-y/b}\Phi_N(y/\sigma-\sigma/b),\qquad
B_y=e^{y/b}\Phi_N(-y/\sigma-\sigma/b).
\]

Completing the square separately on each half-line gives

\[
T(y)=y+\frac{\sigma^2}{b}\frac{B_y-A_y}{A_y+B_y},\qquad
T(y)=y-\sigma^2/b+o(1)\quad(y\to+\infty).
\tag{33}
\]

Its far slope tends to 1; its touch slope is the posterior variance at zero divided by σ². These endpoint statements do not, by themselves, prove the curvature sign everywhere or turn the observation y into exponentially decaying order flow. No such extra inference is used here.

Finally, “steepening requires a sparse or heavy-tailed prior” is false if the likelihood is unrestricted. For example,

\[
T_*(x)=a_\infty x-(a_\infty-a_0)L\tanh(x/L),\quad 0<a_0<a_\infty,
\]

is odd, globally steepening away from zero, and has slopes a₀ at the touch and a∞ in the tails. Take a nonsparse Gaussian J and observe Y_obs = T_*⁻¹(J) exactly. Its posterior mean is T_*(Y_obs). This deliberately simple counterexample isolates the missing likelihood restriction. It is not a Poisson trading model. In the linear Gaussian observation experiment, (29), not a prior label, supplies the precise criterion.

**When an absolute-displacement update really is a local Bayes approximation.** There is a narrow example that supports part of the operator's intuition and supplies an explicit error. Let v ∈ {0,a}, let its current mean be m = ap, and assume noise at ε per side and informed buys at μ when v = a. There are no informed sells. Put κ = μ/ε. On a buy, (5) gives

\[
\Delta m_+
=\frac{\kappa m(1-m/a)}{1+\kappa m/a}
=\kappa m-\frac{\kappa(1+\kappa)m^2}{a(1+\kappa m/a)}.
\tag{34}
\]

For lot size u, λ_eff = κ/u gives Δm₊/u ≈ λ_eff m. The exact relative error against this leading term is

\[
\frac{\kappa m-\Delta m_+}{\kappa m}
=\frac{(1+\kappa)m}{a(1+\kappa m/a)}.
\tag{35}
\]

Thus the approximation needs (1+κ)m/a small. The correction is rational and contains a quadratic numerator. A sell, however, has identical intensity under both values and produces **Δm₋ = 0**, not −λ_eff m. The m in (34) is the entire permanent-payoff posterior, not a justified allocation to the AMM's extra fair update. Identifying it with an alarm T is valid only for this one-sided comparison against a fixed zero baseline. Reflecting the experiment supplies a separate negative-signal example, not a single rule that works on reversals.

Small trade size alone does not make (34) infinitesimal: at fixed ε and μ, one observed event has a finite likelihood ratio even if its physical lot is relabeled as small. A continuous-fill limit needs a stated scaling of event rates, likelihood increments, and lot size. For example, weak mark information of order u and event rates of order u⁻² lead to a diffusion observation limit; they do not preserve a fixed finite Poisson event likelihood.

More generally, if evidence accumulates with likelihood proportional to exp(qℓ(v)), its exact continuous update is

\[
\frac{dm}{dq}=\operatorname{Cov}_{\pi_q}(v,\ell(v)).
\tag{36}
\]

For a diffusion observation dY = b(Z)dt+σdW, the corresponding gain on the innovation dY−E[b|history]dt is Cov(v,b|history)/σ². In a static-value model with b = cv this is cVar(v|history)/σ². These are gain formulas in terms of conditional uncertainty. They are not functions of signed displacement alone, and the innovation compensator is part of the law.

A smooth symmetric posterior often contradicts an absolute-value approximation even locally. From the exact spike-and-slab formula (32), with w₀ = w(0),

\[
T'(y)=\gamma w_0+
\frac{3\gamma^2w_0(1-w_0)}{2\sigma^2}y^2+O(y^4).
\tag{37}
\]

Written in terms of the small displacement T itself, its extra gain is

\[
T'(y)-\gamma w_0
=\frac{3(1-w_0)}{2\sigma^2w_0}\,T(y)^2+O(T(y)^4).
\tag{38}
\]

This is a quadratic correction to the *total response gain in a static observation experiment*. Inserting it as the isolated permanent h in Theorem 1 would still create a pump. Smooth symmetry forces an even gain to have zero first derivative at the origin; a fixed positive λ|T| has a cusp and is not its leading Taylor correction.

If g(T) = g₀+g₂T²+O(T⁴), g₂>0, one can fit λ|T| to the extra gain at |T| = r by setting λ = g₂r. On |T|≤r the leading fitting error has magnitude g₂|T|(r−|T|), at most g₂r²/4. This is a finite-band fit with a scale-dependent λ; it does not become a fixed-λ asymptotic expansion near zero.

A price-state approximation also needs a trading-budget error statement. If two fill gains differ by at most η on a common prescribed state path and total absolute traded volume is L, their fair states can differ by as much as ηL and their integrated cash costs by as much as ηL²/2. These bounds follow by integrating the gain error and then integrating the accumulated fair error against absolute volume. A position cap bounds neither L nor the number of reversals. Pointwise small-displacement errors therefore do not establish a global approximate posterior or an approximate no-pump theorem.

**What “the smallest change” can mean.** No scalar replacement h(|T|) can simultaneously preserve the original retracing, its fill-only center, its decay, and restore uncapped safety unless h is constant. No choice of that constant proves the remaining price is a posterior. The narrowest changes with defensible claims are:

| Intended guarantee | Change | What is established | What must be relinquished or still proved |
|---|---|---|---|
| Uncapped safety of the original deterministic AMM architecture | Replace λ·abs(T(φ)) by a constant b≥0; retain live S(P) and the original T and decay. | Equation (3) proves no profitable position round trip from rest. | A Bayesian interpretation still requires a model. Activity-dependent permanent gain is lost. |
| Exact inference for recurring Poisson informed episodes with permanent information | Maintain the four weights in (15)–(16), or three independent belief coordinates; apply (5)–(7) and conditional bid/ask pricing. Optionally use the fill-only F in (18). | Exact posterior prices, exact silence dynamics, and exact center update (21), for every finite supported history. No cap. | Signed-volume-only memory, a fixed T, and free retracing are lost. A strategic manipulation theorem is additional work. |
| An exact Bayesian execution rule with a direct uncapped loop proof | Use the constant-total-intensity binary special case below and execute each actual lot at its after-fill posterior. | Exact posterior execution prices and a pathwise proof of no profitable loops, from any inventory state. | This simple model has permanent, saturating information response and no decaying activity alarm. |

The second row is the smallest explicit inference replacement offered here; the third is the smallest fully verified Bayesian-and-safe replacement. I do not claim a formal minimum number of edits over all possible models. The original combination of requirements prevents a one-term repair.

**Theorem 5 — an exact, uncapped, pump-free posterior execution rule.** Let v = F₀±a with a symmetric prior. Noise buys and sells arrive at ε per side. Independently, one-lot informed trading opportunities arrive as a Poisson process of rate ν, and their orders have the sign of v−F₀. There is no persistent hidden activity regime. For lot size u and cumulative signed quantity P, put

\[
\theta=\log(1+\nu/\epsilon),\qquad
M(P)=F_0+a\tanh\left(\frac{\theta P}{2u}\right).
\tag{39}
\]

Quote the next buy lot at Ask(P) = M(P+u), and the next sell lot at Bid(P) = M(P−u). Execute larger orders as the corresponding sequential lots. The model has no inventory cap. These are exact Bayesian execution prices, and every finite position round trip through this rule has nonnegative cash cost.

**Proof of Bayes.** Conditional on the positive payoff, the intensities are (ε+ν,ε); conditional on the negative payoff they are (ε,ε+ν). Their totals are equal, so silence carries no information about the sign. Each buy multiplies payoff odds by exp(θ); each sell divides by exp(θ). After observing the fill the posterior is exactly (39) at the new P.

**Proof of safety, independent of the Bayesian argument.** Consider any finite walk on the lot grid returning to its starting P. Every edge [x,x+u] is crossed equally often upwards and downwards. An upward crossing costs uM(x+u); a downward crossing receives uM(x). Pairing crossings gives total cost

\[
\boxed{C=u\sum_{\text{edges }[x,x+u]}n_x[M(x+u)-M(x)]\ge0,}
\tag{40}
\]

where nₓ is the number of crossings in either direction. M is increasing, and waits do not affect it. This holds at every initial P and without a uniform bound on positions or the number of operations. ∎

The safety proof covers self-generated loops in the same deterministic execution experiment as the local AMM theorems. It does not replace a model of profits from reacting to other traders' future flow. The fixed model nevertheless avoids the observational-posterior loophole for these loops because its price map is directly safe under controlled inputs.

For a literal continuous supply curve, integrating M(P) gives a conservative cost with zero round-trip cost, but it is not the same finite-lot competitive execution contract. The difference between the after-fill endpoint price and the average price of a lot is generally nonzero. The exact version in Theorem 5 keeps that difference instead of calling it infinitesimal without a limit argument.

The model deliberately allows posterior saturation, which is mathematically required by its binary payoff. A user who insists on an unbounded steepening information-only price needs an unbounded payoff/information-size model, a different filter, and a fresh execution-safety proof. An arbitrary unbounded liquidity premium can be added as an execution cost, but the resulting transaction price is no longer purely the conditional mean of this binary payoff.

**Spreads, caps, and who pays adverse selection.** In the four-state model, the side quotes in (14) bracket the public mean because positive-value states have weakly greater buy intensities and negative-value states have weakly greater sell intensities. More generally, these ordering properties are assumptions to check in the order likelihood. The maker's expected profit conditional on an anonymous signed fill is zero by (5), even though a noise trader's expected purchase value can be below the ask.

At the symmetric state of Theorem 5, the half-spread is h = aν/(2ε+ν). A noise order loses uh on average relative to the permanent payoff; an informed order gains u(a−h). Their rates obey the exact equality

\[
2\epsilon\,u h=\nu\,u(a-h).
\tag{41}
\]

For the whole market over a common horizon, marking remaining inventories to the same terminal payoff, zero expected maker profit implies

\[
E[\Pi_{\rm noise}]+E[\Pi_{\rm informed}]=0
\tag{42}
\]

when these are the only trader groups and there are no fees or other costs. This is the precise aggregate sense in which noise losses finance informed gains. It does not assert that each chosen noise round trip loses an amount equal to some identifiable informed trader's profit. A private strategy subgroup, an intervention, different inventory horizons, inventory-risk compensation, or fees changes that assertion. For a flat terminal position the marked profit is its cash round-trip profit, but the conditions on the population and probability law remain necessary.

Adding nonnegative spread costs to a safe capped AMM preserves the sufficient condition λC≤1. It can remove particular pumps above that threshold, so the old necessity bound need not remain sharp with a spread. There is no universal replacement bound without specifying spread size, state dependence, and the execution protocol. A uniformly bounded spread cannot cure Theorem 1's uncapped ratchet: its cost per repeated fixed-size cycle is bounded independently of the held inventory L, whereas the monetized center change is Lη. Choose L larger and repeat. Bayesian bid/ask pricing generally changes the likelihood update and state as well; it is not just a flat fee appended to the old dynamics.

With positive noise intensity and positive finite likelihoods, every initially possible hidden hypothesis retains positive probability after a finite history. There is generally no finite position C at which the posterior suddenly attributes every order to information. A bounded payoff instead makes the price approach its value bound; it does not stop the maker from quoting. A maximum informed order size would be a restriction on the trader's strategy or signal demand, not automatically a bound on cumulative AMM inventory. Neither observation supplies the binding clarification's forbidden cap.

Event existence and the type of the next fill are also different probabilities. In (12), the conditional probability that a sign-s fill is noise is ε/Dₛ ≥ ε/(ε+ν+μ)>0, even after the maker has become certain about the payoff. Certainty that someone has information does not make the next order certainly informed.

The other known safety results are compatible with this report. Keeping the center fixed gives (3) with b = S = 0, the M0 potential dissipation proof. Charging any S at live P adds a potential and preserves this from-rest result. Keeping a fraction of curved skew released by decay is generally unsafe because it creates an independently monetizable center ratchet; in the stated center-only class, safety forces ρ(φ)T′(φ) to be constant. The alternative handoff S(P−φ) obeys the stricter bound S′≤infₓ>₀ T(x)/x. These are properties of execution and state accounting, not sufficient conditions for Bayesian pricing. The exact statements and finite witnesses are in [M4-SAFETY.md](/home/kelvin/research/pump/M4-SAFETY.md), [DECAYING-LIQUIDITY-AMM.md](/home/kelvin/research/pump/DECAYING-LIQUIDITY-AMM.md), and [D-dynamics-full.md](/home/kelvin/research/pump/D-dynamics-full.md).

**Literature map.** The contributions below describe the cited papers. The limitations in the last column are comparisons with the present AMM, not claims made by those authors. None of these references proves the full proposed identification of curve, exponential signed-volume decay, and urgent fair update.

| Work | Relevant contribution | Where the present model departs |
|---|---|---|
| [Kyle (1985), *Continuous Auctions and Insider Trading*](https://people.stern.nyu.edu/lpederse/courses/LAP/papers/Information%2CFundamental/Kyle85.pdf) | Strategic informed trading, noise camouflage, competitive pricing of aggregate auction flow; linear impact in the Gaussian benchmark. | Its auction price includes current aggregate flow. Permanent value learning is not a decaying inventory alarm, and an arbitrary nonlinear integrated AMM is not the auction contract. |
| [Back (1992), *Insider Trading in Continuous Time*](https://academic.oup.com/rfs/article-abstract/5/3/387/1576252) | Continuous-time Kyle equilibrium with general payoff distributions and explicit pricing within its class. | Nonlinear pricing need not come from uncertain participation alone. Equilibrium strategies and continuous observation matter; it does not furnish the proposed finite-rate Poisson recurrence. |
| [Glosten–Milgrom (1985), *Bid, Ask and Transaction Prices…*](https://business.columbia.edu/sites/default/files-efs/pubfiles/1538/bid.pdf) | Competitive bid and ask conditional on the observed side; adverse selection creates a spread despite risk neutrality and zero expected maker profit. | A common spreadless infinitesimal quote needs an explicit limit. Binary payoff bounds force bounded posterior prices. |
| [Easley–O’Hara (1987), *Price, Trade Size, and Information in Securities Markets*](https://www.edegan.com/pdfs/Easley%20OHara%20%281987%29%20-%20Price%20Trade%20Size%20and%20Information%20in%20Securities%20Markets.pdf) | Order size and sequence affect adverse selection and execution prices because informed traders prefer larger trades. | It motivates a marked likelihood for quantity, not an arbitrary per-volume permanent update or additive sufficient statistic. |
| [Easley–O’Hara (1992), *Time and the Process of Security Price Adjustment*](https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1992.tb04402.x) | Arrival timing and nontrading convey information about event occurrence and affect spreads and adjustment. | Its lesson supports survival likelihoods such as (7)–(10), not automatic exponential forgetting of a permanent value after an episode ends. |
| [Holden–Subrahmanyam (1992), *Long-Lived Private Information and Imperfect Competition*](https://host.kelley.iu.edu/cholden/Holden%20and%20Subrahmanyam%20%281992%29.pdf) | Multiple informed traders compete aggressively and reveal shared information rapidly; revelation becomes immediate in its continuous-auction limit. | This supports an urgency mechanism but supplies neither a universal finite τ nor λ·abs(T). The rapid-information limit can eliminate the lingering alarm rather than justify it. |
| [Rochet–Vila (1994), *Insider Trading without Normality*](https://academic.oup.com/restud/article-abstract/61/1/131/1547030) | Existence and uniqueness in a non-Gaussian Kyle-related setting, including the variant in which the insider observes noise demand. | The information structure is essential. The result is not “any prior generates the desired nonlinear AMM.” |
| [Bagnoli–Viswanathan–Holden (2001), *On the Existence of Linear Equilibria in Models of Market Making*](https://host.kelley.iu.edu/cholden/Bagnoli-Viswanathan-Holden%20%282001%29.pdf) | Necessary and sufficient distributional conditions for linear equilibria across aggregate-flow, sequential, and call-market settings. | This is especially a warning against equating non-Gaussian primitives with nonlinear, let alone globally steepening, prices. |
| [Tao Li (2013), *Insider Trading with Uncertain Informed Trading*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=946324) | A working-paper model in which makers learn both value and whether a strategic trader is informed, producing stochastic depth and volatility. | The extra participation belief is part of the state. It does not establish a single EW signed-flow statistic or the present center update. |
| [Banerjee–Green (2015), *Signal or Noise?*](https://snehalbanerjee.github.io/papers/BanerjeeGreen2015.pdf) | Uncertainty about whether others trade on information produces nonlinear, asymmetric responses; learning about others generates return and volatility dynamics. | This supports nonlinear inference from uncertain information quality, not global symmetric steepening or a zero-profit AMM with the proposed execution rule. |
| [Back–Baruch (2004), *Information in Securities Markets: Kyle Meets Glosten and Milgrom*](https://doi.org/10.1111/j.1468-0262.2004.00497.x) | Strategic order timing with Poisson noise; connects sequential bid/ask execution to Kyle when lots become small and noise arrivals frequent. | Its informed intensity is an equilibrium object. The scaling justifying continuous prices must be supplied; fixed event likelihoods cannot simply be called infinitesimal. |
| [Collin-Dufresne–Fos (2016), *Insider Trading, Stochastic Liquidity, and Equilibrium Prices*](https://onlinelibrary.wiley.com/doi/abs/10.3982/ECTA10789) | Stochastic noise liquidity affects equilibrium informed aggressiveness, price impact, and information revelation. | Informed traders can trade more aggressively when uninformed volume is high and impact low. “Fast means informed; slow means noise” is not a structural classifier. |
| [Huberman–Stanzl (2004), *Price Manipulation and Quasi-Arbitrage*](https://business.columbia.edu/sites/default/files-efs/pubfiles/1556/QARBonehalfinch2-new.pdf) | In their time-independent permanent-impact framework, linearity is required to exclude quasi-arbitrage; temporary impact has more freedom. | A nonlinear contribution assigned separately to each order differs from a conservative live-position potential S(P). Their linearity result does not contradict safety of ∫S(P)dP. |
| [Gatheral (2010), *No-Dynamic-Arbitrage and Market Impact*](https://www.tandfonline.com/doi/abs/10.1080/14697680903373692) | Connects allowable nonlinear impact and decay kernels through no-price-manipulation conditions. | A convolution of nonlinear trade impacts is different from applying T to exponentially decayed volume. One cannot transfer a restriction on one model to the other by naming both “exponential decay.” |
| [Obizhaeva–Wang (2013), *Optimal Trading Strategy and Supply/Demand Dynamics*](https://web.mit.edu/wangj/www/pap/ObizhaevaWang13.pdf) | Resilience of book supply changes optimal execution; the block-shaped benchmark yields tractable transient impact. | Resilience is a supply mechanism, not automatically Bayesian forgetting of a permanent payoff. |
| [Alfonsi–Fruth–Schied (2010), *Optimal Execution Strategies in Limit Order Books with General Shape Functions*](https://arxiv.org/abs/0708.1756) | General book shapes and explicit distinction between exponential recovery in volume and in price displacement. | The AMM's φ is the volume-impact coordinate. Its nonlinear T is the inverse cumulative book shape, not a posterior derived by that execution model. |
| [Alfonsi–Schied (2010), *Optimal Trade Execution and Absence of Price Manipulations in Limit Order Book Models*](https://epubs.siam.org/doi/10.1137/090762786) | Generalizes trade-date and strategy choices and establishes absence of price manipulation under the paper's shape/resilience conditions. | **Their volume-resilience model specializes to our M0.** Equation (3) with fixed F is the short potential proof for this AMM subclass; it does not license a nonlinear permanent center ratchet. |
| [Alfonsi–Schied–Slynko (2012), *Order Book Resilience, Price Manipulation, and the Positive Portfolio Problem*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1498514) | Distinguishes ordinary from transaction-triggered manipulation in linear transient-impact models; connects nonalternating optimal strategies with properties of the decay kernel. | “No profitable round trip” is weaker than “opposite-direction intermediate trades never improve execution.” Its kernel results are not a Bayesian foundation for the urgent update. |

For the volume-resilience identification explicitly, let f(p) be book density, E = ∫₀ᴰ f(p)dp the depleted signed volume, and D its price displacement. Then D = T(E), a fill sends E to E+dq, and volume resilience gives dE = −βE dt between fills. Hence E = φ and f(T(φ)) = 1/T′(φ). Price resilience instead specifies dD = −βD dt. For curved T these are different laws. The no-manipulation statement being connected here is the fixed-unaffected-price M0 specialization, not a claim about the new information-driven F.

**Parameter origins and calibration.** Because the full requested identification fails, the table gives formulas where they are actually derived and states when an AMM parameter has no such identification. The touch density λ₀ below refers to the T component; the total marginal execution slope also includes any simultaneously charged S′ and fair gain.

| AMM parameter | Primitive or derived quantity in the explicit models | Calibration and limitation |
|---|---|---|
| τ | For the small quiet-relaxation mode of the four-state model, τ_eff = [(α+δ+μ)²−4αμ]⁻¹ᐟ². In the rare, never-stopping one-sided model, τ_eff = 1/μ. | Fit the marked-duration likelihood (15) including silence, then test the residual relaxation law (19). A single fitted exponential does not separately identify activation, death, and trading intensity. Exact additive-volume decay is not obtained. |
| Touch density λ₀ | In the Gaussian observation benchmark with y=gφ, λ₀ = σ²/[g Var(J given y=0)]. For the spike-and-slab, λ₀ = 1/[gγw₀]. | Estimate the flow-to-evidence scale g, noise variance, and jump distribution using flow plus an independent value proxy. In finite-lot Poisson pricing there is a bid/ask gain, not automatically a smooth density. |
| Positive far density floor | If the observation response has limiting slope k∞, its candidate density floor is 1/(gk∞). Spike-and-slab gives k∞=γ; Laplace gives k∞=1; a binary payoff gives k∞=0 and no finite positive floor. | Check the entire tail slope, not just the limit: (32) overshoots. This is a restriction on the payoff prior and likelihood, not an episode-death parameter. Tail estimates need enough independent large-flow episodes. |
| S′ | The symmetric, inactive limit of (23) has gain aν/[u(2ε+ν)] per unit, for an observed lot u. Elsewhere the exact gain depends on posterior certainty and side, as in (14). | Estimate ν jointly with noise intensity and value scale from quiet-regime orders and later value observations. There is no derivation of an arbitrary increasing S or a uniform positive S′ from ν>0. |
| Urgent λ | In the one-sided rare-value example only, λ_eff = μ/(εu), with exact error (35). The symmetric activity gain instead begins at [2aεμ/(u(2ε+ν)²)]ẽ, rather than λ·abs(T). | Estimate fill likelihood ratios and specify the approximation regime. A fitted λ changes with lot units, the activity-to-displacement relation, and the fitting band. No globally valid constant urgent λ survives Theorem 1. |
| C | No statistical primitive or safety role in the idealized model. | An operational risk/position limit can be set separately. It cannot supply Bayesian identification, stand in for a posterior reaching one, or make the uncapped rule safe. |

There is a basic identification obstruction even with unlimited flow data. In (12), replacing a by any positive multiple leaves the entire order-flow law unchanged: the intensities use only Y and A. It changes every monetary price gain. Therefore flow alone cannot identify the jump-value scale, monetary depth, or permanent price response. Estimating them from the AMM's own mechanically generated quotes would be circular. Independent terminal values, external prices, or an explicitly justified longer-horizon value proxy are necessary.

A workable empirical procedure is to fit the hidden-state likelihood to timestamps, signs, and observed quantities; retain total activity as well as signed flow; and test it on held-out episodes. Then use independent value observations to fit the jump distribution and the monetary scale. The most discriminating tests are the next-fill response after a balanced burst, the limiting value estimate after a burst followed by silence, and whether large signed displacement predicts conditional variance or merely direction. Compare completed-episode and never-stopping hypotheses explicitly. Finally test any compressed AMM approximation over a stated time and turnover budget, including reversals and endogenous stopping. A good fit to a response curve is not a manipulation proof.

**Numerical cross-checks.** Direct four-weight Bayes calculations were compared with (14), and normalized generator derivatives with (13), at 50 deterministic positive probability vectors with (a,ε,ν,μ,α,δ) = (2,1,0.4,3,0.3,0.8). Maximum discrepancies were below 5×10⁻¹⁶. The six-fill example gives prices (0,1/2,1/2,1/2,0,0), cost −1/2, and path probability 3/256. The quadratic ratchet gives ΔG = 5/4. For the spike-and-slab example p=0.1, s²=4, σ²=1, the slope at y=5 is approximately 0.81386156, above its limit 0.8. These checks corroborate the algebra; the proofs establish the claims.

**Ranked open questions.**

1. **Specify the intervention and equilibrium.** Which participant controls which orders, what private knowledge of parent orders does it have, and how do informed intensities and stopping policies respond to the maker's quotes? Solve this before using a posterior martingale to claim universal strategy safety. The exogenous four-state filter is an exact inference benchmark, not that equilibrium solution.
2. **Find an uncapped cost or strategy proof for the richer posterior rule.** Either establish an appropriate actual-law conditional-expectation argument, or exhibit a storage function/direct execution inequality that covers controlled input paths. A capped simulation or a posterior calculation under passive flow is insufficient.
3. **Construct an identifiable unbounded-jump model with the required global shape.** It must produce increasing marginal slope up to a finite positive density floor, retain permanent information after episodes finish, and specify the additional activity/uncertainty state. Equations (29)–(33) identify useful tests, but no global classification of endogenous Poisson equilibria is claimed here.
4. **Control approximation error at the level of cash flows.** Establish useful bounds in time, turnover, likelihood strength, and belief uncertainty. A fixed inventory bound does not control accumulated errors under repeated loops.
5. **Separate episode death from completed information empirically.** Flow alone can confound them, while their long-silence posterior prices differ. Independent value outcomes and a model of stopping are needed to determine what may decay and what should persist.
6. **Determine how much state can safely be compressed.** A mean, activity probability, and their interaction suffice for the explicit four-state benchmark. A permanent jump-size distribution and overlapping episodes generally need more. Any proposed scalar approximation must first survive the balanced-burst counterexample, rather than merely fit one-directional bursts.
