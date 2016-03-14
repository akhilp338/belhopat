package com.intl.util.dozer;

import java.util.ArrayList;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.springframework.stereotype.Component;

@Component
public class INTLServiceHelper {

    private DozerBeanMapper dozerMapper;

    public void setDozerMapper( DozerBeanMapper dozerMapper ) {
        this.dozerMapper = dozerMapper;
    }

    @SuppressWarnings( "unchecked" )
    public < T > T map( Object source, Class< ? > destinationClass ) {
        if ( source != null ) {
            return ( T ) dozerMapper.map( source, destinationClass );
        }
        else {
            return null;
        }
    }

    public < T, U > List< U > mapCollection( final List< T > source,
        final Class< U > destType ) {

        final List< U > dest = new ArrayList< U >();
        if ( source != null ) {
            for ( T element : source ) {
                dest.add( dozerMapper.map( element, destType ) );
            }
        }

        return dest;
    }

}
