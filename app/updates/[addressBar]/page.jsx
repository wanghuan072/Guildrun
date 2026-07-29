import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeLedger from "@/src/components/ChangeLedger";
import DetailPageLayout from "@/src/components/DetailPageLayout";
import GptAdSlot from "@/src/components/GptAdSlot";
import { createGptElementId } from "@/src/config/gpt";
import { slugify } from "@/src/lib/content/collection";
import { updateCollection } from "@/src/lib/content/updates";
import { articleSchema, breadcrumbSchema } from "@/src/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return updateCollection.staticParams();
}

export async function generateMetadata({ params }) {
  const update = updateCollection.get((await params).addressBar);
  if (!update) return {};
  return updateCollection.metadata(update);
}

export default async function UpdateDetailPage({ params }) {
  const { addressBar } = await params;
  const update = updateCollection.get(addressBar);
  if (!update) notFound();

  const path = updateCollection.href(update);
  const sections = update.sections.map((section) => ({
    ...section,
    anchor: slugify(section.name),
  }));
  const jsonLd = [
    articleSchema({
      headline: update.seo.h1,
      description: update.seo.description,
      path,
      image: update.imageUrl,
      datePublished: update.publishDate,
      dateModified: update.publishDate,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Updates", path: "/updates/" },
      { name: update.title, path },
    ]),
  ];
  return (
    <DetailPageLayout
      section="updates"
      activeHref="/updates/"
      pageLinks={[
        ["Impact", "#impact"],
        ...sections.map((section) => [section.name, `#${section.anchor}`]),
        ...(update.ledger.length ? [["Change ledger", "#change-ledger"]] : []),
      ]}
      breadcrumbs={[
        { label: "Updates", href: "/updates/" },
        { label: update.title },
      ]}
      jsonLd={jsonLd}
      showLeadAd={false}
    >
      <article className="reading-layout">
        <header className="update-detail-hero">
          <div>
            <span className="archive-eyebrow">
              {update.publishDate} · {update.updateType}
            </span>
            <h1>{update.seo.h1}</h1>
            <p>{update.excerpt}</p>
            <Link href="/updates/">Return to update timeline →</Link>
          </div>
          <span>
            <Image
              src={update.imageUrl}
              alt={update.imageAlt}
              fill
              priority
              sizes="420px"
            />
          </span>
        </header>
        {/* GPT: banner_1 · directly below the update hero */}
        <GptAdSlot
          id={createGptElementId(`update-${update.addressBar}`, "hero")}
          unit="banner1"
        />
        <div className="reading-columns">
          <div className="reading-article">
            <section id="impact">
              <span className="archive-kicker">Practical impact</span>
              <h2>What this update means</h2>
              <p>{update.summary}</p>
              <ul className="reading-list">
                {update.editorialImpact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            {sections.map((section) => (
              <section id={section.anchor} key={section.name}>
                <span className="archive-kicker">{update.version}</span>
                <h2>{section.name}</h2>
                <p>{section.intro}</p>
                <ul className="reading-list">
                  {section.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </section>
            ))}
            {/* GPT: banner_3 · between patch sections and the change ledger */}
            <GptAdSlot
              id={createGptElementId(`update-${update.addressBar}`, "sections")}
              unit="banner3"
            />
            <ChangeLedger
              sections={update.ledger}
              compact
              anchorId="change-ledger"
            />
          </div>
          <aside className="reading-aside">
            <div><small>Version</small><strong>{update.version}</strong></div>
            <div><small>Published</small><strong>{update.publishDate}</strong></div>
            <div><small>State</small><strong>{update.updateType}</strong></div>
            <Link href="/updates/">All updates →</Link>
            <Link href="/release-date/">Release status →</Link>
          </aside>
        </div>
      </article>
    </DetailPageLayout>
  );
}
