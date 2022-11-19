package com.spring.hospitalmap.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.hospitalmap.entity.Selected;
import com.spring.hospitalmap.entity.SelectedId;
import com.spring.hospitalmap.entity.User;
import com.spring.hospitalmap.service.selected.SelectedService;
import com.spring.hospitalmap.service.user.UserService;

@RestController
public class SelectedController {

	@Autowired
	SelectedService selectedService;
	
	@Autowired
	UserService userService;
	
	@PostMapping("/saveinfo")
	public Map<String, Object> saveInfo(@RequestBody Selected selected, @AuthenticationPrincipal String userId){
		try {
			
			User user = userService.getUserInfoByUserId(userId);
			
			selected.setUser(user);
			
			Selected savedSelected = selectedService.saveInfo(selected);
			
			Map<String, Object> resMap = new HashMap<String, Object>();

			if (savedSelected != null) {
				resMap.put("savedSelected", savedSelected);
				resMap.put("result", "successed");
				return resMap;
			}else {
				resMap.put("result", "already");
				return resMap;
			}
			
		}catch(Exception e){
			Map<String, Object> resMap = new HashMap<String, Object>();
			resMap.put("error", e.getMessage());
			return resMap;
		}

	}
	
	@PostMapping("/deleteinfo")
	public Map<String, Object> deleteInfo(@RequestBody Selected selected, @AuthenticationPrincipal String userId){
		try {
							
			SelectedId selectedId = new SelectedId();
			selectedId.setUser(userId);
			selectedId.setYkiho(selected.getYkiho());
			
			User user = userService.getUserInfoByUserId(userId);
			
			selected.setUser(user);
			
			Selected savedSelected = selectedService.getSeletedOne(selectedId);
			
			Map<String, Object> resMap = new HashMap<String, Object>();

			if (savedSelected != null) {
				selectedService.deleteInfoById(selected);
				resMap.put("result", "successed");
				return resMap;
			}else {
				resMap.put("result", "no data");
				return resMap;
			}
			
		}catch(Exception e){
			Map<String, Object> resMap = new HashMap<String, Object>();
			resMap.put("error", e.getMessage());
			return resMap;
		}

	}

	@GetMapping("/getSelectedList")
	public Map<String, Object> getSelectedList(@AuthenticationPrincipal String userId, @PageableDefault(page = 0, size = 4, sort = "insDate", direction = Direction.ASC) Pageable pageable) {
		try {
				
			Map<String, Object> resMap = new HashMap<String, Object>();
			if (userId != "anonymousUser") {
				List<Selected> selectedList = selectedService.getSelectedListByUserId(userId, pageable);

				resMap.put("result", "successed");
				resMap.put("selectedList", selectedList);
				return resMap;

			} else {
				resMap.put("result", "userId is null");
				return resMap;
			}

		}catch(Exception e){
			Map<String, Object> resMap = new HashMap<String, Object>();
			resMap.put("error", e.getMessage());
			return resMap;
		}
		
	}
}
