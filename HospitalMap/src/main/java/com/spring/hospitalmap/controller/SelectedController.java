package com.spring.hospitalmap.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.hospitalmap.entity.Selected;
import com.spring.hospitalmap.service.selected.SelectedService;

@RestController
public class SelectedController {

	@Autowired
	SelectedService selectedService;
	
	@PostMapping
	public Map<String, Object> saveInfo(@RequestBody Selected selected){
		try {
			Map<String, Object> resMap = new HashMap<String, Object>();
			
			
			return resMap;
		}catch(Exception e){
			Map<String, Object> resMap = new HashMap<String, Object>();
			
			return resMap;
		}
		
	}
}
