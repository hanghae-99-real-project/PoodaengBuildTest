/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { reportPooBox } from '../api/poobox';
import { ReactComponent as Report } from '../assets/images/report.svg';
import { dateConvert2 } from '../utils/DateConvert';
import Headers from './Headers';
import { ReactComponent as Exit } from '../assets/images/Exit.svg';
import { ReactComponent as ReportCheck } from '../assets/images/reportcheck.svg';

function PooDetailComponent() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const address = params.get('address'); // UserId
  const content = params.get('content'); // address
  const imageUrl = params.get('imageUrl'); // content
  const pooId = params.get('pooId'); // pooId
  // const UserId = params.get('UserId'); // createdAT
  const createdAt = params.get('createdAt'); // imgage
  const pooLatitude = params.get('pooLatitude');
  const pooLongitude = params.get('pooLongitude');
  const navigate = useNavigate();
  const refreshToken = Cookies.get('refreshToken');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contents, setContents] = useState('');
  const [report, setReport] = useState(false);
  // const { accessToken } = useSelector(store => store.auth);

  // console.log('address', address);
  // console.log('content', content);
  // console.log('imageUrl', imageUrl);
  // console.log('pooId', pooId);
  // console.log('UserId', UserId);
  // console.log('createdAt', createdAt);
  // console.log('pooLatitude', pooLatitude);
  // console.log('pooLongitude', pooLongitude);

  const reportContent = {
    reportContent: contents,
  };

  const reportData = {
    pooId,
    UserId: address,
    reportContent,
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(reportPooBox, {
    onSuccess: () => {
      queryClient.invalidateQueries('poobox');
      setReport(true);
    },
    onError: error => {
      // console.log(error);
    },
  });

  const openModal = () => {
    if (!refreshToken) {
      return navigate('/login');
    }
    return setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contentsClick = item => {
    setContents(item);
  };

  const reportHandler = () => {
    mutation.mutate(reportData);
    closeModal();
  };

  const reportoutHandler = () => {
    setReport(false);
    navigate('/map');
  };

  function loadFindHandler(pooId, pooLatitude, pooLongitude, address) {
    const params = new URLSearchParams();
    params.append('pooLatitude', pooLatitude);
    params.append('pooLongitude', pooLongitude);
    params.append('address', address);
    const queryString = params.toString();
    navigate(`/tmap/${pooId}?${queryString}`);
  }

  // const targetLatitude = query.get('pooLatitude');
  // const targetLongitude = query.get('pooLongitude');
  // const targetAddress = query.get('address');

  return (
    <div>
      <Headers text icon destination='map'>
        푸박스 정보
      </Headers>
      <div>
        <img
          src={imageUrl}
          alt='img'
          className='w-full h-80 border object-cover'
        />
        <div className='flex flex-col justify-between h-96 px-7 py-14'>
          <div className='flex justify-between'>
            <div>
              <div className='font-bold'>주소</div>
              <div>{address}</div>
            </div>
            <Report className='cursor-pointer' onClick={openModal} />
          </div>
          <div className='flex'>
            <div className='font-bold'>등록 날짜</div>
            &nbsp; <div>{dateConvert2(createdAt)[1]}</div>
          </div>
          <div>
            <div className='font-bold'>특이사항</div>
            <div>{content}</div>
          </div>
          <button
            className='bg-mainColor text-white w-full h-12 rounded-xl'
            onClick={() =>
              loadFindHandler(pooId, pooLatitude, pooLongitude, address)
            }
          >
            여기로 길 찾기 시작
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex z-10 items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col bg-white w-80 h-96 p-10 rounded-lg'>
            <div className='flex justify-between'>
              <div />
              <div className='text-xl font-bold mb-5'>신고 사유</div>
              <div className='cursor-pointer' onClick={closeModal}>
                <Exit className='mt-1.5' />
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <ul className='flex flex-col gap-3'>
                <li
                  className='flex items-center'
                  onClick={() =>
                    contentsClick('해당 위치에 푸박스가 없어졌어요.')
                  }
                >
                  <input
                    type='radio'
                    checked={contents === '해당 위치에 푸박스가 없어졌어요.'}
                    className='mr-2 accent-mainColor w-4 h-4'
                  />
                  해당 위치에 푸박스가 없어졌어요.
                </li>
                <li
                  className='flex items-center'
                  onClick={() => contentsClick('푸박스가 설명과 달라요.')}
                >
                  <input
                    type='radio'
                    checked={contents === '푸박스가 설명과 달라요.'}
                    className='mr-2 accent-mainColor w-4 h-4'
                  />
                  푸박스가 설명과 달라요.
                </li>
                기타
                <input
                  className='w-full h-10 border-b pl-3'
                  onChange={e => contentsClick(e.target.value)}
                  placeholder='내용을 입력해주세요'
                />
              </ul>

              <button
                className='bg-mainColor text-white font-bold py-3 px-4 rounded-lg mt-10'
                onClick={reportHandler}
              >
                신고하기
              </button>
            </div>
          </div>
        </div>
      )}
      {report && (
        <div className='fixed inset-0 flex z-10 items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center justify-center bg-white w-80 h-96 p-10 rounded-lg gap-5'>
            <ReportCheck />
            <div className='flex flex-col items-center gap-2'>
              <div className='font-bold text-xl'>신고가 접수되었습니다.</div>
              <div className='text-xs'>최대한 빠르게 처리해 드릴게요!</div>
            </div>
            <button
              className='bg-mainColor text-white font-bold py-3 px-4 rounded-lg w-full mt-10'
              onClick={reportoutHandler}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PooDetailComponent;
