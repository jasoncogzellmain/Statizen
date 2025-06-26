import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { loadUser, saveUser } from '@/lib/user/userUtil';
import { loadPVE, savePVE, addPVEEntry, getPVEEntry, updatePVEEntry, getMonthEntries } from '@/lib/pve/pveUtil';
import { loadPVP, savePVP, addPVPEntry, getPVPEntry, updatePVPEntry, getMonthPVPEntries } from '@/lib/pvp/pvpUtil';
import { addOrgEntry, getOrgEntry, updateOrgEntry, getMonthOrgEntries } from '@/lib/org/orgUtil';
import { loadLogInfo } from '@/lib/log/logUtil';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [PVEData, setPVEData] = useState(null);
  const [PVPData, setPVPData] = useState(null);
  const [OrgData, setOrgData] = useState(null);
  const [logInfo, setLogInfo] = useState(null);

  // Separate tracking for each data type
  const lastUserContent = useRef(null);
  const lastPVEContent = useRef(null);
  const lastPVPContent = useRef(null);
  const lastOrgContent = useRef(null);
  const lastLogInfoContent = useRef(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const userData = await loadUser();
        const pveData = await loadPVE();
        const pvpData = await loadPVP();
        const logInfoData = await loadLogInfo();

        setUserData(userData);
        setPVEData(pveData);
        setPVPData(pvpData);
        setOrgData({}); // Org only has monthly data, no summary stats
        setLogInfo(logInfoData);

        lastUserContent.current = JSON.stringify(userData);
        lastPVEContent.current = JSON.stringify(pveData);
        lastPVPContent.current = JSON.stringify(pvpData);
        lastOrgContent.current = JSON.stringify({});
        lastLogInfoContent.current = JSON.stringify(logInfoData);
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
        const currentPVEData = await loadPVE();
        const currentPVPData = await loadPVP();
        const currentLogInfoData = await loadLogInfo();

        const currentUserContent = JSON.stringify(currentUserData);
        const currentPVEContent = JSON.stringify(currentPVEData);
        const currentPVPContent = JSON.stringify(currentPVPData);
        const currentLogInfoContent = JSON.stringify(currentLogInfoData);

        // Check if each file content has changed
        if (lastUserContent.current !== currentUserContent) {
          setUserData(currentUserData);
          lastUserContent.current = currentUserContent;
          console.log('User data updated from file:', currentUserData);
        }

        if (lastPVEContent.current !== currentPVEContent) {
          setPVEData(currentPVEData);
          lastPVEContent.current = currentPVEContent;
          console.log('PVE data updated from file:', currentPVEData);
        }

        if (lastPVPContent.current !== currentPVPContent) {
          setPVPData(currentPVPData);
          lastPVPContent.current = currentPVPContent;
          console.log('PVP data updated from file:', currentPVPData);
        }

        if (lastLogInfoContent.current !== currentLogInfoContent) {
          setLogInfo(currentLogInfoData);
          lastLogInfoContent.current = currentLogInfoContent;
          console.log('Log info updated from file:', currentLogInfoData);
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

  const updatePVPData = async (key, value) => {
    const updated = { ...PVPData, [key]: value };
    setPVPData(updated);
    await savePVP(updated);
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

  // PVP Entry Management Functions
  const addPVPEntryToContext = async (uuid, entryData) => {
    const success = await addPVPEntry(uuid, entryData);
    if (success) {
      // Reload PVP data to reflect changes
      const updatedPVPData = await loadPVP();
      setPVPData(updatedPVPData);
    }
    return success;
  };

  const getPVPEntryFromContext = async (uuid) => {
    return await getPVPEntry(uuid);
  };

  const updatePVPEntryInContext = async (uuid, entryData) => {
    const success = await updatePVPEntry(uuid, entryData);
    if (success) {
      // Reload PVP data to reflect changes
      const updatedPVPData = await loadPVP();
      setPVPData(updatedPVPData);
    }
    return success;
  };

  const getMonthPVPEntriesFromContext = async (monthYYYYMM = null) => {
    return await getMonthPVPEntries(monthYYYYMM);
  };

  // Org Entry Management Functions
  const addOrgEntryToContext = async (uuid, entryData) => {
    const success = await addOrgEntry(uuid, entryData);
    if (success) {
      // Org data is only monthly, so we don't need to reload summary stats
      console.log('Org entry added successfully');
    }
    return success;
  };

  const getOrgEntryFromContext = async (uuid) => {
    return await getOrgEntry(uuid);
  };

  const updateOrgEntryInContext = async (uuid, entryData) => {
    const success = await updateOrgEntry(uuid, entryData);
    if (success) {
      console.log('Org entry updated successfully');
    }
    return success;
  };

  const getMonthOrgEntriesFromContext = async (monthYYYYMM = null) => {
    return await getMonthOrgEntries(monthYYYYMM);
  };

  const value = {
    userData,
    updateUserData,
    PVEData,
    updatePVEData,
    PVPData,
    updatePVPData,
    OrgData,
    logInfo,
    addPVEEntry: addPVEEntryToContext,
    getPVEEntry: getPVEEntryFromContext,
    updatePVEEntry: updatePVEEntryInContext,
    getMonthEntries: getMonthEntriesFromContext,
    addPVPEntry: addPVPEntryToContext,
    getPVPEntry: getPVPEntryFromContext,
    updatePVPEntry: updatePVPEntryInContext,
    getMonthPVPEntries: getMonthPVPEntriesFromContext,
    addOrgEntry: addOrgEntryToContext,
    getOrgEntry: getOrgEntryFromContext,
    updateOrgEntry: updateOrgEntryInContext,
    getMonthOrgEntries: getMonthOrgEntriesFromContext,
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
