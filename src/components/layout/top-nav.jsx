import React from 'react';
import { Minus, Sun, X, Home, Settings as SettingsIcon, Sword, Shield, Users, Book } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Button } from '@/components/ui/button';

const TopNav = () => {
  const location = useLocation();
  const appWindow = getCurrentWindow();

  return (
    <div className='flex justify-between items-center p-4 draggable bg-black'>
      <div className='flex items-center gap-6'>
        <img src='/StatizenLogo.png' alt='Statizen Logo' className='h-10' />
        <nav className='flex items-center gap-2 no-drag'>
          <Link to='/dashboard'>
            <Button variant={location.pathname === '/' || location.pathname === '/dashboard' ? 'default' : 'ghost'} size='sm' className='flex items-center gap-2'>
              <Home className='w-4 h-4' />
              Dashboard
            </Button>
          </Link>
          <Link to='/PVP'>
            <Button variant={location.pathname === '/PVP' ? 'default' : 'ghost'} size='sm' className='flex items-center gap-2'>
              <Sword className='w-4 h-4' />
              PVP
            </Button>
          </Link>
          <Link to='/PVE'>
            <Button variant={location.pathname === '/PVE' ? 'default' : 'ghost'} size='sm' className='flex items-center gap-2'>
              <Shield className='w-4 h-4' />
              PVE
            </Button>
          </Link>
          {/* Org is not used yet */}
          {/* <Link to='/Org'>
            <Button variant={location.pathname === '/Org' ? 'default' : 'ghost'} size='sm' className='flex items-center gap-2'>
              <Users className='w-4 h-4' />
              Org
            </Button>
          </Link> */}
          <Link to='/settings'>
            <Button variant={location.pathname === '/settings' ? 'default' : 'ghost'} size='sm' className='flex items-center gap-2'>
              <SettingsIcon className='w-4 h-4' />
              Settings
            </Button>
          </Link>
          <Link to='/dictionary'>
            <Button variant={location.pathname === '/dictionary' ? 'default' : 'ghost'} size='sm' className='flex items-center gap-2'>
              <Book className='w-4 h-4' />
              Dictionary
            </Button>
          </Link>
        </nav>
      </div>
      <div className='flex items-center gap-4 no-drag'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className='cursor-pointer' variant='link' size='icon' onClick={() => appWindow.minimize()}>
              <Minus className='w-4 h-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Minimize</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className='cursor-pointer' variant='link' size='icon' onClick={() => appWindow.close()}>
              <X className='w-4 h-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default TopNav;
