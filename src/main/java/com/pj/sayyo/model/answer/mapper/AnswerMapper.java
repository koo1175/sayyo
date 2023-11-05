package com.pj.sayyo.model.answer.mapper;

import com.pj.sayyo.model.answer.dto.AnswerDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AnswerMapper {
    int regist(AnswerDto answerDto);
    List<AnswerDto> findAll();
    int modify(AnswerDto answerDto);
    int delete(AnswerDto answerDto);
    List<AnswerDto> findSearch(AnswerDto answerDto);
}
