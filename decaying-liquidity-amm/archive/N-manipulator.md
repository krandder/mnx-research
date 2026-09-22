# N — The strategic uninformed trader in the episode models

Research brief 4. 22 September 2026. N is the main result; O and P are deliberately short. Q gives the operator decision. Calculations are reproduced by [N-check.py](N-check.py).

**The unchanged anonymous episode filters do not satisfy the proposed closure in general.** This report gives an exact eight-lot pump for the additive model, an interval-certified pump for E-model's *profit-sensitive* intensities, and a finite-time recurrent tilted-episode deviation with expected profit greater than **2.8**. The last bound includes background trading and a strictly positive birth rate. At the synthesis document's calibration, a separate simulation of background trading finds positive expected profit for a patient unwind; that finding is numerical, not an analytic theorem about that calibration.

There are two proved inference/friction repairs. Publicly identifying **all** of U's orders and excluding them from the information likelihood gives conditional-mean execution and makes U indifferent to trading. Alternatively, a spread covering the conditional-value advantage obtainable from private order ownership makes every U strategy unprofitable. The latter is a tariff or robust quote, generally **not** an all-in conditional-mean price. A posterior-inclusive endpoint price, an unspecified widening spread, or a cap on the next posterior increment is not by itself a repair.

Neither repair proves the operator's full desired shape for anonymous executable flow. Identification preserves the external tape's existing information features but removes informational impact from U's orders. Robust charges can change the executable curve substantially. Moreover, the original episode filters themselves have only qualified alarm/shape results: activity probability is not payoff variance; bounded jumps saturate; and the tilted Laplace example overshoots its limiting slope.

The nearest small, fully strategic positive construction remains K.2–K.3 with the bounded-slope non-Gaussian payoff from M. A new observation proved below is that, with explicit parameters, its **payoff variance** rises with displacement and decreases along its clock-only silence path. Its limitation is renewable Poisson information, not necessarily the variance-alarm inequality.

## N.1. The game, execution, and the two beliefs

Fix a finite evaluation horizon. Each order is a signed unit lot, \(q_k\in\{-1,1\}\); quantities are sequences of lots, each separately priced. U observes the public tape, its own order labels, and independent private randomization. It chooses any causal finite schedule of lots and waits. There is no common bound on position, turnover, or the horizon across schedules. As in K.3, expectations must exist and optional-sampling limits must be justified; an almost surely finite doubling scheme with uncontrolled integrability is not an additional admissible pump.

Write \(P_k=\sum_{i\le k}q_i\) for U's inventory, reserving \(V\) for the terminal payoff. With an optional cash charge \(f_k\ge0\), its profit is

\[
\Pi_U=VP_T-\sum_{k\in U}(q_kp_k+f_k).
\tag{N1}
\]

For a round trip \(P_T=0\). Fees, when present, are included in the trading objective. They cannot be hidden by calling the fee-free component the transaction price.

The background populations retain the primitives of the source models. Thus the principal equilibrium question here is whether **adding a strategic U to those populations** admits \(U=0\). E's profit-sensitive opportunities can be interpreted as expiring opportunities; this is not a newly solved patient-insider game. The tilted model's prescribed flow and interception rates are also retained as primitives. No result here silently proves those rates optimal for a long-lived insider.

Under the candidate \(U=0\) law, dealers' belief is \(\pi\). With hidden generator \(L\), sign intensities \(h_s\), and \(\Lambda=h_++h_-\), their rule is

\[
 p_s(\pi)=\frac{\pi(Vh_s)}{\pi(h_s)},\qquad
 \pi^s(f)=\frac{\pi(fh_s)}{\pi(h_s)},
\tag{N2}
\]
\[
 \dot\pi(f)=\pi(Lf)-\operatorname{Cov}_\pi(f,\Lambda).
\tag{N3}
\]

These are the exact filters in [E-model, Theorem 1](E-model.md) and [F-attack, equations (5)–(7)](F-attack.md). No midpoint execution is used in the counterexamples.

Under a deviation, U has a different belief \(\rho\). At one of its own orders it does **not** multiply \(\rho\) by \(h_s\). At a background order it does; during a wait it retains the no-background-arrival likelihood. In the profit-sensitive model, the hazards used by \(\rho\) are evaluated at the actual public quotes, which U has changed. Simply rerunning the original filter on a deleted tape while also replacing those actual quote paths would be wrong. In the tilted model the background intensities are quote-independent, so deletion with the original elapsed times is sufficient.

U's conditional value at an own fill is

\[
 m_k^U=E^{U}[V\mid\mathcal G_k^U]=\rho_k(V).
\tag{N4}
\]

Its private random seed and endogenous choice to trade convey no extra fundamental signal **conditional on this private history**. They do not make the public anonymous likelihood correct. The exact profit identity is

\[
 \boxed{E^U\Pi_U
 =E^U\sum_{k\in U}\{q_k(m_k^U-p_k)-f_k\}.}
\tag{N5}
\]

This follows by conditioning each term in (N1). It applies to terminal marked positions as well as round trips. Replacing \(m_k^U\) by the public posterior without a proof is precisely the missing step.

For the recurrent tilted model, let \(v_t=\Sigma_t+A_tJ_t\) and set \(V=v_T\). Symmetric births and value-preserving deaths make \(v\) a martingale, so \(E[V\mid\mathcal H_t]=E[v_t\mid\mathcal H_t]\). An infinite sum of recurrent permanent jumps is not a finite terminal payoff; a finite evaluation horizon or a different payoff specification is necessary.

### Exact state size

| Model | State sufficient for prices under the prescribed background law | Additional issue for U |
|---|---|---|
| Fixed three-point \(V\), profit-sensitive E, on/off \(A\) | Six joint probabilities, hence **five independent numbers** | U needs its own five-number filter, using actual quotes and excluding its own marks. |
| Sign-only E with \(V=0\) observationally independent of \(A\) | The two zero-value activity states can be combined; **four** independent probabilities suffice. | Gross count/activity information still cannot be discarded. |
| Recurrent tilted model, \(J=\pm j\) | **Five** numbers for prices; **eight** for the live-value variance | A separate private filter is needed off equilibrium. The full distribution of completed value is not five-dimensional. |
| Recurrent episodes with continuous Laplace marks | Posterior densities/measures, in general | No finite-dimensional closure is proved by choosing a Laplace prior. |

The five/eight claim for the tilted model is proved in N.3. These are sufficient-state counts, not minimum theorems over all parameter degeneracies. A known clock is an extra input when terminal variance is requested.

## N.2. E-model: profitable deviations, including profit-sensitive quotes

### Theorem N1 — an exact rapid pump in the additive three-point model

Let \(V\in\{-1,0,1\}\), with probabilities \(1/102,100/102,1/102\). Noise intensity is one per side. When \(V=1\), an additional buy intensity is one; when \(V=-1\), an additional sell intensity is one. Initially the nonzero-value states are active. First set activity transitions to zero.

Four buys followed by four sells, executed successively at posterior-inclusive prices in the zero-duration limit, earn

\[
 \boxed{\gamma_E=
 \frac{588104677}{11211663918}
 =0.052454718701995\ldots>0.}
\tag{N6}
\]

