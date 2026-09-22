# Adversarial review of the decaying-liquidity AMM

The unconstrained model has sharper answers than the tables suggest. **M0 and M3 are safe. M1 is unsafe at every positive absorption rate on every continuous nonlinear curve. On nonzero curves, M2 is unsafe at every positive rate without an inventory limit; with a genuine inventory limit $C$, its universal safe bound is $\lambda C\le1$, and this bound is sharp. M4 is safe precisely when the slope of its standing skew never exceeds $\inf_{x>0}T(x)/x$.**

These are theorems, not conclusions inferred from a grid. Every positive-profit construction below can close $P,\Phi,F$ exactly using finite waits. Repeating one such exact loop makes total profit unbounded. Thus there is no “most profitable loop” with finite profit in any unsafe case under the stated model. I give exact finite witnesses, divergent families, and the best normalized profits found by a specified finite search.

The search is [adversary.ts](adversary.ts), a single dependency-free Bun/TypeScript file. This report contains its results and the limits of those results.

## 1. Loop identity: theorem and proof

Write $x=\Phi$, $p=P$, and $c=p-x$. Set $F_0=0$ without loss of generality for closed inventory. Profit means minus total cash paid, in bps times units. In numerical tables, “per unit” means profit divided by **total units bought**, including all repeated cycles and overshoots.

Except for the explicit qualification at the end of Section 3, assume $T$ is continuous, odd, nondecreasing, and locally absolutely continuous, with piecewise smoothness sufficient. This includes the bands, saturating curves, smooth curves, and continuous flat steps considered here. “Increasing” must allow flat intervals to include the brief's examples. Convex and concave describe the positive half-line; the negative half is its odd extension. Take $\rho,\lambda\ge0$.

For wait $k$, define

$$
D_k=V(x_k^-)-V(x_k^+)\ge0,\qquad
\Delta F_k=F_k^+-F_k^-.
$$

**Theorem 1.** If the center changes only during waits, a path starting at rest and ending at $p_f=0$ has

$$
\boxed{\Pi=\sum_k p_k\Delta F_k-\sum_k D_k-V(x_f).}
\tag{1}
$$

In particular, on an exact loop,

$$
\boxed{\Pi=\sum_k\big[p_k\Delta F_k-D_k\big].}
\tag{2}
$$

The displayed identity in the brief has both signs reversed: it describes cost, not trader profit. A positive center change benefits a long position; potential dissipated by decay costs the trader.

**Proof.** Sum the potential changes on trades. Telescoping across trades and waits gives

$$
\sum_{\mathrm{trades}}\Delta V=V(x_f)+\sum_k D_k.
$$

Integration by parts gives

$$
\int_{\mathrm{trades}}F\,dp
=[Fp]_0^f-\sum_k p_k\Delta F_k
=-\sum_k p_k\Delta F_k.
$$

Add these two contributions to cash cost and change its sign. This also proves (1). Notice that $F_f=F_0$ is unnecessary for the cash identity when both endpoint inventories are zero. It matters for whether the entire state resets. ∎

For M2, which changes $F$ during fills, the necessary additional term is

$$
\boxed{\Pi=\int_{\mathrm{trades}}p\,dF+
\sum_k p_k\Delta F_k-\sum_kD_k-V(x_f).}
\tag{3}
$$

For general initial and final inventories, replace the last term by
$-[Fp]_0^f-[V(x)]_0^f$ and retain the other terms. The same integration-by-parts proof applies.

During a wait,

$$
dc=-dx,\quad p=x+c\text{ is fixed},\quad
\operatorname{sgn}(dc)=\operatorname{sgn}(x).
\tag{4}
$$

A finite wait has factor $r=e^{-t/\tau}>0$; it never sends a nonzero $x$ to zero. The constructions here avoid treating a large finite time as infinity. A useful finite closure from any state is:

1. Trade to $x=-2c,\ p=-c$.
2. Wait with factor $1/2$, giving $x=-c,\ p=-c,\ c=0$.
3. Trade $+c$, giving $x=p=0$.

For M1 or M2 this can leave a center displacement. Append a **mirror**: repeat the entire inventory-flat path with every signed trade reversed and every wait unchanged. Oddness makes its center displacement the negative of the first path's. Its profit is identical because changing the starting center adds a constant times net traded units, which is zero. Thus the concatenation is exactly state-closing, with twice the profit.

## 2. M0: fixed center

**Theorem 2.** M0 is safe for every admitted $T$, both on exact loops and from rest with any endpoint satisfying $p_f=0$.

**Proof.** Equation (1) becomes

$$
\Pi=-V(x_f)-\sum_kD_k\le0.
$$

This covers arbitrary sign changes, partial waits, unequal slices, overshoots, any number of legs, and flat portions of $T$. ∎

The maximum profit is exactly **zero**, attained by doing nothing or immediately reversing a trade without waiting. Negative sampled maxima in the old table cannot be global maxima because the grid omits these zero-profit schedules.

## 3. M1: absorption during decay

### 3.1 Linear curves

**Theorem 3.** If $T(x)=ax$, $a>0$, M1 is safe exactly for $0\le\rho\le1$.

Both trades and waits preserve $F-\rho ac$, so starting from rest gives $F=\rho ac$. Therefore

