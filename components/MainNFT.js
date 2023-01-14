import React from 'react';

const MainNFT = ({
  setOpen,
  image,
  open,
  cAddress,
  tokenId,
  network,
  tokenStandard,
  description,
  setNftDetails,
  name,
  properties,
}) => {
  return (
    <div className='m-3'>
      <img
        alt='nft'
        src={image}
        className='w-32 rounded-xl'
        onClick={() => {
          setNftDetails({
            contractAddress: cAddress,
            tokenId: tokenId,
            tokenStandard: 'ERC-721',
            network: network,
            description: description,
            image: image,
            name: name,
            properties: properties,
          });
          setOpen(!open);
        }}
      />
    </div>
  );
};

export default MainNFT;
