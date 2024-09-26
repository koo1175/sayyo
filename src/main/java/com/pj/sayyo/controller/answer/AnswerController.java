package com.pj.sayyo.controller.answer;

import com.pj.sayyo.model.answer.dto.AnswerDto;
import com.pj.sayyo.service.answer.AnswerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/answer")
public class AnswerController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private AnswerService answerService;

    @PostMapping("/regist")
    @ResponseBody
    private HashMap<String, Object> regist(@RequestBody AnswerDto answerDto){
        HashMap<String, Object> mv = new HashMap<>();

        System.out.println(answerDto.toString());
        int resultCnt = answerService.regist(answerDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);

        return mv;
    }

    @GetMapping("/findAll")
    @ResponseBody
    private HashMap<String, Object> findAll(){
        HashMap<String, Object> mv = new HashMap<>();
        List<AnswerDto> list = answerService.findAll();

        mv.put("list", list);
        return mv;
    }

    @PostMapping("/modify")
    @ResponseBody
    public void modify(@RequestBody AnswerDto answerDto) {
        int resultCnt2 = answerService.modify(answerDto);
        System.out.println("수정 완료 여부 : " + resultCnt2);
    }

    @PostMapping("/delete")
    @ResponseBody
    public void delete(@RequestBody AnswerDto answerDto) {
        int resultCnt3 = answerService.delete(answerDto);
        System.out.println("삭제 완료 여부 : " + resultCnt3);

    }

    @GetMapping("/findSearch")
    @ResponseBody
    public void selectFind(@RequestBody AnswerDto answerDto) {
        HashMap<String, Object> mv = new HashMap<>();
        List<AnswerDto> list = answerService.findSearch(answerDto);

        mv.put("list", list);
    }
}
