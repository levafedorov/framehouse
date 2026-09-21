import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // optimized variants of /media/* are content-addressed by their query, safe to keep for a year
    minimumCacheTTL: 31536000,
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
