package com.intl.servlet;

import java.io.File;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class INTLServletListener implements ServletContextListener {

    @Override
    public void contextDestroyed( final ServletContextEvent event ) {
        // Do nothing
    }

    @Override
    public void contextInitialized( ServletContextEvent event ) {
        INTLServletContextInfo
            .setContextPath( event.getServletContext().getContextPath() );
        INTLServletContextInfo
            .setRealPath( event.getServletContext().getRealPath( File.separator ) );
    }

}
