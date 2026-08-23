"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { poseForPath } from "./poses";
import { useStage } from "./StageProvider";

/**
 * Binds the router to the camera.
 *
 * Mounted once in the layout rather than per-page: a page-level hook would fire
 * after that page's own mount animation had already started, so the camera
 * would lag the content. Here it fires the moment the path changes.
 */
export function useRoutePose() {
  const pathname = usePathname();
  const { setPose, setIntensity } = useStage();

  useEffect(() => {
    const name = poseForPath(pathname);
    setPose(name);
    // Long-form reading surfaces get a quieter stage behind them.
    setIntensity(name === "document" ? 0.35 : 1);
  }, [pathname, setPose, setIntensity]);
}
