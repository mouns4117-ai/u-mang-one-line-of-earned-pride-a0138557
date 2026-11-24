// One Line of Earned Pride — u-mang-one-line-of-earned-pride-a0138557
// Writes a single line of text (1 to 240 characters) to /output/entry.txt.
// No network, no dependencies, no input files: the line is the entry.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The boy who stammered at every assembly stood at the microphone and finished the last line.";

// Empty only the CONTENTS of a directory, never the directory itself:
// the grader's /output is a mounted empty directory and removing it fails.
function emptyDirContents(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    return;
  }
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  const text = ENTRY;

  // Gate: 1 to 240 characters, not whitespace-only.
  if (text.length < 1 || text.length > 240) {
    throw new Error(`entry is ${text.length} characters, outside the 1-240 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is whitespace-only");
  }

  emptyDirContents(outDir);
  const target = join(outDir, "entry.txt");
  writeFileSync(target, text, "utf8");

  // Re-read and assert the file on disk is exactly what was written.
  const onDisk = readFileSync(target, "utf8");
  if (onDisk !== text) {
    throw new Error("entry.txt on disk does not match the entry text");
  }
  console.log(`wrote ${target} (${text.length} characters, 1 line)`);
}

main();
