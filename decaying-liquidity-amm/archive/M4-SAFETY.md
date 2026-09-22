# No-pump conditions for a decaying-liquidity AMM

The main result is a complete characterization of the operator's original M4, with its original decay. Put

\[
m_T:=\inf_{x>0}\frac{T(x)}x.
\]

**M4 is safe on every loop from rest if and only if S is globally Lipschitz with constant at most \(m_T\).** This holds for both exact loops and loops requiring only final \(P=0\). Thus curved T can admit nonzero safe S; the largest one on the positive half-line is \(S(x)=m_Tx\). Matching the entire curve, \(S=T\), is safe only when T is linear. Charging S at the moving P instead gives M3, which is safe for every S. Changing the decay target can also make \(S=T\) safe for curved T; an explicit cubic example appears in §6.9.

All main results below are proved. Numerical searches check examples and compare search families; they are not used to establish safety.

## 1. Loop identity

### Conventions and scope

Write \(\phi=\Phi\), \(c=P-\phi\), \(V(x)=\int_0^xT(u)\,du\), and \(W(x)=\int_0^xS(u)\,du\). Curves are continuous, odd, nondecreasing, and locally absolutely continuous; ordinary continuous piecewise smooth curves, including every curve in the brief, qualify. “Increasing” allows flat portions. Discontinuous curves require additional conventions at jumps and are outside the claims about M1 and altered decay here.

A positive signed fill buys units. **C is the trader's total cash cost; profit is \(\Pi=-C\)** when final inventory is zero. Profit has units bps × units. Search tables divide it by their designated initial scale q, not by total traded volume.

Unless a cap is stated, positions, order sizes, the number of operations, and elapsed time are unrestricted. Every individual strategy is finite. Set \(\tau=1\) by measuring waiting time in units of \(\tau\); restore \(dt/\tau\) in time integrals if desired.

A finite exponential wait does not send a nonzero \(\phi\) exactly to zero. A “full wait” means its infinite-time limit. None of the necessity proofs below needs that convention: the constructed counterexamples restore \(P=\phi=0\), and F when required, using finite waits.

### Theorem 1: cash accounting, with the signs fixed

Suppose prices are \(F+T(\phi)\), fills integrate the whole walk, and F changes only during waits. For wait k, write

\[
L_k=V(\phi_k^-)-V(\phi_k^+)\ge0,
\qquad \Delta F_k=F_k^+-F_k^-.
\]

Starting from rest and ending with \(P=0\),

\[
\boxed{\Pi=\sum_k P_k\Delta F_k-\sum_k L_k-V(\phi_{\rm end}).}
\tag{1}
\]

In particular, on an exact loop,

\[
\boxed{\Pi=\sum_k\bigl[P_k\Delta F_k-L_k\bigr].}
\tag{2}
\]

The two signs in the tentative identity in the brief must be reversed: a rising F benefits a long trader, while potential dissipated by decay costs the trader.

**Proof.** Along a fill, \(dP=d\phi\), so its curve cost is the change in V. Telescoping over fills and waits gives

\[
\sum_{\rm fills}\Delta V=V(\phi_{\rm end})+\sum_kL_k.
\]

Also, the product rule gives

\[
\sum_{\rm fills}F\,\Delta P
=[PF]_{\rm start}^{\rm end}-\sum_kP_k\Delta F_k
=-\sum_kP_k\Delta F_k.
\]

Add these costs and negate. This proves (1) and (2). ∎

Final F need not equal its starting value for (1): final \(P=0\) removes the \(PF\) boundary term. Final standing flow does matter, through \(-V(\phi_{\rm end})\).

If F also moves inside a fill, as in M2, the more general identity is

\[
\Pi=\int_{\text{whole path}}P\,dF
-\sum_kL_k-V(\phi_{\rm end}).
\tag{3}
\]

The integral includes the moving P inside each fill. Replacing it by a single endpoint value generally gives the wrong M2 cash flow. Extra price terms in M3 and M4 must likewise be included; their storage identities are derived below.

## 2. M0: fixed F

### Theorem 2

M0 is safe for every allowed T, on exact loops and from rest with any end state satisfying \(P=0\).

**Proof.** Equation (1) reduces to

\[
\Pi=-V(\phi_{\rm end})-\sum_kL_k\le0.
\]

V is nonnegative and decay reduces \(|\phi|\). ∎

This proof needs the sign condition \(xT(x)\ge0\); curvature causes no difficulty.

## 3. M1: absorption into F

The all-loops answer differs substantially from the short searches. For a nonlinear continuous T, **every positive absorption fraction is unsafe when inventory and the number of operations are unrestricted**.

### 3.1 Linear curves: the exact threshold is 1

Let \(T(x)=ax\), \(a>0\). Starting from rest,

\[
F-F_0=\rho a(P-\phi).
\]

Both sides are unchanged by a fill, and their changes agree during a wait. Consequently

\[
R=F_0+\rho aP+(1-\rho)a\phi.
\]

The first position term integrates to \(\rho aP^2/2\), which vanishes on a round trip. Thus

\[
C=(1-\rho)\left[\frac a2\phi_{\rm end}^2
+\int_{\rm waits}a\phi^2\,dt\right].
\tag{4}
\]

This proves safety for \(0\le\rho\le1\), including any end state. At \(\rho=1\), every round trip has zero cost. For \(\rho>1\), any nontrivial loop with effective decay gives a pump; finite exact examples follow from the construction in §3.2 with equal positive and negative amplitudes.

### 3.2 A cycle that restores position and flow but shifts F

