import React, { useEffect, useState } from 'react';
import './style.css';

export default function AnimatedProgressBar({ color, progress }){
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    let animationInterval;
    let currentWidth = 0;

    const animateProgressBar = () => {
      animationInterval = setInterval(() => {
        if (currentWidth < progress) {
          currentWidth += 1;
          setBarWidth(currentWidth);
        } else {
          clearInterval(animationInterval);
        }
      }, 10);
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