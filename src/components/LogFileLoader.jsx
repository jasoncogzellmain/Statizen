import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { handleOpenFile } from '@/lib/handleOpenFile';
import { useSettings } from '@/lib/context/settings/settingsContext';

const LogFileLoader = () => {
  const { updateSettings } = useSettings();

  const handleLogPath = async () => {
    const path = await handleOpenFile();
    if (path) {
      updateSettings('logPath', path);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[550px]'>
      <Card className='w-full max-w-[600px]'>
        <CardHeader>
          <CardTitle className='text-center'>No Log File Selected</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-center text-muted-foreground'>Please select your Star Citizen game log file to start tracking events.</p>
          <div className='flex justify-center'>
            <Button onClick={handleLogPath} className='w-full'>
              Browse for Log File
            </Button>
          </div>
          <p className='text-xs text-center text-muted-foreground'>Usually located at: C:/Program Files(x86)/StarCitizen/Live/Game.log</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogFileLoader;
