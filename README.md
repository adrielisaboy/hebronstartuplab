# HSL Hub — Complete Vite Site

This package contains the complete HSL experience: the public marketing routes, authentication and onboarding flow, member workspace, and administrator dashboard. It is a client-only React/TypeScript/Vite export with local logos and illustrations under `public/assets/`.

## Run locally

```bash
npm install
npm run dev
```

For a production build and local preview:

```bash
npm run build
npm run preview
```

The app uses client-side routes. For production hosting, configure the host to fall back to `index.html` for paths such as `/about`, `/startups/ledgerly`, `/app`, and `/admin`.

## Included behavior

The site keeps the original GSAP hero and scroll motion, animated admin metrics and charts, dynamic member identity, working public/auth/member/admin navigation, stateful application reviews, task completion, startup join requests, profile editing, and announcement workflows. Supabase is optional: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to enable the investor-deck request insert; the UI still runs locally without them.

## Local assets

All site image references use root-relative paths such as `/assets/hsl-symbol-mark.png`, `/assets/lightgirl.png`, and `/assets/hsl-dark-confetti-field.png`. No `/manus-storage` URLs or platform-only image proxies are required.

## Project structure

- `src/pages/` — public, auth, member, and admin routes.
- `src/components/` — shared public chrome, error boundary, and small UI primitives.
- `src/contexts/` — theme and persistent member-profile state.
- `src/index.css` — complete visual system and responsive styles.
- `public/assets/` — supplied logos, illustrations, and local editorial backgrounds.
