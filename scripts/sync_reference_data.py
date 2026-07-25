"""Build-time reference snapshot for Guildrun's public Demo data.

The generated JSON is intentionally factual: names, numerical values, effects,
rarities, prices, and route records. Editorial strategy remains authored in the
Next.js pages so this site does not mirror the source site's prose or layout.
"""

from __future__ import annotations

import json
import re
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "src" / "data" / "generated"
IMAGE_DIR = ROOT / "public" / "images"
BASE_URL = "https://guildrun.wiki"
BUILD_ID = "e4c4bb13"
SESSION = requests.Session()
SESSION.headers.update({"User-Agent": "GuildrunGuideDataSnapshot/1.0"})


def get_soup(path: str) -> BeautifulSoup:
    response = SESSION.get(urljoin(BASE_URL, path), timeout=45)
    response.raise_for_status()
    response.encoding = "utf-8"
    return BeautifulSoup(response.text, "html.parser")


def text(node) -> str:
    if not node:
        return ""
    return re.sub(r"\s+", " ", node.get_text(" ", strip=True)).strip()


def slug_from_href(href: str) -> str:
    return urlparse(href).path.rstrip("/").split("/")[-1]


def download_asset(source: str, destination: Path) -> None:
    if not source:
        return
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and destination.stat().st_size > 0:
        return
    response = SESSION.get(urljoin(BASE_URL, source), timeout=45)
    response.raise_for_status()
    destination.write_bytes(response.content)


def write_json(name: str, payload) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / name).write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def catalogue(path: str, kind: str) -> list[dict]:
    soup = get_soup(path)
    records = []
    for row in soup.select(".rowlink"):
        cells = row.find_all("td", recursive=False)
        link = row.select_one(f'a[href^="/{kind}/"]')
        if not link or len(cells) < 4:
            continue

        slug = slug_from_href(link["href"])
        image = row.select_one(".thumb__art")
        image_path = f"/images/wiki/{kind}/{slug}.webp"
        if image and image.get("src"):
            download_asset(image["src"], ROOT / "public" / image_path.lstrip("/"))

        if kind == "items":
            record = {
                "id": len(records) + 1,
                "name": text(cells[1]),
                "addressBar": slug,
                "rarity": text(cells[2]),
                "effect": text(cells[3]),
                "price": text(cells[4]) if len(cells) > 4 else "Not sold",
                "imageUrl": image_path,
                "sourcePath": link["href"],
            }
        elif kind == "relics":
            record = {
                "id": len(records) + 1,
                "name": text(cells[1]),
                "addressBar": slug,
                "rarity": text(cells[2]),
                "effect": text(cells[3]),
                "price": text(cells[4]) if len(cells) > 4 else "Not sold",
                "imageUrl": image_path,
                "sourcePath": link["href"],
            }
        else:
            record = {
                "id": len(records) + 1,
                "name": text(cells[1]),
                "addressBar": slug,
                "attackType": text(cells[2]),
                "healthRange": text(cells[3]),
                "variantCount": text(cells[4]),
                "appearsIn": text(cells[5]) if len(cells) > 5 else "",
                "imageUrl": image_path,
                "sourcePath": link["href"],
            }
        records.append(record)
    return records


