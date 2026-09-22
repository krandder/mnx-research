# P. Adversarial closure of the episode models

Research brief 4 · 22 September 2026

**The prescribed episode filters do not, in general, support an equilibrium with an inactive strategic uninformed trader.** This report constructs three counterexamples, including one for E-model's profit-sensitive informed arrival rates. Every counterexample includes the finite-lot adverse-selection charge. Two include outside orders in the expected-profit calculation. Merely adding U to the list of players, retaining the old filter, and calling its prices equilibrium prices fails.

There is also a positive result: a **static reciprocal Poisson model** has an exact discrete storage inequality against U, including U's private order history. It has a local variance alarm and local steepening, but a bounded prior saturates, and its unbounded reciprocal version does not have the requested finite far-field liquidity floor. Authenticated ownership and explicit execution fees provide other proved repairs, with different costs. None of these results proves that every possible recurrent-episode equilibrium is impossible.

The supporting N constructions and O deviation theorem are developed inside P, before the operator's one-page Q at the end. Numerical checks are in [P-attack-check.py](P-attack-check.py); run it with Python 3. The file uses installed NumPy/SciPy. The reported expected profits are finite integrals or ODE-defined quantities, not Monte Carlo estimates. Decimal evaluations are distinguished from exact expressions and analytic lower bounds.

## P.1. Contract, information, and what is being disproved

One lot is one unit. A purchase has sign \(+1\), a sale \(-1\). U starts with \(Q=0\), observes the public tape, knows which orders it submitted, and can use independent private randomization. Its marked profit is

\[
\Pi_U=VQ_T-\sum_{i\in U}q_i p_i-\sum_{i\in U}f_i.
\tag{1}
\]

Here \(f_i\ge0\) is an explicitly identified fee, initially zero. When \(Q_T=0\), profit is cash alone. Strategies have finitely many finite lots and integrable cash flows. There is no common position, turnover, or horizon cap. For a random number of operations, the same results require the stated integrability/localization conditions; almost-sure finiteness by itself is insufficient.

The original dealer contract takes the model's likelihood update **after each individual lot** and charges that posterior mean. No pre-fill midpoint or integrated-walk substitution is used in the episode counterexamples. External arrivals continue during every positive wait.

Three different safety claims will be kept separate:

1. **Strategic safety:** expected profit under U's actual deviation law is nonpositive.
2. **Isolated cash-loop safety:** force a sequence through the pricing map with no outside orders and finish with U flat.
3. **Full-state-loop safety:** also restore the economically relevant pricing state. This is stronger closure of the path, not a stronger class of deviations.

A positive cash flow on a specified silent path establishes item 2, not item 1. Conversely, a stochastic equilibrium can be strategically safe and have profitable isolated loops from an inherited displacement. This distinction applies to K.2–K.3 as well as to the Poisson models.

### Two original models, made explicit

**E: fixed value, changing access to information.** Let \(V\in\{-j,0,j\}\), and let activity \(A\in\{0,1\}\) switch at positive rates \(\alpha,\delta\). Activity death does not destroy V. We examine both specifications actually present in [E-model.md](E-model.md):

\[
\begin{aligned}
\text{E-C: }&h_+(v,a)=\epsilon+(\nu+\mu a)1_{v=j},\quad
h_-(v,a)=\epsilon+(\nu+\mu a)1_{v=-j};\\
\text{E-P: }&h_+(v,a)=\epsilon+(\nu+\mu a)(v-a_{\rm ask})_+,\quad
h_-(v,a)=\epsilon+(\nu+\mu a)(b_{\rm bid}-v)_+.
\end{aligned}
\tag{2}
\]

E-C is the constant-opportunity/sign-only specification. For bounded values its informed orders have the profitable direction. E-P is E-model (1)–(3), with endogenous quotes: informed intensity falls as the opportunity disappears. It is important to test E-P separately; an attack on an exogenous sign-only intensity does not automatically attack it.

These E primitives admit literal opportunity-trader games. In E-C, distinct informed agents receive expiring one-lot opportunities and optimally choose the profitable sign. In E-P, conditional on A, let such opportunities arrive at rate \(2j(\nu+\mu A)\), with an independent private trading cost uniform on \([0,2j]\). An agent knowing V trades on the profitable side if its surplus exceeds that cost, and otherwise abstains. This gives exactly (2)'s E-P intensities. The agents optimize, but have no later trading opportunity. Replacing them by one patient insider would change the game and require new best-response equations.

For either, the six probabilities \(\pi(v,a)\), with one normalization, give **five belief coordinates**. They determine the price and its variance. Let \(G\) be the hidden-state column generator. The exact filter is

\[
p_s=\frac{\sum v h_s(v,a)\pi(v,a)}{\sum h_s(v,a)\pi(v,a)},\qquad
\pi^s=\frac{h_s\pi}{\pi(h_s)},\qquad
\dot\pi=G\pi-\{\Lambda-\pi(\Lambda)\}\pi,\quad \Lambda=h_++h_-.
\tag{3}
\]

For E-P, the quote equations have the unique roots

\[
\epsilon(a_{\rm ask}-m)=\pi[(\nu+\mu A)(V-a_{\rm ask})_+^2],\quad
\epsilon(m-b_{\rm bid})=\pi[(\nu+\mu A)(b_{\rm bid}-V)_+^2].
\tag{4}
\]

An E-P deviation changes the quotes faced by informed traders and therefore their subsequent rates. The calculation below includes this response.

**T: recurrent tilted episodes.** Use [WORKFLOW-MODEL-SYNTHESIS.md](WORKFLOW-MODEL-SYNTHESIS.md)'s quiet/active-positive/active-negative regimes, rates \(\alpha/2\) for births of either sign and \(\delta\) for death, and current value \(\Sigma+J1_{\rm active}\). Death transfers \(J\) into \(\Sigma\). A future terminal value has this same conditional mean because future jumps are centered. For \(j=\epsilon=1,\mu=2\), the arrival vectors are

\[
h_+=(1,3,1/3),\qquad h_-=(1,1/3,3).
\tag{5}
\]

Thus opposite orders retrace the instantaneous likelihood update. The interception/tilting law is an **observation primitive**, not a derived best response of a patient insider.

Let \(w_r\) be unnormalized regime probabilities and \(u_r\) unnormalized first moments of \(\Sigma\), in regime order \(0,+,-\). Set

\[
A=\begin{pmatrix}
-\alpha-2&\delta&\delta\\
\alpha/2&-\delta-10/3&0\\
\alpha/2&0&-\delta-10/3
\end{pmatrix},\quad
L=\begin{pmatrix}0&\delta&-\delta\\0&0&0\\0&0&0\end{pmatrix},\quad
M=\begin{pmatrix}A&0\\L&A\end{pmatrix}.
\tag{6}
\]

For \(z=(w,u)\), silence sends \(z\mapsto e^{Mt}z\). A sign-s fill multiplies both three-vectors by \(h_s\). The exact price is

\[
P(z)=\frac{u_0+u_++u_-+w_+-w_-}{w_0+w_++w_-}.
\tag{7}
\]

This supplies **five numbers for exact mean quotes**, after normalization. It does not encode the entire distribution of accumulated permanent value. To display its posterior variance as well, retain the three conditional second moments of \(\Sigma\): **eight numbers**, not five. Their unnormalized equations are

\[
\dot z_0^{(2)}=(-\alpha-2)z_0^{(2)}
+\delta\{z_+^{(2)}+2u_++w_++z_-^{(2)}-2u_-+w_-\},
\quad
\dot z_\pm^{(2)}=\alpha z_0^{(2)}/2-(\delta+10/3)z_\pm^{(2)}.
\tag{8}
\]

The numerator of the second moment of current value is

\[
\sum_r z_r^{(2)}+2(u_+-u_-)+w_++w_-.
\]

A continuum Laplace jump prior generally requires densities indexed by jump size, together with corresponding permanent-value moments. Neither original file proves a finite-dimensional closure for that version.

### What “equilibrium” means here

With \(U=0\), (3) or (6)–(7) is the unique continuous posterior quote rule of the stated observation law. For prescribed liquidity/opportunity processes, closure requires an additional proof that U optimally abstains. With optimizing patient insiders it also requires their best-response equations, which the tilted-regime file does not solve.

