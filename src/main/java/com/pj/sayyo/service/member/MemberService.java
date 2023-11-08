package com.pj.sayyo.service.member;

import com.pj.sayyo.model.member.dto.MemberDto;

import java.util.List;

public interface MemberService {
    int regist(MemberDto memberDto);
    List<MemberDto> findAll();
    int modify(MemberDto memberDto);
    int delete(MemberDto memberDto);
    List<MemberDto> findSearch(MemberDto memberDto);

    MemberDto findByUserId(String userId);
}
