import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { pvpManager } from '../pvp/pvpManager';
import { pveManager } from '../pve/pveManager';
import { orgManager } from '../org/orgManager';

const defaultLogCheck = {
  version: '0.1.0',
  lastSession: null,
  lastLine: 0,
};

export async function getLogCheckPath() {
  const dir = await configDir();
  const logCheckDir = await join(dir, 'statizen', 'log-parser');
  if (!(await exists(logCheckDir))) await mkdir(logCheckDir, { recursive: true });
  return await join(logCheckDir, 'logutil.json');
}

export async function loadLogCheck() {
  const path = await getLogCheckPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return { ...defaultLogCheck };
  }
}

export async function saveLogCheck(data) {
  const path = await getLogCheckPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}
