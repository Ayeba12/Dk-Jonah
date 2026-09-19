import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    // The old /projects routes became /toolkit, with the tools renamed.
    return [
      { source: "/projects", destination: "/toolkit", permanent: true },
      { source: "/projects/energy-check-in", destination: "/toolkit/pace-energy-check", permanent: true },
      { source: "/projects/soft-week-planner", destination: "/toolkit/pace-week-planner", permanent: true },
      { source: "/projects/words-for-asking-for-help", destination: "/toolkit/words-for-asking-for-help", permanent: true },
      { source: "/projects/rest-without-guilt-prompts", destination: "/toolkit/rest-without-guilt-prompts", permanent: true },
      { source: "/projects/:slug", destination: "/toolkit", permanent: true },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "10011",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "10011",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
