import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import EmailCheck from '../../img/email-check.png';
import CheckOk from '../../img/pw-check-ok.png';
import CheckNo from '../../img/pw-check-no.png';
import './styles.css';
import NickNameData from '../Nickname/NicknameData.json'
import MakeNickname from '../../img/make_nickname.png'
import Spinner from '../../img/loading.gif'


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

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!id || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
  
    // 로그인 데이터 객체
    const loginDto = {
      id: id,
      pw: password
    };
  
    try {
      const response = await axios.post(
        'https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/login', loginDto, config
      )
  
      if (response.data) {
        alert("로그인 성공");
        sessionStorage.setItem("loginId", id);
        navigate('/');
        window.location.reload();
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error(error);
      alert("에러");
    }
  };
  
  

  return (
    <div style={{ marginTop: 200, marginLeft: -40, textAlign: 'center' }}>
      <form style={{ display: "inline" }}>
        <input type="text" placeholder='아이디' value={id} onChange={e => setId(e.target.value)} style={{ height: '30px' }} />
        <br />
        <input type="password" placeholder='비밀번호' value={password} onChange={e => setPassword(e.target.value)} style={{ height: '30px' }} />
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
  const [nickname, setNickname] = useState('');
  //주소
  const [address, setAddress] = useState('');
  const [zoneCode, setZoneCode] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState(''); 
  //주민등록번호
  const [registNumFirst, setRegistNumFirst] = useState(''); // 주민등록번호 앞자리
  const [registNumSecond, setRegistNumSecond] = useState(''); // 주민등록번호 뒷자리
  const [registNum, setRegistNum] = useState('');
  const [registNumValid, setRegistNumValid] = useState(false);
  const [registNumEntered, setRegistNumEntered] = useState(false);

  const [verificationCode, setVerificationCode] = useState('');
  const [serverCode, setServerCode] = useState('');
  const [displayCode, setDisplayCode] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  // 휴대폰 번호 유효성 상태를 저장하는 state
  const [phoneValid, setPhoneValid] = useState(false);
  //로딩
  const [loading, setLoading] = useState(false);
  const isAllFieldEntered = email && password && passwordConfirm && phone && nickname && address && zoneCode && name && registNumFirst && registNumSecond && verificationCode;
  const sessionStorage = window.sessionStorage;

  const memberDto = {
    id: email,
    pw: password,
    nickname: nickname,
    name: name,
    phone: phone,
    address: address,
    registNum: registNumFirst + registNumSecond
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const Loading = () => {
    return (
        <div>
          <img src={Spinner} alt="로딩" width="50%"/>
          <div style={{fontsize : "10px"}}>잠시만 기다려주세요.</div>
        </div>

    );
  }

  useEffect(() => {
    handleRegistNumChange();
  }, [registNumFirst, registNumSecond]);


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


  const handleComplete = (data) => {
    let fullAddress = data.address;
    let zoneCode = data.zonecode;

    setAddress(fullAddress);
    setZoneCode(zoneCode);

    setModalOpen(false); // 주소 선택 후 모달 닫기
  }

  const handleRegistNumChange = () => {
    const value = registNumFirst +'-'+ registNumSecond;
    const registNumReg = /^\d{6}-[1234]\d{6}$/; // 주민등록번호 정규 표현식
    setRegistNum(value);

    if (registNumReg.test(value)) {
      const weights = [2, 3, 4, 5, 6, 7, 0, 8, 9, 2, 3, 4, 5]; // 가중치
      let total = 0;

      for (let i = 0; i < 13; i++) { // 주민등록번호의 각 자리수와 가중치를 곱한 값을 더한다.
        if (i === 6) continue; // 7번째 자리('-' 부분)는 계산에서 제외한다.
        total += weights[i] * Number(value[i]);
      }

      const checkdigit = (11 - (total % 11)) % 10; // 11에서 더한 값의 11로 나눈 나머지를 뺀 후, 그 결과를 다시 10으로 나눈 나머지를 구한다.
      setRegistNumValid(Number(value[13]) === checkdigit); // 그 나머지와 주민등록번호의 마지막 자리수(검증코드)가 일치하는지 확인한다.
    } else {
      setRegistNumValid(false);
    }
  };
  

  //주민등록번호
  const handleRegistNumFirstChange = (e) => {
    const { value } = e.target;
    if (value.length <= 6) { // 주민등록번호 앞자리는 6자리
      setRegistNumFirst(value);
      setRegistNumEntered(value.length > 0); // 값이 있으면 registNumEntered를 true로 설정
    }
  };

  const handleRegistNumSecondChange = (e) => {
    const { value } = e.target;
    if (value.length <= 7) { // 주민등록번호 뒷자리는 7자리
      setRegistNumSecond(value);
      setRegistNumEntered(value.length > 0); // 값이 있으면 registNumEntered를 true로 설정
    }
  };



    // 닉네임을 생성하는 함수
    const generateNickName = () => {
      const determiner = NickNameData.determiners[
        Math.floor(Math.random() * NickNameData.determiners.length)
      ];
      const noun = NickNameData.noun[
        Math.floor(Math.random() * NickNameData.noun.length)
      ];
      return determiner + ' ' + noun;
    };
  
    // '닉네임 생성하기' 버튼 클릭 이벤트 핸들러
    const handleNClick = () => {
      const newNickName = generateNickName();
      setNickname(newNickName);
    };

  const emailDto = {
    email: email
  }

  const sendEmail = () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
  
    setLoading(true); // 로딩 시작
  
    axios.post('http://localhost:8083/mail', emailDto, config)
      .then((response) => {
        alert("인증번호 발송");
        setServerCode(response.data);
        setDisplayCode(true);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      })
      .finally(() => {
        setLoading(false); // 로딩 종료
      });
  };
  

  const verifyCode = () => {
    axios.post('http://localhost:8083/mail/verify', emailDto, config)
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
    axios.post('http://localhost:8083/member/regist', memberDto, config)
      .then(response => {
        alert("회원가입 성공");
        // 회원가입 성공 후 모든 상태 초기화
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setPasswordValid(false);
        setPasswordCheck(false);
        setPhone('');
        setNickname('');
        setAddress('');
        setZoneCode('');
        setName('');
        setRegistNumFirst('');
        setRegistNumSecond('');
        setRegistNum('');
        setRegistNumValid(false);
        setRegistNumEntered(false);
        setVerificationCode('');
        setServerCode('');
        setDisplayCode(false);
        setIsVerified(false);
        setPhoneValid(false);
      })
      .catch(error => {
        alert("회원가입 실패");
        console.log(error);
      })
  };

  return (
    <div style={{ marginTop: 220, marginLeft: '-200%', textAlign: 'center' }}>
    {loading ? (
      <Loading />
    ) : (
      <form onSubmit={handleRegister} style={{ display: 'inline' }}>
        {/* 이메일 인증 부분 추가 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="text" placeholder='이메일' value={email} onChange={handleEmailChange} style={{ height: '30px', marginTop: '10px', marginLeft: '60px' }} />
            <button type="button" className={`authButton ${isVerified ? 'authVerified' : ''}`} style={{ marginTop: '5px' }} onClick={sendEmail}>인증</button>
          </div>
          <br />
          {displayCode && (
            <div>
              <input 
                type="text" 
                placeholder='인증번호 입력' 
                value={verificationCode} 
                onChange={handleVerificationCodeChange} 
                disabled={isVerified} 
                style={{ 
                  height: '30px', 
                  marginLeft: isVerified ? '30px' : '60px' // 여기를 수정했습니다. 
                }} 
              />
              {isVerified && <img src={EmailCheck} height={20} width={20} style={{ marginLeft: '10px' }} />}
              {!isVerified && <button type="button" className={`authButton ${isVerified ? 'authVerified' : ''}`} onClick={verifyCode}>확인</button>}
            </div>
          )}
          <br />
          <input type="password" placeholder='비밀번호' value={password} onChange={handlePasswordChange} style={{ height: '30px' }} />
          <div style={{ fontSize: '0.8em', marginLeft: '7px' }}>
            {passwordValid ? '유효한 비밀번호입니다.' : '6자리 이상, 특수문자 1개 이상을 포함해야 합니다.'}
          </div>
          <br />
          <div>
            <input type="password" placeholder='비밀번호 확인' value={passwordConfirm} onChange={handlePasswordConfirmChange} style={{ height: '30px', marginLeft: '30px' }} />
            {passwordCheck && <img src={CheckOk} height={20} width={20} style={{ marginLeft: '10px' }} />} {/* 비밀번호 일치 시 이미지 */}
            {!passwordCheck && <img src={CheckNo} height={20} width={20} style={{ marginLeft: '5px' }} />} {/* 비밀번호 불일치 시 이미지 */}
            <div style={{ fontSize: '0.8em' }}>
              {passwordCheck ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
            </div>
          </div>
          <br />
          <input type="text" placeholder='이름' onChange={e => setName(e.target.value)} style={{ height: '30px' }} />
          <br />
          <div>
            <input type="text" placeholder='닉네임' value={nickname} style={{height: '30px', marginLeft: '30px'}} />
            <img src={MakeNickname} onClick={handleNClick} height={20} width={20} style={{marginLeft: '10px'}} />
          </div>
          <br />
          <div>
            <input type="text" placeholder='전화번호' value={phone} onChange={handlePhoneChange} style={{ height: '30px', marginLeft: '30px' }} />
            {phoneValid && <img src={CheckOk} height={20} width={20} style={{ marginLeft: '10px' }} />} {/* 전화번호 형식 일치 시 이미지 */}
            {!phoneValid && <img src={CheckNo} height={20} width={20} style={{ marginLeft: '5px' }} />} {/* 전화번호 형식 불일치 시 이미지 */}
            <div style={{ fontSize: '0.8em' }}>
              {phoneValid ? '유효한 전화번호입니다.' : '전화번호 형식이 잘못되었습니다. (예: 010-0000-0000)'}
            </div>
          </div>
          <br />
          <div>
          <input type="text" placeholder='주소' value={address} onChange={e => setAddress(e.target.value)} readOnly style={{ height: '30px', marginLeft: '60px' }} />
            <button type="button" onClick={() => setModalOpen(true)} className={`authButton ${isVerified ? 'authVerified' : ''}`}>검색</button>
          </div>
          <br />
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)', // 반투명한 배경
              },
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '500px', // DaumPostcode의 크기에 맞게 조정
                height: '500px', // DaumPostcode의 크기에 맞게 조정
              }
            }}
          >
            <DaumPostcode onComplete={handleComplete} width="100%" height="100%" />
          </Modal>
          <div>
            <input type="text" placeholder='주민등록번호 앞자리' value={registNumFirst} onChange={handleRegistNumFirstChange} maxLength={6} style={{ height: '30px', width: '80px', marginLeft: '25px' }} />
            -
            <input type="password" placeholder='주민등록번호 뒷자리' value={registNumSecond} onChange={handleRegistNumSecondChange} maxLength={7} style={{ height: '30px', width: '80px', marginLeft: '0px' }} />
            {registNumValid ? <img src={CheckOk} height={20} width={20} style={{ marginLeft: '10px' }} /> : <img src={CheckNo} height={20} width={20} style={{ marginLeft: '5px' }} />} 
          </div>
          <div style={{ fontSize: '0.8em', marginLeft: '17px' }}>
            {registNumValid ? '유효한 주민등록번호입니다.' : '주민등록번호 형식이 잘못되었습니다. (예: 123456-1234567)'}
          </div>
        </div>
        <br />
        <button type="button" onClick={handleRegister} className={`authButton ${isVerified ? 'authVerified' : ''}`} disabled={!isAllFieldEntered}>회원가입</button>
      </form>
      )}
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
      from: { x: isLogin ? 170 : 555 },
      to: { x: isLogin ? 555 : 170 },
      onRest: () => {
        setIsLogin((prev) => !prev);
      },
    });
  };


  return (
    <div style={{ position: 'relative', marginTop: '-150px', transform: 'scale(1.2)', marginLeft: '33%' }}>

      {/* White form in front of the gray square */}
      <animated.div
        style={{
          position: 'realtive',
          width: 770,
          height: 645,
          margin: '350px 0 0 0px', // Adjust position to center inside the gray square
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
          borderRadius: 30,
        }}
      >
        <div style={{ position: 'absolute', top: '30%', left: '47%', transform: 'translate(-50%, -50%)', fontSize: '1em' }}>
          {/* Render registration form if isLogin is false */}
          {isLogin && <LoginForm />}
          {!isLogin && <RegisterForm />}
        </div>

        {/* Gray animated square */}
        <animated.div
          onClick={handleClick}
          style={{
            width: 385,
            height: 645,
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
      <button onClick={handleClick} style={{ marginTop: 8, marginLeft: 20, cursor: 'pointer' }}>
        {isLogin ? '회원가입 하러가기' : '로그인 하러가기'}
      </button>
    </div>
  );
}