There are sufficiently short schedules with **distinct finite execution times** that earn positive expected profit in the actual game with background orders. The result persists with any fixed finite birth/death rates when the same initial activity state is used and the schedule is sufficiently short.

**Proof.** Write the odds relative to zero as \(x_+=x_-=1/100\). A buy doubles \(x_+\); a sell doubles \(x_-\). Each lot pays its updated mean

\[
 m=\frac{x_+-x_-}{1+x_++x_-}.
\]

Consequently the exact profit is

\[
 \sum_{\ell=1}^4
 \frac{16/100-2^\ell/100}{1+16/100+2^\ell/100}
 -\sum_{k=1}^4
 \frac{2^k/100-1/100}{1+2^k/100+1/100},
\]

which reduces to (N6). The posterior mean and U's inventory return to zero, but the activity/value-presence belief does not: its nonzero mass changes from \(1/51\) to \(8/33\). This is an inventory round trip, not a full-belief loop.

Now put the eight fills in an interval of length \(h>0\). On the event of no background order, the filter and its cash cost converge to the displayed values as \(h\downarrow0\), including with fixed finite activity-transition rates. Background intensity is bounded, and every price lies in \([-1,1]\). If \(\omega(h)\to0\) bounds the change in quiet-path profit and \(\bar\Lambda\) bounds the background intensity, then

\[
 E\Pi_U\ge e^{-\bar\Lambda h}[\gamma_E-\omega(h)]
       -8(1-e^{-\bar\Lambda h})>0
\tag{N7}
\]

for sufficiently small \(h\). This proves positive **unconditional expected profit**, not merely positive profit conditional on silence. Finite positive slow intensity is also allowed by continuity in that parameter. ∎

The mechanism is stronger than a long silence pump. Early buys are cheap because information is rare. Subsequent sells help convince the dealer that information exists, while initially leaving a positive directional imbalance. The resulting bids finance more than the purchases. The extra activity/exposure coordinate in F, Theorem 4 is an economically exploitable state here, not just a bookkeeping omission.

This theorem does not say that every additive calibration pumps. For example, the same example's one-, two-, and three-buy round trips lose money. A counterexample in the stated class is sufficient to reject universal closure; a parameter-by-parameter best-response classification would require solving U's control problem.

### Theorem N2 — the failure remains with E's endogenous, profit-sensitive quotes

Use E-model's actual equations \(1\)–\(3\), with

\[
 h_+(v,A)=1+(0.1+0.9A)(v-a)_+,\qquad
 h_-(v,A)=1+(0.1+0.9A)(b-v)_+.
\tag{N8}
\]

Let \(\Pr(V=1)=\Pr(V=-1)=0.00005\), \(\Pr(V=0)=0.9999\), and initially let \(A\) be independent with probability \(0.1\) of being active. Both slow and active informed components are strictly positive. Take, for example, birth rate \(0.02\) and death rate \(0.2\).

Twelve rapid buys followed by twelve rapid sells have limiting profit in the rigorously enclosed interval

\[
 \boxed{0.14840147109<\gamma_{\rm opp}<0.14840147110.}
\tag{N9}
\]

For sufficiently short distinct-time execution, this is a positive-expected-profit deviation in the actual background-flow game. Thus \(U=0\) is not a best response at this parameter choice even when informed opportunities stop trading in a direction that has become unprofitable.

**Proof and reproducible certificate.** At each state solve the strictly increasing equation

\[
 F_s(p)=p-M-s\sum_{v,A}\pi(v,A)c_A[s(v-p)]_+^2=0,
 \quad c_A=0.1+0.9A.
\tag{N10}
\]

