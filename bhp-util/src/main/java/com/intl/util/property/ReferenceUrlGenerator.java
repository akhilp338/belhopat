package com.intl.util.property;

import java.io.IOException;


public class ReferenceUrlGenerator {
	
	 static String loginUrl = null;
	
	

	public static String getLoginUrl() {
		return loginUrl;
	}

	public static void setLoginUrl(String loginUrl) {
		ReferenceUrlGenerator.loginUrl = loginUrl;
	}

	public static String getTradeUrl(String jdbcUrl) throws IOException {
		JdbcUrlSplitter(jdbcUrl);
		StringBuilder tradeUrl = new StringBuilder();
		PropertyUtil util = new PropertyUtil();
		if(util.getEnvironment() == "local"){
			tradeUrl.append("http://localhost:8080/bhp-back-office/");
		}else{
			tradeUrl.append("https://").append(host).append(":").append(port).append("/bhp-back-office/");
		}
		return tradeUrl.toString();
	}

	public static String getLoginUrl(String jdbcUrl){
		JdbcUrlSplitter(jdbcUrl);
		StringBuilder loginUrl = new StringBuilder();
		PropertyUtil util = new PropertyUtil();
		if(util.getEnvironment() == "local"){
			loginUrl.append("http://localhost:8080/bhp-back-office/login");
		}
		else{
			loginUrl.append("https://").append(host).append(":").append(port).append("/bhp-back-office/login");
		}
		setLoginUrl(loginUrl.toString());
		return loginUrl.toString();
	}
	
	public static String driverName;
	public static String host;
	public static String port;

	public static void JdbcUrlSplitter(String jdbcUrl) {
		int pos, pos1, pos2;
		String connUri;
		if (jdbcUrl == null || !jdbcUrl.startsWith("jdbc:") || (pos1 = jdbcUrl.indexOf(':', 5)) == -1) {
			throw new IllegalArgumentException("Invalid JDBC url.");
		} else {
			driverName = jdbcUrl.substring(5, pos1);
			if ((pos2 = jdbcUrl.indexOf(';', pos1)) != -1) {
				connUri = jdbcUrl.substring(pos1 + 1, pos2);
				if (connUri.startsWith("//")) {
					host = connUri.substring(2, 15);
					if ((pos = connUri.indexOf(':', 1)) != -1) {
						port = connUri.substring(pos + 1, pos + 5);
					}
				}
			}

		}

	}
	
}