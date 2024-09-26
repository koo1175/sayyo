package com.pj.sayyo.service.memBoard;

import com.pj.sayyo.model.memBoard.dto.MemBoardDto;

import java.util.List;

public interface MemBoardService {
    int regist(MemBoardDto memberDto);
    List<MemBoardDto> findAll();
    int modify(MemBoardDto memberDto);
    int delete(MemBoardDto memberDto);
    List<MemBoardDto> findSearch(MemBoardDto memberDto);
}
