import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function BoardList() {
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');

    const handleSelectChange = (event, selectNumber) => {
        const value = event.target.value;

        switch (selectNumber) {
            case 1:
                setSelectedOption1(value);
                break;
            case 2:
                setSelectedOption2(value);
                break;
            default:
                break;
        }
    };

    const navigate = useNavigate();

    const gotoWritePage = () => {
        navigate('/BoardAdd');
    };


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
                            <select id="myDropdown1" value={selectedOption1} onChange={(e) => handleSelectChange(e, 1)}>
                                <option value="none">구분선택</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>

                            <select id="myDropdown2" value={selectedOption2} onChange={(e) => handleSelectChange(e, 2)}>
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
                                        <tr>
                                            <td>3</td>
                                            <td>공지</td>
                                            <th>
                                                <a href="#!">[공지사항] 개인정보 처리방침 변경안내처리방침</a>
                                                <p>테스트</p>
                                            </th>
                                            <td>14023</td>
                                            <td>14:23</td>
                                        </tr>

                                        <tr>
                                            <td>2</td>
                                            <td>공지</td>
                                            <th><a href="#!">공지사항 안내입니다. 이용해주셔서 감사합니다</a></th>
                                            <td>123</td>
                                            <td>09:30</td>
                                        </tr>

                                        <tr>
                                            <td>1</td>
                                            <td>공지</td>
                                            <th><a href="#!">공지사항 안내입니다. 이용해주셔서 감사합니다</a></th>
                                            <td>11111</td>
                                            <td>2023.11.11</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* 글쓰기 버튼 */}
                                <div style={{marginTop:'20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <button onClick={gotoWritePage} style={{cursor:'pointer'}}>
                                        <img src='/img/writeBtn.png' alt='writeBtn' width='70%'/>
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
