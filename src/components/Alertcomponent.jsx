import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabbar from './Tabbar';
import Header from './Headers';

function Alertcomponent() {
  const [backColor, setBackColor] = useState(false);

  const navigate = useNavigate();

  const onClickHandler = () => {
    setBackColor(true);
  };

  return (
    <div className='container'>
      <Header>
        <img
          className='absolute left-5 cursor-pointer mt-1 scale-[-1]'
          src='./Vector 56.png'
          alt='<'
          onClick={() => navigate(-1)}
          role='none'
        />
        <div className='font-[700]'>알림</div>
      </Header>
      <div
        className={`flex border ml-[10px] mt-[10px] mr-[10px] p-[19px] rounded-[6px] 
        ${backColor ? 'bg-[#FFFFFF]' : 'bg-[#D9D9D9]'}`}
        onClick={onClickHandler}
        role='none'
      >
        <img
          className='flex bg-cover w-[43px] h-[43px] border rounded-full mr-[10px] '
          src='./KakaoTalk_20230130_153856319.jpg'
          alt='pt'
        />
        <div>
          <div className='font-[700] text-[12px]'>title</div>
          <div className='font-[400] text-[10px]'>content</div>
          <div className='font-[400] text-[10px] text-[#787878]'>date</div>
        </div>
      </div>

      <Tabbar top='30px' />
    </div>
  );
}

export default Alertcomponent;