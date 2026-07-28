import { GPT_BANNER_SIZES, GPT_UNITS } from "@/src/config/gpt";

function getGoogletag() {
  if (typeof window === "undefined") return null;
  window.googletag = window.googletag || { cmd: [] };
  return window.googletag;
}

function getSlotMap() {
  window.__guildrunGptSlotMap = window.__guildrunGptSlotMap || {};
  return window.__guildrunGptSlotMap;
}

export function mountGptBanner(elementId, unit) {
  const googletag = getGoogletag();
  const sizeConfig = GPT_BANNER_SIZES[unit];
  const unitPath = GPT_UNITS[unit];

  if (!googletag || !elementId || !sizeConfig || !unitPath) {
    return () => {};
  }

  googletag.cmd.push(() => {
    if (!document.getElementById(elementId)) return;

    const slotMap = getSlotMap();
    let slot = slotMap[elementId];

    if (!slot) {
      const mapping = googletag
        .sizeMapping()
        .addSize([1024, 768], sizeConfig.desktop)
        .addSize([0, 0], sizeConfig.mobile)
        .build();

      slot = googletag
        .defineSlot(unitPath, sizeConfig.all, elementId)
        ?.defineSizeMapping(mapping)
        ?.addService(googletag.pubads());

      if (!slot) return;
      slotMap[elementId] = slot;
      googletag.display(elementId);
    }

    googletag.pubads().refresh([slot]);
  });

  return () => {
    googletag.cmd.push(() => {
      const slotMap = getSlotMap();
      const slot = slotMap[elementId];
      if (!slot) return;

      googletag.destroySlots([slot]);
      delete slotMap[elementId];
    });
  };
}
