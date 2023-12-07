import React, { useState } from 'react';
import './style.css';
import InfoSu from './Info/suchan';
import PromiseSu from './Promise/suchan';
import NewsSu from './News/suchan';

import InfoHee from './Info/heeyeon';
import PromiseHee from './Promise/heeyeon';
import NewsHee from './News/heeyeon';

import InfoYoung from './Info/youngsil';
import PromiseYoung from './Promise/youngsil';
import NewsYoung from './News/youngsil';

import InfoSeung from './Info/seungju';
import PromiseSeung from './Promise/seungju';
import NewsSeung from './News/seungju';

export default function SiblingFade() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
    setSelectedTab(null); // Reset selected tab when changing images
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    switch (selectedImage) {
      case "suchan":
        return (
          <div>
            {selectedTab === "정보" && <InfoSu />}
            {selectedTab === "공약" && <PromiseSu />}
            {selectedTab === "관련기사" && <NewsSu />}
          </div>
        );
      case "heeyeon":
        return (
          <div>
            {selectedTab === "정보" && <InfoHee />}
            {selectedTab === "공약" && <PromiseHee />}
            {selectedTab === "관련기사" && <NewsHee />}
          </div>
        );
      case "youngsil":
        return (
          <div>
            {selectedTab === "정보" && <InfoYoung />}
            {selectedTab === "공약" && <PromiseYoung />}
            {selectedTab === "관련기사" && <NewsYoung />}
          </div>
        );
      case "seungju":
        return (
          <div>
            {selectedTab === "정보" && <InfoSeung />}
            {selectedTab === "공약" && <PromiseSeung />}
            {selectedTab === "관련기사" && <NewsSeung />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sibling-fade">
      <div>
        <img
          alt="suchan"
          src="/img/suchan.png"
          style={{ width: '200px', height: '266px' }}
          onClick={() => handleImageClick("suchan")}
        />
      </div>

      <div>
        <img
          alt="youngsil"
          src="/img/youngsil.png"
          style={{ width: '200px', height: '266px' }}
          onClick={() => handleImageClick("youngsil")}
        />
      </div>

      <div>
        <img
          alt="seungju"
          src="/img/seungju.png"
          style={{ width: '200px', height: '266px' }}
          onClick={() => handleImageClick("seungju")}
        />
      </div>

      <div>
        <img
          alt="heeyeon"
          src="/img/heeyeon.png"
          style={{ width: '200px', height: '266px' }}
          onClick={() => handleImageClick("heeyeon")}
        />
      </div>

      <div className="image-text">
        {selectedImage && (
          <SmallNavigation handleTabClick={handleTabClick} selectedTab={selectedTab} />
        )}
        {selectedImage && renderContent()}
      </div>
    </div>
  );
}

function SmallNavigation({ handleTabClick, selectedTab }) {
  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: 'bolder', marginLeft: '230px' }}>
        <button
          onClick={() => handleTabClick("정보")}
          style={{ textDecoration: 'none', margin: '0px 150px 0px 0px', color: selectedTab === "정보" ? 'black' : '#B9B9B9' }}
        >
          정보
        </button>
        <button
          onClick={() => handleTabClick("공약")}
          style={{ textDecoration: 'none', margin: '0px 150px 0px 0px', color: selectedTab === "공약" ? 'black' : '#B9B9B9' }}
        >
          공약
        </button>
        <button
          onClick={() => handleTabClick("관련기사")}
          style={{ textDecoration: 'none', margin: '0px 150px 0px 0px', color: selectedTab === "관련기사" ? 'black' : '#B9B9B9' }}
        >
          관련기사
        </button>
      </div>
    </div>
  );
}