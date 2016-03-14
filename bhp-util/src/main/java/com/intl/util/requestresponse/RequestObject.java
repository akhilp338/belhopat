package com.intl.util.requestresponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RequestObject {
	
	private List<Long> offerIds = new ArrayList<Long>();;
	
	private String offerType;
	
	private Map<Long, String> removeComments = new HashMap<Long,String>();

	public List<Long> getOfferIds() {
		return offerIds;
	}

	public void setOfferIds(List<Long> offerIds) {
		this.offerIds = offerIds;
	}

	public String getOfferType() {
		return offerType;
	}

	public void setOfferType(String offerType) {
		this.offerType = offerType;
	}

	public Map<Long, String> getRemoveComments() {
		return removeComments;
	}

	public void setRemoveComments(Map<Long, String> removeComments) {
		this.removeComments = removeComments;
	}


}
