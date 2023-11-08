package com.pj.sayyo.controller.kakao;

import com.pj.sayyo.model.OAuthToken;
import com.pj.sayyo.model.kakao.KakaoProfile;
import com.pj.sayyo.model.member.dto.MemberDto;
import com.pj.sayyo.service.member.MemberService;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;



@Controller
public class KakaoController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private HttpSession session;

    @RequestMapping("/login")
    public String kakaoLogin() {
        return "main";
    }

    @GetMapping("/auth/kakao/callback")
    public @ResponseBody String kakaoCallback(String code) throws IOException {


        RestTemplate rt = new RestTemplate();

        //HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");


        //HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id","83436f628f495320a86c25e73edcc2f8");
        params.add("redirect_uri","http://localhost:8095/auth/kakao/callback");
        params.add("code",code);

        //HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoTockenRequest =
                new HttpEntity<>(params, headers);


        //Http요청하기 - Post방식으로 그러면 response로 응답받음
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTockenRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        OAuthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        }catch (JsonMappingException e) {
            e.printStackTrace();
        }catch (JsonProcessingException e){
            e.printStackTrace();
        }

        System.out.println("카카오 액세스 토큰:"+oauthToken.getAccess_token());


        RestTemplate rt2 = new RestTemplate();

        //HttpHeader 오브젝트 생성
        HttpHeaders headers2 = new HttpHeaders();
        headers2.add("Authorization","Bearer " + oauthToken.getAccess_token());
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoNickNameRequest =
                new HttpEntity<>(headers2);


        //Http요청하기 - Post방식으로 그러면 response로 응답받음
        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoNickNameRequest,
                String.class
        );

        ObjectMapper objectMapper2 = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper2.readValue(response2.getBody(), KakaoProfile.class);
        }catch (JsonMappingException e) {
            e.printStackTrace();
        }catch (JsonProcessingException e){
            e.printStackTrace();
        }

        //User 오브젝트: id, username, password
        System.out.println("카카오 아이디(번호): "+kakaoProfile.getId());
        System.out.println("카카오 이름: "+kakaoProfile.getKakao_account().getProfile().getNickname());
        UUID garbagePassword = UUID.randomUUID();
        String shortPassword = garbagePassword.toString().substring(0, 30);
        System.out.println("블로그서버패스워드: "+garbagePassword);

        MemberDto user = MemberDto.builder()
                .id(String.valueOf(kakaoProfile.getId()))
                .pw(shortPassword.toString())
                .name(kakaoProfile.getKakao_account().getProfile().getNickname()) // Profile의 nickname 가져오기
                .nickname("꽥꽥이")
                .phone("01012341234")
                .address("asd")
                .registNum("1234561234567")
                .build();

        //가입자 혹은 비가입자 체크해서 처리
        MemberDto originUser = memberService.findByUserId(user.getId());

        if(originUser == null) {
            memberService.regist(user);
            session.setAttribute("member", originUser); // 세션에 사용자 정보 저장
        }

        //로그인 처리
        if(session.getAttribute("member") != null) {
            // 로그인 성공
            return "로그인 성공";
        }
        return response2.getBody();
    }
}
