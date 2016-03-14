package com.intl.util.constants;

public class SupplierDashboardViewQueryConstants {

    public static final String DASHBOARD_COUNT = " SELECT COUNT (sdb.id) ";
    public static final String DASHBOARD_IDS = " SELECT sdb.id ";
    public static final String CRITICAL_DASHBOARD_DETAILS = " FROM SupplierDashboardView sdb "
        + " LEFT OUTER JOIN Trade t ON sdb.trade_id = t.id "
        + " LEFT OUTER JOIN Offer o ON o.id = t.Offer_id "
        + " LEFT OUTER JOIN Offer_Master om ON om.id = o.offer_master_id "
        + "  LEFT OUTER JOIN [User] u ON om.created_by = u.id"
        + " WHERE u.account_code=:accountCode "
        + " AND sdb.pending_action != 'Completed' "
        + " AND (ISNULL(:criticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) <= :criticalDateDiff) "
        + " AND (ISNULL(:mediumCriticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) = :mediumCriticalDateDiff)"
        + " AND (ISNULL(:nonCriticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) > :nonCriticalDateDiff)";

    public static final String COUNT_BY_CRITICALITY_DASHBOARD_DETAILS =
        DASHBOARD_COUNT + CRITICAL_DASHBOARD_DETAILS;

    public static final String IDS_BY_CRITICALITY_DASHBOARD_DETAILS =
        DASHBOARD_IDS + CRITICAL_DASHBOARD_DETAILS;

}
