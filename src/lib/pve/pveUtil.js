import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const defaultPVEStats = {
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

export async function getPVEPath() {
  const dir = await configDir();
  const pveDir = await join(dir, 'statizen', 'pve');
  if (!(await exists(pveDir))) await mkdir(pveDir, { recursive: true });
  return await join(pveDir, 'pveStats.json');
}

export async function loadPVE() {
  const path = await getPVEPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return { ...defaultPVEStats };
  }
}

export async function getMonthPVEPath() {
  const currentYYYYMM = new Date().toISOString().slice(0, 7);
  const dir = await configDir();
  const pveDir = await join(dir, 'statizen', 'pve');
  if (!(await exists(pveDir))) await mkdir(pveDir, { recursive: true });
  return await join(pveDir, 'pve' + currentYYYYMM + '.json');
}

export async function loadMonthPVE() {
  const path = await getMonthPVEPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function saveMonthPVE(data) {
  const path = await getMonthPVEPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

export async function savePVE(data) {
  const path = await getPVEPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

// New functions for efficient individual entry management
export async function addPVEEntry(uuid, entryData) {
  const currentYYYYMM = new Date().toISOString().slice(0, 7);
  const path = await getMonthPVEPath();

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

export async function getPVEEntry(uuid) {
  const currentYYYYMM = new Date().toISOString().slice(0, 7);
  const path = await getMonthPVEPath();

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

export async function updatePVEEntry(uuid, entryData) {
  return await addPVEEntry(uuid, entryData);
}

export async function getMonthEntries(monthYYYYMM = null) {
  const targetMonth = monthYYYYMM || new Date().toISOString().slice(0, 7);
  const path = await getMonthPVEPath();

  try {
    const text = await readTextFile(path);
    const data = JSON.parse(text);

    return data[targetMonth] || {};
  } catch {
    return {};
  }
}
