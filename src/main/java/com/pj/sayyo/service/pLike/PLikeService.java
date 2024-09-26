package com.pj.sayyo.service.pLike;

import com.pj.sayyo.model.pLike.dto.PLikeDto;
import com.pj.sayyo.model.pLike.mapper.PLikeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PLikeService {
    int like(PLikeDto pLikeDto);
    int polLike(PLikeDto pLikeDto);
    int dislike(PLikeDto pLikeDto);
    int polDislike(PLikeDto pLikeDto);
    int cancelLike(PLikeDto pLikeDto);
    int polCancelLike(PLikeDto pLikeDto);
    int deleteLike(PLikeDto pLikeDto);
    int polCancelDislike(PLikeDto pLikeDto);
    List<PLikeDto> findAll();
    int modify(PLikeDto pLikeDto);
    int findLike(PLikeDto pLikeDto);
    PLikeDto findState(PLikeDto pLikeDto);
}
