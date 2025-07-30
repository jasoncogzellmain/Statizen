import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/views/Dashboard';
import PVP from '@/views/PVP';
import PVE from '@/views/PVE';

import Org from '@/views/Org';
import Dictionary from '@/views/Dictionary';
import Settings from '@/views/Settings';
import LogFileLoader from '@/components/LogFileLoader';
import PageWrapper from '@/components/PageWrapper';

const Content = () => {
  return (
    <div className='flex-1 bg-accent overflow-y-auto'>
      <Routes>
        <Route
          path='/'
          element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          }
        />
        <Route
          path='/PVP'
          element={
            <PageWrapper>
              <PVP />
            </PageWrapper>
          }
        />
        <Route
          path='/PVE'
          element={
            <PageWrapper>
              <PVE />
            </PageWrapper>
          }
        />

        <Route
          path='/Org'
          element={
            <PageWrapper>
              <Org />
            </PageWrapper>
          }
        />
        <Route path='/settings' element={<Settings />} />
        <Route
          path='/load-log'
          element={
            <PageWrapper>
              <LogFileLoader />
            </PageWrapper>
          }
        />
        <Route path='/dictionary' element={<Dictionary />} />
      </Routes>
    </div>
  );
};

export default Content;
