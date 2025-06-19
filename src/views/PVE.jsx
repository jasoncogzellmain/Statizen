import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Target, Shield, Zap, Ship, MapPin, DollarSign } from 'lucide-react';

function PVE() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>PVE Statistics</h1>
        <p className='text-muted-foreground'>Track your NPC combat and mission performance</p>
      </div>

      {/* PVE Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Target className='w-5 h-5 text-green-600' />
            <h3 className='font-semibold'>Total Kills</h3>
          </div>
          <p className='text-3xl font-bold text-green-600'>1,247</p>
          <p className='text-sm text-muted-foreground'>+89 this week</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Shield className='w-5 h-5 text-red-600' />
            <h3 className='font-semibold'>Total Deaths</h3>
          </div>
          <p className='text-3xl font-bold text-red-600'>23</p>
          <p className='text-sm text-muted-foreground'>-2 this week</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <TrendingUp className='w-5 h-5 text-blue-600' />
            <h3 className='font-semibold'>K/D Ratio</h3>
          </div>
          <p className='text-3xl font-bold text-blue-600'>54.2</p>
          <p className='text-sm text-muted-foreground'>+3.2 this week</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <DollarSign className='w-5 h-5 text-purple-600' />
            <h3 className='font-semibold'>Bounty Value</h3>
          </div>
          <p className='text-3xl font-bold text-purple-600'>2.4M</p>
          <p className='text-sm text-muted-foreground'>+180K this week</p>
        </div>
      </div>

      {/* NPC Types and Recent Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>NPC Types Eliminated</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                  <Ship className='w-4 h-4 text-red-600' />
                </div>
                <div>
                  <p className='font-medium'>Pirate Cutlasses</p>
                  <p className='text-sm text-muted-foreground'>Common threats</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>456 kills</p>
                <p className='text-xs text-muted-foreground'>Last: 1h ago</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <Shield className='w-4 h-4 text-blue-600' />
                </div>
                <div>
                  <p className='font-medium'>Vanduul Scouts</p>
                  <p className='text-sm text-muted-foreground'>Elite enemies</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>234 kills</p>
                <p className='text-xs text-muted-foreground'>Last: 3h ago</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
                  <Zap className='w-4 h-4 text-purple-600' />
                </div>
                <div>
                  <p className='font-medium'>Nine Tails Raiders</p>
                  <p className='text-sm text-muted-foreground'>Gang members</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>89 kills</p>
                <p className='text-xs text-muted-foreground'>Last: 1d ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Recent PVE Activity</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <Target className='w-4 h-4 text-green-600' />
                </div>
                <div>
                  <p className='font-medium'>Pirate Cutlass</p>
                  <p className='text-sm text-muted-foreground'>1 hour ago</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>+1 Kill</p>
                <p className='text-xs text-muted-foreground'>Yela Belt</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <Target className='w-4 h-4 text-green-600' />
                </div>
                <div>
                  <p className='font-medium'>Vanduul Scout</p>
                  <p className='text-sm text-muted-foreground'>3 hours ago</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>+1 Kill</p>
                <p className='text-xs text-muted-foreground'>Vanduul Space</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                  <Shield className='w-4 h-4 text-red-600' />
                </div>
                <div>
                  <p className='font-medium'>Nine Tails Raider</p>
                  <p className='text-sm text-muted-foreground'>1 day ago</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-red-600'>+1 Death</p>
                <p className='text-xs text-muted-foreground'>Grim Hex</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Zones */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Mission Zone Performance</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='p-4 border rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
              <MapPin className='w-4 h-4 text-red-600' />
              <h4 className='font-medium'>Yela Belt</h4>
            </div>
            <p className='text-2xl font-bold text-red-600'>567 kills</p>
            <p className='text-sm text-muted-foreground'>Bounty hunting</p>
          </div>
          <div className='p-4 border rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
              <MapPin className='w-4 h-4 text-blue-600' />
              <h4 className='font-medium'>Vanduul Space</h4>
            </div>
            <p className='text-2xl font-bold text-blue-600'>423 kills</p>
            <p className='text-sm text-muted-foreground'>Alien combat</p>
          </div>
          <div className='p-4 border rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
              <MapPin className='w-4 h-4 text-green-600' />
              <h4 className='font-medium'>Crusader</h4>
            </div>
            <p className='text-2xl font-bold text-green-600'>89 kills</p>
            <p className='text-sm text-muted-foreground'>Security missions</p>
          </div>
        </div>
      </div>

      {/* Bounty Missions */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Bounty Mission Stats</h3>
        <div className='space-y-3'>
          <div className='flex items-center justify-between p-3 border rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                <DollarSign className='w-4 h-4 text-green-600' />
              </div>
              <div>
                <p className='font-medium'>Completed Bounties</p>
                <p className='text-sm text-muted-foreground'>This week</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='font-medium text-green-600'>23 missions</p>
              <p className='text-xs text-muted-foreground'>180K aUEC earned</p>
            </div>
          </div>
          <div className='flex items-center justify-between p-3 border rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                <Target className='w-4 h-4 text-blue-600' />
              </div>
              <div>
                <p className='font-medium'>Success Rate</p>
                <p className='text-sm text-muted-foreground'>Bounty missions</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='font-medium text-blue-600'>95.8%</p>
              <p className='text-xs text-muted-foreground'>23/24 completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-4'>
        <Button>Add PVE Kill</Button>
        <Button variant='outline'>View Full History</Button>
        <Button variant='outline'>Export Data</Button>
      </div>
    </div>
  );
}

export default PVE;
