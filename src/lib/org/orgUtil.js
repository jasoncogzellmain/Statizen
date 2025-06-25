import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

export async function getMonthOrgPath() {
  const currentYYYYMM = new Date().toISOString().slice(0, 7);
  const dir = await configDir();
  const orgDir = await join(dir, 'statizen', 'org');
  if (!(await exists(orgDir))) await mkdir(orgDir, { recursive: true });
  return await join(orgDir, 'org' + currentYYYYMM + '.json');
}

export async function loadMonthOrg() {
  const path = await getMonthOrgPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function saveMonthOrg(data) {
  const path = await getMonthOrgPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

// Functions for efficient individual entry management
export async function addOrgEntry(uuid, entryData) {
  const currentYYYYMM = new Date().toISOString().slice(0, 7);
  const path = await getMonthOrgPath();

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

export async function getOrgEntry(uuid) {
  const currentYYYYMM = new Date().toISOString().slice(0, 7);
  const path = await getMonthOrgPath();

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

export async function updateOrgEntry(uuid, entryData) {
  return await addOrgEntry(uuid, entryData);
}

export async function getMonthOrgEntries(monthYYYYMM = null) {
  const targetMonth = monthYYYYMM || new Date().toISOString().slice(0, 7);
  const path = await getMonthOrgPath();

  try {
    const text = await readTextFile(path);
    const data = JSON.parse(text);

    return data[targetMonth] || {};
  } catch {
    return {};
  }
}
