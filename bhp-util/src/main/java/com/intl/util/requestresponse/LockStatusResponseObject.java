package com.intl.util.requestresponse;

public class LockStatusResponseObject {

    private Long offerMasterId;
    
    private Boolean lockStatus;
    
    
    public Long getOfferMasterId() {
        return offerMasterId;
    }


    public void setOfferMasterId( Long offerMasterId ) {
        this.offerMasterId = offerMasterId;
    }


    public Boolean getLockStatus() {
        return lockStatus;
    }


    public void setLockStatus( Boolean lockStatus ) {
        this.lockStatus = lockStatus;
    }

    public LockStatusResponseObject( Long offerMasterId, boolean lockStatus ) {
        this.offerMasterId = offerMasterId;
        this.lockStatus = lockStatus;
    }
    
}
