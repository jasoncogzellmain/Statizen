import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Target, Skull, MapPin, Zap, Ship } from 'lucide-react';

function PVP() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>PVP Statistics</h1>
        <p className='text-muted-foreground'>Track your player vs player combat performance</p>
      </div>

      {/* K/D Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Target className='w-5 h-5 text-green-600' />
            <h3 className='font-semibold'>Total Kills</h3>
          </div>
          <p className='text-3xl font-bold text-green-600'>247</p>
          <p className='text-sm text-muted-foreground'>+12 this week</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Skull className='w-5 h-5 text-red-600' />
            <h3 className='font-semibold'>Total Deaths</h3>
          </div>
          <p className='text-3xl font-bold text-red-600'>89</p>
          <p className='text-sm text-muted-foreground'>-3 this week</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <TrendingUp className='w-5 h-5 text-blue-600' />
            <h3 className='font-semibold'>K/D Ratio</h3>
          </div>
          <p className='text-3xl font-bold text-blue-600'>2.78</p>
          <p className='text-sm text-muted-foreground'>+0.15 this week</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <TrendingDown className='w-5 h-5 text-orange-600' />
            <h3 className='font-semibold'>Win Rate</h3>
          </div>
          <p className='text-3xl font-bold text-orange-600'>73.5%</p>
          <p className='text-sm text-muted-foreground'>+2.1% this week</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Recent Kills</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                  <Skull className='w-4 h-4 text-red-600' />
                </div>
                <div>
                  <p className='font-medium'>PlayerName123</p>
                  <p className='text-sm text-muted-foreground'>2 hours ago</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>+1 Kill</p>
                <p className='text-xs text-muted-foreground'>Grim Hex</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                  <Skull className='w-4 h-4 text-red-600' />
                </div>
                <div>
                  <p className='font-medium'>EnemyPlayer456</p>
                  <p className='text-sm text-muted-foreground'>5 hours ago</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>+1 Kill</p>
                <p className='text-xs text-muted-foreground'>Yela Belt</p>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Top Victims</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-green-600'>1</span>
                </div>
                <div>
                  <p className='font-medium'>PlayerName123</p>
                  <p className='text-sm text-muted-foreground'>Frequent target</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium'>15 kills</p>
                <p className='text-xs text-muted-foreground'>Last: 2h ago</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-blue-600'>2</span>
                </div>
                <div>
                  <p className='font-medium'>EnemyPlayer456</p>
                  <p className='text-sm text-muted-foreground'>Regular opponent</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium'>12 kills</p>
                <p className='text-xs text-muted-foreground'>Last: 5h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combat Locations */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Combat Hotspots</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='p-4 border rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
              <MapPin className='w-4 h-4 text-red-600' />
              <h4 className='font-medium'>Grim Hex</h4>
            </div>
            <p className='text-2xl font-bold text-red-600'>67 kills</p>
            <p className='text-sm text-muted-foreground'>Most active PVP zone</p>
          </div>
          <div className='p-4 border rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
              <MapPin className='w-4 h-4 text-blue-600' />
              <h4 className='font-medium'>Yela Belt</h4>
            </div>
            <p className='text-2xl font-bold text-blue-600'>45 kills</p>
            <p className='text-sm text-muted-foreground'>Asteroid field combat</p>
          </div>
          <div className='p-4 border rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
              <MapPin className='w-4 h-4 text-green-600' />
              <h4 className='font-medium'>Port Olisar</h4>
            </div>
            <p className='text-2xl font-bold text-green-600'>23 kills</p>
            <p className='text-sm text-muted-foreground'>Station defense</p>
          </div>
        </div>
      </div>

      {/* Ship Combat Stats */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Ship Combat Performance</h3>
        <div className='space-y-3'>
          <div className='flex items-center justify-between p-3 border rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
                <Ship className='w-4 h-4 text-purple-600' />
              </div>
              <div>
                <p className='font-medium'>Aurora MR</p>
                <p className='text-sm text-muted-foreground'>Primary ship</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='font-medium text-green-600'>89 kills</p>
              <p className='text-xs text-muted-foreground'>K/D: 3.2</p>
            </div>
          </div>
          <div className='flex items-center justify-between p-3 border rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                <Ship className='w-4 h-4 text-blue-600' />
              </div>
              <div>
                <p className='font-medium'>Arrow</p>
                <p className='text-sm text-muted-foreground'>Combat fighter</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='font-medium text-green-600'>67 kills</p>
              <p className='text-xs text-muted-foreground'>K/D: 4.1</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-4'>
        <Button>Add PVP Kill</Button>
        <Button variant='outline'>View Full History</Button>
        <Button variant='outline'>Export Data</Button>
      </div>
    </div>
  );
}

export default PVP;
