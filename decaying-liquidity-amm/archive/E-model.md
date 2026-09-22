The information model behind a decaying-liquidity AMM

Research brief 2. September 22, 2026.

There is no exact pump-free Bayesian rationalization of the entire proposed rule with a positive constant λ, unbounded inventory, the specified retracing execution convention, and the specified decay. More strongly, replacing λ|T(φ)| by a nonconstant function of T(φ), including a quadratic, does not fix the problem if that function is still the sole extra fill-time gain and the fair stays fixed between fills. This is a mathematical obstruction, not a missing choice of jump distribution.

There is nevertheless a useful information model behind several parts of the design. A Laplace information jump observed through Gaussian order-flow noise gives an exactly odd, strictly steepening posterior mean whose liquidity density decreases to a strictly positive floor. A hidden informed episode gives an approximately exponential filter, but ordinarily requires a separate activity probability as well as directional flow. The exact permanent-value update is a posterior covariance divided by a predicted arrival intensity, together with a no-arrival correction. In a diffusion experiment it is posterior variance times **innovation flow**, not raw flow. Its first smooth, symmetric correction near the origin is quadratic in displacement, not proportional to its absolute value.

These statements do not assemble into the original three-state AMM without changing its state, execution, or between-fill dynamics. Below I give the exact models and the obstruction, rather than presenting separately derived formulas as a joint equilibrium. I also correct a logical gap in the proposed martingale bridge: an observational Bayesian pricing rule and full support alone do not establish safety against a trader who changes the order-flow law.

“Exact” below means an identity or a proved result under specified primitives. “Approximation” identifies the expansion and the quantities held fixed. The strategic equilibrium and calibration questions left unresolved are listed at the end. No inventory cap is used to establish Bayesian consistency or safety of an exact model.

**A. Primitives, exact filtering, and the parts of the AMM they explain.**

Let V be a terminal payoff with a finite second moment. Work in additive price units around an initial reference value; positivity of the level of an asset price is not being imposed on these centered toy models. A buy has positive quantity. Let N⁺ and N⁻ count orders of size u, and let Q=u(N⁺−N⁻). The market maker observes arrivals, their signs and sizes, elapsed time, and any public signals. Its information is denoted by ℋ. Its posterior mean is M=E[V|ℋ]. A mark-conditioned execution price is distinct from this mean before the mark arrives.

The smallest useful episode model has a hidden state A∈{0,1}, with transition rates 0→1 equal to α and 1→0 equal to δ. The hidden value V persists when A turns off. An episode is an opportunity to trade on information, not the existence of the asset's payoff. Noise orders arrive at rate ε>0 on each side. A slow informed component is present at all times, with intensity coefficient ν≥0; an active episode adds coefficient μ≥0. One possible specification is

\[
 h_+(v,A)=\epsilon+(\nu+\mu A)(v-a)_+,
 \qquad
 h_-(v,A)=\epsilon+(\nu+\mu A)(b-v)_+ .                 \tag{1}
\]

Here a and b are the current ask and bid. This makes informed activity increase with available profit and stops informed buying or selling after the corresponding opportunity has disappeared. It also avoids assuming that an informed trader knowingly trades at a loss. Interpret the participants as receiving expiring trading opportunities; solving a patient, optimizing insider's timing problem is a different model. Competition can increase the aggregate opportunity coefficient μ. It does not follow from Bayes' rule that μ is proportional to the number of competitors, or that these expiring-opportunity strategies constitute a Kyle equilibrium.

For any current joint posterior π(dv,dA), competitive quotes solve

\[
 a={E[Vh_+(V,A)]\over E[h_+(V,A)]},\qquad
 b={E[Vh_-(V,A)]\over E[h_-(V,A)]}.                    \tag{2}
\]

For (1), these equations have the especially informative form

\[
 \epsilon(a-M)=E[(\nu+\mu A)(V-a)_+^2],
 \qquad
 \epsilon(M-b)=E[(\nu+\mu A)(b-V)_+^2].              \tag{3}
\]

There is a unique ask a≥M and a unique bid b≤M. For the ask, the difference between the left and right sides is continuous, strictly increasing, nonpositive at M, and positive for sufficiently large a. The bid proof is the reflection. Finite second moments suffice. Thus Bayes can produce a squared-mispricing moment in the exact update, but it is a conditional tail moment evaluated at an endogenous quote, not a constant times the square of the displayed skew.

An order executed at a or b changes M to that respective quote. There is no cap on the dealer's position, and ε gives every finite sequence of signs positive likelihood. Exact timestamps and real-valued sizes, when continuous, have positive densities or positive probability in neighborhoods, not positive mass at each individual path.

**Theorem 1. The exact Bayesian update.** Let X contain V and any hidden episode state, let L be its Markov generator, and suppose LV=0: the terminal payoff is not destroyed when an episode ends. Write π(f)=E[f(X)|ℋ], Λ=h₊+h₋, and \(\bar h_s=\pi(h_s)\). At a fill of sign s,

\[
 \pi^+(f)={\pi(fh_s)\over\pi(h_s)},\qquad
 \boxed{\Delta M_s={\operatorname{Cov}_{\pi}(V,h_s)\over\bar h_s}.} \tag{4}
\]

Between fills,

\[
 {d\pi(f)\over dt}=\pi(Lf)-\operatorname{Cov}_{\pi}(f,\Lambda),
 \qquad
 \boxed{\dot M=-\operatorname{Cov}_{\pi}(V,\Lambda).} \tag{5}
\]

Equivalently, including both kinds of observation,

\[
 \boxed{dM=\sum_{s=\pm}
 {\operatorname{Cov}_{\pi_{t-}}(V,h_s)\over\bar h_s}
 (dN^s-\bar h_s\,dt).}                               \tag{6}
\]

These are exact laws for the estimate of a permanent payoff. They have no 1/C restriction.

Proof. Conditional on state X, the likelihood of a sign-s arrival in dt is h_s(X)dt+o(dt); normalize to obtain (4). The likelihood of no arrival is 1−Λ(X)dt+o(dt). Apply the hidden-state transition and normalize to obtain (5). Subtracting M in the first formula gives the covariance. Finally, the conditional mean of dN^s is \(\bar h_sdt\), and the sum of the compensators in (6) is −Cov(V,Λ)dt. This proves all three representations and the posterior martingale property. Standard localization or finite-horizon integrability justifies the stochastic integrals. ∎

Formula (4), or (3) for the opportunity specification, is the requested exact replacement for a heuristic permanent update. Keeping only its fill term while discarding (5) is generally not Bayesian. The same formulas apply separately to a persistent latent component U of V: replace V by U. Its gain depends on its covariance with the entire arrival intensity, including urgent trading. A decomposition of V into components does not make their posterior estimates independent.

For a finite hidden-state model the solution is explicit, not just an abstract filtering equation. If π is a column vector and G is the hidden transition matrix, a no-fill interval of length t sends it to

\[
 {e^{(G^{\mathsf T}-\operatorname{diag}\Lambda)t}\pi
  \over \boldsymbol1^{\mathsf T}e^{(G^{\mathsf T}-\operatorname{diag}\Lambda)t}\pi},       \tag{7}
\]

when intensities are constant over that interval. A sign-s fill multiplies component i by h_s(i) and normalizes. Quote-dependent intensities instead require the corresponding finite-dimensional nonlinear ODE. Neither computation uses inventory as a bound on possible hidden information.

**An exactly solved three-point experiment.** Take V=F₀+JZ, with J>0, Z∈{−1,0,1}, and prior probabilities p/2,1−p,p/2. For this experiment replace the profit-sensitive hazards (1) by constant opportunity rates: an informed buy arrives at rate μ in state Z=1, an informed sell at rate μ in state Z=−1, and noise arrives at rate ε on each side. Here μ has units of events per time, rather than events per time per price as in (1). Set α=δ=ν=0. These are exogenous trading opportunities; they are not asserted to be dynamically optimal insider strategies. With the bounded three-point payoff their informed trades do have the profitable direction at the Bayesian quotes.

After n₊ buys, n₋ sells, and time t, put r=1+μ/ε. Unnormalized posterior weights are

\[
 w_0=1-p,\quad w_+=\tfrac p2e^{-\mu t}r^{n_+},\quad
 w_-=\tfrac p2e^{-\mu t}r^{n_-}.                      \tag{8}
\]

