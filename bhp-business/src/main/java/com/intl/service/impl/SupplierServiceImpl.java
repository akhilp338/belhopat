package com.intl.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.intl.dto.EmployeeDTO;
import com.intl.entity.EmployeeEntity;
import com.intl.entity.UserEntity;
import com.intl.persistance.repository.EmployeeRepository;
import com.intl.persistance.repository.UserRepository;
import com.intl.service.SupplierService;
import com.intl.util.constants.Constants;
import com.intl.util.date.DateUtil;
import com.intl.util.dozer.INTLServiceHelper;

@Component
public class SupplierServiceImpl implements SupplierService {

	@Autowired
	EmployeeRepository employeeRepo;
	
	@Override
	public DataTablesOutput<EmployeeEntity> findAllUsers(DataTablesInput input) {
		
		Specification<EmployeeEntity> specification=new Specification<EmployeeEntity>() {
			@Override
			public Predicate toPredicate(Root<EmployeeEntity> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
				return cb.notEqual(root.get("deleted"), (char)'Y');
			}
		};
		DataTablesOutput<EmployeeEntity> emp=employeeRepo.findAll(input,specification);
		return emp;
	}

	@Override
	public EmployeeEntity addEmployee(EmployeeDTO employee) {
		EmployeeEntity empEntity=new EmployeeEntity();
		empEntity.setDesignation(employee.getDesignation());
		empEntity.setEmployeeName(employee.getEmployeeName());
		empEntity.setDeleted((char)'N');
		EmployeeEntity persistedEmp=employeeRepo.saveAndFlush(empEntity);
		return persistedEmp;
	}

	@Override
	public EmployeeEntity getEmployeeDetailsById(Long rowId) {
		return employeeRepo.findOne(rowId);
	}

	@Override
	@Transactional
	public EmployeeEntity editEmployee(EmployeeDTO employee) {
		EmployeeEntity employeeEntity=employeeRepo.findOne(employee.getId());
		employeeEntity.setDesignation(employee.getDesignation());
		employeeEntity.setEmployeeName(employee.getEmployeeName());
		return employeeRepo.save(employeeEntity);
		
	}

	@Override
	@Transactional
	public List<EmployeeEntity> deleteEmployee(List<Long> employeeIdList) {
		List<EmployeeEntity> listEmployee=employeeRepo.findAllSelectedEmp(employeeIdList);
		for (EmployeeEntity employeeEntity : listEmployee) {
			employeeEntity.setDeleted((char)'Y');
		}
		return employeeRepo.save(listEmployee);
	}

   

}
