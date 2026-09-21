#!/usr/bin/env node
/**
 * Builds public/media/work from the designer's source PNGs.
 *
 *   node scripts/build-work-media.mjs [sourceDir]
 *   WORK_SRC=... node scripts/build-work-media.mjs
 *
 * Every output is a deliberate crop chosen by eye (coordinates are in
 * source pixels), never a whole sheet squeezed into a frame:
 *   - card  1200×800  (3:2)  the card in the work grid
 *   - cover ≥1000 wide (4:3 where the source allows) the hero of /prace/[slug]
 *   - still 800×1000  (4:5)  the frames on /prace/[slug]
 * Photos and mockups are never upscaled more than ×1.5 — a smaller crop
 * is exported at its native size instead. Flat graphics (logos, tiles)
 * may be upscaled (lanczos). A logo cut from a sheet is centred on a
 * canvas filled with the sheet's own background colour, sampled from
 * its corner.
 */
import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2] ?? process.env.WORK_SRC ?? "C:\\Users\\flsfe\\Desktop\\TEMP\\prace";
const OUT = path.resolve("public/media/work");
/** files in OUT that are not built here but must survive */
const KEEP = new Set(["cta-flat.webp"]);

const CARD = { w: 1200, h: 800 };
const COVER = { w: 1200, h: 900 };
const STILL = { w: 800, h: 1000 };
const MAX_PHOTO_UPSCALE = 1.5;

const src = (rel) => path.join(SRC, rel);
const region = (left, top, width, height) => ({ left, top, width, height });

/* ------------------------------------------------------------------ */
/* manifest                                                            */
/* ------------------------------------------------------------------ */

