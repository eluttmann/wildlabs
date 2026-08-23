# Wild Labs

Design system and web properties for Eric Luttmann's Wild Labs — spatial
walkthroughs, grounded LLM chat, and a CV that prints itself.

> **Enable access to knowledge & creation via spatial AI** — ワイルド

## The idea

A canvas that never unmounts. Glass chrome floating above it. Routes are camera
moves, not page loads.

Glass has a dependency that is easy to miss until the page is built: it is
invisible on a flat ground. Refraction, the specular rim, the sense of depth —
none of it reads unless something is moving behind it. So the three things this
repo is for (spatial walkthroughs, Apple Glass UI, "fluid rather than static")
are not three features. They are one system.

`<Stage>` lives in the root layout, above the router, and survives every
navigation. Pages do not tear down the WebGL context and rebuild it — they
re-aim the camera. That continuity is what makes navigation feel like movement
through a place, and it is what gives the glass something to bend.

## One corpus, three mediums

`packages/content` is the only place facts about Eric exist. The same validated
records render three ways:

| Medium | Entry point |
| --- | --- |
| Site | `getProjects()`, `getProject(slug)` |
| CV / PDF | `getCv()` → `/cv` → `window.print()` |
| Chat grounding | `buildSystemPrompt()` → `/api/chat` |

Update a role once and all three move together. There is no separate résumé
file, by design.

## Layout

```
apps/web              Next.js 16 · App Router · React 19
packages/tokens       colour · type · motion · glass · space
packages/ui           Glass · Text · Reveal — the component system
packages/content      zod-validated corpus + selectors
```

## Design system

**Monochrome by rule.** There is no brand hue. The chrome is black and white so
a captured space is the only colour on screen. The neutral ramp is OKLCH with
zero chroma so every step is perceptually even — hex ramps drift warm through
the midtones, which shows badly under glass.

**Two families.** [Archivo](https://fonts.google.com/specimen/Archivo) (SIL Open
Font License) for display, [Switzer](https://www.fontshare.com/fonts/switzer)
(ITF Free Font License) for body. Archivo descends from American gothic —
squared, tight apertures, flat-cut terminals; Switzer is Helvetica-lineage,
warmer and more open. Indistinguishable in a paragraph, obviously different in
tracked caps at display size, which is where the contrast belongs. Archivo's
`wdth` axis (62–125) gives a compressed wordmark and an expanded display line
from one file. Both self-hosted — no runtime CDN.

**One physics system.** Three durations, two easing curves, one spring. Nothing
animates on a value outside `packages/tokens`.

**Glass, three tiers.** `sheer` (chrome) · `panel` (content) · `scrim` (modals).
Four stacked layers each — tint, blur+saturate, specular rim, boundary
refraction. Reduced-transparency and no-`backdrop-filter` paths are designed
states with their own contrast budget, not degradations.

## Getting started

```bash
pnpm install
cp .env.example .env.local     # add ANTHROPIC_API_KEY for /chat
pnpm dev
```

`pnpm typecheck` runs `tsc` across every package. Run it before committing.

## Before this goes public

- [ ] **Fix the dates.** `packages/content/src/data/projects.ts` has *inferred*
      start/end values. Names, summaries, roles and links are accurate; the
      dates are not. The chat is grounded in this file and the CV prints it.
- [ ] **Confirm the public email** in `data/person.ts`.
- [ ] **Move rate limiting off in-memory.** `lib/rate-limit.ts` is per-instance,
      so on serverless the real limit is (limit × live instances). Upstash Redis
      or Vercel KV before the endpoint is public and funded.
- [ ] **Decide the chat model.** Defaults to `claude-opus-5`; override with
      `WILDLABS_CHAT_MODEL`.
- [ ] **Wire real captures.** `<Capture>` loads Gaussian splats via drei's
      `<Splat>`. Assets go on object storage — never in this repo (see
      `.gitignore`). The procedural `<Field>` is the stand-in until then.

## Licence

MIT (code). Fonts carry their own licences — see
`apps/web/app/fonts/SWITZER-LICENSE.txt` and the SIL OFL for Archivo.
