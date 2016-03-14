package com.intl.util.date;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import com.intl.util.constants.Constants;

public class DateUtil extends org.apache.velocity.tools.generic.DateTool {

    public static final String DEFAULT_FORMAT = "dd-MM-yyyy";
    public static final String DEFAULT_FORMAT_TIME = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_FORMATE = "dd-MM-yyyy HH:mm";
    public static final String DD_MM_YYYY_HH_MM = "dd-MM-yyyy HH:mm";
    public static final String DD_MM_YYYY = "dd-MM-yyyy";
    public static final String MMMM_DD_YYYY = "MMMM dd, yyyy";
    public static final String MMMM_DD_YYYY_HH_MM = "MMMM dd, yyyy HH:mm";

    public static String getCurrentDateInGivenFormat( String givenDateFormat )
        throws ParseException {
        SimpleDateFormat localDateFormat = new SimpleDateFormat( givenDateFormat );
        return localDateFormat.format( new Date() );
    }

    public static Timestamp parseDate( String dateString ) throws ParseException {
        Timestamp ts = Timestamp.valueOf( dateString );
        return ts;
    }

    public static Date getDateWithoutTime( Date date ) {
        Calendar cal = Calendar.getInstance();
        cal.setTime( date );
        cal.set( Calendar.HOUR_OF_DAY, 0 );
        cal.set( Calendar.MINUTE, 0 );
        cal.set( Calendar.SECOND, 0 );
        cal.set( Calendar.MILLISECOND, 0 );
        return cal.getTime();
    }

    public static Date formatDateyyyyMMddHHmmss( String dateString ) throws ParseException {
        DateFormat format = new SimpleDateFormat( DEFAULT_FORMAT_TIME );
        Date date = null;
        date = format.parse( dateString + ":00" );
        return date;
    }

    public static Date formatDateddMMyyyy( String dateString ) throws ParseException {
        DateFormat format = new SimpleDateFormat( DEFAULT_FORMAT );
        format.setLenient( false );
        Date date = null;
        date = format.parse( dateString );
        return date;
    }

    public static Date toYYYYMMDDWithTime( String dateString ) throws ParseException {
        DateFormat format = new SimpleDateFormat( DD_MM_YYYY_HH_MM );
        format.setLenient( false );
        Date date = null;
        date = format.parse( dateString );
        return date;
    }

    public static Date toDDMMYYYY( String dateString ) throws ParseException {
        DateFormat format = new SimpleDateFormat( DD_MM_YYYY );
        format.setLenient( false );
        Date date = null;
        date = format.parse( dateString );
        return date;
    }

    public static String convertToUtcTimezone( Date date ) {
        String dateInUTC = "";
        DateFormat formatter = new SimpleDateFormat( DEFAULT_FORMAT_TIME );
        formatter.setTimeZone( TimeZone.getTimeZone( "UTC" ) );
        dateInUTC = formatter.format( date );
        return dateInUTC;
    }

    public static String toUtcTimezone( Date date, String dateFormat ) {
        String dateInUTC = "";
        DateFormat formatter = new SimpleDateFormat( dateFormat );
        formatter.setTimeZone( TimeZone.getTimeZone( "UTC" ) );
        dateInUTC = formatter.format( date );
        return dateInUTC;
    }

