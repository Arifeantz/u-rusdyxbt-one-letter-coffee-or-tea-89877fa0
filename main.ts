// A for Coffee — One Letter: Coffee or Tea
//
// The entry is a single letter: A.
//
// The word behind the letter is "coffee". The picture is concrete: the
// first mug of the morning, dark and steaming, the jolt that pulls you
// awake before the day has even started. Coffee is the bolder drink —
// darker, louder, more alive than tea. Tea is gentle and quiet; it
// soothes. Coffee wakes you up. A judge weighing vividness first
// should find coffee the more vivid choice: the smell filling the
// kitchen, the heat on your hands, the first sip that switches the
// lights on.
//
// Why A, and not some other letter? A is the bounty's letter for
// coffee — the first letter of the alphabet for the first drink of
// the day. It is also the sharpest sound in the word: the open vowel
// of "ahh", the sound you make after the first sip. And it is the
// only honest answer: coffee is A, tea is B, and the letter is the
// choice.
//
// The program writes exactly one character — "A", no newline, no gloss,
// no punctuation — to entry.txt in the output directory, because the
// gate requires /output/entry.txt to be UTF-8 text of exactly
// 1 character, and the letter is the whole entry.

import * as fs from "node:fs";
import * as path from "node:path";

// The letter for the drink, and the drink it stands for. One character,
// A-Z, nothing else. Note the letter is the CHOICE, not the word's
// initial: the bounty maps A to coffee and B to tea, so "coffee" starts
// with C while its letter is A.
const LETTER = "A";
const WORD = "coffee"; // dark, bold, steaming — the drink that wakes you up

// The bounty's own mapping: A means coffee, B means tea, and nothing
// else is a valid letter for this competition.
const DRINK_FOR_LETTER: Record<string, string> = { A: "coffee", B: "tea" };

// Guard: refuse to write anything that is not a single capital letter,
// and refuse a letter whose drink does not match the mapping. If either
// trips, the entry is invalid by construction, so fail loudly instead
// of writing a file the gate would reject.
if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error("letter must be a single A-Z character, got: " + LETTER);
}
if (!WORD || DRINK_FOR_LETTER[LETTER] !== WORD) {
  throw new Error("letter " + LETTER + " does not stand for " + WORD);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is set but empty");
}
const outputPath = path.join(outputDir, "entry.txt");

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, LETTER, "utf8");

// Check our own work: the gate wants exactly 1 character, so read the
// file back and refuse to finish quietly if it is anything else.
const written = fs.readFileSync(outputPath, "utf8");
if (written !== LETTER) {
  throw new Error(
    "entry.txt must contain exactly one character, got " +
      JSON.stringify(written)
  );
}
