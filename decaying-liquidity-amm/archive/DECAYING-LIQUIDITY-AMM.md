# When may a decaying-liquidity AMM move its center without a money pump?

## 1. Loop identity

Write $x=\Phi$, and let $\Pi$ denote the trader's cash profit: minus the sum of signed trade costs. At a flat terminal position this needs no mark-to-market convention. A wait has endpoints $x^-$ and $x^+$, center change $\Delta F=F^+-F^-$, and potential loss

$$
D=V(x^-)-V(x^+)\geq0.
$$

“Increasing” means nondecreasing, as required by the saturating examples. The main classifications use continuous, piecewise smooth curves, including all curves in the brief. Section 3 also treats the exception that arises if “piecewise smooth” permits a jump at zero. Assume $\tau>0$ and $\lambda\geq0$.

There is **no inventory cap in the stated model**. Where a cap is added below, it means $|P|\leq C$ throughout every trade and wait. Bounds on the number of slices or on individual fill sizes are different restrictions.

### Theorem 1: cash identity

When the center is constant during each trade,

$$
\boxed{
\Pi=\sum_{\text{waits }k}P_k\Delta F_k
       -\sum_k D_k
       -[FP]_{\rm initial}^{\rm final}
       -[V(x)]_{\rm initial}^{\rm final}.
}
\tag{1}
$$

Consequently, on an exact loop,

$$
\boxed{\Pi=\sum_k\bigl(P_k\Delta F_k-D_k\bigr).}
\tag{2}
$$

Starting from rest and ending with $P=0$, without requiring the other variables to reset,

$$
\boxed{\Pi=\sum_k P_k\Delta F_k-\sum_kD_k-V(x_f).}
\tag{3}
$$

**Proof.** During trades, $dP=dx$, so the total cost is

$$
\mathcal C=\sum_{\rm trades}F\,\Delta P
                 +\sum_{\rm trades}\Delta V.
$$

The product $FP$ changes by $F\Delta P$ on trades and by $P\Delta F$ on waits. Also, the potential changes by $-D_k$ on wait $k$. Therefore

$$
\sum_{\rm trades}F\Delta P=[FP]-\sum_kP_k\Delta F_k,
\qquad
\sum_{\rm trades}\Delta V=[V]+\sum_kD_k.
$$

Negating the cost proves all three formulas. ∎

The displayed expression in the brief has the signs of **cost**, rather than profit. A rising center benefits a long position: $P\Delta F>0$. Potential lost to decay is a cost: $-D\leq0$ in the profit identity.

If $F$ also moves during trades, the corresponding identity for $R=F+T(x)$ is

$$
\Pi=-[FP+V(x)]+\int_{\rm trades\ and\ waits}P\,dF-\sum_kD_k.
\tag{4}
$$

Finite fills in this formula are integrated along their actual paths. In particular, one cannot apply the wait-only formula directly to M2.

**Exactness of waits.** A finite exponential wait never sends a nonzero $x$ exactly to zero. “Full wait” will mean a limit when used informally. Every counterexample constructed below can instead use finitely many finite waits and finish with $x=P=0$ and $F=F_0$ exactly. A final wait at $P=0$ changes no cash profit; it does not automatically reset $F$.

## 2. M0: fixed center

### Theorem 2

M0 is safe for every stated $T$, both on exact loops and from rest with any terminal state satisfying $P_f=0$.

**Proof.** With $F$ fixed, (3) gives

$$
\Pi=-V(x_f)-\sum_kD_k\leq0.
$$

On an exact loop the first term vanishes. This proof needs neither strict monotonicity nor differentiability. ∎

## 3. M1: fair-absorption

Define $\rho^*(T)$ as the largest safe $\rho$ in the stipulated interval $[0,1]$. For continuous curves, the answer in the unrestricted model is

$$
\boxed{
\rho^*(T)=
\begin{cases}
1,&T(x)=ax,\quad a\geq0,\\
0,&T\text{ is nonlinear}.
\end{cases}}
\tag{5}
$$

This is the answer for both exact loops and from-rest, any-end loops. The positive nonlinear thresholds suggested by the finite search are not global safety thresholds.

### 3.1 Linear curves

### Theorem 3

For $T(x)=ax$, $a>0$, M1 is safe exactly when $0\leq\rho\leq1$, even if larger values of $\rho$ are allowed for comparison. At $\rho=1$, every flat-position loop from rest has zero profit.

**Proof.** Put

$$
c=P-x.
$$

Trades leave $c$ unchanged. On waits, $\Delta c=x^--x^+$, so

$$
F=F_0+\rho ac,
\qquad
R=F_0+\rho aP+(1-\rho)ax.
$$

