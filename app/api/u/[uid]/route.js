import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { uid } = params;
  const res = await fetch(`https://api.mihomo.me/sr_info_parsed/${uid}?lang=en`, { next: { revalidate: 180 } });
  const data = await res.json();

  for (const character of data['characters']) {
    const attributeMap = {};
    character['attributes'].forEach((attribute) => {
      attributeMap[attribute.field] = attribute;
    });

    const additionMap = {};
    character['additions'].forEach((addition) => {
      additionMap[addition.field] = addition;
    });

    const combinedAttributes = [];

    // Iterate through attributes and process both attributes and corresponding additions
    character['attributes'].forEach((attribute) => {
      const addition = additionMap[attribute.field];
      const totalValue = parseFloat(attribute.display || '0') + (addition ? parseFloat(addition.display || '0') : 0);

      combinedAttributes.push({
        name: attribute.name,
        icon: attribute.icon,
        base: attribute.display || 0,
        addition: addition ? addition.display || 0 : 0,
        display: totalValue.toFixed(attribute.percent ? 1 : 0) + (attribute.percent ? '%' : ''),
      });

      // Mark the addition as processed
      if (addition) {
        additionMap[attribute.field] = null;
      }
    });

    // Process remaining unprocessed additions
    character['additions'].forEach((addition) => {
      if (additionMap[addition.field] !== null) {
        combinedAttributes.push({
          name: addition.name,
          icon: addition.icon,
          display: addition.display,
        });
      }
    });

    const set_map = new Map();

    for (const relic_set of character['relic_sets']) {
      const { id, num } = relic_set;
      if (!set_map.has(id) || num > set_map.get(id).num) {
        set_map.set(id, relic_set);
      }
    }

    character['relic_sets'] = Array.from(set_map.values());

    character.property = combinedAttributes;
  }
  return NextResponse.json(data);
}
