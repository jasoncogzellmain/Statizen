import { createContext, useContext, useState, useEffect } from 'react';
import { loadUserCheck } from '@/lib/user/userUtil';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    userName: '',
    geid: '',
    starCitizenVersion: '',
    currentShip: '',
  });
  const [loading, setLoading] = useState(true);

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await loadUserCheck();
        setUserData(data);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const updateUserData = (updates) => {
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  const value = {
    userData,
    updateUserData,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
