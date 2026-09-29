# SpaceShield design brief

## Design direction
**Orbital Sentinel / Mission Control Noir** — a cinematic but credible satellite security control center for an academic prototype. The interface should feel like a calm flight deck: dark, spacious, high-contrast, with cyan telemetry and amber/red incident signals reserved for meaning.

## Design movement
Neo-mission-control: observability dashboards, restrained glass panels, thin technical rules, and high-clarity status communication over a deep-space field.

## Core principles
1. **Signal over spectacle** — decorative motion stays subtle so the simulated telemetry reads first.
2. **Evidence-minded** — every scenario explains the synthetic event and the response.
3. **Academic confidence** — polished enough for evaluation, explicit about prototype limits.
4. **Bilingual parity** — Arabic is not an afterthought; layout direction and labels change with the language.

## Color philosophy
Near-black navy (`#050912`) and ink (`#091322`) hold the canvas. Electric cyan (`#63e6ff`) and blue (`#4d7cff`) are the primary system accents. Mint (`#7ff3c7`) signals healthy telemetry. Amber (`#f5b94c`) and coral (`#ff6b6b`) are reserved for simulated threat states. Borders use translucent blue-white lines rather than heavy shadows.

## Layout paradigm
A single long-form control room: sticky top navigation, cinematic hero, live telemetry dashboard, scenario simulator, academic brief, and a compact footer. The dashboard uses asymmetric grid cards with clear hierarchy and responsive stacking on narrow screens.

## Signature elements
- A CSS-rendered orbital Earth with a moving cyan scan ring.
- A satellite silhouette with a solar-panel grid and pulsing signal rings.
- Star-field particles and small orbital markers.
- Mission chips, signal bars, status badges, and event timeline rows.
- Monospace micro-labels paired with a clean editorial sans for readability.

## Interaction philosophy
Every button should produce an immediate, legible state change. Scenarios are safe and synthetic; triggering one adds a timestamped activity event, raises the simulated alert count, changes the threat badge, and reveals a response note. Reset restores the baseline. Navigation scrolls to real sections, and the language toggle flips all primary content plus `dir`.

## Animation
Use low-amplitude ambient drift, scanning lines, orbit rotation, and pulsing status dots. Respect `prefers-reduced-motion` by disabling continuous animation while preserving readable state transitions.

## Typography system
Use `Space Grotesk` for display and UI headings, `IBM Plex Mono` for telemetry labels, and a system Arabic fallback stack for Arabic readability. Large display titles are tight and bright; supporting text uses a muted blue-gray.

## Brand essence
**Protect the signal. Explain the signal.** SpaceShield turns invisible satellite cyber risk into an understandable learning surface.

## Brand voice
Clear, composed, technically literate, and honest about boundaries. Avoid inflated claims, invented accuracy, or implying access to live satellites.

## Wordmark / logo
A flat filled shield silhouette containing an orbital slash and a small satellite dot. The negative space suggests both protection and an orbital path. The header uses a compact mark plus the SpaceShield wordmark; the favicon uses the same high-contrast symbol.

## Signature brand color
Electric cyan `#63e6ff`.

## Asset placements
- `client/public/hero-space.jpg`: one atmospheric hero visual used as a low-opacity background layer behind the hero telemetry copy.
- `client/public/spaceshield-logo.png`: the flat project icon used in the header and favicon.
