import { watch } from '@tauri-apps/plugin-fs';
import { readTextFile } from '@tauri-apps/plugin-fs';
import { loadLogCheck, saveLogCheck } from '@/lib/logutil';
import { pvpManager } from '@/lib/pvp/pvpManager';
import { pveManager } from '@/lib/pve/pveManager';
import { orgManager } from '@/lib/org/orgManager';
import { getGameLogPath } from '@/lib/settingsManager'; // or wherever you're storing this

let currentSession = null;
let currentLine = 0;

export async function startLogParser() {
  const path = await getGameLogPath();
  const check = await loadLogCheck();

  currentSession = check.lastSession;
  currentLine = check.lastLine;

  await watch(path, async () => {
    const content = await readTextFile(path);
    const lines = content.split('\n');

    // Check for new session (search "Log started" line)
    const newSessionLine = lines.find((line) => line.includes('Log started on'));
    if (newSessionLine && !newSessionLine.includes(currentSession)) {
      currentSession = newSessionLine;
      currentLine = 0;
    }

    const newLines = lines.slice(currentLine);
    for (const line of newLines) {
      if (line.includes('Player')) {
        await pvpManager(line);
        await orgManager(line); // you’ll want this once UUID is available
      } else {
        await pveManager(line);
      }
    }

    currentLine = lines.length;

    await saveLogCheck({
      version: '0.1.0',
      lastSession: currentSession,
      lastLine: currentLine,
    });
  });
}
