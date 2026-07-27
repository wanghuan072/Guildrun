import Image from "next/image";
import Link from "next/link";
import { guidesData } from "@/src/lib/content/guides";
import { pageTdk } from "@/src/seo/tdk";
import { createMetadata } from "@/src/seo/siteConfig";

export const metadata = createMetadata({ ...pageTdk.guides, path: "/guides/" });

export default function GuidesPage() {
  const latestUpdatedDate = guidesData
    .map((guide) => guide.updatedDate)
    .sort()
    .at(-1);
  const latestUpdatedLabel = new Date(
    `${latestUpdatedDate}T00:00:00Z`,
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  });

  return (
    <main className="page-main">
      <section className="page-hero-section">
        <div className="page-hero-image">
          <Image src="/images/gameplay/formation-battle.webp" alt="" fill priority sizes="100vw" />
        </div>
        <div className="container page-hero-content">
          <div className="page-hero-copy">
            <span className="archive-eyebrow">Core strategy pillars</span>
            <h1>{pageTdk.guides.h1}</h1>
            <p>
              Current Demo guides cover first clears, team construction, ranks,
              relic decisions, Red Rift, and Endless. New records join this
              library automatically when they are added to the local guide data.
            </p>
          </div>
          <aside className="page-hero-meta">
            <span>Guide pillars</span>
            <strong>{guidesData.length} core guides</strong>
            <p>
              Start with the beginner guide if runs collapse early; open the
              strategy guide once the opening board is stable.
            </p>
          </aside>
        </div>
      </section>
      <section id="library" className="page-section">
        <div className="container page-content">
          <div className="article-grid article-grid--two">
            {guidesData.map((guide) => (
              <Link className="article-card" href={`/guides/${guide.addressBar}/`} key={guide.id}>
                <Image
                  src={guide.imageUrl}
                  alt={guide.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="article-card-copy">
                  <small>{guide.category} · {guide.gameVersion}</small>
                  <h2>{guide.shortTitle}</h2>
                  <p>{guide.excerpt}</p>
                </span>
              </Link>
            ))}
          </div>
          <div className="verification-panel">
            <div><span>Start here</span><strong>Beginner Guide</strong></div>
            <div><span>Next read</span><strong>Strategy Guide</strong></div>
            <div><span>Version</span><strong>{guidesData[0].gameVersion}</strong></div>
            <div><span>Updated</span><strong>{latestUpdatedLabel}</strong></div>
          </div>
        </div>
      </section>
    </main>
  );
}
