import JsonLd from "@/src/components/JsonLd";
import { collectionPageSchema } from "@/src/seo/schema";
import { pageTdk } from "@/src/seo/tdk";

export default function GameplayLayout({ children }) {
  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: pageTdk.gameplay.h1,
          description: pageTdk.gameplay.description,
          path: "/gameplay/",
        })}
      />
      {children}
    </>
  );
}
