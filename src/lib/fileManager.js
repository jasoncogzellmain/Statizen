import { appDataDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

export async function initAppStorage() {
  const base = await appDataDir();
  const statsDir = await join(base, 'stats');
  const logsDir = await join(base, 'logs');

  if (!(await exists(statsDir))) await mkdir(statsDir, { recursive: true });
  if (!(await exists(logsDir))) await mkdir(logsDir, { recursive: true });

  return { base, statsDir, logsDir };
}

export async function getStatsFilePath() {
  const { statsDir } = await initAppStorage();
  return await join(statsDir, 'stats.json');
}

export async function loadStats() {
  const path = await getStatsFilePath();
  try {
    const raw = await readTextFile(path);
    return JSON.parse(raw);
  } catch {
    return { sessions: [], totals: { kills: 0, deaths: 0 } };
  }
}

export async function saveStats(data) {
  const path = await getStatsFilePath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}
