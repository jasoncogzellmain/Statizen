import React from 'react';

const Footer = () => {
  return (
    <div className='bg-black'>
      <div className='flex justify-between items-center py-1 px-3 text-xs'>
        <span>
          Written by{' '}
          <a href='https://robertsspaceindustries.com/en/citizens/Nowskify' target='_blank' rel='noopener noreferrer' className='text-blue-400'>
            Nowskify
          </a>
        </span>
        <span className='text-red-400 animate-pulse'>Log File Not Loaded</span>
      </div>
    </div>
  );
};

export default Footer;
