import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Target, Skull, User, Zap, Clock, UserCheck, Gamepad2, Rocket, Activity, AlertCircle, Play, Square, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLogProcessor } from '@/lib/context/logProcessor/logProcessorContext';
import { useData } from '@/lib/context/data/dataContext';
import { useSettings } from '@/lib/context/settings/settingsContext';
import { initializeLog } from '@/lib/initialization/initializeLog';

function Dashboard() {
  const { isWatching, toggleLogging } = useLogProcessor();
  const { settings } = useSettings();
  const { userData, logInfo, PVEData, PVPData, OrgData } = useData();

  const startLogging = async () => {
    if (!isWatching) {
      try {
        await initializeLog(settings);
        await toggleLogging();
      } catch (error) {
        console.error('Failed to start logging:', error);
      }
    } else {
      await toggleLogging();
    }
  };

  return (
    <div className='flex flex-col gap-2 p-5'>
      <div className='flex flex-row w-full gap-2'>
        <div className='flex flex-col gap-2 w-1/3'>
          {/* Main Stats Cards */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Rocket className='w-5 h-5 text-blue-600' />
                <CardTitle>Current Ship</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <span className={`flex text-nowrap font-bold ${(userData?.currentShip?.length || 0) > 28 ? 'text-xs' : (userData?.currentShip?.length || 0) > 22 ? 'text-md' : 'text-xl'}`}>{userData?.currentShip || 'Unknown'}</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Target className='w-5 h-5 text-green-600' />
                <CardTitle>PVP K/D Ratio</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-xl font-bold text-green-600'>{PVPData?.kills / PVPData?.deaths || 0}</p>
              <CardDescription>
                {PVPData?.kills} kills / {PVPData?.deaths} deaths
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Skull className='w-5 h-5 text-orange-600' />
                <CardTitle>PVE K/D Ratio</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-xl font-bold text-orange-600'>{PVEData?.deaths === 0 ? PVEData?.kills : PVEData?.kills / PVEData?.deaths || 0}</p>
              <CardDescription>
                {PVEData?.kills} kills / {PVEData?.deaths} deaths
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        {/* Recent Activity */}
        <div className='flex flex-col gap-2 w-2/3'>
          <Card>
            <CardContent className='space-y-3'>
              <div className='flex items-center justify-between p-2 rounded-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                    <Skull className='w-4 h-4 text-red-600' />
                  </div>
                  <div>
                    <p className='font-medium'>Last Killed By</p>
                    <p className='text-sm text-muted-foreground'>PlayerName123</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium text-red-600'>2 hours ago</p>
                  <p className='text-xs text-muted-foreground'>Grim Hex</p>
                </div>
              </div>
              <div className='flex items-center justify-between p-2 rounded-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                    <Target className='w-4 h-4 text-green-600' />
                  </div>
                  <div>
                    <p className='font-medium'>Last Killed</p>
                    <p className='text-sm text-muted-foreground'>EnemyPlayer456</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium text-green-600'>5 hours ago</p>
                  <p className='text-xs text-muted-foreground'>Yela Belt</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='space-y-3'>
              <div className='flex justify-between p-2 rounded-lg min-h-33'>
                <div className='flex gap-3'>
                  <div className='w-8 h-8 mt-2 min-w-8 min-h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <Zap className='w-4 h-4 text-blue-600' />
                  </div>
                  <div>
                    <p className='font-medium'>Detected Nearby Players</p>
                    <div className='flex flex-row gap-2 pt-2 flex-wrap'>
                      <Badge>Nowskify</Badge>
                      <Badge>Player 1</Badge>
                      <Badge>Player 2</Badge>
                      <Badge>Player 3</Badge>
                      <Badge>Player 4</Badge>
                      <Badge>Player 5</Badge>
                      <Badge>Player 6</Badge>
                      <Badge>Player 7</Badge>
                      <Badge>Player 8</Badge>
                      <Badge>Player 9</Badge>
                      <Badge>Player 10</Badge>
                      <Badge>Player 11</Badge>
                      <Badge>Player 12</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Information */}
      <Card>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='flex items-center gap-3 p-3 border rounded-lg'>
              <Gamepad2 className='w-5 h-5 text-blue-600' />
              <div>
                <p className='font-medium'>Star Citizen Version</p>
                <p className='text-sm text-muted-foreground'>{userData?.starCitizenVersion || 'Unknown'}</p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 border rounded-lg'>
              <Activity className='w-5 h-5 text-blue-600' />
              <div>
                <p className='font-medium'>Log Parser Status</p>
                <div className='flex flex-row items-center gap-2'>
                  <div className={`w-3 h-3 rounded-full ${isWatching ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <p className='text-sm text-muted-foreground'>{isWatching ? 'Live' : 'Not connected'}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 border rounded-lg'>
              <UserCheck className='w-5 h-5 text-purple-600' />
              <div>
                <p className='font-medium'>Logged in as</p>
                <p className='text-sm text-muted-foreground'>{userData?.userName || 'Unknown'}</p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 border rounded-lg'>
              <FileText className='w-5 h-5 text-orange-600' />
              <div>
                <p className='font-medium'>Log Lines Processed</p>
                <p className='text-sm text-muted-foreground'>{logInfo?.lastProcessedLine.toString() || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Logging Control */}
      <div className='flex flex-row gap-2 w-full justify-end pt-2'>
        <Button onClick={startLogging} variant={isWatching ? 'destructive' : 'default'} className='flex items-center gap-2'>
          {isWatching ? (
            <>
              <Square className='w-4 h-4' />
              Stop Logging
            </>
          ) : (
            <>
              <Play className='w-4 h-4' />
              Start Logging
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
