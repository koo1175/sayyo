package com.pj.sayyo.service.answer;

import com.pj.sayyo.model.answer.dto.AnswerDto;
import com.pj.sayyo.model.question.dto.QuestionDto;

import java.util.List;

public interface AnswerService {
    int regist(AnswerDto answerDto);
    List<AnswerDto> findAll();
    int modify(AnswerDto answerDto);
    int delete(AnswerDto answerDto);
    List<AnswerDto> findSearch(AnswerDto answerDto);

}