The first two terms have the trade potential $F_0P+\rho aP^2/2$. They contribute zero total cost when $P$ returns to zero. The remaining term is M0 multiplied by $1-\rho$. Thus

$$
\Pi=-(1-\rho)\left(V(x_f)+\sum_kD_k\right).
\tag{6}
$$

This proves safety and the zero-profit assertion. For $\rho>1$, any nontrivial exact loop with decay has positive profit. For example, choose $u>v>0$: buy $u$, wait until $x=v$, sell $u+v$, wait until $x=-v$, then buy $v$. Its profit is

$$
(\rho-1)a(u^2-v^2)>0.
$$

Its final $c,x,P$ are zero, hence its center resets as well. ∎

If $T\equiv0$, all values of $\rho$ have no effect and every flat-position loop has zero profit.

### 3.2 A finite exact pump for every nonlinear continuous curve

The construction uses two different **secant slopes** of $T$. No approximation by continuous trading is needed.

Choose $\delta>0$ and two positive intervals

$$
v_i=u_i-\delta>0,
\qquad
k_i=\frac{T(u_i)-T(v_i)}{\delta},
\qquad k_2>k_1.
$$

The labels order the slopes; they need not order the locations of the intervals. Define

$$
m_i=\frac{u_i+v_i}{2},
\qquad
A_i=\frac{V(u_i)-V(v_i)}{\delta}.
\tag{7}
$$

Let $n$ be a positive integer and $L=n\delta$. Starting from rest, perform the following four stages. Before **each** wait, trade to the specified starting flow. Every wait takes the finite time $\tau\log(u_i/v_i)$.

| Stage | Repeat $n$ times | Change in $c=P-x$ | Total center change |
|---|---|---|---|
| 1 | Trade to $x=u_1$; wait to $v_1$ | $0\to L$ | $\rho k_1L$ |
| 2 | Trade to $x=u_2$; wait to $v_2$ | $L\to2L$ | $\rho k_2L$ |
| 3 | Trade to $x=-u_1$; wait to $-v_1$ | $2L\to L$ | $-\rho k_1L$ |
| 4 | Trade to $x=-u_2$; wait to $-v_2$ | $L\to0$ | $-\rho k_2L$ |

Finally trade to $x=0$. Since $c=0$, this also sets $P=0$. The table shows that $F$ resets exactly.

### Lemma 4: profit of the four-stage loop

The profit is exactly

$$
\boxed{
\Pi_n=\rho(k_2-k_1)L^2
       +2L\left[\rho(k_1m_1+k_2m_2)-(A_1+A_2)\right].
}
\tag{8}
$$

**Proof.** Every wait on interval $i$, of either sign, loses potential $\delta A_i$. Total loss is therefore $2L(A_1+A_2)$.

On a positive stage beginning at $c=C$, the positions held during successive waits are

$$
C+j\delta+u_i,\qquad 0\leq j<n,
$$

and each center increment is $\rho k_i\delta$. On a negative stage beginning at $c=C$, the positions are $C-j\delta-u_i$, and each center increment is $-\rho k_i\delta$. Summing these arithmetic progressions over the four rows gives

$$
\sum_kP_k\Delta F_k
=\rho\left[(k_2-k_1)L^2+2L(k_1m_1+k_2m_2)\right].
$$

Subtract the potential losses using (2). ∎

### Theorem 5: nonlinear absorption is unsafe at every positive rate

If $T$ is continuous and nonlinear, every $\rho>0$ admits finite exact loops with arbitrarily large profit.

**Proof.** A continuous nonlinear function on the positive half-line has two equal-length positive intervals with unequal secant slopes. Otherwise, increments of each fixed length would be independent of their starting point; continuity would make the function affine. Oddness and continuity at zero would then make it linear.

Choose the two intervals and label their slopes as above. In (8), the coefficient of $L^2$ is strictly positive, while all other terms grow only linearly. Taking a sufficiently large integer $n$ gives positive profit, and letting $n\to\infty$ makes it unbounded. Every member of the sequence is a finite exact loop. ∎

There is consequently **no worst finite loop** in the unsafe regime: the supremum of profit is infinite. The four-stage family exhibits the mechanism. Its total traded volume is $O(L)$, while profit is $O(L^2)$; profit per gross traded unit is also unbounded. In the safe regime the maximum is zero, attained by doing nothing or immediately retracing a trade.

The economic term responsible for the pump is the inventory-weighted center movement. Different slopes let the trader arrange small and large center changes at different inventory levels. Center increments cancel, but their inventory-weighted sum does not.

### 3.3 Exact answers for the band and saturating families

