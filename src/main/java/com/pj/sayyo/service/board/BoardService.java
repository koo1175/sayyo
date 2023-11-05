package com.pj.sayyo.service.board;

import com.pj.sayyo.model.board.dto.BoardDto;

import java.util.List;

public interface BoardService {
    int regist(BoardDto boardDto);
    List<BoardDto> findAll();
    int modify(BoardDto boardDto);
    int delete(BoardDto boardDto);
    List<BoardDto> findSearch(BoardDto boardDto);
}
