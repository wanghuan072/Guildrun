import Image from "next/image";
import Link from "next/link";
import GptAdSlot from "@/src/components/GptAdSlot";
import JsonLd from "@/src/components/JsonLd";
import { createGptElementId } from "@/src/config/gpt";
import dataset from "@/src/data/dataset.json";
import { faqPageSchema } from "@/src/seo/schema";
import { createMetadata } from "@/src/seo/siteConfig";
import { pageTdk } from "@/src/seo/tdk";

export const metadata = createMetadata({
  ...pageTdk.releaseDate,
  path: "/release-date/",
  image: "/images/home/official-hero-lineup.webp",
});

const faq = [
  [
    "When is Guildrun releasing?",
    "The current development target is 2027. No exact launch date or price is announced.",
  ],
  [
    "Can I play Guildrun now?",
    "Yes. A free standalone Guildrun Demo launched on July 16, 2026 for Windows and macOS.",
  ],
  [
    "Will Demo progress carry over?",
    "Metaprogression, difficulty unlocks, and hero mastery stars are planned to carry for the same Steam account.",
  ],
  [
    "Does Guildrun have co-op?",
    "The current Demo is single-player. Two-player co-op is in development, with no launch date announced.",
  ],
];

export default function ReleaseDatePage() {
  return (
    <main className="page-main">
      <JsonLd data={faqPageSchema(faq)} />
      <section className="page-hero-section">
        <div className="page-hero-image">
          <Image
            src="/images/home/official-hero-lineup.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="container page-hero-content">
          <div className="page-hero-copy">
            <span className="archive-eyebrow">Release information</span>
            <h1>{pageTdk.releaseDate.h1}</h1>
            <p>
              The free Demo is available now. The premium full game is planned
              for 2027, with no exact date or price announced.
            </p>
            <div className="manual-link-row">
              <Link href="/guides/guildrun-beginner-guide/">Start with the beginner guide</Link>
              <Link href="/updates/">Follow updates</Link>
            </div>
          </div>
          <aside className="page-hero-meta">
            <span>Current status</span>
            <strong>Demo live · Full release planned for 2027</strong>
            <p>
              Plans are labeled separately from features already available in
              {dataset.gameVersion}.
            </p>
          </aside>
        </div>
      </section>
      {/* GPT: banner_1 */}
      <GptAdSlot id={createGptElementId("release-date", 1)} unit="banner1" />
      <section className="page-section">
        <div className="container page-content">
          <div className="page-heading">
            <span className="archive-eyebrow">Release timeline</span>
            <h2>What is available and what remains planned</h2>
          </div>
          <ol className="system-flow">
            <li><span>JUL 16, 2026</span><h3>Demo launch</h3><p>Free standalone Windows and macOS build.</p></li>
            <li><span>JUL 23, 2026</span><h3>Demo 0.5.1</h3><p>First public balance and fixes pass.</p></li>
            <li><span>IN DEVELOPMENT</span><h3>Two-player co-op</h3><p>No availability date is announced.</p></li>
            <li><span>2027 PLAN</span><h3>Full game</h3><p>Premium one-time purchase with no exact date or price announced.</p></li>
          </ol>
          <div className="faq-list">
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* GPT: banner_2 */}
      <GptAdSlot id={createGptElementId("release-date", 2)} unit="banner2" />
    </main>
  );
}
