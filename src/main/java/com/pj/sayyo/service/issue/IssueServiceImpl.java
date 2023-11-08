package com.pj.sayyo.service.issue;

import com.pj.sayyo.model.board.dto.BoardDto;
import com.pj.sayyo.model.board.mapper.BoardMapper;
import com.pj.sayyo.model.issue.dto.IssueDto;
import com.pj.sayyo.model.issue.mapper.IssueMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueServiceImpl implements IssueService{
    @Autowired
    private IssueMapper issueMapper;

    @Override
    public int regist(IssueDto issueDto) {
        return issueMapper.regist(issueDto);
    }

    @Override
    public List<IssueDto> findAll() {
        return issueMapper.findAll();
    }

    @Override
    public int modify(IssueDto issueDto) {
        return issueMapper.modify(issueDto);
    }

    @Override
    public int delete(IssueDto issueDto) {
        return issueMapper.delete(issueDto);
    }

    @Override
    public List<IssueDto> findSearch(IssueDto issueDto) {
        return issueMapper.findSearch(issueDto);
    }
}
