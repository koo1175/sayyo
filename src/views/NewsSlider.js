import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './NewsSlider.css';
import { IoIosArrowBack , IoIosArrowForward  } from "react-icons/io";

function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <IoIosArrowBack 
            className={className}
            style={{
                ...style,
            }}
            onClick={onClick}
        />
    );
}

function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <IoIosArrowForward
            className={className}
            style={{
                ...style,
                display: 'block',
                left:'-100px',
                width: '70px', // 화살표의 너비를 조절합니다.
                height: '70px', // 화살표의 높이를 조절합니다.
                backgroundSize: 'cover',

            }}
            onClick={onClick}
        />
    );
}
function NewsSlider({ newsData, newsData2, newsData3 }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // 한 번에 하나의 사진만 보이도록 변경
        slidesToScroll: 1, // 한 번에 하나의 사진만 움직이도록 변경
        autoplay: true, // 자동 슬라이드 기능 추가
        autoplaySpeed: 3000, // 3초마다 자동으로 슬라이드
        arrows: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,

    };

    return (
        <div className='newsSlider' style={{ width: '831px', marginLeft: '200px' }}>
            <h1 className='tt' style={{ textAlign: 'left', color:'#ffffff', marginBottom:'5%' }}>지역소식</h1>
            <Slider {...settings}>
                {newsData.map((newsItem, index) => (
                    <div className='regionS' key={index}>
                        <a className='a-tag' href={newsItem.link} target="_blank" rel="noopener noreferrer">
                            <div>
                                <p style={{ fontSize:'15px', fontWeight:'bold', textAlign: 'left', marginTop: '10px' }}>{newsItem.title}</p>
                                <p style={{ fontSize:'15px', textAlign: 'left', marginTop: '10px' }}>{newsItem.content.length > 40 ? newsItem.content.substring(0, 40) + '...' : newsItem.content}</p>
                                <p style={{ fontSize:'10px', textAlign: 'left', marginTop: '80px' }}>{newsItem.magazine} {newsItem.wrotetime}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </Slider>
            <h1 className='tt' style={{  textAlign: 'left', color:'#ffffff', marginBottom:'5%'  }}>사건사고</h1>
            <Slider {...settings}>
                {newsData2.map((newsItem, index) => (
                    <div className='regionS' key={index}>
                        <a className='a-tag' id="a-tag2" href={newsItem.link} target="_blank" rel="noopener noreferrer" >
                            
                            <p style={{ textAlign: 'center', marginTop: '10px' }}>{newsItem.title}</p>
                            <img src={newsItem.image} alt={newsItem.title} style={{ width: '92px', height: '92px', borderRadius: '10px', marginTop:'5%' }} />
                            
                        </a>
                    </div>
                ))}
            </Slider>
            <h1 className='tt' style={{  textAlign: 'left', color:'#ffffff', marginBottom:'5%'  }}>지역행사</h1>
            <Slider {...settings}>
                {newsData3.map((newsItem, index) => (
                    <div key={index} className='regionS'>
                        <a className='a-tag' id="a-tag2" href={newsItem.link} target="_blank" rel="noopener noreferrer">
                            <p style={{ textAlign: 'center', marginTop: '10px' }}>{newsItem.title}</p>
                            <img src={newsItem.image} alt={newsItem.title} style={{ width: '92px', height: '92px', borderRadius: '10px', marginTop:'5%' }} />
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default NewsSlider;