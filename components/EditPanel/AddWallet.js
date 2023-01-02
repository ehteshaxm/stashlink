import React from 'react';

const AddWallet = () => {
  return (
    <button className='text-left btn-primary p-3 px-5 mb-4 max-h-fit max-w-fit mx-auto rounded-xl bg-neutral flex items-center'>
      <img alt='coinbase' src='/metamask.svg' className='w-8 h-8 mr-4' />
      <div>
        <p className='text-primary-content text-md'>Rainbow Wallet</p>
        <p className='text-neutral-content text-sm'>
          0xe1435247B7373dAC9027c4bd3E135e122e6AEB9a
        </p>
      </div>
    </button>
  );
};

export default AddWallet;
