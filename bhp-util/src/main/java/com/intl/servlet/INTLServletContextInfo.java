package com.intl.servlet;

public class INTLServletContextInfo {
    private static String contextPath;
    private static String realPath;

    public static String getRealPath() {
        return realPath;
    }

    public static void setRealPath( String realPath ) {
        INTLServletContextInfo.realPath = realPath;
    }

    public static String getContextPath() {
        return contextPath;
    }

    public static void setContextPath( String contextPath ) {
        INTLServletContextInfo.contextPath = contextPath;
    }

}
