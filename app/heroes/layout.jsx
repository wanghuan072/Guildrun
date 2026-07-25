import JsonLd from "@/src/components/JsonLd";
import { collectionPageSchema } from "@/src/seo/schema";
import { pageTdk } from "@/src/seo/tdk";

export default function HeroesLayout({ children }) {
  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: pageTdk.heroes.h1,
          description: pageTdk.heroes.description,
          path: "/heroes/",
        })}
      />
      {children}
    </>
  );
}
