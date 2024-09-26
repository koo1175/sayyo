package com.pj.sayyo.service.reply;

import com.pj.sayyo.model.reply.dto.ReplyDto;
import com.pj.sayyo.model.reply.mapper.ReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyServiceImpl implements ReplyService{
    @Autowired
    private ReplyMapper replyMapper;

    @Override
    public int regist(ReplyDto replyDto) {
        return replyMapper.regist(replyDto);
    }

    @Override
    public List<ReplyDto> findAll() {
        return replyMapper.findAll();
    }

    @Override
    public int modify(ReplyDto replyDto) {
        return replyMapper.modify(replyDto);
    }

    @Override
    public int delete(ReplyDto replyDto) {
        return replyMapper.delete(replyDto);
    }

    @Override
    public List<ReplyDto> findSearch(ReplyDto replyDto) {
        return replyMapper.findSearch(replyDto);
    }
}
