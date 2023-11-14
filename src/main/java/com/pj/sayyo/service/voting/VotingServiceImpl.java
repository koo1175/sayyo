package com.pj.sayyo.service.voting;

import com.pj.sayyo.model.voting.dto.VotedDto;
import com.pj.sayyo.model.voting.dto.VotingDto;
import com.pj.sayyo.model.voting.mapper.VotingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VotingServiceImpl implements VotingService{

    @Autowired
    private VotingMapper votingMapper;
    @Override
    public int regist(VotingDto votingDto) {
        return votingMapper.regist(votingDto);
    }

    @Override
    public int delete(VotingDto votingDto) {
        return votingMapper.delete(votingDto);
    }

    @Override
    public List<VotingDto> findAll() {
        return votingMapper.findAll();
    }

    @Override
    public int voteScore(VotingDto votingDto) {
        return votingMapper.voteScore(votingDto);
    }

    @Override
    public int voted(VotedDto votedDto) {
        return votingMapper.voted(votedDto);
    }

    @Override
    public int findVoted(VotedDto votedDto) {
        return votingMapper.findVoted(votedDto);
    }
}
