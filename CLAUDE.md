# Wild Labs

Design system and web properties for Eric Luttmann's Wild Labs — `wildeylabs.com`
(studio) and `ericluttmann.com` (personal, CV).

## ⚠️ These standards govern this repo — not the global ones

The Engineering & Design Standards in the global `~/.claude/CLAUDE.md` describe
the **Pillar** web app. They do **not** apply here, and several directly
contradict this project:

| Global (Pillar) | Wild Labs |
| --- | --- |
| Poppins / Roboto | **Archivo** (display) / **Switzer** (body) |
| ShadCN + Radix | Own primitives — `Glass`, `Text`, `Reveal` |
| Phosphor icons | No icon set yet; type and space carry hierarchy |
| `styles/tokens.css` | `packages/tokens` |

What still applies from the global file: the writing rules (expand acronyms on
first use), the no-left-edge-border-accents rule, the no `+`/`−`/`≈`-on-figures
rule, and the print/PDF pattern (`window.print()` + print CSS, not Puppeteer).

## The one idea

**A canvas that never unmounts. Glass chrome floating above it. Routes are
camera moves, not page loads.**

`<Stage>` and `<StageProvider>` live in the root layout, above the router, and
persist across every navigation. Routes do not mount or unmount the canvas —
they re-aim the camera via `poseForPath()`.

This is not decoration. Glass is invisible on a flat ground: refraction, the
specular rim, and the sense of depth all need something moving behind them. The
persistent canvas is what makes the material work, and it is what makes
navigation feel like movement through a place.

**Do not** mount a `<Canvas>` inside a page. There is one, and it is in the
layout.

## One corpus, three mediums

`packages/content` is the only place facts about Eric exist. It renders as:

1. the site (project grid, case studies)
2. the CV (`/cv`, print stylesheet → PDF)
3. the chat's retrieval corpus (`buildSystemPrompt()`)

There is no separate résumé document, and there must never be one — it would
drift, and the version a recruiter reads would stop matching what the chat says.

Adding a fact means editing `packages/content/src/data/*`. Never hardcode a
date, role, or metric into a component.

## Rules

- **Tokens or nothing.** No raw hex, no raw duration, no hand-rolled
  `backdrop-filter`. If a value isn't in `packages/tokens`, add it there first.
- **One physics system.** Three durations, two easings, one spring. Anything
  animating on its own numbers breaks the illusion — use `Reveal` / `Stagger`.
- **Glass only via `<Glass>`.** Three tiers: `sheer` (chrome), `panel`
  (content), `scrim` (modals).
- **Type only via `<Text>`.** `step` and `as` stay separate — heading level is
  document structure, visual size is design.
- **Reduced motion and reduced transparency are designed states**, not
  fallbacks. Some users get the opaque path every visit.
- **Server Components by default.** `"use client"` only for state, events, or
  browser APIs.
- **Relative imports are extensionless.** Workspace packages ship TS source and
  are bundled via `transpilePackages`; a `.js` specifier typechecks but breaks
  the bundler.
- **This repo is public.** No secrets, and no capture assets — splats are
  50–200MB and belong on object storage (see `.gitignore`).
- **Ask before**: new dependencies, a second app, changing the data contract in
  `packages/content`, or removing an existing token.

## Commands

```bash
pnpm dev         # all workspaces
pnpm build       # turbo build
pnpm typecheck   # tsc across every package — run before committing
```
