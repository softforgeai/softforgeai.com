# SoftForge AI — softforgeai.com

The marketing website for SoftForge AI. Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4, Motion and Lucide icons.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build (all pages are prerendered static) |
| `npm start` | Serve the production build |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript checks |

## Editing content

Content lives apart from the UI, so most updates don't touch components:

| File | Controls |
| --- | --- |
| `src/lib/site.ts` | Company name, tagline, URL, CTA labels, contact details (from env vars) |
| `src/content/services.ts` | Homepage service categories and the detailed `/services` page |
| `src/content/projects.ts` | `/work` portfolio entries (see note below) |
| `src/content/home.ts` | Capabilities, audiences, principles, process steps, tech stack |
| `src/content/navigation.ts` | Header and footer navigation |
| `src/app/sitemap.ts` | Sitemap routes and `LAST_UPDATED` date |

**Portfolio honesty rule:** the three projects in `projects.ts` are demonstration concepts and are labelled "Demonstration" across the site. When real client work is approved for publication, add it with `isDemo: false` and verified outcomes only.

## Environment variables

See `.env.example`. Anything left blank is hidden in production. In development, a dashed placeholder shows where it will appear.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (default `https://softforgeai.com`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public business email (footer, contact page, structured data) |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn company page |
| `NEXT_PUBLIC_CALENDAR_URL` | Optional booking link (Cal.com, Calendly…) |
| `RESEND_API_KEY` | Server-only. Sends contact form submissions via [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Where inquiries are delivered (comma-separated for several) |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `SoftForge AI <website@softforgeai.com>` |

### Contact form

- Validation runs in the browser and again on the server, using one shared Zod schema (`src/lib/contact.ts`).
- Spam protection: a hidden honeypot field, a minimum fill time, and a per-IP rate limit. The rate limit is best-effort because it is kept in memory per instance; use Upstash/Vercel KV for strict limits.
- Delivery: if `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are **not** set, development logs the submission and shows success. Production shows an error so leads are never silently lost. **Set these before launch.**
- The visitor's email is set as `reply_to`, so you can answer straight from your inbox.

## Deploying to Netlify

`netlify.toml` holds the build settings (Node 22, `npm run build`). Netlify's Next.js adapter is applied automatically.

1. Push this repo to GitHub, then in Netlify go to **Add new site → Import an existing project** and pick the repo.
2. Under **Site configuration → Environment variables**, add the variables listed above.
3. Under **Domain management**, add `softforgeai.com` and follow Netlify's DNS instructions. Set the apex domain as primary.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel. The defaults work as-is.
2. Add the environment variables above (Production + Preview).
3. Add `softforgeai.com` and `www.softforgeai.com` under Project → Domains, and redirect `www` to the apex domain.
4. In Resend, verify `softforgeai.com` (DNS records) so `CONTACT_FROM_EMAIL` can use your domain.

## Brand assets

- `public/logo-mark.svg`: app-icon style mark on a dark tile
- `public/logo-on-dark.svg` / `public/logo-on-light.svg`: full lockups for each background
- `public/logo.svg`: neutral lockup that works on either
- `src/app/icon.svg` (favicon), `apple-icon.tsx`, `opengraph-image.tsx` (generated social card)
- In code: `<Logo />` and `<LogoMark />` from `src/components/brand/Logo.tsx`

The mark is an "S" drawn as a circuit trace linking three nodes. It stands for engineered structure, connected systems, and an intelligent core.

Design tokens (colours and theme) live at the top of `src/app/globals.css`. The site is dark-first, and the light theme toggle is saved per visitor.

## Note: Tailwind safelist script

`scripts/tailwind-safelist.mjs` runs before `dev` and `build`. It writes the project's class names into a marked block at the top of `globals.css`.

It exists because on some Windows machines, Smart App Control / Application Control blocks Tailwind's native scanner (`@tailwindcss/oxide-win32-x64-msvc`). Without it, the CSS ships with no utility classes. On machines where the native scanner works (including Vercel), the script is harmless. Don't edit the generated block by hand.
