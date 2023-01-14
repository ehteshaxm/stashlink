import React from 'react';
import PhoneNft from './PhoneNft';

const NFTs = ({ selectedNFTs }) => {
  return (
    <div className='w-full mt-14'>
      <div className='flex justify-between flex-wrap px-1'>
        {selectedNFTs.map((nft, index) => {
          return <PhoneNft key={index} image={nft.metadata.image} />;
        })}
      </div>
    </div>
  );
};

export default NFTs;
