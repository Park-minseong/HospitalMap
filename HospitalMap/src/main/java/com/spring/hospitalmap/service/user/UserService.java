package com.spring.hospitalmap.service.user;

import com.spring.hospitalmap.entity.User;

public interface UserService {

	User join(User user);

	User login(String userId, String userPw);

}
