package com.pj.sayyo.controller.fulfillment;


import com.pj.sayyo.model.fulfillment.dto.FulfillmentDto;
import com.pj.sayyo.service.fulfillment.FulfillmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/fulfillment")
public class FulfillmentController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private FulfillmentService fulfillmentService;

    @PostMapping("/regist")
    @ResponseBody
    private HashMap<String, Object> regist(@RequestBody FulfillmentDto fulfullmentDto){
        HashMap<String, Object> mv = new HashMap<>();

        int resultCnt = fulfillmentService.regist(fulfullmentDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);

        return mv;
    }

    @GetMapping("/findAll")
    @ResponseBody
    private HashMap<String, Object> findAll(){
        HashMap<String, Object> mv = new HashMap<>();
        List<FulfillmentDto> list = fulfillmentService.findAll();

        mv.put("list", list);
        return mv;
    }

    @PostMapping("/modify")
    @ResponseBody
    public void modify(@RequestBody FulfillmentDto fulfillmentDto) {
        int resultCnt2 = fulfillmentService.modify(fulfillmentDto);
        System.out.println("수정 완료 여부 : " + resultCnt2);
    }

    @PostMapping("/delete")
    @ResponseBody
    public void delete(@RequestBody FulfillmentDto fulfillmentDto) {
        int resultCnt3 = fulfillmentService.delete(fulfillmentDto);
        System.out.println("삭제 완료 여부 : " + resultCnt3);

    }

    @GetMapping("/findSearch")
    @ResponseBody
    public void selectFind(@RequestBody FulfillmentDto fulfillmentDto) {
        HashMap<String, Object> mv = new HashMap<>();
        List<FulfillmentDto> list = fulfillmentService.findSearch(fulfillmentDto);

        mv.put("list", list);
    }

}
