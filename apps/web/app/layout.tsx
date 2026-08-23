import type { Metadata, Viewport } from "next";
import { GlassFilters } from "@wildlabs/ui";
import { getPerson } from "@wildlabs/content";
import { archivo, switzer } from "./fonts";
import { Stage } from "../components/stage/Stage";
import { StageProvider } from "../components/stage/StageProvider";
import { StageRouteBinding } from "../components/chrome/StageRouteBinding";
import { SmoothScroll } from "../components/chrome/SmoothScroll";
import { Nav } from "../components/chrome/Nav";
import "./globals.css";

const person = getPerson();

export const metadata: Metadata = {
  title: {
    default: `${person.name} — Wild Labs`,
    template: `%s — Wild Labs`,
  },
  description: person.bio,
  metadataBase: new URL("https://wildeylabs.com"),
  openGraph: {
    title: `${person.name} — Wild Labs`,
    description: person.bio,
    type: "website",
  },
};

export const viewport: Viewport = {
  /**
   * Both schemes declared so the browser paints its own chrome to match before
   * the page renders — otherwise a dark-mode visitor gets a white flash.
   */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
  ],
};

/**
 * The root layout is the stage.
 *
 * <StageProvider> and <Stage> live here, above the router, so they persist
 * across every navigation. Nothing below this file ever unmounts the canvas —
 * routes only re-aim the camera. That persistence is the architecture: it makes
 * navigation feel like movement rather than page loading, and it keeps
 * something alive behind the glass, without which the material is invisible.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${switzer.variable}`}>
      <head>
        {/*
          Applied before paint so a stored dark choice never flashes light.
          Inline and synchronous by necessity — any deferred script is too late.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("wl-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        <StageProvider>
          <StageRouteBinding />
          <Stage />
          {/* Displacement filters for the glass lens. Mounted once. */}
          <GlassFilters />
          <SmoothScroll />
          <Nav />
          <div className="wl-page">{children}</div>
        </StageProvider>
      </body>
    </html>
  );
}
