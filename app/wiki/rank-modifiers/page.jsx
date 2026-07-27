import ModifierExplorer from "@/src/components/ModifierExplorer";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import {
  rankModifierClasses,
  rankModifiersData,
} from "@/src/lib/content/modifiers";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";
import "@/src/styles/systems.css";

export const metadata = createMetadata({
  ...pageTdk.rankModifiers,
  path: "/wiki/rank-modifiers/",
});

export default function RankModifiersPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout section="wiki" activeHref="/wiki/rank-modifiers/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Rank A and S offer pool</span>
            <h1>{pageTdk.rankModifiers.h1}</h1>
            <p>
              Search the unique modifier pool by class, trigger, effect, or
              related Hero. These are rank-up offers tied to active classes, not
              the permanent stat changes awarded by world events.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{rankModifiersData.length}</strong>
            <span>unique modifiers</span>
          </div>
        </header>
        <ModifierExplorer
          classes={rankModifierClasses}
          modifiers={rankModifiersData}
        />
      </ReferenceLayout>
    </main>
  );
}
