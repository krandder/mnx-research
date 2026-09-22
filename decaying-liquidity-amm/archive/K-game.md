# Equilibrium, Bayesian execution, and money pumps

Research brief 3 · 22 September 2026

The main constructive result is **Theorem K.2**: a two-scalar, time-changed Kyle game with an optimizing informed trader, noise flow, competitive dealers, and an optimizing uninformed trader. Its equilibrium can have an exactly exponential transient and a nonlinear permanent component. Its deterministic execution rule is safe from rest for unlimited positions; the uninformed player's deviations have nonpositive expected profit in the stochastic game. **Theorem K.3** gives the latter assertion a separate proof. Neither conclusion is inferred merely from the word “equilibrium.”

For the operator's particular architecture, the smallest proved repairs are in **L.3**. Choice B remains a useful mechanical design, but its guarantee is from rest, and its relaxation target is not zero. The much stronger claim that it cannot be a posterior under *any conceivable observational model* does not follow from the existing files. The valid impossibility statement concerns policy-consistent fair pricing under every controlling policy; see **L.4**.

Throughout, positive signed quantity means buying. Cash cost is \(C\), and a trader ending flat earns \(\Pi=-C\). Prices are centered additive prices; no assertion about reserve solvency or positive asset-price levels is implicit. Every deterministic test schedule has finitely many finite trades and finite waits. There is no common bound on positions, quantities, repetitions, or elapsed time.

## J. Martingale first

### J.1. First specify what has to close

Use three distinct properties:

* \(N_o\): every inventory round trip starting at the specified initial state \(o\), with the tested trader initially flat, costs at least zero.
* \(N_{\rm all}\): the same assertion from every permitted market state, including an already displaced state inherited from other traders.
* \(N_{\rm state}\): every path restoring the entire economically relevant market state and the trader's inventory costs at least zero.

The brief's definition is \(N_o\), for its given starting state. A theorem about a calm initialization is not automatically a theorem about an arbitrary given state. In a multi-trader game, aggregate signed flow \(P\) and the tested trader's inventory \(Q\) are different variables. They coincide only in the isolated, from-rest deterministic experiment.

The distinction is decisive. By [G-storage, Theorem 2](G-storage.md), a smooth, spreadless rule with both trade directions and a deterministic change in executable price during a wait fails \(N_{\rm all}\). Its local round-trip cost is

\[
C_\varepsilon=\varepsilon\{R(x)-R(W_t x)\}+O(\varepsilon^2).
\tag{J.1}
\]

Choose the sign of \(\varepsilon\). The trader harvests an existing displacement and need not restore it. No larger belief state, equilibrium argument, or position limit repairs this local contradiction while these execution assumptions remain unchanged. In particular, **there is no game implementing the literal spreadless, deterministically decaying rule with \(N_{\rm all}\)**.

### J.2. The exact deterministic fundamental theorem

**Theorem J.1 — inventory-loop version of the storage theorem.** Augment the market state by the tested trader's inventory, without adding its cash account. Fix a flat initial state \(o\). Assume:

1. Every reachable state has a finite-cost admissible liquidation path to some state with \(Q=0\).
2. Every edge has finite cost; waits have zero cash cost.
3. Trades are reversible, with the reverse trade restoring the state and having the opposite cash cost.

Then \(N_o\) is equivalent to existence of a finite, possibly nonsmooth function \(G\) on the reachable states such that

\[
G(o)=0,\qquad G(z)\ge0\quad(Q(z)=0),
\]
\[
c(x,q)=G(\Phi_qx)-G(x),\qquad G(W_t x)\le G(x).
\tag{J.2}
\]

**Proof.** Sufficiency is [G-storage, Theorem 1](G-storage.md): telescope the trades and insert the nonpositive wait increments. For necessity set \(G(z)\) equal to the infimum of the costs of finite paths from \(o\) to \(z\). Reachability gives a finite upper bound. A fixed liquidation path from \(z\) bounds all these costs below: otherwise concatenation would give a profitable flat-ending path from \(o\). Thus \(G\) is finite. Appending an edge gives \(G(y)-G(x)\le c(x,y)\); the reverse trade gives equality on trades. Waits give the other inequality. Flat endpoints have nonnegative infimum, and the empty path gives \(G(o)=0\). ∎

Without reversible trades, replace the equality by a supply inequality \(c(x,y)\ge G(y)-G(x)\). Without liquidation reachability, finiteness of the infima is an additional condition. For full-state loops on a strongly connected component, the corresponding converse is already [G-storage, Theorem 3](G-storage.md). Smoothness is not automatic: a differentiable certificate must solve

\[
b\cdot\nabla G=R,\qquad w\cdot\nabla G\le0,
\tag{J.3}
\]

with the correct terminal-fiber condition. This, rather than an unrestricted martingale-representation assertion, is the fundamental theorem for the deterministic control problem.

The existing mechanism classifications are applications, not new work needed here: M0 is covered by [M4-SAFETY, Theorem 2](M4-SAFETY.md); M3 by Theorem 5; original M4 by Theorem 6; altered relaxation by Theorem 8. The uncapped obstructions for M1 and M2 are Theorems 3 and 4.

### J.3. The probabilistic theorem has a different quantifier

Write \(B_{\rm obs}\) for Bayesian pricing under one observational or equilibrium law, and \(B_{\rm ctl}\) for the appropriate fair-pricing condition under **each actual policy being tested**, including the trader's relevant private knowledge of its own orders. The latter is substantially stronger.

**Theorem J.2 — actual-law fair execution.** For a particular admissible policy \(\pi\), let \(\mathbb P^\pi\) be its actual law, \(V\) an integrable payoff, and \(\mathcal G_i^\pi\) an information set containing the trader's signed fill \(q_i\), order ownership, and relevant private randomization. Suppose

\[
m_i^\pi=E^\pi[V\mid\mathcal G_i^\pi],\qquad
c_i=q_i m_i^\pi+\ell_i,\qquad \ell_i\ge0,
\tag{J.4}
\]

and the cash flows are integrable. If \(\sum_iq_i=0\), then

\[
E^\pi[\Pi]=-E^\pi\sum_i\ell_i\le0.
\tag{J.5}
\]

**Proof.** Conditional expectation gives \(E^\pi[q_i(V-m_i^\pi)]=0\). Sum and use flatness. For continuous trading, the equivalent holding-gain proof requires a true martingale, or admissibility yielding the corresponding supermartingale inequality. ∎

This is [F-attack, Theorem 2](F-attack.md), equivalently [E-model, Theorem 5](E-model.md), with its quantifiers made explicit. A separate deterministic bound for each finite strategy suffices; no universal position cap is needed. Apply it under every tested policy to exclude sure-profit strategies. **Full support is not needed for this theorem.** It is useful only when extending an almost-sure statement to additional histories. For continuous sizes and times, support means positive probability of neighborhoods, with suitable continuity—not positive probability of each exact path.

The important failed implication is

\[
B_{\rm obs}+\text{full support}\ \not\Longrightarrow\ N_o.
\tag{J.6}
\]

The six-fill example in [F-attack, before Theorem 2](F-attack.md) has post-fill posterior prices and full support; the forced sign sequence \((+1,+1,-1,-1,-1,+1)\) earns \(1/2\), restoring both posterior and inventory. More strongly, that file's homogeneous Poisson example has a proved finite round trip earning more than 56, with full posterior restoration. These are failures of intervention consistency, not failures of Bayes' rule on the reference law. Absolute continuity of finite-history laws does not preserve their conditional expectations.

Conversely, \(N_o\) does not give \(B_{\rm ctl}\); L.4 proves this using Choice B. A martingale model also does not, by itself, supply strategic best responses and hence does not establish E. Thus the proposed equivalences separate as follows:

