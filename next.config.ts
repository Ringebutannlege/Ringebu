import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Browsers that have been here once go straight to https from then on, even
  // when someone types the address without it. Two years, as Vercel's own;
  // without includeSubDomains, since the domain's mail lives elsewhere.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first, WebP for browsers without it. Measured on the hero photos
    // (2026-10-07): 24% smaller on a phone, 19% on desktop.
    formats: ["image/avif", "image/webp"],
    // Retain the standard responsive widths and add a 3x full-HD hero size.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 5760],
    // next/image qualities used across the site (Next 16 requires them listed).
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Nobody should land on the Vercel address; send it to the domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "ringebu.vercel.app" }],
        destination: "https://ringebutannlegesenter.no/:path*",
        permanent: true,
      },
      // Addresses from the old WordPress site (found in Common Crawl), so
      // old links and search results land on the matching new page.
      { source: "/akutttime/:path*", destination: "/kontakt", permanent: true },
      { source: "/behandling1-2/:path*", destination: "/behandlinger", permanent: true },
      { source: "/behandling:n(\\d+)/:path*", destination: "/behandlinger", permanent: true },
      { source: "/kronebroprotese/:path*", destination: "/behandlinger", permanent: true },
      { source: "/personvernerklaering/:path*", destination: "/personvern", permanent: true },
      { source: "/hjem2-2/:path*", destination: "/", permanent: true },
      { source: "/home-page/:path*", destination: "/", permanent: true },
      { source: "/team/:path*", destination: "/informasjon", permanent: true },
      { source: "/helelogosvarttransparent/:path*", destination: "/", permanent: true },
      // WordPress system paths: nothing lives here any more.
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/feed/:path*", destination: "/", permanent: true },
      // Design mockups were removed; old links go to the front page.
      { source: "/mockups/:path*", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
