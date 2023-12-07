import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactComponent as Chatsvg } from '../../img/chat_svg.svg';
import { ReactComponent as Btn1svg } from '../../img/총괄현황svg.svg';
import { ReactComponent as Btn2svg } from '../../img/공약가계부svg.svg';
import { ReactComponent as Btn3svg } from '../../img/이행현황svg.svg';
import DoughnutChart from "../DoughnutChart";
import ShowRealTimeArticles from '../ShowRealTimeArticles';
import Chat from '../Chat';
import './Politician.css'
export default function Politician() {
  const location = useLocation();
  const text = location?.state?.text || '기본값'; //Gyeonggi.js에서 받아온 데이터. 시 이름이 들어가 있음
  const navigate = useNavigate();
  const data = location?.state?.data || null; //Test.js에서 받아온 데이터. DB에서 받아온 데이터 
  //console.log('test : ', text);
  //console.log('data test', data);

  const [filteredData, setFilteredData] = useState(null); //이행률 데이터 저장변수
  const [selectedButton, setSelectedButton] = useState(1);
  //const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    if (!data) {
      console.log('ㄱㅁㄸ');
      navigate('/Test', { state: { text }, replace: true });
    }
  }, []);

  useEffect(() => {
    axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/findAll')
      .then(response => {
        const data = response.data.list; // 'list' 속성 접근
        const filtered = data.filter(item => item.region === text);
        //console.log(filtered[0]);
        setFilteredData(filtered[0]) // 필터링된 데이터 확인
      })
      .catch(error => {
        console.error(error);
      })
  }, [text])

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  }

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'translateY(-10px)';
    e.currentTarget.style.backgroundColor = 'white';
    e.currentTarget.style.color = '#0C81D2';
    e.currentTarget.querySelector('svg').style.fill = '#0C81D2';
  }

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.backgroundColor = '#0C81D2';
    e.currentTarget.style.color = 'white';
    e.currentTarget.querySelector('svg').style.fill = 'white';
  }

  const openLink = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('링크가 없습니다.');
    }
  }
  const buttonData = [
    {
      id: 1,
      img: <Chatsvg style={{ width: '40px', height: '40px', fill: 'white', marginBottom: '15px' }} />,
      text: '관련기사',
      component: data && <ShowRealTimeArticles politicianName={data.name} />
    },
    {
      id: 2,
      img: <Btn1svg style={{ width: '40px', height: '40px', fill: 'white', marginBottom: '15px' }} />,
      text: '총괄현황',
      imgPath: `img/${text}1.png`,
    },
    {
      id: 3,
      img: <Btn2svg style={{ width: '40px', height: '40px', fill: 'white', marginBottom: '15px' }} />,
      text: '공약가계부',
      imgPath: `img/${text}2.png`,
    },
    {
      id: 4,
      img: <Btn3svg style={{ width: '40px', height: '40px', fill: 'white', marginBottom: '15px' }} />,
      text: '이행현황',
      imgPath: `img/${text}3.png`,
    },
  ]

  return (
    <div style={{ display: 'flex', marginTop: 130, width: 1600, marginLeft: '12%', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        {/* <img src='img/backgroundimg.png' style={{ position: 'absolute', top: 250, left: 400, zIndex: '-1' }}></img> */}
        <div style={{height:580,width:1050,backgroundColor:'#CEF0FF',position: 'absolute', top: 100, left: 650,borderTopLeftRadius:200,borderTopRightRadius:200,borderBottomLeftRadius:200, zIndex: '-1' }}></div>
        <div style={{ height: 600, width: 750, position: 'relative', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%', overflow: 'hidden' }}>
          <img src={`/img/시장${text}.png`} style={{ width: '100%' }}></img>
          <div style={{ position: 'absolute', bottom: 0, height: '30%', width: '100%', backgroundImage: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.8))' }} />
        </div>
        <h2 className="title" style={{ position: 'absolute', top: '650px', left: '29%',fontFamily:'KBO-Dia-Gothic_bold',fontSize:'30px' }}>
          {text}시장 {
            data && data.name.split('').map((char, index) => (
              <span key={index} style={{ position: 'relative', color: '#119BEA', borderBottom: '2px solid #119BEA', paddingBottom: '3px' }}>
                {char}
                <span style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', color: '#119BEA' }}>•</span>
              </span>
            ))
          } 입니다
        </h2>
        <div style={{ height: 600, width: 800, flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'start', marginTop: 30, marginLeft: 20 }}>
            <img src="/img/유튜브로고.jpg" alt="설명" className="logo" onClick={() => openLink(data?.youtube)} />
            <img src="/img/인스타그램로고.png" alt="설명" className="logo" onClick={() => openLink(data?.instagram)} />
            <img src="/img/카카오톡로고.png" alt="설명" className="logo" onClick={() => openLink(data?.kakao)} />
            <img src="/img/네이버로고.png" alt="설명" className="logo" onClick={() => openLink(data?.blog)} />
            <img src="/img/페이스북로고.png" alt="설명" className="logo" onClick={() => openLink(data?.facebook)} />

          </div>
          <div style={{ marginTop: 40 }}>
            {filteredData && <DoughnutChart data={filteredData} />}
          </div>
          <div style={{ marginTop: 50, display: 'flex' }}>
            {buttonData.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button.id)}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="testButton"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                {button.img}
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 100 }}>
        {selectedButton === 1 ? buttonData.find(button => button.id === selectedButton).component
          : selectedButton && <img src={buttonData.find(button => button.id === selectedButton)?.imgPath} alt="선택한 버튼의 이미지" />}
      </div>
      <div>
        <Chat />
      </div>
      <div style={{ height: 100 }} />
    </div>
  );
}