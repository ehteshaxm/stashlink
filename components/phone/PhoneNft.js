import React from 'react';

const PhoneNft = ({ image }) => {
  return (
    <div className='w-28 h-28 rounded-xl overflow-hidden m-3'>
      <img alt='nft' src={image} className='w-full h-full' />
    </div>
  );
};

export default PhoneNft;
