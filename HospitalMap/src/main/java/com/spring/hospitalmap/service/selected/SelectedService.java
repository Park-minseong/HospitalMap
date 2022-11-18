package com.spring.hospitalmap.service.selected;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.spring.hospitalmap.entity.Selected;

public interface SelectedService {

	Selected saveInfo(Selected selected);

	List<Selected> getSelectedListByUserId(String userId,Pageable pageable);

}
