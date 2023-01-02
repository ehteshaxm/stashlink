import React from 'react';

const Wallet = ({ name, src }) => {
  return (
    <div className='flex justify-between items-center mt-3'>
      <div className='flex items-center overflow-hidden'>
        <div
          className={`p-2 ${
            name === 'Metamask' || name === 'Trust Wallet'
              ? 'bg-gray-50'
              : name === 'Rainbow'
              ? 'bg-blue-800'
              : 'bg-blue-700'
          } rounded-xl mr-3 min-w-fit`}
        >
          <img alt='coinbase' src={src} className='w-6 h-6' />
        </div>
        <div className='text-gray-50'>{name}</div>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-5 h-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M8.25 4.5l7.5 7.5-7.5 7.5'
        />
      </svg>
    </div>
  );
};

export default Wallet;
