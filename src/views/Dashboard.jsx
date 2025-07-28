import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Target, Skull, User, Zap, Clock, UserCheck, Gamepad2, Rocket, Activity, AlertCircle, Play, Square, FileText, BadgePlus, PersonStanding, CircleOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLogProcessor } from '@/lib/context/logProcessor/logProcessorContext';
import { useData } from '@/lib/context/data/dataContext';
import { useSettings } from '@/lib/context/settings/settingsContext';
import { initializeLog } from '@/lib/initialization/initializeLog';
import { formatTimeAgo } from '@/lib/utils';
import { loadPVE } from '@/lib/pve/pveUtil';
import { loadPVP } from '@/lib/pvp/pvpUtil';

// Copy the exact same functions from Discord utility
const getOutlawRankTitle = (level) => {
  const ranks = ['Drifter', 'Rogue', 'Gunner', 'Marauder', 'Ravager', 'Skullbrand', 'Void Reaper', 'Ash Warden', 'Hellbringer', 'Death Harbinger'];
  return ranks[Math.min(level, ranks.length - 1)];
};

const getOutlawPrestigeTitle = (prestige) => {
  const titles = ['Scavver', 'Red Flag', 'Blackwake', 'Warrant Ghost', 'Hullsplitter', 'Star Scourge', 'Quantum Raider', 'Ashborne', 'Fleetbreaker', 'Versebane'];
  return titles[Math.min(prestige, titles.length - 1)];
};

const getPeacekeeperRankTitle = (level) => {
  const ranks = ['Recruit', 'Sentinel', 'Marksman', 'Enforcer', 'Vanguard', 'Ironbrand', 'Void Warden', 'Starseeker', 'Lightbringer', 'Peacebringer'];
  return ranks[Math.min(level, ranks.length - 1)];
};

const getPeacekeeperPrestigeTitle = (prestige) => {
  const titles = ['Spacer', 'White Flag', 'Starwake', 'Warrant Seeker', 'Hullguard', 'Starward Shield', 'Quantum Sentinel', 'Solarborn', 'Fleetwarden', 'Versekeeper'];
  return titles[Math.min(prestige, titles.length - 1)];
};

const getRankTitle = (level, isOutlaw) => isOutlaw ? getOutlawRankTitle(level) : getPeacekeeperRankTitle(level);
const getPrestigeTitle = (prestige, isOutlaw) => isOutlaw ? getOutlawPrestigeTitle(prestige) : getPeacekeeperPrestigeTitle(prestige);
const getLevelFromXP = (xp) => Math.floor(0.1 * Math.sqrt(xp));
const getXPForLevel = (level) => Math.pow(level / 0.1, 2);

const getXPProgressBar = (xp) => {
  const level = getLevelFromXP(xp);
  const xpStart = getXPForLevel(level);
  const xpEnd = getXPForLevel(level + 1);
  const xpInLevel = xp - xpStart;
  const xpNeeded = xpEnd - xpStart;
  const percent = (xpInLevel / xpNeeded) * 100;
  const blocks = Math.floor(percent / 10);
  const bar = '█'.repeat(blocks) + '░'.repeat(10 - blocks);
  return { bar, percent: Math.round(percent), level, xpInLevel, xpNeeded };
};

