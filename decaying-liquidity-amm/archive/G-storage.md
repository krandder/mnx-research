# Storage, permanent learning, and decaying liquidity

The uncapped design problem has a constructive solution for **no profitable full-state loops**, and for **no profitable inventory round trips started from rest**. It does not have a solution with a genuinely decaying, continuously executable, spreadless price if “safe from any state” means an inventory round trip that need not restore the market's other state. That stronger requirement is incompatible with deterministic price decay. This distinction changes both the engineering recommendation and the Bayesian interpretation.

The principal new construction below retains a fair that changes only at fills, with a sensitivity that increases with recent displacement. Its recent-flow state relaxes toward \(\alpha P\), and its fair sensitivity is determined by its curve through an explicit integral. It needs three scalar states under the original fill conventions. A second, simpler construction uses exactly two states and ordinary decay toward zero, but its nonlinear permanent sensitivity depends on cumulative displacement, not on the timing of previous fills. Both have closed-form examples, a strictly positive far liquidity floor, unrestricted positions, and exact storage certificates. Neither is established here as a competitive Bayesian equilibrium.

These are proved distinctions, not implementation caveats. In particular, neither a cap nor a claim that a potential “looks Bayesian” is used to establish safety. Some requested assertions in the brief are false as stated; counterexamples are given rather than assuming them.

**Conventions.** A positive \(dq\) is a customer's purchase. Cash cost \(C\) is positive when the customer pays the maker; an inventory round trip earns \(-C\). All fills integrate the *live* price, including fair changes within the fill. There are no fees, exogenous price moves, interest, or restrictions on positions unless explicitly introduced. Individual paths have finitely many finite fills and waits; finite-variation limits require existence and convergence of their costs. Prices can be centered price deviations on \(\mathbb R\); the results do not impose a positive absolute asset price or model reserve solvency. A liquidity floor is a floor on units per unit of price, not a price floor.

## Proved results

**Theorem 1: the exact storage statement.** Let the market state be \(x\). Signed trades follow a reversible flow \(\Phi_q\), and their cost is

\[
c(x,q)=\int_0^q R(\Phi_u x)\,du.
\tag{1}
\]

Suppose a finite-valued storage function \(G\) satisfies

\[
c(x,q)=G(\Phi_qx)-G(x),\qquad
G(W_t x)\le G(x)
\tag{2}
\]

for every allowed trade and wait. Then every mixed path satisfies

\[
\boxed{C=G(x_e)-G(x_0)+D,\qquad
D=\sum_{\rm waits}[G(x^-)-G(x^+)]\ge0.}
\tag{3}
\]

Consequently every full-state loop, from **any** initial state, costs \(D\ge0\), without an inventory cap. For a loop that closes only an inventory coordinate \(P\), nonnegative cost follows if its allowed terminal states satisfy \(G(x_e)\ge G(x_0)\). One sufficient condition is that the initial state minimizes \(G\) on that entire inventory fiber. A common weaker normalization is \(G(x_0)=0\) at rest and \(G\ge0\) on the terminal fiber \(P=0\).

**Proof.** Sum the trade equalities and insert the omitted storage changes during waits. They telescope to (3). The endpoint conditions give the conclusions. No bound on position, number of operations, or total elapsed time occurs in the argument. ∎

For arbitrary trade maps, the same proof needs only their endpoint cost equality in (2). Reversibility is used for the converse in Theorem 3 and reflects the original brief's retracing convention.

The cost is therefore not generally just \(G(x_e)-G(x_0)\), and that difference need not be nonnegative on an inventory loop. With continuous waiting dynamics \(\dot x=w(x)\), the dissipation is \(D=-\int \nabla G\cdot w\,dt\).

**Theorem 2: why inventory loops from arbitrary states are different.** Assume the trade flow, wait flow and price are differentiable locally, both trade signs are available, and execution has no spread. If some wait changes the executable price, \(R(W_t x)\ne R(x)\), there is a profitable sufficiently small inventory round trip starting from \(x\).

**Proof.** Trade \(\varepsilon\), wait \(t\), and trade \(-\varepsilon\). Smooth dependence gives

\[
C_\varepsilon=\varepsilon[R(x)-R(W_t x)]+O(\varepsilon^2).
\tag{4}
\]

Choose the sign of \(\varepsilon\) to make the first-order term negative. Both positions and the required trades are finite. ∎

For example, M0 with \(T(\phi)=a\phi\), initially \(\phi=z>0\), permits a sale of \(\varepsilon>0\), a wait with multiplier \(r\in(0,1)\), and a repurchase. Its cost is exactly

\[
C=-a(1-r)\varepsilon(z-\varepsilon)<0\quad(0<\varepsilon<z).
\tag{5}
\]

This harvests an existing displacement. It does not restore \(\phi\) and contradicts neither M0's from-rest theorem nor Theorem 1. Thus “impossible to exploit” must specify whether it excludes harvesting an already funded displacement, or instead excludes manufacturing a profitable cycle from rest. Full-state closure also must not be made vacuous by adding cumulative cash spent to the market state.

**Theorem 3: a complete abstract characterization.** For smooth finite-dimensional rules with trade vector field \(b\), wait vector field \(w\), and next-unit price \(R\), a differentiable storage certificate exists exactly when the following system has a solution on the specified state domain:

\[
\boxed{b\cdot\nabla G=R,\qquad w\cdot\nabla G\le0.}
\tag{6}
\]

For a family of wait maps, replace the second condition by \(G\circ W_t\le G\). Global single-valuedness, well-posed dynamics, and the endpoint condition for the intended definition of loop are part of the characterization. A local primitive along each fill is not enough.

There is also a nonsmooth converse. On a strongly connected component of the state-transition graph, suppose every transition has finite cost, trades are reversible with opposite reverse cost, and every finite closed path has nonnegative cost. Fix a reference state \(o\), and set

\[
G(x)=\inf\{\text{cost of a finite path from }o\text{ to }x\}.
\tag{7}
\]

Then \(G\) is finite and obeys (2). It need not be differentiable.

**Proof.** Equation (6) integrates to (2), and differentiating (2) gives (6). For (7), a finite path from \(x\) back to \(o\) bounds all incoming path costs below, since otherwise their concatenation would be a negative loop. Appending an edge gives \(G(y)-G(x)\le c(x,y)\). Applying this to the reverse trade gives the opposite inequality and hence equality on trades. A wait has zero cash cost, giving the required inequality. ∎

On a component without return paths one additionally needs finite lower bounds for (7). A smooth storage function is therefore a stronger regularity claim than mere absence of negative cycles. This is the precise general answer for arbitrary richer finite-dimensional state; an unrestricted list of elementary triples does not exist independently of the state domain and reachability assumptions.

**An explicit parametrization on \((\phi,P,F)\).** Write the general rule as

\[
d\phi=dP=dq,\qquad dF=h(P,\phi,F)dq,
\qquad \dot\phi=-d(P,\phi,F),\quad \dot P=0,\quad \dot F=g(P,\phi,F),
\qquad R=F+T(\phi).
\tag{8}
\]

All differentiable certificates are precisely the solutions of

\[
G_\phi+G_P+hG_F=F+T(\phi),\qquad -dG_\phi+gG_F\le0.
\tag{9}
\]

This can be made more explicit when \(h\) does not depend on \(F\). Put

\[
c=P-\phi,\qquad H(P,c)=\int_0^P h(u,u-c)\,du,\qquad z=F-H(P,c).
\]

The coordinates \((c,z)\) are invariant during trades. Therefore **every** trade primitive is

\[
G(P,c,z)=Pz+I(P,c)+K(c,z),\qquad
I(P,c)=\int_0^P[H(u,c)+T(u-c)]\,du,
\tag{10}
\]

where \(K\) is arbitrary. The entire remaining test is

\[
\boxed{d(I_c+K_c)+(g-dH_c)(P+K_z)\le0.}
\tag{11}
\]

In (11), evaluate the original coefficients at \(\phi=P-c\) and \(F=z+H(P,c)\). This is a necessary and sufficient test for this whole class, not just a sufficient ansatz. For \(F\)-dependent \(h\), solve its scalar characteristic ODE with initial label \(F|_{P=0}\); integrate the price along that characteristic and add an arbitrary function of the two labels. The same wait inequality completes the test wherever those coordinates exist globally.

With several independently executable assets, one needs \(b_iG=R_i\) for every asset. Compatibility along commutators and closed trade paths is then substantive; a single-asset fill primitive does not prove multi-asset integrability.

**The gradient construction and the preceding M4 result.** In coordinates \((P,y)\) in which fills move only \(P\), choose any differentiable \(G\), quote \(R=G_P\), and let waits keep \(P\) fixed and satisfy

\[
\dot y=-M(P,y)\nabla_yG+v(P,y),\qquad
M=M^\top\succeq0,\quad v\cdot\nabla_yG\le0.
\tag{12}
\]

