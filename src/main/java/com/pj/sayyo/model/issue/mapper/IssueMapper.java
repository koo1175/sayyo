package com.pj.sayyo.model.issue.mapper;

import com.pj.sayyo.model.issue.dto.IssueDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface IssueMapper {
    int regist(IssueDto issueDto);
    List<IssueDto> findAll();
    int modify(IssueDto issueDto);
    int delete(IssueDto issueDto);
    List<IssueDto> findSearch(IssueDto issueDto);
}
