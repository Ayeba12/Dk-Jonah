import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    // The old /projects routes became /toolkit, with the tools renamed.
    return [
      // The Vercel address serves a copy of the site. Send it to the real domain so there is one copy to index.
      {
        source: "/:path*",
        has: [{ type: "host", value: "dk-jonah.vercel.app" }],
        destination: "https://www.dkjonah.com/:path*",
        permanent: true,
      },
      { source: "/projects", destination: "/toolkit", permanent: true },
      { source: "/projects/energy-check-in", destination: "/toolkit/pace-energy-check", permanent: true },
      { source: "/projects/soft-week-planner", destination: "/toolkit/pace-week-planner", permanent: true },
      { source: "/projects/words-for-asking-for-help", destination: "/toolkit/words-for-asking-for-help", permanent: true },
      { source: "/projects/rest-without-guilt-prompts", destination: "/toolkit/rest-without-guilt-prompts", permanent: true },
      { source: "/projects/:slug", destination: "/toolkit", permanent: true },
      // The old contact page. Email and every platform now live on Find me.
      { source: "/contact", destination: "/find-me", permanent: true },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.dkjonah.com",
      },
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
