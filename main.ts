// One-Line Office Jokes — make.fun bounty entry
// u-markk-st-one-line-office-jokes-a51f2bcc
//
// Writes a single one-line office joke to output/entry.txt.
// Node.js standard library only. No network, no secrets, no input files.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const JOKE: string =
  "I replied-all to say please stop replying-all, and now there are forty-seven emails about stopping reply-all.";

// validateEntry enforces the bounty rules for a one-line entry:
// 1-199 Unicode code points, exactly one line, not only whitespace.
// Throws an Error describing the first violated rule.
function validateEntry(line: string): void {
  // Length gate: 1-199 characters, counted as Unicode code points.
  const length: number = [...line].length;
  if (length < 1 || length > 199) {
    throw new Error(
      `Entry must be 1-199 characters, got ${length} characters.`,
    );
  }
  // Single line: no carriage returns or line feeds anywhere.
  if (line.includes("\r") || line.includes("\n")) {
    throw new Error("Entry must be a single line (no \\r or \\n allowed).");
  }
  // Must not be only whitespace.
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
}

function main(): void {
  // Validate the entry before writing anything to disk.
  validateEntry(JOKE);

  // Resolve paths relative to this source file, never process.cwd(),
  // so the program works from any working directory.
  const sourceDir: string = dirname(fileURLToPath(import.meta.url));
  const outputDir: string =
    process.env.MAKEFUN_OUTPUT_DIR ?? join(sourceDir, "output");

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), JOKE, "utf8");
}

main();
