import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Info from '../../components/phone/Info';
import InfoPanel from '../../components/EditPanel/InfoPanel';
import WalletsPanel from '../../components/EditPanel/WalletsPanel';
import NFTs from '../../components/phone/NFTs';
import ModalNFT from '../../components/EditPanel/ModalNFT';
import { useAuth } from '../../context/AuthContext';
import { storage, db } from '../../firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import Router from 'next/router';

const Edit = () => {
  const [image, setImage] = useState('');
  const [profileNFT, setProfileNFT] = useState('');
  const [ethNFTs, setEthNFTs] = useState([]);
  const [polygonNFTs, setPolygonNFTs] = useState([]);
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (user === null || user === undefined) {
      Router.push('/');
    }
  }, [user]);

  function handleImageUpload(e) {
    setProfileNFT('');
    setImage(e.target.files[0]);
  }

  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  function nftProfileSelect(nft) {
    setImage('');
    setProfileNFT(nft);
  }

  async function submitFirebase() {
    // Handle Image
    // Check if image is to be uploaded or nft
    // If image then check whether image link exits if not create image object and add link to profile
    // if exists then delete it and add new one
    setLoading(true);
    const imageRef = ref(storage, user.reloadUserInfo.screenName);

    if (image) {
      console.log('submitting image');
      // check if one already exists
      getDownloadURL(imageRef)
        .then((url) => {
          // image exists then delete it first and add new one
          if (url) {
            // Delete the file
            deleteObject(imageRef)
              .then(() => {
                // File deleted successfully now add and create new url
                uploadBytes(imageRef, image)
                  .then(() => {
                    console.log('Uploaded a file!');
                    getDownloadURL(imageRef)
                      .then((url) => {
                        // Upload data to Firestore
                        const data = {
                          isVerified: false,
                          nfts: selectedNFTs,
                          pfpImage: url,
                          pfpNft: profileNFT,
                        };

                        setDoc(
                          doc(db, 'users', user.reloadUserInfo.screenName),
                          data
                        )
                          .then(() => {
                            console.log('Data Submitted');
                            setLoading(false);
                          })
                          .catch((error) => console.log(error));

                        console.log(url);
                      })
                      .catch((error) => console.log(error));
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error);
              });
          }
        })
        .catch((error) => {
          if (error.code === 'storage/object-not-found') {
            uploadBytes(imageRef, image)
              .then(() => {
                console.log('Uploaded a file!');
                getDownloadURL(imageRef)
                  .then((url) => {
                    // Upload data to Firestore
                    const data = {
                      isVerified: false,
                      nfts: selectedNFTs,
                      pfpImage: url,
                      pfpNft: profileNFT,
                    };

                    setDoc(
                      doc(db, 'users', user.reloadUserInfo.screenName),
                      data
                    )
                      .then(() => {
                        console.log('Data Submitted');
                        setLoading(false);
                      })
                      .catch((error) => console.log(error));
                    console.log(url);
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          } else {
            console.log(error);
          }
        });
    } else if (profileNFT) {
      getDownloadURL(imageRef)
        .then((url) => {
          if (url) {
            deleteObject(imageRef)
              .then(() => {
                console.log('Deleted for NFT pfp');
                // Upload data to Firestore
                const data = {
                  isVerified: false,
                  nfts: selectedNFTs,
                  pfpImage: '',
                  pfpNft: profileNFT,
                };

                setDoc(doc(db, 'users', user.reloadUserInfo.screenName), data)
                  .then(() => {
                    console.log('Data Submitted');
                    setLoading(false);
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          const data = {
            isVerified: false,
            nfts: selectedNFTs,
            pfpImage: '',
            pfpNft: profileNFT,
          };

          setDoc(doc(db, 'users', user.reloadUserInfo.screenName), data)
            .then(() => {
              console.log('Data Submitted');
              setLoading(false);
            })
            .catch((error) => console.log(error));
        });
    }
  }

  if (user === null || user === undefined || user === '') {
    return (
      <div className='min-h-screen bg-base-100 flex justify-center items-center'>
        <div role='status'>
          <svg
            aria-hidden='true'
            class='w-8 h-8 mr-2 text-secondary-black animate-spin dark:text-gray-600 fill-primary'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span class='sr-only'>Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className='lg:hidden min-h-screen bg-base-100 flex justify-center items-center'>
          <div className='w-96 p-3 text-center'>
            <h1>
              Please open on a Desktop, Support for mobile will be launched
              soon...
            </h1>
          </div>
        </div>
        <div className='hidden lg:flex flex-row-reverse min-h-screen bg-primary-black'>
          <Navbar />
          <div className='w-2/5 min-h-screen fixed left-0 top-0 bg-base-300 hero'>
            <div className='mockup-phone border-primary'>
              <div className='camera'></div>
              <div className='display'>
                <div className='artboard artboard-demo phone-1 block px-5 py-10 overflow-scroll relative scrollbar-hide bg-primary-black'>
                  <div className='absolute top-0 h-20 w-full bg-stone-100 blur-3xl'></div>
                  {/* <div className='absolute top-0 right-0 h-40 w-52 bg-indigo-500 blur-3xl'></div>
              <div className='absolute top-0 left-32 h-40 w-20 bg-pink-400 blur-3xl'></div> */}
                  <Info
                    image={image}
                    profileNFT={profileNFT}
                    userName={
                      user !== null ? user.reloadUserInfo.screenName : ''
                    }
                  />
                  <NFTs selectedNFTs={selectedNFTs} />
                </div>
              </div>
            </div>
          </div>
          {/* Put this part before </body> tag */}
          <input type='checkbox' id='my-modal-3' className='modal-toggle' />
          <div className='modal'>
            <div className='modal-box relative'>
              <label
                htmlFor='my-modal-3'
                className='btn btn-sm btn-circle absolute right-2 top-2'
              >
                ✕
              </label>
              <h3 className='text-lg font-bold'>Choose an NFT</h3>
              <div className='mt-5 flex flex-wrap'>
                {ethNFTs.map((nft, index) => {
                  if (checkURL(nft.metadata.image)) {
                    return (
                      <ModalNFT
                        index={index}
                        key={index}
                        image={nft.metadata.image}
                        isEth={true}
                        nftProfileSelect={nftProfileSelect}
                        ethNFTs={ethNFTs}
                      />
                    );
                  }
                })}
                {polygonNFTs.map((nft, index) => {
                  if (checkURL(nft.metadata.image)) {
                    return (
                      <ModalNFT
                        index={index}
                        key={index}
                        image={nft.metadata.image}
                        isPolygon={true}
                        nftProfileSelect={nftProfileSelect}
                        polygonNFTs={polygonNFTs}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className='min-h-screen w-3/5 p-24 pt-52'>
            <div className='w-full'>
              <InfoPanel
                image={image}
                profileNFT={profileNFT}
                handleImageUpload={handleImageUpload}
              />
              <WalletsPanel
                ethNFTs={ethNFTs}
                setEthNFTs={setEthNFTs}
                polygonNFTs={polygonNFTs}
                setPolygonNFTs={setPolygonNFTs}
                selectedNFTs={selectedNFTs}
                setSelectedNFTs={setSelectedNFTs}
                checkURL={checkURL}
              />
              <div className='w-4/5 mx-auto '>
                <button
                  className={`btn ${
                    loading && 'loading'
                  } btn-active btn-primary normal-case`}
                  onClick={() => submitFirebase()}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Edit;
