package com.pj.sayyo.service.politician;

import com.pj.sayyo.model.politician.dto.PoliticianDto;

import java.util.List;

public interface PoliticianService {
    int regist(PoliticianDto politicianDto);
    List<PoliticianDto> findAll();
    int modify(PoliticianDto politicianDto);
    int delete(PoliticianDto politicianDto);
    List<PoliticianDto> findSearch(PoliticianDto politicianDto);

}
