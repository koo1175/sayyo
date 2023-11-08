package com.pj.sayyo.controller.rLike;

import com.pj.sayyo.model.pLike.dto.PLikeDto;
import com.pj.sayyo.model.rLike.dto.RLikeDto;
import com.pj.sayyo.service.rLike.RLikeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/rlike")
public class RLikeController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RLikeService rLikeService;

    // 좋아요 눌렀을 때
    @PostMapping("/like")
    @ResponseBody
    private HashMap<String, Object> like(@RequestBody RLikeDto rLikeDto){
        HashMap<String, Object> mv = new HashMap<>();
        int findLike = rLikeService.findLike(rLikeDto);
        RLikeDto findState = rLikeService.findState(rLikeDto);

        // 이미 like 테이블이 존재할때
        if(findLike==1){
            System.out.println("이미 like 테이블이 존재함을 인식");
            // 좋아요가 이미 눌려있을 때
            if(findState.getLikeState().toString().equals("1")){
                System.out.println("좋아요가 이미 눌려있다 cancelLike로 가자");
                return cancelLike(rLikeDto);
            }
        }
        int resultCnt = rLikeService.like(rLikeDto);
        int resultCnt2 = rLikeService.reLike(rLikeDto);

        mv.put("result", resultCnt);
        System.out.println(resultCnt);
        System.out.println(resultCnt2);

        return mv;
    }

    // 싫어요 눌렀을 때
    @PostMapping("/dislike")
    @ResponseBody
    private HashMap<String, Object> disLike(@RequestBody RLikeDto rLikeDto){
        HashMap<String, Object> mv = new HashMap<>();

        System.out.println("dislike 작동");
        int findLike = rLikeService.findLike(rLikeDto);
        RLikeDto findState = rLikeService.findState(rLikeDto);
        System.out.println(rLikeDto.toString());
        System.out.println(findLike);

        // 이미 like 테이블이 존재할때
        if(findLike==1){
            System.out.println("이미 like 테이블이 존재함을 인식");
            // 싫어요가 이미 눌려있을 때
            if(findState.getLikeState().toString().equals("2")){
                System.out.println("싫어요가 이미 눌려있다 cancelLike로 가자");
                return cancelLike(rLikeDto);
            }
        }
        // 테이블이 존재하지 않을땐 바로 여기로 넘어오게됨
        int resultCnt = rLikeService.dislike(rLikeDto);
        int resultCnt2 = rLikeService.reDislike(rLikeDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);
        System.out.println(resultCnt2);

        return mv;
    }

    @PostMapping("/cancelLike")
    @ResponseBody
    private HashMap<String, Object> cancelLike(@RequestBody RLikeDto rLikeDto){
        HashMap<String, Object> mv = new HashMap<>();
        int resultCnt;
        int resultCnt2;
        System.out.println("cancelLike 작동");

        int findLike = rLikeService.findLike(rLikeDto);
        RLikeDto findState = rLikeService.findState(rLikeDto);
        // 이미 like가 존재할때 상태를 0으로 바꿔주도록 했지만
        // 그냥 삭제해버리기로 했다 깔끔하게
        if(findLike==1){
            System.out.println("이미 like가 존재함을 인식");
            resultCnt = rLikeService.deleteLike(rLikeDto);
            System.out.println("resultCnt : " + resultCnt);
            mv.put("result", resultCnt);
            // 좋아요가 눌려있을 경우 댓글의 좋아요 취소해주자
            if(findState.getLikeState().toString().equals("1")){
                System.out.println("이미 좋아요가 눌려있음을 인식");
                resultCnt2 = rLikeService.reCancelLike(rLikeDto);
                System.out.println("resultCnt2 : " + resultCnt2);
            // 싫어요가 눌려있을 경우 댓글의 싫어요 취소해주자
            }else if(findState.getLikeState().toString().equals("2")) {
                System.out.println("이미 싫어요가 눌려있음을 인식");
                resultCnt2 = rLikeService.reCancelDislike(rLikeDto);
                System.out.println("resultCnt2 : " + resultCnt2);
            }
        }
        return mv;
    }
}
