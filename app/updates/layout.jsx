import JsonLd from "@/src/components/JsonLd";
import { collectionPageSchema } from "@/src/seo/schema";
import { pageTdk } from "@/src/seo/tdk";

export default function UpdatesLayout({ children }) {
  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: pageTdk.updates.h1,
          description: pageTdk.updates.description,
          path: "/updates/",
        })}
      />
      {children}
    </>
  );
}
