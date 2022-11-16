package com.spring.hospitalmap.service.user.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.hospitalmap.entity.User;
import com.spring.hospitalmap.repository.UserRepository;
import com.spring.hospitalmap.service.user.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Override
	public User join(User user) {
		return userRepository.save(user);
	}

}