/** @type {Array<Record<string, any>>} */
const manifest = [
  /* ---- kooperativa (client) ---- */
  { out: "kooperativa-card.jpg", src: src("1/kooperativa/image(1).png"), crop: region(0, 41, 1000, 667), target: CARD },
  { out: "kooperativa-cover.jpg", src: src("1/kooperativa/image(1).png"), crop: region(0, 0, 1000, 750), target: COVER },
  {
    // hi-res for the homepage hero; the placeholder line on the green bag
    // is covered with a patch of the same fabric a little lower down
    out: "kooperativa-hero.jpg",
    src: src("1/kooperativa/image(6).png"),
    // the fabric band right under the line has the same shading as the line
    patch: { from: region(2690, 1082, 980, 64), to: { left: 2690, top: 1014 } },
    crop: region(900, 300, 3400, 2600),
    target: { w: 1600, h: 1224 },
  },
  {
    // the icon set: nine tiles cut from the sheet, laid out 3×3 — the
    // sheet's captions must not appear on the site
    out: "kooperativa-still-ikony.jpg",
    grid: {
      src: src("1/kooperativa/image(2).png"),
      canvas: { w: 800, h: 1000, bg: "#ffffff" },
      tile: 200,
      gap: 40,
      cols: 3,
      tiles: [
        region(268, 252, 92, 93), // plane, filled
        region(268, 437, 92, 93), // car
        region(268, 596, 92, 94), // shield
        region(268, 772, 92, 94), // house
        region(268, 950, 92, 94), // heart
        region(157, 252, 91, 93), // plane, light
        region(157, 437, 91, 93), // car, light
        region(157, 772, 91, 94), // house, light
        region(157, 950, 91, 94), // heart, light
      ],
    },
  },
  { out: "kooperativa-still-visacky.jpg", src: src("1/kooperativa/image(3).png"), crop: region(190, 0, 600, 750), target: STILL },
  { out: "kooperativa-still-tasky.jpg", src: src("1/kooperativa/image(4).png"), crop: region(470, 0, 450, 563), target: STILL },

  /* ---- hinna (client) — only the "HINNA." version the brand uses ---- */
  { out: "hinna-card.jpg", logo: { src: src("1/hinna/image(8).png"), crop: region(884, 1050, 1732, 368), canvas: CARD, width: 700 } },
  { out: "hinna-cover.jpg", logo: { src: src("1/hinna/image(8).png"), crop: region(884, 1050, 1732, 368), canvas: COVER, width: 720 } },
  { out: "hinna-still-web.jpg", src: src("1/hinna/unnamed.png"), crop: region(120, 585, 330, 410), target: STILL },
  { out: "hinna-still-mikina.jpg", src: src("1/hinna/unnamed.png"), crop: region(147, 1003, 346, 433), target: STILL },
  { out: "hinna-still-mikina-bila.jpg", src: src("1/hinna/unnamed.png"), crop: region(147, 1442, 346, 433), target: STILL },

  /* ---- llama-loca (client) ---- */
  { out: "llama-loca-card.jpg", logo: { src: src("1/llama-loca/image(1).png"), crop: region(400, 610, 900, 1235), canvas: CARD, height: 700 } },
  { out: "llama-loca-cover.jpg", logo: { src: src("1/llama-loca/image(1).png"), crop: region(400, 610, 900, 1235), canvas: COVER, height: 780 } },

  /* ---- quality-equals-cost (client) ---- */
  { out: "quality-equals-cost-card.jpg", logo: { src: src("1/quality-equals-cost/image(1).png"), crop: region(477, 1054, 744, 366), canvas: CARD, width: 700 } },
  { out: "quality-equals-cost-cover.jpg", logo: { src: src("1/quality-equals-cost/image(1).png"), crop: region(477, 1054, 744, 366), canvas: COVER, width: 720 } },

  /* ---- kismi (client) ---- */
  { out: "kismi-card.jpg", src: src("1/kismi/image(2).png"), crop: region(30, 1352, 1690, 1127), target: CARD },
  { out: "kismi-cover.jpg", src: src("1/kismi/image(2).png"), crop: region(125, 1352, 1503, 1127), target: COVER },
  { out: "kismi-still-vizitky.jpg", src: src("1/kismi/image(2).png"), crop: region(0, 360, 752, 940), target: STILL },

  /* ---- koncept-kosmetika (concept) ---- */
  { out: "koncept-kosmetika-card.jpg", src: src("2/lenoa/image(3).png"), crop: region(18, 0, 2464, 1643), target: CARD },
  { out: "koncept-kosmetika-cover.jpg", src: src("2/lenoa/image(3).png"), crop: region(155, 0, 2190, 1643), target: COVER },
  { out: "koncept-kosmetika-still-bila.jpg", src: src("2/lenoa/image(1).png"), crop: region(300, 0, 1314, 1643), target: STILL },
  { out: "koncept-kosmetika-still-oranzova.jpg", src: src("2/lenoa/image(3).png"), crop: region(300, 0, 1314, 1643), target: STILL },
  { out: "koncept-kosmetika-still-modra.jpg", src: src("2/lenoa/image(4).png"), crop: region(300, 0, 1314, 1643), target: STILL },

  /* ---- koncept-doprava (concept; 640 px boards, exported native) ---- */
  { out: "koncept-doprava-card.jpg", src: src("2/venave/image(2).png"), crop: region(45, 878, 550, 367), target: CARD },
  { out: "koncept-doprava-cover.jpg", src: src("2/venave/image(2).png"), crop: region(0, 40, 640, 800), target: { w: 640, h: 800 } },
  { out: "koncept-doprava-still-znacka.jpg", src: src("2/venave/image(1).png"), crop: region(0, 120, 640, 800), target: STILL },
  { out: "koncept-doprava-still-aplikace.jpg", src: src("2/venave/image(2).png"), crop: region(105, 1250, 431, 539), target: STILL },
  { out: "koncept-doprava-still-varianty.jpg", src: src("2/venave/image(4).png"), crop: region(0, 30, 640, 800), target: STILL },

  /* ---- koncept-danova-poradkyne (concept) ---- */
  { out: "koncept-danova-poradkyne-card.jpg", src: src("3/dstax/image(2).png"), crop: region(0, 70, 3508, 2339), target: CARD },
  { out: "koncept-danova-poradkyne-cover.jpg", src: src("3/dstax/image(2).png"), crop: region(100, 0, 3307, 2480), target: COVER },
  { out: "koncept-danova-poradkyne-still-znak.jpg", src: src("3/dstax/image(1).png"), crop: region(214, 936, 750, 936), target: STILL },
  { out: "koncept-danova-poradkyne-still-vizitky.jpg", src: src("3/dstax/image(1).png"), crop: region(300, 3000, 1240, 1550), target: STILL },

  /* ---- koncept-rezidence (concept; 640 px boards) ---- */
  { out: "koncept-rezidence-card.jpg", src: src("2/resort-and-home/image(1).png"), crop: region(80, 0, 480, 320), target: CARD, flat: true, maxUpscale: 1.5 },
  { out: "koncept-rezidence-cover.jpg", src: src("2/resort-and-home/image(1).png"), crop: region(107, 0, 426, 320), target: COVER, flat: true, maxUpscale: 1.5 },
  { out: "koncept-rezidence-still-smer-1.jpg", src: src("2/resort-and-home/image(1).png"), crop: region(64, 0, 512, 640), target: STILL },
  { out: "koncept-rezidence-still-smer-2.jpg", src: src("2/resort-and-home/image(2).png"), crop: region(139, 0, 362, 452), target: STILL },
  { out: "koncept-rezidence-still-smer-3.jpg", src: src("2/resort-and-home/image(3).png"), crop: region(43, 60, 554, 693), target: STILL },

  /* ---- koncept-autolakovna (concept; sources are 3:2 already) ---- */
  { out: "koncept-autolakovna-card.jpg", src: src("2/autofit/image(3).png"), crop: region(0, 0, 1500, 1000), target: CARD },
  { out: "koncept-autolakovna-cover.jpg", src: src("2/autofit/image(3).png"), crop: region(83, 0, 1334, 1000), target: COVER },
  { out: "koncept-autolakovna-still-bila.jpg", src: src("2/autofit/image(1).png"), crop: region(40, 0, 800, 1000), target: STILL },
  { out: "koncept-autolakovna-still-seda.jpg", src: src("2/autofit/image(2).png"), crop: region(40, 0, 800, 1000), target: STILL },
  { out: "koncept-autolakovna-still-tyrkysova.jpg", src: src("2/autofit/image(3).png"), crop: region(40, 0, 800, 1000), target: STILL },

  /* ---- koncept-maskot (concept; 640 px board) ---- */
  { out: "koncept-maskot-card.jpg", logo: { src: src("3/onesugarfamily/image(4).png"), crop: region(165, 78, 310, 207), canvas: CARD, width: 700 } },
  { out: "koncept-maskot-cover.jpg", logo: { src: src("3/onesugarfamily/image(4).png"), crop: region(165, 78, 310, 207), canvas: COVER, width: 720 } },
  { out: "koncept-maskot-still-verze.jpg", src: src("3/onesugarfamily/image(4).png"), crop: region(34, 365, 252, 315), target: STILL },
  { out: "koncept-maskot-still-samolepky.jpg", src: src("3/onesugarfamily/image(4).png"), crop: region(60, 690, 330, 410), target: STILL },

  /* ---- koncept-safari-park (concept) ---- */
  { out: "koncept-safari-park-card.jpg", src: src("3/safari-park/image(3).png"), crop: region(177, 1190, 1284, 856), target: CARD },
  { out: "koncept-safari-park-cover.jpg", src: src("3/safari-park/image(3).png"), crop: region(248, 1190, 1141, 856), target: COVER },
  { out: "koncept-safari-park-still-nosorozec.jpg", src: src("3/safari-park/image(1).png"), crop: region(300, 560, 1100, 1375), target: STILL },
  { out: "koncept-safari-park-still-zirafa.jpg", src: src("3/safari-park/image(2).png"), crop: region(495, 195, 736, 920), target: STILL },
  { out: "koncept-safari-park-still-taska.jpg", src: src("3/safari-park/image(4).png"), crop: region(471, 1050, 868, 1085), target: STILL },
];

