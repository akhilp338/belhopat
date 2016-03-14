package com.intl.util.sequence;

public class SequenceGenerator {

    public static String getConfirmedOfferId( Long increment, Long instanceId, Long multiplier ) {

        String offerId = "CFR-";
        Long sequence = getSequenceNumber( increment, instanceId, multiplier );
        offerId = offerId + sequence;
        return offerId;

    }

    public static String getUnconfirmedOfferId( Long increment, Long instanceId, Long multiplier ) {

        String offerId = "UFR-";
        Long sequence = getSequenceNumber( increment, instanceId, multiplier );
        offerId = offerId + sequence;
        return offerId;

    }

    public static String getRFQId( Long increment, Long instanceId, Long multiplier ) {

        String offerId = "RFQ-";
        Long sequence = getSequenceNumber( increment, instanceId, multiplier );
        offerId = offerId + sequence;
        return offerId;

    }

    public static String getDRFQId( Long increment, Long instanceId, Long multiplier ) {

        String offerId = "DRFQ-";
        Long sequence = getSequenceNumber( increment, instanceId, multiplier );
        offerId = offerId + sequence;
        return offerId;

    }
    
    public static String getDOId( Long increment, Long instanceId, Long multiplier ) {

        String offerId = "DO-";
        Long sequence = getSequenceNumber( increment, instanceId, multiplier );
        offerId = offerId + sequence;
        return offerId;
    }
    
    public static String getTradeId( Long increment, Long multiplier ) {

        String offerId = "TRD-";
        Long sequence = getSequenceNumber( increment, 1L, multiplier );
        offerId = offerId + sequence;
        return offerId;

    }
    
    public static String getPremiumGroupId( Long increment, Long multiplier ) {

        String groupId = "PRG-";
        Long sequence = getSequenceNumber( increment, 1L, multiplier );
        groupId = groupId + sequence;
        return groupId;

    }

    private static Long getSequenceNumber( Long increment, Long instanceId, Long multiplier ) {
        Long sequence = instanceId * multiplier + increment;
        return sequence;
    }

}
