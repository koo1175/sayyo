package com.pj.sayyo.model.fulfillment.dto;

public class FulfillmentDto {
    // 정치인 num
    private int politicianNum;
    // 계획 안건 수
    private int planNum;
    // 완료한 안건 수
    private int completeNum;
    // 시도한 안건 수 ( 진행중인 )
    private int tryNum;
    // 지역 발전도
    private int regionDev;

    public int getPoliticianNum() {
        return politicianNum;
    }

    public void setPoliticianNum(int politicianNum) {
        this.politicianNum = politicianNum;
    }

    public int getPlanNum() {
        return planNum;
    }

    public void setPlanNum(int planNum) {
        this.planNum = planNum;
    }

    public int getCompleteNum() {
        return completeNum;
    }

    public void setCompleteNum(int completeNum) {
        this.completeNum = completeNum;
    }

    public int getTryNum() {
        return tryNum;
    }

    public void setTryNum(int tryNum) {
        this.tryNum = tryNum;
    }

    public int getRegionDev() {
        return regionDev;
    }

    public void setRegionDev(int regionDev) {
        this.regionDev = regionDev;
    }
}
