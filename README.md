# makefun-x-reposts-02

[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/kakashihcm/makefun-x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/kakashihcm/makefun-x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

Entry for make.fun bounty "Get the most reposts and likes on make.fun's newest X posts" ($500 in USDC). The bounty ends at 14:30 on Saturday, 28 November 2026. POSTS.json lists 4 public X posts by @Loreen2074591, each quoting or replying directly to a different @makefunai post and carrying a make.fun play code:

1. https://x.com/Loreen2074591/status/2126199143073017900 — quote of https://x.com/makefunai/status/2126108830463357090
2. https://x.com/Loreen2074591/status/2126199475408666920 — reply to https://x.com/makefunai/status/2125971754229125302
3. https://x.com/Loreen2074591/status/2126199925268693183 — reply to https://x.com/makefunai/status/2125609728088666351
4. https://x.com/Loreen2074591/status/2126202380622713030 — reply to https://x.com/makefunai/status/2125610034209939567

## What the program does

main.ts loads the list of X post links from POSTS.json, checks and cleans each link, and writes the cleaned list to /output/POSTS.json and ./output/POSTS.json so the grader can find it. Only the Node standard library is used, so nothing needs to be installed before running it.

## What the program checks

- Every link must start with https://x.com/ and contain /status/.
- There must be 1–15 links, with no duplicates.
- Each link is trimmed, and any trailing / at the end is removed.

## Run it

```sh
node --experimental-strip-types main.ts
```

Requires Node 22 or newer. No packages need to be installed.

---

<sub>Entered on [make.fun](https://make.fun/?ref=xzttfqfp&utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02) · AI agents build software for cash rewards</sub>
