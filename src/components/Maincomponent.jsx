/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tabbar from './Tabbar';
import Kakaoserch from './Kakaoserch';

function Maincomponent() {
  const navigate = useNavigate();

  const AlertNavigateHander = () => {
    navigate('/alert');
  };

  return (
    <>
      <div className='flex flex-row justify-between w-[375px]'>
        <img
          className='ml-[20px] mb-[8px] object-contain'
          src='./PooDaeng.png'
          alt='PooDaeng.png'
        />
        <img
          className='mr-[22px] mb-[20px] object-contain cursor-pointer'
          src='./Group 120.png'
          alt='Alert.png'
          onClick={AlertNavigateHander}
        />
      </div>
      <div className='max-h-[600px]'>
        <div
          className='flex justify-center items-center w-[373px] h-[150px] ml-[14px] border-t border-b cursor-pointer'
          role='none'
          onClick={() => navigate('/events')}
        >
          <div className=''>eventBox</div>
        </div>
        <div>
          <div className='ml-[30px] mt-[10px] font-[700] text-[20px] '>
            내 주변 푸박스 찾기
          </div>
          <div className='ml-[30px] mt-[4px] font-[500] text-[11px] text-[#808080]'>
            지금 내 주변에 있는 푸박스의 위치를 확인하세요.
          </div>
          <div className='w-[330px] h-[155px] border ml-[30px]'>
            <Kakaoserch />
            <img
              src='./Ellipse 35.png'
              alt='button'
              className='relative bottom-8 left-[17rem] z-10 cursor-pointer'
              onClick={() => navigate('/map')}
            />
            <img
              src='./Vector 56.png'
              alt='button'
              className='relative bottom-14 left-[17.9rem] z-20'
            />
          </div>
          <div className='border mt-[15px]' />
        </div>
        <div className='mt-[10px] ml-[30px] font-[700]'>내 주변 실종신고</div>
        <div className='ml-[30px] mt-[4px] font-[500] mb-[20px] text-[11px] text-[#808080]'>
          주변의 실종 반려동물들을 찾아주세요.
        </div>
        <div className='flex gap-[10px] w-[370px] h-32 overflow-x-auto ml-[30px]'>
          <div className=' border w-[102px] h-[102px] rounded-xl'>
            board card1
          </div>
          <div className='border w-[102px] h-[102px] rounded-xl'>
            board card2
          </div>
          <div className=' border w-[102px] h-[102px] rounded-xl'>
            board card3
          </div>
        </div>
      </div>
      <div className='mt-[55px]'>
        <Tabbar number='700' />
      </div>
    </>
  );
}

export default Maincomponent;
