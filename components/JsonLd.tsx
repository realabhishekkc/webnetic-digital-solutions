// Renders a JSON-LD <script>. Pass any schema object (or array of objects).
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; schema is built from our own static content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
