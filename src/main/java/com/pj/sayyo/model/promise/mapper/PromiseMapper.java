package com.pj.sayyo.model.promise.mapper;

import com.pj.sayyo.model.politician.dto.PoliticianDto;
import com.pj.sayyo.model.promise.dto.PromiseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PromiseMapper {
    int regist(PromiseDto promiseDto);
    List<PromiseDto> findAll();
    int modify(PromiseDto promiseDto);
    int delete(PromiseDto promiseDto);
    List<PromiseDto> findSearch(PromiseDto promiseDto);

}
