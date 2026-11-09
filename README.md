# Heartflect

Landing page for the Heartflect studio — logos, brand identity, icons, mascots, logo animation, social media kits and print design for small businesses.

Built with Next.js (App Router) + TypeScript + CSS Modules. No UI libraries.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Where things are

- `src/app/page.tsx` — the page, composed of sections
- `src/components/*` — one folder-free component per section, each with its own `.module.css`
- `src/data/site.ts` — studio name, contact e-mail, operator details, nav
- `src/data/pricing.ts` — every price, lead time and bundle on the site
- `src/data/services.ts` — copy of the service pages under `/sluzby`
- `src/data/projects.ts` — portfolio items shown under "Naše práce" and `/prace`
- `public/media/` — web-optimised images

## Adding a project

1. Add the source images to the manifest in `scripts/build-work-media.mjs` and run it
   to produce the card, cover and stills in `public/media/work/`.
2. Add an entry to `projects` in `src/data/projects.ts` with the `category`
   (`logo` | `identity` | `icons` | `print`).

## Breakpoints

- ≤ 900px — tablet layout (stacked hero, 2-column work grid, horizontal Recent work)
- ≤ 600px — phone layout (burger menu, full-width buttons, stacked pricing)
