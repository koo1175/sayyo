package com.pj.sayyo.model.rLike.dto;

public class RLikeDto {
    private String memberId;
    private String replyNum;
    private Character likeState;

    @Override
    public String toString() {
        return "RLikeDto{" +
                "memberId='" + memberId + '\'' +
                ", replyNum='" + replyNum + '\'' +
                ", likeState=" + likeState +
                '}';
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getReplyNum() {
        return replyNum;
    }

    public void setReplyNum(String replyNum) {
        this.replyNum = replyNum;
    }

    public Character getLikeState() {
        return likeState;
    }

    public void setLikeState(Character likeState) {
        this.likeState = likeState;
    }
}
