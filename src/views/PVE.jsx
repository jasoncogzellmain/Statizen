import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, Shield, Zap, Ship, Calendar } from 'lucide-react';

function PVE() {
  return (
    <div className='flex flex-row gap-6'>
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
            <p className='pl-4 text-3xl font-bold text-green-600'>1,247</p>
            <CardDescription className='pl-4 pt-1'>+89 this week</CardDescription>
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
            <p className='pl-4 text-3xl font-bold text-red-600'>23</p>
            <CardDescription className='pl-4 pt-1'>-2 this week</CardDescription>
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
            <p className='pl-4 text-3xl font-bold text-blue-600'>54.2</p>
            <CardDescription className='pl-4 pt-1'>+3.2 this week</CardDescription>
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
            <p className='pl-4 text-3xl font-bold text-purple-600'>12</p>
            <CardDescription className='pl-4 pt-1'>({new Date().toLocaleDateString('en-US', { month: 'long' })})</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-col gap-2 w-3/4'>
        {/* NPC Types Eliminated */}
        <Card>
          <CardContent className='space-y-3 pl-0'>
            <div className='flex flex-row space-y-3'>
              <h3 className='flex font-bold text-2xl uppercase tracking-widest justify-center items-center align-middle [writing-mode:vertical-rl] [text-orientation:sideways-right] pr-2'>NPC Types</h3>
              <div className='flex flex-col space-y-3 w-full'>
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
          </CardContent>
        </Card>
        {/* Recent PVE Activity */}
        <Card>
          <CardContent className='space-y-3 pl-0'>
            <div className='flex flex-row space-y-3'>
              <h3 className='flex font-bold text-2xl uppercase tracking-widest justify-center items-center align-middle [writing-mode:vertical-rl] [text-orientation:sideways-right] pr-2'>Recent Activity</h3>
              <div className='flex flex-col space-y-3 w-full'>
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PVE;
