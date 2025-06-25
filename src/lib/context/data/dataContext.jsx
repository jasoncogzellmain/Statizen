import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { loadUser, saveUser } from '@/lib/user/userUtil';
import { loadPVE, savePVE, addPVEEntry, getPVEEntry, updatePVEEntry, getMonthEntries } from '@/lib/pve/pveUtil';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const lastFileContent = useRef(null);
  const [PVEData, setPVEData] = useState(null);
  // const [PVPData, setPVPData] = useState(null);
  // const [OrgData, setOrgData] = useState(null);

  // Load initial user data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const userData = await loadUser();
        const pveData = await loadPVE();
        setUserData(userData);
        setPVEData(pveData);
        lastFileContent.current = JSON.stringify(userData);
        lastFileContent.current = JSON.stringify(pveData);
      } catch (error) {
        console.error('Failed to load initial user data:', error);
      }
    };

    loadInitialData();
  }, []);

  // Poll for file changes
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const currentUserData = await loadUser();
        const currentPVEData = await loadPVE();
        const currentUserContent = JSON.stringify(currentUserData);
        const currentPVEContent = JSON.stringify(currentPVEData);

        // Check if the file content has changed
        if (lastFileContent.current !== currentUserContent) {
          setUserData(currentUserData);
          lastFileContent.current = currentUserContent;
          console.log('User data updated from file:', currentUserData);
        }
        if (lastFileContent.current !== currentPVEContent) {
          setPVEData(currentPVEData);
          lastFileContent.current = currentPVEContent;
          console.log('PVE data updated from file:', currentPVEData);
        }
      } catch (error) {
        console.error('Failed to poll user data:', error);
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

  // PVE Entry Management Functions
  const addPVEEntryToContext = async (uuid, entryData) => {
    const success = await addPVEEntry(uuid, entryData);
    if (success) {
      // Reload PVE data to reflect changes
      const updatedPVEData = await loadPVE();
      setPVEData(updatedPVEData);
    }
    return success;
  };

  const getPVEEntryFromContext = async (uuid) => {
    return await getPVEEntry(uuid);
  };

  const updatePVEEntryInContext = async (uuid, entryData) => {
    const success = await updatePVEEntry(uuid, entryData);
    if (success) {
      // Reload PVE data to reflect changes
      const updatedPVEData = await loadPVE();
      setPVEData(updatedPVEData);
    }
    return success;
  };

  const getMonthEntriesFromContext = async (monthYYYYMM = null) => {
    return await getMonthEntries(monthYYYYMM);
  };

  const value = {
    userData,
    updateUserData,
    PVEData,
    updatePVEData,
    addPVEEntry: addPVEEntryToContext,
    getPVEEntry: getPVEEntryFromContext,
    updatePVEEntry: updatePVEEntryInContext,
    getMonthEntries: getMonthEntriesFromContext,
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
