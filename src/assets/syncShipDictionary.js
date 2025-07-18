import fs from 'fs';
import fetch from 'node-fetch';

const DICTIONARY_PATH = './ship-dictionary.json';
const API_BASE = 'https://api.star-citizen.wiki/api/v2';
const FORCE_UPDATE = process.argv.includes('--force');

function loadDictionary() {
  if (!fs.existsSync(DICTIONARY_PATH)) {
    return {
      version: '0.1.0',
      dictionary: {}
    };
  }
  return JSON.parse(fs.readFileSync(DICTIONARY_PATH, 'utf-8'));
}

function saveDictionary(data) {
  fs.writeFileSync(DICTIONARY_PATH, JSON.stringify(data, null, 2));
}

async function fetchAllVehicles() {
  let page = 1;
  const vehicles = [];

  while (true) {
    const res = await fetch(`${API_BASE}/vehicles?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch vehicles page ${page}: ${res.status}`);
    const json = await res.json();
    vehicles.push(...json.data);
    if (!json.links?.next) break;
    page++;
  }

  return vehicles;
}

async function fetchVehicleDetails(name) {
  const res = await fetch(`${API_BASE}/vehicles/${name}?include=components,hardpoints,parts`);
  if (!res.ok) throw new Error(`Failed to fetch vehicle ${name}: ${res.status}`);
  const json = await res.json();
  return json.data;
}

function extractShieldType(hardpoints = []) {
  const shieldHardpoint = hardpoints.find(hp => hp.type === "Shield" && hp.item && hp.item.shield);
  if (!shieldHardpoint) return null;
  const name = shieldHardpoint.item.name?.trim();
  const capacity = shieldHardpoint.item.shield.max_shield_health;
  if (!name) return null;
  return { name, capacity, display: name };
}

function compressCounts(arr) {
  const counts = new Map();
  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return Array.from(counts.entries()).map(([name, count]) => count > 1 ? `${name} x${count}` : name).join(', ');
}

function extractTurretGuns(hardpoints = []) {
  const turrets = [];

  function recurse(hps) {
    for (const hp of hps || []) {
      if (["GunTurret", "PDCTurret", "MissileTurret", "RemoteTurret"].includes(hp.sub_type) && hp.item) {
        const mountName = hp.item.name || 'Unknown Mount';
        let weaponNames = [];

        if (Array.isArray(hp.children)) {
          for (const child of hp.children) {
            if (child.item?.name && child.item.name !== '<= PLACEHOLDER =>') {
              weaponNames.push(child.item.name);
            } else if (child.item?.equipped_item?.name && child.item.equipped_item.name !== '<= PLACEHOLDER =>') {
              weaponNames.push(child.item.equipped_item.name);
            }
          }
        }

        if (Array.isArray(hp.item.ports)) {
          for (const port of hp.item.ports) {
            if (port.equipped_item?.name && port.equipped_item.name !== '<= PLACEHOLDER =>') {
              weaponNames.push(port.equipped_item.name);
            }
          }
        }

        if (weaponNames.length === 0) weaponNames.push('Unknown Gun');

        weaponNames.forEach(w => {
          if (w === mountName) {
            turrets.push(`${w}`);
          } else {
            turrets.push(`${mountName} (${w})`);
          }
        });
      }

      if (hp.children?.length) recurse(hp.children);
    }
  }

  recurse(hardpoints);
  return compressCounts(turrets);
}

function extractPilotGuns(hardpoints = []) {
  const guns = [];

  function recurse(hps) {
    for (const hp of hps || []) {
      const isTurret = ["GunTurret", "PDCTurret", "MissileTurret", "RemoteTurret"].includes(hp.sub_type);
      const isMissile = hp.type?.includes("Missile") || hp.sub_type?.includes("Missile");
      if (!isTurret && !isMissile) {
        const item = hp.item?.equipped_item || hp.item;
        if (
          item?.type === "WeaponGun" &&
          item.name &&
          item.name !== '<= PLACEHOLDER =>'
        ) {
          const size = item.size ?? '?';
          guns.push(`S${size} ${item.name}`);
        }
      }
      if (hp.children?.length) recurse(hp.children);
    }
  }

  recurse(hardpoints);
  return compressCounts(guns);
}


