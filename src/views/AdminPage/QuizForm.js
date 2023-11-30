import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';

const initialQuiz = {
  id: '',
  content: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  answer: '',
};

const QuizForm = ({ onClose, onRegister }) => {
  const [quizzes, setQuizzes] = useState([initialQuiz]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newQuizzes = [...quizzes];
    newQuizzes[index][name] = value;
    setQuizzes(newQuizzes);
  };

  const handleAddQuizSet = () => {
    if (quizzes.length < 5) {
      setQuizzes((prevQuizzes) => [...prevQuizzes, { ...initialQuiz }]);
    }
  };

  const handleRegister = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 각 퀴즈 셋트별로 서버에 요청을 보냄
    const registerPromises = quizzes.map((quiz) => {
      // 퀴즈 데이터를 서버에 전송하기 위해 필요한 DTO 형식으로 변환
      const quizDto = {
        id: quiz.id,
        content: quiz.content,
        option1: quiz.option1,
        option2: quiz.option2,
        option3: quiz.option3,
        option4: quiz.option4,
        answer: quiz.answer,
      };

      // 각 퀴즈 셋트별로 서버에 요청을 보내는 Promise 반환
      return axios.post(
        'https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/question/regist',
        quizDto,
        config
      );
    });

    // 모든 서버 요청이 성공적으로 완료되면 onRegister와 onClose를 호출
    Promise.all(registerPromises)
      .then((responses) => {
        console.log('퀴즈 등록 결과:', responses.map((response) => response.data));

        // TODO: 퀴즈 등록이 성공적으로 이루어졌을 때 어떤 동작을 할지 추가
        // 예를 들어, 성공 알림 표시 등

        // 퀴즈 등록을 부모 컴포넌트로 전달
        onRegister(quizzes);
        onClose();
      })
      .catch((error) => {
        console.error('퀴즈 등록 실패:', error);

        // TODO: 퀴즈 등록 실패 시 어떤 동작을 할지 추가
        // 예를 들어, 실패 알림 표시 등
      });
  };

  return (
    <div className="quiz-form" style={{ border: '1px', borderRadius: '5px', borderColor: 'white' }}>
      <h4 style={{ color: 'white' }}>퀴즈 생성</h4>
      {quizzes.map((quiz, index) => (
        <div key={index}>
          <label style={{ fontSize: '15px', marginRight: '10px', color: 'white' }}>id:</label>
          <input
            type="text"
            name="id"
            style={{ width: '10px' }}
            value={quiz.id}
            onChange={(e) => handleInputChange(index, e)}
          />
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>퀴즈 내용:</label>
          <input type="text" name="content" style={{width:'150px'}} value={quiz.content} onChange={(e) => handleInputChange(index, e)} />
          <label  style={{fontSize:'15px', marginRight:'10px', color:'white'}}>보기 1:</label>
          <input type="text" name="option1" style={{width:'50px'}} value={quiz.option1} onChange={(e) => handleInputChange(index, e)} />
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>보기 2:</label>
          <input type="text" name="option2" style={{width:'50px'}} value={quiz.option2} onChange={(e) => handleInputChange(index, e)} />
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>보기 3:</label>
          <input type="text" name="option3" style={{width:'50px'}} value={quiz.option3} onChange={(e) => handleInputChange(index, e)} />
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>보기 4:</label>
          <input type="text" name="option4" style={{width:'50px'}} value={quiz.option4} onChange={(e) => handleInputChange(index, e)} />
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>정답:</label>
          <input type="text" name="answer" style={{width:'50px'}} value={quiz.answer} onChange={(e) => handleInputChange(index, e)} />
        </div>
       ))}
       {quizzes.length < 5 && (
        <button className="submit-deny3" onClick={handleAddQuizSet} style={{marginLeft:'15px'}}>
          퀴즈 추가
        </button>
      )}
       <button className='submit-deny3' onClick={handleRegister} style={{marginLeft:'15px'}}>등록</button>
       <button className='submit-deny3' onClick={onClose} style={{marginLeft:'15px'}}>취소</button>
     </div>
  );
};
export default QuizForm;