import React, { useState } from 'react';
import './style.css';
import SmallNavigation from '../SmallNavigation';

export default function SiblingFade() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="sibling-fade">
      <a onClick={() => setSelectedImage("suchan")}>
        <img
          alt="suchan"
          src="/img/suchan.png"
          style={{ width: '200px', height: '266px' }}
        />
      </a>
      <a onClick={() => setSelectedImage("heeyeon")}>
        <img
          alt="heeyeon"
          src="/img/heeyeon.png"
          style={{ width: '200px', height: '266px' }}
        />
      </a>
      <a onClick={() => setSelectedImage("youngsil")}>
        <img
          alt="youngsil"
          src="/img/youngsil.png"
          style={{ width: '200px', height: '266px' }}
        />
      </a>
      <a onClick={() => setSelectedImage("seungju")}>
        <img
          alt="seungju"
          src="/img/seungju.png"
          style={{ width: '200px', height: '266px' }}
        />
      </a>
      <div className="image-text">
        {selectedImage === "suchan" && (
          <div>
            <SmallNavigation />
          </div>
        )}
        {selectedImage === "heeyeon" && (
          <div>
            <SmallNavigation />
          </div>
        )}
        {selectedImage === "youngsil" && (
          <div>
            <SmallNavigation />
          </div>
        )}
        {selectedImage === "seungju" && (
          <div>
            <SmallNavigation />
          </div>
        )}
      </div>
      

    </div>
  );
}
