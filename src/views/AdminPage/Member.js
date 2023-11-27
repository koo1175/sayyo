// Member.js

import React, { useState } from 'react';
import './style.css'; // Import the CSS file

const generateDummyMembers = () => {
  const dummyMembers = [];

  for (let i = 0; i < 10; i++) {
    dummyMembers.push({
      id: `user${i + 1}`,
      password: '********',
      name: `User ${i + 1}`,
      nickname: `Nick${i + 1}`,
      phoneNumber: '010-1234-5678',
      address: 'Some Address',
      residentNumber: 'YYYYMMDD-1234567',
      report: 0,
    });
  }

  return dummyMembers;
};

const Member = () => {
  const [members, setMembers] = useState(generateDummyMembers());
  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = (index) => {
    // Add logic to handle saving changes
    // For now, let's just log a message to the console
    console.log(`User ${members[index].id} saved changes`);
    setEditIndex(null); // Reset edit state after saving
  };

  const handleCancel = () => {
    setEditIndex(null); // Reset edit state on cancel
  };

  return (
    <div className="rounded-bg" style={{marginTop:'100px'}}>
      <h3 className="member-heading" style={{color:'white'}}>회원 관리</h3>
      
      {/* 검색 기능 */}
      <form style={{ marginLeft:'900px',marginTop: '-40px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <select id="myDropdown2" >
                                <option value="none">연락처</option>
                                <option value="option2">010</option>

                            </select>
                            <div style={{marginLeft:'10px'}}/>
                            <input type="text" placeholder='' style={{height:'13px'}}/>

                            <button style={{backgroundColor:'#555454'}}>
                                <img src='/img/돋보기.png' alt='돋보기' width='25px' style={{ cursor: 'pointer' }} />
                            </button>
                        </form>
      <table className="rounded-table" style={{ width: '1200px', marginBottom:'100px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>PW</th>
            <th>이름</th>
            <th>닉네임</th>
            <th>연락처</th>
            <th>주소</th>
            <th>주민등록번호</th>
            <th>신고</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{editIndex === index ? <input type="text" style={{width:'50px'}} placeholder={member.id} /> : member.id}</td>
              <td>{editIndex === index ? <input type="text" style={{width:'80px'}} placeholder={member.password} /> : member.password}</td>
              <td>{editIndex === index ? <input type="text" style={{width:'70px'}} placeholder={member.name} /> : member.name}</td>
              <td>{editIndex === index ? <input type="text" style={{width:'70px'}} placeholder={member.nickname} /> : member.nickname}</td>
              <td>{editIndex === index ? <input type="text" style={{width:'150px'}} placeholder={member.phoneNumber} /> : member.phoneNumber}</td>
              <td>{editIndex === index ? <input type="text" style={{width:'150px'}} placeholder={member.address} /> : member.address}</td>
              <td>{editIndex === index ? <input type="text" style={{width:'150px'}} placeholder={member.residentNumber} /> : member.residentNumber}</td>
              <td>{member.report}</td>
              <td style={{width:'120px'}}>
                {editIndex === index ? (
                  <>
                    <button className='submit-deny2' onClick={() => handleSave(index)}>저장</button>
                    <button className='submit-deny2' onClick={handleCancel}>취소</button>
                  </>
                ) : (
                  <button className='submit-deny2' onClick={() => handleEdit(index)}>수정</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Member;