**Proposition P1 — adding hypothetical deviations to a prior cannot repair an inactive-U equilibrium while leaving its law fixed.** Fix the external primitives and require \(U\equiv0\) in equilibrium. At every finite history with positive likelihood density, the equilibrium posterior is the old \(U=0\) posterior. If the dealer uses its continuous finite-history version and a U deviation against it has positive expected profit, no equilibrium with those primitives, that execution contract, and \(U=0\) exists.

**Proof.** Bayes' rule under a deterministic abstention policy adds no U orders to any likelihood. Positive-probability “possible deviations” would instead describe a different, non-abstaining equilibrium strategy or a different type distribution. Competitive prices on supported histories are therefore fixed. A profitable deviation contradicts best response. ∎

This is a nonexistence result **for the specified primitives and price contract**. It is not a nonexistence theorem for alternative endogenous informed strategies, mixed equilibria with active U, or different market institutions.

## P.2. Attack ledger

The exact definitions of \(\eta_n\) and \(\mathcal E\) are below. Those formulas, rather than their rounded decimal values, specify the profits.

| Rule and attack | Inventory / timing | Exact profit and evaluation | What it proves |
|---|---|---|---|
| E-C, own-history churn | Six buys, six sells, no wait | \(522697891519620636423341/358157751111583598664255=1.459406895138714\ldots\) | Positive actual profit; U=0 fails |
| E-C, longer churn | Forty buys, forty sells | \(\eta_{40}=2.427157465063733\ldots\), finite rational sum (9) | Stronger member of this tested family; no global optimum claim |
| E-P, episode-death timing | Two buys; close at first outside order or \(10^{-3}\), whichever comes first; two sells | \(\mathcal E_{\rm E}=0.04207700348\ldots\); (13) defines it exactly; analytic lower bound \(>0.017\) | U=0 fails even with informed intensity responding to quotes |
| T, death/silence attack, \(\alpha=10^{-6}\) | Sixteen buys; same stopping rule with \(\tau=10^{-3}\); sixteen sells | \(\mathcal E_{16,10^{-3}}=3.59375209864\ldots\), exact integral (16); lower bound \(>3.42\) | Positive **expected** profit with recurrent episodes and outside orders |
| T, stronger tested schedule at the same parameters | Fourteen buys, \(\tau=10^{-2}\), fourteen sells | \(\mathcal E_{14,10^{-2}}=3.59620778669\ldots\), same exact integral | Largest value on the 25-point grid specified below; not an optimal-control solution |
| T, identical 16-lot attack at synthesis birth rate \(\alpha=.02\) | Same schedule | \(\mathcal E_{16,10^{-3}}=-1.78477342566\ldots\) | This attack **does not** establish a failure at that calibration |
| E-C, calibrated displaced start | One prior outside buy; then U buys six and sells six | \(1207813419995269857267313/613900786510863044391120=1.96744074374\ldots\) | Positive actual profit; U starts flat |
| E-P, calibrated displaced start | One prior outside buy; then the four-lot stopped attack | Exact (13) with updated starting prior, \(0.06708928463\ldots\) | Positive expected profit; bound \(>.042\) |
| T, calibrated displaced start | One prior outside buy; then the 32-lot stopped attack | Exact (16) with updated starting prior, \(2.68726493557\ldots\) | Positive expected profit; bound \(>2.51\) |
| Six-slot filter | \(++---+\) | \(1/2\); \(r\) repetitions earn exactly \(r/2\) | Full-state pump; endpoint execution alone fails |
| Conservative steepening rule, inherited displacement | Sell one, decay by \(1/2\), buy one | \(1+\arctan3-\arctan4=0.92322810873\ldots\) | Positive isolated loop despite right-endpoint charges |
| Repaired static reciprocal model, inherited displacement | Sell one from \(y=6\), wait \(\frac34\log100\), buy one | \(104386245804/162979297675=0.64048776313\ldots\) **on the silent skeleton** | Its stochastic U=0 theorem is not deterministic all-state safety |

All cash witnesses scale by the value unit j. All anonymous-filter attacks also work across two collaborating accounts: route purchases to one, sales to the other, and evaluate their **combined** terminal inventory and cash. This gives exactly the same profit, without assuming either account separately ends flat. If separate flatness is required, use free internal transfers of the common asset, where those transfers are permitted; otherwise that is a different constraint.

There is no finite “strongest deviation” in the six-slot example because blocks can be repeated. For the episode examples the table reports explicit witnesses and the strongest tested family members, not an unproved global maximum. The exact profit formula is supplied for every member of each reported family.

## P.3. E-C: a profitable own-history attack without any silence

Set \(j=\epsilon=\nu=\mu=1\), let \(P(V=0)=50/51\), \(P(V=\pm1)=1/102\), and let \(A\) independently have probability \(1/2\) of being active. Choose any positive \(\alpha,\delta\); no time elapses in this execution. Let

\[
f(k)=\frac{2^k+3^k}{2},\qquad
m(B,D)=\frac{f(B)-f(D)}{100+f(B)+f(D)}.
\]

These are the **exact** marginal value weights after B buys and D sells: in the two activity states the informed-side likelihood factors are 2 and 3. Every lot pays the post-fill value. Hence

\[
\boxed{\eta_n=\sum_{k=1}^n m(n,k)-\sum_{k=1}^n m(k,0).}
\tag{9}
\]

**Theorem P2 — the additive regime filter fails strategic closure.** The strategy of n purchases followed by n sales has deterministic cash profit (9). In particular,

\[
\eta_6=\frac{522697891519620636423341}{358157751111583598664255}>0.
\]

**Proof.** The buys cost \(\sum m(k,0)\). The sales return \(\sum m(n,k)\). U finishes flat, so V drops out of its profit. No external finite-rate process jumps during this zero-duration ordered execution. Applying the likelihood factors gives the displayed exact rational result. ∎

The effect is private knowledge of **gross artificial evidence**. U knows that none of the twelve orders establishes the existence of information. The dealer treats the buy run as evidence of a positive informed state, and the sell run as additional evidence of information rather than a complete reversal of the first attribution. The final mean is zero, but the final activity/value-uncertainty belief is different. This is an inventory loop, not a restored-belief loop.

Some exact-family evaluations are:

| n | 4 | 6 | 8 | 12 | 20 | 40 |
|---:|---:|---:|---:|---:|---:|---:|
| \(\eta_n\) | .2397286883 | 1.4594068951 | 2.2153568490 | 2.4172652472 | 2.4269201621 | 2.4271574651 |

Equation (9) is the exact rational value of every cell. The example is not using a vanished spread: each side-conditioned Bayes update is already paid.

**Execution support.** Serial immediate lots are part of the stated lot-by-lot contract, whose natural limiting filter is being tested. If an implementation instead prohibits equal timestamps, replace each zero gap by an independent uniform gap in \((0,h)\). The number of U lots remains 2n and the total additional time is bounded by \(2nh\). Finite-history filters and cash are continuous in these gaps; external arrivals and hidden transitions have probability tending to zero. Since \(|V|\le1\), dominated convergence gives expected profit tending to \(\eta_n>0\). Thus a strictly positive-gap, nonatomic deviation also exists. This removes any dependence of the nonexistence conclusion on arbitrary posterior versions at simultaneous timestamps.

## P.4. E-P: the informed traders' quote response does not close the death loophole

This section uses (4), not the constant rates in P.3. Parameters are

\[
j=\epsilon=\mu=1,\quad
\nu=\alpha=10^{-6},\quad \delta=10^5,\quad
P(V=0,\pm1)=(.9,.05,.05),\quad P(A=1)=1/2.
\tag{10}
\]

U buys twice immediately. Let the two exact ask prices be \(a_1,a_2\), so the entry cost is \(K=a_1+a_2\). It then waits until the first **outside** order or \(\tau=10^{-3}\), whichever occurs first, and sells twice immediately. U can distinguish an outside order from its own submission; the dealer cannot use that label.

The entry prices even have radical expressions. With \(c_1=.05(\nu+1/2)\), \(d_1=.025[\nu^2+(\nu+1)^2]\),

\[
a_1=\frac{1+2c_1-\sqrt{1+4c_1}}{2c_1},\quad
c_2=\frac{c_1+(1-a_1)d_1}{1+c_1(1-a_1)},\quad
a_2=\frac{1+2c_2-\sqrt{1+4c_2(1-a_1)}}{2c_2}.
\tag{11}
\]

