package com.pj.sayyo.service.question;

import com.pj.sayyo.model.question.dto.QuestionDto;
import com.pj.sayyo.model.question.mapper.QuestionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionMapper questionMapper;

    @Override
    public int regist(QuestionDto questionDto) {
        return questionMapper.regist(questionDto);
    }

    @Override
    public List<QuestionDto> findAll() {
        return questionMapper.findAll();
    }

    @Override
    public int modify(QuestionDto questionDto) {
        return questionMapper.modify(questionDto);
    }

    @Override
    public int delete(QuestionDto questionDto) {
        return questionMapper.delete(questionDto);
    }

    @Override
    public List<QuestionDto> findSearch(QuestionDto questionDto) {
        return questionMapper.findSearch(questionDto);
    }
}
