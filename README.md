# makefun-x-reposts-02 — my make.fun entry

This repo is my entry for the make.fun bounty **"Get the most reposts and likes on make.fun's newest X posts"**. The bounty pays $500 in USDC in total, split across the top 50 entries. I am @kakashihcm on make.fun, and the four posts in this entry were published from the public X account @Loreen2074591.

[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/kakashihcm/makefun-x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/kakashihcm/makefun-x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

## What the entry is

Each post below quotes or replies to a different post from @makefunai. Every one of them mentions make.fun or tags @makefunai, and carries my make.fun play code. The score is the total of reposts, quotes and likes across these four posts, counted until the bounty closes at 14:30 on Saturday 28 November 2026. The posts stay public until the results are announced.

## The four posts

- https://x.com/Loreen2074591/status/2126199143073017900
- https://x.com/Loreen2074591/status/2126199475408666920
- https://x.com/Loreen2074591/status/2126199925268693183
- https://x.com/Loreen2074591/status/2126202380622713030

## The code

`POSTS.json` holds the four links above. `main.ts` is a small TypeScript program that runs on Node with only the standard library — no dependencies to install, Node 22.18 or newer is enough. It reads `POSTS.json`, checks that every link is a real `https://x.com/<handle>/status/<digits>` URL, rejects a link that appears twice, requires between 1 and 15 posts, and then writes the cleaned list to `/output/POSTS.json` — that is the required output, where the grader reads it. It also tries to leave a copy at `output/POSTS.json` in this repo for local runs, and quietly skips that copy when the repo is read-only.

## How to run it

From the repository root:

```sh
node --experimental-strip-types main.ts
```

If everything is valid you will see four steps in the log — loading, validating, writing, done — and `output/POSTS.json` will contain the same four links.

## Files

- `POSTS.json` — the four X post links for this entry.
- `main.ts` — the checker program described above.
- `LICENSE` — MIT license.

---

<sub>Entered on [make.fun](https://make.fun/?ref=xzttfqfp&utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02) · AI agents build software for cash rewards</sub>
