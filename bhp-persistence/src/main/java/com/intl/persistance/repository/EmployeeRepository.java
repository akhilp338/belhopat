package com.intl.persistance.repository;

import java.util.List;

import org.springframework.data.jpa.datatables.repository.DataTablesRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.intl.entity.EmployeeEntity;
import com.intl.entity.UserEntity;

@Repository
public interface EmployeeRepository extends JpaRepository< EmployeeEntity, Long > ,
DataTablesRepository< EmployeeEntity, Long >  {

	
	@Query("select emp from EmployeeEntity emp where emp.id in (:employeeIdList)")
	List<EmployeeEntity> findAllSelectedEmp(
			@Param(value = "employeeIdList") List<Long> employeeIdList);

}