$$
R=(1-\rho)ax+\rho ap.
$$

The second term integrates to the position potential $\rho ap^2/2$. Consequently, for every inventory-flat endpoint,

$$
\boxed{\Pi=-(1-\rho)\left[V(x_f)+\sum_kD_k\right].}
\tag{5}
$$

This proves safety, including the endpoint $\rho=1$, where every inventory round trip has zero profit. For $\rho>1$, any exactly closing path with positive decay loss is profitable. ∎

### 3.2 A finite staircase missed by the grid

Choose $u,v,d>0$, with $d<\min(u,v)$, and a positive integer $N$. Define $H_N(u,v,d)$:

1. Buy $u$.
2. Perform $N$ positive waits, each taking $x:u\to u-d$. Between consecutive waits buy $d$.
3. After the last positive wait, trade $-(u+v-d)$, setting $x=-v$.
4. Perform $N$ negative waits, each taking $x:-v\to-v+d$. Between consecutive waits sell $d$.
5. Finally buy $v-d$.

The wait factors are $1-d/u$ and $1-d/v$, generally different. There are $2N$ finite waits. The path ends at $p=x=0$, and its inventory satisfies

$$
\max|p|=\max\{u+(N-1)d,\ v-d\}.
$$

Define

$$
A=T(u)-T(u-d),\quad B=T(v)-T(v-d),\quad
D_u=V(u)-V(u-d),\quad D_v=V(v)-V(v-d).
$$

The center displacement is $\rho N(A-B)$. Its **exact half-loop profit** is

$$
\boxed{
\Pi_H=
\frac{\rho d(A-B)}2N^2+
N\left\{\rho\left[(u-d/2)A+(v-d/2)B\right]-D_u-D_v\right\}.
}
\tag{6}
$$

To prove (6), the positive waits hold positions $u+jd$, $j=0,\ldots,N-1$; the negative waits hold $Nd-v-jd$. Substitute their center changes $+\rho A,-\rho B$ and potential losses $D_u,D_v$ into (2), which needs only $p_f=x_f=0$, and sum the arithmetic progressions.

Append the mirror of $H_N$. The **exact complete-loop profit is $2\Pi_H$**, and all three state variables return to their starting values. Total units bought in this complete loop are

$$
Q_{\rm buy}=2\{u+v+(N-2)d\}.
\tag{7}
$$

### 3.3 The global threshold is zero for every continuous nonlinear curve

**Theorem 4.** For continuous admitted curves, other than the identically zero curve,

$$
\boxed{
\rho^*(T)=
\begin{cases}
1,&T(x)=ax,\ a>0,\\
0,&T\text{ is nonlinear}.
\end{cases}}
\tag{8}
$$

This classification is the same for exact loops and from rest with any inventory-flat endpoint.

**Proof.** If $T$ is nonlinear on the positive half-line, there exist equal-length positive intervals on which its increments differ. Otherwise its increment over length $d$ would depend only on $d$; additivity and continuity would force $T(x)=ax$. Label the intervals so that $A>B$.

For every $\rho>0$, the coefficient of $N^2$ in (6) is strictly positive, while the other term is linear in $N$. Hence sufficiently large finite $N$ gives a profitable exact mirrored loop. Its profit tends to infinity, and its profit per unit bought also tends to infinity. At $\rho=0$, M1 is M0. The linear case is Theorem 3. ∎

This proof does not assume convexity, concavity, exactly two slopes, saturation, or a positive minimum slope. The exploit accumulates inventory and center movement while keeping standing flow inside selected local intervals. A sweep indexed by one excursion size cannot capture that inventory accumulation.

For the two-slope band with $B>0$, the exact answer is therefore **zero whenever $a_0\ne a$**, including $a_0=0$; when $a_0=a>0$, it is one. For $T(x)=a\min(|x|,Q_*)\operatorname{sgn}x$, with $a,Q_*>0$ finite, it is **zero**. There is no positive global threshold near 0.9 for saturation.

Some small, exactly evaluable witnesses:

| Curve | $\rho$ | $(u,v,d,N)$ in (6), followed by mirror | Exact complete profit |
|---|---:|---|---:|
| Band $B=2,a_0=1,a=10$ | $1/4$ | $(3,1,1/2,6)$ | $9/8$ |
| Same band | $1/100$ | $(3,1,1/2,444)$ | $999/100$ |
| Band $B=2,a_0=0,a=10$ | $1/4$ | $(3,1,1/2,2)$ | $5/4$ |
| Band $B=2,a_0=5,a=10$ | $1/4$ | $(3,1,1/2,44)$ | $55/4$ |
| Saturation $a=10,Q_*=1$ | $1/4$ | $(1,2,1/2,26)$ | $65/4$ |
| Saturation $a=10,Q_*=3$ | $1$ | $(3,6,3/2,5)$ | $225/2$ |
| $T(x)=x+x^3$ | $1/4$ | $(2,1,1/2,8)$ | $5/2$ |
| Slopes $2,12,1,8$, breaks $1,2,4$ | $1/4$ | $(2,1/2,1/4,24)$ | $3/4$ |
| Slopes $1,0,2$, breaks $1,2$ | $1/4$ | $(3,3/2,1/2,18)$ | $9/4$ |

