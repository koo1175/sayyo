package com.pj.sayyo.model.promise.dto;

public class PromiseDto {
    // politician num
    private int id;
    // 공약 번호 ( pk )
    private int num;
    private String content;

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
