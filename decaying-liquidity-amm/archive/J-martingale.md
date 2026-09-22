# Equilibrium, Bayesian prices, and money pumps

Research brief 3. The emphasis is the martingale theorem and the interpretation of Choice B. Prices and cash are discounted; buying has positive signed quantity; positive cost means payment to the maker. As in the local models, centered prices and payoffs may take real values. Positions have no common bound, but each deterministic schedule is finite. Stochastic strategies must satisfy the integrability conditions stated below.

## J. Martingale first

### J.1. The answer, with the quantifiers exposed

For the deterministic, reversible, integrated-execution AMMs in this directory, the exact theorem is

\[
\boxed{\text{No profitable inventory round trip from }x_0
\iff \text{a finite storage function with the correct terminal boundary exists}.}
\tag{J.1}
\]

The storage function may be nonsmooth and must include the trader's inventory if the market state does not already determine it. Reachability and the ability to liquidate are the hypotheses of Theorem J.3 below. Requiring a differentiable potential is an additional regularity requirement.

There is **no equivalent theorem obtained by replacing storage with “some full-support martingale model for transaction prices.”** An observational martingale model can describe a pumpable execution algorithm. Conversely, a conservative, non-pumpable algorithm need not admit a full-support martingale model for its transaction prices. Both counterexamples appear below.

The valid martingale implication is instead

\[
\boxed{\text{fair execution under the actual controlled law and relevant information}
\Longrightarrow \text{nonpositive expected round-trip profit}.}
\tag{J.2}
\]

The law and information must be appropriate to **each strategy being tested**. Equilibrium beliefs on the public tape, even correct beliefs assigning positive probability to the manipulator's equilibrium strategy, are a weaker requirement.

Three meanings of safety must remain separate:

| Notation | Starting and ending condition | Choice B |
|---|---|---|
| \(N(x_0)\), or \(N_0\) at rest | Trader starts flat at specified market state \(x_0\), ends flat; other state may change | Proved at \((P,\phi,F)=(0,0,F_0)\) |
| \(N_{\rm cyc}\) | Entire economically relevant market state and trader inventory are restored | Proved from every state |
| \(N_{\rm all}\) | \(N(x_0)\) for every market state, including displaced states | False for a genuinely decaying, spreadless executable price |

Here the trader's inventory is not necessarily the AMM's cumulative flow counter \(P\). In a single-controller experiment starting at \(P_0\), it is \(Q=P-P_0\). In a multiplayer game these variables generally differ.

For probability models, distinguish:

* \(B_{\rm obs}\): under one specified law, each executed price is the conditional mean of one integrable claim, given the public history including that fill.
* \(B_{\rm ctl}\): the corresponding conditional-mean identity holds under each controller's actual law, in information sufficient to measure its signed fills and their ownership. This is substantially stronger.
* Martingale domination: under each actual law there is a martingale benchmark and nonnegative execution losses. This suffices for safety without making transaction prices themselves posterior means.

“Full support” means positive conditional probabilities for feasible discrete continuations, or positive probabilities for neighborhoods of feasible finite histories in continuous size/time models. Exact Poisson timestamps and exact Gaussian paths ordinarily have probability zero. Full support never means that every individual real-valued history is an atom.

### J.2. What the martingale argument actually proves

**Theorem J.1 — controlled fair-pricing theorem.** Fix a trading policy, its actual probability law \(\mathbb Q\), and an increasing filtration \((\mathcal G_i)\). Include all relevant public observations, the trader's private randomization and knowledge of order ownership, and each fill when it occurs. Suppose there is one \(Z\in L^1(\mathbb Q)\) such that

\[
m_i=E_{\mathbb Q}[Z\mid\mathcal G_i],\qquad
c_i=q_i m_i+\ell_i,\qquad \ell_i\ge0,
\tag{J.3}
\]

where \(q_i\) is \(\mathcal G_i\)-measurable. Suppose \(\sum_iq_i=0\), and all products and sums used below are integrable. Then

\[
E_{\mathbb Q}[\Pi]=-E_{\mathbb Q}\sum_i\ell_i\le0.
\tag{J.4}
\]

Consequently, if these assumptions hold for every admissible policy from a specified initial history, no such policy has nonnegative profit almost surely and positive profit with positive probability. In particular, no deterministic positive-profit loop exists in an experiment governed by these assumptions.

**Proof.** Conditional expectation gives

\[
E_{\mathbb Q}[q_i(Z-m_i)]=0.
\]

Sum, use \(Z\sum_iq_i=0\), and subtract execution losses. Equivalently, with \(Q_i=\sum_{j\le i}q_j\), discrete integration by parts gives

\[
\Pi=\sum_i Q_{i-1}(m_i-m_{i-1})-\sum_i\ell_i.
\tag{J.5}
\]

The first term has expectation zero. A positive integrable gain cannot have nonpositive expectation. The same calculation can be conditioned on the starting history. ∎

This is [F-attack.md, Theorem 2](F-attack.md), [E-model.md, Theorem 5](E-model.md), and [G-storage.md, Theorem 7](G-storage.md), with the quantifiers and ownership information made explicit. No uniform inventory cap is needed. A deterministic finite bound on the number and size of trades of the *particular* strategy suffices with appropriate integrability of the claim. Random stopping requires an actual optional-sampling justification; a local martingale alone does not establish zero expected profit. Under the usual lower-bound admissibility, a supermartingale argument supplies the nonpositive version.

Several consequences are easy to miss.

1. **Full support is not used in this proof.** It helps extend an on-support condition to reachable histories, with continuity where necessary. It does not substitute for the actual-law condition.
2. **The benchmark need not be fundamental value.** Any integrable claim works. The important fact is the same claim and law at all fills, not the economic name assigned to it.
3. **Maker break-even across anonymous orders does not imply the identity for a selected trader.** The indicator that an order belongs to that trader must also be measurable in the conditioning information, or be conditionally mean-independent of value. A trader can lack a private value signal and still know more than the dealer about which observations are artificial.
4. **A post-fill posterior is not a block's integrated cost.** If \(m(q)=kq\), charging an entire block at its endpoint costs \(kq^2\); integrating the marginal curve costs \(kq^2/2\). They are different contracts. Bayesian pricing must be established for the actual execution event at each unit, including whether that unit is reached.

