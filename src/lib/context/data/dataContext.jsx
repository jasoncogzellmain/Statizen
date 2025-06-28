import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { loadUser, saveUser } from '@/lib/user/userUtil';
import { loadLogInfo } from '@/lib/log/logUtil';
import { loadPVE, savePVE, loadPVELog } from '@/lib/pve/pveUtil';
import { loadPVP, savePVP, loadPVPLog } from '@/lib/pvp/pvpUtil';
import NPCDictionary from '@/assets/NPC-Dictionary.json';

const DataContext = createContext();

// Helper function to get NPC name from dictionary
const getNPCName = (npcClass) => {
  if (!npcClass) return null;

  // Check if it's in the dictionary
  if (NPCDictionary.dictionary[npcClass]) {
    return NPCDictionary.dictionary[npcClass].name;
  }

  // If not found, return the original class name
  return npcClass;
};

export function DataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [logInfo, setLogInfo] = useState(null);
  const [PVEData, setPVEData] = useState(null);
  const [PVPData, setPVPData] = useState(null);
  const [lastKilledBy, setLastKilledBy] = useState(null);
  const [lastKilledActor, setLastKilledActor] = useState(null);

  // Separate tracking for each data type
  const lastUserContent = useRef(null);
  const lastLogInfoContent = useRef(null);
  const lastPVEContent = useRef(null);
  const lastPVPContent = useRef(null);
  const lastLastKilledByContent = useRef(null);
  const lastLastKilledActorContent = useRef(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const userData = await loadUser();
        const logInfoData = await loadLogInfo();
        const PVEData = await loadPVE();
        const PVPData = await loadPVP();
        const lastKilledBy = await getLastKilledBy();
        const lastKilledActor = await getLastKilledActor();

        setUserData(userData);
        setLogInfo(logInfoData);
        setPVEData(PVEData);
        setPVPData(PVPData);
        setLastKilledBy(lastKilledBy);
        setLastKilledActor(lastKilledActor);

        lastUserContent.current = JSON.stringify(userData);
        lastLogInfoContent.current = JSON.stringify(logInfoData);
        lastPVEContent.current = JSON.stringify(PVEData);
        lastPVPContent.current = JSON.stringify(PVPData);
        lastLastKilledByContent.current = JSON.stringify(lastKilledBy);
        lastLastKilledActorContent.current = JSON.stringify(lastKilledActor);
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
        const currentPVPData = await loadPVP();
        const currentLastKilledBy = await getLastKilledBy();
        const currentLastKilledActor = await getLastKilledActor();

        const currentUserContent = JSON.stringify(currentUserData);
        const currentLogInfoContent = JSON.stringify(currentLogInfoData);
        const currentPVEContent = JSON.stringify(currentPVEData);
        const currentPVPContent = JSON.stringify(currentPVPData);
        const currentLastKilledByContent = JSON.stringify(currentLastKilledBy);
        const currentLastKilledActorContent = JSON.stringify(currentLastKilledActor);

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

        if (lastPVPContent.current !== currentPVPContent) {
          setPVPData(currentPVPData);
          lastPVPContent.current = currentPVPContent;
        }

        if (lastLastKilledByContent.current !== currentLastKilledByContent) {
          setLastKilledBy(currentLastKilledBy);
          lastLastKilledByContent.current = currentLastKilledByContent;
        }

        if (lastLastKilledActorContent.current !== currentLastKilledActorContent) {
          setLastKilledActor(currentLastKilledActor);
          lastLastKilledActorContent.current = currentLastKilledActorContent;
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

  const getLastKilledBy = async () => {
    let lastKilledBy = {
      actorName: null,
      time: null,
    };
    const pveLog = await loadPVELog();
    const pvpLog = await loadPVPLog();

    // Filter for loss actions only
    const pveLosses = pveLog.filter((entry) => entry.action === 'loss');
    const pvpLosses = pvpLog.filter((entry) => entry.action === 'loss');

    const lastPVELoss = pveLosses[pveLosses.length - 1];
    const lastPVPLoss = pvpLosses[pvpLosses.length - 1];

    if (lastPVELoss && lastPVPLoss) {
      const mostRecentLoss = lastPVELoss.dateTime > lastPVPLoss.dateTime ? lastPVELoss : lastPVPLoss;
      // Use NPC lookup for PVE, direct name for PVP
      lastKilledBy.actorName = mostRecentLoss.npcClass ? getNPCName(mostRecentLoss.npcClass) : mostRecentLoss.playerClass;
      lastKilledBy.time = mostRecentLoss.dateTime;
    } else if (lastPVELoss) {
      lastKilledBy.actorName = getNPCName(lastPVELoss.npcClass);
      lastKilledBy.time = lastPVELoss.dateTime;
    } else if (lastPVPLoss) {
      lastKilledBy.actorName = lastPVPLoss.playerClass;
      lastKilledBy.time = lastPVPLoss.dateTime;
    } else {
      lastKilledBy.actorName = 'No one yet!';
      lastKilledBy.time = null;
    }
    return lastKilledBy;
  };

  const getLastKilledActor = async () => {
    let lastKilledActor = {
      actorName: null,
      time: null,
    };
    const pveLog = await loadPVELog();
    const pvpLog = await loadPVPLog();

    // Filter for win actions only
    const pveWins = pveLog.filter((entry) => entry.action === 'win');
    const pvpWins = pvpLog.filter((entry) => entry.action === 'win');

    const lastPVEWin = pveWins[pveWins.length - 1];
    const lastPVPWin = pvpWins[pvpWins.length - 1];

    if (lastPVEWin && lastPVPWin) {
      const mostRecentWin = lastPVEWin.dateTime > lastPVPWin.dateTime ? lastPVEWin : lastPVPWin;
      // Use NPC lookup for PVE, direct name for PVP
      lastKilledActor.actorName = mostRecentWin.npcClass ? getNPCName(mostRecentWin.npcClass) : mostRecentWin.playerClass;
      lastKilledActor.time = mostRecentWin.dateTime;
    } else if (lastPVEWin) {
      lastKilledActor.actorName = getNPCName(lastPVEWin.npcClass);
      lastKilledActor.time = lastPVEWin.dateTime;
    } else if (lastPVPWin) {
      lastKilledActor.actorName = lastPVPWin.playerClass;
      lastKilledActor.time = lastPVPWin.dateTime;
    } else {
      lastKilledActor.actorName = 'No one yet!';
      lastKilledActor.time = null;
    }
    return lastKilledActor;
  };

  const value = {
    userData,
    updateUserData,
    logInfo,
    PVEData,
    updatePVEData,
    PVPData,
    updatePVPData,
    lastKilledBy,
    lastKilledActor,
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
