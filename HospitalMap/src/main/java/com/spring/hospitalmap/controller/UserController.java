package com.spring.hospitalmap.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.hospitalmap.entity.User;
import com.spring.hospitalmap.jwt.JwtTokenProvider;
import com.spring.hospitalmap.oauth.KakaoToken;
import com.spring.hospitalmap.oauth.KakaoUser;
import com.spring.hospitalmap.service.user.UserService;



@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@PostMapping("/join")
	public Map<String, Object> join(@RequestBody User user) {
		try {
			user.setUserPw(passwordEncoder.encode(user.getUserPw()));
			User joinUser = userService.join(user);

			Map<String, Object> resMap = new HashMap<String, Object>();

			if (joinUser != null) {
				resMap.put("result", "successed");
				return resMap;
			} else {
				resMap.put("result", "failed");
				return resMap;
			}
		} catch (Exception e) {
			Map<String, Object> resMap = new HashMap<String, Object>();
			resMap.put("error", "join failed");
			return resMap;
		}
	}

	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody User user) {
		try {
			Map<String, Object> resMap = new HashMap<String, Object>();

			User loginUser = userService.login(user.getUserId(), user.getUserPw());

			if (loginUser != null) {
				final String token = jwtTokenProvider.create(loginUser);

				final User resUser = new User();
				resUser.setUserId(loginUser.getUserId());
				resUser.setUserPw(loginUser.getUserPw());
				resUser.setRole(loginUser.getRole());
				resUser.setToken(token);

				resMap.put("user", resUser);
			} else {
				resMap.put("user", null);
			}
			return resMap;

		} catch (Exception e) {
			Map<String, Object> resMap = new HashMap<String, Object>();
			resMap.put("error", "login failed");
			return resMap;
		}
	}
	
	@GetMapping("/oauth2/kakao")
	public Map<String, Object> kakaoLogin(@RequestParam String code){
		try {
			Map<String, Object> resMap = new HashMap<String, Object>();

			KakaoToken kakotoken = getAccessToken(code);// code에 담긴 인가코드로 엑세스토큰을 불러오는 메소드
			
			KakaoUser kakaoUser =getKakaoUserInfo(kakotoken.getAccess_token());// kakotoken에 담긴 엑세스토큰에서 access_token을 사용하여 유저정보를 불러오는 메소드
			
			User user = new User();
			System.out.println(1);
			if(userService.getUserInfoByUserId("kakao"+kakaoUser.getId().toString()) == null) {
				System.out.println(2);
				user.setUserId("kakao"+kakaoUser.getId().toString());
				System.out.println(2);
				userService.join(user);
			}else {
				user = userService.getUserInfoByUserId("kakao"+kakaoUser.getId().toString());
				System.out.println(3);
			}
			System.out.println(4);
			user.setToken(jwtTokenProvider.create(user));
			
			resMap.put("user", user);
			
			return resMap;

		} catch (Exception e) {
			Map<String, Object> resMap = new HashMap<String, Object>();
			resMap.put("error", e.getMessage());
			return resMap;
		}
	}
	
	private KakaoToken getAccessToken(String code) {

		// 카카오에 POST방식으로 key=value 데이터를 요청함. RestTemplate를 사용하면 요청을 편하게 할 수 있다.
		RestTemplate rt = new RestTemplate();

		// HttpHeader 오브젝트 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		// HttpBody 오브젝트 생성
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", "c410f6367d298abcb2c4126b555146b0");
		params.add("redirect_uri", "http://localhost:3000/oauth2/kakao");
		params.add("code", code);

		// HttpHeader와 HttpBody를 HttpEntity에 담기 (why? rt.exchange에서 HttpEntity객체를 받게 되어있다.)
		HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(params, headers);

		// HTTP 요청 - POST방식 - response 응답 받기
		ResponseEntity<String> responseToken = rt.exchange("https://kauth.kakao.com/oauth/token", HttpMethod.POST, kakaoRequest, String.class);

		ObjectMapper objectMapper = new ObjectMapper();
		KakaoToken kakaoToken = null;
		try {
			kakaoToken = objectMapper.readValue(responseToken.getBody(), KakaoToken.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return kakaoToken;
		
	}
	
	private KakaoUser getKakaoUserInfo(String token) {

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + token);
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		HttpEntity<MultiValueMap<String, String>> ProfileRequest = new HttpEntity<>(headers);

		ResponseEntity<String> ProfileResponse = restTemplate.exchange("https://kapi.kakao.com/v2/user/me",
				HttpMethod.POST, ProfileRequest, String.class);

		ObjectMapper objectMapper = new ObjectMapper();
		KakaoUser kakaoUser = null;
		try {
			kakaoUser = objectMapper.readValue(ProfileResponse.getBody(), KakaoUser.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return kakaoUser;
	}
}


