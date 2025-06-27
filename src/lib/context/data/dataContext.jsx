import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { loadUser, saveUser } from '@/lib/user/userUtil';
import { loadLogInfo } from '@/lib/log/logUtil';
import { loadPVE, savePVE } from '@/lib/pve/pveUtil';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [logInfo, setLogInfo] = useState(null);
  const [PVEData, setPVEData] = useState(null);

  // Separate tracking for each data type
  const lastUserContent = useRef(null);
  const lastLogInfoContent = useRef(null);
  const lastPVEContent = useRef(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const userData = await loadUser();
        const logInfoData = await loadLogInfo();
        const PVEData = await loadPVE();

        setUserData(userData);
        setLogInfo(logInfoData);
        setPVEData(PVEData);

        lastUserContent.current = JSON.stringify(userData);
        lastLogInfoContent.current = JSON.stringify(logInfoData);
        lastPVEContent.current = JSON.stringify(PVEData);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  // Poll for file changes
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const currentUserData = await loadUser();
        const currentLogInfoData = await loadLogInfo();
        const currentPVEData = await loadPVE();

        const currentUserContent = JSON.stringify(currentUserData);
        const currentLogInfoContent = JSON.stringify(currentLogInfoData);
        const currentPVEContent = JSON.stringify(currentPVEData);

        // Check if each file content has changed
        if (lastUserContent.current !== currentUserContent) {
          setUserData(currentUserData);
          lastUserContent.current = currentUserContent;
        }

        if (lastLogInfoContent.current !== currentLogInfoContent) {
          setLogInfo(currentLogInfoData);
          lastLogInfoContent.current = currentLogInfoContent;
        }

        if (lastPVEContent.current !== currentPVEContent) {
          setPVEData(currentPVEData);
          lastPVEContent.current = currentPVEContent;
        }
      } catch (error) {
        console.error('Failed to poll data:', error);
      }
    }, 1000); // Poll every second

    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  const updateUserData = async (key, value) => {
    const updated = { ...userData, [key]: value };
    setUserData(updated);
    await saveUser(updated);
  };

  const updatePVEData = async (key, value) => {
    const updated = { ...PVEData, [key]: value };
    setPVEData(updated);
    await savePVE(updated);
  };

  const value = {
    userData,
    updateUserData,
    logInfo,
    PVEData,
    updatePVEData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