Numerically \(K=.089726464585748\ldots\), \(a_2=.065903382560035\ldots\). Their difference \(a_2-a_1=.042080300534322\ldots\) is the retained-price profit if activity vanishes instantly and exit adverse selection is removed.

### Exact expected profit, including an early outside order

Let \(\pi_b\) be the dealer posterior after the two buys. During no outside orders let \(\pi(t)\) solve (3) from \(\pi_b\), and let \(w(t)\) solve

\[
\dot w=G w-\operatorname{diag}\Lambda(\pi(t))w,
\qquad w(0)=\pi_0.
\tag{12}
\]

This is the **actual** survival likelihood: U's initial orders do not update \(w(0)\). Nevertheless the informed traders face the distorted quotes, so their hazards in (12) are evaluated at \(\pi(t)\). Let \(g_0(t)\) be the cash profit from selling two lots from \(\pi(t)\), less K. Let \(g_s(t)\) be the same quantity after first applying one external sign-s update to \(\pi(t)\). Each exit recomputes (4) for each of its two sales. Then

\[
\boxed{
\mathcal E_{\rm E}
=\boldsymbol1^\top w(\tau)g_0(\tau)
+\int_0^\tau\sum_{s=\pm}
 [h_s(\pi(t))^\top w(t)]g_s(t)\,dt.
}
\tag{13}
\]

This definite ODE/integral expression, with the rational parameters (10) and the unique roots (4), is the exact profit. It gives

\[
g_0(\tau)=.0420791845300\ldots,\qquad
\mathcal E_{\rm E}=.0420770034807\ldots.
\]

**Theorem P3 — positive expected profit with endogenous E-P rates.** The deviation in (10)–(13) has positive expected profit. In particular \(\mathcal E_{\rm E}>.017\), independently of numerical ODE accuracy.

**Proof.** Throughout this model quotes lie in \([-1,1]\), \(a_{\rm ask}\ge b_{\rm bid}\), and the total rate is at most \(4+2\nu\). Thus the probability of any outside arrival before \(\tau\) is at most \((4+2\nu)\tau<.004001\). On the early-arrival branch the four-lot cash profit is at least \(-4\).

On the no-arrival branch, activity death does not change V. Over time \(\tau\), variation of the no-arrival likelihood across hidden paths is bounded by \(e^{2(1+\nu)\tau}\). Consequently the marginal mean differs from \(a_2\) by less than .004001. The active probability after silence is bounded by

\[
e^{2(1+\nu)\tau}\{e^{-\delta\tau}+\alpha/\delta\}<1.003\times10^{-11}.
\]

For either side, (4) bounds the posterior mean increment by \(4\nu+4P(A=1)\), because its squared payoff gap is at most 4. One sale can multiply active probability by at most \(3+2\nu\); the second sale obeys the same bound. The two sale prices therefore lose at most .008002 from the silence-mean bound and .000013 from exit adverse selection, relative to \(2a_2\). Using (11), these bounds imply \(g_0(\tau)>.03406\). Therefore

\[
\mathcal E_{\rm E}>(1-.004001)(.03406)-4(.004001)>.017.
\]

This is a bound under the actual arrival law (12), including the informed response to the distorted quotes. ∎

The mechanism is that rapidly expiring opportunities leave a persistent value inference. U manufactures that inference with two increasing-price purchases, then sells after the active population has almost disappeared. The model has no patient informed player compelled to correct a false permanent estimate. The very small slow coefficient is positive, but is insufficient to pay for the retained inference over these two exit lots.

More generally, whenever two successive buys give \(a_2>a_1\), take \(\delta\tau\to\infty\), \(\tau\to0\), \(\nu\to0\), and \(\alpha\tau\to0\). Expected profit tends to \(a_2-a_1>0\), evaluated at the limiting entry rates. Hence the counterexample occupies a nonempty region of **strictly positive** finite parameters; it is not confined to zero birth or zero slow intensity. It does not classify all parameter values.

## P.5. T: reciprocal fills fail once death transfers fictitious information to permanent value

Here use (5)–(7), with

\[
\alpha=10^{-6},\quad\delta=1/5,\qquad
z_0=(100,1,1,0,0,0)/102.
\tag{14}
\]

This is a specified symmetric prior, not a claim that its odds equal the synthesis file's stationary silence odds. All completed-jump means initially vanish. Every parameter is positive. U buys n lots, waits until \(\tau\) or the first outside order, and then sells n lots. Start with \(n=16,\tau=10^{-3}\).

Define \(D_s=\operatorname{diag}(h_s,h_s)\), \(z_b=D_+^n z_0\), and

\[
K_n=\sum_{i=1}^nP(D_+^i z_0),\quad
R_n(z)=\sum_{k=1}^nP(D_-^k z),\quad
g_0(t)=R_n(e^{Mt}z_b)-K_n,\quad
g_s(t)=R_n(D_s e^{Mt}z_b)-K_n.
\tag{15}
\]

The actual survival vector is \(w(t)=e^{At}(100,1,1)^\top/102\): the initial U purchases do not change the real regime distribution. The exact expected profit is

\[
\boxed{
\mathcal E_{n,\tau}
=\boldsymbol1^\top w(\tau)g_0(\tau)
+\int_0^\tau\sum_{s=\pm}(h_s^\top w(t))g_s(t)\,dt.
}
\tag{16}
\]

This is a finite one-dimensional integral of explicit matrix-exponential/rational functions. It includes all unobserved births and deaths before the first outside order, and both possible signs of that order. There is no path-probability substitution for expected profit.

**Theorem P4 — the recurrent tilted model has a profitable strategic deviation.** Under (14), the 32-lot deviation has

\[
\mathcal E_{16,10^{-3}}=3.59375209864155\ldots>3.42.
\tag{17}
\]

**Proof of the exact expression.** No outside order before \(\tau\) has probability \(\boldsymbol1^\top w(\tau)\). A first outside sign-s order at t has density \(h_s^\top w(t)\). Its public-history filter is the distorted filter in (15). Partitioning by these events gives (16).

**A certificate of the positive sign.** Rational degree-20 Taylor evaluation of \(e^{M\tau}\) gives

\[
3.59425<g_0(10^{-3})<3.59426.
\tag{18}
\]

For completeness, \(\|M\tau\|_\infty<.004\), so the omitted exponential series has norm below \(10^{-69}\). Before normalization the largest initial tilted component is \(3^{16}\), and any exit diagonal multiplier is at most \(3^{16}\). Each denominator has a contribution at least \(100e^{-(2+\alpha)\tau}>99\) from an initially quiet path staying quiet. Propagating these errors through the 16 price ratios gives an error below \(10^{-48}\), far smaller than the interval (18). The checker performs the Taylor evaluation with exact rational arithmetic.

During a silent interval the completed signs of newly born and subsequently completed episodes remain symmetric: their total hazard is sign-independent. Conditional permanent means in each regime therefore lie in \([-1,1]\), inherited from the possible death of the initial episode. One subsequent outside fill and the instantaneous exit only reweight those regimes. All exit prices lie in \([-2,2]\), so every early-arrival branch has profit at least \(-48\). Total outside intensity is at most \(10/3\), making its arrival probability before \(\tau\) at most \(1/300\). Therefore

\[
\mathcal E_{16,10^{-3}}
>\frac{299}{300}(3.59425)-\frac{48}{300}>3.42.
\]

Quadrature of (16) gives the decimal in (17); the sign proof does not depend on the quadrature error estimate. ∎

The dealer's update after a buy followed immediately by a sell really does retrace. The wait introduces a different operation: some of the artificial active-positive likelihood is transferred to a completed positive jump. A later sell cannot undo that transfer by dividing current active odds. **Reciprocity of fill maps is not reciprocity of the trade/wait composition.**

Birth matters. At \(\alpha=.02\), newly possible negative episodes substantially change the exit prices, and this very same attack loses, as the ledger records. The old synthesis's profitable long **silent-path** simulations are not proofs of positive expected profit at that calibration. This report neither converts those numbers into equilibrium deviations nor labels their stochastic expected-profit question solved.

For reproducibility, the small search used \(n\in\{12,14,16,18,20\}\) and \(\tau\in\{10^{-5},10^{-4},10^{-3},10^{-2},10^{-1}\}\), always the first-outside-order stopping rule and (14). Its strongest value was \(\mathcal E_{14,.01}=3.59620778669137\ldots\), with silent-branch profit \(3.60087240258533\ldots\). The same rational check gives \(3.60087<g_0(.01)<3.60088\): now the exponential remainder is below \(10^{-48}\). The preceding branch bounds give \(\mathcal E_{14,.01}>(29/30)3.60087-42/30>2.08\), so its positive sign is also certified. Equation (16) specifies exact profits for the entire search family. This grid is not an exhaustive strategy search.

