import { loadStats, saveStats } from './fileManager';

export async function parseLogLines(logContent) {
  const lines = logContent.split('\n');
  const stats = await loadStats();

  //Where to add Lines for File Processing
  lines.forEach((line) => {
    if (line.includes('You were killed by')) {
      stats.totals.deaths++;
    } else if (line.includes('You killed')) {
      stats.totals.kills++;
    }
  });

  await saveStats(stats);
  return stats;
}
