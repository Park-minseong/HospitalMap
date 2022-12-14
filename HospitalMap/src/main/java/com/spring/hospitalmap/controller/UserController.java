package com.spring.hospitalmap.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
			resMap.put("error", e.getMessage());
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
			resMap.put("error", e.getMessage());
			return resMap;
		}
	}
	
	@GetMapping("/getUserInfo")
	public Map<String, Object> getUserInfo(@AuthenticationPrincipal String userId){
		try {
			Map<String, Object> resMap = new HashMap<String, Object>();

			if (userId != "anonymousUser") {
				resMap.put("user", userId);
			} else {
				resMap.put("user", null);
			}
			return resMap;

		} catch (Exception e) {
			Map<String, Object> resMap = new HashMap<String, Object>();
			resMap.put("error", e.getMessage());
			return resMap;
		}
	}
	
	
	@GetMapping("/oauth2/kakao")
	public Map<String, Object> kakaoLogin(@RequestParam String code){
		try {
			Map<String, Object> resMap = new HashMap<String, Object>();

			KakaoToken kakotoken = getAccessToken(code);// code??? ?????? ??????????????? ?????????????????? ???????????? ?????????
			
			KakaoUser kakaoUser =getKakaoUserInfo(kakotoken.getAccess_token());// kakotoken??? ?????? ????????????????????? access_token??? ???????????? ??????????????? ???????????? ?????????
			
			User user = new User();
			
			if(userService.getUserInfoByUserId("kakao"+kakaoUser.getId().toString()) == null) {
		
				user.setUserId("kakao"+kakaoUser.getId().toString());
		
				userService.join(user);
			}else {
				user = userService.getUserInfoByUserId("kakao"+kakaoUser.getId().toString());
			
			}
			
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

		// ???????????? POST???????????? key=value ???????????? ?????????. RestTemplate??? ???????????? ????????? ????????? ??? ??? ??????.
		RestTemplate rt = new RestTemplate();

		// HttpHeader ???????????? ??????
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		// HttpBody ???????????? ??????
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", "c410f6367d298abcb2c4126b555146b0");
		params.add("redirect_uri", "https://pt.mayahouse.kr/oauth2/kakao");
		params.add("code", code);

		// HttpHeader??? HttpBody??? HttpEntity??? ?????? (why? rt.exchange?????? HttpEntity????????? ?????? ????????????.)
		HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(params, headers);

		// HTTP ?????? - POST?????? - response ?????? ??????
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
	
	@GetMapping("test")
	public Map<String, Object> test(){
		Map<String, Object> resMap = new HashMap<String, Object>();
		
		resMap.put("ddd", "Sdfdsgdfgd");
		
		return resMap;
	}
}