def hero_details() -> list[dict]:
    index = get_soup("/heroes/")
    links = []
    for link in index.select('a.hero-banner-card[href^="/heroes/"]'):
        href = link.get("href")
        if href and href not in links:
            links.append(href)

    heroes = []
    for href in links:
        soup = get_soup(href)
        slug = slug_from_href(href)
        header = soup.select_one(".ehead")
        badges = [text(node) for node in soup.select(".ehead__badges > .badge")]
        classes = [text(node) for node in soup.select(".ehead__badges > .badge--class")]
        keywords = [
            value
            for value in badges[2:]
            if value not in classes and value not in {"Melee", "Ranged"}
        ]

        stats = {
            text(node.select_one(".k")): text(node.select_one(".v"))
            for node in soup.select(".statgrid")[0].select(".stat")
        }
        derived = {}
        grids = soup.select(".statgrid")
        if len(grids) > 1:
            for node in grids[1].select(".stat"):
                derived[text(node.select_one(".k"))] = text(node.select_one(".v"))

        gains = [
            {
                "name": text(node.select_one(".gain__k")),
                "value": text(node.select_one(".gain__v")),
                "priority": next(
                    (name for name in ["primary", "secondary", "base"] if name in node.get("class", [])),
                    "base",
                ),
            }
            for node in soup.select(".gainlist .gain")
        ]

        rank_images = {}
        for rank, image in zip(["C", "B", "A", "S"], soup.select(".rung .hrc__art")[:4]):
            local = f"/images/heroes/{slug}/rank-{rank.lower()}.webp"
            download_asset(image.get("src"), ROOT / "public" / local.lstrip("/"))
            rank_images[rank] = local

        base_ability = soup.select_one(".rung .ability")
        base_icon = soup.select_one(".rung .eicon__art")
        base_icon_path = f"/images/heroes/{slug}/base-ability.webp"
        if base_icon and base_icon.get("src"):
            download_asset(base_icon["src"], ROOT / "public" / base_icon_path.lstrip("/"))
        else:
            base_icon_path = rank_images.get("C", f"/images/heroes/{slug}.webp")

        specializations = []
        rung_b = soup.select(".rung")[1] if len(soup.select(".rung")) > 1 else None
        if rung_b:
            for index_number, spec in enumerate(rung_b.select(".spec"), start=1):
                ability = spec.select_one(".ability")
                icon = spec.select_one(".eicon__art")
                icon_path = f"/images/heroes/{slug}/specialization-{index_number}.webp"
                if icon and icon.get("src"):
                    download_asset(icon["src"], ROOT / "public" / icon_path.lstrip("/"))
                name_node = spec.select_one(".spec__label")
                added_class_node = spec.select_one(".badge--class")
                specializations.append(
                    {
                        "name": text(name_node),
                        "addedClass": text(added_class_node),
                        "type": text(ability.select_one(".badge")) if ability else "Passive Ability",
                        "effect": text(ability.select_one(".desc")) if ability else "",
                        "iconUrl": icon_path,
                    }
                )

        modifiers = []
        rung_a = soup.select(".rung")[2] if len(soup.select(".rung")) > 2 else None
        if rung_a:
            for modifier in rung_a.select(".rm"):
                name = text(modifier.select_one(".rm__head h3"))
                modifier_classes = [
                    text(node)
                    for node in modifier.select(".rm__badges .clsbadge")
                ]
                modifiers.append(
                    {
                        "name": name,
                        "classes": modifier_classes,
                        "effect": text(modifier.select_one(".rm__desc, .desc")),
                    }
                )

        lore_body = soup.select_one(".lorefold__body")
        lore_paragraphs = [text(node) for node in lore_body.find_all("p", recursive=False)] if lore_body else []
        title_node = soup.select_one(".ehead__title .subtitle")
        hero = {
            "name": text(soup.select_one(".ehead__title h1")),
            "addressBar": slug,
            "title": text(title_node),
            "guild": badges[0] if badges else "",
            "attackType": next((value for value in badges if value in {"Melee", "Ranged"}), ""),
            "classes": classes,
            "keywords": keywords,
            "quote": text(soup.select_one(".ehead__meta .quote")),
            "lore": lore_paragraphs,
            "stats": stats,
            "derived": derived,
            "rankGains": gains,
            "rankImages": rank_images,
            "baseAbility": {
                "name": text(base_ability.select_one(".ability__head strong")) if base_ability else "",
                "type": text(base_ability.select_one(".ability__head .badge")) if base_ability else "",
                "effect": text(base_ability.select_one(".desc")) if base_ability else "",
                "iconUrl": base_icon_path,
            },
            "specializations": specializations,
            "modifiers": modifiers,
            "sourcePath": href,
        }
        splash = header.select_one(".ehead__splash") if header else None
        if splash and splash.get("src"):
            splash_path = f"/images/heroes/{slug}/splash.webp"
            download_asset(splash["src"], ROOT / "public" / splash_path.lstrip("/"))
            hero["splashUrl"] = splash_path
        heroes.append(hero)
        print(f"hero {len(heroes):02d}/{len(links)} {hero['name']}")
        time.sleep(0.04)
    return heroes


