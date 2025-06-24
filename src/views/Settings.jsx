import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { handleOpenFile } from '@/lib/handleOpenFile';
import { useSettings } from '@/lib/context/settings/settingsContext';

function Settings() {
  const { settings, loading, updateSettings, updateEventTypes } = useSettings();

  const handleLogPath = async () => {
    const path = await handleOpenFile();
    if (path) {
      updateSettings('logPath', path);
    }
  };

  if (loading || !settings) return <div>Loading Settings...</div>;

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
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Webhooks</h3>
          <Card>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Enable Webhook</p>
                  <p className='text-sm text-muted-foreground'>Send game events to external services</p>
                </div>
                <Switch checked={settings.webhookEnabled} onCheckedChange={(val) => updateSettings('webhookEnabled', val)} />
              </div>

              {settings.webhookEnabled && (
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='webhook-type'>Webhook Type</Label>
                    <Select value={settings.webhookType} onValueChange={(val) => updateSettings('webhookType', val)}>
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
                    <Input id='webhook-url' type='url' placeholder='https://discord.com/api/webhooks/...' value={settings.webhookUrl} onChange={(e) => updateSettings('webhookUrl', e.target.value)} />
                  </div>

                  <div className='space-y-2'>
                    <Label>Event Types</Label>
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <Switch id='pvp-kills' checked={settings.eventTypes.pvpKills} onCheckedChange={(val) => updateEventTypes('pvpKills', val)} />
                        <Label htmlFor='pvp-kills'>PVP Kills</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch id='pvp-deaths' checked={settings.eventTypes.pvpDeaths} onCheckedChange={(val) => updateEventTypes('pvpDeaths', val)} />
                        <Label htmlFor='pvp-deaths'>PVP Deaths</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Switch id='pve-kills' checked={settings.eventTypes.pveKills} onCheckedChange={(val) => updateEventTypes('pveKills', val)} />
                        <Label htmlFor='pve-kills'>PVE Kills</Label>
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-2 w-full justify-end'>
                    <Button>Test Webhook</Button>
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
