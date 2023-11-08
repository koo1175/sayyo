package com.pj.sayyo.model.member.mapper;

import com.pj.sayyo.model.member.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {
    int regist(MemberDto memberDto);
    List<MemberDto> findAll();
    int modify(MemberDto memberDto);
    int delete(MemberDto memberDto);
    List<MemberDto> findSearch(MemberDto memberDto);
    MemberDto findByUserId(String userId);
}
