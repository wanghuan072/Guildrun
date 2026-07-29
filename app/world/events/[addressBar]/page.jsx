import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailPageLayout from "@/src/components/DetailPageLayout";
import GptAdSlot from "@/src/components/GptAdSlot";
import { createGptElementId } from "@/src/config/gpt";
import { eventCollection } from "@/src/lib/content/world";
import { articleSchema, breadcrumbSchema } from "@/src/seo/schema";
import "@/src/styles/systems.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return eventCollection.staticParams();
}

export async function generateMetadata({ params }) {
  const event = eventCollection.get((await params).addressBar);
  if (!event) return {};
  return eventCollection.metadata(event);
}

export default async function EventDetailPage({ params }) {
  const { addressBar } = await params;
  const event = eventCollection.get(addressBar);
  if (!event) notFound();
  const title = event.title || event.name;
  const pageLinks = [["Overview", "#overview"], ["Choices", "#choices"], ["Route links", "#route"], ["Decision guide", "#strategy"]];
  const path = `/world/events/${event.addressBar}/`;
  const jsonLd = [
    articleSchema({
      headline: event.seo.h1,
      description: event.seo.description,
      path,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "World", path: "/world/" },
      { name: "Events", path: "/world/events/" },
      { name: title, path },
    ]),
  ];

  return (
    <DetailPageLayout
      section="world"
      activeHref="/world/events/"
      pageLinks={pageLinks}
      breadcrumbs={[
        { label: "World", href: "/world/" },
        { label: "Events", href: "/world/events/" },
        { label: title },
      ]}
      jsonLd={jsonLd}
    >
        <header className={`reference-page-head ${event.imageUrl ? "event-record-head" : ""}`}>
          <div>
            <span className="archive-eyebrow">{event.kind} · Record #{event.id}</span>
            <h1>{event.seo.h1}</h1>
            <p>
              {event.officialDescription ||
                "Review this event's recorded prompts, outcomes, rewards, and route connections. The best option still depends on the next fight and the active build."}
            </p>
          </div>
          {event.imageUrl ? (
            <div className="event-record-head__art">
              <Image
                src={event.imageUrl}
                alt={`${title} event illustration`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 380px"
              />
              <span>In-game event art</span>
            </div>
          ) : (
            <div className="reference-page-head__count">
              <strong>{event.choices?.length || event.paths}</strong>
              <span>recorded choices</span>
            </div>
          )}
        </header>

        <article className="record-sections">
          <section className="record-section" id="overview">
            <span className="archive-kicker">Event properties</span>
            <h2>{title} at a glance</h2>
            <div className="stat-ledger">
              <div><span>Kind</span><strong>{event.kind}</strong></div>
              <div><span>Record ID</span><strong>{event.id}</strong></div>
              <div><span>Listed paths</span><strong>{event.paths}</strong></div>
              <div><span>Fight event</span><strong>{event.isFight}</strong></div>
              <div><span>Parsed choices</span><strong>{event.choices?.length || 0}</strong></div>
              <div><span>Route connections</span><strong>{event.reachedVia?.length || 0}</strong></div>
            </div>
            {event.crossroadsDescription ? (
              <div className="event-route-brief">
                <span>Route preview</span>
                <p>{event.crossroadsDescription}</p>
              </div>
            ) : null}
          </section>

          <section className="record-section" id="choices">
            <span className="archive-kicker">Prompt → outcome → reward</span>
            <h2>{title} choices</h2>
            {event.choices?.length ? (
              <div className="table-scroll">
                <table className="reference-table">
                  <thead><tr><th>Choice</th><th>Prompt</th><th>Outcome</th><th>Rewards</th></tr></thead>
                  <tbody>
                    {event.choices.map((choice) => (
                      <tr key={choice.number}>
                        <td>{choice.number}</td>
                        <td>{choice.prompt}</td>
                        <td>{choice.outcome || "—"}</td>
                        <td>
                          {choice.rewards?.length
                            ? choice.rewards.map((reward) => `${reward.label}${reward.amount ? ` × ${reward.amount}` : ""}`).join(", ")
                            : "No separate reward recorded"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p>No choice-level extraction was available for this event record.</p>}
          </section>

          {/* GPT: banner_3 · between outcomes and route context */}
          <GptAdSlot
            id={createGptElementId(`world-event-${event.addressBar}`, "choices")}
            unit="banner3"
          />

          <section className="record-section" id="route">
            <span className="archive-kicker">Map connections</span>
            <h2>How to reach {title}</h2>
            {event.reachedVia?.length ? (
              <div className="tag-links">
                {event.reachedVia.map((route, index) => (
                  <Link href={route.href} key={`${route.label}-${index}`}>{route.label}</Link>
                ))}
              </div>
            ) : <p>This record belongs to the general route or event pool without a matched crossroad link.</p>}
          </section>

          <section className="record-section" id="strategy">
            <span className="archive-kicker">Decision framework</span>
            <h2>How to choose at {title}</h2>
            <ol className="instruction-list">
              <li><strong>Name the next failure.</strong><span>Choose between survival, damage, target access, cast timing, rank, and economy before comparing rarity.</span></li>
              <li><strong>Prefer usable value.</strong><span>A smaller reward that activates now can be stronger than a theoretical package requiring several future rolls.</span></li>
              <li><strong>Price delayed rewards.</strong><span>Quest, fight, and economy outcomes must survive long enough to pay back their opportunity cost.</span></li>
              <li><strong>Check the next route node.</strong><span>Campfires, bosses, and challenge fights change which reward creates the nearest breakpoint.</span></li>
            </ol>
            <div className="manual-link-row">
              <Link href="/world/crossroads/">Crossroads database</Link>
              <Link href="/world/stat-mods/">Event stat modifiers</Link>
              <Link href="/gameplay/growth-route/#upgrade-order">Economy guide</Link>
              <Link href="/world/events/">Back to all events</Link>
            </div>
          </section>
        </article>
    </DetailPageLayout>
  );
}
