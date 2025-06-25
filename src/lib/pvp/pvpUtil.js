import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const defaultPVPStats = {
  kills: 0,
  deaths: 0,
  killsThisWeek: 0,
  deathsThisWeek: 0,
  killsThisMonth: 0,
  deathsThisMonth: 0,
  KillsLastWeek: 0,
  DeathsLastWeek: 0,
  KillsLastMonth: 0,
  DeathsLastMonth: 0,
};

export async function getPVPPath() {
  const dir = await configDir();
  const pvpDir = await join(dir, 'statizen', 'pvp');
  if (!(await exists(pvpDir))) await mkdir(pvpDir, { recursive: true });
  return await join(pvpDir, 'pvpStats.json');
}

export async function loadPVP() {
  const path = await getPVPPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return { ...defaultPVPStats };
  }
}

export async function getMonthPVPPath() {
  const currentYYYYMM = new Date().toISOString().slice(0, 7);
  const dir = await configDir();
  const pvpDir = await join(dir, 'statizen', 'pvp');
  if (!(await exists(pvpDir))) await mkdir(pvpDir, { recursive: true });
  return await join(pvpDir, 'pvp' + currentYYYYMM + '.json');
}

export async function loadMonthPVP() {
  const path = await getMonthPVPPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function saveMonthPVP(data) {
  const path = await getMonthPVPPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

export async function savePVP(data) {
  const path = await getPVPPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

// New functions for efficient individual entry management
export async function addPVPEntry(uuid, entryData) {
  const currentYYYYMM = new Date().toISOString().slice(0, 7);
  const path = await getMonthPVPPath();

  try {
    // Try to read existing data
    const text = await readTextFile(path);
    const data = JSON.parse(text);

    // Initialize month if it doesn't exist
    if (!data[currentYYYYMM]) {
      data[currentYYYYMM] = {};
    }

    // Add the new entry
    data[currentYYYYMM][uuid] = entryData;

    // Save the updated data
    await writeTextFile(path, JSON.stringify(data, null, 2));

    return true;
  } catch {
    // If file doesn't exist or is invalid, create new structure
    const newData = {
      [currentYYYYMM]: {
        [uuid]: entryData,
      },
    };
    await writeTextFile(path, JSON.stringify(newData, null, 2));
    return true;
  }
}

export async function getPVPEntry(uuid) {
  const currentYYYYMM = new Date().toISOString().slice(0, 7);
  const path = await getMonthPVPPath();

  try {
    const text = await readTextFile(path);
    const data = JSON.parse(text);

    if (data[currentYYYYMM] && data[currentYYYYMM][uuid]) {
      return data[currentYYYYMM][uuid];
    }

    return null;
  } catch {
    return null;
  }
}

export async function updatePVPEntry(uuid, entryData) {
  return await addPVPEntry(uuid, entryData);
}

export async function getMonthPVPEntries(monthYYYYMM = null) {
  const targetMonth = monthYYYYMM || new Date().toISOString().slice(0, 7);
  const path = await getMonthPVPPath();

  try {
    const text = await readTextFile(path);
    const data = JSON.parse(text);

    return data[targetMonth] || {};
  } catch {
    return {};
  }
}
