# Random Team Generator (PWA)

Mobile‑first, offline‑capable PWA to split a list of participants into balanced random teams. Built with vanilla HTML5, CSS (Tailwind CDN + small custom CSS), and JavaScript, and designed to run on GitHub Pages.

## Features

- Random team generation by team size or number of teams
- Seeded shuffle for reproducible results
- Balance option to even out team sizes
- Copy and system Share support
- Works offline after first load (service worker)
- Installable (manifest + `beforeinstallprompt`)
- Mobile‑first UI with iPhone safe‑area handling and dark mode

## Quick Start

You can open the site directly on GitHub Pages. If running locally, use a local web server so the service worker can register:

```sh
# Python 3
python -m http.server 8000
# or Node (if installed)
npx http-server -p 8000
```

Then visit `http://localhost:8000/`.

Note: PWA features (SW/manifest/install) do not work from `file://` URLs.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In GitHub → Settings → Pages, set Source to your default branch and root.
3. Open `https://<user>.github.io/<repo>/` to use the app.

All app paths are relative (`./…`) so it works from a project subpath.

## How To Use

1. Paste or type participants (one per line; commas also supported).
2. Choose Mode: “By team size” or “By team count”.
3. Configure options: balance, shuffle, and optional seed.
4. Generate teams. Use Copy or Share to distribute results.

### Seeding

Enter any string in Seed to produce repeatable shuffles (same input + seed → same teams).

## Tech Overview

- Tailwind via CDN for zero build step.
- Font Awesome via CDNJS for icons.
- Service worker precaches the app shell; CDN assets use a small runtime cache (stale‑while‑revalidate).
- Safe‑area support through `viewport-fit=cover` and CSS `env(safe-area-inset-*)`.

## File Structure

```
index.html                     # App shell
manifest.webmanifest           # PWA manifest
sw.js                          # Service worker (precache + runtime cache)
assets/
  css/
    styles.css                 # Custom styles (mobile-first, dark-mode tweaks)
  js/
    app.js                     # Team generator logic + UI wiring
    register-sw.js             # SW registration tuned for GitHub Pages
  icons/                       # Generated icons (Apple/Android, maskable)
```

## Development Notes

- Mobile first: primary layout and spacing tuned for small screens; responsive grid for teams.
- Accessibility: live region for results and clear control labels.
- Persistence: user inputs stored in `localStorage` between sessions.
- No build tooling required; if you later want full offline without CDNs, prebuild Tailwind and vendor Font Awesome locally.

## Troubleshooting

- Service worker not updating: hard refresh or unregister old SW from DevTools → Application → Service Workers.
- Fonts/icons missing offline: the SW caches CDN responses after first load; ensure you’ve visited once online.
- GH Pages path issues: verify the site is served at `https://<user>.github.io/<repo>/` and that `start_url` is `./`.

