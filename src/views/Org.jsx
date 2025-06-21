import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, Skull, Users, Shield, Ship, MapPin, Building2, Calendar } from 'lucide-react';

function Org() {
  return (
    <div className='flex flex-row gap-6'>
      {/* Org Overview Cards */}
      <div className='flex flex-col gap-2 w-1/4'>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Building2 className='w-5 h-5 text-blue-600' />
              <CardTitle>Orgs Fought</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-blue-600'>15</p>
            <CardDescription className='pl-4 pt-1'>+2 this month</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Target className='w-5 h-5 text-green-600' />
              <CardTitle>Org Kills</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-green-600'>156</p>
            <CardDescription className='pl-4 pt-1'>+23 this week</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Skull className='w-5 h-5 text-red-600' />
              <CardTitle>Org Deaths</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className='pl-4 text-3xl font-bold text-red-600'>34</p>
            <CardDescription className='pl-4 pt-1'>-5 this week</CardDescription>
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
            <p className='pl-4 text-3xl font-bold text-purple-600'>45</p>
            <CardDescription className='pl-4 pt-1'>({new Date().toLocaleDateString('en-US', { month: 'long' })})</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-col gap-2 w-3/4'>
        {/* Organizations You Kill Most */}
        <Card>
          <CardContent className='space-y-3 pl-0'>
            <div className='flex flex-row space-y-3'>
              <h3 className='flex font-bold text-2xl uppercase tracking-widest justify-center items-center align-middle [writing-mode:vertical-rl] [text-orientation:sideways-right] pr-2'>Top Targets</h3>
              <div className='flex flex-col space-y-3 w-full'>
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
          </CardContent>
        </Card>
        {/* Organizations That Kill You Most */}
        <Card>
          <CardContent className='space-y-3 pl-0'>
            <div className='flex flex-row space-y-3'>
              <h3 className='flex font-bold text-2xl uppercase tracking-widest justify-center items-center align-middle [writing-mode:vertical-rl] [text-orientation:sideways-right] pr-2'>Top Threats</h3>
              <div className='flex flex-col space-y-3 w-full'>
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Org;
