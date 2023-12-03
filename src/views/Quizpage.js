import { useState, useEffect } from 'react';
import axios from 'axios';
export default function QuizPage() {
    const [questions, setQuestions] = useState([]);  //문제
    const [currentQuestion, setCurrentQuestion] = useState(0); //현재문제
    const [message, setMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [checked, setChecked] = useState(false); // 정답 확인 여부를 저장하는 상태 변수 추가

    useEffect(() => {
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/question/findAll')
            .then(response => {
                setQuestions(response.data.list);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const selectOption = (option) => {
        setSelectedOption(option);
    };

    const checkAnswer = () => {
        setChecked(true);
        if (selectedOption === questions[currentQuestion].answer) {
            setMessage('정답입니다');
            
        } else {
            setMessage('오답입니다');
        }
        setSelectedOption(null);
        
    };

    const nextQuestion = () => {
        setChecked(false);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setMessage('');
        } else {
            // 여기서 결과 페이지로 이동하는 코드를 작성하면 됩니다.
        }
    };

    return (
        <div>
            <h1>{questions[currentQuestion]?.content}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div onClick={() => selectOption(questions[currentQuestion]?.option1)} style={{ height: '200px', width: '300px', backgroundColor: '#02ABB0', borderRadius: '10px', margin: '10px', color: 'white', fontSize: '40px', position: 'relative' }}>
                    <p style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{questions[currentQuestion]?.option1}</p>
                    {selectedOption === questions[currentQuestion]?.option1 && <img src="img/check.png" alt="check" style={{ position: 'absolute', top: 0, right: 0 }} />}
                </div>
                <div onClick={() => selectOption(questions[currentQuestion]?.option2)} style={{ height: '200px', width: '300px', backgroundColor: '#318CFF', borderRadius: '10px', margin: '10px', color: 'white', fontSize: '40px', position: 'relative' }}>
                    <p style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{questions[currentQuestion]?.option2}</p>
                    {selectedOption === questions[currentQuestion]?.option2 && <img src="img/check.png" alt="check" style={{ position: 'absolute', top: 0, right: 0 }} />}
                </div>
                <div onClick={() => selectOption(questions[currentQuestion]?.option3)} style={{ height: '200px', width: '300px', backgroundColor: '#F8AC59', borderRadius: '10px', margin: '10px', color: 'white', fontSize: '40px', position: 'relative' }}>
                    <p style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{questions[currentQuestion]?.option3}</p>
                    {selectedOption === questions[currentQuestion]?.option3 && <img src="img/check.png" alt="check" style={{ position: 'absolute', top: 0, right: 0 }} />}
                </div>
                <div onClick={() => selectOption(questions[currentQuestion]?.option4)} style={{ height: '200px', width: '300px', backgroundColor: '#ED5565', borderRadius: '10px', margin: '10px', color: 'white', fontSize: '40px', position: 'relative' }}>
                    <p style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{questions[currentQuestion]?.option4}</p>
                    {selectedOption === questions[currentQuestion]?.option4 && <img src="img/check.png" alt="check" style={{ position: 'absolute', top: 0, right: 0 }} />}
                </div>
            </div>
            <p>{message}</p>
            <button onClick={checkAnswer}>정답 확인하기</button>
            <button onClick={nextQuestion}>다음 문제</button>
        </div>
    );
}


