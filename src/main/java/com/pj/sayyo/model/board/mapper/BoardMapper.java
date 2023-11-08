package com.pj.sayyo.model.board.mapper;

import com.pj.sayyo.model.board.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    int regist(BoardDto boardDto);
    List<BoardDto> findAll();
    int modify(BoardDto boardDto);
    int delete(BoardDto boardDto);
    List<BoardDto> findSearch(BoardDto boardDto);

}
