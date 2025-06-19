import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Target, Skull, User, Zap, Clock, UserCheck, Server, Gamepad2 } from 'lucide-react';

function Dashboard() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row w-full gap-2'>
        <div className='flex flex-col gap-2 w-1/3'>
          {/* Main Stats Cards */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <MapPin className='w-5 h-5 text-blue-600' />
                <CardTitle>Current Location</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-xl font-bold'>Port Olisar</p>
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
              <p className='text-xl font-bold text-green-600'>2.78</p>
              <CardDescription>247 kills / 89 deaths</CardDescription>
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
              <p className='text-xl font-bold text-orange-600'>54.2</p>
              <CardDescription>1,247 kills / 23 deaths</CardDescription>
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
              <div className='flex items-center justify-between p-2 rounded-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <Zap className='w-4 h-4 text-blue-600' />
                  </div>
                  <div>
                    <p className='font-medium'>Quantuming To</p>
                    <p className='text-sm text-muted-foreground'>ArcCorp</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium text-blue-600'>In Progress</p>
                  <p className='text-xs text-muted-foreground'>ETA: 2m 34s</p>
                </div>
              </div>
              <div className='flex items-center justify-between p-2 rounded-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
                    <MapPin className='w-4 h-4 text-purple-600' />
                  </div>
                  <div>
                    <p className='font-medium'>Current Ship</p>
                    <p className='text-sm text-muted-foreground'>Aurora MR</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium text-purple-600'>Ready</p>
                  <p className='text-xs text-muted-foreground'>100% Hull</p>
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
                <p className='text-sm text-muted-foreground'>3.22.1-LIVE</p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 border rounded-lg'>
              <Clock className='w-5 h-5 text-green-600' />
              <div>
                <p className='font-medium'>Last Sync Time</p>
                <p className='text-sm text-muted-foreground'>2 minutes ago</p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 border rounded-lg'>
              <UserCheck className='w-5 h-5 text-purple-600' />
              <div>
                <p className='font-medium'>Logged in as</p>
                <p className='text-sm text-muted-foreground'>YourUsername</p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 border rounded-lg'>
              <Server className='w-5 h-5 text-orange-600' />
              <div>
                <p className='font-medium'>Connected to Shard</p>
                <p className='text-sm text-muted-foreground'>US-AUS-01</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
