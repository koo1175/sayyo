import React, { useState } from 'react';
import axios from 'axios';

const initialFulfill = {
  name: '',
  region: '',
  planNum: '',
  completeNum: '',
  tryNum: '',
  regionDev: '',
};

const FulfillForm = ({ onClose, onRegister, reloadData }) => {
  const [fulfills, setFulfills] = useState([initialFulfill]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFulfills = [...fulfills];
    newFulfills[index][name] = value;
    setFulfills(newFulfills);
  };

  const handleAddFulfillSet = () => {
    setFulfills((prevFulfills) => [...prevFulfills, { ...initialFulfill }]);
  };

  const handleRemoveFulfillSet = (index) => {
    const newFulfills = [...fulfills];
    newFulfills.splice(index, 1);
    setFulfills(newFulfills);
  };

  const handleRegister = () => {
    // Check if any input field is empty in any Fulfill set
    if (fulfills.some((fulfill) => Object.values(fulfill).some((value) => value.trim() === ''))) {
      alert('항목을 모두 작성해 주세요.');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 각 이행률 셋트별로 서버에 요청을 보냄
    const registerPromises = fulfills.map((fulfill) => {
      // 이행률 데이터를 서버에 전송하기 위해 필요한 DTO 형식으로 변환
      const fulfillDto = {
        name: fulfill.name,
        region: fulfill.region,
        planNum: fulfill.planNum,
        completeNum: fulfill.completeNum,
        tryNum: fulfill.tryNum,
        regionDev: fulfill.regionDev,
      };

      // 각 이행률 셋트별로 서버에 요청을 보내는 Promise 반환
      return axios.post(
        'https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/regist',
        fulfillDto,
        config
      );
    });

    // 모든 서버 요청이 성공적으로 완료되면 onRegister와 onClose를 호출
    Promise.all(registerPromises)
      .then((responses) => {
        console.log('등록 결과:', responses.map((response) => response.data));

        // 이행률 등록이 성공적으로 이루어졌을 때 어떤 동작을 할지 추가
        // 예를 들어, 성공 알림 표시 등

        // 이행률 등록을 부모 컴포넌트로 전달
        onRegister(fulfills);
        reloadData();
        onClose();
      })
      .catch((error) => {
        console.error('등록 실패:', error);
        alert('등록 실패');
        // TODO: 이행률 등록 실패 시 어떤 동작을 할지 추가
        // 예를 들어, 실패 알림 표시 등
        console.log('Fulfills', fulfills);
      });
  };

  return (
    <div className="quiz-form" style={{ border: '1px', borderRadius: '5px', borderColor: 'white' }}>
      <h4 style={{ color: 'white' }}>새로운 항목 추가</h4>
      {fulfills.map((fulfill, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '15px', marginRight: '10px', color: 'white' }}>이름:</label>
          <input
            type="text"
            name="name"
            style={{ width: '50px' }}
            value={fulfill.name}
            onChange={(e) => handleInputChange(index, e)}
          />
          <label style={{ fontSize: '15px', marginRight: '10px', color: 'white' }}>지역:</label>
          <input
            type="text"
            name="region"
            style={{ width: '50px' }}
            value={fulfill.region}
            onChange={(e) => handleInputChange(index, e)}
          />
          <label style={{ fontSize: '15px', marginRight: '10px', color: 'white' }}>공약 수:</label>
          <input type="text" name="planNum" style={{ width: '50px' }} value={fulfill.planNum} onChange={(e) => handleInputChange(index, e)} />
          <label style={{ fontSize: '15px', marginRight: '10px', color: 'white' }}>완료:</label>
          <input type="text" name="completeNum" style={{ width: '50px' }} value={fulfill.completeNum} onChange={(e) => handleInputChange(index, e)} />
          <label style={{ fontSize: '15px', marginRight: '10px', color: 'white' }}>시행 중:</label>
          <input type="text" name="tryNum" style={{ width: '50px' }} value={fulfill.tryNum} onChange={(e) => handleInputChange(index, e)} />
          <label style={{ fontSize: '15px', marginRight: '10px', color: 'white' }}>발전도:</label>
          <input type="text" name="regionDev" style={{ width: '50px' }} value={fulfill.regionDev} onChange={(e) => handleInputChange(index, e)} />

          <button
            className="submit-deny3"
            onClick={() => handleRemoveFulfillSet(index)}
            style={{ marginLeft: '10px' }}
          >
            ㅡ
          </button>
        </div>
      ))}
      {fulfills.length < 5 && (
        <button className="submit-deny3" onClick={handleAddFulfillSet} style={{ marginLeft: '15px' }}>
          정보 추가
        </button>
      )}
      <button className="submit-deny3" onClick={handleRegister} style={{ marginLeft: '15px' }}>
        등록
      </button>
      <button className="submit-deny3" onClick={onClose} style={{ marginLeft: '15px' }}>
        취소
      </button>
    </div>
  );
};

export default FulfillForm;
