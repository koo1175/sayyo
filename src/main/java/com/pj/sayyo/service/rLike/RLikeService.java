package com.pj.sayyo.service.rLike;

import com.pj.sayyo.model.member.dto.MemberDto;
import com.pj.sayyo.model.pLike.dto.PLikeDto;
import com.pj.sayyo.model.rLike.dto.RLikeDto;

import java.util.List;

public interface RLikeService {

    int like(RLikeDto rLikeDto);

    int reLike(RLikeDto rLikeDto);
    int dislike(RLikeDto rLikeDto);
    int reDislike(RLikeDto rLikeDto);
    int cancelLike(RLikeDto rLikeDto);
    int reCancelLike(RLikeDto rLikeDto);
    int reCancelDislike(RLikeDto rLikeDto);

    int deleteLike(RLikeDto rLikeDto);

    int findLike(RLikeDto rLikeDto);
    RLikeDto findState(RLikeDto rLikeDto);

}
