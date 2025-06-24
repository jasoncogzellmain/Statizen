import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

function Tabs({ className, ...props }) {
  return <TabsPrimitive.Root data-slot='tabs' className={cn('flex flex-col gap-2', className)} {...props} />;
}

function TabsList({ className, children, ...props }) {
  return (
    <TabsPrimitive.List data-slot='tabs-list' className={cn('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] relative', className)} {...props}>
      {children}
      {/* Sliding indicator */}
      <div
        className='absolute inset-[3px] bg-background rounded-md transition-transform duration-300 ease-in-out pointer-events-none'
        style={{
          transform: 'translateX(var(--tab-indicator-x, 0px))',
          width: 'var(--tab-indicator-width, 0px)',
        }}
      />
    </TabsPrimitive.List>
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        "relative z-10 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content data-slot='tabs-content' className={cn('flex-1 outline-none', className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