The common noise likelihood cancels. Let a=(w₊+w₋)/(w₀+w₊+w₋) be the probability of an information event, and d=(w₊−w₋)/(w₀+w₊+w₋) the signed probability imbalance. Then M=F₀+Jd. With D=n₊−n₋, N=n₊+n₋, η=(log r)/2, and

\[
 z={p\over1-p}e^{-\mu t}r^{N/2},
\]

the exact posterior is

\[
 \boxed{M=F_0+T_z(D),\qquad
 T_z(D)=J{z\sinh(\eta D)\over1+z\cosh(\eta D)}.}     \tag{9}
\]

This is a solved posterior-price formula, but the subscript z is indispensable. Net flow alone is not sufficient. A buy followed by a sell restores D but changes N and therefore the probability of information. Bayes does not retrace its beliefs merely because inventory retraces.

At fixed z, let a₀=z/(1+z). Near zero,

\[
 T_z(D)=Ja_0\eta D+
 {Ja_0(1-3a_0)\eta^3\over6}D^3+O(D^5).              \tag{10}
\]

A sparse event probability a₀<1/3 therefore gives local steepening. Nevertheless T_z(D) tends to ±J. A bounded information jump cannot supply the requested nonsaturating book globally. For unit size u, the slope in physical volume is T'_z(D)/u.

The exact execution prices, with p₊ and p₋ now denoting normalized weights, are

\[
 a_{\rm ask}=M+{\mu p_+(F_0+J-M)\over\epsilon+\mu p_+},
 \quad
 b_{\rm bid}=M+{\mu p_-(F_0-J-M)\over\epsilon+\mu p_-}. \tag{11}
\]

They have a spread even at D=0. The midpoint before the fill is not a zero-profit execution price for that fill.

During silence, writing m=M−F₀,

\[
 \dot a=-\mu a(1-a),\quad \dot m=-\mu(1-a)m,
\]
\[
 \boxed{m(t+h)={m(t)e^{-\mu h}\over1-a(t)+a(t)e^{-\mu h}}.}             \tag{12}
\]

The instantaneous decay time is 1/[μ(1−a)], not a constant. For a≤a_max<1, replacing (12) by m(t)e^{−μh} has relative error

\[
 {a(1-e^{-\mu h})\over1-a+ae^{-\mu h}}
 \le {a_{\max}\over1-a_{\max}}.                      \tag{13}
\]

Thus τ≈1/μ is a controlled rare-event approximation, whereas strong evidence decays much more slowly. Taking “no information event” and “an information event that has stopped trading” to be the same state would erase this distinction.

For p=0.1, μ=4, ε=J=u=1, direct evaluation gives the following. The t=0 rows denote the limit of a rapid sequence of fills, not a positive-probability simultaneous Poisson batch.

| Buys, sells; elapsed time | Event probability a | M−F₀ | Ask−F₀ | Bid−F₀ |
|---|---:|---:|---:|---:|
| 0, 0; 0 | 0.100000 | 0 | 0.166667 | −0.166667 |
| 1, 0; 0 | 0.250000 | 0.166667 | 0.545455 | 0 |
| 3, 0; 0 | 0.875000 | 0.861111 | 0.968944 | 0.810811 |
| 5, 2; 0 | 0.994318 | 0.978535 | 0.995660 | 0.917993 |
| 3, 0; 0.25 | 0.720292 | 0.708859 | 0.924542 | 0.670657 |
| 3, 0; 1 | 0.113640 | 0.111836 | 0.387875 | 0.107839 |

The third and fourth rows have the same recent net flow and different posterior prices. They are an explicit counterexample to exact scalar sufficiency. At high directional certainty the next buy moves the posterior less, even though the price is already displaced. A large mean is not generally a large posterior variance.

There is also a counterexample for the actual EWMA, not just D. At an observation time t, insert four unit orders whose exponential weights are 0.1, 0.3, 0.6 and 0.8, with signs +, −, −, +. Their distinct times are t+τ log(weight); choose t large enough that all are positive. They contribute zero to both P and φ. In (8), however, each directional weight is multiplied by r², relative to a history with no such orders. Both histories have posterior mean F₀ at their symmetric endpoint, but different activity probabilities and different next-buy prices. If M=F+T(φ) with T(0)=0, they also have the same F=F₀. Thus even (φ,P,F) cannot be an exact Markov pricing state for this experiment. The statement compares likelihood densities at these histories; the price distinction persists on neighborhoods.

**Keeping the learned value when an episode dies.** There is an exact version in which a meaningful fair moves only at fills, but its state and update differ from the proposed AMM. Extend the preceding experiment to five hidden states: no event, active positive, active negative, spent positive, and spent negative. An active episode dies at rate δ>0 and becomes spent with the same V. Spent states emit only noise. There are no new episodes or slow informed arrivals in this particular calculation.

Let a be the current active probability, B=E[(V−F₀)1_active|ℋ], and E=E[(V−F₀)1_spent|ℋ]. Set

\[
 r_\delta={\delta\over\delta+\mu},\quad
 Z_\infty=1-(1-r_\delta)a,
 \qquad
 \boxed{F=F_0+{E+r_\delta B\over Z_\infty}.}          \tag{14}
\]

Here F is defined operationally as the limiting posterior after a counterfactual indefinitely long silence. It is not asserted to be a separate, uniquely identifiable component of value. Factoring out the common noise likelihood makes this limit well-defined even though an infinite interval without noise trades has probability zero.

An active state survives a silent interval h with relative weight e^{−(δ+μ)h}; it transfers weight δ[1−e^{−(δ+μ)h}]/(δ+μ) to its spent counterpart. Thus, with

\[
 k(h)=r_\delta+(1-r_\delta)e^{-(\delta+\mu)h},
\]

\[
 M(h)-F_0={E+k(h)B\over1-a+a k(h)}.                 \tag{15}
\]

Formula (14) follows by taking h→∞. Applying further silence does not change that eventual limit, so **F in (14) is exactly constant between fills**. The residual T=M−F satisfies

\[
 {T(h)\over T(0)}=
 {e^{-(\delta+\mu)h}\over1-a+a k(h)}                 \tag{16}
\]

when T(0)≠0. Its exponential approximation has rate δ+μ and a relative error bounded by

\[
 {(1-r_\delta)a\over1-(1-r_\delta)a}.
\]

To obtain the exact fill update, tilt the current posterior by w=1 on inactive states and w=r_δ on active states, and normalize; call the result \(\widetilde\pi\). Then F=\(\widetilde\pi(V)\), and at a sign-s fill

\[
 \boxed{\Delta F_s=
 {\operatorname{Cov}_{\widetilde\pi}(V,h_s)
  \over\widetilde\pi(h_s)}.}                        \tag{17}
\]

In the three-point version, if p_s is the current probability of active sign s,

\[
 \Delta F_s=
 {\mu r_\delta p_s\,[F_0+sJ-F]
  \over\epsilon Z_\infty+\mu r_\delta p_s}.          \tag{18}
\]

Proof of (17). A fill multiplies π by h_s. Multiplication by w commutes with this operation; applying (14) after the fill is therefore ordinary Bayes updating of \(\widetilde\pi\). Subtract its old mean. ∎

This is a concrete exact fill-only fair law, derived from death and arrival primitives. It is side-specific, bounded by the remaining value uncertainty in this finite-support case, and depends on more than displacement. An opposite-side order is new evidence, not an inverse operation. In particular, there are no universal constants λ and S′ that turn (18) into [S′+λ|T|]dq. At the initial symmetric prior its nonzero fair movement comes from the same informed opportunity process; it cannot uniquely be called a separate slow component.

One can quantify the failure without a Taylor approximation. At a symmetric state with no spent mass, F=F₀ and T=0, but the exact fair gain per signed unit is

\[
 G_0(a)={J\mu r_\delta a\over
 u\{2\epsilon[1-(1-r_\delta)a]+\mu r_\delta a\}}.     \tag{18a}
\]

Two such states with different a have different gains at the same displacement. Any single proposed S′(0) has worst-case error at least half their gain difference; λ|T| contributes nothing. Away from zero, the exact finite-fill gain error is explicitly ΔF_s/(su)−S′(P)−λ|M−F|, with ΔF_s from (18). A bound depending only on a position cap or on |M−F| cannot control the omitted belief state. The controlled absolute-value fit in (33) therefore concerns a fixed-precision posterior experiment, not a universal approximation to (18).

