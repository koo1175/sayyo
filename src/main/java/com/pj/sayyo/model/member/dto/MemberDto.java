package com.pj.sayyo.model.member.dto;

import jdk.jshell.Snippet;
import lombok.Builder;

@Builder
public class MemberDto {
    // 아이디
    private String id;
    // 비번
    private String pw;
    // 이름
    private String name;
    // 랜덤 닉네임
    private String nickname;
    // 핸드폰 번호
    private String phone;
    // 주소 ( 시 따와서 메인에서 해당 지역 뜨게 해주기 /? )
    private String address;
    // 주민번호
    private String registNum;
    // 신고횟수
    private int reports;

    @Override
    public String toString() {
        return "MemberDto{" +
                "id='" + id + '\'' +
                ", pw='" + pw + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", registNum='" + registNum + '\'' +
                ", reports=" + reports +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRegistNum() {
        return registNum;
    }

    public void setRegistNum(String registNum) {
        this.registNum = registNum;
    }

    public int getReports() {
        return reports;
    }

    public void setReports(int reports) {
        this.reports = reports;
    }
}
