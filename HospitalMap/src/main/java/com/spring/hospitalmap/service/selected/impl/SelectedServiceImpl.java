package com.spring.hospitalmap.service.selected.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.hospitalmap.entity.Selected;
import com.spring.hospitalmap.repository.SelectedRepository;
import com.spring.hospitalmap.service.selected.SelectedService;

@Service
public class SelectedServiceImpl implements SelectedService {

	@Autowired
	SelectedRepository selectedRepository;
	
	@Override
	public Selected saveInfo(Selected selected) {
		return selectedRepository.save(selected);
	}

}
