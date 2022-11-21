package com.spring.hospitalmap.service.selected.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.hospitalmap.entity.Selected;
import com.spring.hospitalmap.entity.SelectedId;
import com.spring.hospitalmap.entity.User;
import com.spring.hospitalmap.repository.SelectedRepository;
import com.spring.hospitalmap.service.selected.SelectedService;

@Service
public class SelectedServiceImpl implements SelectedService {

	@Autowired
	SelectedRepository selectedRepository;
	
	@Override
	public Selected saveInfo(Selected selected) {
		SelectedId selectedId = new SelectedId();
		selectedId.setUser(selected.getUser().getUserId());
		selectedId.setYkiho(selected.getYkiho());
		Optional<Selected> findSelected = selectedRepository.findById(selectedId);
		if (findSelected.isEmpty()) {
			return selectedRepository.save(selected);
		} else {
			return null;
		}

	}

	@Override
	public Page<Selected> getSelectedListByUserId(String userId,Pageable pageable) {
		User user = new User();
		user.setUserId(userId);
		
		return selectedRepository.findByUser(user, pageable);
	}

	@Override
	public void deleteInfoById(SelectedId selectedId) {
		selectedRepository.deleteById(selectedId);
	}

	@Override
	public Selected getSeletedOne(SelectedId selectedId) {
		Optional<Selected> findSelected = selectedRepository.findById(selectedId);
		if (findSelected.isEmpty()) {
			return null;
		} else {
			return findSelected.get();
		}
	}

}
