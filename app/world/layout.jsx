import JsonLd from "@/src/components/JsonLd";
import { collectionPageSchema } from "@/src/seo/schema";
import { pageTdk } from "@/src/seo/tdk";

export default function WorldLayout({ children }) {
  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: pageTdk.world.h1,
          description: pageTdk.world.description,
          path: "/world/",
        })}
      />
      {children}
    </>
  );
}