For \(s=1\) the root is the ask; for \(s=-1\) it is the bid. Update the six weights by \(1+c_A[s(v-p)]_+\), normalize, and add \(sp\) to cost. This is exactly the competitive quote/filter recursion, not a fixed sign-only hazard approximation. Also \(F_s'(p)\ge1\).

The function `opportunity_enclosure()` in N-check.py executes this recursion with outward-rounded Decimal interval arithmetic. Every arithmetic operation encloses its exact result. A sign-certified bisection encloses each root; if a residual interval straddles zero, \(F_s'\ge1\) gives the root enclosure \([p-F_s^{\rm upper},p-F_s^{\rm lower}]\). Propagating the weight intervals gives (N9). A separate floating-point recursion checks that each post-fill mean equals its quote.

With positive elapsed time the quote equations and filtering ODE are continuous. Because \(b\le M\le a\), the total intensity in (N8) is at most \(4\), and all execution prices remain in \([-1,1]\). The analogue of (N7) is

\[
 E\Pi_U\ge e^{-4h}[\gamma_{\rm opp}-\omega(h)]
       -24(1-e^{-4h})>0
\]

for sufficiently small \(h\). Activity transitions occur inside the exact quiet filter and do not invalidate continuity. ∎

This also identifies a limitation of the proposed endogenous-intensity escape route: profitable-direction trading is necessary for a plausible opportunity model, but does not by itself provide K.3's global deviation inequality.

## N.3. Tilted episodes: exact state, death pump, and the baseline calibration

Put \(r=e^\theta>1\), take unit episode jumps for now, and normalize noise intensity to one. The regimes are quiet, active \(+\), and active \(-\). Their buy rates are \((1,r,r^{-1})\); sell rates are \((1,r^{-1},r)\). Write

\[
 s=r+r^{-1}-2,\qquad \beta=\delta+s.
\]

Let \(p_i\) be unnormalized regime probabilities and \(m_i\) unnormalized first moments of **live value** \(v_t=\Sigma_t+J_t1_{A_t=1}\). Remove the common noise-survival factor. During silence,

\[
\begin{aligned}
 \dot p_0&=-\alpha p_0+\delta(p_++p_-),&
 \dot p_\pm&=\tfrac\alpha2p_0-\beta p_\pm,\\
 \dot m_0&=-\alpha m_0+\delta(m_++m_-),&
 \dot m_\pm&=\tfrac\alpha2(m_0\pm p_0)-\beta m_\pm.
\end{aligned}
\tag{N11}
\]

At a side-\(u\) fill, multiply \(p_i,m_i\) by \((1,r^u,r^{-u})\), then normalize by the new probability mass. The price is

\[
 M=\frac{m_0+m_++m_-}{p_0+p_++p_-}.
\tag{N12}
\]

Three probabilities with one normalization and three first moments give five numbers. These equations include the different conditional completed-value means that the original three-number candidate omitted.

An additional useful exact formula is available. Define

\[
 \lambda_0=\frac{-(\alpha+\beta)
 +\sqrt{(\alpha+\beta)^2-4\alpha s}}2,
 \qquad w=\frac{\delta}{\beta+\lambda_0}.
\]

Then the limiting posterior after continued silence is

\[
 \boxed{F=\frac{m_0+w(m_++m_-)}{p_0+w(p_++p_-)}.}
\tag{N13}
\]

**Proof.** Both pairs \((p_0,p_++p_-)\) and \((m_0,m_++m_-)\) obey the same matrix equation with matrix

\[
 B=\begin{pmatrix}-\alpha&\delta\\ \alpha&-\beta\end{pmatrix}.
\]

Its leading left eigenvector is \((1,w)\). The ratio of its projections is invariant during silence and is the ratio of the leading asymptotic total moments. This proves (N13), including nonzero birth rates and unequal regime-conditional means. The source's simple small-\(\alpha\) expression follows only after the further simplifications stated there. ∎

For variance, retain three second-moment weights \(z_i=E[v_t^2 1_i\mid\text{unnormalized history}]\). They satisfy

\[
 \dot z_0=-\alpha z_0+\delta(z_++z_-),\qquad
 \dot z_\pm=\tfrac\alpha2(z_0\pm2m_0+p_0)-\beta z_\pm.
\tag{N14}
\]

They receive the same fill multipliers. This proves the eight-number claim. For \(V=v_T\), add the expected variance of future births, not another belief coordinate. If \(h=T-t\), \(q_i=1\) for a quiet state and zero for an active state, the expected number of future births conditional on regime \(i\) is

\[
 B_i(h)=\frac{\alpha\delta}{\alpha+\delta}h
 +\frac{\alpha}{\alpha+\delta}
 \left(q_i-\frac{\delta}{\alpha+\delta}\right)
 (1-e^{-(\alpha+\delta)h}).
\tag{N15}
\]

Thus \(\operatorname{Var}(V\mid\mathcal H_t)\) is the live-value variance plus \(\sum_i\pi_iB_i(h)\), for unit jumps. Multiply this correction by \(E[J^2]\) for the corresponding symmetric independent mark prior. Death transfers value; it does not destroy it.

### What reciprocally tilted fills actually guarantee

A buy followed immediately by a sell restores all moment weights because each regime's product of likelihoods equals one. Along a pure burst from the symmetric fresh state with quiet weight one and active weights \(o,o\),

\[
 H_n=\frac{o(r^n-r^{-n})}{1+o(r^n+r^{-n})}.
\tag{N16}
\]

This is increasing in net count. On this lot grid, any immediate closed walk costs at least zero: each upward edge is bought at \(H_{k+1}\) and its downward crossing sells at \(H_k\le H_{k+1}\). This is a real advantage over the additive example. Reciprocity alone does not establish monotonicity at every general belief with correlated completed value, nor does it control waits.

### Theorem N3 — a finite tilted-episode deviation with positive expected profit

Initially use quiet weight one, active weights \(o=o_+=o_-=0.01\), zero completed value, \(r=3\), death rate \(\delta=1000\), and no new births. Value is in \([-1,1]\) and persists after death. Let \(g=10^{-8}\). Buy six lots at times \(g,2g,\ldots,6g\). Sell six at times

\[
 6g+0.02+g,\ldots,6g+0.02+6g.
\]

All fills are at distinct times and pay their exact posterior-inclusive prices. For this strategy,

\[
 \boxed{E\Pi_U>1.95.}
\tag{N17}
\]

The same deviation remains profitable for a nonempty interval of strictly positive birth rates. Thus the failure is not confined to models without recurrent episodes.

**Proof.** With \(\alpha=0\), silence for \(h\) multiplies active weights by \(E_h=e^{-(\delta+s)h}\) and transfers the fraction

\[
 d_h=\frac{\delta}{\delta+s}(1-E_h)
\]

to the appropriate spent-value hypotheses. Fills multiply active weights by \(r^{\pm1}\); spent weights have likelihood one on both sides. These operations give the exact finite-schedule quiet profit

\[
 \gamma_{\rm death}=2.92062718865\ldots.
\]

For comparison, neglecting only the tiny gaps, set \(x_+=or^6,x_-=or^{-6}\). The six purchase prices are \(H_k\), and the \(\ell\)-th sale price after a wait \(h\) is explicitly

\[
 b_\ell=
 \frac{d_h(x_+-x_-)+E_h(x_+r^{-\ell}-x_-r^\ell)}
 {1+d_h(x_++x_-)+E_h(x_+r^{-\ell}+x_-r^\ell)}.
\tag{N18}
\]

It gives quiet profit \(2.92063252692\ldots\). N-check.py uses the finite-gap filter, not that limiting approximation.

The actual total background-order intensity never exceeds \(r+r^{-1}=10/3\). The strategy's horizon is \(h_*=0.02000012\), so the probability of no background order is at least \(a_*=e^{-(10/3)h_*}\). On all other paths the twelve bounded-price fills give profit at least \(-12\). Therefore the exact lower-bound expression is

\[
 E\Pi_U\ge a_*\gamma_{\rm death}-12(1-a_*)
 =1.95834537269\ldots>1.95.
\tag{N19}
\]

This handles all background-flow paths, including ones unfavorable to U.

Finally allow births with rate \(\alpha>0\), drawing a new independent sign and retaining completed jumps as in the synthesis model. For this fixed finite schedule, the filter, its observation law, and expected cash flows are continuous at \(\alpha=0\). One way to justify the expectation step is to couple birth clocks, use the bounded per-regime likelihood ratios for the fixed number of inserted lots, and dominate value moments by those of one initial jump plus a Poisson number of subsequent unit jumps. These bounds give uniform integrability on a compact interval of birth rates. The strict margin in (N19) therefore persists for sufficiently small positive \(\alpha\). This is an existence interval; no numerical upper endpoint for it is asserted. ∎

The economic failure is precise: U buys evidence while it is only partly attributed to information; episode death converts that evidence into a completed value estimate; liquidation then encounters much less active opposing likelihood. Death has disabled the feedback that made the immediate reversal safe.

**Corollary N3a — explicit positive birth and death rates.** A concrete fully recurrent example is

\[
 \alpha=0.02,\quad\delta=100000,\quad r=3,\quad o=0.01.
\]

Use six purchases at spacing \(g=10^{-11}\), wait \(0.0002\), then six sales at the same spacing. Initialize completed value at zero as above. The exact filter gives quiet profit
\(\gamma_{\rm rec}=2.92136283831\ldots\), and the following bound proves

\[
 \boxed{E\Pi_U\ge2.81544784149\ldots>2.8.}
 \tag{N19a}
\]

**Proof.** After any history with \(K\) observed marks, \(|M|\le K\). To see this, condition on the latent episode intervals. A unit-jump episode with no observed mark has a symmetric sign posterior: its total arrival intensity and death likelihood are sign-independent. Only episodes containing at least one mark can contribute a nonzero conditional mean; there are at most \(K\) of them, and each contributes at most one in absolute value. Mixing over the intervals preserves the bound. It applies to fictitious U marks as well as actual background marks in the dealer's filter.

Let \(L=12\), let \(N\) count background orders over the whole schedule, and put \(\eta=(10/3)h_*\), \(h_*=0.00020000012\). Since the intensity is bounded by \(10/3\), \(E N\le\eta\) and \(\Pr(N\ge1)\le1-e^{-\eta}\). On any path the absolute cash profit is at most \(L(L+N)\). Consequently

\[
 E\Pi_U\ge e^{-\eta}\gamma_{\rm rec}
       -L^2(1-e^{-\eta})-L\eta,
\]

which is (N19a). This bound permits any number of hidden births and background arrivals. No truncated hidden-value support or rare-birth approximation is used. ∎

### Laplace marks do not remove the death mechanism

There is also an instructive unbounded-prior version. Start with a quiet atom and an active symmetric Laplace jump. During activity use the synthesis rates

\[
 h_+(J)=\begin{cases}1+\kappa J,&J\ge0,\\
 (1+\kappa|J|)^{-1},&J<0,
 \end{cases}\qquad h_-(J)=h_+(-J).
\]

Let \(H_k\) be the mean after \(k\) rapid buys. Since \(h_+(J)\) is strictly increasing, likelihood-ratio ordering gives \(H_{k+1}>H_k\) for a nondegenerate prior. Let death rate tend to infinity and choose a wait \(h_\delta\downarrow0\) with \(\delta h_\delta\to\infty\). After the wait, almost all inferred jumps have become spent; the subsequent \(n\) sells are almost uninformative. Hence

\[
 \boxed{\lim_{\delta\to\infty}E\Pi_U
       =nH_n-\sum_{k=1}^nH_k>0\quad(n\ge2).}
\tag{N20}
\]

Here the lots can be separated by gaps tending to zero faster than \(1/\delta\). A useful explicit integrability bound proves the expectation limit. Conditional on an episode death time and a jump sign, a posterior density for \(x=|J|\) is proportional to

\[
 e^{-x/b}(x+c)^k e^{-a s(x)},\qquad
 c=1/\kappa,\quad a\ge0,\quad |k|\le L+N,
\]

where \(L\) is the number of inserted lots and \(N\) the number of observed background lots. Integration by parts of \(x\) times this density, using \(s'(x)\ge0\), gives \(E[x]\le b(1+\max(k,0))\). Mixtures over death times and signs preserve the bound \( |M|\le b(1+L+N)\). The true count is dominated, conditional on \(J\), by a Poisson count of rate \(2+\kappa|J|\). Its second moment stays bounded on a short common horizon and tends to zero as that horizon shrinks. Consequently the cash flows are uniformly integrable, the chance of an external arrival tends to zero, and (N20) follows from the explicit quiet filter. Small positive recurrent birth intensity can be included by continuity with the corresponding finite compound-Poisson moments. Formula (N20) is a parameter-family theorem, not a claim that the baseline \(\delta=0.2\) calibration is in this asymptotic regime.

### Numerical deviation at the synthesis calibration

Use exactly \(j=1,\alpha=0.02,\delta=0.2,\epsilon=1,\mu=2\), so \(r=3\). Initialize the symmetric quiet-filter regime odds

\[
 o=\frac{\alpha}{2(\beta+\lambda_0)},
\]

with all completed-value conditional means zero. The strategy is \(n\) rapid buys, wait eight time units, then \(n\) sells with the indicated gap. Unlike the source's quiet-path replay, the simulation generates hidden births/deaths **and** background buys/sells, while the dealer uses (N11)–(N12) throughout.

Command: `python3 N-check.py --mc 3000`. Seed: `20260922`; 3,000 independent paths per row, using one reproducible stream.

| \(n\) | Gap between sales | Quiet-path profit | Sample mean profit | Monte Carlo standard error |
|---:|---:|---:|---:|---:|
| 6 | 0 | -1.70160 | -1.51881 | 0.03541 |
| 8 | 0 | -1.04801 | -1.39287 | 0.03076 |
| 8 | 8 | 2.67735 | **1.90958** | 0.06966 |
| 12 | 8 | 3.69832 | **2.13197** | 0.12346 |

These are strong numerical evidence against \(U=0\) at the source calibration. They are not confidence-certified analytic bounds or a search for the optimal strategy. Rapid batches are sequential zero-gap limits; a sufficiently small positive-gap perturbation is the executable finite-time version. The analytic rejection of closure for the tilted **class** is Theorem N3, independently of these simulations.

The code verifies the closed-form wait semigroup against its generator, its composition law, positive probabilities, invariance of (N13), and reciprocal fills. It does not freeze background flow when computing the sample means.

## N.4. Which repairs actually close the game?

### Theorem N4 — changing anonymous off-equilibrium beliefs cannot support abstention here

Fix the external primitives and the continuous canonical quote/filter rule. At any parameter choice with one of the positive deviations above, there is no equilibrium with \(U=0\), the same anonymous observation protocol, and competitive posterior quotes generated by those primitives.

**Proof.** Under \(U=0\), adding U's unused strategy set does not change the distribution of any observable background history. Bayes therefore gives the same quotes. All finite sign histories in positive-width timing windows have positive density/probability because noise is strictly positive. The profitable schedules can be jittered in sufficiently small windows, preserving their strict advantage and avoiding a special choice of posterior version at a deterministic timestamp. Changes confined to unsupported histories cannot remove that advantage. U thus has a profitable deviation from the proposed profile. ∎

“Beliefs include the deviation set” is not a probability law. A model with a positive equilibrium intensity of U orders has a different likelihood and might have a mixed equilibrium, but it has not established \(U=0\). Nor can the dealer simply substitute U's actual secret counterfactual policy during a deviation. Endogenizing different informed responses is a legitimate new game, still requiring a joint solution.

This is why Goldstein–Guembel is a warning as well as a template: in their no-feedback benchmark the uninformed type can trade in the second round using its knowledge of earlier nonparticipation. Their result is not that this type abstains at every history. [Goldstein–Guembel, Proposition 1 and the paragraph following it](https://finance.wharton.upenn.edu/~itayg/Files/manipulation-published.pdf). Likewise, Chakraborty–Yılmaz's presence-uncertainty result concerns an **informed** trader's strategic concealment, not a theorem certifying arbitrary uninformed deviations against an exogenous episode filter. [Chakraborty–Yılmaz, abstract and introduction](https://www.sciencedirect.com/science/article/pii/S1386418103000429).

### Repair A: identify and correctly exclude controlled orders

**Theorem N5 — an exact conditional-mean repair for both models.** Suppose dealers observe the source labels of **all** orders controlled by U, or its coalition, and know those sources have no private fundamental signal. These must be enforceable labels; an informed trader cannot freely route through them. At a labeled lot, leave the information belief unchanged and execute at

\[
 p_U=m_t=E[V\mid\text{background observations and known controls}].
\tag{N21}
\]

Use (N2)–(N3) for background marks, retaining the actual quote-dependent hazards where applicable. Then \(U=0\) is a best response among all the admitted finite strategies, and dealers price each traded source at its correct conditional mean. In fact,

\[
 E\Pi_U=0
\]

for every such U strategy; a nonnegative execution fee makes this nonpositive.

**Proof.** Once the ownership labels and public history are given, U's orders and independent randomization add no fundamental information. Dealers and U therefore have the same conditional value at an own fill. Apply (N5) term by term. The background filter and its mark-conditioned quotes continue to be exact; labeled controls have likelihood ratio one. For price-dependent background flow, both parties condition on the actual interventions and resulting quote path. ∎

This constructs an equilibrium of U and competitive dealers **conditional on the given background population**. For E's opportunity interpretation it uses the same expiring-ticket specification as E; for the tilted model it does not newly optimize the interception population. It works for unbounded Laplace values with the stated integrability, without an inventory cap.

**Cost and features.** No additional monetary spread is necessary for U. The cost is identification and the loss of informational response to U's own flow. On the \(U=0\) path the external filter is unchanged, so its actual alarm and curvature results survive exactly, with the qualifications in N.5. U's own one-way flow does not raise posterior variance or steepen its information price. Identification repairs that inference rather than retaining a false signal.

Publicly announcing a policy without revealing/recovering the relevant order ownership is weaker and does not by itself prove this theorem.

### Repair B: a spread covering private order-ownership information

There is a general, explicit alternative if mandatory execution charges are allowed.

At a finite public history \(H\), consider every feasible assignment \(\eta\) of previous lots to controlled versus external flow. For each assignment run the correct private filter: ignore controlled marks, retain elapsed exposure, and use actual public quotes for price-dependent background intensities. Let

\[
 \mathcal M(H)=\{\rho^\eta(V):\eta\text{ is feasible}}.
\tag{N22}
\]

Use the union over all controlled accounts, not just one account's claimed history. With \(K\) previous unit events this is at most \(2^K\) assignments in the present models; filtering may require a density for each assignment. This is an explicit construction, not a proposed efficient implementation.

Define an all-in ask and bid for a currently controlled lot by

\[
 A(H)=\max\{p_+(H),\sup\mathcal M(H)\},\qquad
 B(H)=\min\{p_-(H),\inf\mathcal M(H)\}.
\tag{N23}
\]

Post these quotes to every anonymous incoming lot; “controlled” describes the lot in the incentive proof, not a label required to collect the fee. Equivalently, add fees \(A-p_+\ge0\) and \(p_--B\ge0\) to the original mark prices. For the finite histories and integrable priors here the extrema are finite; their bounds need not be uniform across histories.

**Theorem N6 — robustness to own-history and coalition deviations.** If every admissible controller's correct conditional value belongs to \(\mathcal M(H)\), the all-in quotes (N23) make \(U=0\) a best response, from every admitted private/public initial state, for both terminal marked strategies and round trips.

**Proof.** On a purchase, \(m^U-A\le0\). On a sale, \(B-m^U\le0\). Conditional expected profit from each lot is nonpositive. Sum using (N5). Timing, episode death, private randomization, and multiple accounts do not alter this argument if the assignment set contains the actual coalition history. ∎

There is an equilibrium in a **tariff-constrained game** with the specified background demand: dealers receive the conditional-mean asset transfer and an imposed mechanism collects the nonnegative fee; U chooses zero. On that path the asset filter remains the original one. The all-in execution price, however, is generally an extremum over possible private conditional values, not a posterior mean under one equilibrium law. If the closure condition requires the all-in price itself to equal the competitive conditional mean with no external transaction cost, this repair does **not** satisfy that version of the condition.

There is a second economic qualification. If fees are charged to the informed background population, its optimizing participation changes. In E, one must recompute profit-sensitive arrival rates using the all-in quotes. Keeping the old rates is legitimate only when they are stipulated exogenous demand, or the charges are externally borne without changing those incentives. No unchanged fully strategic informed equilibrium is asserted after adding a tariff.

**A bounded-payoff special case.** If \(V\in[F_0-J,F_0+J]\), the particularly simple all-in quotes

\[
 A=F_0+J,\qquad B=F_0-J
\tag{N24}
\]

dominate every private conditional value, and each terminal marked lot loses money pathwise. A round trip with \(n\) purchases and \(n\) sales has profit exactly \(-2Jn\). The required added fee is at most \(2J\) per lot. Alternatively, a constant \(J\) fee per unit suffices for **cash round trips** against any raw price in that interval, and a constant \(2J\) fee suffices for all marked strategies.

This corrects an overbroad possible inference: an adequate bounded spread certainly can protect a fixed bounded-value market. It also destroys the desired informative executable curve. For E's residual-profit intensities, (N24) shuts off strictly profitable informed orders, so keeping the old information alarm would be inconsistent with those primitives. Laplace values and the recurrent sum of bounded jumps do not share this fixed support bound. No universal finite constant spread is proved for those markets.

### Repair C: widening the spread with flow

Fruth–Schöneborn–Urusov prove no transaction-triggered manipulation for their specified two-sided, trading-dependent spread model. Its opposite-side response and permanent impact are part of that result; “increase any spread with volume” is not their theorem. [Fruth–Schöneborn–Urusov, equations (1)–(2) and Proposition 3.4](https://arxiv.org/html/1109.2631v1).

A transparent sufficient implementation in our setting starts with a reference \(m_t\) that is a martingale in U's actual information, as in Repair A. Maintain nonnegative buy and sell pressure states \(b_t,d_t\), each decaying in waits. On a buy add the lot to \(b\) and execute at \(m+g(b^+)\); on a sell add its absolute quantity to \(d\) and execute at \(m-g(d^+)\), where \(g\ge0\) on the positive half-line. Then

\[
 E\Pi_U=-E\sum_{\text{buys}}g(b^+)
          -E\sum_{\text{sells}}g(d^+)\le0.
\tag{N25}
\]

This is a proved posted-tariff mechanism. With \(g(x)=bx-(b-a)L\arctan(x/L)\), \(0<a<b\), each side has a strictly steepening depth curve with limiting slope \(b\). Buys do not create an immediately cashable increase in the bid. Both spread states can relax without giving a negative individual charge.

It does not prove an anonymous posterior equilibrium: \(m\) must actually be correctly calibrated in U's information, and the added costs are not information prices. Taking the misattributed anonymous episode posterior as \(m\) invalidates (N25). A version using (N23) instead has the direct proof N6, but retains the large private-history state. Engineered spread pressure is not posterior fundamental variance.

### Repair D: endpoint execution and a quadratic-variation-like charge

The counterexamples already use right-endpoint, fill-inclusive lot prices. Therefore **changing to that convention alone fails** in both models.

What does work is endpoint execution **paired with a suitable potential**. If \(K_x(x)=H(x)\) and \(H\) is increasing, a lot moving \(x\mapsto x+q\) has

\[
 qH(x+q)=K(x+q)-K(x)+D_K(x,x+q),
\tag{N26}
\]
\[
 D_K(x,x+q)=K(x)-K(x+q)+qH(x+q)\ge0.
\]

For a smooth curve \(D_K=\tfrac12H'(x)q^2+o(q^2)\). This is the discrete endpoint dissipation corresponding to the continuous quadratic-variation correction. It proves safety only when the remaining potential also has the correct wait/external-generator and terminal inequalities; O states them explicitly.

Adding an arbitrary coefficient times \(q^2\) has no such theorem. With fixed unit lots it is just a per-lot fee, to be compared with the actual exploit. With variable lot sizes, changing the size without changing its marked likelihood is not a legitimate “slicing” argument about exact posteriors.

### Repair E: conservative, self-financing updating

The statement “a lot's posterior update cannot exceed its adverse-selection charge” is insufficient. For raw GM execution \(p_s=M+\Delta M_s\), its adverse-selection charge relative to \(M\) is already the signed price update. The six-slot pump passes this scalar equality and earns \(1/2\). The issue includes the effect on **already held inventory** and later attribution/decay.

A mathematically sufficient conservative rule is instead: charge at least the increment of an appropriate storage function, make waits dissipate its expected value, and impose the correct terminal bound. This controls the whole continuation opportunity, not only the latest movement of the public mean.

For example, the mechanical projection

\[
 R=F_0+S(P)+T(\phi),\qquad dP=d\phi=dq,\qquad
 \dot\phi=-\phi/\tau,
\tag{N27}
\]

with \(S,T\) increasing and odd, has storage

\[
 G(P,\phi)=F_0P+\int_0^PS(u)du+\int_0^\phi T(u)du.
\tag{N28}
\]

Integrated fills charge its increment; endpoint lots add nonnegative dissipation. Waits decrease the transient potential. It is safe on inventory loops from rest and full-state loops, as proved in [M4-SAFETY, Theorem 5](M4-SAFETY.md). The shifted-relaxation constructions in [G-storage, Theorems 5–6](G-storage.md) give another matched conservative projection.

These are proved mechanical repairs, not competitive Bayesian implementations of the unchanged episode experiment. An isolated posterior-update clip generally ceases to satisfy (N2)–(N3). Applying the clip only on alleged deviations is unavailable when those histories also occur under \(U=0\).

### Repair verdicts

| Candidate | Is \(U=0\) proved? | What is the price / equilibrium status? |
|---|---|---|
| Original posterior-inclusive lots | **No in the examples above** | Exact under the passive law; fails the additional U best response. |
| Anonymous beliefs merely include U's strategy set | **No repair of those zero-U profiles** | N4 fixes on-path Bayes prices. A new mixed/strategic population equilibrium is unresolved. |
| Identify all controlled orders | **Yes**, N5 | Exact source-conditioned conditional means; equilibrium conditional on the original background primitives. |
| Constant spread | **Yes with explicit bounded-support bounds**; no general Laplace/recurrent bound supplied | Exogenous execution friction. It is not automatically a competitive all-in posterior quote. |
| Private-history envelope spread | **Yes**, N6 | Explicit robust tariff; potentially large belief state. All-in price need not be a posterior mean. |
| Spread widening with own flow | **Yes under (N25)'s actual-martingale reference**, or N6 | Requires the stated two-sided accounting; an arbitrary widening formula is unproved. |
| Endpoint / \(q^2\) term alone | **No** | Already present in the raw counterexamples; suffices only with matched storage/fees. |
| Cap posterior update by latest charge | **No** | The six-slot example already passes the scalar cap. |
| Full storage-based conservative projection | **Yes for its specified mechanical loop tests** | Changes pricing/updating; Bayesian episode-game implementation remains unproved. |

## N.5. Do variance alarms and steepening survive?

Three distinctions prevent a false positive answer.

**1. Activity, displacement, and payoff variance are different.** For a three-point permanent value write \(a=\Pr(V\ne0\mid H)\), \(d=E[V\mid H]/J\). Then

\[
 \operatorname{Var}(V\mid H)=J^2(a-d^2).
\tag{N29}
\]

A burst can increase \(a\) while decreasing variance because it also reveals the sign. For the tilted pure burst (N16) with \(o=0.01,r=3,J=1\), the initial variance is \(0.019608\); after four buys it is \(0.247371\); after six it is \(0.106082\). The mean continues moving outward. Thus an everywhere-rising burst variance is already false before U is added.

Silence need not reduce variance either. In the no-death additive three-point experiment,

\[
 \dot a=-\mu a(1-a),\quad \dot d=-\mu(1-a)d,
\]
\[
 \boxed{\frac d{dt}\operatorname{Var}(V\mid H,\text{silence})
 =-\mu J^2(1-a)(a-2d^2).}
\tag{N30}
\]

It decreases around a symmetric sparse state, but **increases** when \(2d^2>a\). The same phenomenon survives death. For example, initially put probability \(100/101\) on a live \(+1\) episode and the rest on value zero. With silent retention fraction \(\delta/(\delta+s)=0.1\), a long silence changes that value probability to \(10/11\): variance increases from \(100/10201\approx0.00980\) to \(10/121\approx0.08264\), although the probability of a still-active episode vanishes. Small negative-state mass gives the same strict inequality with full sign support.

These facts do not contradict the expected reduction of conditional variance for a fixed terminal payoff: possible arriving orders compensate the no-arrival branch. In the recurrent model, distinguish live-value variance from terminal-value variance using (N15).

**2. The far-field shape must belong to the same experiment.** A bounded three-point payoff cannot give a nonsaturating price with positive limiting price slope. Repeated births make total payoff unbounded, but that does not cure saturation along a fixed-time, fresh-state pure burst: only the current bounded jump is being selected on that slice.

For the tilted Laplace model, an instantaneous positive burst multiplies its positive-mark density by \((1+\kappa J/\epsilon)^n\). With a fresh Laplace active prior, the positive component has asymptotic mean

\[
 E[J\mid n\text{ buys},J>0]=b(n+1)-\epsilon/\kappa+o(1).
\tag{N31}
\]

This follows by substituting \(z=J+\epsilon/\kappa\) and taking the ratio of upper incomplete-gamma integrals. A quiet-state activity weighting changes lower-order terms. The asymptotic increment remains \(b\), so asymptotic density is \(1/b\). That statement does **not** imply monotone steepening up to that slope. The synthesis document's reported overshoot is a failure of the stronger monotone-to-the-floor requirement.

E-model's globally steepening Laplace curve, Theorem 3 there, belongs to a **fixed Gaussian observation experiment**. It is not a theorem that the recurrent Poisson model with (N8) has the same curve. For that model, global steepening and a positive limiting slope remain to be proved under a specified parameterization.

**3. A repair cannot preserve a property the unmodified filter did not have.** The precise preservation results are:

| Repair | Posterior-variance alarm | Executable steepening / floor |
|---|---|---|
| Identify U | External-tape filter unchanged on equilibrium paths: its local alarm regions survive. Own orders do not create an alarm. | Original external response survives, including saturation or overshoot. U's information price has no own-flow slope. |
| Private-history envelope or fixed fee, with background law held fixed | Raw posterior unchanged on \(U=0\) paths | All-in curve changes; no general global-steepening theorem. Constant additive fees preserve within-side raw increments, but adequate endpoint quotes erase the curve. |
| Recompute optimizing background flow after charging fees | Must solve a new filter/game | Neither alarm nor curve can be imported without recomputation. |
| Two-sided pressure tariff (N25) | Correct reference's alarm survives; pressure states are not posterior variance | A steepening positive-floor surcharge can be chosen explicitly. Its shape is engineered execution cost. |
| Storage projection (N27) | No proved posterior-variance interpretation | Can retain a chosen steepening positive-floor transient curve mechanically. |

The strong conjunction—anonymous U, its own flow driving the alarm, exact all-in posterior execution, renewable episodes, global variance alarm, and monotone steepening to a positive floor—is therefore **not constructed by any repair above**. The results do not prove that every differently specified Poisson game is impossible.

## O. The lot-level deviation inequality

### Theorem O1 — discrete stochastic storage

For a tested U policy let \(x\) contain the public and private information necessary to predict future quotes and observations, and any inventory coordinate needed by the terminal contract. At an own lot let

\[
 e_k=q_k(p_k-m_k^U)+f_k
\]

be its cash cost in excess of its correct conditional value. Suppose a common nonnegative storage \(B\), valid for every admissible policy, satisfies:

1. At a controlled lot, \(e_k\ge B(x_k^+)-B(x_k^-)\).
2. During background evolution and waits, \(B(x)\) is a supermartingale in U's actual information, with optional sampling justified at the chosen wait endpoints.
3. \(B(x_0)=0\), and \(B(x_T)\ge0\) for every admitted terminal state.

Then

\[
 \boxed{E\Pi_U\le -E B(x_T)-E D\le0,}
\tag{O1}
\]

where \(D\ge0\) is the accumulated lot surplus plus expected wait dissipation.

**Proof.** Sum the lot inequalities, insert the intervening changes of \(B\), and telescope. The expected sum of those intervening changes is nonpositive. Thus \(E\sum e_k\ge E B_T-B_0+E D\). Apply (N5). ∎

The theorem extends K.3 exactly in the relevant sense: its continuous Bregman storage becomes a discrete jump inequality, with an additional nonnegative endpoint remainder such as (N26). The supermartingale requirement must hold under each deviation's actual background response. A posterior martingale under the passive law alone does not establish it.

The pointwise adverse-selection condition

\[
 p_{\rm buy}\ge m^U,\qquad p_{\rm sell}\le m^U
\tag{O2}
\]

is the special case \(B=0\). It is sufficient, but generally not necessary: a trader may initially pay to create a distortion and later recover some of that cost, as in K.3.

The six-slot schedule has \(m^U=0\) throughout and excess costs

\[
 0,\quad\tfrac12,\quad-\tfrac12,\quad-\tfrac12,\quad0,\quad0.
\]

Their sum is \(-1/2\), and the inventory, posterior, and six-slot phase close. No storage with the stated terminal conditions can satisfy O1 along this schedule. The changing informativeness of the slots creates a later liquidation opportunity not funded by the informative lot's charge. Merely imposing \(|\Delta M|\le|p-M^-|\) fails: equality holds at the informative slots.

**Is this equivalent to a storage on the public belief?** No. The natural state is at least \((\pi,\rho,P)\), plus clock and any hidden-parent-order information required by the model. Two identical public posteriors can correspond to different U conditional values because the ownership assignments differ. Public-belief storage is available in special models, not automatically.

There is a qualified converse. In a finite-horizon Markov control formulation with finite continuation values and the usual measurable dynamic-programming conditions, first allow terminal marking and immediate stopping at every state. Let \(W(x)\) be the supremum of future expected excess-profit extraction. Bellman's inequality gives

\[
 e(x,a)\ge E[W(x')\mid x,a]-W(x),\qquad
 W(x)\ge E[W(x_{\rm wait})\mid x].
\tag{O3}
\]

Thus \(W\ge0\) is a storage/value certificate, and a state with \(W=0\) admits abstention. This need not be smooth, finite-dimensional, or a function of \(\pi\) alone. If liquidation to zero inventory is mandatory, retain that terminal constraint in the Bellman problem: continuation value need not be nonnegative away from the flat-inventory fiber. The terminal inequalities, rather than unrestricted stopping, then supply the loop certificate. For deterministic loop costs, the corresponding no-negative-cycle/storage equivalence holds on the reachable augmented graph with the relevant terminal condition, as in [G-storage, Theorems 1–3](G-storage.md). Equality on reversible trades in M4-SAFETY is a special case; finite lots and spreads give inequalities. The global certificate is the meaningful version of “self-financing updates.”

## P. Adversarial checks

These checks cover every positive construction above; they do not treat an unresolved candidate as an equilibrium.

| Rule | Own-history, death, silence, and timing attacks | Two accounts | Displaced starts |
|---|---|---|---|
| Identified-control posterior, N5 | Expected profit is exactly zero for every admitted schedule; no timing exception | Same result if **all** coalition-controlled flow is identified | Holds for every correctly conditioned starting history. A favorable quiet realization is not a sure or positive-expected gain. |
| Robust ownership-envelope tariff, N6 | Each lot has nonpositive conditional expected profit | Covered by the union-of-accounts assignment set | Covered even when private/public beliefs differ, provided the starting assignment is included. |
| Support-endpoint quotes, N24 | Each marked lot has nonpositive profit pathwise | Account splitting changes nothing | Same pathwise result from every state. A nontrivial \(2n\)-lot round trip loses \(2Jn\). |
| Two-sided tariff around a correct reference, N25 | Sum of nonnegative individual charges; death/decay cannot create a rebate | Separate positive charges remain safe if the common reference stays correctly filtered for the coalition | Safe in expectation for any nonnegative starting pressure states and a correctly conditioned reference. |
| Conservative mechanical storage, N27–N28 | From-rest inventory loops and full-state loops have nonnegative cost | Global state and inventory must aggregate all accounts | Does **not** generally exclude harvesting pre-existing stored displacement. |
| K.3 benchmark used in Q | Its Bregman inequality excludes all admitted finite-variation deviations | Apply it to aggregate coalition flow and joint independent randomization | Conditional safety when the public/private starting law agrees; a freely supplied pre-existing U distortion carries nonzero initial storage. |

Two concrete attacks delimit those statements.

**Identity bypass.** Suppose one account can send two anonymous buys to the tilted filter while another gets the identified-U, no-impact execution treatment, and the dealer fails to associate the accounts. From (N16), \(o=0.01,r=3\) gives

\[
 H_1=0.02580645161,\qquad H_2=0.08146639511.
\]

Buy twice anonymously, then sell twice through the privileged account at \(H_2\). The coalition's immediate profit is

\[
 \boxed{2H_2-H_1-H_2=0.05565994350>0.}
\tag{P1}
\]

This is why Repair A requires enforceable identification of all controlled flow, not an optional “uninformed” label on whichever leg benefits. The positive margin survives short positive timing gaps and rare background events.

**Imported displacement against storage-only execution.** Take \(R=\phi\), unit endpoint lots, and initial \(\phi=4\), with U initially flat. Sell one at \(3\), let \(\phi\) halve to \(1.5\), buy one at \(2.5\). Profit is

\[
 \boxed{0.5.}\tag{P2}
\]

The state does not close: final \(\phi=2.5\). This is consistent with from-rest and full-state storage safety, but rejects an all-starting-states claim for that mechanical rule. Its endpoint charge has not made existing stored value disappear.

The strongest proved raw tilted expected-profit lower bound here is \(2.81544\) in (N19a); the strongest baseline **sample mean among the four tested schedules** is \(2.13197\). These use different parameters. No claim of global optimality is made. Positive simulations are not substituted for proofs of the repaired rules: those are N5, N6, (N24), (N25), and O1.

## Q. One page for the operator

**Do not accept the unchanged anonymous episode posterior as a closed game.** The additive model has a rapid eight-lot profitable deviation; even E's profit-sensitive quotes have a certified 24-lot counterexample. Reciprocal tilted fills eliminate that particular rapid wash mechanism, but episode death and patient liquidation reopen the problem. One finite recurrent tilted example has expected profit above \(2.8\), including background trading. The synthesis calibration also fails the numerical best-response test conducted here.

**The smallest proved Poisson repair changes the observation protocol.** Identify every order controlled by U and exclude it from the information likelihood. Execute it at the remaining conditional mean; retain ordinary side-conditioned posterior quotes for background orders. U's expected profit is then exactly zero for every admissible schedule, so abstention is a best response. There is no additional monetary spread, but identification must cover linked accounts and routing. For the three-point profit-sensitive E model the filter needs five numbers. For recurrent tilted unit jumps it needs five for price, eight if the alarm means payoff variance, plus the known horizon for terminal variance. General recurrent Laplace marks require a posterior measure. This repair preserves the external tape's actual local alarm and curvature features; U's own trades create neither information nor informational price impact.

**If U must remain anonymous, the proved repair is friction rather than a belief declaration.** The robust envelope (N23) sets the ask above every conditional value consistent with private order ownership and the bid below every such value. It closes U's expected-profit problem, including timing and two-account attacks, without a position cap. It may require exponentially many history assignments and can materially widen the spread. Its all-in quotes are generally not conditional means. A mandatory fee can coexist with conditional-mean *net asset transfers*, but an all-in zero-profit-posterior requirement rules out calling that the same equilibrium. Informed participation must also be recomputed if it bears the fees.

**No anonymous renewable-Poisson game meeting every requested property is constructed here.** This is a bounded conclusion, not a universal impossibility theorem. For the unchanged counterexample primitives, abstention fixes the anonymous on-path likelihood and hence fixes the exploitable prices: that blocks a beliefs-only repair. For the advertised shape, bounded jumps already block a nonsaturating far field; the tilted Laplace filter has an asymptotic floor but not established monotone thinning to it. Globally rising burst variance and globally falling silence variance also fail in the three-point episode filters. Solving different optimizing informed responses and U's best response jointly remains open.

**The nearest complete small strategic game is K.2–K.3 with M's non-Gaussian payoff.** Use \(V=g(Z)\), \(Z\sim N(0,1)\),

\[
 g(y)=2y-3\arctan(y/3),\qquad
 v_t=e^{-\kappa t},\qquad
 p=H(v,Y)=E[g(Y+\sqrt v Z')].
\tag{Q1}
\]

Its public price state is two numbers, \(Y,v\). K.3 proves U's best response is zero. Price steepens globally, is unbounded, and its density decreases to \(1/2\). Theorem Q1 below proves that its true posterior payoff variance increases with \(|Y|\) and decreases when its clock runs down at fixed \(Y\). Thus it has a precise variance-alarm property as well as the desired shape. Its cost is the change of model: Gaussian latent flow, a non-Gaussian payoff, a nonrenewing information clock, and continuous strategic trading. A literal interval with no Brownian flow has probability zero; the silence assertion describes its counterfactual price/variance surface, not positive-probability Poisson silence. The finite-block walk extension is an execution contract, not a separately proved Bayesian finite-lot auction.

Safety distinctions: the identified and robust-tariff episode repairs exclude positive **expected** profit from all admitted starts, not positive profit on every favorable realization. Support-endpoint quotes give stronger pathwise safety but erase the curve. The nonlinear K–M benchmark is safe in its stochastic game and on deterministic integrated loops from rest/full-state closure; it does not exclude harvesting an imported displacement on a frozen-flow replay. Renewable anonymous episodes with an exact lot-level Bayesian price, zero U response, and the full global alarm/shape remain the research target.

### Theorem Q1 — the K–M benchmark can have an actual variance alarm

Let \(g\) be M's bounded-slope curve

\[
 g(y)=by-(b-a)L\arctan(y/L),\quad 0<a<b,
\]

and define \(\mathcal V(v,y)=\operatorname{Var}[g(y+\sqrt v Z)]\). For every \(v>0\), \(\mathcal V(v,y)\) is even and strictly increasing in \(|y|>0\). If

\[
 a^2>\frac{2b(b-a)}{L^2}v_0,
\tag{Q2}
\]

then it is strictly increasing in \(v\in(0,v_0]\), uniformly in \(y\). Hence the K clock \(\dot v=-\kappa v\) decreases payoff variance at fixed \(y\), while a one-way displacement away from zero raises it at fixed \(v\). The parameters \(a=1,b=2,L=3,v_0=1\) satisfy (Q2).

**Proof of displacement monotonicity.** For independent \(X,X'\sim N(y,v)\), write \(S=(X+X')/2\), \(D=(X-X')/2\). They are independent with \(S\sim N(y,v/2)\), \(D\sim N(0,v/2)\), and

\[
 \mathcal V(v,y)=\tfrac12E[(g(S+D)-g(S-D))^2].
\]

For fixed \(D=d>0\), the difference is positive and even in \(S\). Its derivative for \(S>0\) is \(g'(S+d)-g'(S-d)>0\), because \(g'\) is even and strictly increasing with absolute argument. Its square therefore strictly increases with \(|S|\). The distribution of \(|N(y,v/2)|\) strictly increases in stochastic order with \(|y|>0\). Integrate over \(D\) to obtain the claim.

**Proof of clock monotonicity.** Differentiating Gaussian expectations gives

\[
 \partial_v\mathcal V=E[g'(X)^2]+\operatorname{Cov}(g(X),g''(X)).
\]

Gaussian Poincaré and Cauchy–Schwarz bound the covariance in absolute value by \(v\|g'\|_\infty\|g'''\|_\infty\). Here \(g'\ge a\), \(\|g'\|_\infty=b\), and \(\|g'''\|_\infty\le2(b-a)/L^2\). Thus

\[
 \partial_v\mathcal V\ge a^2-2b(b-a)v/L^2>0.
\]

For (Q1) the lower bound is \(5/9\) throughout \(v\le1\). This proves the variance assertions. Global price steepening and the floor follow from [M-space, Theorem M1](M-space.md), while strategic uninformed optimality follows from [K-game, Theorem K.3](K-game.md). The new variance argument does not extend their execution or equilibrium domains. ∎

## Verification and remaining boundary

Run `python3 N-check.py` for the exact additive fraction, the interval-certified profit-sensitive calculation, the finite-time death-pump bound, and filter self-checks. Run `python3 N-check.py --mc 3000` for the stated simulation table. The script uses the Python standard library and does not require the older temporary simulation files.

Proved here: the two rapid E deviations and their conversion to actual positive expected profit; the finite tilted death bound, its positive-birth neighborhood, and the explicit recurrent bound (N19a); the five/eight moment filter and exact silence-limit formula; the identified-order and robust-envelope repairs; the discrete deviation/storage inequality; and the variance-alarm property of the nearby K–M construction. Numerical only: the expected-profit estimates at the synthesis calibration. Open: a complete parameter classification of either raw episode game, a competitive anonymous repair preserving the stipulated all-in information price, an equilibrium of fully optimizing recurrent informed populations with U, and global alarm/shape results for such a repaired Poisson game.

The relevant source corrections are substantive: full support does not identify counterfactual beliefs; a quiet-path pump is not by itself an expected-profit deviation; the presence alarm is not payoff variance; and a storage repair is not automatically a Bayesian equilibrium. None of the positive claims in this report relies on those shortcuts.
