import React from 'react';

function ContactInfo({ email, phone }) {
  return (
    <div style={{ border: '1px solid #000', borderRadius: '10px', padding: '10px', width: '500px', marginTop: '20px' }}>
      <div style={{ textAlign: 'left' }}>연락처 정보</div>
      <br /><br />
      <div style={{ textAlign: 'left' }}>이메일: {email}</div>
      <hr style={{ margin: '5px 0' }} />
      <br />
      <div style={{ textAlign: 'left' }}>휴대전화: {phone}</div>
      <hr style={{ margin: '5px 0' }} />
      <br />
    </div>
  );
}

function AddressInfo({ streetAddress, detailedAddress }) {
  return (
    <div style={{ border: '1px solid #000', borderRadius: '10px', padding: '10px', width: '500px', marginTop: '20px' }}>
      <div style={{ textAlign: 'left' }}>주소 정보</div>
      <br /><br />
      <div style={{ textAlign: 'left' }}>도로명 주소: {streetAddress}</div>
      <hr style={{ margin: '5px 0' }} />
      <br />
      <div style={{ textAlign: 'left' }}>상세 주소: {detailedAddress}</div>
      <hr style={{ margin: '5px 0' }} />
      <br />
    </div>
  );
}

function Mypage({ name, birthdate, gender, email, phone, streetAddress, detailedAddress }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50vh' }}>
      {/* 맨 위에 사용자의 이름 표시 */}
      <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>{name}님의 정보</div>

      {/* 첫 번째 섹션: 기본 정보 */}
      <div style={{ border: '1px solid #000', borderRadius: '10px', padding: '10px', width: '500px' }}>
        <div style={{ textAlign: 'left' }}>기본정보</div>
        <br /><br />
        <div style={{ textAlign: 'left' }}>이름: {name}</div>
        <hr style={{ margin: '5px 0' }} />
        <br />
        <div style={{ textAlign: 'left' }}>생년월일: {birthdate}</div>
        <hr style={{ margin: '5px 0' }} />
        <br />
        <div style={{ textAlign: 'left' }}>성별: {gender}</div>
        <hr style={{ margin: '5px 0' }} />
        <br />
      </div>

      {/* 두 번째 섹션: 연락처 정보 */}
      <ContactInfo email={email} phone={phone} />

      {/* 세 번째 섹션: 주소 정보 */}
      <AddressInfo streetAddress={streetAddress} detailedAddress={detailedAddress} />
    </div>
  );
}

export default function App() {
  // 예제 데이터
  const userData = {
    name: '김지민',
    birthdate: '2000-01-01',
    gender: '비공개',
    email: 'example@example.com',
    phone: '010-1234-5678',
    streetAddress: '서울특별시 강남구 삼성로 123',
    detailedAddress: '아파트 456동 789호',
  };

  return (
    <div style={{width:1400}}>
    <div style={{ marginTop: '5vw', marginLeft: '-7vw' }}>
      <Mypage {...userData} />
    </div>
    </div>
  );
}