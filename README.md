# aktilot.com

The marketing and documentation website for [Aktilot](https://github.com/vikas0686/Aktilot) — a
self-hosted, open-source RAG platform for chatting with your documents.

Built with Next.js (App Router) and Tailwind CSS, statically exported and deployed to Cloudflare Pages.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building

```bash
npm run build
```

This produces a fully static site in `out/` (via `output: "export"` in `next.config.ts`). There is no
Node.js server involved — the site is plain HTML/CSS/JS and can be hosted on any static host.

## Deploying to Cloudflare Pages

**Option A — Git integration (recommended):**

1. Push this repo to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and select
   the repo.
3. Build settings:
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npm run build`
   - Build output directory: `out`
4. Add a custom domain (`aktilot.com`) under the Pages project's **Custom domains** tab.

**Option B — CLI deploy:**

```bash
npm run build
npx wrangler pages deploy out --project-name=aktilot-website
```

### Notes

- `next.config.ts` sets `output: "export"` and `trailingSlash: true` so every route emits a
  `<route>/index.html`, which is what static hosts (including Cloudflare Pages) expect for clean URLs.
- `public/_headers` configures security headers and long-lived caching for static assets, using
  [Cloudflare Pages' `_headers` convention](https://developers.cloudflare.com/pages/configuration/headers/).
- Update `lib/site.ts` if the canonical domain, GitHub repo URL, or metadata ever change — `sitemap.ts`,
  `robots.ts`, `manifest.ts`, and every page's Open Graph tags all read from that one file.
