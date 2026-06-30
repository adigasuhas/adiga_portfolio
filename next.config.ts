import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the Decap CMS static admin app at the clean /admin URL.
  // Next.js serves public/admin/index.html at /admin/index.html but not at
  // bare /admin, so we rewrite it explicitly to avoid a 404.
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
      // Proxy decap-server through Next.js so the CMS works from any LAN IP
      // without exposing port 8081 or fighting browser secure-context rules.
      { source: "/api/decap/:path*", destination: "http://localhost:8081/api/v1/:path*" }
    ];
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true
      },
      {
        source: "/publications-and-conferences",
        destination: "/publications",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