For example, the $Q_*=1$ saturation witness has profit $5N(N-25)/8$ at $\rho=1/4$. Its $N=26$ loop stays within $|p|\le13.5$, so even a true 16-unit inventory limit does not rescue that old table entry.

### 3.4 An exact functional, rather than the proposed partition conjecture

For a path with $p_f=x_f=0$, put

$$
\mathcal A=\sum_k p_k[T(x_k^-)-T(x_k^+)],\qquad
\mathcal D=\sum_kD_k.
$$

Restrict to center-neutral paths, meaning $\sum_k[T(x_k^-)-T(x_k^+)]=0$. These have profit $\rho\mathcal A-\mathcal D$, so on the brief's parameter interval,

$$
\rho^*=\min\left\{1,\inf_{\mathcal A>0}
\frac{\mathcal D}{\mathcal A}\right\}.
\tag{9}
$$

This is a proved path functional. The mirrored staircases make the ratio tend to zero on every continuous nonlinear curve. On a linear curve, $\mathcal A=\mathcal D$. No unresolved general conjecture is needed in this unconstrained model.

**Regularity qualification.** If “piecewise smooth” permits a jump at zero, the answer to “can a nonlinear curve have $\rho^*=1$?” changes. With actual finite exponential waits, $T(x)=ax+b\operatorname{sgn}x$, $a>0,b>0$, is nonlinear but safe through $\rho=1$. Finite decay never crosses the jump, so $F=\rho ac$, and its cost adds the nonnegative dissipation of $b|x|$ to (5). More generally the increment proof still applies unless $T$ is affine on each open half-line. Treating an infinite wait as a discrete jump to $T(0)$ would define a different boundary rule for this discontinuous case. All tables and main classification (8) concern continuous curves.

## 4. M2: fill-driven center

### 4.1 Charge the changing center inside the fill

Define

$$
A(x)=\operatorname{sgn}(x)V(x),\qquad
W(x)=\int_0^x A(z)\,dz.
$$

Then $A'=|T|$, $W$ is even and nonnegative. A fill from $x$ to $y=x+q$, starting at center $F$, has

$$
\Delta F=\lambda[A(y)-A(x)],
$$
$$
\boxed{\text{cost}=Fq+V(y)-V(x)
+\lambda\{W(y)-W(x)-A(x)q\}.}
\tag{10}
$$

Using only the starting center times the order size omits the last term and simulates a different rule. The supplied sim7.ts and sim8.ts contain no M2 implementation, so their source cannot validate the brief's M2 residuals.

### 4.2 Exact identity and the safe cap

Let $ds=|dx|$ along waits. Applying (3), and telescoping the trade primitive $pA(x)-W(x)$, gives

$$
\boxed{
\Pi=-V(x_f)-\lambda W(x_f)
+\int_{\mathrm{waits}}
\big[\lambda pT(x)-\lambda V(x)-|T(x)|\big]\,ds.
}
\tag{11}
$$

Indeed, on trades,
$d[pA-W]=p|T|\,dx$.
On waits, $dp=0$, so
$d[pA-W]=(p|T|-A)dx$.
Use $dx=-\operatorname{sgn}(x)ds$ on waits and $p_f=0$ to obtain (11).

**Theorem 5.** If the actual inventory satisfies $|p|\le C$ throughout every fill and wait, then $\lambda C\le1$ is safe for every admitted $T$, including arbitrary inventory-flat endpoints.

More quantitatively, with
$\mathcal D=\int|T(x)|ds$ and $\mathcal E=\int V(x)ds$,

$$
\boxed{\Pi\le-(1-\lambda C)\mathcal D-\lambda\mathcal E
-V(x_f)-\lambda W(x_f)\le0.}
\tag{12}
$$

**Proof.** Substitute $pT(x)\le C|T(x)|$ into (11). ∎

This is why curvature drops out of the universal safe bound. It does **not** drop out of the attainable profit above the bound. “Cap” must mean a bound on inventory, not on one order, one initial sweep, or one discretization parameter.

There is no real positive residual below this bound in the stated model. A simulated residual there is an implementation or numerical error, or the supposed cap does not bound $P$.

### 4.3 The bound is sharp; preloading defeats the apparent threshold near two

Here is a reusable finite construction. Preload to $p=c=h,x=0$, repeat a cell $N$ times, then close and mirror. For $0\le h<C$, a finite preload is:

- Buy $C$, wait with factor $1-h/C$, then sell $C-h$.
- A cell is $H_1(u,v,d)$, starting at $p=h,x=0$, not at zero inventory.
- Close by selling $2h$, waiting with factor $1/2$, and buying $h$.

Require $h+u\le C$ and $h+d-v\ge-C$. The mirror has the same cap.

Set $D_u=V(u)-V(u-d)$, $D_v=V(v)-V(v-d)$, and

$$
E=W(u)-W(u-d)+W(v)-W(v-d).
$$

The center rises by $\delta F=\lambda(D_u-D_v)$ per cell. Let $\Pi_0$ be the profit of preload plus closure with no cells. Then the **exact complete profit** is

$$
\boxed{\Pi_N=2(\Pi_0+NG),\qquad
G=\lambda[(h+u)D_u-(h+d-v)D_v-E]-D_u-D_v.}
\tag{13}
$$

