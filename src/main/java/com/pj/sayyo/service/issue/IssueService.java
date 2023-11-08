package com.pj.sayyo.service.issue;

import com.pj.sayyo.model.board.dto.BoardDto;
import com.pj.sayyo.model.issue.dto.IssueDto;

import java.util.List;

public interface IssueService {
    int regist(IssueDto issueDto);
    List<IssueDto> findAll();
    int modify(IssueDto issueDto);
    int delete(IssueDto issueDto);
    List<IssueDto> findSearch(IssueDto issueDto);
}