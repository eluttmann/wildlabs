import type { Metadata } from "next";
import { getPerson } from "@wildlabs/content";
import { Glass, Text, Reveal } from "@wildlabs/ui";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const person = getPerson();

  return (
    <main className="mx-auto max-w-[var(--wl-content)] px-[var(--wl-gutter)] pt-40 pb-32">
      <Reveal>
        <Text as="span" step="label" tone="subtle">
          {person.mark}
        </Text>
      </Reveal>

      <Reveal delay={0.06}>
        <Text as="h1" step="display2" className="mt-6">
          {person.statement}
        </Text>
      </Reveal>

      <Reveal delay={0.12}>
        <Text step="bodyLarge" tone="muted" measure className="mt-10">
          {person.bio}
        </Text>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-12 flex flex-wrap gap-3">
          {person.links.map((link) => (
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
    </main>
  );
}
