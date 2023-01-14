import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react';
import NFT from './NFT';
import axios from 'axios';

const WalletsPanel = ({
  ethNFTs,
  setEthNFTs,
  polygonNFTs,
  setPolygonNFTs,
  selectedNFTs,
  setSelectedNFTs,
  checkURL,
}) => {
  const account = useAccount();
  const network = useNetwork();

  useEffect(() => {
    if (account.address !== undefined && network.chain.name === 'Ethereum') {
      (async function getEthNfts() {
        axios
          .post(
            '/api/eth',
            {
              address: account.address,
            },
            {
              headers: { 'Content-type': 'application/json; charset=UTF-8' },
            }
          )
          .then((res) => {
            console.log(res.data.nfts);
            setEthNFTs(res.data.nfts);
            console.log(res);
          });
      })();
    } else if (
      account.address !== undefined &&
      network.chain.name === 'Polygon'
    ) {
      (async function getEthNfts() {
        axios
          .post('/api/polygon', {
            address: account.address,
          })
          .then((res) => {
            console.log(res.data.nfts);
            setPolygonNFTs(res.data.nfts);
          });
      })();
    } else if (account.address !== undefined) {
      alert(
        'Change the network, Only supported networks are Ethereum and Polygon.'
      );
    }
  }, [account.address, network.chain]);

  return (
    <div className='card w-4/5 mb-10 mx-auto bg-base-100 shadow-xl'>
      <div className='card-body'>
        <div className='flex items-center justify-between'>
          <div className='font-sembold text-xl flex items-center'>
            Add NFTs{' '}
          </div>
          <div className='flex items-center justify-between'>
            <div className='mr-3'>
              <Web3Button />
            </div>
            <Web3NetworkSwitch />
          </div>
        </div>

        <div className='mt-5 flex flex-wrap'>
          {ethNFTs.map((nft, index) => {
            if (checkURL(nft.metadata.image)) {
              return (
                <NFT
                  index={index}
                  key={index}
                  ethNFTs={ethNFTs}
                  image={nft.metadata.image}
                  selectedNFTs={selectedNFTs}
                  setSelectedNFTs={setSelectedNFTs}
                  tokenId={nft.token_id}
                  cAddress={nft.contract_address}
                />
              );
            }
          })}
          {polygonNFTs.map((nft, index) => {
            if (checkURL(nft.metadata.image)) {
              return (
                <NFT
                  isPolygon={true}
                  index={index}
                  key={index}
                  image={nft.metadata.image}
                  selectedNFTs={selectedNFTs}
                  setSelectedNFTs={setSelectedNFTs}
                  polygonNFTs={polygonNFTs}
                  tokenId={nft.token_id}
                  cAddress={nft.contract_address}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default WalletsPanel;
