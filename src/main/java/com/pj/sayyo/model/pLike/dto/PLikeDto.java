package com.pj.sayyo.model.pLike.dto;

public class PLikeDto {
    private String memberId;
    private String politicianNum;
    private Character likeState;

    @Override
    public String toString() {
        return "PLikeDto{" +
                "memberId='" + memberId + '\'' +
                ", politicianNum='" + politicianNum + '\'' +
                ", likeState=" + likeState +
                '}';
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getPoliticianNum() {
        return politicianNum;
    }

    public void setPoliticianNum(String politicianNum) {
        this.politicianNum = politicianNum;
    }

    public Character getLikeState() {
        return likeState;
    }

    public void setLikeState(Character likeState) {
        this.likeState = likeState;
    }
}
