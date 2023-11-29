import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './NewsSlider.css';

function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                left:'830px',
                width: '70px', // 화살표의 너비를 조절합니다.
                height: '70px', // 화살표의 높이를 조절합니다.
                background: `url('/img/arrow_next64.png') no-repeat center center`, // 이미지 파일 경로를 지정합니다.
                backgroundSize: 'cover',
            }}
            onClick={onClick}
        />
    );
}

function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                left:'-100px',
                width: '70px', // 화살표의 너비를 조절합니다.
                height: '70px', // 화살표의 높이를 조절합니다.
                background: `url('/img/arrow_prev64.png') no-repeat center center`, // 이미지 파일 경로를 지정합니다.
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
        <div style={{ width: '800px', marginLeft: '200px' }}>
            <h2 style={{ textAlign: 'center' }}>시장행보</h2>
            <Slider {...settings}>
                {newsData.map((newsItem, index) => (
                    <div key={index} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <a href={newsItem.link} target="_blank" rel="noopener noreferrer" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={newsItem.image} alt={newsItem.title} style={{ width: '90%', height: '150px', borderRadius: '10px' }} />
                            <p style={{ textAlign: 'center', marginTop: '10px' }}>{newsItem.title}</p>
                        </a>
                    </div>
                ))}
            </Slider>
            <h2 style={{ textAlign: 'center' }}>지역소식</h2>
            <Slider {...settings}>
                {newsData2.map((newsItem, index) => (
                    <div key={index} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <a href={newsItem.link} target="_blank" rel="noopener noreferrer" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={newsItem.image} alt={newsItem.title} style={{ width: '90%', height: '150px', borderRadius: '10px' }} />
                            <p style={{ textAlign: 'center', marginTop: '10px' }}>{newsItem.title}</p>
                        </a>
                    </div>
                ))}
            </Slider>
            <h2 style={{ textAlign: 'center' }}>사건사고</h2>
            <Slider {...settings}>
                {newsData3.map((newsItem, index) => (
                    <div key={index} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <a href={newsItem.link} target="_blank" rel="noopener noreferrer" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={newsItem.image} alt={newsItem.title} style={{ width: '90%', height: '150px', borderRadius: '10px' }} />
                            <p style={{ textAlign: 'center', marginTop: '10px' }}>{newsItem.title}</p>
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default NewsSlider;