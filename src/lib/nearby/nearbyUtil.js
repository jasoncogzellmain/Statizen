import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const nearbyPlayers = [];

const corpseJSONdefault = {
  playerName: '',
  icon: 'skull',
  addedAt: new Date().toISOString(),
};

const spawnJSONdefault = {
  playerName: '',
  icon: 'badge-plus',
  addedAt: new Date().toISOString(),
};

const stallJSONdefault = {
  playerName: '',
  icon: 'person-standing',
  addedAt: new Date().toISOString(),
};

// Cleanup interval reference
let cleanupInterval = null;

export async function getNearbyPath() {
  const dir = await configDir();
  const nearbyDir = await join(dir, 'statizen', 'nearby');
  if (!(await exists(nearbyDir))) await mkdir(nearbyDir, { recursive: true });
  return await join(nearbyDir, 'nearby.json');
}

export async function loadNearby() {
  const path = await getNearbyPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return {
      ...nearbyPlayers,
    };
  }
}

export async function addNearbyPlayer(playerName, type) {
  const nearby = await loadNearby();

  // Check if player already exists and remove them
  const filteredNearby = nearby.filter((player) => player.playerName !== playerName);

  // Create new entry based on type
  let newEntry;
  switch (type) {
    case 'corpse':
      newEntry = { ...corpseJSONdefault, playerName };
      break;
    case 'spawn':
      newEntry = { ...spawnJSONdefault, playerName };
      break;
    case 'stall':
      newEntry = { ...stallJSONdefault, playerName };
      break;
    default:
      return; // Invalid type
  }

  // Add new entry to filtered array
  filteredNearby.push(newEntry);

  await saveNearby(filteredNearby);
}

export async function removeNearbyPlayer(playerName) {
  let nearby = await loadNearby();
  nearby = nearby.filter((player) => player.playerName !== playerName);
  await saveNearby(nearby);
}

export async function saveNearby(data) {
  const path = await getNearbyPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

// Cleanup function to remove entries older than 2 minutes
export async function cleanupOldEntries() {
  const nearby = await loadNearby();
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();

  const filteredNearby = nearby.filter((player) => {
    const addedAt = new Date(player.addedAt);
    const cutoffTime = new Date(twoMinutesAgo);
    return addedAt > cutoffTime;
  });

  // Only save if we actually removed entries
  if (filteredNearby.length !== nearby.length) {
    await saveNearby(filteredNearby);
  }
}

// Start the cleanup interval
export function startCleanupInterval() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
  }

  cleanupInterval = setInterval(async () => {
    await cleanupOldEntries();
  }, 10000); // Run every 10 seconds
}

// Stop the cleanup interval
export function stopCleanupInterval() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}
