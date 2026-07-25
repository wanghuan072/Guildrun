"""Fetch structured detail records that the compact catalogue snapshot omits.

This companion script keeps factual game fields separate from editorial copy:
enemy abilities and tier variants, event choices, stage formations, challenge
thresholds, and event-granted stat modifiers.
"""

from __future__ import annotations

import html
import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "src" / "data" / "generated"
BASE_URL = "https://guildrun.wiki"
HEADERS = {"User-Agent": "GuildrunGuideDataSnapshot/1.1"}


def clean(node) -> str:
    if not node:
        return ""
    return re.sub(r"\s+", " ", node.get_text(" ", strip=True)).strip()


def soup_for(path: str) -> BeautifulSoup:
    response = requests.get(urljoin(BASE_URL, path), headers=HEADERS, timeout=45)
    response.raise_for_status()
    response.encoding = "utf-8"
    return BeautifulSoup(response.text, "html.parser")


def slug_from_href(href: str) -> str:
    return urlparse(href).path.rstrip("/").split("/")[-1]


def parse_table(table) -> dict:
    headers = [clean(cell) for cell in table.select("thead th")]
    rows = []
    for row in table.select("tbody tr"):
        cells = [clean(cell) for cell in row.find_all("td", recursive=False)]
        if cells:
            rows.append(dict(zip(headers, cells)))
    return {"columns": headers, "rows": rows}


def enemy_detail(record: dict) -> dict:
    soup = soup_for(record["sourcePath"])
    page_text = clean(soup.select_one("main"))
    counts = re.search(r"(\d+)\s+bodies\s+\|\s+(\d+)\s+EnemyData variants", page_text)

    abilities = []
    for row in soup.select(".ability-table tbody tr"):
        cells = row.find_all("td", recursive=False)
        ability_node = row.select_one("[data-tip-title]")
        if len(cells) < 3:
            continue
        description_html = html.unescape(ability_node.get("data-tip-body", "")) if ability_node else ""
        abilities.append(
            {
                "type": clean(cells[0]),
                "name": ability_node.get("data-tip-title", clean(cells[1])) if ability_node else clean(cells[1]),
                "description": clean(BeautifulSoup(description_html, "html.parser")),
                "variants": clean(cells[2]),
            }
        )

    variant_groups = []
    for table in soup.select("table.vtable"):
        section = table.find_parent("section")
        heading = section.find("h2") if section else table.find_previous("h2")
        parsed = parse_table(table)
        variant_groups.append(
            {
                "name": clean(heading).replace(" variants", ""),
                "count": len(parsed["rows"]),
                "columns": parsed["columns"],
                "rows": parsed["rows"],
            }
        )

    scaling_table = soup.select_one("table.scaling-table")
    scaling = parse_table(scaling_table)["rows"] if scaling_table else []

    return {
        "addressBar": record["addressBar"],
        "bodyCount": int(counts.group(1)) if counts else None,
        "enemyDataVariantCount": int(counts.group(2)) if counts else None,
        "abilities": abilities,
        "variantGroups": variant_groups,
        "endlessScaling": scaling,
    }


def event_detail(record: dict) -> dict:
    soup = soup_for(f"/world/events/{record['id']}/")
    choices = []
    for choice in soup.select(".choice"):
        rewards = []
        for reward in choice.select(".rw"):
            rewards.append(
                {
                    "label": clean(reward.select_one(".rw__label")),
                    "amount": clean(reward.select_one(".rw__amt")),
                }
            )
        choices.append(
            {
                "number": clean(choice.select_one(".choice__num")),
                "prompt": clean(choice.select_one(".choice__text")),
                "outcome": clean(choice.select_one(".choice__out")).lstrip("→ ").strip(),
                "rewards": rewards,
            }
        )

    reached_via = [
        {
            "label": clean(link),
            "href": link.get("href", ""),
        }
        for link in soup.select("#route a.rchip")
    ]
    return {
        "id": record["id"],
        "title": clean(soup.select_one("h1")) or record["name"],
        "choices": choices,
        "reachedVia": reached_via,
    }


