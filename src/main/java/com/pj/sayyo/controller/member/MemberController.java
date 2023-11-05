package com.pj.sayyo.controller.member;


import com.pj.sayyo.model.member.dto.MemberDto;
import com.pj.sayyo.service.member.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/findSearch")
    @ResponseBody
    public void selectFind(@RequestBody MemberDto memberDto) {
        HashMap<String, Object> mv = new HashMap<>();
        List<MemberDto> list = memberService.findSearch(memberDto);

        mv.put("list", list);
    }

}
