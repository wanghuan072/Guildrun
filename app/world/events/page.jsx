import EventExplorer from "@/src/components/EventExplorer";
import ReferenceLayout from "@/src/components/ReferenceLayout";
import { eventsReferenceData } from "@/src/lib/content/world";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.events,
  path: "/world/events/",
});

export default function EventsPage() {
  return (
    <main className="archive-main">
      <ReferenceLayout section="world" activeHref="/world/events/">
        <header className="reference-page-head">
          <div>
            <span className="archive-eyebrow">Choice and outcome database</span>
            <h1>{pageTdk.events.h1}</h1>
            <p>
              Search current decision and fight events, then open an exact record
              for prompts, outcomes, rewards, and the crossroads that reach it.
            </p>
          </div>
          <div className="reference-page-head__count">
            <strong>{eventsReferenceData.length}</strong>
            <span>events</span>
          </div>
        </header>
        <EventExplorer events={eventsReferenceData} />
      </ReferenceLayout>
    </main>
  );
}
