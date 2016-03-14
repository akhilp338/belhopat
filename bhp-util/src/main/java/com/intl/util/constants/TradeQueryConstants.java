package com.intl.util.constants;

public class TradeQueryConstants {
    public static final String TRADE_COUNT = "SELECT COUNT (t.id)";
    private static final String TRADE_DOC_COUNT = "SELECT COUNT (td.id)";
    public static final String TRADE_ID = "SELECT t.id";
    public static final String TRADE_DOC_ID = "SELECT td.id";
    public static final String CRITICAL_DEALER_SET_DATE = " FROM Trade t "
        + "LEFT OUTER JOIN Offer o ON o.id = t.Offer_id  "
        + " WHERE o.instance_id = :instanceId AND ISNULL(t.cus_invoice_val_date,-999) = -999 "
        + " AND (ISNULL(:criticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) <= :criticalDateDiff) "
        + " AND (ISNULL(:mediumCriticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) = :mediumCriticalDateDiff)"
        + " AND (ISNULL(:nonCriticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) > :nonCriticalDateDiff)";

    public static final String COUNT_BY_CRITICAL_DEALER_SET_DATE =
        TRADE_COUNT + CRITICAL_DEALER_SET_DATE;

    public static final String TRADES_BY_CRITICAL_DEALER_SET_DATE =
        TRADE_ID + CRITICAL_DEALER_SET_DATE;

    public static final String CRITICAL_TRACK_TASK_PART_1 = " FROM Trade_Tasks tt "
        + "LEFT OUTER JOIN Trade t ON tt.trade_id = t.id "
        + "LEFT OUTER JOIN Offer o ON o.id = t.offer_id "
        + "LEFT OUTER JOIN Offer_Master om ON o.offer_master_id = om.id "
        + "LEFT OUTER JOIN Pre_Offer_Action_Master poam ON poam.id = om.pre_offer_action_id"
        + " WHERE tt.completed = 0 AND  tt.assigned_to=:accountCode  "
        + "AND( (";
    public static final String CRITICAL_TRACK_TASK_PART_2 =
        " AND (ISNULL(:criticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) <= :criticalDateDiff) "
            + " AND (ISNULL(:mediumCriticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) = :mediumCriticalDateDiff)"
            + " AND (ISNULL(:nonCriticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) > :nonCriticalDateDiff)) "
            + "OR (";
    public static final String CRITICAL_TRACK_TASK_PART_3 =
        " AND (ISNULL(:criticalDateDiff, -999) = -999 OR ( (ISNULL(poam.id, -999) = -999 AND  DATEDIFF(day,GETUTCDATE(),om.availability) <= :criticalDateDiff) OR  DATEDIFF(day,GETUTCDATE(),poam.availability) <= :criticalDateDiff))) "
            + " AND (ISNULL(:mediumCriticalDateDiff, -999) = -999 OR ( (ISNULL(poam.id, -999) = -999 AND  DATEDIFF(day,GETUTCDATE(),om.availability) = :mediumCriticalDateDiff) OR  DATEDIFF(day,GETUTCDATE(),poam.availability) = :mediumCriticalDateDiff))) "
            + " AND (ISNULL(:nonCriticalDateDiff, -999) = -999 OR ( (ISNULL(poam.id, -999) = -999 AND  DATEDIFF(day,GETUTCDATE(),om.availability) > :nonCriticalDateDiff) OR  DATEDIFF(day,GETUTCDATE(),poam.availability) > :nonCriticalDateDiff)) ";

    public static final String CRITICAL_DEALER_TRACK_TASK = CRITICAL_TRACK_TASK_PART_1
        + "tt.task_key=1 "
        + CRITICAL_TRACK_TASK_PART_2
        + "tt.task_key=2 "
        + CRITICAL_TRACK_TASK_PART_3;

