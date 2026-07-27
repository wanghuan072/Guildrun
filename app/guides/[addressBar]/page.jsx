import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailPageLayout from "@/src/components/DetailPageLayout";
import { guideCollection } from "@/src/lib/content/guides";
import { heroesData } from "@/src/lib/content/heroes";
import { itemsData } from "@/src/lib/content/items";
import { relicsData } from "@/src/lib/content/relics";
import { resolveNamedRecord } from "@/src/lib/resolveNamedRecord";
import { articleSchema, breadcrumbSchema } from "@/src/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return guideCollection.staticParams();
}

export async function generateMetadata({ params }) {
  const guide = guideCollection.get((await params).addressBar);
  if (!guide) return {};
  return guideCollection.metadata(guide);
}

export default async function GuidePage({ params }) {
  const guide = guideCollection.get((await params).addressBar);
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
  const path = guideCollection.href(guide);

  return (
    <DetailPageLayout
      section="guides"
      activeHref={path}
      pageLinks={[
        ["Opening plan", "#opening-plan"],
        ["Guide", "#guide"],
        ["Common mistakes", "#common-mistakes"],
        ["Related records", "#related-records"],
      ]}
      breadcrumbs={[
        { label: "Guides", href: "/guides/" },
        { label: guide.shortTitle },
      ]}
      jsonLd={jsonLd}
    >
      <header className="record-head">
        <div className="record-head__copy">
          <span className="archive-eyebrow">{guide.category} · {guide.gameVersion}</span>
          <h1>{guide.seo.h1}</h1>
          <p>{guide.excerpt}</p>
          <div className="record-head__meta">
            <span><strong>Author</strong> {guide.author}</span>
            <span><strong>Maintainer</strong> {guide.reviewedBy}</span>
            <span><strong>Updated</strong> {guide.updatedDate}</span>
          </div>
        </div>
        <div className="record-head__image">
          <Image
            src={guide.imageUrl}
            alt={guide.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) calc(100vw - 48px), 420px"
          />
        </div>
      </header>
      <div className="detail-body-content">
        <article className="detail-article">
          <section className="detail-section-block" id="opening-plan">
            <span className="archive-eyebrow">Opening plan</span>
            <h2>The plan in three moves</h2>
            <ol className="detail-path">
              {guide.quickSummary.map((entry) => (
                <li key={entry}><strong>{entry}</strong></li>
              ))}
            </ol>
          </section>
          <div
            className="guide-article-content"
            id="guide"
            dangerouslySetInnerHTML={{ __html: guide.detailsHtml }}
          />
          <section className="detail-section-block" id="common-mistakes">
            <h2>Common mistakes</h2>
            <ul>
              {guide.commonMistakes.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </section>
          <section className="detail-section-block" id="related-records">
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
                    <Link
                      href={`/wiki/items/?search=${encodeURIComponent(record.addressBar)}`}
                      key={`item-${name}`}
                    >
                      {name}
                    </Link>
                  ))}
                  {relatedRelics.map(({ name, record }) => (
                    <Link
                      href={`/wiki/relics/?search=${encodeURIComponent(record.addressBar)}`}
                      key={`relic-${name}`}
                    >
                      {name}
                    </Link>
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
    </DetailPageLayout>
  );
}
