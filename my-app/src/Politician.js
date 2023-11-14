import { useLocation } from 'react-router-dom';
import './Politician.css';
import { useState } from 'react';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true, // 자동 캐러셀
  autoplaySpeed: 2000, // 자동 캐러셀 속도
  arrows: true,
};
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}
const Politician = () => {

  const location = useLocation();
  const text = location?.state?.text || '기본값';

  const [selectedButton, setSelectedButton] = useState(null); //클릭된 버튼 빨간색으로 표시

  const [showButton1, setshowButton1] = useState(false); //공약
  const [showButton2, setshowButton2] = useState(false); //관련기사
  const [showButton3, setshowButton3] = useState(false); //댓글

  const [selectedDetailButton, setSelectedDetailButton] = useState(null);

  const [showImage1, setShowImage1] = useState(false); //총괄현황
  const [showImage2, setShowImage2] = useState(false); //공약가계부
  const [showImage3, setShowImage3] = useState(false); //이행현황

  const [showRealTimeArticles, setShowRealTimeArticles] = useState(false); //실시간기사
  const [showMajorArticles, setShowMajorArticles] = useState(false); //주요기사

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, text: '첫 번째 댓글입니다.' },
    { id: 2, text: '두 번째 댓글입니다.' },
    { id: 3, text: '세 번째 댓글입니다.' },
  ]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { id: Date.now(), text: comment }]);
    setComment('');
    // try {
    //   // 백엔드 API에 댓글을 저장하는 요청을 보냅니다.
    //   const response = await axios.post('/api/comments', { text: comment });
    //   // DB에 저장된 댓글을 상태에 추가합니다.
    //   setComments([...comments, response.data]);
    //   // textarea를 비웁니다.
    //   setComment('');
    // } catch (error) {
    //   console.error(error);
    // }
  };
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       // 백엔드 API로부터 댓글을 가져오는 요청을 보냅니다.
  //       const response = await axios.get('/api/comments');
  //       // 가져온 댓글을 상태에 저장합니다.
  //       setComments(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchComments();
  // }, []);
 


  const [articles, setArticles] = useState([
    { title: '기사1 제목zzzzzzzzzzzzzzzzzzzzzzzzzzzz', content: '기사1 내용', image: '/img/야경.png', link: 'https://naver.com' },
    { title: '기사2 제목zzzzzzzzzzzzzzz', content: '기사2 내용', image: '/img/야경.png', link: 'https://google.com' },
    { title: '기사3 제목', content: '기사3 내용zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', image: '/img/야경.png', link: 'https://youtube.com' },
    // 테스트용 기사 데이터
  ]);

  const [mainArticles, setmainArticles] = useState([
    { title: '메인기사 제목', content: '메인기사1 내용', image: '/img/배경.png', link: 'https://naver.com' },
  ]);

  const handleClick = (button) => {
    setSelectedButton(button);
    if (button === '공약') {
      setshowButton1(true); // 공약 버튼 클릭시 총괄현황, 공약가계부, 이행현황 버튼이 나오게
      setshowButton2(false); // 공약 버튼 클릭시 실시간기사, 주요기사 버튼은 안나오게
      setShowRealTimeArticles(false); // 공약 버튼 클릭시 실시간기사 안나오게
      setShowMajorArticles(false); // 공약 버튼 클릭시 주요기사 안나오게
      handleDetailClick('총괄현황'); // 총괄현황이 기본으로 나오게
    } else if (button === '관련기사') {
      setshowButton1(false); // 관련기사 버튼 클릭시 총괄현황, 공약가계부, 이행현황 버튼은 안나오게
      setshowButton2(true); // 관련기사 버튼 클릭시 실시간기사, 주요기사 버튼이 나오게
      setShowImage1(false);
      setShowImage2(false);
      setShowImage3(false);
      handleDetailClick('실시간기사'); // 실시간기사가 기본으로 나오게
    } else if (button === '댓글') {
      setshowButton1(false);
      setshowButton2(false);
      setShowImage1(false);
      setShowImage2(false);
      setShowImage3(false);
      setShowRealTimeArticles(false);
      setShowMajorArticles(false);
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
    else if (button === '실시간기사') {
      setShowRealTimeArticles(true);
      setShowMajorArticles(false);
    }
    else if (button === '주요기사') {
      setShowRealTimeArticles(false);
      setShowMajorArticles(true);
    } else {
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
  return (

    <div className="container">
      <img src="/img/야경.png" alt="설명" className="background-image" />
      <img src={`/img/${text}시장.png`} alt="설명" style={{ position: 'absolute', top: '200px', left: '450px', width: '400px', height: '400px' }} />
      <div className="overlay-text">{text}</div>
      <div className="overlay-text2">
        테스트테스트테스트 <br /><br />
        <div className="small-text">
          출생 : 1999.08.11 <br />
          소속 : 성남 시장<br />
          학력 : 서울대학교 대학원 법학과<br />
          경력 : 2022.03 제 20대 대통령선거 당선<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2019.07 ~ 2021.03 대검찰청 검찰총장<br /><br /><br />

          수상내역<br />
          무슨상<br />
          무슨상<br />
          무슨상<br />

        </div>
      </div>

      <img src="/img/유튜브로고.png" alt="설명" style={{ position: 'absolute', top: '500px', left: '1300px', width: '40px', height: '40px' }} onClick={youtube} />
      <img src="/img/트위터로고.png" alt="설명" style={{ position: 'absolute', top: '500px', left: '1370px', width: '40px', height: '40px' }} onClick={twitter} />
      <img src="/img/카카오톡로고.png" alt="설명" style={{ position: 'absolute', top: '500px', left: '1440px', width: '40px', height: '40px', borderRadius: '50%' }} onClick={kakao} />
      <img src="/img/네이버로고.png" alt="설명" style={{ position: 'absolute', top: '500px', left: '1510px', width: '40px', height: '40px', borderRadius: '50%' }} onClick={naver} />

      <div>
        <button className={`myButton ${selectedButton === '공약' ? 'selected' : ''}`} onClick={() => handleClick('공약')} style={{ position: 'absolute', top: '650px', left: '750px' }}>공약</button>
        <button className={`myButton ${selectedButton === '관련기사' ? 'selected' : ''}`} onClick={() => handleClick('관련기사')} style={{ position: 'absolute', top: '650px', left: '950px' }}>관련기사</button>
        <button className={`myButton ${selectedButton === '댓글' ? 'selected' : ''}`} onClick={() => handleClick('댓글')} style={{ position: 'absolute', top: '650px', left: '1150px' }}>댓글</button>

        {showButton1 &&
          <div>
            <button className={`myButton2 ${selectedDetailButton === '총괄현황' ? 'detailButton' : ''}`} onClick={() => handleDetailClick('총괄현황')} style={{ position: 'absolute', top: '750px', left: '700px' }}>총괄현황</button>
            <button className={`myButton2 ${selectedDetailButton === '공약가계부' ? 'detailButton' : ''}`} onClick={() => handleDetailClick('공약가계부')} style={{ position: 'absolute', top: '750px', left: '910px' }}>공약가계부</button>
            <button className={`myButton2 ${selectedDetailButton === '이행현황' ? 'detailButton' : ''}`} onClick={() => handleDetailClick('이행현황')} style={{ position: 'absolute', top: '750px', left: '1130px' }}>이행현황</button>
          </div>
        }
        {showButton2 &&
          <div>
            <button className={`myButton2 ${selectedDetailButton === '실시간기사' ? 'detailButton' : ''}`} onClick={() => handleDetailClick('실시간기사')} style={{ position: 'absolute', top: '750px', left: '800px' }}>실시간기사</button>
            <button className={`myButton2 ${selectedDetailButton === '주요기사' ? 'detailButton' : ''}`} onClick={() => handleDetailClick('주요기사')} style={{ position: 'absolute', top: '750px', left: '1050px' }}>주요기사</button>
          </div>
        }

        {showImage1 && <img src={`/img/${text}1.png`} alt="설명" style={{ position: 'absolute', top: '900px', left: '400px', width: '1200px' }} />}
        {showImage2 && <img src={`/img/${text}2.png`} alt="설명" style={{ position: 'absolute', top: '900px', left: '400px', width: '1200px' }} />}
        {showImage3 && <img src={`/img/${text}3.png`} alt="설명" style={{ position: 'absolute', top: '900px', left: '400px', width: '1200px' }} />}

        {showRealTimeArticles &&
          <div style={{ marginLeft: '0px', marginTop: '600px' }}>
            {articles.map((article, index) => (
              <a href={article.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div key={index} style={{ display: 'flex', marginBottom: '50px', paddingBottom: '20px', borderBottom: '2px solid #000' }}>
                  {/* display: 'flex' -> 가로로배치  */}
                  <div style={{ width: '70%', wordWrap: 'break-word' }}>
                    {/* 텍스트가 일정길이 넘어가면 자동으로 줄바꿈 */}
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                  </div>
                  <img src={article.image} alt="설명" style={{ marginLeft: '20px', borderRadius: '10%', width: '200px', height: '200px' }} />
                </div>
              </a>
            ))}
          </div>
        }



        {showMajorArticles &&
          <div style={{ marginLeft: '0px', marginTop: '900px' }}>
            {mainArticles.map((article, index) => (
              <a href={article.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '50px', paddingBottom: '20px', borderBottom: '2px solid #000', backgroundColor: '#354B63' }}>
                  <div style={{ marginBottom: '20px', padding: '40px', backgroundColor: '#354B63' }}>
                    <img src={article.image} alt="설명" style={{ width: '1000px', height: '600px' }} />
                  </div>
                  <div style={{ width: '100%', wordWrap: 'break-word', textAlign: 'center', color: 'white' }}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                  </div>
                </div>
              </a>
            ))}
            <div style={{ marginLeft: '40px', width: '1000px' }} > {/* 이거 안해줘서 하루종일 고생함 */}
              <Slider
                {...settings}
                nextArrow={<SampleNextArrow />}
                prevArrow={<SamplePrevArrow />}
              >
                <div>
                  {/* target="_blank" 는 새 탭에서 열리는 기능 */}
                  <a href="https://www.naver.com" target="_blank" rel="noreferrer">
                    <img src="/img/야경.png" alt="설명" style={{ width: '320px', height: '200px' }} />
                  </a>
                </div>
                <div>
                  <a href="https://www.naver.com" target="_blank" rel="noreferrer">
                    <img src="/img/배경.png" alt="설명" style={{ width: '320px', height: '200px' }} />
                  </a>
                </div>
                <div>
                  <a href="https://www.naver.com" target="_blank" rel="noreferrer">
                    <img src="/img/성남시장.png" alt="설명" style={{ width: '320px', height: '200px' }} />
                  </a>
                </div>
                <div>
                  <a href="https://www.naver.com" target="_blank" rel="noreferrer">
                    <img src="/img/의정부시장.png" alt="설명" style={{ width: '320px', height: '200px' }} />
                  </a>
                </div>
              </Slider>
            </div>
            <div style={{ marginTop: '100px', textAlign: 'center', color: 'gray' }}>
              <p>충남 천안시</p>
              <p>Copyright ⓒ 2023 Dike Engineering & Construction Corporation, All rights Reserved</p>
              <p>Dike 정책 | 개인정보처리 방침 | 고객센터</p>
            </div>
          </div>
        }

        {selectedButton === '댓글' &&
          <div style={{ marginLeft: '0px', marginTop: '400px' }}>
            <div style={{ marginTop: '0px', border: '1px solid black', width: "1000px", height: "200px" }}>
              <form onSubmit={handleSubmit}>
                <textarea
                  value={comment}
                  onChange={handleChange}
                  placeholder="댓글을 입력하세요..."
                />
                <div className="button" onClick={handleSubmit}>작성</div>
              </form>
            </div>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {/* 댓글출력부분 */}
              {comments.map((comment) => (
                <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '10px', margin: '10px 0' }} key={comment.id}>
                  {comment.text}
                </div>
              ))}
            </div>
          </div>
        }
        <div style={{ height: '300px' }} />
      </div>

    </div>
  )
}

export default Politician;
