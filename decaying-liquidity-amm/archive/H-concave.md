**H — Uncapped decaying liquidity: construction, concave alternatives, and the limits of a Bayesian interpretation**

This report uses [M4-SAFETY.md](M4-SAFETY.md), especially Theorem 8 and (40), and checks its conclusions against [D-dynamics-full.md](D-dynamics-full.md) and [F-attack.md](F-attack.md). There is no inventory cap anywhere in the proposed rules or their safety proofs. Statements labelled theorems are proved below. An observational Bayesian filter, an equilibrium execution rule, and a deterministic rule safe against controlled orders are distinguished throughout.

The main conclusions are as follows. A storage function proves safety of **closed market-state loops from every state**, and, with an additional endpoint condition, of **position round trips from a specified set of initial states**. These are different guarantees. Requiring every position round trip to be unprofitable from every possible pre-existing transient is incompatible with deterministic, zero-spread price relaxation. Also, changing the original urgent gain from absolute to squared displacement does not repair it while retaining its original decay and fill-only fair.

There are useful positive constructions. The simplest two-scalar implementation is `R = F₀ + S(P) + T(z)`, with fills moving P and z together, and waits reducing |z|. Both a concentrated convex T and an uncapped square-root T work. Its permanence depends on cumulative displacement P, not separately on urgency. If independent urgency-dependent permanence is required, an explicit concentrated convex rule below keeps a bounded, increasing fill gain and relaxes φ exponentially toward P/2. A square-root rule below keeps exactly the λ|T(φ)| gain and uses an elementary logistic wait map. These latter rules require **three independent scalars P, φ, F**. In the original architecture that third scalar cannot generally be eliminated. They are safe constructions, not claimed Bayesian equilibria.

**Proved results: conventions and the exact storage theorem.**

A signed quantity dq > 0 buys from the maker. Its cash cost is R dq, and a finite fill pays the integral along its entire state trajectory. Let P increase by dq and remain fixed during waits. The controller's inventory acquired during an experiment is P−P_start; a position round trip has P_end=P_start. An exact state loop additionally restores every state variable used by the rule. Cash profit on a position round trip is minus total cost C. All strategies here have finitely many finite fills and waits; absolutely continuous limits are allowed when the displayed integrals exist. No claim relies on an infinite-time reset or an unbounded-loss doubling strategy.

**Theorem 1 (storage identity, all starting states).** Suppose a finite-valued state function G has the following properties:

* The cost of every fill x→x′ is exactly G(x′)−G(x).
* Every allowed wait x→w has G(w)≤G(x).

Write D_k=G(x_k^−)−G(x_k^+) for the loss during wait k. For any strategy from any x₀,

\[
\boxed{C=G(x_e)-G(x_0)+\sum_kD_k,\qquad D_k\ge0.} \tag{1}
\]

Consequently every exact state loop costs at least zero, with no restriction on positions. A position round trip costs at least zero whenever its admissible endpoint satisfies G(x_e)≥G(x₀). A sufficient endpoint condition is that x₀ minimize G over the entire terminal-position fiber `{x:P(x)=P(x₀)}`. More generally, the maximum possible cash extraction is bounded above by G(x₀)−inf G on that fiber.

Proof. Sum the changes of G over fills and waits. The sum is its endpoint change; move the negative wait changes to the other side. The conclusions follow immediately. Fees charged as nonnegative additional cash costs add another nonnegative term. For differentiable flows the same identity is C=ΔG−∫wait dG. ∎

Thus the equality in the question requires correction: C is not generally just ΔG. On a closed state loop ΔG=0, and its nonnegative cost is exactly the dissipated storage. Nor is ΔG automatically nonnegative on a position-only loop. Storage need not be nonnegative everywhere to prove exact-loop safety; an appropriate lower bound on terminal states is essential for the stronger guarantee.

**Theorem 2 (why the strongest all-state reading is impossible).** Consider a continuous zero-spread quote with reversible small fills, and a deterministic wait which changes the quote from r₀ to r₁≠r₀. Suppose wait trajectories and fill costs depend continuously on small changes in the initial state. There is a sufficiently small position round trip from this state with negative cash cost.

Proof. Buy a signed ε, perform the wait, and trade −ε. Its cost is ε(r₀−r₁)+o(|ε|). Choose the sign of ε to make the first term negative. The strategy generally does not restore the transient state. ∎

An explicit M0 example is R=aφ, initially φ=A>0. Sell ε, wait with multiplier r∈(0,1), then buy ε. The cost is a(1−r)(ε²−Aε)<0 for 0<ε<A. The final φ is rA+(1−r)ε, not A. This spends a pre-existing disturbance; it does not manufacture a repeatable closed-state pump. In a stochastic market the quiet interval is also an event, not something the trader can necessarily guarantee. Any claim below of safety from every state means exact state loops, unless the stronger position-only scope is stated explicitly. No proposed nontrivial decaying rule can satisfy the impossible interpretation of the brief.

**Theorem 3 (a complete characterization by potentials).** Let reversible fills form a group of maps Φ_q, with additive path-integrated costs, and let waits be specified maps. On a state set in which every state is reachable from a reference state and has a finite-cost return path to it, the following are equivalent:

1. Every finite closed state loop has nonnegative cost.
2. There is a finite state function G with exact fill differences and nonincreasing wait differences as in Theorem 1.

The function need not be smooth. If smooth trade and wait vector fields are X and Y, with XP=1 and YP=0, the differentiable version is exactly

\[
\boxed{XG=R,\qquad YG\le0.} \tag{2}
\]

Proof. Sufficiency is Theorem 1. For necessity, set G(x) equal to the infimum of costs of paths from the reference state to x. It is finite above by reachability. A fixed return path bounds it below, since otherwise it would complete a negative loop. Concatenating a fill gives one inequality for the difference of G; concatenating its reverse gives the opposite inequality. Concatenating a zero-cash wait gives G(after)≤G(before). Differentiation gives (2) whenever G is differentiable. Conversely, integrating (2) gives the map conditions. ∎

This is a genuine characterization of all state/trade/decay triples, rather than a restriction to EWMAs. Smooth certificates are a useful subclass; safety alone does not prove smoothness. Without the reachability and finite-return assumptions, the infimum construction need not be finite. Adding elapsed time to the state can make exact-loop safety vacuous; one must still check the position endpoint condition. Adding accumulated cash as a new state and calling it G is likewise no useful certificate.

There is a constructive parametrization. In local coordinates (p,z) that straighten the fill field to X=∂p, all possible storage functions have the form

\[
G(p,z)=\int_{p_*}^p R(u,z)\,du+H(z). \tag{3}
\]

Choose H and any well-posed wait vector field in the half-space ∇_zG·ż≤0. In particular ż=−M∇_zG+Z works for positive semidefinite M and ∇_zG·Z=0. Conversely every descent vector has this decomposition away from critical points, for example with a scalar M and a tangent Z. At critical points use the inequality itself and check well-posedness. A finite wait must decrease G; an arbitrary Euler step of a gradient flow need not do so. Formula (3), its global compatibility across charts, and the descent inequality characterize all differentiable certificates on a richer finite-dimensional state as well.

**An explicit characterization for the fair-update family in the question.** Let T be continuous, odd and increasing, V(x)=∫₀ˣT, and take

