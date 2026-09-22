# Equilibrium, Bayesian prices, and the space of non-pumpable AMMs

Research brief 3 — 22 September 2026.

The main conclusions are in **M**. There is an explicit finite-dimensional, strategically derived Bayesian price with a globally steepening response and a positive limiting liquidity density. Its deterministic execution extension is safe **from rest**, within its finite trading horizon. Thus “finite-dimensional equilibrium implies linearity or saturation” is false. It does not supply the operator's three features together. Under the literal requirement of safety for a flat entrant at **every** state, a smooth, spreadless AMM cannot even have a predictably decaying executable price. Under the weaker from-rest requirement, the original zero-target, displacement-dependent permanent-update architecture is already excluded by the local theorems; a general impossibility theorem for richer Bayesian games has not been established.

Several premises require correction before combining the results:

- Full support plus observational Bayesian pricing does **not** imply safety under interventions. The full-support counterexamples in [F-attack.md](F-attack.md) already disprove that implication.
- The regime and panel constructions are principally filters with specified order intensities. They are not established strategic equilibria. Adding a player is therefore generally an equilibrium construction problem, not a small adjustment to a known equilibrium.
- Choice B is safe from rest and on full-state cycles, not for every inventory round trip from every initial state: [G-storage.md](G-storage.md), Theorems 1, 2 and 5. That file does **not** prove that Choice B cannot be a posterior in any conceivable probability model.
- [F-attack.md](F-attack.md), Theorem 4 excludes the proposed retracing state as a sufficient statistic for its particular episode model. It is not a theorem excluding all asset-value models on three real coordinates.

Throughout, a positive order buys, \(C\) is cash paid to the maker, and a flat trader's profit is \(-C\). Individual schedules have finitely many finite trades and waits; there is no common bound on their inventory, length or duration. Prices are centered real-valued prices, as in the local reports. A globally unbounded odd response would need additional interpretation for an asset whose absolute payoff must be nonnegative.

## J. Martingale first: the actual fundamental theorem

### J.1. Name the initial condition, the execution contract, and the probability law

Write \(N(x_0)\) for absence of profitable inventory round trips starting with market state \(x_0\) and trader inventory zero. Write \(N_0\) for the specified rest state, \(N_*\) for every initial market state, and \(N_{\rm cyc}\) for loops also restoring all market state. These are different properties. The trader's inventory \(Q\) must be distinguished from the market's cumulative-flow coordinate \(P\), especially when other traders exist.

There are also two Bayesian assertions:

1. \(B_{\rm eq}\): under an equilibrium or observational law, each actual execution price is the conditional mean of one integrable terminal payoff \(V\), including the observed fill and its relevant marks.
2. \(B_{\rm ctl}\): the conditional-mean or adverse-execution inequality used to bound a controller's profit holds under **that controller's actual law and information**, for every admissible policy being certified.

The second is stronger than ordinary on-equilibrium Bayes consistency. It is not obtained by assigning a small positive probability to every sign sequence. For continuous times or marks, support means positive probability of neighborhoods, not positive mass on each exact schedule.

For finite lots, the price after observing a lot, the average price of a block, and the marginal prices along a supply curve are distinct contracts. All claims below specify which is used.

### J.2. An exact storage equivalence, including the terminal condition

**Theorem J1 — fixed-start characterization.** Augment market state by \(Q\). Suppose every reachable state has a finite-cost finite liquidation to \(Q=0\), and all permitted edges have finite cash cost. Then \(N(x_0)\) is equivalent to a finite function \(G\) on reachable augmented states satisfying

\[
G(x_0,0)=0,\qquad G(x,0)\geq0,
\qquad G(z')-G(z)\leq c(z,z')
\tag{J1}
\]

for every permitted transition. Wait edges have cost zero. If trades are reversible and reverse costs are opposite, equality holds on trades. Differentiability is not required.

**Proof.** The inequalities telescope, giving \(C\geq G(x_e,0)\geq0\). Conversely, define \(G(z)\) as the infimum of the costs of finite paths from \((x_0,0)\) to \(z\). Reachability bounds it above. A fixed finite liquidation from \(z\), with cost \(l(z)\), gives \(G(z)\geq-l(z)\), since otherwise a negative-cost flat round trip exists. Every path to a flat terminal state has nonnegative cost. Appending an edge gives (J1); applying this to a reversible trade and its inverse gives equality. The empty path and \(N(x_0)\) give the normalization. ∎

This is the appropriate extension of [G-storage.md](G-storage.md), Theorems 1 and 3, to the brief's **inventory** loops. Its smooth version is \(bG=R, wG\leq0\), together with the terminal inequality. Omitting that inequality proves only a full-state-cycle statement. The model-specific identities and classifications in [M4-SAFETY.md](M4-SAFETY.md), Theorems 1–8, remain applicable with their stated initial conditions.

For safety at every state there is a particularly explicit characterization.

**Theorem J2 — all-state safety equals nonincreasing liquidation value.** Let \(\Phi_q\) be a globally defined reversible trade flow and

\[
c(x,q)=\int_0^qR(\Phi_u x)\,du.
\]

All signed finite trades are allowed. Define immediate liquidation receipts for an inventory \(Q\), at market state \(x\), by

\[
L(x,Q)=-c(x,-Q)=\int_{-Q}^0R(\Phi_u x)\,du.
\tag{J2}
\]

Then

\[
\boxed{N_*\quad\Longleftrightarrow\quad
L(W_t x,Q)\leq L(x,Q)\quad\text{for every }x,Q,t.}
\tag{J3}
\]

**Proof.** Fills obey

\[
L(\Phi_qx,Q+q)-L(x,Q)=c(x,q).
\]

Thus the right side of (J3) supplies a storage function with \(L(x,0)=0\), proving sufficiency. For necessity, start flat at \(\Phi_{-Q}x\), buy \(Q\), wait from \(x\), and liquidate. Its cost is \(L(x,Q)-L(W_tx,Q)\). ∎

In particular, for smooth rules, expanding \(L(x,Q)=QR(x)-Q^2bR(x)/2+O(Q^3)\) gives

\[
R(W_tx)=R(x),\qquad bR(W_tx)\geq bR(x)
\tag{J4}
\]

as necessary conditions. A free wait may not move the touch price, and, to second order, may not improve the marginal liquidity available to an existing position. The first condition is precisely the obstruction in [G-storage.md](G-storage.md), Theorem 2. This result uses neither Bayes nor finite-dimensional filtering.

### J.3. The correct martingale implication

**Theorem J3 — actual-law execution inequality.** For each admissible strategy \(\sigma\), let \(\mathbb P^\sigma\) be its actual joint law. At its \(i\)th fill, let \(\mathcal G_i^\sigma\) contain its signed quantity \(q_i\), relevant private nonfundamental information, and the observed fill. Suppose

\[
\mathbb E^\sigma\!\left[
q_i\{V-p_i\}\mid\mathcal G_i^\sigma\right]\leq0,
\qquad \sum_iq_i=0,
\tag{J5}
\]

with integrability sufficient to sum expectations. Then its expected profit is nonpositive. Hence there is no integrable nonnegative-profit strategy with positive profit on an event of positive probability. In the deterministic-response experiment this excludes every positive-cash loop.

**Proof.** Sum (J5), and use \(\sum_iq_iV=0\). Equality holds when \(p_i=\mathbb E^\sigma[V\mid\mathcal G_i^\sigma]\); nonnegative fees give the inequality. ∎

This is [F-attack.md](F-attack.md), Theorem 2, in inequality form; see also [E-model.md](E-model.md), Theorem 5. No uniform position cap is needed. Full support is **not** a premise of this calculation. It is useful only when extending almost-sure identities or specifying beliefs on histories. Nor does aggregate zero maker profit establish (J5) for a privately selected trader.

The six-slot counterexample in F has fill-inclusive prices \(0,1/2,1/2,1/2,0,0\) on signs \(+,+,-,-,-,+\). It earns \(1/2\), restores the posterior, and has positive probability under the original full-support law. Its homogeneous Poisson example shows that the failure is not a special calendar. These are counterexamples to \(B_{\rm eq}+\text{support}\Rightarrow N_0\), not counterexamples to J3.

