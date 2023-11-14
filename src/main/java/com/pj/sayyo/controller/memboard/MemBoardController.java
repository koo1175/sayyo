package com.pj.sayyo.controller.board;

import com.pj.sayyo.model.board.dto.BoardDto;
import com.pj.sayyo.service.board.BoardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/memBoard")
public class MemBoardController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private BoardService boardService;

    @PostMapping("/regist")
    @ResponseBody
    private HashMap<String, Object> regist(@RequestBody BoardDto boardDto){
        HashMap<String, Object> mv = new HashMap<>();

        int resultCnt = boardService.regist(boardDto);
        mv.put("result", resultCnt);
        System.out.println(resultCnt);

        return mv;
    }

    @GetMapping("/findAll")
    @ResponseBody
    private HashMap<String, Object> findAll(){
        HashMap<String, Object> mv = new HashMap<>();
        List<BoardDto> list = boardService.findAll();

        mv.put("list", list);
        return mv;
    }

    @PostMapping("/modify")
    @ResponseBody
    public void modify(@RequestBody BoardDto boardDto) {
        int resultCnt2 = boardService.modify(boardDto);
        System.out.println("수정 완료 여부 : " + resultCnt2);
    }

    @PostMapping("/delete")
    @ResponseBody
    public void delete(@RequestBody BoardDto boardDto) {
        int resultCnt3 = boardService.delete(boardDto);
        System.out.println("삭제 완료 여부 : " + resultCnt3);

    }

    @GetMapping("/findSearch")
    @ResponseBody
    public void selectFind(@RequestBody BoardDto boardDto) {
        HashMap<String, Object> mv = new HashMap<>();
        List<BoardDto> list = boardService.findSearch(boardDto);

        mv.put("list", list);
    }

}
