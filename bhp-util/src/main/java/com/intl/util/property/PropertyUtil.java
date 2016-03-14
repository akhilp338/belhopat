package com.intl.util.property;

import org.springframework.util.StringUtils;

public class PropertyUtil {

    private String environment = "local";
    
    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public String getEnvironment() {
        if(StringUtils.hasText(System.getenv("env"))) {
            environment = System.getenv("env");
            System.out.println("Environment : "+environment);
        }
        return environment;
    }
}
