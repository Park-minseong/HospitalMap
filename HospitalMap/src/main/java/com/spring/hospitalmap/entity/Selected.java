package com.spring.hospitalmap.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name="T_SELECTED")
@IdClass(SelectedId.class)
public class Selected {

	@Id
	private String ykiho;
	
	@Id
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
	
	private String yadmNm;
	
	private String addr;
	
	private String postNo;
	
	private String XPos;
	
	private String YPos;
	
	private String telno;
	
	private String hospUrl;
	
	@CreationTimestamp
	private LocalDateTime insDate;
	
	
}
