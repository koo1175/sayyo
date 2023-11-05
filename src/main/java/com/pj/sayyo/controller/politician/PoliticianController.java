package com.pj.sayyo.controller.politician;


import com.pj.sayyo.model.politician.dto.PoliticianDto;
import com.pj.sayyo.service.politician.PoliticianService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/politician")
public class PoliticianController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PoliticianService politicianService;

    @PostMapping("/regist")
    @ResponseBody
    private HashMap<String, Object> regist(@RequestBody PoliticianDto politicianDto){
        HashMap<String, Object> mv = new HashMap<>();

        int resultCnt = politicianService.regist(politicianDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);

        return mv;
    }

    @GetMapping("/findAll")
    @ResponseBody
    private HashMap<String, Object> findAll(){
        HashMap<String, Object> mv = new HashMap<>();
        List<PoliticianDto> list = politicianService.findAll();

        mv.put("list", list);
        return mv;
    }

    @PostMapping("/modify")
    @ResponseBody
    public void modify(@RequestBody PoliticianDto politicianDto) {
        int resultCnt2 = politicianService.modify(politicianDto);
        System.out.println("수정 완료 여부 : " + resultCnt2);
    }

    @PostMapping("/delete")
    @ResponseBody
    public void delete(@RequestBody PoliticianDto politicianDto) {
        int resultCnt3 = politicianService.delete(politicianDto);
        System.out.println("삭제 완료 여부 : " + resultCnt3);

    }

    @GetMapping("/findSearch")
    @ResponseBody
    public void selectFind(@RequestBody PoliticianDto politicianDto) {
        HashMap<String, Object> mv = new HashMap<>();
        List<PoliticianDto> list = politicianService.findSearch(politicianDto);

        mv.put("list", list);
    }
}
