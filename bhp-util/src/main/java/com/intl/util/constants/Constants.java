package com.intl.util.constants;

public class Constants {

    public static final String BRAND = "brand";
    public static final String PURITY = "purity";
    public static final String TYPE = "type";
    public static final String METAL = "metal";
    public static final String CITY = "city";
    public static final String TRADE_STATUS = "tradeStatus";
    public static final String SOURCE_LOCATION = "sourceLocation";
    public static final String INVENTORY = "inventory";
    public static final String POST_OFFER_IDS = "postOfferIds";
    public static final String POST_OFFER_TYPE = "postOfferType";
    public static final String TAB_NAME = "tabName";
    public static final String ACCOUNT_ID = "accountId";
    public static final String TITLE_TEXT = "titleText";
    public static final String ROLE_SUPPLIER = "ROLE_S";
    public static final String ROLE_CUSTOMER = "ROLE_C";
    public static final String ROLE_DEALER = "ROLE_D";
    public static final String ROLE_OPERATOR = "ROLE_O";
    public static final String PAGE = "page";
    public static final String CURRENT_TAB = "currentTab";
    public static final String CURRENT_INNER_TAB = "currentInnerTab";
    public static final String OFFER = "offer";
    public static final String OFFER_TAB = "offerTab";
    public static final String EDIT_PAGE_MODE = "editPageMode";
    public static final String FREIGHT_COMPANY = "freightCompany";
    public static final String OFFER_LIST = "offerList";
    public static final String LOCATION_FREIGHT_COMPANY = "locationFreightCompany";
    public static final String IS_REMOVE = "isRemove";
    public static final String IS_CONF_OFFER = "isCO";
    public static final String METAL_DOLLAR_POSNS = "positions";
    public static final String TRADE_SUCCESS_MSG = "Trade Successful";
    public static final String TRADE_FAILURE_MSG = "Requested quantity not available";
    public static final String LOCK_INTERVAL = "LOCK_INTERVAL";
    public static final String lockIntervalVal = "lockIntervalVal";
    public static final String TIMEZONE = "timezone";
    public static final String LOGGED_USER = "loggedUser";
    public static final String PREMIUM_GROUPS = "groups";
    public static final String ACCOUNTS = "accounts";
    public static final String PREMIUM_CPM = "premiumCpm";
    public static final String PREMIUM_LIMIT_PERCENT = "PREMIUM_LIMIT_PERCENT";
    public static final String TRADE_OFFER_LIST = "tradeOfferList";
    public static final String SUP_ACCOUNTS = "supAccounts";
    public static final String TOTAL_EQOZS = "totalEqOzs";
    public static final String CPM_STATUS = "cpmStatus";

    // Ordering Datatable
    public static final String ASCENDING_ORDERING = "asc";
    public static final String DESCENDING_ORDERING = "desc";

    // Datatable Column Number
    public static final int CUSTOMER_RFQ_SORT = 13;
    public static final int DEALER_SUPPLIER_RFQ_SORT = 13;
    public static final int DEALER_RFQ_SORT = 13;
    public static final int DEALER_CUSTOMER_RFQ_SORT = 14;
    public static final int SUPPLIER_RFQ_SORT = 14;
    public static final int TRADES_LISTING_SORT = 12;

    // Offer Types
    public static final Long CONF_OFR_TYPE_ID = 1L;
    public static final Long UNCONF_OFR_TYPE_ID = 2L;
    public static final Long DIRECT_OFFER_TYPE_ID = 3L;
    public static final Long DRFQ_TYPE_ID = 4L;
    public static final Long RFQ_TYPE_ID = 5L;
    public static final Long TRADE_TYPE_ID = 6L;
    public static final Long PREMIUM_GROUP_ID = 7L;

