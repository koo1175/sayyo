package com.pj.sayyo.model.pLike.mapper;

import com.pj.sayyo.model.pLike.dto.PLikeDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PLikeMapper {
    int like(PLikeDto pLikeDto);
    int polLike(PLikeDto pLikeDto);
    int dislike(PLikeDto pLikeDto);
    int polDislike(PLikeDto pLikeDto);
    int cancelLike(PLikeDto pLikeDto);
    int polCancelLike(PLikeDto pLikeDto);
    int polCancelDislike(PLikeDto pLikeDto);
    List<PLikeDto> findAll();
    int modify(PLikeDto pLikeDto);
    int findLike(PLikeDto pLikeDto);
    int deleteLike(PLikeDto pLikeDto);
    PLikeDto findState(PLikeDto pLikeDto);
}