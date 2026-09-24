# Research brief 5: curve shape and sizing for the prediction markets (MNX-131)

The operator must choose the slow (position) curve shape for five prediction markets and size them to a loss budget of about $2.5k expected and $15k worst case per market. Two shapes are on the table: v3 §2.6.5 of UNIFIED_IMPACT_PERMANENCE_PROPOSAL.md makes the slow curve C concave beyond a knee (thinner impact far out, so the book deepens as the position grows); the research recommends the opposite (steeper far out, positive liquidity floor). Linear is today's shape.

Markets (mainnet 2026-09-24, binaries quoted in log-odds x = logit p; spread 100 bps of log-odds; 40 levels per side; grid 0.005; center band 2000 bps; flow e-fold 5 h; pif 0.2):
- ANTHTOP26 binary, fair 0.62, fixed fair source 0.6529 (does not follow news), inventory depth 142 units per 1% log-odds, flow depth 35.5, cap 74,000 units.
- RSENATE26 binary, fair 0.345, follows Polymarket via websocket with slew 3 ticks (3c) per minute, stale after 30 s; inventory depth 141, flow depth 35.25, cap 74,000. A deeper-liquidity proposal (5x: 705 units per 1%, cap 369k) is in RSENATE26-deeper-liquidity-proposal.md in this directory; check its numbers.
- TAKEOFF binary, fair 0.28, fair from a 7-day EMA of its own exchange mark; inventory 165, flow 41.25, cap 91,400.
- PNP27 binary ("P vs NP resolved before 2028"), not yet listed; assume fair 0.03 and today's parameters scaled like TAKEOFF.
- LABREV future, price 196.5, fair from a 7-day EMA of its own mark; inventory 2.5 units per 1% of price, flow 0.625, cap 195 units; jumps in percent of price.

Today's model: reservation coordinate = fair − (P/(100·D_inv) + flow skew), flow skew zero inside the center band and slope 1/(100·D_flow) beyond, flow decaying with 5 h e-fold.

Scenarios the operator named: an informed paced trader (slices small enough that flow ≈ 0 each time), fat-tailed news jumps of 10c, 20c, 50c (10%, 20%, 50% for LABREV), and the election-night jump of RSENATE26 to 0.95.

A reference simulator is in sizing.py (python3). Treat it as a claim, not evidence: re-derive independently.

## Deliverables

1. For each market and each shape (concave with far factor 0.25, linear, steepening with far factor 4, knee 0.2 log-odds; then sensitivity to knee 0.5 and far factors 0.5 / 2), the per-event MM loss for each scenario (both directions), marked at the true post-news value; the worst case (walk to the far edge or the cap, then resolution against the MM); and the depth D0 (units per 1% near fair) and cap that meet $2.5k expected and $15k worst case, with the near-fair liquidity in dollars per 1c (per 1% for LABREV).
2. The expected-loss assumption: state and defend an event-frequency model to resolution (the reference uses 4 × 10c, 1 × 20c, 0.2 × 50c per market), and show how the sizing moves if it doubles or halves.
3. The optimal informed strategy against each shape (paced versus sweep versus sweep-then-refill as the flow decays), and whether any strategy beats the paced walk; the effect of the 7-day mark EMA on markets whose fair follows their own mark (does it recover or deepen losses over days?).
4. RSENATE26: the lag-bounded loss per jump under the Polymarket follow with 3c/min slew, at today, 5x and 10x, with today's two-channel instant curve rather than the pure slow curve; the election-night exposure; whether the cap or the lag binds.
5. A one-paragraph verdict on the shape, and the numbers table the operator can approve.

Write the report to Z-sizing.md. Show formulas; numerical results with the code used.