function extractMissiles(hardpoints = []) {
  const missileHardpoints = [];

  function recurse(hps) {
    for (const hp of hps || []) {
      if (hp.type === 'MissileLauncher' || hp.type === 'MissileRack' || hp.sub_type === 'MissileTurret') {
        for (const child of hp.children || []) {
          if (child.type === 'Missile' && child.item?.missile) {
            missileHardpoints.push(child);
          }
        }
      }

      if (hp.type === 'Missile' && hp.item?.missile) {
        missileHardpoints.push(hp);
      }

      if (hp.children?.length) recurse(hp.children);
    }
  }

  recurse(hardpoints);

  const missileMap = new Map();

  for (const hp of missileHardpoints) {
    const name = hp.item.name || 'Unknown';
    const size = hp.item.size || 'Unknown';
    const key = `${name}|${size}`;
    if (!missileMap.has(key)) missileMap.set(key, 0);
    missileMap.set(key, missileMap.get(key) + 1);
  }

  return Array.from(missileMap.entries())
    .map(([key, count]) => {
      const [name, size] = key.split('|');
      return `${count} x S${size} ${name}`;
    })
    .join(', ');
}

function buildDictionaryEntry(data, updatedAt, existing = {}) {
  const parts = data.parts || [];
  const bodyPart = parts.find(p => p.name?.toLowerCase().includes('body') || (p.children || []).some(c => c.name === 'body')) || parts[0];
  const body = (bodyPart?.children || []).find?.(c => c.name?.toLowerCase() === 'body');
  const missilesValue = extractMissiles(data.hardpoints);
  const shieldData = extractShieldType(data.hardpoints);

  const hullBodyValue = existing.HullBody > 0 ? existing.HullBody : (body?.damage_max || 0);
  const shieldCapacityValue = existing['shield-capacity'] > 0 ? existing['shield-capacity'] : (shieldData?.capacity || 0);

  return {
    name: data.name,
    image: existing.image || '',
    role: data.foci?.map(f => f.en_EN).join(' / ') || 'TBD',
    size: `S${data.size_class || 'X'}/XXS`,
    crew: data.crew?.min ?? 1,
    'base-dps': existing['base-dps'] || 0,
    HullBody: hullBodyValue,
    cargo: data.cargo_capacity || 0,
    'shield-type': shieldData?.name || existing['shield-type'] || 'TBD',
    'shield-capacity': shieldCapacityValue,
    'pilot-guns': extractPilotGuns(data.hardpoints),
    'turret-guns': extractTurretGuns(data.hardpoints),
    missiles: missilesValue,
    missles: missilesValue,
    manufacturer: data.manufacturer?.name || 'TBD',
    'manufacturer-code': data.manufacturer?.code || 'TBD',
    verified: existing.verified || false,
    syncedAt: new Date().toISOString(),
    scWikiUpdatedAt: updatedAt,
    'versus-wins': existing['versus-wins'] || 0,
    'versus-losses': existing['versus-losses'] || 0
  };
}

function logFieldDifferences(oldEntry, newEntry, dictKey) {
  const diffs = [];
  for (const key of Object.keys(newEntry)) {
    if (key === 'scWikiUpdatedAt' || key === 'syncedAt') continue;
    const oldVal = oldEntry?.[key];
    const newVal = newEntry[key];
    if (oldVal !== newVal) {
      diffs.push(`  - ${key}: ${JSON.stringify(oldVal)} → ${JSON.stringify(newVal)}`);
    }
  }

  if (diffs.length) {
    console.log(`${FORCE_UPDATE ? 'Force updated' : 'Updated'} ${dictKey}:
${diffs.join('\n')}`);
  } else {
    console.log(`Skipped ${dictKey} (no visible changes)`);
  }
}

async function syncDictionary() {
  const local = loadDictionary();
  if (!local.dictionary) local.dictionary = {};
  const remoteList = await fetchAllVehicles();

  for (const vehicle of remoteList) {
    try {
      const localEntryKey = Object.keys(local.dictionary).find(
        key => key.endsWith(`_${vehicle.name}`) || key === vehicle.name
      );
      const localEntry = localEntryKey ? local.dictionary[localEntryKey] : null;

      const needsUpdate =
        !localEntry || !localEntry.scWikiUpdatedAt || new Date(vehicle.updated_at) > new Date(localEntry.scWikiUpdatedAt);

      if (FORCE_UPDATE || needsUpdate) {
        const fullData = await fetchVehicleDetails(vehicle.name);
        const dictKey = fullData.class_name || `${fullData.manufacturer?.code}_${fullData.name}` || fullData.name;

        const updatedEntry = buildDictionaryEntry(fullData, vehicle.updated_at, local.dictionary[dictKey] || {});
        logFieldDifferences(local.dictionary[dictKey], updatedEntry, dictKey);

        local.dictionary[dictKey] = updatedEntry;
        if (localEntryKey && localEntryKey !== dictKey) {
          delete local.dictionary[localEntryKey];
        }
      }
    } catch (err) {
      console.error(`Failed to update ${vehicle.name}:`, err.message);
    }
  }

  saveDictionary(local);
  console.log('✅ Dictionary sync complete.');
}

syncDictionary().catch(console.error);
