# Center dynamics without an external information signal

All results below set **e = 0**. Inventory, trade sizes, the number of trades,
and elapsed time are unrestricted, as in the mathematical model. A numerical
search with a position cap is a different problem.

The main conclusions are:

* With **decay-driven center motion only**, safety forces
  `rho(phi) T'(phi)` to be constant. For a two-slope band, the optimal safe
  fraction is **1 inside and a0/a outside**, giving settled displacement
  **a0 q**. The proposed ordering, smaller inside and larger outside, cannot
  give nonzero safe absorption.
* For a genuinely curved band, the largest constant absorption fraction safe
  on **every** loop is **rho* = 0**. The positive thresholds suggested by the
  old finite grids are not unrestricted safety thresholds. Explicit finite
  exact pumps below include rho = 0.01.
* A fill-driven term is not a potential of phi over paths containing waits.
  It can be removed by a change of variables only if the decay drift changes
  too. In particular, `g = 0, h = lambda > 0` is safe and settles at
  `F0 + lambda q`. There is no finite maximum permanence in the full design
  space when lambda and the resulting execution impact are unrestricted.

## 1. Model, conventions, and the loop identity

Write x = phi and c = P - x. The dynamics and quote are

\[
 dP=dq,\qquad dx=dq-\frac{x}{\tau}\,dt,\qquad
 dc=\frac{x}{\tau}\,dt,
\]
\[
 dF=\frac{x}{\tau}k(x)\,dt+h(x)\,dq,
 \qquad k(x)=\rho(x)T'(x),
 \qquad R=F+T(x)+S(c).
\]

Here S is the handoff term from M4. Set S = 0 for the center-only model.
The rule for F has no P dependence and uses no additional memory state;
c is just an algebraic coordinate used in the proof and in the existing M4
quote. Trades are instantaneous walks and integrate the moving F throughout
the fill. During waits dq = 0.

Assume T and S are odd, locally absolutely continuous, nondecreasing,
piecewise smooth, and zero at zero. Absorption fractions satisfy
0 <= rho <= 1. Values at isolated slope discontinuities do not matter.
For statements equating exact-loop and any-end safety, assume the natural
symmetry rho(-x) = rho(x) and h(-x) = h(x). The necessity result for
any-end safety of the decay-only model does not require rho to be even.

Define

\[
 V(x)=\int_0^xT(u)\,du,\qquad
 A(x)=\int_0^x k(u)\,du.
\]

A wait from a to b, with b = r a and 0 < r < 1, changes F by A(a)-A(b)
when h = 0. In particular, variable rho must be integrated along the decay;
it is not a single fraction multiplying the whole released skew.

**Loop identity, h = 0.** Start at P = x = 0. For any sequence ending at
P = 0, let x_f be its final standing flow. During wait j, let the fixed
position be P_j and the standing-flow endpoints be a_j and b_j. Trader
profit is

\[
\boxed{
 \Pi=-V(x_f)+\sum_j\left\{
 P_j\left[A(a_j)-A(b_j)
       +S(P_j-b_j)-S(P_j-a_j)\right]
 -\left[V(a_j)-V(b_j)\right]
 \right\}. }
\tag{1}
\]

Equivalently, writing the integrals below over waits,

