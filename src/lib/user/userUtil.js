import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const defaultUserCheck = {
  userName: '',
  geid: '',
  StarCitizenVersion: '',
  currentShip: '',
};

export async function getUserCheckPath() {
  const dir = await configDir();
  const userCheckDir = await join(dir, 'statizen', 'user');
  if (!(await exists(userCheckDir))) await mkdir(userCheckDir, { recursive: true });
  return await join(userCheckDir, 'logutil.json');
}

export async function loadUserCheck() {
  const path = await getUserCheckPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return { ...defaultUserCheck };
  }
}

export async function saveUserCheck(data) {
  const path = await getUserCheckPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}
