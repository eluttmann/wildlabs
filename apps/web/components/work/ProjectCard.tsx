import Link from "next/link";
import { Glass, Text } from "@wildlabs/ui";
import type { Project } from "@wildlabs/content";

/**
 * One project, as a glass pane.
 *
 * The whole card is the link rather than a "read more" affordance — a card that
 * looks pressable and is not is the most common small betrayal in a portfolio
 * grid.
 */
export function ProjectCard({ project }: { project: Project }) {
  const period = project.end ? `${project.start}–${project.end}` : `${project.start}–Present`;

  return (
    <Glass
      as={Link}
      href={`/work/${project.slug}`}
      tier="panel"
      interactive
      className="group flex flex-col gap-3 p-6 no-underline md:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <Text as="span" step="label" tone="subtle">
          {period}
        </Text>
        <Text as="span" step="label" tone="subtle">
          {project.disciplines[0] ?? ""}
        </Text>
      </div>

      <Text as="h3" step="title1">
        {project.name}
      </Text>

      <Text step="body" tone="muted" measure>
        {project.summary}
      </Text>

      <Text as="span" step="label" tone="subtle" className="mt-2">
        {project.role}
      </Text>
    </Glass>
  );
}
