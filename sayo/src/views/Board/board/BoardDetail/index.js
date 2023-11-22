import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function BoardDetail() {

    const navigate = useNavigate();

    const gotoBoardEdit=()=>{
        navigate('/BoardEdit');
    }

    return (
        <div style={{ marginTop: '150px', display: 'flex', justifyContent: 'center' }}>

            <div>
                <div>
                    <div id="board-list">
                        <div className="container">
                            <table className="detial-board-table">
                                <tr>
                                    <td className="td-title" style={{fontWeight:'bold'}}>글 유형</td>
                                    <td className="td-blank">공지</td>
                                    <td className="td-title" style={{fontWeight:'bold'}}>등록일</td>
                                    <td className="td-blank">2023-11-11 11:11</td>
                                </tr>
                                <tr>
                                    <td className="td-title" style={{fontWeight:'bold'}}>제목</td>
                                    <td className="td-blank">공지사항 제목입니다.</td>
                                    <td className="td-title" style={{fontWeight:'bold'}}>조회</td>
                                    <td className="td-blank">0</td>
                                </tr>
                                <tr>
                                    <td className="td-title" style={{fontWeight:'bold'}}>이름</td>
                                    <td className="td-blank" colSpan={3}>테스트 이름</td>
                                </tr>
                                <tr>
                                    <td className="td-title" style={{fontWeight:'bold'}}>내용</td>
                                    <td className="td-blank" colSpan={3}>
                                        안녕하세요, 회원 여러분! 최근에 시스템 업데이트가 완료되었습니다. 이번 업데이트에서는 사용자 경험을 향상시키는 다양한 기능이 추가되었습니다. 새로운 기능들을 확인하시고 편리하게 이용해 주시기 바랍니다.<br /><br />

                                        주요 업데이트 내용:<br />
                                        - 신속한 로딩 속도 향상<br />
                                        - 새로운 테마 및 컬러 스키마 추가<br />
                                        - 사용자 인터페이스 개선<br /><br />

                                        문의나 피드백이 있으시면 언제든지 연락주세요. 감사합니다!
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className='board-detail-buttons'>
                        <button style={{marginTop: '10px'}} onClick={gotoBoardEdit}>
                            수정
                        </button>
                        <button>
                            삭제
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