\[
 \Pi=-V(x_f)+\int
 \left[P\{k(x)+S'(c)\}-T(x)\right]dc.
\tag{2}
\]

**Proof.** Trader cost is the integral of R dP. Integration by parts gives

\[
 \int F\,dP=[PF]-\int P\,dF=-\sum_jP_j\Delta F_j,
\]

because P starts and ends at zero. The trade contributions of T telescope
to V(x_f) plus the potential lost during waits. Also

\[
 \int S(c)\,dP=[P S(c)]-\int P S'(c)\,dc
              =-\sum_jP_j\Delta S_j.
\]

Negating total cost proves (1); substituting dF = k(x) dc gives (2). Thus a
center increase benefits a long trader through **+P Delta F**, whereas
lost curve potential contributes a **minus** sign. The suggested identity
in the original brief had these signs reversed. QED.

For an exact loop x_f = 0, so the boundary term vanishes. F need not return
to F0 for (1) to hold: P_f = 0 already removes [PF]. Appending waits with
P = 0 changes no cash profit, although it can change F and x.

With h present, define H(0) = 0, H' = h and make the exact transformation

\[
 G=F-H(x),\qquad U=T+H,\qquad
 dG=\frac{x}{\tau}\{k(x)+h(x)\}\,dt.
\tag{3}
\]

The same identity holds with F, T, V, A replaced by
G, U, V_U, A+H. Section 4 explains why changing the drift in (3) is essential.

## 2. A sharp safe set for decay-only dynamics, including M4

For this section h = 0. Put

\[
 m_T=\inf_{x>0}\frac{T(x)}x.
\]

**Theorem.** The model is safe on every from-rest, any-end loop if and only if
there is a constant kappa such that

\[
\boxed{
 \rho(x)T'(x)=\kappa\quad\text{a.e.},\qquad
 \kappa\ge0,\qquad
 0\le S'(c)\le m_T-\kappa\quad\text{a.e.}
 }
\tag{4}
\]

The imposed fraction restriction additionally means kappa <= T'(x) a.e.
Where T' = 0, a positive kappa is impossible. Under the symmetry above,
(4) is also necessary and sufficient for safety on exact loops alone.

This is an all-loop characterization, not a sufficient test inferred from
a finite search.

### Why k(x) must be constant

Fix x > d > 0 and y > d. At an arbitrary baseline c = C, start with
standing flow x and perform this finite block:

1. Wait from x to x-d, so c goes from C to C+d.
2. Trade to standing flow -y.
3. Wait from -y to -y+d, so c returns to C.
4. Trade back to standing flow x.

The block restores P, x, and c. Define

\[
 K_+=\int_{x-d}^{x}k(u)\,du,\qquad
 K_-=\int_{-y}^{-y+d}k(u)\,du,
\]
\[
 D_+=V(x)-V(x-d),\qquad
 D_-=V(-y)-V(-y+d).
\]

Its contribution to the wait sum in (1) is exactly

\[
\begin{aligned}
 J(C)={}&C(K_+-K_-)+xK_++(y-d)K_--D_+-D_-\\
       &+(x+y-d)\{S(C+d)-S(C)\}.
\end{aligned}
\tag{5}
\]

The final term is nonnegative. If K_+ differs from K_-, choose C of the
appropriate sign and sufficiently large magnitude to make J(C) positive.

Every such state is reachable from rest with finite trades and waits:
trade 2C, wait one half-life, and trade to standing flow x. To exit,
trade to standing flow -2C, wait one half-life, and trade to zero. Entry
and exit leave a fixed finite contribution to (1). Repeating the block n
times gives total profit equal to that fixed contribution plus n J(C).
It is therefore profitable for sufficiently large finite n.

Notice that J(C) is the block's contribution to the **whole loop** identity.
The block alone has nonzero inventory at its endpoints; it is not a
standalone flat-position cash profit. Closing the inventory realizes the
benefit of its accumulated center changes.

Consequently safety requires K_+ = K_- for all these intervals. Taking
small d at continuity points, or Lebesgue points, gives k(x) = k(-y) for
every pair of such points. Thus k is constant almost everywhere.

For symmetric dynamics, any profitable from-rest loop produced this way
can be followed by its sign-reflected copy. The copy has the same cash
profit and the opposite center change. A constant offset in its starting
F does not affect profit because its net trade is zero. Both pieces start
and end at P = x = 0. Their concatenation is therefore an exact profitable
loop, including F_f = F0. No infinite waits are needed.

### Why the derivative bound on S is necessary

Now k = kappa. In (5), take y = x. At a differentiability point C of S,

\[
 \lim_{d\downarrow0}\frac{J(C)}d
   =2x\left[\kappa+S'(C)-\frac{T(x)}x\right].
\]

If kappa + S'(C) exceeds m_T, some x makes this positive. A sufficiently
small finite d produces a positive block. Repeating it overwhelms entry
and exit costs. Here Delta F = kappa Delta c, so closing c also restores F;
the resulting profitable loop is already exact. This proves the bound
on S' almost everywhere.

### Why the conditions suffice, including arbitrary end states

When k = kappa, integration of the state equations yields the invariant

\[
 F=F_0+\kappa c.
\]

This is a consequence of the allowed phi-only dynamics, not an additional
P-dependent rule. Let L(c) = kappa c + S(c) and

\[
 W_L(c)=\int_0^c uL'(u)\,du.
\]

Since P = c+x, equation (2) becomes

\[
 \Pi=-V(x_f)+W_L(c_f)
      +\int\frac{x}{\tau}\{xL'(c)-T(x)\}\,dt.
\tag{6}
\]

At a flat-position endpoint c_f = -x_f. Conditions (4) imply

\[
 V(x_f)\ge\frac{m_Tx_f^2}{2},\qquad
 W_L(c_f)\le\frac{m_Tc_f^2}{2},\qquad
 xT(x)\ge L'(c)x^2.
\]

Every term on the right of (6), after combining the boundary terms, is
nonpositive. Hence Pi <= 0 for every any-end loop. QED.

### Loop inequalities and their relation to sweep tests

Without first reducing the safe set, (1) says exactly that safety requires

\[
 \sum_jP_j\left[
 \int_{b_j}^{a_j}\rho(u)T'(u)\,du
 +S(P_j-b_j)-S(P_j-a_j)\right]
 \le V(x_f)+\sum_j\int_{b_j}^{a_j}T(u)\,du
\tag{7}
\]

for every admissible from-rest, flat-position path. For exact loops set
x_f = 0. Under the assumptions above, the infinite family (7) is equivalent
to the simple conditions (4).

A buy-q, fully settle, sell-q, fully settle loop gives the weaker necessary
condition

\[
 q\{A(q)+S(q)\}\le2V(q).
\tag{8}
\]

It is an exact settled loop under symmetry. Full settling here denotes a
limit; any strictly positive limiting profit persists for sufficiently
long finite waits. Equation (8) alone does not control the repeated blocks
in (5). When k = kappa, the sharp additional condition is the local bound
on S', not just a running-average bound on S.

In particular, with F fixed, **M4 is safe exactly when**

\[
 0\le S'(c)\le m_T.
\tag{9}
\]

Nonlinear T therefore can support nonzero S. The largest positive branch
is S(c) = m_T c for c >= 0, extended oddly. For a band with a0 > 0 this is
nontrivial; for an unbounded-domain saturating T, m_T = 0 and only S = 0
survives. If S = r T for the two-slope band, (9) is exactly
0 <= r <= a0/a. Thus the context's blanket claim that every curved T fails
at r >= 0.25 is not a theorem: for example a0 = 5, a = 10 permits r = 0.25.

Charging S(P) instead would be a different quote. Its trade integral is
the potential integral of S against P and vanishes on every position loop.
The handoff bound (9) does not apply to that variant.

## 3. Optimal variable absorption for the two-slope band

Here **h = 0 and S = 0** unless stated otherwise. Let B > 0 and
0 <= a0 < a, with

\[
 T(x)=
 \begin{cases}
 a_0x,&|x|\le B,\\
 \operatorname{sgn}(x)\{a_0B+a(|x|-B)\},&|x|>B.
 \end{cases}
\]

For this curve m_T = a0. If a0 > 0, the entire safe family is

\[
 \rho_\kappa(x)=
 \begin{cases}
 \kappa/a_0,&0<|x|<B,\\
 \kappa/a,&|x|>B,
 \end{cases}
 \qquad 0\le\kappa\le a_0.
\tag{10}
\]

The largest safe profile is therefore

\[
\boxed{
 \rho_{\mathrm{opt}}(x)=
 \begin{cases}1,&0<|x|<B,\\a_0/a,&|x|>B,
 \end{cases}
 \qquad g(x)=\frac{a_0x}{\tau}. }
\tag{11}
\]

It is pointwise largest among safe absorption profiles away from the
irrelevant slope-boundary points. For an opening sweep q from rest,
followed by a wait of duration t,

\[
 F(t)-F_0=a_0q(1-e^{-t/\tau}),\qquad
 \boxed{F_\infty-F_0=a_0q.}
\tag{12}
\]

The settled quote has the same displacement because T(0) = 0. For q > 0,
the fraction of the immediate post-fill quote displacement retained is

\[
 \frac{a_0q}{T(q)}=
 \begin{cases}
 1,&q\le B,\\
 \displaystyle\frac{a_0q}{aq-(a-a_0)B},&q>B.
 \end{cases}
\tag{13}
\]

It tends to a0/a at large q.

An equivalent form makes safety especially transparent:

\[
 R=F_0+a_0P+(a-a_0)\operatorname{sgn}(x)(|x|-B)_+.
\]

The linear permanent term is a potential in P; the remaining odd curve
loses nonnegative potential as x decays.

For a constant fraction rho = r > 0, k has the two different values
r a0 and r a. Theorem (4) rules it out. Thus, for a genuinely curved band,

\[
 \boxed{\rho^*_{\text{constant, all loops}}=0.}
\]

So a variable fraction **does** improve on the true constant optimum,
but its ordering is opposite to the suggested one. A positive safe profile
has rho_inside / rho_outside = a/a0 > 1. Requiring a smaller interior
fraction and a larger exterior fraction leaves only zero absorption.

If a0 = 0, safety forces kappa = 0: the outer absorption fraction is zero,
and the interior fraction is immaterial because no skew is released there.
Settled displacement is zero. For the degenerate linear case a0 = a > 0,
the usual constant optimum rho = 1 is recovered.

If a fixed M4 term S is also retained, write
M = ess sup S'. A safe design exists precisely when M <= a0, and

\[
 \kappa_{\max}=a_0-M,\qquad
 \rho_{\max}(x)=\frac{a_0-M}{T'(x)},\qquad
 R_\infty-F_0=(a_0-M)q+S(q).
\tag{14}
\]

For q > 0 the combined settled displacement is at most a0 q. Every linear
split S(c) = b c, kappa = a0-b, 0 <= b <= a0 attains this envelope.
These statements optimize decay absorption with h = 0. Allowing an
unrestricted h removes the finite permanence ceiling, as follows.

## 4. Fill-driven motion: the false potential claim and the correct equivalence

### A potential along a fill is not a potential along a mixed path

For H' = h, the full differential is

\[
 dH(x)=h(x)dq-\frac{x h(x)}{\tau}\,dt.
\]

Therefore

\[
\boxed{
 \int_{\rm fills}h(x)dq
 =H(x_f)-H(x_i)+\int_{\rm waits}\frac{x h(x)}{\tau}\,dt. }
\tag{15}
\]

The extra wait term generally does not vanish. For a finite explicit
counterexample, take h(x) = x^2 and H(x) = x^3/3, and execute

1. Buy 2; wait from x = 2 to x = 1.5.
2. Sell 2.5; wait from x = -1 to x = -0.5.
3. Buy 0.5.

Both P and x return to zero, but

\[
 \int h(x)dq
 =H(2)+H(-1)-H(1.5)-H(-0.5)=\frac54\ne0.
\]

Thus it is not a potential of x on the allowed walks. This example refutes
the potential assertion; h(x) = x^2 with g = 0 is not being proposed as safe.

### What a valid change of variables does

Equation (3) gives the exact equivalence

\[
 (F,T,g,h)\longmapsto
 \left(G,\ T+H,\ g+\frac{x h(x)}\tau,\ 0\right).
\tag{16}
\]

Replacing T by T+H while leaving g unchanged is generally wrong. Although
G stays fixed during fills, it moves during waits even when the original
F did not. Equation (16) preserves the entire quote and cash-flow path;
it introduces no extra state or P dependence.

### A safe h with strictly positive, arbitrarily large permanence

Take any lambda > 0 and set

\[
 g=0,\qquad h(x)=\lambda.
\]

Then F = F0 + lambda P is a derived invariant, and

\[
 R=F_0+\lambda P+T(x)+S(c).
\]

For S = 0, every position loop satisfies

\[
 \oint\lambda P\,dP=0,\qquad
 \Pi=-V(x_f)-\sum_j\{V(a_j)-V(b_j)\}\le0.
\tag{17}
\]

The rule is safe for every T in the model and for every lambda > 0. A sweep
q leaves the permanent settled displacement lambda q. For the same fixed
band, choosing lambda > a0 strictly exceeds **every safe h = 0 center-only
model on that band**, whose maximum is a0 q. For a literal T-only model
with fixed center, every choice of T settles back to F0; this h therefore
also beats every model in that class.

The extra permanence has an execution cost: the opening fill pays an
additional lambda q^2/2. It is not free retained impact at the same opening
execution curve.

There is an essential qualification to the phrase “any T-only model.” If
it means **arbitrary replacement curves plus arbitrary admissible decay
drifts, with h = 0**, no strict superiority is possible: (16) is an exact
equivalence. For this constant-h example, its h = 0 representative is

\[
 \widetilde T=T+\lambda x,\qquad
 \widetilde g=\frac{\lambda x}{\tau},\qquad
 \widetilde\rho(x)=\frac{\lambda}{T'(x)+\lambda}.
\]

This representative has exactly the same execution prices and permanence.
Thus the literal mixed-path potential claim is false, while redundancy of
h in the unrestricted **pair (curve, decay drift)** is a valid statement.

### The safe set for the full allowed dynamics

For completeness, the preceding arguments give a characterization for
the whole phi-only design space. Under the stated symmetry and regularity,
put D = T-A. Safety is equivalent to the existence of a constant lambda with

\[
\boxed{
 k(x)+h(x)=\lambda\quad\text{a.e.},\qquad
 0\le S'(c)\le
 m_D:=\inf_{x>0}\frac{T(x)-A(x)}x\quad\text{a.e.}
 }
\tag{18}
\]

To prove necessity, apply the repeated-block argument to (3): its
decay coefficient is k+h, so it must be constant. For sufficiency and the
remaining necessary bound, observe that

\[
 d\{F+A(x)\}=\{k(x)+h(x)\}dq=\lambda\,dP.
\]

Hence

\[
 F=F_0+\lambda P-A(x),\qquad
 R=F_0+\lambda P+D(x)+S(c).
\tag{19}
\]

The lambda P term integrates to zero on a position loop. Applying the
M4 result (9) to D proves (18). In the fraction range 0 <= rho <= 1,
D' = (1-rho)T' >= 0, so D is itself an admissible odd nondecreasing curve.

For S = 0, every such absorption profile can consequently be made safe by
choosing h(x) = lambda - rho(x)T'(x). Its settled displacement is lambda q.
This does not rescue a nonconstant rho as a **decay-only** design; it changes
fill prices to compensate. For example rho = 1 and
h = lambda-T' give R = F0+lambda P exactly. On the band, lambda >= a even
makes h nonnegative everywhere. With no bound on fill impact, permanence
has no finite optimum in this full class.

## 5. Explicit pumps and the Bun check

All numerical work is in [D-dynamics.ts](D-dynamics.ts), run with

```bash
~/.bun/bin/bun D-dynamics.ts
```

The script uses exact piecewise-quadratic primitives, integrates F during
fills, and checks the loop identity against the cash ledger. It introduces
no external information, dependencies, or numerical quadrature.

For B = 2, a0 = 1, a = 10, let k_i and k_o be the interior and exterior
values of rho T'. For C > B, use the entry/exit construction in Section 2
and repeat the block with x = 4, y = 1.5, d = 1. The two block waits have
finite durations tau log(4/3) and tau log(3). The exact formulas are

\[
 \begin{aligned}
 B(C)&=3k_o C^2-2\{V(2C)-V(C)\},\\
 J(C)&=C(k_o-k_i)+4k_o+\tfrac12k_i-18,\\
 \Pi_n&=B(C)+nJ(C),\qquad F_f-F_0=n(k_o-k_i).
 \end{aligned}
\tag{20}
\]

Appending the sign-reflected complete loop restores F exactly and doubles
the profit. Both halves already end at P = x = 0. Profits below are total
cash profits in bps times units, not profit per traded unit.

| Absorption profile | C | Blocks n | Any-end profit | Final F shift | Exact mirrored profit |
|---|---:|---:|---:|---:|---:|
| Constant rho = 0.01 | 400 | 260000 | 47700 | 23400 | 95400 |
| Constant rho = 0.05 | 80 | 9000 | 705 | 4050 | 1410 |
| Constant rho = 0.10 | 20 | 3000 | 2070 | 2700 | 4140 |
| Constant rho = 0.25 | 6 | 110 | 24.75 | 247.5 | 49.5 |
| rho = 0.05 inside, 0.10 outside | 20 | 2100 | 472.5 | 1995 | 945 |

These are explicit counterexamples, not maxima from a search. The proof
in Section 2 covers every positive constant fraction on a curved band,
including fractions smaller than those tabulated.

The same script checks 5000 seeded random any-end loops per proved-safe
family, allowing eight signed trades and partial waits before liquidation:

| Proved-safe family | Largest sampled profit |
|---|---:|
| Optimal rho: 1 inside, 0.1 outside | -147.450621 |
| kappa = 0.4, S(c) = 0.6c | -257.183782 |
| g = 0, S(c) = 0.1T(c) | -219.905791 |
| kappa = 0.5, S(c) = 0.5 tanh(c) | -212.546202 |
| g = 0, h = 3, S = 0 | -128.318662 |

These sampled losses are checks of the implementation; safety rests on the
proofs. The all-loop profit supremum is zero because an immediate retraced
trade has zero profit.

For the same band, the checked settled sweep displacements are:

| q | Optimal decay-only profile | g = 0, h = 3 |
|---:|---:|---:|
| 0.5 | 0.5 | 1.5 |
| 1 | 1 | 3 |
| 2 | 2 | 6 |
| 4 | 4 | 12 |
| 8 | 8 | 24 |
| 16 | 16 | 48 |

No all-loop claim here depends on a numerical conjecture. The remaining
different problem would be optimization under explicit inventory, horizon,
trade-count, or execution-impact bounds. Those restrictions are absent
from the specified model and cannot be inferred from sim7.ts or sim8.ts.
