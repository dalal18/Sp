# SpaceShield

**SpaceShield — AI-Powered Satellite Cybersecurity Monitoring System** is a bilingual English/Arabic educational prototype for the University of Hafr Al Batin's World Space Week 2026 student innovation project.

The site is intentionally safe: all telemetry and security scenarios are synthetic, reversible, and browser-only. It does not connect to satellites, ground stations, or real infrastructure.

## What is included

- Futuristic satellite cybersecurity control-center homepage
- English / Arabic language toggle with LTR / RTL layout switching
- Simulated satellite health, link quality, alerts, threat level, and communication chart
- Interactive Satellite Cybersecurity Map with Earth, orbit rings, synthetic satellites, ground stations, animated communication paths, zoom, pan, and click-to-inspect details
- Live-looking activity log with safe scenario responses
- Three reversible scenarios: unauthorized command, suspicious communication pattern, and unknown ground-station login
- Scenario-aware map states: red threat paths, amber review paths, node callouts, and a synchronized incident banner
- Academic project brief with editable student details
- Responsive layout for phones, tablets, and laptops
- Project-specific logo and favicon

## Edit your academic details

Open `client/src/App.tsx` and update the placeholder values in the `studentDetails` section:

- `[Your full name]`
- `[College / Cybersecurity department]`
- `[Course · supervisor · section]`

The main English and Arabic copy is kept in the `copy` object near the top of the same file, so labels and content can be edited without changing the component structure.

The map implementation lives in `client/src/components/SatelliteCybersecurityMap.tsx`. It is fully synthetic and browser-only. Scenario state is passed from `App.tsx`, so running a scenario updates the map immediately without any external API or satellite connection.

## Run locally

This project uses the initialized Web Dev React/Vite setup and pnpm.

```bash
pnpm install
pnpm dev:static
```

Then open `http://localhost:3000`.

Useful checks:

```bash
pnpm check
pnpm build:static
```

## Publish

The project is configured for static publication. In a Web Dev project, save a checkpoint after editing, then use the project's **Publish** action. The static build command is `pnpm build:static` and the output directory is `dist/public`.

Keep `client/public/manus-routes.json` synchronized if you add more page routes. The logo branding metadata lives in `app.config.ts`.
