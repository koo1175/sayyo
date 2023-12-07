import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Utils from './Utils';
import QuizForm from './QuizForm';
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
    
    const [chartData, setChartData] = useState({
        labels: Utils.months({ count: 7 }),
        datasets: [
            {
                label: '사용자 방문 현황',
                data: [1, 30, 20, 81, 56, 55, 90],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: '시장님 방문 현황',
                data: [50, 20, 40, 70, 30, 80, 60],
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
        ],
    });
    const [chartInstance, setChartInstance] = useState(null);
    const chartCanvasRef = useRef(null);
    const [chartKey, setChartKey] = useState(0);

    const toggleChartData = () => {
        setChartData((prevChartData) => {
            const newLabel = prevChartData.datasets[0].label === '방문자 현황' ? '시장님 방문 현황' : '방문자 현황';

            return {
                ...prevChartData,
                datasets: [
                    {
                        ...prevChartData.datasets[0],
                        label: newLabel,
                    },
                    {
                        ...prevChartData.datasets[1],
                        label: newLabel === '방문자 현황' ? '시장님 방문 현황' : '방문자 현황',
                    },
                ],
            };
        });
        setChartKey((prevKey) => prevKey + 1);
    };

    const [quizzes, setQuizzes] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    // 퀴즈 관리 부분의 useEffect 수정
    useEffect(() => {
        // Fetch quiz data from the server on component mount
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/question/findAll')
            .then((response) => {
                // Assuming the response data is an array
                const sortedQuizzes = response.data.list.sort((a, b) => a.id - b.id); // 정렬
                setQuizzes(sortedQuizzes);
            })
            .catch((error) => {
                console.error('Error fetching quiz data:', error);
            });
    }, []); // Run only on component mount


    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleSave = (index) => {

        const quizDto = {
            id: quizzes[index].id,
            content: quizzes[index].content,
            option1: quizzes[index].option1,
            option2: quizzes[index].option2,
            option3: quizzes[index].option3,
            option4: quizzes[index].option4,
            answer: quizzes[index].answer,
        };

        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/question/modify', quizDto)
            .then(response => {
                console.log('Quiz updated:', response.data);
                // Update the state with the modified quiz
                setQuizzes((prevQuizzes) => {
                    const newQuizzes = [...prevQuizzes];
                    newQuizzes[index] = quizDto;
                    return newQuizzes;
                });
                // Reset edit state after saving
                setEditIndex(null);
                handleCancel();
            })
            .catch((error) => {
                console.error('Error updating quiz:', error);
                console.log('id : ', quizzes[index].id);
            });
    };


    const handleCancel = () => {
        setEditIndex(null); // Reset edit state on cancel
    };

    useEffect(() => {
        const newLabels = Utils.months({ count: 7 });

        const newChartInstance = new Chart(chartCanvasRef.current, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    x: {
                        type: 'category',
                        labels: newLabels,
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        stepSize: 10,
                    },
                },
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                aspectRatio: 2,
            },
        });

        if (chartInstance) {
            chartInstance.destroy();
        }

        setChartInstance(newChartInstance);

        return () => {
            if (newChartInstance) {
                newChartInstance.destroy();
            }
        };

    }, [chartKey, chartData]);


    const [isQuizFormOpen, setQuizFormOpen] = useState(false);

    const handleQuizFormToggle = () => {
        setQuizFormOpen(!isQuizFormOpen);
    };

    const handleQuizRegister = (newQuizzes) => {
        // Add logic to update quizData with the new quizzes
        const updatedsetQuizzes = [...quizzes, ...newQuizzes];
        setQuizzes(updatedsetQuizzes);
    };

    const navigate = useNavigate();

    const goMemberPage = () => {
        navigate('/Member');
    };

    const gotoFullfillPage = () => {
        navigate('/Fullfillment');
    };

    const handleDelete = (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const idDto = {
            id: id
        };

        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/question/delete', idDto, config)
            .then(response => {
                console.log('삭제 완료 여부:', response.data);
                // TODO: 삭제가 성공적으로 이루어졌을 때 어떤 동작을 할지 추가

                // Uncomment the line below to reload the page after successful deletion
                window.location.reload();
            })
            .catch(error => {
                console.error('퀴즈 삭제 실패:', error);
                console.log('서버에서 전송된 에러 메시지:', error.response.data);

                console.log('id: ', id);
                // TODO: 삭제 실패 시 어떤 동작을 할지 추가
            });
    };

    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Fetch member data from the server on component mount
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/findAll')
            .then((response) => {
                // Assuming the response data is an array
                setMembers(response.data.list);
            })
            .catch((error) => {
                console.error('Error fetching member data:', error);
            });
    }, []); // Run only on component mount

    const handleDeleteMember = (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const idDto = {
            id: id
        };

        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/member/delete', idDto, config)
            .then(response => {
                console.log('삭제 완료 여부:', response.data);
                // TODO: 삭제가 성공적으로 이루어졌을 때 어떤 동작을 할지 추가

                // Uncomment the line below to reload the page after successful deletion
                window.location.reload();
            })
            .catch(error => {
                console.error('퀴즈 삭제 실패:', error);
                console.log('서버에서 전송된 에러 메시지:', error.response.data);

                console.log('id: ', id);
                // TODO: 삭제 실패 시 어떤 동작을 할지 추가
            });
    };

    // 회원 가나다 순 정렬 코드
    const sortedMembers = [...members].sort((a, b) => a.name.localeCompare(b.name));

    /* 이행률 리스트 */

    const [topFive, setTopFive] = useState([]);

    useEffect(() => {
        // Fetch top five data from the server
        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/topFive')
            .then(response => {
                console.log('Fulfillment data:', response.data.topFive);
                setTopFive(response.data.topFive);
            })
            .catch(error => {
                console.error('Error fetching top five data:', error);
            });
    }, []); // Run only on component mount


    const handleDeleteFullfill = (event, region) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const regionData = {
            region: region,
        };

        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/delete', regionData, config)
            .then(response => {
                console.log('삭제 완료 여부:', response.data);

                // 서버 응답에 따른 동작 추가 가능

                reloadData();
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting item:', error);
                console.log('region', region);

                // 에러에 따른 동작 추가 가능
            });
    };


    const [loading, setLoading] = useState(true);

    const reloadData = () => {
        axios
            .get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/fulfillment/topFive')
            .then(response => {
                setTopFive(response.data.list);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching top five data:', error);
                setLoading(false);
            });
    };

    return (
        <div className="rounded-bg">
            <div style={{ marginTop: '10px', marginBottom: '-150px', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                    {/* 시장 인증 관리 */}
                    <div style={{ marginBottom: '20px', marginTop: '50px', marginLeft:'-65px' }}>
                        <h3 style={{ color: 'white', fontWeight: 'bold' }}>시장 인증 관리</h3>
                        <table className="rounded-table">
                            <thead>
                                <tr>
                                    <th className="th-paper">인증서</th>
                                    <th className="th-data">인증날짜</th>
                                    <th className="th-YorN">인증여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img className="certifi-img" src="/img/인증서3.png" alt="인증서3" /></td>
                                    <td>2023-11-27 12:59</td>
                                    <td>
                                        <button className='submit-deny2'>Y</button>
                                        <button className='submit-deny2'>N</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img className="certifi-img" src="/img/seungju.png" alt="seungju" /></td>
                                    <td>2023-11-27 12:58</td>
                                    <td>
                                        <button className='submit-deny2'>Y</button>
                                        <button className='submit-deny2'>N</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img className="certifi-img" src="/img/인증서2.png" alt="인증서2" /></td>
                                    <td>2023-11-27 12:57</td>
                                    <td>
                                        <button className='submit-deny2'>Y</button>
                                        <button className='submit-deny2'>N</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img className="certifi-img" src="/img/인증서1.png" alt="인증서1" /></td>
                                    <td>2023-11-27 12:56</td>
                                    <td>
                                        <button className='submit-deny2'>Y</button>
                                        <button className='submit-deny2'>N</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img className="certifi-img" src="/img/안산시장.png" alt="안산시장" /></td>
                                    <td>2023-11-27 12:55</td>
                                    <td>
                                        <button className='submit-deny2'>Y</button>
                                        <button className='submit-deny2'>N</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div style={{ flexBasis: '40%', textAlign: 'center' }}>
                    {/* 방문자 현황 그래프 */}
                    <div style={{ marginTop: '25px', marginLeft:'-290px', marginRight:'-300px' }}>
                        <h3 style={{ color: 'white', fontWeight: 'bold' }}>방문자 현황</h3>
                        {/* React-ChartJS-2의 Line 컴포넌트 사용 */}
                        <canvas
                            ref={chartCanvasRef}
                            style={{
                                width: '700px',
                                height: '350px', // Set a fixed height
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                        />
                    </div>
                </div>


                <div style={{ flexBasis: '30%', textAlign: 'center', marginTop: '35px' }}>
                    {/* 시장 이행률 */}
                    <div style={{marginLeft:'70px', marginRight:'-5px'}}>
                        {loading && <p></p>}
                        <h3 style={{ color: 'white', fontWeight: 'bold' }}>이행률 순위</h3>
                        <table className="rounded-table">
                            <thead>
                                <tr>
                                    <th>순위</th>
                                    <th>이름</th>
                                    <th>지역</th>
                                    <th>이행률</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topFive.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.region}</td>
                                        <td>{item.fulfillment}%</td>
                                        <td>
                                            <button onClick={(e) => handleDeleteFullfill(e, item.region)} className='submit-deny2' style={{ fontSize: '15px' }}>&times;</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 차트 새로고침 버튼 */}
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', marginTop: '140px' }}>
                <button className='button-85' onClick={gotoFullfillPage} style={{ marginLeft: '0px' }}>시장 관리 </button>

                <button className='button-85' onClick={goMemberPage} style={{ marginLeft: '150px' }}>회원 관리 </button>
                <button className='button-85' onClick={toggleChartData} style={{ marginLeft: '150px' }}>Refresh Chart</button>
                <button className='button-85' onClick={handleQuizFormToggle} style={{ marginLeft: '150px' }}>퀴즈 생성 </button>

                <button className='button-85' onClick={gotoFullfillPage} style={{ marginLeft: '150px' }}>이행률 관리 </button>
            </div>

            {/* Render QuizForm as a popup if isQuizFormOpen is true */}
            {
                isQuizFormOpen && (
                    <div className="popup-overlay">
                        <QuizForm onClose={handleQuizFormToggle} onRegister={handleQuizRegister} />
                    </div>
                )
            }


            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
                <div style={{ flexBasis: '53%', textAlign: 'center', padding:'10px' }}>
                    {/* 회원 목록 */}
                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>회원 목록</p>
                    <table className="rounded-table" style={{ width: '720px', fontSize: '12px' }}>
                        <thead>
                            <tr>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>닉네임</th>
                                <th>전화번호</th>
                                <th>주소</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMembers.slice(0, 5).map((member, index) => (
                                <tr key={member.id}>
                                    <td>{member.id}</td>
                                    <td>{member.name}</td>
                                    <td>{member.nickname}</td>
                                    <td>{member.phone}</td>
                                    <td>{member.address}</td>
                                    <td>
                                        <button className='submit-deny2'onClick={() => handleDeleteMember(member.id)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ flexBasis: '55%', textAlign: 'center', marginBottom: '50px', marginTop: '-30px' }}>
                    {/* 퀴즈 관리 */}
                    <div style={{ marginBottom: '20px', marginTop: '30px', padding:'10px' }}>
                        <h3 style={{ color: 'white', fontWeight: 'bold' }}>퀴즈 관리</h3>
                        <table className="rounded-table" style={{ width: '750px', fontSize:'12px' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>퀴즈 내용</th>
                                    <th>보기 1</th>
                                    <th>보기 2</th>
                                    <th>보기 3</th>
                                    <th>보기 4</th>
                                    <th>정답</th>
                                    <th>수정</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizzes.map((quiz, index) => (
                                    <tr key={quiz.id}>
                                        <td>{editIndex === index ? <input type="text" style={{ width: '10px' }} value={quiz.id} disabled /> : quiz.id}</td>
                                        <td>{editIndex === index ? <input type="text" style={{ width: '150px' }} value={quiz.content} onChange={(e) => setQuizzes(prev => [...prev.slice(0, index), { ...prev[index], content: e.target.value }, ...prev.slice(index + 1)])} /> : quiz.content}</td>
                                        <td>{editIndex === index ? <input type="text" style={{ width: '50px' }} value={quiz.option1} onChange={(e) => setQuizzes(prev => [...prev.slice(0, index), { ...prev[index], option1: e.target.value }, ...prev.slice(index + 1)])} /> : quiz.option1}</td>
                                        <td>{editIndex === index ? <input type="text" style={{ width: '50px' }} value={quiz.option2} onChange={(e) => setQuizzes(prev => [...prev.slice(0, index), { ...prev[index], option2: e.target.value }, ...prev.slice(index + 1)])} /> : quiz.option2}</td>
                                        <td>{editIndex === index ? <input type="text" style={{ width: '50px' }} value={quiz.option3} onChange={(e) => setQuizzes(prev => [...prev.slice(0, index), { ...prev[index], option3: e.target.value }, ...prev.slice(index + 1)])} /> : quiz.option3}</td>
                                        <td>{editIndex === index ? <input type="text" style={{ width: '50px' }} value={quiz.option4} onChange={(e) => setQuizzes(prev => [...prev.slice(0, index), { ...prev[index], option4: e.target.value }, ...prev.slice(index + 1)])} /> : quiz.option4}</td>
                                        <td>{editIndex === index ? <input type="text" style={{ width: '50px' }} value={quiz.answer} onChange={(e) => setQuizzes(prev => [...prev.slice(0, index), { ...prev[index], answer: e.target.value }, ...prev.slice(index + 1)])} /> : quiz.answer}</td>
                                        <td>
                                            {editIndex === index ? (
                                                <>
                                                    <button className='submit-deny2' onClick={() => handleSave(index)}>저장</button>
                                                    <button className='submit-deny2' onClick={handleCancel}>취소</button>
                                                </>
                                            ) : (
                                                <button className='submit-deny2' onClick={() => handleEdit(index)}>수정</button>
                                            )}
                                        </td>
                                        <td>
                                            <button className='submit-deny2' onClick={() => handleDelete(quiz.id)}>삭제</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}