For the band with $B>0$, $0\leq a_0<a$, take interval 1 inside the band and interval 2 above it. Then

$$
k_1=a_0,\quad k_2=a,
\quad A_1=a_0m_1,
\quad A_2=am_2-(a-a_0)B,
$$

and (8) becomes

$$
\boxed{
\Pi_n=\rho(a-a_0)L^2
 +2L\left[(a-a_0)B-(1-\rho)(a_0m_1+am_2)\right].
}
\tag{9}
$$

Thus $\rho^*=0$. More generally, any genuine change of slope, including $a<a_0$, gives $\rho^*=0$ by relabeling the intervals. If $a=a_0$, or the band disappears, the curve is linear and $\rho^*=1$.

For $T(x)=a\min(|x|,Q)\operatorname{sign}(x)$, with $a,Q>0$, take interval 1 entirely above $Q$, and interval 2 below $Q$. Then

$$
k_1=0,\quad k_2=a,\quad A_1=aQ,\quad A_2=am_2,
$$

so

$$
\boxed{\Pi_n=\rho aL^2-2aL\left[Q+(1-\rho)m_2\right].}
\tag{10}
$$

In particular, any integer $n$ satisfying

$$
n\delta>\frac{2[Q+(1-\rho)m_2]}{\rho}
$$

produces an exact pump. Hence $\rho^*=0$ for every nontrivial saturating curve, regardless of its saturation point.

The following finite examples were checked by integrating the piecewise polynomial potentials exactly. All use $\delta=0.5$, outer slope $a=10$, and the four stages above. Profits are total cash profits in **bps × units**, not profits divided by an arbitrary initial order size.

| Curve | $\rho$ | $u_1,u_2$ | $n$ per stage | Maximum $\lvert P\rvert$ | Exact profit |
|---|---:|---|---:|---:|---:|
| Band $B=2,a_0=1$ | 0.25 | $1,3$ | 6 | 8.5 | 1.125 |
| Band $B=2,a_0=0$ | 0.25 | $1,3$ | 2 | 4.5 | 1.25 |
| Band $B=2,a_0=5$ | 0.25 | $1,3$ | 44 | 46.5 | 13.75 |
| Saturating $Q=3$ | 0.25 | $4,1$ | 58 | 58.5 | 36.25 |
| Saturating $Q=1$ | 0.25 | $2,1$ | 26 | 26.5 | 16.25 |
| Saturating $Q=3$ | 0.01 | $4,1$ | 1,498 | 1,498.5 | 37.45 |

The endpoints satisfy $x=P=0$ and $F=F_0$ algebraically; their validity does not depend on a numerical reset tolerance.

### 3.4 General functional and the proposed conjecture

There is an exact variational expression, but the unrestricted answer reduces to (5).

For a geometric schedule starting and ending at $x=P=0$, define

$$
\mathcal A=\sum_kP_k\bigl(T(x_k^-)-T(x_k^+)\bigr),
\qquad
\mathcal D=\sum_k\bigl(V(x_k^-)-V(x_k^+)\bigr).
$$

Restrict to schedules satisfying

$$
\sum_k[T(x_k^-)-T(x_k^+)]=0,
$$

which is precisely the center-reset condition for $\rho>0$. Then

$$
\boxed{
\rho^*_{\rm exact}(T)
=\min\left\{1,\ \inf_{\mathcal A>0}\frac{\mathcal D}{\mathcal A}\right\},
}
\tag{11}
$$

with an empty infimum interpreted as $+\infty$. This follows directly from $\Pi=\rho\mathcal A-\mathcal D$; schedules with $\mathcal A\leq0$ cannot profit at nonnegative $\rho$.

For a linear curve, $\mathcal A=\mathcal D$ on exact loops. For a nonlinear curve, the four-stage family has $\mathcal D=O(L)$ and $\mathcal A=\Theta(L^2)$, so the infimum is zero. Thus the general continuous-curve classification is proved; no conjecture remains necessary here. A formula considering only a single entry and exit partition must also admit repeated inventory accumulation to capture this infimum.

### 3.5 What the supplied search establishes

Rerunning [sim7.ts](sim7.ts) reproduces the table in the brief. It searches specified entry/exit schedules, with at most eight slices per phase, selected waits, and $q\leq16$ or $32$. It does not search all finite loops.

Its “exact” center-reset filter actually permits

$$
|F-F_0|\leq0.05\max(1,|T(q)|).
$$

It also replaces potential integrals by a 200-point midpoint rule. A candidate accepted by that filter is therefore not, by itself, a proof of an exact pump. Conversely, a negative maximum over this grid is not a safety certificate. The finite exact examples above settle the issue without either approximation.

