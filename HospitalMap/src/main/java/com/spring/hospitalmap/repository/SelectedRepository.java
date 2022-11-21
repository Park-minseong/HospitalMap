package com.spring.hospitalmap.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.hospitalmap.entity.Selected;
import com.spring.hospitalmap.entity.SelectedId;
import com.spring.hospitalmap.entity.User;

@Transactional
public interface SelectedRepository extends JpaRepository<Selected, SelectedId>{

	Page<Selected>  findByUser(User user, Pageable pageable);

}
