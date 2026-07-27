import { heroesData } from "@/src/lib/content/heroes";

const modifierMap = new Map();

for (const hero of heroesData) {
  for (const modifier of hero.modifiers) {
    const key = `${modifier.name}::${modifier.effect}`;
    const current = modifierMap.get(key);
    if (current) {
      current.heroes.push({
        name: hero.name,
        href: `/heroes/${hero.addressBar}/#modifiers`,
      });
      for (const heroClass of modifier.classes || []) {
        current.classes.add(heroClass);
      }
      continue;
    }

    modifierMap.set(key, {
      id: `modifier-${modifierMap.size + 1}`,
      name: modifier.name,
      effect: modifier.effect,
      classes: new Set(modifier.classes || []),
      heroes: [
        {
          name: hero.name,
          href: `/heroes/${hero.addressBar}/#modifiers`,
        },
      ],
    });
  }
}

export const rankModifiersData = [...modifierMap.values()]
  .map((modifier) => ({
    ...modifier,
    classes: [...modifier.classes].sort((left, right) =>
      left.localeCompare(right),
    ),
    heroes: modifier.heroes.sort((left, right) =>
      left.name.localeCompare(right.name),
    ),
  }))
  .sort((left, right) => left.name.localeCompare(right.name));

export const rankModifierClasses = [
  ...new Set(rankModifiersData.flatMap((modifier) => modifier.classes)),
].sort((left, right) => left.localeCompare(right));
