import React from 'react';
import Navbar from '../../components/Navbar';
import Info from '../../components/phone/Info';
import Wallets from '../../components/phone/Wallets';
import { useAccount, useBalance } from 'wagmi';
import { useWeb3Modal, Web3Button, Web3NetworkSwitch } from '@web3modal/react';
import InfoPanel from '../../components/EditPanel/InfoPanel';
import AddWallet from '../../components/EditPanel/AddWallet';

const Edit = () => {
  const acc = useAccount();
  console.log(acc);

  return (
    <div className='flex flex-row-reverse min-h-screen bg-base-200'>
      <Navbar />
      <div className='w-2/5 min-h-screen fixed left-0 top-0 bg-base-300 hero'>
        <div className='mockup-phone border-primary'>
          <div className='camera'></div>
          <div className='display'>
            <div className='artboard artboard-demo phone-1 block px-5 py-10 overflow-scroll scrollbar-hide'>
              <Info />
              <Wallets />
              <div className='w-full rounded-2xl bg-black p-4 px-7 py-7 min-h-60 mt-4'>
                <p className='font-semibold text-lg text-accent-content'>
                  Tokens
                </p>
                <div className='mt-4'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='min-h-screen w-3/5 p-24 pt-52'>
        <div className='w-full'>
          <InfoPanel />
          <div className='card w-4/5 mx-auto bg-base-100 shadow-xl'>
            <div className='card-body'>
              <div className='flex items-center justify-between'>
                <h2 className='font-sembold text-xl'>Add Wallets</h2>
                <Web3Button />
              </div>
              <div className='mt-10'>
                <AddWallet />
                <AddWallet />
                <AddWallet />
                <AddWallet />
                <AddWallet />
                <AddWallet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
