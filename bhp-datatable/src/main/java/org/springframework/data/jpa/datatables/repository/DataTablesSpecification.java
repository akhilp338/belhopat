package org.springframework.data.jpa.datatables.repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.parameter.ColumnParameter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.intl.util.constants.Constants;
import com.intl.util.date.DateUtil;

/**
 * {@link Specification} converting {@link DataTablesInput} to proper SQL query
 *
 * @author Damien Arrachequesne
 */

public class DataTablesSpecification< T > implements Specification< T > {

    private final static String OR_SEPARATOR = "+";

    private final static String ATTRIBUTE_SEPARATOR = ".";

    private final DataTablesInput input;

    private static final Logger LOGGER =
        LoggerFactory.getLogger( DataTablesSpecification.class.getName() );

    public DataTablesSpecification( DataTablesInput input ) {
        this.input = input;
    }

    /**
     * Creates a WHERE clause for the given {@link DataTablesInput}.
     *
     * @return a {@link Predicate}, must not be {@literal null}.
     */
    @Override
    public Predicate toPredicate( Root< T > root, CriteriaQuery< ? > query,
        CriteriaBuilder criteriaBuilder ) {

        Predicate predicate = criteriaBuilder.conjunction();

        // check for each searchable column whether a filter value exists
        for ( ColumnParameter column : input.getColumns() ) {
            String filterValue = column.getSearch().getValue();
            if ( column.getSearchable() && StringUtils.hasText( filterValue ) ) {

                Expression< String > expression =
                    getExpression( root, column.getData().replace( Constants.EMPTY_SQUARE_BRACE,
                        Constants.EMPTY_STRING ) );

                if ( filterValue.contains( OR_SEPARATOR ) ) {
                    // the filter contains multiple values, add a 'WHERE .. IN'
                    // clause
                    // Note: "\\" is added to escape special character '+'
                    String[] values = filterValue.split( "\\" + OR_SEPARATOR );
                    if ( values.length > 0 && isBoolean( values[ 0 ] ) ) {
                        Object[] booleanValues = new Boolean[ values.length ];
                        for ( int i = 0; i < values.length; i++ ) {
                            booleanValues[ i ] = Boolean.valueOf( values[ i ] );
                        }
                        predicate =
                            criteriaBuilder.and( predicate,
                                expression.as( Boolean.class ).in( booleanValues ) );
                    }
                    else {
                        predicate =
                            criteriaBuilder
                                .and( predicate, expression.in( Arrays.asList( values ) ) );
                    }
                }
                else {
                    // the filter contains only one value, add a 'WHERE .. LIKE'
                    // clause
                    if ( isBoolean( filterValue ) ) {
                        predicate =
                            criteriaBuilder.and(
                                predicate,
                                criteriaBuilder.equal( expression.as( Boolean.class ),
                                    Boolean.valueOf( filterValue ) ) );
                    }
                    else if ( isDate( filterValue ) ) {
                        Expression< Date > expressionDate =
                            getDateExpression( root, column.getData() );
                        Date fromDate =
                            getFormattedDate( filterValue + Constants.TIME_ZERO,
                                Constants.DD_MM_YYYY_HH_MM_SS );
                        Date toDate =
                            getFormattedDate( filterValue + Constants.TIME_END_OF_DAY,
                                Constants.DD_MM_YYYY_HH_MM_SS );
                        predicate =
                            criteriaBuilder.and( predicate,
                                criteriaBuilder.between( expressionDate, fromDate, toDate ) );

                    }
                    else if ( isDateAndTime( filterValue ) ) {
                        Expression< Date > expressionDate =
                            getDateExpression( root, column.getData() );
                        predicate =
                            criteriaBuilder.and(
                                predicate,
                                criteriaBuilder.equal( expressionDate,
                                    getFormattedDate( filterValue, Constants.DD_MM_YYYY_HH_mm ) ) );

                    }
                    else if ( isTradeBetween( filterValue ) ) {

                        String[] fromAndTodate =
                            filterValue.substring( 1, filterValue.length() ).split( Constants.AMP );
                        Date toDate = null;
                        Date fromDate = null;
                        try {

                            fromDate =
                                DateUtil
                                    .toYYYYMMDDWithTime( fromAndTodate[ 0 ] + Constants.TIME_ZERO );
                            toDate =
                                DateUtil.toYYYYMMDDWithTime(
                                    fromAndTodate[ 1 ] + Constants.TIME_END_OF_DAY );
                            Expression< Date > expressionDate =
                                root.get( column.getData() ).as( Date.class );
                            predicate =
                                criteriaBuilder.and(
                                    predicate,
                                    criteriaBuilder.between( expressionDate,
                                        fromDate,
                                        toDate ) );
                        }
                        catch ( ParseException e ) {
                            LOGGER.error( "Parse Exception - ", e );
                        }

                    }
                    else if ( isWeightRange( filterValue ) ) {

                        String[] weightRange =
                            filterValue.substring( 1, filterValue.length() ).split( "-" );
                        Long toRange = null;
                        Long fromRange = null;

                        fromRange = Long.parseLong( weightRange[ 0 ] );
                        toRange = Long.parseLong( weightRange[ 1 ] );
                        String columnData = column.getData();
                        Expression< Long > expressionRange = null;
                        if ( columnData.equals( "offer.offerMaster.quantity" ) ) {
                            expressionRange =
                                root.get( "offer" ).get( "offerMaster" ).get( "quantity" )
                                    .as( Long.class );
                        }
                        else if ( columnData.equals( "offerMaster.balanceQuantity" ) ) {
                            expressionRange =
                                root.get( "offerMaster" ).get( "balanceQuantity" ).as( Long.class );
                        }
                        else if ( columnData.equals( "offerMaster.quantity" ) ) {
                            expressionRange =
                                root.get( "offerMaster" ).get( "quantity" ).as( Long.class );
                        }
                        else if ( columnData.equals( "offer.quantity" ) ) {
                            expressionRange =
                                root.get( "offer" ).get( "quantity" ).as( Long.class );
                        }

                        predicate =
                            criteriaBuilder.and(
                                predicate,
                                criteriaBuilder.between( expressionRange,
                                    fromRange,
                                    toRange ) );

                    }

                    else {
                        predicate =
                            criteriaBuilder.and(
                                predicate,
                                criteriaBuilder.like( criteriaBuilder.lower( expression ),
                                    Constants.PERCENTAGE
                                        + filterValue.toLowerCase() + Constants.PERCENTAGE ) );
                    }
                }
            }
        }

        // check whether a global filter value exists
        String globalFilterValue = input.getSearch().getValue();
        if ( StringUtils.hasText( globalFilterValue ) ) {
            Predicate matchOneColumnPredicate = criteriaBuilder.disjunction();
            // add a 'WHERE .. LIKE' clause on each searchable column
            for ( ColumnParameter column : input.getColumns() ) {
                if ( column.getSearchable() ) {
                    Expression< String > expression =
                        getExpression( root, column.getData().replace( Constants.EMPTY_SQUARE_BRACE,
                            Constants.EMPTY_STRING ) );

                    matchOneColumnPredicate =
                        criteriaBuilder.or(
                            matchOneColumnPredicate,
                            criteriaBuilder.like( criteriaBuilder.lower( expression ),
                                Constants.PERCENTAGE
                                    + globalFilterValue.toLowerCase() + Constants.PERCENTAGE ) );
                }
            }
            predicate = criteriaBuilder.and( predicate, matchOneColumnPredicate );
        }
        return predicate;
    }

