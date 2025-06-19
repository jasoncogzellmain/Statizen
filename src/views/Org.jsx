import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Target, Skull, Users, Shield, Ship, MapPin, Building2 } from 'lucide-react';

function Org() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>Organization Statistics</h1>
        <p className='text-muted-foreground'>Track your interactions with different organizations and corporations</p>
      </div>

      {/* Org Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Building2 className='w-5 h-5 text-blue-600' />
            <h3 className='font-semibold'>Orgs Fought</h3>
          </div>
          <p className='text-3xl font-bold text-blue-600'>15</p>
          <p className='text-sm text-muted-foreground'>+2 this month</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Target className='w-5 h-5 text-green-600' />
            <h3 className='font-semibold'>Org Kills</h3>
          </div>
          <p className='text-3xl font-bold text-green-600'>156</p>
          <p className='text-sm text-muted-foreground'>+23 this week</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Skull className='w-5 h-5 text-red-600' />
            <h3 className='font-semibold'>Org Deaths</h3>
          </div>
          <p className='text-3xl font-bold text-red-600'>34</p>
          <p className='text-sm text-muted-foreground'>-5 this week</p>
        </div>
        <div className='p-6 border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <TrendingUp className='w-5 h-5 text-purple-600' />
            <h3 className='font-semibold'>Org K/D</h3>
          </div>
          <p className='text-3xl font-bold text-purple-600'>4.59</p>
          <p className='text-sm text-muted-foreground'>+0.8 this week</p>
        </div>
      </div>

      {/* Top Organizations */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Organizations You Kill Most</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-red-600'>1</span>
                </div>
                <div>
                  <p className='font-medium'>Nine Tails</p>
                  <p className='text-sm text-muted-foreground'>Criminal syndicate</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>45 kills</p>
                <p className='text-xs text-muted-foreground'>Last: 6h ago</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-blue-600'>2</span>
                </div>
                <div>
                  <p className='font-medium'>Hurston Dynamics</p>
                  <p className='text-sm text-muted-foreground'>Corporate security</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>32 kills</p>
                <p className='text-xs text-muted-foreground'>Last: 1d ago</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-green-600'>3</span>
                </div>
                <div>
                  <p className='font-medium'>MISC Security</p>
                  <p className='text-sm text-muted-foreground'>Corporate defense</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>28 kills</p>
                <p className='text-xs text-muted-foreground'>Last: 2d ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Organizations That Kill You Most</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-red-600'>1</span>
                </div>
                <div>
                  <p className='font-medium'>UEE Navy</p>
                  <p className='text-sm text-muted-foreground'>Military force</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-red-600'>12 deaths</p>
                <p className='text-xs text-muted-foreground'>Last: 3d ago</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-blue-600'>2</span>
                </div>
                <div>
                  <p className='font-medium'>Nine Tails</p>
                  <p className='text-sm text-muted-foreground'>Criminal syndicate</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-red-600'>8 deaths</p>
                <p className='text-xs text-muted-foreground'>Last: 1w ago</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-green-600'>3</span>
                </div>
                <div>
                  <p className='font-medium'>Crusader Security</p>
                  <p className='text-sm text-muted-foreground'>Local security</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-red-600'>6 deaths</p>
                <p className='text-xs text-muted-foreground'>Last: 2w ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Org Battles */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Recent Organization Battles</h3>
        <div className='space-y-3'>
          <div className='flex items-center justify-between p-3 border rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                <Ship className='w-4 h-4 text-green-600' />
              </div>
              <div>
                <p className='font-medium'>Nine Tails Member</p>
                <p className='text-sm text-muted-foreground'>6 hours ago</p>
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
                <Shield className='w-4 h-4 text-red-600' />
              </div>
              <div>
                <p className='font-medium'>UEE Navy Officer</p>
                <p className='text-sm text-muted-foreground'>3 days ago</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='font-medium text-red-600'>+1 Death</p>
              <p className='text-xs text-muted-foreground'>Port Olisar</p>
            </div>
          </div>
          <div className='flex items-center justify-between p-3 border rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                <Ship className='w-4 h-4 text-green-600' />
              </div>
              <div>
                <p className='font-medium'>Hurston Security</p>
                <p className='text-sm text-muted-foreground'>1 day ago</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='font-medium text-green-600'>+1 Kill</p>
              <p className='text-xs text-muted-foreground'>Lorville</p>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Alliances/Enemies */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Allied Organizations</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between p-3 border rounded-lg bg-green-50'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <Users className='w-4 h-4 text-green-600' />
                </div>
                <div>
                  <p className='font-medium'>Crusader Industries</p>
                  <p className='text-sm text-muted-foreground'>Corporate ally</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-green-600'>Allied</p>
                <p className='text-xs text-muted-foreground'>No conflicts</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg bg-blue-50'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <Users className='w-4 h-4 text-blue-600' />
                </div>
                <div>
                  <p className='font-medium'>MISC</p>
                  <p className='text-sm text-muted-foreground'>Neutral corporation</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-blue-600'>Neutral</p>
                <p className='text-xs text-muted-foreground'>Trade relations</p>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Hostile Organizations</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between p-3 border rounded-lg bg-red-50'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                  <Ship className='w-4 h-4 text-red-600' />
                </div>
                <div>
                  <p className='font-medium'>Nine Tails</p>
                  <p className='text-sm text-muted-foreground'>War declared</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-red-600'>Hostile</p>
                <p className='text-xs text-muted-foreground'>Active conflict</p>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 border rounded-lg bg-orange-50'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center'>
                  <Shield className='w-4 h-4 text-orange-600' />
                </div>
                <div>
                  <p className='font-medium'>Hurston Dynamics</p>
                  <p className='text-sm text-muted-foreground'>Tense relations</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-medium text-orange-600'>Unfriendly</p>
                <p className='text-xs text-muted-foreground'>Border skirmishes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-4'>
        <Button>Add Org Battle</Button>
        <Button variant='outline'>View Full History</Button>
        <Button variant='outline'>Export Data</Button>
      </div>
    </div>
  );
}

export default Org;
