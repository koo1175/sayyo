package com.pj.sayyo.service.member;

import com.pj.sayyo.model.member.dto.MemberDto;
import com.pj.sayyo.model.member.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImpl implements MemberService{
    @Autowired
    private MemberMapper memberMapper;

    @Override
    public int regist(MemberDto memberDto) {
        return memberMapper.regist(memberDto);
    }

    @Override
    public int kakao(MemberDto memberDto) {
        return memberMapper.kakao(memberDto);
    }
    @Override
    public MemberDto login(MemberDto memberDto) {
        return memberMapper.login(memberDto);
    }

    @Override
    public List<MemberDto> findAll() {
        return memberMapper.findAll();
    }

    @Override
    public int modify(MemberDto memberDto) {
        return memberMapper.modify(memberDto);
    }
    @Override
    public int report(MemberDto memberDto) {
        return memberMapper.report(memberDto);
    }

    @Override
    public int delete(MemberDto memberDto) {
        return memberMapper.delete(memberDto);
    }

    @Override
    public List<MemberDto> findSearch(MemberDto memberDto) {
        return memberMapper.findSearch(memberDto);
    }
}
