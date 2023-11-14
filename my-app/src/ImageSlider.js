import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ImageSlider.css'; // CSS 파일 import

function ImageSlider({ images }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    beforeChange: (current, next) => setActiveSlide(next),
  };

  useEffect(() => {
    setActiveSlide(0); // 컴포넌트가 마운트 될 때 activeSlide를 0으로 설정
  }, []);

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className={activeSlide === index ? 'slide activeSlide' : 'slide'}>
          <img src={image} alt={`slide-${index}`} className="image" />
        </div>
      ))}
    </Slider>
  );
}

export default ImageSlider;
