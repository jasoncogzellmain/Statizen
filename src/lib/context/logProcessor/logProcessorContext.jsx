import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { parseNewLogLines } from '@/lib/log/logUtil';
import { startCleanupInterval, stopCleanupInterval } from '@/lib/nearby/nearbyUtil';
import { invoke } from '@tauri-apps/api/core';
import { loadSettings } from '@/lib/settings/settingsUtil';

const LogProcessorContext = createContext();

export function LogProcessorProvider({ children }) {
  const [isWatching, setIsWatching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoLogEnabled, setAutoLogEnabled] = useState(false);
  const intervalRef = useRef(null);
  const autoLogIntervalRef = useRef(null);

  const processLog = useCallback(async () => {
    if (isProcessing) return; // Prevent overlapping processing

    setIsProcessing(true);
    try {
      await parseNewLogLines();
    } catch (error) {
      console.error('Error processing log:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  // Check if Star Citizen is running
  const checkStarCitizen = useCallback(async () => {
    try {
      console.log('🔍 Invoking process check for StarCitizen.exe...');
      const isRunning = await invoke('check_process_running', {
        processName: 'StarCitizen.exe'
      });
      console.log('📊 Process check result:', isRunning);
      return isRunning;
    } catch (error) {
      console.error('❌ Process check failed:', error);
      return false;
    }
  }, []);

  // Auto-logging logic
  const startAutoLogging = useCallback(async () => {
    console.log('🔄 Starting auto-logging check...');
    const settings = await loadSettings();
    console.log('📋 Settings loaded:', { autoLogEnabled: settings.autoLogEnabled });
    
    if (settings.autoLogEnabled) {
      console.log('✅ Auto-logging is enabled in settings');
      setAutoLogEnabled(true);

      // Check immediately
      console.log('🔍 Checking for Star Citizen process...');
      const isRunning = await checkStarCitizen();
      console.log('🎮 Star Citizen process check result:', isRunning);
      
      if (isRunning && !isWatching) {
        console.log('🚀 Star Citizen detected - starting log');
        setIsWatching(true);
      } else if (!isRunning && isWatching) {
        console.log('🛑 Star Citizen closed - stopping log');
        setIsWatching(false);
      } else {
        console.log('ℹ️ No state change needed:', { isRunning, isWatching });
      }

      // Set up polling every 30 seconds
      console.log('⏰ Setting up auto-logging interval (30s)...');
      autoLogIntervalRef.current = setInterval(async () => {
        console.log('🔄 Auto-logging interval check...');
        const isRunning = await checkStarCitizen();
        console.log('🎮 Interval check result:', isRunning);
        
        if (isRunning && !isWatching) {
          console.log('🚀 Star Citizen detected - starting log');
          setIsWatching(true);
        } else if (!isRunning && isWatching) {
          console.log('🛑 Star Citizen closed - stopping log');
          setIsWatching(false);
        } else {
          console.log('ℹ️ No state change needed:', { isRunning, isWatching });
        }
      }, 30000);
    } else {
      console.log('❌ Auto-logging is disabled in settings');
    }
  }, [isWatching, checkStarCitizen]);

  const stopAutoLogging = useCallback(() => {
    console.log('🛑 Stopping auto-logging...');
    setAutoLogEnabled(false);
    if (autoLogIntervalRef.current) {
      console.log('⏰ Clearing auto-logging interval...');
      clearInterval(autoLogIntervalRef.current);
      autoLogIntervalRef.current = null;
    }
  }, []);

  // Start cleanup interval when component mounts
  useEffect(() => {
    // Start cleanup interval for nearby players immediately
    startCleanupInterval();

    // Start auto-logging if enabled
    startAutoLogging();

    // Cleanup on unmount
    return () => {
      stopCleanupInterval();
      stopAutoLogging();
    };
  }, [startAutoLogging, stopAutoLogging]);

  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isWatching) {
      // Start polling every second
      intervalRef.current = setInterval(processLog, 1000);
    }

    // Cleanup on unmount or when isWatching changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isWatching, processLog]);

  const startLogging = useCallback(async () => {
    setIsWatching(true);
  }, []);

  const stopLogging = useCallback(() => {
    setIsWatching(false);
  }, []);

  const toggleLogging = useCallback(async () => {
    if (isWatching) {
      stopLogging();
    } else {
      await startLogging();
    }
  }, [isWatching, startLogging, stopLogging]);

  const value = {
    isWatching,
    setIsWatching,
    isProcessing,
    setIsProcessing,
    startLogging,
    stopLogging,
    toggleLogging,
    autoLogEnabled,
    startAutoLogging,
    stopAutoLogging,
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
