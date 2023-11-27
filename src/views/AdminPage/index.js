import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Utils from './Utils';
import QuizForm from './QuizForm';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
    const [chartData, setChartData] = useState({
        labels: Utils.months({ count: 7 }),
        datasets: [
            {
                label: '방문자 현황',
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

    // 퀴즈 데이터
    const [quizData, setQuizData] = useState([
        {
            createDate: '23-11-27 12:59',
            quizContent: '한국 국회 의원의 임기는?',
            option1: '4년',
            option2: '5년',
            option3: '6년',
            option4: '7년',
            correctAnswer: '4년',
        },
        {
            createDate: '23-11-27 12:45',
            quizContent: '한국 대통령의 임기는?',
            option1: '4년',
            option2: '5년',
            option3: '6년',
            option4: '7년',
            correctAnswer: '5년',
        },
        {
            createDate: '23-11-27 12:40',
            quizContent: '한국 정부의 국가원수는?',
            option1: '대통령',
            option2: '국회의장',
            option3: '총리',
            option4: '헌법재판소장',
            correctAnswer: '대통령',
        },
        {
            createDate: '23-11-27 12:36',
            quizContent: '한국 헌법이 제정된 연도는?',
            option1: '1932',
            option2: '1948',
            option3: '1956',
            option4: '1977',
            correctAnswer: '1948',
        },
        {
            createDate: '23-11-27 12:59',
            quizContent: '한국 국회의 의석 수는?',
            option1: '100',
            option2: '200',
            option3: '300',
            option4: '400',
            correctAnswer: '300',
        },
    ]);

    const [editMode, setEditMode] = useState(false);
    const [editedRow, setEditedRow] = useState({
        createDate: '',
        quizContent: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: '',
    });

    const handleEditClick = (row) => {
        setEditedRow(row);
        setEditMode(true);
    };
    
    const handleSaveClick = () => {
        // Add logic to save the edited information to quizData
        const updatedQuizData = quizData.map((row) =>
            row === editedRow ? { ...row, ...editedRow } : row
        );
    
        // Update the quizData state with the edited information
        setQuizData(updatedQuizData);
    
        // Set editMode to false
        setEditMode(false);
    };
    

    const handleCancelClick = () => {
        setEditMode(false);
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
    const updatedQuizData = [...quizData, ...newQuizzes];
    setQuizData(updatedQuizData);
  };

  const navigate = useNavigate();

  const goMemberPage = () => {
    navigate('/Member');
};

    return (
        <div className="rounded-bg">
            <div style={{ marginTop: '10px', marginBottom: '-150px', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                    {/* 시장 인증 관리 */}
                    <div style={{ marginBottom: '20px', marginTop: '50px' }}>
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


                <div style={{ flexBasis: '30%', textAlign: 'center' }}>
                    {/* 방문자 현황 그래프 */}
                    <div style={{ marginTop: '25px' }}>
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


                <div style={{ flexBasis: '30%', textAlign: 'center', marginTop: '50px' }}>
                    {/* 시장 이행률 */}
                    <div>
                        <h3 style={{ color: 'white', fontWeight: 'bold' }}>이행률 순위</h3>
                        <table className="rounded-table">
                            <thead>
                                <tr>
                                    <th className="th-no">순위</th>
                                    <th className="th-name">이름</th>
                                    <th className="th-region">지역</th>
                                    <th className="th-percentage">이행률</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>김관용</td>
                                    <td>경북</td>
                                    <td>80.5%</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>박원순</td>
                                    <td>서울</td>
                                    <td>80.3%</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>박준영</td>
                                    <td>경북</td>
                                    <td>80.0%</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>염홍철</td>
                                    <td>대전</td>
                                    <td>76.6%</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>강운태</td>
                                    <td>광주</td>
                                    <td>75.9%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 차트 새로고침 버튼 */}
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', marginTop: '140px' }}>
                <button className='refresh-chart btn-0' onClick={goMemberPage} style={{ marginLeft: '0px' }}>회원 관리 </button>
                <button className='refresh-chart btn-0' onClick={toggleChartData} style={{ marginLeft: '150px' }}>Refresh Chart</button>
                <button className='refresh-chart btn-0' onClick={handleQuizFormToggle} style={{ marginLeft: '150px' }}>퀴즈 생성 </button>
            </div>

{/* Render QuizForm as a popup if isQuizFormOpen is true */}
{isQuizFormOpen && (
        <div className="popup-overlay">
          <QuizForm onClose={handleQuizFormToggle} onRegister={handleQuizRegister} />
        </div>
      )}


            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
                <div style={{ flexBasis: '53%', textAlign: 'center' }}>
                    {/* 회원 승인 */}
                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>회원 승인</p>
                    <table className="rounded-table" style={{ width: '850px' }}>
                        <thead>
                            <tr>
                                <th>회원가입 신청 일자</th>
                                <th>아이디</th>
                                <th>닉네임</th>
                                <th>전화번호</th>
                                <th>주민등록번호</th>
                                <th>주소</th>
                                <th>승인</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023-11-27 20:39:10</td>
                                <td>1x1x17</td>
                                <td>닉닉</td>
                                <td>010-1111-1111</td>
                                <td>201111-2077777</td>
                                <td>경북</td>
                                <td>
                                    <button className='submit-deny'>승인</button>
                                </td>
                                <td>
                                    <button className='submit-deny'>거절</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2023-11-27 20:39:00</td>
                                <td>2x2x27</td>
                                <td>믹믹</td>
                                <td>010-1111-2222</td>
                                <td>202222-2077777</td>
                                <td>광주</td>
                                <td>
                                    <button className='submit-deny'>승인</button>
                                </td>
                                <td>
                                    <button className='submit-deny'>거절</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2023-11-27 20:20:50</td>
                                <td>3x3x37</td>
                                <td>긱긱</td>
                                <td>010-1111-3333</td>
                                <td>2033333-2077777</td>
                                <td>경북</td>
                                <td>
                                    <button className='submit-deny'>승인</button>
                                </td>
                                <td>
                                    <button className='submit-deny'>거절</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2023-11-27 20:10:24</td>
                                <td>4x4x47</td>
                                <td>틱틱</td>
                                <td>010-1111-4444</td>
                                <td>204444-2077777</td>
                                <td>수원</td>
                                <td>
                                    <button className='submit-deny'>승인</button>
                                </td>
                                <td>
                                    <button className='submit-deny'>거절</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2023-11-27 20:00:13</td>
                                <td>5X5X57</td>
                                <td>픽픽</td>
                                <td>010-1111-5555</td>
                                <td>2055555-2077777</td>
                                <td>서울</td>
                                <td>
                                    <button className='submit-deny'>승인</button>
                                </td>
                                <td>
                                    <button className='submit-deny'>거절</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ flexBasis: '55%', textAlign: 'center', marginBottom: '50px', marginTop: '-30px' }}>
                    {/* 퀴즈 관리 */}
                    <div style={{ marginBottom: '20px', marginTop: '50px' }}>
                        <h3 style={{ color: 'white', fontWeight: 'bold' }}>퀴즈 관리</h3>
                        <table className="rounded-table" style={{ width: '900px' }}>
                            <thead>
                                <tr>
                                    <th>생성 일자</th>
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
                                {quizData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{editMode ? <input type="text" placeholder={editedRow.createDate} style={{width:'110px'}} /> : row.createDate}</td>
                                        <td>{editMode ? <input type="text" placeholder={editedRow.quizContent} style={{width:'150px'}} /> : row.quizContent}</td>
                                        <td>{editMode ? <input type="text" placeholder={editedRow.option1} style={{width:'50px'}} /> : row.option1}</td>
                                        <td>{editMode ? <input type="text" placeholder={editedRow.option2} style={{width:'50px'}} /> : row.option2}</td>
                                        <td>{editMode ? <input type="text" placeholder={editedRow.option3} style={{width:'50px'}} /> : row.option3}</td>
                                        <td>{editMode ? <input type="text" placeholder={editedRow.option4} style={{width:'50px'}} /> : row.option4}</td>
                                        <td>{editMode ? <input type="text" placeholder={editedRow.correctAnswer} style={{width:'50px'}} /> : row.correctAnswer}</td>
                                        <td>
                                            {editMode ? (
                                                <>
                                                    <button className='submit-deny2' onClick={handleSaveClick}>저장</button>
                                                    <button className='submit-deny2' onClick={handleCancelClick}>취소</button>
                                                </>
                                            ) : (
                                                <button className='submit-deny2' onClick={() => handleEditClick(row)}>수정</button>
                                            )}
                                        </td>
                                        <td>
                                            <button className='submit-deny2'>삭제</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
