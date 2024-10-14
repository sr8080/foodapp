import React from 'react';
import offer1 from '../../Images/offer1.webp'
import offer from '../../Images/spacial.avif'

const Offers: React.FC = () => {
  return (
    <div className='flex items-center mt-3'>
      <img src={offer}  className='w-6/12 h-60 rounded-3xl'/>
      <img src={offer1} className='w-6/12 h-60 rounded-3xl ml-5' />
    </div>
  );
};

export default Offers;