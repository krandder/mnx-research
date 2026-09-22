# Lot-level deviations, storage, and the episode games

Research brief 4 · 22 September 2026 · emphasis O, then Q

**The closure condition requires a deviation theorem, not just a posterior formula.** The correct lot-level condition is a supply inequality on the trader's information state: the excess execution cost of a lot must fund the increase in a continuation storage, and external observations must not increase that storage in conditional expectation. There is an exact finite-horizon converse, but generally the storage needs the trader's own-history belief and inventory, not just the dealer's posterior. Right-endpoint execution supplies a useful nonnegative remainder; it does not supply the missing storage inequality.

Two explicit counterexamples apply directly to the requested models. An additive three-point filter admits an eight-lot round trip with profit **0.0524547187** in the rapid-trading limit. A tilted episode filter admits a twelve-lot episode-death attack with **expected profit greater than 1.95**, with external Poisson flow included. Thus neither model class has a general theorem that adding U preserves abstention. These statements concern specified examples and open neighborhoods of parameters, not every possible calibration.

There is also a constructive result: **reciprocal exponential likelihoods aligned with the traded terminal payoff admit an explicit entropic storage and exclude every admissible U deviation**. Episode death and nonlinear likelihood statistics explain why that certificate does not transfer to the original tilted model. Authentication gives a genuine episode-game repair, but removes informational impact from U's own orders. A general anonymous, recurrent Poisson equilibrium with the requested global shape remains unconstructed here; it is not proved impossible in every richer model.

The numerical witnesses and algebra checks are reproduced by [O-check.py](O-check.py), using the Python standard library. The report distinguishes proved statements, numerical witnesses, and unresolved equilibrium questions throughout.

## O. The deviation inequality

### O.1. The experiment and the two beliefs

Fix the other players' strategies and one dealer execution rule. Let \(\mathbb P^0\) be the candidate equilibrium law with U inactive. Dealers observe the anonymous public history \(\mathcal H\), including each executed lot, and use

\[
 p_k=p^0(\mathcal H_{k-1},\text{lot }k)
     =E^0[V\mid\mathcal H_{k-1},\text{lot }k].
 \tag{O.1}
\]

The history includes timestamps, sizes, and disclosed parent-order information. In a sequential Poisson market, (O.1) means the appropriate marked-intensity posterior. A block announced as one parent order cannot automatically be counted as independent fresh information at every child lot.

U has no initial fundamental signal. Its policy \(\sigma\) uses public observations, its own order identities and inventory, and private randomization independent of the fundamental conditional on initial public information. Its actual law is \(\mathbb P^\sigma\). Its filtration \(\mathcal G^\sigma\) contains this information. Define

\[
 \rho_t^\sigma=\mathcal L^\sigma(V,\text{other hidden variables}\mid\mathcal G_t^\sigma),
 \qquad m_t^\sigma=E^\sigma[V\mid\mathcal G_t^\sigma].
 \tag{O.2}
\]

The dealer's reference posterior \(\pi_t\) and U's actual posterior \(\rho_t^\sigma\) need not coincide after U trades. Knowing which observations one manufactured is information about the observation process, even without a private signal about V.

Positive quantity buys. A signed lot \(q_k\) costs \(c_k=q_kp_k+\ell_k\), where \(\ell_k\) is an explicitly identified additional fee; initially take \(\ell_k=0\). U starts flat, \(Q_k=\sum_{i\le k}q_i\), and earns

\[
 \Pi_U=VQ_T-\sum_k c_k.
 \tag{O.3}
\]

A round trip has \(Q_T=0\). All strategies below have finitely many finite lots and waits. For random schedules require integrability sufficient to interchange the finite/stopped sums and expectation. Per-strategy deterministic bounds on horizon, number of lots and turnover are convenient; require the charged cash flows and the storage terms used below to be integrable as well. The bounded-payoff witnesses automatically have integrable cash flows. There is no bound common to the strategy class. Almost-sure finiteness alone is insufficient for optional-stopping arguments.

For a recurrent-jump value model, choose a finite terminal date and use its terminal payoff V. If the current hidden value \(v_t\) is an integrable martingale, then \(E[V\mid\mathcal G_t]=E[v_t\mid\mathcal G_t]\). An episode ending does not subtract its already incorporated fundamental jump.

**Proposition O.1 — exact excess-cost identity.** At each U fill let \(m_k\) denote (O.2) after the information accompanying that fill. Then

\[
 \boxed{E^\sigma[\Pi_U]
 =-E^\sigma\sum_k\{c_k-q_km_k\}.}
 \tag{O.4}
\]

Consequently abstention is a best response among all the stated schedules exactly when the sum on the right has nonnegative expectation for every such schedule. This includes terminal marked positions, not just flat endings.

**Proof.** The signed executed quantity is measurable in U's fill information, so \(E^\sigma[q_kV]=E^\sigma[q_km_k]\). Sum and use \(Q_T=\sum_kq_k\). ∎

Equation (O.4) is an exact test but is not yet a useful local condition. Replacing \(m_k\) by the dealer's reference posterior in this proof is the invalid step in the observational-martingale argument. Absolute continuity or full support of finite public histories does not justify that replacement.

### O.2. A local condition that implies the global inequality

A sufficient controlled state z must determine U's continuation information and the relevant transitions. It can include \((\pi,\rho,Q,t)\), other players' continuation states, and disclosed execution information. It must not include accumulated cash as a device for making the theorem tautological.

Separate a U lot from the subsequent external evolution. Write \(z\to z^q\) for the lot transition. On an isolated U lot, no independent fundamental observation occurs; U's own submission supplies no new fundamental information to U. Thus its m is unchanged at that instant, although the dealer's posterior changes. During a wait, include **all** external arrivals, no-arrival information, and hidden-state evolution in the actual transition kernel \(K^\sigma\).

**Theorem O.2 — lot-level storage/deviation inequality.** Suppose a finite storage B satisfies, on every reachable private state and for every admissible action,

\[
 \boxed{c(z,q)-qm(z)
       \ \ge\ B(z^q)-B(z),}
 \tag{O.5}
\]
\[
 \boxed{E^\sigma[B(z_{\rm next})\mid\mathcal G_{\rm now}]
       \ \le\ B(z_{\rm now})
       \quad\text{while U does not trade}.}
 \tag{O.6}
\]