def stage_detail(record: dict) -> dict:
    soup = soup_for(f"/world/stages/{record['id']}/")
    tokens = []
    for index, token in enumerate(soup.select("#formation .cell.tok")):
        image = token.select_one("img")
        tokens.append(
            {
                "position": index + 1,
                "name": token.get("data-tip-title", clean(token)),
                "enemySlug": slug_from_href(token.get("href", "")),
                "stats": token.get("data-tip-body", ""),
                "meta": token.get("data-tip-meta", ""),
                "image": image.get("src", "").split("?")[0] if image else "",
            }
        )

    scene = {
        clean(row.select_one("dt")): clean(row.select_one("dd"))
        for row in soup.select("#scene dl > div")
    }
    reward_stats = {
        clean(stat.select_one(".k")): clean(stat.select_one(".v"))
        for stat in soup.select("#rewards .stat")
    }

    return {
        "id": record["id"],
        "title": clean(soup.select_one("h1")) or record["name"],
        "formation": tokens,
        "rewards": reward_stats,
        "scene": scene,
    }


def stat_mod_records() -> list[dict]:
    soup = soup_for("/world/stat-mods/")
    groups = []
    for section in soup.select('section[id^="group-"]'):
        table = section.select_one("table")
        if not table:
            continue
        rows = []
        for row in table.select("tbody tr"):
            cells = row.find_all("td", recursive=False)
            if len(cells) < 3:
                continue
            rows.append(
                {
                    "id": row.get("id", ""),
                    "name": clean(cells[0]),
                    "value": clean(cells[1]),
                    "events": [
                        {
                            "name": clean(link),
                            "id": slug_from_href(link.get("href", "")),
                        }
                        for link in cells[2].select('a[href^="/world/events/"]')
                    ],
                }
            )
        groups.append({"name": clean(section.select_one("h3")), "rows": rows})
    return groups


def fight_mode_records() -> list[dict]:
    soup = soup_for("/world/fight-modes/")
    records = []
    for heading in soup.select("h3"):
        title = clean(heading)
        if not title or title in {"Formation"}:
            continue
        parent = heading.find_parent("article", class_="fm") or heading.parent
        tables = [parse_table(table) for table in parent.select("table")]
        enemies = [
            {
                "name": link.get("data-tip-title", clean(link)),
                "slug": slug_from_href(link.get("href", "")),
            }
            for link in parent.select(".cell.tok[data-tip-title]")
        ]
        records.append(
            {
                "name": title,
                "summary": clean(parent),
                "tables": tables,
                "enemies": enemies,
            }
        )
    return records


def load_json(name: str):
    return json.loads((DATA_DIR / name).read_text(encoding="utf-8"))


def write_json(name: str, payload) -> None:
    (DATA_DIR / name).write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def parallel_map(records: list[dict], worker, label: str) -> list[dict]:
    results = []
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(worker, record): record for record in records}
        for index, future in enumerate(as_completed(futures), start=1):
            record = futures[future]
            result = future.result()
            results.append(result)
            print(f"{label} {index:03d}/{len(records):03d} {record.get('name', record.get('id'))}")
    lookup = {str(result.get("addressBar", result.get("id"))): result for result in results}
    return [
        lookup[str(record.get("addressBar", record.get("id")))]
        for record in records
    ]


def main() -> None:
    enemies = load_json("enemies.json")
    world = load_json("world.json")
    write_json("enemy-details.json", parallel_map(enemies, enemy_detail, "enemy"))
    write_json("event-details.json", parallel_map(world["events"], event_detail, "event"))
    write_json("stage-details.json", parallel_map(world["stages"], stage_detail, "stage"))
    write_json("stat-mods.json", stat_mod_records())
    write_json("fight-modes.json", fight_mode_records())
    print("saved structured enemy, event, stage, stat-mod and fight-mode records")


if __name__ == "__main__":
    main()
