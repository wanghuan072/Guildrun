import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/src/components/JsonLd";
import { getUpdate, updatesData } from "@/src/lib/content/updates";
import { createMetadata } from "@/src/seo/siteConfig";
import { articleSchema, breadcrumbSchema } from "@/src/seo/schema";

export function generateStaticParams() {
  return updatesData.map(({ addressBar }) => ({ addressBar }));
}

export async function generateMetadata({ params }) {
  const { addressBar } = await params;
  const update = getUpdate(addressBar);
  if (!update) return {};
  return createMetadata({
    ...update.seo,
    path: `/updates/${addressBar}/`,
    image: update.imageUrl,
    type: "article",
  });
}

export default async function UpdateDetailPage({ params }) {
  const { addressBar } = await params;
  const update = getUpdate(addressBar);
  if (!update) notFound();
  const path = `/updates/${update.addressBar}/`;
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
    <main className="archive-main">
      <JsonLd data={jsonLd} />
      <article className="container reading-layout update-detail">
        <nav className="breadcrumb compact-breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li><Link href="/updates/">Updates</Link></li><li>{update.title}</li></ol></nav>
        <header className="update-detail-hero">
          <div><span className="archive-eyebrow">{update.publishDate} · {update.updateType}</span><h1>{update.seo.h1}</h1><p>{update.excerpt}</p><Link href="/updates/">Return to update timeline →</Link></div>
          <span><Image src={update.imageUrl} alt={update.imageAlt} fill priority sizes="420px" /></span>
        </header>
        <div className="reading-columns">
          <div className="reading-article">
            <section><span className="archive-kicker">Practical impact</span><h2>What this update means</h2><p>{update.summary}</p><ul className="reading-list">{update.editorialImpact.map((item) => <li key={item}>{item}</li>)}</ul></section>
            {update.sections.map((section) => <section key={section.name}><span className="archive-kicker">{update.version}</span><h2>{section.name}</h2><p>{section.intro}</p><ul className="reading-list">{section.changes.map((change) => <li key={change}>{change}</li>)}</ul></section>)}
            {update.ledger.map((section) => <section className="change-group compact-change-group" key={section.name}><h2>{section.name}</h2><div>{section.records.map((record,index) => <article key={`${record.entity}-${index}`}><strong>{record.entity}</strong><ul>{record.changes.map((change,changeIndex) => <li key={`${change.label}-${changeIndex}`}><span>{change.label}</span>{change.oldValue || change.newValue ? <b><del>{change.oldValue || "—"}</del><i>→</i><ins>{change.newValue || "—"}</ins></b> : <em>{change.note || "Text updated"}</em>}</li>)}</ul></article>)}</div></section>)}
          </div>
          <aside className="reading-aside"><div><small>Version</small><strong>{update.version}</strong></div><div><small>Published</small><strong>{update.publishDate}</strong></div><div><small>State</small><strong>{update.updateType}</strong></div><Link href="/updates/">All updates →</Link><Link href="/release-date/">Release status →</Link></aside>
        </div>
      </article>
    </main>
  );
}
