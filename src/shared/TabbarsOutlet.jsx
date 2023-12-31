import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Tabbar from '../components/Tabbar';

function TabbarsOutlet() {
  const [isActive, setIsActive] = useState('');

  return (
    <div>
      <div className=' w-screen h-[calc(var(--vh,1vh)*100)] flex justify-center items-center bg-white'>
        <div className='canvas'>
          <Outlet />
          <Tabbar isActive={isActive} setIsActive={setIsActive} />
        </div>
      </div>
    </div>
  );
}

export default TabbarsOutlet;
