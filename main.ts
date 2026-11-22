import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const botDir = process.env.MAKEFUN_BOT_DIR ?? here;
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Extract the 11-char video id from a YouTube Shorts / watch / youtu.be URL.
// Rejects anything that is not exactly one of those shapes: the whole URL is
// anchored, the id must be exactly 11 chars, and no extra path segments may
// follow it (a query string or fragment after the id is allowed, e.g. a
// ?si=... share link). Throws a specific error naming the problem.
function extractVideoId(url) {
  if (typeof url !== "string" || url.length === 0) {
    throw new Error("VIDEO.json must have a string url field");
  }
  if (!url.startsWith("https://")) {
    throw new Error(`VIDEO.json url must start with https:// (got ${url})`);
  }
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`VIDEO.json url is not a valid URL (got ${url})`);
  }
  const host = parsed.hostname.toLowerCase();
  const ytHosts = ["youtube.com", "www.youtube.com", "m.youtube.com"];
  if (!ytHosts.includes(host) && host !== "youtu.be") {
    throw new Error(
      `VIDEO.json url must be a youtube.com or youtu.be address (got ${url})`,
    );
  }
  const idPattern = /^\/shorts\/([A-Za-z0-9_-]{11})([?#].*)?$/;
  const watchPattern = /^\/watch$/;
  const shortPattern = /^\/([A-Za-z0-9_-]{11})([?#].*)?$/;
  let m;
  if (host === "youtu.be") {
    m = shortPattern.exec(parsed.pathname + parsed.search + parsed.hash);
    if (!m) {
      throw new Error(
        `VIDEO.json url is not a YouTube video address (expected youtu.be/<11-char id>, got ${url})`,
      );
    }
    return m[1];
  }
  m = idPattern.exec(parsed.pathname + parsed.search + parsed.hash);
  if (m) return m[1];
  if (watchPattern.test(parsed.pathname)) {
    const v = parsed.searchParams.get("v");
    if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
  }
  throw new Error(
    `VIDEO.json url is not a YouTube video address (expected shorts/<11-char id> or watch?v=<11-char id>, got ${url})`,
  );
}

const src = join(botDir, "VIDEO.json");
const raw = readFileSync(src, "utf8");
let data;
try {
  data = JSON.parse(raw);
} catch {
  throw new Error("VIDEO.json is not valid JSON");
}
if (!data || typeof data !== "object" || Array.isArray(data)) {
  throw new Error("VIDEO.json must be a JSON object");
}
const videoId = extractVideoId(data.url);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), raw);
console.log(
  "wrote VIDEO.json ->",
  join(outDir, "VIDEO.json"),
  `(video ${videoId})`,
);
