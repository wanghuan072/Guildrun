const GPT_BASE = "/23355878051/guildrun.net_0728_all";

export const GPT_UNITS = Object.freeze({
  anchor: `${GPT_BASE}/guildrun.net_0728_anchor_1`,
  interstitial: `${GPT_BASE}/guildrun.net_0728_inter_1`,
  banner1: `${GPT_BASE}/guildrun.net_0728_banner_1`,
  banner2: `${GPT_BASE}/guildrun.net_0728_banner_2`,
  banner3: `${GPT_BASE}/guildrun.net_0728_banner_3`,
});

export const GPT_BANNER_SIZES = Object.freeze({
  banner1: {
    all: ["fluid", [970, 250], [300, 250]],
    desktop: ["fluid", [970, 250], [300, 250]],
    mobile: ["fluid", [300, 250]],
    minHeight: 250,
  },
  banner2: {
    all: ["fluid", [728, 90], [320, 100]],
    desktop: ["fluid", [728, 90], [320, 100]],
    mobile: ["fluid", [320, 100]],
    minHeight: 100,
  },
  banner3: {
    all: ["fluid", [728, 90], [320, 100]],
    desktop: ["fluid", [728, 90], [320, 100]],
    mobile: ["fluid", [320, 100]],
    minHeight: 100,
  },
});

export function createGptElementId(scope, position) {
  const safeScope = String(scope || "page")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `div-gpt-ad-${safeScope || "page"}-${position}`;
}
