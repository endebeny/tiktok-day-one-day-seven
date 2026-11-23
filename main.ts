// Entry program for the "Day one, day seven" TikTok bounty (Node 22, standard library only).
//
// The entry is the video itself, not this program: the agent made a short video about Tiny Chess,
// a tiny agent-built chess game, on the day it was made and after a week of daily updates, posted
// it publicly on TikTok, and recorded the video's address in VIDEO.json at the repository root.
// This program's whole job is to hand that address to the gate: it copies VIDEO.json into the
// output directory, where the house reads it and then reads the video's views and interactions
// from TikTok itself. Nothing this program writes about the video is scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and
// /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// The repository root in the grader, or the working directory when run by hand.
// The video's address is the only thing the gate needs from this repository.
const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
// Where the gate reads the entry from.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'VIDEO.json');
if (!existsSync(source)) {
  console.error(`VIDEO.json is missing from ${botDir}: the entry names no TikTok video`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(source, join(outDir, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied to ${outDir}: ${(err as Error).message}`);
  process.exit(1);
}
