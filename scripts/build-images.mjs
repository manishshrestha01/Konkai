/**
 * Converts the restaurant's own photographs (downloaded from the official site
 * at https://www.konkaisushi.es) into optimised WebP derivatives.
 *
 * Source photos are 1024x682 PNG. Each is emitted at up to three widths so the
 * browser can pick a sensible file size per breakpoint, plus a tiny LQIP blur
 * placeholder. Nothing is ever upscaled: a 1024px source never yields a 1600px
 * file, it simply yields its single native size.
 *
 * The logo is handled separately. The official file is a 150x75 deep-red
 * wordmark on an opaque white plate, and 150px is the only rendition the site
 * publishes. Its white background is keyed to alpha so it can sit on the warm
 * ivory page background without a visible white box, and it is emitted at its
 * native size only.
 *
 * Requires ImageMagick on PATH. Run with: npm run images
 */
import { execFile } from "node:child_process";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";

const SOURCE = process.env.SOURCE_DIR ?? "raw-photos";
const OUT = path.join("public", "images");
const WIDTHS = [1600, 960, 480];
const QUALITY = "82";

/** Binary stdout must stay a Buffer; decoding it as text would corrupt it. */
const run = promisify(execFile);

/** White plate behind the official wordmark, removed with a soft fuzz. */
const LOGO = "logo";
const isLogo = (id) => id === LOGO;

const convert = (args) => run("convert", args, { encoding: "buffer", maxBuffer: 32 * 1024 * 1024 });

await mkdir(OUT, { recursive: true });

const files = (await readdir(SOURCE)).filter((f) => f.endsWith(".png")).sort();
const manifest = {};

/** Arguments that turn the logo's white background into transparency. */
const keyWhite = ["-fuzz", "14%", "-transparent", "white"];

for (const file of files) {
  const id = path.basename(file, ".png");
  const src = path.join(SOURCE, file);

  const { stdout: dims } = await run("convert", [src, "-format", "%w %h", "info:"], {
    encoding: "utf8",
  });
  const [width, height] = dims.trim().split(" ").map(Number);

  // The logo is keyed first; photographs are left untouched.
  const input = isLogo(id) ? [src, ...keyWhite] : [src];

  // Only widths at or below the native size are worth emitting.
  const targets = isLogo(id) ? [width] : WIDTHS.filter((w) => w <= width);

  const sizes = {};
  for (const target of targets) {
    const out = path.join(OUT, `${id}-${target}.webp`);
    await convert([
      ...input,
      "-resize", `${target}x`,
      "-strip",
      "-quality", QUALITY,
      "-define", "webp:method=6",
      out,
    ]);
    sizes[target] = `/_next/image?url=%2Fimages%2F${id}-${target}.webp&w=${target}&q=${QUALITY}`;
  }

  // 20x14 base64 placeholder for the blur-up background.
  const { stdout: lqip } = await convert([
    ...input,
    "-resize", "20x14!",
    "-background", isLogo(id) ? "none" : undefined,
    "-alpha", "on",
    "-strip",
    "-quality", "30",
    "-define", "webp:method=6",
    "webp:-",
  ]);
  const base64 = Buffer.from(lqip).toString("base64");

  manifest[id] = { width, height, sizes, blur: `data:image/webp;base64,${base64}` };
  console.log(`✓ ${id}  ${width}x${height}${isLogo(id) ? "  (white keyed to alpha)" : ""}`);
}

await writeFile(
  path.join("src", "data", "photos.generated.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`\nWrote manifest for ${Object.keys(manifest).length} photos.`);
