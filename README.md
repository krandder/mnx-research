# MNX Research

Static research pages deployed at:

https://mnx-research.vercel.app

## Pages

- `/market-maker` - How the MNX Market Maker Works
- `/simulation-findings` - MNX Simulation Findings
- `/adl-stress-findings` - MNX ADL Stress Findings
- `/adl-testing` - MNX ADL and Liquidation Testing
- `/adl` - ADL Replacement-Capacity Invariants
- `/adl-funding` - MNX Funding-Stall Solvency Invariants
- `/replay` - MNX Replay Findings
- `/market-params` - MNX Launch Parameters — What Should Change
- `/mm-two-mode` - Two-Mode Market Making on MNX
- `/bug-bounty` - MNX Bug Bounty — Decision Sheet
- `/funding` - MNX Funding v2 — Market Definitions
- `/funding-v1` - MNX Funding Proposal (v1, superseded)
- `/engine-egress` - Engine Egress: Quiver/TickSpread vs MNX
- `/contracts` - MNX Contract Research: StarkEx, IDEX/Kuma Ikon, Hyperliquid

## Deploy

This is a static Vercel project. The local Vercel link is stored outside git in
`.vercel/`.

```sh
npx --yes vercel@latest deploy --prod --yes
```
