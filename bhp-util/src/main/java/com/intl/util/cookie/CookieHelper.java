package com.intl.util.cookie;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import com.intl.util.constants.Constants;

public class CookieHelper {

    private int expiry;
    private String path;

    public CookieHelper() {
        this( Constants.DEFAULT_EXPIRY, Constants.DEFAULT_PATH );
    }

    public CookieHelper( int cookieExpiry ) {
        this( cookieExpiry, Constants.DEFAULT_PATH );
    }

    public CookieHelper( int cookieExpiry, String path ) {
        this.expiry = cookieExpiry;
        this.path = path;
    }

    public Cookie createCookie( String name, String value ) {
        Cookie cookie = new Cookie( name, encript( value ) );
        cookie.setMaxAge( this.maxAgeFromDays( this.expiry ) );
        /* adapterCookie.setPath( this.path ); */
        /* cookie.setSecure( Constants.IS_SECURE ); */
        /* cookie.setHttpOnly( Constants.IS_HTTP_ONLY ); */
        return cookie;
    }

    public boolean isCookieExists( HttpServletRequest request, String name, String value ) {
        boolean result = false;
        Cookie[] cookies = request.getCookies();
        for ( Cookie cookie : cookies ) {
            if ( cookie == null ) {
                continue;
            }
            boolean namesMatch = cookie.getName().equals( name );
            boolean valuesMatch = cookie.getValue().equals( encript( value ) );
            if ( !namesMatch || !valuesMatch ) {
                continue;
            }
            result = true;
        }
        return result;
    }

    private String encript( String plainText ) {
        Cipher cipher;
        String encodedString = "";
        try {
            cipher = Cipher.getInstance( Constants.ENCRIPT_ALGORITHM );
            SecretKeySpec key = new SecretKeySpec( generate128BitKey( Constants.SECRET_KEY ),
                Constants.ENCRIPT_ALGORITHM );
            cipher.init( Cipher.ENCRYPT_MODE, key );
            byte[] encryptedBytes = cipher.doFinal( plainText.getBytes() );
            String encryptedString = new String( encryptedBytes );
            encodedString = URLEncoder.encode( encryptedString, Constants.UTF8 );
        }
        catch ( NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException
            | IllegalBlockSizeException | BadPaddingException | UnsupportedEncodingException e ) {
        }
        return encodedString;
    }

    private byte[] generate128BitKey( String password ) throws NoSuchAlgorithmException {
        byte[] key = password.getBytes();
        MessageDigest sha = MessageDigest.getInstance( Constants.KEYGEN_ALGORITHM );
        key = sha.digest( key );
        key = Arrays.copyOf( key, 16 );
        return key;
    }

    private int maxAgeFromDays( int days ) {
        return days * Constants.SEC_IN_DAY;
    }

    public int getExpiry() {
        return this.expiry;
    }

    public void setExpiry( int expiry ) {
        this.expiry = expiry;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath( String path ) {
        this.path = path;
    }
}
