// Entry for the make.fun bounty "Get the most reposts and likes on
// make.fun's newest X posts" (slug: makefun-x-reposts-02).
//
// This script is the entrypoint of the repository. Its job is small:
// take the X post links listed in POSTS.json, make sure each one is a
// genuine public X status link, throw out any link that shows up more
// than once, and save the tidy list where the bounty grader expects
// it. It only uses the Node standard library, so there is nothing to
// install. Run it with Node 22.18 or newer.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Everything is resolved relative to this file, so the script works
// no matter which folder it is launched from.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const postsPath = join(repoRoot, "POSTS.json");

// A status link looks like https://x.com/<handle>/status/<digits>.
// We accept an optional query string or fragment after the digits,
// but the handle must be present and the id must be all digits.
const STATUS_PATTERN = /^https:\/\/x\.com\/[^/]+\/status\/(\d+)([?#].*)?$/;

// Where the cleaned list ends up. The grader reads /output, and the
// local copy next to the script is handy for a quick sanity check.
const OUTPUT_FOLDERS = ["/output", join(repoRoot, "output")];

function fail(message: string): never {
  throw new Error(message);
}

// Parse one raw value from POSTS.json into a status id plus the
// canonical link. Anything that is not a string, or does not match
// the pattern above, stops the run with a readable error.
function parseStatusLink(value: unknown): { id: string; url: string } {
  if (typeof value !== "string") {
    fail(`expected a string URL, got ${typeof value}`);
  }
  const trimmed = value.trim().replace(/\/+$/, "");
  const match = STATUS_PATTERN.exec(trimmed);
  if (match === null) {
    fail(`not an X status URL: ${value}`);
  }
  const id = match[1];
  const url = `https://x.com/${trimmed.split("/")[3]}/status/${id}`;
  return { id, url };
}

// Read POSTS.json and return the raw entries. The file must be an
// object with a "posts" array; anything else is a mistake in the
// data, not something to guess around.
function readRawEntries(): unknown[] {
  console.log(`step 1/4 - loading ${postsPath}`);
  const text = readFileSync(postsPath, "utf8");
  const data: unknown = JSON.parse(text);
  if (typeof data !== "object" || data === null || !("posts" in data)) {
    fail('POSTS.json must be an object with a "posts" array');
  }
  const posts = (data as { posts: unknown }).posts;
  if (!Array.isArray(posts)) {
    fail('POSTS.json "posts" field must be an array');
  }
  console.log(`step 1/4 - found ${posts.length} entries`);
  return posts;
}

// Validate every entry, drop duplicates by status id, and enforce
// the bounty limit of 1 to 15 posts. The result keeps the original
// order of first appearance, as plain URL strings.
function cleanEntries(rawEntries: unknown[]): string[] {
  console.log("step 2/4 - validating links and removing duplicates");
  const seenIds = new Set<string>();
  const cleaned: string[] = [];
  for (const entry of rawEntries) {
    const { id, url } = parseStatusLink(entry);
    if (seenIds.has(id)) {
      fail(`duplicate post, status id ${id} appears twice`);
    }
    seenIds.add(id);
    cleaned.push(url);
  }
  if (cleaned.length < 1 || cleaned.length > 15) {
    fail(`bounty allows 1 to 15 posts, got ${cleaned.length}`);
  }
  console.log(`step 2/4 - ${cleaned.length} valid unique posts`);
  return cleaned;
}

// Save the cleaned list as pretty JSON in every output folder.
// The file keeps the same shape as the input: { "posts": [urls] }.
function saveCleanedList(posts: string[]): void {
  console.log("step 3/4 - writing the cleaned list");
  const rendered = `${JSON.stringify({ posts }, null, 2)}\n`;
  for (const folder of OUTPUT_FOLDERS) {
    mkdirSync(folder, { recursive: true });
    const target = join(folder, "POSTS.json");
    writeFileSync(target, rendered);
    console.log(`step 3/4 - wrote ${target}`);
  }
}

// Run the three steps above, then print a short summary so a human
// can see at a glance which posts were submitted.
function main(): void {
  const rawEntries = readRawEntries();
  const posts = cleanEntries(rawEntries);
  saveCleanedList(posts);
  console.log(`step 4/4 - done, ${posts.length} posts submitted:`);
  posts.forEach((url, index) => {
    console.log(`  ${index + 1}. ${url}`);
  });
}

main();
