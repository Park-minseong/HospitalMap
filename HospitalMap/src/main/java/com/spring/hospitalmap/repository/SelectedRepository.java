package com.spring.hospitalmap.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.hospitalmap.entity.Selected;
import com.spring.hospitalmap.entity.SelectedId;

public interface SelectedRepository extends JpaRepository<Selected, SelectedId>{

}