    // Title Texts
    public static final String TITLE_CUSTOMER_HOME = "Customer Home";
    public static final String TITLE_SUPPLIER_HOME = "Supplier Home";
    public static final String TITLE_DEALER_HOME = "Dealer Home";
    public static final String TITLE_OPERATOR_HOME = "Operator Home";

    // Different files - lookup
    public static final String FILE_BAR_LIST = "bar list";
    public static final String FILE_AIRWAY_BILL = "airway bill";
    public static final String FILE_COO = "certificate of origin";
    public static final String FILE_COA = "certificate of assay";

    // Pages
    public static final String PAGE_CUSTOMER = "customer";
    public static final String PAGE_SUPPLIER = "supplier";
    public static final String PAGE_DEALER = "dealer";
    public static final String PAGE_OPERATOR = "operator";

    // Tab Names
    public static final String TAB_CONFIRMED_OFFER = "confirmedOffers";
    public static final String TAB_UNCONFIRMED_OFFER = "unConfirmedOffers";
    public static final String TAB_DIRECT_OFFER = "directOffers";
    public static final String TAB_RFQ = "rfq";
    public static final String TAB_REJECTED_OFFER = "RO";
    public static final String TAB_SUP_RFQ = "supplierRFQ";
    public static final String TAB_CUS_RFQ = "customerRFQ";
    public static final String TAB_TRADE = "trade";

    // Offer Status
    public static final String OFFER_STATUS_DELETED = "DELETED";
    public static final String OFFER_STATUS_POSTED = "POSTED";
    public static final String OFFER_STATUS_SUBMITTED = "SUBMITTED";
    public static final String OFFER_STATUS_REJECTED = "REJECTED";
    public static final String OFFER_STATUS_REPOSTED = "REPOSTED";
    public static final String DELETE_STATUS = "deleteStatus";
    public static final String DELETE_MESSAGE = "msg";
    public static final String DELETE_SUCCESSS = "Deleted Successfully";
    public static final String TRADE_STATUS_COMPLETED = "COMPLETED";
    public static final String TRADE_STATUS_IN_PROCESS = "IN PROCESS";
    public static final String REJECT_STATUS = "rejectStatus";
    public static final String REJECT_MESSAGE = "rejectMessage";
    public static final String STATUS_LIVE = "LIVE";

    // ID prefixes
    public static final String ID_PREFIX_OFFER = "OFR-";
    public static final String ID_PREFIX_RFQ = "RFQ-";
    public static final String ID_PREFIX_DRFQ = "DRFQ-";
    public static final String ID_PREFIX_TRADE = "TRD-";
    public static final String ID_PREMIUM_GROUP = "PRG-";

    // Csv and Excel header names
    public static final String HEADER_METAL = "Metal";
    public static final String HEADER_INVENTORY = "Inventory";
    public static final String HEADER_BRAND = "Brand";
    public static final String HEADER_PURITY = "Purity";
    public static final String HEADER_EXPIRY = "Expiry";
    public static final String HEADER_TYPE = "Type";
    public static final String HEADER_AVAILABILITY = "Availability";
    public static final String HEADER_LOCATION = "Location";
    public static final String HEADER_QUANTITY = "Quantity";
    public static final String HEADER_ADDRESS = "Address";
    public static final String HEADER_PREMIUM = "Premium";
    public static final String HEADER_ACCOUNT_ID = "AccountId";
    public static final String BAR_NUMBER = "Bar Number";
    public static final String GTO = "GTO";
    public static final String ASSAY = "Assay";
    public static final String FTO = "FTO";
    public static final String PALLET_NO = "Pallet No.";

    // Date
    public static final String DEFAULT_FORMAT = "dd-MM-yyyy";
    public static final String DEFAULT_FORMAT_TIME = "yyyy-MM-dd HH:mm:ss";
    public static final String DD_MM_YYYY_HH_mm = "dd-MM-yyyy HH:mm";
    public static final String DD_MM_YYYY = "dd-MM-yyyy";
    public static final String TIMEZONE_EXPRESSION = "(GMT|UTC)(\\+|\\-)\\d{4}";

