import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmailCheck from '../../img/email-check.png';
import CheckOk from '../../img/pw-check-ok.png';
import CheckNo from '../../img/pw-check-no.png';
import './styles.css';

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
      'https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/login', loginDto, config)
      .then(response => {
        if (response.data) {
          alert("로그인 성공");
          navigate('/Main'); // 회원 정보 전달
          window.location.reload(); //새로고침
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
    <div style={{ marginTop: 200, marginLeft: 395, textAlign: 'center' }}>
      <form style={{ display:"inline" }}>
        <input type="text" placeholder='아이디' value={id} onChange={e => setId(e.target.value)} style={{height: '30px'}}/>
        <br />
        <input type="password" placeholder='비밀번호' value={password} onChange={e => setPassword(e.target.value)} style={{height: '30px'}} />
        <br /><br />
        <button type="submit" onClick={handleLogin} style={{ width: 150, height: 30, backgroundColor: '#909090', color: "#fff", borderRadius: 5, cursor: 'pointer' }}>로그인</button>
        <br />
      </form>
      <a href={KAKAO_AUTH_URL} className="kakaobtn">
        <img src="/img/kakao_login.png" style={{ width: 150, marginTop: 20 }} alt="카카오 로그인 이미지" />
      </a>
      <button style={{ fontSize: '0.5em', cursor: 'pointer', marginTop: 20 }}>비밀번호 찾기</button>
    </div>
  );
}

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  // 비밀번호 확인
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [registNum, setRegistNum] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [serverCode, setServerCode] = useState('');
  const [displayCode, setDisplayCode] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  // 휴대폰 번호 유효성 상태를 저장하는 state
  const [phoneValid, setPhoneValid] = useState(false); 

  const memberDto = {
    id: email,
    pw: password,
    name: name,
    phone: phone,
    address: address,
    registNum: registNum
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    const passwordReg = /(?=.*[!@#$%^&*])(?=.*\d).{6,}/;
    setPassword(value);
    setPasswordValid(passwordReg.test(value));
  };

  const handlePasswordConfirmChange = (e) => {
    const { value } = e.target;
    setPasswordConfirm(value);
    setPasswordCheck(password === value);
  };

  // 휴대폰 번호 입력 이벤트 핸들러
const handlePhoneChange = (e) => {
  const { value } = e.target;
  const phoneReg = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/; // 정규 표현식
  setPhone(value);
  setPhoneValid(phoneReg.test(value)); // 입력된 휴대폰 번호의 유효성 검사
};

  const emailDto = {
    email: email
  }

  const sendEmail = () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
  
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/mail', emailDto, config)
      .then((response) => {
        alert("인증번호 발송");
        setServerCode(response.data);
        setDisplayCode(true);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };
  
  const verifyCode = () => {
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/mail/verify', emailDto, config)
      .then((response) => {
        if (response.data.toString() === verificationCode) {
          alert("인증이 완료되었습니다.");
          setIsVerified(true); // 인증 완료 상태 저장
        } else {
          alert("인증 실패");
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

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
    <div style={{ marginTop: 220, marginLeft: -300, textAlign: 'center' }}>
      <form onSubmit={handleRegister}>
        {/* 이메일 인증 부분 추가 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="text" placeholder='이메일' value={email} onChange={handleEmailChange} style={{height: '30px', marginTop:'5px', marginLeft: '60px'}} />
            <button type="button" className={`authButton ${isVerified ? 'authVerified' : ''}` } style={{marginTop:'5px'}} onClick={sendEmail}>인증</button>
          </div>
          <br />
          {displayCode && (
            <div>
              <input type="text" placeholder='인증번호 입력' value={verificationCode} onChange={handleVerificationCodeChange} disabled={isVerified} style={{height: '30px', marginLeft: '60px'}} />
              {isVerified && <img src={EmailCheck} height={20} width={20}  style={{marginLeft: '10px'}}/>}
              {!isVerified && <button type="button" className={`authButton ${isVerified ? 'authVerified' : ''}`} onClick={verifyCode}>확인</button>}
            </div>
          )}
          <br />
          <input type="password" placeholder='비밀번호' value={password} onChange={handlePasswordChange} style={{height: '30px'}} />
          <div style={{fontSize: '0.8em', marginLeft:'7px'}}>
            {passwordValid ? '유효한 비밀번호입니다.' : '6자리 이상, 특수문자 1개 이상을 포함해야 합니다.'}
          </div>
          <br />
          <div>
            <input type="password" placeholder='비밀번호 확인' value={passwordConfirm} onChange={handlePasswordConfirmChange} style={{height: '30px', marginLeft: '30px'}} />
            {passwordCheck && <img src={CheckOk} height={20} width={20}  style={{marginLeft: '10px'}}/>} {/* 비밀번호 일치 시 이미지 */}
            {!passwordCheck && <img src={CheckNo} height={20} width={20}  style={{marginLeft: '5px'}}/>} {/* 비밀번호 불일치 시 이미지 */}
            <div style={{fontSize: '0.8em'}}>
              {passwordCheck ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
            </div>
          </div>
          <br />
          <input type="text" placeholder='이름' onChange={e => setName(e.target.value)} style={{height: '30px'}} />
          <br />
          <div>
            <input type="text" placeholder='전화번호' value={phone} onChange={handlePhoneChange} style={{height: '30px', marginLeft: '30px'}} />
            {phoneValid && <img src={CheckOk} height={20} width={20}  style={{marginLeft: '10px'}}/>} {/* 전화번호 형식 일치 시 이미지 */}
            {!phoneValid && <img src={CheckNo} height={20} width={20}  style={{marginLeft: '5px'}}/>} {/* 전화번호 형식 불일치 시 이미지 */}
            <div style={{fontSize: '0.8em'}}>
              {phoneValid ? '유효한 전화번호입니다.' : '전화번호 형식이 잘못되었습니다. (예: 010-0000-0000)'}
            </div>
          </div>
          <br />
          <input type="text" placeholder='주소' value={address} onChange={e => setAddress(e.target.value)} style={{height: '30px'}} />
          <br />
          <input type="text" placeholder='주민등록번호' value={registNum} onChange={e => setRegistNum(e.target.value)} style={{height: '30px'}} />
          <br />
          <button type="button" onClick={handleRegister} style={{ backgroundColor: '#909090', color: "#fff", borderRadius: 5, padding: '5px 10px', cursor: 'pointer' }}>회원가입</button>
        </div>
      </form>
    </div>
  );  
}


//OAuth.js
const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

export const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code';


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
            height: 570,
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
              height: 570,
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