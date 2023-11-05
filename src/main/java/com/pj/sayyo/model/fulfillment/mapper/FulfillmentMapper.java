package com.pj.sayyo.model.fulfillment.mapper;

import com.pj.sayyo.model.fulfillment.dto.FulfillmentDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FulfillmentMapper {
    int regist(FulfillmentDto fulfullmentDto);
    List<FulfillmentDto> findAll();
    int modify(FulfillmentDto fulfullmentDto);
    int delete(FulfillmentDto fulfullmentDto);
    List<FulfillmentDto> findSearch(FulfillmentDto fulfullmentDto);

}
