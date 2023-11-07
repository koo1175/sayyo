package com.pj.sayyo.model.rLike.mapper;

import com.pj.sayyo.model.rLike.dto.RLikeDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RLikeMapper {
    int like(RLikeDto rLikeDto);
    int reLike(RLikeDto rLikeDto);
    int dislike(RLikeDto rLikeDto);
    int reDislike(RLikeDto rLikeDto);
    int cancelLike(RLikeDto rLikeDto);
    int reCancelLike(RLikeDto rLikeDto);
    int reCancelDislike(RLikeDto rLikeDto);
    int findLike(RLikeDto rLikeDto);
    int deleteLike(RLikeDto rLikeDto);
    RLikeDto findState(RLikeDto rLikeDto);

}
