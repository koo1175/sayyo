package com.pj.sayyo.model.answer.dto;

public class AnswerDto {
    // 질문 번호 ( 해당 문제의 정답지 )
    private int id;
    // 정답지 내용
    private String content;
    // 정답 유무
    private boolean isValid;

    @Override
    public String toString() {
        return "AnswerDto{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", isValid=" + isValid +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }
}