    // View Names
    public static final String DEALER_EDIT = "/dealer/window/dealerEditWindow";
    public static final String DEALER_EDIT_GROUP = "/dealer/window/editGroup";
    public static final String DEALER_BASE = "dealer/dealer";
    public static final String OPERATOR_BASE = "operator/operator";
    public static final String REDIRECT = "redirect:";

    public static final String CERTIFICATE_OF_ASSAY = "Certificate of Assay";
    public static final String CERTIFICATE_OF_ORIGIN = "Certificate of Origin";
    public static final String BAR_LIST = "bar list";
    public static final String AIRWAY_BILL = "airway bill";
    public static final String RELEASE_SUPPLIER = "Release instruction to supplier";
    public static final String C_D_INSTRUCTION =
        "Collection and Delivery Instruction To Shipping Agent";
    public static final String COLLECTION_DELIVERY =
        "Collection and Delivery Instruction";
    public static final String METAL_PAYMENT_RELEASE_INSTRUCTION =
        "Metal Payment Release Instruction";

    public static final String EXCEL = "excel";
    public static final String PDF = "pdf";

    // Aspect related
    public static final String BUSINESS_MODULE = "Business";
    public static final String PERSISTENCE_MODULE = "DAO";
    public static final String WEBSERVICE_MODULE = "Controller";

    public static final String DEALER_REPLICATE = "/dealer/window/dealerReplicate";

    public static final String SUPPLIER_REPLICATE = "/supplier/window/supplierReplicate";
    public static final int INTERNAL_SERVER_ERROR_STS = 500;
    public static final int REJECTED_BYTE_ZERO = 0;
    public static final int REJECTED_BYTE_ONE = 1;
    public static final String LOGIN_URL = "/login/newlogin";
    public static final CharSequence CUSTOMER = "customer";
    public static final CharSequence DEALER = "dealer";
    public static final CharSequence OPERATOR = "operator";
    public static final CharSequence SUPPLIER = "supplier";
    public static final String CUSTOMER_ROLE = "C";
    public static final String DEALER_ROLE = "D";
    public static final String SUPPLIER_ROLE = "S";
    public static final String OPERATOR_ROLE = "O";
    public static final String USER_ID = "userId";
    public static final long FIVE_DAYS_IN_MILLISEC = 432000000;
    public static final Long LOOKUP_DIRECT_OFFER_STATUS = 4L;
    public static final Long METAL_XAU_ID = 1L;
    public static final Long LOOK_UP_TRADE_STATUS = 5L;
    public static final Long LOOKUP_ACTIVITY_TYPE = 1L;
    public static final Long LOOKUP_ACTIVITY_ID = 2L;
    public static final Long LOOKUP_SCREEN_ID = 1L;
    public static final Long LOOKUP_BARLIST_HEADERS = 6L;
    public static final Long LOOK_UP_CPM_STATUS = 23L;
    public static final Long PARSER_MAX_LIMIT = 999999L;
    public static final Long INITAL_QUANITY = 0L;
    public static final String LOOKUP_ACTIVITY_MAP = "lookUpActivityMap";
    public static final String LOOKUP_SCREEN_MAP = "lookUpScreenMap";
    public static final CharSequence EMPTY_SQUARE_BRACE = "[]";
    public static final CharSequence EMPTY_STRING = "";
    public static final String TIME_ZERO = " 00:00:00";
    public static final String TIME_END_OF_DAY = " 23:59:59";
    public static final String DD_MM_YYYY_HH_MM_SS = "dd-MM-yyyy HH:mm:ss";
    public static final int ELEVEN = 11;
    public static final String HASH = "#";
    public static final String AMP = "@";
    public static final String STAR = "*";
    public static final String PERCENTAGE = "%";
    public static final String PERCENTAGE_SLASH = "%/";
    public static final String UTC = "UTC";
    public static final String SLASH = "/";
    public static final String COMMA = ",";
    public static final int ZERO = 0;

