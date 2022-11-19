package com.spring.hospitalmap.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.hospitalmap.entity.User;

public interface UserRepository extends JpaRepository<User, String>{

}
