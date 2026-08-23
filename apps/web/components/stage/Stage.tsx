"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { CameraRig } from "./CameraRig";
import { Field } from "./Field";
import { useStage } from "./StageProvider";
import { useThemeTone } from "./useThemeTone";

/**
 * The persistent stage.
 *
 * Mounted once in the root layout and never unmounted. Navigating does not tear
 * this down and rebuild it — the camera flies to a new pose while the same
 * WebGL context keeps running. That continuity is the whole architecture: it is
 * what makes routes feel like movement through a place rather than page loads,
 * and it is what gives the glass chrome something to refract, without which the
 * material is invisible.
 *
 * It sits at z-index 0 behind all content and is inert to the pointer, so it
 * never competes with the interface for input.
 */
export function Stage() {
  const { intensity } = useStage();
  const tone = useThemeTone();
  const [active, setActive] = useState(true);

  /**
   * Stop rendering when the tab is hidden. A continuously animating WebGL
   * canvas in a background tab is a real battery cost and buys nothing.
   */
  useEffect(() => {
    const sync = () => setActive(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        // Capped at 1.5: the field is thousands of soft-edged transparent points,
        // and full retina density triples the fill cost for no visible gain.
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 14], fov: 42, near: 0.1, far: 120 }}
      >
        <CameraRig />
        <Field tone={tone} intensity={intensity} />
      </Canvas>
    </div>
  );
}
