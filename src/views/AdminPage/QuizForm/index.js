import React, { useState } from 'react';
import '../style.css';

export default function QuizForm ({ onClose, onRegister }) {
  const [quizzes, setQuizzes] = useState([...Array(5)].map(() => ({ // Array for 5 quizzes
    quizContent: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
  })));

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newQuizzes = [...quizzes];
    newQuizzes[index][name] = value;
    setQuizzes(newQuizzes);
  };

  const handleRegister = () => {
    onRegister(quizzes);
    onClose();
  };

  return (
    <div className="quiz-form" style={{border:'1px', borderRadius:'5px', borderColor:'white'}}>
      <h4 style={{color:'white'}}>퀴즈 생성</h4>
      {quizzes.map((quiz, index) => (
        <div key={index}>
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>퀴즈 내용:</label>
          <input type="text" name="quizContent" style={{width:'110px'}} value={quiz.quizContent} onChange={(e) => handleInputChange(index, e)} />
          <label  style={{fontSize:'15px', marginRight:'10px', color:'white'}}>보기 1:</label>
          <input type="text" name="option1" style={{width:'150px'}} value={quiz.option1} onChange={(e) => handleInputChange(index, e)} />
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>보기 2:</label>
          <input type="text" name="option2" style={{width:'50px'}} value={quiz.option2} onChange={(e) => handleInputChange(index, e)} />
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>보기 3:</label>
          <input type="text" name="option3" style={{width:'50px'}} value={quiz.option3} onChange={(e) => handleInputChange(index, e)} />
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>보기 4:</label>
          <input type="text" name="option4" style={{width:'50px'}} value={quiz.option4} onChange={(e) => handleInputChange(index, e)} />
          <label style={{fontSize:'15px', marginRight:'10px', color:'white'}}>정답:</label>
          <input type="text" name="correctAnswer" style={{width:'50px'}} value={quiz.correctAnswer} onChange={(e) => handleInputChange(index, e)} />
        </div>
      ))}
      <button className='submit-deny3' onClick={handleRegister}>등록</button>
      <button className='submit-deny3' onClick={onClose}>취소</button>
    </div>
  );
};
