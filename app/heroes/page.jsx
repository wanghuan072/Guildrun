import Link from "next/link";
import GptAdSlot from "@/src/components/GptAdSlot";
import HeroExplorer from "@/src/components/HeroExplorer";
import { createGptElementId } from "@/src/config/gpt";
import { heroClasses, heroesData } from "@/src/lib/content/heroes";
import { pageTdk } from "@/src/seo/tdk";
import { createMetadata } from "@/src/seo/siteConfig";
import "@/src/styles/systems.css";

export const metadata = createMetadata({ ...pageTdk.heroes, path: "/heroes/" });

export default function HeroesPage() {
  const rangedCount = heroesData.filter((hero) => hero.attackType === "Ranged").length;

  return (
    <main className="archive-main">
      <div className="container heroes-catalog-page">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Roster database · Rank C comparison</span>
            <h1>{pageTdk.heroes.h1}</h1>
            <p>
              Search by class, range, role, or keyword, then compare the base
              statistics that affect formation decisions. Each dossier includes
              all four rank images, abilities, specializations, and modifier
              pools.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{heroesData.length}</strong>
            <span>{rangedCount} ranged · {heroesData.length - rangedCount} melee</span>
          </div>
        </header>
        <nav className="hero-taxonomy-rail" aria-label="Explore Hero systems">
          <Link href="/heroes/classes/">
            <span>07 classes</span>
            <strong>Class mechanics</strong>
            <small>Primary stats, dual-class paths, and related Heroes</small>
          </Link>
          <Link href="/heroes/guilds/">
            <span>06 guilds</span>
            <strong>Guild banners and lore</strong>
            <small>Official profiles and connected roster members</small>
          </Link>
          <Link href="/wiki/rank-modifiers/">
            <span>Rank A / S</span>
            <strong>Modifier pool</strong>
            <small>Search effects by class, trigger, or Hero</small>
          </Link>
        </nav>
        {/* GPT: banner_1 · below the recommended Hero system links */}
        <GptAdSlot
          id={createGptElementId("heroes-directory", 1)}
          unit="banner1"
        />
        <HeroExplorer heroes={heroesData} classes={heroClasses} />
        {/* GPT: banner_2 */}
        <GptAdSlot
          id={createGptElementId("heroes-directory", 2)}
          unit="banner2"
        />
      </div>
    </main>
  );
}
