import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

function Settings() {
  const [webhookType, setWebhookType] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEnabled, setWebhookEnabled] = useState(false);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>Settings</h1>
        <p className='text-muted-foreground'>Manage your Statizen preferences</p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>General Settings</h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Dark Mode</p>
                <p className='text-sm text-muted-foreground'>Toggle dark theme</p>
              </div>
              <Button variant='outline' size='sm'>
                Toggle
              </Button>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Notifications</p>
                <p className='text-sm text-muted-foreground'>Enable push notifications (Windows overlay)</p>
              </div>
              <Button variant='outline' size='sm'>
                Enable
              </Button>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Webhooks</h3>
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Enable Webhooks</p>
                  <p className='text-sm text-muted-foreground'>Send game events to external services</p>
                </div>
                <Switch checked={webhookEnabled} onCheckedChange={setWebhookEnabled} />
              </div>

              {webhookEnabled && (
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='webhook-type'>Webhook Type</Label>
                    <Select value={webhookType} onValueChange={setWebhookType}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select webhook type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='discord'>Discord</SelectItem>
                        <SelectItem value='webhook'>Generic Webhook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='webhook-url'>Webhook URL</Label>
                    <Input id='webhook-url' type='url' placeholder='https://discord.com/api/webhooks/...' value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
                  </div>

                  <div className='space-y-2'>
                    <Label>Event Types</Label>
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <Switch id='pvp-kills' defaultChecked />
                        <Label htmlFor='pvp-kills'>PVP Kills</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch id='pvp-deaths' defaultChecked />
                        <Label htmlFor='pvp-deaths'>PVP Deaths</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch id='pve-kills' />
                        <Label htmlFor='pve-kills'>PVE Kills</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch id='missions' />
                        <Label htmlFor='missions'>Mission Completions</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch id='bounties' />
                        <Label htmlFor='bounties'>Bounty Claims</Label>
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <Button>Test Webhook</Button>
                    <Button variant='outline'>Save Configuration</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Account</h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Profile</p>
                <p className='text-sm text-muted-foreground'>Update your profile information</p>
              </div>
              <Button variant='outline' size='sm'>
                Edit
              </Button>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Password</p>
                <p className='text-sm text-muted-foreground'>Change your password</p>
              </div>
              <Button variant='outline' size='sm'>
                Change
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
