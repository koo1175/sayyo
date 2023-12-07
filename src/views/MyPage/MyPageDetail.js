import React from 'react';
import './style.css'; // Import the corresponding CSS file
import { useNavigate } from 'react-router-dom';

const MyPageDetail =  () => {

  const navigate = useNavigate();

  const gotoMyPageModify = () => {
    navigate(`/MyPageModify`);
  };

  return (
    <div style={{width:1400, marginTop:'120px', marginLeft:'-75px'}}>
    <div className="member-info-container">
      <div className="page-title">
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: -150}}>
        <h2>회원정보 상세조회</h2>
        </div>
        <hr style={{width:950, marginLeft:-150}} />
      </div>
      <div className="section">
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: -150, marginTop:-70}}>
        <h3>회원정보관리</h3>
        </div>
        <div style={{marginLeft: -150}}>
        <table className='mypage-detail-table' style={{ textAlign:'left',width:950, borderTop: '1px solid #000', borderBottom: '1px solid #000'}}>
          <tr style={{borderBottom: '0.5px solid #d9d9d9'}}>
            <td style={{backgroundColor:'#F5F5F5', width:200, fontWeight:'bold'}}>이름</td>
            <td className='mypage-detail-td'style={{backgroundColor:'#fff'}}>한승주</td>
          </tr>
          <tr style={{borderBottom: '0.5px solid #d9d9d9'}}>
          <td style={{backgroundColor:'#F5F5F5', width:200, fontWeight:'bold'}}>아이디</td>
          <td className='mypage-detail-td'style={{backgroundColor:'#fff'}}>1x1x17@naver.com</td>
          </tr>
          <tr style={{borderBottom: '0.5px solid #d9d9d9', width:100}}>
          <td style={{backgroundColor:'#F5F5F5', width:200, fontWeight:'bold'}}>닉네임</td>
          <td className='mypage-detail-td'style={{backgroundColor:'#fff'}}>전설의 반지</td>
          </tr>
          <tr>
          <td style={{backgroundColor:'#F5F5F5', width:200, fontWeight:'bold'}}>휴대전화번호</td>
          <td className='mypage-detail-td'style={{backgroundColor:'#fff'}}>010-9212-3615</td>
          </tr>
        </table>
        </div>
        <div className="button-box">
          <button className="confirm-button" style={{ marginLeft:180}}>확인</button>
          <button className="cancel-button" onClick={gotoMyPageModify} style={{ marginLeft: 10 ,marginRight:90}}>수정</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyPageDetail;