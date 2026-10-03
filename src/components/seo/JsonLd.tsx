// Prints structured data for search engines and AI assistants. "<" is escaped so content can never close the tag.
export const JsonLd = ({ data }: { data: unknown }) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    type="application/ld+json"
  />
);
