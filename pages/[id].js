import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Property from '../components/Property';
import MainNFT from '../components/MainNFT';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/router';

const dropIn = {
  hidden: {
    y: '100vh',
    opacity: 1,
  },
  visible: {
    y: '10vh',
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 40,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 40,
      stiffness: 500,
    },
  },
};

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [nftDetails, setNftDetails] = useState({
    contractAddress: '',
    tokenId: '',
    tokenStandard: '',
    network: '',
    description: '',
    image: '',
    name: '',
    properties: [],
  });
  const [data, setData] = useState({
    isVerified: false,
    nfts: [],
    pfpImage: '',
    pfpNft: {},
  });

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  useEffect(() => {
    if (id) {
      (async function getData() {
        try {
          const docRef = doc(db, 'users', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // console.log('Document data:', docSnap.data());
            setData(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id]);

  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  return (
    <div className='min-h-screen bg-primary-black pt-14 overflow-hidden'>
      <div className='max-w-sm mx-auto relative' style={{ minHeight: '95vh' }}>
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {open && (
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
              className='rounded-3xl bg-secondary-black w-full top-0 z-50 pt-5 sm:pt-16 h-full sm:h-3/4 fixed md:absolute bottom-0'
              variants={dropIn}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <div className='flex justify-center items-center mb-10 sm:hidden'>
                <div className='bg-zinc-700 rounded-full w-1/12 h-2'></div>
              </div>
              <div className='h-5/6 sm:h-full overflow-scroll scrollbar-hide'>
                <img
                  src={nftDetails.image}
                  alt='nft'
                  className='w-3/5 mx-auto'
                />
                <div className='p-3 text-white font-semibold text-2xl text-center mt-3 min-w-min'>
                  {nftDetails.name}
                </div>
                <div className='p-5'>
                  <div className='text-white font-semibold text-xl mt-4 min-w-min'>
                    Description
                  </div>
                  <div className='text-gray-400 text-md mt-2 leading-snug'>
                    {nftDetails.description}
                  </div>
                  <div className='text-white font-semibold text-xl mt-4 min-w-min'>
                    Properties
                  </div>
                  <div className='flex flex-wrap mt-3'>
                    {nftDetails.properties.map((attribute, index) => (
                      <Property
                        key={index}
                        title={attribute.trait_type}
                        value={attribute.value}
                      />
                    ))}
                  </div>
                  <div className='mt-3'>
                    <div className='p-3 px-0 border-black flex items-center justify-between border-b'>
                      <p className='text-white'>Contract Address</p>
                      <p>
                        {nftDetails.contractAddress.substring(0, 7) +
                          '....' +
                          nftDetails.contractAddress.substring(
                            str.length - 7,
                            str.length
                          )}
                      </p>
                    </div>
                    <div className='p-3 px-0 border-black flex items-center justify-between border-b'>
                      <p className='text-white'>Token ID</p>
                      <p>{nftDetails.tokenId}</p>
                    </div>
                    <div className='p-3 px-0 border-black flex items-center justify-between border-b'>
                      <p className='text-white'>Token Standard</p>
                      <p>ERC-721</p>
                    </div>
                    <div className='p-3 px-0 border-black flex items-center justify-between border-b'>
                      <p className='text-white'>Network</p>
                      <p>{nftDetails.network}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* <div className='absolute -top-20 h-72 w-44 bg-teal-400 blur-2xl'></div>
        <div className='absolute -top-20 right-0 h-60 w-52 bg-indigo-500 blur-3xl'></div>
        <div className='absolute -top-20 left-20 h-40 w-44 bg-pink-400 blur-3xl'></div> */}
        <div className='absolute -top-20 w-full h-40 bg-stone-400 blur-3xl'></div>
        <div className='w-full text-center pt-10'>
          <div className='w-full flex justify-center items-center'>
            {data.pfpNft.contract_address ? (
              <div
                className='avatar mt-16'
                onClick={() => {
                  setNftDetails({
                    contractAddress: data.pfpNft.contract_address,
                    tokenId: data.pfpNft.token_id,
                    tokenStandard: 'ERC-721',
                    network: 'Ethereum',
                    description: data.pfpNft.metadata.description,
                    image: data.pfpNft.metadata.image,
                    name: data.pfpNft.metadata.name,
                    properties: data.pfpNft.metadata.attributes,
                  });
                  setOpen(!open);
                }}
              >
                <div className='w-40 mask mask-hexagon-2'>
                  <img src={data.pfpNft.metadata.image} />
                </div>
              </div>
            ) : data.pfpImage ? (
              <div className='avatar'>
                <div className='w-40 rounded-full'>
                  <img src={data.pfpImage} />
                </div>
              </div>
            ) : (
              <span class='w-40 h-40 block animate-pulse opacity-5 bg-gray-200 rounded-full dark:bg-gray-700'></span>
            )}
          </div>
          <div className='text-white font-bold text-2xl mt-5 flex items-center justify-center relative z-40'>
            {id ? (
              `@${id}`
            ) : (
              <h3 className='h-4 w-1/3 bg-gray-200 opacity-5 animate-pulse rounded-md dark:bg-gray-700'></h3>
            )}
            {data.isVerified && (
              <div className='bg-white w-4 h-4 ml-3 rounded-full relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-6 h-6 text-twitter-blue absolute -top-1 -left-1'
                >
                  <path
                    fillRule='evenodd'
                    d='M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        {/* <div className='divider'></div> */}
        <div className='w-full px-8 mt-20'>
          <div className='flex justify-between flex-wrap px-1'>
            {data.nfts[0] ? (
              data.nfts.map((item, index) => {
                if (checkURL(item.metadata.image)) {
                  return (
                    <MainNFT
                      key={index}
                      open={open}
                      setOpen={setOpen}
                      image={item.metadata.image}
                      name={item.metadata.name}
                      cAddress={item.contract_address}
                      tokenId={item.token_id}
                      network='Polygon'
                      tokenStandard='ERC-721'
                      description={item.metadata.description}
                      properties={item.metadata.attributes}
                      setNftDetails={setNftDetails}
                    />
                  );
                }
              })
            ) : (
              <div className='flex w-full justify-between items-center'>
                <div className='w-32 h-32 bg-gray-200 opacity-5 animate-pulse rounded-md dark:bg-gray-700'></div>
                <div className='w-32 h-32 bg-gray-200 opacity-5 animate-pulse rounded-md dark:bg-gray-700'></div>
              </div>
            )}
          </div>
        </div>
        <div className='text-3xl w-full font-semibold text-white pt-16 pb-20 text-center absolute bottom-0'>
          Stash ᵍᵐ
        </div>
      </div>
    </div>
  );
};

export default Profile;
