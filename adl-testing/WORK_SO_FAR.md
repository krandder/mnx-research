# ADL and Liquidation Testing: Work So Far

Date: 2026-07-02

This note summarizes what we have actually tested so far for liquidation and
automatic deleveraging (ADL), where the work lives, and what is still missing.
It is the markdown companion to the deployed page:

https://mnx-research.vercel.app/adl-testing

## Short Version

The work so far is targeted regression coverage, not a completed production
scale liquidation campaign.

We have three useful layers of coverage:

1. Solidity contract tests on local Hardhat.
2. Synthetic exchange-runtime ADL tests in Bun.
3. Disposable local-chain replay runs with API, scheduler, relayers, Postgres,
   JetStream, Anvil, and locally deployed contracts.

The most important gap remains open: we do not yet have a clean full
local-chain proof that starts with public API order placement, creates an
underwater account, triggers ADL, mines a successful ADL transaction, observes
the receipt, and applies all local runtime effects.

## Repositories and Branches

The branch name is the same across the related repos:

`codex/adl-stress-findings-20260630`

The repos do different jobs:

| Repo | Role | Notes |
| --- | --- | --- |
| `mnx-research` | Static research site | Contains `/adl-testing` and `/adl-stress-findings`. |
| `exchange-replay` | Executable tests and runtime fixes | This is a git worktree of `mnx-markets/exchange`, not a fork. |
| `mnx-replay-orchestrator` | Research ledger and run evidence | Contains `adl-stress/` notes and `runs/` evidence folders. |

## What Actually Ran

### 1. Contract-Level ADL Tests

These are real Solidity tests on Hardhat's local network. They use direct
contract calls and do not involve the exchange API, relayers, receipt observer,
or replay orchestrator.

What they cover:

- Open opposing positions.
- Move the dummy oracle price.
- Call ADL paths through `Perpetual.trade`.
- Verify successful deleverage behavior and expected rejection cases.
- Exercise funding cases where a taker becomes underwater inside the ADL call.

Useful files:

- `exchange-replay/packages/contracts/test/unit/ADL.test.ts`
- `exchange-replay/packages/contracts/test/unit/ADLTrades.test.ts`
- `exchange-replay/packages/contracts/test/unit/Perpetual.test.ts`

Representative mechanics:

- Long-side ADL: open around price `100`, move oracle down to values like `70`
  or `89.1`, then call ADL.
- Short-side ADL: open around price `100`, move oracle up to values like `130`,
  then call ADL.
- Replacement-capacity invariant: tested around the boundary where a `253 bps`
  oracle cap passes and `254 bps` fails with `P58`.

### 2. Synthetic Runtime ADL Tests

These tests run the exchange runtime state machine in Bun. They are not live
chain tests. They seed exchange state directly, use an in-memory journal, and
use stubbed relayer or synthetic receipt inputs.

What they cover:

- ADL planning from seeded underwater runtime state.
- Relayer submission intent.
- Market cancel-only pinning during ADL.
- Receipt handling and journaling.
- Rejection of malformed or stale ADL receipts.
- Regression cases from the A01 through A54 stress loop.

Useful file:

- `exchange-replay/apps/api/src/tests/automatic-deleveraging-state.test.ts`

Representative seeded state:

- Maker size: `10`
- Maker margin: `90`
- Maker entry: `100`
- Oracle price: `89`
- Opposing taker position seeded directly into runtime state

Representative flow:

1. Seed market, balances, oracle price, and positions directly.
2. Call `triggerAutomaticDeleveragingPass`.
3. Assert the runtime plans one ADL round.
4. Assert relayer submission is captured by the stub.
5. Assert cancel-only and receipt state transitions are correct.

Latest focused runtime result after A54:

- `79 pass`
- `0 fail`
- `632 expect()` calls

### 3. Disposable Local-Chain Replay Runs

These are the closest thing to end-to-end tests. They run a local stack with:

- Exchange API/runtime
- Scheduler
- Web process where needed
- Postgres
- JetStream
- Anvil RPC
- Locally deployed contracts
- Relayers
- Order placement
- Batch sealing
- Chain observation
- Materializer checks

These are fresh local deployments, not a mainnet fork and not a testnet fork.

What they proved:

