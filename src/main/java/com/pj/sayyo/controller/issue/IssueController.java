package com.pj.sayyo.controller.issue;

import com.pj.sayyo.model.issue.dto.IssueDto;
import com.pj.sayyo.service.issue.IssueService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/issue")
public class IssueController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IssueService issueService;

    @PostMapping("/regist")
    @ResponseBody
    private HashMap<String, Object> regist(@RequestBody IssueDto issueDto){
        HashMap<String, Object> mv = new HashMap<>();

        int resultCnt = issueService.regist(issueDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);

        return mv;
    }

    @GetMapping("/findAll")
    @ResponseBody
    private HashMap<String, Object> findAll(){
        HashMap<String, Object> mv = new HashMap<>();
        List<IssueDto> list = issueService.findAll();

        mv.put("list", list);
        return mv;
    }

    @PostMapping("/modify")
    @ResponseBody
    public void modify(@RequestBody IssueDto issueDto) {
        int resultCnt2 = issueService.modify(issueDto);
        System.out.println("수정 완료 여부 : " + resultCnt2);
    }

    @PostMapping("/delete")
    @ResponseBody
    public void delete(@RequestBody IssueDto issueDto) {
        int resultCnt3 = issueService.delete(issueDto);
        System.out.println("삭제 완료 여부 : " + resultCnt3);

    }

    @GetMapping("/findSearch")
    @ResponseBody
    public void selectFind(@RequestBody IssueDto issueDto) {
        HashMap<String, Object> mv = new HashMap<>();
        List<IssueDto> list = issueService.findSearch(issueDto);

        mv.put("list", list);
    }

}
