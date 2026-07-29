import Link from "next/link";
import GptAdSlot from "@/src/components/GptAdSlot";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import { createGptElementId } from "@/src/config/gpt";
import { crossroadsReferenceData } from "@/src/lib/content/world";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.crossroads,
  path: "/world/crossroads/",
});

export default function CrossroadsPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout section="world" activeHref="/world/crossroads/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Route node database</span>
            <h1>{pageTdk.crossroads.h1}</h1>
            <p>
              Fixed milestones and random route selectors with every recorded
              path type and destination in the current Demo snapshot.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{crossroadsReferenceData.length}</strong>
            <span>route nodes</span>
          </div>
        </header>

        <div className="table-scroll">
          <table className="reference-table directory-table">
            <thead><tr><th>Crossroad</th><th>Description</th><th>Paths</th><th>Destinations</th></tr></thead>
            <tbody>
              {crossroadsReferenceData.map((crossroad) => (
                <tr id={`cr-${crossroad.id}`} key={crossroad.addressBar}>
                  <td><strong>{crossroad.name}</strong></td>
                  <td>{crossroad.description}</td>
                  <td>{crossroad.paths.length}</td>
                  <td>
                    {crossroad.paths.map((path, index) => (
                      <span className="tag-links" key={`${path.destination}-${index}`}>
                        <span>{path.type} · {path.destination}</span>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GPT: banner_3 · below the route-node database */}
        <GptAdSlot
          id={createGptElementId("world-crossroads", "route-list")}
          unit="banner3"
        />

        <section className="manual-section">
          <span className="archive-kicker">Route decision</span>
          <h2>Choose the next pressure point, not the rarest label</h2>
          <p>
            Compare the destination with the active board. A campfire is most
            valuable when a key hero is ready to rank; a fight event is useful
            only when its formation and reward fit the current life and economy;
            an event choice should repair a named weakness before the next boss.
          </p>
          <div className="manual-link-row">
            <Link href="/world/events/">Open event outcomes</Link>
            <Link href="/gameplay/growth-route/#upgrade-order">Plan Shards and shops</Link>
          </div>
        </section>
      </ReferenceLayout>
    </main>
  );
}
