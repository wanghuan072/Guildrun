import { siteConfig } from "@/src/seo/siteConfig";

export default function robots() {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteConfig.siteUrl}/sitemap.xml`, host: siteConfig.siteUrl };
}
