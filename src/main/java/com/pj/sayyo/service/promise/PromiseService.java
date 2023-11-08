package com.pj.sayyo.service.promise;

import com.pj.sayyo.model.promise.dto.PromiseDto;

import java.util.List;

public interface PromiseService {
    int regist(PromiseDto promiseDto);
    List<PromiseDto> findAll();
    int modify(PromiseDto promiseDto);
    int delete(PromiseDto promiseDto);
    List<PromiseDto> findSearch(PromiseDto promiseDto);
}
