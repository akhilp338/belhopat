package com.intl.controller;

import javax.mail.Session;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.intl.entity.UserEntity;
@Controller
public class BaseController {
	@RequestMapping( value = "/" )
    public String index( ModelMap model, HttpServletRequest request ) {
        return "login/home";
    }
	@RequestMapping( value = "/supplier"  )

	public ModelAndView loginpage( HttpServletRequest request ) throws ServletException {
	        ModelAndView model = new ModelAndView();
	        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	        UserEntity user=new UserEntity();
	        user.setUserName(auth.getName());
	        model.addObject( "loggedInUser", user );
	        model.setViewName( "supplier/supplier" );
	        return model;
	    }

}