### J.4. What the finance literature does and does not identify

| Statement | Status for this brief |
|---|---|
| \(N(x_0)\iff\) storage with the correct terminal inequality | Yes, under J1's finite-liquidation hypotheses. |
| No negative full-state cycles \(\iff\) finite storage on a return-connected component | Yes; G-storage Theorem 3. This alone is weaker than \(N(x_0)\). |
| A full-support observational martingale model \(\Rightarrow N\) under controlled inputs | False; F's two explicit pumps. |
| Actual-law calibration J3 \(\Rightarrow N\) | Yes, with admissibility and the same execution experiment. |
| \(N\Rightarrow\) a strategically meaningful Bayesian equilibrium | No such general implication; see L.4. |
| \(N\iff\) an equivalent martingale measure for an uncontrolled reference price | Not an AMM fundamental theorem. The strategy changes the price law and execution costs. |

[Çetin–Jarrow–Protter (2004)](https://stats.lse.ac.uk/cetin/files/fs123.pdf) study an exogenous stochastic supply curve, its self-financing convention and admissibility. Their martingale-measure characterization concerns the marginal reference-price process under their hypotheses. It is not a theorem about every finite fill being a physical-measure posterior, nor about a controller changing the observation law.

[Roch–Soner (2013)](https://www.epfl.ch/schools/cdm/wp-content/uploads/2018/08/Soner.pdf) explicitly track resilience, depth, spreads and liquidation wealth. [Bank–Kramkov (2015)](https://arxiv.org/abs/1110.3224) derive market-indifference prices through risk sharing with market makers. Neither supplies a universal identification of a dissipative storage function with a common-prior posterior mean. Risk-adjusted marginal-utility pricing is a different condition.

[Huberman–Stanzl (2004)](https://business.columbia.edu/sites/default/files-efs/pubfiles/1556/QARBonehalfinch2-new.pdf) constrain additive permanent impact under their execution model. [Gatheral (2010)](https://www.tandfonline.com/doi/abs/10.1080/14697680903373692) constrains a price-impact propagator. Their linearity restrictions do not prohibit nonlinear conservative \(R(P)\), or nonlinear \(T(\phi)\) with **volume-state** decay; M4-SAFETY Theorems 2 and 5 already supply counterexamples to those overextensions.

NFLVR additionally specifies a probability space, admissible random strategies, terminal liquidation and a topology for limiting gains. The brief specifies finite deterministic cash loops. Without those extra definitions there is no meaningful theorem equating the two. Within J1's deterministic cash-loop model, limits of nonnegative scalar costs remain nonnegative whenever costs converge; the issue is changing the model or admissibility, not a mysterious probabilistic replacement for storage.

### J.5. Choice B: martingale embedding and the meaning of its storage

A fixed controlled schedule giving nonconstant deterministic execution prices cannot be made a martingale merely by enlarging the filtration: the conditional expectation of its next deterministic price remains that price. Likewise, during a **guaranteed**, observation-free wait, the conditional expectation of a fixed payoff cannot drift. Random silence in a point-process model is different; possible future arrivals compensate the silence drift, as E-model Theorem 1 shows.

Conversely, a claim that Choice B's displayed quote cannot be a posterior of *anything* is too strong. Here is a precise weak embedding. Fix a lot size \(u>0\), retain its wait flow and reversible trade maps, and write

\[
d(x)=wR(x),\quad
\Delta_\pm(x)=R(\Phi_{\pm u}x)-R(x).
\]

Choice B has \(\Delta_+>0>\Delta_-\). For any positive constant \(a\), choose random buy/sell intensities

\[
\lambda_+=\frac{a+(-d)_+}{\Delta_+},\qquad
\lambda_-=\frac{a+d_+}{-\Delta_-}.
\tag{J6}
\]

The generator annihilates \(R\): \(d+\lambda_+\Delta_++\lambda_-\Delta_-=0\). For Choice B's bounded positive fill slopes and linear wait drift, these intensities grow at most linearly in the state. The process is nonexplosive, has finite moments on finite horizons, and \(R(X_t)\) is a true martingale. Taking \(V=R(X_H)\) gives \(R(X_t)=\mathbb E[V\mid\mathcal F_t]\) on \(0\leq t\leq H\). Both signs and finite quiet intervals have support.

This is an **engineered observational quote-process embedding**, not an equilibrium proof. It makes the *endpoint* quote a posterior; a finite original block costs the integral of the live curve, not \(uR(X_{t+})\). Replacing the block contract by endpoint-lot pricing would change the AMM. It also gives no invariance under a trader replacing these intensities by chosen orders. Thus it answers the enlarged-filtration question without falsely certifying the original fill contract. A finite prescribed sequence can similarly be embedded as one branch of a martingale tree by adding compensating branches; observing that branch is different from controlling it.

The minimal \(G\) in J1 is a **minimum acquisition-cost value function**. The dual available-extraction value is

\[
A(z)=\sup_{\text{admissible liquidations}}[-C_{\rm future}].
\]

A storage certificate bounds this value after accounting for terminal storage. Choice B's particular \(G\) is not proved to attain that bound: dissipation and endpoint reachability can prevent equality. It is an accounting potential, not automatically a fundamental value, a posterior log likelihood, or a utility. G-storage's discussion around equation (B20) makes the narrower relative-entropy interpretation available only when the required log-partition representation actually exists.

## K. Game first: what a strategic model can prove

### K.1. The proposed equilibrium theorem needs a stronger premise

**Theorem K1 — two valid equilibrium routes to safety.**

(a) If equilibrium execution satisfies J3 under every admissible uninformed deviation, then every such deviation has expected profit at most zero. The same deterministic execution mechanism is non-pumpable.

(b) If a risk-neutral manipulator is prescribed no trade, can make every loop in the brief as a unilateral deviation with the same deterministic responses, and no trade pays zero, Nash optimality implies \(N\).

**Proof.** Part (a) is J3. For (b), a positive-cash loop is a strictly profitable deviation from no trade. ∎

Part (b) assumes a **no-trade equilibrium**, not merely the presence of a player named “manipulator.” Nash optimality says its equilibrium payoff is at least every deviation payoff; its outside option says that payoff is at least zero. Neither inequality makes it at most zero. Competitive makers' zero profit aggregates informed gains and noise losses; it does not exclude a third group's trading rents. Private knowledge that one's own orders are uninformed can matter for interpreting anonymous history.

A further valid exclusion is repeatability: if a full-state pump can be repeated arbitrarily often, with the same beliefs and outside environment, no horizon or discount penalty, and no loss of feasibility, then a risk-neutral controller has unbounded attainable cash profit. A finite-payoff equilibrium cannot preserve that opportunity. This argument does not exclude every profitable inventory loop: its terminal market state may differ, and a finite-horizon game need not allow unlimited repetition.

Ordinary equilibrium beliefs are updated using equilibrium strategies. They are not usually recomputed as though makers knew a secret deviation. Requiring J3 under every deviation is a substantive robustness condition, stronger than sequential Bayes consistency on the equilibrium path.

This is consistent with the existence of profitable uninformed speculation in the rational-expectations framework of [Allen–Gale (1992)](https://academic.oup.com/rfs/article-abstract/5/3/503/1576822), where trader identity is uncertain. Their result is not being asserted to satisfy every deterministic-loop and competitive-dealer assumption here. [Jarrow (1992)](https://www.researchgate.net/profile/Robert-Jarrow/publication/227361702_Market_Manipulation_Bubbles_Corners_and_Short_Squeezes/links/0c960521281ee00885000000/Market-Manipulation-Bubbles-Corners-and-Short-Squeezes.pdf) likewise explicitly studies large-trader manipulation and conditions excluding it; merely calling a price process an equilibrium is not the relevant certificate.

The assumptions are consequently **not four independent switches**:

| Missing condition | Precise failure or qualification |
|---|---|
| Fill-inclusive execution | In binary GM at a symmetric prior, let an informative buy move the mean from \(0\) to \(d>0\). Executing that buy at the old mean and its immediate reversing sale at the then-current mean earns \(d\) per lot. Correct endpoint quotes eliminate this particular loop. |
| Actual-law/selection consistency | F's six-slot and Poisson examples already use fill-inclusive prices and full support. Forcing their signs changes their likelihoods. |
| Support/regular versions | With \(V=0\), quotes may equal zero almost surely at Poisson arrivals yet specify a buy price \(-1\) at exactly time 1 and sell price \(+1\) at exactly time 2. The exceptional schedule pumps. Continuity plus neighborhood support rules out this version trick, not the intervention problem. |
| Zero-profit discipline, when no Bayesian equality is otherwise imposed | A subsidized dealer can pay for round trips. For instance two execution curves \(p_0(q)=q\), \(p_1(q)=1+q\), reset for each auction, give a buy/sell cost \(q^2-q\); the finite optimal \(q=1/2\) earns \(1/4\). Such a posted mechanism is not a competitive common-value Bayesian market. |
| Strategic access to the tested schedules | A price rule may be an equilibrium for one-shot customers yet leak when a persistent customer can submit many orders. |
| Admissibility | Finite-strategy integrability is enough here; arbitrary doubling and optional-stopping claims need more. |

If Bayesian conditional pricing is already assumed in the relevant filtration, conditional zero maker profit is automatic. If J3 holds everywhere under the actual laws, full support is unnecessary. Therefore a demand for a separate counterexample obtained by dropping *each* item while keeping all the others literally unchanged is logically impossible.

The six-slot filter can itself be an equilibrium of a small game: in slots 2 and 5, a customer is informed with probability \(1/2\) and otherwise noise; other slots contain noise. A one-shot informed customer knows \(V=\pm1\), may trade one lot or abstain, and optimally trades its sign since the corresponding posterior price lies strictly between the two values. Competitive makers use the resulting likelihood \(3/4\) for the correct sign. Thus genuine strategic informed choice, \(B_{\rm eq}\), and full support can coexist with a pump in the **exported deterministic pricing map**. A controller permitted to replace those customer draws changes the game.

### K.2. The smallest useful transient game, and its exact limit

No smooth, spreadless game can produce an autonomous deterministic AMM with a changing wait price and \(N_*\): J2 already prohibits it. A minimal **stochastic** alternative is instructive.

Let \(V=\pm a\) persist, and let activity \(A\in\{0,1\}\) switch with Poisson activation/deactivation clocks. Noise orders arrive at rate \(\epsilon\) per side. While active, independently arriving one-shot informed customers have one immediate one-lot opportunity, know \(V\), and choose buy/sell/abstain. Correct-sign trading is strictly optimal at interior Bayesian quotes. Competitive risk-neutral makers condition on the sign. This is a solved one-shot-opportunity game, not a solution for patient strategic insiders.

The public state is the four-state posterior of \((V,A)\), with three independent coordinates. If \(\pi\) denotes this distribution, quotes and waits are

\[
p_s(\pi)=\frac{\pi(V\ell_s)}{\pi(\ell_s)},\qquad
\dot\pi=Q^{\mathsf T}\pi-(\Lambda-\pi(\Lambda))\pi,
\quad \Lambda=\ell_++\ell_-.
\tag{K1}
\]

These are E-model Theorem 1. Activity can disappear while the learned permanent value persists; F-attack Theorem 3 gives an explicit residual value after silence. The state is not a signed EWMA. Three posterior coordinates here also do not mean the engineered triple \((\phi,P,F)\) is sufficient: F-attack Theorem 4 supplies the conflicting histories.

Add a **publicly identified** strategic uninformed controller whose randomization is independent of \(V\) given public history. Its orders do not enter the anonymous-flow likelihood and execute at \(m=\pi(V)\). For any admissible strategy, the controller's information does not improve the conditional value estimate, its quantity is known at its fill, and J3 gives zero expected flat-trading profit. No trade is a best response; makers break even; informed one-shot strategies remain optimal. Inventory need not be capped. This is the explicit consistent benchmark in E-model's discussion following Theorem 5.

The distinctions are essential: this is a marked market with random external observations, not one homogeneous deterministic curve that treats all controlled flow as information. A profitable quiet-path reversal need not be profitable on paths with intervening outside orders. Giving the controller anonymous access requires solving a new equilibrium.

[Holden–Subrahmanyam (1992)](https://host.kelley.iu.edu/cholden/Holden%20and%20Subrahmanyam%20%281992%29.pdf) motivates rapid information revelation through informed competition, but does not derive this episode lifetime or nonlinear gain. [Back–Baruch (2004)](https://onlinelibrary.wiley.com/doi/pdf/10.1111/j.1468-0262.2004.00497.x) supplies the appropriate strategic point-process framework; it does not make the present enlarged model solved. [Chakraborty–Yilmaz (2004)](https://www.sciencedirect.com/science/article/abs/pii/S0022053103001017) studies informed manipulation, which is not an uninformed deterministic flat pump. The terms “manipulation” in that literature and in [Kyle–Viswanathan (2008)](https://people.duke.edu/~viswanat/PP-Article-Kyle_Vish_Manipulation_20080100_f.pdf) must not be substituted for the brief's cash-loop definition.

### K.3. Kyle–Obizhaeva–Wang: inspect the actual execution equation

In [Kyle–Obizhaeva–Wang (2018)](https://pages.nes.ru/aobizhaeva/KOW_smooth_trading.pdf), equations (32), (33) and (42), a trader faces

\[
p_n(t)=p_{0,n}(t)+\lambda S_n(t)+\kappa\dot S_n(t),
\qquad\lambda,\kappa>0.
\tag{K2}
\]

The model uses risk aversion, heterogeneous beliefs and market power. Signals and inventory adjustment have exponential dynamics. Its temporary execution term is proportional to **trading speed** and disappears when trading stops; it is not an exponentially decaying state left by an instantaneous block. Block execution has no finite instantaneous liquidity in this formulation. The paper is not an example of competitive physical-measure posterior-mean pricing of every fill.

For a constant unaffected intercept, the model's own impact terms cannot fund a round trip:

\[
\int_0^H(\lambda S+\kappa\dot S)\dot S\,dt
=\frac\lambda2(S_H^2-S_0^2)+\kappa\int_0^H\dot S^2dt
\geq0\quad(S_0=S_H=0).
\tag{K3}
\]

This is a direct calculation, not a claim about profits against its stochastic, endogenous intercept. The full equilibrium is a different game with different admissible controls; calling it pumpable or safe for arbitrary instantaneous AMM trades would be a category error.

## L. The modification: what can actually be repaired

### L.1. There is no operation called “make the same filter an equilibrium”

A hidden-state model plus an order-intensity model determines a posterior. A game must additionally determine who chooses those intensities, their objective, information, feasible deviations, and the maker's response to order identity and execution size. The four-panel synthesis explicitly acknowledges that its intensity and tilt are primitives rather than derived strategies. Its numerical pumps therefore do not establish “a strategic equilibrium has an arbitrage”; they establish that the exported filter fails an adversarial execution test.

The useful minimality criterion is to preserve specified **mechanics**, not to count how few words are changed in the model description. Here are the consequences of the proposed modifications. “Exists” refers to an equilibrium of the modified game, not merely a well-defined filter or deterministic mechanism.

| Modification | What changes in prices and state | What is established about equilibrium existence | Safety with unrestricted positions |
|---|---|---|---|
| Add an anonymous strategic manipulator | Its policy enters the likelihood and the other players' optimal strategies. The posterior generally needs beliefs about its inventory, type and plans. | No general existence theorem follows. The particular panel games have not been solved with this player. | Not automatic. A no-trade equilibrium with the tested deviations implies safety by K1; adding a player alone does not. |
| Make controller identity public and use its actual policy | At its fills, omit its known-uninformative order from the external-information likelihood; quote the conditional value \(m\). | The marked opportunity game in K.2 is an explicit example. | Yes for admissible flat strategies in that stochastic game, without a cap. Its own orders cease to create information impact. This is a different access contract. |
| Require actual-law calibration for every controlled policy | The relevant likelihood or execution inequality must hold after intervention; it cannot be copied from a passive model. | This is a condition to prove, not an existence construction. L.4 shows why demanding equality for all known input-only policies can destroy all information impact. | Yes if J3 is verified for the same execution experiment. |
| Replace pre-trade quotes by fill-inclusive quotes | \(m\) becomes \(p_s=\pi(V\ell_s)/\pi(\ell_s)\), with size and timing included as appropriate. | Given specified likelihoods, these quotes exist when the necessary moments and denominators do. Strategic equilibrium still needs optimality. | Cures the stale-quote example. Does not cure F's already-fill-inclusive pumps. |
| Add a spread or fee to the old state rule | Add a nonnegative, explicitly specified cash cost; a Bayesian adverse-selection spread instead requires different likelihood-conditioned prices. | An arbitrary surcharge is not a competitive zero-profit equilibrium. A new dealer objective or new adverse selection must justify it. | Some certified spreads suffice; a uniformly bounded spread cannot cure the uncapped permanent ratchet. See L.2. |
| Change relaxation to \(\alpha P\), using Choice B's paired update | Change the wait flow and set the fill gain from the integral in L.3. | A global deterministic rule and certificate exist. No competitive Bayesian equilibrium for the complete rule is established. | \(N_0\) and \(N_{\rm cyc}\), with unbounded positions. Not \(N_*\). |
| Bound positions | Change the admissible domain, boundary quotes and potentially all equilibrium strategies. | Existence is model dependent; a cap does not solve beliefs or incentives. | Can establish capped \(N_0\). It cannot answer the uncapped question, and small displaced-state harvesting can survive inside the cap. |

For the profit-sensitive opportunity intensities in [E-model.md](E-model.md), equations (1)–(3), the unique ask solves

\[
\epsilon(a-m)=\pi\big[(\nu+\mu A)(V-a)_+^2\big],
\tag{L1}
\]

with a reflected bid equation. This is a concrete alternative to an arbitrary urgent gain. The same paper's Theorem 1 gives its belief dynamics. Its quote fixed point is not a proof of equilibrium for a patient optimizing trader. Competing short-lived informed opportunities are one game; an insider who can delay, disguise and reverse is another.

### L.2. Spreads, order slicing and caps

**Proposition L1 — what adding execution costs proves.** If a rule already has a storage inequality, adding nonnegative fees preserves it. More generally, if for some \(G\)

\[
c_{\rm new}(z,z')\geq G(z')-G(z),\qquad
G(W_tz)\leq G(z),
\tag{L2}
\]

and the correct terminal inequality holds, the modified rule is safe on that domain.

**Proof.** Telescope (L2). ∎

A particularly strong sufficient spread construction is a common shadow price \(m_0\) with \(c_{\rm new}(x,q)\geq m_0q\) for every trade. Then flat loops cost at least zero. For example, a live per-unit surcharge \(s(x)\geq|R(x)-m_0|\), paid in either direction, gives this inequality. For an unbounded response this generally requires an unbounded surcharge and radically changes the book. The all-in execution price is not the posterior mean of the constant payoff \(m_0\); it contains a charge.

There is also a sharp negative result already available. In [F-attack.md](F-attack.md), Theorem 1, a fixed-size cycle changes the independent fair by \(\eta\ne0\), costs \(K\), and can be run while holding any finite offset \(H\). With a uniformly bounded per-unit fee, the extra cost of that cycle is bounded independently of \(H\). Its monetized fair change grows like \(H\eta\). The same choice of large \(H\) and finite repetition therefore defeats every such fee. A state-dependent charge growing with inventory or with the manufactured price change is a different proposal requiring a new proof.

Changing from a smooth walk to one-lot posterior execution can matter because it introduces a finite spread through the endpoint convention. It is not equivalent to refining a known parent order into independent information events. If the entire parent order is revealed before execution, its remaining deterministic children do not independently reveal new information about an exogenous payoff. A marginal-book model that prices “the order reaches this unit” instead needs that event's likelihood and stopping rule. This is one reason the engineering block contract cannot be justified merely by writing an infinitesimal Bayes formula.

For the original urgent M2 rule, [M4-SAFETY.md](M4-SAFETY.md), Theorem 4 proves the operational threshold \(\lambda C\leq1\) under its actual inventory cap and nondegeneracy assumptions. It is a cash-accounting threshold. It is not a posterior-certainty threshold, a theorem about all state-dependent gains below an envelope, or a general cap needed by Bayesian inference. A cap restricting only one insider does not restrict an anonymous controller's cumulative inventory. Changing the decay speed while preserving the same accessible zero-target waits also leaves the uncapped obstruction intact: G-storage Theorem 4.

### L.3. Choice B is a real mechanical repair, and refutes an overbroad necessity claim

The construction in [G-storage.md](G-storage.md), Theorem 5, is

\[
R=F+T(\phi),\quad dP=d\phi=dq,\quad
dF=[S'(P)+h(\phi)]dq,
\]
\[
h(x)=\alpha\int_0^1v^{-\alpha}T'(vx)\,dv,
\qquad \dot\phi=-k(\phi-\alpha P),\quad\dot P=\dot F=0.
\tag{L3}
\]

With \(A'=h, B'=A, V_T'=T, W'=S\), its certificate is

\[
G=P[F-S(P)]+W(P)+V_T(\phi)+B(\phi)-PA(\phi),
\]
\[
\dot G=-\frac{kh(\phi)}\alpha(\phi-\alpha P)^2\leq0.
\tag{L4}
\]

These results need not be reproved. They establish a mechanism for every allowed finite position, not an equilibrium. For the concrete Choice B, \(\alpha=1/2, S(P)=sP\), and

\[
T(x)=\operatorname{sgn}(x)
\left[b|x|-(b-a)L\log(1+|x|/L)\right],\quad0<a<b,
\]
\[
h(x)=b-(b-a)\frac{\arctan\sqrt{|x|/L}}{\sqrt{|x|/L}},\qquad h(0)=a.
\tag{L5}
\]

Its actual live fill slope is \(s+h+T'\), increasing from \(s+2a\) to \(s+2b\); hence the far density is \(1/(s+2b)>0\). The state relaxing to zero is **excess** \(\phi-\alpha P\), while the fair sensitivity depends on \(\phi\). It is not the original raw signed-flow EWMA. The settled price is \(F+T(\alpha P)\), not \(F\).

**Proposition L2 — a safe settled price need not be a function of position alone.** Suppose \(h\) in (L3) is strictly increasing on the positive half-line. From rest, compare (i) a purchase \(q>0\) in one burst and (ii) two purchases \(q/2\), separated by relaxation to the stationary level. Their eventual positions and flow levels agree, but their eventual fair values differ.

**Proof.** The fair increments are

\[
F_{\rm burst}-F_0=S(q)-S(0)+A(q),
\]
\[
F_{\rm split}-F_0=S(q)-S(0)+A(q/2)
+A((1+\alpha)q/2)-A(\alpha q/2).
\]

Therefore

\[
F_{\rm burst}-F_{\rm split}
=\int_{q/2}^{q}h(z)\,dz
-\int_{\alpha q/2}^{(1+\alpha)q/2}h(z)\,dz>0.
\tag{L6}
\]

The equal-length first interval is shifted strictly to the right. Subsequent relaxation leaves each \(F\) unchanged and sends both \(\phi\) to \(\alpha q\). These are settled limits; sufficiently long **finite** separating waits preserve the strict difference by continuity. G-storage Theorem 5 simultaneously proves \(N_0\) for all finite schedules. ∎

Thus the statements in WORKFLOW-MODEL-SYNTHESIS that “in every safe design the long-run fair is a function of \(P\)” and that this is the general theorem are too broad. The proved constant-gain necessity concerns the original zero-target architecture. Changing the relaxation target changes the conclusion. Choice B is a constructive counterexample to the broadened claim, not a counterexample to the original local theorems.

It is equally important not to broaden Choice B's positive result. At a state with \(\phi\ne\alpha P\), its executable price drifts while waiting. A new flat entrant can choose the small round trip of G-storage Theorem 2. Thus Choice B is not in the literal all-state set \(N_*\), even before asking about equilibrium.

### L.4. Why a universal equilibrium-representation theorem does not follow

There are two materially different readings of “some game with policy-consistent beliefs.”

**Reading A: one unchanged AMM is correctly calibrated under every admissible controlled policy.** This is the useful strong reading for a Bayesian *safety proof*. The proposed representation theorem is false even for a static increasing curve.

**Theorem L3 — known uninformative interventions cannot generate posterior impact.** Fix an exogenous integrable payoff \(V\), initial public information \(\mathcal H_0\), and an interval with no exogenous observations. Suppose all orders on the interval are generated by a known policy using only \(\mathcal H_0\) and randomization conditionally independent of \(V\). Under that actual law,

\[
\mathbb E[V\mid\mathcal H_0,\text{orders through }t]
=\mathbb E[V\mid\mathcal H_0].
\tag{L7}
\]

Consequently a nonconstant response to those orders cannot be a fill-inclusive posterior mean under every such policy.

**Proof.** Conditional independence makes the order-history likelihood a common factor across all value hypotheses. It cancels in Bayes' rule; equivalently apply conditional independence directly to the conditional expectation. The result also holds for adaptive policies, since adaptation to previous own orders adds no value information. ∎

For an explicit \(N_*\) counterexample, let waits do nothing and

\[
R(P)=bP-(b-a)L\arctan(P/L),\qquad0<a<b,
\quad c(P,q)=\int_P^{P+q}R(z)\,dz.
\tag{L8}
\]

Every flat loop has exactly zero cost from every \(P\). The response is strictly increasing, globally steepening away from zero, nonsaturating, and has far density \(1/b\). Announcing a deterministic purchase followed by its reversal leaves the conditional distribution of \(V\) unchanged throughout the experiment in L3, while (L8)'s marginal prices change. No enlargement by independent randomness repairs the contradiction. Thus \(N\not\Rightarrow B_{\rm ctl}\), even for an economically shaped curve; Choice B is unnecessary as a counterexample.

**Reading B: there exists a game whose equilibrium-path prices match the rule.** This is much weaker. L3 does not exclude it: anonymous makers need not know a deviator's policy, and equilibrium prices need not be fair conditional on the deviator's identity. Even linear Kyle impact generally fails the strong equality under a known artificial-flow intervention. It would be incorrect to use L3 to rule out Kyle itself.

For Reading B, the phrase “some game” must constrain preferences, terminal value, transfer payments, horizons, order identity and admissibility. Arbitrary action-dependent payoffs or subsidies can manufacture incentives; \(V=R(X_H)\) in an engineered martingale process can manufacture a weak posterior. Neither is a microstructural explanation. With standard common-value, risk-neutral speculators and competitive dealers, storage is not a verification of their optimal strategies, and there is no general representation theorem supplied by these files or proved here.

There is even a simple incentive obstruction if no slope restriction is imposed: \(R(P)=-P\) is conservative and has zero flat-loop cost, but an informed risk-neutral trader allowed unrestricted terminal positions has profit \(qV+q^2/2\) from a trade at \(P=0\). Its conditional expected payoff has no finite maximizing position. Such a rule cannot be an equilibrium of that standard unconstrained game. This is a counterexample for that stated game class, not for arbitrary utility-engineered games.

For Choice B specifically the conclusions are exact but narrower than “never a posterior”: it fails \(N_*\); it has a proved \(N_0\) certificate; it cannot satisfy the intervention equality of L3 while preserving informative own-flow impact; and J6 embeds its **quote process** in a weak observational martingale. An anonymous competitive equilibrium implementing its original integrated-fill contract and shifted relaxation remains unconstructed, not proved impossible by the existing posterior-state argument.

## M. The space: constructive examples, impossibility boundaries, and what remains open

### M.1. Finite-dimensional does not mean finite-valued

This report interprets “finite state” as a fixed finite number of real state coordinates, with regular update maps. A literally finite set of observable states and finite quotes cannot have an unbounded nonsaturating response. A finite set of possible fundamental values also bounds every posterior mean within their convex hull, regardless of how many state coordinates are used. Neither observation excludes an unbounded **continuous** fundamental with a finite-dimensional sufficient statistic.

A state must be sufficient for **future pricing and transitions**, not just the current mean. Encoding the entire history into the digits of one real number is not a meaningful finite-dimensional filter. Conversely, there is no theorem saying that every regular finite-dimensional filter is Gaussian, or that a nonlinear posterior necessarily requires infinitely many state variables. The explicit construction below is a counterexample to the proposed economic conclusion even without relying on such general filtering facts.

For membership in the intersection, one must identify the safety convention. The meaningful sets are

\[
\mathcal A_0=E\cap B_{\rm eq}\cap N_0,
\qquad
\mathcal A_*=E\cap B_{\rm eq}\cap N_*.
\tag{M1}
\]

If actual-policy calibration is imposed as well, it defines a further, substantially narrower class. It cannot silently be built into the ordinary definition of \(B_{\rm eq}\), since it would exclude familiar ways that anonymous impact is modeled.

### M.2. A finite-dimensional Bayesian equilibrium with global steepening

The following is an explicit positive construction. The general continuous-time equilibrium template is due to [Back (1992)](https://doi.org/10.1093/rfs/5.3.387). A modern statement, including the Brownian-bridge strategy and verification conditions, is [Back–Cocquemas–Ekren–Lioui, Theorem 3.2](https://arxiv.org/pdf/2006.09518). The particular bounded-slope curve, its global steepening proof, and the deterministic loop-cost calculation below are supplied here.

Fix a finite trading horizon \(T>0\), noise volatility \(\sigma>0\), \(0<a<b\), and \(L>0\). Define

\[
\boxed{g(y)=by-(b-a)L\arctan(y/L).}
\tag{M2}
\]

Then

\[
g'(y)=a+(b-a)\frac{y^2}{L^2+y^2},\qquad
g''(y)=\frac{2(b-a)L^2y}{(L^2+y^2)^2}.
\tag{M3}
\]

Let \(Z\sim N(0,\sigma^2T)\), set the exogenous fundamental \(V=g(Z)\), and let an informed trader observe \(V\) at time zero. Because \(g\) is strictly increasing, it also knows \(Z\). Noise orders are \(\sigma B_t\), with \(B\) independent of \(Z\). The informed trader chooses an admissible trading process \(X\), total order flow is \(Y=X+\sigma B\), and competitive makers observe \(Y\). Put

\[
\boxed{H(t,y)=\mathbb E\big[g(y+\sigma\sqrt{T-t}\,U)\big],
\quad U\sim N(0,1),\quad t<T.}
\tag{M4}
\]

The state needed for public pricing is only \((t,Y_t)\). In particular, nonlinear price response has not forced an infinite-dimensional public filter.

**Theorem M1 — equilibrium and exact shape.** In the risk-neutral continuous-trading game just specified,

\[
dX_t=\frac{Z-Y_t}{T-t}\,dt,
\qquad p_t=H(t,Y_t)
\tag{M5}
\]

form an equilibrium under the usual integrability/no-doubling restriction. There is no uniform inventory cap. For every \(t<T\), \(H(t,\cdot)\) is odd and

\[
a<H_y(t,y)<b,\qquad H_{yy}(t,y)>0\ (y>0),
\]
\[
\lim_{|y|\to\infty}H_y(t,y)=b,\qquad
H(t,y)=by-(b-a)L\pi/2+o(1)\quad(y\to+\infty).
\tag{M6}
\]

Thus the executed infinitesimal response steepens globally away from the center, its liquidity density decreases to the strictly positive floor \(1/b\), and its price level does not saturate.

**Proof of Bayesian pricing.** Conditional on \(Z\), (M5) makes \(Y\) a Brownian bridge from zero to \(Z\) with volatility \(\sigma\). Mixing its endpoint against \(N(0,\sigma^2T)\) makes \(Y\) an ordinary Brownian motion with that volatility in its own filtration. Consequently

\[
\mathbb E[V\mid\mathcal F_t^Y]
=\mathbb E[g(Y_T)\mid Y_t]=H(t,Y_t).
\]

Prices are a martingale, and Gaussian flow has full support on continuous-path neighborhoods. It does not give positive mass to a specified path or make an instantaneous jump an equilibrium observation. The distinction will matter below.

**Proof of informed optimality.** Set

\[
\Gamma(y)=\int_0^y g(z)\,dz
=\frac b2y^2-(b-a)L
\left[y\arctan(y/L)-\frac L2\log(1+y^2/L^2)\right],
\]
\[
\Gamma_t(y)=\mathbb E[\Gamma(y+\sigma\sqrt{T-t}\,U)].
\tag{M7}
\]

Here the subscript on \(\Gamma_t\) denotes the time-indexed function, not a derivative. We have \(\partial_y\Gamma_t=H\) and

\[
\partial_t\Gamma_t+\frac{\sigma^2}{2}\partial_{yy}\Gamma_t=0.
\]

For any admissible continuous finite-variation \(X\), Itô's formula gives

\[
\int_0^T H(t,Y_t)dX_t
=\Gamma(Y_T)-\Gamma_0(0)
-\int_0^T\sigma H(t,Y_t)dB_t.
\tag{M8}
\]

Require the final stochastic integral to have conditional mean zero given \(V\); square-integrability suffices. Conditional on \(V=v\), expected terminal trading profit is therefore

\[
\Gamma_0(0)+\mathbb E[vY_T-\Gamma(Y_T)\mid V=v]
\leq\Gamma_0(0)+\Gamma^*(v).
\tag{M9}
\]

The unique maximizing endpoint satisfies \(g(Y_T)=v\). Strategy (M5) achieves it. Its expected total variation is finite, since the bridge's near-terminal deviation has order \(\sqrt{T-t}\), making its drift's absolute expectation integrable. The bounded slopes give the required moment bounds. No common bound on \(Z\), orders or positions is imposed. This proves optimality and, with the preceding conditional expectation, equilibrium. ∎

**Proof of the shape assertions.** Oddness and derivative bounds follow by Gaussian averaging. To prove global, rather than merely local, steepening, let \(k_s\) be the centered Gaussian density with variance \(s=\sigma^2(T-t)>0\). Since \(g''\) is odd and positive on the positive half-line,

\[
H_{yy}(t,y)
=\int_0^\infty g''(z)
\{k_s(z-y)-k_s(z+y)\}\,dz>0\quad(y>0).
\tag{M10}
\]

Indeed \(|z-y|<z+y\) for \(z,y>0\), so the kernel difference is positive. Dominated convergence applied to \(g'\), and to the bounded arctangent correction in \(g\), proves the two tail statements. ∎

The actual central density is \(1/H_y(t,0)\), not \(1/a\) except at the terminal limit. This matters when calibrating the touch and far floor. The terminal payoff has unbounded support; no saturation has been hidden in a large but finite value bound. In fact \(|g(z)|\leq b|z|\), so \(\mathbb E e^{c|V|}<\infty\) for every finite \(c>0\). Global steepening does not require power-law or other strictly heavy-tailed values. This does not contradict E-model Theorems 2–3: its static additive-signal likelihood is different from the endogenous equilibrium likelihood here.

### M.3. Test this candidate against the deterministic AMM, rather than declaring victory

Freeze external orders for the brief's mechanical test. Use the state \((t,y)\), let a trade \(q\) send \(y\mapsto y+q\), let waits advance \(t\), and charge

\[
c(t,y,q)=\int_y^{y+q}H(t,z)\,dz.
\tag{M11}
\]

This specifies the finite-block extension exactly. It agrees with infinitesimal execution on the continuous equilibrium path, but is an additional contract for instantaneous blocks. The dealer's posterior after observing an entire exceptional block need not equal every marginal price along (M11). Therefore the following theorem certifies the extension's mechanical safety; it does **not** prove posterior calibration under all block interventions.

**Theorem M2 — the steepening candidate is safe from rest, but not at every state.** For every \(t_0<T\), every finite integrated-fill schedule starting at \(y=0\), ending at \(y=0\), and completed within the trading horizon has \(C\geq0\). Positions and the number of operations have no uniform bound. At every \(y\ne0\), \(t<T\), there is a sufficiently short, small profitable inventory round trip from that displaced state.

**Proof.** Define the normalized storage

\[
K(t,y)=\int_0^yH(t,z)\,dz
=\Gamma_t(y)-\Gamma_t(0).
\]

Its time derivative is

\[
K_t(t,y)=-\frac{\sigma^2}{2}
\{H_y(t,y)-H_y(t,0)\}\leq0,
\tag{M12}
\]

because \(H_y\) is even and increasing with \(|y|\). Trades cost exact increments of \(K\), and \(K(t,0)=0\). Hence a flat loop from rest has the explicit identity

\[
\boxed{C=\frac{\sigma^2}{2}
\sum_{\rm waits}\int
\{H_y(t,y)-H_y(t,0)\}\,dt\geq0.}
\tag{M13}
\]

This proof does not use any observational likelihood. For \(y>0\), however, the heat equation gives \(H_t=-\sigma^2H_{yy}/2<0\). Sell \(\varepsilon>0\), wait a fixed sufficiently short \(\delta>0\), and repurchase. Its cost is

\[
C=\varepsilon[H(t+\delta,y)-H(t,y)]+O(\varepsilon^2)<0
\]

for sufficiently small \(\varepsilon\). Reflect for \(y<0\). ∎

This is a useful positive result with precisely bounded scope: an equilibrium-derived, finite-dimensional, globally steepening Bayesian price can have a safe **from-rest** deterministic execution extension. The continuous game itself has ongoing random noise and informed trading. Removing those flows to obtain (M11) is not the same as a unilateral deviation in that game; a gain on its quiet deterministic skeleton is not automatically a sure gain under the game's probability law.

The construction is finite horizon. It is not a stationary, infinite-duration solution, nor a proof about repeatedly resetting the pricing clock. Any rolling implementation would need a fresh storage and equilibrium check.

It also misses two essential operator features:

- \(y\) is cumulative flow, not a raw exponentially decaying flow state. The price's time variation arises from changing residual uncertainty, not \(d\phi=dq-\phi\,dt/\tau\).
- Its terminal response is \(g(y)\). Larger cumulative displacement gives a larger terminal marginal response, but two histories ending at the same \(y\) have the same terminal response. This is not extra permanent learning caused by recent arrival timing at a fixed cumulative position.

Adding a redundant EWMA coordinate to this model does not change either fact. Renaming \(e^{-t/\tau}y\) “flow” also fails: its trade increment would be \(e^{-t/\tau}dq\), rather than the physical quantity increment \(dq\).

### M.4. Exact impossibility boundaries for the three features

To avoid coordinate tricks, the operator's strong version can be stated as follows:

1. A recent-flow coordinate obeys \(d\phi=dq-\phi\,dt/\tau\), with a genuine relaxation of executable displacement or liquidity during a wait.
2. The live fill slope increases with displacement and tends to a finite positive ceiling, so density has a positive floor and price has no saturation.
3. The **settled-price response** to an added trade is larger when recent displacement is larger, holding cumulative position and other relevant persistent conditions fixed. If \(\bar R(x)=\lim_{t\to\infty}R(W_tx)\), this is a claim about \(b\bar R(x)\), not merely a coordinate named \(F\).

**Theorem M3 — global deterministic safety excludes genuine spreadless relaxation.** Under J2's reversible spreadless execution assumptions, no member of \(\mathcal A_*\) can have a wait changing the executable touch price. Even if a moving fair exactly compensates that price change, no wait can lower the live marginal fill slope while preserving the touch.

**Proof.** Both conclusions are necessary conditions (J4). Equivalently, price relaxation gives a first-order small round trip; a reduction in slope with constant touch gives a second-order one. ∎

Thus adding hidden belief coordinates cannot save the strict, smooth, spreadless **all-state** specification. This is not a finite-dimensional filtering theorem: it would hold with any state representation admitting the same local trades and waits. If only an internal coordinate decays while executable price and recoverable liquidity do not relax, that has not implemented the operator's economic transient feature.

For the weaker \(N_0\) requirement, the existing sharp obstruction is different:

**Corollary M3a — the original architecture is excluded even from rest.** With

\[
R=F+T(\phi),\quad dP=d\phi=dq,\quad
dF=[S'(P)+h(\phi)]dq,\quad
\dot\phi=-\phi/\tau,\quad\dot F=0,
\tag{M14}
\]

and the symmetry, continuity and unrestricted-access assumptions of F-attack Theorem 1, \(N_0\) forces \(h\) to be constant. No choice of prior, equilibrium terminology or extra unused state can make its nonconstant urgent gain safe.

This is a direct application of [F-attack.md](F-attack.md), Theorem 1, or [G-storage.md](G-storage.md), Theorem 4, not a new proof. Allowing other state variables to change **actual execution or reachable wait paths** leaves that theorem's class and demands a new analysis. D-dynamics-full's compensating-drift result likewise requires \(k+h\) constant in its specified center-only class; an isolated nonlinear permanent term cannot be inserted while leaving the other equations unchanged.

Choice B escapes M3a by changing the target. Its settled price is \(F+T(\alpha P)\), so its settled marginal gain is

\[
b\bar R=S'(P)+h(\phi)+\alpha T'(\alpha P).
\tag{M15}
\]

At fixed \(P\), this really is larger for larger positive displacement. L2 shows its retained price can depend on timing. Its \(N_0\) certificate therefore rules out any alleged universal theorem saying that *all* safe mechanisms must have timing-independent permanence. What is missing is the game and Bayesian execution law, not a mechanical feasibility proof for the altered target.

There is a further exact classification within the simplest Kyle class.

**Theorem M4 — all-state-safe one-factor Brownian Kyle prices are affine.** Suppose a smooth price \(H(t,y)\) satisfies the Bayesian heat equation \(H_t+\sigma^2H_{yy}/2=0\), and its mechanical AMM has trade coordinate \(y\), clock-only waits, and integrated reversible fills. If it has \(N_*\), then \(H(t,y)=ay+b\) with constants \(a,b\).

**Proof.** J2 forces \(H_t=0\). The heat equation then forces \(H_{yy}=0\); independence of time makes both affine coefficients constant. ∎

This establishes a real linearity theorem with explicit assumptions. It does not apply to endpoint-priced GM lots with a spread, to a different public-flow generator, or to \(N_0\); M1–M2 demonstrate the last exception.

### M.5. Why appending an EWMA to Kyle is not an equilibrium construction

The following obstruction attacks a plausible way of trying to upgrade M1 to all three features. It concerns equilibrium verification itself, rather than storage.

**Theorem M5 — no effective EWMA in the smooth, inconspicuous, freely controlled Kyle ansatz.** Let the public state be \((t,P,\phi)\), with

\[
dP=u\,dt+\sigma dB_t,\qquad
d\phi=dP-\kappa\phi\,dt,
\quad\kappa>0.
\]

Assume a fully informed risk-neutral insider can choose arbitrary positive and negative finite trading rates without a running penalty. Suppose it has a smooth value function \(J(t,P,\phi;v)\), the smooth equilibrium quote is \(R(t,P,\phi)\), and the aggregate flow is inconspicuous: in the makers' filtration \(dP=\sigma dW_t\). Assume interior HJB verification is valid. Then \(R\) cannot depend on \(\phi\).

**Proof.** Put

\[
D=\partial_P+\partial_\phi,\quad
\mathcal L=\partial_t-\kappa\phi\partial_\phi
+\frac{\sigma^2}{2}D^2.
\]

The insider's HJB contains \(\sup_u u(v-R+DJ)\). A finite value with both unbounded rate signs requires

\[
DJ=R-v,\qquad \mathcal LJ=0.
\tag{M16}
\]

Bayesian pricing under inconspicuous public flow requires \(\mathcal LR=0\). Differentiate the second identity in (M16) with \(D\). Since

\[
[D,\mathcal L]=-\kappa\partial_\phi,
\]

we obtain

\[
0=D\mathcal LJ
=\mathcal L(DJ)-\kappa J_\phi
=-\kappa J_\phi.
\]

Thus \(J_\phi=0\), and \(R=v+DJ=v+J_P\) is independent of \(\phi\). ∎

This is not a theorem about all Kyle variants. It identifies the assumptions that must change to obtain a relevant recent-flow coordinate: for example rate costs or constraints, a different public-flow law, several strategically interacting information holders, imperfect/short-lived private signals, or failure of the smooth verification ansatz. A pricing function that solves a filtering equation but violates (M16) is not the claimed equilibrium. The proof also explains why combining a nonlinear terminal-value construction with an unrelated Kalman EWMA is not enough.

### M.6. A second obstruction: scalar reciprocal Bayes updates cannot close the desired Poisson filter

**Theorem M6 — the missing exposure coordinate.** Suppose a fixed fundamental \(V\) has at least three distinct points in its support, its posterior family is the regular scalar exponential family

\[
\pi_\theta(dv)=e^{\theta v-K(\theta)}\nu(dv),
\]

and a buy or sell always shifts \(\theta\) by \(+c\) or \(-c\), \(c\ne0\). Assume strictly positive Poisson intensities for both sides, no hidden transitions or public observations, and that silence is also required to keep the posterior in this same scalar family. This is impossible.

**Proof.** The fill updates force the likelihoods, at the current state, to have the form

\[
\ell_+(v)=A_+e^{cv},\qquad
\ell_-(v)=A_-e^{-cv},\quad A_\pm>0.
\]

Closure under silence would require

\[
\dot\theta\,[v-K'(\theta)]
=-\{A_+e^{cv}+A_-e^{-cv}-\pi_\theta(\Lambda)\}
\tag{M17}
\]

on the support of \(V\). The left side is affine in \(v\). The total intensity on the right is strictly convex in \(v\); a strictly convex function cannot agree with one affine function at three ordered support points. ∎

An extra exposure coordinate can retain the factor \(\exp[-t\Lambda(v)]\), so this is not an impossibility for all finite-dimensional posteriors. It specifically defeats “reciprocal signed updates + one scalar decaying belief + unbounded permanent value” as an exact Poisson explanation. Binary GM escapes because it has only two value hypotheses; the three-point and episode filters retain more information. This complements, rather than enlarges without proof, F-attack Theorem 4.

### M.7. A precise, implicit characterization of the intersection

No explicit parameterization of *all games* is available. There is, however, a useful necessary-and-sufficient verification system once primitives, controls and an equilibrium concept are specified.

For a regular finite-dimensional public state \(x\in\mathbb R^d\), an exogenous hidden state \(z\) carrying payoff \(v(z)\), and an observation mark \(e\), provide all of the following:

1. **Belief closure.** A map \(x\mapsto\pi_x(dz)\) closed under the equilibrium's actual marked likelihoods and wait flow. In a point-process specification,
   \[
   \pi_{\Psi_e(x)}(dz)
   =\frac{\ell_e(z,x;\sigma)\pi_x(dz)}{\pi_x(\ell_e)},\qquad
   D_w\pi_x=\mathcal Q^*\pi_x-(\Lambda-\pi_x\Lambda)\pi_x.
   \tag{M18}
   \]
   Payoff persistence requires the appropriate harmonic/terminal-payoff condition on the hidden dynamics, not deleting value when activity ends.
2. **The execution contract.** Every charged fill price is the conditional mean for the information actually revealed by that fill, including size, side, time, parent-order information and publicly observed identity. For one-lot events,
   \[
   p_e(x)=\frac{\pi_x(v\ell_e)}{\pi_x(\ell_e)}.
   \tag{M19}
   \]
   For a marginal book, specify a separate reveal/reach likelihood. The block cash cost must agree with that protocol.
3. **Incentive verification.** Each strategic informed and uninformed policy is a best response to the same pricing/transition rule and the other policies. This can be verified directly or with Bellman equations and admissibility/transversality conditions. The likelihoods in (M18) must be generated by those policies; they are not separately fitted objects.
4. **Mechanical safety.** The actual deterministic schedule experiment has Theorem J1's storage and terminal inequalities; for reversible all-state safety use the explicit liquidation test in equation (J3). Alternatively verify Theorem J3's probabilistic execution inequality under every tested actual policy, with no change of experiment.

If these four items are verified, they establish \(E,B,N\) by definition and by the theorems above. Conversely, an equilibrium supplies its actual beliefs, executions and incentive inequalities, and J1 supplies a storage function whenever its hypotheses and \(N\) hold. Smooth closure and smooth value functions are additional properties to prove, not automatic consequences of this abstract equivalence. The system is a research specification, not an existence theorem disguised as notation.

The boundary of the currently established examples is consequently:

| Family | Equilibrium and Bayesian status | Deterministic safety | Shape and operator features |
|---|---|---|---|
| Standard continuous Gaussian Kyle, \(H=a y+b\) | Strategic informed equilibrium; \(B_{\rm eq}\) | Integrated mechanical extension has \(N_*\) | Unbounded linear response; no genuine relaxation or steepening. |
| Binary one-lot GM, F-attack Theorem 5 | Competitive fill-inclusive posterior; one-shot informed choices can be made optimal | \(N_*\) for its lot contract, by the edge-crossing proof | Saturates; no silent sign-price decay in that constant-total-intensity model. |
| Nonlinear Kyle construction M1 | Explicit finite-dimensional strategic equilibrium and \(B_{\rm eq}\) | \(N_0\) for the integrated extension, M2; fails \(N_*\) | Global steepening and positive far density; cumulative-flow state and finite horizon. |
| A Kalman filter for a temporary latent signal | Exact filter; equilibrium and fixed-terminal-payoff martingale require separate verification | Depends on execution and controller access | Linear response; an EWMA estimate of a mean-reverting signal is not automatically a martingale for one fixed payoff. |
| Exact regime/episode posterior | \(B_{\rm eq}\) under specified flow; strategic extension generally unresolved | No inference from Bayes; concrete exported maps pump | Extra activity/exposure state; silence may retain permanent evidence. |
| Choice B | Proved mechanical construction; no complete competitive Bayesian implementation | \(N_0,N_{\rm cyc}\), fails \(N_*\) | Steepening, positive density floor, timing-dependent permanence, **shifted** relaxation. |
| Identified-control episode game K.2 | Explicit marked equilibrium with actual-law control calibration | No profitable admissible flat strategy in the stochastic game | Controller's own orders do not create information impact. |

The binary GM row does not follow merely from the word Bayesian. Its direct proof pairs crossings of each lot-grid edge, giving nonnegative cost. It also shows that a spread and non-reversible execution costs can preserve all-state safety even though the smooth reversible calculus does not apply.

### M.8. Best candidate for the operator, and the honest stopping point

For **a proved steepening equilibrium**, M1 is the strongest explicit candidate here: the curve has the exact global shape, finite state, strategic optimality and an uncapped from-rest storage identity. Its missing recent-flow and timing-dependent permanent components are identified, not approximated away.

For **a proved mechanical design with timing-dependent permanent response**, Choice B is stronger: it has the desired curve shape and an explicit uncapped storage certificate, but requires shifted relaxation and lacks a competitive Bayesian implementation. L2 establishes that its timing dependence is real, rather than just a decomposition of the same function of \(P\).

For **all three original features and \(N_*\)** in the stated smooth spreadless deterministic AMM, the answer is no: M3 prohibits genuine wait relaxation. For **all three original zero-target equations and \(N_0\)**, the answer is also no: M3a applies. These impossibilities do not depend on an unproved classification of finite-dimensional filters.

For **a broader finite-dimensional game**, with side-dependent execution, non-retracing evidence, endogenous activity and an appropriately specified controller, no theorem here excludes global steepening with an information transient and timing-dependent lasting learning. Neither the panel models nor KOW supply the missing construction. The relevant next problem is a coupled equilibrium/filter/execution problem satisfying (M18)–(M19) and a separate safety certificate. It should not be reported as already solved, or as globally impossible merely because the first attempted filters fail.

## One-page summary for the operator

**A Bayesian story does not certify an AMM against someone who controls its inputs.** A price can be the correct estimate under a noise-and-informed-flow model and still pay a deterministic trader to manufacture a misleading sequence. Positive probability for that sequence does not fix the problem. The likelihood changes when somebody deliberately supplies the orders.

**There is a concrete positive result for steepening.** This report constructs a strategic Kyle-style equilibrium whose price response is smooth, steepens everywhere away from the center, never saturates, and has a positive far liquidity floor. It uses two public coordinates: time and cumulative flow. Its deterministic integrated-fill extension cannot be pumped from rest during the trading session. This refutes the claim that a small Bayesian equilibrium must be linear or saturating. It does not establish Bayesian pricing for every exceptional block intervention, and it does not yet give the requested decaying-flow state or timing-dependent permanent update.

**The answer about all three features depends on what “safe” means.** If a fresh, flat trader must be unable to profit at every possible market state, a smooth spreadless AMM cannot offer predictable price relaxation. The trader can sell a little before a predictable fall and buy it back afterward. Even keeping the displayed price constant does not solve this if waiting makes liquidation cheaper. The report gives an exact liquidation-value test for this stronger safety standard.

If safety means that the trader cannot first create displacement and then profit by undoing it, there is more room. The original rule—flow decays toward zero, while displaced trades independently increase the permanent fair more—still fails with unlimited positions. The existing local theorems already prove that result; choosing a more sophisticated prior does not change it.

**Choice B is a real mechanical alternative.** It changes relaxation toward a fraction of cumulative position and pairs that change with a specific permanent update. It is safe from rest without a position cap and has the desired steepening curve. Its settled price can genuinely depend on the timing of earlier trades. Thus the panel's broader claim that every safe settled price must depend only on position is false. Choice B does, however, change the original decay story, can be harvested from an already displaced state, and has no proved competitive Bayesian implementation.

**Adding a manipulator to a game is not itself a repair.** One must solve its incentives and the maker's beliefs. A clearly identified uninformed controller can be priced consistently, but then its own orders provide no information and should not move the value estimate as though they were informed. Ordinary anonymous equilibrium needs a different argument. Fixed spreads and caps do not supply the missing uncapped theorem.

The practical choice is therefore between a proved mechanical design with explicitly stated initial conditions, and a new equilibrium research problem that changes the execution or information model. The report establishes both useful constructions and precise impossibility boundaries; it does not claim that all three original features have been jointly achieved.

## Ranked open questions

1. **Construct an anonymous equilibrium with a real transient and a safety certificate.** Fix a common prior, an unbounded integrable value, expiring informed opportunities, noise arrivals, and a persistent strategic uninformed player. Allow side-dependent fill-inclusive execution and retain all needed activity information. The target is a solved game plus $N_0$, or a justified stochastic no-positive-profit property—not the already impossible spreadless relaxation plus $N_*$ specification. Determine whether the equilibrium response can steepen globally to a positive density floor.

2. **Implement or exclude Choice B in a precisely specified competitive game.** Preserve its actual integrated cash costs and shifted wait flow, specify how parent orders are observed, and derive the likelihood and best responses. A weak endpoint-quote martingale is insufficient. If exact Bayesian implementation fails, identify the exact incompatible condition and the smallest execution change that preserves a storage proof. **Conjecture:** anonymity, unrestricted reversal, and the original reveal protocol impose further restrictions beyond its mechanical certificate; no general impossibility is proved here.

3. **Extend the constructive steepening equilibrium beyond cumulative flow and a finite horizon.** Theorem M5 shows why simply appending an EWMA to smooth inconspicuous Kyle fails. Investigate economically meaningful rate costs, multiple information holders or a different public-flow law, then check both equilibrium optimality and the deterministic execution extension. Stationary indefinite operation and resetting a finite-horizon model are separate problems.

4. **Find an exact, regular small filter for unbounded permanent value and episodic activity.** It must retain signed information, unsigned activity evidence, silence exposure and completed-episode value. Theorem M6 identifies why a scalar reciprocal family fails; F-attack Theorem 4 identifies a concrete lost statistic. Determine whether a finite closed family survives the equilibrium's endogenous likelihoods, rather than only an exogenous observation experiment.

5. **Characterize the least costly spread or execution friction for the chosen safety standard.** For $N_*$, use a liquidation-value or general storage inequality with genuine bid/ask costs. For $N_0$, preserve Choice B's useful response while charging any extra intervention risk. Uniformly bounded spreads cannot solve the old inventory-amplified ratchet; a successful design must explain what its costs grow with and whether those costs are Bayesian prices, fees, or risk compensation.

6. **Separate equilibrium profits from exported-mechanism pumps in future tests.** Track controller identity, its private knowledge of its own orders, external random arrivals, and the exact block contract. A positive quiet-path result is a mechanical witness, not automatically a sure gain in the stochastic game. Conversely, an observational martingale simulation is not a controller-safety test. The verification system in M.7 specifies the proof obligations.