def world_records() -> dict:
    stages_soup = get_soup("/world/stages/")
    stages = []
    for row in stages_soup.select(".rowlink"):
        cells = row.find_all("td", recursive=False)
        link = row.select_one('a[href^="/world/stages/"]')
        if not link or len(cells) < 9:
            continue
        stages.append(
            {
                "id": slug_from_href(link["href"]),
                "name": text(cells[0]),
                "stageType": text(cells[1]),
                "act": text(cells[2]),
                "floor": text(cells[3]),
                "difficulty": text(cells[4]),
                "enemyCount": text(cells[5]),
                "effectiveHealth": text(cells[6]),
                "effectiveOffense": text(cells[7]),
                "gold": text(cells[8]),
            }
        )

    events_soup = get_soup("/world/events/")
    events = []
    for row in events_soup.select(".rowlink"):
        cells = row.find_all("td", recursive=False)
        link = row.select_one('a[href^="/world/events/"]')
        if not link or len(cells) < 4:
            continue
        events.append(
            {
                "id": slug_from_href(link["href"]),
                "name": text(cells[0]),
                "paths": text(cells[2]),
                "isFight": text(cells[3]),
            }
        )

    crossroads_soup = get_soup("/world/crossroads/")
    crossroads = []
    for card in crossroads_soup.select(".cr"):
        crossroads.append(
            {
                "name": text(card.select_one("h3")),
                "description": text(card.select_one(".muted")),
                "paths": [
                    {
                        "type": text(path.select_one(".path__type")),
                        "destination": text(path.select_one(".path__to")),
                    }
                    for path in card.select(".path")
                ],
            }
        )
    return {"stages": stages, "events": events, "crossroads": crossroads}


def patch_snapshot() -> dict:
    soup = get_soup("/patches/")
    sections = []
    for section in soup.select(".patch-section"):
        heading = section.find(["h2", "h3"])
        rows = []
        for row in section.select(".ledger-row"):
            entity = text(row.select_one(".entity-name"))
            changes = []
            for change in row.select(".change-line"):
                changes.append(
                    {
                        "label": text(change.select_one(".change-label")),
                        "oldValue": text(change.select_one(".old-value")),
                        "newValue": text(change.select_one(".new-value")),
                        "note": text(change.select_one(".rework-note")),
                    }
                )
            rows.append({"entity": entity, "changes": changes})
        sections.append({"name": text(heading), "records": rows})
    return {
        "buildId": BUILD_ID,
        "snapshotDate": "2026-07-24",
        "sections": sections,
    }


def main() -> None:
    items = catalogue("/items/", "items")
    relics = catalogue("/relics/", "relics")
    enemies = catalogue("/enemies/", "enemies")
    heroes = hero_details()
    world = world_records()
    patches = patch_snapshot()

    write_json("items.json", items)
    write_json("relics.json", relics)
    write_json("enemies.json", enemies)
    write_json("heroes.json", heroes)
    write_json("world.json", world)
    write_json("patches.json", patches)
    write_json(
        "snapshot-meta.json",
        {
            "source": BASE_URL,
            "buildId": BUILD_ID,
            "snapshotDate": "2026-07-24",
            "counts": {
                "heroes": len(heroes),
                "items": len(items),
                "relics": len(relics),
                "enemies": len(enemies),
                "stages": len(world["stages"]),
                "events": len(world["events"]),
                "crossroads": len(world["crossroads"]),
            },
        },
    )
    print(
        f"saved {len(heroes)} heroes, {len(items)} items, {len(relics)} relics, "
        f"{len(enemies)} enemies, {len(world['stages'])} stages, "
        f"{len(world['events'])} events"
    )


if __name__ == "__main__":
    main()
