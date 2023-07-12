import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { uid } = params;
  const res = await fetch(
    `https://api.mihomo.me/sr_info_parsed/${uid}?lang=en`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();

  for (const character of data["characters"]) {
    const properties = [];

    for (const attr of character["attributes"]) {
      for (const add of character["additions"]) {
        if (attr["name"] === add["name"]) {
          const d = {};
          d["name"] = attr["name"];

          if (add["percent"]) {
            d["display"] = `${
              parseFloat(attr["display"].replace("%", "")) +
              parseFloat(add["display"].replace("%", ""))
            }%`;
          } else {
            d["display"] =
              parseInt(parseFloat(attr["display"])) +
              parseInt(parseFloat(add["display"]));
          }

          d["icon"] = add["icon"];
          properties.push(d);
        }
      }

      let found = false;
      for (const d of properties) {
        if (attr["name"] === d["name"]) {
          found = true;
          break;
        }
      }

      if (!found) {
        const d = {};
        d["name"] = attr["name"];
        d["display"] = attr["display"];
        d["icon"] = attr["icon"];
        properties.push(d);
      }
    }

    for (const add of character["additions"]) {
      if (
        !["ATK", "HP", "DEF", "SPD", "CRIT DMG", "CRIT Rate"].includes(
          add["name"]
        )
      ) {
        const d = {};
        d["name"] = add["name"];
        d["display"] = add["display"];
        d["icon"] = add["icon"];
        properties.push(d);
      }
    }

    for (let i = character["relic_sets"].length - 1; i >= 1; i--) {
      if (
        character["relic_sets"][i]["name"] ===
        character["relic_sets"][i - 1]["name"]
      ) {
        character["relic_sets"].splice(i, 1);
        break;
      }
    }

    character.property = properties;
  }
  // console.log(data);
  return NextResponse.json(data);
}
