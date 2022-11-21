package com.spring.hospitalmap.service.selected;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.hospitalmap.entity.Selected;
import com.spring.hospitalmap.entity.SelectedId;

public interface SelectedService {

	Selected saveInfo(Selected selected);

	Page<Selected> getSelectedListByUserId(String userId,Pageable pageable);

	Selected getSeletedOne(SelectedId selectedId);

	void deleteInfoById(SelectedId selectedId);

}
