import GptAdSlot from "@/src/components/GptAdSlot";
import JsonLd from "@/src/components/JsonLd";
import { createGptElementId } from "@/src/config/gpt";
import { webPageSchema } from "@/src/seo/schema";

export default function LegalDocument({ document, path, tdk }) {
  return (
    <main className="page-main">
      <JsonLd
        data={webPageSchema({
          name: tdk.h1,
          description: tdk.description,
          path,
        })}
      />
      <section className="page-section">
        <div className="container page-content">
          <header className="page-heading">
            <span className="archive-eyebrow">{document.eyebrow}</span>
            <h1>{tdk.h1}</h1>
            <p>{document.intro}</p>
          </header>
          {/* GPT: banner_1 */}
          <GptAdSlot
            id={createGptElementId(path, "legal-start")}
            unit="banner1"
          />
          <article className="detail-article">
            {document.sections.map((section) => (
              <section className="detail-section-block" key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
          {/* GPT: banner_2 */}
          <GptAdSlot
            id={createGptElementId(path, "legal-end")}
            unit="banner2"
          />
        </div>
      </section>
    </main>
  );
}
