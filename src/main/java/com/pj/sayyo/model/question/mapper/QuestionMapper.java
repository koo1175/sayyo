package com.pj.sayyo.model.question.mapper;

import com.pj.sayyo.model.question.dto.QuestionDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QuestionMapper {

    int regist(QuestionDto questionDto);
    List<QuestionDto> findAll();
    int modify(QuestionDto questionDto);
    int delete(QuestionDto questionDto);
    List<QuestionDto> findSearch(QuestionDto questionDto);

}