As a boundary check, setting \(\alpha=0\) in (16) gives \(\mathcal E_{16,.001}=3.61010522818695\ldots\), with silent-branch profit \(3.61061240175533\ldots\). This is the single-episode limit, not the positive-birth counterexample claimed in P4.

**Positive-gap implementation.** As in P.3, rapid independently randomized positive gaps replace the two instantaneous blocks. Keep the liquidation decision after the first outside order, and finish the prescribed finite liquidation even if further orders arrive during its small gaps. Continuity, bounded arrival rates, and finite moments of the number of outside observations imply convergence to (16). Thus sufficiently small strictly positive gaps retain the positive expected profit. This is the supported-history version required for Proposition P1.

### Displaced starts in the original episode rules

A fresh U can also start from a correctly calibrated displacement created by an **outside** purchase. Apply one buy update to the original prior, charge none of that purchase to U, and initialize both the dealer and U's private posterior at that updated belief. This is a post-lot starting state. As elsewhere, the displayed zero-gap state is the continuous limit of a genuine buy in a short positive arrival window; profits persist at nearby positive-time histories.

For E-C, keep n=6 and use the m of (9). The exact profit is

\[
\sum_{k=1}^6 m(7,k)-\sum_{k=1}^6m(k+1,0)
=\frac{1207813419995269857267313}{613900786510863044391120}
=1.96744074373962\ldots.
\]

The initial conditional mean is \(m(1,0)=1/69\), and U initially owns nothing.

For E-P, replace the initial prior in (12)–(13) by its first-buy posterior and then execute U's two buys and two stopped sales. Recompute the quotes with (4). Equation (13), with this explicit changed initialization, is the exact expected profit:

\[
g_0(.001)=.0670914539599\ldots,\qquad
\mathcal E_{\rm E}^{\rm displaced}=.0670892846336\ldots.
\]

The retained-price difference is .0670931840408…; the same bounds as P3 give expected profit \(>.042\), so this is not a numerical-sign claim.

For T, replace \(z_0\) in (14)–(16) by the normalized vector

\[
(100,3,1/3,0,0,0).
\]

Its initial mean is \(4/155\). With the same \(n=16,\tau=.001,\alpha=10^{-6}\), the exact integral (16) gives

\[
g_0(.001)=2.68746250413850\ldots,\qquad
\mathcal E_{\rm T}^{\rm displaced}=2.68726493557147\ldots.
\]

The rational exponential check encloses the quiet profit in \((2.68746,2.68747)\). The same first-arrival bound gives \(\mathcal E_{\rm T}^{\rm displaced}>(299/300)2.68746-48/300>2.51\). These attacks use the correctly updated private prior; they do not give U advance knowledge of the outside purchaser's type.

## P.6. The discrete-lot deviation inequality — deliverable O

Write \(\mathbb P^\sigma\) for the **actual** law when U uses policy \(\sigma\), while the other players keep their specified feedback strategies. Let \(\mathcal G_i^\sigma\) contain U's information when its ith lot is executed: public history, ownership of previous lots, the current signed lot, and its private randomization. Define

\[
m_i^\sigma=E^\sigma[V\mid\mathcal G_i^\sigma],\qquad
d_i=q_i(p_i-m_i^\sigma)+f_i.
\tag{19}
\]

The dealer's public posterior \(\pi_i(V)\) need not equal \(m_i^\sigma\). Even in the successful K.3 construction it generally does not.

**Theorem O1 — exact deviation accounting and a sufficient local certificate.**

For any admissible finite strategy,

\[
\boxed{E^\sigma[\Pi_U]=-E^\sigma\sum_i d_i.}
\tag{20}
\]

In particular, absence of every profitable finite schedule is equivalent to nonnegativity of the cumulative expected excess charge in (20), for every such schedule. A useful sufficient condition is the existence of a storage \(\mathcal B\) on a state sufficient for **U's controlled experiment**, satisfying:

* \(\mathcal B(z_0)=0\);
* after a U lot, \(d_i\ge E[\mathcal B(z_i^+)-\mathcal B(z_i^-)\mid\mathcal G_i]\);
* during waiting and outside observations, with U's position unchanged, \(\mathcal B\) is a supermartingale under the actual law;
* at permitted terminal states, \(\mathcal B\ge0\).

All conditional inequalities must hold for the admissible actions, not only for actions used in the proposed equilibrium. Then \(E^\sigma\Pi_U\le0\) for all schedules. For round trips only, the terminal condition is needed only on \(Q=0\). For arbitrary marked terminal inventory it is needed at all allowed terminal states.

**Proof.** Conditional expectation gives \(E^\sigma[q_i(V-m_i^\sigma)]=0\). Summing, using \(Q_T=\sum q_i\), proves (20). Telescope the storage increments through trade and nontrade transitions. The expected nontrade increments are nonpositive, so the summed trade excess charges dominate \(E\mathcal B(z_T)-\mathcal B(z_0)\ge0\). Insert this in (20). The same argument with stopping/localization applies to a random finite schedule when the resulting cash and storage processes satisfy the required integrability. ∎

This is the finite-lot analogue of the Bregman-storage calculation in [K-game, K.3](K-game.md). A natural state is

\[
z=(\pi_{\rm dealer},\rho_U,Q,t,\hbox{other sufficient control variables}),
\tag{21}
\]

where \(\rho_U\) is U's own posterior. In a general game it includes relevant hidden inventories, parent-order information, and policy state. A public posterior alone need not suffice.

### Why “the lot paid for its own update” is too weak

Take the six-slot example in [F-attack.md](F-attack.md): a symmetric payoff \(V=\pm1\), informative slots 2 and 5 with sign accuracy \(3/4\), and independent uninformative signs in the other slots. The deterministic sequence is

| Slot | U lot | After-lot price | Cash cost |
|---:|---:|---:|---:|
| 1 | +1 | 0 | 0 |
| 2 | +1 | 1/2 | 1/2 |
| 3 | −1 | 1/2 | −1/2 |
| 4 | −1 | 1/2 | −1/2 |
| 5 | −1 | 0 | 0 |
| 6 | +1 | 0 | 0 |

U knows all six observations are artificial, so its actual conditional value remains zero. Cost is \(-1/2\). The dealer posterior, calendar phase, private posterior, and U inventory all return to their initial states. Therefore no storage satisfying O1 can exist on this closed controlled cycle.

At each informative fill the side-conditioned execution price includes the full posterior jump. Thus a condition equating the adverse-selection charge on the **new lot** to its price update is already satisfied. What it fails to finance is the value credited to **previously held inventory**.

