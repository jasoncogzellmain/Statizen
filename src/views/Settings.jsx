import { Button } from '@/components/ui/button';

function Settings() {
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
                <p className='text-sm text-muted-foreground'>Enable push notifications</p>
              </div>
              <Button variant='outline' size='sm'>
                Enable
              </Button>
            </div>
          </div>
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
