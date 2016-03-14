$(document).ready(function() {
	    
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	$(document).bind("ajaxSend", function(elm, xhr, s) {
		if (s.type == "POST") {
			xhr.setRequestHeader(header, token);
		}
	});
	switch (page) {
	case 'login':
		initModInst(".container", Login);
		initModInst(".container", Common);
		break;
	case 'customer':
		initModInst(".container", customer);
		//initModInst(".container", common);
		break;
	case 'dealer':
		initModInst(".container", dealer);
		//initModInst(".container", common);
		break;
	case 'supplier':
		initModInst(".container", supplier);
		// initModInst(".container", common);
		break;
	case 'operator':
		initModInst(".container", operator);
		break;
	}
	//Session management and timeout
		var idleTime = 0;
		var sessionTime = 30;
	    var idleInterval = setInterval(timerIncrement, 1000); // 1 minute
	    $(this).mousemove(function (e) {
	        idleTime = 0;
	    });
	    $(this).keypress(function (e) {
	        idleTime = 0;
	    });
	    $.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "/bhp-back-office/getTimeOut",
			success: function(response){
				if(response)
					 sessionTime=response;
			}
		});
	function timerIncrement() {
	    idleTime = idleTime + 1;
	    if (idleTime > ((sessionTime*60)-1)) {
	        window.location.replace('/bhp-back-office/logout');
	    }
	}
	setWindowHeight();
	$(window).load(function(){
		$('#loading').hide();
	});
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);
});
$( window ).resize(function() {
	setWindowHeight();
	destroyTooltips();
/*	$('select').each(function(){
		if($(this).is(':focus')){
		$(this).removeClass('active');
		alert(1);
		};
		});*/
});
function destroyTooltips(){
	var tooltips = $('.tooltip').length;
    if (tooltips) {
    	$('.tooltip').tooltip('destroy') 
    }
}
function setWindowHeight(){
	var windowHeight = $(window).height();
	var headerFooterHeight = $('.primary-nav').height()+$('.logo').height()+$('.page_footer').height()+54;
	$('.container').css("min-height",windowHeight-headerFooterHeight);
}
$.ajaxSetup({
	statusCode: {
		500: function(data) {
			window.location.href = "/bhp-back-office/";
			},
		405: function(data) {
			window.location.href = "/bhp-back-office/login";
			}
		}
	});
/*
 * This instantiates the module instances @param {String} theSelector @param
 * {Object} modType
 */
function initModInst(theSelector, modType) {
	var modNodes = $(document).find(theSelector);

	// for each instanatiate new instance passing
	$.each(modNodes, function(i, modNode) {
		new modType(modNode);
	});
}

// From https://github.com/jquery/jquery/blob/master/src/serialize.js
// Overrides data serialization to allow Spring MVC to correctly map input
// parameters : column[0][data] now becomes column[0].data
(function($) {
	var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function customBuildParams(prefix, obj, traditional, add) {
		var name;

		if (jQuery.isArray(obj)) {
			// Serialize array item.
			jQuery.each(obj, function(i, v) {
				if (traditional || rbracket.test(prefix)) {
					// Treat each array item as a scalar.
					add(prefix, v);

				} else {
					// Item is non-scalar (array or object), encode its numeric
					// index.
					customBuildParams(prefix + "["
							+ (typeof v === "object" ? i : "") + "]", v,
							traditional, add);
				}
			});

		} else if (!traditional && jQuery.type(obj) === "object") {
			// Serialize object item.
			for (name in obj) {
				// This is where the magic happens
				customBuildParams(prefix + "." + name, obj[name], traditional,
						add);
			}

		} else {
			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	$.param = function(a, traditional) {
		var prefix, s = [], add = function(key, value) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction(value) ? value() : (value == null ? ""
					: value);
			s[s.length] = encodeURIComponent(key) + "="
					+ encodeURIComponent(value);
		};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if (traditional === undefined) {
			traditional = jQuery.ajaxSettings
					&& jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form
		// elements.
		if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
			// Serialize the form elements
			jQuery.each(a, function() {
				add(this.name, this.value);
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				customBuildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	};
})(jQuery);
