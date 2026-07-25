import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/src/components/JsonLd";
import { getGuide, guidesData } from "@/src/lib/content/guides";
import { heroesData } from "@/src/lib/content/heroes";
import { itemsData } from "@/src/lib/content/items";
import { relicsData } from "@/src/lib/content/relics";
import {
  resolveNamedRecord,
  wikiItemHref,
  wikiRelicHref,
} from "@/src/lib/resolveNamedRecord";
import { articleSchema, breadcrumbSchema } from "@/src/seo/schema";
import { createMetadata } from "@/src/seo/siteConfig";

export function generateStaticParams() {
  return guidesData.map(({ addressBar }) => ({ addressBar }));
}

export async function generateMetadata({ params }) {
  const guide = getGuide((await params).addressBar);
  if (!guide) return {};
  return createMetadata({
    ...guide.seo,
    path: `/guides/${guide.addressBar}/`,
    image: guide.imageUrl,
    type: "article",
  });
}

export default async function GuidePage({ params }) {
  const guide = getGuide((await params).addressBar);
  if (!guide) notFound();

  const relatedHeroes = guide.relatedHeroes
    .map((name) => ({ name, record: resolveNamedRecord(heroesData, name) }))
    .filter((entry) => entry.record);
  const relatedItems = guide.relatedItems
    .map((name) => ({ name, record: resolveNamedRecord(itemsData, name) }))
    .filter((entry) => entry.record);
  const relatedRelics = guide.relatedRelics
    .map((name) => ({ name, record: resolveNamedRecord(relicsData, name) }))
    .filter((entry) => entry.record);

  const jsonLd = [
    articleSchema({
      headline: guide.title,
      description: guide.excerpt,
      path: `/guides/${guide.addressBar}/`,
      image: guide.imageUrl,
      datePublished: guide.publishDate,
      dateModified: guide.updatedDate,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides/" },
      { name: guide.shortTitle, path: `/guides/${guide.addressBar}/` },
    ]),
  ];

  return (
    <main className="detail-main">
      <JsonLd data={jsonLd} />
      <section className="detail-hero-section">
        <div className="container detail-hero-content">
          <div className="detail-hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/guides/">Guides</Link></li>
                <li>{guide.shortTitle}</li>
              </ol>
            </nav>
            <span className="detail-label">{guide.category} · {guide.gameVersion}</span>
            <h1>{guide.seo.h1}</h1>
            <p>{guide.excerpt}</p>
            <div className="detail-meta-list">
              <span>By {guide.author}</span>
              <span>Maintained by {guide.reviewedBy}</span>
              <span>Updated {guide.updatedDate}</span>
            </div>
          </div>
          <div className="detail-hero-art scene">
            <Image
              src={guide.imageUrl}
              alt={guide.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>
        </div>
      </section>
      <section className="detail-body-section">
        <div className="container detail-body-content">
          <article className="detail-article">
            <section className="detail-section-block">
              <span className="eyebrow">Opening plan</span>
              <h2>The plan in three moves</h2>
              <ol className="detail-path">
                {guide.quickSummary.map((entry) => (
                  <li key={entry}><strong>{entry}</strong></li>
                ))}
              </ol>
            </section>
            <div
              className="guide-article-content"
              dangerouslySetInnerHTML={{ __html: guide.detailsHtml }}
            />
            <section className="detail-section-block">
              <h2>Common mistakes</h2>
              <ul>
                {guide.commonMistakes.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </section>
            <section className="detail-section-block">
              <h2>Continue into the database</h2>
              <div className="detail-two-column">
                <div className="detail-note">
                  <h3>Heroes</h3>
                  <div className="detail-related-links">
                    {relatedHeroes.length
                      ? relatedHeroes.map(({ name, record }) => (
                          <Link href={`/heroes/${record.addressBar}/`} key={name}>{name}</Link>
                        ))
                      : <Link href="/heroes/">Browse heroes</Link>}
                  </div>
                </div>
                <div className="detail-note">
                  <h3>Items and relics</h3>
                  <div className="detail-related-links">
                    {relatedItems.map(({ name, record }) => (
                      <Link href={wikiItemHref(record.addressBar)} key={`item-${name}`}>{name}</Link>
                    ))}
                    {relatedRelics.map(({ name, record }) => (
                      <Link href={wikiRelicHref(record.addressBar)} key={`relic-${name}`}>{name}</Link>
                    ))}
                    {!relatedItems.length && !relatedRelics.length ? (
                      <Link href="/wiki/">Browse wiki</Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </article>
          <aside className="detail-sidebar">
            <section className="detail-sidebar-card">
              <h2>Article details</h2>
              <dl>
                <div><dt>Published</dt><dd>{guide.publishDate}</dd></div>
                <div><dt>Updated</dt><dd>{guide.updatedDate}</dd></div>
                <div><dt>Game version</dt><dd>{guide.gameVersion}</dd></div>
                <div><dt>Maintainer</dt><dd>{guide.reviewedBy}</dd></div>
              </dl>
            </section>
            <section className="detail-sidebar-card">
              <h2>Tags</h2>
              <div className="detail-related-links">
                {guide.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <Link href="/updates/">Check patch notes →</Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
