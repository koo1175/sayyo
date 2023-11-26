import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function LoginForm() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 데이터 객체
  const loginDto = {
    id: id,
    pw: password
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const handleLogin = (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 막음
    axios.post(
      'http://localhost:8083/member/login', loginDto, config)
      .then(response => {
        if (response.data) {
          alert("로그인 성공");
          navigate('/Main'); // 회원 정보 전달
        } else {
          alert("로그인 실패");
        }
      })
      .catch(error => {
        // 로그인 실패 시 에러 처리
        console.error(error);
        alert("에러");
      });
  };
  

  return (
    <div style={{ marginTop: 200, marginLeft: 350, textAlign: 'center' }}>
      <form>
        <input type="text" placeholder='아이디' value={id} onChange={e => setId(e.target.value)} />
        <br />
        <input type="password" placeholder='비밀번호' value={password} onChange={e => setPassword(e.target.value)}/>
        <br /><br />
        <button type="submit" onClick={handleLogin} style={{ width: 150, height: 30, backgroundColor: '#909090', color: "#fff", borderRadius: 5, cursor: 'pointer'}}>로그인</button>
        <br />
      </form>
      <a href={KAKAO_AUTH_URL} className="kakaobtn">
        <img src="/img/kakao_login.png" style={{ width: 150, marginTop: 20 }} alt="카카오 로그인 이미지"/>
      </a>
      <button style={{ fontSize: '0.5em', cursor: 'pointer', marginTop: 20 }}>비밀번호 찾기</button>
    </div>
  );
}



function RegisterForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [registNum, setRegistNum] = useState('');
  const memberDto = {
    id : id,
    pw : password,
    name : name,
    nickname : nickname,
    phone : phone,
    address : address,
    registNum: registNum
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }


  const handleRegister = (e) => {
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/regist', memberDto, config)
      .then(response => {
        alert("회원가입 성공");
      })
    .catch(error => {
      alert("회원가입 실패");
      console.log(error);
    })
  };
  
  return (
    <div style={{ marginTop: 200, marginLeft: -300, textAlign: 'center' }}>
    {/* Add your registration form elements here */}
    <form onSubmit={handleRegister}>
      <input type="text" placeholder='아이디' value={id} onChange={e => setId(e.target.value)} />
      <br />
      <input type="password" placeholder='비밀번호' value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <input type="text" placeholder='이름' value={name} onChange={e => setName(e.target.value)} />
      <br />
      <input type="text" placeholder='닉네임' value={nickname} onChange={e => setNickName(e.target.value)} />
      <br />
      <input type="text" placeholder='전화번호' value={phone} onChange={e => setPhone(e.target.value)} />
      <br />
      <input type="text" placeholder='주소' value={address} onChange={e => setAddress(e.target.value)} />
      <br />
      <input type="text" placeholder='주민등록번호' value={registNum} onChange={e => setRegistNum(e.target.value)} />
      <br />
      <button type="button" onClick={handleRegister} style={{ backgroundColor: '#909090', color: "#fff", borderRadius: 5, cursor: 'pointer' }}>회원가입</button>
      </form>
    </div>
    );
  }

//OAuth.js

const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;


export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [springProps, api] = useSpring(() => ({
    from: { x: 170 },
  }));

  const handleClick = () => {
    api.start({
      from: { x: isLogin ? 170 : 530 },
      to: { x: isLogin ? 530 : 170 },
      onRest: () => {
        setIsLogin((prev) => !prev);
      },
    });
  };

  return (
    <div style={{ position: 'relative' }}> 

      {/* White form in front of the gray square */}
      <animated.div
        style={{
          position: 'realtive',
          width: 708,
          height: 500,
          margin: '350px 0 0 0px', // Adjust position to center inside the gray square
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
          borderRadius: 30,
        }}
      >
        <div style={{ position: 'absolute', top: '30%', left: '45%', transform: 'translate(-50%, -50%)', fontSize: '1em' }}>
          {/* Render registration form if isLogin is false */}
          {isLogin && <LoginForm />}
          {!isLogin && <RegisterForm />}
        </div>

        {/* Gray animated square */}
        <animated.div
          onClick={handleClick}
          style={{
            width: 350,
            height: 500,
            background: '#909090',
            borderRadius: 30,
            marginTop: -110,
            marginLeft: -170,
            cursor: 'pointer',
            ...springProps,
          }}
        >

          {/* Image positioning */}
          <img
            src="/img/sayoLogo.png" // Replace with the actual path to your image
            alt="sayoLogo"
            style={{
              position: 'absolute',
              left: '50%',
              top: '33.33%', // 2/3 of the height from the bottom
              transform: 'translate(-50%, -50%)',
              width: '100px', // Adjust the width as needed
              height: '100px', // Adjust the height as needed
            }}
          />


          {/* Text depending on the state */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ffffff', textAlign: 'center', fontSize: '2em' }}>
            {isLogin ? 'Welcome' : 'Join with us'}
          </div>
        </animated.div>


      </animated.div>

      {/* Toggle between login and sign-up buttons */}
      <button onClick={handleClick} style={{ marginTop: 10, marginLeft: 470 ,cursor: 'pointer'}}>
        {isLogin ? '회원가입 하러가기' : '로그인 하러가기'}
      </button>
    </div>
  );
}
