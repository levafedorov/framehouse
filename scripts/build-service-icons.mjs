/**
 * Pictograms for the services that came with the ceník and had no drawing
 * of their own: redesign, mascot, animated logo, vectorising a finished
 * logo. White line art on transparent, 512×512, in the same weight as the
 * pictograms that came from the designer (public/media/services/*.png).
 *
 *   node scripts/build-service-icons.mjs
 */
import sharp from "sharp";

const SIZE = 512;
const STROKE = 6;
const OUT = "public/media/services";

const rad = (deg) => ((deg - 90) * Math.PI) / 180;
const pt = (cx, cy, r, deg) => [
  cx + r * Math.cos(rad(deg)),
  cy + r * Math.sin(rad(deg)),
];
const n = (v) => Math.round(v * 10) / 10;

/** Five-pointed star, the same one the logo pictogram carries */
function star(cx, cy, r, inner = 0.44) {
  const points = [];
  for (let i = 0; i < 10; i += 1) {
    const [x, y] = pt(cx, cy, i % 2 === 0 ? r : r * inner, i * 36);
    points.push(`${n(x)} ${n(y)}`);
  }
  return `M ${points.join(" L ")} Z`;
}

/** Arc from one angle to another, clockwise */
function arc(cx, cy, r, from, to) {
  const [x1, y1] = pt(cx, cy, r, from);
  const [x2, y2] = pt(cx, cy, r, to);
  const large = ((to - from + 360) % 360) > 180 ? 1 : 0;
  return `M ${n(x1)} ${n(y1)} A ${r} ${r} 0 ${large} 1 ${n(x2)} ${n(y2)}`;
}

/** Arrowhead at the end of an arc, pointing along the tangent */
function head(cx, cy, r, deg, size = 22) {
  const [x, y] = pt(cx, cy, r, deg);
  const back = deg - 13;
  const [bx, by] = pt(cx, cy, r, back);
  const ax = x - bx;
  const ay = y - by;
  const len = Math.hypot(ax, ay) || 1;
  const ux = ax / len;
  const uy = ay / len;
  const px = -uy;
  const py = ux;
  const tail = (sx) => [
    x - ux * size + px * size * 0.55 * sx,
    y - uy * size + py * size * 0.55 * sx,
  ];
  const [lx, ly] = tail(1);
  const [rx, ry] = tail(-1);
  return `M ${n(lx)} ${n(ly)} L ${n(x)} ${n(y)} L ${n(rx)} ${n(ry)}`;
}

const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
<g fill="none" stroke="#ffffff" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">
${body}
</g>
</svg>`;

/* --- redesign: the badge, and a cycle running around it ------------- */

const redesign = svg(`
  <circle cx="256" cy="256" r="104"/>
  <path d="${star(256, 256, 58)}"/>
  <path d="${arc(256, 256, 160, 20, 150)}"/>
  <path d="${head(256, 256, 160, 150)}"/>
  <path d="${arc(256, 256, 160, 200, 330)}"/>
  <path d="${head(256, 256, 160, 330)}"/>
`);

/* --- mascot: a blob with one hand up, in the spirit of the bundle art */

const maskot = svg(`
  <path d="M 256 126
    C 314 126 352 172 352 220
    C 352 232 364 212 382 180
    C 394 158 422 168 412 194
    C 402 220 370 252 360 272
    C 352 288 356 312 350 336
    C 342 372 310 396 266 396
    C 220 396 190 370 182 330
    C 176 302 168 298 156 290
    C 136 276 148 248 168 260
    C 176 264 182 262 184 254
    C 188 214 200 172 224 146
    C 232 136 244 126 256 126 Z"/>
  <circle cx="232" cy="238" r="15"/>
  <circle cx="232" cy="238" r="5" fill="#ffffff"/>
  <circle cx="292" cy="238" r="15"/>
  <circle cx="292" cy="238" r="5" fill="#ffffff"/>
  <path d="M 240 284 Q 262 302 284 284"/>
`);

/* --- animated logo: the badge, and the air it moves through ---------- */

const animace = svg(`
  <circle cx="300" cy="256" r="100"/>
  <path d="${star(300, 256, 56)}"/>
  <path d="M 96 196 L 168 196"/>
  <path d="M 62 256 L 158 256"/>
  <path d="M 96 316 L 168 316"/>
  <path d="${arc(300, 256, 140, 118, 172)}"/>
  <path d="${arc(300, 256, 140, 188, 242)}"/>
`);

/* --- finishing a logo: the mark set on a vector grid ----------------- */

const dotazeni = svg(`
  <path d="${star(256, 250, 84)}"/>
  <path d="M 148 142 L 364 142 L 364 358 L 148 358 Z" stroke-dasharray="14 12"/>
  <rect x="138" y="132" width="20" height="20" fill="#ffffff" stroke="none"/>
  <rect x="354" y="132" width="20" height="20" fill="#ffffff" stroke="none"/>
  <rect x="138" y="348" width="20" height="20" fill="#ffffff" stroke="none"/>
  <rect x="354" y="348" width="20" height="20" fill="#ffffff" stroke="none"/>
`);

const icons = {
  "logo-redesign": redesign,
  maskot,
  "logo-animace": animace,
  "logo-dotazeni": dotazeni,
};

for (const [name, source] of Object.entries(icons)) {
  await sharp(Buffer.from(source)).png().toFile(`${OUT}/${name}.png`);
  console.log(`${OUT}/${name}.png`);
}
