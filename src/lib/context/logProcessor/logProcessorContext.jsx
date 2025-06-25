import { createContext, useContext, useState } from 'react';
import { readTextFile } from '@tauri-apps/plugin-fs';
import { useSettings } from '@/lib/context/settings/settingsContext';
import { useUser } from '@/lib/context/user/userContext';
import { processNameAndID, processStarCitizenVersion } from './actions/userActions';

const LogProcessorContext = createContext();

export function LogProcessorProvider({ children }) {
  const { settings } = useSettings();
  const { updateUserData } = useUser();
  const [isWatching, setIsWatching] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentSession, setCurrentSession] = useState(null);

  const startLogging = async () => {
    if (!settings?.logPath) {
      console.error('No log path configured');
      return;
    }

    try {
      // Read the entire log file
      const content = await readTextFile(settings.logPath);
      const lines = content.split('\n');

      // Look for the AccountLoginCharacterStatus_Character line
      const characterLine = lines.find((line) => line.includes('<AccountLoginCharacterStatus_Character>'));

      if (characterLine) {
        console.log('Found character line:', characterLine);

        // Process user data from the line
        await processNameAndID(characterLine, updateUserData);
      } else {
        console.log('No character line found in log file');
      }

      // Look for Star Citizen version line
      const versionLine = lines.find((line) => line.includes('Branch:'));
      if (versionLine) {
        console.log('Found version line:', versionLine);
        await processStarCitizenVersion(versionLine, updateUserData);
      }

      setIsWatching(true);
    } catch (error) {
      console.error('Failed to start logging:', error);
    }
  };

  const stopLogging = () => {
    setIsWatching(false);
  };

  const toggleLogging = async () => {
    if (isWatching) {
      stopLogging();
    } else {
      await startLogging();
    }
  };

  const value = {
    isWatching,
    currentLine,
    currentSession,
    setIsWatching,
    setCurrentLine,
    setCurrentSession,
    startLogging,
    stopLogging,
    toggleLogging,
  };

  return <LogProcessorContext.Provider value={value}>{children}</LogProcessorContext.Provider>;
}

export function useLogProcessor() {
  const context = useContext(LogProcessorContext);
  if (!context) {
    throw new Error('useLogProcessor must be used within a LogProcessorProvider');
  }
  return context;
}
