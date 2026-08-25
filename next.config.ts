import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Next guess the wrong workspace root.
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
};

export default nextConfig;
