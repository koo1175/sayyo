package com.pj.sayyo.controller.member;


import com.pj.sayyo.model.member.dto.MemberDto;
import com.pj.sayyo.service.member.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/member")
public class MemberController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MemberService memberService;

    @PostMapping("/regist")
    @ResponseBody
    private HashMap<String, Object> regist(@RequestBody MemberDto memberDto){
        HashMap<String, Object> mv = new HashMap<>();

        int resultCnt = memberService.regist(memberDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);

        return mv;
    }

    @PostMapping("/kakao")
    @ResponseBody
    private String kakao(@RequestBody MemberDto memberDto){
        HashMap<String, Object> mv = new HashMap<>();

        if(memberDto.getNickname().equals("꽥꽥이")){
            return "다시 입력해주세요";
        }else if(memberDto.getPhone().equals("01012341234") || memberDto.getPhone().equals(" ")){
            return "다시 입력해주세요";
        }else if(memberDto.getAddress().equals("asd")){
            return "다시 입력해주세요";
        }else if(memberDto.getRegistNum().equals("1234561234567")){
            return "다시 입력해주세요";
        }
        int resultCnt = memberService.kakao(memberDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);

        return "로그인 성공 ( by kakao )";
    }

    @PostMapping("/login")
    @ResponseBody
    private boolean login(@RequestBody MemberDto memberDto){
        MemberDto m = memberService.login(memberDto);
        if(m == null){
            // 받아온 id와 pw에 해당하는 유저가 없을때
            System.out.println("로그인 실패");
            return false;
        }
        System.out.println(m.toString());
        System.out.println("로그인 성공");

        return true;
    }

    @GetMapping("/findAll")
    @ResponseBody
    private HashMap<String, Object> findAll(){
        HashMap<String, Object> mv = new HashMap<>();
        List<MemberDto> list = memberService.findAll();

        mv.put("list", list);
        return mv;
    }

    @PostMapping("/modify")
    @ResponseBody
    public void modify(@RequestBody MemberDto memberDto) {
        int resultCnt2 = memberService.modify(memberDto);
        System.out.println("수정 완료 여부 : " + resultCnt2);
    }

    @PostMapping("/delete")
    @ResponseBody
    public void delete(@RequestBody MemberDto memberDto) {
        int resultCnt3 = memberService.delete(memberDto);
        System.out.println("삭제 완료 여부 : " + resultCnt3);

    }

    // 닉네임으로 요청
    @GetMapping("/findSearch")
    @ResponseBody
    public void selectFind(@RequestBody MemberDto memberDto) {
        HashMap<String, Object> mv = new HashMap<>();
        MemberDto member = memberService.findSearch(memberDto);

        mv.put("member", member);
        System.out.println(member.toString());
    }

    @PostMapping("/report")
    @ResponseBody
    public void report(@RequestBody MemberDto memberDto){
        int resultCnt4 = memberService.report(memberDto);
        System.out.println("신고 완료 여부 : " + resultCnt4);
    }
}
