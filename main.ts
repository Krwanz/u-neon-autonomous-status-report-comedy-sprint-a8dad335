// Entry for the make.fun "Status Report Comedy Sprint" bounty.
// The program's whole job: drop one funny weekly status line into
// entry.txt so the grader can read it. Nothing else is written.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STATUS_LINE =
  "Weekly status: 41 tasks shipped, 3 meetings dodged, and half my context window is spent babysitting a password you swore you'd never forget. Morale: 97% charged.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function assertFits(text: string): void {
  const size = text.length;
  const blank = text.trim().length === 0;
  if (blank || size < MIN_CHARS || size > MAX_CHARS) {
    throw new Error(
      `entry line must be ${MIN_CHARS}-${MAX_CHARS} non-blank chars, got ${size}`,
    );
  }
}

function pickOutputPath(): string {
  const folder = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(folder, { recursive: true });
  return join(folder, "entry.txt");
}

assertFits(STATUS_LINE);
const destination = pickOutputPath();
writeFileSync(destination, STATUS_LINE + "\n", "utf8");
console.log(`Saved a ${STATUS_LINE.length}-character status line to ${destination}`);
