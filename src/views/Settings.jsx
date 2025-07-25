import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { handleOpenFile } from '@/lib/handleOpenFile';
import { useSettings } from '@/lib/context/settings/settingsContext';
import { useData } from '@/lib/context/data/dataContext';
import { InfoIcon } from 'lucide-react';
import { useState } from 'react';

function Settings() {
  const { settings, loading, updateSettings, updateEventTypes } = useSettings();
  const { userData } = useData();
  const [testing, setTesting] = useState(false);

  const handleLogPath = async () => {
    const path = await handleOpenFile();
    if (path) {
      updateSettings('logPath', path);
    }
  };

  const testDiscordWebhook = async () => {
    if (!settings?.discordEnabled || !settings?.discordWebhookUrl) return;

    setTesting(true);
    try {
      const response = await fetch(settings.discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `${userData?.userName || 'Unknown User'} just tested the Statizen Discord link, it is up and running!`,
        }),
      });

      if (!response.ok) {
        console.error('Failed to send test Discord webhook:', response.status, response.statusText);
      } else {
        console.log('Discord webhook test successful!');
      }
    } catch (error) {
      console.error('Error sending test Discord webhook:', error);
    } finally {
      setTesting(false);
    }
  };

  if (loading || !settings) return <div>Loading Settings...</div>;

  const safeEvent = settings.eventTypes || {};

  return (
    <div className='flex flex-col gap-6 p-5'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>Settings</h1>
        <p className='text-muted-foreground'>Manage your Statizen preferences</p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>General Settings</h3>
          <div className='space-y-4 pl-4'>
            <div className='space-y-2 w-3/4'>
              <Label htmlFor='log-path'>Game Log File</Label>
              <div className='flex flex-row w-full gap-2'>
                <Input id='log-path' className='w-full' type='text' placeholder='(e.g. C:/Program Files(x86)/StarCitizen/Live/Game.log)' value={settings.logPath} onChange={(e) => updateSettings('logPath', e.target.value)} />
                <Button onClick={handleLogPath}>Browse</Button>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <div className='flex items-center space-x-2'>
                  <Switch checked={settings.notifications} onCheckedChange={(val) => updateSettings('notifications', val)} />
                  <p className='text-sm text-muted-foreground'>Enable push notifications (Windows overlay)</p>
                </div>
                <div className='flex flex-row gap-1 items-center pt-2 pl-2'>
                  <InfoIcon className='w-3 h-3' />
                  <span className='text-xs text-muted-foreground'>Display notifications for PVP kills only (May cause unexpected behavior)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <p className='font-medium'>Submit Missing NPC Names</p>
            <div className='pl-4'>
              <div className='flex flex-row gap-2 items-center pt-2'>
                <Switch checked={settings.allowDictionarySubmit} onCheckedChange={(val) => updateSettings('allowDictionarySubmit', val)} />
                <p className='text-sm text-muted-foreground'>Allow sharing unknown NPC types to improve the dictionary (opt-in)</p>
              </div>
              <div className='flex flex-row gap-1 items-center pt-2 pl-2'>
                <InfoIcon className='w-3 h-3' />
                <span className='text-xs text-muted-foreground'>This will send data to the Statizen team to help improve the dictionary. By default, this is disabled.</span>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Faction Selection</h3>
          <Card>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='faction'>Select Your Faction</Label>
                <Select value={settings.faction} onValueChange={(val) => updateSettings('faction', val)}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Faction' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='peacekeeper'>Peacekeeper</SelectItem>
                    <SelectItem value='outlaw'>Outlaw</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Discord Notifications</h3>
          <Card>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Enable Discord Notifications</p>
                  <p className='text-sm text-muted-foreground'>Send game events to Discord via webhook</p>
                </div>
                <Switch checked={settings.discordEnabled} onCheckedChange={(val) => updateSettings('discordEnabled', val)} />
              </div>

              {settings.discordEnabled && (
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='discord-webhook-url'>Discord Webhook URL</Label>
                    <Input id='discord-webhook-url' type='url' placeholder='https://discord.com/api/webhooks/...' value={settings.discordWebhookUrl} onChange={(e) => updateSettings('discordWebhookUrl', e.target.value)} />
                    <div className='flex flex-row gap-1 items-center pt-2'>
                      <InfoIcon className='w-3 h-3' />
                      <span className='text-xs text-muted-foreground'>Create a webhook in your Discord server settings to get the URL</span>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label>Event Types</Label>
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <Switch id='pvp-kills' checked={safeEvent.pvpKills} onCheckedChange={(val) => updateEventTypes('pvpKills', val)} />
                        <Label htmlFor='pvp-kills'>PVP Kills</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch id='pvp-deaths' checked={safeEvent.pvpDeaths} onCheckedChange={(val) => updateEventTypes('pvpDeaths', val)} />
                        <Label htmlFor='pvp-deaths'>PVP Deaths</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch id='pve-kills' checked={safeEvent.pveKills} onCheckedChange={(val) => updateEventTypes('pveKills', val)} />
                        <Label htmlFor='pve-kills'>PVE Kills</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch id='suicides' checked={safeEvent.suicides} onCheckedChange={(val) => updateEventTypes('suicides', val)} />
                        <Label htmlFor='suicides'>Suicides</Label>
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-2 w-full justify-end'>
                    <Button onClick={testDiscordWebhook} disabled={testing}>
                      {testing ? 'Testing...' : 'Test Discord Webhook'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;