    public static final String CRITICAL_OPERATIONS_TRACK_TASK = CRITICAL_TRACK_TASK_PART_1
        + "(tt.task_key=3 OR tt.task_key=4)  "
        + CRITICAL_TRACK_TASK_PART_2
        + "(tt.task_key=5 OR tt.task_key=6) "
        + CRITICAL_TRACK_TASK_PART_3;

    public static final String COUNT_BY_CRITICAL_DEALER_TRACK_TASK =
        TRADE_COUNT + CRITICAL_DEALER_TRACK_TASK;

    public static final String TRADES_BY_CRITICAL_DEALER_TRACK_TASK =
        TRADE_ID + CRITICAL_DEALER_TRACK_TASK;

    public static final String COUNT_BY_CRITICAL_OPERATIONS_TRACK_TASK =
        TRADE_COUNT + CRITICAL_OPERATIONS_TRACK_TASK;

    public static final String TRADES_BY_CRITICAL_OPERATIONS_TRACK_TASK =
        TRADE_ID + CRITICAL_OPERATIONS_TRACK_TASK;

    public static final String CRITICAL_DOCS_TO_APPROVE = " FROM Trade t "
        + " LEFT OUTER JOIN Trade_Document td  ON td.trade_id = t.id "
        + " LEFT OUTER JOIN Offer o ON o.id = t.Offer_id "
        + " LEFT OUTER JOIN LookUp_Type lt ON lt.id = td.doc_source_lookup "
        + " LEFT OUTER JOIN Offer_Master om ON o.offer_master_id = om.id "
        + " WHERE  header_key IN ('bar list','Certificate of Origin','Certificate of Assay') "
        + " AND td.status = 'UPLOADED' "
        + " AND om.src_instance_id = :instanceId"
        + " AND (ISNULL(:criticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) <= :criticalDateDiff) "
        + " AND (ISNULL(:mediumCriticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) = :mediumCriticalDateDiff)"
        + " AND (ISNULL(:nonCriticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) > :nonCriticalDateDiff)";

    public static final String COUNT_BY_CRITICALITY_DOCS_TO_APPROVE =
        TRADE_DOC_COUNT + CRITICAL_DOCS_TO_APPROVE;

    public static final String TRADE_DOCS_BY_CRITICAL_DOCS_TO_APPROVE =
        TRADE_DOC_ID + CRITICAL_DOCS_TO_APPROVE;

    private static final String CRITICAL_AIRBILL_TO_UPLOAD = " FROM Trade t "
        + "LEFT OUTER JOIN Trade_Document td  ON td.trade_id = t.id "
        + "AND td.doc_source_lookup = :fileTypeId "
        + "LEFT OUTER JOIN Offer o ON o.id = t.Offer_id  "
        + "LEFT OUTER JOIN Trade_Tasks tt ON tt.trade_id = t.id "
        + " LEFT OUTER JOIN Offer_Master om ON o.offer_master_id = om.id "
        + "WHERE om.src_instance_id = :instanceId "
        + "AND tt.task_key = 4 "
        + "AND tt.completed = 1  "
        + "AND td.doc_source_lookup IS NULL "
        + "AND (ISNULL(:criticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) >= :criticalDateDiff) "
        + "AND (ISNULL(:mediumCriticalDateDiffHigh, -999) = -999 AND ISNULL(:mediumCriticalDateDiffLow, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) "
        + " BETWEEN :mediumCriticalDateDiffHigh AND :mediumCriticalDateDiffLow)"
        + "AND (ISNULL(:nonCriticalDateDiff, -999) = -999 OR DATEDIFF(day,GETUTCDATE(),t.physical_collection_date) < :nonCriticalDateDiff)";

    public static final String COUNT_BY_CRITICALITY_AIRBILL_UPLOAD =
        TRADE_COUNT + CRITICAL_AIRBILL_TO_UPLOAD;

    public static final String TRADES_BY_CRITICAL_AIRBILL_UPLOAD =
        TRADE_ID + CRITICAL_AIRBILL_TO_UPLOAD;

}
