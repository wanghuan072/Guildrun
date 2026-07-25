export const runStructure = [
  {
    phase: "Opening draft",
    decision: "Choose one of three hero-and-relic bundles.",
    playerCheck:
      "Prefer a clear first job and a usable relic trigger over a bundle that only looks rare.",
  },
  {
    phase: "Regular fights",
    decision: "Place the active formation, then let combat resolve.",
    playerCheck:
      "Watch first contact, the first important cast, and the first hero to fall.",
  },
  {
    phase: "Rewards and shops",
    decision: "Recruit, rank, equip, reroll, sell, or freeze offers.",
    playerCheck:
      "Spend against one observed failure and preserve Shards once that failure is fixed.",
  },
  {
    phase: "Campfires and events",
    decision: "Take route-dependent upgrades, trades, fights, or recovery.",
    playerCheck:
      "Compare the permanent run value with the health and flexibility needed for the next floor.",
  },
  {
    phase: "Boss and Auction House",
    decision: "Clear the act boss, then choose from a larger premium shop.",
    playerCheck:
      "Treat board size, a key rank, and an engine relic as competing power spikes.",
  },
  {
    phase: "Endless or next run",
    decision: "Continue with a scaling engine or bank what the run unlocked.",
    playerCheck:
      "Separate repeatable growth from flat bonuses that are already being outscaled.",
  },
];

export const regularShopRules = [
  ["Starting Shards", "15", "Enough to make an opening decision without forcing a full build."],
  ["Offers", "3 heroes · 2 items · 1 relic", "Read the whole shop before buying the first attractive piece."],
  ["Sale", "One random offer at 25% off", "A discount improves value; it does not create a missing trigger."],
  ["Reroll", "Starts at 1 Shard, then rises by 1", "Name the exact result you are rolling for."],
  ["Freeze", "Carries offers to the next regular shop", "Freeze a real breakpoint, not a vague future possibility."],
  ["Sell", "Heroes and items return 66%", "Selling can fund a pivot, but repeated reversals drain the run."],
  ["Relic sale", "Relics cannot be sold", "Narrow relics carry a larger opportunity cost."],
];

export const auctionHouseRules = [
  ["Offers", "3 heroes · 4 items · 3 relics"],
  ["Guaranteed slots", "Legendary offer · legendary quest relic · epic item · Harmony Crystal"],
  ["Reroll", "Starts at 7 Shards"],
  ["Freeze", "Unavailable"],
  ["Board-size choice", "Team Size competes with immediate ranks, equipment, and relic engines"],
];

export const priceReference = [
  ["Hero", "C 15 · B 25 · A 35 · S 45"],
  ["Item", "Common 5 · Rare 15 · Epic 25"],
  ["Relic", "Common 10 · Rare 20 · Epic 30 · Legendary 40"],
  ["Team Size", "45"],
];

export const combatRules = [
  {
    name: "Damage order",
    rule: "Immunity → Crit → Defense → Shields → HP",
    use:
      "If damage looks unexpectedly low, check the earliest layer that changed instead of buying raw Attack immediately.",
  },
  {
    name: "Mana gain",
    rule: "+5 Mana per auto attack; passive regeneration ticks every 2 seconds",
    use:
      "Range and Attack Speed can change cast timing because both affect how soon attacks begin and repeat.",
  },
  {
    name: "Ability casting",
    rule: "A hero casts automatically at the required Mana threshold",
    use:
      "Protect the cast window and watch for movement, control, or mana-lock rules that delay it.",
  },
  {
    name: "Front and back rows",
    rule: "Front row is y=3; back row is y=0",
    use:
      "Row-sensitive effects care about board coordinates, not whether a hero merely appears visually near the front.",
  },
  {
    name: "Adjacency",
    rule: "Adjacent means a hex distance of 1",
    use:
      "Check every linked hero after moving one unit; a single hex can break several adjacency effects.",
  },
  {
    name: "Storm",
    rule: "Begins at 50 seconds and escalates; Riftbreaker appears at 90 seconds",
    use:
      "A formation that only survives without finishing eventually loses to the anti-stall clock.",
  },
];

export const targetingRules = [
  ["1", "Closest valid hero", "Make the intended anchor strictly closer whenever possible."],
  ["2", "Class priority on a distance tie", "Tank → Vanguard → Warrior → Duelist → Assassin → Mage → Mystic."],
  ["3", "Targeting health", "Lower log2(current HP) + Defense / 100 wins the tie."],
  ["4", "Hidden identity", "Avoid exact ties when the opening target must be predictable."],
];

export const targetingExceptions = [
  "A unit ranks targets before checking its route. If the best target cannot be reached, pathfinding can force a fallback.",
  "Once an attack begins, the victim is locked. A launched projectile can still connect after the target gains Stealth.",
  "A pull or teleport does not automatically cause every enemy with a valid target to choose again.",
  "Taunt, Stealth, range, and special ability text can override the normal expectation; read the exact mechanic before moving the board.",
];

export const growthFacts = [
  ["Active board", "Starts at 3 heroes and can grow to 5"],
  ["Roster", "Up to 6 heroes including reserve"],
  ["Items", "3 base slots per hero, with a hard cap of 6"],
  ["Ranks", "C → B → A → S"],
  ["Rank B", "Choose one of three fixed specializations"],
  ["Ranks A and S", "Choose modifiers from the hero's active class pool"],
  ["Rank S", "Demo maximum and one additional item slot"],
  ["Reserve", "Can still contribute when an effect explicitly uses Backup"],
];

export const recoveryRules = [
  {
    name: "Emergency Rewind",
    rule:
      "Starts at 10 and increases by 5 after each win. It can absorb a normal-fight loss and let you retry.",
    playerUse:
      "Use the retry to test a precise positioning or purchase change, not to repeat the same board unchanged.",
  },
  {
    name: "Shard Maximizer",
    rule: "Interest follows min(Shards // 5, 20).",
    playerUse:
      "Saving is useful only while the board remains stable; missing a clear power spike to protect interest can cost the run.",
  },
  {
    name: "Permanent versus battle-only growth",
    rule:
      "Some gains last for the run while others reset after combat. The effect text decides which layer is being changed.",
    playerUse:
      "Deep-run plans need repeatable or run-long growth, while a temporary effect can still be correct for the next boss.",
  },
];