/* ------------------------------------------------------------------ */
/* builders                                                            */
/* ------------------------------------------------------------------ */

const jpeg = { quality: 84, mozjpeg: true };

/**
 * The target size, or — when reaching it would upscale a photo past the
 * limit — the largest size within the limit that keeps the target aspect.
 */
function outputSize(crop, target, { flat = false, maxUpscale } = {}) {
  const needed = Math.max(target.w / crop.width, target.h / crop.height);
  const limit = maxUpscale ?? (flat ? Infinity : MAX_PHOTO_UPSCALE);
  if (needed <= limit) return { w: target.w, h: target.h };
  let w = Math.round(crop.width * limit);
  let h = Math.round((w * target.h) / target.w);
  if (h > crop.height * limit) {
    h = Math.round(crop.height * limit);
    w = Math.round((h * target.w) / target.h);
  }
  return { w, h };
}

async function buildCrop(entry) {
  let image = sharp(entry.src);
  if (entry.patch) {
    const { from, to } = entry.patch;
    const patch = await sharp(entry.src).extract(from).toBuffer();
    image = sharp(await image.composite([{ input: patch, left: to.left, top: to.top }]).toBuffer());
  }
  const size = outputSize(entry.crop, entry.target, entry);
  const info = await image
    .extract(entry.crop)
    .resize(size.w, size.h, { fit: "cover", kernel: "lanczos3" })
    .jpeg(jpeg)
    .toFile(path.join(OUT, entry.out));
  return `${info.width}×${info.height}`;
}