| Claim | Status |
|---|---|
| \(N_o\) iff a finite storage with the terminal-fiber condition exists | True under J.1's reachability and execution assumptions. |
| Existence of a full-support observational posterior model implies \(N_o\) | False: the F counterexamples. |
| Actual-policy fair execution for every tested policy implies no sure profit | True: J.2, in that actual experiment. |
| \(N_o\) implies fair posterior execution under every controlling policy | False: L.2. |
| Competitive equilibrium plus an optimizing U implies U has value at most zero | False without additional hypotheses: K.1's two-date example. |
| A zero-value U equilibrium excludes feasible profitable deviations | True: K.1; matching the stochastic and deterministic experiments is essential. |

### J.4. What the financial no-arbitrage literature does and does not identify

| Framework | Relevant statement | Why it is not the proposed equivalence |
|---|---|---|
| Çetin–Jarrow–Protter (2004) | A stochastic supply curve changes self-financing and admissibility; the marginal, zero-size price plays the martingale role. | An equivalent pricing measure is not the physical Bayesian posterior, and the whole supply curve is not required to equal that posterior. Their curve is not an arbitrary controlled resilient state. [Paper](https://www.risknet.de/uploads/tx_bxelibrary/Cetin-Liquidity-Risk.pdf). |
| Roch–Soner (2013) | Resilience contributes additional liquidity-cost terms and conditions to the no-arbitrage argument. | A martingale reference price alone does not certify the impact dynamics. [Author manuscript, §4](https://www.epfl.ch/schools/cdm/wp-content/uploads/2018/08/Soner.pdf). |
| Bank–Kramkov (2015) | Competing market makers price at utility indifference while sharing risk through Pareto allocations. | Utility indifference is not risk-neutral, physical-measure zero profit on each fill; this is not a posterior-mean representation theorem for every safe AMM. [Part I](https://arxiv.org/abs/1110.3224), [Part II](https://arxiv.org/abs/1110.3229). |
| Huberman–Stanzl (2004) | Excludes quasi-arbitrage in their permanent-impact execution model; the relevant permanent trade-impact function must be linear. | Their per-trade impact convention is not the conservative charge \(S(P)dP\). The latter telescopes for nonlinear \(S\). [Paper](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1468-0262.2004.00531.x). |
| Gatheral (2010) | Constrains impact and decay jointly in a propagator model. | Applying a nonlinear curve to decaying **volume**, as in M0, differs from independently decaying nonlinear **price** impulses. [Paper](https://www.tandfonline.com/doi/full/10.1080/14697680903373692). |

NFLVR additionally fixes a probability space, a trading class, liquidation rules, a topology, and a closure of attainable claims. Those data are absent from the bare deterministic AMM. Thus it is not another name for \(N_o\). With identical admissible finite loops, any suitable no-arbitrage condition excludes their sure profits; the converse to a particular stochastic NFLVR theorem cannot be asserted without its additional assumptions. Informed expected profits and exploitation of noise flow are also different from deterministic self-generated pumps.

### J.5. Choice B: a potential is not a posterior, but “any measure” is too broad

[G-storage, Theorem 5 and Choice B](G-storage.md) prove a storage identity. [F-attack, Theorem 4](F-attack.md) proves that a particular episode model loses indispensable information when compressed into a retracing \((\phi,P,F)\) state. **It does not prove that no artificial probability model on any enlarged state can rationalize any Choice B price observable.**

Here are two precise weak rationalizations, illustrating why the interpretation matters.

**A finite-horizon marginal-quote construction.** Fix a lot \(u>0\). For Choice B let \(r(x)=R(x)\), let \(w\) be its wait field, and put

\[
d_+(x)=r(\Phi_u x)-r(x)>0,\quad
d_-(x)=r(x)-r(\Phi_{-u}x)>0,\quad a(x)=wr(x).
\]

Choose any \(k>0\) and jump intensities

\[
\lambda_+=\frac{k+(-a)_+}{d_+},\qquad
\lambda_-=\frac{k+a_+}{d_-}.
\tag{J.7}
\]

Their generator sends \(r\) to zero. Choice B's fill slopes are bounded above and bounded away from zero; its wait drift and these intensities grow at most linearly in the state. Fixed-lot jumps and linear-growth drift therefore give nonexplosion and finite moments on finite horizons. Consequently \(r(X_t)\) is a true martingale there, and, with \(Z=r(X_T)\),

\[
r(X_t)=E[Z\mid\mathcal H_t].
\]

Every finite sequence of the two signs and every open set of positive waiting times has positive likelihood. This constructs a posterior **mark**. It does not identify the lot's actual average execution price \(c(x,u)/u\) with its endpoint quote.

**An actual block-price construction.** Define the average price \(p(x,q)=c(x,q)/q\), extended continuously at \(q=0\). For Choice B, \(q\mapsto p(x,q)\) is strictly increasing onto \(\mathbb R\): writing \(c(x,q)=q\int_0^1R(\Phi_{vq}x)dv\), its derivative in \(q\) is bounded between half the lower and upper fill slopes. After any independently sampled wait, sample \(p_i=p_{i-1}+\xi_i\), where \(\xi_i\) are independent centered Gaussian variables, and choose the unique \(q_i\) giving that average price. On a fixed finite horizon of \(n\) blocks, \(Z=p_n\) gives \(p_i=E[Z\mid\mathcal H_i]\). Include the previous block price in the state. All quantity neighborhoods have positive probability.

The second construction respects the original **total block cost**. It does not say that every internal marginal unit of a publicly revealed parent block is separately a posterior; that is a stronger execution contract. Neither construction is a strategic equilibrium or remains correctly calibrated when a controller replaces the sampled orders. Neither explains an exogenous fundamental. They answer the deliberately weak “some filtration, some measure, something” question without making it a safety theorem.

Finally, \(G\) has an exact control interpretation only with the appropriate boundary conditions. The shortest-path \(G\) in Theorem J.1 is the infimum of cash costs needed to reach a state from \(o\); an optimizer need not exist. The available-extraction value

\[
A(x)=\sup\{-C(\gamma):\gamma\text{ starts at }x\text{ and ends flat}\}
\tag{J.8}
\]

satisfies a liquidation Bellman principle. A certificate with \(G\ge0\) at flat endpoints bounds \(A(x)\le G(x)\). An arbitrary analytic certificate, including Choice B's displayed \(G\), need not attain this bound. Its units are cash, and its role is stored work plus dissipation; it is not a conditional asset value.

## K. Game first

### K.1. The equilibrium implication, stated correctly

Competitive dealers in a risk-neutral common-value model quote

\[
p_i=E^{\sigma^*}[V\mid\mathcal H_i^{\rm fill}],
\tag{K.1}
\]

under the equilibrium strategy profile \(\sigma^*\). This is conditional zero expected financial profit **per executed fill**, with no inventory costs or other revenue. Aggregate zero profit is weaker.

For a posted next-lot book, conditioning on the fill means conditioning on the side selecting the quote, as in [Glosten–Milgrom (1985)](https://business.columbia.edu/sites/default/files-efs/pubfiles/1538/bid.pdf). For an auction, it means conditioning on the current aggregate order, including the player's contribution. These are different contracts; neither is the unconditional pre-order mean offered to an arbitrary block.

For a strategic uninformed player U, equilibrium optimality says

\[
E^{\sigma^*}[\Pi_U]\ge E^{(\pi_U,\sigma^*_{-U})}[\Pi_U]
\quad\text{for every deviation }\pi_U.
\tag{K.2}
\]

Abstention gives a lower bound of zero on U's equilibrium value, not an upper bound. Moreover, Bayesian equilibrium beliefs are calculated from equilibrium strategies; they are not automatically recalculated using a deviator's secretly changed policy. “Policy consistency” must not conflate these two requirements.

**Theorem K.1 — two valid ways to finish the argument.**

1. If the actual-law execution hypotheses of Theorem J.2 hold for every U policy, all U policies have expected profit at most zero. Abstention is a best response, and no sure-profit loop exists in that same stochastic experiment.
2. Alternatively, suppose an equilibrium U has value zero and every proposed loop is an admissible deviation giving positive expected incremental profit under the actual responses of the other players. Then no such loop exists.

**Proof.** The first statement is J.2. The second contradicts (K.2). ∎

A deterministic AMM loop with the external tape frozen need not be a sure-profit deviation when the tape continues to arrive. Conversely, a finite full-state pump that can be concatenated arbitrarily often, at unchanged terms and without displacing other profit opportunities, is incompatible with a finite optimal value. Unbounded positions alone do not imply this repeatability: the horizon, counterparties, noise supply, or other state may change.

**A small counterexample to “equilibrium U profits must be nonpositive.”** There are two trading dates, \(V=\pm1\) with equal probabilities, and one anonymous participant with private type I, U, or N, of probabilities \(i,m,n>0\), summing to one. Type and \(V\) are independent. At date 1 the participant may trade one lot of sign \(s\); at date 2 types I and U must reverse it, while N makes no second trade. I knows \(V\); U does not; N needs an independent random signed trade for liquidity. Trading eligibility and terminal liquidation are primitives. Dealers observe the tape, not the type.

An equilibrium has I choose \(s=V\), U randomize symmetrically between the two signs, and N trade its required sign. Dealers quote

\[
p_1(s)=is,\qquad p_2(-s\mid s)=\frac{i}{i+m}s.
\tag{K.3}
\]

The second fill reveals that the source was not N. Both prices are the correct conditional expectations, and dealers break even on each fill. U's round trip earns the certain amount \(in/(i+m)>0\). Either first sign gives this profit under the posted rules, so U is optimizing; I is also optimizing, with truthful direction a weak best response. Abstention gives zero. Noise losses fund the gains. All feasible tape histories have positive probability.

For example, \(i=m=1/4,n=1/2\) gives a purchase price \(1/4\), liquidation price \(1/2\), and U profit \(1/4\). The aggregate expected noise loss and strategic gain are both \(1/8\). If no second fill occurs, the dealer's posterior mean becomes zero; that branch supplies the downward move needed for the public posterior to remain a martingale.

This is deliberately a two-opportunity, one-lot game, not an uncapped stationary AMM. It disproves the unqualified equilibrium-to-nonpositive-profit step and exhibits the missing **order-ownership information**: U knows its own type, while dealers do not. Repetition at unchanged terms is unavailable. The broader literature likewise permits manipulation within optimizing models: [Allen–Gale (1992)](https://doi.org/10.1093/rfs/5.3.503) and [Chakraborty–Yilmaz (2004)](https://www.sciencedirect.com/science/article/abs/pii/S0022053103001017). Their manipulation notions should not be silently equated with this brief's deterministic loops; [Jarrow (1992)](https://doi.org/10.1017/S0022109000008073) and [Kyle–Viswanathan (2008)](https://www.aeaweb.org/articles?id=10.1257/aer.98.2.274) make that distinction especially relevant.

### K.2. A small solved game: two pricing scalars, an informed trader, noise, and U

The following construction supplies a positive answer for \(N_o\) **from rest**. It uses continuous Gaussian noise rather than Poisson lots. A clock determines the remaining information variance. A cubic example has exact exponential price decay; a bounded-slope example in M has the operator's desired steepening and positive density floor. Neither has a replenishing EWMA of unit-weighted signed flow.

This is a time change of the nonlinear Kyle–Back construction, followed by an explicit check of the additional strategic uninformed player. The heat-equation pricing idea belongs to [Back (1992)](https://doi.org/10.1093/rfs/5.3.387); a modern primary treatment is [Back–Cocquemas–Ekren–Lioui](https://arxiv.org/abs/2006.09518). The deviation and deterministic-storage calculations below are proved here rather than attributed to those papers.

**Primitives and execution.**

* Take \(v_0,\kappa>0\), \(Z\sim N(0,v_0)\), and payoff \(V=h(Z)\), independent of the noise Brownian motion. The function h is odd, strictly increasing, \(C^3\), and it and its first three derivatives have at most polynomial growth. The examples below meet all moment conditions.
* One risk-neutral informed trader I knows \(Z\) initially and chooses its signed cumulative holdings \(I_t\). Its objective is terminal marked wealth \(\int(V-R_t)dI_t\), not a utility subsidy for trading. Its information does not disappear; uncertainty is gradually exhausted.
* Noise flow is \(dN_t=\sqrt{\kappa v_t}\,dB_t\), where \(v_t=v_0e^{-\kappa t}\). Its total remaining variance is \(v_t\). Noise represents exogenous liquidity demand.
* U has no fundamental signal. It observes total flow, its own trades, and independent private randomization, and chooses a finite-variation strategy \(U\), initially zero, that stops trading at a finite time T. Its objective is \(E[VU_T-\int_0^T R_t\,dU_t]\); cash round trips have \(U_T=0\). Admissible controls are causal with unique feedback solutions and have the integrability needed below. Bounded rate and turnover for each particular finite-horizon strategy suffice, with no bound common to the class.
* Competitive risk-neutral dealers observe aggregate flow \(Y=I+U+N\), not its source, and the clock \(v\). They price infinitesimal fills at the contemporaneous conditional mean. Continuous finite-variation strategic orders pay \(R_t\,dI_t\) or \(R_t\,dU_t\).
* Brownian noise is the continuous auction limit of **post-observation** execution. For total flow, the aggregate cash integral is the right-endpoint integral \(\int R\,dY+[R,Y]\), not a costlessly substituted midpoint integral. This quadratic-variation term matters for dealer break-even. It vanishes for each continuous finite-variation strategic order process. Large deterministic blocks, when used to test the AMM, are implemented as a limit of sequential walks; the proof below states explicitly when that extension is being used.

The game has terminal payoff at \(t=\infty\), equivalently at a finite terminal date in information time \(s=1-e^{-\kappa t}\). There is no discounting. All deviations used for pump tests finish at finite physical times. Insiders' infinite-horizon strategies must have well-defined integrable terminal wealth; doubling and non-uniformly-integrable gain processes are excluded.

A concrete admissible class makes this precise. Choose an integer \(p\ge1\) bounding the polynomial growth of h and its stated derivatives. Require
\[
E[(\operatorname{TV}_{[0,\infty)}I)^{2p+2}\mid Z]<\infty
\quad\text{for almost every }Z,
\]
and, for each U policy on its finite deterministic horizon T,
\[
E[(\operatorname{TV}_{[0,T]}U)^{2p+2}]<\infty.
\]
Controls are continuous and adapted to the information just specified. These moment conditions imply existence of I's terminal position, the required terminal convergence, and square-integrable noise integrals. The proposed insider satisfies them by the Gaussian bridge moment bounds. They allow arbitrarily large finite positions and every finite deterministic schedule when its blocks are executed continuously; no bound is shared across policies.

Define

\[
H(v,y)=E[h(y+\sqrt v\,\xi)],\qquad \xi\sim N(0,1),
\quad H_v=\tfrac12H_{yy},\quad H(0,y)=h(y).
\tag{K.4}
\]

**Theorem K.2 — existence and deterministic safety.** In the stated game the following is an equilibrium in continuous finite-variation strategic strategies:

\[
\boxed{dI_t=\kappa(Z-Y_t)dt,\qquad U_t\equiv0,
\qquad R_t=H(v_t,Y_t).}
\tag{K.5}
\]

The dealer pricing state is exactly the two scalars \((Y,v)\). Suppose additionally that \(H_y(v,y)\ge H_y(v,0)\) for every \(y\). The associated deterministic AMM

\[
Y\mapsto Y+q,\qquad \dot v=-\kappa v,\qquad
c(v,Y;q)=\int_0^qH(v,Y+z)dz
\tag{K.6}
\]

has \(N_o\) from every rest state \(Y=0\), for arbitrarily large finite positions and every finite schedule. It generally does not have \(N_{\rm all}\).

**Proof of Bayesian pricing.** Under (K.5),

\[
dY_t=\kappa(Z-Y_t)dt+\sqrt{\kappa v_t}\,dB_t.
\]

This is a Brownian bridge to \(Z\) in the time variable \(s=1-e^{-\kappa t}\), with the endpoint drawn from its matching Gaussian prior. Its mixture law is a Brownian motion with variance clock \(v_0-v_t\). In particular,

\[
Z\mid\mathcal H_t\sim N(Y_t,v_t),\qquad Y_\infty=Z.
\tag{K.7}
\]

One can verify the conditional law directly from the Gaussian bridge representation; observing its past adds no information about the endpoint beyond \(Y_t\). Therefore \(H(v_t,Y_t)=E[V\mid\mathcal H_t]\). Every neighborhood of a continuous flow path on a finite horizon has positive probability. These are support statements about continuous paths, not positive atoms at exact schedules or finite jumps.

Conditional-mean execution makes dealers competitive and zero profit in the continuous auction convention. Indeed, on the equilibrium path both \(R\) and \(Y\) are martingales, and integration by parts gives

\[
E\left[\int_0^t R_s\,dY_s+[R,Y]_t\right]
=E[R_tY_t]=E[VY_t].
\tag{K.8}
\]

Using a midpoint cash integral for the Brownian tape would generally violate this equality. It is not an interchangeable implementation detail.

**Proof of I's best response.** Put

\[
\Psi(v,y)=\int_0^yH(v,z)dz,\qquad
A(t)=-\frac12\int_0^t\kappa v_sH_y(v_s,0)ds,
\]
\[
J(t,y;V)=\Psi(v_t,y)-Vy+A(t).
\]

The heat equation implies

\[
J_t+\tfrac12\kappa v_tJ_{yy}=0,\qquad J_y=H-V.
\tag{K.9}
\]

Against \(U=0\), Itô's formula gives, for every admissible insider strategy,

\[
E[\Pi_I\mid Z]=J(0,0;V)-E[J(\infty,Y_\infty;V)\mid Z].
\tag{K.10}
\]

The stochastic integral has conditional mean zero; the stipulated terminal integrability justifies passage to the horizon. Since \(h\) is strictly increasing, the terminal function \(\Psi(0,y)-h(Z)y\) is uniquely minimized at \(y=Z\). Strategy (K.5) attains that minimum. Thus it is a best response. Its trading rate has finite expected total absolute integral: the endpoint error is of order \(\sqrt{v_t}\), which is integrable in physical time. The examples also give the required higher moments. U's best response is proved independently in K.3.

**Proof of deterministic \(N_o\).** Use the storage \(G(v,Y)=\Psi(v,Y)\). Fills in (K.6) cost its exact increment. During a wait,

\[
\dot G=-\frac{\kappa v}{2}\{H_y(v,Y)-H_y(v,0)\}\le0.
\tag{K.11}
\]

For a round trip starting and ending with \(Y=0\), both boundary values are zero, so

\[
\boxed{C=\frac12\int_{\rm waits}\kappa v
\{H_y(v,Y)-H_y(v,0)\}dt\ge0.}
\tag{K.12}
\]

This covers exact integrated finite blocks and finite waits directly, independently of the stochastic equilibrium argument. ∎

**The explicit exponential example.** Set

\[
h(y)=ay+by^3,\qquad a,b>0.
\]

Then

\[
\boxed{R(v,Y)=aY+bY^3+3bvY,\quad
v_t=v_0e^{-\kappa t},\quad
G=\tfrac12(a+3bv)Y^2+\tfrac b4Y^4.}
\tag{K.13}
\]

At fixed \(Y\), \(3bvY\) decays exactly exponentially and \(aY+bY^3\) remains. Every deterministic from-rest round trip costs

\[
C=\frac{3b\kappa}{2}\int_{\rm waits}vY^2dt\ge0.
\tag{K.14}
\]

For \(a=b=v_0=\kappa=1\), buying 2, waiting \(\log2\), and selling 2 costs \(12-9=3\), exactly the storage loss in (K.14).

This is an explicit E–\(B_{\rm obs}\)–\(N_o\) example with an unbounded nonlinear price, a transient, and a permanent component. The permanent term is conservative in cumulative flow, so it does not conflict with the per-trade impact restrictions discussed in J.4. Its far liquidity density tends to zero; M replaces the cubic when a positive floor is required.

“Smallest” here means one scalar private signal, one informed player, one uninformed optimizing player, one noise channel, and two autonomous pricing coordinates. It is not a minimum theorem over all economic games. Even this particular nonlinear price family generically needs both coordinates: for (K.13), the Jacobian of \((R,R_Y)\) with respect to \((Y,v)\) has determinant \(3b(a+3bv-3bY^2)\), nonzero on an open dense set. If calendar time is treated as an external input, only \(Y\) has to be stored.

### K.3. Why adding U actually works in this game

**Theorem K.3 — the strategic uninformed deviation inequality.** Hold the insider's feedback strategy and the dealers' pricing rule in (K.5) fixed. For any admissible U strategy, define its induced distortion by

\[
dD_t=dU_t-\kappa D_tdt,\qquad D_0=0,
\qquad Y_t^0=Y_t-D_t.
\tag{K.15}
\]

Then U's correct conditional value is \(m_t=H(v_t,Y_t^0)\). For every finite-horizon round trip \(U_0=U_T=0\),

\[
\boxed{
E[\Pi_U]
=-E[\mathcal B(v_T,Y_T^0,D_T)]
-\kappa E\int_0^T D_t
\{H(v_t,Y_t^0+D_t)-H(v_t,Y_t^0)\}dt\le0,
}
\tag{K.16}
\]

where

\[
\mathcal B(v,y,d)
=\Psi(v,y+d)-\Psi(v,y)-H(v,y)d\ge0.
\tag{K.17}
\]

The same formula holds for terminal marked profit \(VU_T-\int R\,dU\) when \(U_T\ne0\). Thus abstention is optimal among all stated U strategies, not only among round trips. No steepening assumption is needed for this stochastic inequality: monotonicity \(H_y>0\) suffices. Steepening was needed for the separate deterministic wait experiment in K.2.

**Proof.** Under the deviation,

\[
dY_t=\kappa(Z-Y_t)dt+dU_t+\sqrt{\kappa v_t}\,dB_t.
\]

Subtract (K.15). The process \(Y^0\) has exactly the original bridge equation, independent of the control. U can recover \(Y^0\) from its observed tape and its own orders. Conversely, for a causal, well-posed U policy, its observed tape can be reconstructed from \(Y^0\) and its independent randomization. Thus the extra knowledge of its orders adds no fundamental information beyond the decontrolled tape: \(Z\mid\mathcal G_t^U\sim N(Y_t^0,v_t)\). In this filtration \(Y^0\) is a martingale with quadratic variation \(\kappa v_tdt\), and \(m_t\) is a true martingale on the tested horizon.

Let \(\Delta H=H(v,y+d)-H(v,y)\). Then \(\mathcal B_d=\Delta H\), and the heat equation gives

\[
(\partial_t+\tfrac12\kappa v_t\partial_{yy})
\mathcal B(v_t,y,d)=0.
\]

Itô's formula consequently yields

\[
d\mathcal B=\Delta H\,dU-\kappa D\Delta H\,dt
+\mathcal B_y\,dY^0.
\tag{K.18}
\]

The actual price is \(m+\Delta H\). Integration by parts and the martingale property give \(E\int m\,dU=E[m_TU_T]=E[VU_T]\), which is zero for flat U. Taking expectations in (K.18) proves (K.16), and also its marked-profit version. Convexity of \(\Psi\) gives \(\mathcal B\ge0\); monotonicity of H gives \(D\Delta H\ge0\). ∎

This proof also covers finitely many block jumps **if their contract is the integrated walk**: the jump of \(\mathcal B\) equals the integrated excess execution cost over \(m q\). This is a safe extension of the mechanism, not an assertion that those off-equilibrium blocks have the same finite-block Bayesian auction price. Equilibrium B was established for the continuous auction contract.

For bounded-rate deviations on finite horizons, the observable law retains full support and can be related to the equilibrium diffusion law by the usual bounded-drift change of measure. Nevertheless, the dealer's quote under a deviation is generally **not** \(H(v,Y^0)\). Thus even here support does not make beliefs invariant to intervention. What saves the equilibrium is the proved nonnegative total cost of creating and unwinding the distortion. This is an example of a valid equilibrium proof using correct counterfactual responses without incorrectly requiring the dealers to know a secret deviation.

There are two distinct transients in this construction. \(H(v,Y)-h(Y)\) is the deterministic quote's clock-dependent transient. \(D\) is the exponential distortion a strategic U produces **relative to the continuing insider response**. Conflating either with the operator's unit-weighted EWMA would change the mechanism.

### K.4. What the exact Poisson game would have to retain

For the proposed anonymous episode game, the exact state is a posterior distribution, together with any observable inventories, clock, and execution information needed by the strategies. Let the hidden state \(\zeta\) include permanent value, current signals, episode activity, privately known inventories, and any hidden parent-order or trader-type information. Given an equilibrium policy profile, let \(r_s(\zeta,\pi)\) be the total sign-s intensity. The competitive next-lot quote and posterior update are

\[
p_s(\pi)=\frac{\pi(Vr_s)}{\pi(r_s)},\qquad
\pi^s(d\zeta)=\frac{r_s(\zeta,\pi)\pi(d\zeta)}{\pi(r_s)}.
\tag{K.19}
\]

For a test function f, no-arrival filtering is

\[
\frac d{dt}\pi(f)=\pi(Lf)-\operatorname{Cov}_\pi(f,r_++r_-).
\tag{K.20}
\]

These are [E-model, Theorem 1](E-model.md). For a permanent value, \(LV=0\); its posterior is a compensated-jump martingale, although its conditional-silence path may move deterministically. Include the marked likelihood for size, identity information, and the event of reaching a particular marginal child. A publicly known parent quantity cannot be repeatedly treated as fresh independent evidence.

The binary-sign, on/off-activity example in [F-attack, equations (12)–(16)](F-attack.md) has four hidden states and three independent posterior coordinates, conveniently

\[
d=E[Y\mid\mathcal H],\quad e=E[A\mid\mathcal H],
\quad z=E[YA\mid\mathcal H].
\]

Its mean is \(F_0+ad\), but the next side quote also needs activity and its interaction with direction. With prescribed intensities, these three coordinates suffice; generically all three affect future quotes. They are **not** the original retracing \((\phi,P,F)\). A buy–sell pair changes the activity belief while restoring the mechanical state, exactly as [F-attack, Theorem 4](F-attack.md) proves. A continuous jump-size prior generally requires a posterior density or a demonstrated finite-dimensional closure.

Once persistent informed traders optimize timing, size, stopping, and concealment, their intensity functions must be obtained from their control problems. U's private knowledge of its own previous orders may itself require an additional hidden state in the dealers' filter. The pricing equation and those best-response equations must be solved together. Merely appending a noise intensity to an exogenous filter does not solve them.

One informed player is enough for K.2. Adding several informed players is economically relevant to urgency, but is not a missing step in that proof. [Holden–Subrahmanyam (1992)](https://host.kelley.iu.edu/cholden/Holden%20and%20Subrahmanyam%20%281992%29.pdf) studies competition over **long-lived** private information; it does not directly establish a particular exponential signal-expiration law. [Back–Baruch (2004)](https://doi.org/10.1111/j.1468-0262.2004.00497.x) endogenizes informed timing in a Poisson setting and relates it to Kyle limits. Neither result supplies the unproved anonymous, recurrent-episode, steepening equilibrium requested here by substitution of its name for a best-response proof.

### K.5. Which assumptions carry which conclusion

Some requested “drop exactly one assumption” counterexamples cannot exist: in the elementary risk-neutral model, conditional zero-profit execution and fill-inclusive posterior-mean execution are the same equation. Full support is not needed at all once fair execution is imposed under every actual policy.

| Assumption or distinction | Valid role | Failure or counterexample |
|---|---|---|
| Fill-inclusive **charged** price | Makes the conditional execution identity valid; a posted GM ask already includes the event selecting it. | With the mark \(R(P)=P\), charge each unit lot at the old mark. Buy at 0, then sell at 1: profit 1. Charging after-fill endpoints instead makes this loop cost 1; integrated live execution makes it cost 0. Stale execution also violates conditional dealer break-even. |
| Conditional zero financial profit per fill | Under risk neutrality and a common payoff, equivalent to (K.1). | A dealer with \(V=0\) subsidizing each side by \(\epsilon\) lets a buy and sale earn \(2\epsilon\). Retaining exact posterior execution while dropping the identical zero-profit equation is not an independent counterexample. Aggregate break-even, by contrast, does not identify each fill's price. |
| Support over tested histories | Prevents an almost-sure pricing statement from leaving arbitrary reachable branches unconstrained; continuous models also need regularity. | If the reference law only has inactivity, its price can be 0 there and an off-path purchase can activate a quote of 1 at which the trader sells. The on-path posterior claim says nothing about the pump. This also shows why support cannot replace actual-policy consistency. With J.2 imposed everywhere, dropping support causes no failure. |
| Actual-policy consistency | Ensures the law used in the no-profit proof is the law produced by that policy. | F's full-support six-fill and Poisson pumps satisfy observational Bayes, including the fill, but fail this condition. |
| Relevant order-ownership information | Prevents an anonymous market posterior from being substituted for a particular player's valuation. | The two-date equilibrium (K.3) gives an uninformed type a sure rent despite correct dealer posteriors and conditional zero profit. |
| A zero-value U equilibrium, or a separate deviation inequality | Supplies the missing upper bound in the best-response argument. | Best-response optimality alone gives (K.2), not nonpositive profit. K.3 supplies the upper bound in the solved game; competition among dealers does not supply it universally. |
| Same experiment and boundary condition | Makes a deterministic loop an actual feasible sure-profit deviation. | G-storage, Theorem 2, supplies small profitable trades from displaced states even for rules safe from rest. A price path conditional on no external arrivals is not a guarantee against all possible external arrivals. |
| Admissibility | Justifies martingale expectations without a universal position cap. | Doubling or unbounded stopping arguments need not preserve expected gains. They are unnecessary for every finite pump cited here. |

### K.6. Kyle–Obizhaeva–Wang: the exact comparison

The direct unilateral price schedule in [Kyle–Obizhaeva–Wang (2018), equation (42)](https://pages.nes.ru/aobizhaeva/KOW_smooth_trading.pdf) is

\[
p=p_{0,n}(t)+\lambda Q+\eta\dot Q,\qquad \lambda,\eta>0.
\tag{K.21}
\]

Its temporary term is trading-speed impact. Exponential inventory and price responses arise in their dynamic experiments; equation (42) is not an exponentially resilient AMM book. The model uses strategic, risk-averse traders with disagreeing signal precisions, rather than the competitive common-prior dealer assumptions of (K.1).

For the isolated impact schedule with constant intercept, our round-trip calculation is immediate:

\[
C=\frac\lambda2[Q_T^2-Q_0^2]+\eta\int_0^T\dot Q_t^2dt
=\eta\int_0^T\dot Q_t^2dt\ge0.
\tag{K.22}
\]

Thus that impact component is non-pumpable in its absolutely continuous trading class, without a position cap. Finite jumps have infinite speed cost in this idealization. The full stochastic game also moves the intercept and evaluates utility under different beliefs. Neither “its full price is B” nor “U's expected profit is nonpositive” follows from (K.22). Calling it a pumpable exponential-decay AMM, or the unique equilibrium producing such an AMM, would misdescribe the model.

## L. The minimal modification

### L.1. What is actually being modified

The episode models in E, F, and the [four-model synthesis](WORKFLOW-MODEL-SYNTHESIS.md) specify order-flow likelihoods and filters. They do **not** establish a joint strategic equilibrium with an optimizing manipulator. Their informed arrival rates or execution policies are partly primitives. Accordingly, “modify their pumpable equilibrium” should read “modify their pumpable posterior-pricing mechanism, then establish an equilibrium if that is required.” The distinction prevents an existence claim from being smuggled into the premise.

There is no invariant notion of the smallest edit across game primitives, observation rules, state coordinates, and execution contracts. The following table states what each proposed change actually guarantees.

| Proposed change | Pricing rule after the change | Existence and safety status with unlimited positions |
|---|---|---|
| Add U as an optimizing player | In a solved equilibrium, recompute (K.19) using all equilibrium policies. There is no universal correction term. | Not an existence theorem. The old filter may cease to be supportable. K.2–K.3 give an explicit positive example with U included; K.1 explains why adding the player alone is insufficient. |
| Require policy-consistent inference | Specify whose policy is known, what order identities are visible, and which law each conditional expectation uses. | J.2 gives safety if its hypotheses hold under every tested policy. In a fully controlled, deterministic tape this requirement rules out nontrivial information impact; see L.4. The authenticated stochastic game below does exist. |
| Replace a pre-fill mark by a fill-inclusive quote | Next-lot price becomes \(\pi(Vr_s)/\pi(r_s)\); a block needs its own marked or sequential likelihood. | Fixes the stale-quote example in K.5. It does not fix F's already fill-inclusive Poisson pump. Re-solving informed behavior may be necessary, and no general equilibrium-existence conclusion follows. |
| Add a spread or fee | Add a nonnegative execution charge, with its actual dependence on state, side, and size specified. | Preserves an existing storage certificate. A sufficiently large spread can fix some mechanisms; no uniformly bounded spread fixes the uncapped permanent-gain ratchet. A fee is not pure zero-profit posterior pricing. |
| Change zero-target decay to Choice B's compatible shifted target | Keep the original live-price convention, use the matched \(h\), and relax \(\phi\) toward \(P/2\). | Exact, globally well-defined mechanical rule; \(N_o\) from rest and \(N_{\rm state}\), no cap, by G-storage, Theorem 5. An economic equilibrium with its exact homogeneous pricing rule is not established. |
| Bound actual inventory | Leave the rule unchanged on the permitted state domain and disallow trades crossing the cap. | Original M2 is safe from rest when \(\lambda Q_{\max}\le1\), sharply under M4-SAFETY, Theorem 4. This is a capped result; order-size limits are insufficient. Equilibrium existence and B do not follow merely from the cap. |
| Remove the displacement-dependent permanent gain | Set it to a constant and absorb it into a conservative live-position charge. | The smallest coefficient-level repair preserving zero-target decay and retracing. Exact uncapped \(N_o\), but loses urgency-dependent permanence and supplies no Bayesian interpretation. |

### L.2. A fully specified inference repair that really has an equilibrium

An authenticated order channel is the simplest way to make the inference claim literal. It changes the product: U's orders do not masquerade as private information.

**Proposition L.1 — authenticated Poisson benchmark.** Let \(V=F_0+aY\), \(Y=\pm1\), with a nondegenerate prior. Let hidden activity \(A\in\{0,1\}\) switch at fixed positive on/off rates. Noise buys and sells arrive independently at rate \(\epsilon>0\). Anonymous informed opportunities arrive at rate \(\nu+\mu A\), with \(\mu>0\). Each opportunity belongs to a fresh risk-neutral informed trader who knows \(V\), may buy one lot, sell one lot, or abstain, and cannot defer or acquire a second opportunity. Separately, U can send publicly authenticated orders of any finite size; U has no private fundamental information. Its actions do not alter the anonymous opportunity process.

There is an equilibrium in which informed opportunity holders trade in direction \(Y\); dealers use the four-state filter and the side quotes (K.19) for anonymous orders; authenticated U orders execute at

\[
p_U=\pi(V),
\tag{L.1}
\]

and are excluded from the information likelihood. U may abstain. Every admissible U round trip has expected profit zero; nonnegative channel fees make it nonpositive.

**Proof.** At every finite supported history, the anonymous quotes lie strictly between the two possible values. An informed agent's value-side order is strictly profitable, its opposite order is unprofitable, and abstention yields zero. Thus the asserted sign policy is a best response under the stipulated one-opportunity constraint. Its arrival intensities are precisely those used by the filter. Dealers' conditional expectations make them break even. An authenticated U fill supplies no information about V beyond the existing history; knowing its own policy supplies no additional fundamental information. The external filter remains its actual conditional valuation, so J.2 gives U's result. ∎

No uniform cap on U's holdings is used. The one-lot opportunity is a restriction on each short-lived informed player's action set, not an AMM inventory bound. The informed intensity here is an opportunity primitive; this does not solve a Holden–Subrahmanyam race over chosen execution rates.

The filter has genuine silence relaxation and retained permanent information. For example, [F-attack, Theorem 3](F-attack.md) gives a positive permanent posterior after an active informed buyer dies. But this is a **stochastic market with customer-dependent execution**, not a homogeneous AMM whose response to U's own fills is the old deterministic curve. If one freezes away every possible external arrival, a predictable conditional-silence price change is not a sure gain in the original stochastic experiment. This repair proves the stated stochastic guarantee; it does not preserve the original deterministic machine.

### L.3. The smallest proved mechanical repairs

**Repair 1: retain zero-target decay and remove the variable urgent coefficient.** In the original architecture

\[
d\phi=dq-\phi\,dt/\tau,\quad
dF=[S'(P)+g(\phi)]dq,\quad R=F+T(\phi),
\tag{L.2}
\]

with \(g\) continuous and even, [F-attack, Theorem 1](F-attack.md) says that uncapped exact-loop safety is equivalent to \(g\) being constant, under its curve assumptions. Thus setting \(g\equiv k\) is the minimal change **within this coefficient class**. It becomes M3 with permanent curve \(S(P)+kP\), certified by [M4-SAFETY, Theorem 5](M4-SAFETY.md). Replacing \(|T|\) with \(T^2\), clipping \(g\), or merely slowing decay cannot fix a nonconstant \(g\).

**Repair 2: retain displacement-sensitive permanent fills and change the wait direction.** For general \(0<\alpha<1\), use

\[
h(x)=\alpha\int_0^1u^{-\alpha}T'(ux)du,\qquad
dF=[S'(P)+h(\phi)]dq,\qquad
\dot\phi=-(\phi-\alpha P)/\tau.
\tag{L.3}
\]

This is [G-storage, Theorem 5](G-storage.md), not a claim that an arbitrary old \(g\) becomes safe merely by changing the target. The coupling between curve, gain, and target matters. Choice B takes \(\alpha=1/2\), \(S(P)=sP\), and its displayed logarithmic curve, with

\[
G=PF-\tfrac s2P^2+V_T(\phi)+B(\phi)-PA(\phi),
\quad A'=h,\quad B'=A,\quad V_T'=T,
\]
\[
\boxed{
C=V_T(\phi_e)+B(\phi_e)
+\frac2\tau\int_{\rm waits}h(\phi)(\phi-P/2)^2dt\ge0
}
\tag{L.4}
\]

for every flat-ending path from rest. It retains a price slope increasing to a finite limit and a fair gain increasing with \(|\phi|\). Its relaxed price is \(F+T(P/2)\), not F alone. The state variable \(\phi\) is no longer an EWMA relaxing to zero.

If the literal \(h=\lambda|T|\) must remain, [G-storage, Theorem 6](G-storage.md) instead gives the compatible gradient relaxation

\[
\dot\phi=-\mu(P,\phi,F)[T(\phi)+A(\phi)-Ph(\phi)],\qquad \mu\ge0.
\tag{L.5}
\]

Choose a mobility giving well-posed dynamics. This too changes the direction of relaxation; it can make small positive \(\phi\) grow at large held inventory. It is not zero-target decay in disguise.

**Repair 3: compensate the fair during waits.** [E-model, equation (40), following Theorem 4](E-model.md), or [D-dynamics-full, §4](D-dynamics-full.md), gives

\[
dF=[S'(P)+g(\phi)]dq+[k-g(\phi)]\phi\,dt/\tau.
\tag{L.6}
\]

With \(A'=g\), the rule reduces to a conservative permanent charge plus residual transient

\[
R=F_0+S(P)-S(0)+kP+\{T(\phi)+A(\phi)-k\phi\}.
\tag{L.7}
\]

It is safe when the residual has the sign of \(\phi\). The nonlinear urgent contribution then washes out rather than remaining permanently in the settled fair. This is a different, equally explicit tradeoff.

**Why a small constant spread is not the general answer.** The uncapped ratchet in F, Theorem 1, has cost

\[
C_N=A_H+N(2K-H\eta),\qquad \eta>0.
\tag{L.8}
\]

A uniformly bounded spread adds a bounded amount per middle cycle, independent of held inventory H. Choose H first to dominate it, then choose N to cover entry and exit. The pump survives. An inventory-dependent penalty may change that conclusion, but must be proved for its own contract.

There is a useful contrast for a **bounded** posterior-price mechanism. If all baseline prices lie in \([F_0-a,F_0+a]\), adding a half-spread \(a\) puts every ask at least \(F_0\) and every bid at most \(F_0\). Every flat round trip then costs at least zero, from any state, for unlimited volume. This is a crude sufficient spread, not a minimal one. It destroys the claim that the resulting transaction prices are pure posterior means. Competitive risk-neutral dealers would not retain that extra revenue without an additional cost, fee rule, or market restriction; informed participation and beliefs would need to be recomputed.

Finally, bounding positions is a valid engineering alternative only when stated as such. For original M2, \(\lambda Q_{\max}\le1\) is the sharp nondegenerate from-rest condition in [M4-SAFETY, Theorem 4](M4-SAFETY.md). A cap on each order, an inferred typical position, or a bound on the gain does not imply that condition. None proves an uncapped equilibrium.

### L.4. The universal posterior-implementation conjecture is false in its robust reading

**Theorem L.2 — deterministic control versus fair posterior execution.** Suppose a trader can choose a deterministic finite trade/wait schedule, all observations and the AMM's responses in that experiment are deterministic, and the trader ends flat. If every charged fill is the conditional expectation of one integrable terminal random variable under that experiment's actual law, with no other fees, then the schedule has cash cost zero.

**Proof.** The charged prices are deterministic. Conditional expectations of one terminal random variable in an increasing filtration form a martingale; a deterministic martingale is constant. Alternatively, J.2 gives expected cost zero, which here is actual cost. The argument is unchanged by hidden-state enlargement: deterministic quoted conditional means must still obey the tower property. ∎

**Corollary.** A non-pumpable AMM with a strictly costly deterministic round trip cannot be a pure fill-inclusive posterior-mean mechanism under every controlling policy. Choice B is such an AMM. Buy \(q\ne0\) from rest, wait any \(t>0\), then sell q. Formula (L.4) is strictly positive: during the wait \(P=q\) and \(\phi-P/2=(q/2)e^{-s/\tau}\), so dissipation is positive. This is a finite, flat-ending counterexample to the proposed robust implementation theorem.

The obstruction is not limited to fundamental values: Theorem L.2 allows **any** integrable terminal random variable. Nor is it a claim that liquidity costs are economically irrational. A fee, inventory-risk premium, production cost, or utility-indifference charge is precisely how a rational mechanism can charge for liquidity without calling every charged dollar a physical-measure posterior value.

Two interpretations of the proposed universal theorem must therefore be separated:

* **Fair under every permitted intervention, including deterministic isolated execution:** false, by L.2 and Choice B.
* **Fair only under some equilibrium observational law, with a manipulator who may abstain:** the preceding counterexample does not refute it. J.5 shows how weak artificial observational rationalizations can be. A nondegenerate strategic implementation still requires explicit trader objectives, information, support, execution, and best responses. No general theorem implementing every finite-state safe AMM, and no impossibility theorem excluding Choice B from every such on-equilibrium game, is proved here or in F, Theorem 4.

Allowing an arbitrary engineered game with no informative trade or arbitrary subsidies would make an existence statement economically uninformative. The meaningful unresolved version is a common-value, anonymous, competitively priced game with specified nontrivial noise and informed participation. Choice B's mechanical certificate is useful independently of that inverse-game problem.

## M. The space

### M.1. What can presently be characterized

On a specified finite-dimensional state and execution contract, the intersection requires three separate pieces of structure:

1. **Mechanical feasibility:** a storage/supply certificate and the correct inventory boundary condition, as in J.1.
2. **Statistical closure:** a sufficient belief state, correct fill and silence likelihoods, and posterior pricing. For a Markov posterior mark, the equilibrium generator must annihilate the mark; this necessary martingale equation is not by itself a posterior or equilibrium construction.
3. **Strategic consistency:** optimizing trader policies, competitive dealer pricing under those policies, and a valid deviation analysis. K.3 shows that the latter need not take the overly strong form “the old quote remains the true posterior under every secret deviation.”

There is no general classification of this intersection merely by state dimension. Finite-dimensionality here means a regular sufficient statistic with well-defined updates, not encoding an entire history into the digits of one real number.

| Example | E | Bayesian execution | Deterministic no-pump statement |
|---|---|---|---|
| Linear Gaussian Kyle benchmark | Yes in its specified trading game. | Yes for its auction/continuous-limit convention. | The corresponding conservative linear walk has zero round-trip cost; extensions must retain the specified execution convention. |
| Constant-total-intensity binary GM opportunity model | Yes with optimizing one-opportunity informed agents and competitive dealers. | The next lot uses the post-side posterior. | [F-attack, Theorem 5](F-attack.md) proves safety by pairing grid-edge crossings, from any starting grid state, with no position cap. It has no silence transient and saturates. Adding a persistent anonymous U still requires a separate game argument. |
| K.2, with K.3's U | Yes, proved above. | Yes on its continuous equilibrium tape. | \(N_o\) from rest for the integrated deterministic rule; not \(N_{\rm all}\) when the quote has a nonzero wait drift. |
| Choice B | Not established. | No robust all-policy posterior interpretation; weak observational constructions are possible as specified in J.5. | \(N_o\) from rest and \(N_{\rm state}\), by G-storage, Theorem 5. |
| E/F episode filters | Not established for the proposed anonymous strategic game. | Exact observational posteriors under their stated flow laws. | Some are pumpable even with post-fill lot execution. |

### M.2. A finite-state equilibrium candidate with strict steepening and a positive floor

**Proposition M.1 — a bounded-slope member of the solved game.** In K.2 take

\[
h(y)=by-(b-a)L\arctan(y/L),\qquad 0<a<b,\quad L>0.
\tag{M.1}
\]

Then the exact equilibrium price \(H(v,y)=E[h(y+\sqrt v\,\xi)]\) is odd, strictly increasing, and strictly convex on \(y>0\). Its slope increases with \(|y|\) and tends to \(b\), so its liquidity density decreases to \(1/b>0\), without price saturation. The deterministic rule is safe from rest with unbounded positions, and K.3 excludes positive expected U round-trip profits in the game.

**Proof.** Direct differentiation gives

\[
h'(y)=a+(b-a)\frac{y^2}{L^2+y^2},\qquad
h''(y)=\frac{2(b-a)L^2y}{(L^2+y^2)^2}.
\]

Thus \(a\le H_y<b\), and dominated convergence gives \(H_y(v,y)\to b\) as \(|y|\to\infty\). Let \(\varphi_v\) be the centered Gaussian density of variance v. For \(v>0,y>0\),

\[
H_{yy}(v,y)=
\int_0^\infty h''(z)
\{\varphi_v(z-y)-\varphi_v(z+y)\}dz>0.
\tag{M.2}
\]

Both factors are positive. At \(v=0\) the conclusion follows directly. Oddness gives the corresponding symmetric slope property. This verifies the storage hypothesis of K.2; K.3 needs only monotonicity. ∎

The permanent part is \(h(Y)\). At positive Y the transient \(H(v,Y)-h(Y)\) is positive, decreases to zero as \(v\downarrow0\), and is asymptotically \(\tfrac12v h''(Y)\). Since \(v=v_0e^{-\kappa t}\), its late decay is exponential, although its entire time path is generally not a single exponential. The fundamental prior is explicitly \(h(Z)\); this is not E-model's Laplace-prior/Gaussian-observation experiment. [E-model, Theorems 2–3](E-model.md) provide a different valid steepening posterior, but not a strategic equilibrium for its use as an EWMA book.

This candidate has a proved equilibrium and the desired global book shape on two pricing scalars. Its limitation is exact: **v is a depletion clock, not recent net flow**. A late trade does not replenish v. Its permanent sensitivity \(h'(Y)\) depends on cumulative displacement, not recent urgency at fixed cumulative position. Thus it does not deliver all three literal operator features.

### M.3. The available impossibility statement and the remaining gap

If the three features mean precisely

\[
d\phi=dq-\phi\,dt/\tau,\quad
R=F+T(\phi),\quad
dF=[S'(P)+g(\phi)]dq,
\]

with nonconstant continuous even g, fair fixed during waits, reversible integrated fills, and unlimited positions, **no member of E–B–\(N_o\) exists**. It already fails N by [F-attack, Theorem 1](F-attack.md), independently of any statistical or strategic story.

If those words instead allow a richer belief state, a spread, different fill maps, \(P\)-dependent gains, changed wait dynamics, or nonlinear observation likelihoods, that theorem does not prove impossibility. Choice B supplies N after changing the decay target; M.1 supplies E–\(B_{\rm obs}\)–\(N_o\) after changing the flow-memory interpretation. A finite-state anonymous equilibrium combining a genuine unit-weighted decaying flow state, global positive-floor steepening, and larger **retained** learning from trades arriving at the same P but greater recent displacement remains open here.

For \(N_{\rm all}\) with a smooth spreadless deterministic quote, the answer is stronger and already complete: any nontrivial deterministic price decay is impossible, by J.1's initial-state distinction. This prohibition is not a prohibition on stochastic posterior prices having conditional-silence drift.

## One-page summary for the operator

**There is a small game that produces a safe equilibrium with permanent impact and a decaying transient.** It needs one informed trader, noise flow, competitive dealers, and an uninformed trader allowed to try manipulation. The report solves it and proves both that the informed trader is optimizing and that the uninformed trader cannot earn positive expected profit by a round trip. A separate cash-accounting proof covers every deterministic loop from a calm starting state, at any finite position size.

The simplest formula is a permanent linear-plus-cubic curve with an additional linear term that decays exponentially. A second curve steepens smoothly to a finite slope, giving the positive far liquidity floor you want. The catch is that this game's decay comes from a clock measuring remaining uncertainty. It is not your rolling recent-flow alarm, and a new trade does not restart that clock.

**Bayesian pricing, equilibrium, and protection against pumps are different claims.** A filter can be exactly Bayesian for random customer orders and still be exploitable by someone choosing those orders. Giving every possible sign sequence positive probability does not fix that. Dealers also know less than a trader who knows which orders were their own. Even an optimizing uninformed trader can receive rents in an equilibrium; an actual deviation proof is needed to rule that out.

For the original AMM, the smallest proved repair depends on what you retain:

* Keep decay to zero: make the extra permanent gain constant. This removes urgency-dependent permanent learning.
* Keep a permanent gain that increases with displacement: use the matched gain and shifted relaxation in Choice B. It is safe without a position cap, but flow relaxes toward half the held position, and the final quote is not F alone.
* Keep the original urgent coefficient and decay: enforce the actual inventory bound required by the existing theorem. This is a capped guarantee.

A small flat spread does not repair the unlimited-position ratchet. Correcting stale execution to include the fill is essential, but some of the existing pumps already use exact post-fill Bayesian prices.

**Choice B's storage function is an accounting certificate, not a fundamental-value estimate.** It tracks the work charged by trades and lost during relaxation. That is enough to prove the mechanical guarantee. Artificial probability models can make selected quote or block-price observables into posteriors, but that does not explain the economics or survive arbitrary controlled order flow.

Finally, “safe” must specify the starting state. A smooth spreadless price that predictably decays lets a new trader harvest an already funded displacement. Safety from a calm book excludes manufacturing a profitable cycle; it does not promise that every trader entering somebody else's displaced book must lose.

## Ranked open questions

1. **Solve the anonymous Poisson game with U, rather than only its filter.** Specify opportunity constraints, timing control, parent-order visibility, episode stopping, and dealer information. Prove existence and a deviation inequality, or exhibit a supported profitable deviation. This is the missing equilibrium result for the panel models.

2. **Find a replenishing finite-state analogue of K.2–K.3.** Preserve the proved distortion-cost argument while replacing the depletion clock with genuinely new private information. Determine whether the positive-floor curve can coexist with a unit-weighted decaying flow state. No conjectured existence is being treated as a result.

3. **Resolve Choice B's economically nondegenerate inverse-game problem.** Can its exact integrated fills arise on the equilibrium path of an anonymous common-value game with meaningful noise and informed trading? Require the actual execution convention, rather than only a posterior mark. The robust all-intervention version is already refuted by L.2.

4. **Determine the smallest sufficient belief state for endogenous episodes.** Four latent sign/activity states need three posterior coordinates before private inventories and order identities are added. Establish an exact closure or quantify an approximation's cash error over a stated turnover budget.

5. **Derive the smallest spread for a specified original filter and strategy domain.** The bounded-payoff half-spread in L.3 is sufficient but crude. The relevant optimization is over all loops with their true inference updates; a short loop search does not establish the answer. Include the effect on equilibrium participation.

6. **Choose the operational starting-state guarantee.** If protection must cover a fresh trader at an arbitrary displaced state, determine the needed spread, ownership accounting, or stochastic external-price treatment. A from-rest certificate cannot answer this by relabeling aggregate flow as the trader's inventory.

7. **Establish a finite-lot approximation to the solved continuous game.** Preserve competitive fill-inclusive pricing, the insider and U best responses, and the deterministic cost inequality simultaneously. In particular, account for the quadratic-variation cash term; replacing auction endpoint prices with integrated block averages without re-solving the information problem is not a valid approximation theorem.
