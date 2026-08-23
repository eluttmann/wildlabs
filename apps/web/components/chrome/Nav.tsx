"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Glass, Text, cn } from "@wildlabs/ui";
import { getPerson } from "@wildlabs/content";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/cv", label: "CV" },
  { href: "/chat", label: "Chat" },
] as const;

/**
 * The floating chrome.
 *
 * A sheer glass bar rather than a solid header — the field has to stay visible
 * through it, both because that is what the material needs to read as glass and
 * because an opaque bar would cut the stage off at the top of every page.
 */
export function Nav() {
  const pathname = usePathname();
  const person = getPerson();

  return (
    <Glass
      as="nav"
      tier="sheer"
      data-print="hide"
      className={cn(
        "fixed top-[max(1rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2",
        "z-[var(--wl-z-chrome)] flex items-center gap-6 md:gap-10",
        "rounded-[var(--wl-radius-full)] px-5 py-2.5 md:px-7 md:py-3",
        "w-[calc(100%-2rem)] max-w-[46rem] justify-between",
      )}
    >
      <Link
        href="/"
        className="flex items-baseline gap-2.5 no-underline"
        aria-label={`${person.name} — home`}
      >
        <Text as="span" step="wordmark">
          Wild Labs
        </Text>
        {/* ワイルド — "wairudo". The mark, carried at metadata weight. */}
        <Text as="span" step="label" tone="subtle" aria-hidden="true">
          {person.mark}
        </Text>
      </Link>

      <div className="flex items-center gap-4 md:gap-6">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "wl-type no-underline transition-colors duration-[var(--wl-duration-quick)]",
                active
                  ? "text-[var(--wl-text)]"
                  : "text-[var(--wl-text-muted)] hover:text-[var(--wl-text)]",
              )}
              data-step="label"
            >
              {link.label}
            </Link>
          );
        })}
        <span aria-hidden="true" className="h-3 w-px bg-[var(--wl-line)]" />
        <ThemeToggle />
      </div>
    </Glass>
  );
}
