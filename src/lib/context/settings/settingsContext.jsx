import { createContext, useContext, useState, useEffect } from 'react';
import { loadSettings, saveSettings } from '@/lib/settingsManager';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings().then((loadedSettings) => {
      setSettings(loadedSettings);
      setLoading(false);
    });
  }, []);

  const updateSettings = async (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await saveSettings(updated);
  };

  const updateEventTypes = async (key, value) => {
    const updated = {
      ...settings,
      eventTypes: { ...settings.eventTypes, [key]: value },
    };
    setSettings(updated);
    await saveSettings(updated);
  };

  const value = {
    settings,
    loading,
    updateSettings,
    updateEventTypes,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
