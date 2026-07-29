import Link from "next/link";
import JsonLd from "@/src/components/JsonLd";
import ReferenceLayout from "@/src/components/ReferenceLayout";

export default function DetailPageLayout({
  section,
  activeHref,
  pageLinks = [],
  breadcrumbs,
  jsonLd,
  leadAdAfter = 2,
  showLeadAd = true,
  children,
}) {
  return (
    <main className="archive-main">
      <JsonLd data={jsonLd} />
      <ReferenceLayout
        section={section}
        activeHref={activeHref}
        pageLinks={pageLinks}
        leadAdAfter={leadAdAfter}
        showLeadAd={showLeadAd}
      >
        <nav className="breadcrumb compact-breadcrumb" aria-label="Breadcrumb">
          <ol>
            {breadcrumbs.map((entry, index) => (
              <li key={`${entry.label}-${entry.href || index}`}>
                {entry.href ? <Link href={entry.href}>{entry.label}</Link> : entry.label}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </ReferenceLayout>
    </main>
  );
}
