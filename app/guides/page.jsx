import Image from "next/image";
import Link from "next/link";
import { guidesData } from "@/src/lib/content/guides";
import { pageTdk } from "@/src/seo/tdk";
import { createMetadata } from "@/src/seo/siteConfig";

export const metadata = createMetadata({ ...pageTdk.guides, path: "/guides/" });

export default function GuidesPage() {
  return (
    <main className="page-main">
      <section className="page-hero-section">
        <div className="page-hero-image">
          <Image src="/images/gameplay/formation-battle.webp" alt="" fill priority sizes="100vw" />
        </div>
        <div className="container page-hero-content">
          <div className="page-hero-copy">
            <span className="eyebrow">Core strategy pillars</span>
            <h1>{pageTdk.guides.h1}</h1>
            <p>
              Two deep Demo 0.5.1 foundations for now: a beginner handbook for
              first clears, and a strategy guide for builds, ranks, relics, Red
              Rift, and Endless. Topic pages will expand from these pillars.
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
            <div><span>Version</span><strong>Demo 0.5.1</strong></div>
            <div><span>Updated</span><strong>July 25, 2026</strong></div>
          </div>
        </div>
      </section>
    </main>
  );
}
