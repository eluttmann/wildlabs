"use client";

import { Splat } from "@react-three/drei";
import { Suspense } from "react";
import type { Capture as CaptureRecord } from "@wildlabs/content";

/**
 * A real captured space on the stage.
 *
 * Gaussian splats are the substrate this site is designed around — photoreal
 * scanned rooms, which is both Eric's actual domain and the one thing that
 * makes a monochrome interface worth building: the chrome is black and white so
 * the capture is the only colour on screen.
 *
 * `src` always points at object storage, never at the repo. A single capture
 * runs 50–200MB and this repository is public — see .gitignore.
 */
export function Capture({ record }: { record: CaptureRecord }) {
  if (record.kind !== "splat") return null;

  return (
    <Suspense fallback={null}>
      <Splat src={record.src} alphaTest={0.1} />
    </Suspense>
  );
}
