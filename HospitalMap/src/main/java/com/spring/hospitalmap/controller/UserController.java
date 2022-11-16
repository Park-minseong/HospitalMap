package com.spring.hospitalmap.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.hospitalmap.entity.User;
import com.spring.hospitalmap.jwt.JwtTokenProvider;
import com.spring.hospitalmap.service.user.UserService;



@RestController
@RequestMapping("/user")
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
			resMap.put("error", "join failed");
			return resMap;
		}
	}
}