/** the corner colour of the sheet, so the canvas matches it exactly */
async function sampleBackground(file) {
  const { data } = await sharp(file).extract({ left: 4, top: 4, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  return { r: data[0], g: data[1], b: data[2] };
}

async function buildLogo({ out, logo }) {
  const bg = await sampleBackground(logo.src);
  const { canvas } = logo;
  const mark = await sharp(logo.src)
    .extract(logo.crop)
    .resize(logo.width ?? null, logo.height ?? null, { fit: "inside", kernel: "lanczos3" })
    .toBuffer({ resolveWithObject: true });
  const info = await sharp({ create: { width: canvas.w, height: canvas.h, channels: 3, background: bg } })
    .composite([{ input: mark.data, left: Math.round((canvas.w - mark.info.width) / 2), top: Math.round((canvas.h - mark.info.height) / 2) }])
    .jpeg(jpeg)
    .toFile(path.join(OUT, out));
  return `${info.width}×${info.height} on rgb(${bg.r},${bg.g},${bg.b})`;
}

async function buildGrid({ out, grid }) {
  const { canvas, tile, gap, cols, tiles } = grid;
  const rows = Math.ceil(tiles.length / cols);
  const gridW = cols * tile + (cols - 1) * gap;
  const gridH = rows * tile + (rows - 1) * gap;
  const x0 = Math.round((canvas.w - gridW) / 2);
  const y0 = Math.round((canvas.h - gridH) / 2);
  const layers = await Promise.all(
    tiles.map(async (t, i) => ({
      input: await sharp(grid.src).extract(t).resize(tile, tile, { fit: "cover", kernel: "lanczos3" }).toBuffer(),
      left: x0 + (i % cols) * (tile + gap),
      top: y0 + Math.floor(i / cols) * (tile + gap),
    })),
  );
  const info = await sharp({ create: { width: canvas.w, height: canvas.h, channels: 3, background: canvas.bg } })
    .composite(layers)
    .jpeg(jpeg)
    .toFile(path.join(OUT, out));
  return `${info.width}×${info.height}, ${tiles.length} tiles`;
}

/* ------------------------------------------------------------------ */

await mkdir(OUT, { recursive: true });
for (const f of await readdir(OUT)) {
  if (!KEEP.has(f)) await rm(path.join(OUT, f));
}

for (const entry of manifest) {
  const note = entry.logo ? await buildLogo(entry) : entry.grid ? await buildGrid(entry) : await buildCrop(entry);
  console.log(entry.out.padEnd(44), note);
}
console.log(`\n${manifest.length} files → ${OUT}`);
