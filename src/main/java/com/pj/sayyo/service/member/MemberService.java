package com.pj.sayyo.service.member;

import com.pj.sayyo.model.member.dto.MemberDto;

import java.util.List;

public interface MemberService {
    int regist(MemberDto memberDto);
    int kakao(MemberDto memberDto);
    MemberDto login(MemberDto memberDto);
    String login(String userName, String pw);

    List<MemberDto> findAll();
    int modify(MemberDto memberDto);
    int report(MemberDto memberDto);
    int delete(MemberDto memberDto);
    MemberDto findSearch(MemberDto memberDto);
}
