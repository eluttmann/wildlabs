import { z } from "zod";

/**
 * One corpus, three mediums.
 *
 * Facts about Eric live here and nowhere else. The same records render as the
 * project grid, as the downloadable CV, and as the retrieval context the chat
 * is grounded in. Update a role once and all three move together.
 *
 * That last consumer is why this file is a schema rather than a set of loose
 * objects: a portfolio chat that invents a job title is worse than no chat, so
 * everything the model is allowed to assert has to be a validated field.
 */

export const linkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
});

export const captureSchema = z.object({
  /** Stable id. Also the asset key in object storage. */
  id: z.string(),
  kind: z.enum(["splat", "gltf", "video"]),
  /**
   * Absolute URL on object storage — never a repo path. Splat captures run
   * 50–200MB and this repo is public; see .gitignore.
   */
  src: z.string(),
  poster: z.string().optional(),
  /** Camera position the stage flies to when this capture is focused. */
  camera: z
    .object({
      position: z.tuple([z.number(), z.number(), z.number()]),
      target: z.tuple([z.number(), z.number(), z.number()]),
    })
    .optional(),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  /** One line. Appears in the grid and is what the chat quotes first. */
  summary: z.string().max(200),
  role: z.string(),
  /** Absent `end` means current. */
  start: z.string().regex(/^\d{4}(-\d{2})?$/),
  end: z.string().regex(/^\d{4}(-\d{2})?$/).optional(),
  org: z.string().optional(),
  /** Longer prose. Optional — the foundation ships without case studies. */
  body: z.string().optional(),
  /**
   * Verifiable specifics. These are what the chat is permitted to cite, so
   * anything vague or unverifiable does not belong here.
   */
  outcomes: z.array(z.string()).default([]),
  disciplines: z.array(z.string()).default([]),
  links: z.array(linkSchema).default([]),
  capture: captureSchema.optional(),
  /** Sort weight for the grid. Higher first. */
  weight: z.number().default(0),
  featured: z.boolean().default(false),
});

export const personSchema = z.object({
  name: z.string(),
  /** The tracked-caps line that anchors the whole brand. */
  statement: z.string(),
  bio: z.string(),
  location: z.string(),
  /** Katakana mark. ワイルド — "wairudo", wild. */
  mark: z.string(),
  email: z.string().email(),
  links: z.array(linkSchema).default([]),
  capabilities: z.array(z.string()).default([]),
});

export type Link = z.infer<typeof linkSchema>;
export type Capture = z.infer<typeof captureSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Person = z.infer<typeof personSchema>;
