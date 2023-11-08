package com.pj.sayyo.model.board.dto;

import java.util.Date;

public class BoardDto {
    // 정치인 num
    private int id;
    // 글 번호
    private int num;
    // 글 제목
    private String title;
    // 글 내용
    private String content;
    // 글 작성 날짜
    private Date currentDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Date getCurrentDate() {
        return currentDate;
    }

    public void setCurrentDate(Date currentDate) {
        this.currentDate = currentDate;
    }
}
