import { createContext, useContext, useState } from 'react';

const LogProcessorContext = createContext();

export function LogProcessorProvider({ children }) {
  const [isWatching, setIsWatching] = useState(false);

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
