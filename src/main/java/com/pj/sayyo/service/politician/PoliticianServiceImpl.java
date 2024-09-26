package com.pj.sayyo.service.politician;

import com.pj.sayyo.model.politician.dto.PoliticianDto;
import com.pj.sayyo.model.politician.mapper.PoliticianMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PoliticianServiceImpl implements PoliticianService {
    @Autowired
    private PoliticianMapper politicianMapper;

    @Override
    public int regist(PoliticianDto politicianDto) {
        return politicianMapper.regist(politicianDto);
    }

    @Override
    public List<PoliticianDto> findAll() {
        return politicianMapper.findAll();
    }

    @Override
    public int modify(PoliticianDto politicianDto) {
        return politicianMapper.modify(politicianDto);
    }

    @Override
    public int delete(PoliticianDto politicianDto) {
        return politicianMapper.delete(politicianDto);
    }
    @Override
    public int dislike(PoliticianDto politicianDto) {
        return politicianMapper.dislike(politicianDto);
    }
    @Override
    public int likes(PoliticianDto politicianDto) {
        return politicianMapper.likes(politicianDto);
    }

    @Override
    public List<PoliticianDto> findSearch(PoliticianDto politicianDto) {
        return politicianMapper.findSearch(politicianDto);
    }
}
