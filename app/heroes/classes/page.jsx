import Image from "next/image";
import Link from "next/link";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import referenceData from "@/src/data/gameplay/reference.json";
import { heroesData } from "@/src/lib/content/heroes";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";
import "@/src/styles/systems.css";

export const metadata = createMetadata({
  ...pageTdk.heroClasses,
  path: "/heroes/classes/",
});

function heroUsesClass(hero, className) {
  return (
    hero.classes.includes(className) ||
    hero.specializations.some(
      (specialization) =>
        specialization.addedClass.replace(/^\+\s*/, "") === className,
    )
  );
}

export default function HeroClassesPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout
        section="heroes"
        activeHref="/heroes/classes/"
        pageLinks={referenceData.classes.map((heroClass) => [
          heroClass.name,
          `#${heroClass.name.toLowerCase()}`,
        ])}
      >
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Seven combat identities</span>
            <h1>{pageTdk.heroClasses.h1}</h1>
            <p>
              A class identifies the stat and recurring mechanics a Hero is
              designed to use. Rank B specializations can add a second class,
              expanding the modifier pool without erasing the Hero&apos;s original job.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{referenceData.classes.length}</strong>
            <span>classes</span>
          </div>
        </header>

        <div className="class-strata">
          {referenceData.classes.map((heroClass, index) => {
            const relatedHeroes = heroesData.filter((hero) =>
              heroUsesClass(hero, heroClass.name),
            );
            return (
              <section id={heroClass.name.toLowerCase()} key={heroClass.name}>
                <div className="class-strata__index">{String(index + 1).padStart(2, "0")}</div>
                <div className="class-strata__copy">
                  <span>{heroClass.primaryStat}</span>
                  <h2>{heroClass.name}</h2>
                  <p>{heroClass.summary}</p>
                  <div className="tag-links">
                    {heroClass.mechanics.map((mechanic) => (
                      <Link href={`/wiki/status-effects/?search=${encodeURIComponent(mechanic)}`} key={mechanic}>
                        {mechanic}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="class-strata__heroes">
                  <small>{relatedHeroes.length} related Heroes and paths</small>
                  <div>
                    {relatedHeroes.map((hero) => (
                      <Link href={`/heroes/${hero.addressBar}/`} key={hero.name}>
                        <span><Image src={hero.imageUrl} alt="" fill sizes="52px" /></span>
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
