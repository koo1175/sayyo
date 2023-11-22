//프로그래스바 퍼센트 나타내는 부분

import React from "react";
import Modal from 'react-modal';
import AnimatedProgressBar from "../AnimatedProgressBar";

export default function ResultOfMok({ isOpen, onClose }) {

  const popupStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
      width: '400px',
      height: '500px',
      backgroundColor: '#FFFBFB',
    },
  };

  const progressBarStyle = {
    position: 'absolute',
    top: '7%',
    left: '53%',
    width: '50%',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={popupStyle}
    >
      <div style={{ position: 'relative' }}>
        <button style={{ position: 'absolute', top: "0%", left: "87%", transform: "translate(-50%, 50%)", cursor: 'pointer' }} onClick={onClose}>닫기</button>
        
        {/* resultOfMok image */}
        <img alt="resultOfMok" src="/img/resultOfMok.png" width="100%" />

        {/* Progress bars drawn on top of the image */}
        <div style={progressBarStyle} >
          <AnimatedProgressBar color="red" progress={10} />
          <AnimatedProgressBar color="yellow" progress={50.4} />          
          <AnimatedProgressBar color="purple" progress={10} />
          <AnimatedProgressBar color="orange" progress={10} />
        </div>
      </div>
    </Modal>
  );
};
