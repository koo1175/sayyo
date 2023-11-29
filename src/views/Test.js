import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Test = () => {
  const [result, setResult] = useState([]);
  const location = useLocation();
  const text = location.state?.text || '성남';
  const navigate = useNavigate();
  
  useEffect(() => {
    const getData = () => {
      const memberDto = {
        region: text,
      };
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/politician/findSearch', memberDto, config)
        .then(response => {
          console.log('Test.js 성공!!! -> ', response.data);
          setResult(response.data);
          navigate('/Politician', { state: { data: response.data, text }, replace: true });
        })
        .catch(error => {
          console.error('에러:', error);
        });
    };

    getData();
  }, [text, navigate]);

  return (
    <div>
        {/* 바로 Politician.js 로 넘어가야함. 로딩화면 만들면 됨 ㅇㅇ*/}
    </div>
  );
};

export default Test;
