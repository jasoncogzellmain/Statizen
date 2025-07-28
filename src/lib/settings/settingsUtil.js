import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const defaultSettings = {
  version: '0.1.0',
  logPath: '',
  notifications: false,
  webhookType: '',
  webhookUrl: '',
  webhookEnabled: false,
  discordEnabled: false,
  discordWebhookUrl: '',
  eventTypes: {
    pvpKills: true,
    pvpDeaths: true,
    pveKills: false,
    suicides: false,
  },
  allowDictionarySubmit: false,
  faction: 'peacekeeper', // 👈 needed for UI
  // RPG Settings
  rpgEnabled: false, // 👈 Toggle for RPG features in UI
  discordLevelData: false, // 👈 Toggle for level data in Discord webhooks
  // Auto-Logging Settings
  autoLogEnabled: false, // 👈 Toggle for automatic logging
  // Startup Settings
  runAtStartup: false, // 👈 Toggle for running at Windows startup
  minimizeOnLaunch: false, // 👈 Toggle for minimizing on app launch
};

export async function getSettingsPath() {
  const dir = await configDir();
  const settingsDir = await join(dir, 'statizen');
  if (!(await exists(settingsDir))) await mkdir(settingsDir, { recursive: true });
  return await join(settingsDir, 'settings.json');
}

export async function loadSettings() {
  const path = await getSettingsPath();
  try {
    const text = await readTextFile(path);
    const storedSettings = JSON.parse(text);

    // Safely apply defaults for missing keys (e.g., new fields)
    return { ...defaultSettings, ...storedSettings };
  } catch {
    return { ...defaultSettings };
  }
}

export async function saveSettings(data) {
  const path = await getSettingsPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

// Startup management functions
export async function setRunAtStartup(enable) {
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('set_run_at_startup', { enable });
    console.log(`✅ ${enable ? 'Added' : 'Removed'} from startup`);
    return true;
  } catch (error) {
    console.error('❌ Failed to manage startup:', error);
    return false;
  }
}

export async function checkRunAtStartup() {
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const isEnabled = await invoke('check_run_at_startup');
    console.log('📊 Run at startup check:', isEnabled);
    return isEnabled;
  } catch (error) {
    console.error('❌ Failed to check startup status:', error);
// Calculate XP from existing kill data for users who have kills but no XP
export async function calculateXPFromKills() {
  try {
    const { loadPVE, savePVE } = await import('../pve/pveUtil.js');
    const pvpUtil = await import('../pvp/pvpUtil.js');

    const pveData = await loadPVE();
    const pvpData = await pvpUtil.loadPVP();

    let hasChanges = false;

    // Calculate PVE XP if not present or 0, and has kills
    if (pveData && pveData.kills > 0 && (!pveData.xp || pveData.xp === 0)) {
      const pveXP = pveData.kills * 10; // 10 XP per PVE kill
      pveData.xp = pveXP;
      await savePVE(pveData);
      console.log(`Calculated ${pveXP} XP from ${pveData.kills} PVE kills`);
      hasChanges = true;
    }

    // Calculate PVP XP if not present or 0, and has kills
    if (pvpData && pvpData.kills > 0 && (!pvpData.xp || pvpData.xp === 0)) {
      const pvpXP = pvpData.kills * 20; // 20 XP per PVP kill
      pvpData.xp = pvpXP;
      await pvpUtil.savePVP(pvpData);
      console.log(`Calculated ${pvpXP} XP from ${pvpData.kills} PVP kills`);
      hasChanges = true;
    }

    if (hasChanges) {
      console.log('✅ Successfully calculated XP from existing kill data');
      return true;
    } else {
      console.log('ℹ️ No XP calculation needed - data already exists or no kills found');
      return false;
    }
  } catch (error) {
    console.error('❌ Error calculating XP from kills:', error);
    return false;
  }
}
