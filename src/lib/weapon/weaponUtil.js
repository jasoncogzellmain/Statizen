import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const defaultWeaponData = {
  kills: 0,
  deaths: 0,
  currentMonth: {
    kills: 0,
    deaths: 0,
  },
  weapons: {},
  xp: 0,
};

export async function getWeaponPath() {
  const dir = await configDir();
  const weaponDir = await join(dir, 'statizen', 'weapon');
  if (!(await exists(weaponDir))) await mkdir(weaponDir, { recursive: true });
  return await join(weaponDir, 'weaponData.json');
}

export async function loadWeapon() {
  const path = await getWeaponPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return { ...defaultWeaponData };
  }
}

export async function saveWeapon(data) {
  const path = await getWeaponPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

export async function addWeaponLogEntry(weaponClass, result, targetType = null) {
  const weaponData = await loadWeapon();
  const timestamp = new Date().toISOString();

  const logEntry = {
    timestamp,
    weaponClass,
    result, // 'win' or 'loss'
    targetType, // 'npc', 'player', 'ship', etc.
  };

  weaponData.log = weaponData.log || [];
  weaponData.log.push(logEntry);

  // Keep only last 1000 entries to prevent file bloat
  if (weaponData.log.length > 1000) {
    weaponData.log = weaponData.log.slice(-1000);
  }

  await saveWeapon(weaponData);
  return logEntry;
}

export async function updateWeaponStats(weaponClass, result) {
  const weaponData = await loadWeapon();

  // Initialize weapon stats if it doesn't exist
  if (!weaponData.weapons[weaponClass]) {
    weaponData.weapons[weaponClass] = {
      kills: 0,
      deaths: 0,
      currentMonth: {
        kills: 0,
        deaths: 0,
      },
    };
  }

  if (result === 'win') {
    weaponData.weapons[weaponClass].kills += 1;
    weaponData.weapons[weaponClass].currentMonth.kills += 1;
    weaponData.kills += 1;
    weaponData.currentMonth.kills += 1;
  } else if (result === 'loss') {
    weaponData.weapons[weaponClass].deaths += 1;
    weaponData.weapons[weaponClass].currentMonth.deaths += 1;
    weaponData.deaths += 1;
    weaponData.currentMonth.deaths += 1;
  }

  await saveWeapon(weaponData);
}
