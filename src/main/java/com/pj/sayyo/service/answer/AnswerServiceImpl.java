package com.pj.sayyo.service.answer;

import com.pj.sayyo.model.answer.dto.AnswerDto;
import com.pj.sayyo.model.answer.mapper.AnswerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService {
    @Autowired
    private AnswerMapper answerMapper;

    @Override
    public int regist(AnswerDto answerDto) {
        return answerMapper.regist(answerDto);
    }

    @Override
    public List<AnswerDto> findAll() {
        return answerMapper.findAll();
    }

    @Override
    public int modify(AnswerDto AnswerDto) {
        return answerMapper.modify(AnswerDto);
    }

    @Override
    public int delete(AnswerDto answerDto) {
        return answerMapper.delete(answerDto);
    }

    @Override
    public List<AnswerDto> findSearch(AnswerDto answerDto) {
        return answerMapper.findSearch(answerDto);
    }
}
