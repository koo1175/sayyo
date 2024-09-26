package com.pj.sayyo.model.voting.mapper;

import com.pj.sayyo.model.voting.dto.VotedDto;
import com.pj.sayyo.model.voting.dto.VotingDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface VotingMapper {
    int regist(VotingDto votingDto);
    int delete(VotingDto votingDto);
    List<VotingDto> findAll();
    int voteScore(VotingDto votingDto);
    int voted(VotedDto votedDto);
    int findVoted(VotedDto votedDto);
}
