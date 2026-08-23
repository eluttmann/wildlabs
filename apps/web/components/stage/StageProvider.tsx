"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { poses, type Pose, type PoseName } from "./poses";

interface StageState {
  pose: Pose;
  poseName: PoseName | "custom";
  /** 0–1. Scales point density and drift — dial down behind dense reading. */
  intensity: number;
  setPose: (name: PoseName) => void;
  setCustomPose: (pose: Pose) => void;
  setIntensity: (value: number) => void;
}

const StageContext = createContext<StageState | null>(null);

/**
 * Camera state lives above the router.
 *
 * This provider sits in the root layout, so it survives every navigation. That
 * is what allows a route change to be a continuous camera move rather than an
 * unmount and remount — the canvas never learns that the page changed, it just
 * gets a new target to fly toward.
 */
export function StageProvider({ children }: { children: ReactNode }) {
  const [pose, setPoseState] = useState<Pose>(poses.home);
  const [poseName, setPoseName] = useState<PoseName | "custom">("home");
  const [intensity, setIntensity] = useState(1);

  const value = useMemo<StageState>(
    () => ({
      pose,
      poseName,
      intensity,
      setPose: (name) => {
        setPoseState(poses[name]);
        setPoseName(name);
      },
      setCustomPose: (next) => {
        setPoseState(next);
        setPoseName("custom");
      },
      setIntensity,
    }),
    [pose, poseName, intensity],
  );

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>;
}

export function useStage() {
  const context = useContext(StageContext);
  if (!context) throw new Error("useStage must be used inside <StageProvider>");
  return context;
}
