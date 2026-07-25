import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/wiki/items/:addressBar",
        destination: "/wiki/items/?search=:addressBar",
        permanent: true,
      },
      {
        source: "/wiki/relics/:addressBar",
        destination: "/wiki/relics/?search=:addressBar",
        permanent: true,
      },
      {
        source: "/wiki/specializations/:addressBar",
        destination: "/gameplay/growth-route/#rank-route",
        permanent: true,
      },
      {
        source: "/guides/hero-progression-guide",
        destination: "/guides/guildrun-strategy-guide/",
        permanent: true,
      },
      {
        source: "/guides/team-comps",
        destination: "/guides/guildrun-strategy-guide/",
        permanent: true,
      },
      {
        source: "/guides/best-relics",
        destination: "/guides/guildrun-strategy-guide/",
        permanent: true,
      },
      {
        source: "/guides/positioning-guide",
        destination: "/guides/guildrun-beginner-guide/",
        permanent: true,
      },
      {
        source: "/guides/shop-economy-guide",
        destination: "/guides/guildrun-beginner-guide/",
        permanent: true,
      },
      {
        source: "/guides/red-rift-guide",
        destination: "/guides/guildrun-strategy-guide/",
        permanent: true,
      },
      {
        source: "/guides/endless-mode-guide",
        destination: "/guides/guildrun-strategy-guide/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
