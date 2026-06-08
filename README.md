# CPBRA App

CPBRA App is a Lit/Web Components single-page app for a pickup basketball park or recreation league. It includes a hero section, sticky navigation, routed pages, court status cards, schedule data, a gallery, signup flow, and reusable CPBRA-branded UI components.

## Tech Stack

- JavaScript
- Lit
- HAX / DDD design system utilities
- Web Components
- Vercel-compatible static JSON data
- OpenWC-style build and test tooling

## Features

- Client-side route handling for home, schedule, join, and gallery views
- Reusable custom elements for navigation, courts, schedules, signup, gallery, footer, and scroll controls
- Local app state for court queue updates after player signup
- JSON-backed schedule, menu, and media data
- Responsive layout and dark-mode-aware styling

## Run Locally

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Project Status

This is the strongest software engineering portfolio project in this account, but it still needs polish before being pinned or listed on a resume.

Recommended next improvements:

- Add screenshots and a live demo link.
- Add real tests for routing, signup events, and schedule rendering.
- Replace any external placeholder images with stable local assets.
- Expand this README with a short architecture section and deployment notes.
