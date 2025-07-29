import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, Skull, MapPin, Zap, Ship, Calendar } from 'lucide-react';
import { useData } from '@/lib/context/data/dataContext';
import { formatTimeAgo } from '@/lib/utils';
import { useState, useEffect } from 'react';
import ShipDictionary from '@/assets/Ship-Dictionary.json';

// Helper function to get ship name from dictionary
const getShipName = (shipClass) => {
  if (!shipClass) return shipClass;

  // Check if it's in the dictionary
  if (ShipDictionary.dictionary[shipClass]) {
    return ShipDictionary.dictionary[shipClass].name;
  }

  // If not found, return the original class name
  return shipClass;
};

function PVP() {
  const { PVPData, pvpLog } = useData();
  const [shipStats, setShipStats] = useState({});

  // Calculate ship kill statistics when pvpLog changes
  useEffect(() => {
    const stats = {};
    pvpLog.forEach((entry) => {
      if (entry.action === 'win' && entry.shipClass) {
        if (!stats[entry.shipClass]) {
          stats[entry.shipClass] = {
            kills: 0,
            deaths: 0,
            lastKill: null,
            lastDeath: null,
          };
        }
        stats[entry.shipClass].kills++;
        if (!stats[entry.shipClass].lastKill || entry.dateTime > stats[entry.shipClass].lastKill) {
          stats[entry.shipClass].lastKill = entry.dateTime;
        }
      } else if (entry.action === 'loss' && entry.shipClass) {
        if (!stats[entry.shipClass]) {
          stats[entry.shipClass] = {
            kills: 0,
            deaths: 0,
            lastKill: null,
            lastDeath: null,
          };
        }
        stats[entry.shipClass].deaths++;
        if (!stats[entry.shipClass].lastDeath || entry.dateTime > stats[entry.shipClass].lastDeath) {
          stats[entry.shipClass].lastDeath = entry.dateTime;
        }
      }
    });
    setShipStats(stats);
  }, [pvpLog]);

  // Get recent activity (last 3 entries)
  const recentActivity = pvpLog
    .slice(-3)
    .reverse()
    .map((entry) => ({
      ...entry,
      playerName: entry.playerClass || 'Unknown Player',
    }));

  // Calculate K/D ratio
  const kdRatio = PVPData?.deaths === 0 ? PVPData?.kills : (PVPData?.kills / PVPData?.deaths).toFixed(2);

  // Get top 3 ships by total kills
  const topShips = Object.entries(shipStats)
    .map(([shipClass, stats]) => ({
      shipClass,
      ...stats,
      totalKills: stats.kills,
      kdRatio: stats.deaths === 0 ? stats.kills : (stats.kills / stats.deaths).toFixed(2),
    }))
    .sort((a, b) => b.totalKills - a.totalKills)
    .slice(0, 3);

  return (
    <div className='flex flex-row gap-6 p-5'>
      {/* K/D Overview Cards */}
      <div className='flex flex-col gap-2 w-1/4'>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Target className='w-5 h-5 text-green-600' />
              <CardTitle>Total Kills</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-green-600'>{PVPData?.kills || 0}</p>
            <CardDescription className='pl-4 pt-1'>This month: {PVPData?.currentMonth?.kills || 0}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Skull className='w-5 h-5 text-red-600' />
              <CardTitle>Total Deaths</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-red-600'>{PVPData?.deaths || 0}</p>
            <CardDescription className='pl-4 pt-1'>This month: {PVPData?.currentMonth?.deaths || 0}</CardDescription>
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
            <p className='pl-4 text-3xl font-bold text-blue-600'>{kdRatio}</p>
            <CardDescription className='pl-4 pt-1'>Overall performance</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Calendar className='w-5 h-5 text-orange-600' />
              <CardTitle>Kills This Month</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-orange-600'>{PVPData?.currentMonth?.kills || 0}</p>
            <CardDescription className='pl-4 pt-1'>({new Date().toLocaleDateString('en-US', { month: 'long' })})</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-col gap-2 w-3/4'>
        {/* Recent Activity */}
        <Card>
          <CardContent className='space-y-3 pl-0'>
            <div className='flex flex-row space-y-3'>
              <h3 className='flex font-bold text-2xl uppercase tracking-widest justify-center items-center align-middle [writing-mode:vertical-rl] [text-orientation:sideways-right] pr-2'>Recent Kills</h3>
              <div className='flex flex-col space-y-3 w-full'>
                {recentActivity.length > 0 ? (
                  recentActivity.map((entry, index) => (
                    <div key={index} className='flex items-center justify-between p-3 border rounded-lg w-full'>
                      <div className='flex items-center gap-3'>
                        <div className={`w-8 h-8 ${entry.action === 'win' ? 'bg-red-100' : 'bg-gray-600'} rounded-full flex items-center justify-center`}>
                          <Skull className={`w-4 h-4 ${entry.action === 'win' ? 'text-red-600' : 'text-black'}`} />
                        </div>
                        <div>
                          <p className='font-medium'>{entry.playerName}</p>
                          <p className='text-sm text-muted-foreground'>{formatTimeAgo(entry.dateTime)}</p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className={`font-medium ${entry.action === 'win' ? 'text-green-600' : 'text-red-600'}`}>{entry.action === 'win' ? '+1 Kill' : '-1 Death'}</p>
                        <p className='text-xs text-muted-foreground'>PVP Combat</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center p-6 text-muted-foreground'>
                    <p>No recent PVP activity</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Ship Combat Stats */}
        <Card>
          <CardContent className='space-y-3 pl-0'>
            <div className='flex flex-row space-y-3'>
              <h3 className='flex font-bold text-2xl uppercase tracking-widest justify-center items-center align-middle [writing-mode:vertical-rl] [text-orientation:sideways-right] pr-2'>Ship Ranking</h3>
              <div className='flex flex-col space-y-3 w-full'>
                {topShips.length > 0 ? (
                  topShips.map((ship, index) => (
                    <div key={ship.shipClass} className='flex items-center justify-between p-3 border rounded-lg w-full'>
                      <div className='flex items-center gap-3'>
                        <div className={`w-8 h-8 ${index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-purple-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                          <Ship className={`w-4 h-4 ${index === 0 ? 'text-blue-600' : index === 1 ? 'text-purple-600' : 'text-green-600'}`} />
                        </div>
                        <div>
                          <p className='font-medium'>{getShipName(ship.shipClass)}</p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium text-green-600'>{ship.totalKills} kills</p>
                        <p className='text-xs text-muted-foreground'>K/D: {ship.kdRatio}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center p-6 text-muted-foreground'>
                    <p>No ship combat data recorded yet</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PVP;
