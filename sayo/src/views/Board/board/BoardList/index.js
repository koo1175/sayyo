import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function BoardList() {
    const navigate = useNavigate();

    const gotoWritePage = () => {
        navigate('/BoardWrite');
    };

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        // 서버에서 게시글 목록을 가져오는 함수
        const fetchBoardList = async () => {
          try {
            const response = await axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/memBoard/findAll'); // API 주소를 실제 서버 주소로 변경
            setBoardList(response.data.list);
          } catch (error) {
            console.error('게시글 목록을 불러오는 중 오류 발생:', error);
          }
        };
    
        fetchBoardList();
      }, []); // 컴포넌트가 마운트될 때만 실행
    



    return (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <div>
                <div>

                    <section class="notice">
                        <div class="page-title">
                            <div class="container">
                                <h3>공지사항</h3>
                            </div>
                        </div>

                        <form style={{ marginTop: '-40px', marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <select id="myDropdown1" >
                                <option value="none">구분선택</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>

                            <select id="myDropdown2" >
                                <option value="none">제목 + 내용</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>

                            <input type="text" placeholder='' />

                            <button>
                                <img src='/img/searchIcon.png' alt='searchIcon' style={{ cursor: 'pointer' }} />
                            </button>
                        </form>

                        <div id="board-list">
                            <div class="container">
                                <table class="board-table">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="th-num">번호</th>
                                            <th scope="col" class="th-classfication">분류</th>
                                            <th scope="col" class="th-title">제목</th>
                                            <th scope="col" class="th-views">조회수</th>
                                            <th scope="col" class="th-date">작성일자</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {boardList.map(board => (
                                            <tr key={board.num}>
                                                <td>{board.num}</td>
                                                <td>{board.category}</td>
                                                <th>
                                                    <a href={`/BoardDetail/${board.num}`}>{board.title}</a>
                                                </th>
                                                <td>{board.views}</td>
                                                <td>{board.now_date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* 글쓰기 버튼 */}
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <button onClick={gotoWritePage} style={{ cursor: 'pointer' }}>
                                        <img src='/img/writeBtn.png' alt='writeBtn' width='70%' />
                                    </button>
                                </div>

                            </div>
                        </div>

                    </section>
                </div>

                {/* 페이징 */}
                <div class="page_wrap">
                    <div class="page_nation">
                        <a class="arrow pprev" href="#!"><span class="sr-only">Previous Previous</span></a>
                        <a class="arrow prev" href="#!"><span class="sr-only">Previous</span></a>
                        <a href="#!" class="active">1</a>
                        <a href="#!">2</a>
                        <a href="#!">3</a>
                        <a href="#!">4</a>
                        <a href="#!">5</a>
                        <a class="arrow next" href="#!"><span class="sr-only">next</span></a>
                        <a class="arrow nnext" href="#!"><span class="sr-only">next next</span></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
