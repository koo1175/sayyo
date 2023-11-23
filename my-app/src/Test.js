import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Map.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MapComponent = ({ results = [] }) => {
  return (
    <div style={{ marginLeft: '600px', marginTop: '100px' }}>
      <div style={{ width: '1100px', height: '500px', marginLeft: '-200px', marginTop: '-200px' }} >
        <h1 style={{ marginLeft: '430px' }}>이 시각 주요뉴스</h1>
        <Slider {...settings}>
          {results.map((result, index) => (
            <div className="image-container" key={index}>
              <a href={result.link} target="_blank" rel="noreferrer">
                <img src={result.image} alt={`image${index + 1}`} />
                <p className="image-description">{result.title}</p>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default MapComponent;