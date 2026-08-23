export { personSchema, projectSchema, captureSchema, linkSchema } from "./schema";
export type { Person, Project, Capture, Link } from "./schema";

export {
  getPerson,
  getProjects,
  getProject,
  getProjectSlugs,
  getCaptures,
  getCv,
} from "./selectors";
export type { CvEntry } from "./selectors";

export { buildRetrievalCorpus, buildSystemPrompt } from "./corpus";
