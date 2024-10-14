import React from 'react';
import logo from '../../Images/foody.png'
import lens from "../../Images/search images.png"
const Navbar: React.FC = () => {
  return (
    <>
    <div>
        <h1 className="text-3xl font-bold underline text-red-600">
    Hello world bbabba!
  </h1>
      <img src={logo} className='w-16 h-16'/>
      <img src={lens} className='w-5 h-5' />
      <h1 className='ml-3'>search</h1>

    </div>
    </>
  );
};

export default Navbar;