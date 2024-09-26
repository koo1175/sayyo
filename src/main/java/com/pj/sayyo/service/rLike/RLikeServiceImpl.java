package com.pj.sayyo.service.rLike;

import com.pj.sayyo.model.rLike.dto.RLikeDto;
import com.pj.sayyo.model.rLike.mapper.RLikeMapper;
import com.pj.sayyo.model.reply.mapper.ReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RLikeServiceImpl implements RLikeService {
    @Autowired
    private RLikeMapper rLikeMapper;


    @Override
    public int like(RLikeDto rLikeDto) {
        return rLikeMapper.like(rLikeDto);
    }

    @Override
    public int reLike(RLikeDto rLikeDto) {
        return rLikeMapper.reLike(rLikeDto);
    }

    @Override
    public int dislike(RLikeDto rLikeDto) {
        return rLikeMapper.dislike(rLikeDto);
    }

    @Override
    public int reDislike(RLikeDto rLikeDto) {
        return rLikeMapper.reDislike(rLikeDto);
    }

    @Override
    public int cancelLike(RLikeDto rLikeDto) {
        return rLikeMapper.cancelLike(rLikeDto);
    }

    @Override
    public int reCancelLike(RLikeDto rLikeDto) {
        return rLikeMapper.reCancelLike(rLikeDto);
    }

    @Override
    public int reCancelDislike(RLikeDto rLikeDto) {
        return rLikeMapper.reCancelDislike(rLikeDto);
    }

    @Override
    public int findLike(RLikeDto rLikeDto) {
        return rLikeMapper.findLike(rLikeDto);
    }

    @Override
    public int deleteLike(RLikeDto rLikeDto){ return rLikeMapper.deleteLike(rLikeDto);}

    @Override
    public RLikeDto findState(RLikeDto rLikeDto){ return rLikeMapper.findState(rLikeDto);}

}