Assume \(B(z_0)=0\), \(B\ge0\) at every permitted terminal state, and integrability of the storage increments along each tested schedule. Then every finite admissible U schedule has \(E^\sigma\Pi_U\le0\). If only round trips are tested, nonnegativity is required only on their terminal flat-inventory states.

More precisely, let

\[
 e_k=c_k-q_km_k-[B(z_k^+)-B(z_k^-)]\ge0,
\]

and let \(d_j\ge0\) be the conditional expected storage decrease over external interval j. Then

\[
 \boxed{E^\sigma\Pi_U
 =B(z_0)-E^\sigma B(z_T)
  -E^\sigma\sum_k e_k-E^\sigma\sum_jd_j\le0.}
 \tag{O.7}
\]

For an auction in which a U order and other observations are revealed together, use the more general one-step condition

\[
 E^\sigma[c_k-q_km_k-B(z_{k+1})+B(z_k)
          \mid\mathcal G_k,\text{chosen action}]\ge0.
 \tag{O.8}
\]

**Proof.** Sum (O.5). Insert the storage increments omitted during the external intervals. Their conditional expectations are \(-d_j\), so

\[
 E\sum_k(c_k-q_km_k)
 =E B(z_T)-B(z_0)+E\sum_k e_k+E\sum_jd_j.
\]

Apply Proposition O.1. Conditional versions of the same telescoping argument prove (O.8). Localization followed by uniform integrability gives the stated stopped extension. ∎

This is the discrete counterpart of K.3. The price charged for a lot can exceed U's conditional value on entry and fall below it on exit: that is consistent with safety when the exit releases previously funded storage. Requiring nonnegative excess cost separately on every lot, \(q(p-m)+\ell\ge0\), is a stronger sufficient condition, corresponding to \(B=0\); it is not necessary.

For a continuous-time filter with external generator \(\mathcal A^\sigma\), (O.6) is verified by \(\mathcal A^\sigma B\le0\) and integrability. Checking only B's derivative along a silent path is generally neither necessary nor sufficient for the stochastic statement. External jumps belong in the generator.

### O.3. Is this equivalent to a storage on the belief state?

**Theorem O.3 — finite-horizon converse, with its state requirement.** On a finite decision tree with finite action sets and finite integrable costs, take the state to be U's complete continuation information, including inventory and time. Then absence of a profitable admissible continuation from the specified initial state is equivalent to a storage satisfying the conditional one-step inequality (O.8), with the appropriate initial and terminal conditions.

**Proof.** Let J(z) be the minimum expected remaining excess cost \(\sum(c-qm)\) over admissible continuations. Use \(J=0\) at a permissible terminal state. At an interior state dynamic programming gives

