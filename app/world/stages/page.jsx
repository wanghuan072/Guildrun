import ReferenceLayout from "@/src/components/ReferenceLayout";
import StageExplorer from "@/src/components/StageExplorer";
import { stagesReferenceData } from "@/src/lib/content/world";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.stages,
  path: "/world/stages/",
});

export default function StagesPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout section="world" activeHref="/world/stages/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Encounter database</span>
            <h1>{pageTdk.stages.h1}</h1>
            <p>
              Filter campaign, event-fight, and Endless records. Open a
              stage for its exact enemy lineup, per-unit stats, rewards,
              environment, and preparation links.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{stagesReferenceData.length}</strong>
            <span>formations</span>
          </div>
        </header>
        <StageExplorer stages={stagesReferenceData} />
      </ReferenceLayout>
    </main>
  );
}
