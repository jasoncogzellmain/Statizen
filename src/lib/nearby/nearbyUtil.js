import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

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
    const data = JSON.parse(text);
    // Ensure we always return an array
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function addNearbyPlayer(playerName, type) {
  const nearby = await loadNearby();

  // Check if player already exists and remove them
  const filteredNearby = nearby.filter((player) => player.playerName !== playerName);

  // Create new entry based on type
  let newEntry;
  const currentTime = new Date().toISOString();

  switch (type) {
    case 'corpse':
      newEntry = {
        playerName,
        icon: 'skull',
        addedAt: currentTime,
      };
      break;
    case 'spawn':
      newEntry = {
        playerName,
        icon: 'badge-plus',
        addedAt: currentTime,
      };
      break;
    case 'stall':
      newEntry = {
        playerName,
        icon: 'person-standing',
        addedAt: currentTime,
      };
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

  // Always save, so the file timestamp updates and the dashboard refreshes
  await saveNearby(filteredNearby);
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
