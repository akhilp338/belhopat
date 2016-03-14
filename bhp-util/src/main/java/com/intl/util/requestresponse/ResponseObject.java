package com.intl.util.requestresponse;

import java.util.List;

import com.intl.util.constants.Constants;

public class ResponseObject {

    private boolean actionStatus;
    private String statusMessage;
    private String tradeId;
    private String id;
    private List< String > groupIdList;
    private boolean groupIdExist;
    private boolean premiumCheck;
    private String groupId;

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId( String groupId ) {
        this.groupId = groupId;
    }

    public List< String > getGroupIdList() {
        return groupIdList;
    }

    public void setGroupIdList( List< String > groupIdList ) {
        this.groupIdList = groupIdList;
    }

    public ResponseObject setTradeSuccesResponse( String tradeId ) {
        this.setActionStatus( true );
        this.setTradeId( tradeId );
        return this;
    }

    public ResponseObject setSuccesResponse( String id, String message ) {
        this.setActionStatus( true );
        this.setTradeId( id );
        this.setStatusMessage( message );
        return this;
    }

    public ResponseObject setGroupSaveSuccesResponse( String id, String message,
        boolean groupIdvalid, boolean premiumValid ) {
        this.setActionStatus( true );
        this.setGroupId( id );
        this.setStatusMessage( message );
        this.groupIdExist = groupIdvalid;
        this.premiumCheck = premiumValid;
        return this;
    }

    public ResponseObject setGroupSaveFailureResponse( String message,
        boolean groupIdvalid, boolean premiumValid ) {
        this.setActionStatus( false );
        this.setStatusMessage( message );
        this.groupIdExist = groupIdvalid;
        this.premiumCheck = premiumValid;
        return this;
    }

    public ResponseObject setTradeFailureResponse() {
        this.setActionStatus( false );
        this.setStatusMessage( Constants.TRADE_FAILURE_MSG );
        return this;
    }

    public ResponseObject setFailureResponse( String message ) {
        this.setActionStatus( false );
        this.setStatusMessage( message );
        return this;
    }

    public ResponseObject setGroupDeleteFailureResponse( List< String > id, String message ) {
        this.setActionStatus( false );
        this.setStatusMessage( message );
        this.setGroupIdList( id );
        return this;
    }

    public boolean isActionStatus() {
        return actionStatus;
    }

    public void setActionStatus( boolean tradeStatus ) {
        this.actionStatus = tradeStatus;
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage( String statusMessage ) {
        this.statusMessage = statusMessage;
    }

    public String getTradeId() {
        return tradeId;
    }

    public void setTradeId( String tradeId ) {
        this.tradeId = tradeId;
    }

    public boolean isGroupIdExist() {
        return groupIdExist;
    }

    public void setGroupIdExist( boolean groupIdExist ) {
        this.groupIdExist = groupIdExist;
    }

    public boolean isPremiumCheck() {
        return premiumCheck;
    }

    public void setPremiumCheck( boolean premiumCheck ) {
        this.premiumCheck = premiumCheck;
    }

    public String getId() {
        return id;
    }

    public void setId( String id ) {
        this.id = id;
    }
}
