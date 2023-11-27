import React, { useEffect, useState } from 'react';
import './style.css';


export default function AnimatedProgressBar({ color, progress }){
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    let animationInterval;
    let currentWidth = 0;
    
    const animateProgressBar = () => {
      animationInterval = setInterval(() => {
        if (currentWidth.toFixed(1) < progress) {
          currentWidth += 0.1; // 1 대신 0.1씩 증가
          setBarWidth(parseFloat(currentWidth.toFixed(1))); // 소수점 1자리까지 반올림
        } else {
          clearInterval(animationInterval);
        }
      }, 3);
    };
    animateProgressBar();

    return () => clearInterval(animationInterval);
  }, [progress]);

  return (
    <div className={`animated-progress progress-${color}`}>
      <span style={{ width: `${barWidth}%` }}>{barWidth}%</span>
    </div>
  );
};

