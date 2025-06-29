import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, Shield, Zap, Ship, Calendar } from 'lucide-react';
import { useData } from '@/lib/context/data/dataContext';
import { formatTimeAgo } from '@/lib/utils';
import { useState, useEffect } from 'react';
import NPCDictionary from '@/assets/NPC-Dictionary.json';

// Helper function to get NPC name from dictionary
const getNPCName = (npcClass) => {
  if (!npcClass) return npcClass;

  // Check if it's in the dictionary
  if (NPCDictionary.dictionary[npcClass]) {
    return NPCDictionary.dictionary[npcClass].name;
  }

  // If not found, return the original class name
  return npcClass;
};

function PVE() {
  const { PVEData, pveLog } = useData();
  const [npcStats, setNpcStats] = useState({});
  const [search, setSearch] = useState('');

  // Calculate NPC kill statistics when pveLog changes
  useEffect(() => {
    const stats = {};
    pveLog.forEach((entry) => {
      if (entry.action === 'win' && entry.npcClass) {
        const npcName = getNPCName(entry.npcClass);
        if (!stats[npcName]) {
          stats[npcName] = {
            kills: 0,
            lastKill: null,
            npcClass: entry.npcClass,
          };
        }
        stats[npcName].kills++;
        if (!stats[npcName].lastKill || entry.dateTime > stats[npcName].lastKill) {
          stats[npcName].lastKill = entry.dateTime;
        }
      }
    });
    setNpcStats(stats);
  }, [pveLog]);

  // Get recent activity (last 3 entries)
  const recentActivity = pveLog
    .slice(-3)
    .reverse()
    .map((entry) => ({
      ...entry,
      npcName: entry.npcClass ? getNPCName(entry.npcClass) : entry.npcClass,
    }));

  // Calculate K/D ratio
  const kdRatio = PVEData?.deaths === 0 ? PVEData?.kills : PVEData?.kills / PVEData?.deaths || 0;

  // Get all NPCs sorted by kills
  const allNPCs = Object.entries(npcStats).sort(([, a], [, b]) => b.kills - a.kills);

  // Filter NPCs based on search
  const filteredNPCs = allNPCs.filter(([npcName]) => npcName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='flex flex-row gap-6 p-5'>
      {/* PVE Overview Cards */}
      <div className='flex flex-col gap-2 w-1/4'>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Target className='w-5 h-5 text-green-600' />
              <CardTitle>Total Kills</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-green-600'>{PVEData?.kills || 0}</p>
            <CardDescription className='pl-4 pt-1'>This month: {PVEData?.currentMonth?.kills || 0}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Shield className='w-5 h-5 text-red-600' />
              <CardTitle>Total Deaths</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-red-600'>{PVEData?.deaths || 0}</p>
            <CardDescription className='pl-4 pt-1'>This month: {PVEData?.currentMonth?.deaths || 0}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <TrendingUp className='w-5 h-5 text-blue-600' />
              <CardTitle>K/D Ratio</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-blue-600'>{kdRatio.toFixed(1)}</p>
            <CardDescription className='pl-4 pt-1'>Overall performance</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Calendar className='w-5 h-5 text-purple-600' />
              <CardTitle>Kills This Month</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-purple-600'>{PVEData?.currentMonth?.kills || 0}</p>
            <CardDescription className='pl-4 pt-1'>({new Date().toLocaleDateString('en-US', { month: 'long' })})</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-col gap-2 w-3/4'>
        {/* Recent PVE Activity */}
        <Card>
          <CardContent className='space-y-3 pl-0'>
            <div className='flex flex-row space-y-3'>
              <h3 className='flex font-bold text-2xl uppercase tracking-widest justify-center items-center align-middle [writing-mode:vertical-rl] [text-orientation:sideways-right] pr-2'>Recent Activity</h3>
              <div className='flex flex-col space-y-3 w-full'>
                {recentActivity.length > 0 ? (
                  recentActivity.map((entry, index) => (
                    <div key={index} className='flex items-center justify-between p-3 border rounded-lg w-full'>
                      <div className='flex items-center gap-3'>
                        <div className={`w-8 h-8 ${entry.action === 'win' ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                          {entry.action === 'win' ? <Target className='w-4 h-4 text-green-600' /> : <Shield className='w-4 h-4 text-red-600' />}
                        </div>
                        <div>
                          <p className='font-medium'>{entry.npcName ? (entry.npcName.length > 42 ? entry.npcName.slice(0, 42) + '…' : entry.npcName) : 'Unknown NPC'}</p>
                          <p className='text-sm text-muted-foreground'>{formatTimeAgo(entry.dateTime)}</p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className={`font-medium ${entry.action === 'win' ? 'text-green-600' : 'text-red-600'}`}>{entry.action === 'win' ? '+1 Kill' : '+1 Death'}</p>
                        <p className='text-xs text-muted-foreground'>PVE Combat</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center p-6 text-muted-foreground'>
                    <p>No recent PVE activity</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* NPC Types Eliminated - Scrollable List */}
        <Card className='pb-0'>
          <CardContent className='px-0 py-0 my-0 mb-0 max-h-[310px] overflow-y-auto ship-scrollbar'>
            <div className='flex mr-1 flex-col gap-2 pl-4 mb-0'>
              <input className='mr-4 mb-2 px-2 py-1 rounded bg-muted text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-primary' placeholder='Search NPCs...' value={search} onChange={(e) => setSearch(e.target.value)} />
              <div className='flex flex-col gap-1 max-h-[250px] overflow-y-auto ship-scrollbar mb-0'>
                {filteredNPCs.map(([npcName, stats]) => (
                  <div key={npcName} className='pl-3 py-2 rounded cursor-pointer transition-colors select-none hover:bg-accent hover:text-accent-foreground'>
                    <div className='flex items-center justify-between pr-4'>
                      <span className='font-medium'>{npcName.length > 42 ? npcName.slice(0, 42) + '…' : npcName}</span>
                      <span className='text-green-600 font-medium'>{stats.kills} kills</span>
                    </div>
                  </div>
                ))}
                {filteredNPCs.length === 0 && <div className='text-muted-foreground pl-3 py-2'>No NPCs found.</div>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PVE;
