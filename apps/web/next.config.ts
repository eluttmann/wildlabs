import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Workspace packages ship TypeScript source rather than a build artefact.
   * One less build step, and edits in packages/* hot-reload straight into the
   * app instead of requiring a rebuild to show up.
   */
  transpilePackages: ["@wildlabs/ui", "@wildlabs/tokens", "@wildlabs/content"],
};

export default nextConfig;
