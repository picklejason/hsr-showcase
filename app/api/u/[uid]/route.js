import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { uid } = params;
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang');
  const res = await fetch(`https://api.mihomo.me/sr_info_parsed/${uid}?lang=${lang}`);
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
        addition: addition ? addition.value || 0 : 0,
        value: addition ? attribute.value + addition.value : attribute.value,
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
          value: addition.value,
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

    for (const relic of character['relics']) {
      for (const sub_affix of relic['sub_affix']) {
        const dist = [];
        const { count, step } = sub_affix;
        for (let d = 0; d < count; d++) {
          if (d < step - count) {
            dist[d] = 2;
          } else if (!step) {
            dist[d] = 0;
          } else {
            dist[d] = 1;
          }
        }
        sub_affix['dist'] = dist;
      }
    }
  }
  return NextResponse.json(data);
}
