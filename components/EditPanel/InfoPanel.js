import React from 'react';

const InfoPanel = () => {
  return (
    <div className='card w-4/5 mx-auto bg-base-100 shadow-xl mb-10'>
      <div className='flex'>
        <div className='card-body'>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>What is your name?</span>
            </label>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs'
            />
          </div>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Change Username</span>
            </label>
            <input
              type='text'
              disabled={true}
              placeholder='@ehteshaxm'
              className='input input-bordered w-full max-w-xs'
            />
          </div>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Add Bio</span>
            </label>
            <textarea
              className='textarea textarea-bordered'
              placeholder='Bio'
            ></textarea>
          </div>
        </div>
        <div className='card-body'>
          <div className='bg-base-300 w-full mx-auto rounded-xl h-32 flex justify-center items-end'>
            <div className='avatar online -mb-12'>
              <div className='w-24 mask mask-hexagon-2 '>
                <img src='https://placeimg.com/192/192/people' />
              </div>
            </div>
          </div>
          <button className='btn btn-primary mt-16'>Choose NFT</button>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
