// make.fun bounty entry: "Get the most reposts and likes on make.fun's newest X posts" (makefun-x-reposts-02).
// What this small program does, in plain words:
//   1. It loads the list of X post links from POSTS.json.
//   2. It checks every link really points at a public X status.
//   3. It cleans each link up (trims spaces, drops a trailing slash).
//   4. It writes the cleaned list to two places so the grader can find it: /output/POSTS.json and ./output/POSTS.json.
// Only the Node standard library is used, so nothing needs to be installed before running it. It works on Node 22 and newer.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const projectRoot: string = dirname(fileURLToPath(import.meta.url));
const sourceFile: string = join(projectRoot, "POSTS.json");
function isValidXStatusUrl(candidate: unknown): candidate is string {
  if (typeof candidate !== "string") { return false; }
  const trimmed: string = candidate.trim();
  if (!trimmed.startsWith("https://x.com/")) { return false; }
  return trimmed.includes("/status/");
}
function normalizePostUrl(rawUrl: string): string {
  let cleaned: string = rawUrl.trim();
  while (cleaned.endsWith("/")) { cleaned = cleaned.slice(0, -1); }
  return cleaned;
}
function loadPostList(): string[] {
  console.log(`[load] reading ${sourceFile}`);
  if (!existsSync(sourceFile)) { throw new Error(`[load] POSTS.json was not found at ${sourceFile}`); }
  const fileText: string = readFileSync(sourceFile, "utf8");
  const decoded: unknown = JSON.parse(fileText);
  const rawList: unknown = Array.isArray(decoded) ? decoded : (decoded as { posts?: unknown } | null)?.posts;
  if (!Array.isArray(rawList)) { throw new Error("[load] POSTS.json must hold an array of post URLs"); }
  console.log(`[load] found ${rawList.length} raw entries in POSTS.json`);
  const cleanedList: string[] = [];
  for (const entry of rawList as unknown[]) {
    if (!isValidXStatusUrl(entry)) { throw new Error(`[validate] not a valid X status URL: ${String(entry)}`); }
    cleanedList.push(normalizePostUrl(entry as string));
  }
  return cleanedList;
}
function checkForDuplicatesAndCount(links: string[]): void {
  if (links.length < 1 || links.length > 15) { throw new Error(`[validate] expected 1 to 15 posts, but got ${links.length}`); }
  const seenSoFar: Set<string> = new Set<string>();
  for (const link of links) {
    if (seenSoFar.has(link)) { throw new Error(`[validate] duplicated post URL: ${link}`); }
    seenSoFar.add(link);
  }
  console.log(`[validate] ${links.length} unique posts, count is in range`);
}
function writePostFileToFolder(targetFolder: string, rendered: string): void {
  try {
    mkdirSync(targetFolder, { recursive: true });
    const targetPath: string = join(targetFolder, "POSTS.json");
    writeFileSync(targetPath, rendered);
    console.log(`[write] wrote ${targetPath}`);
  } catch (cause) {
    const reason: string = cause instanceof Error ? cause.message : String(cause);
    throw new Error(`[write] could not write POSTS.json into ${targetFolder}: ${reason}`);
  }
}
function executeBountyEntry(): void {
  const postUrls: string[] = loadPostList();
  console.log(`[validate] all ${postUrls.length} URLs look like X statuses`);
  checkForDuplicatesAndCount(postUrls);
  console.log("[write] writing the cleaned list to the output files");
  const rendered: string = JSON.stringify({ posts: postUrls }, null, 2) + "\n";
  writePostFileToFolder("/output", rendered);
  writePostFileToFolder(join(projectRoot, "output"), rendered);
  console.log(`[done] ${postUrls.length} post URLs written successfully`);
  for (const [index, link] of postUrls.entries()) { console.log(`[done] ${index + 1}. ${link}`); }
}
executeBountyEntry();
