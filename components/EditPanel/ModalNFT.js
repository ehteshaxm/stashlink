import React from 'react';

const ModalNFT = ({
  index,
  image,
  isEth,
  isPolygon,
  nftProfileSelect,
  polygonNFTs,
  ethNFTs,
}) => {
  return (
    <div
      className={`w-28 h-28 rounded-xl overflow-hidden m-3 cursor-pointer border-2 p-1 border-secondary-black`}
      onClick={() => {
        if (isEth) {
          nftProfileSelect(ethNFTs[index]);
        } else {
          nftProfileSelect(polygonNFTs[index]);
        }
      }}
    >
      <label htmlFor='my-modal-3' className='cursor:pointer'>
        <img
          alt='nft not supported'
          src={image}
          className='w-full h-full rounded-lg'
        />
      </label>
    </div>
  );
};

export default ModalNFT;
