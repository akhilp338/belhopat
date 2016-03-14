package com.intl.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.xml.sax.SAXException;

import com.intl.util.constants.Constants;

@Controller
public class LoginController {

    @RequestMapping( value = {
        "/errorPage"
    }, method = RequestMethod.GET )
    public String errorPage() {
        return "errorPage";
    }

    @RequestMapping( value = {
        "/login"
    }, method = RequestMethod.GET )
    public ModelAndView loginPage( @RequestParam( value = "error", required = false ) String error,
        @RequestParam( value = "logout", required = false ) String logout,
        HttpServletRequest request) {
        ModelAndView model = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(error!=null){
        	model.addObject("error","Wrong User name or Password");
        }
        model.setViewName( "/login/newlogin" );
        return model;
    }


    @RequestMapping( value = "/loginSuccess", method = RequestMethod.GET )
    public String loginSuccess( HttpServletRequest request ) {
        String redirectUrl = "redirect:supplier";
        return redirectUrl;
    }

    @RequestMapping( value = "/logout", method = RequestMethod.GET )
    public String logoutPage(
        HttpServletRequest request, HttpServletResponse response ) throws ServletException {
        Assert.notNull( request, "HttpServletRequest required" );
        SecurityContextHolder.clearContext();
        if ( request.getSession() != null ) {
            request.getSession( false ).invalidate();
        }
        request.logout();

        return Constants.LOGIN;
    }

    @RequestMapping( value = "/getTimeOut", method = RequestMethod.GET )
    @ResponseBody
    public int getSessionTimeOutValueFromXML( HttpServletRequest request )
        throws NumberFormatException, XPathExpressionException, SAXException, IOException,
        ParserConfigurationException {
        int sessionTimeoutFromWebXml = Integer.parseInt( XPathFactory.newInstance().newXPath()
            .compile( Constants.WEB_XML_SESSION_TIMEOUT )
            .evaluate( DocumentBuilderFactory.newInstance().newDocumentBuilder()
                .parse(
                    request.getServletContext().getResourceAsStream( Constants.WEB_XML_PATH ) ) ) );
        return sessionTimeoutFromWebXml;
    }

}
