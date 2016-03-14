function customer(customerNode){
	var self = this;
	var selectedOfferIds = [];
	var selectedOffers = [];
	var shippingDetails = {};
	this.rootParent = customerNode;
	var BASE_URL=null;
	this.tabs = $('.tab');
	this.post_button = $(customerNode).find('#post_button');
	//this.tradeBtn = $(customerNode).find('#trade-btn');
	this.tradeBtnDO = $(customerNode).find('.customer-do-menu .tradeDO-btn_enabled_button');
	this.drfqBtn;
	 /* Initialize the module */
	this.init = function() {       
	 	self.common=new common(self.rootParent);
		BASE_URL = self.common.urlHash.CUSTOMER;
	 	self.customerTable=new customerTable(self);
		this.bind();
	};
	
	this.bind = function() {
		self.tabs.on('click', self.loadData);
        self.post_button.on('click', self.post);
        self.common.loadCurrentTab();
        self.common.getMarginStatus(BASE_URL);
        self.selectAllCheckBox();
    };
    
	this.loadData = function(){
		self.common.showLoader();
		self.common.destroyCountdown();
		clearTimeout(self.common.timeOut);
		var selectedTab = this.id;
		if(selectedTab !== ''){
			self.common.deleteReadNotification();
			var clearData = clearSelectedOffers(selectedOffers,selectedOfferIds);
			selectedOffers = clearData[0];
			selectedOfferIds = clearData[1];
			switch( selectedTab ) {
				case 'confirmedOffers':
					$(".container").load(BASE_URL+'/getConfirmedOffersTab', function(){
			            $("#offerTab").val(selectedTab);
						self.customerTable.confirmedOffers();
						self.common=new common(self.rootParent);
						self.common.hideLoader();
						self.common.dataTableSearch(1);
						self.common.advanceSearchSubmit("CUSTOMER");
						self.tradeBtn = $(self.rootParent).find('.tradeDO-btn_enabled_button');
						self.tradeBtn.on("click", function() {
							var offerId = JSON.parse($("#selected_offer_id").val()),
							selectedOffers = JSON.parse($('#selected_offers').val());
							self.common.getLockStatus(selectedOffers, offerId, function (response) {
                        		if ( !response ) {
                        			this.initiateTradeFunction(true);
                        		} else {
                        		    swal({
                        		        title: "",
                        		        text: "Offer locked by another user. Please try after some time.",
                        		        type: "error",
                        		        confirmButtonColor: "#1ab394",
                        		        allowOutsideClick:false
                        		    });
                        		}
                        	}, self);
							
					 	});
					});
				break;
				case 'unConfirmedOffers':
					$(".container").load(BASE_URL+'/getUnConfirmedOffersTab',  function(){
						self.customerTable.unConfirmedOffers();
						self.common=new common(self.rootParent);
						self.common.hideLoader();
						self.common.dataTableSearch(1);
						self.common.advanceSearchSubmit("CUSTOMER");
						self.drfqBtn = $(self.rootParent).find('.drfq_enabled_button');
						$('#listUnConfirmedOffers .select_all_check').attr('disabled',true);
						//create DRFQ
						self.drfqBtn.on("click", function() {
							var count = self.checkboxCount();
							var offerId = null;
							if($("#selected_offer_id").val().trim().length !=0){
								offerId = JSON.parse($("#selected_offer_id").val());
							}
							selectedoffers = $("#selected_offers").val().trim().length !=0 ? JSON.parse($("#selected_offers").val()) : null; 
							if(count==1 ){
								self.common.getLockStatus(selectedoffers, offerId, function (response) {
                                		if ( !response ) {
                                		    this.loadCreateDRFQPage(offerId);
                                		} else {
                                		    swal({
                                		        title: "",
                                		        text: "Offer locked by another user. Please try after some time.",
                                		        type: "error",
                                		        confirmButtonColor: "#1ab394",
                                		        allowOutsideClick:false
                                		    });
                                		}
                                	}, self);

					    	}
//							else
//								event.preventDefault();
					 	});
					});
				break;
				case 'rfq':
					$(".container").load(BASE_URL+'/getRFQsTab',  function(){
						self.customerTable.rfq();
						self.common=new common(self.rootParent);
						self.common.hideLoader();
						self.common.dataTableSearch(1);
						self.menuIcons = $(self.rootParent).find('.menu-icons');
						self.common.advanceSearchSubmit("CUSTOMER_RFQ");
						$("#offerIdLabel").html("RFQ/DRFQ ID");
//						self.common.selectAllCheckBox(selectedOffers, selectedOfferIds,false);
						$('.search_input').attr('placeholder', "RFQ ID");
						document.getElementsByName('offerId')[0].innerHTML = "RFQ/DRFQ ID";//for now
						//addNew
						self.menuIcons.find('#addNewBtn').on("click", function() {
							self.common.destroyCountdown();
							$(".container").load(BASE_URL+'/getAddRFQPage',function(){
								self.common.validateForm();
								self.common.selectOnChange();
								self.common.openDatePicker();
								self.common.cancelBtn();
								$('input[name="expiry"]').val('');
							});
					 	});
					
						//edit
						self.menuIcons.find('.edit_enabled_button').on("click", function() {
							self.common.destroyCountdown();
							var count = self.checkboxCount();
							if(count == 1){
								var offerId = JSON.parse($("#selected_offer_id").val());
								if($(".drfq-row").val() == "true"){
									$(".container").load(BASE_URL+'/getEditDRFQPage?offerId='+offerId[0],function(){
										this.expiryField = $("#customerEditExpiry");
										selectedOfferIds = JSON.parse($("#selected_offer_id").val());
										selectedOffers = JSON.parse($("#selected_offers").val());
										self.common.checkIfCustomTz( this.expiryField,selectedOffers );
										self.common.validateDRFQForm();
										self.common.openDatePicker();
										$("#drfq_id").val(JSON.stringify(selectedOfferIds));
										$("#post_offer_type").val('rfq');
										self.common.cancelBtn();
									});
								}
								else {
									var offerId = JSON.parse($("#selected_offer_id").val());
									$(".container").load(BASE_URL+'/getEditRFQPage?offerId='+offerId[0],function(){
										this.expiryField = $("#customerEditExpiry");
										selectedOfferIds = JSON.parse($("#selected_offer_id").val());
										selectedOffers = JSON.parse($("#selected_offers").val());
										self.common.checkIfCustomTz( this.expiryField,selectedOffers );
										self.common.validateForm();
										self.common.selectOnChange();
										$("#id").val(selectedOfferIds);
										$("#offerTab").val('rfq');
										self.common.openDatePicker();
										self.common.fnResubmit(selectedOffers,'rfq');
										self.common.cancelBtn();
									});
								}
							}
							else if(count > 1){
								$( "#edit_button" ).prop( "disabled", true );
								$( "#edit_button" ).find("p").prop( "disabled", true );
							}
					 	});
						
						/*Replicate */
						self.menuIcons.find('.replicate_enabled_button').on("click", function() {
							self.common.destroyCountdown();
							var count = self.checkboxCount();
							if(count == 1){
								var offerId = JSON.parse($("#selected_offer_id").val());
								postOfferType = $(".active.tab").attr('id');
								$(".container").load(BASE_URL+'/getReplicateRFQPage?offerId='+offerId[0]+'&postOfferType='+postOfferType,function(){
									this.expiryField = $("#customerEditExpiry");
									selectedOfferIds = JSON.parse($("#selected_offer_id").val());
									selectedOffers = JSON.parse($("#selected_offers").val());
									self.common.checkIfCustomTz( this.expiryField,selectedOffers );
									self.common.validateForm();
									self.common.selectOnChange();
									$("#id").val(selectedOfferIds);
									$("#offerTab").val();
									self.common.openDatePicker();
									self.common.cancelBtn();
								});
							}
							else if(count > 1){
								$( "#replicateBtn" ).prop( "disabled", true );
								$( "#replicateBtn" ).find("p").prop( "disabled", true );
							}
						});
						//Post RFQ
						self.menuIcons.find('.post_enabled_button').on("click", function() {
							self.common.destroyCountdown();
							var count = self.checkboxCount();
							if(!self.common.checkIfOfferIdExists(selectedOffers) && count>=1 ){
					    		
								$(".container").load(BASE_URL+'/getPostRFQPage',function(){
									self.common.populatePopupData();
									selectedOfferIds = JSON.parse($("#selected_offer_id").val());
									$("#post_offer_id").val(selectedOfferIds);
									$("#post_offer_type").val('rfq');
									self.common.cancelBtn();
								});
					    	}
					 	});
						/* DELETE*/
						self.menuIcons.find('.delete_enabled_button').on("click", function() {
							self.common.destroyCountdown();
							var count = self.checkboxCount();
							if(!self.common.checkIfOfferIdExists(selectedOffers) && count >=1 ){
								$(".container").load(BASE_URL+'/getDeleteRFQPage',function(){
									self.common.populatePopupData();
									selectedOfferIds = JSON.parse($("#selected_offer_id").val());
									$("#delete_offer_id").val(JSON.stringify(selectedOfferIds));
									$("#delete_offer_type").val('rfq');
									self.deleteRFQ(selectedOfferIds,selectedTab,"/deleteRFQs");
									self.common.cancelBtn();
									$("#offerTab").val(selectedTab);
								});
							}
						});
					});
					break;
				case 'DO':
					$(".container").load(BASE_URL+'/getDOsTab',  function(){
						self.customerTable.DO();
						self.common=new common(self.rootParent);
						self.common.hideLoader();
						self.common.dataTableSelectFilter(14);
						self.menuIcons = $(self.rootParent).find('.menu-icons');
						self.common.advanceSearchSubmit("CUSTOMER");
						document.getElementsByName('offerId')[0].innerHTML = "DO ID";//for now
						self.tradeBtnDO = $(self.rootParent).find('.tradeDO-btn_enabled_button');
						self.tradeBtnDO.on("click", function() {
							self.initiateTradeFunction(false);
					 	});
						$('.reject-btn_enabled_button').on("click", function() {
							self.common.destroyCountdown();
							var count = self.checkboxCount();
							if(!self.common.checkIfOfferIdExists(selectedOffers) && count >=1 ){
								$(".container").load(BASE_URL+'/getRejectDOPage',function(){
									self.common.populatePopupData();
									selectedOfferIds = JSON.parse($("#selected_offer_id").val());
									$("#reject_offer_id").val(JSON.stringify(selectedOfferIds));
									self.rejectDoOffersBtn(selectedOfferIds,selectedTab);
									self.common.cancelBtn();
									$("#offerTab").val(selectedTab);
								});
							}
						});
					});
				break;
				case 'trade':
					$(".container").load(BASE_URL+'/getTradesTab', function(){
		            $("#offerTab").val(selectedTab);
					self.customerTable.trade();
					self.common=new common(self.rootParent);
					self.common.hideLoader();
					self.common.advanceSearchSubmit("TRADE");
					self.common.tradeTableSearch(1);
					//$('.advanced_search_element').removeClass('display_none');
					self.viewBtn = $(self.rootParent).find('.view-btn_enabled_button');
					self.viewBtn.on("click",function(){self.common.viewDealerDetailsFunction('CUSTOMER')});
					self.common.getAdvSearchTradeFields();
					self.common.openDateTimePicker();
					$('#advancedSearchExpiry,#advancedSearchAvailability').hide();
					self.exportTradesToExcel("Trades_Report","listTrades",self.common.tradesTitle);
				});
				break;
				default:
					self.customerTable.confirmedOffers();
			}
		}
	}
	
	this.initiateTradeFunction = function(isCO){
		self.common.destroyCountdown();
		if($("#selected_offer_id").val().trim().length > 0){
			var offerIds = JSON.parse($("#selected_offer_id").val());
			self.getOfferDetailsFilledPage(JSON.stringify(offerIds),isCO);
		}
	}
	
	this.getOfferDetailsFilledPage = function(offerIds,isCO){
		$(".container").load(BASE_URL+'/getCreateTradePage?offerIds='+offerIds+'&isCO='+isCO,function(){
			self.common.initiateTradeExpiryCountDown($('#lockInterval').val());
			self.validateTradeForm();
			self.offerDetails = $('.offerDetails');
			self.shippingDetails = $('.shippingDetails');
			self.orderSummary = $('.orderSummary');
			self.offerCntBtn = $('#offer_continue_btn');
			self.shippingCntBtn = $('#shipping_continue_btn');
			self.shippingBckBtn = $('#shipping_back_btn');
			self.orderConfirmBtn = $('#order_continue_btn');
			self.orderBckBtn = $('#order_back_btn');
		});
	}
	
	this.validateTradeForm = function(){
		self.common.setFormDefaults('trade-form');
		self.common.cancelAndReleaseLock();
		self.offerDetails = $('.offerDetails');
		self.shippingDetails = $('.shippingDetails');
		self.orderSummary = $('.orderSummary');
		self.offerCntBtn = $('#offer_continue_btn');
		self.shippingCntBtn = $('#shipping_continue_btn');
		self.shippingBckBtn = $('#shipping_back_btn');
		self.orderConfirmBtn = $('#order_continue_btn');
		self.orderBckBtn = $('#order_back_btn');
		self.shippingDetailsWrap = $('.shipping-details-wrap');
		$.validator.addMethod("lengthCheck", function (value, element) {
			 var count = value.length;
			if(count != 0){
				if(count > 200){
					return false;
				}else{
					return true;
				}
			}else{
				return true;
			}
	    });
		
	    $("#trade-form").validate({
	    	
	      });
		/*$("[name^=quantity]").each(function () {
	        $(this).rules("add", {
	            required: true,
	            numberCheck: true,
        		countCheck:true,
        		maxlength: 6,
        		isDecimal:true,
        		preValueCheck:true,
        		onkeyup:false,
	            messages: {
					required: "Required",
					numberCheck: "Please enter a number",
	                countCheck: "Value should be greater than zero",
	                maxlength: "Maximum of 6 digit number is allowed",
	                isDecimal: "Decimal not allowed"
				}
	        });
	    });*/
		
	    $.validator.addMethod("numberCheck", function (value, element) {
	        return !isNaN(value);
	    });
		$.validator.addMethod("countCheck", function (value, element) {
	        return value > 0;
	    });
		$.validator.addMethod("postvCheck", function (value, element) {
	        return value >= 0;
	    });
		$.validator.addMethod("isDecimal", function (value, element) {
			if(value % 1 != 0){
				return false;
			}else{
				return true;
			}
	    });	
		$.validator.addMethod("preValueCheck", function (value, element) {
			 var dataElement ="";
		     dataElement = $(element).attr('data-attr');
		     if(parseFloat(value) > parseFloat(dataElement)){
				 return false;
			 }else{
				 return true;
			 }
        },function(params, element) {
        	  return "Trade quantity cannot be greater than Offer quantity ("+parseInt($(element).attr('data-attr'))+")";
        });
	    
		self.offerCntBtn.on('click',function(){
			/*self.fp();
			if($("#trade-form").valid()){*/
				var qty = 0;
				$(".qtyInput").each(function () {
					qty+=parseInt(this.value);
				});
				if(self.checkMarginStatusAndgetLocAndFComp(qty)){
					self.offerDetails.css('display','none');
					if($(".shipping_details_check").is(':checked')){
						var srcLocVal = self.offerDetails.find(".src h3")[0].innerHTML;
						if(JSON.parse($('#selected_offer_id').val()).length > 1){
							swal({
					            title: "",
					            text: "Are the shipping details common across trades? Click 'No' to specify different shipping details for each trade, else click 'Yes'",
					            showCancelButton: true,
					            confirmButtonColor: "#1ab394",
					            confirmButtonText: "YES",
					            cancelButtonText: "NO",
					            closeOnConfirm: true,
					            allowOutsideClick:false
					        }, function (isconfirmed) {
					        	var shippingBox = $('.shipping_box').html();
					        	$('.multiple_Shipping').html('');
					        	if(isconfirmed){
					        		$('.multiple_Shipping').addClass('hidden');
					        		$('.shipping_box').removeClass('hidden');
					        	}
					        	else{
					        		
					        		var offerIds = [];
					        		$('.offerDetails .offerId').each(function(){
					        			$('.multiple_Shipping').append(shippingBox)
					        			offerIds.push($(this).text());
				        			});
					        		$('.multiple_Shipping').removeClass('hidden');
					        		$('.shipping_box').addClass('hidden');
					        		$('.multiple_Shipping .box_id').each(function(i,e){
					        			var baseNode = $(this).parent().parent();
					        			baseNode.find("input[name='freightPremium']").attr('name','freightPremium'+i).attr('disabled',true);
					        			baseNode.find("[name='freightCompany']").attr('name','freightCompany'+i).attr('disabled',true);
					        			baseNode.find("[name='location']").attr('name','location'+i).attr('disabled',true);
					        			baseNode.find("[name='deliveryAddress']").attr('name','deliveryAddress'+i).attr('disabled',true);
					        			$(this).html("<div class='addDetails'><input type = 'checkbox' class ='addShipping'> Add Shipping Details</div> <p>"+offerIds[i]+"</p>");
					        		});
					        		$('.addShipping').on('click',function(){
					        			if($(this).prop('checked')){
					        				$(this).closest('.shipping_box_wrap').find('ul select,ul input:not(".srcLoc"),ul textarea').removeAttr('disabled');
					        			}
					        			else{
					        				var baseNode = $(this).closest('.shipping_box_wrap');
					        				baseNode.find('ul select').val('').attr('disabled',true);
					        				baseNode.find('ul input:not(".srcLoc")').val('').attr('disabled',true);
					        				baseNode.find('ul textarea').val('').attr('disabled',true);
					        			}
					        		});
					        	}
					        	self.shippingDetails.find(".srcLoc").val(srcLocVal);
					        });
						}
						else{
							$('.multiple_Shipping').addClass('hidden');
			        		$('.shipping_box').removeClass('hidden');
			        		self.shippingDetails.find(".srcLoc").val(srcLocVal);
						}
						self.toggleShippingImg(true);
						self.shippingDetails.css('display','block');
						self.shippingDetailsWrap.css('display','inline-block');
					}else {
						self.toggleShippingImg(false)
						self.orderSummary.css('display','block');
						self.shippingDetailsWrap.css('display','none');
					}
					self.offerDetails.find(".qty input").each(function(i,e){
						$("#qty"+(i+1)).html($(this).val());
						$(".input_data")[i].setAttribute('data',$(this).val());
					});
				}
			//}  
		});

		self.shippingCntBtn.on('click',function(){
			self.validateShipping();
			if($("#trade-form").valid()){
				if($('.shipping_box').hasClass('hidden')){
					self.appendMultipleShippingDetails();
					$('.final_SD_wrap').addClass('hidden');
				}
					
				else{
					self.appendShippingDetails();
					$('.final_SD_wrap').removeClass('hidden');
				}
				self.shippingDetails.css('display','none');
				self.orderSummary.css('display','block');
			}  
		});
		self.shippingBckBtn.on('click',function(){
			self.shippingDetails.css('display','none');
			self.offerDetails.css('display','block');
		});
		self.orderBckBtn.on('click',function(){
			self.orderSummary.css('display','none');
			self.offerDetails.css('display','block');
		});
		self.orderConfirmBtn.on('click',function(){
			self.orderConfirmBtn.attr('disabled',true);
			self.finishOrderConfirmation();
		});
		}
	
	this.checkMarginStatusAndgetLocAndFComp = function(qty){
		var returnValue = false;
		$.ajax({
	 		url : BASE_URL+'/checkBalanceAndgetControlValues',
	 		type: 'post',
            cache: false,
            processData: false,
            dataType: 'json',
            data:qty,
            dataType: 'json',
            contentType: 'application/json',
            async: false,
	 		success : function(response) {
	 			console.log(response);
	 			if(response){
	 				if(response.balanceCheck.status!='1'){
//	 					$('#order_continue_btn').attr('disabled',true);
		 				$(".trade-account-popup").trigger('click');
		 				returnValue =  false;
		 			}else{
//		 				$('#order_continue_btn').attr('disabled',false);
		 				if(response.city){
		 					self.common.fillControlWithResponse(response.city,'destinationLocation');
			 			}
		 				if(response.freightCompany){
		 					self.common.fillControlWithResponse(response.freightCompany,'freightCompany');
			 			}
		 				returnValue =  true;
		 			}
	 			}
	 		}
	 	});
		return returnValue;
	}
	
	this.toggleShippingImg = function(ticked){
		if(ticked == true){
			self.orderSummary.find('#ship_success_div').removeClass("ship_failr");
			self.orderSummary.find('#ship_failr_div').addClass( "ship_failr" );
		}else{
			self.orderSummary.find('#ship_success_div').addClass("ship_failr");
			self.orderSummary.find('#ship_failr_div').removeClass( "ship_failr" );
		}
/*		var imgSrc = imgUrl;
		var changeUrl = imgSrc.split('/');
		var imgname = changeUrl[changeUrl.length-1];
		self.orderSummary = $('.orderSummary');
		var tickImg = self.orderSummary.find('#ship-completed-tick').css('background-image');
		var tickImageUrl = tickImg.split('/');
		var tickImageName = tickImageUrl[tickImageUrl.length-1];
		var bg_img = tickImg.replace(tickImageName, ticked== true ? "greenTick.png":"cross_red.png").replace('url(','');;
		self.orderSummary.find('#ship-completed-tick').css('background-image', 'url(' +bg_img+ ')');
		return imgUrl.replace(imgname, chngeImg); */
	}
	
	this.checkboxCount = function(){
		var offerId = JSON.parse($("#selected_offer_id").val());
		var count = offerId.length; 
		return count;
	}	
	function clearSelectedOffers(selectedOffers,selectedOfferIds){
		$("#selected_offers").val("");
	    $("#selected_offer_id").val("");
		selectedOffers = [];
		selectedOfferIds = [];
		$("input[name=offer-id]").each( function () {
		       $(this).prop('checked',false);
		   });
		$('#deleteBtn').removeClass('delete_disabled_button');
    	$('#post_button').removeClass('post_disabled_button');
    	$('#edit_button').removeClass('edit_disabled_button');
    	$('#listConfirmedOffers .select_all_check, #unlistConfirmedOffers .select_all_check').removeAttr('checked');
		return [selectedOffers,selectedOfferIds];
	}
	
	this.deleteRFQ = function(selectedOfferIds,currentTab,url){
		$('#delete_form_delete_button').click(function(){
			var deleteObj = {};
			deleteObj.offerIds = selectedOfferIds;
			deleteObj.offerType = currentTab;
			self.common.customAlert(deleteObj,currentTab,"CUSTOMER",url);
		});	
	}
	
	this.rejectDoOffersBtn = function(selectedOfferIds,currentTab){
		$('#reject_form_reject_button').click(function(){
			var rejectObj = {};
			rejectObj.offerIds = selectedOfferIds;
			rejectObj.offerType = currentTab;
			self.common.rejectOffersCustomAlert(rejectObj,currentTab,"CUSTOMER",'/rejectDOs',false);
		});	
	}
	
	this.isRejected = function(selectedOffers){
		var notRejected = true;
		for (var loopCount in selectedOffers){
			if(selectedOffers[loopCount].offerMaster.status === "REJECTED"){
				   notRejected = false;
				   break;
			   }
		}
/*		selectedOffers.forEach(function(singleOffer) {
		   if(singleOffer.offerMaster.status !== "REJECTED"){
			   notRejected = false;
			   break;
		   }
		});*/
		return notRejected;
	}
	
	/*single select*/
	this.singleSelectOffers = function () {
		 var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [],
			 selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		     $row = $(this).closest('tr'),
		     offerData = oTable.row($row).data();
	    if (this.checked) {
	    	selectedOffers.push(offerData);
	    	selectedOfferIds.push(offerData.id);
	    	//self.common.changeBtnClass('reject-btn','enabled','reject-btn');
	        if (selectedOffers && selectedOffers.length > 1) {
	            if ((self.common.checkOffersSelectable(selectedOffers))&&(self.isRejected(selectedOffers))) {
	            	self.common.changeBtnClass('tradeDO-btn','enabled','tradeDO-btn');
	            }else{
	            	self.common.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
	            }
	            if(self.isRejected(selectedOffers)){
	            	self.common.changeBtnClass('reject-btn','enabled','reject-btn');
	            }else{
	            	self.common.changeBtnClass('reject-btn','disabled','reject-btn');
	            }
	            $("#selected_offers").val(JSON.stringify(selectedOffers));
            	$("#selected_offer_id").val(JSON.stringify(selectedOfferIds));
	        } else {
	        	if(selectedOffers[0].offerMaster.status !== "REJECTED"){
	        		self.common.changeBtnClass('tradeDO-btn','enabled','tradeDO-btn');
	        		self.common.changeBtnClass('reject-btn','enabled','reject-btn');
	        	}else{
	        		self.common.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
	        		self.common.changeBtnClass('reject-btn','disabled','reject-btn');
	        	}
	            $("#selected_offers").val(JSON.stringify(selectedOffers));
	            $("#selected_offer_id").val(JSON.stringify(selectedOfferIds));
	        }
	    }else{
	    	$('.select_all_check').removeAttr('checked');
	    	self.removeFromObjectArray(selectedOffers,offerData);
	    	self.removeFromStringArray(selectedOfferIds,offerData.id);
	    	if(selectedOffers.length ==0){
	    		self.common.changeBtnClass('reject-btn','disabled','reject-btn');
	    	}
	    	if (selectedOffers.length >1) {
	    		if(self.common.checkOffersSelectable(selectedOffers) && (self.isRejected(selectedOffers))){
	    			self.common.changeBtnClass('tradeDO-btn','enabled','tradeDO-btn');
	    		}else{
	    			self.common.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
	    		}
            	 if(self.isRejected(selectedOffers)){
 	            	self.common.changeBtnClass('reject-btn','enabled','reject-btn');
 	            }else{
 	            	self.common.changeBtnClass('reject-btn','disabled','reject-btn');
 	            }
            	$("#selected_offers").val(JSON.stringify(selectedOffers));
             	$("#selected_offer_id").val(JSON.stringify(selectedOfferIds));
            }else{
            	if(selectedOffers.length ==1){
            		if(selectedOffers[0].offerMaster.status !== "REJECTED"){
    	        		self.common.changeBtnClass('tradeDO-btn','enabled','tradeDO-btn');
    	        		self.common.changeBtnClass('reject-btn','enabled','reject-btn');
    	        	}else{
    	        		self.common.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
    	        		self.common.changeBtnClass('reject-btn','disabled','reject-btn');
    	        	}
            	}else{
            		self.common.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
            	}
            	self.removeFromObjectArray(selectedOffers,offerData);
            	self.removeFromStringArray(selectedOfferIds,offerData.id);
            }
	    }
	};
	
	this.removeFromObjectArray= function (objectArray,dataToBeRemoved){
		for (var key in objectArray) {
    	    if (objectArray[key].id == offerData.id) {
    	        var indexOf = objectArray.indexOf(objectArray[key]);
    	        objectArray.splice(indexOf,1);
    	        $("#selected_offers").val(JSON.stringify(objectArray));
    	    }
    	}
	}
	
	this.removeFromStringArray = function (StringArray,id){
		for (var key in StringArray) {
    	    if (StringArray[key] == id) {
    	        var indexOf = StringArray.indexOf(StringArray[key]);
    	        StringArray.splice(indexOf,1);
    	        $("#selected_offer_id").val(JSON.stringify(StringArray));
    	    }
    	}
	}
	//Submit Trade
	this.finishOrderConfirmation = function(){
        self.common.swLoader();
		var finalTradeObj = self.getTradeDetails(),
		finalTradeObjStr =  JSON.stringify(finalTradeObj);
		$.ajax({
	 		url : BASE_URL+'/performTrade',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: finalTradeObjStr, 
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			swal({
	 				title: "Success",
	 				text: response.actionStatus == true ? 'Trade '+response.tradeId+' created successfully' : "Requested quantity not available",
	                type:  response.actionStatus == true ? "success" : "error",
	                allowOutsideClick:false,
	                confirmButtonColor: "#1ab394"},
	                function () {
	    	 			if(finalTradeObj.offerType=='DO'){
	    	 				$('#DO').click();
	    	 			}else{
	    	 				$('#confirmedOffers').click();
	    	 			}
	                });
	 		}
	 	});
	}
	
	this.getTradeDetails = function(){
		var finalTradeObj = {},
		idQtyArray = [],
		shippingDetailsArray =[],
		baseNode,
		shippingDetails =[];
		var multipleShipping = $('.shipping_box').hasClass('hidden');
		self.orderSummary.find(".input_data").each(function(i,e){
			obj = {},
			shippingObj={};
			obj.quantity = $(this)[0].getAttribute('data');
			obj.offerId=$(this).val();
			idQtyArray.push(obj);
			baseNode = $(this).closest('div').find('.shipping-details-wrap');
			if(baseNode && baseNode.length > 0){
				shippingObj.sourceLocationId = $(".input_data").attr("data-id");
				shippingObj.offerId = $(this).val();
				shippingObj.deliveryLocationId = baseNode.find('.DL h3')[0].getAttribute('data');
				shippingObj.freightCompanyId = baseNode.find('.FC h3')[0].getAttribute('data');
				shippingObj.freightPremium = baseNode.find('.FP h3').text();
				shippingObj.deliveryAddress = baseNode.find(".delivery-textarea textarea").val();
				shippingDetails.push(shippingObj);
			}else{
				if(multipleShipping){
					shippingObj.offerId = $(this).val();
					shippingDetails.push(shippingObj);
				}
			}
		});
		if(!multipleShipping){
			finalTradeObj.sourceLocationId = $(".input_data").attr("data-id");
			finalTradeObj.deliveryAddress = $(".delivery-textarea textarea").val();
			finalTradeObj.deliveryLocationId=self.orderSummary.find(".DL h3")[0].getAttribute('data');
			finalTradeObj.freightCompanyId = self.orderSummary.find(".FC h3")[0].getAttribute('data');
			finalTradeObj.freightPremium = self.orderSummary.find(".FP h3").text();
			finalTradeObj.shippingType = 'S';
		}else{
			finalTradeObj.shippingType = 'M';
		}
		finalTradeObj.tradeOfferList = idQtyArray;
		finalTradeObj.shippingDetails = shippingDetails;
		if($(".active.tab").attr('id')=='DO'){
			finalTradeObj.offerType = 'DO';
		}else{
			finalTradeObj.offerType = 'CO';
		}
		debugger;return finalTradeObj;
	}

	this.appendShippingDetails = function(){
		self.clearShippingDetails();
		var sourceLoc,delLoc,freightComp,freightPrm;
		sourceLoc = self.offerDetails.find(".src h3")[0].innerHTML;
		delLoc = $(".shippingDetails [name='location'] option:selected").text();
		freightPrm = $(".shippingDetails input[name='freightPremium']").val();
		freightComp = $(".shippingDetails [name='freightCompany'] option:selected").text();
		self.deliveryTxtField = $(".DA textarea");
		self.deliveryAdd = $(".delivery-textarea textarea").val();
		self.deliveryTxtField.val(self.deliveryAdd).css("border","none").attr('disabled',true);
		self.orderSummary.find(".SL h3").text(sourceLoc);
		self.orderSummary.find(".DL h3").text(delLoc);
		self.orderSummary.find(".DL h3")[0].setAttribute('data',$(".shippingDetails [name='location']").val());
		self.orderSummary.find(".FP h3").text(freightPrm);
		self.orderSummary.find(".FC h3").text(freightComp);
		self.orderSummary.find(".FC h3")[0].setAttribute('data',$(".shippingDetails [name='freightCompany']").val());
	}
	this.appendMultipleShippingDetails = function(){
		var sd = [];
		var checkedOfferId =[];
		self.clearShippingDetails(); 
		$('.multiple_Shipping .shipping_box_wrap').each(function(i,e){
			if($(this).find('.addShipping').prop('checked')){
				var obj = {};
				var id=$(e).find('.box_id p').text();
				checkedOfferId.push(id);
				var DA = $(this).find('.delivery-textarea textarea').val();
				obj.delAdd = DA;
				sd.push(obj);
				
				
				var sourceLoc,delLoc,freightComp,freightPrm,delAdd;
				sourceLoc = self.offerDetails.find(".src h3")[0].innerHTML;
				var nameLoc='[name="location'+i+'"]',
				nameFP='[name="freightPremium'+i+'"]',
				nameFC='[name="freightCompany'+i+'"]';
				delLoc = $(this).find(nameLoc+' option:selected');
				freightPrm = $(this).find(nameFP).val();
				freightComp = $(this).find(nameFC+' option:selected');
				delAdd = $(this).find(".delivery-textarea textarea").val();
				
				var shippingDetails = $('.final_SD_wrap').html();
				$('.summaryListing').each(function(){
					if($(this).find('.offerId').text()==id){
						$(this).parent().append(shippingDetails);
						self.SDWrap = $(this).parent().find('.shipping-details-wrap');
						//self.SDWrap.find('.SD_head').append(id);
						self.SDWrap.find(".SL h3").text(sourceLoc);
						self.SDWrap.find(".DL h3").text(delLoc.text());
						self.SDWrap.find(".DL h3")[0].setAttribute('data',delLoc.val());
						self.SDWrap.find(".FP h3").text(freightPrm);
						self.SDWrap.find(".FC h3").text(freightComp.text());
						self.SDWrap.find(".FC h3")[0].setAttribute('data',freightComp.val());
						self.SDWrap.find(".DA textarea").val(delAdd).css({"border-color":"#eee","height":"74px","background":"white"}).attr('disabled',true);
					}
				});
				
			}
			});
		
	}
	this.loadCreateDRFQPage = function(offerId){
		self.common.destroyCountdown();
		$(".container").load(BASE_URL+'/getAddDRFQPage?offerId='+offerId[0],function(){
			this.expiryField = $("#customerEditExpiry");
			selectedOfferIds = JSON.parse($("#selected_offer_id").val());
			selectedOffers = JSON.parse($("#selected_offers").val());
			this.expiryField.val(self.common.setExpiryFieldInCurrTZ(this.expiryField.val()));
			self.common.validateDRFQForm();
			self.common.openDatePicker();
	        $("#drfq_id").val(JSON.stringify(selectedOfferIds));
			$("#post_offer_type").val('rfq');
			self.common.cancelAndReleaseLock();
		});
	}
	
	this.selectAllCheckBox = function () {
		$('.container').on('click', '.select_all_check', function () {
	        var selectedTabId,
	        selectedTabName = $(".tab.active").attr("id");
			$("#selected_offers").val([]);
		    $("#selected_offer_id").val([]);
		    self.common.checkEligibleRows(this,selectedTabName,'C');
	        self.menuValidation(selectedTabName);
	    });
	}
    
	this.menuValidation = function(selectedTabName){
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
		selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		if(selectedOffers.length == 1){
			if(selectedTabName == 'trade'){
				self.common.changeBtnClass('view-btn','enabled','view-btn');
				self.common.changeBtnClass('export-btn','enabled','export-btn');
			}else if(selectedTabName == 'DO'){
				if(selectedOffers[0].offerMaster.status !== "REJECTED"){
	        		self.common.changeBtnClass('tradeDO-btn','enabled','tradeDO-btn');
	        		self.common.changeBtnClass('reject-btn','enabled','reject-btn');
	        	}else{
	        		self.common.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
	        		self.common.changeBtnClass('reject-btn','disabled','reject-btn');
	        	}
			}else{
				//self.common.setButtonBehaviour(true,true,false,false,false);
				self.common.setButtonBehaviour(true,true,true,true,false);
			}
		}else if(selectedOffers.length > 1){
			if(selectedTabName == 'confirmedOffers'){
				if(self.common.checkOffersSelectable(selectedOffers)){
					self.common.changeBtnClass('tradeDO-btn','enabled','tradeDO-btn');
					self.common.changeBtnClass('reject-btn','enabled','reject-btn');
				}else{
					self.common.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
					self.common.changeBtnClass('reject-btn','disabled','reject-btn');
				}
			}else if(selectedTabName == 'DO'){
				if(self.common.checkOffersSelectable(selectedOffers)){
					 if(self.isRejected(selectedOffers)){
						 self.common.changeBtnClass('tradeDO-btn','enabled','tradeDO-btn');
					 }else{
						 self.common.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
					 }
				}else{
					self.common.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
				}
				   if(self.isRejected(selectedOffers)){
	 	            	self.common.changeBtnClass('reject-btn','enabled','reject-btn');
	 	            }else{
	 	            	self.common.changeBtnClass('reject-btn','disabled','reject-btn');
	 	            }
			}else if(selectedTabName == 'trade'){
				self.common.changeBtnClass('export-btn','enabled','export-btn');
			}else if(selectedTabName == 'rfq'){
				self.common.changeBtnClass('delete','enabled','deleteBtn');
				self.common.changeBtnClass('post','enabled','post_button');
			}
		}else{
			self.common.disableAllButtons();
		}
	}
	
	this.singleSelectCheck = function(e){
		self.common.getSetSingleRowData(this);
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
		selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		if(selectedOffers && selectedOffers.length > 0){
			var editAndDelete = self.common.isAllOffersPostable(selectedOffers);
			if(selectedOffers.length==1){
				self.common.setButtonBehaviour(true,true,editAndDelete,editAndDelete,false);
			}else if(selectedOffers.length > 1){
				self.common.setButtonBehaviour(false,false,editAndDelete,editAndDelete,false);
			}
		}else{
			self.common.disableAllButtons();
		}
		
	};
	
	this.exportTradesToExcel = function(sheet,tableId,excelTableHeader){
    	$('.export-btn_enabled_button').click(function(e){
    		var selectedOffersArray =JSON.parse($("#selected_offers").val());
   	       self.common.JSONToXLSConvertor(selectedOffersArray, sheet, true,tableId,excelTableHeader);
  	});
    }
	this.clearShippingDetails = function(){
		$('.summaryWrap').each(function(){
			$(this).find('.shipping-details-wrap').remove();
		}); 
	}
	this.validateShipping =function(){
		/*onkeyup: function(element) { 
		var element_id = jQuery(element).attr('qtyInput');
		if (element_id && this.settings.rules[element_id].onkeyup !== false) {
			jQuery.validator.defaults.onkeyup.apply(this, arguments);
		}
	},
    rules: {
    	location:"required",
    	deliveryAddress:  {
    		required: true,
    		lengthCheck:true
    	},
    	freightCompany:"required",
    	freightPremium:{
    		required: true,
    		numberCheck:true,
    		postvCheck:true
    	},
    },
    messages: {
        location: "Required",
        deliveryAddress: {
            required: "Required",
            lengthCheck: "Maximum of 200 charcters",
        },
        freightCompany:"Required",
        freightPremium:{
        	 required: "Required",
        	 numberCheck: "Please enter a number",
        	 postvCheck: "Negative number not allowed"
        }
    },
    errorElement: "p",
    tooltip_options: {
    	location: { placement: 'right' },
    	deliveryAddress: { placement: 'right' },
    	freightCompany: { placement: 'right' },
    	freightPremium: { placement: 'right' },
     },
    submitHandler: function(form) {
    }*/
		$("[name^='freightPremium']").each(function () {
	        $(this).rules("add", {
	        	required: true,
        		numberCheck:true,
        		postvCheck:true,
	            messages: {
	            	 location:"required",
	            	 required: "Required",
	            	 numberCheck: "Please enter a number",
	            	 postvCheck: "Negative number not allowed"
	            },
	        });
	    });
		
		$("[name^='deliveryAddress']").each(function () {
	        $(this).rules("add", {
        		required: true,
        		lengthCheck:true,
	            messages: {
	            	required: "Required",
	                lengthCheck: "Maximum of 200 charcters"
	            },
	        });
	    });
		
		$("[name^='freightCompany']").each(function () {
	        $(this).rules("add", {
        		required: true,
	            messages: {
	            	required: "Required"
	            },
	        });
	    });
		
		$("[name^='location']").each(function () {
	        $(this).rules("add", {
        		required: true,
	            messages: {
	            	required: "Required"
	            },
	        });
	    });
	}
    /*Auto initialize*/
     this.init();
}