For \(u,v>d>0\), define the following three-fill cycle D. It starts at \(P=\phi=0\):

| Operation | Signed fill or wait multiplier |
|---|---:|
| Buy | \(u\) |
| Wait | \(1-d/u\) |
| Sell | \(-(u+v-d)\) |
| Wait | \(1-d/v\) |
| Buy | \(v-d\) |

A wait multiplier r means duration \(-\log r\). After the first wait, \((\phi,c)=(u-d,d)\); after the second, \((\phi,c)=(-v+d,0)\). The last fill restores \(P=\phi=0\) exactly.

Define

\[
A_x=T(x)-T(x-d),\qquad D_x=V(x)-V(x-d).
\]

Direct fill integration gives the change in F and cash cost of D:

\[
\eta=\rho(A_u-A_v),
\qquad
K=D_u+D_v-\rho\,[uA_u+(v-d)A_v].
\tag{5}
\]

These do not depend on the starting F. Nor does the cash cost depend on an added constant inventory: M1's price and evolution use \(\phi,F\), not P. Reflecting all fill signs changes \(\eta\) to \(-\eta\) and leaves K unchanged.

If T is nonlinear, some choice has \(A_u\ne A_v\). Otherwise, increments of each sufficiently small fixed length would be independent of their location on \((0,\infty)\). By absolute continuity this would force \(T'\) to be constant almost everywhere; continuity at zero and oddness would make T linear. Thus for every \(\rho>0\), a nonlinear T admits a D with \(\eta\ne0\). Reflect it if necessary so that \(\eta>0\).

### Theorem 3: complete uncapped M1 classification

For \(\rho\ge0\), nonzero continuous T, and unrestricted inventory,

\[
\boxed{
\rho^*(T)=
\begin{cases}
1,&T(x)=ax,\ a>0,\\
0,&T\text{ is nonlinear}.
\end{cases}}
\tag{6}
\]

This is the threshold for both exact loops and any-end loops.

**Proof of necessity for nonlinear T.** Choose D as above. Pick a held inventory H so large that \(H\eta>2K\). Reach \((P,\phi)=(H,0)\) with the finite sequence

\[
+2H,\quad\text{wait }1/2,\quad-H.
\]

Run D N times at that inventory. Exit with

\[
-2H,\quad\text{wait }1/2,\quad+H.
\]

This restores \(P=\phi=0\). The entry and exit shifts in F cancel each other, leaving \(N\eta\). Finally run the reflected D N times at rest, restoring F exactly.

Put

\[
f_H=\rho[T(2H)-T(H)],\qquad
A_H=2[V(2H)-V(H)]-3Hf_H.
\]

The whole strategy has cash cost

\[
\boxed{C_N=A_H+N(2K-H\eta).}
\tag{7}
\]

One can obtain this either by integrating all fills or by noting that an increase \(N\eta\) in the sale price of the held H contributes \(-HN\eta\) to cost. Since the coefficient of N is negative, a finite N makes \(C_N<0\). All waits are finite; all three state variables close exactly. Sufficiency at \(\rho=0\) is M0, and the linear case was proved above. ∎

There is no finite “worst loop” without a duration or operation budget: (7) makes total profit arbitrarily large while keeping the chosen position range fixed.

### 3.3 Consequences for the requested families

For the two-slope band with \(B>0\), \(a_0,a\ge0\):

- If \(a_0=a>0\), the curve is linear and \(\rho^*=1\).
- If \(a_0\ne a\), the curve is nonlinear and \(\rho^*=0\).

For \(T(x)=a\min(|x|,L)\operatorname{sgn}x\), \(a,L>0\), \(\rho^*=0\). No nonlinear curve in this class has \(\rho^*=1\).

These are global thresholds. They do not claim that every tiny positive \(\rho\) has a pump within the original search's position and slice limits.

Here are two directly replayed instances of (7). Profit is total cash profit, not profit divided by turnover.

| T | \(\rho\) | \((u,v,d)\) | H | N | \(\eta\) | K | \(A_H\) | Profit |
|---|---:|---|---:|---:|---:|---:|---:|---:|
| Saturating, \(a=10,L=1\) | 0.25 | \((0.75,2,0.25)\) | 24 | 62 | 0.625 | 3.59375 | 480 | 4.375 |
| Band, \(B=2,a_0=5,a=10\) | 0.25 | \((3,1,0.5)\) | 42 | 2965 | 0.625 | 6.5625 | 38850 | 65.625 |

The respective peak absolute positions are 48 and 84. These witnesses intentionally expose the unrestricted question rather than claim to fit cap 16.

The proposed general functional involving one sweep and partitions cannot give the global M1 threshold unless it also captures cycles that shift F and the inventory used to monetize that shift. Equation (6) resolves the global question; a sharp characterization with a fixed position cap remains open here.

### 3.4 What the old M1 table establishes

Running the supplied `sim7.ts` reproduces the displayed table. Its schedules have at most eight entry and exit slices, with a limited overshoot family. In addition, its “exact” filter allows

\[
|F_{\rm end}-F_0|\le0.05\max(1,|T(q)|),
\]

so accepted loops need not restore F exactly. Negative sampled profits prove neither exact-loop safety nor any-end safety. The cycles above use analytic integrals and exact algebraic closure, without that tolerance.

## 4. M2: F moves inside fills

Assume \(\lambda\ge0\), and charge the contemporaneous F throughout the fill, as the model specifies.

### 4.1 A storage identity and the safe position-cap bound

Define

\[
A(x)=\int_0^x|T(u)|\,du=\operatorname{sgn}(x)V(x),
\qquad B(x)=\int_0^xA(u)\,du.
\]

A is odd; B is even and nonnegative. For a fill taking \(\phi=x\) to y, the exact cash cost and new F are

\[
\begin{aligned}
\Delta C&=F_{\rm old}(y-x)+V(y)-V(x)
+\lambda\,[B(y)-B(x)-A(x)(y-x)],\\
F_{\rm new}&=F_{\rm old}+\lambda[A(y)-A(x)].
\end{aligned}
\tag{8}
\]

Introduce

\[
J=PF+V(\phi)+\lambda B(\phi)-\lambda P A(\phi).
\]

Along a fill, \(dJ=(F+T(\phi))\,dP\). During a wait,

\[
\dot J=-\phi\,[T(\phi)+\lambda A(\phi)-\lambda P|T(\phi)|].
\]

Therefore every loop from rest satisfies

\[
\boxed{
C=V(\phi_e)+\lambda B(\phi_e)
+\int_{\rm waits}
\left\{\phi T(\phi)[1-\lambda P\operatorname{sgn}\phi]
+\lambda|\phi|V(\phi)\right\}dt.}
\tag{9}
\]

### Theorem 4: sharp M2 bound under an actual inventory cap

If \(|P|\le Q\) throughout every fill and wait, then

\[
\boxed{\lambda Q\le1\quad\Longrightarrow\quad\text{M2 is safe}.}
\tag{10}
\]

More quantitatively,

\[
C\ge V(\phi_e)+\lambda B(\phi_e)
+(1-\lambda Q)\int\phi T(\phi)\,dt
+\lambda\int|\phi|V(\phi)\,dt\ge0.
\tag{11}
\]

If T is nonzero somewhere in \((0,2Q)\), this bound is also necessary: every \(\lambda Q>1\) admits a finite exact pump respecting the cap. If T vanishes on \([-2Q,2Q]\), price stays at \(F_0\) and every \(\lambda\) is safe.

**Proof of sufficiency.** In (9), \(1-\lambda P\operatorname{sgn}\phi\ge1-\lambda Q\); every other displayed term is nonnegative. This proves (10) and (11), including any end state. ∎

**Proof of sharpness.** The state c obeys \(\dot c=P-c\) during waits and is unchanged by fills. Starting from rest under the cap gives \(|c|<Q\) at finite times and \(|\phi|\le2Q\).

Let \(b=\inf\{x\ge0:T(x)>0\}\). Activity somewhere in \((0,2Q)\) means \(b<2Q\). Choose \(p_0<Q\), close enough to Q that \(\lambda p_0>1\) and \(b<p_0+Q\). Choose \(q>b\) sufficiently close to b. Then

\[
\frac{V(q)}{T(q)}\le q-b,
\qquad
f_+:=T(q)(1-\lambda p_0)+\lambda V(q)<0,
\]

and \(c=p_0-q\) lies strictly between \(-Q\) and Q.

At \((\phi,c)=(q,c)\), use a small cycle: wait so c increases by d; trade to \(\phi=-r\); wait so c decreases by d; trade back to q, where \(0<d<\min(q,r)\). Its net change in \((P,\phi)\) is zero. The accumulated integral in (9), denoted E, satisfies

\[
\lim_{d\downarrow0}\frac Ed
=f_+ + T(r)[1+\lambda(c-r)]+\lambda V(r).
\tag{12}
\]

As \(r\downarrow0\), the last two terms tend to zero. First choose r, then d, to obtain \(E<0\), with every position strictly inside the cap.

The base state can be reached and exited using finitely many cap-respecting trades and waits. For example, reach a chosen c by holding \(\operatorname{sgn}(c)Q\) until the desired c is reached, then trade to the desired \(\phi\). To exit, hold \(-\operatorname{sgn}(c)Q\) until c reaches zero, then flatten. These connecting paths have a fixed contribution to (9), independent of repetitions. Repeating the negative-E cycle makes total cost negative and returns to \(P=\phi=0\). F may have shifted; concatenate the sign-reflected whole strategy. Reflection has the same cash cost and the opposite change in F, so the concatenation is an exact profitable loop. ∎

This proof explains why the threshold does not depend on curvature. The key multiplier is \(1-\lambda P\operatorname{sgn}\phi\). Curve shape changes the size and efficiency of a pump, while the first onset of active T supplies arbitrarily small \(V(q)/T(q)\).

With unrestricted inventory, every nonzero continuous T and every \(\lambda>0\) are unsafe: choose a large enough Q and apply the theorem. At \(\lambda=0\), M2 is M0.

### 4.2 Explicit finite exact leak above the bound

For \(T(x)=10x\), \(\lambda=1\), and actual cap \(Q=2\), take

\[
c=1.5,\quad q=0.4,\quad r=0.01,\quad d=0.005.
\]

One half of the strategy is:

1. Buy 2; wait by multiplier 0.25; sell 0.1. This reaches \((P,\phi,c)=(1.9,0.4,1.5)\).
2. Repeat N times: wait by 0.9875; sell 0.405; wait by 0.5; buy 0.405.
3. Sell 3.9; wait by \(4/7\); buy 2. This restores \(P=\phi=0\).
4. Run the sign-reflected half, with the same N, to restore F.

The total cost is

\[
C_N=22.5-0.026000416666\ldots\,N.
\]

At \(N=866\), profit is \(0.0163608333\ldots>0\). The peak absolute position is exactly 2; large individual sells merely cross through the allowed inventory interval. Increasing N makes profit unbounded without increasing the cap.

Thus a small positive residual above the bound can be a real leak. At or below \(\lambda Q=1\), a positive residual contradicts (9) and indicates an implementation or numerical error. A “cap” on individual order size alone does not imply (10).

## 5. M3: charge S at the moving position

### Theorem 5

For fixed F and price

\[
R=F+T(\phi)+S(P),
\]

where the fill integrates S at the moving P, M3 is safe for every allowed T and S, for exact and any-end loops.

**Proof.** A fill has cost

\[
F\,dq+\Delta V(\phi)+\Delta W(P).
\]

The W terms telescope to zero because P starts and ends at zero; waits do not move P. The remaining cost is exactly the M0 cost,

\[
C=V(\phi_e)+\sum_kL_k\ge0.
\tag{13}
\]

Equivalently, \(V(\phi)+W(P)\) is a storage function whose value cannot increase during a wait. ∎

The integrability of S is enough for the telescoping statement; its monotonicity is not needed for round-trip safety. Freezing \(S(P)\) at the start of a block instead would be a different execution rule, without this proof.

## 6. M4: handoff into c = P − φ

This section treats the operator's primary model:

\[
R=F_0+T(\phi)+S(c),\qquad c=P-\phi.
\]

Fills move P and \(\phi\) together and leave c unchanged. Original waits satisfy \(\dot\phi=-\phi\), \(\dot c=\phi\). Only §6.9 changes that decay law.

### 6.1 Complete characterization without a position cap

### Theorem 6

Let

\[
m=m_T=\inf_{x>0}\frac{T(x)}x.
\]

The following are equivalent:

1. Every exact M4 loop from rest has nonpositive profit.
2. Every M4 loop from rest ending with \(P=0\) has nonpositive profit.
3. For every \(u<v\),
   \[
   0\le S(v)-S(u)\le m(v-u).
   \tag{14}
   \]
4. For locally absolutely continuous S, \(0\le S'(c)\le m\) almost everywhere.

In fact, allowing S to be merely continuous, odd, and nondecreasing does not enlarge the safe set: safety itself forces the Lipschitz condition (14).

### Proof of sufficiency: storage and terminal value

Use

\[
H(\phi,c)=V(\phi)+\phi S(c)+W(c).
\tag{15}
\]

During a fill c is fixed, so the cost excluding the constant \(F_0\) is exactly \(\Delta H\). During a wait,

\[
\dot H=-\phi T(\phi)+\phi^2S'(c).
\]

Hence, after the \(F_0\) term cancels on a round trip,

\[
\boxed{C=H(\phi_e,c_e)
+\int_{\rm waits}[\phi T(\phi)-\phi^2S'(c)]\,dt.}
\tag{16}
\]

The definition of m gives \(\phi T(\phi)\ge m\phi^2\), so (14) makes the integrand nonnegative.

For an any-end loop, \(P_e=0\) means \(\phi_e=-c_e\). Therefore

\[
\begin{aligned}
H(-c,c)
&=V(c)-cS(c)+W(c)\\
&=V(c)-\int_0^{|c|}uS'(u)\,du\\
&\ge V(c)-\frac m2c^2\ge0.
\end{aligned}
\tag{17}
\]

Both terms in (16) are nonnegative. This proves safety even without restoring \(\phi\). The computations hold almost everywhere for Lipschitz S, which suffices for their integrated versions. ∎

### Proof of necessity: a repeatable two-wait cycle

Fix any c, \(q>0\), and \(0<d<q\). Start at \((\phi,c)=(q,c)\), and perform:

| Operation | New \(\phi\) | New c |
|---|---:|---:|
| Wait by \(1-d/q\) | \(q-d\) | \(c+d\) |
| Sell \(2q-d\) | \(-q\) | \(c+d\) |
| Wait by \(1-d/q\) | \(-q+d\) | c |
| Buy \(2q-d\) | q | c |

This returns P and \(\phi\) exactly, with F fixed. Its cash cost is

\[
\boxed{K_4(c,q,d)
=2[V(q)-V(q-d)]
-(2q-d)[S(c+d)-S(c)].}
\tag{18}
\]

The base state is accessible from rest: buy \(2c\), wait by 1/2, then trade \(q-c\). To return to rest afterward, trade \(-q-2c\), wait by 1/2, then buy c. These formulas use signed quantities and also work for negative c. Their combined cash cost is

\[
A_c=2[V(2c)-V(c)]-3cS(c),
\tag{19}
\]

independent of how many middle cycles are run. Thus a negative \(K_4\) produces a finite exact from-rest pump with

\[
C_N=A_c+NK_4<0
\tag{20}
\]

for sufficiently large N. Exact-loop safety therefore requires \(K_4\ge0\) for every c,q,d.

To obtain (14) without assuming differentiability of S, fix \(u<v\) and q. Partition \([u,v]\) into n intervals of length \(d=(v-u)/n<q\), and apply \(K_4\ge0\) on each interval. Summing yields

\[
S(v)-S(u)
\le n\frac{2[V(q)-V(q-d)]}{2q-d}.
\]

As \(n\to\infty\), the right side tends to \((v-u)T(q)/q\). Take the infimum over q to obtain (14). Conversely, (14) makes every (18) nonnegative because

\[
2\int_{q-d}^qT(x)\,dx\ge m\,d(2q-d).
\]

This establishes necessity, sufficiency, and the claimed equivalences. ∎

The mechanism is precise: decay changes the handoff price by \(S(c+d)-S(c)\); the trader sells a long traversal while that price is higher, then buys back after restoring c. The price difference is collected on roughly \(2q\) units, while the temporary curve only loses roughly \(2dT(q)\). Locally,

\[
K_4=2d[T(q)-qS'(c)]+o(d).
\tag{21}
\]

The dangerous slope can occur at a c unrelated to q. This is why looking only at one buy-wait-sell sweep misses the full restriction.

### 6.2 Largest safe S and existence of curved examples

Equation (14) and \(S(0)=0\) imply

\[
0\le S(x)\le mx\qquad(x\ge0).
\]

The upper envelope itself is safe:

\[
\boxed{S_{\max}(x)=m_Tx.}
\tag{22}
\]

“Largest” is understood on positive positions, with odd extension to negative positions. A literal pointwise ordering on the whole real line would be inappropriate for odd functions: inequalities reverse on reflection.

Consequences:

- A nonzero safe S exists **if and only if \(m_T>0\)**.
- For \(T(x)=ax+bx^3\), \(a>0,b>0\), the largest safe S is \(ax\). Nonlinear safe choices such as \(S(x)=a\ell\tanh(x/\ell)\), \(\ell>0\), also work.
- For an increasing-slope band, \(a\ge a_0>0\), the largest safe S is \(a_0x\).
- For a saturating curve, \(m_T=0\), so the only globally safe S is zero.
- For a pure cubic, \(m_T=0\) because \(T(x)/x\to0\) near zero. Again only S = 0 is safe under the original decay.

Being below the envelope pointwise is necessary but not sufficient. A function can stay below \(mx\) and still have a local slope above m; cycle (18) detects that defect.

### 6.3 Proportional handoff and the linear-only matching theorem

Let \(M_T=\operatorname*{ess\,sup}_{x\in\mathbb R}T'(x)\). For nonzero T, Theorem 6 gives

\[
\boxed{S=\rho T\text{ is safe exactly when }
\rho M_T\le m_T.}
\tag{23}
\]

If \(M_T=\infty\), every positive \(\rho\) fails. If \(m_T=0\), the same conclusion holds for every nonzero T.

For \(S=T\), (14) gives \(T(x)\le mx\) on \(x>0\), while the definition of m gives the reverse inequality. Hence:

\[
\boxed{S=T\text{ is safe under the original M4 decay if and only if T is linear.}}
\tag{24}
\]

For a two-slope band with \(B>0\),

\[
m_T=\min(a_0,a),\qquad M_T=\max(a_0,a),
\]

so the exact proportional threshold is

\[
\rho_{4}^{*}=\frac{\min(a_0,a)}{\max(a_0,a)}.
\tag{25}
\]

The zero curve is the trivial exception to the ratio notation.

| T | \(m_T\) | Largest safe S on \(x\ge0\) | Safe \(\rho\) for \(S=\rho T\) |
|---|---:|---|---|
| \(ax\), \(a>0\) | a | \(ax\) | \([0,1]\) |
| Band \(a_0=1,a=10\) | 1 | x | \([0,0.1]\) |
| Band \(a_0=0,a=10\) | 0 | 0 | \(\{0\}\) |
| Band \(a_0=5,a=10\) | 5 | \(5x\) | \([0,0.5]\) |
| Saturating \(a\min(x,L)\) | 0 | 0 | \(\{0\}\) |
| \(ax+bx^3\), \(a,b>0\) | a | \(ax\) | \(\{0\}\) |

Thus the brief's assertion that every curved T fails at every \(\rho\ge0.25\) is false. Its own `sim8.ts` returns negative profits for the \(a_0/a=0.5\) band at \(\rho=0.25\) and 0.5, exactly as (25) predicts. The separate claim that matching \(S=T\) fails for every curved T is correct.

### 6.4 Sweep bound and the exact slicing condition

Buy q, wait fully, sell q, and wait fully again. Its cost is

\[
C=2V(q)-qS(q).
\]

Therefore safety requires

\[
\boxed{qS(q)\le2V(q)\qquad(q>0).}
\tag{26}
\]

This is valid even if only finite exact loops are admitted: approximate the full waits, then close the small residual c with proportionally small trades and a half-wait. Continuity makes the extra cost tend to zero, so a strict violation of (26) would persist in a finite exact loop.

But (26) is insufficient, even when T is linear. For a concrete example, take \(T(x)=x\) and extend the following S oddly:

\[
S(x)=
\begin{cases}
0,&0\le x\le1,\\
2(x-1),&1<x<2,\\
x,&x\ge2.
\end{cases}
\]

Then \(0\le S(x)\le x\) for every positive x, so \(xS(x)\le2V(x)\) everywhere. Nevertheless, choosing \(c=5/4,q=1,d=1/4\) in (18) gives \(K_4=-7/16\). The entry and exit cost (19) is \(45/16\); seven middle cycles give total profit \(1/4\), with exact finite closure. Thus even lying pointwise below the largest safe S does not imply safety.

The exact additional finite slicing test is

\[
\boxed{
S(c+d)-S(c)
\le\frac{2[V(q)-V(q-d)]}{2q-d}
\quad(c\in\mathbb R,\ q>d>0).}
\tag{27}
\]

By the proof of Theorem 6, (27) is equivalent to the global Lipschitz bound and is already a complete characterization; the sweep condition then follows automatically.

For the candidate \(S(q)=\rho\,2V(q)/q\), on \(q>0\),

\[
S'(q)=\rho\,\frac{2[qT(q)-V(q)]}{q^2}.
\]

Its exact safety criterion is therefore

\[
\rho\operatorname*{ess\,sup}_{q>0}
\frac{2[qT(q)-V(q)]}{q^2}\le m_T.
\tag{28}
\]

For the two-slope bands this gives the same threshold (25); for saturation it allows only \(\rho=0\). Choosing \(\rho\le1\) enforces the sweep bound but does not enforce (28).

### 6.5 Explicit worst-loop families

If (14) fails, (18)–(20) supply repeatable exact pumps. There is no finite global worst profit without a bound on the number of operations. The following loops give concrete witnesses and can be scaled by repetition.

**Saturation: three fills and two finite waits suffice.** Let

\[
T(x)=a\min(|x|,L)\operatorname{sgn}x,\qquad S=\rho T.
\]

Choose \(0<d\le L\), \(q-d\ge L\), and \(q>L/\rho+d/2\). Starting from rest, use

\[
+q,\quad\text{wait }1-d/q,\quad-(2q-d),
\quad\text{wait }1-d/q,\quad+(q-d).
\]

This ends at \(P=\phi=c=0\) exactly, and

\[
\boxed{\Pi=ad\,[\rho(2q-d)-2L]>0.}
\tag{29}
\]

At \(a=10,L=1,\rho=0.25,q=5,d=0.5\), the fills are \(+5,-9.5,+4.5\), both wait multipliers are 0.9, and profit is **1.875**. Peak absolute inventory is 5.

**Increasing-slope bands.** Choose c beyond the band and \(0<q\le B\). If \(c,c+d>B\), then (18) becomes

\[
K_4=d(2q-d)(a_0-\rho a).
\tag{30}
\]

This is negative exactly when \(\rho>a_0/a\), matching the theorem. Two replayed examples, with \(B=2,a=10,c=3,q=1,d=0.5\), are:

| \(a_0\) | \(\rho\) | Cost per middle cycle | Entry + exit cost | Repetitions | Total profit | Peak \(\lvert P\rvert\) |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0.25 | −1.125 | 135 | 121 | 1.125 | 6 |
| 5 | 0.75 | −1.875 | 75 | 41 | 1.875 | 6 |

All waits and all closures in these examples are finite and exact.

### 6.6 Charging S at P: a proved change, tested in the search

Replacing the fill integrand by \(T(\phi)+S(P)\), with P moving during the fill, changes M4 into M3. The entire S charge becomes \(\Delta W(P)\) and cancels on every position round trip. This changes the answer completely: **every T and S are safe** under the original decay.

For a direct numerical comparison, the `sim8.ts` schedule family was rerun with analytic primitives in place of midpoint quadrature. The same schedules were priced using both M4 and moving-P M3. The search used

\[
\begin{aligned}
q&\in\{0.5,1,2,3,4,6,8,12,16\},\\
h&\in\{0.25,1,3,50\},\\
n_{\rm in},n_{\rm out}&\in\{1,2,4,8\},\\
\text{overshoot}&\in\{0,0.5,1\}.
\end{aligned}
\]

That is 1728 schedules per curve and pricing rule, with the reflected schedules giving identical profits by symmetry. Entry slices are followed by waits of length h; exit slices trade \(q(1+\text{overshoot})\) in total with the same waits; an optional final fill returns the overshoot. Here \(S=T\). Results are maximum sampled \(\Pi/q\):

| Curve | Original M4 | Moving-P M3 |
|---|---:|---:|
| \(10x\) | 0 | −0.625000 |
| Band \(B=2,a_0=1,a=10\) | 49.608115 | −0.062500 |
| Band \(B=2,a_0=0,a=10\) | 55.120127 | 0 |
| Band \(B=2,a_0=5,a=10\) | 27.560064 | −0.312500 |
| Saturating \(a=10,L=3\) | 55.018378 | −0.625000 |
| Saturating \(a=10,L=1\) | 24.251980 | −0.625000 |
| \(x+x^3\) | 4736.000000 | −0.062622 |

The linear M4 numerical maximum was \(7.6\times10^{-14}\), reported as zero. Negative maxima reflect the search's positive waits and finite slice counts, not a strict negative upper bound on all loops: an immediate retraced fill has zero profit.

For the curved \(a_0=5,a=10\) band, the maximum at \(\rho=0.25\) was −0.234375, and at \(\rho=0.5\) it was −0.156250. Theorem 6, rather than these finite observations, proves safety there.

For the two saturating M4 rows, the worst sampled schedules were respectively \((q,h,n_{\rm in},n_{\rm out},\text{overshoot})=(16,0.25,1,2,1)\) and \((12,0.25,1,2,1)\). For all three band M4 rows they were \((16,3,4,8,1)\). For \(x+x^3\), the worst was \((16,50,2,2,1)\).

The original `sim7.ts` and `sim8.ts` were left unchanged. Independent checks used exact V, and exact B for M2, verified the finite witnesses against their formulas, and verified all final state constraints. As an additional M2 check, 1500 seeded signed schedules per curve were tested at \(Q=4,\lambda=1/4\); none had positive profit. These numerical checks do not replace the proofs.

### 6.7 Optional extension: the exact M4 answer with a hard inventory cap

The unrestricted theorem is the answer to the stated primary model. A hard cap can materially change the conclusion for a saturating curve, so it is useful to separate that problem.

Suppose \(|P|\le Q\) throughout. Define, for \(|c|<Q\),

\[
m_Q(c):=\inf_{0<x\le Q+|c|}\frac{T(x)}x.
\tag{31}
\]

### Theorem 7

Within the reachable interval for c, cap-respecting M4 is safe exactly when

\[
\boxed{0\le S'(c)\le m_Q(c)\quad\text{almost everywhere on }(-Q,Q).}
\tag{32}
\]

The largest safe S on \([0,Q]\) is

\[
\boxed{S_{\max,Q}(x)=\int_0^x m_Q(u)\,du.}
\tag{33}
\]

Values outside the reachable c interval cannot be constrained by this capped experiment.

**Proof.** Reachability gives \(|c|<Q\) and \(\phi=P-c\in[-Q-c,Q-c]\). Thus any accessible nonzero \(\phi\) satisfies \(T(\phi)/\phi\ge m_Q(c)\). Condition (32) makes the integrand in (16) nonnegative. Also \(m_Q(u)\le T(u)/u\) for \(0<u\le Q\), so

\[
H(-c,c)=V(c)-\int_0^{|c|}uS'(u)\,du\ge0.
\]

This proves sufficiency.

For necessity, use unequal positive and negative amplitudes u,v in the cycle of §6.1. Its exact cost is

\[
K_{u,v}=[V(u)-V(u-d)]+[V(v)-V(v-d)]
-(u+v-d)[S(c+d)-S(c)].
\tag{34}
\]

Its cost divided by d tends to

\[
T(u)+T(v)-(u+v)S'(c).
\]

At \(c\ge0\), u can be arbitrarily small while v can approach any value up to \(Q+c\); these choices respect the cap. Letting \(u\downarrow0\) forces \(S'(c)\le T(v)/v\) for every such v. For \(c<0\), reverse the roles. Strict violations give finite negative cycles, and cap-respecting entry and exit are available exactly as in Theorem 4. Repetition amortizes their fixed costs. This proves necessity; integration of the derivative bound gives (33). ∎

For saturation with knee L, (31) becomes

\[
m_Q(c)=a\min\left(1,\frac{L}{Q+|c|}\right).
\]

For \(S=\rho T\), the exact capped threshold is therefore

\[
\boxed{\rho\le\min\left(1,\frac{L}{Q+\min(Q,L)}\right).}
\tag{35}
\]

For example, cap 16 gives thresholds \(3/19\) for L = 3 and \(1/17\) for L = 1. If \(Q\ge L\), the largest safe handoff on \(0\le x\le Q\) is the nonzero curve

\[
S_{\max,Q}(x)=aL\log(1+x/Q).
\tag{36}
\]

There is no conflict with the uncapped zero-handoff result: at each fixed x this tends to zero as \(Q\to\infty\).

### 6.8 Merely changing the decay speed cannot fix the original obstruction

Replacing \(\dot\phi=-\phi\) by \(\dot\phi=-k(P,\phi)\phi\), with a finite strictly positive locally continuous rate k, leaves each wait on the same fixed-P path. The small waits in (18) remain attainable; only their durations change. Therefore the same safe set and the same pumps persist.

A rate that becomes zero and blocks particular states changes reachability and is a different case. It cannot be analyzed merely as a rescaling of time.

### 6.9 Changing the decay target can make S = T safe

**Trivial option: decay c toward zero.** If \(\dot c=-c/\tau\), starting from c = 0, fills leave c unchanged and c remains zero forever. Then \(\phi=P\), price is \(F_0+T(P)\), and all round trips retrace a single potential. This is safe for any T, but performs no nonzero handoff from rest.

**Nontrivial option: retain two-thirds of P in \(\phi\) for a cubic curve.** Let

\[
T(x)=ax+bx^3,\qquad a,b\ge0,
\qquad S=T,
\]

and change only the waiting rule to

\[
\boxed{
\dot\phi=-\frac{\phi-2P/3}{\tau},
\qquad
\dot c=\frac{P/3-c}{\tau}.}
\tag{37}
\]

Fills and prices retain their original M4 definitions.

### Theorem 8

Rule (37) is safe on every exact or any-end loop from rest. For \(b>0\), this is a curved T with \(S=T\) and a nonzero handoff.

**Proof.** Use the storage function

\[
G(P,c)=V(P-c)+P T(c)-V(c).
\tag{38}
\]

Its fill derivative is

\[
\partial_PG=T(P-c)+T(c),
\]

exactly the nonconstant part of the execution price. Its terminal value is \(G(0,c)=0\), regardless of residual c. For the cubic family,

\[
G(P,c)=\frac a2P^2
+b\left(\frac14P^4-P^3c+\frac32P^2c^2\right),
\qquad
\partial_cG=bP^2(3c-P).
\]

During a wait under (37),

\[
\dot G=-\frac{b}{3\tau}P^2(3c-P)^2\le0.
\]

Telescoping G along fills and waits, and using \(P=0\) at both endpoints, gives

\[
\boxed{C=\frac b{3\tau}\int_{\rm waits}P^2(3c-P)^2\,dt\ge0.}
\tag{39}
\]

This proves the theorem. ∎

After a buy of q from rest, the limiting split is \((\phi,c)=(2q/3,q/3)\). Price falls from \(aq+bq^3\) to \(aq+bq^3/3\). Thus this rule has actual decay of the nonlinear price component and a persistent nonzero c.

The same 1728-schedule search in §6.6, with \(T=x+x^3\), \(S=T\), and the exact wait update

\[
\phi_{\rm after}=\frac{2P}{3}
+\left(\phi_{\rm before}-\frac{2P}{3}\right)e^{-h},
\]

found maximum profit/q of −0.001037598, versus +4736 under the original decay. Equation (39) establishes safety beyond the search.

**A general smooth construction.** For any smooth nondecreasing odd T with \(S=T\), keep G from (38). It is the convexity remainder

\[
G(P,c)=V(\phi)-V(-c)-T(-c)(\phi+c)\ge0,
\]

and vanishes whenever \(P=0\). Choose any well-posed waiting flow

\[
\boxed{
\dot c=\mu(P,c)\,[T(\phi)+T(c)-P T'(c)],
\quad\dot\phi=-\dot c,
\quad\mu\ge0.}
\tag{40}
\]

Then \(\dot c=-\mu\partial_cG\) and

\[
\dot G=-\mu(\partial_cG)^2\le0.
\]

The same telescoping proof makes every loop safe. For \(T\in C^2\), for example, a positive mobility proportional to \(1/[1+(\partial_cG)^2]\) makes the vector field bounded and locally Lipschitz, ensuring finite-time existence for each fixed-P wait.

This is a mathematical construction, not a claim that every resulting path resembles the original handoff. For concave or saturating curves it may move c opposite to P. The cubic rule (37) supplies the stronger, explicit example with an ordinary relaxation target and handoff in the intended direction after a fill from rest.

## 7. Map of the design space

The first table is for unrestricted inventory and unrestricted finite sequences. “Unsafe” means there is a finite exact from-rest pump; in the constructions above, profit can grow without bound by repetition. Zero curves and zero parameters are understood separately.

| Mechanism | Linear \(T=ax\) | Nonlinear two-slope band | Saturating T | General continuous nonlinear T |
|---|---|---|---|---|
| M0, fixed F | Safe | Safe | Safe | Safe |
| M1, absorption | Safe iff \(0\le\rho\le1\) | Unsafe for every \(\rho>0\) | Unsafe for every \(\rho>0\) | Unsafe for every \(\rho>0\) |
| M2, fill-driven F | Unsafe for every \(\lambda>0\) | Unsafe for every \(\lambda>0\) | Unsafe for every \(\lambda>0\) | Unsafe for every \(\lambda>0\) |
| M3, integrate S(P) | Safe for every S | Safe for every S | Safe for every S | Safe for every S |
| Original M4, arbitrary S | Safe iff \(\operatorname{Lip}(S)\le a\) | Safe iff \(\operatorname{Lip}(S)\le\min(a_0,a)\) | Safe iff S = 0 | Safe iff \(\operatorname{Lip}(S)\le\inf_{x>0}T(x)/x\) |
| Original M4, S = T | Safe | Unsafe | Unsafe | Unsafe |
| Original M4, S = \(\rho T\) | \(\rho\le1\) | \(\rho\le\min(a_0,a)/\max(a_0,a)\) | Only \(\rho=0\) | \(\rho\operatorname*{ess\,sup}T'\le\inf T(x)/x\) |

M1 at \(\rho=0\) and M2 at \(\lambda=0\) are M0. If \(T\equiv0\), M0–M3 have no nonconservative trading cost; original M4 still needs S = 0 for unrestricted safety.

The following are distinct constrained or modified designs:

| Additional assumption or change | Proved result |
|---|---|
| M2 with actual \(\lvert P\rvert\le Q\), T active within \((-2Q,2Q)\) | Safe iff \(\lambda Q\le1\) |
| Original M4 with actual \(\lvert P\rvert\le Q\) | Safe iff \(S'(c)\le\inf_{0<x\le Q+\lvert c\rvert}T(x)/x\) on reachable c |
| Capped saturating M4, S = \(\rho T\) | Safe iff (35) holds |
| Original M4 with only a strictly positive change in decay speed | Same safe set as the original rule |
| M4 pricing, S = T, c decays to zero from rest | Safe; c stays zero and there is no handoff |
| M4 pricing, \(T=ax+bx^3\), S = T, \(\phi\to2P/3\) | Safe by (39), with nonzero handoff |
| Smooth M4 pricing, S = T, gradient rule (40) | Safe whenever the waiting flow is well posed |

## 8. Open questions, ranked

1. **M1 under a fixed inventory cap.** The unrestricted threshold is settled by Theorem 3. A sharp capped threshold, and the shortest or most profitable cap-respecting strategies, remain unresolved here. The short searches in the brief do not settle this. Any candidate characterization must include F-shifting cycles and the cost of transferring between inventories.

2. **Which simple relaxation targets work for broader curve families?** The cubic target \(\phi\to2P/3\) is proved. A classification of targets \(\phi\to\alpha P\) for general T, especially bands and bounded concave curves, is not proved here. Rule (40) proves that safe state-dependent dynamics exist in the smooth setting, but does not ensure monotone handoff toward the trader's position for every curve.

3. **Quantitative worst profit with finite resources.** With unrestricted repetitions, unsafe cases above have no finite maximum profit. Fixed duration, trade-count, turnover, or execution-rate constraints create a different optimization problem. The displayed loops are witnesses and asymptotic pump families, not claims of optimality under those added constraints.

4. **Discontinuous curves and execution conventions.** The proofs use continuous curves and exact integration through fills. Jumps, price ticks, spread, freezing a position charge across a block, or delayed F updates change the cash-flow equations and require separate analysis. These are not exceptions to a theorem about the specified execution rule.

No conjecture is needed for the primary unrestricted M4 question: Theorem 6 gives the full safe set, Theorem 7 gives its hard-cap counterpart, and Theorems 5 and 8 answer the two proposed design changes. The unresolved items above are stated without unsupported numerical thresholds.

For context, the dependence on the exact resilience and execution variables also appears in the order-book literature: [Alfonsi and Schied, *Optimal Trade Execution and Absence of Price Manipulations in Limit Order Book Models*](https://epubs.siam.org/doi/abs/10.1137/090762786) studies nonlinear impact with exponential resilience and explicitly distinguishes its model from other transient-impact formulations. The proofs in this note are derived for the present M0–M4 rules; no external no-arbitrage theorem is being transferred between models.
