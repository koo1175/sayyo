package com.pj.sayyo.service.fulfillment;

import com.pj.sayyo.model.fulfillment.dto.FulfillmentDto;
import com.pj.sayyo.model.fulfillment.mapper.FulfillmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FulfillmentServiceImpl implements FulfillmentService{
    @Autowired
    private FulfillmentMapper fulfillmentMapper;

    @Override
    public int regist(FulfillmentDto fulfullmentDto) {
        return fulfillmentMapper.regist(fulfullmentDto);
    }

    @Override
    public List<FulfillmentDto> findAll() {
        return fulfillmentMapper.findAll();
    }

    @Override
    public int modify(FulfillmentDto fulfullmentDto) {
        return fulfillmentMapper.modify(fulfullmentDto);
    }

    @Override
    public int delete(FulfillmentDto fulfullmentDto) {
        return fulfillmentMapper.delete(fulfullmentDto);
    }

    @Override
    public List<FulfillmentDto> findSearch(FulfillmentDto fulfullmentDto) {
        return fulfillmentMapper.findSearch(fulfullmentDto);
    }
}
