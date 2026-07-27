import Link from "next/link";
import ChangeLedger from "@/src/components/ChangeLedger";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import { updatesData } from "@/src/lib/content/updates";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.updates,
  path: "/updates/",
});

export default function UpdatesPage() {
  const latest = updatesData[0];
  const ledgerCount = latest.ledger.reduce(
    (total, section) => total + section.records.length,
    0,
  );

  return (
    <main className="archive-main">
      <ReferenceLayout
        section="updates"
        activeHref="/updates/"
        pageLinks={[
          ["0.5.1 patch", "#latest"],
          ["Exact ledger", "#ledger"],
          ["Launch and plans", "#timeline"],
          ["Content policy", "#policy"],
        ]}
      >
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">
              Patch notes · launch news · development status
            </span>
            <h1>{pageTdk.updates.h1}</h1>
            <p>
              A versioned record of what changed, what shipped, what remains a
              plan, and which strategy pages need reconsideration after a
              balance update.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{latest.version}</strong>
            <span>{ledgerCount} exact changes</span>
          </div>
        </header>

        <article className="updates-article">
          <section id="latest" className="update-feature">
            <header>
              <div>
                <span className="archive-kicker">
                  {latest.publishDate} · {latest.updateType}
                </span>
                <h2>{latest.title}</h2>
                <p>{latest.summary}</p>
              </div>
              <Link href={`/updates/${latest.addressBar}/`}>
                Open full patch record →
              </Link>
            </header>
            <div className="update-impact">
              <strong>Why this patch matters</strong>
              <ul>
                {latest.editorialImpact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="patch-sections">
              {latest.sections.map((section, index) => (
                <section key={section.name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{section.name}</h3>
                    <p>{section.intro}</p>
                    <ul>
                      {section.changes.map((change) => (
                        <li key={change}>{change}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section id="ledger" className="update-ledger-section">
            <header className="reading-heading">
              <span className="archive-kicker">Entity-level diff</span>
              <h2>Exact 0.5.1 balance ledger</h2>
              <p>
                The patch explains intent; this field-by-field ledger records
                changed values and old-to-new numbers by entity.
              </p>
            </header>
            <ChangeLedger sections={latest.ledger} />
            <Link
              className="archive-link prominent-link"
              href={`/updates/${latest.addressBar}/`}
            >
              Open the standalone 0.5.1 patch page →
            </Link>
          </section>

          <section id="timeline" className="update-timeline-section">
            <header className="reading-heading">
              <span className="archive-kicker">
                Launch and development ledger
              </span>
              <h2>What shipped and what remains planned</h2>
              <p>
                Each entry labels its current state so a release plan is not
                mistaken for a live feature.
              </p>
            </header>
            <div className="update-timeline">
              {updatesData.slice(1).map((update) => (
                <article key={update.id}>
                  <time dateTime={update.publishDate}>{update.publishDate}</time>
                  <div className="update-timeline-body">
                    <span>{update.updateType} · {update.version}</span>
                    <h3>
                      <Link href={`/updates/${update.addressBar}/`}>
                        {update.title}
                      </Link>
                    </h3>
                    <p>{update.excerpt}</p>
                    {update.sections.map((section) => (
                      <div className="update-brief" key={section.name}>
                        <strong>{section.name}</strong>
                        <ul>
                          {section.changes.map((change) => (
                            <li key={change}>{change}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="update-timeline-links">
                      <Link href={`/updates/${update.addressBar}/`}>
                        Open complete record →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="policy" className="reference-note">
            <div>
              <span className="archive-kicker">Trust boundary</span>
              <h2>How changing information is labeled</h2>
            </div>
            <p>
              <b>Balance values</b> belong to a named Demo version.{" "}
              <b>Development plans</b> such as release timing, co-op, and
              carryover remain plans until shipped. <b>Strategy guidance</b> is
              situational interpretation rather than developer instruction.
            </p>
          </section>
        </article>
      </ReferenceLayout>
    </main>
  );
}