A posted ask can already condition on the event “a buy executes”; it is not thereby a stale quote. This distinction is central to [Glosten–Milgrom (1985)](https://business.columbia.edu/faculty/research/bid-ask-and-transaction-prices-specialist-market-heterogeneously-informed-traders) and to the discrete/continuous comparison in [Back–Baruch (2004)](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1468-0262.2004.00497.x).

There is a precise likelihood test for the policy issue. If \(\mathbb Q\ll\mathbb P\), with terminal likelihood ratio \(L\), then

\[
E_{\mathbb Q}[Z\mid\mathcal H]
=\frac{E_{\mathbb P}[LZ\mid\mathcal H]}{E_{\mathbb P}[L\mid\mathcal H]}.
\tag{J.6}
\]

The original posterior remains valid exactly when

\[
E_{\mathbb P}[L(Z-E_{\mathbb P}[Z\mid\mathcal H])\mid\mathcal H]=0.
\tag{J.7}
\]

Equivalence of measures or positive likelihoods does not imply (J.7). Similarly, enlargement from dealer information \(\mathcal H_i\) to trader information \(\mathcal G_i\) requires \(E[Z\mid\mathcal G_i]=E[Z\mid\mathcal H_i]\) for this claim. A martingale need not remain a martingale after an information enlargement.

**Counterexample J.1 — full-support Bayesian fills can be pumped.** Use F-attack.md's six-slot example. Let \(Z=\pm1\) with equal probabilities. In slots 2 and 5, a sign agrees with \(Z\) with probability \(3/4\); in the other slots it is an independent fair coin. Conditional on \(Z\), signs are independent. Every finite sign history has positive probability. At every slot execute at the exact posterior after its sign.

| Slot | Controlled sign | Reference-model fill price | Signed cash cost |
|---|---:|---:|---:|
| 1 | +1 | 0 | 0 |
| 2 | +1 | 1/2 | 1/2 |
| 3 | −1 | 1/2 | −1/2 |
| 4 | −1 | 1/2 | −1/2 |
| 5 | −1 | 0 | 0 |
| 6 | +1 | 0 | 0 |

The controlled sequence is flat, restores the posterior and calendar phase, and earns \(1/2\). Its probability in the reference experiment is \(3/256\). Under the intervention forcing those signs, they contain no information about \(Z\). The reference posterior martingale is not a martingale under the intervention. This refutes even \(B_{\rm obs}+\text{full support}\Rightarrow N_{\rm cyc}\).

The homogeneous Poisson example preceding F-attack.md's Theorem 2 makes the same point without a special calendar: its 108-buy/108-sell schedule restores the complete three-point posterior, uses strictly positive finite waits, and has analytically proved profit greater than 56. Both examples already use fill-inclusive prices. Changing from pre-trade to post-trade pricing cannot fix their policy mismatch.

The six-slot example has discrete execution. It is not being passed off as a reversible continuous supply curve. The general failed Bayesian implication concerns transaction mechanisms; within the narrower integrated-execution class the relevant exact theorem is J.3, and the distinction between marginal and block martingales is addressed in J.6.

### J.3. The actual fundamental theorem for a price tree

There *is* an elementary martingale-measure theorem, but it solves a different problem.

**Theorem J.2 — full-support martingale representation on a finite tree.** At a node with current price \(p\), let possible next transaction prices be \(p_1,\ldots,p_k\). A strictly positive transition probability vector making the price a martingale exists exactly when

\[
p\in\operatorname{ri}\operatorname{conv}\{p_1,\ldots,p_k\}.
\tag{J.8}
\]

For scalar prices, this means \(\min_jp_j<p<\max_jp_j\), unless all children have the same price \(p\). On a finite tree a full-support martingale measure exists exactly when this condition holds at every nonterminal node. Then the terminal price itself is a claim whose conditional expectations are the node prices.

**Proof.** The martingale equation is \(p=\sum_j\pi_jp_j\), with every \(\pi_j>0\) and \(\sum_j\pi_j=1\). Such convex combinations are exactly the relative interior of the convex hull. Choose one such vector at each node and multiply along paths. Backward conditioning identifies each price with the conditional mean of the terminal price. ∎

This condition concerns possible **price continuations**, not signs of **cash costs on inventory loops**. It does not turn the order-generating law into a trader's controlled law. On infinite horizons, local choices of probabilities also need integrability and, for a single terminal-claim representation, uniform integrability.

**Counterexample J.2 — non-pumpability need not admit even an observational martingale of fills.** Let the sole state be cumulative quantity \(P\), with no waiting dynamics, and let

\[
R(P)=1+(P-1)_+^3,\qquad
H(P)=P+\frac14(P-1)_+^4,
\qquad c(P,q)=H(P+q)-H(P).
\tag{J.9}
\]

Every inventory round trip has exactly zero cost, from every state and with arbitrary positions. All marginal and block-average transaction prices are at least 1. Starting at \(P=0\), a first positive fill smaller than \(1/2\) has price exactly 1; this is an open set of marks and has positive probability under full support. From every resulting state, an open set of sufficiently large next buys has block-average price strictly above 1. Thus the next transaction price is always at least 1 and is strictly larger with positive conditional probability. It cannot have conditional mean 1. A nonnegative martingale that reaches its lower bound must stay there.

This is a one-dimensional, smooth-enough, monotone supply curve with reversible integrated costs. The plateau is deliberate. Strict two-sided unbounded price ranges permit artificial observational constructions such as Theorem J.5 below; they do not restore the implication in the other direction.

### J.4. The exact deterministic theorem

Augment the economic state by the controller's inventory: \(z=(x,Q)\). A signed fill acts as

\[
T_q(x,Q)=(\Phi_qx,Q+q),\qquad
c(x,q)=\int_0^q R(\Phi_ux)\,du.
\tag{J.10}
\]

The trade flow is reversible, \(\Phi_{-q}\Phi_qx=x\), and reverse cost is the negative of forward cost. Waits \(W_t\) leave \(Q\) unchanged and have zero cash cost. Let \(o=(x_0,0)\), let \(\mathcal R\) be all states reachable from \(o\) by finite admissible paths, and let \(\mathcal A=\{z\in\mathcal R:Q=0\}\). Assume every \(z\in\mathcal R\) has a finite-cost continuation into \(\mathcal A\); unrestricted immediate liquidation is sufficient.

**Theorem J.3 — deterministic fundamental theorem with the liquidation boundary.** The following are equivalent:

1. Every finite path from \(o\) into \(\mathcal A\) has nonnegative cash cost.
2. There is a finite-valued function \(G:\mathcal R\to\mathbb R\) satisfying

\[
\begin{aligned}
G(o)&=0,& G(z)&\ge0&& (z\in\mathcal A),\\
G(T_qz)-G(z)&=c(x,q),& G(W_tz)&\le G(z).
\end{aligned}
\tag{J.11}
\]

When these conditions hold, a canonical choice is

\[
G_*(z)=\inf_{\gamma:o\rightsquigarrow z} C(\gamma).
\tag{J.12}
\]

Every certified path satisfies

\[
C(\gamma)=G(z_e)-G(o)+
\sum_{\text{waits}}[G(z^-)-G(z^+)].
\tag{J.13}
\]

**Proof.** The implication 2 ⇒ 1 is the storage accounting identity of G-storage.md, Theorem 1: telescope the trade equalities and insert the changes during waits.

For the converse, reachability supplies a finite upper bound on \(G_*(z)\). Fix a finite-cost liquidation continuation \(\eta_z:z\rightsquigarrow\mathcal A\). Every incoming path \(\gamma\) obeys \(C(\gamma)+C(\eta_z)\ge0\), so \(G_*(z)\ge-C(\eta_z)>-\infty\). Appending an edge of cost \(c\) gives \(G_*(z')\le G_*(z)+c\). A reverse trade supplies the reverse inequality, hence equality for trades; a zero-cost wait gives nonincrease. Every path ending flat has nonnegative cost, so \(G_*\ge0\) on \(\mathcal A\), and the empty path gives \(G_*(o)=0\). ∎

This extends [G-storage.md, Theorem 3](G-storage.md) from strongly connected full-state cycles to the initial-state/flat-terminal question actually asked here. Return to the same market state is unnecessary: a finite liquidation continuation is enough to bound the shortest-path cost. No compact state space, inventory cap, smoothness, or optimizer attaining the infimum was used.

If only full-state cycles are excluded, the shortest-path proof works on strongly connected components, as in that theorem. Without return paths or finite lower bounds, absence of negative cycles alone need not yield a finite global potential. For example, infinitely many increasingly negative paths from one vertex to another with no return path contain no cycles at all.

For smooth vector fields \(b\) for trades and \(w\) for waits, a differentiable certificate obeys

\[
b\cdot\nabla G=R,\qquad w\cdot\nabla G\le0,
\tag{J.14}
\]

together with the boundary in (J.11). Smooth solvability is equivalent to a smooth certificate, not automatically to bare non-pumpability. With spreads or irreversible fills, equality becomes the edge inequality \(G(z')-G(z)\le c(z,z')\); its telescoping proof still works.

The existing model classifications are applications, not premises to redo: [M4-SAFETY.md, Theorem 2](M4-SAFETY.md) proves M0; Theorem 3 gives the uncapped nonlinear-absorption obstruction; Theorem 4 gives the sharp capped M2 condition under its hypotheses; Theorem 5 proves M3; Theorems 6–7 characterize original M4; Theorem 8 changes the relaxation target. Their terminal-state conventions are part of each result.

**Proposition J.4 — why the initial state matters.** Under the local differentiability and two-sided, spreadless execution assumptions of G-storage.md, Theorem 2, if \(R(W_tx)\ne R(x)\), then \(N(x)\) fails for a trader initially flat at that market state.

**Proof.** Trade \(\varepsilon\), wait \(t\), and reverse. Its cost is

\[
\varepsilon[R(x)-R(W_tx)]+O(\varepsilon^2).
\]

One sign of sufficiently small \(\varepsilon\) makes this negative. ∎

Consequently, a genuine deterministic decay of an executable spreadless quote rules out \(N_{\rm all}\), regardless of state dimension. A trader can harvest displacement previously paid for by somebody else. This does not refute \(N_0\) or \(N_{\rm cyc}\). In a stochastic market, a quiet interval is only one possible future: this deterministic calculation is not automatically a sure-profit strategy against an external random tape.

### J.5. Choice B: storage, terminal credit, and economic value

Use the notation of [G-storage.md, Choice B and Theorem 5](G-storage.md): \(0<a<b\), \(d=b-a\), \(L,\tau>0\), \(s\ge0\), and

\[
\begin{aligned}
T(x)&=\operatorname{sgn}(x)[b|x|-dL\log(1+|x|/L)],\\
h(x)&=b-d\frac{\arctan\sqrt{|x|/L}}{\sqrt{|x|/L}},\qquad h(0)=a,\\
V'&=T,\qquad A'=h,\qquad B'=A,
\qquad T(x)+A(x)=2xh(x).
\end{aligned}
\tag{J.15}
\]

All primitives vanish at zero. Fills and waits are

\[
\begin{aligned}
dP=d\phi&=dq,&dF&=[s+h(\phi)]dq,&R&=F+T(\phi),\\
\dot P=\dot F&=0,&\dot\phi&=-(\phi-P/2)/\tau.
\end{aligned}
\tag{J.16}
\]

Its explicit certificate is

\[
G(P,\phi,F)=PF-\frac{s}{2}P^2+V(\phi)+B(\phi)-PA(\phi).
\tag{J.17}
\]

We use, rather than reprove, G-storage.md's identities

\[
dG=R\,dq\quad\text{on fills},\qquad
\dot G=-\frac{2h(\phi)}\tau(\phi-P/2)^2\quad\text{on waits}.
\tag{J.18}
\]

From rest to any \(P_e=0\),

\[
C=V(\phi_e)+B(\phi_e)+
\frac2\tau\int_{\rm waits}h(\phi)(\phi-P/2)^2dt\ge0.
\tag{J.19}
\]

This proves \(N_0\) with unbounded positions. Every full-state loop costs only dissipation. From an arbitrary displaced initial state there is instead a potentially negative storage boundary; Proposition J.4 applies.

The quantity that decays to zero is \(y=\phi-P/2\). Its fill increment is \(dy=dq/2\), while the gain depends on \(\phi=y+P/2\), not on \(y\) alone. After a buy \(q\) from rest and a long wait, the price tends to

\[
F_0+sq+A(q)+T(q/2).
\tag{J.20}
\]

Thus \(F\) is not even the mechanism's settled quote; renaming it “fundamental value” does not establish a posterior interpretation. The actual fill slope lies in

\[
s+2a\le \frac{dR}{dq}=s+h(\phi)+T'(\phi)<s+2b,
\tag{J.21}
\]

and tends to \(s+2b\) far out. Its liquidity density consequently has the positive floor \(1/(s+2b)\).

**What is \(G\) the value of?** There are three precise answers, only two of which are value functions without further work.

First, the canonical \(G_*\) in (J.12) is a *minimum cash expenditure to reach a state from the specified initial state*. It is a deterministic control value. The explicit formula (J.17) is a storage certificate; the theorem does not establish that it equals \(G_*\). Every normalized certificate satisfies \(G(z)\le G_*(z)\), because every incoming path costs its endpoint storage plus nonnegative dissipation. Equality needs an attainability or vanishing-dissipation argument.

Second, define maximum extractable cash before becoming flat by

\[
\mathcal E(z)=\sup_{\gamma:z\rightsquigarrow\mathcal A}[-C(\gamma)].
\tag{J.22}
\]

On the reachable domain of an \(N_0\) mechanism, this is finite: otherwise a fixed path from rest to \(z\), followed by a sufficiently profitable continuation, would pump from rest. For Choice B, measured relative to its original flat fiber,

\[
\mathcal E(z)=G(z)-\inf_{\gamma:z\rightsquigarrow\mathcal A}
\left\{V(\phi_e)+B(\phi_e)+D(\gamma)\right\}\le G(z).
\tag{J.23}
\]

So \(G\) is an upper bound on recoverable cash, not automatically a liquidation value. At rest, \(\mathcal E=G=0\). At other states the residual terminal energy and unavoidable dissipation must be optimized. Claiming equality everywhere would be an additional theorem.

Third, with an artificial terminal credit equal to \(G\),

\[
G(z)=\sup_{\gamma\text{ finite}}
\{G(z_e)-C(\gamma)\}.
\tag{J.24}
\]

The storage identity proves the upper bound and the empty path attains it. This is an exact Bellman identity for *cash plus storage credit*, but it has chosen the terminal payoff to be the certificate. It is not a derivation of fundamental value or dealer utility.

If the trader's cash is \(K=-C\), then pathwise

\[
K_t+G(z_t)=G(z_0)-D_t.
\tag{J.25}
\]

Under any randomization with the required integrability, cash plus storage is a supermartingale; cash plus storage plus cumulative dissipation is constant. This is the natural probabilistic reading of Choice B. It prices the *nonlinear controlled account*, not the next unit of an exogenous security.

### J.6. Can Choice B's prices nevertheless be conditional expectations?

**Yes under an artificial observational experiment; no under the stronger interpretations that would certify it as the requested fair-pricing mechanism.** The execution resolution matters. The following construction preserves Choice B's actual total block payments, rather than quietly replacing them by endpoint pricing.

**Theorem J.5 — a full-support martingale embedding of Choice B's block-average fills.** There exists a law for successive waits and signed block sizes, an enlarged state, and one square-integrable random variable \(Z\), such that every block's average transaction price is \(E[Z\mid\mathcal H_n]\) after observing that block. Every finite sequence of finite waits and sizes lies in the support of this law. This construction does not establish a posterior at every intermediate marginal unit.

**Proof.** For a state \(x\), define the actual average execution price

\[
\bar p_x(q)=\frac{c(x,q)}q
=\int_0^1R(\Phi_{uq}x)\,du,
\quad \bar p_x(0)=R(x).
\tag{J.26}
\]

Let \(k_-=s+2a>0\), \(k_+=s+2b\). By (J.21),

\[
\frac{k_-}{2}\le\partial_q\bar p_x(q)\le\frac{k_+}{2}.
\tag{J.27}
\]

Thus \(\bar p_x\) is continuous, strictly increasing, onto \(\mathbb R\), and globally Lipschitz with a uniform constant. Store the last block-average price \(m\) and a fill counter \(n\), in addition to \(x\). Initially choose \(m_0=R(x_0)\). Draw an independent exponential waiting time and update \(x\) by Choice B's exact wait map. At the next fill draw

\[
q=\mu(x,m,n)+\sigma_n\xi,
\qquad \xi\sim N(0,1),\qquad \sigma_n=2^{-n},
\tag{J.28}
\]

where \(\mu\) is the unique solution of

\[
E[\bar p_x(\mu+\sigma_n\xi)]=m.
\tag{J.29}
\]

Existence and uniqueness follow from (J.27): the left side is continuous, strictly increasing, and onto. Execute the original block, including its live fair update, and set \(m_n=\bar p_x(q)\). Conditional on the wait and all previous observations, its mean is \(m_{n-1}\). Hence \((m_n)\) is a martingale. Nonzero Gaussian variance and positive waiting-time density give full conditional support on all finite size/wait neighborhoods.

Moreover,

\[
\operatorname{Var}(m_n\mid\mathcal H_{n-1},\text{wait})
\le \frac{k_+^2}{4}\sigma_n^2.
\tag{J.30}
\]

Indeed, bound variance by mean-square distance from \(\bar p_x(\mu)\) and use the Lipschitz bound. Consequently \(\sup_n E[m_n^2]<\infty\), so \(m_n\) converges in \(L^2\) to a single \(Z\) and \(m_n=E[Z\mid\mathcal H_n]\). Finite-step state and cash moments follow by induction from the linear growth of the fill/wait maps and the bound on \(\mu\) supplied by (J.27). Independent exponential waits prevent explosion. Observing a partial wait does not change the conditional mean of the eventual claim: (J.29) holds for every elapsed wait state. ∎

The construction has no optimization by informed traders, no identified economic dividend, and no policy invariance. Its claim is the limit of prices under a law engineered to make those prices fair. At a finite horizon one can instead use the terminal last-fill price. The abstract joint law can even be disintegrated by first drawing \(Z\), then drawing flow conditional on \(Z\); calling that latent variable an “asset value” adds no equilibrium content.

This result is intentionally stronger than the tautology \(E[p_n\mid\mathcal H_n]=p_n\): **one fixed claim** works for all \(n\). It is intentionally weaker than the brief's unit-by-unit Bayesian requirement: the block payment is right, but its deterministic internal marginal-price walk has not been made a posterior process. The extra stored \(m,n\) affect the artificial flow law, not Choice B's quotes or state transitions.

The same construction works for any execution rule satisfying (J.27), whether or not it has a safe storage certificate. Thus observational block-price martingales cannot be the sought fundamental theorem even inside a broad class of deterministic integrated-execution mechanisms. For example, linear M1 with absorption fraction \(\rho>1\) has uniformly positive within-fill slope and is pumpable by M4-SAFETY.md, §3.1; it also admits this construction.

There is a separate, equally artificial way to martingalize the *current marginal quote*. Let random lots \(\pm u\) arrive with state-dependent rates \(r_\pm(x)>0\). Write

\[
\delta_\pm(x)=R(\Phi_{\pm u}x)-R(x),\qquad
a_R(x)=-T'(\phi)(\phi-P/2)/\tau.
\]

Here \(\delta_+>0>\delta_-\). Choose positive rates satisfying

\[
a_R+r_+\delta_++r_-\delta_-=0.
\tag{J.31}
\]

One explicit choice starts with any \(\kappa>0\), puts \(v=a_R+\kappa(\delta_++\delta_-)\), and sets

\[
r_+=\kappa+\frac{(-v)_+}{\delta_+},\qquad
r_-=\kappa+\frac{v_+}{-\delta_-}.
\]

These rates grow at most linearly in \((P,\phi)\). Standard localization, followed by the resulting finite-horizon second-moment bound, makes \(R(X_t)\) a true martingale on finite horizons. It is then the conditional mean of \(R(X_T)\). Its no-arrival drift is compensated by possible price jumps; a martingale *can* move deterministically during a quiet interval. This law has full support on the chosen lot grid and finite waiting-time windows. But \(R(\Phi_qx)\) is the **endpoint quote**, not the average price charged by Choice B. This embedding does not price its cash flows.

**Proposition J.6 — two genuine obstructions.**

**(a) Intervention obstruction.** Suppose the controller is the only source of observed orders, has no information about a fixed exogenous payoff beyond the initial public history, and can submit a prescribed deterministic sequence. Suppose waits reveal no additional exogenous signal. Under that policy the order observations reveal no new information about the payoff. Its posterior is constant. Therefore any nonconstant own-order response, including Choice B's, cannot satisfy exact \(B_{\rm ctl}\) for every such policy. Enlarging the state with records of these same uninformative actions does not change the conclusion.

**(b) Continuously resolved marginal-price obstruction.** Suppose all within-fill marginal prices, and the connecting no-fill quote process, are required to be the conditional expectations of one claim. Suppose those observations resolve the original finite fills and smooth waits into a continuous, locally finite-variation price path. Such a price cannot be a nonconstant local martingale.

**Proof.** Part (a) is conditional independence. For (b), a continuous finite-variation process has zero quadratic variation; a continuous local martingale with zero quadratic variation is constant. Choice B has strictly positive within-fill derivative (J.21), contradicting constancy on nontrivial fills. ∎

Part (b) does not prohibit jump posterior models: their jumps can compensate no-arrival drift. Nor does it prohibit diffusion observations with nonzero quadratic variation, as in Kyle–Back. It prohibits claiming a continuous finite-variation marginal walk is itself a martingale without specifying additional revelation or a different execution limit. Revealing a complete block size before its deterministic internal walk gives an even simpler conditional version: its future internal prices are already known and cannot change as a martingale.

These distinctions correct two overbroad readings of the supplied material:

* [F-attack.md, Theorem 4](F-attack.md) rules out the retracing state \((\phi,P,F)\) as a sufficient continuous pricing state for the specified episode model. A buy–sell pair changes activity beliefs while the AMM retraces. It does **not** rule out every conceivable joint probability law or every enlarged state.
* “Choice B is not a posterior of any asset-value model” is justified for the policy-robust, exogenous-value interpretation above, or for the specified incompatible filtering models. Without those qualifications it is too strong. Theorem J.5 supplies a nontrivial observational block-price representation, while Proposition J.6 explains why that does not supply the desired marginal execution or economic interpretation.

### J.7. What the finance literature's fundamental theorems do and do not say

The objects that must be martingales differ across the cited theories.

| Framework | Relevant no-arbitrage/martingale statement | Relation to this AMM |
|---|---|---|
| [Çetin–Jarrow–Protter (2004)](https://stats.lse.ac.uk/cetin/files/fs123.pdf) | Theorem 3.1 uses an equivalent local-martingale measure for the *zero-size* price \(S(t,0)\). Theorem 3.2 / Appendix Theorem A.2 gives the NFLVR equivalence under their assumptions, including the stated hypothesis on the fictitious frictionless economy. | The exogenous supply curve is independent of the trader's past actions. It does not require each nonzero-size execution price to be a martingale, and does not cover arbitrary persistent controlled state. |
| [Roch–Soner (2013)](https://soner.princeton.edu/sites/g/files/toruqf4216/files/soner/files/76-soner-roch.pdf) | Theorem 4.2 gives sufficient no-arbitrage conditions: their efficient price is a local martingale and their depth/resilience quantity \(\Lambda^2/m\) is a supermartingale under the same equivalent measure. Theorem 5.1 martingalizes a *liquidity-adjusted* price along an optimizer. | Resilience needs its own accounting conditions. This is not an iff for martingales of all actual fills. |
| [Bank–Kramkov (2015)](https://arxiv.org/abs/1110.3229) | Competitive makers preserve expected utility through market indifference prices and Pareto reallocation; the continuous model evolves their utility state. | Competition with risk aversion is not zero expected monetary profit and does not imply a physical-measure posterior mean. This is not a general resilience extension or a universal storage/martingale equivalence. |
| [Huberman–Stanzl (2004)](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1468-0262.2004.00531.x) | Within their impact specification, excluding quasi-arbitrage restricts permanent trade impact to be linear. | Their functional form and scaling matter. A nonlinear conservative live-position charge \(S(P)\) is safe by M4-SAFETY.md, Theorem 5. |
| [Gatheral (2010)](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1292353) | No negative expected round-trip cost restricts impact and its decay kernel; in the specified propagator model exponential decay permits only linear instantaneous impact. | This is not a prohibition of every nonlinear resilient state-dependent book. M0 and Choice B have different nonlinear state/accounting structure. |

For example, a nonlinear curve applied to a decaying flow state, \(T(\int_0^t e^{-\rho(t-s)}dq_s)\), is not the rate-impact propagator \(\int_0^t e^{-\rho(t-s)}f(\dot q_s)ds\). Exponential decay of a state does not imply exponential decay of its nonlinear price response. This is why the local nonlinear storage examples do not contradict the propagator restriction.

An equivalent *pricing* measure also differs from a Bayesian conditional expectation under the actual common-prior law. It can exclude arbitrage without saying that every uninformed strategy has nonpositive expected profit under the physical law; risk premia can remain.

Classical NFLVR requires a probability space, an admissible self-financing wealth class, a liquidation convention, and a closure/topology for limiting gains. These are absent from bare deterministic \(N_0\). If one restricts attention to this one deterministic experiment's finite flat cash outcomes, \(N_0\) already makes all those gains nonpositive, and a real-number limit cannot turn them positive. That elementary closure statement is not a stochastic FTAP.

Conversely, after adding exogenous randomness, excluding strictly positive profit on *every* path is weaker than excluding ordinary arbitrage. A frictionless price starting at 1 and ending at either 1 or 2 admits a nonnegative gain with positive probability, while its unchanged-price path prevents a strictly positive sure gain. One must not transfer the brief's deterministic definition unchanged into a stochastic model and call it NFLVR.

There is a useful common sufficient structure. Let \(M\) be an exogenous martingale in the controller's actual filtration, unaffected by its orders. Add mechanical execution with normalized storage \(g\) and dissipation \(D\). For a flat round trip,

\[
\Pi=\int Q_{t-}\,dM_t-g(z_T)-D_T,
\quad g(z_T)\ge0.
\tag{J.32}
\]

Under integrability/admissibility, expected profit is nonpositive. This joins a martingale valuation with storage-based execution costs. It does not make the mechanical premium a conditional mean of fundamental value.

The implication map is therefore:

\[
\begin{array}{c}
B_{\rm ctl}\text{ with actual-law, information, and admissibility hypotheses}
\ \Longrightarrow\ N,\\[2mm]
N(x_0)\ \Longleftrightarrow\ \text{finite storage + liquidation boundary},\\[2mm]
B_{\rm obs}+\text{full support}\ \not\Longrightarrow\ N,
\qquad N\ \not\Longrightarrow\ B_{\rm obs},\\[2mm]
\text{nonconstant deterministic spreadless wait price}\ \Longrightarrow\ \neg N_{\rm all}.
\end{array}
\tag{J.33}
\]

## K. Game first

### K.1. A solved minimal benchmark, and its exact scope

The list of suggested ingredients does not by itself specify a game or establish equilibrium existence. In particular, none of the episode filters in E or F is a solved persistent-manipulator equilibrium. A small continuous-time benchmark *can* be solved, including an optimizing uninformed controller and a nonlinear price. It separates lasting information from decaying execution impact. It is a stochastic market, not a deterministic AMM obtained by suppressing everybody else's future trades.

**Theorem K.1 — a nonlinear Kyle–Back benchmark with an uninformed strategic player.** Fix a horizon \(T\), \(\sigma>0\), and an increasing \(C^1\) function \(f\) with

\[
0<a\le f'(y)\le b<\infty.
\]

Let \(\Theta\sim N(0,\sigma^2T)\), independent of a Brownian motion \(B\), and let the asset pay \(V=f(\Theta)\). One risk-neutral informed trader knows \(\Theta\) and chooses admissible continuous finite-variation cumulative orders \(X\); noise supplies cumulative orders \(\sigma B_t\). An uninformed risk-neutral trader observes the public tape and its own actions and can take unrestricted admissible continuous finite-variation positions \(U\), with \(U_0=U_T=0\). Competitive risk-neutral makers observe total orders \(Y=X+U+\sigma B\). Set

\[
p(t,y)=E[f(y+\sigma\sqrt{T-t}\,Z)],\qquad Z\sim N(0,1),
\tag{K.1}
\]

and charge this live marginal price for the strategic players' continuous trading. The following strategies constitute an equilibrium in this specified class:

\[
dX_t=\frac{\Theta-Y_t}{T-t}\,dt,\qquad U\equiv0,
\qquad \text{maker price }p(t,Y_t).
\tag{K.2}
\]

Every admissible uninformed round trip has nonpositive expected profit against these strategies. There is no uniform bound on positions. The claim requires the stochastic integrals below to be true martingales, or the corresponding admissible localization; it does not include doubling schemes.

The noisy tape is understood with fill-inclusive auction-limit accounting. For a Brownian cumulative order process, cash paid at the post-fill price includes the quadratic-covariation term in addition to the Itô integral. Omitting that term would misstate dealer break-even. Strategic controls here have finite variation, so their execution costs are the ordinary Stieltjes integrals used in the proof.

**Proof of maker pricing and informed optimality.** With \(U=0\), \(Y\) is a Brownian bridge to the random endpoint \(\Theta\). Averaging over its Gaussian endpoint makes \(Y\) a Brownian motion of variance rate \(\sigma^2\) in its public filtration, and \(Y_T=\Theta\). Hence (K.1) is the fill-inclusive conditional mean of \(V\).

Choose a primitive \(\Psi\) with \(\Psi_y=p\) and \(\Psi_t+\sigma^2\Psi_{yy}/2=0\); an appropriate time-dependent additive constant supplies this normalization. For any admissible informed strategy, Itô's formula gives

\[
E[\text{informed profit}\mid\Theta]
=\Psi(0,0)+E[VY_T-\Psi(T,Y_T)\mid\Theta].
\tag{K.3}
\]

The omitted noise integrals have conditional mean zero. Since \(\Psi_y(T,y)=f(y)\), the strictly concave function \(Vy-\Psi(T,y)\) is maximized at \(y=\Theta\). Strategy (K.2) attains that endpoint and is optimal. Its bridge drift has finite total variation on a finite horizon almost surely.

**Proof for the uninformed controller.** Hold the informed player's feedback (K.2) fixed, as required when testing a unilateral deviation. Decompose

\[
Y_t=Y_t^0+A_t,\qquad
dA_t=dU_t-\frac{A_t}{T-t}\,dt,\qquad A_0=0.
\tag{K.4}
\]

Then \(Y^0\) is the same uncontrolled random bridge as above. The controller can reconstruct it from its own actions and the public tape. Its information adds only independent randomization to this Brownian public filtration. Thus

\[
m_t=p(t,Y_t^0)
\]

is its actual conditional-value martingale, even though the maker continues to charge \(p(t,Y_t^0+A_t)\).

Define the nonnegative convex remainder

\[
D(t,y,A)=\Psi(t,y+A)-\Psi(t,y)-A p(t,y).
\tag{K.5}
\]

Its derivative in \(A\) is \(p(t,y+A)-p(t,y)\); with \(A\) held fixed it satisfies the backward heat equation in \((t,y)\). Itô's formula therefore yields

\[
E\int_0^T[p(t,Y_t^0+A_t)-m_t]\,dU_t
=E D(T,Y_T^0,A_T)
+E\int_0^T\frac{A_t[p(t,Y_t^0+A_t)-p(t,Y_t^0)]}{T-t}\,dt
\ge0.
\tag{K.6}
\]

Both terms on the right are nonnegative by monotonicity/convexity. One may first work before \(T\), then take the admissible terminal limit. For these controls, \(A_T=0\). Trading the flat strategy against \(m\) has zero expected profit, so (K.6) proves that trading against the actual price has nonpositive expected profit. Abstention attains zero and is a best response. ∎

The underlying nonlinear pricing construction is in the tradition of [Back (1992)](https://academic.oup.com/rfs/article-abstract/5/3/387/1576252); the explicit control decomposition and cost argument above state the strategic-uninformed extension being used here. Admissible strategies and block conventions cannot be inferred from the word “Kyle”: [Çetin–Danilova (2021)](https://arxiv.org/abs/1812.07529) show why enlarging trading classes without checking optimality can invalidate purported equilibria.

This game has a lasting value martingale \(m\) and a transient control state \(A\). After a control order at \(s\), its contribution to \(A_t\) is \((T-t)/(T-s)\) times that order; in clock \(r=-\log(1-t/T)\), this is exponential decay. The maker needs only \((t,Y)\) for its equilibrium quote. The decomposition \((Y^0,A)\) is used to evaluate a deviating trader, not assumed observable to the maker.

It supplies \(E\), equilibrium \(B_{\rm obs}\), and no sure gain in the actual stochastic game. It does **not** supply literal zero-target EWMA dynamics for every anonymous fill, constant calendar-time exponential resilience, or a displacement-dependent permanent fair update. Nor does it prove the deterministic \(N_{\rm all}\) ruled out by J.4. Adding Poisson tickets, multiple insiders, and expiring signals changes the equilibrium problem; it is not a harmless relabeling of (K.2).

Full support here means Wiener support on continuous tape neighborhoods. Literal block jumps are not on the equilibrium tape. If one separately offers a deviating block the integrated marginal walk, the same cost proof extends: the exact jump in the convex remainder (K.5) supplies its execution cost. That is an execution-cost extension, not a deduction that such blocks have competitive posterior pricing. In the linear case \(p=\lambda y\), a buy \(q\) at \(s\) and sale \(q\) at \(t>s\) have expected impact cost \(\lambda q^2[1-(T-t)/(T-s)]\ge0\), providing a direct check of the sign in (K.6).

### K.2. Why competition plus a manipulator is not the general theorem

If a risk-neutral uninformed player's equilibrium payoff is proved to be zero, and every proposed AMM pump is an admissible unilateral deviation with the same positive cash payoff in the actual game, best response excludes the pump. This is the correct equilibrium corollary. Theorem J.1 or an execution-cost proof such as K.1 can establish the zero payoff. Alternatively, an explicit zero-rent condition can impose it, but that condition needs an economic argument.

Without it, Nash optimality says only

\[
\sup_U E[\Pi(U)]\ge E[\Pi(0)]=0;
\]

it does not put an upper bound of zero on the supremum. A profitable manipulation could be the equilibrium strategy. A repeatable full-state pump with unlimited repetition and no time/discount/interaction penalty would instead imply an infinite value and exclude a finite-value equilibrium. A single flat round trip need not have that repeatability.

Here is a fully specified finite example, strengthening the observational warning in F.

**Counterexample K.1 — correct equilibrium public beliefs and zero dealer profit can coexist with a profitable uninformed round trip.** Let \(V=\pm1\) equiprobably. With probability \(1-\theta\), run the six-slot reference population of Counterexample J.1. At slots 2 and 5, an independently selected one-shot informed trader is present with probability \(1/2\), otherwise a noise trader submits a fair sign. An informed ticket permits one unit bought, sold, or not traded. At the other slots noise submits a fair sign. This generates agreement probability \(3/4\) in the informative slots.

With probability \(\theta\), an uninformed strategic trader instead receives a private ticket giving it the choice between abstention and the six-order program \((+,+,-,-,-,+)\). Dealer identities are anonymous and the mode is independent of \(V\). Makers know the complete game and quote the exact posterior inclusive of each order. Noise gives full support to all six-sign strings, conditional on either value.

Along the strategic program the only nonzero prices are

\[
p_2=\frac{1-\theta}{2+6\theta},\qquad
p_3=\frac{1-\theta}{2+14\theta},\qquad
p_4=\frac{1-\theta}{2+30\theta}.
\tag{K.7}
\]

To verify this, under the reference population the likelihood pairs after these prefixes are respectively \((3/8,1/8)\), \((3/16,1/16)\), and \((3/32,1/32)\). The strategic program contributes equal likelihood \(\theta\) under both values. Bayes' rule gives (K.7). Slot 5 restores equal value likelihoods.

For \(\theta=1/100\), the strategic trader's certain cash profit is

\[
\frac{99}{214}+\frac{99}{230}-\frac{99}{206}>0.
\tag{K.8}
\]

It optimally accepts the program rather than abstaining. Each one-shot informed trader optimally buys at \(V=1\) and sells at \(V=-1\), since every finite-history quote is strictly between those values. Makers break even conditional on every anonymous fill. These strategies and beliefs are therefore an equilibrium of the specified ticket game. The manipulator knows its own mode; its conditional mean of \(V\) remains zero, unlike the dealer's public posterior. ∎

The ticket menu is finite and deliberately restricted; this is not an existence claim for the unrestricted anonymous game. It shows exactly why equilibrium, correct public beliefs about the manipulator, and competitive maker break-even do not alone establish the proposed nonpositive-profit theorem. Belief correctness under the equilibrium mixture is different from fairness conditional on a particular privately known type. [Allen–Gale (1992)](https://academic.oup.com/rfs/article-abstract/5/3/503/1576822) likewise demonstrates profitable uninformed manipulation in rational-expectations settings; profitability in that literature is not automatically a deterministic, repeatable AMM pump.

The other manipulation references address distinct questions. [Chakraborty–Yilmaz (2004), *Informed manipulation*](https://www.sciencedirect.com/science/article/pii/S0022053103001017), studies strategic concealment through temporarily loss-making informed trades under uncertainty about insider presence. [Jarrow (1992)](https://www.researchgate.net/profile/Robert-Jarrow/publication/227361702_Market_Manipulation_Bubbles_Corners_and_Short_Squeezes/links/0c960521281ee00885000000/Market-Manipulation-Bubbles-Corners-and-Short-Squeezes.pdf) analyzes riskless wealth creation by price-moving large traders and conditions excluding it. [Kyle–Viswanathan (2008)](https://people.duke.edu/~viswanat/PP-Article-Kyle_Vish_Manipulation_20080100_f.pdf) proposes economic criteria involving price accuracy and liquidity for classifying manipulation. None of these different meanings of manipulation can be substituted for the present flat-cash-loop definition.

The requested assumption-removal tests consequently have the following precise status:

| Assumption | What fails if it is omitted |
|---|---|
| Fill-inclusive execution | With state price \(aP\), charging an entire order at its stale starting quote lets a buy \(q\), then a sale \(q\), earn \(aq^2\). Live integration would cost zero on the pair. |
| Fair maker pricing / no subsidy | With known value \(m\), subsidized buy price \(m-\varepsilon\) and sell price \(m+\varepsilon\) yield \(2\varepsilon\) per unit round trip. Under risk neutrality, zero conditional monetary profit on each signed fill is exactly the posterior-mean equation, not an independent extra assumption. |
| Coverage of executable histories | An almost-sure posterior version may assign special subsidized quotes to unsupported deterministic timestamps; F-attack.md gives this example. Full support plus regularity prevents that particular defect. Full support is unnecessary once the actual-policy theorem holds on all admissible histories. |
| Actual-policy and trader-information consistency | J.1's six-slot pump, and the stronger equilibrium example K.1, exhibit the two distinct failures. Positive probabilities alone repair neither. |

Thus there cannot be four logically independent “drop one” necessity theorems: some assumptions are redundant or alternative ways to prove the same execution identity.

### K.3. The smallest marked-Poisson game specification and its belief state

For the proposed episode game, specify a permanent payoff, hidden active/inactive signals, at least two informed players if competition is intended, Poisson noise on each side, a persistent uninformed player with its own inventory and observations, and competitive risk-neutral makers. Specify lot sizes, trading opportunities, the horizon, terminal inventory treatment, and admissible deviations. Expiry must remove access to a signal, not erase a permanent payoff already generated by it. Holden–Subrahmanyam concerns competition over **long-lived** information and rapid revelation; it does not itself derive the required expiring-signal filter. [Holden–Subrahmanyam (1992)](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1540-6261.1992.tb03985.x).

Given equilibrium strategies, let \(z\) include the hidden payoff, episode state, and any unobserved inventories/types needed to predict those strategies. If \(\pi\) is its public posterior and \(\lambda_\pm(z;\pi)\) are total equilibrium arrival intensities, then

\[
p_\pm(\pi)=\frac{\pi(V\lambda_\pm)}{\pi(\lambda_\pm)},
\qquad
\pi^\pm(dz)=\frac{\lambda_\pm(z;\pi)\pi(dz)}{\pi(\lambda_\pm)}.
\tag{K.9}
\]

Silence uses the hidden-state generator and total intensity, exactly as in E-model.md, Theorem 1. For a persistent manipulator, its conditional strategy intensity and hidden state belong in these likelihoods. Solving (K.9) is filtering **conditional on strategies**; equilibrium also requires those strategies to be optimal against the resulting quotes. No theorem in the supplied files proves existence for this full game with unrestricted positions.

For four hidden states the posterior has three independent coordinates. This need not mean “more than three real numbers”; it means more information than the *particular retracing coordinates* \((\phi,P,F)\) retain. F-attack.md, Theorem 4, proves the mismatch: a buy–sell pair changes activity probability. Uncertain continuous jump sizes may require a posterior distribution, unless a closed finite-parameter filtering family is proved. Neither a scalar displacement nor the posterior mean alone generally predicts the next quote.

Publicly identifying the uninformed player's orders gives a solved consistency benchmark: exclude those orders from the information likelihood, trade them at the current posterior, and apply J.1. One-shot informed tickets on an external episode tape choose the profitable sign, as in the supplied models. This guarantees no positive expected gain for the tagged player without a cap, but a quiet-path deterministic replay of that stochastic tape remains a different experiment.

### K.4. Kyle–Obizhaeva–Wang (2018)

The paper is not a competitive zero-profit-maker model: it has overconfident strategic informed traders with exponential utility, and no separate noise traders or makers. Its equation (42) gives residual supply

\[
p=p_{0,n}+\lambda S_n+\kappa\dot S_n,\qquad\kappa>0.
\]

Its rate-dependent temporary impact disappears immediately when trading stops; exponential adjustment of signals and inventories is not the AMM's persistent exponentially decaying execution state. With the external intercept held constant, any absolutely continuous flat inventory path has mechanical cost

\[
\int(\lambda S+\kappa\dot S)\dot S\,dt
=\kappa\int\dot S^2dt\ge0.
\]

Thus that frozen-intercept mechanical component is not pumpable. In the actual stochastic equilibrium, a strictly wealth-improving admissible deviation contradicts optimality; predictable expected trading profits need not vanish under heterogeneous beliefs. Arbitrary instantaneous blocks are outside its smooth-trading execution technology. It provides neither the requested common-prior posterior theorem nor a proof for a transplanted AMM. [Kyle–Obizhaeva–Wang (2018), §§1, 4.2 and equation (42)](https://pages.nes.ru/aobizhaeva/KOW_smooth_trading.pdf).

## L. The modification

### L.1. What can be changed without claiming an unproved equilibrium

E-model.md and the four-model panel provide exact or approximate inference models and execution replays. They do not establish the full strategic equilibrium with a persistent optimizing uninformed trader posed in K.3. Consequently, a modification of their quote algorithm is not automatically a modification of a proved equilibrium. There is no universal ordering of “minimal”: changing a formula, an information set, an action set, and the population of players are different operations.

| Modification | Pricing rule / existence status | Uncapped safety |
|---|---|---|
| Add an anonymous persistent manipulator | Recompute the equilibrium likelihoods in (K.9), including its strategy and hidden inventory/type. Existence for the episode game remains unproved. | Addition alone is insufficient; Counterexample K.1 shows why positive equilibrium rents need not disappear. A zero-payoff best-response result or direct execution-cost proof is needed. |
| Make controlled orders identifiable and correctly treated as uninformed | Exclude them from the external information likelihood and execute at the resulting \(m_t\). The tagged benchmark in K.3 exists under its one-shot-ticket assumptions. | Yes for admissible expected-profit/sure-gain tests in that stochastic game, by J.1. It removes the controller's informational price impact. It does not justify freezing out future external events. |
| Require actual-policy fair pricing for every policy | Under each policy use its actual posterior and relevant trader information; in the isolated no-signal experiment the price is constant. | Yes by J.1. A single anonymous, nontrivial deterministic response map generally cannot meet this requirement; this is not merely a belief declaration. |
| Replace stale prices by fill-inclusive prices | Use side/size-conditioned prices such as (K.9), or a justified sequential marginal-revelation contract. The corresponding statistical filter exists; strategic existence is separate. | Removes the stale-block pump but not F's post-fill six-slot or Poisson pumps. In the constant-total-intensity binary special case, F-attack.md, Theorem 5, proves all finite lot-grid loops safe. |
| Add a nonnegative spread | Add \(\int\delta(x)\lvert dq\rvert\) to costs; quotes become ask/bid offsets. An arbitrary added spread is not a risk-neutral competitive zero-profit equilibrium unless costs or changed selection justify it. | A sufficiently tailored spread can help. A uniformly bounded spread cannot fix the uncapped held-inventory/holonomy constructions with inventory-independent cycle costs. No universal safe constant follows from Bayes. |
| Change zero-target decay to Choice B's \(\phi\to P/2\), with its matched \(h\) | Use (J.15)–(J.16), not a separately chosen gain. The deterministic rule exists in closed form; a fundamental-value equilibrium interpretation is not established. | Yes for \(N_0\) and \(N_{\rm cyc}\), with unbounded positions, by G-storage.md, Theorem 5. No for \(N_{\rm all}\). |
| Replace the displacement-only permanent gain by a constant | The fill-only fair becomes \(F_0+S(P)-S(0)+kP\), reducing to a conservative position charge plus a transient curve. Mechanical existence is immediate; Bayesian equilibrium is not implied. | Yes from rest, under the usual sign condition on the transient curve; G-storage.md, Theorem 4, and M4-SAFETY.md, Theorem 5. Timing-dependent permanence is relinquished. |
| Bound positions | Restrict the feasible game and re-solve its beliefs/strategies; clipping the old quote does not do this. | Not an uncapped result. For original M2 the specific sharp bound is \(\lambda C\le1\) under M4-SAFETY.md, Theorem 4's hypotheses. An arbitrary posterior filter has no such universal threshold. |

The bounded-spread claim follows directly from the existing holonomy proof. A zero-inventory cycle shifts the fair by \(\eta>0\); repeat it while holding \(H\), and restore the fair with reflected cycles after liquidation. Including bounded spread changes finite cycle cost from \(K\) to \(K_\delta\). The total cost still has the form

\[
C_N=A_{H,\delta}+N(2K_\delta-H\eta).
\tag{L.1}
\]

First choose a finite \(H\) making the coefficient negative, then a finite \(N\) covering entry/exit cost. A spread increasing with held inventory can change that argument; it is a materially different mechanism. See G-storage.md, Theorem 4, and E-model.md's discussion following Theorem 5.

### L.2. The proposed universal inverse theorem is false

**Theorem L.1 — storage does not imply Bayesian-game implementability.** Not every non-pumpable finite-dimensional AMM is the fill-inclusive posterior-mean rule of a game with full support on its executable histories. This fails before imposing strategic optimality or policy robustness.

**Proof.** Counterexample J.2 is a one-dimensional non-pumpable AMM from every state. Its nonnegative transaction prices, their attainable lower bound, and full support contradict the martingale property. Every posterior-mean price of one integrable claim must have that property. No choice of preferences or added hidden state repairs the contradiction while preserving the transaction map and support. ∎

For strictly two-sided unbounded price ranges, Choice B is the more economically relevant test. Theorem J.5 shows that its **block averages** can be embedded observationally. Proposition J.6 shows why that is not an implementation under every uninformed intervention, or a continuously resolved marginal posterior. A positive realization theorem would therefore have to specify an execution granularity, common prior, allowed private information, equilibrium notion, admissible policies, and whether consistency means equilibrium-mixture consistency or fairness under interventions. Without these choices “some game” is too permissive to carry the intended economic conclusion.

Without a support requirement, a no-trade game can leave arbitrary AMM behavior entirely off its equilibrium path. Such a vacuous implementation would not answer the operator's question. Requiring fairness under all uninformed interventions instead encounters J.6 even without a support assumption.

## M. The space

### M.1. What can be characterized exactly

For a regular finite-dimensional deterministic mechanism, the \(N_0\) part is exactly the storage/boundary feasibility problem of J.3. For a Bayesian Markov price rule, the information part requires a finite-dimensional family of beliefs \(\{\pi_\theta\}\) closed under both observation updates and no-arrival evolution, with execution prices equal to the appropriate means. For \(E\), the order likelihoods must be induced by optimal strategies and competitive clearing; a closed filter alone is not enough. The strategic safety argument must then work with the actual admissible deviations.

These are simultaneous functional, filtering, and incentive conditions. There is no general finite-state parametrization of their intersection in the supplied results or the cited theorems. “Finite-dimensional” should mean a regular sufficient state with specified update maps, not a pathological encoding of the entire past into one real number.

In the strictly deterministic, spreadless interpretation with safety from **every** state, the subset with an executable price that changes during waits is empty by J.4. In the narrower original architecture

\[
d\phi=dP=dq,\quad \phi\to0\text{ during waits},\quad
dF=[S'(P)+h(\phi)]dq,
\]

nonconstant continuous even \(h\) makes even \(N_0\) impossible with unbounded positions, by G-storage.md, Theorem 4 and F-attack.md, Theorem 1. Adding bookkeeping variables while leaving these response laws unchanged cannot help. These are the proved impossibility results; neither implies impossibility for every richer Bayesian state or every execution contract.

Binary Glosten–Milgrom supplies an exact finite-lot posterior rule with a direct pathwise loop proof in F-attack.md, Theorem 5, but its bounded payoff forces saturation. Adding a persistent anonymous manipulator requires checking whether those same likelihoods remain equilibrium likelihoods. Linear Gaussian filtering gives tractable mean/variance states; it does not establish that every mechanical implementation of its posterior, every block convention, or every strategic extension is safe.

### M.2. A proved finite-state steepening equilibrium candidate

The linear/binary dichotomy is not exhaustive. In Theorem K.1 take

\[
f(y)=\operatorname{sgn}(y)
\{b|y|-(b-a)L\log(1+|y|/L)\},\qquad 0<a<b.
\tag{M.1}
\]

The terminal asset value is an unbounded monotone transformation of a Gaussian variable; it need not itself be Gaussian. The public sufficient state is \((t,Y_t)\), and the equilibrium price is its Gaussian smoothing (K.1).

**Proposition M.1 — global steepening with a positive liquidity floor.** For each \(t<T\), this price is odd, strictly increasing and strictly convex on \(y>0\). Its derivative is even, increases strictly with \(|y|\), lies between \(a\) and \(b\), and tends to \(b\) in both tails. Consequently the price has no saturation, and the reciprocal marginal response tends to the positive floor \(1/b\).

**Proof.** Gaussian convolution preserves oddness, and

\[
p_y(t,y)=E[f'(y+\sigma\sqrt{T-t}\,Z)]\in[a,b].
\]

Write \(g_v\) for the centered Gaussian density with variance \(v=\sigma^2(T-t)\). For \(y>0\), using the odd second derivative of \(f\),

\[
p_{yy}(t,y)
=\int_0^\infty\frac{(b-a)L}{(L+z)^2}
[g_v(z-y)-g_v(z+y)]\,dz>0.
\tag{M.2}
\]

The density difference is positive for \(z,y>0\). Dominated convergence gives \(p_y\to b\) in either tail; the lower derivative bound gives unbounded prices. ∎

Together with K.1, this is an explicit \(E+B_{\rm obs}\) model with a strategic-uninformed no-sure-gain proof and a steepening finite-state price. It also shows why one cannot prove “finite-dimensional Bayesian equilibrium implies linearity or saturation.”

**Proposition M.2 — the same pricing surface is mechanically safe from rest.** Define a deterministic AMM with state \((t,P)\), price \(R=p(t,P)\), fills \(P\mapsto P+q\) charged by integrating \(p(t,\cdot)\), and waits advancing \(t\) with \(P\) fixed. At and after \(T\), freeze the price function at \(f(P)\). This mechanism satisfies \(N_0\) from \((t_0,0)\), for every \(t_0\le T\), with no position cap.

**Proof.** Use the normalized storage

\[
g(t,P)=\int_0^P p(t,z)\,dz.
\]

It is nonnegative, charges exactly the fill cost, and vanishes on the flat terminal fiber. The backward heat equation and M.1 give

\[
g_t(t,P)=-\frac{\sigma^2}{2}
[p_y(t,P)-p_y(t,0)]\le0.
\tag{M.3}
\]

After \(T\), storage is constant during waits. Theorem J.3 applies. ∎

This supplies both a deterministic storage test and a strategic stochastic test for the same price surface, with their different background-flow conventions stated explicitly. On the equilibrium Brownian tape the marginal price is Bayesian; finite deterministic blocks use the separately specified integrated contract. No claim is made that an announced finite block's internal walk is itself a posterior. Its eventual mechanical price \(f(P)\) depends only on cumulative position, and its time-dependent excess relaxes to that curve by a known horizon rather than by a stationary EWMA.

Its limitation is specific: its permanent value martingale is unaffected by the uninformed controller's artificial orders, and its transient \(A\) comes from the insider's corrective response (K.4). It does not implement a fair update \(dF=[s+h(\phi)]dq\) that permanently retains more of **every** order merely because the execution book is displaced. Its decay is not a stationary zero-target EWMA of the whole tape in calendar time. Thus it does not solve the complete operator specification.

For a Poisson-style design, the best established shape ingredient remains [E-model.md, Theorems 2–3](E-model.md): a Laplace prior observed through Gaussian noise has an odd, globally steepening, nonsaturating posterior curve with a positive far-density floor. The exact ongoing filter also needs information precision and innovation flow. Forcing its evidence to decay as a scalar EWMA and adding its gain again to a separate fair is not a derivation. A strategically solved finite-state episode version with all the operator's features remains open.

### M.3. The operator's three features, assessed together

| Feature | Choice B, deterministic guarantee | Nonlinear equilibrium K.1 / M.1 |
|---|---|---|
| A decaying net-flow state | \(y=\phi-P/2\) decays exponentially; \(dy=dq/2\) on fills. The gain depends on \(\phi=y+P/2\). | The controller's impact state \(A\) decays by (K.4), exponentially after a clock change. The total public information state is not that EWMA. |
| Steepening without saturation and with positive far liquidity density | Exactly, with floor \(1/(s+2b)\) for the live fill slope. | Exactly as a state response, with floor \(1/b\), by M.1. Brownian observation and admissible execution remain part of the model. |
| Larger permanent update when a trade arrives while displaced | Exactly for its mechanical \(F\): \(s+h(\phi)\) increases with \(\lvert\phi\rvert\). Settled price also includes \(T(P/2)\). | Not for artificial own flow. Information response steepens, but that is not the specified lasting execution update. |
| Safety | \(N_0\) and \(N_{\rm cyc}\), pathwise, all finite schedules, no cap. | Nonpositive expected profit in the actual stochastic game; deterministic \(N_0\) for the clock-driven integrated rule by M.2. |
| Bayesian equilibrium | No such economic implementation established; weak embeddings are in J.6. | Explicitly established in the specified continuous-time game. |

**Verdict.** All three qualitative engineering features coexist with deterministic uncapped \(N_0\) in Choice B. Steepening, finite-state Bayesian equilibrium and strategic no-sure-gain also coexist in K.1/M.1, but with a different permanence mechanism. The exact all-feature intersection for a richer anonymous finite-state game is unresolved. It is empty under the two restricted formulations proved impossible above. No broader impossibility, and no all-feature equilibrium existence, is claimed.

## One-page summary for the operator

The safety theorem for this AMM is an accounting theorem. Every trade must pay the change in a stored quantity, waiting must decrease that quantity, and ending flat must leave nonnegative stored value relative to the starting state. Under reversible execution and the ability to liquidate, this is both necessary and sufficient. It covers arbitrary finite positions and schedules; a numerical search does not replace it.

Choice B has exactly this certificate. Starting from a calm book, a trader who creates displacement and later ends flat cannot extract cash. A cycle restoring the whole market state cannot extract cash either. A new trader entering an already displaced book can sometimes profit from its predictable relaxation. That trader is harvesting displacement previously funded by somebody else. The current theorem never promised to prevent that stronger, generally impossible spreadless guarantee.

Calling a price “Bayesian” does not establish the accounting theorem. A model can assign positive probability to every trade sequence, quote the exact posterior after every fill, and still offer a deterministic pump when someone controls the sequence. The model's probabilities describe how its traders generate orders. An adversary generating different orders changes the experiment. Knowing which orders are one's own can also change the relevant information even when the dealer correctly models the population.

The valid martingale argument says that a trader cannot have positive expected round-trip profit when its actual fills are fairly priced under its actual information and actual trading law, with appropriate integrability. Dealer break-even across anonymous traders is weaker. An equilibrium can pay an uninformed trader a positive rent; adding that trader as a player does not automatically erase the rent or prove safety.

Choice B can be placed inside an artificial probability model whose block-average execution prices are a martingale. That construction is mathematically valid, but it does not explain fundamental value, strategic trading, or the prices at each intermediate unit. Its useful probabilistic interpretation is instead that **cash plus storage decreases by dissipation**. The storage formula bounds recoverable cash; it is not automatically the market's belief or its exact liquidation value.

A small nonlinear equilibrium in this report produces steepening prices, no saturation, a positive far-liquidity floor, and no profitable uninformed deviation without a common position cap. Its pricing surface also passes a deterministic storage test from rest. It shows that Bayesian equilibrium is not confined to linear or saturating prices. It does not reproduce the proposed timing-dependent permanent fair update. The full anonymous episode game with all three desired features remains a research problem.

For the proposed mechanism, keep Choice B's matched gain and shifted decay if the intended guarantee is safety from rest. Changing only the quote convention, adding a bounded spread, or changing only the decay speed does not generally repair the original uncapped pump. A position cap changes the promise. A fundamental-value interpretation should be treated as a separate result requiring its own game and proof.

## Open questions, ranked

1. **An exact anonymous episode equilibrium with the operator's permanence effect.** Solve the marked-Poisson game including a persistent uninformed controller, then verify its unrestricted deviations. Separate common-prior equilibrium correctness from fairness conditional on order ownership. This is the main missing economic theorem.
2. **A regular finite-state all-feature construction, or a wider impossibility theorem.** Allow irreversible belief updates, a genuine spread, and sufficient activity/precision state. Determine whether timing-dependent retained impact survives alongside uncapped \(N_0\). The existing impossibilities cover specific response architectures, not this whole class.
3. **Choice B's exact recoverable-cash value.** Solve the infimum in (J.23) and determine whether and where its explicit storage equals maximum extractable cash or minimum construction cost. This would turn the present certificate into a sharper economic value statement.
4. **An execution-respecting observational representation.** Characterize posterior realizability for marginally revealed parent orders, including stopping information, rather than for block averages or post-jump quotes. Establish which revelation mechanisms avoid J.6 without changing Choice B's cash contract.
5. **A rigorous reduction from an equilibrium to an engineering state.** For a specified trading-volume/time budget, bound the cash-flow error from compressing the belief state. A pointwise price or gain approximation is insufficient when an adversary may repeat a small defect indefinitely.
6. **Minimal adaptive spreads and stochastic external marks.** Quantify the smallest inventory/state-dependent execution charge or mark-update condition preserving the storage inequality. Keep this separate from a Bayesian claim and from the risk limits required for reserve solvency.

All displayed safety/equilibrium claims labeled as theorems or propositions have proofs above or an explicit local theorem citation. The unresolved items are not asserted as existence theorems. The report does not rely on numerical optimization or simulation for a proof.