function Dashboard() {
  const { isWatching, toggleLogging } = useLogProcessor();
  const { settings } = useSettings();
  const { userData, logInfo, PVEData, PVPData, OrgData, lastKilledBy, lastKilledActor, nearbyPlayers } = useData();



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

  const isOutlaw = settings?.faction === 'outlaw';

  // Load fresh data like Discord webhook (synchronously)
  const [freshData, setFreshData] = React.useState(null);

  React.useEffect(() => {
    const loadFreshData = async () => {
      try {
        const freshPVE = await loadPVE();
        const freshPVP = await loadPVP();
        setFreshData({ pve: freshPVE, pvp: freshPVP });
      } catch (error) {
        console.error('Error loading fresh data:', error);
      }
    };
    loadFreshData();
  }, []);

  // Calculate level and prestige from XP using fresh data (same as Discord webhook)
  // Combine PVE and PVP XP for total progression
  const pveXP = freshData ? freshData.pve?.xp || 0 : 0;
  const pvpXP = freshData ? freshData.pvp?.xp || 0 : 0;
  const xp = pveXP + pvpXP;
  const { level } = getXPProgressBar(xp);
  // Calculate prestige from level: every 100 levels = 1 prestige
  const prestige = Math.floor(level / 100);
  const factionDisplay = isOutlaw ? 'Outlaw' : 'Peacekeeper';

  // Use exact same calculation as Discord webhook
  const rankTitle = getRankTitle(level, isOutlaw);
  const prestigeTitle = getPrestigeTitle(prestige, isOutlaw);

  // Debug logging
  console.log('Dashboard XP Debug:', {
    isOutlaw,
    freshData: freshData,
    fresh_xp: xp,
    calculated_level: level,
    calculated_prestige: prestige,
    rankTitle,
    prestigeTitle
  });

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
              <p className='text-xl font-bold text-green-600'>{PVPData?.deaths === 0 ? PVPData?.kills : PVPData?.kills / PVPData?.deaths || 0}</p>
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
                    <p className='text-sm text-muted-foreground'>{lastKilledBy?.actorName || 'No one yet!'}</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium text-red-600'>{formatTimeAgo(lastKilledBy?.time)}</p>
                </div>
              </div>
              <div className='flex items-center justify-between p-2 rounded-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                    <Target className='w-4 h-4 text-green-600' />
                  </div>
                  <div>
                    <p className='font-medium'>Last Killed</p>
                    <p className='text-sm text-muted-foreground'>{lastKilledActor?.actorName ? (lastKilledActor.actorName.length > 42 ? lastKilledActor.actorName.slice(0, 42) + '…' : lastKilledActor.actorName) : 'No one yet!'}</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium text-green-600'>{formatTimeAgo(lastKilledActor?.time)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='space-y-3'>
              <div className='flex justify-between p-2 rounded-lg min-h-33'>
                <div className='flex gap-3'>
                  <div>
                    <p className='font-medium'>Detected Nearby Players</p>
                    <div className='flex flex-row gap-2 pt-2 flex-wrap'>
                      {nearbyPlayers && nearbyPlayers.length > 0 ? (
                        nearbyPlayers.map((player, index) => {
                          let badgeStyle = '';
                          if (player.icon === 'skull') {
                            badgeStyle = 'bg-gray-700 text-white hover:bg-gray-600';
                          } else if (player.icon === 'badge-plus') {
                            badgeStyle = 'bg-blue-100 text-blue-800 hover:bg-blue-200';
                          } else if (player.icon === 'person-standing') {
                            badgeStyle = 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50';
                          }

                          return (
                            <Badge key={index} className={badgeStyle}>
                              {player.icon === 'badge-plus' ? <BadgePlus className='w-4 h-4' /> : player.icon === 'person-standing' ? <PersonStanding className='w-4 h-4' /> : <Skull className='w-4 h-4' />}
                              {player.playerName}
                            </Badge>
                          );
                        })
                      ) : (
                        <Badge variant='outline'>
                          <CircleOff className='w-4 h-4' /> No players detected
                        </Badge>
                      )}
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
                <div className='flex flex-wrap gap-4 pt-1 text-sm text-muted-foreground'>
                  {settings?.rpgEnabled && (
                    <>
                      <p><b>Faction:</b> {factionDisplay}</p>
                      <p><b>Prestige:</b> {prestigeTitle} ({prestige})</p>
                      <p><b>Rank:</b> {rankTitle} (<b>Level</b> {level})</p>
                    </>
                  )}
                </div>
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

