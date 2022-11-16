package com.spring.hospitalmap.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Data
@Entity
@Table(name="T_USER")
public class User {
	@Id
	private String userId;
	
	private String userPw;

	private String role = "ROLE_USER";
}
