import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

import { useLocation,useNavigate } from 'react-router-dom';

export default function QuizResult() {
    const location = useLocation();
    const navigate = useNavigate();

    // const correctCount = location?.state?.correctCount || 0;
    const correctCount = 10;
    let grade;
    if (correctCount <= 2) {
        grade = '매국노';
    } else if (correctCount <= 5) {
        grade = '시민';
    } else if (correctCount <= 8) {
        grade = '애국자';
    } else {
        grade = '국회의원';
    }


    useEffect(() => {
        if (grade === '애국자' || grade === '국회의원') {
            firework(); // 등급이 '애국자' 또는 '국회의원'일 때만 폭죽 효과 실행
        }
    }, [grade]); // grade가 변경될 때마다 이 효과를 다시 적용


    function firework() {
        var duration = 15 * 300;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 20  , spread: 360, ticks: 100, zIndex: 0 };
        //  startVelocity: 범위, spread: 방향, ticks: 갯수
      
        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }
      
        var interval = setInterval(function () {
          var timeLeft = animationEnd - Date.now();
      
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
      
          var particleCount = 50 * (timeLeft / duration);
          // since particles fall down, start a bit higher than random
          confetti(
            Object.assign({}, defaults, {
              particleCount,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
          );
          confetti(
            Object.assign({}, defaults, {
              particleCount,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
          );
        }, 250);
      } 

      const restart = () => {
        navigate("/Quiz");
    };

    const goMain = () => {
        navigate("/");
    };
    return (
        <div>

            <h1 style={{marginTop:100}}> {correctCount} / 10</h1>
            <h4>당신의 등급은 <span style={{ fontSize: '2em', fontWeight: 'bold', color: 'red' }}>{grade}</span> 입니다.</h4>
            {grade === '매국노' && <img src="/img/눈물.gif" alt="매국노" style={{ marginTop: 50 }}/>}
            {grade === '시민' && <img src="/img/dance.gif" alt="시민" style={{ marginTop: 50 }}/>}
            {grade === '애국자' && <img src="/img/춤.gif" alt="애국자" style={{ marginTop: 50 }}/>}
            {grade === '국회의원' && <img src="/img/박수.gif" alt="국회의원" style={{ marginTop: 50 }}/>}


            <div style={{ display: 'flex', justifyContent: 'center',marginTop:50 }}>
                <div onClick={restart} style={{ margin: 10 }}>
                    <img src='img/다시풀기.png' alt='다시풀기' style={{ width: '130px' }} />
                </div>
                <div onClick={goMain} style={{ margin: 10 }}>
                    <img src='img/메인으로.png' alt='메인으로' style={{ width: '130px' }} />
                </div>
            </div>
            <div style={{height:150}}></div>
        </div>
    );
}