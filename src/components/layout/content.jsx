import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/views/Dashboard';
import PVP from '@/views/PVP';
import PVE from '@/views/PVE';
import Org from '@/views/Org';
import Settings from '@/views/Settings';

const Content = () => {
  return (
    <div className='flex-1 bg-accent min-h-full p-5'>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/PVP' element={<PVP />} />
        <Route path='/PVE' element={<PVE />} />
        <Route path='/Org' element={<Org />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </div>
  );
};

export default Content;
