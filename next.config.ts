import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // optimized variants of /media/* are content-addressed by their query, safe to keep for a year
    minimumCacheTTL: 31536000,
  },
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // pieces removed or renamed when the portfolio was rebuilt
      { source: "/prace/weber", destination: "/#work", permanent: true },
      {
        source: "/prace/koncept-venave",
        destination: "/prace/koncept-doprava",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // static media in public/: rename the file when it changes
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
