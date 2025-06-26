import { configDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { loadSettings } from '@/lib/settings/settingsUtil';
import { engineRunner } from '@/processing_engine/engine';

async function getLogPath() {
  const settings = await loadSettings();
  const logPath = settings.logPath;
  return logPath;
}

const defaultLogInfo = {
  logDate: '',
  logFileSize: 0,
  lastProcessedLine: 0,
};

export async function getLogInfoPath() {
  const dir = await configDir();
  const settingsDir = await join(dir, 'statizen');
  if (!(await exists(settingsDir))) await mkdir(settingsDir, { recursive: true });
  return await join(settingsDir, 'logInfo.json');
}

export async function loadLogInfo() {
  const path = await getLogInfoPath();
  try {
    const text = await readTextFile(path);
    return JSON.parse(text);
  } catch {
    return { ...defaultLogInfo };
  }
}

export async function saveLogInfo(data) {
  const path = await getLogInfoPath();
  await writeTextFile(path, JSON.stringify(data, null, 2));
}

export async function getFileSize(filePath) {
  try {
    const stats = await import('@tauri-apps/plugin-fs').then((fs) => fs.stat(filePath));
    return stats.size;
  } catch {
    return 0;
  }
}

export async function parseNewLogLines() {
  const logPath = await getLogPath();

  try {
    // Get current log file info
    const currentSize = await getFileSize(logPath);

    // Load stored log info
    const storedLogInfo = await loadLogInfo();

    // Check if we need to process this log file
    if (currentSize === 0) {
      return;
    }

    // If file size has changed, process new lines
    if (storedLogInfo.logFileSize !== currentSize) {
      // Read the entire log file
      const logContent = await readTextFile(logPath);
      const lines = logContent.split('\n');

      // Process lines one by one, updating position after each line
      let currentLine = storedLogInfo.lastProcessedLine;

      for (let i = currentLine; i < lines.length; i++) {
        const rawLine = lines[i];
        const line = rawLine.trim();

        if (line) {
          await processLogLine(line);
        } else {
          await processLogLine('');
        }

        // Update position after each line (even empty ones)
        currentLine = i + 1;

        // Save progress after each line to avoid missing simultaneous writes
        const updatedLogInfo = {
          logDate: storedLogInfo.logDate,
          logFileSize: currentSize,
          lastProcessedLine: currentLine,
        };
        await saveLogInfo(updatedLogInfo);
      }
    }
  } catch (error) {
    console.error('Error processing log lines:', error);
  }
}

async function processLogLine(_line) {
  if (_line.includes('<Actor Death>')) {
    engineRunner(_line, 'actorDeath');
  } else if (_line.includes('<Spawn Flow>')) {
    engineRunner(_line, 'spawnFlow');
  } else if (_line.includes('<Actor Stall>')) {
    engineRunner(_line, 'stallFlow');
  } else if (_line.includes('<RequestLocationInventory>')) {
    engineRunner(_line, 'requestLocationInventory');
  } else if (_line.includes('<Vehicle Control Flow>')) {
    engineRunner(_line, 'vehicleControlFlow');
  } else if (_line.includes('<[ActorState] Corpse>')) {
    engineRunner(_line, 'corpse');
  } else if (_line.includes('<EndMission>')) {
    engineRunner(_line, 'endMission');
  }
}