\[
 J(z)\le E[c-qm+J(z')\mid z,a]
 \quad\text{for every action }a.
\]

Set \(B=-J\). This is (O.8). The zero strategy is available initially, so no positive expected profit is equivalent to \(J(z_0)=0\), hence \(B(z_0)=0\). If marked termination is available at every state, \(J\le0\) and \(B\ge0\) everywhere. If only liquidation to zero inventory is permitted, B may be negative away from the terminal fiber; the required terminal condition still holds. Sufficiency is Theorem O.2. ∎

For general continuous state/action spaces, the same construction requires a valid dynamic-programming principle, finite continuation values, and measurable selection or approximation. A separate certificate for every finite horizon need not automatically give one smooth, horizon-independent certificate. These qualifications cannot be removed by calling the state a posterior.

The deterministic converse is particularly direct. Augment the market state by U's inventory, and suppose every reachable state can be liquidated at finite cost. If all flat-ending paths from o have nonnegative cash cost, define

\[
 G(z)=\inf\{\text{cash cost of a finite path from o to z}\}.
 \tag{O.9}
\]

A fixed liquidation path bounds this infimum below. Appending an edge gives \(c(z,z')\ge G(z')-G(z)\); a zero-cost wait gives \(G(z')\le G(z)\). Flat endpoints have \(G\ge0\), and \(G(o)=0\). Conversely these inequalities telescope to safety. This is the discrete version of [M4-SAFETY](M4-SAFETY.md) and [G-storage, Theorems 1–3](G-storage.md). Equality on trades follows only if reverse trades restore state **and** reverse cash cost. Post-fill lots normally fail the latter assumption: a buy and its immediate reverse pay a spread.

With a constant genuine reference value m, the cash and excess-cost storages are related by

\[
 G(z)=Q(z)m+B(z).
 \tag{O.10}
\]

For a stochastic m this remains the useful accounting transformation, with \(Q\,dm\) treated as a martingale holding gain, not as deterministic dissipation.

**Answer to the belief-state question:** equivalence holds on an adequate controlled information state under the above assumptions. It does **not** assert existence on the dealer's posterior alone. The same public posterior can be accompanied by different U inventories and different private explanations of past flow, producing different continuation values. Even an exact sufficient statistic for the dealer's future quotes need not be sufficient for U's control problem. K.3's extra distortion coordinate is an explicit example. The exposure-coordinate failures in F Theorem 4 and M Theorem M6 are an additional, earlier obstruction: a proposed public compression may not even suffice for future dealer prices.

### O.4. The six-slot violation and what “self-financing updates” must mean

Use F's six-slot model: \(V=\pm1\) equiprobably; slots 2 and 5 have sign accuracy \(3/4\); the other four signs are uninformative. Prices include the current fill. U submits the following forced sequence:

| Slot | U lot | Post-fill price | U inventory | Cash cost |
|---|---:|---:|---:|---:|
| 1 | +1 | 0 | 1 | 0 |
| 2 | +1 | 1/2 | 2 | 1/2 |
| 3 | −1 | 1/2 | 1 | −1/2 |
| 4 | −1 | 1/2 | 0 | −1/2 |
| 5 | −1 | 0 | −1 | 0 |
| 6 | +1 | 0 | 0 | 0 |

Its profit is \(1/2\); public posterior, inventory, and calendar phase are restored. U's actual conditional mean is zero throughout this forced experiment. Summing (O.5) around the complete cycle would require \(-1/2\ge0\). Hence no admissible storage certificate exists for this rule and action set.

The timing matters: U acquires inventory in a slot that the dealer treats as uninformative, changes the price in a more informative slot, and liquidates in cheap informational slots. U knows the supposedly informative order was its own. Constant sign accuracy is therefore not the only missing condition; the execution rule must control the value created across the whole private-history experiment.

There is a useful exact accounting identity. Let M be the displayed posterior mark and \(W=QM-C\). For a U lot executed at \(p=M^+\),

\[
 \boxed{\Delta W=Q_-\Delta M-\ell.}
 \tag{O.11}
\]

Indeed, \((Q_-+q)M^+-Q_-M^--qM^+-\ell=Q_-\Delta M-\ell\). Post-fill execution removes the new lot's instantaneous paper gain. It leaves the revaluation of **previous inventory**. At slot 2 that inventory is one unit; it gains \(1/2\).

Consequently the suggested scalar test “the posterior update does not exceed the adverse-selection charge on that lot” is ambiguous and, in its natural per-unit reading, inadequate. Here \(p-M^-=\Delta M\) exactly, and \(q\Delta M\ge0\) at every informative lot, yet the pump profits. A test using only the immediate mean change also misses reattribution of earlier lots to episodes that later die, changes in variance or activity, and altered future quotes.

**A precise definition:** updates are self-financing for U if they satisfy (O.5), or (O.8) when information arrives jointly, for a storage obeying (O.6) and the liquidation boundary. The newly paid excess cost funds the increase in the value of future deviations, including the effect on old inventory. This definition is substantive when B is specified independently and its transition inequalities are checked; invoking an unspecified B is not a proof.

### O.5. Right endpoints, curve integrals, and the quadratic remainder

**Proposition O.4 — the lot remainder.** Let a scalar trade coordinate x move by q, and let H be nondecreasing along that trade. Write \(\Psi_x=H\). Then post-fill endpoint execution satisfies

\[
 qH(x+q)=\Psi(x+q)-\Psi(x)+R(x,q),
\]
\[
 \boxed{R(x,q)=\int_0^q[H(x+q)-H(x+u)]\,du\ge0.}
 \tag{O.12}
\]

If H is smooth, \(R(x,q)=\tfrac12H_x(x)q^2+O(|q|^3)\). If \(H_x\ge a>0\), then \(R\ge aq^2/2\).

**Proof.** For q positive the integrand is nonnegative. For q negative it is nonpositive on the negatively oriented interval, giving the same sign. Integration of H proves the identity; Taylor expansion or integration of the derivative bound gives the remainder estimates. ∎

Thus a right endpoint **preserves an already proved integrated-fill storage inequality**. It does not establish the required behavior of storage during waits or external observations. A pre-fill endpoint has the opposite local remainder. An exact curve integral has zero remainder. A literal midpoint evaluation \(qH(x+q/2)\) is not generally the curve integral, so it requires its own error/sign analysis.

In particular, (O.12) is not a proof for an arbitrary Bayesian lot filter: opposite marks need not define inverse movements of a common scalar x, and the pricing surface can change between lots. F's eight-lot additive witness below and the six-slot example already charge right endpoints.

**Corollary O.4a — the explicit finite-lot extension of K.3.** Keep K.3's decontrolled process \(Y^0\), distortion \(D\), and monotone heat-equation price H. Allow finitely many U jumps, each executed either by the integrated walk or at its right endpoint. For right endpoints,

\[
 \begin{split}
 E\Pi_U={}&-E\mathcal B(v_T,Y_T^0,D_T)\\
 &-\kappa E\int_0^T D_t[H(v_t,Y_t^0+D_t)-H(v_t,Y_t^0)]dt
 -E\sum_kR_k\le0,
 \end{split}
 \tag{O.13}
\]

where \(\mathcal B\) is K.3's Bregman storage and \(R_k\) is (O.12). For integrated walks set \(R_k=0\).

**Proof.** Between U jumps the K.3 Itô calculation is unchanged. At a jump q, \(\Delta\mathcal B=\int_0^q[H(v,Y^0+D+u)-H(v,Y^0)]du\). Subtract this from the lot's excess cost and obtain \(R_k\). Telescope, using the same integrability conditions as K.3. ∎

This extends the **deviation contract** of that game. It does not prove that an off-equilibrium finite block's conditional-mean auction price equals either its curve average or its endpoint. K's dealer break-even proof uses the continuous post-observation auction convention. In a diffusion limit, sums of endpoint corrections generate quadratic-variation terms; a finite Poisson lot cannot discard its correction merely by being called infinitesimal.

### O.6. A Bayesian convention that really satisfies the inequality

Here is a usable positive theorem with an explicit B, rather than a restatement of the desired optimality.

**Theorem O.5 — payoff-aligned exponential updating.** Let V be an exogenous terminal payoff, with finite exponential moments at all positions used. Suppose the reference likelihood of each U-executable signed lot q, after removing a factor independent of the hidden state, is

\[
 L_q(V)=e^{\gamma qV},\qquad \gamma>0.
 \tag{O.14}
\]

Assume the other observation likelihoods are the same for the public reference filter and U's correctly specified filter, and that any hidden-state transitions commute with multiplication by \(e^{\gamma qV}\). A sufficient example is a static V and unit-lot intensities

\[
 r_\pm(V,t)=a_\pm(t,\mathcal H_{t-})e^{\pm\gamma uV},
 \tag{O.15}
\]

with known positive scalar \(a_\pm\), no source ambiguity within a disclosed parent beyond the stated lot likelihood, and a nonexplosive actual process. Starting with \(Q=0\) and a common initial belief, dealers use their exact post-fill reference posterior. Then U has no positive expected marked profit under any admissible finite lot-and-wait strategy.

**Proof.** Induct through the likelihoods and transitions. The dealer treats U's lots as evidence, while U removes their likelihood factors. Therefore

\[
 \boxed{\pi_t(dv)
   =\frac{e^{\gamma Q_tv}\rho_t(dv)}{\rho_t(e^{\gamma Q_tV})}.}
 \tag{O.16}
\]

The statement remains valid when the full hidden state is larger than V, provided the commuting condition holds. Define

\[
 F(\rho,Q)=\frac1\gamma\log\rho(e^{\gamma QV}),
 \qquad
 B(\rho,Q)=F(\rho,Q)-Q\rho(V).
 \tag{O.17}
\]

Jensen gives \(B\ge0\), with \(B(\rho,0)=0\). Also

\[
 F_Q=\frac{\rho(Ve^{\gamma QV})}{\rho(e^{\gamma QV})},
 \qquad F_{QQ}=\gamma\operatorname{Var}_{\pi_Q}(V)\ge0.
 \tag{O.18}
\]

On a U lot, \(\rho\) is unchanged and the post-fill conditional-mean quote is \(p=F_Q(\rho,Q+q)\). Convexity and Proposition O.4 yield

\[
 q(p-m)\ge B(\rho,Q+q)-B(\rho,Q),\qquad m=\rho(V).
 \tag{O.19}
\]

While U holds Q fixed, both \(\rho_t(e^{\gamma QV})\) and \(\rho_t(V)\) are true conditional-expectation martingales under U's actual law. Conditional Jensen for the logarithm gives

\[
 E[B(\rho_{t'},Q)\mid\mathcal G_t]\le B(\rho_t,Q).
 \tag{O.20}
\]

Theorem O.2 applies. Its endpoint remainder is nonnegative, and its external-observation loss is the Jensen gap in (O.20). ∎

This theorem covers adaptive timing and private randomization. It does not require the dealer to identify a secret deviation, nor require its quote to equal U's valuation during a deviation. It also works from any initial public posterior shared by a newly flat U. The proof is an expected-profit proof with external flow running; it does not replace that flow by a deterministic silent path.

It identifies two different properties that are easily conflated:

1. **Reciprocity:** opposite lot likelihoods multiply to a hidden-state-independent constant, so a pure buy/sell reversal retraces the reference belief.
2. **Payoff alignment and persistence:** the log-likelihood accumulated by U is \(\gamma QV\), for the same permanent payoff for which U is paid. It is not an exposure to only a currently active component, and it is not a nonlinear statistic of V.

Reciprocity alone does not imply the second property. If likelihoods are \(e^{\pm\ell(V)}\), the derivative of their log partition is \(E[\ell(V)]\), not \(E[V]\). For this log-partition certificate to price the asset for arbitrary beliefs, \(\ell(V)\) must be affine in V, with its constant absorbed into the likelihood normalization. This is a sufficient-certificate restriction, not a theorem that all other likelihoods are unsafe.

For the binary constant-total-intensity benchmark in [F-attack, Theorem 5](F-attack.md), log likelihood ratios are affine in its two possible payoffs. Theorem O.5 consequently strengthens the deterministic edge-pairing proof there: with its exogenous opportunity process, U also has no positive expected marked profit when it reacts to the continuing external tape. Explicitly, for \(V=\pm j\), let \(z=\log(P(V=j)/P(V=-j))\) and \(\theta=\log(1+\nu/\epsilon)\). A buy adds \(\theta\) to z and a sell subtracts it; silence leaves z fixed. The quotes are

\[
 a(z)=j\tanh((z+\theta)/2),\qquad
 b(z)=j\tanh((z-\theta)/2).
\]

Here \(\gamma=\theta/(2uj)\). Fresh, expiring one-lot informed opportunities of rate \(\nu\) optimally trade on the value side because both finite-history quotes lie strictly between the two possible values. Thus dealers, those informed agents, noise, and an anonymous optimizing U with U=0 form a **one-belief-coordinate Poisson game**. This result still does not add an episode alarm or remove binary price saturation.

### O.7. Which repairs actually prove what?

| Convention or proposed change | Does it imply the lot inequality? | Equilibrium-price consequence |
|---|---|---|
| Anonymous post-fill conditional mean under the U=0 reference law | No. The six-slot and episode witnesses violate it. | Dealer break-even on that law does not make U=0 a best response. |
| Post-fill actual-private-law mean \(p=m^\sigma\), possibly plus a nonnegative fee | Yes, with B=0. | A policy-dependent oracle is not one fixed anonymous pricing strategy. Authentication or other observable information is needed to implement this claim. |
| Reference posterior plus a discretionary spread | Only with a bound covering the total excess-cost deficit, not merely the latest mean update. | With fixed primitives, a surcharge changes the all-in price away from the conditional mean. Calling it an adverse-selection spread does not restore dealer zero profit. |
| A spread widening with flow | Sufficient in a specified model with a storage or direct execution proof; no universal implication for an unchanged episode filter. | A liquidity-cost model can have such a spread. A posterior-mean equilibrium must derive its side likelihoods and trader responses anew. |
| Integrated walk, or right endpoint with a quadratic remainder | Sufficient when the underlying potential also satisfies the external-evolution inequality. | The exact finite-lot posterior convention must be established separately. Endpoint pricing alone fails in both episode counterexamples. |
| Conservative/capped posterior updates | Sufficient if the **whole augmented update** satisfies (O.5), and waits satisfy (O.6). A cap on \(\Delta M\) alone is insufficient. | Changing an exact supported-history Bayes update changes the observational model or abandons exact conditional-mean pricing. |
| Payoff-aligned exponential lots, with the commuting external filter | Yes, explicitly: Theorem O.5. | Prices remain exact reference post-fill means. Strategic optimality of other agents, if required, is a separate construction. |

For a proposed B whose external evolution is already safe, the smallest nonnegative surcharge that repairs a particular deterministic lot is

\[
 \ell_B(z,q)=\big[B(z^q)-B(z)-q\{p^0(z,q)-m(z)\}\big]_+.
 \tag{O.21}
\]

This formula is useful for verification; it is not automatically implementable. z contains private ownership/history information. A public rule needs a finite upper bound over all privately consistent states, or observable ownership. With unlimited inventories that supremum can be infinite. Charging (O.21) cannot repair an independently failing wait inequality.

There is a simple, expensive support-bound repair. If \(V\in[L,H]\), an ask at least H and a bid at most L make \(q(V-p)\le0\) on every lot, pathwise. For any reference posterior quote in \([L,H]\), a half-spread \(H-L\) is sufficient. It is not a competitive information-only quote, and charging it to everyone can eliminate informed participation and hence the alarm. No finite support-based constant exists for a Laplace payoff. These facts do not prove that every useful finite spread fails; its required size must be derived from the specified game.

[Fruth–Schöneborn–Urusov, Proposition 3.4](https://arxiv.org/pdf/1109.2631) proves absence of manipulation in its model with a trading-dependent spread and deterministic depth/resilience. Its unaffected quote is a martingale and its execution costs have a specific two-sided structure. It does not prove that appending an arbitrary widening spread to an endogenous episode posterior preserves a competitive equilibrium.

Likewise, merely including U's deviation set in the model is not a belief-update operation. If U=0 in equilibrium and anonymous finite histories have full support under the remaining population, Bayes fixes the supported-history price rule. Holding the population's strategies fixed, a profitable deviation against that rule rules out that candidate U=0 equilibrium. Counterfactual beliefs cannot be changed separately for each secret deviation. Different informed strategies, observable identities, commitment, or a genuinely different execution contract are substantive changes to the game.

The literature reinforces the distinction rather than replacing the proof. [Goldstein–Guembel, Proposition 1 and the paragraph following it](https://finance.wharton.upenn.edu/~itayg/Files/manipulation-published.pdf) excludes the uninformed trader's first-round trade in its no-feedback game, but explicitly permits a later informational advantage from knowing that it did not trade earlier. It is not a theorem of zero value for every own-history strategy. [Chakraborty–Yılmaz's market-order paper](https://www.sciencedirect.com/science/article/pii/S1386418103000429) concerns an informed insider's equilibrium manipulation under uncertainty about its presence; its noise replacement is exogenous. Its result does not independently establish U's deviation inequality. Some statements in LITERATURE-MAP §7 that infer uninformed safety from posterior pricing alone should therefore be read with these qualifications.

## N. Application to the episode models

### N.1. Add U without silently changing the experiment

U's orders are extra anonymous lots. The exogenous noise, episode transitions, and prescribed informed opportunity mechanisms keep operating. U observes the tape and subtracts its own lots when filtering; dealers continue their candidate U=0 filter while a deviation is tested. This is the analogue of holding the insider feedback fixed in K.3. If the other traders instead optimize persistent timing and size, their continuation policies must also be specified before an equilibrium can be claimed.

For E, let X contain permanent V and \(A\in\{0,1\}\), with birth/death rates \(\alpha,\delta\). Given sign intensities \(h_s\), the public filter and quote are

\[
 \pi^s(f)=\frac{\pi(fh_s)}{\pi(h_s)},\qquad
 p_s=\pi^s(V),\qquad
 \dot\pi(f)=\pi(Lf)-\operatorname{Cov}_\pi(f,h_++h_-).
 \tag{N.1}
\]

For a three-point fixed payoff and on/off activity this is six probabilities, **five independent numbers**. The binary submodel has three independent numbers. For Laplace values, (N.1) generally requires posterior measures on value and activity; no finite closure is established just by naming the prior. The profit-sensitive E specification additionally solves its endogenous bid/ask equations at every state.

For the recurrent tilted model with fixed jumps \(\pm j\), index regimes by \(r=0,+,-\). Let \(w_r\) be unnormalized regime weights and \(z_r\) unnormalized first moments of the **current permanent-inclusive value**, centered at its initial reference. With

\[
 s=\epsilon(e^\theta+e^{-\theta}-2),\qquad \beta=\delta+s,
\]

the no-fill equations, after removing common noise survival, are

\[
 \dot w_0=-\alpha w_0+\delta(w_++w_-),\quad
 \dot w_\pm=\tfrac\alpha2w_0-\beta w_\pm,
\]
\[
 \dot z_0=-\alpha z_0+\delta(z_++z_-),\quad
 \dot z_\pm=\tfrac\alpha2(z_0\pm jw_0)-\beta z_\pm.
 \tag{N.2}
\]

A sign-s lot multiplies both \(w_r,z_r\) by \((1,e^{s\theta},e^{-s\theta})_r\). Normalize the weights; the post-fill quote is \(\sum_rz_r/\sum_rw_r\). Thus **five numbers suffice for exact future mean pricing**, as the corrected synthesis observes.

There is a further count needed for this brief: an explicit closure for posterior **variance** adds three second-moment weights \(b_r\). They obey the same quiet transfer, and

\[
 \dot b_\pm=\tfrac\alpha2(b_0\pm2jz_0+j^2w_0)-\beta b_\pm.
 \tag{N.3}
\]

Fills multiply them by the same likelihoods. The resulting normalized filter has **eight numbers** for mean, variance, and their future evolution. The five first-moment coordinates do not determine variance for arbitrary conditional distributions of completed value; no minimum-dimension theorem for eight is claimed. Nor are these finitely many moments the entire distribution of all completed jumps. A Laplace current jump requires likelihood-weighted functions of its size and completed-value conditional moments unless an additional closure is proved.

### N.2. Additive regimes: a short, exact pump

**Theorem N.1 — a rapid additive-posterior round trip.** Set \(\epsilon=\mu=j=u=1\). Take \(V\in\{0,+1,-1\}\) with odds \(x_+=x_-=1/100\) against zero. In the active, no-transition limit, positive V adds one buy per time, negative V adds one sell, and zero adds neither. U buys four unit lots and sells four. Execute every lot at the exact post-fill posterior. In the zero-duration limit,

\[
 \boxed{\Pi_U=\frac{588104677}{11211663918}
                 =0.05245471870199526>0.}
 \tag{N.4}
\]

The schedule can be executed at distinct sufficiently close times with strictly positive expected profit, with the external Poisson process still running. It is an inventory round trip; its final activity belief is not its initial belief.

**Proof.** A buy doubles \(x_+\); a sell doubles \(x_-\). The price is \(m=(x_+-x_-)/(1+x_++x_-)\). Summing four purchase and four sale prices gives the exact rational number (N.4); equivalently it is

\[
 -\sum_{i=1}^4\frac{a(2^i-1)}{1+a(2^i+1)}
 +\sum_{j=1}^4\frac{a(16-2^j)}{1+a(16+2^j)},\qquad a=1/100.
\]

Spread these lots over an interval of length \(\eta\). On no external arrival the gain \(g_\eta\) converges to (N.4), including the exact survival updates. The total external intensity is at most 3 and every fill price lies in \([-1,1]\). Thus

\[
 E\Pi_U\ge e^{-3\eta}g_\eta-8(1-e^{-3\eta})>0
 \tag{N.5}
\]

for sufficiently small positive \(\eta\). No arrival is being suppressed or conditioned away in this expectation. ∎

This is not a failure to charge the side spread. Every price in (N.4) is already fill-inclusive. Opposite orders add information about presence, changing the future pricing surface during liquidation.

The phenomenon survives genuine on/off regimes and slow information. An exact rational example uses

\[
 P(V=\pm1)=1/20000,\quad P(A=1)=1/10,
 \quad\epsilon=1,\quad\nu=1/10,\quad\mu=9/10,
\]

with independent initial V,A and \(h_s(v,A)=1+(\nu+\mu A)1_{sv>0}\). Twelve buys followed by twelve sells have limiting profit **0.16017954551901545**. Exact rational arithmetic gives \(0.160179<\Pi<0.160180\). Any fixed finite positive birth/death rates, for example \(\alpha=.02,\delta=.2\), affect the rapidly executed path continuously and by vanishing amounts as its duration tends to zero. The same bounded-price argument proves a positive expected-profit deviation for sufficiently short positive duration, now with all six initial states possible and \(\nu>0\).

**Corollary N.1a — the profit-sensitive E rule is also vulnerable.** For \(h_+=\epsilon+(\nu+\mu A)(V-a)_+\), \(h_-=\epsilon+(\nu+\mu A)(b-V)_+\), the same prior, activity, coefficients and 24-lot pattern give the certified zero-duration enclosure

\[
 0.14840147109<\Pi_U<0.14840147110.
 \tag{N.5a}
\]

**Computer-assisted proof.** The outward-rounded interval calculation in [N-check.py](N-check.py), function `opportunity_enclosure`, brackets each side quote using

\[
 f_s(p)=p-M-s\sum_iw_i(\nu+\mu A_i)[s(V_i-p)]_+^2,
 \qquad f'_s(p)\ge1.
\]

It propagates enclosing intervals for the positive likelihood weights and their normalization through all 24 lots, enclosing their signed cash sum. Exact decimal initial weights and outward rounding produce (N.5a); the monotone derivative bound validates the root brackets. With positive finite birth/death rates, continuity again gives the same limiting gain. Total external intensity is at most 4 and prices stay in \([-1,1]\), so \(E\Pi\ge e^{-4\eta}g_\eta-24(1-e^{-4\eta})>0\) for sufficiently short positive duration. ∎

Thus stopping loss-making informed orders does not remove this pump. A full parameter classification, and a theorem for every Laplace profit-sensitive calibration, are not established here. E's Laplace/Gaussian-signal steepening theorem describes a different observation experiment and cannot settle these Poisson deviations.

### N.3. Tilted regimes: death breaks the safe alignment

**Theorem N.2 — a tilted episode-death pump with an actual-law profit bound.** Take a single possible episode: no new births during the experiment, initial odds \(1/100\) for each active sign against no episode, fixed jumps \(\pm1\), \(\epsilon=1\), \(e^\theta=3\), and death rate \(\delta=1000\). Death transfers the jump to the permanent completed value. U buys six unit lots, waits \(h=.02\), and sells six. Then the exact post-fill rule gives

\[
 \Pi_{\rm quiet}=2.920632526924115\ldots,
\]
\[
 \boxed{E\Pi_U\ge e^{-1/15}\Pi_{\rm quiet}
                   -12(1-e^{-1/15})
                =1.95835595002746\ldots>1.95.}
 \tag{N.6}
\]

**Proof.** Use five unnormalized weights for zero value, active +/−, and spent +/−. Start at \((1,.01,.01,0,0)\). A buy multiplies the active weights by \((3,1/3)\); a sell does the inverse; the other weights are unchanged. Let \(a_+,a_-\) be the active weights after the six buys. Silence replaces, for each sign,

\[
 a_s\longmapsto a_se^{-(\delta+4/3)h},\qquad
 d_s\longmapsto d_s+
       \frac\delta{\delta+4/3}
       (1-e^{-(\delta+4/3)h})a_s.
 \tag{N.7}
\]

Take the signed first moment divided by total weight after every fill. This gives the displayed quiet profit. It can be bounded without relying on the decimal: \(e^{-(\delta+4/3)h}<3\cdot10^{-9}\), and the corresponding rational limiting calculation with retention \(750/751\) gives \(\Pi_{\rm quiet}>2.92\). Bounding the remaining active weights in the six sales preserves this strict lower bound.

The external total trade rate never exceeds \(3+1/3\). Therefore the probability of no external trade during h is at least \(e^{-1/15}\), irrespective of the hidden death. The price remains between −1 and 1 on every path, so the twelve U lots lose at most 12 on the complementary event. This proves (N.6). Even the elementary bound \(e^{-1/15}\ge14/15\), with quiet gain greater than 2.92, proves expected profit greater than 1.9. ∎

Here the rapid consecutive lots are the zero-duration sequential-lot limit. Giving them sufficiently small positive gaps preserves the strict expected-profit bound by continuity and boundedness, so the deviation does not depend on assigning arbitrary quotes to a special simultaneous timestamp.

The mechanism is precise: the buys create evidence about an active jump; death transfers that inferred jump into a permanent value belief; the later sells mostly receive the noise likelihood and fail to undo the inference. On pure-trade paths buy/sell updates are reciprocal, but the death transition does not commute with their likelihood multipliers. In particular, spent positive and zero states have identical trade likelihoods despite different permanent payoffs. Theorem O.5 therefore does not apply.

Small **positive** birth rates preserve this counterexample. For the recurrent fixed-jump model, the finite-time law, filter moments, and expected finite-schedule cash flows are continuous at \(\alpha=0\). One way to justify uniform integrability is that rates are bounded independently of completed value, the birth count has Poisson exponential moments, and the schedule has finitely many bounded likelihood multipliers. Hence (N.6) persists on a neighborhood with \(\alpha>0\), possibly with a smaller lower bound. This is an existence statement for an open parameter region, not an assertion that the synthesis's particular \((\alpha,\delta)=(.02,.2)\) has the same expected gain.

For the Laplace tilt, there is an additional obstruction to the entropic proof even without death: its statistic is \(\ell(J)=\operatorname{sgn}(J)\log(1+\kappa|J|/\epsilon)\), not a multiple of the asset payoff. A no-pump theorem is not supplied by reciprocal updates in that statistic. The synthesis's reported Laplace quiet-path gains do not by themselves prove expected gains with external flow; that larger model requires an actual-law calculation or a new storage.

### N.4. A proved episode-game repair, and its cost

**Theorem N.3 — authentication repairs U's incentives.** Keep an exact episode filter for anonymous external orders. Give U a publicly authenticated channel, prohibit U from passing its orders through the anonymous channel, and exclude its authenticated lots from the fundamental likelihood. Its channel execution price is

\[
 \boxed{p_U(t)=E[V\mid\text{external observations through }t].}
 \tag{N.8}
\]

Assume U's actions do not change the external opportunity process. Then U=0 is a best response among all the stated strategies: every expected marked profit is zero, or nonpositive with nonnegative channel costs. Dealers' prices are conditional means on the resulting law.

**Proof.** Conditional on the external observations, the authenticated action is generated from those observations and independent private randomization. It reveals no additional fundamental information. U's actual valuation equals (N.8), including its timing information, so Proposition O.1 gives the result with B=0. ∎

This can be a genuine strategic game, not just a relabeled filter. For bounded \(V\in\{-j,0,j\}\), let each informed opportunity belong to a fresh, one-lot, nondeferring agent who observes V and an independent participation cost uniform on \([0,2j]\). Opportunities arrive at rate \(2j(\nu+\mu A)\). An agent buys if \(V-a\) exceeds its cost, sells if \(b-V\) exceeds its cost, otherwise abstains. Because \(a\ge b\), both sides cannot be profitable simultaneously. Aggregate informed hazards are exactly E's profit-sensitive ones. Its unique competitive quotes solve

\[
 \epsilon(a-M)=\pi[(\nu+\mu A)(V-a)_+^2],\qquad
 \epsilon(M-b)=\pi[(\nu+\mu A)(b-V)_+^2].
 \tag{N.9}
\]

The chosen informed actions maximize each opportunity holder's payoff; dealers break even at (N.9); authenticated U satisfies N.3. This constructs an equilibrium with five independent public posterior weights. The participation cost is a specified primitive paid by informed agents; no optimizing persistent insider or competition over repeated timing opportunities is asserted.

The external posterior retains episode-sensitive uncertainty. At a symmetric sparse three-point prior, a buy increases payoff variance for sufficiently small nonzero event probability, whereas silence decreases it: the increase in the posterior nonzero-value probability is first order in that probability, and the squared mean correction is second order. At symmetry the exact silence derivative is \(-\operatorname{Cov}(V^2,\Lambda)<0\), since nonzero values produce higher total trading intensity. These are local alarm properties, not a theorem that variance increases on every arbitrarily long burst. Bounded posterior means necessarily saturate, so this equilibrium lacks a global positive far liquidity floor.

Authentication preserves inference from **external** flow. It removes informational impact from **U's** flow. It also requires common ownership to remain authenticated across accounts. A claimant allowed to open an anonymous account has the original deviation set and the repair's proof no longer applies.

No other repair in O.7 has been proved here to produce an anonymous recurrent episode equilibrium with all the requested features. For example, a hard spread can enforce abstention but changes fills and informed participation; a conservative update can enforce an independently supplied storage but changes exact Bayes on supported histories. Those are changes to solve and verify, not existing equilibria obtained by appending a label.

## P. Adversarial checks, briefly

The following table separates attacks on a proved stochastic construction from attacks on a copied deterministic machine. A pathwise gain conditional on silence is not automatically a positive expected gain.

| Construction or rule | Strongest relevant attack and result |
|---|---|
| Unrepaired additive episode posterior | Own-flow presence pump: (N.4), profit 0.0524547; six-state version, limiting profit 0.1601795; profit-sensitive E rule, certified limiting profit 0.14840147. These extend to strictly positive expected profits at distinct sufficiently close times. They end flat but need not restore the activity posterior. |
| Unrepaired tilted episode posterior | Burst, episode death, unwind: (N.6), expected profit greater than 1.95. It needs no second account. A recurrent model inherits a positive-profit region by continuity; full posterior restoration is not claimed. |
| Authenticated episode equilibrium N.3 | Own-history, waiting for silence, and timing around death all give expected profit at most zero by \(p_U=m\). This holds from every supported common initial posterior. Multiple authenticated accounts aggregate to the same proof; a bypass into the anonymous pool invalidates the channel restriction. |
| Payoff-aligned exponential rule O.5 | Arbitrary adaptive timing, silence, and external-arrival attacks satisfy (O.7). Multiple accounts paying through the same rule aggregate into Q, so splitting cannot evade the inequality. A newly flat trader at any shared displaced posterior also has B=0 initially. |
| K.3 with the lot contract O.13 | Own-history and arbitrary adaptive lots have nonpositive expected marked profit, with the explicit Bregman and endpoint losses. Aggregate multiple U accounts into the same distortion D. |
| A safe integrated-fill rule copied into a deterministic, externally frozen market | A displaced start can still be profitable: the small round trip has cost \(q[R(x)-R(W_tx)]+O(q^2)\); choose q's sign. A right-endpoint remainder of order \(q^2\) cannot remove this first-order obstruction when arbitrarily small lots are allowed. A fixed minimum lot or a spread changes this local argument. |

For the proved stochastic repairs, zero expected-profit bounds cover full-state loops as a subset of inventory loops, when those loops are admissible. No claim of pathwise nonpositive profit on every random realization is made: exposure to future external information can produce positive and negative realized gains. From-rest deterministic safety and full-loop deterministic safety require their own storage boundary, as in M4-SAFETY; conditioning a stochastic proof on an indefinitely silent path does not establish them.

## A useful clarification before Q: the nonlinear Kyle price has a payoff-variance alarm

The prior reports correctly say that K's latent variance clock is not replenished by flow. That does not mean the **payoff's posterior variance** is independent of flow. The distinction matters when identifying the nearest existing game.

**Proposition O.6 — an observable alarm in the bounded-slope K game.** In K.2 choose

\[
 h(x)=bx-cL\arctan(x/L),\qquad c=b-a>0,
\]

and define \(A(v,y)=\operatorname{Var}[h(y+\sqrt vZ)]\), \(Z\sim N(0,1)\). For every \(v>0\), A is even in y and strictly increases with \(|y|\). If

\[
 c/b<\sqrt2-1
 \quad\text{(for example }a=3b/4\text{)},
 \tag{O.22}
\]

then A strictly increases with v as well. Hence a rapid outward displacement raises the dealer's payoff-variance estimate, while silence at fixed y with \(\dot v=-\kappa v\) decreases it. K's price still steepens globally and has limiting slope b.

**Proof of the displacement claim.** Take independent \(X_1,X_2\sim N(y,v)\). Their midpoint S and half-difference D are independent normals with variances \(v/2\), and

\[
 A(v,y)=\tfrac12E[(h(S+D)-h(S-D))^2].
\]

For fixed \(d>0\), let \(f_d(s)=h(s+d)-h(s-d)>0\). Since \(h'\) is even and strictly increasing with absolute argument, \(f_d\) is even and

\[
 f'_d(s)=h'(s+d)-h'(s-d)>0\quad(s>0).
\]

Thus \(f_d^2\) is even and strictly increasing on the positive half-line. Gaussian averaging preserves this property: its derivative is the integral over positive z of its positive derivative times the positive kernel difference \(\varphi(z-y)-\varphi(z+y)\). Average also over \(|D|\). This proves the first assertion.

**Proof of the clock claim.** Put \(g(x)=L\arctan(x/L)\), so \(h=bx-cg\) and \(0\le g'\le1\). With \(X=y+\sqrt vZ\), differentiation under the Gaussian integral and Gaussian integration by parts give

\[
 A_v=b^2-bc\{E[g'(X)]+E[Z^2g'(X)]\}
       +\frac{c^2}{\sqrt v}\operatorname{Cov}(g(X),g'(X)Z).
\]

Gaussian Poincaré gives \(\operatorname{Var}(g(X))\le v\); also \(E[(g'(X)Z)^2]\le1\). Cauchy–Schwarz therefore yields

\[
 A_v\ge b^2-2bc-c^2>0
\]

under (O.22). The established K/M convolution proof gives the price's strict global steepening and slope limit. ∎

This does not turn K into a Poisson episode model. In fact \(A(v,y)\le b^2v\) by Gaussian Poincaré. Its alarm can rise within a shrinking envelope, but no late burst replenishes the exhausted information clock. Its fundamental V is non-Gaussian, whereas its latent signal and aggregate equilibrium noise experiment are Gaussian. Here “silence” is a fixed-flow path comparison, not a positive-probability Poisson no-arrival event. These are different meanings of “non-Gaussian game.”

## Q. One-page synthesis for the operator

**For the intended recurrent, anonymous Poisson episode class, no complete game with all the requested properties is established here.** The gap is now narrower than “Bayes might not be safe”: explicit finite deviations rule out U=0 for concrete members of both proposed families, despite exact post-fill quotes. The additive filter sells revaluation of earlier inventory too cheaply; the tilted filter can convert U-created active evidence into retained value when the episode dies. Including U in an unchanged anonymous belief model does not alter Bayes on supported equilibrium histories.

The smallest proved episode repair here is the **authenticated six-state opportunity game** of N.3. Its public state is five independent probabilities over three permanent values and two activity states. Anonymous lots use the explicit filter (N.1) and the unique side quotes (N.9); authenticated U lots execute at the public value mean and do not update it. Fresh informed traders optimize a one-lot opportunity with a specified private participation cost. Dealers break even, and U=0 is a best response. The external posterior has a local variance alarm and silence learning. Its bounded value support forces price saturation, and U's own orders have no informational steepening. Authentication is the main implementation cost; ordinary adverse-selection spreads remain on anonymous orders. It is safe in expected profit from rest and every supported common displaced belief, including all admissible full loops. It is not a guarantee about a deterministic machine obtained by suppressing future external arrivals.

If “non-Gaussian” means **non-Gaussian payoff**, the nearest complete shape-and-incentive game already exists: K.2–K.3 with \(h(x)=bx-(b-a)L\arctan(x/L)\) and, for example, \(a=3b/4\). The belief/pricing state is **two numbers**, \((y,v)\), with \(v_t=v_0e^{-\kappa t}\); the price is

\[
 p(v,y)=E[h(y+\sqrt vZ)].
\]

Its derivative increases with \(|y|\) to b, giving positive density floor \(1/b\). Proposition O.6 proves that its payoff variance rises with an outward burst and falls in silence. K.3 proves U's best response, and O.13 extends the deviation bound to integrated or endpoint lot contracts. The continuous game charges no added friction to continuous finite-variation U; endpoint lots add a nonnegative correction, at least \(aq^2/2\) above the integrated walk. **Those lot contracts are safe extensions, not a newly proved finite-Poisson posterior equilibrium.** Deterministic integrated execution is safe from rest and on full-state loops; a fresh trader can harvest a displaced state if all external flow is artificially frozen. In the actual stochastic game, the expected-profit bound applies from a supported common initial belief. The cost is a depleting clock and Gaussian flow, rather than replenishing Poisson episodes.

For a genuinely Poisson constructive direction, require the **likelihood charged by a lot to be aligned with the payoff it finances**. Theorem O.5 gives the exact storage \(\gamma^{-1}\log E_\rho e^{\gamma QV}-QE_\rho V\). The binary version is already safe but saturates. Extending it to recurring jumps while retaining the commuting update, an optimizing informed population, and global positive-floor steepening is open. The original tilted Laplace likelihood is not payoff-aligned and its reported response overshoots its far slope, so it does not already meet that global shape requirement.

There is no blanket impossibility theorem for every richer belief-state game with spreads. The proved prohibitions are specific: bounded payoff support excludes a nonsaturating positive-floor price; for a fixed payoff without hidden transitions, reciprocal one-coordinate exponential Poisson filters with at least three payoff values cannot also close silence in that coordinate (M6); and smooth spreadless deterministic price relaxation excludes safety from every displaced start. The deliverable to demand from any next candidate is an explicit B satisfying (O.5)–(O.6), alongside actual equilibrium side likelihoods and a separate proof of the desired variance and tail shape.

## Reproduction and scope of validation

Run:

```bash
python3 O-check.py
python3 N-check.py
```

The first command checks the six-slot profit exactly, the eight-lot additive profit exactly, the six-state additive witness with rational bounds, the tilted death filter and its expected-profit lower bound, and the entropic endpoint/Jensen inequalities on a finite observation experiment. The second certifies the profit-sensitive witness by outward-rounded intervals and independently checks the tilted mean filter's dynamics. Its tilted schedule includes small positive lot gaps, so its reported lower bound differs slightly from the zero-duration value in (N.6), while remaining above 1.95. Neither script treats simulation as an equilibrium proof. Results O.1–O.6 and N.1–N.3 supply the mathematical arguments and their stated limits; the unsolved Laplace and recurrent anonymous equilibrium questions remain explicitly open.
