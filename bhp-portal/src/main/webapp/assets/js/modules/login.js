$(window).load(function() {
    show();
    	$('#login_btn').click(function(){
    		$.validator.addMethod("emailCheck", function (value, element) {
    			var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    		    if (!regex.test(value)) {
    		    	return false;
    		    }else{
    				return true;
    			}
    	    });		
            $("#login_form").validate({
                rules: {
                	username:  {
                		required: true,
                		emailCheck:true
    	            },
    	            password:  {
    	        		required: true,
    	            },
    	            termsConditions:{
    	            	required :true
    	            }
                },
                messages: {
                	username: {
                		required: "Required",
                		emailCheck:"Please enter a valid email"
    	            },
    	            password: {
    	                required: "Required"
    	            },
    	            termsConditions:{
    	            	required:"Please agree terms & conditions"
    	            }
                },
               /* errorElement: "p",*/
                tooltip_options: {
                	username: { placement: 'right' },
                	password: { placement: 'right' },
                	termsConditions: { placement: 'top' },
                 },
                submitHandler: function(form) {
                   return true;
                }
            });
    		});
    $('#proceed_btn').click(function(){	
            $("#terms-form").validate({
                rules: {
    	            termsConditions:{
    	            	required :true
    	            }
                },
                messages: {
    	            termsConditions:{
    	            	required:"Please agree terms & conditions"
    	            }
                },
                tooltip_options: {
                	termsConditions: { placement: 'top' },
                 },
                submitHandler: function(form) {
                  return true;
                }
            });
            if($("#terms-form").valid()){
               javascript:location.href='/bhp-back-office/tcAccept';
            }
    		});
    setWindowHeight();
});
$( window ).resize(function() {
	setWindowHeight();
	$("input[type='checkbox']").tooltip('destroy');
});
$(window).on("orientationchange",function(){
	setWindowHeight();
});
var sessionTime=30;
$.ajax({
	type: "GET",
	contentType: "application/json; charset=utf-8",
	url: "/bhp-back-office/getTimeOut",
	success: function(response){
		if(response)
			 sessionTime=response;
		$('meta[http-equiv=REFRESH]').attr('content',((sessionTime*60)-1));
	}
});

function show() {
    $('#loading').hide();
    $('#container').fadeIn();
};
//setTimeout(show, 4000);
function setWindowHeight(){
	var windowHeight = $(window).height();
	var headerFooterHeight = $('.page_footer').height()+50;
	$('.TC-wrapper').css("min-height",windowHeight-headerFooterHeight);
};
