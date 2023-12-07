// MemberInfoPage.js
import React from 'react';
import './style.css'; // Import the corresponding CSS file
import { useNavigate } from 'react-router-dom';

export default function MyPage () {

  const navigate = useNavigate();

  const gotoMyPageDetail = () => {
    navigate(`/MyPageDetail`);
  };

  const multiLineText = "'세요' 사이트에서는 개인정보보호정책에 따라 중요정보 접근시 회원의 비밀번호 인증 절차를 수행해야 합니다.\n\n회원정보 수정을 진행하시려면 로그인 시 입력하신 비밀번호로 인증 절차를 수행해 주시기 바랍니다.";

  return (
    <div style={{width:1400, marginTop:'170px', marginLeft:'15%'}}>
    <div className="member-info-container">
      <div className="page-title">
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: -150, fontFamily:'BookkGothic-Bd'}}>
        <h2>회원정보관리</h2>
        </div>
        <hr style={{width:950, marginLeft:-150}} />
      </div>
      <div className="section">
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: -150, marginTop:-60, fontFamily:'BookkGothic-Bd'}}>
        <h3>회원 정보 수정 - 회원 인증</h3>
        </div>
          <div className="password-box" style={{textAlign:'center', color:'white', fontWeight:'bold', fontSize:'18px', paddingTop:10, height: 40, width: 950, marginLeft:-150}}>비밀번호</div>
          <br/> 
        <div className="sub-title" style={{display: 'flex', justifyContent: 'flex-start', marginLeft: -150, fontSize:20, fontWeight:'bold'}}>비밀번호 인증</div>
      </div>

      <div className="info-box">
        <div className="policy-box" style={{ width:900, marginLeft:-150, border: '0.5px solid #d9d9d9'}}>
          <div style={{display: 'flex', justifyContent: 'flex-start', color:'#0E3B64', fontWeight:'bold', fontSize:18}}>개인정보보호정책에 따른 인증절차 강화 안내</div>
          <div style={{display: 'flex', justifyContent: 'flex-start', backgroundColor:'white', width:900, height:110, marginLeft:-20, marginTop:15, padding:20, borderTop: '0.5px solid #d9d9d9'}}>
          <div style={{whiteSpace: 'pre-wrap', textAlign:'left',}}>{multiLineText}</div>
          </div>
        </div>
        <br/>
        <div className="password-input" style={{ width:900, height:80, marginLeft:-150, border: '0.5px solid #d9d9d9', padding:20}}>        
         <div style={{marginTop:5, fontWeight:'bold'}}> 비밀번호 입력 <input type='password' style={{marginLeft:10 ,width:300, height:30, fontSize:20}}>
           </input></div>
        </div>
        <div className="button-box">
          <button className="confirm-button" onClick={gotoMyPageDetail} style={{ marginLeft:160}}>확인</button>
          <button className="cancel-button" style={{ marginLeft: 10 ,marginRight:70}}>취소</button>
        </div>
      </div>
    </div>
    </div>
  );
};

