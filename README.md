<div align="center">

# AI‑Free Random Team Generator

[![Live Demo](https://img.shields.io/badge/live-demo-0ea5e9?logo=githubpages&logoColor=white)](https://uruchev.github.io/Random-Team-Generator/)
[![View App](https://img.shields.io/badge/view-app-0ea5e9)](https://uruchev.github.io/Random-Team-Generator/)
[![PWA](https://img.shields.io/badge/pwa-ready-brightgreen)](#-pwa-features)
[![HTML5](https://img.shields.io/badge/HTML5-%23e34f26)](#-tech-stack)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6)](#-tech-stack)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-%23f7df1e)](#-tech-stack)
[![Tailwind](https://img.shields.io/badge/Tailwind-CDN-%230ea5e9)](#-tech-stack)
[![Font%20Awesome](https://img.shields.io/badge/Font%20Awesome-6.x-%230079f2)](#-tech-stack)

A lightweight, mobile‑first, offline‑capable team generator. Paste names, choose by team size or team count, optionally add a seed for reproducible results, and copy/share instantly. Built with vanilla web tech to run flawlessly on GitHub Pages.

🔗 [Try the App Now](https://uruchev.github.io/Random-Team-Generator/) · 📬 [Contact Creator](https://github.com/Uruchev) · 🐛 [Report Issues](https://github.com/Uruchev/Random-Team-Generator/issues)

---

☕ <a href="#">Buy Me a Coffee</a>

</div>

## 📋 Table of Contents

- 🌟 [About the App](#-about-the-app)
- 🎯 [Core Features](#-core-features)
- 🛠️ [Tools Overview](#%EF%B8%8F-tools-overview)
- 🚀 [Quick Start](#-quick-start)
- 💻 [Tech Stack](#-tech-stack)
- 📱 [PWA Features](#-pwa-features)
- 🎨 [UI/UX Features](#-uiux-features)
- 🔧 [Development](#-development)
- 📦 [Deployment](#-deployment)
- 🤝 [Contributing](#-contributing)
- 📞 [Support](#-support)
- 📄 [License](#-license)

---

## 🌟 About the App

Random Team Generator is a modern Progressive Web App (PWA) that creates balanced teams from a list of participants. It’s optimized for mobile (with iPhone safe‑area handling) and works offline after the first visit. No frameworks or build steps—just fast, dependable vanilla web tech.

---

## 🎯 Core Features

### 📚 Team Generation Modes
- Visual mode switch: by team size or by team count
- Intelligent input parsing (lines or commas)

### 🔀 Randomization Controls
- Seeded shuffle for reproducible results
- Optional shuffle toggle (keep original order when needed)

### ⚖️ Balancing
- Round‑robin dealing keeps team sizes even
- Optional block‑fill with graceful leftover distribution

### 📋 Output & Sharing
- One‑click Copy (plain text)
- Web Share Sheet where supported (mobile‑friendly)

### 💾 Persistence
- Auto‑save all inputs and options via `localStorage`

### 🌓 Appearance
- Dark mode via `prefers-color-scheme`
- Safe‑area aware (iPhone notch and home indicator)

---

## 🛠️ Tools Overview

This repository currently includes the Random Team Generator tool. The codebase is organized to stay dependency‑free and can be extended with small utilities (e.g., counters or timers) without adding frameworks.

---

## 🚀 Quick Start

### Prerequisites
None. For PWA features, run over HTTP.

### Local Run
```sh
# Python 3
python -m http.server 8000
# or Node (if installed)
npx http-server -p 8000
```
Open http://localhost:8000/

Note: Service Worker and install prompts do not work on `file://` URLs.

---

## 💻 Tech Stack

### Frontend
- HTML5 (semantic structure)
- CSS3 (Tailwind via CDN + small custom CSS)
- JavaScript (Vanilla ES modules)

### Icons & Fonts
- Font Awesome via CDNJS

### PWA & Performance
- Service Worker (app‑shell precache + CDN runtime cache)
- Web App Manifest (installable, standalone)
- Zero framework/runtime overhead

### Hosting
- GitHub Pages (static hosting)

---

## 📱 PWA Features

### Installation & Offline
- Installable on Android and iOS
- Offline after first load
- Auto‑updates with SW versioning + cache cleanup

### Mobile Optimization
- Mobile‑first layout
- `viewport-fit=cover` + `env(safe-area-inset-*)`
- Responsive grid for larger screens

---

## 🎨 UI/UX Features

### Design System
- Tailwind utilities (runtime config via CDN)
- Custom atoms: buttons, fields, cards in `assets/css/styles.css`

### Accessibility
- Labels, live regions, focus states
- Mobile‑optimized input modes

### User Experience
- Fast interactions, tiny bundle, no build
- Copy/Share flows and persistent settings

---

## 🔧 Development

### Project Structure
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

### Code Notes
- Seeded RNG: Mulberry32 with FNV‑1a seed hashing
- Dealing: round‑robin balancing or block fill
- Storage: `localStorage` under `rtg:v1`
- CDN caching: Tailwind + CDNJS via SW runtime cache

---

## 📦 Deployment

### GitHub Pages (Recommended)
1. Push to GitHub
2. Settings → Pages → Deploy from Branch → `/ (root)`
3. Open: https://uruchev.github.io/Random-Team-Generator/

All asset paths are relative (`./`), so the app works under project subpaths.

### Custom Domains
Add a `CNAME` file at repo root and configure DNS per GitHub Pages docs.

---

## 🤝 Contributing

Contributions are welcome! Please:
- Keep the footprint small and dependency‑free
- Match code style and naming
- Test mobile behavior and offline before PRs

---

## 📞 Support

- Issues: [Open an issue](https://github.com/Uruchev/Random-Team-Generator/issues)
- Creator: [@Uruchev](https://github.com/Uruchev)

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details.
