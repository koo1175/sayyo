import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import formatDate from '../../../formatDate';
import Chat from "../../../Chat";

export default function BoardList() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const gotoWritePage = () => {
        navigate('/BoardWrite');
    };

    const [boardList, setBoardList] = useState([]);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        const fetchBoardList = () => {
            axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/memBoard/findAll')
                .then(response => {
                    // Sort the list in reverse chronological order
                    const sortedBoardList = response.data.list.sort((a, b) => new Date(b.nowDate) - new Date(a.nowDate));
                    setBoardList(sortedBoardList);
                })
                .catch(error => {
                    console.error('게시글 목록을 불러오는 중 오류 발생:', error);
                });
        };
    
        fetchBoardList();
    }, []); // 컴포넌트가 마운트될 때만 실행
    

    const handleTitleClick = (board) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post(
            'https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/memBoard/updateViews',
            { num: board.num }, // 수정: 서버로 보낼 데이터를 객체로 감싸서 전달
            config
        )
            .then(response => {
                console.log('조회수 카운팅 완료 여부:', response.data);
                navigate(`/BoardDetail/${board.num}`);
            })
            .catch(error => {
                console.error('Error incrementing view count:', error);
            });
    };
    const addPost = (newPost) => {
        setBoardList([...boardList, newPost]);
    }

    return (
        <div style={{width:1400}}>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
            <div>
                <section className="notice" >
                    <div className="page-title" >
                        <div className="container2">
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

                    <div id="board-list" >
                        <div className="container2" style={{height:'0px'}}>
                            <table className="board-table" style={{marginTop:'20px',marginLeft:'0px'}}>
                                <thead>
                                    <tr>
                                        <th scope="col" className="th-num">번호</th>
                                        <th scope="col" className="th-classfication">분류</th>
                                        <th scope="col" className="th-title">제목</th>
                                        <th scope="col" className="th-views">조회수</th>
                                        <th scope="col" className="th-date">작성일자</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boardList.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((board, index) => (
                                        <tr key={board.num}>
                                        <td>{boardList.length - index}</td>
                                        <td>{board.category}</td>
                                        <td><a href={`/BoardDetail/${board.num}`} onClick={() => handleTitleClick(board)}>
                                            {board.title}
                                        </a></td>
                                        <td>{board.views}</td>
                                        <td>{formatDate(board.nowDate)}</td>
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


                {/* 페이징 */}

                    <div className="page_wrap" style={{marginTop:'500px'}}>
                        <div className="page_nation">
                            <a className="arrow pprev" href="#!"><span className="sr-only">Previous Previous</span></a>
                            <a className="arrow prev" href="#!"><span className="sr-only">Previous</span></a>
                            <a href="#!" onClick={() => handlePageClick(1)}>1</a>
                            <a href="#!" onClick={() => handlePageClick(2)}>2</a>
                            <a href="#!" onClick={() => handlePageClick(3)}>3</a>
                            <a href="#!" onClick={() => handlePageClick(4)}>4</a>
                            <a href="#!" onClick={() => handlePageClick(5)}>5</a>
                            <a className="arrow next" href="#!"><span className="sr-only">next</span></a>
                            <a className="arrow nnext" href="#!"><span className="sr-only">next next</span></a>
                        </div>
                        <div style={{ marginBottom: '10%' }} />
                    </div>
            </div>
            <div>
                <Chat/>
            </div>
        </div>
        </div>
    );
}