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

import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.parameter.ColumnParameter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

/**
 * {@link Specification} converting {@link DataTablesInput} to proper SQL query
 *
 * @author Damien Arrachequesne
 */
public class DataTablesSpecification<T> implements Specification<T> {

    private final static String OR_SEPARATOR = "+";

    private final static String ATTRIBUTE_SEPARATOR = ".";

    private final DataTablesInput input;

    public DataTablesSpecification(DataTablesInput input) {
        this.input = input;
    }

    /**
     * Creates a WHERE clause for the given {@link DataTablesInput}.
     *
     * @return a {@link Predicate}, must not be {@literal null}.
     */
    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query,
            CriteriaBuilder criteriaBuilder) {

        Predicate predicate = criteriaBuilder.conjunction();

        for (ColumnParameter column : input.getColumns()) {
            String filterValue = column.getSearch().getValue();
            if (column.getSearchable() && StringUtils.hasText(filterValue)) {

                Expression<String> expression = getExpression(root, column.getData());

                if (filterValue.contains(OR_SEPARATOR)) {
                    String[] values = filterValue.split("\\" + OR_SEPARATOR);
                    if (values.length > 0 && isBoolean(values[0])) {
                        Object[] booleanValues = new Boolean[values.length];
                        for (int i = 0; i < values.length; i++) {
                            booleanValues[i] = Boolean.valueOf(values[i]);
                        }
                        predicate =
                                criteriaBuilder.and(predicate,
                                        expression.as(Boolean.class).in(booleanValues));
                    } else {
                        predicate =
                                criteriaBuilder
                                .and(predicate, expression.in(Arrays.asList(values)));
                    }
                } else {
                    if (isBoolean(filterValue)) {
                        predicate =
                                criteriaBuilder.and(
                                        predicate,
                                        criteriaBuilder.equal(expression.as(Boolean.class),
                                                Boolean.valueOf(filterValue)));
                    } else if (isDate(filterValue)) {
                    	Expression<Date> expressionDate = getDateExpression(root, column.getData());
                        Date fromDate =
                                getFormattedDate(filterValue + " 00:00:00", "dd-MM-yyyy HH:mm:ss");
                        Date toDate =
                                getFormattedDate(filterValue + " 23:59:59", "dd-MM-yyyy HH:mm:ss");
                        predicate =
                                criteriaBuilder.and(predicate,
                                        criteriaBuilder.between(expressionDate, fromDate, toDate));

                    } else if (isDateAndTime(filterValue)) {
                    	Expression<Date> expressionDate = getDateExpression(root, column.getData());
                        predicate =
                                criteriaBuilder.and(
                                        predicate,
                                        criteriaBuilder.equal(expressionDate,
                                                getFormattedDate(filterValue, "dd-MM-yyyy HH:mm")));


                    } else {
                        predicate =
                                criteriaBuilder.and(
                                        predicate,
                                        criteriaBuilder.like(criteriaBuilder.lower(expression), "%"
                                                + filterValue.toLowerCase() + "%"));
                    }
                }
            }
        }

        String globalFilterValue = input.getSearch().getValue();
        if (StringUtils.hasText(globalFilterValue)) {
            Predicate matchOneColumnPredicate = criteriaBuilder.disjunction();
            for (ColumnParameter column : input.getColumns()) {
                if (column.getSearchable()) {
                    Expression<String> expression = getExpression(root, column.getData());

                    matchOneColumnPredicate =
                            criteriaBuilder.or(
                                    matchOneColumnPredicate,
                                    criteriaBuilder.like(criteriaBuilder.lower(expression), "%"
                                            + globalFilterValue.toLowerCase() + "%"));
                }
            }
            predicate = criteriaBuilder.and(predicate, matchOneColumnPredicate);
        }

        return predicate;
    }

    Date getFormattedDate(String filterDate, String format) {

        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        Date formattedDate = null;

        try {
            formattedDate = dateFormat.parse(filterDate.substring(1, filterDate.length()));
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return formattedDate;
    }

    private boolean isDate(String filterValue) {

        return filterValue.startsWith("#") && filterValue.trim().length() == 11;
    }

    private boolean isDateAndTime(String filterValue) {

        return filterValue.startsWith("#") && filterValue.length() > 11;
    }

    private boolean isBoolean(String filterValue) {
        return "TRUE".equalsIgnoreCase(filterValue) || "FALSE".equalsIgnoreCase(filterValue);
    }

    private Expression<String> getExpression(Root<T> root, String columnData) {

        if (columnData.contains(ATTRIBUTE_SEPARATOR)) {
            String[] values = columnData.split("\\" + ATTRIBUTE_SEPARATOR);
            if (values.length == 2) {
                return root.join(values[0], JoinType.LEFT).get(values[1]).as(String.class);
            }
            if (values.length == 3) {
                return root.join(values[0], JoinType.LEFT).join(values[1], JoinType.LEFT)
                        .get(values[2]).as(String.class);
            }
            if (values.length == 4) {
                return root.join(values[0], JoinType.LEFT).join(values[1], JoinType.LEFT)
                        .join(values[2], JoinType.LEFT).get(values[3]).as(String.class);
            }
            if (values.length == 5) {
                return root.join(values[0], JoinType.LEFT).join(values[1], JoinType.LEFT)
                        .join(values[2], JoinType.LEFT).join(values[3],JoinType.LEFT).get(values[4]).as(String.class);
            }
            if (values.length == 6) {
                return root.join(values[0], JoinType.LEFT).join(values[1], JoinType.LEFT)
                        .join(values[2], JoinType.LEFT).join(values[3],JoinType.LEFT).join(values[4],JoinType.LEFT).get(values[5]).as(String.class);
            }
            return null;

        } else {
            return root.get(columnData).as(String.class);
        }
    }
    
    private Expression<Date> getDateExpression(Root<T> root, String columnData) {

        if (columnData.contains(ATTRIBUTE_SEPARATOR)) {
            String[] values = columnData.split("\\" + ATTRIBUTE_SEPARATOR);
            if (values.length == 2) {
                return root.join(values[0], JoinType.LEFT).get(values[1]).as(Date.class);
            }
            if (values.length == 3) {
                return root.join(values[0], JoinType.LEFT).join(values[1], JoinType.LEFT)
                        .get(values[2]).as(Date.class);
            }
            if (values.length == 4) {
                return root.join(values[0], JoinType.LEFT).join(values[1], JoinType.LEFT)
                        .join(values[2], JoinType.LEFT).get(values[3]).as(Date.class);
            }
            if (values.length == 5) {
                return root.join(values[0], JoinType.LEFT).join(values[1], JoinType.LEFT)
                        .join(values[2], JoinType.LEFT).join(values[3], JoinType.LEFT).get(values[4]).as(Date.class);
            }
            if (values.length == 6) {
                return root.join(values[0], JoinType.LEFT).join(values[1], JoinType.LEFT)
                        .join(values[2], JoinType.LEFT).join(values[3], JoinType.LEFT).join(values[4], JoinType.LEFT).get(values[5]).as(Date.class);
            }
            return null;

        } else {
            return root.get(columnData).as(Date.class);
        }
    }
}