//프로그래스바 퍼센트 나타내는 부분

import React from "react";
import Modal from 'react-modal';
import AnimatedProgressBar from "../AnimatedProgressBar";

export default function ResultOfMok({ isOpen, onClose,percentages }) {
  console.log('ResultOfMock 페이지 -> 1번후보 득표율 : ', percentages[0])
  console.log('ResultOfMock 페이지 -> 2번후보 득표율 : ', percentages[1])
  console.log('ResultOfMock 페이지 -> 3번후보 득표율 : ', percentages[2])
  console.log('ResultOfMock 페이지 -> 4번후보 득표율 : ', percentages[3])


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
          <AnimatedProgressBar color="red" progress={percentages[0]} />
          <AnimatedProgressBar color="yellow" progress={percentages[1]} />          
          <AnimatedProgressBar color="purple" progress={percentages[2]} />
          <AnimatedProgressBar color="orange" progress={percentages[3]} />
        </div>
      </div>
    </Modal>
  );
};
