import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(dir, "POSTS.json"), "utf8"));
const posts = Array.isArray(data) ? data : data.posts;

if (!Array.isArray(posts) || posts.length === 0 || posts.length > 15) {
  throw new Error("POSTS.json must be {posts: [...]} with 1 to 15 post URLs");
}

const output = JSON.stringify({ posts }, null, 2);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/POSTS.json", output);
mkdirSync(join(dir, "output"), { recursive: true });
writeFileSync(join(dir, "output", "POSTS.json"), output);
console.log(`Wrote ${posts.length} post URLs to /output/POSTS.json`);
