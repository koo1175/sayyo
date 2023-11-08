package com.pj.sayyo.model.issue.mapper;

import com.pj.sayyo.model.issue.dto.IssueDto;
import com.pj.sayyo.model.politician.dto.PoliticianDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IssueMapper {
    int regist(IssueDto issueDto);
    List<IssueDto> findAll();
    int modify(IssueDto issueDto);
    int delete(IssueDto issueDto);
    List<IssueDto> findSearch(IssueDto issueDto);
}