### 3.6 Can a nonlinear curve have $\rho^*=1$?

**For continuous curves, no**, by Theorem 5.

If the original regularity wording permits a jump at zero, there is an exception:

$$
T(x)=ax+b\operatorname{sign}(x),\qquad a,b\geq0,\quad T(0)=0.
\tag{12}
$$

During any finite nonzero wait, the sign stays fixed, so only the linear part is absorbed. Therefore

$$
R=F_0+\rho aP+(1-\rho)ax+b\operatorname{sign}(x).
$$

The $P$-term is conservative; the other terms are M0 curves when $\rho\leq1$. Hence (12) is safe throughout $[0,1]$, including when $b>0$ makes it nonlinear.

The secant construction proves the full finite-wait distinction: a non-affine restriction of $T$ to $x>0$ has $\rho^*=0$; an affine restriction has the form (12) and is safe on $[0,1]$. Assigning an additional center jump at an idealized infinite wait for the discontinuous curve would be a different convention: it is not the limit of its finite-wait dynamics.

## 4. M2: fill-driven fair

For the continuous curves in the brief, the apparent threshold becomes precise once “cap” is defined:

* With a hard inventory cap $|P|\leq C$, **$\lambda C\leq1$ is safe**.
* If the curve is nonzero at some accessible $0<x<2C$, **every $\lambda C>1$ is unsafe**, even on exact loops.
* Without a cap, every $\lambda>0$ is unsafe for every nonzero continuous curve in the model.

### 4.1 An exact identity for M2

Define the odd function $H$ and even potential $K$ by

$$
H(x)=\int_0^x|T(z)|\,dz=\operatorname{sign}(x)V(x),
\qquad
K(x)=\int_0^xH(z)\,dz\geq0.
$$

Set

$$
\widetilde F=F-\lambda H(x),
\qquad G(x)=T(x)+\lambda H(x),
\qquad W(x)=V(x)+\lambda K(x).
$$

During a trade, $dF=\lambda\,dH(x)$, so $\widetilde F$ is constant and the price is $\widetilde F+G(x)$. During a wait,

$$
\Delta\widetilde F
=\lambda[H(x^-)-H(x^+)].
$$

Apply (3) to this equivalent representation. Along waits, $dc=-dx=x\,dt/\tau$; hence $dc$ has the sign of $x$. The result is

$$
\boxed{
\Pi=-W(x_f)
 +\int_{\rm waits}
 \left[(\lambda P\operatorname{sign}(x)-1)|T(x)|-\lambda V(x)\right]|dc|.
}
\tag{13}
$$

This formula is exact for arbitrary finite trades and waits.

For clarity, the exact cost of a single fill $x\to y$, starting at center $F$, is

$$
F(y-x)+V(y)-V(x)
 +\lambda\bigl[K(y)-K(x)-H(x)(y-x)\bigr],
\tag{14}
$$

and its center increment is $\lambda[H(y)-H(x)]$. Freezing $F$ throughout that fill would change the model.

### Theorem 6: the safe region with a hard inventory cap

If $|P|\leq C$ and $\lambda C\leq1$, M2 is safe from rest with any flat terminal position, for every continuous curve in the brief.

**Proof.** In (13),

$$
\lambda P\operatorname{sign}(x)-1\leq\lambda C-1\leq0.
$$

Both $V$ and $W$ are nonnegative. Every term in (13) is therefore nonpositive. ∎

This explains why curvature drops out of this bound: the proof uses the sign of $T$, its potential's nonnegativity, and the inventory bound. It uses no derivative or curvature of $T$.

There is **no positive residual leak** at $\lambda C\leq1$ in this model. Neither supplied simulation implements M2, so its reported sub-1-bp residual cannot be audited from these two files. If a positive residual occurs under this inequality, at least one of the hard-cap interpretation, continuous fill integration, or numerical accuracy must be checked.

### Theorem 7: the bound is sharp

Let $C>0$, let $T$ be continuous, odd and nondecreasing, and suppose $T(u)>0$ for some $0<u<2C$. If $\lambda C>1$, there is a finite exact profitable loop respecting $|P|\leq C$. Its profit can be made arbitrarily large by repetition.

**Proof.** Let

$$
r=\inf\{x>0:T(x)>0\}.
$$

Then $r<2C$, and, for $u>r$,

$$
0\leq\frac{V(u)}{T(u)}\leq u-r.
$$

Choose $r<u<2C$ sufficiently close to $r$ that

$$
(\lambda C-1)T(u)-\lambda V(u)>0.
\tag{15}
$$