For example, if a displayed mark \(p\) changes to \(p'\) and inventory changes from Q to \(Q+q\), then

\[
(Q+q)p'-Qp=q p'+Q(p'-p).
\tag{22}
\]

Right-endpoint cash \(q p'\) does not pay the second term. Relative to U's correct martingale value m, the same issue arises with the distortion \(p-m\). A valid “self-financing update” condition must fund the change of a suitable **whole-position storage**, including waits and outside observations. Comparing only \(q(p'-p)\) with the current lot's charge is not sufficient.

### Right-endpoint execution is a remainder, not a theorem by itself

If a trade follows a scalar increasing curve \(H(y)\), write \(\Psi'=H\). For any real q,

\[
qH(y+q)-[\Psi(y+q)-\Psi(y)]
=q^2\int_0^1 uH'(y+uq)\,du\ge0.
\tag{23}
\]

For a linear curve this is \(\lambda q^2/2\), the discrete analogue of an execution correction involving quadratic variation. It makes a **previously certified** potential rule safer. It says nothing about whether time evolution dissipates that potential or creates an unfunded permanent credit. P.2–P.5 already use the full right endpoint, and the six-slot loop already pays it.

An extra constant charge \(h\) per unit subtracts exactly \(12h\) from (9) at \(n=6\), and \(32h\) from (16) at \(n=16\), if the original arrival law/filter is retained. Those witnesses remain profitable for

\[
h<\eta_6/12=.12161724126\ldots,\qquad
h<\mathcal E_{16,.001}/32=.11230475308\ldots.
\tag{24}
\]

These are thresholds for these strategies, not universal minimal safe spreads. If informed participation changes with the added fee, its likelihoods must also be re-solved; subtracting fees from a calculation with the wrong new arrival law is not an equilibrium proof.

### Is storage equivalent to no profitable deviation?

**Theorem O2 — the finite control problem has a storage converse, with the correct state and boundary.** Consider a finite-horizon finite-state/action controlled experiment with state sufficient for U, excess cost \(d\) from (19), and mandatory terminal liquidation where appropriate. Suppose all continuation values are finite. Let

\[
A(z)=\sup_\sigma E_z^\sigma\left[-\sum_{\rm future}d_i\right]
\tag{25}
\]

over admissible terminating continuations. If stopping flat is allowed, \(A\ge0\) at flat states; at a terminal flat state \(A=0\). The Bellman inequality is

\[
d(z,a)\ge E[A(z')\mid z,a]-A(z).
\tag{26}
\]

At an initial flat state, all continuations have nonpositive expected profit if and only if \(A(z_0)=0\), in which case \(A\) is a storage certificate of the form O1. For marked-inventory problems allowing immediate settlement at the correct conditional value, stopping gives \(A\ge0\) at every state.

**Proof.** Immediate stopping gives the appropriate lower bound. Appending an optimal continuation to an initial action yields \(A(z)\ge-d(z,a)+E A(z')\), which is (26); backwards induction supplies existence and finiteness. Conversely, (26) telescopes and its terminal boundary excludes a positive initial continuation value. ∎

For infinite state spaces or arbitrary finite but unbounded horizons, finiteness, measurable selection and admissibility are additional hypotheses. If the supremum in (25) is infinite, this construction is not a finite certificate. It is not legitimate to infer a smooth storage merely from observed numerical losses.

This is the stochastic counterpart of [M4-SAFETY](M4-SAFETY.md) and [G-storage](G-storage.md)'s supply inequality. In the deterministic reversible integrated-fill setting, opposite trade edges force equality \(c=\Delta G\); with endpoint charges or a spread they only require \(c\ge\Delta G\). The liquidation-fiber boundary is essential in both versions. **It is not equivalent to existence of a storage on the public belief alone**, and it is not a Bayesian-equilibrium representation theorem.

## P.7. A positive Poisson construction: static reciprocal information

The following repair removes **the transfer of a decaying active signal into a separate permanent-value coordinate**. It does not add a fee.

Let V be fixed, initially independent of U's private randomization, and suppose the external rates are

\[
h_+(v)=\epsilon e^{cv},\qquad h_-(v)=\epsilon e^{-cv},\qquad c>0.
\tag{27}
\]

For now take bounded V. These rates are observation primitives as in the tilted specification: they require state-dependent interception if one insists on describing them as a tilt of equal independent noise streams. No claim about a patient insider's optimal interception policy is implicit.

With \(y=N^+-N^-\), elapsed exposure t, and fixed prior \(\pi_0\), define

\[
Z(t,y)=\int e^{cvy-\epsilon t(e^{cv}+e^{-cv})}\pi_0(dv),\qquad
H(t,y)=\frac1c\partial_y\log Z(t,y).
\tag{28}
\]

Buy and sell lots execute at \(H(t,y+1)\) and \(H(t,y-1)\), respectively. The public state is \((t,y)\); equivalently, for a three-point prior, it is two odds. Calendar time may be treated as an external input.

**Theorem P5 — a discrete analogue of K.3.** The strategy \(U=0\), the prescribed external order law (27), and the exact dealer rule (28) form a U–dealer equilibrium. Every admissible U strategy, including strategies using own history, waits, stopping times and multiple accounts, has \(E\Pi_U\le0\). This includes terminal marked positions as well as round trips and holds from every **calibrated** initial posterior.

**Proof.** U deletes its own orders from the tape, retaining their elapsed time, and obtains its true posterior \(\rho_t\). The external law does not depend on U. Causality and independence of its private randomization imply that no additional fundamental information is hidden in the reconstruction. If U's cumulative position is Q, the dealer's posterior is exactly

\[
\pi_t(dv)=\frac{e^{cvQ_t}\rho_t(dv)}
                  {\rho_t(e^{cVQ_t})}.
\tag{29}
\]

All external likelihood and silence multipliers commute with this fixed-V tilt. Set

\[
H_\rho(x)=\frac{\rho(Ve^{cVx})}{\rho(e^{cVx})},\qquad
\mathcal B(\rho,Q)=\frac1c\log\rho(e^{cVQ})-Q\rho(V)\ge0.
\tag{30}
\]

The inequality is Jensen's. Also \(H_\rho'(x)=c\,\operatorname{Var}_{\rho_x}(V)\ge0\). U's own lot supplies no new information to \(\rho\), and its excess charge obeys

\[
q[H_\rho(Q+q)-H_\rho(0)]
=\mathcal B(\rho,Q+q)-\mathcal B(\rho,Q)+\mathcal R(\rho,Q,q),
\quad \mathcal R\ge0,
\tag{31}
\]

where \(\mathcal R=qH_\rho(Q+q)-\int_Q^{Q+q}H_\rho(x)\,dx\). It is exactly the endpoint remainder (23).

Between U lots Q is fixed. The two processes \(\rho_t(e^{cVQ})\) and \(\rho_t(V)\) are true martingales in U's filtration. The logarithm of the first is a supermartingale. Therefore \(\mathcal B\) is a supermartingale through waiting **including the possible external orders**, not conditional on their absence. O1 gives

\[
\boxed{
E\Pi_U=-E\mathcal B(\rho_T,Q_T)
       -E\sum_i\mathcal R_i-\mathcal D\le0,
}
\tag{32}
\]

where \(\mathcal D\ge0\) is the expected storage lost through outside information. Bounded V and a finite bound for each tested strategy justify the expectations; standard integrability/localization extends the class. All accounts enter through their combined Q. The dealer price is the equilibrium posterior when \(Q=0\). ∎

The theorem is a solved closure of this **prescribed Poisson information population**, not a claimed equilibrium derivation of (27) from an unconstrained, long-lived optimizing informed trader. This distinction is the same one imposed on the original tilted-episode primitives.

### Alarm, shape, and the lost feature

For \(V\in\{0,\pm1\}\) with initial unnormalized weights \((100,1,1)\), set \(c=\log3,\epsilon=1\). Then

\[
x_\pm=.01e^{-4t/3}3^{\pm y},\quad
H(t,y)=\frac{x_+-x_-}{1+x_++x_-}.
\tag{33}
\]

This is non-Gaussian and exactly two-dimensional. Put \(a=P(V\ne0\mid t,y)\), \(m=H\). Its variance is \(a-m^2\), and

\[
H_y=c\,\operatorname{Var}(V\mid t,y),\qquad
H_{yyy}(t,0)=c^3a(t,0)[1-3a(t,0)]>0.
\tag{34}
\]

Thus small one-way bursts raise variance and steepen the response at a sparse center. Silence reduces activity odds. But the price saturates at \(\pm1\); there is no nonsaturating linear far field. Nor does total posterior variance fall in **every** silent state:

\[
\left.\frac{d}{dt}\operatorname{Var}(V)\right|_{\rm silence}
=-\frac43(1-a)(a-2m^2).
\tag{35}
\]

Near the sparse center this is negative. Near directional certainty it is positive: silence first restores uncertainty. “An alarm” cannot be promoted into a global monotonic-variance theorem.

### Every requested attack on this repaired equilibrium

* **Own-history and two accounts:** (29) reconstructs the correct private posterior from the union of owned orders. The same storage uses aggregate Q.
* **Timing around death:** no separate dying activity state remains. Substituting a death-to-permanent-value transfer breaks (29), as P.5 shows.
* **Silence and adaptive timing:** (32) includes all outside outcomes and stopping choices; the profitable silent outcome alone cannot select itself for free.
* **Calibrated displaced starts:** initialize \(\rho_0=\pi_0\), \(Q_0=0\) at that displaced posterior. Then \(\mathcal B_0=0\), so (32) still excludes positive expected profit.
* **A trader inheriting its own earlier false history:** its full wealth calculation includes the earlier trades and storage. Resetting Q or the private posterior while retaining the created displacement is not a fresh calibrated initial condition.

There is nevertheless an exact **isolated displaced-start** cash pump. Start (33) at \(t=0,y=6\), with the tested trader flat. Sell one at \(H(0,5)\); wait \(h=\frac34\log100\); buy one at \(H(h,6)\). Its silent-path profit is

\[
H(0,5)-H(h,6)
=\frac{104386245804}{162979297675}=.640487763127796\ldots.
\tag{36}
\]

It leaves a changed belief. Under the actual stochastic law (32) proves that outside-arrival losses offset any positive expectation from this path. This is a useful explicit test of what “safe from displaced starts” means.

For the isolated **from-rest** experiment there is a separate positive result. If \(\pi_0\) is symmetric, use

\[
G(t,y)=\frac1c\log\frac{Z(t,y)}{Z(t,0)}.
\tag{37}
\]

Trade costs dominate \(\Delta G\) by (23), and

\[
G_t=-\frac1c\{E_{t,y}[\Lambda(V)]-E_{t,0}[\Lambda(V)]\}\le0.
\]

Indeed \(\Lambda(v)=2\epsilon\cosh(cv)\) is increasing in \(|v|\), and a tilt of a symmetric distribution increases expectations of such even functions: the law of \(|V|\) is reweighted by the increasing factor \(\cosh(cy|V|)\). Since \(G(t,0)=0\), every isolated inventory loop from rest costs at least zero. The same storage certifies every reachable full-state loop. It does **not** certify arbitrary inventory loops starting with \(y\ne0\), as (36) confirms.

### Why replacing the bounded prior by Laplace is not a free repair

Take the density proportional to \(e^{-|v|/b}\) in (28). At positive exposure t, its tilted density is

\[
\exp\{c yv-|v|/b-2\epsilon t\cosh(cv)\}.
\tag{38}
\]

All finite exponential moments then exist, and P5 applies under the corresponding moment conditions. As \(y\to+\infty\), the saddle satisfies

\[
2\epsilon t\sinh(cv)=y-\frac1{bc}.
\]

Laplace concentration gives

\[
H(t,y)=\frac1c\log\frac{y}{\epsilon t}+o(1),\qquad
H_y(t,y)\sim\frac1{cy}.
\tag{39}
\]

One way to verify the derivative is to use \(H_y=c\operatorname{Var}(V)\) and the saddle curvature \(c^2y(1+o(1))\). Thus liquidity density \(1/H_y\) diverges; it does not approach a finite positive floor. At zero exposure, the Laplace moment generating function instead ceases to exist when \(|cy|\ge1/b\), so arbitrary instantaneous lots are not even a well-defined price contract there. Starting with positive exposure fixes integrability but yields (39).

The synthesis's Laplace floor uses \(\theta_J=\operatorname{sgn}(J)\log(1+\kappa|J|/\epsilon)\), not \(cV\). Its mean after a large pure burst can be linear in lot count. Replacing \(cV\) by that nonlinear statistic invalidates the derivative identity behind (30)–(31): the derivative of a log normalizer gives \(E[\theta_J]\), not \(E[V]\). Hence P5 cannot be cited as its safety proof. This is a precise limitation of this construction, not a proof that no other safe Laplace game exists.

## P.8. Repairs: actual games, execution tariffs, and failures

An ordinary Glosten–Milgrom spread is already present in the original side-conditioned posterior prices. An **additional** spread is an execution cost. If a dealer receives that extra spread without a cost or obligation, its conditional profit is positive and the transaction price is no longer the stipulated competitive conditional mean. The distinction cannot be removed by renaming a fee “Bayesian.”

The following constructions state exactly which price is a posterior and who pays any extra amount.

### R1. Authenticated uninformed orders: a genuine informational repair

Assume orders by the strategic uninformed player are publicly authenticated as such, including all its accounts. Dealers delete those orders from the information likelihood and charge

\[
p_i^U=E[V\mid\text{public outside tape, authenticated U history}]
=m_i^U.
\tag{40}
\]

They still apply the exact side-conditioned filter to anonymous external flow. For E-P the filter includes the actual quotes that governed that flow; deleting a U event does not delete elapsed exposure or the publicly observed quote history.

**Proposition P6.** For either episode observation model, this changes the information structure so that \(U=0\) is a best response and (40) is an exact competitive dealer price. Every admissible U strategy has expected marked profit **exactly zero**, before fees.

**Proof.** Apply (20) with \(p_i=m_i^U\). Own orders contain no fundamental signal and are correctly treated as interventions. The tower identity holds at all U stopping times. ∎

The other players' prescribed external dynamics are unchanged when U abstains. This provides a complete U–dealer closure for those primitives. It also extends any already-solved equilibrium of the other players because U's tagged orders do not distort their price signal.

**Attacks.** Own-history, timing and silence strategies all have expectation zero, so doing nothing is a weak best response. Two-account protection requires that both accounts really receive the same authenticated type treatment. If U can disguise an account as an anonymous external trader, the P.3–P.5 attacks return with exactly their original profits. Authenticating a wallet address without authenticating the relevant information/type distinction is not the stated repair.

External-order prices and the original filter's local alarm can remain. **U's own flow has zero information impact**, so its personal executable book does not steepen because of its own false alarm. This is a real change of the economic request. The result is stochastic, not a guarantee against harvesting every deterministic silent path from an inherited displacement.

For example, apply authenticated pricing to (33), start at \(y=6,t=0\), sell one, wait \(h=\frac34\log100\) with no outside arrivals, and buy one. Neither owned lot changes y. The exact silent-path profit is

\[
H(0,6)-H(h,6)
=\frac{958863906000}{1181706475291}
=.811423078445835\ldots.
\]

Proposition P6 says its unconditional expected profit in that continuing market is zero. Authentication repairs inference, not every conditional silent scenario.

### R2. A spread sufficient for bounded values, with an explicit payer

For a fixed \(V\in[-j,j]\), all exact dealer prices also lie in this interval.

**Proposition P7 — simple uniform friction bounds.** Retain the original conditional-mean dealer price \(p_s\), and pay a separate execution charge to the exchange.

* A fixed fee \(j\) per unit rules out **every cash round trip pathwise**, since \(-\sum q_i p_i\le j\sum|q_i|\).
* A fixed fee \(2j\) per unit rules out **every marked strategy pathwise**, since \(q_i(V-p_i)\le2j|q_i|\) for each lot.
* A smaller directional construction is to set all-in ask \(j\) and bid \(-j\), with respective fees \(j-p_+\) and \(p_-+j\). Every individual marked trade then has nonpositive profit.

These assertions hold with arbitrary waits, order ownership, accounts, and initial dealer displacements.

**Proof.** The displayed bounds use only the support of V and p; sum them. ∎

For E-C this gives an explicit equilibrium with U inactive, competitive dealers receiving the posterior price, exogenous liquidity demand paying the fee, and expiring one-lot informed opportunities choosing their correct side. Under the directional construction, informed agents can be indifferent at their known value and choose to trade; the original constant opportunity rates remain a permissible best response. This is a weak equilibrium of that constrained opportunity game, not a patient-insider equilibrium.

For E-P a fee paid by informed traders changes their profit-sensitive participation rates. Equations (2)–(4) must be recomputed with those costs. The support argument still guarantees U's safety in any resulting bounded-value game, but it does **not** preserve the old E-P law or prove a new nontrivial information-flow equilibrium. The completely uninformative zero-informed-participation solution is possible when all-in prices exhaust every informed trading surplus; it loses the requested alarm.

**Cost and feature audit.** The price the dealer receives remains a posterior; the all-in price generally does not. The constant-fee version preserves the raw posterior's shape as a component of execution. The directional extreme-price version destroys useful book shape. Neither provides the desired frictionless closure. The proof for fixed bounded V must not be applied to the recurrent tilted model merely because each individual J is bounded: its accumulated \(\Sigma\), and therefore its total value support, are unbounded.

For a purely flat-ending objective there is also a very conservative unbounded-price construction: fix an anchor c and set all-in ask \(\max(p_+,c)\), bid \(\min(p_-,c)\). Each purchase costs at least c and each sale returns at most c. Every cash loop loses or breaks even, from any state. It gives no marked-inventory guarantee for unbounded V and no conditional-mean interpretation for the all-in price.

### R3. A spread that covers private own-history valuations

A sharper repair can be specified without a uniform value bound. At each finite public history h retain the set

\[
\mathcal R(h)=\{\rho^I(h): I\text{ is a feasible assignment of past lots to U}\}.
\tag{41}
\]

Each \(\rho^I\) is the correct filter **omitting the likelihood multiplier of owned lots but retaining all elapsed exposure**. When intensities depend on public quotes, every branch uses the actual public quote path in its likelihood. It does not replay a different hypothetical quote path after deleting an event. Include all accounts in the assignment. For finite histories there are at most \(2^N\) ownership assignments before merging equivalent filters.

Let \(\underline m(h)\) and \(\overline m(h)\) be the minimum and maximum means in this set. For a current U lot its own execution conveys no additional fundamental information. Set

\[
A(h)=\max\{p_+(h),\overline m(h)\},\qquad
B(h)=\min\{p_-(h),\underline m(h)\}.
\tag{42}
\]

The dealer receives \(p_s\); the nonnegative difference to A or B is a mandatory exchange execution charge. Equivalently, these are robust all-in bid/ask prices.

**Theorem P8 — ownership-envelope repair.** Suppose the filters in (41) use the actual external feedback law and have finite first moments. With all-in quotes (42), every U strategy has nonpositive expected marked profit. This holds from every initialized history for which the true private posterior is included in \(\mathcal R(h)\), and against every coalition of the accounts included in that set.

**Proof.** U's actual ownership assignment is one of the branches, so \(\underline m\le m^U\le\overline m\). A buy has \(A-m^U\ge0\); a sale has \(m^U-B\ge0\). Thus every term \(d_i\) in (20) is nonnegative. Waiting, stopping, episode deaths and private randomization do not change the argument. ∎

This is a directly checkable version of policy-robust execution. It does **not** pretend that dealers know a secret policy. It prices enough friction to cover all feasible private valuations. For the prescribed E-C or tilted observation population it constructs a U–dealer equilibrium with \(U=0\). In bounded E-C it can also be implemented with the expiring informed opportunities just described: the all-in quotes remain in the value support, so the correct-side trade remains weakly profitable. A full optimizing-insider version of T still requires a separate solution for its external law. A fixed-point solution with E-P's fee-sensitive hazards is additional work, not furnished merely by (42).

**Attacks and shape.** All five requested strategic attack classes are excluded by the termwise inequality. Clearing the set when a wallet changes, retaining only one account's history, or forgetting possible pre-start controlled orders breaks the premise and can restore the original profits. The set must be initialized from the permitted ownership histories, not from a convenient fresh prior.

The spread often grows on a one-sided run: after buys the all-external interpretation can have a high value, while the all-U interpretation does not. The reversal must cover both. For a pure instantaneous buy run from a symmetric initial prior in the original monotone-likelihood models, the largest pre-fill branch mean is the all-external one. Hence the next ask remains the original \(p_+\); the opposite bid is clipped by the all-U branch. The original one-way steepening, including a Laplace burst's asymptotic increment b where well-defined, can survive on the ask. **The full reversible two-sided posterior-price contract does not.**

This is not a five- or eight-number filter in general. It is a set of filters, potentially growing exponentially with the number of observations. It is a useful existence construction and an explicit conservative implementation, not a claimed minimal sufficient state.

The guarantee is expected-profit safety, not deterministic all-state safety. Initialize this rule at the calibrated displaced state of (36), with no prior U orders. Its first sale pays the raw bid \(H(0,5)\), since this is below the private mean \(H(0,6)\). Before the return purchase, the largest ownership-branch mean is \(H(h,6)\), exactly the raw next-buy price. Thus both added fees are zero on that silent path, and the exact profit (36) survives. P8 excludes its positive **unconditional expectation**, with the waiting outcomes included.

### R4. A Fruth–Schöneborn–Urusov-style own-flow spread

The relevant principle is to widen the adverse side so that creating inventory cannot cheaply raise the price at which it is liquidated. The published no-manipulation result is for a particular two-sided limit-order-book model with its stated unaffected-price and impact assumptions; it is not a theorem that an arbitrary growing spread repairs an arbitrary posterior filter. [Fruth–Schöneborn–Urusov, Proposition 3.4](https://arxiv.org/pdf/1109.2631).

For these episode models, (42) is one explicit implementation with a proof. Another valid route is a two-sided execution potential satisfying O1 relative to the **correct U-filtration martingale**. Simply putting an FSU cost on top of a public mean that is biased by U's own history leaves an unproved baseline gain. A fee based only on an account's current order or a resetting rolling counter has no general safety theorem.

With a bounded fixed V, R2 supplies universal finite spread bounds, so it would be false to claim that *every* fixed spread fails. With unbounded value, no universal numerical spread follows from the word “Laplace”; the actual control value or an envelope bound must be established. The thresholds (24) say precisely which small extra spreads fail against the witnesses here.

### R5. Conservative updating: fund storage, not the current lot's mark

Here is a concrete mechanical contract that satisfies the intended funding idea. Let m be a correct conditional-value martingale in the trader's filtration. Track the tested coalition's position Q and a transient \(\phi\), with \(\Delta\phi=q\) on its trades and \(\dot\phi=-\beta\phi\) between trades. Let

\[
W(0)=0,\quad W\ge0,\qquad
T\text{ odd and increasing},\quad
V_T(\phi)=\int_0^\phi T(x)\,dx,\qquad
G(Q,\phi)=W(Q)+V_T(\phi).
\]

Charge

\[
c(q)=q\,m+[W(Q+q)-W(Q)]
     +[V_T(\phi+q)-V_T(\phi)]+\ell,\qquad \ell\ge0.
\tag{43}
\]

For continuous m the timing convention is immediate; for jumps, use its contemporaneous correct conditional mean at the chosen U lot. Right-endpoint execution of the increasing marginal curves is permitted by adding its remainder (23).

**Proposition P9.** From \(Q=\phi=0\), every finite strategy under (43) has nonpositive expected marked profit, with

\[
E\Pi_U=-E G(Q_T,\phi_T)
-E\int_0^T\beta\phi T(\phi)\,dt-E\sum\ell_i\le0.
\tag{44}
\]

Every deterministic full-state loop also has nonnegative excess execution cost.

**Proof.** Trades cost the storage increment; waits give \(\dot G=-\beta\phi T(\phi)\le0\). The m part has zero expected marked profit by the tower identity. Telescope. ∎

One may retain a separate shadow Bayesian episode filter to estimate an alarm, but the impact terms in (43) are an execution tariff. They are not the posterior inference induced by an authenticated uninformative order. Applying this construction to an anonymous raw episode mean requires proving that the chosen m is the correct private-filtration martingale or adding R3's valuation protection. Thus P9 is an implementable storage repair, not an undisclosed Bayesian equilibrium proof for the old mean.

Nor is P9 all-state inventory-loop safety. For an explicit endpoint example take \(W(Q)=Q^2/2\), \(T(x)=2x-\arctan x\), \(\phi_0=5,Q_0=0\), and no reference-price movement. Sell one; wait until \(\phi\) halves; buy one. The first transient endpoint is 4 and the second is 3. The permanent position curve costs 1 over the pair. Profit is exactly

\[
T(4)-T(3)-1=1+\arctan3-\arctan4>0.
\tag{45}
\]

The marginal transient slope increases from 1 to 2, so this example has a positive liquidity floor \(1/2\). The inherited storage finances the gain; the trader does not restore \(\phi\). A two-account implementation is safe from rest only when (43)'s relevant storage and the correct martingale premise cover the **combined** control, rather than declaring each wallet separately at rest while exposing it to another wallet's funded displacement.

Finally, clipping a posterior mean update to an arbitrary per-lot cap changes the inference rule and is not by itself (43). A valid cap must imply a supply inequality such as O1 or (44), including the credit to existing inventory and the terminal liquidation condition. The six-slot example disproves the weaker current-lot condition.

### Repair verdicts in one table

| Candidate | Does a U=0 construction exist here? | Resulting price | Alarm / steepening and limitation |
|---|---|---|---|
| Original exact E-C, E-P, T filters | **No at P2–P4's parameters** | Original posterior | Features do not save them; general parameter classification remains open |
| Add “U's deviation set” to beliefs but keep U=0 and the same supported law | **No repair**, P1 | Same posterior | Same profitable deviations |
| Publicly authenticated U | **Yes**, P6, for specified external populations | U pays its correct mean; anonymous flow keeps its own posterior quotes | U creates no alarm or impact; outside-flow features remain only to their original proved extent |
| Fixed support-based friction | **Yes** for bounded-value E-C; P7 gives universal safety bounds | Posterior dealer price plus exchange fee | Extra friction; not a pure all-in posterior; does not bound accumulated T value |
| Ownership-envelope spread | **Yes** for specified external laws, P8 | (42), with net posterior dealer price | Can preserve one-way shape; widened reverse side; potentially many filters |
| FSU name or an unspecified own-flow surcharge | **Not a specified game or proof** | Must be specified | Use an actual funding inequality; do not import the theorem without its hypotheses |
| Post-fill endpoint alone | **No**, P2–P4 and six-slot | Already the original contract | Positive lot correction does not fund time/retention changes |
| Storage-funded conservative update | **Yes as a tariff relative to correct m**, P9 | (43), not the old posterior rule | Can retain a steepening curve; from-rest/full-loop scope; (45) attacks displaced starts |
| Static reciprocal Poisson repair | **Yes**, P5, for prescribed external law | Exact all-in posterior (28), no extra fee | Local alarm and steepening; bounded saturation or unbounded logarithmic far field; no recurrent death-to-permanence |

“Yes for a specified external law” closes exactly the added U's optimization and dealer pricing. It does not solve a different game with unconstrained patient insiders unless their optimality is separately proved. “No at these parameters” is deliberately narrower than a universal impossibility theorem.

## P.9. Alarm, variance, and the exact point where the requested combination remains open

The phrase “variance alarm” needs a specified random variable. Posterior probability of an active episode, variance of its current jump, variance of the accumulated current fundamental, and variance of a fixed future payoff are different objects. Five T coordinates suffice for its mean quotes; eight suffice for the current fundamental's variance. Variance of a fixed future payoff additionally includes future-jump uncertainty and a horizon.

Three obstructions in these models are proved:

1. **Finite support:** a three-point V has bounded conditional means. It cannot supply a globally nonsaturating book with a strictly positive finite limiting price slope.
2. **Uniform variance decay:** (35) is a counterexample even in a simple exact filter. A sufficiently strong burst can make the value nearly certain; a silence can then increase uncertainty. The original “variance rises with flow, falls in silence” descriptions are local/qualitative, not global laws.
3. **The robust inactive-U fixed point:** once the \(U=0\) external law and exact supported quote contract are fixed, P1 leaves no freedom to retrofit different beliefs at the histories of P2–P4. One must change an information primitive, external strategy, execution cost, or contract.

For the **current** recurrent fundamental \(v_t=\Sigma_t+A_tJ_t\), the hidden generator has \(Lv_t=0\) but \(L(v_t^2)=\alpha j^2 1_{\rm quiet}\). Therefore

\[
\left.\frac{d}{dt}\operatorname{Var}(v_t\mid\mathcal H_t)\right|_{\rm no\ fill}
=\alpha j^2 P({\rm quiet}\mid\mathcal H_t)
-\operatorname{Cov}((v_t-m_t)^2,\Lambda_t\mid\mathcal H_t).
\tag{46}
\]

In a known quiet state with no prior value uncertainty, its initial derivative is positive. This does not contradict a posterior-martingale theorem: \(v_t\) is changing, and a fixed \(V_T\)'s conditional variance is a different quantity. Even for a fixed payoff, conditional variance is a supermartingale **in expectation**, not necessarily on every no-arrival path.

For Laplace jumps, the burst-only asymptotic linear price response in the original tilted model can be retained as a statistical feature. It does not establish a finite-dimensional filter, a global monotone-density floor, or U safety. The static reciprocal repair proves U safety but changes that tail behavior by (39). The envelope-fee repair can preserve the one-way burst curve but changes the all-in price and uses a much larger state. These are actual tradeoffs, not alternative descriptions of one unchanged rule.

The weakest remaining research claim is therefore an **open existence problem**, not a theorem of impossibility for all non-Gaussian games: find an anonymous recurrent-episode equilibrium with optimizing external informed behavior, a tractable private/public filter, global desired shape, and an O1 certificate. The sources and the counterexamples here do not settle that problem. Nor do they settle the best-response value for every calibration of the two original episode laws.

### Literature check and corrections to earlier claims

[Goldstein–Guembel, Proposition 1](https://finance.wharton.upenn.edu/~itayg/Files/manipulation-published.pdf) excludes an uninformed first-period opening trade in its no-feedback game. It is not a theorem that a strategic uninformed trader is inactive at every date under arbitrary posterior prices. Its discussion of later trading illustrates why private information about one's earlier action matters. There the agent could have been informed; footnote 9 distinguishes an agent who is always uninformed. Our separate U does not learn that other insiders are absent by abstaining: it creates a valuation difference by submitting orders it knows are artificial. The present counterexamples require no price feedback into fundamentals.

[Chakraborty–Yılmaz](https://www.sciencedirect.com/science/article/pii/S1386418103000429) studies strategic manipulation by an informed trader under uncertainty about insider presence. That result does not supply the missing own-history inequality for the separate U in this brief. Any wording in the local literature map deriving universal U safety merely from posterior-mean pricing should be read subject to O1.

[Fruth–Schöneborn–Urusov](https://arxiv.org/pdf/1109.2631) proves safety for its specified spread/impact dynamics and distinguishes displaced initial states in the zero-spread variant. P7–P9 state separately what can actually be imported into the episode problem.

The internal precedents remain useful with their quantifiers preserved: [F-attack](F-attack.md)'s six-slot example and missing exposure coordinate; [J-martingale](J-martingale.md)'s actual-law and terminal-fiber qualifications; [K-game K.3](K-game.md)'s distortion storage; [M-space M1–M6](M-space.md)'s steepening construction and Poisson closure obstruction; and [M4-SAFETY](M4-SAFETY.md)/[G-storage](G-storage.md)'s distinction between rest, closed state loops, and inherited displacement.

## Q. One page for the operator

**There is no proved solution here satisfying all of: anonymous recurrent episodes, the unchanged exact all-in posterior price, U optimally inactive, and a globally steepening nonsaturating book with a finite positive liquidity floor.** This is not a universal impossibility claim. What is proved is that the natural E and tilted filters fail the U fixed point at explicit positive parameter choices, including E's quote-responsive informed rates. Retaining their laws pins down the prices, so “include possible manipulation in beliefs” alone cannot repair them.

**Smallest fully proved Poisson closure supplied here:** fixed \(V\in\{0,\pm1\}\), sparse symmetric prior, external rates \(\epsilon e^{\pm cV}\), exact post-lot quotes (28), and strategic U. Its belief state is **two numbers**: signed count and elapsed exposure, or two posterior odds. U's own-history distortion is an exponential tilt by its aggregate inventory; the nonnegative log-moment storage (30) proves (32). It needs **no extra fee**, only the endogenous finite-lot bid/ask charge. It has a local burst/variance alarm and local steepening, followed by saturation. Replacing the prior by Laplace avoids saturation but gives a logarithmic far field, not the required finite liquidity-density floor.

**Safety of that game:** all admissible U deviations have nonpositive expected profit, from any calibrated starting belief, including displaced beliefs and multiple accounts. Its isolated execution map is safe from symmetric rest and on reachable full-state loops. It is **not** safe on every isolated inventory loop from a displaced state: (36) earns exactly \(104386245804/162979297675\). That is a silent-path gain, not a positive expected deviation in the continuing market.

**If recurrent episodes and their original one-way shape must remain:** the explicit safe implementation is a posterior dealer price plus the ownership-envelope execution fee (42). It protects against all the tested attack classes, including coalitions. E needs five numbers per filter; the three-point tilted model needs five for mean quotes or eight including current-value variance. The ownership uncertainty generally requires a **set** of such filters, and Laplace episodes require a density filter unless a new closure is proved. The cost is a spread covering competing own-history valuations; the reverse side can widen substantially. The all-in transaction price is then not purely the conditional mean. Authenticated U is cheaper computationally but gives U's own orders zero informational impact.

**Nearest existing result with the global shape:** combine [M-space's bounded-slope response](M-space.md) with [K-game K.2–K.3](K-game.md)'s strategic U proof. It has a non-Gaussian terminal value and two pricing coordinates, but Gaussian continuous order flow and a decaying information clock, rather than recurrent Poisson activity. It does not supply the episode alarm or justify resetting its clock.

**Decision:** accept an explicit ownership-based friction/information change, or keep the exact anonymous episode price as an unclosed research model. Still open are an endogenous recurrent-episode equilibrium with the required shape and U inequality, the full parameter classification of the present filters, and a small sufficient state for an efficient robust execution rule.
