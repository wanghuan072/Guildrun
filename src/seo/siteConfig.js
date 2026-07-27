export const siteConfig = {
  siteName: "Guildrun",
  siteUrl: "https://guildrun.net",
  contactEmail: "wyong@guildrun.net",
  defaultTitle: "Guildrun - Heroes, Builds, Wiki and Strategy Guide",
  defaultDescription:
    "Master Guildrun with complete hero stats, rank paths, items, relics, enemy records, world encounters, team-building advice, and practical run strategies.",
  defaultImage: "/images/og-image.png",
  steamUrl: "https://store.steampowered.com/app/3669200/Guildrun/",
  demoUrl: "https://store.steampowered.com/app/4425970/Guildrun_Demo/",
  officialUrl: "https://www.playguildrun.com/",
  discordUrl: "https://discord.gg/guildrun",
  gaMeasurementId: "G-T7ZW3Y84LJ",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.defaultImage,
  keywords = [],
  type = "website",
}) {
  const url = new URL(path, siteConfig.siteUrl).toString();
  const socialImage = new URL(image, siteConfig.siteUrl).toString();
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: siteConfig.siteName,
      title,
      description,
      url,
      images: [{ url: socialImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
