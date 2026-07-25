import HeroExplorer from "@/src/components/HeroExplorer";
import { heroClasses, heroesData } from "@/src/lib/content/heroes";
import { pageTdk } from "@/src/seo/tdk";
import { createMetadata } from "@/src/seo/siteConfig";

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
        <HeroExplorer heroes={heroesData} classes={heroClasses} />
      </div>
    </main>
  );
}
