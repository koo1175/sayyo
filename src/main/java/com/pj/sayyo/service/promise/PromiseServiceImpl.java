package com.pj.sayyo.service.promise;

import com.pj.sayyo.model.member.dto.MemberDto;
import com.pj.sayyo.model.member.mapper.MemberMapper;
import com.pj.sayyo.model.promise.dto.PromiseDto;
import com.pj.sayyo.model.promise.mapper.PromiseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromiseServiceImpl implements PromiseService {
    @Autowired
    private PromiseMapper promiseMapper;

    @Override
    public int regist(PromiseDto promiseDto) {
        return promiseMapper.regist(promiseDto);
    }

    @Override
    public List<PromiseDto> findAll() {
        return promiseMapper.findAll();
    }

    @Override
    public int modify(PromiseDto promiseDto) {
        return promiseMapper.modify(promiseDto);
    }

    @Override
    public int delete(PromiseDto promiseDto) {
        return promiseMapper.delete(promiseDto);
    }

    @Override
    public List<PromiseDto> findSearch(PromiseDto promiseDto) {
        return promiseMapper.findSearch(promiseDto);
    }

}
