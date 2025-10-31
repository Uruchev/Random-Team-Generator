🧠 Random Team Generator
AI-Free, Mobile‑First Team Builder (PWA)
Live Demo PWA Ready HTML5 CSS3 (Tailwind CDN) Vanilla JS Font Awesome

A clean, responsive, offline‑capable team generator. Paste participants, choose by team size or team count, optionally seed for reproducible results, and copy/share teams instantly. Built with vanilla code for reliability on GitHub Pages.

🚀 Try Random Team Generator | 📧 Contact Creator | 🐛 Report Issues

☕ Buy Me a Coffee

📋 Table of Contents
🌟 About the App
🎯 Core Features
🛠️ Tools Overview
🚀 Quick Start
💻 Tech Stack
📱 PWA Features
🎨 UI/UX Features
🔧 Development
📦 Deployment
🤝 Contributing
📞 Support
📄 License

🌟 About the App
Random Team Generator is a modern Progressive Web App (PWA) designed to split participants into balanced teams quickly. It’s optimized for mobile with iPhone safe‑area support and works offline after the first visit. No frameworks, no build steps—just fast, dependable vanilla web tech.

🎯 Core Features
📚 Team Generation Modes
• By Team Size – Specify members per team
• By Team Count – Specify number of teams
🔀 Randomization Controls
• Seeded Shuffle – Enter any seed for reproducible results
• Shuffle Toggle – Choose whether to randomize input
⚖️ Balancing
• Even Distribution – Round‑robin dealing to keep sizes close
📋 Output & Sharing
• Copy to Clipboard – Clean plain‑text teams
• Web Share – Share via native sheet where supported
💾 Persistence
• Auto‑Save – Inputs and options persist via localStorage
🌓 Appearance
• Dark Mode – Respects system preference
• Safe Areas – iPhone notch/home indicator aware

🛠️ Tools Overview
This repository currently includes the Random Team Generator tool. It’s engineered to be extendable for future utilities like counters or timers while staying dependency‑light.

🚀 Quick Start
Prerequisites
None. To test PWA features locally, serve over HTTP.

Local Run
```sh
# Python 3
python -m http.server 8000
# or Node (if installed)
npx http-server -p 8000
```
Open http://localhost:8000/

Note: Service Worker and install prompts do not work on file:// URLs.

💻 Tech Stack
Frontend
• HTML5 – Semantic, accessible structure
• CSS3 – Tailwind CDN + small custom CSS
• JavaScript – Vanilla ES modules
Icons & Fonts
• Font Awesome via CDNJS
PWA & Performance
• Service Worker – App‑shell precache + CDN runtime cache
• Web App Manifest – Installable, standalone display
• Lazy‑free – No framework/runtime overhead
Hosting
• GitHub Pages – Static hosting

📱 PWA Features
Installation & Offline
• Installable – Add to Home Screen on Android and iOS
• Offline Support – Works after first load
• Auto‑Updates – SW versioning with cache cleanup
Mobile Optimization
• Mobile‑First – Designed primarily for phones
• Safe‑Area Aware – Uses viewport‑fit=cover and env(safe-area-inset-*)
• Responsive Grid – Teams layout adapts for larger screens

🎨 UI/UX Features
Design System
• Tailwind Utilities – Minimal runtime config via CDN
• Custom UI Atoms – Buttons, fields, cards in `assets/css/styles.css`
Accessibility
• Labels, live regions, clear focus states
• Input modes optimized for mobile (numeric, text)
User Experience
• Fast interactions, small bundle, no build
• Copy/Share flows and persistent settings

🔧 Development
Project Structure
```
index.html                     # App shell
manifest.webmanifest           # PWA manifest
sw.js                          # Service worker (precache + runtime cache)
assets/
  css/
    styles.css                 # Custom styles (mobile-first, dark-mode tweaks)
  js/
    app.js                     # Team generator logic + UI wiring
    register-sw.js             # SW registration (GitHub Pages-friendly)
  icons/                       # Generated icons (Apple/Android, maskable)
```

Available Scripts
No build required. Use any static server for local testing (see Quick Start).

Code Notes
• Seeded RNG – Mulberry32 with FNV‑1a seed hashing
• Team Dealing – Round‑robin balancing or block fill
• Storage – localStorage with a single `rtg:v1` key
• CDN Caching – SW runtime cache for Tailwind and CDNJS

📦 Deployment
GitHub Pages (Recommended)
1) Push to GitHub
2) Settings → Pages → Deploy from Branch → `/ (root)`
3) Open: https://<user>.github.io/<repo>/

All asset paths are relative (`./`), so the app works under project subpaths.

Custom Domains
Add a `CNAME` file at repo root and configure DNS per GitHub Pages docs.

🤝 Contributing
Contributions are welcome! Please:
• Keep the footprint small and dependency‑free
• Match code style and naming
• Test mobile behavior and offline before PRs

📞 Support
• Issues: GitHub Issues in this repository
• Discussions: GitHub Discussions (if enabled)

📄 License
This project is licensed under the MIT License. See `LICENSE` for details.
