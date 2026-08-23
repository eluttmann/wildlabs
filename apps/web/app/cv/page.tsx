import type { Metadata } from "next";
import { getCv } from "@wildlabs/content";
import { Text, Reveal } from "@wildlabs/ui";
import { PrintButton } from "../../components/cv/PrintButton";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae — Eric Luttmann",
};

/**
 * The CV is a view of the corpus, not a separate document.
 *
 * There is no résumé file anywhere in this repo. If there were, it would drift
 * from the site, and the version a recruiter reads would stop matching the one
 * the chat answers from. Same records, three renderings.
 */
export default function CvPage() {
  const { person, entries } = getCv();

  return (
    <main className="mx-auto max-w-[52rem] px-[var(--wl-gutter)] pt-40 pb-32 print:pt-0">
      <Reveal>
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <Text as="h1" step="display2">
              {person.name}
            </Text>
            <Text step="body" tone="muted" className="mt-3">
              {person.statement}
            </Text>
            <Text as="p" step="label" tone="subtle" className="mt-4">
              {person.location} · {person.email}
            </Text>
          </div>
          <PrintButton name={person.name} />
        </header>
      </Reveal>

      <Reveal delay={0.08}>
        <Text step="body" measure className="mt-10">
          {person.bio}
        </Text>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="mt-14">
          <Text as="h2" step="label" tone="subtle">
            Capabilities
          </Text>
          <Text step="body" className="mt-3">
            {person.capabilities.join(" · ")}
          </Text>
        </section>
      </Reveal>

      <section className="mt-14">
        <Reveal>
          <Text as="h2" step="label" tone="subtle">
            Experience
          </Text>
        </Reveal>

        <div className="mt-6 flex flex-col">
          {entries.map((entry, index) => (
            <Reveal key={`${entry.name}-${entry.period}`} delay={Math.min(index * 0.04, 0.24)}>
              <article className="border-t border-[var(--wl-line)] py-6 break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <Text as="h3" step="title2">
                    {entry.name}
                    {entry.org ? (
                      <Text as="span" step="title2" tone="muted">
                        {` — ${entry.org}`}
                      </Text>
                    ) : null}
                  </Text>
                  <Text as="span" step="label" tone="subtle">
                    {entry.period}
                  </Text>
                </div>

                <Text step="label" tone="subtle" className="mt-2">
                  {entry.role}
                </Text>

                <Text step="body" tone="muted" className="mt-3">
                  {entry.summary}
                </Text>

                {entry.outcomes.length > 0 ? (
                  <ul className="mt-3 flex list-none flex-col gap-1 p-0">
                    {entry.outcomes.map((outcome) => (
                      <li key={outcome}>
                        <Text as="span" step="bodySmall" tone="muted">
                          {outcome}
                        </Text>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <footer className="mt-14 border-t border-[var(--wl-line)] pt-6">
          <Text step="label" tone="subtle">
            {person.links.map((link) => link.href.replace(/^https?:\/\//, "")).join(" · ")}
          </Text>
        </footer>
      </Reveal>
    </main>
  );
}
