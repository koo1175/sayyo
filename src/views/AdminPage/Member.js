import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Member = () => {
  const [members, setMembers] = useState([]);
  const [searchOption, setSearchOption] = useState('option1'); // Default to '닉네임'
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const gotoBack = () => {
    navigate('/AdminPage');
  };

  const maskSSN = (ssn) => {
    // Assuming ssn is a string
    const maskedSSN = ssn.slice(0, -6) + '******';
    return maskedSSN;
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearch = () => {
    const endpoint = searchOption === 'option1' ? 'findSearch' : 'findSearchById';

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const searchKeyword = {
      nickname: searchValue,
    };

    axios.post(`https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/${endpoint}`, searchKeyword, config)
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('Error fetching member data:', error);
      });
  };

  const handleDelete = (id) => {
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/delete', { id })
      .then(response => {
        console.log('Member deleted:', response.data);
        setMembers((prevMembers) => prevMembers.filter(member => member.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting Member:', error);
      });
  };

  useEffect(() => {
    axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/findAll')
      .then((response) => {
        const sortedMembers = response.data.list.sort((a, b) => a.name.localeCompare(b.name));
        setMembers(sortedMembers);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching member data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="rounded-bg" style={{ marginTop: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 className="member-heading" style={{ flexBasis: '30%', color: 'white', marginLeft: '600px' }}>회원 관리</h3>

        {loading && <p>Loading...</p>}

        <div style={{ flexBasis: '50%' }}>
          <button onClick={gotoBack} style={{ marginTop: '20px', backgroundColor: '#555454', color: '#fff', marginLeft: '300px' }}>
            <img src='/img/뒤로가기.png' alt='뒤로가기' width='20px' />
          </button>
        </div>
      </div>

      <div>
        <form style={{ display: 'flex', alignItems: 'center', marginLeft: '1180px', marginRight: '500px' }}>
          <select id="findSearch" onChange={handleSearchOptionChange} value={searchOption}>
            <option value="option1">닉네임</option>
            <option value="option2">아이디</option>
          </select>
          <div style={{ marginLeft: '10px' }} />
          <input
            type="text"
            placeholder={searchOption === 'option1' ? '닉네임 입력' : '아이디 입력'}
            style={{ height: '13px' }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button style={{ backgroundColor: '#555454' }} onClick={handleSearch}>
            <img src='/img/돋보기.png' alt='돋보기' width='25px' style={{ cursor: 'pointer' }} />
          </button>
        </form>
      </div>

      {members.length > 0 ? (
        <table className="rounded-table" style={{ width: '1400px', marginBottom: '100px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>닉네임</th>
              <th>연락처</th>
              <th>주소</th>
              <th>주민등록번호</th>
              <th>신고</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.nickname}</td>
                <td>{member.phone}</td>
                <td>{member.address}</td>
                <td>{maskSSN(member.registNum)}</td>
                <td>{member.reports}</td>
                <td>
                  <button className='submit-deny2' onClick={() => handleDelete(member.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {searchValue ? (
            <p>No matching members found.</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}

    </div>
  );
};

export default Member;
