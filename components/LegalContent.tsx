export type LegalSection = {
  heading: string;
  body: readonly string[];
};

export default function LegalContent({
  sections,
  updated,
}: {
  sections: readonly LegalSection[];
  updated?: string;
}) {
  return (
    <article className="legal">
      <div className="container legal__inner">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        {updated ? <p className="legal__updated">{updated}</p> : null}
      </div>
    </article>
  );
}
