# Content

Centralised source for Eric Luttmann's experience. Everything the CV and the
portfolio say about his career comes from here.

## Why this exists

The résumé and the website used to be separate documents, and they drifted —
the site called a job "Marble", the résumé called it "MKThink", and the dates
disagreed. One source, two renderings, no drift.

## Layout

```
content/
├── profile.md            identity, contact, purpose lines
├── skills.md             the skills matrix
├── education.md          degree, certifications, fellowship
├── experience/           the pool — one file per role
└── cv/                   variants — which roles, which bullets, what order
```

## Two forms, one file

Every role in `experience/` carries the same facts twice, because the two
surfaces need different registers:

| Section | For | Register |
| --- | --- | --- |
| `## Narrative` | the website | Prose. Third person. Two to four sentences. Reads as writing. |
| `## Bullets` | the résumé | Terse, metric-led, one line each. Scannable in six seconds. |

They live in the same file on purpose. Split across two trees they drift within
a month; side by side you cannot edit one without seeing the other.

## Trust levels

Each file's frontmatter carries a `status`:

- `verified` — taken verbatim from a résumé Eric wrote. Trust it.
- `draft` — written here and **not yet checked by Eric**. The narrative sections
  are all `draft` until he says otherwise.

Bullets are verbatim source. Narrative is a first pass to react to, not to ship.

## Variants

`cv/*.md` files do not contain copy. They *select* — which roles appear, which
bullets, in what order, and which purpose line. That way a new target résumé is
a filter over the pool rather than another document that can go stale.

## House rules

Two things this pool deliberately does **not** do, which the render layer must:

1. **Keep verbatim figures.** Bullets preserve the source exactly — `10M+ ARR`,
   `250+ interviews`, `50+ 3D modelers`. Fidelity to what Eric wrote matters
   more here than house style.
2. **Strip the glyphs at render.** Published surfaces (site, PDF, chat) must not
   put `+`, `−` or `≈` on a figure — say "more than $10M" in words. That
   transformation belongs to whatever renders this, not to the source.

## Sources

Merged from two résumés, both written by Eric:

| File | Dated | Aimed at |
| --- | --- | --- |
| `resume_Luttmann_Datagrid 2025.pdf` | Sept 2025 | Datagrid — connected agents |
| `resume_Luttmann_Omniverse_2025.pdf` | earlier 2025 | Nvidia Omniverse — digital twin |

Where they disagree, the more recent Datagrid wording wins and the alternative
is kept under `## Alternate framings` — those differences are usually a
deliberate re-aim at a different audience, and worth keeping.
