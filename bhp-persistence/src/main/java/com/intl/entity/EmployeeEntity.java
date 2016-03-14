package com.intl.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
@Table( name = "employee" )
public class EmployeeEntity {
	 private static final long serialVersionUID = 1L;

	    @Id
	    @GeneratedValue
	    @Column( name = "id" )
	    @JsonView(DataTablesOutput.View.class)
	    private Long id;
	    @JsonView(DataTablesOutput.View.class)
	    @Column( name = "employee_name" )
	    private String employeeName;
	    @JsonView(DataTablesOutput.View.class)
	    @Column( name = "designation" )
	    private String designation;
	    @Column( name = "deleted" )
	    private char deleted;
	    
	    
		
		public char getDeleted() {
			return deleted;
		}
		public void setDeleted(char deleted) {
			this.deleted = deleted;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getEmployeeName() {
			return employeeName;
		}
		public void setEmployeeName(String employeeName) {
			this.employeeName = employeeName;
		}
		public String getDesignation() {
			return designation;
		}
		public void setDesignation(String designation) {
			this.designation = designation;
		}
	    
}
