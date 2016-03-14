package com.intl.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.stereotype.Service;

import com.intl.dto.EmployeeDTO;
import com.intl.entity.EmployeeEntity;
import com.intl.entity.UserEntity;

@Service
public interface SupplierService {

	public DataTablesOutput<EmployeeEntity> findAllUsers(DataTablesInput input);

	public EmployeeEntity addEmployee(EmployeeDTO employee);

	public EmployeeEntity getEmployeeDetailsById(Long rowId);

	public EmployeeEntity editEmployee(EmployeeDTO employee);

	public List<EmployeeEntity> deleteEmployee(List<Long> employeeIdList);


    

}
