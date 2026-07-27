export default function ChangeLedger({
  sections,
  compact = false,
  anchorId,
}) {
  const Heading = compact ? "h2" : "h3";
  const className = compact
    ? "change-group compact-change-group"
    : "change-group";

  return sections.map((section, sectionIndex) => (
    <section
      className={className}
      id={sectionIndex === 0 ? anchorId : undefined}
      key={section.name}
    >
      <Heading>
        {section.name}
        {!compact && <span>{section.records.length} records</span>}
      </Heading>
      <div>
        {section.records.map((record, recordIndex) => (
          <article key={`${record.entity}-${recordIndex}`}>
            <strong>{record.entity}</strong>
            <ul>
              {record.changes.map((change, changeIndex) => (
                <li key={`${change.label}-${changeIndex}`}>
                  <span>{change.label}</span>
                  {change.oldValue || change.newValue ? (
                    <b>
                      <del>{change.oldValue || "—"}</del>
                      <i>→</i>
                      <ins>{change.newValue || "—"}</ins>
                    </b>
                  ) : (
                    <em>{change.note || "Text updated"}</em>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  ));
}
