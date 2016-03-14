package com.intl.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.annotation.JsonView;
import com.intl.dto.EmployeeDTO;
import com.intl.entity.EmployeeEntity;
import com.intl.service.LoginService;
import com.intl.service.SupplierService;


@Controller
@RequestMapping( "/supplier" )
public class SupplierController {

    @Autowired
    SupplierService supplierService;

    @Autowired
    LoginService loginService;

   
    @RequestMapping( value = "/getUserTab", method = RequestMethod.GET )
    public ModelAndView getConfirmedOffersTab() {
        ModelAndView model = new ModelAndView();
        model.setViewName( "/supplier/window/userManagement" );
        return model;
    }
   

    @RequestMapping( value = "/getUsers", method = RequestMethod.GET )
    @ResponseBody
    @JsonView(DataTablesOutput.View.class)
    public DataTablesOutput< com.intl.entity.EmployeeEntity > getConfirmedOffers( @Valid DataTablesInput input ) {
        return supplierService.findAllUsers( input );
    }
    
    
    @RequestMapping( value = "/getAddEmployeePage", method = RequestMethod.GET )
    public ModelAndView getAddEmployeePage() {
        ModelAndView model = new ModelAndView();
        model.setViewName( "/supplier/window/addEmployee" );
        return model;
    }
    
    @RequestMapping( value = "/getEditEmployeePage", method = RequestMethod.GET )
    public ModelAndView getEditEmployeePage(@RequestParam Long rowId) {
        ModelAndView model = new ModelAndView();
        model.addObject("employee", supplierService.getEmployeeDetailsById(rowId));
        model.setViewName( "/supplier/window/editEmployee" );
        return model;
    }
    
    
    @RequestMapping( value = "/addEmployee", method = RequestMethod.POST )
    @ResponseBody
    public EmployeeEntity addEmployee( @RequestBody EmployeeDTO employee,
        RedirectAttributes redirectAttributes ) throws ParseException {
    	EmployeeEntity emp=supplierService.addEmployee( employee );
        return emp;
    }
    
    @RequestMapping( value = "/editEmployee", method = RequestMethod.POST )
    @ResponseBody
    public EmployeeEntity editEmployee( @RequestBody EmployeeDTO employee,
        RedirectAttributes redirectAttributes ) throws ParseException {
    	EmployeeEntity emp=supplierService.editEmployee( employee );
        return emp;
    }
    
    @RequestMapping( value = "/deleteEmployee", method = RequestMethod.POST )
    @ResponseBody
    public List<EmployeeEntity> deleteEmployee( @RequestBody List<Long> employeeIdList,
        RedirectAttributes redirectAttributes ) throws ParseException {
    	List<EmployeeEntity> emp=supplierService.deleteEmployee( employeeIdList );
        return emp;
    }


}
