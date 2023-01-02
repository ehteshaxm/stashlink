import React from 'react';

const Info = () => {
  return (
    <div className='w-full rounded-2xl bg-black p-4 px-7 py-7 min-h-60'>
      <div className='bg-base-300 w-full mx-auto rounded-xl h-32 flex justify-center items-end'>
        <div className='avatar online -mb-12'>
          <div className='w-24 mask mask-hexagon-2 '>
            <img src='https://placeimg.com/192/192/people' />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col items-center mt-14'>
        <p className='font-bold text-xl text-primary-content flex'>
          @ehteshaxm
          <img alt='bull' src='/bull-30.png' className='ml-2' />
        </p>
        <p className='font-normal text-md mt-2'>Ehtesham Siddiqui</p>
        <p className='font-normal text-sm mt-3 text-center'>
          KloutUp is a single link that you can use to reveal everything you’re
          sharing, everywhere you’re sharing it – all in one place.
        </p>
      </div>
    </div>
  );
};

export default Info;