    public static final String ACCOUNT_TYPE_S = "S";
    public static final String ACCOUNT_TYPE_C = "C";
    public static final String ACCOUNT_TYPE_D = "D";
    public static final String ACCOUNT_TYPE_O = "O";

    public static final String DB_DUB = "Neo_BKP_DXB"; // Neo_BKP_DXB
    public static final String DB_LON = "Neo_BKP_LDN"; // Neo_BKP_LDN
    public static final String DB_SIN = "Neo_BKP_SNG"; // Neo_BKP_SNG
    public static final String DB_STORED_PROC = "Neo_BKP_DXB"; // Neo_BKP_DXB

    public static final String INSTANCE_USER_ACCOUNT =
        "AccountEntity.getInstanceUserAccount.";
    public static final String INSTANCE_USER_ACCOUNT_DUB =
        INSTANCE_USER_ACCOUNT + DB_DUB;
    public static final String INSTANCE_USER_ACCOUNT_SIN =
        INSTANCE_USER_ACCOUNT + DB_SIN;
    public static final String INSTANCE_USER_ACCOUNT_LON =
        INSTANCE_USER_ACCOUNT + DB_LON;

    public static final String ERROR = "error";
    public static final Object USER_NAME_PWD_MSG = "Invalid username or password!";
    public static final String REDIRECT_LOGIN = "redirect:login";
    public static final String LOGIN = "redirect:";
    public static final String WEB_XML_PATH = "/WEB-INF/web.xml";
    public static final String WEB_XML_SESSION_TIMEOUT = "web-app/session-config/session-timeout";
    public static final String METAL_GOLD = "GOLD";
    public static final String BALANCE_CHECK = "balanceCheck";
    public static String SQL_PROP_FILE = "persistence-sql.properties";
    public static final String SYMBOL_QUS = "?";

    /* cookie helper constants */

    public static final String SECRET_KEY = "3TRm_N_DE[@H5Zp";
    public static final String ENCRIPT_ALGORITHM = "AES";
    public static final String KEYGEN_ALGORITHM = "SHA-1";
    public static final int DEFAULT_EXPIRY = 365;
    public static final String DEFAULT_PATH = "/";
    public static final int SEC_IN_DAY = 86400;
    public static final boolean IS_SECURE = true;
    public static final boolean IS_HTTP_ONLY = true;
    public static final String UTF8 = "UTF8";
    public static final Long LOOKUP_CHECKLIST_INVOICE = 8L;
    public static final Long LOOKUP_CHECKLIST_AM_PM = 9L;
    public static final String TRADE_TASK_INVOICE = "tradeTaskInvoice";
    public static final String AM_PM_FIX = "tradeTaskAmPmFix";
    public static final String TRADE = "trade";
    public static final String INSTANCE_OFFER = "instanceOfferTrade";
    public static final String TRADE_DROPDOWN = "tradeDropdown";
    public static final String REDIRECT_TRADE_NOTIFICATION = "getpreviewNotificationPage";
    public static final byte CHECKBOX_STATUS_TWO = 2;
    public static final String TRADE_TASK_LOOKUPS = "taskLookUp";
    public static final String TRADE_TASK = "tradeTask";

    /* Trade Task constants */

