import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjectSlugs } from "@wildlabs/content";
import { Glass, Text, Reveal } from "@wildlabs/ui";

interface Params {
  params: Promise<{ slug: string }>;
}

/** Static params for all nine projects — the corpus is the routing table. */
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const period = project.end ? `${project.start}–${project.end}` : `${project.start}–Present`;

  return (
    <main className="mx-auto max-w-[var(--wl-content)] px-[var(--wl-gutter)] pt-40 pb-32">
      <Reveal>
        <Link href="/work" className="wl-type no-underline" data-step="label" data-tone="subtle">
          ← Work
        </Link>
      </Reveal>

      <Reveal delay={0.06}>
        <Text as="h1" step="display2" className="mt-8">
          {project.name}
        </Text>
      </Reveal>

      <Reveal delay={0.12}>
        <Text step="bodyLarge" tone="muted" measure className="mt-8">
          {project.summary}
        </Text>
      </Reveal>

      <Reveal delay={0.18}>
        <Glass tier="panel" className="mt-12 grid gap-6 p-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Text as="span" step="label" tone="subtle">
              Role
            </Text>
            <Text step="bodySmall">{project.role}</Text>
          </div>
          <div className="flex flex-col gap-2">
            <Text as="span" step="label" tone="subtle">
              Period
            </Text>
            <Text step="bodySmall">{period}</Text>
          </div>
          <div className="flex flex-col gap-2">
            <Text as="span" step="label" tone="subtle">
              Disciplines
            </Text>
            <Text step="bodySmall">{project.disciplines.join(", ")}</Text>
          </div>
        </Glass>
      </Reveal>

      {project.body ? (
        <Reveal delay={0.24}>
          <Text step="body" measure className="mt-12">
            {project.body}
          </Text>
        </Reveal>
      ) : null}

      {project.links.length > 0 ? (
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <Glass
                key={link.href}
                as="a"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                tier="sheer"
                interactive
                className="wl-type rounded-[var(--wl-radius-full)] px-5 py-2.5 no-underline"
                data-step="label"
              >
                {link.label}
              </Glass>
            ))}
          </div>
        </Reveal>
      ) : null}
    </main>
  );
}
