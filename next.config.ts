import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: appRoot,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/opengraph-image",
        destination: "/social/euphoria-home-v3.jpg",
        permanent: true,
      },
      {
        source: "/blog/opengraph-image",
        destination: "/social/euphoria-journal-v3.jpg",
        permanent: true,
      },
      {
        source: "/blog/:slug/opengraph-image",
        destination: "/social/euphoria-journal-v3.jpg",
        permanent: true,
      },
      {
        source: "/suites/opengraph-image",
        destination: "/social/euphoria-home-v3.jpg",
        permanent: true,
      },
      {
        source: "/suites/passion/opengraph-image",
        destination: "/social/euphoria-passion-v3.jpg",
        permanent: true,
      },
      {
        source: "/suites/infinity/opengraph-image",
        destination: "/social/euphoria-infinity-v3.jpg",
        permanent: true,
      },
      {
        source: "/:slug/opengraph-image",
        destination: "/social/euphoria-home-v3.jpg",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/social/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