Put $c_0=C-u\in(-C,C)$. Consider a local circuit beginning at $x=0,P=c_0$:

1. Trade to $x=u,P=C$.
2. Wait until $x=u-\delta$, for a sufficiently small $\delta>0$. This raises $c$ from $c_0$ to $c_0+\delta$. By continuity and (15), its contribution to the integral in (13) is some fixed $J>0$.
3. Return $c$ to $c_0$ using many small negative-flow waits. Keep their starting flow at $-\varepsilon$, and replenish it between waits. Finish by trading to $x=0$.

Choose $\varepsilon$ small enough that all positions on the return stay inside $(-C,C)$. The return's total $|dc|$ is $\delta$, and the magnitude of its contribution is at most

$$
\delta\left[(\lambda C+1)T(\varepsilon)+\lambda V(\varepsilon)\right]\longrightarrow0.
$$

Thus a finite number of sufficiently small negative-flow waits makes the whole local circuit's integral contribution $I>0$.

The state $x=0,P=c_0$ is reachable from rest within the cap: hold $P=\operatorname{sign}(c_0)C$, wait until $c=c_0$, then trade to $x=0$. It can also be exited to rest within the cap: trade to the opposite extreme position, wait until $c=0$, then trade to $x=0$. These waits are finite because $|c_0|<C$. If $c_0=0$, no access or exit is needed.

Insert $N$ copies of the local circuit between this access and exit. Formula (13), with $x_f=0$, gives full-loop profit

$$
NI+\text{a constant independent of }N.
$$

This is positive for sufficiently large finite $N$. Here $I$ is the contribution to the full-loop identity, not the isolated cash profit while the inventory $c_0$ remains open; the final liquidation accounts for that inventory.

The resulting block ends at $x=P=0$, but may change $F$. Append a copy with every trade and flow sign reversed. Oddness of $T$ makes its center increment the negative of the first block's increment. Its flat-position cash profit is the same, since a constant starting center contributes zero to a flat-position block. Their concatenation resets $F$ exactly and doubles the positive profit. Repeating this exact loop proves unbounded total profit. ∎

The reachability qualification has a simple meaning. During waits, $dc=(P-c)dt/\tau$, while trades leave $c$ unchanged. Starting from zero under $|P|\leq C$, one has $|c|<C$ at finite times and hence $|x|<2C$. If $T=0$ throughout $(-2C,2C)$, the curve is never active; every trade occurs at $F_0$ and all flat loops have zero profit for any $\lambda$. This includes a zero-slope band with $B\geq2C$.

For nonzero continuous $T$, an unrestricted trader can always choose a finite $C$ with $\lambda C>1$ and an active $u<2C$. Theorem 7 therefore proves the uncapped claim. At $\lambda=0$, M2 is M0.

Continuity at zero matters for the sharp necessity statement. For example, the discontinuous curve $T(x)=b\operatorname{sign}(x)$ has $F=F_0+\lambda bP$ and is safe for every $\lambda$; its extra price term is conservative.

### 4.2 A finite numerical witness just above the bound

Take $T(x)=10x$, $C=1$, and $\lambda=1.1$. The following specifies a reproducible finite exact pump:

* Access $x=0,P=0.9$: buy $1$, wait to $x=0.1$, then sell $0.1$.
* One local circuit buys $0.1$, waits from $x=0.1$ to $0.08$, and returns $c$ from $0.92$ to $0.9$ with 400 negative-flow waits. Before each such wait, trade to $x=-0.0001$; wait to $x=-0.00005$. Finish by trading to $x=0$.
* Repeat that local circuit 13,450 times.
* Exit by trading to $P=-1$, waiting from $x=-1.9$ to $-1$, and buying $1$.
* Append the sign-reversed copy of the entire block.

For each local circuit the integral contribution in (13) is exactly

$$
I=\frac{210076543}{240000000000}>0.
$$

Access and exit, with no inserted circuits, contribute $-10.773$. The full two-block profit is therefore

$$
\boxed{
2(-10.773+13450I)
=\frac{4800190067}{2400000000}
\approx2.00007919458.
}
\tag{16}
$$

All positions stay in $[-1,1]$. All waits have finite, positive duration. The three terminal variables reset exactly. This calculation was checked using (14), with identical circuits composed algebraically and the displayed profit also evaluated by rational arithmetic. Its many waits explain why a short schedule search can miss the sharp threshold.

## 5. M3: standing position skew

### Theorem 8

With $F$ fixed and $R=F+T(x)+S(P)$, M3 is safe for every stated $S,T$, both on exact loops and from rest with any flat terminal position. Its flat-loop cash profit is exactly the M0 profit.

