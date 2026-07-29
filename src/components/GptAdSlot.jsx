"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GPT_BANNER_SIZES } from "@/src/config/gpt";
import { mountGptBanner } from "@/src/lib/gptAds";

export default function GptAdSlot({ id, unit = "banner1" }) {
  const pathname = usePathname();
  const sizeConfig = GPT_BANNER_SIZES[unit] || GPT_BANNER_SIZES.banner1;

  useEffect(
    () => mountGptBanner(id, unit),
    [id, pathname, unit],
  );

  return (
    <aside
      className={`gpt-ad-shell gpt-ad-shell--${unit}`}
      aria-label="Sponsored content"
    >
      <div
        className="gpt-ad-slot"
        id={id}
        style={{ minHeight: `${sizeConfig.minHeight}px` }}
      />
    </aside>
  );
}
