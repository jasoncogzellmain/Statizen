import { readTextFile } from '@tauri-apps/plugin-fs';
import { processNameAndID, processStarCitizenVersion } from '@/lib/initialization/processNameandID';

export const initializeLog = async (settings) => {
  if (!settings?.logPath) {
    console.error('No log path configured');
    return;
  }

  try {
    const content = await readTextFile(settings.logPath);
    const lines = content.split('\n');

    // Process character line first
    const characterLine = lines.find((line) => line.includes('<AccountLoginCharacterStatus_Character>'));
    if (characterLine) {
      await processNameAndID(characterLine);
    }

    // Process version line second
    const versionLine = lines.find((line) => line.includes('Branch:'));
    if (versionLine) {
      await processStarCitizenVersion(versionLine);
    }
  } catch (error) {
    console.error('Failed to initialize log:', error);
  }
};
