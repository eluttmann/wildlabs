import type { Metadata } from "next";
import { getProjects } from "@wildlabs/content";
import { Text, Reveal, Stagger, StaggerItem } from "@wildlabs/ui";
import { ProjectCard } from "../../components/work/ProjectCard";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  const projects = getProjects();

  return (
    <main className="mx-auto max-w-[var(--wl-content)] px-[var(--wl-gutter)] pt-40 pb-32">
      <Reveal>
        <Text as="h1" step="display2">
          Work
        </Text>
      </Reveal>

      <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </main>
  );
}
