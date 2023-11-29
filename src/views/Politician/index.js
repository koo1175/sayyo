import { useLocation, useNavigate } from 'react-router-dom';
import './Politician.css';
import { useState, useEffect } from 'react';
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShowRealTimeArticles from '../ShowRealTimeArticles';
import Reply from '../Reply';
import axios from 'axios';
import HeartImg from "../../img/heart_fill.png";
import EmptyHeartImg from "../../img/heart_empty.png";
import Chat from "../Chat";

export default function Politician() {

  const location = useLocation();
  const text = location?.state?.text || '기본값'; //Gyeonggi.js에서 받아온 데이터. 시 이름이 들어가 있음
  const navigate = useNavigate();
  const data = location?.state?.data || '기봉이'; //Test.js에서 받아온 데이터. DB에서 받아온 데이터

  useEffect(() => {
    console.log('Politican.js text값 -> ', text);
    if (data === '기봉이') {
      navigate('/Test', { state: { text }, replace: true }); //데이터가 없으면 Test.js로 이동
    }
  }, [data]);

  if (data) {
    console.log('Politican.js data값 -> ', data);
    console.log('-> -> ', data.education);
  }
  let formattedBirth = data.birth ? data.birth.substring(0, 10) : '';

  const [selectedButton, setSelectedButton] = useState(null); //클릭된 버튼 빨간색으로 표시

  const [showButton1, setshowButton1] = useState(false); //공약
  const [showButton2, setshowButton2] = useState(false); //관련기사
  const [showButton3, setshowButton3] = useState(false); //댓글

  const [selectedDetailButton, setSelectedDetailButton] = useState(null);

  const [showImage1, setShowImage1] = useState(false); //총괄현황
  const [showImage2, setShowImage2] = useState(false); //공약가계부
  const [showImage3, setShowImage3] = useState(false); //이행현황

  const [showRealTimeArticles, setShowRealTimeArticles] = useState(false); //실시간기사


  const handleClick = (button) => {
    setSelectedButton(button);
    if (button === '공약') {
      setshowButton1(true); // 공약 버튼 클릭시 총괄현황, 공약가계부, 이행현황 버튼이 나오게
      setshowButton2(false); // 공약 버튼 클릭시 실시간기사, 주요기사 버튼은 안나오게
      setShowRealTimeArticles(false); // 공약 버튼 클릭시 실시간기사 안나오게
      handleDetailClick('총괄현황'); // 총괄현황이 기본으로 나오게
    } else if (button === '관련기사') {
      setshowButton1(false); // 관련기사 버튼 클릭시 총괄현황, 공약가계부, 이행현황 버튼은 안나오게
      setShowRealTimeArticles(true);
      setShowImage1(false);
      setShowImage2(false);
      setShowImage3(false);
    } else if (button === '댓글') {
      setshowButton1(false);
      setshowButton2(false);
      setShowImage1(false);
      setShowImage2(false);
      setShowImage3(false);
      setShowRealTimeArticles(false);
    } else {
      setshowButton1(false);
      setshowButton2(false);
    }
  }

  const handleDetailClick = (button) => {
    setSelectedDetailButton(button);
    if (button === '총괄현황') {
      setShowImage1(true);
      setShowImage2(false);
      setShowImage3(false);
    } else if (button === '공약가계부') {
      setShowImage1(false);
      setShowImage2(true);
      setShowImage3(false);
    } else if (button === '이행현황') {
      setShowImage1(false);
      setShowImage2(false);
      setShowImage3(true);
    }
    else {
      setShowImage1(false);
      setShowImage2(false);
      setShowImage3(false);
    }
  }

  const youtube = () => {
    alert('유튜브');
  }
  const twitter = () => {
    alert('트위터');
  }
  const kakao = () => {
    alert('카카오');
  }
  const naver = () => {
    alert('네이버');
  }

  const [like, setLike] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  // 이미지 주소를 상태에 따라 변경하는 함수
  const setImageBasedOnLike = () => {
    if (like) {
      setImageSrc(HeartImg); // 좋아요 상태일 때 이미지 주소 설정
    } else {
      setImageSrc(EmptyHeartImg); // 좋아요 상태가 아닐 때 이미지 주소 설정
    }
  };

  // 좋아요 상태 변경 시 이미지 업데이트
  useEffect(() => {
    setImageBasedOnLike();
  }, [like]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // pLikeDto 객체를 생성
  const pLikeDto = {
    memberId: "koo", // 유저 아이디와
    region: "수원"   // 지역 아이디를 넣어서 좋아요 기록이 있는지 확인
    // 좋아요 : like, 싫어요 : dislike, 기록없음 : nothing 반환
  };


  useEffect(() => {
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/plike/state', pLikeDto, config)
      .then(response => {
        console.log("좋아요 여부:", response.data);
        if (response.data === "like") {
          setLike(true)
        } else {
          setLike(false)
        }
      })
      .catch(error => {
        console.error("좋아요 상태 조회 실패:", error);
      })
  }, [])

  // 좋아요 누를 때마다 상태 갱신
  const toggleLike = async (e) => {
    try {
      const response = await axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/plike/like`, pLikeDto, config);
      console.log("좋아요 요청");
      setLike(!like);
    } catch (error) {
      console.error(error);
    }

  }



  return (

    <div className="container"  >
      <div style={{ width: '500px', height: '300px' }}>
        <img src="/img/야경.png" alt="설명" className="background-image" />
        <img src={`/img/${text}시장.png`} alt="설명" style={{ position: 'absolute', top: '200px', left: '50px', width: '400px', height: '400px' }} />
        <div className="overlay-text">{text}</div>
        <div className="overlay-text2">
          테스트테스트테스트 <br /><br />
          <div className="small-text">
            이름 : {data.name} <br />
            출생 : {formattedBirth} <br />
            소속 : {text} 시장<br />
            학력 : {data.education}<br />
            경력 : {data.career}<br />
          </div>
        </div>

        <img src="/img/유튜브로고.png" alt="설명" style={{ position: 'absolute', top: '500px', left: '900px', width: '40px', height: '40px' }} onClick={youtube} />
        <img src="/img/트위터로고.png" alt="설명" style={{ position: 'absolute', top: '500px', left: '970px', width: '40px', height: '40px' }} onClick={twitter} />
        <img src="/img/카카오톡로고.png" alt="설명" style={{ position: 'absolute', top: '500px', left: '1040px', width: '40px', height: '40px', borderRadius: '50%' }} onClick={kakao} />
        <img src="/img/네이버로고.png" alt="설명" style={{ position: 'absolute', top: '500px', left: '1110px', width: '40px', height: '40px', borderRadius: '50%' }} onClick={naver} />
      </div>
      <div>
        <button className={`myButton ${selectedButton === '공약' ? 'selected' : ''}`} onClick={() => handleClick('공약')} style={{ position: 'absolute', top: '650px', left: '350px' }}>공약</button>
        <button className={`myButton ${selectedButton === '관련기사' ? 'selected' : ''}`} onClick={() => handleClick('관련기사')} style={{ position: 'absolute', top: '650px', left: '550px' }}>관련기사</button>
        <button className={`myButton ${selectedButton === '댓글' ? 'selected' : ''}`} onClick={() => handleClick('댓글')} style={{ position: 'absolute', top: '650px', left: '750px' }}>댓글</button>

        {showButton1 &&
          <div>
            <button className={`myButton2 ${selectedDetailButton === '총괄현황' ? 'detailButton' : ''}`} onClick={() => handleDetailClick('총괄현황')} style={{ position: 'absolute', top: '750px', left: '300px' }}>총괄현황</button>
            <button className={`myButton2 ${selectedDetailButton === '공약가계부' ? 'detailButton' : ''}`} onClick={() => handleDetailClick('공약가계부')} style={{ position: 'absolute', top: '750px', left: '510px' }}>공약가계부</button>
            <button className={`myButton2 ${selectedDetailButton === '이행현황' ? 'detailButton' : ''}`} onClick={() => handleDetailClick('이행현황')} style={{ position: 'absolute', top: '750px', left: '730px' }}>이행현황</button>
          </div>
        }

        {showImage1 && <img src={`/img/${text}1.png`} alt="설명" style={{ position: 'absolute', top: '900px', left: '100px', width: '1000px' }} />}
        {showImage2 && <img src={`/img/${text}2.png`} alt="설명" style={{ position: 'absolute', top: '900px', left: '100px', width: '1000px' }} />}
        {showImage3 && <img src={`/img/${text}3.png`} alt="설명" style={{ position: 'absolute', top: '900px', left: '100px', width: '1000px' }} />}
        <div style={{marginLeft:'-350px'}}>
        {showRealTimeArticles &&
          <ShowRealTimeArticles />
        }
        </div>

        {/* {selectedButton === '댓글' &&
          <div >
            <Reply text={text} />
          </div>
        } */}
        <div style={{ height: '200px' }} />
      </div>
        <div>
          <Chat/>
        </div>
    </div>
  )
}


