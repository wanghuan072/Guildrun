import JsonLd from "@/src/components/JsonLd";
import { collectionPageSchema } from "@/src/seo/schema";
import { pageTdk } from "@/src/seo/tdk";

export default function GuidesLayout({ children }) {
  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: pageTdk.guides.h1,
          description: pageTdk.guides.description,
          path: "/guides/",
        })}
      />
      {children}
    </>
  );
}
