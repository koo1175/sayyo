import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import formatDate from '../../../formatDate';

export default function BoardDetail() {
  const navigate = useNavigate();
  const { num } = useParams(); // useParams로 URL 파라미터 추출

  const gotoBoardEdit = () => {
    navigate(`/BoardEdit/${num}`);
  };

  const gotoBoardList = () => {
    navigate('/BoardList');
  };

  const handleDelete = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // MemBoardDto 객체를 생성
    const memboardDto = {
      num: num
      // 다른 속성들도 필요에 따라 추가
    };
  
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/memBoard/delete', memboardDto, config)
      .then(response => {
        console.log("삭제 완료 여부:", response.data);
        gotoBoardList();
        alert("삭제가 정상적으로 완료되었습니다.");
        // TODO: 삭제가 성공적으로 이루어졌을 때 어떤 동작을 할지 추가
        // 예를 들어, 삭제 후 특정 페이지로 이동 등
      })
      .catch(error => {
        console.error("게시글 삭제 실패:", error);
        console.log("서버에서 전송된 에러 메시지:", error.response.data);
        // TODO: 삭제 실패 시 어떤 동작을 할지 추가
      });
  };
    

  const [boardData, setBoardData] = useState({});

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/memBoard/findAll');

        // Find the board with the matching num
        const board = response.data.list.find(item => item.num === Number(num));

        console.log(board); // 콘솔에 데이터 출력

        // 데이터를 배열로 변환하지 않고 바로 객체로 설정
        if (board) {
          setBoardData(board);
        } else {
          console.error(`Board with num ${num} not found.`);
        }
      } catch (error) {
        console.error('상세보기를 불러오는 중 오류 발생: ', error);
      }
    };

    fetchBoardDetail();
  }, [num]); // num이 변경될 때마다 다시 호출

  return (
    <div style={{ marginTop: '150px', display: 'flex', justifyContent: 'center' }}>
      <div>
        <div>
          <div id="board-list">
            <div className="container2">
              <table className="detial-board-table">
                <tbody>
                  <tr>
                    <td className="td-title" style={{ fontWeight: 'bold' }}>글 유형</td>
                    <td className="td-blank">{boardData.category}</td>
                    <td className="td-title" style={{ fontWeight: 'bold' }}>등록일</td>
                    <td className="td-blank">{formatDate(boardData.nowDate)}</td>
                  </tr>
                  <tr>
                    <td className="td-title" style={{ fontWeight: 'bold' }}>제목</td>
                    <td className="td-blank">{boardData.title}</td>
                    <td className="td-title" style={{ fontWeight: 'bold' }}>조회</td>
                    <td className="td-blank">{boardData.views}</td>
                  </tr>
                  <tr>
                    <td className="td-title" style={{ fontWeight: 'bold' }}>아이디</td>
                    <td className="td-blank" colSpan={3}>{boardData.memberId}</td>
                  </tr>
                  <tr>
                    <td className="td-title" style={{ fontWeight: 'bold' }}>내용</td>
                    <td className="td-blank" colSpan={3} style={{ whiteSpace: 'pre-wrap' }}>{boardData.content}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='board-detail-buttons'>
              <button style={{ marginTop: '10px' }} onClick={gotoBoardEdit}>
                수정
              </button>
              <button onClick={handleDelete}>
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
