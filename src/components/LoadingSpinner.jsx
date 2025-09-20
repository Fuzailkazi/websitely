import React from 'react';
import { FadeLoader } from 'react-spinners';

const LoadingSpinner = ({ isDark }) => {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col'>
      <FadeLoader color={isDark ? '#22c55e' : '#16a34a'} />
      <h3 className={`text-2xl mt-4 font-semibold text-center ${isDark ? '' : 'text-black'}`}>
        <span className='bg-gradient-to-br from-green-300 to-green-700 bg-clip-text text-transparent'>
          Generating
        </span> your website...
      </h3>
    </div>
  );
};

export default LoadingSpinner;