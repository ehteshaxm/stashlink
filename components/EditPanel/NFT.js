import React, { useState } from 'react';

const NFT = ({
  index,
  image,
  selectedNFTs,
  setSelectedNFTs,
  polygonNFTs,
  ethNFTs,
  tokenId,
  isPolygon,
  cAddress,
}) => {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`w-28 h-28 rounded-xl overflow-hidden m-3 cursor-pointer border-2 p-1 hover:opacity-30 border-secondary-black
      ${selected && 'opacity-30'}`}
      onClick={(e) => {
        if (!selected) {
          const newSelection = [...selectedNFTs];
          if (isPolygon) {
            newSelection.push(polygonNFTs[index]);
          } else {
            newSelection.push(ethNFTs[index]);
          }
          setSelectedNFTs(newSelection);
          setSelected(!selected);
        } else if (selected) {
          const newSelection = [...selectedNFTs];
          const index = newSelection.findIndex(
            (nft) =>
              nft.token_id === tokenId && nft.contract_address === cAddress
          );
          newSelection.splice(index, 1);
          setSelectedNFTs(newSelection);
          setSelected(!selected);
        }
      }}
    >
      <img
        alt='nft not supported'
        src={image}
        className='w-full h-full rounded-lg'
      />
    </div>
  );
};

export default NFT;
