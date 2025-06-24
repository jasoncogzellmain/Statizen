import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, Skull, MapPin, Zap, Ship, Calendar } from 'lucide-react';

function PVP() {
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
            <p className='pl-4 text-3xl font-bold text-green-600'>247</p>
            <CardDescription className='pl-4 pt-1'>+12 this week</CardDescription>
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
            <p className='pl-4 text-3xl font-bold text-red-600'>89</p>
            <CardDescription className='pl-4 pt-1'>-3 this week</CardDescription>
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
            <p className='pl-4 text-3xl font-bold text-blue-600'>2.78</p>
            <CardDescription className='pl-4 pt-1'>+0.15 this week</CardDescription>
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
            <p className='pl-4 text-3xl font-bold text-orange-600'>85</p>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
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
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center'>
                      <Skull className='w-4 h-4 text-black' />
                    </div>
                    <div>
                      <p className='font-medium'>EnemyPlayer789</p>
                      <p className='text-sm text-muted-foreground'>1 day ago</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-red-600'>-1 Death</p>
                    <p className='text-xs text-muted-foreground'>Grim Hex</p>
                  </div>
                </div>
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
                <div className='flex items-center justify-between p-3 border rounded-lg w-full'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                      <Ship className='w-4 h-4 text-blue-600' />
                    </div>
                    <div>
                      <p className='font-medium'>Perseus</p>
                      <p className='text-sm text-muted-foreground'>Heavy Assault</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-green-600'>592 kills</p>
                    <p className='text-xs text-muted-foreground'>K/D: 65.2</p>
                  </div>
                </div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PVP;