    public static String convertUTCtoServerTimeZone( Date dateInString ) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime( dateInString );
        SimpleDateFormat sdf = new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" );
        sdf.setTimeZone( TimeZone.getTimeZone( "UTC" ) );
        sdf.setTimeZone( TimeZone.getDefault() );
        return sdf.format( calendar.getTime() );
    }

    public static String toddMMyyyyHHmm( Date date ) throws ParseException {
        DateFormat format = new SimpleDateFormat( DD_MM_YYYY_HH_MM );
        String dateString = null;
        format.setLenient( false );
        dateString = format.format( date );
        return dateString;
    }

    public static String toddMMyyyy( Date date ) throws ParseException {
        DateFormat format = new SimpleDateFormat( DD_MM_YYYY );
        String dateString = null;
        dateString = format.format( date );
        return dateString;
    }
    
    public static String toMMMMddyyyy( Date date ) throws ParseException {
        DateFormat format = new SimpleDateFormat( MMMM_DD_YYYY );
        String dateString = null;
        dateString = format.format( date );
        return dateString;
    }
    
    public static String toMMMMddyyyyHHmmss( Date date ) throws ParseException {
        DateFormat format = new SimpleDateFormat( MMMM_DD_YYYY_HH_MM  );
        String dateString = null;
        dateString = format.format( date );
        return dateString;
    }

    public static Date toddMMyyyyDate( Date date ) throws ParseException {
        DateFormat format = new SimpleDateFormat( DD_MM_YYYY );
        String dateString = null;
        dateString = format.format( date );
        Date dateWithoutTime = format.parse( dateString );
        return dateWithoutTime;
    }

    public static Date convertDateStringToUTCDate( String expiry, String timeZoneString )
        throws ParseException, NullPointerException {
        String parsedtimeZoneString = parseTimeZoneString( timeZoneString );
        TimeZone tz = TimeZone.getTimeZone( parsedtimeZoneString );
        DateFormat dateFormatLocal = new SimpleDateFormat( Constants.DD_MM_YYYY_HH_mm );
        dateFormatLocal.setLenient( false );
        dateFormatLocal.setTimeZone( tz );
        Date parsedExpiryDate = dateFormatLocal.parse( expiry );
        return parsedExpiryDate;
    }

    public static String getCustomOffset( String offset ) {
        String customOffset = "GMT"+offset;
        return customOffset;
    }
    
    public static List< String > getTimeZoneIds() {
        List< String > timeZoneIds = new ArrayList< String >();
        String[] temp = TimeZone.getAvailableIDs();
        for ( String tz : temp ) {
            timeZoneIds.add( tz );
        }
        return timeZoneIds;
    }

    public static Map< String, String > getTimeZoneMap() {
        Map< String, String > timeZoneMap = new HashMap< String, String >();
        List< String > timeZoneList = getTimeZoneIds();
        for ( String timeZone : timeZoneList ) {
            timeZoneMap.put( timeZone.toUpperCase(), timeZone );
        }
        return timeZoneMap;
    }

    public static boolean isValidTZOffset( String tzOffset ) {
        int hours = 0, minutes = 0;
        boolean status = false;
        hours = Integer.parseInt( tzOffset.substring( 4, 6 ) );
        minutes = Integer.parseInt( tzOffset.substring( 6, 8 ) );
        if ( hours < 24 && minutes < 60 ) {
            status = true;
        }
        return status;
    }

    public static String parseTimeZoneString( String timeZoneString ) {
        timeZoneString = timeZoneString.replace( "UTC", "GMT" );
        return timeZoneString;
    }

    public static String getCurrentDateddMMyyyy() throws ParseException {
        DateFormat format = new SimpleDateFormat( DD_MM_YYYY );
        String dateString = null;
        format.setLenient( false );
        dateString = format.format( new Date() );
        return dateString;
    }
    
    
    public static String getCurrentDateMMMddyyyy() throws ParseException {
        DateFormat format = new SimpleDateFormat( MMMM_DD_YYYY );
        String dateString = null;
        format.setLenient( false );
        dateString = format.format( new Date() );
        return dateString;
    }

    public static String getDateBeforeAMonth() throws ParseException {
        DateFormat format = new SimpleDateFormat( DD_MM_YYYY );
        Calendar c = Calendar.getInstance();
        Date currentDate = new Date();
        String dateString = null;
        format.setLenient( false );
        c.setTime( currentDate );
        c.add( Calendar.DATE, -30 );
        dateString = format.format( c.getTime() );
        return dateString;
    }

    public static Map< String, String > getTZMap() {
        Map< String, String > timeZoneMap = new HashMap< String, String >();
        timeZoneMap.put( "GMT", "GMT+00:00" );
        timeZoneMap.put( "CET", "GMT+01:00" );
        timeZoneMap.put( "GST", "GMT+04:00" );
        timeZoneMap.put( "IST", "GMT+05:30" );
        timeZoneMap.put( "SGT", "GMT+08:00" );
        return timeZoneMap;
    }

    public static String getTZDisplayName( String timezoneName, String timezoneOffset ) {
        return ( timezoneName + " (UTC" +timezoneOffset+")" );
    }

    public static Date convertDateToSpecifiedTimezone( Date offerExpiryUTC, String customTimezoneOffset ) throws ParseException {
            String parsedtimeZoneString = parseTimeZoneString( customTimezoneOffset );
            TimeZone customTZ = TimeZone.getTimeZone( parsedtimeZoneString );
            
            DateFormat dateFormatCustomTimezone = new SimpleDateFormat( Constants.DD_MM_YYYY_HH_mm );
            dateFormatCustomTimezone.setLenient( false );
            dateFormatCustomTimezone.setTimeZone( customTZ );
            
            DateFormat dateFormatUTC = new SimpleDateFormat( Constants.DD_MM_YYYY_HH_mm );
            dateFormatUTC.setLenient( false );
            dateFormatUTC.setTimeZone( TimeZone.getTimeZone( Constants.UTC ) );
            
            String dateStringInSpecifiedTZ = dateFormatCustomTimezone.format( offerExpiryUTC );
            Date parsedExpiryDate = dateFormatUTC.parse( dateStringInSpecifiedTZ );
            
            return parsedExpiryDate;
        }

}