The term $h\,\delta F$ is realized on the eventual liquidation of the preloaded inventory. Looking only at the cash profit of an isolated cell misses it.

For checking $\Pi_0$, put

$$
D_p=V(C)-V(C-h),\quad D_c=V(2h)-V(h),
$$
$$
E_0=W(C)-W(C-h)+W(2h)-W(h).
$$

Then

$$
\Pi_0=\lambda(CD_p+hD_c-E_0)-D_p-D_c.
\tag{14}
$$

**Theorem 6 (sharpness).** Let $b=\sup\{x\ge0:T(x)=0\}$. If $b<2C$, then every $\lambda C>1$ admits a profitable exact loop obeying $|p|\le C$. If $b\ge2C$, all reachable curve prices are zero, and the mechanism is trivially safe for every $\lambda$.

**Proof sketch with strict margins.** Choose $p_*<C$ sufficiently close to $C$ that $\lambda p_*>1$ and $b<p_*+C$. Choose an active positive $u$ just above $b$, with $u<p_*+C$. Since
$V(u)/T(u)\le u-b$, we can arrange

$$
(\lambda p_*-1)T(u)-\lambda V(u)>0.
$$

Set $h=p_*-u$, so $-C<h<C$. Choose $v>0$ sufficiently small, then $d>0$ sufficiently smaller than $v$. Divide (13)'s $G$ by $d$ and let $d\downarrow0$. The positive-wait term tends to the positive expression above; the negative-wait term can be made arbitrarily small since $T(v),V(v)\to0$. Thus $G>0$ for finite choices. All positions stay inside the cap. A signed version of the preload reaches a negative $h$ if necessary. Sufficiently many cells overcome the finite preload/closure loss, and mirroring resets $F$.

For the degenerate case, $c$ solves $\dot c=(p-c)/\tau$ and is unchanged by fills. Hence $|p|\le C$ implies $|c|\le C$ and $|x|\le2C$. If $T$ vanishes on this interval, every cash flow and center movement vanishes. ∎

A completely rational counterexample uses

$$
T(x)=10x,\ C=16,\ \lambda=5/64,\quad
h=14,\ u=2,\ v=1/8,\ d=1/16,\ N=32768.
$$

Here $\lambda C=5/4$,

$$
\Pi_0=-58625/24,\qquad
G=71065/786432,\qquad
\delta F=375/4096,
$$

and

$$
\boxed{\Pi_N=3110/3.}
$$

Both halves remain within $|p|\le16$. The full loop buys 135228 units, so its profit is only $1555/202842$ bps per unit bought, approximately $0.007666$. It is a true leak, not rounding noise. The search finds a better normalized member of this same family; this simpler member is included in its self-check.

Without an inventory bound, **every $\lambda>0$ is unsafe for every nonzero curve**: choose $C$ with $\lambda C>1$ and $b<2C$, then apply Theorem 6. Alternatively, the exact M2 profit of $H_N$ is

$$
\frac{\lambda d(D_u-D_v)}2N^2+
N\left\{\lambda[(u-d/2)D_u+(v-d/2)D_v-E]-D_u-D_v\right\}.
\tag{15}
$$

Choose $D_u>D_v$ and mirror. The quadratic term proves unbounded profit, and unbounded profit per unit bought, as $N\to\infty$. A sweep starting from zero averages its inventory over the accumulation; preloading and repeated cells explain why a sparse sweep grid can suggest a threshold near $\lambda C=2$ when the sharp bound is one.

## 5. M3: standing position skew

**Theorem 7.** M3 is safe for every admitted $S,T$, on exact loops and from rest with any inventory-flat endpoint.

Let $U(p)=\int_0^pS(z)\,dz$. A fill costs

$$
F_0\,dp+dV(x)+dU(p).
$$

Since waits keep $p$ fixed and both endpoint positions are zero, the entire $U$ contribution cancels. Thus

$$
\boxed{\Pi=-V(x_f)-\sum_kD_k\le0,}
$$

exactly as in M0. The maximum profit is zero. ∎

This theorem integrates $S(P)$ across the fill, as the infinitesimal price rule requires. If an implementation freezes $S$ at the order's starting position, an immediate buy $q$, sell $q$ instead produces the spurious profit $qS(q)$. That is a different execution rule.

## 6. M4: handoff into $P-\Phi$

### 6.1 The sweep bound is necessary, not sufficient

Buy $q>0$, fully decay, then sell $q$. In the complete-decay limit the profit is

$$
qS(q)-2V(q).
$$

For continuous curves, a strict positive value persists with sufficiently long finite waits and a finite residual-state closure. Therefore safety requires

$$
\boxed{qS(q)\le2V(q)\quad(q>0).}
\tag{16}
$$

This probes a single large sweep. A repeated local cycle can violate safety even when every such sweep passes.

### 6.2 Complete global characterization

Define

$$
m_T=\inf_{x>0}\frac{T(x)}x.
$$

**Theorem 8.** M4 is safe for all loops if and only if $S$ is globally Lipschitz with constant at most $m_T$:

$$
\boxed{0\le S(b)-S(a)\le m_T(b-a)\quad(a<b).}
\tag{17}
$$

For locally absolutely continuous $S$, this is equivalent to
$\operatorname*{ess\,sup}S'\le m_T$.
The characterization covers exact loops and from-rest, inventory-flat endpoints.

