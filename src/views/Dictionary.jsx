import React from 'react';
import { useState, useRef, useEffect, cloneElement } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Target, Skull, MapPin, Zap, Ship, Calendar } from 'lucide-react';

import shipDictRaw from '@/assets/Ship-Dictionary.json';

function AnimatedTabs({ defaultValue, children, ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabsListRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    if (tabsListRef.current) {
      const activeTrigger = tabsListRef.current.querySelector(`[data-state="active"]`);
      if (activeTrigger) {
        const listRect = tabsListRef.current.getBoundingClientRect();
        const triggerRect = activeTrigger.getBoundingClientRect();
        // Add margin to avoid overlapping rounded corners
        const listPadding = 3;
        const margin = 2;
        const relativeX = triggerRect.left - listRect.left - listPadding + margin;
        const indicatorWidth = triggerRect.width - margin * 2;
        setIndicatorStyle({
          '--tab-indicator-x': `${relativeX}px`,
          '--tab-indicator-width': `${indicatorWidth}px`,
        });
      }
    }
  }, [activeTab]);

  // Find the TabsList child and pass the ref and style to it
  const childrenWithProps = React.Children.map(children, (child) => {
    if (child.type === TabsList) {
      return cloneElement(child, {
        ref: tabsListRef,
        style: indicatorStyle,
      });
    }
    return child;
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} {...props}>
      {childrenWithProps}
    </Tabs>
  );
}

function ShipList({ selectedShip, setSelectedShip }) {
  const [search, setSearch] = useState('');
  const ships = React.useMemo(() => {
    const dict = shipDictRaw.dictionary || {};
    return Object.entries(dict)
      .filter(([key, value]) => key !== 'template' && value.name)
      .map((entry) => entry[1].name)
      .sort((a, b) => a.localeCompare(b));
  }, []);
  const filtered = ships.filter((name) => name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className='flex flex-col gap-2'>
      <input className=' mx-2 mb-2 px-2 py-1 rounded bg-muted text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-primary' placeholder='Search ships...' value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className='flex flex-col gap-1 max-h-[560px] overflow-y-auto ship-scrollbar'>
        {filtered.map((name) => (
          <div
            key={name}
            className={'pl-3 py-2 rounded cursor-pointer transition-colors select-none ' + (selectedShip === name ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground')}
            onClick={() => setSelectedShip(name)}
          >
            {name}
          </div>
        ))}
        {filtered.length === 0 && <div className='text-muted-foreground pl-3 py-2'>No ships found.</div>}
      </div>
    </div>
  );
}

function ShipDetails({ shipName }) {
  if (!shipName) return <div className='text-muted-foreground p-6'>Select a ship to see details.</div>;
  const dict = shipDictRaw.dictionary || {};
  const ship = Object.values(dict).find((s) => s.name === shipName);
  if (!ship) return <div className='text-muted-foreground p-6'>Ship not found.</div>;
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-2'>
        {ship.image && <img src={new URL(`../assets/ships/${ship.image}`, import.meta.url).href} alt={ship.name} className='w-[340px] h-auto aspect-[16/9] object-fit' />}
        <div className='flex flex-col gap-2 px-4 w-full'>
          <div className='text-2xl font-bold pt-4'>{ship.name}</div>
          <div className='text-sm text-muted-foreground'>{ship.role}</div>
          <div className='flex flex-col gap-2'>
            <Card className='max-h-[70px] py-2'>
              <div className='flex items-center gap-2 px-6 justify-between'>
                <div className='flex flex-row gap-2 items-center'>
                  <Target className='w-5 h-5 text-green-600' />
                  <CardTitle>Total Versus Wins</CardTitle>
                </div>
                <p className='pl-4 text-xl font-bold text-green-600'>{ship['versus-wins'] ? ship['versus-wins'] : 0}</p>
              </div>
            </Card>
            <Card className='max-h-[70px] py-2'>
              <div className='flex items-center gap-2 px-6 justify-between'>
                <div className='flex flex-row gap-2 items-center'>
                  <Skull className='w-5 h-5 text-red-600' />
                  <CardTitle>Total Versus Losses</CardTitle>
                </div>
                <p className='pl-4 text-xl font-bold text-red-600'>{ship['versus-losses'] ? ship['versus-losses'] : 0}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Separator className='pt-0 mt-0' />
      <div className='flex flex-col mt-0 justify-center items-center'>
        <table className='w-full bg-muted/60 rounded-lg shadow-sm'>
          <tbody>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground w-1/4'>Size</td>
              <td className='px-4 py-2 text-foreground'>{ship.size}</td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Base DPS</td>
              <td className='px-4 py-2 text-foreground'>{ship['base-dps']}</td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Hull Body</td>
              <td className='px-4 py-2 text-foreground'>{ship['HullBody']}</td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Crew</td>
              <td className='px-4 py-2 text-foreground'>{ship.crew}</td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Cargo</td>
              <td className='px-4 py-2 text-foreground'>{ship.cargo}</td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Default Shield</td>
              <td className='px-4 py-2 text-foreground'>
                {ship['shield-type']} ({ship['shield-capacity']})
              </td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Pilot Guns</td>
              <td className='px-4 py-2 text-foreground'>{ship['pilot-guns'] || '-'}</td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Turret Guns</td>
              <td className='px-4 py-2 text-foreground'>{ship['turret-guns'] || '-'}</td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Missiles</td>
              <td className='px-4 py-2 text-foreground'>{ship['missles'] || '-'}</td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Manufacturer</td>
              <td className='px-4 py-2 text-foreground'>{ship.manufacturer || '-'}</td>
            </tr>
            <tr className='odd:bg-muted/60 even:bg-muted/40 border-b border-border last:border-none'>
              <td className='px-4 py-2 font-semibold text-muted-foreground'>Verified</td>
              <td className='px-4 py-2 text-foreground'>{ship.verified ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Dictionary() {
  const [selectedShip, setSelectedShip] = useState(null);
  return (
    <div className='flex flex-row min-h-[654px]'>
      <div className='flex flex-col bg-background w-[200px] min-h-full border-r border-muted-foreground'>
        <AnimatedTabs defaultValue='ship'>
          <TabsList className='flex flex-row gap-2 w-full rounded-t-none'>
            <TabsTrigger value='ship'>Ships</TabsTrigger>
            <TabsTrigger value='npc'>NPCs</TabsTrigger>
          </TabsList>
          <TabsContent value='ship'>
            <div className='flex flex-col bg-background min-h-full border-r'>
              <ShipList selectedShip={selectedShip} setSelectedShip={setSelectedShip} />
            </div>
          </TabsContent>
          <TabsContent value='npc'>
            <div className='flex flex-col bg-background px-3 min-h-full border-r'>test</div>
          </TabsContent>
        </AnimatedTabs>
      </div>
      <div id='dictionary-content' className='flex-1 bg-background'>
        <ShipDetails shipName={selectedShip} />
      </div>
    </div>
  );
}

export default Dictionary;