\[
dP=d\phi=dq,\qquad dF=[S'(P)+h(\phi)]dq.
\]

During waits set Ṗ=0, φ̇=b(P,φ,F), Ḟ=f(P,φ,F). Define W′=S, A′=h, B′=A, with all primitives zero at zero. The fill invariants are c=P−φ and k=F−S(P)−A(φ). Every differentiable fill-exact storage is

\[
\boxed{G=P[F-S(P)-A(\phi)]+W(P)+V(\phi)+B(\phi)+H(c,k).} \tag{4}
\]

Its complete wait condition is

\[
\boxed{[T+A-Ph-H_c-hH_k]b+[P+H_k]f\le0.} \tag{5}
\]

Necessity and sufficiency follow from (3): c,k are constant during fills, while ċ=−b and k̇=f−hb during waits. Thus existence of a single H satisfying (5), plus the desired endpoint condition, is an exact functional characterization for every T,b,f,S,h in this family. It is not a claim that this differential inequality has a closed-form solution for every prescribed triple.

The convenient choice H=0 gives D=T+A−Ph and condition Db+Pf≤0. If h is even and nonnegative, then A is odd, B is even and nonnegative, and at P=0 the storage is V+B≥0, independent of F. With S(0)=W(0)=0, this proves all position round trips from P=φ=0, even when F does not return. It also proves exact state loops from every state. The arbitrary H is important: H=0 is sufficient but is not necessary for safety.

**Theorem 4 (complete obstruction under full relaxation).** Suppose waits leave F fixed and move φ toward zero along every signed interval, and their speed is finite, strictly positive away from zero, and independent of an inventory translation after removing S(P). For continuous even h, unrestricted exact-loop safety for `dF=[S′(P)+h(φ)]dq` is equivalent to h being constant. Exponential relaxation and any positive change of its speed within this architecture are included.

Proof. Subtract S(P) from F; the S charge integrates to ΔW and vanishes on a position round trip. For u,v>d>0, the sequence `+u; wait u→u−d; −(u+v−d); wait −v→−v+d; +(v−d)` restores P,φ and changes the residual fair by

\[
\eta=[A(u)-A(u-d)]-[A(v)-A(v-d)].
\]

If all these η vanished, continuity would make every equal-length integral of h independent of its location, so h would be constant. Otherwise reflect the cycle to make η>0 and denote its cost K. Translating it to a held inventory L leaves K and η unchanged. Reach (P,φ)=(L,0), run it N times, unwind L, and run N reflected cycles at zero inventory. Entry and exit are finite: `+2L; half-wait; −L` and its opposite suffice. The total state closes and its cost is A_L+N(2K−Lη), where A_L is a fixed connection cost. Choose L, then N, to make it negative. If h is constant, F=F₀+S(P)+hP and the remaining nonconservative charge is the M0 storage V(φ), proving sufficiency. ∎

This excludes λ|T|, κφ² and κT² with the original wait architecture. A nonlinear speed that merely traverses the same paths cannot repair them. A speed that stops at a barrier or reverses direction changes the allowed paths and can repair them. A different constant fair gain, of either sign mathematically, is conservative; nonnegative gain is the economically monotone choice.

For h=λ|T| the original exponential identity contains φT(φ)[1−λP sign φ]. A hard bound |P|≤C controls this multiplier when λC≤1, as proved sharply in M4-SAFETY.md. This is an inventory-weighted cash constraint, **not** a posterior probability bound. With unbounded positions it offers no safety. A fixed per-unit spread cannot repair Theorem 4: it increases the finite cycle cost K, but unrestricted L still makes −Lη dominate, and repetition amortizes entry and exit.

There is also an exact classification when the fair is allowed a compensating wait drift. Let φ̇=−γφ and Ḟ=γφk(φ) during waits, with even continuous k, while fills use S′(P)+h(φ). Define the odd primitive E′=k, E(0)=0. The transformed fair F+E(φ) is frozen during waits and has fill gain S′+h+k. The inventory-translation pumping argument of Theorem 4, whose necessity part does not use curve monotonicity, therefore forces h+k=β, a constant. With that identity the complete price becomes

\[
R=F_0+S(P)+\beta P+[T(\phi)-E(\phi)].
\]

It is safe exactly when the residual curve has x[T(x)−E(x)]≥0, under the same symmetry, reachability and regularity assumptions. Sufficiency follows from the residual M0 potential. For necessity, if the residual is negative on some positive interval, the symmetric two-wait cycle has negative potential loss on that interval; repetition after a finite entry produces a closed-state pump. This argument needs the residual sign, not its monotonicity. Thus a nonconstant fill gain can coexist with full zero-target decay only if the fair's wait drift compensates it in this φ-only architecture. Its final permanence is then S(P)+βP, independent of urgency history.

In particular, keeping a share ρ of the released skew means E=ρT. With no additional fill gain, safety requires ρT′ to be constant and the residual (1−ρ)T to have the correct sign. For constant ρ>0 and nonlinear T this fails; for linear T it gives 0≤ρ≤1. With fills one can instead choose h=β−ρT′, subject to any desired nonnegative-gain restriction. This recovers the compensation result in D-dynamics-full.md and explains precisely which part of a putative “permanent” urgent update is undone by waiting.

**Which decay laws are allowed?** The answer depends on the price and fair update together.

| Architecture | Allowed waits, with uncapped proof | Fair update and limitation |
|---|---|---|
| R=F₀+S(P)+T(z), dz=dq | Every map decreasing V(z); in particular z→e^(−Δt/τ)z | F=F₀+S(P), dF=S′(P)dq. S can be curved; both convex and concave T work. |
| Same price | ż=−r(P,z,t)z, r≥0, or ż=−μT(z), μ≥0, with a well-posed flow | Nonlinear and finite-time relaxation are allowed; ensure the map does not overshoot and increase V. |
| Compensated fair, as just derived | φ̇=−γφ, Ḟ=γφk(φ) | Exactly h+k=constant and a correctly signed residual T−E. Nonconstant fill gains are allowed, but urgency does not remain an independent permanent component. |
| Same price in centered coordinate z=(φ−αP)/(1−α), α<1 | φ̇=−(φ−αP)/τ with dφ=dP=dq | Price must use T(z); retaining the old T(φ) is a different rule. Storage is W(P)+V(z). |
| Original additive fair family, H=0 | Db+Pf≤0 from (5) | Any h≥0 works with an appropriate gradient wait b=−μD, f=0; it need not decay toward zero. |
| Same, φ→αP, 0<α<1, f=0 | Exponential relaxation works for the explicit compatibility equation (6) below | Allows bounded increasing h with concentrated convex T; concave powers force a decreasing singular h in this particular construction. |
| Any certified rule, a nondecreasing clock A_t | Replace dt by dA_t in its dissipative wait dynamics | Includes volume clocks. If A is the controller's gross volume, dissipation must be applied during execution, with its cash integral accounted for; it cannot be a free state reset outside the proof. |

A finite sum of transient modes is another finite-dimensional extension: take G=W(P)+ΣV_j(z_j)/b_j, dz_j=b_jdq, b_j>0, and R=F₀+S(P)+ΣT_j(z_j). Each mode can relax by its own dissipative clock. This supplies multiple timescales without changing the proof; it need not be chosen when one mode suffices.

**Theorem 5 (linear relaxation targets, an exact constructive subclass).** In (4) take H=0, f=0 and b=−(φ−αP)/τ, 0<α<1. For h≥0, the storage descends for every P,φ if and only if

\[
\boxed{T(x)+A(x)=\frac{x}{\alpha}h(x).} \tag{6}
\]

For differentiable T, a regular solution without an additional singular homogeneous term is

\[
h(x)=\alpha |x|^{\alpha-1}\int_0^{|x|}u^{-\alpha}T'(u)du.
\tag{7}
\]

Proof. For fixed x with h(x)>0, D=T+A−Ph is affine decreasing in P. The inequality D(x−αP)≥0 for every P requires its zero to be at P=x/α. At h=0 it requires T+A=0, the same identity. Conversely (6) gives

\[
\dot G=-\frac{h(\phi)}{\alpha\tau}(\phi-\alpha P)^2\le0.
\]

Differentiate (6) to obtain xh′+(1−α)h=αT′ and solve the first-order equation; (7) is the solution with the stated boundary choice. ∎

This is necessity within the **specified H=0 certificate**, not an assertion that a different H or a different fair architecture cannot work. A live S(P) may be added freely. For T(x)=a sign(x)|x|^p and p>α, (7) gives h(x)=αpa|x|^(p−1)/(p−α). For p>1 the gain grows with displacement; for 0<p<1 it falls with displacement and diverges at zero. Its integrated fills are still finite and the storage proof holds by absolute continuity across zero, but it does not implement the desired urgency gain. This motivates the different concave wait map below.

**What replaces the failed concave handoff.** For a sublinear concave power T=a sign(x)|x|^p, 0<p<1, m_T=inf T(x)/x=0. The original `T(φ)+S(P−φ)` with relaxation φ→0 therefore permits only S=0. Concavity by itself is not enough to imply m_T=0: adding a positive asymptotic linear slope is an exception. For the power laws in this brief, replace that handoff by a conservative charge S(P), or change the decay and use (4)–(6).

The direct M4 gradient certificate also remains valid:

\[
G(P,c)=V(P-c)+PT(c)-V(c),\quad
\dot c=\mu[T(P-c)+T(c)-PT'(c)]. \tag{8}
\]

It is a Bregman remainder of the convex potential V and has G(0,c)=0. Hence it proves safety regardless of whether T itself is convex or concave on the positive half-line. But for a concave power, P>0 and c↓0, its derivative G_c=a[pPc^(p−1)−(P−c)^p−c^p] is positive and unbounded. Gradient descent moves c backward, not into an ordinary positive handoff. Also G(P,c)→0 as |c|→∞ for fixed P. Safety of (8) is not evidence of a well-behaved permanent estimate; the pure power needs a specified nonsingular dynamics at c=0. The candidates below avoid this difficulty.

**Tractable candidates: the two-state choice.**

The recommended default when two stored scalars are a hard requirement is the following construction. It delivers true zero-target decay, closed-form fills, no cap, and a permanent gain increasing with **cumulative** displacement at fill time. It deliberately does not pretend that cumulative displacement and the independent recent-flow alarm are identical.

Store `(P,z)` and fixed F₀. Derive F=F₀+S(P). Set

\[
R=F_0+S(P)+T(z),\qquad
\text{fill }q:\ (P,z)\mapsto(P+q,z+q),
\]
\[
\boxed{\Delta C=F_0q+W(P+q)-W(P)+V(z+q)-V(z),}
\quad
\text{wait }t:\ z\mapsto e^{-t/\tau}z. \tag{9}
\]

No finite fill freezes F, T, or S at its starting value. A time tick changes only z. Price, fill, and tick each require O(1) arithmetic and elementary functions. All signs and all crossings through zero use the formulas below. Both state scalars range over the whole real line.

**Theorem 6 (safety of both two-state specifications).** Let T be any odd continuous increasing curve and let S have a primitive W. Rule (9) has storage G=F₀P+W(P)+V(z). For a position round trip from any P₀ with z₀=0,

\[
C=V(z_e)+\sum_k[V(z_k^-)-V(z_k^+)]\ge0. \tag{10}
\]

Every exact state loop from arbitrary P₀,z₀ is safe. A position-only round trip from arbitrary z₀ has the same expression minus V(z₀), so C≥−V(z₀).

Proof. Fills in (9) are exact G differences. Waits leave P fixed and reduce V because zT(z)≥0. On a position round trip the F₀P and W(P) terms cancel. This proves every assertion, including the endpoint qualification. ∎

The proof needs no monotonicity of S; the specifications choose S′≥0 so the entire walked price is increasing. Neither an inventory cap nor a restriction on order splitting appears. The guarantee concerns a controller's isolated input path, not protection from trading against external information, sandwiching another trader, or risk from the underlying asset. The mathematical price is a signed price deviation; requiring a globally nonnegative dollar price for an unlimited two-sided additive curve is a separate design constraint.

For the **concentrated convex specification**, choose t₀>0, d>0, L_T>0. With r=|z|, define

\[
T_c(z)=\operatorname{sgn}(z)\left[(t_0+d)r-2dL_T\left(1-\sqrt{\frac{L_T}{L_T+r}}\right)\right],
\]
\[
V_c(z)=\frac{t_0+d}{2}r^2-2dL_Tr
 +4dL_T\sqrt{L_T}\,[\sqrt{L_T+r}-\sqrt{L_T}]. \tag{11}
\]

The zero values are defined by continuity. On z>0,

\[
T_c'=t_0+d-d\left(\frac{L_T}{L_T+z}\right)^{3/2},\qquad
T_c''=\frac{3dL_T^{3/2}}{2(L_T+z)^{5/2}}>0.
\]

Thus the touch slope is t₀, the far slope is t₀+d, and there is no saturation. The transient liquidity density is 1/T_c′: it decreases from 1/t₀ to the strictly positive floor 1/(t₀+d). “Flat near zero” means a small positive touch slope here; t₀=0 is also mathematically possible but gives infinite density at the exact touch.

Choose a bounded permanent gain with s≥0, k>0, L_S>0:

\[
S_c(P)=sP+k\operatorname{sgn}(P)[r-L_S\log(1+r/L_S)],\quad r=|P|,
\]
\[
W_c(P)=\frac{s}{2}r^2+k\left\{\frac{r^2}{2}
-L_S[(r+L_S)\log(1+r/L_S)-r]\right\}. \tag{12}
\]

Its exact fair update is dF=[s+k|P|/(L_S+|P|)]dq. The gain increases with |P| and has the slow floor s. Along a fill the total slope is S_c′(P)+T_c′(z), bounded between s+t₀ and s+k+t₀+d. Hence the entire book also has a positive far density floor. It need not be symmetric about the current touch when P and z have different signs; a signed displacement measures directional history, not a separate volatility state.

For the **concave square-root specification**, choose a>0 and use

\[
\boxed{T_q(z)=a\operatorname{sgn}(z)\sqrt{|z|},\qquad
V_q(z)=\frac{2a}{3}|z|^{3/2}.} \tag{13}
\]

It is unbounded, so it has no price plateau or finite-quantity saturation. Its slope is a/(2√|z|) away from zero. It has zero density at the exact touch and increasing density farther out; it is an alternative to concentrated convex liquidity, not a curve satisfying both shapes. The infinite derivative at zero causes no ambiguity in the finite-fill integral or in the exponential wait map.

To obtain a permanent gain matching the square-root alarm locally on rapid fresh bursts, choose s≥0, k>0, ℓ>0. For r=|P| and u=√r, define

\[
S_q(P)=sP+k\operatorname{sgn}(P)
 [r-2\ell u+2\ell^2\log(1+u/\ell)],
\]
\[
W_q(P)=\frac{s}{2}r^2+k\left\{\frac{r^2}{2}
-\frac{4\ell}{3}r^{3/2}
+2\ell^2[(r-\ell^2)\log(1+u/\ell)-r/2+\ell u]\right\}.
\tag{14}
\]

Then S_q′(P)=s+k√|P|/(ℓ+√|P|), with value s at zero. Use (9) without any further change. This is the complete square-root implementation and Theorem 6 is its uncapped proof. The total walked curve can eventually become asymptotically linear because of S; the **instantaneous transient T** is the concave square root. If global concavity of the complete price walk is also required, an independently increasing permanent gain cannot simply be ignored in checking that requirement.

Every general concave power T=a sign(z)|z|^p, 0<p<1, has V=a|z|^(p+1)/(p+1) and the same proof and exponential tick. Any integrable S works; choosing S linear gives the shortest implementation. Formula (14) provides the extra growing gain with elementary primitives specifically for p=1/2. Smooth the touch only by replacing T and its primitive together; a slope or price clamp without a matching potential changes the contract.

In numerical code use `log1p` and stable differences or the Taylor expansions near zero, where the closed-form primitives subtract nearly equal terms. Round fees against the trader, or maintain sufficient precision, if exact theoretical nonnegativity must survive fixed-point rounding. There is no need for a solver, an order-history buffer, or an optimization at a fill.

**How closely the two-state rule approximates λ|T|.** The qualification is about recent versus cumulative flow, not just an inventory cap. During a one-direction burst beginning at P=z=0 and lasting H, exponential relaxation implies |P−z|≤(H/τ)Q, where Q is burst volume. Across an arbitrary history P−z need not be small, even if |P| is operationally bounded.

For (11)–(12), put λ=k/(t₀L_S). Since 0≤|T_c(z)|−t₀|z|≤3d|z|²/(4L_T),

\[
\left|\frac{k|P|}{L_S+|P|}-\lambda|T_c(z)|\right|
\le\frac{k}{L_S}|P-z|+\frac{k|z|^2}{L_S^2}
+\frac{3\lambda d}{4L_T}|z|^2. \tag{15}
\]

For (13)–(14), put λ=k/(aℓ). The elementary inequality |√|P|−√|z||≤√|P−z| gives

\[
\left|\frac{k\sqrt{|P|}}{\ell+\sqrt{|P|}}-\lambda|T_q(z)|\right|
\le\frac{k}{\ell}\sqrt{|P-z|}+\frac{k}{\ell^2}|z|. \tag{16}
\]

These are explicit error bounds on the coefficient of dq. A fair-increment error is bounded by integrating them against |dq|; its cash error also depends on subsequent held inventory and cannot be discarded on long strategies. The exact conservative law is safe globally. Substituting λ|T(z)| for it is a different, generally unsafe law. At the end of a burst, the permanent estimate S(Q) is independent of the burst's speed; that is the principal economic feature this two-state simplification gives up.

**When independent urgency-dependent permanence is essential: an elementary convex rule.**

This is the preferred construction if preserving the operator's economic feature takes priority over storing exactly two scalars. Store `(P,φ,F)`, initially `(0,0,F₀)`. Choose k₀>0, k₁>0, L>0, τ>0 and write K=k₀+k₁. Define even h, odd A,T, and even B,V as follows, with r=|x|:

\[
h(x)=K-k_1\sqrt{\frac L{L+r}},
\]
\[
A(x)=\operatorname{sgn}(x)
 \{Kr-2k_1\sqrt L[\sqrt{L+r}-\sqrt L]\},
\]
\[
B(x)=\frac K2r^2-\frac{4k_1\sqrt L}{3}
 [(L+r)^{3/2}-L^{3/2}]+2k_1Lr,
\]
\[
T(x)=\operatorname{sgn}(x)
 \left\{Kr-2k_1L\left[1-\sqrt{\frac L{L+r}}\right]\right\},
\]
\[
V(x)=\frac K2r^2-2k_1Lr
 +4k_1L\sqrt L[\sqrt{L+r}-\sqrt L]. \tag{17}
\]

All zero values use continuity. The identities A′=h, B′=A, V′=T and **T(x)+A(x)=2xh(x)** can be checked directly. The quote and complete maps are

\[
\boxed{R=F+T(\phi),}
\]
\[
\begin{split}
\text{fill }q:\quad &P'=P+q,\quad \phi'=\phi+q,\quad
 F'=F+A(\phi+q)-A(\phi),\\
&\Delta C=Fq+V(\phi+q)-V(\phi)
 +B(\phi+q)-B(\phi)-A(\phi)q;\\
\text{wait }t:\quad &P'=P,\quad F'=F,\quad
 \phi'=P/2+(\phi-P/2)e^{-t/\tau}.
\end{split} \tag{18}
\]

These are O(1) formulas with square roots and an exponential. No numerical differential-equation solver is needed. The fill law is exactly dF=h(φ)dq: its gain increases with |φ| from k₀ to K, in either trade direction. It is permanently retained in F during waits. T is precisely the concentrated curve (11) with t₀=k₀ and d=k₁. The **full instantaneous** slope h(φ)+T′(φ) increases from 2k₀ to 2K. Its density therefore decreases from 1/(2k₀) to the positive floor 1/(2K), with no saturation.

**Theorem 7 (uncapped safety of (18)).** The storage

\[
\boxed{G=PF+V(\phi)+B(\phi)-PA(\phi)} \tag{19}
\]

is exact on fills and satisfies

\[
\dot G=-\frac{2h(\phi)}\tau(\phi-P/2)^2\le0
\]

during waits. Every position round trip from `(0,0,F₀)` has nonnegative cost, without requiring F or φ to reset. Every exact state loop from any state has nonnegative cost.

Proof. Along fills, differentiate (19) and use dF=h dq and dφ=dP=dq; the PA terms cancel to leave (F+T)dq. During a wait G_φ=T+A−Ph=h(2φ−P), giving the displayed derivative. At the initial state G=0; at a terminal P=0, G=V+B≥0. Apply Theorem 1. ∎

The transient is now relative to the retained target: z=φ−P/2 decays exponentially. The settled quote at fixed P,F is F_set=F+T(P/2), and R−F_set converges monotonically to zero during each wait. If one prefers to call F_set the fair, it too changes only at fills, with

\[
dF_{\rm set}=[h(\phi)+\tfrac12T'(P/2)]dq.
\]

This bookkeeping change does not reduce the state dimension. It also makes clear that φ itself is no longer a recent-flow EWMA decaying to zero. Some displacement must be retained. From arbitrary states a wait can increase φ toward P/2; claiming universal relaxation toward zero would invalidate the proof.

Near zero this exact bounded gain has the operator's desired leading form. With

\[
\lambda=\frac{k_1}{2Lk_0},\qquad
\left|h(x)-k_0-\lambda|T(x)|\right|
\le\frac{3k_1}{8L^2}\left(1+\frac{k_1}{k_0}\right)|x|^2, \tag{20}
\]

the approximation is first-order accurate in |x|. To prove the bound, Taylor's theorem gives |1−(1+y)^−1/2−y/2|≤3y²/8 for y≥0 and 0≤T(r)−k₀r≤3k₁r²/(4L). Combine them. Equation (20) approximates the **gain**, not the decay: changing only the old fair law would still be unsafe. At large displacement h remains bounded while λ|T| grows without bound, so the approximation is explicitly local. No operational C is used to obtain the exact rule's safety.

**Why there are three scalars.** In the original fill-only fair architecture, the fill field is X=(1,1,S′(P)+h(φ)) and a wait field with fixed F is Y=(0,b,0). At points where b h′≠0,

\[
\det(X,Y,[X,Y])=-b^2h'(\phi)\ne0.
\]

Thus its accessible state has local dimension three; a smooth two-scalar realization of the same independent states cannot be obtained by a change of variables. For the constructions using a P-dependent wait target, P affects future quotes, and cannot be dropped as unobservable accounting. One may call φ,F “two extra variables beyond the inventory ledger,” but the total is still three. A strict two-state budget requires a substantive restriction, such as F=F₀+S(P), not a renaming. This is why the preceding two-state and three-state specifications are both provided.

**A concave rule with the original urgency gain and a modified decay.**

Here the square-root family is treated on exactly the same footing: explicit price, fill map, wait map, storage, proof, and limitations. Store `(P,φ,F)`, initially `(0,0,F₀)`. Choose a>0, 0<p<1, λ>0, s≥0, τ>0. Set

\[
T(x)=a\operatorname{sgn}(x)|x|^p,\quad
V(x)=\frac a{p+1}|x|^{p+1},\quad
A(x)=\frac a{p+1}\operatorname{sgn}(x)|x|^{p+1},\quad
B(x)=\frac a{(p+1)(p+2)}|x|^{p+2}. \tag{21}
\]

Thus A′=|T|. Quote R=F+T(φ) and execute

\[
\begin{split}
P'&=P+q,\quad \phi'=\phi+q,\\
F'&=F+sq+\lambda[A(\phi+q)-A(\phi)],\\
\Delta C&=Fq+\tfrac s2q^2+V(\phi+q)-V(\phi)\\
&\qquad+\lambda[B(\phi+q)-B(\phi)-A(\phi)q].
\end{split} \tag{22}
\]

The exact fill law is dF=[s+λ|T(φ)|]dq. During waits P,F remain fixed and

\[
\boxed{\dot\phi=-\frac\phi\tau
 \left[1-\lambda P\operatorname{sgn}\phi+
 \frac{\lambda|\phi|}{p+1}\right].} \tag{23}
\]

Define φ=0 to remain zero. For φ≠0 put σ=sign φ, r₀=|φ|, A₀=1−λPσ and b₀=λ/(p+1). The exact time-t update is φ′=σr_t, where

\[
r_t=
\begin{cases}
\displaystyle\frac{r_0e^{-A_0t/\tau}}
 {1+(b_0r_0/A_0)(1-e^{-A_0t/\tau})},&A_0\ne0,\\[6pt]
\displaystyle\frac{r_0}{1+b_0r_0t/\tau},&A_0=0.
\end{cases} \tag{24}
\]

For A₀<0, the numerically stable equivalent is r₀/[e^(A₀t/τ)+(b₀r₀/A₀)(e^(A₀t/τ)−1)]. All denominators are positive for finite t≥0. The state remains finite, the sign is preserved during waits, and the map has the semigroup property. For p=1/2 all fill powers are square roots times integer powers; the tick requires one exponential. The implementation is O(1).

**Theorem 8 (uncapped safety of the concave urgency rule).** For (21)–(24),

\[
\boxed{G=PF-\tfrac s2P^2+V(\phi)+\lambda B(\phi)-\lambda PA(\phi)}
\tag{25}
\]

is exact on fills and dissipates during waits at the rate

\[
-\dot G=\frac a\tau|\phi|^{p+1}
 \left[1-\lambda P\operatorname{sgn}\phi+
 \frac{\lambda|\phi|}{p+1}\right]^2\ge0. \tag{26}
\]

It has the same two safety guarantees as Theorem 7.

Proof. Differentiate (25) on a fill using dF=(s+λ|T|)dq; all extra terms cancel. On a wait G_φ=T+λA−λP|T| equals T times the bracket in (23). Multiplication by φ̇ proves (26). At P=0 the storage is V+λB≥0, and it is zero at the initial neutral state. Theorem 1 applies. At φ=0 use continuity; V,B,A are differentiable there even though T′ is singular. Formula (24) follows by integrating ṙ=−r(A₀+b₀r)/τ. ∎

The same proof actually holds for every p>0, so this is also a power-law convex construction. A pure convex power p>1 has density tending to zero at infinity, and therefore fails the positive-floor requirement; that is why (17) is preferable on the concentrated-liquidity side.

What changes economically is explicit. If σP≤1/λ, r relaxes to zero; at equality its decay is algebraic rather than exponential. If σP>1/λ, it tends to

\[
r_*=(p+1)(\sigma P-1/\lambda)>0.
\]

Below r_* it **grows**. Large held inventory changes the safe relaxation target. This is not an inventory cap: P is unrestricted and every fill remains allowed. It is also not a small modification of the old EWMA globally. In the region λ|P|+λ|φ|/(p+1)≤ε, its relative drift error from −φ/τ is at most ε. Outside that region the change is essential to safety.

The transient T is concave, but the complete fill slope is s+λa|φ|^p+ap|φ|^(p−1). In particular the urgent component eventually dominates and the complete walk is not globally concave. If the requirement is instead a globally concave full marginal price together with an indefinitely increasing unbounded urgency gain, this candidate does not satisfy that stronger requirement. The two-state square-root construction with a linear S is the simplest fully concave alternative; the bounded increasing S_q gain in (14) is a compromise, whose full curvature must still be checked rather than inferred from T alone.

More generally, for any odd increasing T positive on x>0, keep the original h=λ|T| and use

\[
\dot\phi=-\frac\phi\tau
\left[1-\lambda P\operatorname{sgn}\phi+
\lambda\frac{V(\phi)}{|T(\phi)|}\right]. \tag{27}
\]

The ratio has a continuous zero limit because V(x)/|T(x)|≤|x|. Equation (27), when well posed, dissipates the same storage: it is the gradient choice b=−(φ/(τT))G_φ. Formula (23) is the power-law case where the integral can be solved in elementary functions. Thus λ|T| is an exact member of the storage class **with a modified decay**, as well as a local approximation to other safe fair updates. Neither interpretation validates it with the original uncapped decay.

| Choice | Scalars | True zero-target forgetting | Independent urgency permanence | Concentrated convex / concave option |
|---|---:|---|---|---|
| (9), with (11)–(12) | 2 | Yes | Only a fresh-burst approximation; exact gain uses P | Concentrated convex, positive far density floor |
| (9), with (13)–(14) | 2 | Yes | Same limitation, with bound (16) | Square-root transient; no touch concentration |
| (17)–(18) | 3 | Decay relative to P/2 | Yes, bounded and increasing in magnitude of φ | Concentrated full fill curve and positive far floor |
| (21)–(24), p=1/2 | 3 | Only in its zero-target region | Yes, exactly s+λ times absolute T | Concave transient; full fill curve includes the urgent gain |

All four have closed-form O(1) fills and ticks, exact-state safety from every state, and neutral-start position-round-trip safety. The first two additionally give position-round-trip safety from any cumulative P at zero transient. None overcomes Theorem 2. These are the available tradeoffs, rather than four rules satisfying an inconsistent stronger specification.

**The information model: exact results and what they cannot rationalize.**

The original request for a unique exact Bayesian replacement of λ|T| has no solution under its original state architecture. Theorem 4 already excludes every nonconstant displacement-only fill gain with full zero-target relaxation and a frozen fair during waits. Bayes does provide an exact update once a likelihood is specified, but that update generally needs more belief state and changes during silence. Neither safety nor a qualitative story identifies that likelihood uniquely.

**Theorem 9 (the exact Bayesian update for marked order arrivals).** Let Z be a hidden state containing the permanent payoff v and informed activity. Given Z and public history, sign-s arrivals have intensity r_s(Z), s∈{+,−}. Write π for the current posterior, m=π(v), and r̄_s=π(r_s). Then

\[
\pi^s(dz)=\frac{r_s(z)\pi(dz)}{\bar r_s},\qquad
\boxed{m^s-m=\frac{\operatorname{Cov}_\pi(v,r_s)}{\bar r_s}.} \tag{28}
\]

If size q is observed, replace r_s by its marked likelihood r_s f_s(q|Z,history). With a finite hidden-state generator Q, unnormalized column weights u obey

\[
\dot u=[Q^T-\operatorname{diag}(r_++r_-)]u,
\qquad u^s=\operatorname{diag}(r_s)u. \tag{29}
\]

If Qv=0, as for a permanent payoff whose information state changes without changing its value, silence gives

\[
\dot m=-\operatorname{Cov}_\pi(v,r_++r_-),\qquad
dm=\sum_s(m^s-m)(dN_s-\bar r_sdt). \tag{30}
\]

Proof. Multiply the weights by r_sdt on an arrival and by 1−(r_++r_−)dt on silence, include Q, and normalize. Taking their first moments gives the covariance identities. ∎

Equation (28) is the exact law requested by the binding clarification. It is a finite observation update, not in general a scalar coefficient times an arbitrary infinitesimal trading quantity. It has no 1/C factor. It does not, without a strategy-consistency argument, prove that feeding controlled orders into an observational filter gives a pump-free execution engine.

A smallest explicit episode model retaining permanent information has five states: no value jump; positive jump with its informed trader active or inactive; negative jump with its informed trader active or inactive. The value is respectively 0,+J,+J,−J,−J. Active traders send correctly signed orders at rate μ; noise orders arrive at rate ε>0 per side in every state. Activation and death rates are γ and δ within each sign pair; value does not change on death. Formula (29) is an exact fixed-size filter: a scalar and two 2×2 matrix exponentials between fills, and diagonal multiplications at fills. Its four independent normalized beliefs are finite-dimensional but are not the two numbers (P,φ). Competition can motivate a larger μ; its equilibrium value still requires solving traders' optimization, rather than being implied by the words “competition forces urgency.”

Here is a fully solved special case, with a three-point jump prior and no activity switching during the experiment. Set γ=δ=0, start each nonzero-jump trader active, and let Pr(v=±J)=π₀/2, Pr(v=0)=1−π₀. Put ℓ=log(1+μ/ε), signed statistic z=ℓ(N_+−N_-)/2, and exposure statistic b=ℓ(N_++N_-)/2−μt. Common noise factors cancel, leaving

\[
u_0=1-\pi_0,\quad u_+=\tfrac{\pi_0}{2}e^{b+z},\quad
u_-=\tfrac{\pi_0}{2}e^{b-z},
\]
\[
\boxed{m=J\frac{\pi_0e^b\sinh z}{1-\pi_0+\pi_0e^b\cosh z}.} \tag{31}
\]

This is an exact `F₀+T_b(z)` posterior price relative to a known baseline F₀, with two sufficient statistics. On a sign-σ fill z increases by σℓ/2 and b by ℓ/2; during a wait z stays fixed and b falls at rate μ. The competitive unit ask and bid are the corresponding **post-fill** means. Let w=π₀e^b cosh z/[1−π₀+π₀e^b cosh z]. During silence ṁ=−μ(1−w)m. The decay is nonlinear; its local time constant is 1/[μ(1−w)], approximately 1/μ when w is small. There is no constant global τ, no nonzero permanent-gain parameter λ of the requested kind, and S′=0 in this special case. Increasing |z| eventually saturates at J. These are outputs of the primitives, including the features that disagree with the AMM.

An immediate buy–sell pair leaves z unchanged but increases b by ℓ. In particular it changes the activity belief and the next ask even when m returns to zero. The AMM's reversible fill map restores its entire state after +q,−q. Therefore (31) cannot be made exactly equivalent by declaring an EWMA its sufficient statistic. A binary jump is even more restrictive: posterior means stay in its convex hull and cannot produce an unbounded T. Adding an independent slowly informative payoff component requires its own likelihood and sufficient statistics; it does not magically contribute a fixed S′(P).

Death separates activity from permanent information even more clearly. Conditional on a positive permanent jump with current probability p₀, suppose an informed buyer of rate μ dies at independent rate δ. Against a no-jump alternative and common noise, the silence likelihood ratio is

\[
L(t)=E[e^{-\mu\min(D,t)}]
=\frac\delta{\delta+\mu}+\frac\mu{\delta+\mu}e^{-(\delta+\mu)t}.
\]

Thus m(t)=Jp₀L(t)/[1−p₀+p₀L(t)] tends to Jp₀δ/[δ+μ(1−p₀)]>0, while active-trader probability tends to zero. This follows by direct integration over D. For δ=0, complete forgetting is possible, but the probability is p₀e^(−μt)/[1−p₀+p₀e^(−μt)], not an EWMA. Its error from p₀e^(−μt) is exactly

\[
\frac{p_0^2e^{-\mu t}(1-e^{-\mu t})}{1-p_0+p_0e^{-\mu t}}
\le\frac{p_0^2}{4(1-p_0)}. \tag{32}
\]

Consequently an episode's death rate alone does not determine a fair-price forgetting rate. Stopping because the price has incorporated the signal is even less consistent with erasing that permanent information.

There is an exact linear-Gaussian origin for an EWMA **signal statistic**. Let dZ=−δZdt+σ_ZdB and dY=κZdt+σ_NdW, with independent Brownian noises. At steady-state filtering variance Σ, completing Gaussian squares gives gain K=κΣ/σ_N² and

\[
dm=-(\delta+\kappa K)m\,dt+K,dY,\quad
\frac{\kappa^2\Sigma^2}{\sigma_N^2}+2\delta\Sigma=\sigma_Z^2.
\tag{33}
\]

Hence φ=m/K is exactly an EWMA with τ=(δ+κK)^−1 and a linear mean response Kφ. The Riccati equation follows by adding process variance σ_Z²dt, subtracting 2δΣdt, and subtracting the variance learned from the observation, κ²Σ²dt/σ_N². This is a model of a mean-reverting hidden signal, not yet an equilibrium with a permanent terminal payoff and strategic trading. A permanent component needs additional state. Nonlinear mixtures can produce an approximate EWMA after local linearization, but then constant gains and a single scalar statistic are approximations, not exact sufficient statistics.

**A structure theorem for posterior curvature, with the prior claims corrected.** Suppose a scalar observation y=v+ε has Gaussian noise variance σ², with an arbitrary prior having the needed finite tilted moments. Differentiating the normalized posterior gives

\[
\boxed{m'(y)=\frac{\operatorname{Var}(v|y)}{\sigma^2},\qquad
m''(y)=\frac{E[(v-m)^3|y]}{\sigma^4}.} \tag{34}
\]

This is proved by differentiating posterior expectations: ∂_yE[f(v)|y]=Cov(f(v),v|y)/σ². It follows that monotonicity is automatic in this likelihood, but steepening versus concavity is controlled by the posterior third central moment. Bounded support forces bounded posterior means. Unbounded support is necessary for no saturation, but sparse or heavy-tailed priors are neither a sufficient global curvature test nor a model-independent necessary condition. Different likelihoods, including endogenous informed demand, change the classification.

For example a spike-and-Gaussian prior, mass 1−π at zero and mass π on N(0,s²), gives exactly

\[
m(y)=k,y,w(y),\quad k=\frac{s^2}{s^2+\sigma^2},\quad
w(y)=\frac1{1+Be^{-cy^2}},
\]
\[
B=\frac{1-\pi}{\pi}\sqrt{1+s^2/\sigma^2},\qquad
c=\frac{s^2}{2\sigma^2(s^2+\sigma^2)}.
\]

Its touch slope is kw(0) and far slope k. Nevertheless m′ eventually approaches k **from above**, since m′−k≈kB(2cy²−1)e^(−cy²). Thus a sparse prior gives local follow-through but does not prove globally increasing slope. A sparse three-point prior also steepens locally for suitable parameters and then saturates. A Laplace prior with Gaussian observation is unbounded and gives a smooth shrinkage mean with an asymptotically linear tail; this statement alone still supplies no episode dynamics or fair-update law.

For a symmetric regular likelihood/prior family the even gain is smooth at zero. In the Gaussian observation example,

\[
m'(y)=\frac{\kappa_2(0)}{\sigma^2}
+\frac{\kappa_4(0)}{2\sigma^6}y^2+O(y^4), \tag{35}
\]

where κ_j are posterior cumulants at zero. This follows by repeated differentiation of the log normalizer. The sign of κ₄ is not universal. A cusp proportional to |y|, and particularly one proportional to √|y|, is not the leading exact update of such a regular symmetric model. It can be a fitted approximation away from the origin or a singular limit. Replacing it mechanically by the quadratic term does not bypass Theorem 4.

**The martingale bridge, stated with its necessary qualification.** The full-support assertion in the brief is false as written. The following finite counterexample, also given in F-attack.md, rules out a proof of it.

Take permanent v=±1 equally likely. Repeat six order slots. In slots 2 and 5 an order agrees with v with probability 3/4; in all other slots it is a fair coin, independently conditional on v. Every finite sign path has strictly positive probability conditional on either value. Charge the posterior mean **after each order**. Feed the sequence

| Slot | Signed order | Posterior execution price | Cost |
|---|---:|---:|---:|
| 1 | +1 | 0 | 0 |
| 2 | +1 | 1/2 | 1/2 |
| 3 | −1 | 1/2 | −1/2 |
| 4 | −1 | 1/2 | −1/2 |
| 5 | −1 | 0 | 0 |
| 6 | +1 | 0 | 0 |

Inventory, posterior and slot phase all close. Cost is −1/2. This path has observational probability 3/256. The filter is genuinely Bayesian under its specified random-order model; forcing the informative signs changes that model. Under the actual forced-order experiment, the correct posterior stays zero. Full support, even conditional on v, does not make observational conditioning invariant to intervention.

**Theorem 10 (a valid bridge).** Fix an admissible strategy and its **actual induced probability law**. For each of its fills i let \(\mathcal I_i\) contain its signed quantity q_i, public information, and the trader information relevant to its choice, including which orders it controls. Suppose p_i=E[v|\(\mathcal I_i\)], Σq_i=0, and EΣ|q_i(v−p_i)|<∞, with integrable total fees. A fixed finite number of bounded-size fills with integrable v is a sufficient integrability condition. Then expected cash profit is zero before fees and nonpositive after nonnegative fees. If these hypotheses, or their nonpositive-expected-edge version, hold for every admissible strategy from every state, there is no sure-profit strategy in that class.

Proof. Quantity is measurable in the conditioning information, so E[q_i(v−p_i)]=0. Sum, use vΣq_i=0 and subtract fees. An integrable nonnegative profit positive with positive probability would have positive expectation, a contradiction. ∎

This theorem requires consistency under the trader's actual strategy; full support is not a replacement for it. A maker conditioning only on anonymous market flow usually does not have \(\mathcal I_i\). Zero expected maker profit across the mixture does not prove the same identity for the privately selected noise subgroup or a deviating controller. Thus a sure-profit rule cannot be a posterior satisfying this **robust** bridge, but may be a posterior in some observational model. Conversely storage proves a deterministic pathwise property without any belief model. Neither direction should be silently strengthened.

For continuous order sizes or Poisson timestamps, individual exact paths typically have probability zero. The useful full-support condition is positive probability of neighborhoods, together with suitable continuity if one wants to transfer a robust cash inequality. That correction prevents arbitrary pricing on null histories; it still does not repair the intervention problem exhibited by the finite example.

“Including the fill” means conditioning on its sign, size, timing and any relevant execution event. Glosten–Milgrom unit quotes are E[v|history,buy now] and E[v|history,sell now]. A competitive marginal sell limit order reached by a buy of size Q conditions on Q≥u; it generally does not use E[v|Q=u]. Kyle's discrete auction also clears **after** aggregate order flow is observed, at one price for the auction. It is not a pre-trade posterior offered to an arbitrary finite block. An integrated AMM walk is a different execution contract from q times an endpoint posterior. Continuous diffusion limits can remove a vanishing per-unit spread, but the likelihood of sliced parent orders must still be specified. These distinctions follow the mechanisms of [Glosten–Milgrom](https://business.columbia.edu/sites/default/files-efs/pubfiles/1538/bid.pdf), [Kyle](https://doi.org/10.2307/1913210), and the marginal tail-expectation formulation of [Çetin–Waelbroeck](https://eprints.lse.ac.uk/120809/1/Power_laws_in_market_microstructure.pdf).

The spread transfers the adverse-selection loss without requiring an inventory cap. As a simple calculation, let v=±J equally likely and let a trader be informed with probability θ, buying for +J and selling for −J; otherwise its sign is independent and symmetric. Competitive ask/bid are ±θJ. Conditional informed profit per trade is (1−θ)J; conditional noise loss is θJ. Their probability-weighted amounts cancel exactly. This is an aggregate zero-profit identity. In a dynamic episode model the same total budget holds with the correct conditional quotes and no other costs; it does not assign each individual noise round trip a deterministic loss equal to a particular insider's gain. A nonnegative spread preserves every storage safety result here. It does not automatically convert any unsafe midprice model into a safe one.

**Bayesian readings of the proposed potentials.**

For Gaussian observations the natural posterior family has normalizer

\[
Z(y)=\int e^{yv/\sigma^2-v^2/(2\sigma^2)}\pi_0(dv),\qquad
m(y)=\sigma^2\partial_y\log Z(y).
\]

Consequently the integral of a posterior-mean curve is a **log partition function** σ²log Z(y), up to a constant. It is not in general a negative log-likelihood. The negative log marginal density is y²/(2σ²)−log Z(y)+constant; the negative log posterior as a function of v contains both the prior potential and (y−v)²/(2σ²). Confusing these three potentials would give an erroneous Bayesian explanation of storage.

In particular the exact pure square-root primitive 2a|y|^(3/2)/3 cannot be a finite-moment exponential-family log partition in a neighborhood of zero: such a partition is analytic there, whereas this primitive has a singular second derivative. The concentrated elementary curve (17) also has a nonanalytic odd extension at its first nonlinear term x|x|. Neither is an exact regular scalar Gaussian-observation posterior mean at the touch. Smooth approximations can be posterior candidates, but satisfying a shape condition does not establish a positive representing prior or an equilibrium.

There is a limited, explicit posterior-potential interpretation for both three-state constructions. It is useful for distinguishing a valid mathematical interpretation from an economic derivation. At fixed P,F, write the variable part of (19) or (25) as U(z)−P L(z), where `(U,L)=(V+B,A)` for the convex rule and `(V+λB,λA)` for the concave rule. For θ>0 define

\[
\psi(u)=\log\int_{\mathbb R}e^{yu-y^4}dy,
\]
\[
p(P|z)=\exp\{P L(z)/\theta-P^4-\psi(L(z)/\theta)\},
\]
\[
\pi_0(z)\ \propto\
\exp\{-U(z)/\theta+\psi(L(z)/\theta)\}. \tag{36}
\]

Bayes' rule gives −θlog π(z|P)=U(z)−PL(z)+constant: exactly the storage's z-dependent part. The prior is proper. Indeed ψ(u)=O(1+|u|^(4/3)); in the convex case U grows quadratically and L linearly, while in the concave case U grows as |z|^(p+2), L as |z|^(p+1), and p+2>4(p+1)/3 for 0<p<1. Young's inequality supplies the stated growth bound and hence integrability.

This is a deliberately constructed belief model about a **latent displacement**, with an artificial continuous observation P. It makes waiting a descent algorithm on a fixed posterior potential. It does not make F+T(φ) the posterior expected asset value; nor does algorithmic relaxation with no new observation constitute a Bayesian belief update. The full G, linear in F when P≠0, is not a normalizable negative log density on the unrestricted joint state. For the two-state rule, exp[−(W(P)+V(z))/θ] similarly defines an independent Gibbs prior when W,V are coercive; its gradient quote is a score, not automatically a conditional mean. These interpretations identify precisely what is available and what remains absent.

There is, however, a meaningful equilibrium reading of **concave curve shapes** in continuous Kyle. In the Brownian-order-flow construction associated with [Back (1992)](https://doi.org/10.1093/rfs/5.3.387), choose a monotone terminal map h and let v=h(Y_T), with Y a Brownian motion of variance rate σ² in the market maker's filtration. Conditional pricing is

\[
H(t,y)=E[h(y+\sigma\sqrt{T-t}\,Z)],\qquad Z\sim N(0,1).
\tag{37}
\]

For a specified value distribution, terminal h is its quantile transform of N(0,σ²T). This identifies a family of posterior prices; the insider's equilibrium strategy and admissibility are the additional content of Back's model. Here is a direct shape calculation, not an attribution of a general tail-only curvature theorem. If h(y)=a sign(y)|y|^p, then

\[
\Pr(v>u)=\Pr\{Y_T>(u/a)^{1/p}\},
\]

so its tail has exponential order exp[−(u/a)^(2/p)/(2σ²T)]. For p<1 it is lighter than the Gaussian terminal order-flow tail; p=1/2 corresponds to quartic exponential tails. For p>1 it is heavier than that Gaussian benchmark. Tail comparison alone only controls tail asymptotics; it does not force global concavity for an arbitrary distribution. At t<T, (37) smooths the touch, and it depends on both calendar time and cumulative flow, not a single decaying EWMA. Its backward heat equation H_t+(σ²/2)H_yy=0 also differs from the wait laws above. Freezing out the noise and treating this equilibrium pricing function as a deterministic execution engine is unjustified by Theorem 10.

The distinct [Çetin–Waelbroeck model](https://eprints.lse.ac.uk/120809/1/Power_laws_in_market_microstructure.pdf) uses competitive marginal limit orders and a trading desk. If the signal survival tail is v^(−α), α>1, its tail conditional mean has slope α/(α−1). Their unbounded-signal asymptotic calculation gives impact exponent

\[
\delta=\frac1{\alpha(1-1/N)-1},\qquad N>\frac\alpha{\alpha-1}. \tag{38}
\]

Square-root impact corresponds to α=3N/(N−1), approaching 3 as competition N grows. This is not a universal exponent from a prior alone. Critically, the paper's bounded-signal existence results must not be promoted to an unbounded existence theorem: its Section 7 explicitly uses formal limit interchange and conjectures for the unbounded case. It does not derive a safe EWMA fair update. The contrast with (37) reflects different trading mechanisms and likelihoods, not a contradiction about which tails are “heavy.”

**The metaorder square-root law does not identify the marginal instant curve.**

For the two-state rule, consider a one-direction metaorder at constant rate v over duration H from zero transient. Then Q=vH and z(t)=vτ(1−e^(−t/τ)). For T(z)=az^p on z≥0, the transient end impact and execution-average transient impact are exactly

\[
I_{\rm end}=aQ^p\left[\frac{1-e^{-h}}h\right]^p,
\qquad
I_{\rm avg}=aQ^p h^{-p-1}\int_0^h(1-e^{-u})^pdu,
\quad h=H/\tau. \tag{39}
\]

This follows simply by substitution in T and by integrating vT(z(t))dt/Q. A short burst gives I_end≈aQ^p and I_avg≈aQ^p/(p+1). For a square-root instant curve the ratio tends to 2/3; this is an average-price ratio, not a derived permanent-impact fraction. At H≫τ both are approximately a(vτ)^p. At fixed H, averaging leaves the Q exponent p unchanged. At fixed v, large-Q transient impact approaches a constant. If durations scale as H∝Q^η in the long-burst regime, the apparent exponent is p(1−η), so even an instant convex or linear curve can exhibit a square-root relationship under a particular duration/participation mixture. That is a conditional scaling calculation, not a universal empirical explanation.

A different average, of the decaying mark after one instantaneous block, is aQ^p[τ/(pH)](1−e^(−pH/τ)); it too keeps exponent p at fixed averaging horizon. The permanent component contributes [W(P₀+Q)−W(P₀)]/Q to average cost, independently of the transient calculation. Empirical metaorder regressions mix end impact, execution average, post-trade decay, information and selection. The [Donier et al. latent-liquidity model](https://arxiv.org/abs/1412.0141) is a separate primary example producing nonlinear aggregate impact through liquidity dynamics. It cannot be replaced by the assertion that the observed square root must be the AMM's infinitesimal curve. Conversely a concave T is perfectly compatible with the volume-resilience storage proof; there is no need to reject it merely because it is concave.

**Literature map.** Each link is to a primary paper, its publisher, or its institutional copy. The contribution and departure columns deliberately separate what the literature establishes from the construction in this report.

| Work | Contribution to the information or execution problem | Departure here |
|---|---|---|
| [Kyle (1985), Continuous Auctions and Insider Trading](https://doi.org/10.2307/1913210) | Strategic information release, Gaussian noise camouflage, and linear conditional pricing in an auction. | An integrated nonlinear supply curve is a different execution contract; an exponential alarm and its gain do not follow from Kyle. |
| [Back (1992), Insider Trading in Continuous Time](https://doi.org/10.1093/rfs/5.3.387) | General value distributions in continuous Kyle; the terminal transformation permits nonlinear shapes. | Equation (37) has a calendar horizon and a heat equation, not autonomous volume relaxation. The explicit concave tail calculation above is conditional on its chosen transformation. |
| [Glosten–Milgrom (1985)](https://business.columbia.edu/sites/default/files-efs/pubfiles/1538/bid.pdf) | Competitive sign-conditioned bid/ask prices and adverse selection with discrete arrivals. | A finite-event spread and anonymous trader mixture must be retained or justified away in a limit. |
| [Easley–O'Hara (1987), Price, Trade Size, and Information](https://doi.org/10.1016/0304-405X(87)90029-8) | Size and order sequence reveal information; large orders have different adverse selection. | Does not identify net EWMA units as sufficient or force global convexity. |
| [Easley–O'Hara (1992), Time and the Process of Security Price Adjustment](https://doi.org/10.1111/j.1540-6261.1992.tb04402.x) | Event occurrence is uncertain; timing and inactivity enter inference. | Silence has a likelihood and a compensating arrival process, rather than an arbitrary deterministic forgetting timer. |
| [Holden–Subrahmanyam (1992), Long-Lived Private Information and Imperfect Competition](https://doi.org/10.1111/j.1540-6261.1992.tb03985.x) | Competition among informed traders accelerates revelation in its strategic setting. | Motivates urgency, but does not derive our μ, τ, T, or permanent gain without solving a corresponding equilibrium. |
| [Rochet–Vila (1994), Insider Trading without Normality](https://doi.org/10.2307/2297880) | Existence and uniqueness beyond Gaussian uncertainty in a setting where the insider observes noise trading, and its equivalent demand formulation. | This observation structure differs from standard hidden-noise Kyle; it is not a universal formula for nonlinear AMM pricing. |
| [Bagnoli–Viswanathan–Holden (2001)](https://doi.org/10.1111/1467-9965.00106) | Necessary and sufficient distributional conditions for linear equilibria in several market-making mechanisms. | Non-Gaussian primitives do not automatically imply concave or convex prices. |
| [Li (2013), Insider Trading with Uncertain Informed Trading](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=946324) | Joint learning about value and whether a strategic trader is informed; stochastic price sensitivity. | A distinct probability-of-information state matters. This is not a derivation of a scalar reversible EWMA AMM. |
| [Banerjee–Green (2015), Signal or Noise?](https://snehalbanerjee.github.io/papers/BanerjeeGreen2015.pdf) | Uncertainty about others' information produces nonlinear prices and dynamic learning. | Its investor/equilibrium structure differs from a risk-neutral maker mechanically integrating an odd curve. |
| [Back–Baruch (2004), Kyle Meets Glosten and Milgrom](https://doi.org/10.1111/j.1468-0262.2004.00497.x) | Strategic point-process trading and convergence toward continuous Kyle as trades become small and frequent. | Supplies a route for a spread limit, not permission to omit the execution event at finite order size. |
| [Collin-Dufresne–Fos (2016)](https://doi.org/10.3982/ECTA10789) | Kyle with stochastic noise-trading volatility and endogenous liquidity. | Changes in liquidity cannot all be inferred from the magnitude of signed net flow; noise-volatility state can matter separately. |
| [Çetin–Waelbroeck (2023)](https://eprints.lse.ac.uk/120809/1/Power_laws_in_market_microstructure.pdf) | Tail-based impact asymptotics under a trading-desk mechanism. | No autonomous decay law or manipulation certificate for this AMM follows. |
| [Huberman–Stanzl (2004), Price Manipulation and Quasi-Arbitrage](https://doi.org/10.1111/j.1468-0262.2004.00531.x) | Restricts permanent, time-independent per-trade impact to linear forms under its assumptions. | A conservative S(P) charges the current position and its integral; it is not a nonlinear additive increment depending only on each trade's size. |
| [Gatheral (2010), No-Dynamic-Arbitrage and Market Impact](https://doi.org/10.1080/14697680903373692) | Links nonlinear impact and admissible decay in a propagator model; exponential decay there restricts impact strongly. | T applied to decayed cumulative volume is different from convolving a nonlinear function of trading rate. The operations do not commute. |
| [Obizhaeva–Wang (2013)](https://web.mit.edu/wangj/www/pap/ObizhaevaWang13.pdf) | Resilience of supply/demand changes optimal execution, even with simple static book shape. | Our resilience is selected to dissipate a storage function; information rationalization is additional work. |
| [Alfonsi–Fruth–Schied (2010)](https://arxiv.org/abs/0708.1756) | General order-book shape functions; distinguishes recovery in volume from recovery in price displacement. | Our φ measured in units and decaying exponentially is precisely the volume-resilience coordinate. |
| [Alfonsi–Schied (2010)](https://epubs.siam.org/doi/pdf/10.1137/090762786) | Nonlinear book impact with resilience and absence of manipulation; explains the difference from the propagator construction. | In the collapsed-spread deterministic volume-resilience specialization, the storage proof is our M0. This does not inherit every optimal-execution conclusion for our extra fair dynamics. |
| [Alfonsi–Schied–Slynko (2012)](https://doi.org/10.1137/110822098) | Distinguishes ordinary from transaction-triggered manipulation and relates kernel shape to positive optimal portfolios. | Nonnegative round-trip cost alone does not prove that an optimal buy program never includes sells. We claim the former, not the latter. |

The apparent conflict with linear-permanence results has a simple algebraic resolution. If an additive permanent increment g(q) depends only on an isolated trade, consistency under splitting requires g(q₁+q₂)=g(q₁)+g(q₂), hence linearity under continuity. The increment S(P+q)−S(P) instead depends on the current cumulative state and has a retraceable primitive W. These are different hypotheses. Neither proves that nonlinear permanent impact is an equilibrium posterior in an unrestricted strategic market.

**What can be calibrated from the information primitives.**

There is no identified map from the story's six primitives to six AMM knobs without a specified likelihood, equilibrium and execution convention. The table gives exact mappings where available and observable estimation targets elsewhere. A long-horizon value or markout proxy is needed in addition to signed flow; flow alone does not identify the scale of adverse selection or distinguish all signal/noise mixtures.

| AMM quantity | Relation to explicit primitives or construction | Calibration procedure and identification limit |
|---|---|---|
| τ | Gaussian signal filter: (δ+κ²Σ/σ_N²)^−1 from (33). Rare persistent-episode model: approximately 1/μ; with deaths, the transient likelihood has rate δ+μ. In the safe constructions τ is a positive time scale, not fixed by safety. | Fit marked-arrival likelihoods jointly to durations and signs, and test residual markout decay conditional on pauses. Separate episode survival from value learning. For nonlinear waits estimate the state-dependent rate, not one pooled exponential. |
| Touch density λ₀ | For a marginal curve, 1/T′(0); Gaussian observation gives σ²/Var(v given y=0) after fixing observation-to-volume units. In the convex urgency rule total λ₀=1/(2k₀). For pure square-root T the touch density is zero. | Estimate very-small-fill price slope net of spread, conditioning on initial state. An observed discrete spread is not an infinite slope of a continuous curve. |
| Positive far density floor | Requires a finite positive limiting full walked slope. In (18) it is 1/(2K); in (9) the full lower bound is 1/(s+k+t₀+d). Its information interpretation depends on jump tails **and** the likelihood/trading response. | Fit tail slopes after controlling for order duration, participation and selection. Bounded payoff priors produce saturation, not this floor. A square-root transient alone has increasing far density, not a finite floor. |
| Slow gain S′ or s | An always-present informed intensity contributes to Cov(v,r_s)/r̄_s in (28), but not generically a constant floor; the covariance can vanish after learning. As a benchmark, one-auction Gaussian Kyle has slope σ_v/(2σ_u), from both signal and noise scales. In (18), k₀ is a mechanical slow gain. | Estimate signed markout per unit for low-alarm fills and jointly fit signal/noise scales. Check whether the apparent floor persists after conditioning on learned information. Do not set it equal to an arrival rate with incompatible units. |
| Urgent λ | Exact filter: state-dependent covariance gain (28). Regular symmetric local expansion: (35), usually quadratic. Safe convex mechanism: λ=k₁/(2Lk₀) locally, with error (20). Two-state approximations have errors (15)–(16). | Regress permanent-markout response on pre-fill displacement, including cumulative P, time, spread and flow variance. Test a cusp against an even smooth gain; do not infer causality from contemporaneous price movement. Validate under bursts and reversals, not only monotone orders. |
| C | C=∞ in every idealized construction and filter here. A finite operational maximum is external risk policy. λC≤1 characterizes the original restricted mechanical rule, not an information probability. | Choose operational inventory limits from risk/capital constraints separately. Never use the fitted historical range of P as proof of uncapped safety. |

For the convex rule one can directly estimate the touch/far total slopes, obtain k₀,K and hence k₁, fit the transition scale L from curvature, and fit τ from relaxation of φ−P/2. This calibrates an execution model. Claiming that the fitted k₁ is an informed-arrival rate, or that F is already a posterior mean, would add an unproved interpretation. For the concave rule, estimate a,p jointly with duration effects in (39); choosing p=1/2 solely from an unconditional metaorder plot confounds the instantaneous curve with scheduling.

**Numerical verification.** The following small standard-library check can be run with Python 3 so the key new formulas can be replayed from this one file. It differentiates the primitives, checks the convex compatibility identity, checks arbitrary-state wait dissipation and tick composition, and checks random signed position round trips against the exact storage ledger for both three-state specifications. The random paths include both signs, zero crossings, nonzero retained targets, and positions above 1/λ. It is an algebra/implementation check, not a numerical proof of global safety.

```python
# ponytail: exact primitives and assertions; no simulator framework.
import math
import random

rng = random.Random(20260922)

def convex(x):  # k0=1, k1=2, L=3
    r, sign = abs(x), math.copysign(1, x)
    root = math.sqrt(3 / (3 + r))
    T = sign * (3*r - 12*(1-root))
    V = 1.5*r*r - 12*r + 24*math.sqrt(3)*(math.sqrt(3+r)-math.sqrt(3))
    A = sign * (3*r - 4*math.sqrt(3)*(math.sqrt(3+r)-math.sqrt(3)))
    B = 1.5*r*r - 8*math.sqrt(3)/3*((3+r)**1.5-3**1.5) + 12*r
    return T, V, A, B

def concave(x):  # a=1, p=1/2, lambda=0.4; A,B already include lambda
    r, sign = abs(x), math.copysign(1, x)
    return sign*math.sqrt(r), 2*r**1.5/3, 0.4*sign*2*r**1.5/3, 0.4*r**2.5/3.75

def storage(P, x, F, curve, slow):
    _, V, A, B = curve(x)
    return P*F - slow*P*P/2 + V+B-P*A

def fill(P, x, F, q, curve, slow):
    _, V, A, B = curve(x)
    _, V1, A1, B1 = curve(x+q)
    cost = F*q + slow*q*q/2 + V1-V+B1-B-A*q
    return P+q, x+q, F+slow*q+A1-A, cost

def wait(P, x, t, curve):  # tau=1
    if curve is convex:
        return P/2+(x-P/2)*math.exp(-t)
    if x == 0:
        return 0.0
    sign, r = math.copysign(1, x), abs(x)
    A, b = 1-0.4*P*sign, 0.4/1.5
    if abs(A) < 1e-12:
        return sign*r/(1+b*r*t)
    if A < 0:
        e = math.exp(A*t)
        return sign*r/(e+(b*r/A)*(e-1))
    e = math.exp(-A*t)
    return sign*r*e/(1+(b*r/A)*(1-e))

for curve, slow in [(convex, 0.0), (concave, 0.3)]:
    for P in [-10, -2.5, 0, 2.5, 10]:
        for x in [-2, 0, 2]:  # Includes the A0=0 logistic branch and zero state.
            once = wait(P, x, 1.9, curve)
            twice = wait(P, wait(P, x, 0.7, curve), 1.2, curve)
            assert math.isclose(once, twice, rel_tol=1e-12, abs_tol=1e-12)
    for x in [-12, -2, -0.1, 0.1, 2, 12]:
        eps = 1e-5
        T, V, A, B = curve(x)
        plus, minus = curve(x+eps), curve(x-eps)
        assert math.isclose((plus[1]-minus[1])/(2*eps), T, rel_tol=2e-6, abs_tol=2e-7)
        assert math.isclose((plus[3]-minus[3])/(2*eps), A, rel_tol=2e-6, abs_tol=2e-7)
        if curve is convex:
            h = 3-2*math.sqrt(3/(3+abs(x)))
            assert math.isclose(T+A, 2*x*h, rel_tol=1e-12, abs_tol=1e-12)
    minimum, error = math.inf, 0.0
    for _ in range(500):
        P, x, F = [rng.uniform(-30, 30) for _ in range(3)]
        before = storage(P, x, F, curve, slow)
        after = storage(P, wait(P, x, rng.random()*3, curve), F, curve, slow)
        assert after <= before + 1e-8*max(1, abs(before))
        P = x = F = cost = lost = 0.0
        for _ in range(25):
            P, x, F, cash = fill(P, x, F, rng.uniform(-4, 4), curve, slow)
            cost += cash
            before = storage(P, x, F, curve, slow)
            x = wait(P, x, rng.random()*2, curve)
            lost += before-storage(P, x, F, curve, slow)
        P, x, F, cash = fill(P, x, F, -P, curve, slow)
        cost += cash
        expected = storage(P, x, F, curve, slow)+lost
        error = max(error, abs(cost-expected))
        assert math.isclose(cost, expected, rel_tol=1e-9, abs_tol=1e-8)
        assert cost >= -1e-8
        minimum = min(minimum, cost)
    print(curve.__name__, '500 paths; min cost', minimum, 'max ledger error', error)
```

The check passed. For the convex rule, the minimum sampled cost was 21.6151132719 and the maximum storage-ledger discrepancy was 2.16×10⁻¹². For the concave rule these were 3.8815159950 and 2.85×10⁻¹². The positive minima describe this finite sample, not a strictly positive bound: immediate retraces cost zero. The S and W formulas in (12) and (14) were also checked by independent finite differences at positive and negative arguments.

**Open questions, ranked.**

1. **A strategic information model for a certified rule.** Construct and solve an equilibrium in which an informed trader, an uninformed controller and external noise face the actual integrated execution contract, and whose off-equilibrium likelihoods satisfy a valid bridge. Equations (28)–(31) are exact filters; (18) and (22) are safe mechanisms. Their equivalence is not proved, and the original zero-target specification is ruled out. The artificial posterior potential (36) is not a substitute for this equilibrium.
2. **Which economic compromise to retain.** The two-state rule is the shortest implementation and forgets transients fully, but gives up independent urgency-dependent permanent information. The convex three-state rule retains that feature with a nonzero relaxation target. The concave urgency rule has state-dependent retention and a full fill curve that eventually ceases to be concave. Empirical permanent markouts after equal-volume bursts of different speeds can discriminate between these choices.
3. **A globally concave full walk with bounded increasing urgency gain.** The generic certificate (5) can be used to search for it, including auxiliary state, while requiring globally well-posed and economically sensible waits. An elementary zero-target, frozen-fair, displacement-only solution is excluded by Theorem 4. We have not proved impossibility for all richer-state architectures, nor found a two-state representation with the original independent fair memory.
4. **Transaction-triggered manipulation and external-flow games.** A storage certificate excludes self-financing closed-state pumps in the specified model; it does not establish optimal monotone execution, absence of profitable sandwiching of other orders, or expected losses under an arbitrary strategic multi-trader environment. Those require the execution game and information filtration to be specified.
5. **Identification of tails and timescales.** Estimate the likelihood of silence, episode survival, slow information and noise variance jointly. Then test whether convex touch shrinkage, concave marginal impact, or duration-induced concavity explains the data. Neither Back's tail transform nor the conditional Çetin–Waelbroeck asymptotic supplies a universal prior-to-AMM map.
6. **Exact arithmetic and state maintenance.** Before deployment, implement stable primitives and conservative rounding, test semigroup-consistent ticks, and specify external fair-price resets as additional state transitions with their own storage accounting. The report supplies exact real-arithmetic specifications and a minimal check; it does not claim a production implementation or a calibrated parameter set.