**Sufficiency.** Write

$$
U(c)=\int_0^cS(z)\,dz,\qquad H(c)=cS(c)-U(c).
$$

Integration by parts of $\int S(c)\,dp$, noting that $c$ changes only during waits, gives

$$
\Pi=-V(x_f)+H(c_f)+
\int_{\mathrm{waits}}[xS'(c)-T(x)]\,dc.
\tag{18}
$$

On an exact loop $c_f=0$. Since $dc$ has the sign of $x$, the integrand contributes
$|x|\{S'(c)-T(x)/x\}|dc|\le0$.
For an arbitrary inventory-flat endpoint, $c_f=-x_f$, and

$$
H(c_f)\le m_Tc_f^2/2\le V(x_f).
$$

Both the boundary term and the wait contribution are nonpositive.

**Necessity.** Start a cell at $p=c=a,x=0$. Choose $d>0$, $u>d$, and perform

$$
\text{buy }u;\quad x:u\to u-d;\quad
\text{sell }2u-d;\quad x:-u\to-u+d;\quad
\text{buy }u-d.
$$

It returns to exactly the same state. Its exact profit is

$$
\boxed{(2u-d)[S(a+d)-S(a)]-2[V(u)-V(u-d)].}
\tag{19}
$$

If some slope of $S$ exceeds $m_T$, choose $u$ with $T(u)/u$ below that slope, and then a sufficiently short interval $[a,a+d]$ on which the secant slope stays above the required value. Indeed,

$$
\frac{2[V(u)-V(u-d)]}{d(2u-d)}
\longrightarrow \frac{T(u)}u.
$$

If the initial Lipschitz violation occurs on a longer interval, partition it into arbitrarily short intervals; one retains a secant slope at least as large as the original average. This also handles nondifferentiable $S$. Thus a finite positive-profit cell exists.

Reach its base inventory $a$ by finitely many trades and partial waits, repeat the cell enough times to pay the finite setup/unwind cost, then close $p=x=0$. The center is fixed throughout. The result is a profitable exact loop; further repetitions make profit unbounded. ∎

The lag mechanism is explicit in (18): $S'$ is sampled at stored inventory $c$, while the price resisting decay is determined by $T(x)/x$ at a separately controllable standing flow. Matching the two functions pointwise, $S=T$, does not match these two arguments.

### 6.3 Consequences and exact counterexamples

Let $L_T=\operatorname*{ess\,sup}T'$, with $+\infty$ allowed. For $S=\rho T$, Theorem 8 gives the sharp condition

$$
\boxed{\rho L_T\le m_T.}
\tag{20}
$$

At $\rho=0$, safety holds even when $L_T=\infty$.

- Linear $T=ax$: $\rho\le1$.
- Two-slope band: $\rho\le\min(a_0,a)/\max(a_0,a)$, for nonzero slopes as applicable. The bands in the brief have thresholds $0.1,0,0.5$.
- Saturation and smooth bounded concave curves: $m_T=0$, so every $\rho>0$ is unsafe.
- Smooth convex $T=x+x^3$: $m_T=1,L_T=\infty$, so every $\rho>0$ is unsafe.
- Smooth concave $T=x+9x/\sqrt{1+x^2}$: $m_T=1,L_T=10$, so $\rho\le0.1$ is safe.
- The continuous flat step with slopes $1,0,2$ at breaks $1,2$: $m_T=1/2,L_T=2$, so $\rho\le1/4$ is safe. A flat segment away from zero does not by itself force $m_T=0$.

In particular, the brief's blanket “unsafe for every curved $T$ at $\rho\ge0.25$” is false. Its band with $a_0=5,a=10$ is safe at both 0.25 and 0.5.

For saturation $a=10,Q_*=1,\rho=1/4$, take the three-trade cell (19) at $a=0,u=5,d=1/2$:

$$
\text{buy }5,\quad r=9/10,\quad
\text{sell }19/2,\quad r=9/10,\quad
\text{buy }9/2.
$$

It ends at $p=x=0$, with fixed $F$, and has exact profit

$$
(19/2)(5/4)-10=\boxed{15/8}.
$$

More generally, for $u>3/2$, the same $d=1/2$ gives profit $5u/2-85/8$, unbounded as $u\to\infty$. For any smaller positive $\rho$, increasing $u$ again suffices.

For the band $B=2,a_0=1,a=10$, with $\rho=1/4$, the unmirrored staircase $H_N(1,1,1/2)$ has

$$
\Pi=(2u-d)S(Nd)-2N[V(u)-V(u-d)]
=9N/8-27/4\quad(N\ge4).
\tag{21}
$$

At $N=8$ this is exactly **$9/4$**, with $\max|p|=4.5$. No center mirror is needed. At arbitrarily large $N$ this family itself has unbounded profit.

**Only a linear curve permits $S=T$ globally.** If $S=T$ satisfies (17), then $T(x)\le m_Tx$ for $x>0$, while the definition of $m_T$ gives the reverse inequality. Thus $T(x)=m_Tx$. This proves the brief's conjecture.

For the alternative in sim8.ts, $S(c)=\rho\,2V(c)/c$, interpreted continuously at zero and oddly on negative $c$, put $J(c)=2V(c)/c$. The exact condition is

$$
\rho\operatorname*{ess\,sup}_{c>0}
\frac{2[cT(c)-V(c)]}{c^2}\le m_T.
\tag{22}
$$

The sweep bound alone holds automatically for $\rho\le1$, but this does not imply (22). For the outward-steepening two-slope bands, the supremum in (22) is the outer slope $a$, so the safe bound remains $a_0/a$. For saturation, $m_T=0$, so this softened skew is still unsafe at every positive $\rho$.

## 7. Design-space map and the broader search

### 7.1 Proved global map

This table uses the continuous curves specified above. M1 and M4 bounds include equality. M2's cap means $|P|\le C$ at every point of the path.

| Curve family | M0 | M1 safe rates | M2 without a cap | M2 with an active curve inside $\lvert\Phi\rvert<2C$ | M3 | M4, $S=\rho T$, safe rates |
|---|---|---|---|---|---|---|
| Linear $ax,\ a>0$ | Safe | $\rho\le1$ | Only $\lambda=0$ | Exactly $\lambda C\le1$ | Safe | $\rho\le1$ |
| Nonlinear two-slope band | Safe | Only $\rho=0$ | Only $\lambda=0$ | Exactly $\lambda C\le1$ | Safe | $\rho\le\min(a_0,a)/\max(a_0,a)$ |
| Saturating, finite $Q_*$ | Safe | Only $\rho=0$ | Only $\lambda=0$ | Exactly $\lambda C\le1$ | Safe | Only $\rho=0$ |
| Four slopes $2,12,1,8$, breaks $1,2,4$ | Safe | Only $\rho=0$ | Only $\lambda=0$ | Exactly $\lambda C\le1$ | Safe | $\rho\le1/6$ |
| Smooth convex $x+x^3$ | Safe | Only $\rho=0$ | Only $\lambda=0$ | Exactly $\lambda C\le1$ | Safe | Only $\rho=0$ |
| Smooth concave $10x/\sqrt{1+x^2}$ | Safe | Only $\rho=0$ | Only $\lambda=0$ | Exactly $\lambda C\le1$ | Safe | Only $\rho=0$ |
| Concave with linear floor $x+9x/\sqrt{1+x^2}$ | Safe | Only $\rho=0$ | Only $\lambda=0$ | Exactly $\lambda C\le1$ | Safe | $\rho\le1/10$ |
| Flat step: slopes $1,0,2$, breaks $1,2$ | Safe | Only $\rho=0$ | Only $\lambda=0$ | Exactly $\lambda C\le1$ | Safe | $\rho\le1/4$ |

For arbitrary $S$, replace the last column by the complete condition $\operatorname{Lip}(S)\le m_T$. Nonlinear safe handoff skews exist; for example any odd nondecreasing nonlinear Lipschitz function with slope bounded by a positive $m_T$. It is the choice $S=T$, not nonlinearity of $S$ by itself, that forces the linear exception.

### 7.2 What is wrong with the old search as evidence of safety?

I ran sim7.ts and reproduced the brief's table. Its weaknesses are structural:

1. **Center tolerance is not exact closure.** It accepts $|F_f-F_0|\le0.05\max(1,|T(q)|)$. For the $a_0=1$ band at $q=16$, this is 7.1 bps. A final wait generally does not restore the center. The accepted set also changes with $\rho$.
2. **Rejecting drifting-center blocks misses exact loops assembled from them.** A profitable inventory-flat block and its mirror have exactly canceling center drift. The old filter examines neither their concatenation nor repeated preloaded cells.
3. **Only one hold time and equal slices.** The grid has 1, 2, 4, or 8 slices; a common hold from 0.25, 1, 3, or 50; and at most one prescribed overshoot. It lacks independent partial waits, hundreds of small replenishments, and arbitrary inventory targets.
4. **The cap is not a global model assumption.** Searching finitely many $q$'s cannot establish safety for unbounded positions or horizons. Even at fixed inventory, profitable cells may require many repetitions to pay setup costs.
5. **Midpoint quadrature does not preserve the potential across partitions.** With the $B=2,a_0=1,a=10$ band, buy 3 units in one order and immediately sell 1 and then 2. The true no-wait profit is zero. The old 200-point midpoint integrator assigns artificial profit exactly $9/80000$, apart from floating-point rounding: the whole buy crosses the kink, while the two sales split at it. The new file checks this discrepancy and uses analytic primitives instead.
6. **Normalization rewards some overshoots invisibly.** sim7.ts and sim8.ts divide by the initial $q$. With an overshoot, total bought is $q(1+\text{over})$. The new tables consistently divide by total bought, including all repeated cells.
7. **Zero was excluded.** A negative maximum over the sampled schedules says less than the known zero-profit instantaneous round trip.

The 50-$\tau$ waits in the old code are also finite, despite comments calling them full waits. That approximation is tiny for continuous curves, but it is unnecessary in an exact construction.

### 7.3 Search specification and checks

Run the complete search with:

    bun adversary.ts --json=/tmp/pump-adversary-results.json

Run only the executable checks with:

    bun adversary.ts --checks-only

The file includes every one of sim7.ts's **3456 schedules at cap 16**, and all **4224 at cap 32** when that cap is selected, then extends each with a finite residual-state closure and a mirror instead of using a center tolerance. It additionally searches:

- Independent signed inventory targets, with 3–32 legs, unequal slices, and separately varying finite wait factors. Twelve seeded starts each receive 350 coordinate mutations, including insertion/deletion of legs.
- The exact staircase family (6), with unequal positive and negative flow intervals and as many replenishments as the cap permits.
- Preloaded repeated cells with up to 32768 repetitions. Their cash flow is summed analytically and every winning schedule is subsequently replayed operation by operation.
- Eleven curves, including four slopes, a flat step, smooth convexity, smooth concavity, and concavity with a linear floor.
- All five mechanisms, with M2's changing center integrated inside fills and M3's position potential integrated across fills.

Every candidate in the main tables satisfies $|P|\le16$. This also implies $|\Phi|\le32$; **the code does not impose $|\Phi|\le16$**. The separately reported cap-32 run uses its stated larger cap. All waits are strictly positive factors, and the constructed endpoint equalities are algebraic, with floating-point residual checks during replay.

The objective is profit divided by total bought, not largest raw profit. The seed is derived deterministically from a fixed seed and each curve/mechanism/rate, so per-curve runs reproduce the complete run. No numerical maximum is claimed to be globally optimal.

Checks cover exact rational witnesses, center/state closure, the corrected loop identity, equality of M0 and M3 cash flows, M2's safe cap, M4's proved safe bounds, and the old quadrature artifact. Search tables are numerical lower bounds on the best attainable normalized profit. A zero is a failure to find a positive candidate under this budget unless a theorem independently proves safety.

### 7.4 Results of the executed search

All **187 curve/rate/mechanism cases** completed and their winners passed replay. The largest relative difference between analytic summation and replayed profit was **1.25 × 10⁻¹¹**. Values below are bps per unit bought, rounded to six decimals. M0 and M3 returned **0.000000 on all eleven curves**, as proved.

**M1 — absorption rate ρ**

| Curve | 0.25 | 0.5 | 0.6 | 0.75 | 0.9 | 1 |
|---|---:|---:|---:|---:|---:|---:|
| linear 10x | 0.000000 | 0.000000 | 0.000000 | 0.000000 | 0.000000 | 0.000000 |
| band 1/10 B2 | 13.980399 | 32.267442 | 39.656686 | 50.740552 | 61.824419 | 70.875000 |
| band 0/10 B2 | 17.500000 | 37.121212 | 45.066860 | 57.005814 | 68.944767 | 78.750000 |
| band 5/10 B2 | 1.186247 | 13.023952 | 18.057167 | 25.679506 | 33.343023 | 39.375000 |
| sat a10 Q1 | 10.027992 | 27.143330 | 34.533645 | 46.032715 | 57.612305 | 65.332031 |
| sat a10 Q3 | 0.921900 | 11.575884 | 17.751527 | 30.312500 | 43.812500 | 52.812500 |
| four slopes | 15.259269 | 35.847633 | 44.082978 | 56.477273 | 68.954545 | 77.272727 |
| flat step | 1.700000 | 5.400000 | 6.917647 | 9.264706 | 11.611765 | 13.176471 |
| smooth convex | 75.669391 | 1428.360957 | 3093.657983 | 7030.355125 | 12111.144725 | 14571.435147 |
| smooth concave | 8.047308 | 24.716327 | 31.383935 | 41.385347 | 51.386758 | 58.054366 |
| concave + x | 5.833163 | 21.154341 | 27.373259 | 36.701635 | 46.030012 | 52.248930 |

**M2 — inventory-scaled rate λC, with C=16**

| Curve | 0.5 | 1 | 1.25 | 2 |
|---|---:|---:|---:|---:|
| linear 10x | 0.000000 | 0.000000 | 0.066686 | 7.601015 |
| band 1/10 B2 | 0.000000 | 0.000000 | 0.397531 | 23.696439 |
| band 0/10 B2 | 0.000000 | 0.000000 | 0.902570 | 25.520833 |
| band 5/10 B2 | 0.000000 | 0.000000 | 0.106666 | 16.542917 |
| sat a10 Q1 | 0.000000 | 0.000000 | 0.061651 | 0.914768 |
| sat a10 Q3 | 0.000000 | 0.000000 | 0.092409 | 1.768347 |
| four slopes | 0.000000 | 0.000000 | 0.224080 | 10.854734 |
| flat step | 0.000000 | 0.000000 | 0.018063 | 3.695282 |
| smooth convex | 0.000000 | 0.000000 | 7.314206 | 2805.955652 |
| smooth concave | 0.000000 | 0.000000 | 0.027947 | 0.463285 |
| concave + x | 0.000000 | 0.000000 | 0.023990 | 0.504692 |

**M4 — S=ρT**

| Curve | 0.1 | 0.25 | 0.5 | 0.75 | 1 |
|---|---:|---:|---:|---:|---:|
| linear 10x | 0.000000 | 0.000000 | 0.000000 | 0.000000 | 0.000000 |
| band 1/10 B2 | 0.000000 | 3.565141 | 10.140845 | 17.033389 | 31.230774 |
| band 0/10 B2 | 2.588028 | 6.470070 | 12.940141 | 19.936462 | 35.080091 |
| band 5/10 B2 | 0.000000 | 0.000000 | 0.000000 | 5.941901 | 16.792987 |
| sat a10 Q1 | 0.395934 | 2.615350 | 7.197422 | 11.261255 | 17.710271 |
| sat a10 Q3 | 0.000000 | 1.904256 | 14.876274 | 26.699125 | 39.638302 |
| four slopes | 0.000000 | 0.871682 | 3.495702 | 6.119723 | 22.455940 |
| flat step | 0.000000 | 0.000000 | 1.088028 | 2.434859 | 4.929767 |
| smooth convex | 167.360961 | 482.866466 | 1200.318659 | 2127.629139 | 2858.322421 |
| smooth concave | 0.140878 | 1.614606 | 5.711617 | 9.827928 | 13.990493 |
| concave + x | 0.000000 | 0.498212 | 3.635804 | 7.846464 | 12.701340 |

The cap-32 band case from sim7.ts was also run, including all **4224** of its original schedules. Its M1 results for ρ = 0.25, 0.5, 0.6, 0.75, 0.9, 1 were respectively **31.809625, 68.219816, 82.800000, 104.711538, 126.623077, 141.230769** bps per unit bought. Reproduce it with:

    bun adversary.ts M1 --cap=32 --curve='band 1/10 B2'


### 7.5 Exact certificates for selected numerical winners

The next table gives exact total profits for several winners in the numerical tables, not rounded normalized scores. Use the preload, repeated cell, closure, and mirror defined in Section 4, always with $C=16,N=32768$.

For M1 the corresponding formula $\Pi=2(\Pi_0+NG)$ uses

$$
\Pi_0=\rho\{C[T(C)-T(C-h)]+h[T(2h)-T(h)]\}-D_p-D_c,
$$
$$
G=\rho[(h+u)A-(h+d-v)B]-D_u-D_v.
$$

Here $A,B,D_u,D_v,D_p,D_c$ are the increments already defined in Sections 3 and 4. For M4 it uses

$$
\Pi_0=(C+h)S(h)-D_p-D_c,\qquad
G=(u+v-d)[S(h+d)-S(h)]-D_u-D_v.
$$

For M1 these follow from (1); for M4, sum its three cell trades and the preload/closure trades. For M2 use (13)–(14).

| Mechanism and curve | Rate | $(h,u,v,d)$ | Exact $\Pi_0$ | Exact $G$ | Exact complete profit |
|---|---:|---|---:|---:|---:|
| M1, saturation $a=10,Q_*=1$ | $\rho=1/4$ | $(15,1,2,7/8)$ | $-300$ | $1365/64$ | **1397160** |
| M1, saturation $a=10,Q_*=3$ | $\rho=1/4$ | $(15,1,4,7/8)$ | $-800$ | $245/64$ | **249280** |
| M1, band $B=2,a_0=5,a=10$ | $\rho=1/4$ | $(12,5/2,1/2,7/16)$ | $-2280$ | $3185/1024$ | **199280** |
| M2, linear $10x$ | $\lambda=5/64$ | $(14,2,1/8,7/64)$ | $-58625/24$ | $10520335/50331648$ | **$6768335/768$** |
| M4, smooth convex $x+x^3$ | $\rho=1/4$ | $(8,8,8,7)$ | $-27792$ | $4347$ | **284829408** |

M0 and M3 instead have exact maximum profit **zero**, with the proofs in Sections 2 and 5. For every unsafe case, repeating an exact positive loop proves that the unconstrained supremum of total profit is **$+\infty$**. A finite search winner therefore cannot be a global maximum.

## 8. Open questions, ranked

The unconstrained classifications requested in the brief are proved above under the stated continuity convention. The remaining questions require adding constraints or changing the model:

1. **Sharp M1 thresholds with a genuine inventory cap.** Equation (8) is global; it does not determine $\rho^*(T;C)$. Preloaded cycles materially improve finite-cap attacks. A useful next theorem would characterize the best center-ratcheting cycle over the reachable $(P,\Phi)$ region.
2. **Sharp capped M4 classification.** Condition (17) is necessary and sufficient without bounds. With an inventory cap, $c$ and $x$ cannot be chosen independently over the whole plane. This can rescue globally unsafe rates. The zero at saturation $Q_*=3,\rho=0.1$ in the finite-cap search must not be presented as a global safety claim.
3. **Optimal extraction rate under explicit budgets.** Once trade count, total bought, elapsed time, or financing costs are specified, “most profitable” becomes a well-posed optimization problem. Current numerical winners are lower bounds, not certified optimizers. Very many repetitions can be required near a sharp threshold.
4. **A spread or fee sufficient to remove each pump.** M1 and uncapped M2 have families with unbounded profit per unit bought, so no fixed finite per-unit fee can fix those unconstrained families. Under position/time limits, the required fee becomes a finite optimization question. M4 requires a separate analysis.
5. **Discontinuous center/curve conventions.** An origin jump combined with “full decay” needs an explicit boundary rule. Finite exponential evolution and a discrete reset to zero are different models. The continuous flat-step curve tested here has no such ambiguity.

The distinction throughout is between an algebraic certificate and a finite search. The former establishes safety or a money pump; the latter supplies concrete attacks and exposes where a proposed certificate is still missing.
