package com.pj.sayyo.service.memBoard;

import com.pj.sayyo.model.board.dto.BoardDto;
import com.pj.sayyo.model.board.mapper.BoardMapper;
import com.pj.sayyo.model.memBoard.dto.MemBoardDto;
import com.pj.sayyo.model.memBoard.mapper.MemBoardMapper;
import com.pj.sayyo.model.member.dto.MemberDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;
import java.util.List;

@Service
public class MemBoardServiceImpl implements MemBoardService {

    @Autowired
    private MemBoardMapper memBoardMapper;

    @Override
    public int regist(MemBoardDto memBoardDto) {
        return memBoardMapper.regist(memBoardDto);
    }

    @Override
    public List<MemBoardDto> findAll() {
        return memBoardMapper.findAll();
    }

    @Override
    public int modify(MemBoardDto memBoardDto) {
        return memBoardMapper.modify(memBoardDto);
    }

    @Override
    public int delete(MemBoardDto memBoardDto) {
        return memBoardMapper.delete(memBoardDto);
    }

    @Override
    public List<MemBoardDto> findSearch(MemBoardDto memBoardDto) {
        return memBoardMapper.findSearch(memBoardDto);
    }
}
