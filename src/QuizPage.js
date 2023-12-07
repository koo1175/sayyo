import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { animated, useSpring } from 'react-spring'; // 추가: react-spring 라이브러리 import
import { Link, useNavigate } from 'react-router-dom';


export default function QuizPage() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0); //현재 문제 변수
    const [message, setMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState(null); //보기 선택 변수
    const [checked, setChecked] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [disableOptions, setDisableOptions] = useState(false); // 보기 활성화 여부를 관리하는 상태 변수
    const [timer, setTimer] = useState(10); // 타이머 상태 변수
    const intervalRef = useRef(); // setInterval 함수의 id를 저장하기 위한 ref 변수
    const [reset, setReset] = useState(false); //애니메이션 재설정을 위한 상태 변수
    const [correctCount, setCorrectCount] = useState(0); // 맞춘 문제의 개수를 저장하는 상태 변수
    const navigate = useNavigate();
    // 추가: react-spring 애니메이션 설정
    const styles = useSpring({
        from: { width: '100%' },
        to: { width: '0%' },
        config: { duration: timer * 1000 }, // 변경: duration을 timer 상태에 따라 설정
        reset: reset, // 변경: reset 속성을 상태 변수로 설정
    });
    useEffect(() => {
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/question/findAll')
            .then(response => {
                setQuestions(response.data.list);
                console.log(response.data.list);
            })
            .catch(error => console.error('Error:', error));
    }, []);
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000); // 1초마다 타이머 상태를 갱신

        return () => {
            clearInterval(intervalRef.current);
        }; // 컴포넌트 unmount 시에 타이머 종료
    }, [currentQuestion]);

    useEffect(() => {
        if (timer <= 0) {
            clearInterval(intervalRef.current); // 타이머가 0이 되면 타이머 종료 
            checkAnswer(); // 타이머가 0이 되면 자동으로 정답 확인
        }
    }, [timer]);

    useEffect(() => {
        setReset(true);
        setTimeout(() => setReset(false), 0);
    }, [currentQuestion]);

    const selectOption = (option) => {
        if (!disableOptions) { // 추가: 보기가 활성화되어 있는 경우에만 선택 가능
            setSelectedOption(option);
        }
    };

    const checkAnswer = () => {
        if (!checked) {
            setChecked(true);
            setDisableOptions(true); // '정답 확인하기' 버튼을 누르면 보기를 비활성화
            clearInterval(intervalRef.current); // 정답 확인 시에 타이머 종료
            setTimer(0); // '정답 확인하기' 버튼을 누르면 타이머를 0으로 설정
            console.log('checkAnswer실행 :', correctCount);

            if (selectedOption === questions[currentQuestion].answer) {
                setMessage(questions[currentQuestion].comment);
                setCorrect(true);
                setCorrectCount(prevCount => prevCount + 1);  // 맞춘 문제의 개수 1 증가

            } else {
                setMessage(questions[currentQuestion].comment);
                setCorrect(false);
            }
        }
    };

    const nextQuestion = () => {
        setChecked(false);
        setCorrect(false);
        setDisableOptions(false); // 추가: 다음 문제로 넘어가면 보기를 다시 활성화
        setTimer(10); // 다음 문제로 넘어갈 때 타이머를 30초로 초기화
        console.log('nextQuestion실행:', correctCount);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setMessage('');
        } else {
            navigate("/QuizResult", { state: { correctCount: correctCount } });

        }
    };

    return (
        <div style={{ marginTop: '150px' }}>
            <h1>{currentQuestion + 1}/10</h1> {/* 수정: 문제 번호와 타이머 추가 */}
            <animated.div style={{ ...styles, height: 5, backgroundColor: 'blue' }} /> {/* 추가: 애니메이션 적용 요소 */}

            <h1>{questions[currentQuestion]?.content}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px' }}>
                <div onClick={() => selectOption(questions[currentQuestion]?.option1)} style={{ height: '200px', width: '300px', backgroundColor: '#02ABB0', borderRadius: '10px', margin: '10px', color: 'white', fontSize: '40px', position: 'relative' }}>
                    <p style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'calc(10px + 2vmin)', }}>{questions[currentQuestion]?.option1}</p>
                    {checked ? (questions[currentQuestion]?.option1 === questions[currentQuestion]?.answer ? <img src="img/circle.png" alt="circle" style={{ position: 'absolute', top: 5, right: 5 }} /> : (selectedOption === questions[currentQuestion]?.option1 ? <img src="img/cross.png" alt="cross" style={{ position: 'absolute', top: 5, right: 5 }} /> : null)) : (selectedOption === questions[currentQuestion]?.option1 ? <img src="img/check.png" alt="check" style={{ position: 'absolute', top: 5, right: 5 }} /> : null)}
                </div>
                <div onClick={() => selectOption(questions[currentQuestion]?.option2)} style={{ height: '200px', width: '300px', backgroundColor: '#318CFF', borderRadius: '10px', margin: '10px', color: 'white', fontSize: '40px', position: 'relative' }}>
                    <p style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'calc(10px + 2vmin)', }}>{questions[currentQuestion]?.option2}</p>
                    {checked ? (questions[currentQuestion]?.option2 === questions[currentQuestion]?.answer ? <img src="img/circle.png" alt="circle" style={{ position: 'absolute', top: 5, right: 5 }} /> : (selectedOption === questions[currentQuestion]?.option2 ? <img src="img/cross.png" alt="cross" style={{ position: 'absolute', top: 5, right: 5 }} /> : null)) : (selectedOption === questions[currentQuestion]?.option2 ? <img src="img/check.png" alt="check" style={{ position: 'absolute', top: 5, right: 5 }} /> : null)}
                </div>
                <div onClick={() => selectOption(questions[currentQuestion]?.option3)} style={{ height: '200px', width: '300px', backgroundColor: '#F8AC59', borderRadius: '10px', margin: '10px', color: 'white', fontSize: '40px', position: 'relative' }}>
                    <p style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'calc(10px + 2vmin)', }}>{questions[currentQuestion]?.option3}</p>
                    {checked ? (questions[currentQuestion]?.option3 === questions[currentQuestion]?.answer ? <img src="img/circle.png" alt="circle" style={{ position: 'absolute', top: 5, right: 5 }} /> : (selectedOption === questions[currentQuestion]?.option3 ? <img src="img/cross.png" alt="cross" style={{ position: 'absolute', top: 5, right: 5 }} /> : null)) : (selectedOption === questions[currentQuestion]?.option3 ? <img src="img/check.png" alt="check" style={{ position: 'absolute', top: 5, right:5 }} /> : null)}
                </div>
                <div onClick={() => selectOption(questions[currentQuestion]?.option4)} style={{ height: '200px', width: '300px', backgroundColor: '#ED5565', borderRadius: '10px', margin: '10px', color: 'white', fontSize: '40px', position: 'relative' }}>
                    <p style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'calc(10px + 2vmin)', }}>{questions[currentQuestion]?.option4}</p>
                    {checked ? (questions[currentQuestion]?.option4 === questions[currentQuestion]?.answer ? <img src="img/circle.png" alt="circle" style={{ position: 'absolute', top: 5, right: 5 }} /> : (selectedOption === questions[currentQuestion]?.option4 ? <img src="img/cross.png" alt="cross" style={{ position: 'absolute', top: 5, right: 5 }} /> : null)) : (selectedOption === questions[currentQuestion]?.option4 ? <img src="img/check.png" alt="check" style={{ position: 'absolute', top: 5, right: 5 }} /> : null)}
                </div>
            </div>
            <h4>{message}</h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div onClick={checkAnswer} style={{ margin: 10 }}>
                    <img src='img/정답확인하기.png' alt='정답확인하기' style={{ width: '130px' }} />
                </div>
                <div onClick={nextQuestion} style={{ margin: 10 }}>
                    <img src='img/다음문제.png' alt='다음문제' style={{ width: '130px' }} />
                </div>
            </div>
        </div>
    );
}
