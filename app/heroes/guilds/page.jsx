import Image from "next/image";
import Link from "next/link";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import referenceData from "@/src/data/gameplay/reference.json";
import { heroesData } from "@/src/lib/content/heroes";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";
import "@/src/styles/systems.css";

export const metadata = createMetadata({
  ...pageTdk.guilds,
  path: "/heroes/guilds/",
});

export default function GuildsPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout
        section="heroes"
        activeHref="/heroes/guilds/"
        pageLinks={referenceData.guilds.map((guild) => [guild.name, `#${guild.slug}`])}
      >
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Organizations behind the roster</span>
            <h1>{pageTdk.guilds.h1}</h1>
            <p>
              Six guilds approach the rift crisis through competition,
              stewardship, prestige, rebellion, professional hunting, or global
              logistics. Their banners and official profiles connect that
              worldview to the Heroes already in the roster.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{referenceData.guilds.length}</strong>
            <span>guilds</span>
          </div>
        </header>

        <div className="guild-chronicle">
          {referenceData.guilds.map((guild, index) => {
            const members = heroesData.filter((hero) => hero.guild === guild.name);
            return (
              <section id={guild.slug} key={guild.slug}>
                <div className="guild-chronicle__banner">
                  <Image
                    src={guild.bannerUrl}
                    alt={`${guild.name} guild banner`}
                    fill
                    sizes="(max-width: 768px) 100vw, 38vw"
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="guild-chronicle__copy">
                  <small>{guild.tagline}</small>
                  <h2>{guild.name}</h2>
                  <p>{guild.description}</p>
                  <div className="guild-member-line">
                    {members.map((hero) => (
                      <Link href={`/heroes/${hero.addressBar}/`} key={hero.name}>
                        <span><Image src={hero.imageUrl} alt="" fill sizes="46px" /></span>
                        {hero.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </ReferenceLayout>
    </main>
  );
}
