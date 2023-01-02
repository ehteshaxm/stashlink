import React from 'react';
import Wallet from './Wallet';

const Wallets = () => {
  return (
    <div className='w-full rounded-2xl bg-black p-4 px-7 py-7 min-h-60 mt-4'>
      <p className='font-semibold text-lg text-accent-content'>Wallets</p>
      <div className='mt-4'>
        <Wallet name='Coinbase' src='/coinbase.svg' />
        <Wallet name='Metamask' src='/metamask.svg' />
        <Wallet name='Rainbow' src='/rainbow.png' />
        <Wallet name='Trust Wallet' src='/trustwallet.svg' />
      </div>
    </div>
  );
};

export default Wallets;
