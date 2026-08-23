/**
 * Named camera poses.
 *
 * Routes do not load pages here — they move the camera. Each pose is a place in
 * the stage's volume, and navigating is a flight between them. Keeping poses in
 * one file rather than scattered across route components means the whole spatial
 * arrangement of the site is legible at a glance, and adjustable in one place.
 */
export interface Pose {
  position: [number, number, number];
  target: [number, number, number];
  /** Field of view. Narrower reads as more telephoto, flatter, more composed. */
  fov: number;
}

export const poses = {
  /** Wide and low. The whole field visible, nothing resolved. */
  home: { position: [0, 0, 14], target: [0, 0, 0], fov: 42 },
  /** Pulled right and up — the grid reads as a landscape being surveyed. */
  work: { position: [7.5, 2.5, 10], target: [0.5, 0, 0], fov: 38 },
  /** Close and centred. A single capture fills the frame. */
  project: { position: [0, 0.4, 5.5], target: [0, 0, 0], fov: 34 },
  /** Far back and flat. The stage recedes so the document can be read. */
  document: { position: [0, 0, 22], target: [0, 0, 0], fov: 30 },
  /** Offset left so the chat panel has somewhere to sit. */
  chat: { position: [-5, -1, 9], target: [1, 0, 0], fov: 40 },
} as const satisfies Record<string, Pose>;

export type PoseName = keyof typeof poses;

/** Route → pose. Longest prefix wins, so /work/[slug] beats /work. */
export function poseForPath(pathname: string): PoseName {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/work/")) return "project";
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/cv")) return "document";
  if (pathname.startsWith("/about")) return "document";
  if (pathname.startsWith("/chat")) return "chat";
  return "home";
}
