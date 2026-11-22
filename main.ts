import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const botDir = process.env.MAKEFUN_BOT_DIR ?? here;
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

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
if (typeof data.url !== "string" || data.url.length === 0) {
  throw new Error("VIDEO.json must have a string url field");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), raw);
console.log("wrote VIDEO.json ->", join(outDir, "VIDEO.json"));
