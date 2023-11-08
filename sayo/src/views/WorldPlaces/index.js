import React, { useState } from 'react';
import './style.css';
import {Link} from 'react-router-dom';

const WorldPlaces = () => {
  const [selectedOption, setSelectedOption] = useState(""); // 선택된 옵션을 관리할 state

  // 이미지 및 텍스트 생성 함수
  const generateImageElement = (altText, imagePath) => {
    return (
      <div className="city">
        <img
          alt={altText}
          src={imagePath}
          style={{ width: '100%', cursor: 'pointer' }}
          onClick={() => setSelectedOption(altText)}
        />
      </div>
    );
  };

  return (
    <Elements generateImageElement={generateImageElement} selectedOption={selectedOption} />
  );
};

export default WorldPlaces;

const Elements = ({ generateImageElement, selectedOption }) => {
  return (
    <div style={{ marginTop: '100%' }}>
      <div className="wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Container 0 */}
        <div className="container" id="c0">
          <div className="image" id="i0">
            {generateImageElement("heeyeon", "/img/heeyeon.png")}
          </div>
        </div>

        <div className="container" id="c1">
          <div className="image" id="i1">
            {generateImageElement("youngsil", "/img/youngsil.png")}
          </div>
        </div>

        <div className="container" id="c2">
          <div className="image" id="i2">
            {generateImageElement("suchan", "/img/suchan.png")}
          </div>
        </div>

        <div className="container" id="c3">
          <div className="image" id="i3">
            {generateImageElement("seungju", "/img/seungju.png")}
          </div>
        </div>

        <div className="page">
          <h4>이미지 클릭</h4>
          <ul>
            <li> {'<<<'} </li>
            <li> {'>>>'} </li>
          </ul>
          {showImageText(selectedOption)}
        </div>
      </div>
    </div>
  );
};

const showImageText = (selectedOption) => {
  const smallNavStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '70px',
    width: '400px',
    alignContent: 'center',
  };

  return (
    <div className='smallNav' style={smallNavStyle}>
      {selectedOption && (
        <ul>
          <Link to="/info" style={{ textDecoration: "none", color: "gray", fontWeight: "bolder", marginRight: "70px" }}>정보</Link>
          <Link to="/promise" style={{ textDecoration: "none", color: "gray", fontWeight: "bolder", marginRight: "70px" }}>공약</Link>
          <Link to="/news" style={{ textDecoration: "none", color: "gray", fontWeight: "bolder" }}>관련기사</Link>
        </ul>
      )}
    </div>
  );
};