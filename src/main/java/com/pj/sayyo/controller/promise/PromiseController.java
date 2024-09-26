package com.pj.sayyo.controller.promise;


import com.pj.sayyo.model.promise.dto.PromiseDto;
import com.pj.sayyo.service.promise.PromiseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/promise")
public class PromiseController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PromiseService promiseService;

    @PostMapping("/regist")
    @ResponseBody
    private HashMap<String, Object> regist(@RequestBody PromiseDto promiseDto){
        HashMap<String, Object> mv = new HashMap<>();

        int resultCnt = promiseService.regist(promiseDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);

        return mv;
    }


    @GetMapping("/findAll")
    @ResponseBody
    private HashMap<String, Object> findAll(){
        HashMap<String, Object> mv = new HashMap<>();
        List<PromiseDto> list = promiseService.findAll();

        mv.put("list", list);
        return mv;
    }

}
