import React, { useRef } from 'react';

const InfoPanel = ({ image, profileNFT, handleImageUpload }) => {
  const ref = useRef();

  function imageTrigger() {
    ref.current.value = null;
    ref.current.click();
  }

  return (
    <div className='flex w-4/5 mx-auto'>
      <div className='card w-3/5 mx-auto bg-base-100 shadow-xl mb-10 mr-5'>
        <div className='card-body flex justify-center items-center'>
          <div className='max-w-fit'>
            <div className='dropdown dropdown-end'>
              <input
                type='file'
                ref={ref}
                className='hidden'
                onChange={(e) => handleImageUpload(e)}
              />
              <label tabIndex={0} className='btn btn-ghost hover:bg-base-100'>
                {profileNFT ? (
                  <div className='avatar'>
                    <div className='w-36 mask mask-hexagon-2'>
                      <img src={profileNFT.metadata.image} />
                    </div>
                  </div>
                ) : (
                  <div className='avatar'>
                    <div className='w-36 rounded-full'>
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : 'https://images.unsplash.com/photo-1600456899121-68eda5705257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80'
                        }
                      />
                    </div>
                  </div>
                )}
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-secondary-black rounded-box w-52'
              >
                <li onClick={(e) => imageTrigger()}>
                  <a>Upload Picture</a>
                </li>
                <li>
                  <label htmlFor='my-modal-3'>
                    <a>Choose NFT</a>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='card w-2/5 bg-slate-50 mx-auto shadow-xl mb-10'>
        <div className='card-body'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-black'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
            />
          </svg>
          <p className='text-black mt-3'>
            NFTs are supported for Ethereum and Polygon only, Change Network
            from the button below to fetch NFTs from a particular network
          </p>
          <p className='text-black'>
            NFTs are supported through mainnets. Support for Solana is coming
            soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
