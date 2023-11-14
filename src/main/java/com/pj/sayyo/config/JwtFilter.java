package com.pj.sayyo.config;

import com.pj.sayyo.service.member.MemberService;
import com.pj.sayyo.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter  extends OncePerRequestFilter {


    private final MemberService memberService;
    private final String secretKey;

    //문이라고 생각하고 이쪽으로 통과한다고 생각
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorication : {}",authorization);

        //Token안보내면 Block
        if(authorization == null || !authorization.startsWith(("Bearer "))) {
            log.info("authorication을 잘못 보냈습니다.");
            filterChain.doFilter(request, response);
            return;
        }

        //Token꺼내기
        String token = authorization.split(" ")[1];

        //Token Expired되었는지 여부
        if(JwtUtil.isExpired(token, secretKey)) {
            log.error("Token이 만료 되었습니다.");
            filterChain.doFilter(request, response);
        }


        //userName Token에서 꺼내기
        String userName = JwtUtil.getUserName(token, secretKey);
        log.info("userName:{}", userName);

        //권한부여
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userName, null, List.of(new SimpleGrantedAuthority("USER")));

        //Detail로 넣어줍니다.
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        filterChain.doFilter(request, response);

    }
}
