package com.pj.sayyo.service.board;

import com.pj.sayyo.model.board.dto.BoardDto;
import com.pj.sayyo.model.board.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardMapper boardMapper;

    @Override
    public int regist(BoardDto boardDto) {
        return boardMapper.regist(boardDto);
    }

    @Override
    public List<BoardDto> findAll() {
        return boardMapper.findAll();
    }

    @Override
    public int modify(BoardDto boardDto) {
        return boardMapper.modify(boardDto);
    }

    @Override
    public int delete(BoardDto boardDto) {
        return boardMapper.delete(boardDto);
    }

    @Override
    public List<BoardDto> findSearch(BoardDto boardDto) {
        return boardMapper.findSearch(boardDto);
    }
}
