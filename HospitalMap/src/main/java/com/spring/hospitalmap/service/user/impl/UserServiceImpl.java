package com.spring.hospitalmap.service.user.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.hospitalmap.entity.User;
import com.spring.hospitalmap.repository.UserRepository;
import com.spring.hospitalmap.service.user.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User join(User user) {
		return userRepository.save(user);
	}
	
	@Override
	public User login(String userId, String userPw) {
		User loginUser = userRepository.findById(userId).get();
		if (loginUser != null) {		
			if (passwordEncoder.matches(userPw, loginUser.getUserPw())) {
				return loginUser;
			}else {
				return null;
			}
		}
		return null;
	}


}
