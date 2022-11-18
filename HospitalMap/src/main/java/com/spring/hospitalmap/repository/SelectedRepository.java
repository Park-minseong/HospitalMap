package com.spring.hospitalmap.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.hospitalmap.entity.Selected;
import com.spring.hospitalmap.entity.SelectedId;
import com.spring.hospitalmap.entity.User;

public interface SelectedRepository extends JpaRepository<Selected, SelectedId>{

	List<Selected>  findByUser(User user, Pageable pageable);

}
