import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const defaultUserCheck = {
  userName: '',
  geid: '',
  starCitizenVersion: '',
  currentShip: '',
};

export async function getUserPath() {
  const dir = await configDir();
  const userCheckDir = await join(dir, 'statizen', 'user');
  if (!(await exists(userCheckDir))) await mkdir(userCheckDir, { recursive: true });
  return await join(userCheckDir, 'userUtil.json');
}

export async function loadUser() {
  const path = await getUserPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return { ...defaultUserCheck };
  }
}

export async function saveUser(data) {
  const path = await getUserPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

export async function resetUserShip() {
  const path = await getUserPath();
  const userData = await loadUser();
  userData.currentShip = '';
  await writeTextFile(path, JSON.stringify(userData, null, 2));
}