Then storage decreases. More generally all allowable wait velocities are the half-space \(\nabla_yG\cdot\dot y\le0\); at a stationary point, a well-posed trajectory still has to obey the integrated inequality. The mobility can be bounded to ensure global existence, or a discrete wait map can be accepted only when it reduces \(G\). An arbitrary Euler step is not automatically safe.

For the M4 construction in [M4-SAFETY.md](M4-SAFETY.md), let \(V'=T\), \(c=P-\phi\), and

\[
G(P,c)=V(P-c)+PT(c)-V(c).
\tag{13}
\]

Then \(G_P=T(P-c)+T(c)\), \(G(0,c)=0\), and

\[
G_c=PT'(c)-T(P-c)-T(c).
\]

Rule (40) there is exactly \(\dot c=-\mu G_c\). For \(T(x)=ax+bx^3\),

\[
G_c=bP^2(3c-P),\qquad \dot c=(P/3-c)/\tau,
\qquad \dot G=-bP^2(3c-P)^2/(3\tau).
\tag{14}
\]

This reproves Theorem 8, including arbitrary full-state loops. Its inventory-loop conclusion uses \(P_0=P_e=0\); it does not imply the stronger property ruled out by Theorem 2. Also, a cubic curve has density tending to zero, so it does not meet the operator's strictly positive far-density floor.

**Connection to the previous classifications.** With \(V(\phi)=\int_0^\phi T(u)du\), \(W(P)=\int_0^P S(u)du\), M3 has storage \(F_0P+W(P)+V(\phi)\). Any wait that decreases \(V\) is allowed. Thus every integrable live-position charge \(S(P)\) telescopes on an inventory loop; monotonicity of \(S\) is desirable for the book, but is not needed for that cancellation. The earlier sharp results remain unchanged: original exponential M2 with nonzero continuous \(T\) and urgent coefficient \(\lambda>0\) is unsafe without a cap; the operational bound is \(\lambda C\le1\) under the stated nondegeneracy conditions. Original M4 needs \(0\le S'\le\inf_{u>0}T(u)/u\). Absorbing a varying share of released skew into a fill-independent center produces the holonomy obstruction unless its effective coefficient \(\rho T'\) is constant. These statements concern the exact conventions proved in [M4-SAFETY.md](M4-SAFETY.md) and [D-dynamics-full.md](D-dynamics-full.md).

**Theorem 4: zero-target decay does not permit a nonconstant displacement-only fill sensitivity.** Suppose

\[
R=F+T(\phi),\qquad dF=[S'(P)+h(\phi)]dq,
\tag{15}
\]

where \(T\) is odd, \(h\) is continuous and even, and \(F\) is fixed during waits. Waits move \(\phi\) monotonically toward zero, can reach any strictly intermediate value in finite time, and leave zero fixed. Positions and the number of operations are unrestricted. If \(h\) is constant, the rule is safe from rest whenever \(\phi T(\phi)\ge0\). If \(h\) is nonconstant, there is an exact profitable full-state loop from rest.

**Proof.** Subtract the conservative \(S(P)\) component from \(F\). Write \(A'=h\), \(A(0)=0\). Consider the finite cycle

\[
+u,\quad u\rightsquigarrow u-d,\quad -(u+v-d),
\quad -v\rightsquigarrow -v+d,\quad +(v-d),
\]

with \(u,v>d>0\). It restores \(P\) and \(\phi\), but changes the fair by

\[
\eta=A(u)-A(u-d)-A(v)+A(v-d).
\tag{16}
\]

Some such \(\eta\) is nonzero unless \(h\) is constant; otherwise every small increment of \(A\) is independent of location. Reflect the cycle to make \(\eta>0\). Let its cash cost be \(K\). Its cost and fair increment are independent of an added held inventory \(H\), after the conservative \(S\) charge is removed. Run it \(N\) times while holding \(H\), close that holding, and run its sign-reflection \(N\) times at zero inventory to restore \(F\). Finite entry and exit paths restoring \(\phi\) exist by the assumed waits, as in the earlier M1 proof. Total cost has the form

\[
C_N=A_H+N(2K-H\eta).
\tag{17}
\]

Choose finite \(H\) with \(H\eta>2K\), then finite \(N\) large enough. All three state variables close. If \(h=k\) is constant, \(F=F_0+S(P)-S(0)+kP\) on the reachable leaf, reducing to M3. ∎

The theorem covers exponential decay toward zero, strictly positive nonlinear speeds toward zero, and a volume clock that allows the same wait transitions independently of the trader's net position. Changing only the speed cannot remove these cycles. A clock that blocks these transitions changes the assumptions and must be checked separately.

**Theorem 5: displacement-dependent fair updates paired with shifted relaxation.** Let \(T\) be odd, continuously differentiable, with \(T'\ge0\). Fix \(0<\alpha<1\). Define an even, nonnegative function

\[
\boxed{h(x)=\alpha\int_0^1 v^{-\alpha}T'(vx)\,dv,\qquad
h(0)=\frac{\alpha}{1-\alpha}T'(0).}
\tag{18}
\]

Put \(A(x)=\int_0^x h(u)du\), \(B(x)=\int_0^x A(u)du\), and \(V'=T\), all zero at zero. Let \(S\) be any differentiable conservative permanent curve with primitive \(W\), normalized by \(W(0)=0\). Use (15), freeze \(P,F\) during waits, and set

\[
\dot\phi=-k(P,\phi,F)(\phi-\alpha P),\qquad k\ge0.
\tag{19}
\]

Assume the dynamics are well posed. This rule is safe on every full-state loop and on every inventory round trip started at \(P=\phi=0\). It has the certificate

\[
\boxed{G=P[F-S(P)]+W(P)+V(\phi)+B(\phi)-PA(\phi).}
\tag{20}
\]

**Proof.** Formula (18) is the unique continuous solution, at the origin, of

\[
T(x)+A(x)=xh(x)/\alpha.
\tag{21}
\]

Indeed differentiation gives \(xh'=(\alpha-1)h+\alpha T'\), whose continuous solution is (18); the other homogeneous solution is singular as \(x\to0\). A direct differentiation of (20) along \(dP=d\phi=dq\), \(dF=(S'+h)dq\), gives \(dG=(F+T)dq\). At fixed \(P,F\),

\[
G_\phi=T+A-Ph=\frac{h(\phi)}\alpha(\phi-\alpha P),
\qquad
\dot G=-\frac{k h(\phi)}\alpha(\phi-\alpha P)^2\le0.
\tag{22}
\]

At \(P=0\), \(G=V(\phi)+B(\phi)\ge0\), while initial storage at rest is zero. Apply Theorem 1. ∎

If \(T'\) increases with \(|x|\), so does \(h\). If \(a\le T'\le b\), with \(T'(0)=a>0\) and \(T'(x)\to b<\infty\), then

\[
\frac{\alpha a}{1-\alpha}\le h(x)\le\frac{\alpha b}{1-\alpha},
\qquad h(x)\longrightarrow\frac{\alpha b}{1-\alpha}.
\tag{23}
\]

Thus the transient skew is unbounded, its slope steepens to a finite limit, and the fair sensitivity increases with displacement but remains bounded. Its *level* does not saturate. For bounded \(S'\), the actual slope during a fill, \(T'+S'+h\), also has a finite upper bound, hence a positive far liquidity floor.

For the particular certificate (20), the sign condition for ordinary relaxation (19), at every \(P\) with positive rate and \(h>0\), forces (21): the affine function \(T+A-Ph\) must change sign at \(P=\phi/\alpha\). This is an exact characterization **within this chosen certificate**, not a claim that the gauge freedom in (10) allows no other certificates. For example a constant fair slope can be absorbed into \(S\) and has other storage representations.

There is no inventory cap in (18)–(23). The displaced state is now \(\phi-\alpha P\), not an EWMA decaying to zero. At fixed \(P,F\), the price converges to \(F+T(\alpha P)\); the part that decays is \(T(\phi)-T(\alpha P)\). This alters the operator's original “alarm dies to zero” story, and is exactly how it avoids Theorem 4.

**Allowed clocks and decays.** The following table states actual certificate conditions, not an independent menu of interchangeable knobs.

| Waiting rule | Compatible permanent update and certificate |
|---|---|
| \(\phi\mapsto e^{-t/\tau}\phi\) | Any \(F=F_0+S(P)\), using \(W(P)+V(\phi)\); a constant extra \(h\) can be absorbed into \(S\). Nonconstant even \(h(\phi)\), with fair fixed during waits, fails by Theorem 4. |
| \(\dot\phi=-k(P,\phi,F)\phi\), positive speed | Same obstruction: it visits the same zero-target wait paths. |
| \(\phi\mapsto\alpha P+e^{-t/\tau}(\phi-\alpha P)\) | The explicit nonconstant \(h\) in (18), any conservative \(S\), and storage (20). |
| Nonlinear relaxation toward \(\alpha P\) | Any well-posed speed with \((\phi-\alpha P)\dot\phi\le0\) in Theorem 5. |
| General nonlinear relaxation | For (20), allow exactly \([T+A-Ph]\dot\phi\le0\) when \(P,F\) are fixed. The gradient rule is one choice. For other fair wait updates use (9) or (11). |
| Nondecreasing volume/business clock \(v\) | Replace \(dt\) by \(dv\) in a certified wait rule. Storage still decreases. If external flow moves price or inventory as well, its work must also be accounted for. |
| Clock advanced by the customer's \(\vert dq\vert \) | A combined trade/relaxation operation satisfies the supply inequality \(dG\le R\,dq\), with the extra loss included in \(D\). Define the operation order, or solve the combined dynamics. It is no longer a reversible retracing fill, and volume cannot be counted as a free wait while omitting its execution. |

In the zero-target M3 case, even \(d\phi=dq-k\phi|dq|\) obeys \(dG=R\,dq-k\phi T(\phi)|dq|\le R\,dq\). In the shifted family, replace \(\phi\) there by \(\phi-\alpha P\) and use (22). These are certified volume-clock versions, but their exact block execution maps must implement those equations. Merely substituting a time constant into the old block formula is incorrect.

**Theorem 6: the literal urgent law is a member after a change of decay direction.** In (20), take

\[
h(\phi)=\lambda|T(\phi)|,\quad A'=h,\quad B'=A,
\qquad \dot\phi=-\mu(P,\phi,F)[T(\phi)+A(\phi)-Ph(\phi)],\quad \mu\ge0.
\tag{24}
\]

Then \(\dot G=-\mu[T+A-Ph]^2\le0\), and the same terminal argument proves uncapped from-rest and full-state-loop safety. For instance choose a mobility making the vector field bounded; assume local Lipschitz regularity. This is an exact safe use of \(\lambda|T|\), rather than a capped approximation, but **it generally does not decay toward zero**.

For \(T(\phi)=a\phi\) on the positive side,

\[
G_\phi=a\phi[1-\lambda P+\lambda\phi/2].
\tag{25}
\]

When \(P>1/\lambda\), small positive \(\phi\) must grow under the gradient rule, toward the nonzero minimum \(\phi=2(P-1/\lambda)\). Keeping zero-target decay in that region would increase storage. The old \(1/C\) threshold is thus an obstruction caused by that decay direction and an operational position bound, not a universal Bayesian information bound.

**State-count obstruction.** Under \(dP=d\phi=dq\), suppose an alleged two-state realization uses only \((P,\phi)\), with \(F=f(P,\phi)\). If \(F\) stays fixed during nontrivial waits at fixed \(P\), then \(f_\phi=0\) wherever the wait velocity is nonzero. If that set is dense, as for either exponential relaxation considered here, continuity gives \(F=f(P)\) on each connected inventory fiber. Its fill sensitivity is therefore a function of \(P\), and cannot be a genuinely nonconstant function of recent \(\phi\) at the same \(P\).

Discarding \(P\) and retaining only \((F,\phi)\) also fails to implement the shifted target without reconstructing an additional accumulator. For the nonconstant \(h\) in Theorem 5, the trade field \((1,1,S'+h)\), wait field \((0,-(\phi-\alpha P)/\tau,0)\), and their commutator have rank three wherever \(h'\ne0\) and \(\phi\ne\alpha P\). Their determinant, up to orientation, is \((\phi-\alpha P)^2h'/\tau^2\). Thus there is no smooth invariant reducing these reachable triples to a two-dimensional surface. This is a statement about the original variables and conventions, not a theorem against every imaginable two-state model with different trades or wait-time fair motion.

**Theorem 7: the martingale bridge, with its missing hypothesis supplied.** Let \(v\) be an integrable terminal payoff. Consider a finite, integrable trading experiment under its **actual probability law**, including the law induced by the trading strategy being evaluated. Let \(\mathcal H_i\) contain the public history and the size and sign of the individual fill \(q_i\). If that fill's transaction price is

\[
p_i=E[v\mid\mathcal H_i],
\tag{B1}
\]

and \(q_i\) is \(\mathcal H_i\)-measurable, then

\[
E\!\left[\sum_i q_i(v-p_i)\right]=0.
\tag{B2}
\]

With additional nonnegative execution charges the expectation is nonpositive. A strategy that closes inventory almost surely cannot have strictly positive sure cash profit under these assumptions. The result holds conditional on any starting public history for which the assumptions continue to hold. There is no cap, but integrability and admissibility replace any permission for doubling strategies or infinite losses.

**Proof.** Each summand has expectation zero by conditioning on \(\mathcal H_i\). On an inventory round trip \(\sum_iq_i=0\), so the sum equals \(-\sum_iq_ip_i\). A strictly positive almost-sure profit with finite expectation contradicts (B2). ∎

This is a conditional-fair-pricing identity for the actual experiment. Applying it to *every possible strategy* requires (B1) under each such strategy, or an equilibrium/no-profitable-deviation argument with the correct information sets. Full support under one passive reference model does **not** supply this requirement. With continuous order sizes, exact paths ordinarily have probability zero anyway; positive probability of neighborhoods and continuity can extend on-support inequalities, but cannot turn a reference law into an intervention law.

**Counterexample to the bridge as literally worded in the brief.** Let \(v\in\{-1,1\}\) have equal probabilities. A first order \(Q_1\in\{-1,1\}\) is an independent fair coin. For a second order,

\[
\Pr(Q_2=-1\mid v=1)=3/4,\qquad
\Pr(Q_2=-1\mid v=-1)=1/4.
\]

All four order-sign paths have positive probability. The reference-model posterior transaction prices are \(p_1=0\), \(p_2=1/2\) after a sale and \(p_2=-1/2\) after a purchase. If these prices are offered as a fixed mechanism to a deviator, buying first and selling second yields sure profit \(1/2\). The intervention that forces those orders has changed their likelihood; the quoted reference posteriors are not the actual posteriors under it. This is not an equilibrium model of rational informed sellers. It is an explicit refutation of the claimed implication from just “posterior prices plus full support.”

The useful conclusion is consequently: a pump cannot coexist with **correct conditional fair pricing under the exploiting strategy**, or with an equilibrium that forbids profitable uninformed deviations. It can coexist with a misspecified posterior algorithm, even one trained on a full-support order-flow model.

For an identifiable uninformed participant, a standard sufficient formulation is also useful. Suppose its conditional value process \(m_t\) is a martingale in its actual information filtration, including information it obtains from knowing its own orders. Suppose it pays at least \(m_t\) when buying and receives at most \(m_t\) when selling. Its predictable, integrable round trips have nonpositive expected profit by the martingale integral identity. One cannot silently omit the participant's knowledge that its own past orders were uninformative.

**What “including that fill” means.** In Glosten–Milgrom, the ask and bid condition on the incoming buy or sale, respectively. The price process before an order, \(E[v\mid\mathcal H_{i-1}]\), usually equals neither transaction price. In Kyle's discrete auction, market makers condition on the just-observed aggregate auction flow: Kyle's clearing price is not merely the stale pre-auction quote. In continuous Kyle, adapted prices, infinitesimal trades, and the insider's information filtration must be handled together. A finite AMM block charged by integrating a changing marginal price is a different execution convention from charging every unit of an auction its final clearing price. If information is revealed unit by unit, (B1) must apply to each marginal subfill with its appropriate history; one posterior at the block endpoint does not justify the block integral. [Glosten–Milgrom (1985)](https://www.sciencedirect.com/science/article/pii/0304405X85900443), [Kyle (1985)](https://auctions.martinsewell.com/Kyle85.pdf), [Back (1992)](https://academic.oup.com/rfs/article-abstract/5/3/387/1576252).

**An exact minimal information model.** The following three-point model is deliberately solvable. It produces an information alarm, silence-dependent prices, a spread, and locally steepening response under sparse events. It also proves why those ingredients do not reduce exactly to the requested AMM.

At time zero let

\[
v=F_0+JZ,\quad Z\in\{-1,0,1\},\quad
\Pr(Z=0)=1-\pi,\quad\Pr(Z=\pm1)=\pi/2,
\tag{B3}
\]

with \(J>0\), \(0<\pi<1\). Noise purchases and sales of one unit arrive independently at rate \(\epsilon>0\) per side. Conditional on \(Z=1\), add informed purchases at rate \(\nu>0\); conditional on \(Z=-1\), add informed sales at that rate; add none when \(Z=0\). Informed orders have the correct direction given the bounded fundamental. Treating \(\nu\) as exogenous is a primitive of this filtering model; it is not a solved strategic competition equilibrium.

Let \(N_+,N_-\) be observed counts, \(n=N_++N_-\), \(y=N_+-N_-\), and

\[
\kappa=\log(1+\nu/\epsilon),\quad z=\kappa y/2,\quad
r=\frac\pi{1-\pi}\exp(-\nu t+\kappa n/2).
\]

**Theorem 8: exact posterior and transaction prices.** The posterior probabilities are proportional to

\[
w_0=1-\pi,\qquad
w_\pm=\frac\pi2 e^{-\nu t}(1+\nu/\epsilon)^{N_\pm}.
\]

Writing \(u=\Pr(Z=1\mid\mathcal H)\), \(w=\Pr(Z=-1\mid\mathcal H)\), \(m=u-w\), and \(a_e=u+w\),

\[
\boxed{E[v\mid\mathcal H]=F_0+J\frac{r\sinh z}{1+r\cosh z},
\qquad a_e=\frac{r\cosh z}{1+r\cosh z}.}
\tag{B4}
\]

The competitive one-unit ask and bid are

\[
\boxed{
p^+=F_0+J\frac{\epsilon m+\nu u}{\epsilon+\nu u},\qquad
p^-=F_0+J\frac{\epsilon m-\nu w}{\epsilon+\nu w}.}
\tag{B5}
\]

Their exact posterior increments are

\[
p^+-E[v\mid\mathcal H]=J\frac{\nu u(1-m)}{\epsilon+\nu u},\qquad
p^--E[v\mid\mathcal H]=-J\frac{\nu w(1+m)}{\epsilon+\nu w}.
\tag{B6}
\]

**Proof.** Divide each state's Poisson likelihood by the noise-only likelihood; this gives the three weights above and then (B4). At a purchase multiply the weight of \(Z=1\) by \(\epsilon+\nu\), and the other weights by \(\epsilon\); at a sale do the analogous operation for \(Z=-1\). Normalize and take the conditional mean to obtain (B5). Subtract the old mean to obtain (B6). These are conditional zero-profit prices by construction. ∎

This is an exact Bayesian replacement for an asserted \(\lambda|T|dq\) update in this model. Its gains depend on the full posterior, differ by trade side, and tend to zero when the relevant fundamental is already known. There is no inventory cap and no \(\lambda C\) restriction. It does not preserve a separate fill-only fair plus a fixed odd transient curve.

Several conclusions follow directly. At symmetry \(m=0\), both sides have half-spread \(J\nu a_e/(2\epsilon+\nu a_e)\), increasing with the alarm. Net signed flow alone is not sufficient: at the same elapsed time, a buy followed by a sell has \(y=0\) but increases \(r\), and hence the spread, relative to no trades. Every one-dimensional signed EWMA that cancels such balanced flow misses this activity information. At fixed \(r\),

\[
T_r(y)=J\left\{\frac r{1+r}z+
\frac{r(1-2r)}{6(1+r)^2}z^3+O(z^5)\right\}.
\tag{B7}
\]

The response initially steepens when \(r<1/2\), equivalently when the symmetric event posterior is below \(1/3\). Nevertheless \(|T_r|<J\) and the response saturates for large \(|y|\). With a binary jump, \(\pi=1\), it is exactly \(J\tanh z\). Every posterior mean of a bounded jump is bounded, regardless of the arrival model. Such a prior cannot produce the operator's unbounded skew.

During silence, \(r(t+\Delta)=r(t)e^{-\nu\Delta}\). In the rare-alarm region \(r\cosh z\ll1\), the price alarm approximately decays exponentially at rate \(\nu\); outside that region its decay is nonlinear. In fact, if \(k=e^{-\nu\Delta}\) and \(A=r\cosh z\), the exact ratio of alarms is \(k(1+A)/(1+kA)\), not \(k\). Its relative deviation from \(k\) is \((1-k)A/(1+kA)\). This is a quantified exponential approximation for the *posterior price*, not an exact exponentially weighted count statistic.

For a fixed fundamental, silence is an observation, not physical destruction of information. More generally, with conditional signed intensities \(\ell_s(v)\), the exact posterior mean \(M\) satisfies

\[
\boxed{
\Delta_s M=\frac{\operatorname{Cov}(v,\ell_s(v)\mid\mathcal H)}{E[\ell_s(v)\mid\mathcal H]},\qquad
\dot M\big|_{\rm silence}=-\operatorname{Cov}(v,\ell_+(v)+\ell_-(v)\mid\mathcal H).}
\tag{B8}
\]

The jump increments in (B8), weighted by their arrival rates, exactly cancel the silence drift. That is the martingale property. A deterministic AMM wait has no such compensating random events in its own-trade loop experiment, which is why a Bayesian silence drift is not itself a storage certificate.

**Episodes that start and stop.** A finite-state hidden Markov model extends the calculation without restoring a one-dimensional sufficient statistic. Let a latent state \(Z_t\in\{-1,0,1\}\) switch from zero to either sign at rates \(\delta/2\), and from either sign to zero at rate \(\mu\). Use the same noise and informed intensities conditional on the current state. If \(p_i\) are posterior probabilities, \(Q\) the hidden-state generator and \(\Lambda_i=\ell_i^++\ell_i^-\), the exact filter is

\[
\dot p_i=(Q^\top p)_i-p_i(\Lambda_i-\bar\Lambda)
\quad\text{between arrivals},\qquad
p_i^+=\frac{\ell_i^s p_i}{\sum_j\ell_j^s p_j}
\quad\text{at an arrival of sign }s.
\tag{B9}
\]

This follows by multiplying no-event likelihoods over a small interval, applying the Markov transition probabilities, and normalizing. Its signed belief \(m=p_+-p_-\) and activity belief \(a_e=p_++p_-\) obey, during silence,

\[
\dot m=-[\mu+\nu(1-a_e)]m,\qquad
\dot a_e=\delta(1-a_e)-\mu a_e-\nu a_e(1-a_e).
\tag{B10}
\]

At fills both have nonlinear Bayes updates. Formula (B10) does not mean that the filter has a constant \(\tau=1/\mu\), nor can its silence equation be used while ignoring the unsigned-arrival updates.

If ending an informed episode means the information advantage ends but the fundamental jump *persists*, \(Z_t\) in this model must not simply revert to zero as a value state. Add separate inactive-positive and inactive-negative states, or a latent persistent value and an activity indicator. Forgetting the direction when trading stops would erase evidence about an unchanged payoff. Repeated unbounded jump sizes generally require a posterior distribution or a larger approximation, rather than a universal three-number exact filter.

**Where an EWMA is exact, and where it is an approximation.** There is a clean exact Gaussian filtering example. Let a temporary latent signal satisfy

\[
dX=-\mu Xdt+\eta dB_t,\qquad dY=\gamma Xdt+\sigma dW_t,
\]

with independent Brownian noises. At steady-state conditional variance \(\Sigma\), the Gaussian filter gives

\[
dm=-(\mu+\gamma^2\Sigma/\sigma^2)m\,dt+(\gamma\Sigma/\sigma^2)dY,
\quad
\Sigma=\frac{\sigma^2}{\gamma^2}
\left(\sqrt{\mu^2+\gamma^2\eta^2/\sigma^2}-\mu\right).
\tag{B11}
\]

Thus \(m=K\phi\), \(d\phi=dY-\phi\,dt/\tau\), with

\[
K=\gamma\Sigma/\sigma^2,\qquad
\tau^{-1}=\sqrt{\mu^2+\gamma^2\eta^2/\sigma^2}.
\]

**Derivation.** Gaussian conditioning gives gain \(K\) and the Riccati equation \(\dot\Sigma=\eta^2-2\mu\Sigma-\gamma^2\Sigma^2/\sigma^2\). Its positive stationary root gives (B11). ∎

This exact EWMA has a *linear* posterior mean and a genuinely temporary latent value. It does not generate a steepening curve, a fill-only permanent estimate, or automatically a martingale price for one fixed terminal payoff. For the episode model, a high-noise diffusion approximation gives \(dY\simeq\nu Zdt+\sqrt{2\epsilon}\,dW\). Discarding the separate unsigned-activity observation, freezing the activity belief at \(\bar a\), and linearizing that signed-observation filter yields

\[
K\simeq\nu\bar a/(2\epsilon),\qquad
\tau^{-1}\simeq\mu+\nu^2\bar a/(2\epsilon),\qquad T(\phi)\simeq JK\phi.
\tag{B12}
\]

The errors include the diffusion approximation, replacing a stochastic conditional activity probability by \(\bar a\), and omitting nonlinear gain changes. There is no universal error bound without specifying that scaling regime. In particular (B12) cannot simultaneously be called an exact nonlinear filter with a fixed \(T\).

**Theorem 9: the distributional condition for posterior steepening.** In a Gaussian signal model \(Y=J+\varepsilon\), \(\varepsilon\sim N(0,\sigma^2)\), let \(m(y)=E[J\mid Y=y]\), with the required moments finite. Then

\[
m'(y)=\frac{\operatorname{Var}(J\mid y)}{\sigma^2},\qquad
m''(y)=\frac{E[(J-m(y))^3\mid y]}{\sigma^4}.
\tag{B13}
\]

For a symmetric prior, use the symmetric base measure proportional to \(e^{-J^2/(2\sigma^2)}\pi_0(dJ)\). If its cumulants are \(\kappa_j\),

\[
m(y)=\kappa_2\,y/\sigma^2+\kappa_4\,y^3/(6\sigma^6)+O(y^5).
\tag{B14}
\]

Thus initial steepening is equivalent to positive fourth cumulant of the *likelihood-adjusted* base distribution, when that is the first nonzero curvature term. Global steepening on \(y>0\) is equivalent to a positive conditional third central moment there. An unbounded linear far response with a positive density floor additionally requires suitable tail behavior and finite limiting conditional variance after accounting for the flow-to-signal scale.

**Proof.** The posterior is an exponential tilt by \(yJ/\sigma^2\). Differentiating its normalizer gives the mean, variance, and higher cumulants. Symmetry removes odd base cumulants and gives (B14). ∎

Sparsity and heavy tails are useful ways to obtain positive excess kurtosis; they are not a general logical necessity independent of the likelihood. A Gaussian prior gives a linear mean in this Gaussian observation model. Non-Gaussianity alone is insufficient, and heavy tails alone do not prove global steepening. In an arbitrary observation model the score of the likelihood also determines the response. The demanded general assertion “steepening requires a sparse or heavy-tailed prior” must therefore be replaced by (B13)–(B14) with the observation model stated.

For an explicit counterexample without the Gaussian-observation restriction, draw a Gaussian \(J\), choose any strictly increasing bijection \(f\), and observe \(Y=f^{-1}(J)\). Then \(E[J\mid Y=y]=f(y)\) exactly. Choosing the concentrated curve (26) as \(f\) gives a steepening, nonsaturating posterior response from a Gaussian prior. This intentionally noiseless example refutes a prior-only necessity claim; it is not a proposed model of noisy trading.

**An unbounded exact Laplace example.** Take \(\pi_0(j)=(c/2)e^{-c|j|}\), \(c>0\), and the same Gaussian observation. Write \(\Phi\) for the standard normal CDF and

\[
Z_+(y)=e^{-cy}\Phi(y/\sigma-c\sigma),\qquad
Z_-(y)=e^{cy}\Phi(-y/\sigma-c\sigma).
\]

Completing the square on each half-line gives the exact posterior mean

\[
\boxed{m(y)=y+c\sigma^2\frac{Z_-(y)-Z_+(y)}{Z_+(y)+Z_-(y)}.}
\tag{B15}
\]

The boundary terms from the two truncated normal means cancel. This response is odd, strictly increasing by (B13), shrinks at the touch, and obeys

\[
m(y)=y-c\sigma^2\operatorname{sgn}(y)+o(1),\qquad m'(y)\longrightarrow1.
\tag{B16}
\]

It therefore has no saturation and a positive far density after rescaling signal units into flow units. It initially steepens: the Laplace prior is a nondegenerate Gaussian variance mixture; multiplication by the zero-signal Gaussian likelihood preserves a nondegenerate centered Gaussian variance mixture. For such a mixture \(\kappa_4=3\operatorname{Var}(\text{component variance})>0\), giving (B14). These arguments prove local steepening and the far limit; they are not offered as a proof of global monotonicity of \(m'\) for every parameter value. The engineered curves below have their global shape proved directly.

For repeated independent noisy observations, define

\[
\pi_{\theta,Q}(dj)\propto\pi_0(dj)\exp(\theta j-Qj^2/2),\qquad M(\theta,Q)=E_{\theta,Q}[J].
\]

An observation \(y=\gamma J+N(0,\sigma^2)\) gives the **exact permanent posterior update**

\[
\boxed{\Delta M=M(\theta+\gamma y/\sigma^2,Q+\gamma^2/\sigma^2)-M(\theta,Q).}
\tag{B17}
\]

For a Laplace prior and \(Q>0\), (B15) evaluates it with effective variance \(1/Q\) and signal \(\theta/Q\). Its infinitesimal parameter differential is

\[
dM=\operatorname{Var}(J)\,d\theta-\tfrac12\operatorname{Cov}(J,J^2)\,dQ,
\tag{B18}
\]

interpreted as an ordinary differential in \((\theta,Q)\), with the usual second-order terms required along a stochastic process. This law needs evidence *and* precision. Opposite observations can cancel signed evidence while both increase precision. They do not retrace a reversible AMM state walk. If \(y\) is itself a customer's chosen order rather than an independent signal, its likelihood must be derived from that customer's strategy; assigning it the Gaussian observation likelihood does not prove equilibrium or manipulation resistance.

A slow information channel adds its own likelihood increments to \((\theta,Q)\), or to (B9). For a Gaussian persistent value with current variance \(\Sigma\), one slow noisy observation has gain \(\Sigma\gamma/(\sigma_s^2+\gamma^2\Sigma)\). An always-present slow informed intensity thus gives positive learning when uncertainty remains, but not a universal constant lower bound on \(S'\): as a fixed payoff becomes known, \(\Sigma\) and the gain vanish. Ongoing fundamental innovations can sustain a stationary gain, with an additional state/dynamic model. Equations (B8) and (B17), not a function of \(|T|\) alone, are the exact posterior laws justified by these primitives.

**Bayesian consistency, spreads, and the absence of a cap.** The three-point model has zero expected maker profit at each fill under its specified population law. Equations (B5)–(B6) place its bid below and ask above its current public mean. Properly modeled uninformed strategies cannot gain by the martingale/spread argument when that public mean is also the appropriate conditional value in their information filtration. A strategic manipulator requires the intervention/equilibrium qualification of Theorem 7; the exogenous Poisson filter is not a proof against arbitrary strategic deviations.

For a competitive maker, clearing and terminal-value accounting give the aggregate identity

\[
E[\Pi_{\rm noise}]+E[\Pi_{\rm informed}]+E[\Pi_{\rm maker}]=0.
\tag{B19}
\]

When the maker's expectation is zero, aggregate noise losses equal aggregate informed gains, provided there are no other participants, fees, dividends omitted from wealth, or inventory valuation terms left out. This does not assert that each particular uninformed round trip pays exactly a particular insider's gain. Nor does it identify the mechanical dissipation in (3) with adverse-selection revenue: storage safety alone neither implies competition nor zero expected maker profit.

For a spreaded storage mechanism, the sufficient execution condition is \(c(x,q)\ge G(x')-G(x)\), with nonnegative excess charges added to (3). A spread invalidates the small-order argument (4) when it covers the prospective price change. But an inventory-independent bounded spread does not generally repair the uncapped holonomy pump in (17): it adds a finite amount to each repeated small cycle, while \(H\eta\) can be made arbitrarily large. Any proposed repairing spread needs its own state-dependent inequality.

There is no information-theoretic replacement for \(C\) in these posterior formulas. The maker's position can be unbounded while beliefs remain proper. Limiting one informed trader's desired position does not limit the manipulator's cumulative inventory or eliminate noise orders. The old \(1/C\) condition cannot be derived by declaring the posterior to reach probability one at a certain position.

**Can storage itself be a Bayesian potential?** Three different objects must be distinguished. A storage function integrates money along a controlled state path. A negative log posterior is a function of latent hypotheses given observations. A log partition function normalizes an exponential family; its gradient, not generally the gradient of a negative log posterior, is the posterior mean of its sufficient statistic. They have different arguments and units.

There is one precise connection to M4. If \(V\) really is a log partition function, \(p_\theta(dv)=e^{\theta v-V(\theta)}\nu(dv)\), then (13) is

\[
G(P,c)=V(P-c)-V(-c)-V'(-c)P
=D_{\rm KL}(p_{-c}\Vert p_{P-c}).
\tag{B20}
\]

This follows directly by integrating the log density ratio. It interprets that Bregman storage as a relative entropy. It does **not** prove that the chosen wait flow is Bayes' rule or that orders are observations from that family.

Not every convex \(V\) is a log partition function. The cubic example's \(V(\theta)=a\theta^2/2+b\theta^4/4\), \(b>0\), cannot be a log moment-generating function on all real \(\theta\): analytic continuation would give a characteristic function \(\exp(-at^2/2+bt^4/4)\) with modulus greater than one for large \(t\). Similarly, the tractable curve (26) below has a \(x|x|\) term at zero, so it cannot be the analytic posterior-mean function of a fixed exponential tilt with exponential moments on a neighborhood of zero.

For Choice A below, the centered storage \(\beta V(P)+V(\phi)\) can, after division by a chosen money scale, define a normalizable Gibbs density over its *state coordinates*. That makes it a negative log density by construction, but supplies no latent fundamental, observation likelihood, competition, or zero-profit pricing. Choice B's storage also contains the accounting term \(PF\); it is not a normalizable joint Gibbs density over unrestricted \(F\). No non-tautological exact Bayesian belief model for either complete rule is established here.

In particular, a posterior mean of a fixed terminal value cannot move deterministically during a guaranteed interval with no new random observations: the conditional-expectation tower property makes it constant. Silence in a random-arrival model is different, as (B8) shows. A claim that either engineered rule is an exact competitive posterior must add that stochastic observation structure and verify both execution and strategic incentives. The static Laplace curve and the EWMA approximations above supply interpretable ingredients, not such a verification.

## Tractable specifications

The most economical strict two-state choice is the following live-position rule. If genuine recent-alarm-dependent permanence is indispensable, use the three-state alternative immediately after it. The original demand for all-state inventory-loop safety cannot be met by either, by Theorem 2; the certificates state exactly what is delivered.

**Choice A: two states, concentrated liquidity, cumulative permanent displacement.** Choose \(0<a<b\), a size scale \(L>0\), a permanent fraction parameter \(\beta>0\), and \(\tau>0\). Write \(d=b-a\). Define

\[
T(x)=\operatorname{sgn}(x)\{b|x|-dL\log(1+|x|/L)\},
\tag{26}
\]

\[
V(x)=\frac b2x^2-dL\{(|x|+L)\log(1+|x|/L)-|x|\}.
\tag{27}
\]

Here \(T(0)=V(0)=0\), \(V'=T\), and

\[
T'(x)=a+d\frac{|x|}{L+|x|}.
\tag{28}
\]

Store only \((P,\phi)\), initially \((0,0)\). A constant reference price \(F_0\) and the last timestamp are configuration/bookkeeping, not additional dynamic pricing factors. Quote and execute as follows:

\[
\begin{aligned}
F&=F_0+\beta T(P),&R&=F+T(\phi),\\
P'&=P+q,&\phi'&=\phi+q,\\
c(P,\phi;q)&=F_0q+\beta[V(P+q)-V(P)]+V(\phi+q)-V(\phi),\\
\text{wait }t:\quad P'&=P,&\phi'&=e^{-t/\tau}\phi.
\end{aligned}
\tag{29}
\]

Thus \(dF=\beta T'(P)dq\): there is an always-positive slow floor \(\beta a\), and permanent sensitivity increases with *cumulative* displacement at fill time. A previous wait does not erase that sensitivity. It is not the original urgent law.

The next-unit fill slope is

\[
\frac{dR}{dq}=\beta T'(P)+T'(\phi)\in[(1+\beta)a,(1+\beta)b].
\tag{30}
\]

At rest the touch density is \(\lambda_0=1/[(1+\beta)a]\); along a sufficiently large one-directional sweep the far density tends to \(1/[(1+\beta)b]>0\). The skew alone has density \(1/T'\), from \(1/a\) to \(1/b\). Both prices and permanent impact are unbounded; there is no flat far wall. “Flat near zero” here means a small positive touch slope, which can be set arbitrarily small, not a finite interval with exactly zero slope. When starting from an already displaced state, a reversal initially restores liquidity as it retraces toward zero; it does not steepen immediately in both directions.

**Safety proof and exact accounting.** Use

\[
G=F_0P+\beta V(P)+V(\phi).
\]

Fills cost its exact increment. During waits, \(\dot G=-\phi T(\phi)/\tau\le0\). An inventory round trip from \((P_0,0)\), for any \(P_0\), has

\[
C=V(\phi_e)+\sum_{\rm waits}[V(\phi^-)-V(\phi^+)]\ge0.
\tag{31}
\]

Every full-state loop from any state is also safe. Initialization with an arbitrary nonzero \(\phi\) instead gives the boundary term \(V(\phi_e)-V(\phi_0)\), which can be negative. The formulas require a constant number of logarithms/exponentials and arithmetic operations per fill or tick. There is no optimization or numerical integration.

**Choice B: exact timing-dependent permanence, three scalars, still O(1).** Retain (26)–(28), choose a constant slow slope \(s\ge0\), and set \(\alpha=1/2\). Theorem 5 becomes especially simple. With \(r=|x|/L\), define

\[
h(x)=b-d\frac{\arctan\sqrt r}{\sqrt r},\qquad h(0)=a,
\tag{32}
\]

\[
A(x)=2xh(x)-T(x),\qquad B(x)=\frac{2xA(x)-V(x)}3.
\tag{33}
\]

These satisfy \(A'=h\), \(B'=A\), and \(T+A=2xh\). The identity for \(B\) follows by integrating \(T+A=2xA'\). Store \((P,\phi,F)\), initialized to \((0,0,F_0)\). The full specification is

\[
\boxed{
\begin{aligned}
R&=F+T(\phi),\\
\phi'&=\phi+q,\qquad P'=P+q,\\
F'&=F+s q+A(\phi')-A(\phi),\\
c(x,q)&=Fq+\frac{s}{2}q^2+V(\phi')-V(\phi)
       +B(\phi')-B(\phi)-A(\phi)q,\\
\text{wait }t:\quad \phi'&=P/2+(\phi-P/2)e^{-t/\tau},\quad P'=P,\quad F'=F.
\end{aligned}}
\tag{34}
\]

The price is integrated with the evolving fair. These formulas work for either sign, crossings through zero, and unrestricted size. A fill and its immediate inverse restore all state and return exactly the opposite cash amount.

For this specific choice the third scalar is also observable, rather than merely a redundant coordinate: the local fill slope \(s+h(\phi)+T'(\phi)\) determines \(|\phi|\) uniquely away from zero; on either local sign branch, the quote then determines \(F\), and the waiting price drift \(T'(\phi)(P/2-\phi)/\tau\) determines \(P\). Thus a smooth two-state quotient cannot reproduce its generic local responses.

Here the fair update is exactly

\[
\boxed{dF=[s+h(\phi)]dq,\quad a\le h(\phi)<b,\quad h\text{ increases with }|\phi|.}
\tag{35}
\]

The actual fill slope is \(s+h+T'\), increasing from \(s+2a\) to \(s+2b\). The corresponding density falls from \(1/(s+2a)\) to the strictly positive floor \(1/(s+2b)\). This construction therefore achieves concentrated liquidity, a decaying transient, and an increasing fill-time permanent sensitivity. It uses a baseline sensitive state \(\phi\), rather than treating the excess \(\phi-P/2\) alone as the alarm.

Its storage and dissipation are

\[
G=PF-\frac{s}{2}P^2+V(\phi)+B(\phi)-PA(\phi),
\qquad
\dot G=-\frac{2h(\phi)}\tau(\phi-P/2)^2.
\tag{36}
\]

Hence every from-rest inventory round trip satisfies the exact identity

\[
\boxed{C=V(\phi_e)+B(\phi_e)
+\frac2\tau\int_{\rm waits}h(\phi)(\phi-P/2)^2dt\ge0.}
\tag{37}
\]

Every full-state loop, regardless of starting state, costs its nonnegative dissipation. This is a proof for all finite schedules, not a simulation finding. It also shows why the cumulative position counter cannot be silently omitted when claiming a two-state implementation.

After a buy of \(q>0\) from rest, \(F=F_0+s q+A(q)\). After waiting, price settles at

\[
F_0+s q+A(q)+T(q/2).
\tag{38}
\]

The fair's retained fill increment is \(s q+A(q)\), and its derivative \(s+h(q)\) increases with displacement. The remaining skew also retains \(T(q/2)\). Therefore the *settled price* is not identical to the state named \(F\). All these distinctions are needed if \(F\) is to be called an estimate of fundamental value.

For small \(r\), evaluate (32) using \(h=a+d(r/3-r^2/5+r^3/7-\cdots)\), or a stable library implementation; use `log1p` in (26)–(27). Finite precision should charge conservative rounding or a small execution tolerance rather than permit repeated roundoff credits. This changes numerical implementation, not the analytic certificate.

**What the \(\lambda|T|\) approximation actually means.** For Choice B,

\[
\begin{aligned}
T(x)&=ax+\frac d{2L}x|x|-\frac d{3L^2}x^3+O(|x|^4/L^3),\\
h(x)&=a+\frac d{3L}|x|-\frac d{5L^2}x^2+O(|x|^3/L^3).
\end{aligned}
\]

Thus, with the slow floor redefined as \(S'_{\rm eff}=s+a\),

\[
\lambda_{\rm eff}=\frac{d}{3aL},\qquad
h(x)-a-\lambda_{\rm eff}|T(x)|
=-\left(\frac d{5L^2}+\frac{d^2}{6aL^2}\right)x^2+O(|x|^3/L^3).
\tag{39}
\]

The coefficient approximation has quadratic absolute error near zero and linear relative error compared with its nonzero \(|x|\) term. Over a monotone fill lying inside \(|\phi|\le\delta\ll L\), the fair-update error is bounded by a constant times \(\delta^2|q|\). Its within-fill cash error is at most half that coefficient bound times \(q^2\). These are local bounds with fixed parameters, not uniform-in-time guarantees for replacing the exact rule.

In particular, (39) **does not justify replacing the shifted decay in (34) by zero-target decay**. The latter change reinstates the uncapped pump even if local price fits look excellent. For large \(|x|\), \(h(x)-a\to d\), whereas \(\lambda|T(x)|\) diverges. A fixed \(\lambda\) is not a global approximation.

If the curve is smooth with \(T(x)=ax+b_3x^3+O(x^5)\), Theorem 5 instead gives

\[
h(x)=\frac{\alpha a}{1-\alpha}
+\frac{3\alpha b_3}{3-\alpha}x^2+O(x^4).
\tag{40}
\]

This is the quadratic sensitivity anticipated in the clarification. It cannot have \(\lambda a|x|\) as a nonzero first-order approximation. The cusp in the curvature of (26) is the explicit reason Choice B admits (39).

For Choice A there is a more restrictive burst approximation. Its excess permanent slope is \(\beta d|P|/(L+|P|)\). On a fresh fast burst, \(P=\phi=x\), it equals \(\lambda_A|T(x)|+O(x^2)\), with \(\lambda_A=\beta d/(aL)\); the quadratic error coefficient is \(-\beta d/L^2-\beta d^2/(2aL^2)\). Away from such a burst, an additional error is bounded by \(\beta d|P-\phi|/L\). This makes the distinction between cumulative and recent displacement observable, rather than treating the two rules as equivalent.

**Numerical checks.** An independent standard-library Python replay used \(a=0.2,b=1.1,L=1.7,s=0.13,\tau=1\), seed 904, and 1,000 paths of 20 signed fills uniform on \([-8,8]\), each followed by a wait uniform on \([0,4]\), then an inventory-closing fill. For (34)–(37), the largest absolute cash/storage accounting residual was below \(3\times10^{-12}\); no wait increased storage; the smallest sampled round-trip cost was 15.7337747852. No inventory truncation was applied. At \(x=10^{-2},10^{-3},10^{-4}\), the coefficient error in (39), divided by \(x^2\), was approximately \(-0.2946753,-0.2957300,-0.2958360\), approaching the analytic limit \(-0.29584775\). These checks support formula implementation; the proofs, not the samples, establish safety.

The following self-contained check reproduces the accounting experiment. It also compares block costs with independent numerical integration of the live fair and price, so telescoping the same expressions is not its only test.

```python
import math, random
a, b, L, s = .2, 1.1, 1.7, .13
d = b-a
def T(x):
    u = abs(x)
    return math.copysign(b*u-d*L*math.log1p(u/L), x)
def V(x):
    u = abs(x)
    return b*u*u/2-d*L*((u+L)*math.log1p(u/L)-u)
def h(x):
    r = abs(x)/L
    return a+d*(r/3-r*r/5+r*r*r/7) if r < 1e-7 else b-d*math.atan(math.sqrt(r))/math.sqrt(r)
def A(x): return 2*x*h(x)-T(x)
def B(x): return (2*x*A(x)-V(x))/3
def G(p,x,f): return p*f-s*p*p/2+V(x)+B(x)-p*A(x)
def fill(p,x,f,q):
    y = x+q
    cost = f*q+s*q*q/2+V(y)-V(x)+B(y)-B(x)-A(x)*q
    return p+q, y, f+s*q+A(y)-A(x), cost

random.seed(904)
worst, minimum, increase = 0., math.inf, 0.
for _ in range(1000):
    p=x=f=cost=loss=0.
    for _ in range(20):
        p,x,f,c = fill(p,x,f,random.uniform(-8,8))
        cost += c
        before = G(p,x,f)
        x = p/2+(x-p/2)*math.exp(-random.uniform(0,4))
        decrease = before-G(p,x,f)
        loss += decrease
        increase = max(increase,-decrease)
    p,x,f,c = fill(p,x,f,-p)
    cost += c
    worst = max(worst,abs(cost-G(p,x,f)-loss))
    minimum = min(minimum,cost)
assert worst < 1e-9 and increase < 1e-9 and minimum >= -1e-9
for x,q,f in [(-3.,5.,.7),(4.,-7.,-2.),(.1,.2,0.)]:
    n = 20000
    numeric = q/n*sum(f+s*u+A(x+u)-A(x)+T(x+u)
                      for u in ((i+.5)*q/n for i in range(n)))
    assert abs(numeric-fill(0.,x,f,q)[3]) < 1e-6
print(worst, minimum, increase)
```

**Literature map.** The following links are to papers, publisher records, or author-hosted papers. Their contributions are separate from the new storage calculations above.

| Work | Contribution and precise difference from this design |
|---|---|
| [Kyle (1985), *Continuous Auctions and Insider Trading*](https://auctions.martinsewell.com/Kyle85.pdf) | Strategic informed trading camouflaged by noise and competitive inference from aggregate flow. The canonical Gaussian equilibrium is linear; its information incorporation does not give a fixed steepening EWMA curve or reversible AMM block integration. |
| [Back (1992), *Insider Trading in Continuous Time*](https://academic.oup.com/rfs/article-abstract/5/3/387/1576252) | Continuous-time Kyle with general value distributions within the paper's equilibrium class. Nonlinear prices need not be excluded, but the equilibrium filtration, terminal revelation and trading strategy are jointly determined; our freely selected relaxation is not inherited from that model. |
| [Glosten–Milgrom (1985), *Bid, Ask and Transaction Prices…*](https://www.sciencedirect.com/science/article/pii/0304405X85900443) | Conditional zero-profit bid/ask prices and adverse-selection spreads. A bounded value keeps conditional means bounded. Our spreadless integrated walk and unbounded curve are different execution and value assumptions. |
| [Easley–O'Hara (1987), *Price, Trade Size, and Information in Securities Markets*](https://edegan.com/pdfs/Easley%20OHara%20%281987%29%20-%20Price%20Trade%20Size%20and%20Information%20in%20Securities%20Markets.pdf) | Trade size and sequence convey information, giving size-dependent adverse selection. It motivates informative urgency/size but does not establish a universal \(\lambda\vert T\vert \) learning law or the proposed far-density shape. |
| [Easley–O'Hara (1992), *Time and the Process of Security Price Adjustment*](https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1992.tb04402.x) | Arrival and non-arrival reveal whether information exists. This is the basis of the silence likelihood in (B4), not permission to discard unsigned activity or use an arbitrary exponential alarm. |
| [Holden–Subrahmanyam (1992), *Long-Lived Private Information and Imperfect Competition*](https://host.kelley.iu.edu/cholden/Holden%20and%20Subrahmanyam%20%281992%29.pdf) | Competition between informed traders accelerates revelation; in the limiting common-information setting it can be immediate. It supports the urgency mechanism, but does not identify a finite episode lifetime or \(\nu\) without a trading-cost, capacity, latency, or heterogeneous-information model. |
| [Rochet–Vila (1994), *Insider Trading without Normality*](https://academic.oup.com/restud/article-abstract/61/1/131/1547030) | Existence/uniqueness and distributional generality in a Kyle variant where the insider observes noise flow, related to a demand-schedule formulation. It does not say that arbitrary non-Gaussian priors generate any desired convex impact curve in the original Kyle information structure. |
| [Bagnoli–Viswanathan–Holden (2001), *On the Existence of Linear Equilibria in Models of Market Making*](https://host.kelley.iu.edu/cholden/Bagnoli-Viswanathan-Holden%20%282001%29.pdf) | Distributional conditions for linear equilibria across aggregate-flow, sequential-order and call-market models, with qualifications for differential information. Non-Gaussianity can still support linearity. This cautions against deriving steepening from “non-Gaussian” alone. |
| [Tao Li (2013 working-paper version), *Insider Trading with Uncertain Informed Trading*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=946324) | Joint inference about value and whether a strategic trader is informed makes depth and volatility state dependent. This is directly relevant to the alarm. It is not a proof of a fixed one-dimensional EWMA or our storage flow; the cited item is a working paper, not an asserted 2013 journal publication. |
| [Banerjee–Green (2015), *Signal or Noise?*](https://snehalbanerjee.github.io/papers/BanerjeeGreen2015.pdf) | Uncertainty about others' information produces nonlinear, asymmetric prices and dynamic volatility effects in their equilibrium setting. Those mechanisms motivate richer posterior state; they do not imply an odd globally steepening mean or a fill-only permanent update. |
| [Back–Baruch (2004), *Information in Securities Markets: Kyle Meets Glosten and Milgrom*](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1468-0262.2004.00497.x) | Strategic timing in a point-process market and convergence toward Kyle as noise trades become small and frequent. This is the relevant route from a spreaded arrival model to a diffusion, but requires solving strategic timing and scaling the spread/execution convention. |
| [Collin-Dufresne–Fos (2016), *Insider Trading, Stochastic Liquidity, and Equilibrium Prices*](https://onlinelibrary.wiley.com/doi/abs/10.3982/ECTA10789) | Stochastic noise volume changes price impact and informed aggressiveness in equilibrium. It motivates a distinct liquidity/activity state; noise volume is not equivalent to absolute signed imbalance. |
| [Huberman–Stanzl (2004), *Price Manipulation and Quasi-Arbitrage*](https://business.columbia.edu/sites/default/files-efs/pubfiles/1556/QARBonehalfinch2-new.pdf) | Their permanent, time-independent trade-impact formulation forces linear impact to exclude quasi-arbitrage. A nonlinear level function \(S(P)\), paid through its exact integral, is a different state-dependent formulation: a trade's effect is \(S(P+q)-S(P)\), not a fixed nonlinear function of \(q\) independent of \(P\). Choice A does not contradict their result. |
| [Gatheral (2010), *No-Dynamic-Arbitrage and Market Impact*](https://www.tandfonline.com/doi/full/10.1080/14697680903373692) | Links impact nonlinearity and the decay kernel in an additive transient-impact model; exponential kernels require linear impact there. Applying \(T\) after decaying aggregate volume is a different model, so that restriction cannot be transferred to M0. |
| [Alfonsi–Fruth–Schied (2010), *Optimal Execution Strategies in Limit Order Books with General Shape Functions*](https://arxiv.org/abs/0708.1756) | General nonlinear book shape with distinct volume and price resilience specifications. Their depleted volume corresponds to our \(\phi\), and the inverse cumulative depth corresponds to \(T\). This is the direct order-book ancestor of the reversible fill walk. |
| [Alfonsi–Schied (2010), *Optimal Trade Execution and Absence of Price Manipulations in Limit Order Book Models*](https://epubs.siam.org/doi/10.1137/090762786) | Their volume-reversion model is our M0's transient mechanism, with a martingale unaffected price in the stochastic version. Corollary 2.12 gives no manipulation under their shape assumptions and also addresses the stronger transaction-triggered criterion. Our storage proof gives the ordinary round-trip M0 statement directly; it does not assert all their optimal-execution conclusions. |
| [Alfonsi–Schied–Slynko (2012), *Order Book Resilience, Price Manipulation, and the Positive Portfolio Problem*](https://epubs.siam.org/doi/10.1137/110822098) | Studies linear transient/permanent/instantaneous components and conditions preventing transaction-triggered manipulation, related to convex decreasing resilience and a quadratic minimization problem. Passing our cash-loop test alone does not prove that adding opposite-side trades cannot improve a nonzero liquidation program. |
| [Obizhaeva–Wang (2013), *Optimal Trading Strategy and Supply/Demand Dynamics*](https://web.mit.edu/wangj/www/pap/ObizhaevaWang13.pdf) | Dynamic liquidity recovery and resilience determine optimal execution, including block and gradual trades. The benchmark book is simpler than our concentrated shape; it supplies neither an event posterior nor an alarm-dependent permanent learning coefficient. |

The distinction behind the Gatheral/Alfonsi comparison is the order of operations:

\[
\text{additive impact kernel: }\quad \sum_i f(q_i)e^{-(t-t_i)/\tau},
\qquad
\text{volume resilience: }\quad
T\!\left(\sum_iq_ie^{-(t-t_i)/\tau}\right).
\]

These agree for a linear \(T\), and generally disagree otherwise. **A \(\phi\) that decays in units is the Alfonsi–Schied volume-resilience model; its ordinary no-manipulation statement is our M0 statement**, with the appropriate initial-rest, execution, and unaffected-price assumptions. This comparison is explicit in their Remark 2.13. [Alfonsi–Schied, paper, pp. 499–500](https://epubs.siam.org/doi/pdf/10.1137/090762786?download=true).

**What the operator can calibrate.** Safety does not identify economic parameters. It imposes compatibility conditions such as (18), while the speed along a safe wait trajectory can remain arbitrary. The exact filtering examples identify their own parameters from primitives; they do not derive all parameters of either engineered AMM from one equilibrium.

| AMM quantity | Information primitive or restriction | Observable calibration and limitations |
|---|---|---|
| \(\tau\) | In the exact Gaussian filter, (B11); in the reduced episode filter, approximately \([\mu+\nu^2\bar a/(2\epsilon)]^{-1}\). In the static sparse Poisson model the rare-alarm silence rate is \(\nu\). These are different mechanisms. | Fit a marked arrival HMM including both signs, durations, sizes, and unsigned activity; validate silence-conditioned markouts. For Choice B fit excess displacement relative to its nonzero target, not exponential decay to zero. |
| Touch density \(\lambda_0\) | Local posterior gain, such as \(J\nu\bar a/(2\epsilon)\) in count units or \(\operatorname{Var}(J\mid0)/\sigma^2\) in a Gaussian channel. Actual block depth also includes the permanent fill response and any spread. | Estimate marginal price response near zero with order size in asset units and an independent value/markout proxy. Choice A gives \(1/[(1+\beta)a]\); Choice B gives \(1/(s+2a)\). Do not calibrate those to \(1/T'(0)\) without adding the fair update. |
| Far density floor | Unbounded value prior, observation scaling, and limiting posterior variance. A bounded jump cannot supply it. Laplace plus Gaussian observations gives the linear tail (B16), whereas a finite-mixture bounded jump does not. | Estimate large-displacement slopes and long-horizon markouts; distinguish unbounded linear tails from a fitted saturation over a short range. Choice A's floor is \(1/[(1+\beta)b]\); Choice B's is \(1/(s+2b)\). |
| \(S'\) / slow floor | Slow informative likelihood channel and its current posterior variance, or recurring innovations sustaining that variance. A permanently known fixed value cannot retain a positive Bayesian gain. | Use isolated slow orders and independent subsequent value proxies, conditional on the activity posterior. Choice A uses \(\beta a\) at the touch; Choice B's local slow floor is \(s+a\). Neither is identified solely by saying slow informed intensity is positive. |
| Urgent \(\lambda\) | No universal exact Bayesian constant. The exact rules are (B8)/(B17). In Choice B it is a derived local coefficient \((b-a)/(3aL)\), with error (39); a smooth cubic local curve instead has a quadratic urgent coefficient (40). | Fit the interaction of incremental permanent markout with the pre-fill activity/displacement state, conditioning on signed and unsigned flow. Test a \(\vert \phi\vert \) term against \(\phi^2\) and posterior-dependent side-specific gains. Do not extrapolate a local fit to unlimited position. |
| \(C\) | No ideal-model primitive and no role in the certificates. It is an operational position or solvency constraint, if imposed separately. | Set through the operator's funding/risk process, not by fitting an information probability. A per-order size limit is not a bound on cumulative inventory. |
| Added target share \(\alpha\) | A mechanical compatibility choice in (18), not derived from the Poisson episode model. Choice B fixes \(1/2\) for elementary formulas. | Test the retained versus decaying response and the fair-update relationship jointly. A good empirical fit does not identify an underlying Bayesian equilibrium. |
| Width \(L\) | Controls the transition between touch and far sensitivity; a prior scale divided by flow informativeness is a possible model-dependent analogue. | Fit the complete response curve, then enforce its implied urgent coefficient. It cannot be picked independently of \(a,b,\lambda_{\rm eff}\) in Choice B. |

Counts alone cannot identify a value scale in (B3): changing \(J\) leaves their entire distribution unchanged. More generally, rescaling latent value and inversely rescaling its influence on orders leaves an observational equivalence. Consequently a monetary depth or permanent-price coefficient needs prices, a fundamental proxy, or a normalization in addition to observable order flow. Mechanical self-generated AMM prices are not an independent validation of the information story.

For Choice B, if a separately estimated \(s\), touch density and far density are accepted, set \(a=(\lambda_0^{-1}-s)/2>0\), \(b=(\ell_\infty^{-1}-s)/2>a\). A chosen positive local urgent coefficient then forces \(L=(b-a)/(3a\lambda_{\rm eff})\). Choose or estimate \(\tau\) separately and verify the retained-response target. This is a constrained calibration of a proved-safe mechanism, not an identification theorem for a Bayesian market.

## Open questions, ranked

1. **A strategic information equilibrium matching a certified rule.** Specify persistent value innovations, episode termination, competing informed agents and noise flow; solve the order likelihood and execution prices under deviations, not just the passive filter. Determine whether a storage-certified rule, possibly with spreads and richer state, is exactly implementable. No such equilibrium for Choices A or B has been proved here. The original all-state spreadless inventory-loop guarantee is ruled out, rather than left open.

2. **Two-state alternatives with different fill conventions.** The state obstruction proved here concerns additive \(P,\phi\) fills and a fair frozen on waits. A different trade map, or fair motion during waits, might combine two economically meaningful states with recent-alarm-dependent permanence. It must state an inventory-loop boundary condition, not only a full-state potential, and must preserve the intended liquidity shape.

3. **Best certificate within the compatible class.** Equations (10)–(11) characterize existence, but solving for the gauge \(K\) can enlarge the simple families exhibited here. Classify closed-form safe targets for bounded-slope concentrated curves, including the M4 price split. Safety alone does not rank their economic usefulness, retained impact, execution quality, or state count.

4. **Global shape of Bayesian response and finite-state approximation error.** Determine useful prior/likelihood classes with globally increasing posterior variance under positive evidence and a finite positive far-density floor. The exact cumulant criterion is (B13); local leptokurtosis is insufficient. Quantify how a compressed signed-flow/activity/precision filter changes prices and learning gains, and preserve the execution certificate when approximating it.

5. **Stronger execution and stochastic guarantees.** Analyze transaction-triggered manipulation, predictable trading against other customers' induced transients, exogenous martingale value changes, spread design, and long-running strategies under explicit integrability constraints. The present theorem proves the specified finite own-trade loop guarantees; it does not identify predictable profits from already displaced public states with a newly manufactured pump.

6. **Empirical identification and numerical enforcement.** Estimate episode activity separately from imbalance, discriminate persistent evidence from expiring value, and test the small-displacement approximation outside its fitting sample. If implementing a rule, certify rounding, fees, and any discrete wait approximation against the exact storage inequality. A cap can be operationally useful but cannot replace any of these uncapped proofs.
