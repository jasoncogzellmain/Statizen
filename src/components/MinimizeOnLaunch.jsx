import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useSettings } from '@/lib/context/settings/settingsContext';

export function MinimizeOnLaunch() {
  const { settings } = useSettings();

  useEffect(() => {
    const minimizeIfEnabled = async () => {
      if (settings?.minimizeOnLaunch) {
        try {
          await invoke('minimize_window');
        } catch (error) {
          console.error('❌ Failed to minimize window:', error);
        }
      }
    };

    minimizeIfEnabled();
  }, [settings?.minimizeOnLaunch]);

  return null; // This component doesn't render anything
}
