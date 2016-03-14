package com.intl.viewresolver;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.AbstractUrlBasedView;
import org.springframework.web.servlet.view.velocity.VelocityLayoutView;
import org.springframework.web.servlet.view.velocity.VelocityViewResolver;

public class VelocityMultipleLayoutViewResolver extends VelocityViewResolver {

    private static final Logger LOGGER = LoggerFactory
        .getLogger( VelocityMultipleLayoutViewResolver.class );

    private Map< String, String > mappings = new HashMap< String, String >();

    private String layoutKey;

    private String screenContentKey;

    @Override
    protected Class< ? > requiredViewClass() {
        return VelocityLayoutView.class;
    }

    public void setLayoutKey( final String layoutKey ) {
        this.layoutKey = layoutKey;
    }

    public void setScreenContentKey( final String screenContentKey ) {
        this.screenContentKey = screenContentKey;
    }

    @Override
    protected AbstractUrlBasedView buildView( final String viewName ) throws Exception {
        if ( LOGGER.isDebugEnabled() ) {
            LOGGER
                .debug( "Building view using multiple layout resolver. View name is {}", viewName );
        }

        VelocityLayoutView view = ( VelocityLayoutView ) super.buildView( viewName );

        if ( this.layoutKey != null ) {
            view.setLayoutKey( this.layoutKey );
        }

        if ( this.screenContentKey != null ) {
            view.setScreenContentKey( this.screenContentKey );
        }

        if ( !this.mappings.isEmpty() ) {
            for ( Map.Entry< String, String > entry : this.mappings.entrySet() ) {

                // Correct wildcards so that we can use the matches method in the String object
                String mappingRegexp = StringUtils.replace( entry.getKey(), "*", ".*" );
                // If the view matches the regexp mapping
                if ( viewName.matches( mappingRegexp ) ) {
                    if ( LOGGER.isDebugEnabled() ) {
                        LOGGER.debug( "  Found matching view. Setting layout url to {}",
                            entry.getValue() );
                    }

                    view.setLayoutUrl( entry.getValue() );

                    return view;
                }
            }
        }

        return view;
    }

    public Map< String, String > getMappings() {
        return mappings;
    }

    public void setMappings( Map< String, String > mappings ) {
        this.mappings = mappings;
    }

}
