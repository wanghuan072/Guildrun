import JsonLd from "@/src/components/JsonLd";
import { collectionPageSchema } from "@/src/seo/schema";
import { pageTdk } from "@/src/seo/tdk";

export default function WikiLayout({ children }) {
  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: pageTdk.wiki.h1,
          description: pageTdk.wiki.description,
          path: "/wiki/",
        })}
      />
      {children}
    </>
  );
}
