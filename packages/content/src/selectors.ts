import { person } from "./data/person";
import { projects } from "./data/projects";
import type { Capture, Project } from "./schema";

const byWeight = (a: Project, b: Project) => b.weight - a.weight;

export function getPerson() {
  return person;
}

export function getProjects(options: { featuredOnly?: boolean } = {}): Project[] {
  const list = options.featuredOnly ? projects.filter((p) => p.featured) : projects;
  return [...list].sort(byWeight);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

/** Every capture the stage can fly to, keyed by the project that owns it. */
export function getCaptures(): Array<{ slug: string; capture: Capture }> {
  return projects
    .filter((p): p is Project & { capture: Capture } => p.capture !== undefined)
    .map((p) => ({ slug: p.slug, capture: p.capture }));
}

export interface CvEntry {
  name: string;
  org?: string;
  role: string;
  period: string;
  summary: string;
  outcomes: string[];
}

/**
 * The CV view of the same records.
 *
 * No separate résumé document exists — if it did, the two would drift, and the
 * version a recruiter reads would stop matching the one the chat answers from.
 */
export function getCv(): { person: typeof person; entries: CvEntry[] } {
  const entries = [...projects].sort(byWeight).map((p) => ({
    name: p.name,
    org: p.org,
    role: p.role,
    period: p.end ? `${p.start}–${p.end}` : `${p.start}–Present`,
    summary: p.summary,
    outcomes: p.outcomes,
  }));

  return { person, entries };
}
