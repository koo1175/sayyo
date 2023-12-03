import React from "react";
import Map2 from './Map2';
import './Test2.css';
import styled, { createGlobalStyle } from 'styled-components';
import Chat from "./Chat";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    max-width: none;
    margin: none;
  }
`;
const StyledButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: white;
    color: purple;
    font-size: 20px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: purple;
        color: white;
    }
`;

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", position: "absolute", top: "50%", zIndex: 2 }}
            onClick={onClick}
        >
            <img src="/img/next_arrow2.png" alt="Next" />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", position: "absolute", top: "50%", left: "-70px", zIndex: 2 }}
            onClick={onClick}
        >
            <img src="/img/prev_arrow2.png" alt="Previous" />
        </div>
    );
}
function Test2() {
    //width:'100vm'
    return (

        <div style={{ marginTop: '100px' }}>
            <div style={{ display: 'flex', width: '1902px', position: 'relative', backgroundImage: 'url("/img/바다.png")', backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', marginLeft: '-312px' }}>
                <div style={{ borderRadius: '10px', height: '820px', width: '800px', margin: '10px', marginLeft: '200px' }}>
                    <Map2 />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
                    <div style={{ border: '1px solid black', borderRadius: '10px', height: '300px', width: '550px', backgroundColor: 'white', marginTop: '70px' }}>
                        <img src="/video/test.gif" alt="Sample" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                    </div>
                    <div style={{
                        border: '1px solid black', borderRadius: '10px', height: '300px', width: '550px',
                        backgroundColor: '#FFE08C', marginTop: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                        alignItems: 'center', fontSize: '24px', fontFamily: '부크크명조'
                    }}>
                        정치 QUIZ 풀기!
                        <Link to="/quiz">
                            <StyledButton>
                                START
                            </StyledButton>
                        </Link>
                    </div>
                </div>
            </div>

            <div style={{ width: '800px', height: '500px', margin: '0 auto', marginTop: '50px' }}>
                <Slider {...settings}>
                    <div style={{ overflow: 'hidden' }}>
                        <a href="https://www.hani.co.kr/arti/politics/politics_general/1118686.html" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <div style={{ position: 'relative' }}>
                                <img src="/img/기사11.jpg" alt="Image 1" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', background: 'linear-gradient(180deg, transparent, black)' }}></div>
                                <div style={{ position: 'absolute', bottom: '20px', left: '10px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>
                                    윤석열 정부의 ‘안 하겠다’ 거부권 정치…노란봉투법 폐기 돌입
                                </div>
                            </div>
                        </a>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <a href="https://view.asiae.co.kr/article/2023120116473284055" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>

                            <div style={{ position: 'relative' }}>
                                <img src="/img/기사22.jpg" alt="Image 1" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', background: 'linear-gradient(180deg, transparent, black)' }}></div>
                                <div style={{ position: 'absolute', bottom: '20px', left: '10px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>
                                    尹, 노란봉투법·방송3법 거부권 행사… 취임 후 세 번째
                                </div>
                            </div>
                        </a>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <a href="https://www.newsis.com/view/?id=NISX20231201_0002542688&cID=10301&pID=10300" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>

                            <div style={{ position: 'relative' }}>
                                <img src="/img/기사33.jpg" alt="Image 1" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%', background: 'linear-gradient(180deg, transparent, black)' }}></div>
                                <div style={{ position: 'absolute', bottom: '20px', left: '10px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>
                                    윤 대통령, 이종석 신임 헌법재판소장에 임명장 수여
                                </div>
                            </div>
                        </a>
                    </div>
                    {/* 추가 이미지... */}
                </Slider>
            </div>


            <div style={{ height: '200px' }} />
            <div>
                <Chat />
            </div>
        </div>

    );
}

export default Test2;