# Framehouse

Landing page for the Framehouse studio — video ads, icons, logos and websites for small businesses.

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
- `src/data/site.ts` — nav, services, pricing, contact e-mail
- `src/data/projects.ts` — portfolio items (client, category, logo, video, poster)
- `public/media/` — web-optimised assets (720p H.264 videos, posters, logos)

## Adding a project

1. Drop the 9:16 video and a poster frame into `public/media/`.
2. Add an entry to `projects` in `src/data/projects.ts` with the `category`
   (`video` | `logo` | `icons` | `website`). The "Our work" filters and the
   "All (n)" counter update automatically.

## Breakpoints

- ≤ 900px — tablet layout (stacked hero, 2-column work grid, horizontal Recent work)
- ≤ 600px — phone layout (burger menu, full-width buttons, stacked pricing)

## To do

- Replace `contactEmail` in `src/data/site.ts` with the real address.
- "View case" / "See full pricing" currently scroll to sections — hook up real pages when they exist.
