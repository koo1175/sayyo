package com.pj.sayyo.model.memBoard.dto;

import java.util.Date;

public class MemBoardDto {
    // 유저 id
    private int memberId;
    // pk 글 num
    private int num;
    // 글 제목
    private String title;
    // 글 내용
    private String content;
    // 글 작성 날짜
    private String nowDate;

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getNowDate() {
        return nowDate;
    }

    public void setNowDate(String nowDate) {
        this.nowDate = nowDate;
    }
}