    public static final String COLLECT_METAL = "CollectMetal";
    public static final String RELEASE_METAL = "ReleaseMetal";
    public static final String METAL_PAY_RELEASE = "MetalPayRelease";
    public static final String FAILURE_MESSAGE = "Save Failed";
    public static final String SUCCESS_MESSAGE = "Save Success";
    public static final byte DELETE_BYTE_STATUS = 1;
    public static final byte CUSTOM_BYTE_ZERO = 0;
    public static final String GROUP = "Group";
    public static final String TAB_PREMIUMS = "premiums";
    public static final String TAB_PREMIUM_GROUPS = "groups";
    public static final String DELETE_GROUP_FAILURE_MESSAGE = "Selected group cant be deleted";
    public static final String ACCOUNT_BY_IDS_AND_TYPE =
        "AccountEntity.getAccountByAccountIdsAndType.";
    public static final String ACCOUNT_BY_ID =
        "AccountEntity.getAccountByAccountId.";
    public static final String ACCOUNT_BY_IDS_AND_TYPE_DUB =
        ACCOUNT_BY_IDS_AND_TYPE + DB_DUB;
    public static final String ACCOUNT_BY_IDS_AND_TYPE_SIN =
        ACCOUNT_BY_IDS_AND_TYPE + DB_SIN;
    public static final String ACCOUNT_BY_IDS_AND_TYPE_LON =
        ACCOUNT_BY_IDS_AND_TYPE + DB_LON;
    public static final String SENSECHECK_VAL = "senseCheckVal";
    public static final String ACCOUNT_BY_ID_DUB = ACCOUNT_BY_ID + DB_DUB;
    public static final String ACCOUNT_BY_ID_SIN = ACCOUNT_BY_ID + DB_SIN;
    public static final String ACCOUNT_BY_ID_LON = ACCOUNT_BY_ID + DB_LON;

    /* Document Persist Constants */
    public static final String INVOICE = "invoice";
    public static final String RECEIPT = "receipt";
    public static final byte TRADE_TASK_COMPLETE = 1;
    public static final String INSTANCE_USER = "instanceUser";
    public static final byte TRADE_TASK_INCOMPLETE = 0;
    public static final String DOCUMENT_LIST = "documentList";
    public static final byte DELETE_BYTE_STATUS_ZERO = 0;
    public static final String BARLIST_HEADER = "Bar List";

    // Trade Tasks
    public static final String RELEASE_INSTRUCTION = "Review and Release Metal";
    public static final String METAL_PAYMENT_RELEASE = "Review and Trigger Metal Payment Release";
    public static final String INSTRUCT_METAL_RELEASE = "Instruct Metal Release";
    public static final String INSTRUCT_METAL_COLLECTION = "Instruct Metal Collection";
    public static final String TRIGGER_METAL_PAYMENT_RELEASE = "Trigger Metal Payment Release";
    public static final String INSTRUCT_METAL_PAYMENT_RELEASE = "Instruct Metal Payment Release";
    public static final String CUS_INVOICE = "Customs Invoice";
    public static final byte TASK_REJECTED_STATUS = 2;
    public static final String DEALER_FLAG = "dealerFlag";
    public static final String APPROVED_BY = "Approved by ";
    public static final String STS_REVIEW_DEALER = "Reviewed by Dealer -";
    public static final String STS_INSTRUCT_METAL_RELEASE = "Approved By Operator";
    public static final String EDITED_BY = "Edited by ";
    public static final String REISSUE_TYPE_S = "SUP";
    public static final String REISSUE_TYPE_C = "CUS";
    public static final String REISSUE_TYPE_B = "BOTH";
    public static final String OPERATOR_TYPE = "operatorType";
    public static final String CRITICALITY = "criticality";
    public static final String MAIL_DATES = "mailDates";
    public static final String INSURANCE_REQUIREMENTS =
        "Insurance required from the Source Location till the Destination Address";
    public static final String SERVICE_REQUIRED = "Service Door to Door";
    public static final String UPLOADED_STATUS = "UPLOADED";

    public static final int CRITICAL = 1;
    public static final int MEDIUM_CRITICAL = 2;
    public static final int NON_CRITICAL = 3;
	public static final String SHIPPING_TYPE_SINGLE = "S";
	public static final String SHIPPING_TYPE_MULTIPLE = "M";
	public static final String IS_SUPPLIER_OPS = "isSupplierOps";
}