    Date getFormattedDate( String filterDate, String format ) {

        SimpleDateFormat dateFormat = new SimpleDateFormat( format );
        Date formattedDate = null;

        try {
            formattedDate = dateFormat.parse( filterDate.substring( 1, filterDate.length() ) );
        }
        catch ( ParseException e ) {
            LOGGER.error( "Parse Exception - ", e );
        }
        return formattedDate;
    }

    private boolean isDate( String filterValue ) {

        return filterValue.startsWith( Constants.HASH )
            && filterValue.trim().length() == Constants.ELEVEN;
    }

    private boolean isDateAndTime( String filterValue ) {

        return filterValue.startsWith( Constants.HASH ) && filterValue.length() > Constants.ELEVEN;
    }

    private boolean isTradeBetween( String filterValue ) {

        return filterValue.startsWith( Constants.AMP ) && filterValue.length() > Constants.ELEVEN;
    }

    private boolean isWeightRange( String filterValue ) {

        return filterValue.startsWith( Constants.STAR );
    }

    private boolean isBoolean( String filterValue ) {
        return "TRUE".equalsIgnoreCase( filterValue ) || "FALSE".equalsIgnoreCase( filterValue );
    }

    public Expression< String > getExpression( Root< T > root, String columnData ) {

        if ( columnData.contains( ATTRIBUTE_SEPARATOR ) ) {
            String[] values = columnData.split( "\\" + ATTRIBUTE_SEPARATOR );
            if ( values.length == 2 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).get( values[ 1 ] )
                    .as( String.class );
            }
            if ( values.length == 3 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).join( values[ 1 ], JoinType.LEFT )
                    .get( values[ 2 ] ).as( String.class );
            }
            if ( values.length == 4 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).join( values[ 1 ], JoinType.LEFT )
                    .join( values[ 2 ], JoinType.LEFT ).get( values[ 3 ] ).as( String.class );
            }
            if ( values.length == 5 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).join( values[ 1 ], JoinType.LEFT )
                    .join( values[ 2 ], JoinType.LEFT ).join( values[ 3 ], JoinType.LEFT )
                    .get( values[ 4 ] ).as( String.class );
            }
            if ( values.length == 6 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).join( values[ 1 ], JoinType.LEFT )
                    .join( values[ 2 ], JoinType.LEFT )
                    .join( values[ 3 ], JoinType.LEFT ).join( values[ 4 ], JoinType.LEFT )
                    .get( values[ 5 ] ).as( String.class );
            }
            return null;

        }
        else {
            // columnData is like "attribute" so nothing particular to do

            return root.get( columnData ).as( String.class );

        }
    }

    private Expression< Date > getDateExpression( Root< T > root, String columnData ) {

        if ( columnData.contains( ATTRIBUTE_SEPARATOR ) ) {
            String[] values = columnData.split( "\\" + ATTRIBUTE_SEPARATOR );
            if ( values.length == 2 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).get( values[ 1 ] ).as( Date.class );
            }
            if ( values.length == 3 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).join( values[ 1 ], JoinType.LEFT )
                    .get( values[ 2 ] ).as( Date.class );
            }
            if ( values.length == 4 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).join( values[ 1 ], JoinType.LEFT )
                    .join( values[ 2 ], JoinType.LEFT ).get( values[ 3 ] ).as( Date.class );
            }
            if ( values.length == 5 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).join( values[ 1 ], JoinType.LEFT )
                    .join( values[ 2 ], JoinType.LEFT ).join( values[ 3 ], JoinType.LEFT )
                    .get( values[ 4 ] ).as( Date.class );
            }
            if ( values.length == 6 ) {
                return root.join( values[ 0 ], JoinType.LEFT ).join( values[ 1 ], JoinType.LEFT )
                    .join( values[ 2 ], JoinType.LEFT ).join( values[ 3 ], JoinType.LEFT )
                    .join( values[ 4 ], JoinType.LEFT ).get( values[ 5 ] ).as( Date.class );
            }
            return null;

        }
        else {
            return root.get( columnData ).as( Date.class );
        }
    }
}
