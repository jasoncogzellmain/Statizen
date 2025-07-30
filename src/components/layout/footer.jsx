/* global __APP_VERSION__ */
import { useSettings } from '@/lib/context/settings/settingsContext';
import { useVersionCheck } from '@/lib/hooks/useVersionCheck';

const Footer = () => {
  const { settings, loading } = useSettings();
  const { hasUpdate, latestVersion, loading: updateLoading } = useVersionCheck();
  const version = __APP_VERSION__; // Injected at build time from package.json

  if (loading) {
    return (
      <div className='bg-black flex-shrink-0'>
        <div className='flex justify-between items-center py-1 px-3 text-xs'>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black flex-shrink-0'>
      <div className='flex justify-between items-center py-1 px-3 text-xs'>
        <span>
          Written by{' '}
          <a
            href='https://robertsspaceindustries.com/en/citizens/Nowskify'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400'
          >
            Nowskify
          </a>{' '}
          • v{version}
          {updateLoading && (
            <span className='ml-2 text-gray-400'>Checking for updates...</span>
          )}
          {hasUpdate && !updateLoading && (
            <span className='ml-2'>
              •{' '}
              <a
                href='https://github.com/ChrisNSki/Statizen/releases/latest'
                target='_blank'
                rel='noopener noreferrer'
                className='text-yellow-400 hover:text-yellow-300 underline'
                title={`Update available: v${latestVersion}`}
              >
                Update Available (v{latestVersion})
              </a>
            </span>
          )}
        </span>
        {settings?.logPath ? (
          <span className='text-green-400'>Log File Loaded</span>
        ) : (
          <span className='text-red-400 animate-pulse'>Log File Not Loaded</span>
        )}
      </div>
    </div>
  );
};

export default Footer;
