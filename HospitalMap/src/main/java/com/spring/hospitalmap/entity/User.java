package com.spring.hospitalmap.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="T_USER")
public class User {
	@Id
	String userId;
	
	String userPw;
}
