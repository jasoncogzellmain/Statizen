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
    return JSON.parse(text);
  } catch {
    return { ...defaultSettings };
  }
}

export async function saveSettings(data) {
  const path = await getSettingsPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}
