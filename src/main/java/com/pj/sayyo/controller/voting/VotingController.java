package com.pj.sayyo.controller.voting;

import com.pj.sayyo.model.voting.dto.VotedDto;
import com.pj.sayyo.model.voting.dto.VotingDto;
import com.pj.sayyo.service.voting.VotingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/voting")
public class VotingController {

    @Autowired
    private VotingService votingService;


    @PostMapping("/regist")
    @ResponseBody
    private HashMap<String, Object> regist(@RequestBody VotingDto votingDto){
        HashMap<String, Object> mv = new HashMap<>();

        int resultCnt = votingService.regist(votingDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);

        return mv;
    }

    @PostMapping("/delete")
    @ResponseBody
    public void delete(@RequestBody VotingDto votingDto) {
        int resultCnt3 = votingService.delete(votingDto);
        System.out.println("삭제 완료 여부 : " + resultCnt3);

    }


    //전체 조회 GET
    @GetMapping("/findAll")
    @ResponseBody
    private HashMap<String, Object> findAll(){
        HashMap<String, Object> mv = new HashMap<>();
        List<VotingDto> list = votingService.findAll();
        mv.put("list", list);
        return mv;
    }


    //투표수 +1 /findVoted POST요청 했을 때 0이면 +1하면 안되고 1이면 +1
    @PostMapping("/voteScore")
    @ResponseBody
    public void increaseScore(@RequestBody VotingDto votingDto) {
        votingService.voteScore(votingDto);
    }


    //투표한사람 리스트 POST
    @PostMapping("/voted")
    @ResponseBody
    private HashMap<String, Object> voted(@RequestBody VotedDto votedDto){
        HashMap<String, Object> mv = new HashMap<>();

        int resultCnt = votingService.voted(votedDto);
        mv.put("voted", resultCnt);
        System.out.println(resultCnt);

        return mv;
    }

    //투표한사람 리스트 POST 0이면 투표 안함 1이면 투표 함
    @PostMapping("/findVoted")
    @ResponseBody
    private HashMap<String, Object> votedCount(@RequestBody VotedDto votedDto) {
        HashMap<String, Object> mv = new HashMap<>();
        int count = votingService.findVoted(votedDto);
        mv.put("count", count);
        return mv;
    }

}
