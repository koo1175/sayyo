package com.pj.sayyo.model.memBoard.mapper;

import com.pj.sayyo.model.memBoard.dto.MemBoardDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemBoardMapper {
    int regist(MemBoardDto memBoardDto);
    List<MemBoardDto> findAll();
    int modify(MemBoardDto memBoardDto);
    int delete(MemBoardDto memBoardDto);
    List<MemBoardDto> findSearch(MemBoardDto memBoardDto);
}