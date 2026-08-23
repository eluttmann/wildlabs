import { getPerson, getProjects } from "@wildlabs/content";
import { Text, Reveal, Stagger, StaggerItem } from "@wildlabs/ui";
import { ProjectCard } from "../components/work/ProjectCard";

/**
 * The landing page.
 *
 * A fluid reading of ericluttmann.com: the same statement, the same katakana
 * mark, the same reverse-chronological work — but set over a live field instead
 * of a flat ground, with the type doing the work the colour is not allowed to.
 */
export default function HomePage() {
  const person = getPerson();
  const featured = getProjects({ featuredOnly: true });
  const year = new Date().getFullYear();

  return (
    <main className="px-[var(--wl-gutter)] pb-32">
      {/* Hero. Full viewport so the stage reads as depth before any copy lands. */}
      <section className="flex min-h-[100svh] flex-col justify-center pt-32">
        <Reveal>
          <Text as="span" step="label" tone="subtle">
            {person.mark} — © {year}, {person.name}
          </Text>
        </Reveal>

        <Reveal delay={0.08}>
          {/*
            The statement, set as the page's h1 in tracked Archivo caps. This is
            the brand gesture the whole system is arranged around.
          */}
          <Text as="h1" step="display1" className="mt-6 max-w-[16ch]">
            {person.statement}
          </Text>
        </Reveal>

        <Reveal delay={0.16}>
          <Text step="bodyLarge" tone="muted" measure className="mt-10">
            {person.bio}
          </Text>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[var(--wl-content)] pt-16">
        <Reveal>
          <Text as="h2" step="label" tone="subtle" className="mb-8">
            Selected work
          </Text>
        </Reveal>

        <Stagger className="grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </main>
  );
}
