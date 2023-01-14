import React from 'react';

const Property = ({ title, value }) => {
  return (
    <div className='rounded-lg border border-gray-500 p-2 m-2 ml-0 mr-4 max-w-fit'>
      <p className='font-semibold uppercase text-sm'>{title}</p>
      <p className='text-white'>{value}</p>
    </div>
  );
};

export default Property;
