import { searchIndex } from "@/src/lib/searchIndex";

export const dynamic = "force-static";

const compactSearchIndex = searchIndex.map((item) => [
  item.id,
  item.category,
  item.title,
  item.href,
  item.excerpt,
  item.keywords,
  item.imageUrl,
]);

export function GET() {
  return Response.json(compactSearchIndex, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
