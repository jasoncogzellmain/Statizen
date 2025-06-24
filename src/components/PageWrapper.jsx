import { useLocation } from 'react-router-dom';
import LogFileLoader from './LogFileLoader';
import { useSettings } from '@/lib/context/settings/settingsContext';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const { settings, loading } = useSettings();

  // Don't show LogFileLoader on settings page
  const isSettingsPage = location.pathname === '/settings';

  // Show LogFileLoader if not on settings page, not loading, and no log path is set
  const shouldShowLogFileLoader = !isSettingsPage && !loading && !settings?.logPath;

  console.log('PageWrapper debug:', {
    pathname: location.pathname,
    isSettingsPage,
    loading,
    logPath: settings?.logPath,
    shouldShowLogFileLoader,
  });

  if (shouldShowLogFileLoader) {
    console.log('Showing LogFileLoader');
    return <LogFileLoader />;
  }

  console.log('Showing page content');
  return children;
};

export default PageWrapper;