Also, M=F+T here is the value estimate before the next mark. The executable price is R_s=F+T+ΔM_s, with ΔM_s from (4). Dropping this spread/update term needs a specified small-order scaling; merely writing dq does not remove the information in the sign of an order.

This filtering construction also works with an unbounded jump J and size-dependent active intensities. If the total extra active intensity is μ(J), replace w on active states by δ/[δ+μ(J)]. For example, μ(J)=c|J| with a Laplace jump lets counts convey information about magnitude. Equations (14)–(18) then become posterior integrals, with (17) unchanged. With prescribed sign-only trading this extension is a statistical observation model; unlike the three-point case, some informed realizations could trade at a loss after prices move, so optimizing execution requires modifying those intensities. Neither a bounded jump in the displayed special case nor its unbounded extension bounds the dealer's accumulated inventory. Repeated births, quote-dependent death, and a permanent slow channel require the larger filter (4)–(7); one must not retain the simple w formula after changing those primitives.

There is an important limit to what was solved here: (8)–(18) are exact Bayesian filters and zero-profit mark quotes under the specified opportunity model. They do not prove that an anonymous dealer using this filter is immune to every strategic change in the arrival law. Part B states and closes that gap under an explicit assumption; it does not conceal it behind the word “Bayesian.”

**When an exponentially weighted net flow is a justified approximation.** A particularly transparent calculation models signed episode pressure X∈{−J,0,J}, with 0→±J at rate α/2 and ±J→0 at rate δ. In a high-count, small-order approximation observe

\[
 dQ=\beta X\,dt+\sigma\,dW.
\]

Write x=E[X|ℋ] and a=Pr(X≠0|ℋ). The exact diffusion filter is

\[
 dx=-\delta x\,dt+
 {\beta\over\sigma^2}(J^2a-x^2)(dQ-\beta x\,dt),
\]
\[
 da=[\alpha(1-a)-\delta a]dt+
 {\beta\over\sigma^2}x(1-a)(dQ-\beta x\,dt).           \tag{19}
\]

These follow by the same likelihood expansion as Theorem 1, now using a Gaussian observation increment: the gain for a function f is Cov(f,X)β/σ². The hidden generator sends X to −δX and 1_{X≠0} to α(1−1_{X≠0})−δ1_{X≠0}.

Linearize the signed equation around x=0 and a=a*=α/(α+δ), and freeze that activity probability. This is a frozen-activity approximation, not an exact closure of the coupled filter. Define

\[
 K={\beta J^2a_*\over\sigma^2},\qquad
 \boxed{\tau^{-1}=\delta+{\beta^2J^2a_*\over\sigma^2}.} \tag{20}
\]

Then x≈Kφ, where

\[
 d\phi=dQ-\phi\,dt/\tau,
 \qquad \phi_t=\int_{-\infty}^t e^{-(t-s)/\tau}dQ_s.   \tag{21}
\]

The neglected change in the gain is exactly

\[
 {\beta\over\sigma^2}\{J^2(a-a_*)-x^2\}.             \tag{22}
\]

This identifies the approximation's domain: changes in activity and directional certainty must be small. For Poisson orders of size u with weak directional excess rate μ, β≈uμ/J and σ²≈2εu², giving τ^{-1}≈δ+μ²a*/(2ε). If informed counts are not small relative to noise counts, they also contribute to the observation variance; the displayed σ² approximation must then be replaced.

Equation (21) is a local filter for **signed pressure**. It is not by itself a sufficient statistic for event occurrence. The probability a is even under reversal of the data, whereas φ changes sign. Moreover, X dying in (19) means that trading pressure dies. Interpreting X itself as a permanent fundamental jump would wrongly make the information vanish. The persistent-value model requires retaining V alongside A, as in (1)–(7) or the active/spent construction.

There are consequently several different quantities called a “decay time”: the lifetime 1/δ, the local filtering time (20), and the conditional-silence times in (12) and (16). They need not coincide. A constant τ obtained by fitting signed-flow autocorrelation is not automatically a Bayesian silence-decay parameter.

