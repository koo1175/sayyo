import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; // Import the CSS file

const Member = () => {
  const [members, setMembers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = (index) => {
    
    const modifiedMember = {
      id: members[index].id,
      pw: members[index].pw, // Assuming this is the property name for the password
      name: members[index].name,
      nickname: members[index].nickname,
      phone: members[index].phone,
      address: members[index].address,
      registNum: members[index].registNum,
      reports: members[index].reports,
    };

    // Add logic to handle saving changes
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/modify', modifiedMember)
      .then(response => {
        console.log('Member updated:', response.data);
        // Update the state with the modified member
        setMembers((prevMembers) => {
          const newMembers = [...prevMembers];
          newMembers[index] = modifiedMember;
          return newMembers;
        });
        // Reset edit state after saving
        setEditIndex(null);
      })
      .catch((error) => {
        console.error('Error updating Member:', error);
        // Handle error, show error message, or take appropriate action
      });
  };

  const handleCancel = () => {
    setEditIndex(null); // Reset edit state on cancel
  };

  useEffect(() => {
    // Fetch member data from the server on component mount
    axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/findAll')
      .then((response) => {
        // Assuming the response data is an array
        setMembers(response.data.list);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching member data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []); // Run only on component mount

  return (
    <div className="rounded-bg" style={{ marginTop: '100px' }}>
      <h3 className="member-heading" style={{ color: 'white' }}>회원 관리</h3>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* 검색 기능 */}
      <form style={{ marginLeft: '900px', marginTop: '-40px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <select id="myDropdown2" >
          <option value="option1">연락처</option>
          <option value="option2">이름</option>
        </select>
        <div style={{ marginLeft: '10px' }} />
        <input type="text" placeholder='' style={{ height: '13px' }} />
        <button style={{ backgroundColor: '#555454' }}>
          <img src='/img/돋보기.png' alt='돋보기' width='25px' style={{ cursor: 'pointer' }} />
        </button>
      </form>
      <table className="rounded-table" style={{ width: '1200px', marginBottom: '100px' }}>
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
              <td>{editIndex === index ? <input type="text" style={{ width: '50px' }} value={member.id} onChange={(e) => setMembers(prev => [...prev.slice(0, index), { ...prev[index], id: e.target.value }, ...prev.slice(index + 1)])} /> : member.id}</td>

              <td>{editIndex === index ? <input type="text" style={{ width: '80px' }} value={member.pw} onChange={(e) => setMembers(prev => [...prev.slice(0, index), { ...prev[index], pw: e.target.value }, ...prev.slice(index + 1)])} /> : member.pw}</td>

              <td>{editIndex === index ? <input type="text" style={{ width: '70px' }} value={member.name}  onChange={(e) => setMembers(prev => [...prev.slice(0, index), { ...prev[index], name: e.target.value }, ...prev.slice(index + 1)])} /> : member.name}</td>

              <td>{editIndex === index ? <input type="text" style={{ width: '70px' }} value={member.nickname} onChange={(e) => setMembers(prev => [...prev.slice(0, index), { ...prev[index], nickname: e.target.value }, ...prev.slice(index + 1)])} /> : member.nickname}</td>
              <td>{editIndex === index ? <input type="text" style={{ width: '150px' }} value={member.phone} onChange={(e) => setMembers(prev => [...prev.slice(0, index), { ...prev[index], phone: e.target.value }, ...prev.slice(index + 1)])} /> : member.phone}</td>
              <td>{editIndex === index ? <input type="text" style={{ width: '150px' }} value={member.address} onChange={(e) => setMembers(prev => [...prev.slice(0, index), { ...prev[index], address: e.target.value }, ...prev.slice(index + 1)])} /> : member.address}</td>

              <td>{member.registNum}</td>
              <td>{member.reports}</td>
              <td style={{ width: '120px' }}>
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
