package com.pj.sayyo.service.question;

import com.pj.sayyo.model.answer.dto.AnswerDto;
import com.pj.sayyo.model.question.dto.QuestionDto;

import java.util.List;

public interface QuestionService {
    int regist(QuestionDto questionDto);
    List<QuestionDto> findAll();
    int modify(QuestionDto questionDto);
    int delete(QuestionDto questionDto);
    List<QuestionDto> findSearch(QuestionDto questionDto);

}
