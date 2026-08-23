"use client";

import { useRoutePose } from "../stage/useRoutePose";

/**
 * Calls the route→camera binding from inside the provider.
 *
 * Exists only because the root layout is a server component and the hook needs
 * a client boundary that still sits under <StageProvider>.
 */
export function StageRouteBinding() {
  useRoutePose();
  return null;
}
