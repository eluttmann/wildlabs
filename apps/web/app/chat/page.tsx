import type { Metadata } from "next";
import { Text, Reveal } from "@wildlabs/ui";
import { ChatPanel } from "../../components/chat/ChatPanel";

export const metadata: Metadata = {
  title: "Chat",
  description: "Ask about Eric Luttmann's work. Grounded in his own records.",
};

export default function ChatPage() {
  return (
    <main className="mx-auto max-w-[46rem] px-[var(--wl-gutter)] pt-40 pb-32">
      <Reveal>
        <Text as="h1" step="display2">
          Ask
        </Text>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10">
          <ChatPanel />
        </div>
      </Reveal>
    </main>
  );
}
