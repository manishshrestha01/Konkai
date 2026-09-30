/**
 * Converts the restaurant's own photographs (downloaded from the official site
 * at https://www.konkaisushi.es) into optimised WebP derivatives.
 *
 * Source photos are 1024x682 PNG. Each is emitted at up to three widths so the
 * browser can pick a sensible file size per breakpoint, plus a tiny LQIP blur
 * placeholder. Nothing is ever upscaled: a 1024px source never yields a 1600px
 * file, it simply yields its single native size.
 *
 * The logo is handled separately. The official file is a wide red wordmark
 * with a grey subtitle on a near-black plate, which has already had its black
 * background keyed to alpha and been trimmed to its content box in raw-photos
 * (`-fuzz 22% -transparent black -trim`), so it can sit on the warm ivory page
 * background. It is emitted at its native size only.
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

/** The logo arrives keyed to alpha and trimmed to its content box already. */
const LOGO = "logo";
const isLogo = (id) => id === LOGO;

const convert = (args) => run("convert", args, { encoding: "buffer", maxBuffer: 32 * 1024 * 1024 });

await mkdir(OUT, { recursive: true });

const files = (await readdir(SOURCE)).filter((f) => f.endsWith(".png")).sort();
const manifest = {};

for (const file of files) {
  const id = path.basename(file, ".png");
  const src = path.join(SOURCE, file);

  const { stdout: dims } = await run("convert", [src, "-format", "%w %h", "info:"], {
    encoding: "utf8",
  });
  const [width, height] = dims.trim().split(" ").map(Number);

  // Only widths at or below the native size are worth emitting. When a photo
  // is narrower than the smallest raster width, emit its single native size
  // (never upscale), matching the handling of the logo.
  const rasters = WIDTHS.filter((w) => w <= width);
  const targets = isLogo(id) || rasters.length === 0 ? [width] : rasters;

  const sizes = {};
  for (const target of targets) {
    const out = path.join(OUT, `${id}-${target}.webp`);
    await convert([
      src,
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
    src,
    "-resize", "20x14!",
    "-background", "none",
    "-alpha", "on",
    "-strip",
    "-quality", "30",
    "-define", "webp:method=6",
    "webp:-",
  ]);
  const base64 = Buffer.from(lqip).toString("base64");

  manifest[id] = { width, height, sizes, blur: `data:image/webp;base64,${base64}` };
  console.log(`✓ ${id}  ${width}x${height}${isLogo(id) ? "  (alpha keyed at source)" : ""}`);
}

await writeFile(
  path.join("src", "data", "photos.generated.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`\nWrote manifest for ${Object.keys(manifest).length} photos.`);