**Proof.** Let $U_S(P)=\int_0^P S(z)\,dz$. A trade changes the potential

$$
FP+V(x)+U_S(P)
$$

by precisely its cost. Waits change only $V(x)$, decreasing it by $D_k$. Since $P$ starts and ends at zero, the total contribution of $S$ is

$$
\int S(P)\,dP=U_S(0)-U_S(0)=0.
$$

Thus $\Pi=-V(x_f)-\sum_kD_k\leq0$. ∎

The proof uses the stated retraced integral of $S(P)$ during a fill. Charging a whole finite fill at its pre-fill value of $S(P)$ would be a different mechanism. In fact, on flat-position loops the conservative argument needs only a primitive for $S$, not its monotonicity.

## 6. M4: handoff

Here $c=P-x$, $F$ is fixed, and $R=F+T(x)+S(c)$. The full characterization is controlled by

$$
\boxed{m=\inf_{x>0}\frac{T(x)}{x}.}
\tag{17}
$$

### 6.1 The sweep bound

### Proposition 9

Safety requires

$$
\boxed{qS(q)\leq2V(q)\qquad(q>0).}
\tag{18}
$$

**Proof.** Buying $q$, allowing full decay, and selling $q$ has limiting cost $2V(q)-qS(q)$.

The same necessity follows from finite exact loops. For $\varepsilon>0$, buy $u=q+\varepsilon$, wait to $v=\varepsilon$, sell $u+v$, wait from $-u$ to $-v$, then buy $v$. Its profit is

$$
(q+2\varepsilon)S(q)-2[V(q+\varepsilon)-V(\varepsilon)].
$$

It ends exactly at $x=P=0$. Letting $\varepsilon\downarrow0$ proves (18); a strict violation already gives a profitable loop at a sufficiently small positive $\varepsilon$. ∎

This necessary condition is not sufficient, even for the saturating curve with $S=T$.

### 6.2 Full characterization

### Theorem 10

For continuous $T$ and odd nondecreasing $S$, the following are equivalent:

1. M4 is safe on every exact loop from rest.
2. M4 is safe from rest with any terminal state satisfying $P_f=0$.
3. $S$ is globally Lipschitz with constant at most $m$:

$$
\boxed{0\leq S(b)-S(a)\leq m(b-a)\quad\text{for all }a<b.}
\tag{19}
$$

For an absolutely continuous $S$, this is equivalent to $0\leq S'(c)\leq m$ almost everywhere. The largest safe $S(q)$ at every $q>0$ is attained by $S(q)=mq$.

**Proof of sufficiency.** Define

$$
U_S(c)=\int_0^cS(z)\,dz,
\qquad
E(x,c)=V(x)+xS(c)+U_S(c).
\tag{20}
$$

During a trade, $c$ is constant and $\partial E/\partial x=T(x)+S(c)$, so the trade cost after removing the constant-center term is precisely $\Delta E$.

During a wait, $dx=-dc$, so, almost everywhere,

