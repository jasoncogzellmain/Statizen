import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { parseNewLogLines } from '@/lib/log/logUtil';

const LogProcessorContext = createContext();

export function LogProcessorProvider({ children }) {
  const [isWatching, setIsWatching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const intervalRef = useRef(null);

  const processLog = async () => {
    if (isProcessing) return; // Prevent overlapping processing

    setIsProcessing(true);
    try {
      await parseNewLogLines();
    } catch (error) {
      console.error('Error processing log:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (isWatching) {
      // Start polling every second
      intervalRef.current = setInterval(processLog, 1000);
    } else {
      // Clear interval when not watching
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isWatching]);

  const startLogging = async () => {
    setIsWatching(true);
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
    setIsWatching,
    isProcessing,
    setIsProcessing,
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
