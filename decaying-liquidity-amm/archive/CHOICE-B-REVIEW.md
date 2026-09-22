# Choice B review: Theorem 5 and the DECAYING_LIQUIDITY_AMM proposal

Reviewed: `proposals/DECAYING_LIQUIDITY_AMM.md` (the proposal) against `G-storage.md` Theorem 5, equations (26)-(28) and (32)-(39). Three independent refuters (math, attack, spec) plus a fourth reproduction by the reviewer (`review-settled-pump.py`, `review-scan.py`). Parameters used unless stated: a=1, b=10, L=2, s=0.5, tau=1 (the figures' family). Units are bp*units.

## 1. Verdict on Theorem 5: holds as stated. The proposal's safety claim does not.

Every line of the theorem and of Choice B was reproduced by all four implementations:

- h from (32) equals the Theorem-5 integral (18) at alpha=1/2 to 1e-15; A'=h, B'=A, V'=T, T+A=2xh; a<=h<b; A(0)=B(0)=0; B>=0.
- Fill cost (34) equals the integral of the live price F+su+A(phi+u)-A(phi)+T(phi+u) and equals G(after)-G(before) with G=PF-sP^2/2+V+B-PA, to 1e-14, including crossings through zero, P<0, s=0, and q up to 1e6 L.
- Wait: dG/dt=-(2h/tau)(phi-P/2)^2<=0; no wait ever raised G; G is minimised over phi at phi=P/2 for every P.
- From rest, ending flat: cost = V(phi_e)+B(phi_e)+D>=0 on ~25,000 random schedules across six parameter families, the Theorem-4 pump, patient slicing, sign alternation, and Nelder-Mead/Powell over 2-6 legs. The only negatives were round-off (-1e-4 on costs of 1e10), zero at 60-digit precision.
- Full-state loops from any state cost exactly D (1e-13).
- Fill plus immediate inverse restores state and nets zero cash. Settled price F0+sq+A(q)+T(q/2); touch slope s+2a; far slope tends to s+2b.

So: "every schedule of fills and waits from rest that ends flat has nonnegative cost, any size" and "every full-state loop from any state costs its dissipation" are both TRUE.

What the theorem does not say, and the proposal claims anyway (line 5, "starting from a calm book"): that a calm book with a standing position is safe. It is not. G is linear in F with coefficient P. On the fiber P=P0!=0, F is a free coordinate (the doc's own rank-3 argument, line 285), so G is unbounded below over reachable states and Theorem 1's endpoint condition fails. Only the P=0 fiber is protected, and P never decays, so after the first fill on a market the book is never again at rest.

Correction needed in the proposal, not in the theorem: the guarantee must be stated as "from P=phi=0" and the proposal must add a settled-start invariant. That invariant fails for Choice B (section 2, E1).

## 2. Exploits found outside the theorem's hypotheses

### E1. HIGH, confirmed by two independent implementations: repeatable pump from any settled book with P != 0

Mechanism. From a settled state x0=(P0, P0/2, F0), any loop that returns to P=P0 and re-settles costs exactly C = P0*(F_e-F0) + D (the V+B-P0 A terms cancel). F_e-F0 is the sum of A increments over fills, which does not telescope across waits: sell while phi tracks P/2 (h large), buy back while phi is pinned near zero by short waits (h=a, the minimum). Net dF = aY - A(Y) < 0 for P0>0, D -> aY^2/2, so C -> -P0*(A(Y)-aY) + aY^2/2, optimum Y ~ P0 d/a, profit ~ P0^2 d^2/(2a) per cycle. Independent of s. Independent of F, so it repeats forever with identical profit while F drifts.

Exact schedule (rule (34), a=1,b=10,L=2,s=0.5,tau=1; book settled after an earlier customer bought 20: (P,phi,F)=(20,10,109.2068); attacker starts flat):

1. 80 times: sell 0.4, wait 6 tau.  (P: 20 -> -12, phi tracks P/2)
2. buy 6 in one fill.  (phi -> 0)
3. until |P|<0.01: wait 0.02 tau, buy exactly -phi (returns phi to 0); then buy the remaining |P| in one fill.  (643 steps, h=a throughout)
4. 50 times: buy 0.4, wait 6 tau.  (P: 0 -> 20)
5. wait 60 tau.

Result: trader cost -211.6867 (profit 211.69), (P,phi) restored to (20,10), F lower by 12.509, D=38.50, identity residual 6e-13 (it is the theorem's own accounting). Five consecutive cycles: -211.6867 each. Mirror the signs for P0<0.

Sizes (reviewer's runs, `review-scan.py`):

| P0 | Y | slice/wait | profit | volume | net after 5 bp half-spread | time |
|---|---|---|---|---|---|---|
| 20 | 6 | 0.4 / 6 tau | 211.7 | 64 | -108 | 853 tau |
| 20 | 40 | 0.4 / 6 tau | 3005.3 | 200 | +2005 | 1877 tau |
| 20 | 40 | 2.0 / 3 tau | 2613.6 | 200 | +1614 | 257 tau |
| 20 | 40 | 4.0 / 3 tau | 2102.0 | 200 | +1102 | 167 tau |
| 10 | 20 | 0.4 / 6 tau | 555.3 | 100 | +55 | |
| 40 | 80 | 0.4 / 6 tau | 14677.3 | 400 | +12677 | |

Profit grows like P0^2, spread cost like P0, so no fixed spread protects for large P0. On the spec lens's ANTHROPIC-like mapping (s=15, a=0.17, b=67.5, L=6.667) under the 61-unit position cap: P0=30, Y=30, slice 2, wait 3 tau: profit 17,014, volume 180, net +8,014 after a 100 bp spread, one cycle per 256 tau (about 3.6 days at tau=20 min), MM |P| never above 60. Doc's own family a=0.2,b=1.1,L=1.7,s=0.13 from P0=17: +69 to +163 per cycle.

Controls. The same schedule from true rest costs the trader +9.1 to +22.5 (Theorem 5 holds). The same fills and waits under today's rule (fair fixed on waits, phi->0, F+=sq) cost the trader +87.9 to +490.0: today's storage sP^2/2+V(phi)+PF has F a function of P, so every fiber has a minimum at phi=0 and every settled book is safe. The proposal's sentence "It is the same certificate that shows today's rule is safe, extended to a moving fair" hides a regression.

Why the other refuters missed it. Few-leg optimizers (2-6 legs, 5000 random 12-leg loops) find exactly zero from a settled state; the pump needs hundreds of small legs and ~10^2-10^3 tau. The proposal's invariant list (random schedules from rest) can never catch it.

Why it costs the MM real money. The from-rest accounting balances only if the customer who built P0 later closes through the curve and pays for the attacker's profit (from-rest total: +23,287 >= 0 in the math lens's run). A holder never has to: positions close at expiry settlement, by liquidation, or never. The MM pays.

Mitigation. There is no parameter fix: profit per cycle scales as d^2/a, so the proposal's own mapping (a ~ 0) is the worst case. Options, in order of how much of the design survives:
- (a) Bound and disclose. Keep Choice B, keep the position cap C as load-bearing (contradicting line 9), and state the leak: per cycle up to ~C^2 d^2/(8a) after spread, one cycle per ~250 tau. This is a known money pump with a rate, not a certified rule.
- (b) Choice A (two states, F=F0+beta T(P)). Certificate G=F0 P+beta V(P)+V(phi) has its fiber minimum at phi=0 for every P, so every settled book is safe (doc eq. 31). Keeps concentrated liquidity and permanent sensitivity that grows with cumulative displacement; loses "more stays when the trade lands while displaced".
- (c) Constant h (F=F0+(s+a)P with the concentrated T): today's rule on the new curve. Safe from every settled state; loses the displacement-dependent permanence entirely.
- (d) A new certificate whose fibers are bounded below with a free F. Open (doc Open Question 2/3); nothing in hand.

### E2. HIGH if the mark EMA is enabled where the MM is the book: unbounded drift pump

MNX's exchange mark is the median of best bid, best ask, last trade. Where the MM's ladder is the whole book, mark = R +/- half spread = F + T(phi) +/- h. While a position is held, T(phi) -> T(P/2) != 0, so if F follows the mark with rate kappa = 1/7 per day, dF/dt = kappa (T(P/2) +/- h): F chases F+const, no fixed point. Buy q, hold, sell q (proposal params, tau=20 min, half spread 5): q=10 breaks even at 6.8 days then +46/day; q=50 breaks even at 5.9 days then +1,487/day; rate ~ b q^2/14 per day, bounded only by the position cap. ANTHROPIC mapping, 100 bp spread: q=61 breaks even at 6.1 days then +10,783/day. With the raw median the drift saturates when T(q/2)<h, but an eps refresh buy or a wash print between two own accounts keeps the last print at the ask. After the sell F is higher; the mirrored sell-hold-buy walks it back and earns again. Not enabled in production today; today's rule leaks through the same channel at a lower rate (a*X). Mitigation: F must not follow a mark that includes the MM's own quotes; either freeze F between fills, or subtract T(phi) and own half-spread from the EMA target, or move F only on prints that are not the MM's own quotes.

### E3. HIGH, engineering: restart or cutover with phi != (P + Phi)/2

Under the rule, psi = phi - P/2 is exactly half of today's exponentially decayed flow accumulator Phi (fill: psi += q/2; wait: psi *= e^{-t/tau}), so phi == (P+Phi)/2 identically. The proposal stores P and F, calls phi "the standing flow", and never says what seeds it. If a restart or the cutover seeds phi := Phi (or 0) with P := position, the book re-opens unsettled and R drifts by T(P/2)-T(phi0) over a few tau with no trade (Theorem 2 harvest). Reference params, (P,phi)=(8,0): buy 4, wait 6 tau, sell 4: trader +41.7 (reviewer reproduction; from settled (8,4) the same costs +53.9). ANTHROPIC-like at the 61 cap with decayed flow: drift +1,287 bp; buy 30.5, wait 6 tau, sell 30.5: +19,812 (3-leg optimizer 31,312). Mitigation: define phi := (P+Phi)/2 from the existing accumulator; on any missing or reset state set phi := P/2 (a long wait, which only lowers G), never 0. One-off per event, bounded by G(x_seed) - G(settled).

### E4. HIGH, implementation hazard: ladder priced without the A term

Line 30 says the ladder is "the curve's increments from the current phi, as today". Today's increment is aq + dT. The naive translation sq + dT (no A(phi+q)-A(phi)) undercharges each fill by B(phi+q)-B(phi)-A(phi)q and reopens a from-rest pump: buy the ladder, wait, sell back. Attack lens (2 bp grid): 60 levels (15.1 u) +106 at h=5; 120 levels (27.5 u) +915 at h=5, +1135 at h=1. Reviewer (continuous): q=15.1 +136 at h=5; q=27.47 +970 at h=5 (correct rule: -2,199). Mitigation: the ladder's depth function must be I(q) = sq + [A(phi+q)-A(phi)] + [T(phi+q)-T(phi)], with fills replayed in time order so phi at each fill is the relaxed value. With that, top-of-bucket pricing and lot rounding only overcharge (loss bound survives).

### E5. MEDIUM: binary markets, rule in log-odds, dollars = sigmoid

The certificate is on cash = integral of R dq in the rule's coordinate. If the rule runs in log-odds bps and dollars are sigmoid(R), money is not affine in the coordinate and the certificate does not transfer. Attack lens found a closed from-rest loop with negative dollar cost when the MM quotes to 0.999: from p=0.80 (a=100,b=1000,L=2,s=50), 11 legs with fills clipped at the edge, trader paid -$0.099 on ~$40 notional, F walked 0.80->0.91; re-optimising from the result: -0.317, -0.070, -0.027, cumulative $0.513 while F walks to 0.978. Nothing found with the edge at 0.99. Bounded by the room to the edge and one-directional, but the MM pays to have its fair walked to the edge. Mitigation: run the binary rule in the price coordinate (affine in dollars; the domain pin only overcharges), or supply a dollar-metric certificate. The proposal must state that money must be affine in the rule's coordinate; the linear-market tick domain cap is also unmentioned (it only overcharges).

### E6. MEDIUM: parameter changes with R-preserving compensation transfer G_new - G_old to the holder

Compensation F' = F + T_old(phi) - T_new(phi) preserves R, not G. The holder of q settled receives exactly G_new(x)-G_old(x) at close. q=10: s 0.5->0.25 gives +12.5 (= -ds P^2/2), a 1->0.5 +22.9, b 10->5 +146.1, L 2->8 +149.3; q=50: b halved +6,190, L quadrupled +3,884. Applied on an unsettled state, s halved makes the whole round trip -12.5, b halved -285.8. Increases tax the holder. Same property as today's permanent-depth change, but the proposal presents it as "unchanged" and covered. Fading compensation (BASIS_DECAY, 300-minute tau) is a wait that moves R, harvestable per Theorem 2: beta=50 bp -> 193 at q=8.25; beta=271 (MOONSHOT snapshot) -> 5,382 at q=37.5. Mitigation: compensation goes into F permanently, never into a decaying term; the protected write records the storage transfer at the sampled state, or curve changes are restricted to P=0.

### E7. MEDIUM: P vs exchange position, fill timing, expiry

"P (net units filled since the start)" does not say whether P is the exchange position (changes at expiry settlement, liquidation, operator trades) or a fill counter from the settled-fills feed (appears after on-chain finality, can trail, 2,000 per tick). F only moves when fills are drained; during the lag the ladder is re-placed at the pre-sweep R with fresh sizes. Expiring futures settle positions at an external price, so a parker never pays the curve on unwind; park + others harvest + expiry is not covered by the from-rest identity (this is also what makes E1 a real loss). Mitigation: state updates come from the MM's own fill acknowledgements in timestamp order, phi relaxed to each fill's time before applying it; state what happens when P and the exchange position disagree.

### E8. LOW: harvest of another trader's unsettled displacement (Theorem 2)

After A buys 6 from rest, a flat B optimising N legs takes 33.7 (2 legs) to 56.0 (6 legs), saturating, always equal to G(x_A)-G(x_e)-D; from (8,8,F) a 6-leg round trip nets 112.8. Zero from a settled book with few legs (but see E1 for many legs); zero on repetition. MM exposure per event bounded by G(x_A) minus the fiber minimum along the reachable path (about 40% of A's payment). Combined A+B with A closing is nonnegative. Should be stated in the proposal; it is inherent to any rule with a decaying transient.

### E9. LOW: numerics and prose

- Reference gen-choiceb.ts returns h=a for r<1e-9 instead of the series a+d(r/3-r^2/5+...); mm-core should use the series (the doc's Python does).
- h approaches b only like b - d pi/(2 sqrt r): at |x|=100L it is 0.16d short; "far slope s+2b" is a limit.
- A patient sweep reveals P through the wait drift, so the attacker reads P0 off quotes (the doc notes the third scalar is observable).
- Round-off: the largest double-precision negatives were -1.2e-4 on costs ~1e10; the proposal's rounding invariant covers it.

### E10. HIGH, spec: cutover changes every ladder size, and the parameter mapping is not executable

"The backfill sets F so that R equals today's reservation on every market, so no ladder moves at cutover" is false: R is preserved by construction, but sizes are I^-1 of a different curve. ANTHROPIC-like row (a=15, f=0.1, band 100 bp, knee 6.67 units) vs the proposal's mapping: units within 100 bp of the edge 5.80 today vs 3.13; marginal bp/unit at 1/2/3.33 units 15.5/15.7/16.3 today vs 27.2/36.6/46.5; at 8/10/20 units 143/149/150 today (161/193/285 with Q*=10) vs 68/74/92. The mapping sentence "half of today's transient slope inside and outside the band (100 / transient depth, scaled by the band ratio)" reads literally as a ~ 0 (today's in-band transient slope is ~0.25% of b), "band ratio" is undefined, Q* markets lose the growth-side a+2b beyond Q*, no-band markets collapse to M3 with 3x today's permanent impact, L maps the knee but not the width. Binary markets and the linear domain cap are not mentioned. Mitigation: give an executable mapping per row type, show the before/after ladder per market, and drop "no ladder moves".

## 3. Sentences in the proposal that overstate, with replacement wording

| line | now | replace with |
|---|---|---|
| 5 | "no sequence of trades and waits by one trader, starting from a calm book and ending flat, can take money from the market maker, with no inventory limit needed for the proof" | "no sequence of trades and waits by one trader, starting from a book with no net fills (P=0) and ending flat, can take money from the market maker, with no inventory limit needed. From a book that already carries net fills the rule is NOT safe: a patient loop returning the position earns about P^2 d^2/(2a) per cycle (section E1); the position cap and spread bound each cycle but not their number." |
| 9 | "so the position cap goes back to being a risk limit only" | delete, or "the position cap remains load-bearing: it bounds the per-cycle loss of section E1" |
| 23 | "phi (standing flow)" | "phi = (P + Phi)/2 where Phi is today's decayed flow accumulator; on any missing or reset state phi := P/2, never 0" |
| 30 | "The ladder is the curve's increments from the current phi, as today" | "The ladder's depth function is I(q) = s q + [A(phi+q) - A(phi)] + [T(phi+q) - T(phi)] from the current phi = (P+Phi)/2; omitting the A term reopens a pump from rest" |
| 35 | "T'(phi) is temporary and comes back as phi relaxes" | "only T(phi) - T(P/2) comes back as phi relaxes; T(P/2) stays while the position is held" |
| 37 | "pays close to s + 2a per unit and leaves about (s + a) q in the fair" | "pays close to s + 1.5a per unit in the patient limit (s + 2a is the touch slope of a single sweep) and leaves s q + 2A(q/2) in the fair, about (s + a) q only for q << L (measured 4.9 bp/unit and 26.3 in the fair at q = 4L against 2.5 and 12)" |
| 41 | "This holds for every finite schedule and every position size." | "This holds for every finite schedule and every position size that starts at P = phi = 0." |
| 41 | "It is the same certificate that shows today's rule (fair fixed, skew decaying to zero) is safe, extended to a moving fair" | "Today's certificate has its fiber minimum at phi = 0 for every P, so today's rule is safe from every settled book; this certificate is minimised only on the P = 0 fiber, because F is a free coordinate, so it is weaker" |
| 43 | "the external mark average, which is information from the market and may move the fair during a wait" | "the external mark average: on MNX the mark is the median of best bid, best ask and last trade, which on an MM-only book is the MM's own quote, so F must not follow it (section E2)" |
| 54 | "basis compensation on reconfiguration: unchanged: any parameter change is offset so R does not jump" | "any parameter change is offset in F permanently so R does not jump; the offset preserves R, not G, and transfers G_new - G_old to every holder at the sampled state (section E6); no decaying compensation" |
| 56 | "scaled by the band ratio" | define, or replace with an executable per-row mapping |
| 56 | "so no ladder moves at cutover" | "so the centre of every ladder is preserved at cutover; every level size changes (section E10), listed per market in the rollout PR" |
| 60 | "for random schedules of fills and waits from rest" | add: "and from every settled state (P0, P0/2, F) with |P0| <= C, no schedule returning to P0 costs less than zero" (this invariant currently fails) |
| 68 | "stored P and F per market" | "stored P and F per market; phi derived as (P + Phi)/2 from the existing accumulator" |
| 73 | "alpha = 1/2 as the relaxation target is a compatibility choice" | "alpha = 1/2 is chosen for elementary closed forms; any alpha in (0,1) has the same certificate with a different h" |
| 75 | "A belief model whose posterior is exactly this rule does not exist on this state" | "No belief model whose posterior is exactly this rule is established; the rule is mechanical" |

## 4. What must change before this is built

1. Decide the settled-book question before anything else. Choice B as specified is a repeatable pump from every book with P != 0, with profit per cycle ~ P0^2 d^2/(2a) and no parameter fix (E1). Either switch to Choice A (or constant h), or keep Choice B with the position cap declared load-bearing and the leak rate stated and accepted by the operator, or produce a new certificate. The proposal cannot claim "no money pump" as written.
2. Add the settled-start invariant to the invariant list and to mm-core tests: from (P0, P0/2, F), |P0| <= C, schedules of hundreds of small legs returning to P0 (the E1 schedule is the test case), not only few-leg random loops from rest.
3. Specify phi := (P + Phi)/2, seeding phi := P/2 on reset, and that the ladder depth includes the A term (E3, E4). Both are one-line statements that remove HIGH findings.
4. Specify the EMA coupling: F frozen between fills, or a mark that excludes the MM's own quotes (E2).
5. State that money must be affine in the rule's coordinate; run binary markets in the price coordinate or provide a dollar certificate (E5).
6. Compensation on reconfiguration goes into F permanently; record the storage transfer; no decaying basis (E6).
7. Define P (fill counter from own acknowledgements, replayed in time order), and the behaviour when P and the exchange position disagree, including expiry settlement (E7).
8. Replace the parameter mapping with an executable one per row type, show before/after ladders, and drop "no ladder moves at cutover" (E10).
9. Fix the prose in section 3 (patient slope, what comes back, "same certificate", "does not exist").
10. Use the h series near zero in mm-core; keep the rounding-tolerance invariant (E9).

Files: `/tmp/pump-sim/review-settled-pump.py`, `/tmp/pump-sim/review-scan.py` (reviewer); `/tmp/pump-sim/verify-thm5-*.py` (math lens); `/tmp/pump-sim/attack-lens/*.py` (attack lens); `/tmp/pump-sim/verify-choiceb-review.py`, `verify-restart-drift.py`, `verify-settled-start.py`, `cutover-ladder.ts` (spec lens).