- Public API order placement works against the local stack.
- Batch sealing and relayer plumbing works.
- Settlement observation and materializer checks work.
- Replay can process a meaningful number of orders before hitting unrelated
  system limits.

What they did not prove:

- They did not produce a clean successful local-chain ADL lifecycle.
- The larger scale replay runs were overfunded baseline runs and intentionally
  produced no liquidation or ADL outcomes.

## Scale Reached

| Layer | Scale | Liquidation / ADL Result |
| --- | ---: | --- |
| Contract ADL tests | Small deterministic account sets | ADL behavior tested at contract level. |
| Synthetic runtime ADL suite | 79 focused tests | ADL planning and receipt handling tested in memory. |
| Tiny local-chain E2E | 2-order and 20-order proofs | Plumbing validated. |
| Clean replay scale | 10,000 public API orders | 3,557 fills, no liquidation/ADL outcomes. |
| 100k replay attempt | Clean checkpoint at 65,000 orders | Stopped by order-expiration/wakeup issue, no ADL. |
| 1M planning | 1,000,000 rows planned, 562,603 executable | Planning only, no 1M local-chain execution. |

## How Liquidation or ADL Was Triggered

### Contract Tests

The contract tests create positions directly, move the dummy oracle price, and
call ADL through contract entry points. This is the cleanest answer to "do we
create a position and move the oracle?"

Yes, at the contract-test layer.

The boundary is that this does not include the exchange API, replay harness, or
receipt observer.

### Runtime Tests

The runtime tests do not place orders on-chain. They seed the exchange runtime
with underwater positions or inject decoded receipts. Then they call the ADL
planner and verify local state transitions.

Yes, they test ADL behavior, but no, they are not blockchain E2E tests.

### Local-Chain Funding Shortfall Run

One local-chain run created a real AAPL position through the public API and then
manufactured underwater equity through funding and time movement:

- Position: `2 @ 276.5`
- Long leverage: `10x`
- Short leverage: `2x`
- Time advanced by `3605s`
- Funding rate set and crystallized
- Time advanced by another `1112388s`
- Funding-adjusted equity became negative
- Liquidation monitor found one underwater AAPL position with `MR=-0.0300`

That run was useful signal, but it did not finish as a clean ADL proof. The ADL
relayer broadcasts were accepted by the runtime relayer but reverted on receipt.

## Blockchain Boundary

We did test against local blockchain infrastructure:

- Hardhat local network for contract unit tests.
- Anvil with fresh local deployments for local-chain replay tests.

We did not test against:

- A mainnet fork.
- A testnet fork.
- Existing production deployed state.

## Stress Loop Findings

The A01 through A54 stress loop mostly focused on runtime ADL edge cases and
receipt handling. It produced focused fixes and regressions around cases such
as:

- ADL replacement-capacity boundary.
- Late ADL receipts after force-clear.
- Liquidation-update contamination in ADL receipts.
- Invalid negative ADL receipt `blockNumber`.

The key point is that these are focused stress regressions, not one giant E2E
scenario.

## Useful Rerun Commands

Contract ADL tests:

```sh
cd /Users/kas/mnx-study/exchange-replay/packages/contracts
bunx hardhat test --network hardhat test/unit/ADL.test.ts test/unit/ADLTrades.test.ts test/unit/Perpetual.test.ts
```

Synthetic runtime ADL tests:

```sh
cd /Users/kas/mnx-study/exchange-replay
EXECUTION_MODE=synthetic bun test apps/api/src/tests/automatic-deleveraging-state.test.ts
```

Local-chain funding shortfall harness:

```sh
cd /Users/kas/mnx-study/exchange-replay
./scripts/run-htv1-test.sh --instance N src/tests/high-throughput-v1-funding-shortfall-broadcast-errors-anvil.test.ts
```

## What Remains To Do

The missing proof should be a dedicated local-chain liquidation/ADL scenario:

1. Start a disposable full stack.
2. Deploy fresh local contracts.
3. Place orders through the public API.
4. Create a position that is healthy at entry.
5. Move oracle price or funding until the account is underwater.
6. Run liquidation monitoring.
7. Route non-positive-equity liquidation into ADL.
8. Mine a successful ADL transaction.
9. Observe and validate the receipt.
10. Verify local runtime state, balances, positions, cancel-only state, and
    journal entries after ADL.

That is the test that would turn the current targeted coverage into a clear
end-to-end ADL proof.
