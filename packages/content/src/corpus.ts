import { getCv, getPerson, getProjects } from "./selectors";

/**
 * The chat's grounding.
 *
 * A portfolio chatbot that hallucinates someone's career is a liability, not a
 * feature. This serialises the *validated* corpus into the system prompt so the
 * model answers from records rather than from what it half-remembers about a
 * person with this name.
 *
 * Small enough to send whole — nine projects is a few hundred tokens, so vector
 * search would add infrastructure and a retrieval-miss failure mode to buy
 * nothing. Revisit when case-study bodies land and this clears a few thousand
 * tokens; at that point chunk by project and retrieve the top matches.
 */
export function buildRetrievalCorpus(): string {
  const p = getPerson();
  const { entries } = getCv();

  const header = [
    `NAME: ${p.name}`,
    `STATEMENT: ${p.statement}`,
    `LOCATION: ${p.location}`,
    `BIO: ${p.bio}`,
    `CAPABILITIES: ${p.capabilities.join(", ")}`,
  ].join("\n");

  const work = entries
    .map((e) => {
      const lines = [
        `## ${e.name}${e.org ? ` (${e.org})` : ""}`,
        `Role: ${e.role}`,
        `Period: ${e.period}`,
        `Summary: ${e.summary}`,
      ];
      if (e.outcomes.length > 0) lines.push(`Outcomes: ${e.outcomes.join("; ")}`);
      return lines.join("\n");
    })
    .join("\n\n");

  const links = getProjects()
    .flatMap((proj) => proj.links.map((l) => `${proj.name} — ${l.label}: ${l.href}`))
    .join("\n");

  return `${header}\n\n# WORK\n\n${work}\n\n# LINKS\n\n${links}`;
}

/**
 * The behavioural half of the grounding.
 *
 * The refusal instruction is the important line. Without it the model fills
 * gaps in a sparse corpus with plausible invention, which on a CV surface is
 * the one failure mode that actually costs something.
 */
export function buildSystemPrompt(): string {
  return [
    `You answer questions about ${getPerson().name}'s work on his portfolio site.`,
    "",
    "Rules:",
    "- Answer only from the RECORDS below. They are the complete source of truth.",
    "- If something is not in the records, say you don't have that detail and suggest what is there. Never infer, estimate, or fill a gap.",
    "- Never invent dates, employers, titles, metrics, or clients.",
    "- Be brief. Two or three sentences unless asked for depth.",
    "- Write in a plain, direct voice. No marketing language, no bullet-point résumé dumps.",
    "- Refer to him as Eric.",
    "",
    "RECORDS:",
    "",
    buildRetrievalCorpus(),
  ].join("\n");
}