$$
dE=[xS'(c)-T(x)]\,dc
=\frac{x^2}{\tau}\left[S'(c)-\frac{T(x)}{x}\right]dt\leq0.
\tag{21}
$$

At a flat terminal position, $x_f=-c_f$, and oddness gives

$$
E(-c,c)=V(c)-cS(c)+U_S(c)
=V(c)-\int_0^c zS'(z)\,dz\geq0.
\tag{22}
$$

The last inequality follows from $V(c)\geq mc^2/2$ and $\int_0^c zS'(z)dz\leq mc^2/2$; the formulas are even in $c$. Total trade cost equals $E_f-E_0$ minus the changes of $E$ during waits. Since $E_0=0$, (21) and (22) prove nonnegative cost for every flat terminal position.

**Proof of necessity.** Fix any $c\in\mathbb R$, $u>v>0$, and $\delta=u-v$. Starting at $x=0,P=c$, use the exact local cycle

| Action | Flow after action | $c=P-x$ after action |
|---|---:|---:|
| Buy $u$ | $u$ | $c$ |
| Wait to $v$ | $v$ | $c+\delta$ |
| Sell $u+v$ | $-u$ | $c+\delta$ |
| Wait to $-v$ | $-v$ | $c$ |
| Buy $v$ | $0$ | $c$ |

Its cash profit is exactly

$$
\boxed{
\Pi_{\rm local}=(u+v)[S(c+\delta)-S(c)]-2[V(u)-V(v)].
}
\tag{23}
$$

Suppose (19) fails. Some secant slope of $S$ exceeds $m+2\eta$ for an $\eta>0$. Subdividing that interval gives arbitrarily short subintervals with at least that slope. Choose $u>0$ such that $T(u)/u<m+\eta$. For sufficiently short $\delta>0$, put $v=u-\delta$. Continuity of $T$ gives

$$
\frac{2[V(u)-V(u-\delta)]}{(2u-\delta)\delta}
\longrightarrow\frac{T(u)}{u}<m+\eta.
$$

Choose one of the short secants of $S$ of length $\delta$. Equation (23) is then strictly positive.

The starting state $x=0,P=c$ can be reached from rest at finite cost and exited to rest at finite cost. For example, for $c\ne0$, trade to $x=2c$, wait to $c$, then trade to $x=0$; after the local cycles, trade to $x=-2c$, wait to $-c$, then trade to $x=0$. Repeating the profitable local cycle sufficiently many times pays for both access and exit. $F$ is fixed, and the final $x,P$ are zero, so this is an exact pump from rest. If $c=0$, access and exit are unnecessary.

This proves that exact-loop safety implies (19). The implications now establish equivalence. Finally, (19) and $S(0)=0$ give $S(q)\leq mq$ for $q>0$, and $S(c)=mc$ attains the bound. ∎

The necessity argument also applies to discontinuous monotone $S$: any jump violates the required Lipschitz bound and supplies steep secants. Safe handoff functions must therefore be continuous.

### 6.3 Consequences for the requested families

For $S=\rho T$, define the global Lipschitz constant of $T$ by

$$
L_T=\sup_{a<b}\frac{T(b)-T(a)}{b-a}.
$$

The exact condition is that $\rho T$ have Lipschitz constant at most $m$. When $L_T<\infty$, this is

$$
\boxed{\rho L_T\leq m.}
\tag{24}
$$

* **Linear:** $m=L_T=a$. Thus $S=\rho T$ is safe exactly for $\rho\leq1$.
* **Band, $0\leq a_0<a$:** $m=a_0$, $L_T=a$. Thus $S=\rho T$ is safe exactly for $\rho\leq a_0/a$. More generally, any odd increasing $S$ with Lipschitz constant at most $a_0$ is safe. In particular, a curved band with $a_0>0$ admits nonzero safe handoffs.
* **Saturating:** $m=0$. The only safe odd increasing handoff is $S\equiv0$. Every positive multiple of $T$ is unsafe.
* **General two-slope band:** if both slopes are positive, $m=\min(a_0,a)$ and $L_T=\max(a_0,a)$, so the corresponding ratio is $\min(a_0,a)/\max(a_0,a)$.

In particular, $S=T$ is safe **only for linear $T$**. Indeed, its safety would give $T(q)\leq mq$ by (19), while the definition of $m$ gives $T(q)\geq mq$. Thus $T(q)=mq$ for every $q>0$, and oddness completes the proof.

The averaging proposal in [sim8.ts](sim8.ts),

$$
S(c)=\rho\frac{2V(c)}{c},\qquad S(0)=0,
$$

does not enlarge the safe range for these families. For the hardening band, its derivative is $\rho a_0$ inside the band and

$$
\rho\left[a-(a-a_0)\frac{B^2}{c^2}\right]
$$

outside, with supremum $\rho a$. Its threshold is again $a_0/a$. For a saturating curve it is nonzero when $\rho>0$, and $m=0$, so it is unsafe. Although this proposal satisfies the sweep bound by construction for $\rho\leq1$, it still fails the full criterion.

### 6.4 Finite counterexamples and the lag mechanism

For a saturating curve and $S=\rho T$, take $c=0$, $0<\delta\leq Q$, and $u-\delta>Q$ in (23). Then

$$
\boxed{\Pi=a\delta\,[\rho(2u-\delta)-2Q].}
\tag{25}
$$

It is positive for every $\rho>0$ once $u>Q/\rho+\delta/2$, also imposing $u>Q+\delta$. This is a three-trade, two-wait exact loop directly from rest. For $a=10,Q=3,\rho=0.25,\delta=0.5,u=13$, its exact profit is **1.875**.

For the band $B=2,a_0=1,a=10,S=0.25T$, use $c=3,u=1,v=0.5$. Formula (23) gives local profit **1.125**. The access and exit described in Theorem 10 together cost **135**. Thus 121 local cycles give a finite exact loop from rest with profit **1.125**. Both examples were checked by exact potential integration.

The lag is visible in (21): current flow $x$ determines the rate and direction of decay, while accumulated flow $c$ determines the marginal handoff slope $S'(c)$. They can be placed in different parts of their curves. Whenever $S'(c)>T(x)/x$, a suitable cycle gains from that mismatch. Merely choosing the same function for $S$ and $T$ does not force their arguments to coincide.

Rerunning [sim8.ts](sim8.ts) also corrects one assertion in the brief. For the band $a_0=5,a=10$, its reported maxima for $S=\rho T$ at $\rho=0.25,0.5,0.75,1$ are respectively $-0.2,-0.2,5.4,27.6$ bps per initial unit. The theorem proves safety through $0.5$; this curved case is not unsafe at every $\rho\geq0.25$.

## 7. Map of the design space

The table concerns continuous curves and all finite loops from rest. Each safe entry covers both exact and any-end loops. Each unsafe entry admits a finite exact counterexample. Bands in this table have $B>0$ and $0\leq a_0<a$; saturation has $a,Q>0$.

| Mechanism | Linear $T=ax$, $a>0$ | Genuine two-slope band | Saturating curve |
|---|---|---|---|
| **M0**, fixed center | Safe | Safe | Safe |
| **M1**, no inventory cap | Safe for $0\leq\rho\leq1$ | Safe only at $\rho=0$ | Safe only at $\rho=0$ |
| **M2**, no inventory cap | Safe only at $\lambda=0$ | Safe only at $\lambda=0$ | Safe only at $\lambda=0$ |
| **M2**, hard $\lvert P\rvert\leq C$, active curve | Safe exactly for $\lambda C\leq1$ | Safe exactly for $\lambda C\leq1$ | Safe exactly for $\lambda C\leq1$ |
| **M3**, any odd increasing $S(P)$ | Safe | Safe | Safe |
| **M4**, $S=\rho T$ | Safe exactly for $\rho\leq1$ | Safe exactly for $\rho\leq a_0/a$ | Safe only at $\rho=0$ |
| **M4**, general odd increasing $S$ | Safe iff $\operatorname{Lip}(S)\leq a$ | Safe iff $\operatorname{Lip}(S)\leq a_0$ | Safe iff $S=0$ |

For the three numerical bands, M4's sharp proportional bounds are therefore **0.1, 0, and 0.5**, while M1's unrestricted bounds are **0, 0, and 0**.

The M2 capped row assumes $T(u)>0$ for some $u<2C$. A curve that vanishes on the entire accessible interval is inactive and is safe for every $\lambda$. The identically zero curve is similarly degenerate throughout the table. For curves permitting a jump at zero, use the qualifications in Sections 3.6 and 4 rather than the continuous-curve table.

## 8. Open questions, ranked

The unrestricted continuous-curve safety questions posed in the brief, and M2's hard inventory-cap threshold, are resolved above. The following constrained optimization questions remain open in this analysis.

1. **M1 with a hard inventory cap: determine $\rho_C^*(T)$.** The original search suggests this is the practically relevant missing parameter. There is already a rigorous upper bound: for every four-stage construction fitting within the cap,

   $$
   \rho_C^*(T)\leq
   \frac{2(A_1+A_2)}{(k_2-k_1)L+2(k_1m_1+k_2m_2)}.
   \tag{26}
   $$

   A conservative sufficient condition for that construction to fit is $2L+\max(u_1,u_2)\leq C$. Thus, for each fixed nonlinear curve, these bounds decrease as $O(1/C)$ for large caps. The finite examples in Section 3 give additional concrete cap-dependent upper bounds. A matching lower bound, or an exact capped threshold for bands and saturation, is not proved here. The supplied grid does not establish one.

2. **Find the least costly M2 pump just above $\lambda C=1$.** Theorem 7 settles existence, but not minimum turnover, elapsed time, or number of fills. The explicit $\lambda C=1.1$ example uses millions of finite waits. This is evidence of a construction's inefficiency, not a lower bound on the necessary effort. A sharp complexity bound near the threshold would make the safety boundary more operationally informative.

3. **Determine sharp spread and finite-horizon bounds under inventory limits.** One partial result follows immediately from M1's construction: with unrestricted inventory, any fixed spread charge per traded unit is $O(L)$, while its nonlinear pump earns $\Theta(L^2)$. Such a spread cannot repair unrestricted nonlinear M1. Under bounded inventory, the relevant quantity is maximum profit per gross traded unit; it is not determined by the safety classifications alone.

4. **Classify models with finite-duration fills or an enforced trade-rate limit.** The present proofs allow instantaneous fills and arbitrarily many finite waits. Merely requiring waits to be finite does not remove any displayed counterexample. A rate limit during which decay also acts changes the dynamics and requires a new analysis. No safety conjecture for that modified model is asserted from the present tables.

All numerical values added in this report were checked with exact antiderivatives; the M2 witness additionally has the rational verification in (16). The supplied simulations were rerun without modification. Numerical checks support the explicit constructions; the safety claims rest on the proofs.
