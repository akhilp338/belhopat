package com.intl.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.intl.entity.UserEntity;
import com.intl.service.LoginService;

@Service("loginService")
public class LoginServiceImpl implements UserDetailsService, LoginService {

    @Autowired
    com.intl.persistance.repository.UserRepository userRepo;

    @Transactional
    @Override
    public UserDetails loadUserByUsername( String username ) {
        List< GrantedAuthority > authorities = null;
        UserEntity user = userRepo.findByUserName( username );
        userRepo.findAll();
        if ( user != null ) {
            authorities = buildUserAuthority( user.getRole() );
            return buildUserForAuthentication( user, authorities );
        }
        return null;
    }

    private User buildUserForAuthentication( com.intl.entity.UserEntity user,
        List< GrantedAuthority > authorities ) {
    	return new User(user.getUserName(), user.getPassword(), 
    			true, true, true, true, authorities);

    }

    private List< GrantedAuthority > buildUserAuthority( String role ) {
        Set< GrantedAuthority > setAuths = new HashSet< GrantedAuthority >();
        setAuths.add( new SimpleGrantedAuthority( "ROLE_" + role ) );
        List< GrantedAuthority > Result = new ArrayList< GrantedAuthority >( setAuths );
        return Result;
    }

	

}