Competition supplies a plausible source of high β, but its effect should be derived within an equilibrium rather than stipulated. As a simple benchmark, in a one-auction Gaussian Kyle game with N equally informed Cournot traders, value variance Σ and noise-order variance σ_u², a symmetric linear equilibrium has individual order coefficient σ_u/√(NΣ), total coefficient B=σ_u√N/√Σ, and price slope √(NΣ)/[(N+1)σ_u]. To verify these formulas, combine each trader's first-order condition 1=λ_K(N+1)b with λ_K=BΣ/(B²Σ+σ_u²), B=Nb. Competition increases aggregate information delivery. This calculation does not determine a Poisson episode's death rate or prove a joint nonlinear dynamic equilibrium. [Holden and Subrahmanyam's dynamic competition model](https://host.kelley.iu.edu/cholden/Holden%20and%20Subrahmanyam%20%281992%29.pdf) supplies the relevant urgency mechanism.

**Theorem 2. What determines steepening.** Consider the fixed-experiment observation

\[
 Y=\beta J+\eta,\qquad \eta\sim N(0,\sigma_Q^2),\quad
 y=Y/\beta,\quad s^2=\sigma_Q^2/\beta^2,
\]

with β>0 and a symmetric prior π₀ on J. Let m(y)=E[J|y] and let κ_k(y) be the kth posterior cumulant. Then

\[
 m'(y)={\kappa_2(y)\over s^2},\qquad
 m''(y)={\kappa_3(y)\over s^4},\qquad
 m'''(0)={\kappa_4(0)\over s^6}.                     \tag{23}
\]

The response is odd and increasing. It steepens on y>0 exactly where the posterior third central moment is positive. If κ₄(0)>0, it steepens locally away from zero. The relevant kurtosis is that of the prior **after multiplication by** exp[−J²/(2s²)], not necessarily the unconditional jump kurtosis.

Proof. Apart from a y-only constant, the posterior is the exponential family

\[
 \pi_y(dj)\propto e^{yj/s^2-j^2/(2s^2)}\pi_0(dj).
\]

Derivatives of its log normalizer are successive cumulants. Symmetry gives oddness and zero third cumulant at the origin. Differentiating yields (23). ∎

For binary J=±j, this gives m(y)=j tanh(jy/s²), an increasing saturating response. More generally a prior supported on [−j,j] gives a bounded posterior mean and cannot yield the required nonsaturating curve. Under the usual endpoint-support condition it tends to j as y→∞. For a spike-and-two-point prior, the effective zero-observation active probability is

\[
 \widetilde p={p e^{-j^2/(2s^2)}\over1-p+p e^{-j^2/(2s^2)}},
 \quad
 \kappa_4(0)=j^4\widetilde p(1-3\widetilde p).         \tag{24}
\]

It can therefore steepen near zero and still saturate far away. A Gaussian prior instead gives a linear response with constant variance. A heavy-tailed prior is not sufficient for global steepening: for a Student-type density proportional to |j|^{−(ν+1)} in the tails, fixed Gaussian observation noise gives

\[
 m(y)=y-{(\nu+1)s^2\over y}+O(y^{-3}),
 \qquad m''(y)=-{2(\nu+1)s^2\over y^3}+O(y^{-5})<0   \tag{25}
\]

eventually. This follows by expanding the smooth tail density around the Gaussian likelihood's center. Such a response approaches its far slope from above, not below.

The brief's proposed necessity of “a sparse or heavy-tailed prior” is consequently too broad as a theorem. Under the specified linear Gaussian observation experiment, (23) is the exact condition; a peaked center with relatively broad tails is a useful economic explanation. Laplace tails are heavier than Gaussian tails but are not heavy tails in the strict no-exponential-moments sense. With a nonlinear trading likelihood even a Gaussian value prior can give a convex response: observing asinh(J) with vanishing observation noise yields posterior mean approaching sinh(y). Prior and trading strategy must be specified together.

**Theorem 3. A globally steepening, nonsaturating Laplace curve with a positive liquidity floor.** Take

\[
 \pi_0(j)={a\over2}e^{-a|j|},\qquad a>0,
\]

in Theorem 2. Use Φ and ϕ_N for the standard normal distribution and density, and define

\[
 A_+(y)=e^{-ay}\Phi(y/s-as),\qquad
 A_-(y)=e^{ay}\Phi(-y/s-as),
\]
\[
 u(y)={A_+(y)-A_-(y)\over A_+(y)+A_-(y)},
 \qquad
 \boxed{m(y)=y-as^2u(y),\quad T(\phi)=m(\phi/\beta).} \tag{26}
\]

This is an exact posterior for the observation Y=φ, not an assertion that an exponentially discounted history has that likelihood. For this experiment,

\[
 T(-\phi)=-T(\phi),\quad 0<T'(\phi)<1/\beta,
 \quad T''(\phi)>0\quad(\phi>0),
\]
\[
 T(\phi)=\phi/\beta-as^2+o(1)\quad(\phi\to+\infty),
 \qquad T'(\phi)\longrightarrow1/\beta.              \tag{27}
\]

Thus the liquidity density measured as units per price,

\[
 \ell(x)={1\over T'(T^{-1}(x))},
\]

is highest at the center and strictly decreases with |x| to the positive floor β. There is no saturation or infinite wall of liquidity.

Proof. Completing the square on the positive and negative half-lines gives A₊ and A₋ as their relative posterior masses. Integration of the posterior score gives m=y−as²E[sgn J|y], proving (26). Equation (23) gives m'>0. Also u'=Cov(sgn J,J)/s²>0, so m'=1−as²u'<1.

Here is a direct proof of global steepening. For y>0, symmetry and exponential tilting give m>0 and 0<u<1. Let f_y be the posterior density and compare its values at equal distances z>0 from its mean m. For 0<z<m,

\[
 \log{f_y(m+z)\over f_y(m-z)}
 ={2(y-m-as^2)z\over s^2}<0.
\]

For z≥m, the same log ratio is

\[
 {2(y-m)z\over s^2}-2am=2a(uz-m).
\]

Therefore f_y(m+z)−f_y(m−z) has exactly one sign change, from negative to positive, at z*=m/u>m. Its first moment weighted by z is zero because m is the mean. Consequently its third moment equals

\[
 \int_0^\infty z(z^2-z_*^2)
 [f_y(m+z)-f_y(m-z)]\,dz>0.
\]

Both factors change sign together. Hence κ₃(y)>0, and (23) proves m''>0. Finally, as y→∞ the negative half-line has vanishing posterior mass; on the positive half-line the distribution approaches a normal with mean y−as² and variance s². This proves (27). ∎

Put b=as and R_b=ϕ_N(b)/Φ(−b). The zero-observation posterior variance is

\[
 v_0=s^2[1+b^2-bR_b].
\]

The two densities are therefore explicit outputs of the jump prior and the noise-to-signal ratio:

\[
 \boxed{\lambda_0={\beta\over1+b^2-bR_b},
 \qquad \ell_\infty=\beta.}                         \tag{28}
\]

Here λ₀ denotes the touch density requested in the brief; it is unrelated to either the urgent-update coefficient λ or Kyle's customary price-impact coefficient. If a permanent fair also moves inside a fill, the density of the **whole executed curve** is 1/[T′(φ)+dF/dq]. Formula (28) describes the T component alone.

For a=s=β=1, numerical evaluation gives:

| φ | T(φ) | T′(φ) |
|---:|---:|---:|
| 0 | 0 | 0.474865 |
| 0.25 | 0.119166 | 0.480254 |
| 0.5 | 0.241019 | 0.496333 |
| 1 | 0.503223 | 0.558957 |
| 2 | 1.161089 | 0.767357 |
| 4 | 3.001710 | 0.994549 |
| 8 | 7.000000 | 1.000000 |

The touch density is 2.105863 and the far density is 1. The derivative in the table was checked by centered differences; the monotonicity and limit are proved above, not inferred from this grid.

**The exact permanent update in the Laplace experiment.** A dynamic version observes a fixed permanent value J through

\[
 dY_t=cJ\,dt+\sigma\,dW_t.
\]

With a Laplace prior, its posterior density is exactly

\[
 \pi_t(j)\propto\exp\left[-a|j|+
 {cY_t\over\sigma^2}j-{c^2t\over2\sigma^2}j^2\right]. \tag{29}
\]

For t>0, apply (26) with y=Y_t/(ct) and s²=σ²/(c²t). A further observation ΔY over Δt multiplies (29) by

\[
 \exp\left[{cj\Delta Y\over\sigma^2}
           -{c^2j^2\Delta t\over2\sigma^2}\right].    \tag{30}
\]

This is an exact finite-update law, valid for arbitrary order-flow observations and unbounded values. In innovation form it is

\[
 \boxed{dM_t={c\,\operatorname{Var}(J|\mathcal H_t)\over\sigma^2}
              (dY_t-cM_t\,dt).}                    \tag{31}
\]

The proof is the Gaussian likelihood expansion used in (19), or direct Itô differentiation of (29). The observed innovation dY−cMdt has conditional mean zero, so M is a martingale. Information precision c²t/σ² is an additional state. This filter does not forget its evidence exponentially. Its price depends on the cumulative signal and its precision, rather than on an arbitrarily discounted copy of that signal.

For a fixed-precision slice of this posterior, the marginal response to volume is

\[
 G(x)={\operatorname{Var}(J|y)\over\beta s^2},
 \qquad x=m(y),
\]

where β=ct for the slice of (29). Expanding (23) and inverting x=m(y) gives

\[
 \boxed{G(x)=G_0+G_2x^2+O(x^4),\quad
 G_0={v_0\over\beta s^2},\quad
 G_2={\kappa_4(0)\over2\beta s^2v_0^2}.}            \tag{32}
\]

For the Laplace case G₂>0. One proof uses its representation as a centered normal with exponentially distributed variance W. Multiplying by the zero-observation Gaussian likelihood leaves a nondegenerate mixture of centered normals with variances (W⁻¹+s⁻²)⁻¹. Its fourth cumulant is three times the variance of these component variances, hence strictly positive. With a=s=β=1, κ₄(0)=0.172699, G₀=0.474865, and G₂=0.382930. This is an exact Bayesian gain with a locally quadratic excess. It is the gain of the **total posterior value**. Adding it once more to a quote that already includes that same posterior response would double-count the information.

A nonzero λ|x| is not its asymptotic expansion at zero: its error relative to the correct excess is λ|x|−G₂x²+O(x⁴), dominated by the spurious linear term. If an operator deliberately fits over 0≤|x|≤A, least squares against the quadratic term with uniform weight gives

\[
 \lambda_{\rm fit}={3\over4}G_2A,
 \qquad
 \sup_{|x|\le A}|G(x)-G_0-\lambda_{\rm fit}|x||
 \le {G_2A^2\over4}+O(A^4).                         \tag{33}
\]

This supplies both a fitting convention and its error. λ changes with the fitting window and with precision. A position cap by itself supplies neither. Moreover, a bound on instantaneous gain error does not preserve no-manipulation over arbitrarily long repeated loops: small nonconservative errors can accumulate.

**What an always-present slow informed channel contributes.** In a separate Gaussian experiment for a persistent component U, with prior variance Σ₀ and dY_s=c_sUdt+σ_s dW_s, the posterior variance and gain are

\[
 \Sigma_s(t)=(\Sigma_0^{-1}+c_s^2t/\sigma_s^2)^{-1},
 \quad
 dF_s={c_s\Sigma_s(t)\over\sigma_s^2}
       (dY_s-c_sF_sdt).                             \tag{34}
\]

Thus a positive local slow slope can be identified with c_sΣ_s/σ_s² in innovation-volume units. It is not generally an arbitrary function S′(P), nor a positive constant forever: uncertainty about a fixed value is gradually exhausted. If permanent news instead has variance rate σ_v² and the slow signal has coefficient c_s, the steady-state Kalman equation is

\[
 0=\sigma_v^2-{c_s^2\Sigma_s^2\over\sigma_s^2},
 \quad \Sigma_s={\sigma_v\sigma_s\over c_s},\quad
 K_s={\sigma_v\over\sigma_s}.                       \tag{35}
\]

A lasting positive floor therefore needs continuing information supply or another source of replenished uncertainty. Interpreting K_s as S′ remains a local reduction with matched volume units. In an unlabelled common tape, slow and urgent signals interact in the joint posterior, so their separately computed gains cannot simply be added.

Equations (19)–(35) give a precise structure statement. Exponential memory comes from stable hidden-state/filter dynamics and is usually a linearization. Steepening comes from increasing posterior variance in the direction of the observation; bounded jumps eventually saturate, Gaussian conjugacy is linear, and Laplace jumps under Gaussian observation give the desired global shape. A permanent gain comes from a covariance with information about a persistent payoff. Neither a constant urgent coefficient nor an inventory boundary follows from these facts. The same observable displacement can arise with different activity probabilities, signal precision, episode age, and remaining value uncertainty.

**B. Consistency, execution, and the uncapped obstruction.**

The local results used here are [M4-SAFETY.md](M4-SAFETY.md), [DECAYING-LIQUIDITY-AMM.md](DECAYING-LIQUIDITY-AMM.md), and [D-dynamics-full.md](D-dynamics-full.md). Their safety notion concerns a trader who directly controls signed fills and waits against a deterministic rule. That is stronger than evaluating expected profits under one exogenous statistical order-flow model. It is also different from declaring that every previously displaced book must offer no profitable liquidation opportunity to a new trader.

For reference, write V_T(x)=∫₀ˣT(u)du and W(P)=∫₀ᴾS(u)du. Start at P=φ=0. If dF=S′(P)dq and F is frozen during waits, the round-trip cash cost is

\[
 \boxed{\mathcal C=V_T(\phi_e)+
 \int_{\rm waits}{\phi T(\phi)\over\tau}\,dt\ge0.}    \tag{36}
\]

Proof. S′ integrates to F₀+S(P)−S(0), whose trading cost is a conservative integral in P and cancels on a flat round trip. The T cost telescopes to its final potential plus the potential lost during decay. ∎

This is M3 and, with S=0, M0. It requires the live P inside the fill integral. It does not require S to be linear. For the urgent term, let A_T(x)=∫₀ˣ|T(u)|du and B_T(x)=∫₀ˣA_T(u)du. After removing the conservative S contribution, the exact identity is

\[
 \mathcal C=V_T(\phi_e)+\lambda B_T(\phi_e)
 +\int_{\rm waits}{1\over\tau}
 \left\{\phi T(\phi)[1-\lambda P\operatorname{sgn}\phi]
       +\lambda|\phi|V_T(\phi)\right\}dt.            \tag{37}
\]

For an actual hard position cap |P|≤C, λC≤1 is sufficient and, for an active continuous curve, sharp. Without that cap every λ>0 is unsafe. The factor 1−λP sgnφ explains 1/C: it bounds monetization of a price revision on held inventory relative to dissipated curve potential. It is not a Bayesian probability bound.

An informed trader's expected episode volume is not an inventory bound: Poisson counts have unbounded support, and noise alone can generate arbitrarily large P. Nor does posterior certainty about activity define such a bound. With unbounded value support, certainty that flow is informed can coexist with continuing uncertainty about how large the value is; in (27), the posterior variance tends to s² rather than zero. Nothing in this model plays the role of C. C enters only if the operator separately imposes it on an approximation.

For completeness, the other inherited results also matter here. Absorbing released skew during decay with dF=ρ(φ)T′(φ)φdt/τ is safe without a cap only when ρT′ is a constant κ, with the remaining residual impact of the appropriate sign; under 0≤ρ≤1 this includes κ≤inf T′. A constant positive absorption share therefore fails for genuinely curved T. Charging the slow term at P−φ instead of at P requires 0≤S′≤inf_{x>0}T(x)/x. These restrictions are specific to those execution and resilience laws. Calling the affected terms posterior information does not remove the restrictions.

**Theorem 4. No nonconstant alarm-only fill gain is safe with unbounded positions.** Suppose T is continuous, odd and increasing, g is continuous and even, and the rule is

\[
 R=F+T(\phi),\quad dF=[S'(P)+g(\phi)]dq,
 \quad \dot F=0,\quad \dot\phi=-\phi/\tau
 \quad\hbox{between fills}.                         \tag{38}
\]

Fills integrate the whole contemporaneous price path, and arbitrary finite positions, finite numbers of fills, and finite waits are allowed. If g is nonconstant, there is a profitable exact loop from rest, including restoration of F. If g is constant, every flat round trip from rest has nonnegative cost under the sign condition φT(φ)≥0.

Proof. First subtract the conservative fair S(P)−S(0); it has zero cost around every closed P path. Let H(x)=∫₀ˣg(u)du, U=T+H, and \(\widetilde F=F-H(\phi)\). During a fill \(\widetilde F\) is fixed and the quote is \(\widetilde F+U(\phi)\). During a wait,

\[
 d\widetilde F=g(\phi)\phi\,dt/\tau.
\]

Choose x,y>d>0 and let c=P−φ. Start a small cycle at (φ,c)=(x,c₀): wait from x to x−d; trade to −y; wait to −y+d; trade back to x. It closes P and φ exactly. Put

\[
 A_x=\int_{x-d}^{x}g(u)du,\quad
 A_y=\int_{y-d}^{y}g(u)du,\quad
 D_z=\int_{z-d}^{z}U(u)du.
\]

The cycle's contribution to the full-loop profit identity is

\[
 J(c_0)=c_0(A_x-A_y)+xA_x+(y-d)A_y-D_x-D_y.           \tag{39}
\]

It follows by multiplying each wait's fair change by the inventory held during that wait and subtracting the lost U potential. If g is nonconstant, intervals can be chosen with A_x≠A_y. Choose c₀ of the appropriate sign and sufficiently large magnitude to make J(c₀)>0. The base state is accessible from rest: trade 2c₀, wait one half-life, then trade x−c₀. A finite reverse connection exits it. These connections have a fixed cost. Repeating the middle cycle sufficiently many times produces a profitable flat round trip. The cycle's fair shift is independent of a constant offset in its starting fair, so repetition is valid. Append the sign-reflected entire strategy: its cash profit is the same and its fair shift is opposite. All states now close exactly. Every wait and every position used is finite.

If g≡k, then F=F₀+S(P)−S(0)+kP. Its entire additional execution cost is conservative in P. Equation (36) proves sufficiency. ∎

The theorem covers g=λ|T|, g=λT², a smooth saturation of either gain, and any nonconstant even alarm-only modification. Bounded **gain** is not bounded inventory. The obstruction disappears only by changing a relevant assumption: dependence on additional posterior states or P, different between-fill dynamics, a different execution protocol, strategy-dependent inference, or a sufficient spread. Changing the exponent alone is not a solution.

For an explicit quadratic-gain counterexample, normalize T(φ)=φ, g(φ)=φ², S=0 and τ=1. From rest execute +2, wait until φ is multiplied by 3/4, execute −5/2, wait until φ is multiplied by 1/2, execute +5/2, then −2. This restores P=φ=0, raises F by 5/4, and has cash cost −95/96. Follow it with its sign reflection to restore F as well. The resulting exact loop earns 95/48. These numbers follow by integrating H(x)=x³/3 and its primitive x⁴/12 inside every fill; they were also checked with rational arithmetic. The largest absolute position is only 2. The theorem, unlike this convenient numerical example, applies to the desired curved T as well.

There is a useful exact structural repair, though it is an execution construction rather than a Bayesian derivation. Allow

\[
 dF=[S'(P)+g(\phi)]dq+
       [\kappa-g(\phi)]{\phi\over\tau}dt.            \tag{40}
\]

Then

\[
 F=F_0+S(P)-S(0)+H(\phi)+\kappa(P-\phi),
\]
\[
 R=F_0+S(P)-S(0)+\kappa P+
          [T(\phi)+H(\phi)-\kappa\phi].             \tag{41}
\]

If φ[T(φ)+H(φ)−κφ]≥0, the same potential proof as (36) gives uncapped safety. For example, g≥g(0)≥0 and κ=g(0) suffice. But after φ decays the settled fair is F₀+S(P)−S(0)+κP: the nonlinear urgent component has not become permanently retained information. This is exactly why the compensating drift matters. It agrees with the change-of-variables analysis in D-dynamics-full.md.

**The martingale bridge, stated with its necessary assumptions.** There are two meanings of “an uninformed strategy.” In a fixed stochastic market, it can mean a predictable holding process trading at an existing price process. In a market-making mechanism, it can mean a controller whose orders change the observations used to construct that price process. A proof for the first meaning does not automatically prove the second.

**Theorem 5. Correct bridge.** Fix an admissible strategy, its actual probability law, and finitely many decision times (or a stopped version for which the holding-gain process is uniformly integrable). Let \(\mathcal G_n\) include public observations and that trader's nonfundamental information, including its own randomization and order identities when these are informative. Suppose

\[
 M_n=E[V|\mathcal G_n]
\]

is a uniformly integrable martingale on the horizon considered. Let q_n be its signed fill, H_n=Σ_{i≤n}q_i, and c_n its cash payment. Assume H_{n−1} is measurable at n−1, the relevant gains are integrable, H₀=H_N=0, and

\[
 c_n=q_nM_n+L_n,\qquad L_n\ge0.                     \tag{42}
\]

Then

\[
 \boxed{E[\Pi]=-E\sum_nL_n\le0.}                    \tag{43}
\]

If the assumptions hold conditionally from every reachable history and under every allowed uninformed policy, no such policy can guarantee a strictly positive cash profit from any of those histories. No position cap is required; integrability and admissibility replace an arbitrary numerical bound on positions.

Proof. Discrete integration by parts gives

\[
 -\sum_n c_n
 =\sum_n H_{n-1}(M_n-M_{n-1})-\sum_nL_n
\]

when terminal inventory is zero. The first term has expectation zero. Conditioning on a starting history gives the same result. A certain strictly positive profit contradicts (43). Continuous trading gives the same equality when the holding gain is a true martingale; usual lower-bound admissibility instead yields the corresponding no-positive-expectation inequality through the supermartingale argument. In particular, doubling strategies are excluded. ∎

If every infinitesimal fill is executed at its own post-fill posterior and the trader has no extra relevant information beyond the pricing filtration, then L_n=0 at each elementary fill and the theorem applies. If quoted ask and bid surround the trader's contemporaneous conditional valuation, their execution wedge supplies L_n≥0. These are explicit hypotheses, not conclusions that follow from the label “uninformed.”

Full support is useful for extending a **policy-consistent** condition to reachable histories. In discrete models it prevents hiding a violation on a purportedly impossible finite sign sequence. In continuous models, continuity plus support of neighborhoods is the appropriate replacement. Full support neither makes a posterior invariant to a strategic intervention nor turns a profitable event of positive probability into a sure-profit strategy.

**Counterexample 1. The bridge as phrased in the brief is false without policy consistency.** Let V be ±1 with equal probability. Let the first order Q₁ be an independent fair ±1 coin. In the statistical model used by a dealer, let the second order satisfy Q₂=−V with probability 1−e and Q₂=V with probability e, where 0<e<1/2. All four order paths have strictly positive probability. The post-fill Bayesian prices are

\[
 p_1=0,\qquad p_2=-(1-2e)Q_2.
\]

An uninformed controller who can replace the two orders by Q₁=+1,Q₂=−1 buys at zero and sells at 1−2e, a deterministic positive profit. Both prices were genuine post-fill posteriors under the stated full-support observational model. They are not posteriors under the controller's actual intervention. This intentionally simple example need not be an optimizing informed-trader equilibrium: the proposed bridge assumed a probability model, not such an equilibrium. That missing strategic assumption is precisely the issue. ∎

Under a fixed law, the theorem does rule out a sure gain that is attainable as a predictable strategy against its price process. The stronger valid corollary is: **a mechanism admitting a sure-profit loop cannot be a correctly specified Bayesian mechanism under all the policies that make the loop executable, with the information and execution hypotheses of Theorem 5.** It may still be a posterior process under some exogenous full-support order-flow model.

For the exact filters in Part A, there are two ways to close this gap. One is to solve an equilibrium including the optimizing uninformed controller and to verify the actual, possibly policy-dependent likelihoods and execution inequalities in Theorem 5. This report does not claim to have solved that nonlinear anonymous-control equilibrium. Zero profit of the dealer alone would not solve it.

The other is a simple explicit benchmark: speculative control orders are publicly identified as such, their policy is known, and they carry no private information about V. Use (4)–(7) for the anonymous information/noise tape, and exclude identified control orders from its likelihood. Fill an identified control order at the current conditional expectation, or at quotes with a nonnegative wedge around it. Its holdings can be arbitrarily large but admissible; its orders do not change the distribution of the external information tape. Theorem 5 proves pump-freedom with no cap, and (4)–(6) are the exact fair update under this model. The cost of this complete consistency result is explicit: the controller cannot make its own order both known-uninformative and evidence of somebody else's information. This benchmark does not rationalize a homogeneous anonymous AMM in which all own flow updates φ identically.

An alternative practical separation is to use an exogenous Bayesian martingale as the center and a mechanical M0/M3 book for the controller's own execution impact. If its signal process is unaffected by that controller and remains a martingale in its filtration, integration by parts adds a zero-mean holding gain to the nonnegative storage cost (36). This also proves uncapped expected no-manipulation. The mechanical premium is then an execution cost, not itself a claim that every marginal fill equals the fundamental posterior.

**What “including that fill” requires.** In Glosten–Milgrom, the ask is E[V|pre-fill history, a buy occurs], and the bid is E[V|pre-fill history, a sell occurs]. They are posted before the trade but already condition on the event that will select them. “Preposted” does not mean “the pre-trade unconditional mean.” A quote for a displayed infinitesimal unit must additionally condition on that unit actually being reached, on already executed units, and on any visible parent-order information. For a resting limit order, the relevant event is its execution, which may be a tail event in order size.

In discrete Kyle auctions the clearing price is E[V|history, current aggregate order flow]. It is a post-order-flow conditional price for the whole auction, not simply the previous auction's price. In continuous Kyle, execution uses the current price process; continuity and the allowed trading class make pre/post differences vanish in the appropriate limit. That limit cannot be imported unchanged for block trades, jump signals, or order-by-order nonlinear AMM walks.

For example, in a single Gaussian signal auction with linear posterior M(y)=ky and initial mean zero, the zero-profit block price for a block producing y=q is kq per unit. Charging ∫₀ᵠkx dx=kq²/2 instead leaves an expected dealer loss kq²/2 conditional on that order. A sequential information-revealing walk is a different experiment from observing one final aggregate quantity. A valid walk model must specify which information is available at each successive fill. A finite block cannot be priced by integrating endpoint posteriors from incompatible counterfactual experiments.

Likewise, a return order is a fresh likelihood observation. The count N in (9), for example, increases on both sides. Treating a sale as exactly the inverse likelihood of a purchase requires a special observation structure; ordinary Poisson noise plus informed arrivals does not have it. This is a second gap between the exact posterior filters and the AMM's free retracing of an instantaneous round trip.

**Spreads, the loop bound, and who pays informed traders.** A nonnegative half-spread h adds ∫h|dq| to a mechanical round trip's cash cost. Hence λC≤1 remains sufficient for the capped rule, but is no longer generally a necessary threshold with a spread. The new exact condition is that the right side of (37) plus all paid spread is nonnegative for every loop. Its answer depends on the spread schedule; Bayes provides no universal replacement constant for 1/C.

A uniformly bounded spread, or a finite spread depending only on the repeated alarm states and not on held inventory or a translated fair, cannot repair the uncapped theorem. In (39) the benefit per cycle can grow proportionally to held inventory c₀, while the spread paid on the middle cycle is independent of c₀. Choose c₀ first, then repeat enough cycles to cover entry and exit. Inventory-dependent or otherwise growing execution penalties can alter this conclusion, but they are a different mechanism and must be analyzed as such.

In the opportunity model (1), conditional on the current public history, the noise traders' expected adverse-selection loss rate is

\[
 L_N=u\epsilon[(a-M)+(M-b)]=u\epsilon(a-b).
\]

The informed traders' expected gain rate is

\[
 G_I=uE[(\nu+\mu A)(V-a)_+^2+
         (\nu+\mu A)(b-V)_+^2].
\]

By (3),

\[
 \boxed{L_N=G_I.}                                   \tag{44}
\]

This is an exact budget identity, with zero dealer expected profit, no fees, no funding costs, and no inventory-risk premium. More generally, mark-conditioned zero profit gives E[profit_noise]+E[profit_informed]=0 for the modeled flow. For a correctly specified uninformed round-trip strategy, its expected cash loss is its accumulated execution wedge in (43). Summed across noise trading under the specified arrival model, these losses finance the informed gains. There is no general theorem pairing each particular round trip with a particular informed trader's profit, nor a guarantee about losses conditional on a selected realized path. Restricting noise orders to round trips changes their statistical law and must be included in the model.

Finally, the inherited from-rest result must not be silently strengthened. With F fixed, T(φ)=φ, an initially displaced book φ=2, and a new trader initially flat, selling 0.5 costs −0.875. Letting φ decay from 1.5 to 0.15 and buying back 0.5 costs 0.2. The trader earns 0.675 by consuming displacement left by somebody else. This does not contradict (36), whose from-rest potential was zero: this trade does not restore the initial φ. Nor is such a prescribed silence a sure event in a stochastic informed market. Exact state-closing loops, flat-inventory round trips from rest, and opportunistic trading from an inherited displacement are three distinct claims.

**C. Relation to the literature.** The information models below concern equilibrium or filtering; the execution models concern admissible impact and resilience. The connections do not establish that an execution model's fair is a posterior.

| Work | Contribution to this brief | Where the present construction departs |
|---|---|---|
| [Kyle (1985), *Continuous Auctions and Insider Trading*](https://www.econometricsociety.org/publications/econometrica/browse/1985/11/01/continuous-auctions-and-insider-trading) | Strategic informed trading hidden in noise, competitive conditional-expectation pricing, gradual permanent learning. Gaussian linear equilibrium is the baseline for a slow gain. | Our Laplace calculation is a specified likelihood, not a solved nonlinear Kyle strategy. Kyle's auction price conditions on aggregate current orders; it is not a free integral through a pre-existing AMM curve. |
| [Back (1992), *Insider Trading in Continuous Time*](https://academic.oup.com/rfs/article-abstract/5/3/387/1576252) | Continuous Kyle equilibrium for general value distributions within the paper's class; nonlinear pricing is compatible with rational expectations. | No automatic exponentially forgetting statistic. Continuous execution and the admissible strategy class matter; discrete jumps cannot be inserted without repricing. |
| [Glosten–Milgrom (1985), *Bid, Ask and Transaction Prices in a Specialist Market with Heterogeneously Informed Traders*](https://www.stanford.edu/~milgrom/publishedarticles/Bid%20Ask%20and%20Transaction%20Prices.pdf) | Buy/sell-conditioned zero-profit quotes and a spread financing adverse selection. The bounded-value example explains saturation. | The proposed AMM starts with a common continuous marginal curve and retracing. Our formulas (2), (11), and (44) retain the conditioning and spread that cannot be omitted casually. |
| [Easley–O'Hara (1987), *Price, Trade Size, and Information in Securities Markets*](https://www.sciencedirect.com/science/article/pii/0304405X87900298) | Trade size and sequence affect inference: larger trades can be more informative and execute at worse prices. | Does not imply one exponentially weighted net-flow statistic, or the same fair gain for opposite-side trades at a given absolute displacement. |
| [Easley–O'Hara (1992), *Time and the Process of Security Price Adjustment*](https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1992.tb04402.x) | Trade occurrence and waiting time reveal whether information exists; silence affects spreads and learning. This is the closest ancestor of the alarm story. | Absence-of-trade updating is normalized Bayes, as in (12), not generally exact exponential price relaxation. Event probability and sign/value inference are separate states. |
| [Holden–Subrahmanyam (1992), *Long-Lived Private Information and Imperfect Competition*](https://host.kelley.iu.edu/cholden/Holden%20and%20Subrahmanyam%20%281992%29.pdf) | Competition among informed traders accelerates revelation, supplying an economic reason for urgent flow. | Does not derive constant episode hazards, a Laplace likelihood, or λ\|T\|. Our opportunity intensities are primitives unless that timing game is solved. |
| [Rochet–Vila (1994), *Insider Trading without Normality*](https://academic.oup.com/restud/article-abstract/61/1/131/1547030) | Establishes distribution-free existence/uniqueness results in its particular monopolistic rational-expectations setting. | Its Kyle comparison lets the insider observe noise trading. It is not a theorem that the ordinary hidden-noise Kyle model has our posterior curve for an arbitrary non-Gaussian prior. |
| [Bagnoli–Viswanathan–Holden (2001), *On the Existence of Linear Equilibria in Models of Market Making*](https://host.kelley.iu.edu/cholden/Bagnoli-Viswanathan-Holden%20%282001%29.pdf) | Characterizes distributional conditions for linear equilibria in several trading protocols, including non-Gaussian examples. | Non-Gaussian does not by itself imply nonlinear or steepening price impact. Their result constrains claims based on the prior alone; (23) fixes the likelihood explicitly. |
| [Tao Li (2013), *Insider Trading with Uncertain Informed Trading*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=946324) | The dealer learns both value and whether the strategic trader is informed; depth and volatility become state dependent. | This is the dated working-paper version, not a journal citation asserted here. The extra belief state is essential; it is not identified with \|φ\|. |
| [Banerjee–Green (2015, JFE), *Signal or Noise? Uncertainty and Learning about Whether Other Traders Are Informed*](https://snehalbanerjee.github.io/papers/BanerjeeGreen2015.pdf) | Uncertainty about others' information generates nonlinear, asymmetric prices and richer volatility dynamics. | Its rational-expectations/disagreement setting is not the same as a zero-profit dealer facing the present order process. It does not derive our deterministic resilience or a universal symmetric convex curve. |
| [Back–Baruch (2004), *Information in Securities Markets: Kyle Meets Glosten and Milgrom*](https://art.torvergata.it/handle/2108/313783) | Endogenous informed timing in a Poisson model; a small-trade/high-arrival limit relates GM and Kyle equilibria. | This is the relevant route for deriving a diffusion approximation. It does not license removing a finite-order spread while keeping all other finite-order update terms unchanged. |
| [Collin-Dufresne–Fos (2016), *Insider Trading, Stochastic Liquidity, and Equilibrium Prices*](https://onlinelibrary.wiley.com/doi/10.3982/ECTA10789) | Stochastic noise volume changes equilibrium price impact, informed aggressiveness, and volatility even for a fixed fundamental. | A burst may indicate more noise camouflage as well as more information. A single \|φ\|-based toxicity proxy misses this source of variable liquidity. |
| [Huberman–Stanzl (2004), *Price Manipulation and Quasi-Arbitrage*](https://onlinelibrary.wiley.com/doi/10.1111/j.1468-0262.2004.00531.x) | Under their impact/execution assumptions, time-independent permanent impact of individual trades must be linear to preclude quasi-arbitrage. | This does not forbid every nonlinear conservative S(P). An impact increment f(dq) and the exact gradient S(P)dP of a cumulative-position potential are different models; (36) telescopes for any S. |
| [Gatheral (2010), *No-Dynamic-Arbitrage and Market Impact*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1292353) | Relates nonlinear impact functions to admissible decay kernels; exponential decay in the studied propagator formulation requires linear impact. | T applied to exponentially decaying **volume** is not a sum of independently decaying nonlinear price impacts. One cannot transfer that linearity restriction to M0. |
| [Obizhaeva–Wang (2013), *Optimal Trading Strategy and Supply/Demand Dynamics*](https://web.mit.edu/wangj/www/pap/ObizhaevaWang13.pdf) | Resilient liquidity and execution schedules mixing blocks with continuous trading; resilience is economically important. | A supply/demand execution model, not a derivation of Bayesian information decay. Constant book density is the basic tractable benchmark, whereas our desired T is curved. |
| [Alfonsi–Fruth–Schied (2010), *Optimal Execution Strategies in Limit Order Books with General Shape Functions*](https://arxiv.org/abs/0708.1756) | General nonlinear book shapes and the distinction between volume resilience and price/spread resilience. | The state φ decaying in **units** is their volume-resilience construction: cumulative book volume is inverted to obtain price displacement. Their other resilience convention is different. |
| [Alfonsi–Schied (2010), *Optimal Trade Execution and Absence of Price Manipulations in Limit Order Book Models*](https://epubs.siam.org/doi/10.1137/090762786) | No-manipulation and optimal-execution results for nonlinear order books with exponential resilience; explains why this need not contradict Gatheral. | In the volume-resilience setting, the relevant no-manipulation mechanism is our M0. The elementary storage proof (36) is its deterministic, fixed-reference version. Moving the reference fair endogenously requires an additional proof. |
| [Alfonsi–Schied–Slynko (2012), *Order Book Resilience, Price Manipulation, and the Positive Portfolio Problem*](https://epubs.siam.org/doi/10.1137/110822098) | For linear transient-impact kernels, connects nonnegative execution costs to positive definiteness and studies the stronger absence of transaction-triggered manipulation. | This is not another arbitrary nonlinear-shape filtering model. Absence of a profitable round trip and absence of advantageous intermediate trades of the opposite sign are different properties. |

To make the volume/price distinction explicit, if f(x) is book density in price coordinates and L(x)=∫₀ˣf(z)dz, then φ=L(displacement), T=L^{-1}, and volume resilience is \(\dot\phi=-\phi/\tau\). Price resilience instead imposes \(dT(\phi)/dt=-T(\phi)/\tau\), or \(\dot\phi=-T(\phi)/(\tau T'(\phi))\). These coincide for linear T and generally differ for curved T. The author-posted [Alfonsi–Schied manuscript](https://citeseerx.ist.psu.edu/document?doi=cf8208fc4223bc111664eb5ad051943c9918edd2&repid=rep1&type=pdf) explicitly treats the distinction from the propagator model; it supports the M0 identification, not the proposed urgent permanent update.

**D. What the operator can calibrate, and what remains open.**

The table maps parameters to primitives only where a derivation exists. “Not identified” is substantive: a good fit to a transient price response is not a measurement of a structural information parameter.

| AMM quantity | Primitive origin in the explicit models | Calibration and limit of interpretation |
|---|---|---|
| τ | Local diffusion-filter rate (20): δ plus a signal-to-noise learning term. Conditional-silence decay instead follows (12) or (16). Birth rate α affects the typical activity probability; noise ε and informed intensity affect the filter gain. | Fit a hidden-state likelihood to signed arrivals, sizes and waiting times. Compare its predicted silence relaxation with the data. Estimate short- and long-silence behavior separately; reject a constant τ if the alarm level changes the measured hazard. |
| Touch density λ₀ | For the exact Laplace slice, β/[1+b²−bϕ_N(b)/Φ(−b)], b=aσ_Q/β. It combines informed flow per unit signal, noise scale and jump prior. | Fit the entire response with common parameters, then measure the slope near zero. Separate the T-component density from the full executed slope including permanent learning and spread. |
| Far density floor ℓ∞ | β in the Laplace/Gaussian experiment, since posterior variance tends to s². It is not the information-event probability reaching one. | Estimate the far-flow slope where samples remain credible, jointly with value/markout data. A binary-jump fit predicts saturation and is falsified by a stable positive density floor. Extrapolation beyond observed tails is a prior assumption. |
| S′ | A local gain c_sΣ_s/σ_s² from slow information, or the steady replenished-information gain σ_v/σ_s. No derivation of an arbitrary permanent curve S(P) from slow intensity alone. | Use isolated, slow flow and long-horizon value revisions; fit the slow likelihood and uncertainty dynamics. Check dependence on elapsed learning time, not just P. If signals are unlabelled, estimate jointly with the urgent channel. |
| Urgent λ | No exact positive constant in the uncapped original architecture. The Bayesian object is (4), (17), or (31); the local smooth excess is G₂x². A chosen fitting window gives λ_fit=3G₂A/4 with error (33). | Estimate conditional gains against alarm, precision, side and episode age. Report the fitting window and residuals. Never interpret the coefficient of an absolute-value regression as a universal probability of informed trading. |
| Operational C | A collateral, capital, credit, or inventory-policy choice. It is not inferred from α, δ, ε or the jump prior, and does not exist in the idealized model. | Set operationally. If retaining the heuristic λ\|T\| mechanism inside it, require the actual all-times position constraint and λC≤1 in the spreadless model. An order-size limit or a high-probability position quantile is insufficient. |

Observable flow alone cannot generally identify the price scale of information. In Y=βJ+η, replacing J by cJ and β by β/c leaves the entire distribution of Y unchanged while changing prices and jump magnitudes. In a latent-activity model, high volume also confounds more information, larger jumps, and more noise. At minimum, structural price parameters need a value proxy, later public revelation, or suitably modeled long-horizon markouts in addition to the flow tape. Arrival and death parameters themselves need identification checks rather than merely a numerically successful hidden-state fit.

A practical estimation procedure is to fit the joint signed-arrival and duration likelihood including its no-arrival term; estimate value scale against subsequent fundamental or reference-price changes; compare a bounded-jump specification with a continuous Laplace or richer prior; then evaluate quotes and markouts out of sample. Hold out high-|φ| observations and reversals, since they distinguish a fitted local gain from a claimed globally valid law. A fair calibrated only from the AMM's own marked prices risks explaining its own mechanical feedback as information.

The following questions are ranked by their importance for a usable design.

1. **Specify and solve the strategic execution problem.** Decide what a controller can conceal about order identity, timing, splitting and reversals, and what likelihood the dealer uses after deviations. Prove Theorem 5's hypotheses or a direct storage inequality for that actual mechanism. This is the main unresolved step for an anonymous Bayesian AMM. A passive filter with excellent empirical fit does not answer it.

2. **Choose the minimal additional belief state.** Direction, activity probability and value uncertainty cannot generally be compressed into one EWMA. Test whether a small state such as (value mean, activity probability, precision, signed pressure) gives a controlled approximation to the full filter. A finite-state approximation or a quadrature filter is a candidate; an exact three-state closure has not been proved here.

3. **Determine which feature is allowed to change.** If retracing execution and exponential volume resilience are essential, Theorem 4 rules out a nonconstant alarm-only permanent fill gain without another change. If exact Bayesian mark pricing is essential, accept a spread, non-retracing evidence, and the posterior's actual between-fill law. Equation (40) is a proved mechanical alternative, but its nonlinear “retention” is transient. These choices cannot be hidden inside parameter calibration.

4. **Endogenize competition and episode termination jointly with nonlinear prices.** Holden–Subrahmanyam motivates urgency; (1) specifies it. Solving the game with uncertain participation, a continuous jump prior and stopping when mispricing is exhausted could determine μ and effective δ rather than treating them as reduced-form inputs. Global steepening need not survive the resulting equilibrium trading strategy. This is an open equilibrium problem, not a result of Theorem 3.

5. **Validate the proposed volatility proxy.** Test whether |φ| predicts posterior uncertainty and adverse-selection loss after controlling for unsigned volume, noise volatility and elapsed time. The same D counterexample in (9) and the saturation of (11) show why this relation cannot be assumed globally. A second activity or uncertainty state may be necessary even if the signed-price response looks one-dimensional.

6. **Quantify approximation error at the level of trading strategies.** Equations (13), (22) and (33) bound particular local errors. A usable approximation also needs a bound on cumulative cash error over stated turnover and time horizons, or its own exact no-pump proof. There is no uniform safety conclusion over unlimited repetition from a small one-step fitting error. An operational cap may contain an approximation; it must not be used to claim an uncapped theorem.

7. **Identify the structural parameters from data.** Separate activity from noise and identify the jump's value scale with independent price information. Only after that exercise should the table's implied τ and densities be compared with an operational AMM. Continuous inflow of slow information is especially important if a strictly positive long-run permanent slope is desired.

What is proved here is the Laplace curve and its density floor, the exact posterior updates and silence laws for the stated experiments, the local gain expansion and absolute-value fitting error, the extended uncapped loop obstruction, the correctly qualified martingale bridge, and the zero-profit loss-transfer identity. The EWMA reduction, a fixed S′, and a fitted λ|T| are approximations with the stated qualifications. A joint anonymous strategic equilibrium producing all the original AMM features has not been constructed; retaining its alarm-only fair-update architecture is ruled out by Theorem 4. The cap-free Bayesian replacement is a belief-dependent update such as (4) or (17), with its correct likelihood, execution prices and timing, not a new constant multiplying a different power of the same skew.
