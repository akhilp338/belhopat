function dealer(dealerNode){
	var self = this;
	var selectedOfferIds = [];
	var selectedOffers = [];
	var currentInnerTab;
	this.rootParent = dealerNode;
	var BASE_URL=null;
	this.tabs = $('.menu-li');
	this.advSearchSubmit = $(dealerNode).find('#advancedSearchSubmitButton');
	 /* Initialize the module */
    this.init = function() {       
    	self.common=new common(self.rootParent);
	 	self.dealerTable=new dealerTable(self);
	 	self.dealerTrade=new dealerTrade(self);
	 	
	 	self.dealerPremium=new dealerPremium(self);
	 	BASE_URL = self.common.urlHash.DEALER;
		this.bind();
    };
    
    this.bind = function() {
    	self.tabs.on('click', self.loadData);
    	self.common.loadCurrentTab();
    	//$('#dashboard').trigger('click');
    	self.selectAllCheckBox();
    	self.currentInnerTab = $("#currentInnerTab").val();
    }
    
    this.loadData = function(){
    	if(!($(this).parent().hasClass('disabled_buttons'))){
    		self.common.resetDashBoardActions();
	    	self.common.showLoader();
	    	var selectedTab = $(this).children('a').attr('id');
			self.common.destroyCountdown();
			clearTimeout(self.common.timeOut);
			if(selectedTab !== ''){
			   self.common.deleteReadNotification();
				//for clearing the global data 
				var clearData = self.common.clearSelectedOffers(selectedOffers,selectedOfferIds);//
				selectedOffers = clearData[0];
				selectedOfferIds = clearData[1];
				switch( selectedTab ) {
					case 'confirmedOffers':
						$(".container").load(BASE_URL+'/getConfirmedOffersTab', function(){
							postOfferType = $(".active.tab").attr('id');
							self.dealerTable.confirmedOffers();
							self.common=new common(self.rootParent);
							self.common.hideLoader();
							self.common.dataTableSearch(2);
							self.common.advanceSearchSubmit("DEALER");
							self.menuIcons = $(self.rootParent).find('.menu-icons');
							/*post*/
							self.menuIcons.find('.post_enabled_button').on("click", function() {
								self.common.destroyCountdown();
								var count = self.checkboxCount();
								if(!self.common.checkIfOfferIdExists(selectedOffers) && count >=1 ){
									$(".container").load(BASE_URL+'/postOffers',function(){
										self.common.populatePopupData();
										selectedOfferIds = JSON.parse($("#selected_offer_id").val());
										$("#post_offer_id").val(selectedOfferIds);
										$("#post_offer_type").val('confirmedOffers');
										self.common.cancelBtn();
										$("#offerTab").val(selectedTab);
									});
								}
							});
	
							//addNew
							self.menuIcons.find('#addNewBtn').on("click", function() {
								self.common.destroyCountdown();
								$(".container").load(BASE_URL+'/getDealerAddNewForm',function(){
									self.common.validateForm();
									self.common.selectOnChange();
									self.common.openDatePicker();
									self.common.cancelBtn();
									$('input[name="expiry"]').val('');
	    							$("#offerTab").val(selectedTab);
	    							$('.header_inner_style')[0].innerHTML = 'Add New Confirmed Offer';
								});
						 	});
							
							/*Edit*/
							self.menuIcons.find('.edit_enabled_button').on("click", function() {
								
								//var offerId = JSON.parse($("#selected_offer_id").val());
								postOfferType = $(".active.tab").attr('id');
								var count = self.checkboxCount();
	
	        					if(count == 1){
	        						var offerId = JSON.parse($("#selected_offer_id").val()),
									selectedOfferForEdit = JSON.parse($('#selected_offers').val());
	                                if( !self.common.checkIfOfferIdExists(selectedOfferForEdit) ){
	                                	self.loadEditConfirmedOfferForm(offerId);
	                                }
	                                else{
	                                	self.common.getLockStatus(selectedOfferForEdit, offerId, function (response) {
	                                		if ( !response ) {
	                                		    this.loadEditConfirmedOfferForm(offerId);
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
								}
								else if(count > 1){
									$( "#edit_button" ).prop( "disabled", true );
									$( "#edit_button" ).find("p").prop( "disabled", true );
								}
							});
							
							/*Replicate */
							self.menuIcons.find('.replicate_enabled_button').on("click", function() {
								self.common.destroyCountdown();
								postOfferType = $(".active.tab").attr('id');
								var count = self.checkboxCount();
								if(count == 1){
									var offerId = JSON.parse($("#selected_offer_id").val());
									$(".container").load(BASE_URL+'/getDealerOfferReplicateForm?offerId='+offerId[0],function(){
										this.expiryField = $("#dealerReplicateExpiry");
										selectedOfferIds = JSON.parse($("#selected_offer_id").val());
										selectedOffers = JSON.parse($("#selected_offers").val());
										self.common.checkIfCustomTz( this.expiryField,selectedOffers );
										self.common.validateForm();
										self.common.selectOnChange();
										$("#id").val(selectedOfferIds);
										// $("#offerTab").val();
										self.common.openDatePicker();
										// self.fnResubmit(selectedOffers,'rfq');
										self.common.cancelBtn();
										$("#offerTab").val(selectedTab);
										$('.header_inner_style')[0].innerHTML = 'Replicate Confirmed Offer';
									});
								}
								else if(count > 1){
									$( "#replicateBtn" ).prop( "disabled", true );
									$( "#replicateBtn" ).find("p").prop( "disabled", true );
								}
							});
	
							/* DELETE or REMOVE */
							self.menuIcons.find('.delete_enabled_button, .remove_enabled_button').on("click", function(e) {
								var isRemove = false;
								if(e.currentTarget.id=='removeBtn'){
									isRemove = true;
								}
								var count = self.checkboxCount();
								var offerId = JSON.parse($("#selected_offer_id").val()),
								selectedOffersForRemoval = JSON.parse($('#selected_offers').val());
								if(!self.common.checkIfOfferIdExists(selectedOffers) && count >=1 ){
									self.common.getLockStatus(selectedOffersForRemoval, offerId, function (response) {
	                            		if ( !response ) {
	                            			this.loadDealerDeleteOrRemovePage(isRemove, selectedTab);
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
							});
						});
					break;
					
					case 'unConfirmedOffers':
						$(".container").load(BASE_URL+'/getUnConfirmedOffersTab',  function(){
							postOfferType = $(".active.tab").attr('id');
							self.dealerTable.unConfirmedOffers();
							self.common=new common(self.rootParent);
							self.common.hideLoader();
							self.common.dataTableSearch(2);
							self.common.advanceSearchSubmit("DEALER");
							self.menuIcons = $(self.rootParent).find('.menu-icons');
							/*post*/
							self.menuIcons.find('.post_enabled_button').on("click", function() {
								var count = self.checkboxCount();
								if(!self.common.checkIfOfferIdExists(selectedOffers) && count>=1 ){
									$(".container").load(BASE_URL+'/postOffers',function(){
										self.common.populatePopupData();
										selectedOfferIds = JSON.parse($("#selected_offer_id").val());
										$("#post_offer_id").val(selectedOfferIds);
										$("#post_offer_type").val('unConfirmedOffers');
										self.common.cancelBtn();
										$("#offerTab").val(selectedTab);
									});
								}
							});
	
							//addNew
							self.menuIcons.find('#addNewBtn').on("click", function() {
								self.common.destroyCountdown();
								$(".container").load(BASE_URL+'/getDealerAddNewForm',function(){
									self.common.validateForm();
									self.common.selectOnChange();
									self.common.openDatePicker();
									self.common.cancelBtn();
	    							$("#offerTab").val(selectedTab);
									$('input[name="expiry"]').val('');
									$('.header_inner_style')[0].innerHTML = 'Add New Unconfirmed Offer';
								});
						 	});
						 	
							/*Edit */
							self.menuIcons.find('.edit_enabled_button').on("click", function() {
								var offerId = JSON.parse($("#selected_offer_id").val());
								postOfferType = $(".active.tab").attr('id');
								count = self.checkboxCount();
								if(count == 1){
									var offerId = JSON.parse($("#selected_offer_id").val());
	                                var selectedOffers = JSON.parse($('#selected_offers').val());
	                                if(!self.common.checkIfOfferIdExists(selectedOffers) ){
	                                	self.loadEditUnConfirmedOfferForm(offerId);
	                                }else{
	                                	self.common.getLockStatus(selectedOffers, offerId, function (response) {
	                            		if ( !response ) {
	                            		    this.loadEditUnConfirmedOfferForm(offerId);
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
								}
								else if(count > 1){
									$( "#edit_button" ).prop( "disabled", true );
									$( "#edit_button" ).find("p").prop( "disabled", true );
								}
							});
							
							/*Replicate */
							self.menuIcons.find('.replicate_enabled_button').on("click", function() {
								self.common.destroyCountdown();
								postOfferType = $(".active.tab").attr('id');
								var count = self.checkboxCount();
								if(count == 1){
									var offerId = JSON.parse($("#selected_offer_id").val());
									$(".container").load(BASE_URL+'/getDealerPreOfferReplicateForm?offerId='+offerId[0],function(){
										this.expiryField = $("#dealerReplicateExpiry");
										selectedOfferIds = JSON.parse($("#selected_offer_id").val());
										selectedOffers = JSON.parse($("#selected_offers").val());
										self.common.checkIfCustomTz( this.expiryField,selectedOffers );
										self.common.validateForm();
										self.common.selectOnChange();
										$("#id").val(selectedOfferIds);
										// $("#offerTab").val();
										self.common.openDatePicker();
										// self.fnResubmit(selectedOffers,'rfq');
										self.common.cancelBtn();
										$("#offerTab").val(selectedTab);
										$('.header_inner_style')[0].innerHTML = 'Replicate Unconfirmed Offer';
									});
								}
								else if(count > 1){
									$( "#replicateBtn" ).prop( "disabled", true );
									$( "#replicateBtn" ).find("p").prop( "disabled", true );
								}
							});
							
							/*DELETE or REMOVE */
							self.menuIcons.find('.delete_enabled_button, .remove_enabled_button').on("click", function(e) {
								var isRemove = true;
								var count = self.checkboxCount();
								var offerId = JSON.parse($("#selected_offer_id").val()),
								selectedOffersForRemoval = JSON.parse($('#selected_offers').val());
								if(!self.common.checkIfOfferIdExists(selectedOffers) && count >=1 ){
									self.common.getLockStatus(selectedOffersForRemoval, offerId, function (response) {
	                            		if ( !response ) {
	                            			this.loadDealerDeleteOrRemovePage(isRemove, selectedTab);
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
							});
						});

					break;
					
					case 'rfq':
						$(".container").load(BASE_URL+'/getRFQTab',  function(){
							//$('.innerMenu').on('click', function(){
								self.common.destroyCountdown();
								self.common=new common(self.rootParent);
								self.common.hideLoader();
								self.dealerTable.supplierRFQ();
								self.common.dataTableSearch(2);
								self.common.advanceSearchSubmit("DEALER_RFQ");
								$("#offerIdLabel").html("RFQ/DRFQ ID");
								self.drfqBtn = $(self.rootParent).find('.DRfq_enabled_button');
								self.menuIcons = $(self.rootParent).find('.menu-icons');
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
/*								self.drfqBtn.on("click", function() {
									self.common.destroyCountdown(); 
									var count = self.checkboxCount();
									var offerId = null;
									if($("#selected_offer_id").val().trim().length !=0){
										 offerId = JSON.parse($("#selected_offer_id").val());
									}
									selectedoffers = $("#selected_offers").val().trim().length !=0 ? JSON.parse($("#selected_offers").val()) : null; 
									if(count==1 ){
										$(".container").load(BASE_URL+'/getFillRFQorDRFQPage?offerId='+offerId[0],function(){
											this.expiryField = $("#customerEditExpiry");
											selectedOfferIds = JSON.parse($("#selected_offer_id").val());
											selectedOffers = JSON.parse($("#selected_offers").val());
											self.common.checkIfCustomTz( this.expiryField,selectedOffers );
											self.common.validateSupplierDRFQForm();
			                                $("#drfq_id").val(JSON.stringify(selectedOfferIds));
											$("#post_offer_type").val('rfq');
											self.common.cancelBtn();
										});
							    	}
							 	});
							
								var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
									selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
									self.common.clearSelectedOffers(selectedOffers,selectedOfferIds);
								//var selectedInnerTab = this.id;
								//if(selectedInnerTab == "supplierRFQ"){
									//$("#supplierRFQ").addClass("innerMenu-selected");
									//$("#customerRFQ").removeClass("innerMenu-selected");
									$(".container").load(BASE_URL+'/getSupplierRFQTab',  function(){
										self.common=new common(self.rootParent);
										self.common.hideLoader();
										self.dealerTable.supplierRFQ();
										self.common.dataTableSearch(2);
										self.common.advanceSearchSubmit("DEALER_RFQ");
										$("#offerIdLabel").html("RFQ/DRFQ ID");
										self.drfqBtn = $(self.rootParent).find('.DRfq_enabled_button');
										self.drfqBtn.on("click", function() {
											self.common.destroyCountdown(); 
											var count = self.checkboxCount();
											var offerId = null;
											if($("#selected_offer_id").val().trim().length !=0){
												 offerId = JSON.parse($("#selected_offer_id").val());
											}
											selectedoffers = $("#selected_offers").val().trim().length !=0 ? JSON.parse($("#selected_offers").val()) : null; 
											if(count==1 ){
												$(".container").load(BASE_URL+'/getFillRFQorDRFQPage?offerId='+offerId[0],function(){
													this.expiryField = $("#customerEditExpiry");
													selectedOfferIds = JSON.parse($("#selected_offer_id").val());
													selectedOffers = JSON.parse($("#selected_offers").val());
													self.common.checkIfCustomTz( this.expiryField,selectedOffers );
													self.common.validateSupplierDRFQForm();
					                                $("#drfq_id").val(JSON.stringify(selectedOfferIds));
													$("#post_offer_type").val('rfq');
													self.common.cancelBtn();
												});
									    	}
									 	});
									});
							//	}else{
									
									$("#customerRFQ").addClass("innerMenu-selected");
									$("#supplierRFQ").removeClass("innerMenu-selected");
									$(".inner-container").load(BASE_URL+'/getCustomerRFQTab',  function(){
										self.common=new common(self.rootParent);
										self.common.hideLoader();
										self.dealerTable.customerRFQ();
										self.common.dataTableSearch(2);
										self.menuIcons = $(self.rootParent).find('.menu-icons');
										self.common.advanceSearchSubmit("DEALER_RFQ");
										$("#offerIdLabel").html("RFQ/DRFQ ID");
										self.menuIcons.find('#addNewBtn').on("click", function() {
											self.common.destroyCountdown();
											$(".inner-container").load(BASE_URL+'/getAddRFQPage',function(){
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
													$(".inner-container").load(BASE_URL+'/getEditDRFQPage?offerId='+offerId[0],function(){
														self.common.validateDRFQForm();
														this.expiryField = $("#dealerEditExpiryVal");
														selectedOfferIds = JSON.parse($("#selected_offer_id").val());
														selectedOffers = JSON.parse($("#selected_offers").val());
														self.common.checkIfCustomTz( this.expiryField,selectedOffers );
														self.common.openDatePicker();
														$("#drfq_id").val(JSON.stringify(selectedOfferIds));
														$("#post_offer_type").val('rfq');
														self.common.cancelBtn();
													});
												}
												else {
													var offerId = JSON.parse($("#selected_offer_id").val());
													$(".inner-container").load(BASE_URL+'/getEditRFQPage?offerId='+offerId[0],function(){
														this.expiryField = $("#dealerEditExpiryVal");
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
										//Replicate 
										self.menuIcons.find('.replicate_enabled_button').on("click", function() {
											self.common.destroyCountdown();
											var count = self.checkboxCount();
											if(count == 1){
												var offerId = JSON.parse($("#selected_offer_id").val());
												postOfferType = $(".active.tab").attr('id');
												$(".inner-container").load(BASE_URL+'/getReplicateRFQPage?offerId='+offerId[0]+'&postOfferType='+postOfferType,function(){
													this.expiryField = $("#dealerEditExpiryVal");
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
										*/
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
									 	
										 //DELETE
										self.menuIcons.find('.delete_enabled_button').on("click", function() {
											self.common.destroyCountdown();
											var count = self.checkboxCount();
											if(!self.common.checkIfOfferIdExists(selectedOffers) && count >=1 ){
												$(".container").load(BASE_URL+'/getDeleteRFQPage',function(){
													self.common.populatePopupData();
													selectedOfferIds = JSON.parse($("#selected_offer_id").val());
													$("#delete_offer_id").val(JSON.stringify(selectedOfferIds));
													self.deleteOffersAndRFQ(selectedOfferIds,selectedTab,false,"/deleteRFQs");
													self.common.cancelBtn();
													$("#offerTab").val(selectedTab);
												});
											}
										});
										
									
								
									//}
							//});
							//self.loadInnerTab();
						});
					break;
					
					case 'DO':
						$(".container").load(BASE_URL+'/getDOsTab',  function(){
							self.dealerTable.DO();
							self.common=new common(self.rootParent);
							self.common.hideLoader();
							self.common.dataTableSelectFilter(12);
							self.menuIcons = $(self.rootParent).find('.menu-icons');
							self.common.advanceSearchSubmit("DEALER_DO");
							document.getElementsByName('offerId')[0].innerHTML = "DO ID";//for now
							$('.reject-btn_enabled_button').on("click", function() {
								self.common.destroyCountdown();
								var count = self.checkboxCount();
								if(!self.common.checkIfOfferIdExists(selectedOffers) && count >=1 ){
									$(".container").load(BASE_URL+'/deleteOrRejectOffers',function(){
										self.common.populatePopupData();
										selectedOfferIds = JSON.parse($("#selected_offer_id").val());
										$("#reject_offer_id").val(JSON.stringify(selectedOfferIds));
										$("#reject-header").html("Reject Direct Offers");
										$("#reject_form_reject_button").val("REJECT");
										self.rejectDoOffersBtn(selectedOfferIds,selectedTab,false);
										self.common.cancelBtn();
										$("#offerTab").val(selectedTab);
									});
								}
							});
						});
					break;
					
					case 'RO':
						$(".container").load(BASE_URL+'/getRejectedDOsTab',  function(){
							self.dealerTable.RO();
							self.common=new common(self.rootParent);
							self.common.hideLoader();
							self.common.dataTableSelectFilter(12);
							self.menuIcons = $(self.rootParent).find('.menu-icons');
							self.common.advanceSearchSubmit("DEALER_DO");
							//document.getElementsByName('offerId')[0].innerHTML = "RO ID";//for now
							$('.repost-btn_enabled_button').on("click", function() {
								self.common.destroyCountdown();
								var count = self.checkboxCount();
								if(!self.common.checkIfOfferIdExists(selectedOffers) && count >=1 ){
									$(".container").load(BASE_URL+'/getRepost',function(){
										self.common.populatePopupData();
										selectedOfferIds = JSON.parse($("#selected_offer_id").val());
										$("#reject_offer_id").val(JSON.stringify(selectedOfferIds));
										self.repostDoOffersBtn(selectedOfferIds,selectedTab);
										self.common.cancelBtn();
										$("#offerTab").val(selectedTab);
									});
								}
							});
							$('.delete_enabled_button').on("click", function() {
								self.common.destroyCountdown();
								var count = self.checkboxCount();
								if(!self.common.checkIfOfferIdExists(selectedOffers) && count >=1 ){
									$(".container").load(BASE_URL+'/deleteOrRejectOffers',function(){
										self.common.populatePopupData();
										selectedOfferIds = JSON.parse($("#selected_offer_id").val());
										$("#reject_offer_id").val(JSON.stringify(selectedOfferIds));
										self.rejectDoOffersBtn(selectedOfferIds,selectedTab,true);
										$("#reject-header").html("Delete Direct Offers");
										$("#reject_form_reject_button").val("DELETE");
										self.common.cancelBtn();
										$("#offerTab").val(selectedTab);
									});
								}
							});
						});
					break;
					
					case 'trade':
						$(".container").load(BASE_URL+'/getTradesTab',  function(){
							$("#offerTab").val(selectedTab);
							self.dealerTable.trades();
							self.common=new common(self.rootParent);
							self.common.hideLoader();
							self.common.dataTableSelectFilter(12);
							self.menuIcons = $(self.rootParent).find('.menu-icons');
							self.common.advanceSearchSubmit("DEALER_TRADE");
							self.common.tradeTableSearch("DEALER_TRADE");
							self.common.openDateTimePicker();
							self.checkListBtn = $(self.rootParent).find('.chcklist-btn_enabled_button');
							self.viewBtn = $(self.rootParent).find('.view-btn_enabled_button');
							self.common.getAdvSearchTradeFields("DEALER");
							self.checkListBtn.on("click",self.dealerTrade.dealerCheckListFunction);
							self.viewBtn.on("click",function(){self.common.viewDealerDetailsFunction('DEALER')});
							$('.select_all_check').attr('disabled',true);
							self.uploadBtn = $(self.rootParent).find('.upload-Btn_enabled_button');
							self.uploadBtn.on("click",self.checkDealerUpload);
							self.exportTradesToExcel("Trades_Report_Dealer","listTrades",self.common.tradesTitleDealer);
						    self.common.tradeDocUploadChange();
						});
					break;
					
					case 'queries':
						$(".container").load(BASE_URL+'/getQueriesTab',  function(){
								self.common.hideLoader();
								self.userSubmitBtn = $('#user_submit_btn');
								$( document ).unbind('keypress');
								$( document ).bind('keypress',function(e) {
									if (e.keyCode == 13) {
										self.switchUserSubmit();
									  }
								});
		
							self.userSubmitBtn.on('click',function(){
						        self.switchUserSubmit();
							});
						});
					break;
					
					case 'premiums':
						$(".container").load(BASE_URL+'/getpremiumTab',  function(){
							self.common.hideLoader();
							$('.innerMenu').on('click', function(){
								self.dealerPremium.dealerPremiumFunctions(this);
							});
							self.loadInnerGroupTab();
						});
					break;
					case 'dashboard':
                    self.goDashBoard(null,null);
					break;
					
					default:
						self.dealerTable.confirmedOffers();
				}
			}
    }
	}
    
    
    this.goDashBoard = function(selectedTab,chartElement){
		$(".container").load(BASE_URL+'/getDashboard',  function(){
			$("#offerTab").val('dashboard');
			self.common=new common(self);
			self.common.getNotification();
			self.common.hideLoader();
			self.dashBoardInnerActionPage(selectedTab,chartElement);
		});
    }
    //new
	this.dashBoardInnerActionPage = function(selectedTab,chartElement){
/*		self.secondaryNavTab = $('.secondary-nav li');
		self.secondaryNavTab.on('click',function(){
			var activeTab = this.id;
			$("#dashBard_inner_tab").val(activeTab);
			self.activeNavTab = $('.secondary-nav').find('.active');
			self.activeNavTab.removeClass('active');
			$(this).addClass('active');
			switch (activeTab){
				case 'SD':
					self.common.hideLoader();
					self.common.loadCharts("getSetDateCount");
					break;
				case 'TT':
					self.common.loadCharts("getTrackTaskCount");
					break;
				default:
					self.common.hideLoader();
				    self.common.loadCharts("getSetDateCount");
				    break;
			}
		});*/
		$("#dashBard_inner_tab").val('TT');
		if(selectedTab !== null){
			 switch(chartElement){
			 case 'canvas2':
				 self.common.loadMediumCriticalData();
				 break;
			 case 'canvas3':
				 self.common.loadNonCriticalData();
				 break;
			 default:
				 self.common.loadCriticalData();
				 break;
			 }
		}else{
			 //$('.secondary-nav #TT').trigger('click');
			self.common.loadCharts("getTrackTaskCount");
		}
	}
    
	
	this.getChartData = function(dataCountUrl){
		$.ajax({
	 		url : BASE_URL+'/'+dataCountUrl,
	 		type: 'GET',
	 		success : function(response) {
	 			console.log(response);
	 			self.common.displayChart(response);
				
	 		}, error: function (response) {
	 			console.log(response);
	 	    }
	 	});
	}
	
	this.dealerChecklistAction=function(){
		$(".date_valuation_link").on('click',function(){
			self.dealerTrade.dealerCheckListFunction($(this).attr('data-id'));
		});
		$(".metal_release_instrctn").on('click',function(){
			self.dealerTrade.dealerCheckListFunction($(this).attr('data-id'),$(this).attr('data-element-id'));
		});
	};
	
	this.loadPendingActionsTable =  function(){
		self.dealerTable.documentApproval($("#criticality").val());
	}
	
	 this.tradeDocUploadChange = function(){
		 
	 }
    this.switchUserSubmit = function(){
    	if($("#account_ddl").val().length>0){
			self.loadQueriesPage();
        }
    	else{
    		$('#account_ddl').attr('title', 'Required');
				$("#account_ddl").tooltip('show');
    	}
    }
    
    this.checkDealerUpload = function(){
    	self.common.swLoader();
    	var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : null;
		$.ajax({
	 		url : BASE_URL+'/checkIfDealerTrade?tradeId='+selectedOfferIds[0],
	 		type: 'GET',
	 		success : function(response) {
	 			console.log(response);
				if (!response) {
					self.common.uploadDialog();
				}else{
				  self.dealerUploadError("This offer belongs to another user")
				}
	 		}, error: function (response) {
	 			self.dealerUploadError(response)
	 	    }
	 	});
	}
    
    this.dealerUploadError = function(text){
			swal({
                title: "Failed!",
                text: text,
                type: "error",
                confirmButtonColor: "#1ab394",
                allowOutsideClick:false,
                closeOnConfirm: true}
			);
    }
	this.fnResubmit = function(selectedOffers,currentTab){
		if(self.common.checkIfOfferIdExists(selectedOffers)){
			$("#add_new_offer li").each(function(){
				if(currentTab=='unConfirmedOffers'){
					$(this).find('select').each(function(){
						if($(this).attr('name')!="expiry" && $(this).attr('type')!="hidden"){
							if($(this).attr('name')!="timezone"){
								$(this).attr('disabled',true);
							}
						}
						
					});
				}
				else{
					$(this).find('select, input').each(function(){
						if($(this).attr('name')!="expiry" && $(this).attr('type')!="hidden")	{
							if($(this).attr('name')!="timezone"){
								$(this).attr('disabled',true);
							}
						}
					});
				}
			});
			}else{
				$("#add_new_offer li").each(function(){
					$(this).find('select, input').each(function(){
						$(this).removeAttr('disabled');
					});
				});
			}
	}
	
	function clearSelectedOffers(selectedOffers,selectedOfferIds){
		$("#selected_offers").val("");
	    $("#selected_offer_id").val("");
		selectedOffers = [];
		selectedOfferIds = [];
//		$('.offer_wrapper')[0].innerHTML = "";
		$("input[name=offer-id]").each( function () {
		       $(this).prop('checked',false);
		   });
		$('#deleteBtn').removeClass('delete_disabled_button');
    	$('#post_button').removeClass('post_disabled_button');
    	$('#edit_button').removeClass('edit_disabled_button');
    	$('#listConfirmedOffers .select_all_check, #unlistConfirmedOffers .select_all_check').removeAttr('checked');
		return [selectedOffers,selectedOfferIds];
	}
	this.checkboxCount = function(){
		var offerId = JSON.parse($("#selected_offer_id").val());
		var count = offerId.length; 
		return count;
	}
	
	this.deleteOffersAndRFQ = function(selectedOfferIds,currentTab,isRemove,url){
		$('#delete_form_delete_button').click(function(){
			    var deleteObj = self.getDeleteObj(selectedOfferIds,currentTab);
				self.common.customAlert(deleteObj,currentTab,"DEALER",url);
	    });
	}
	this.getDeleteObj = function(selectedOfferIds,currentTab){
		var deleteObj = {},
		commentObj = {};
		for(var key in selectedOfferIds){
			var className = parseInt(key)+1;
			removeComment = $("textarea[name='comments_"+className+"']").val();
			commentObj[selectedOfferIds[key]] = removeComment;
		}
		deleteObj.offerIds = selectedOfferIds;
		deleteObj.offerType = currentTab;
		deleteObj.removeComments = commentObj;
		return deleteObj;
	}
	
	this.rejectDoOffersBtn = function(selectedOfferIds,currentTab,isDelete){
		$('#reject_form_reject_button').click(function(){
			var rejectObj = {};
			rejectObj.offerIds = selectedOfferIds;
			rejectObj.offerType = currentTab;
			self.common.rejectOffersCustomAlert(rejectObj,currentTab,"DEALER",isDelete ? '/doDeleteOffers' : '/rejectDOs',isDelete);
		});	
	}
	this.repostDoOffersBtn = function(selectedOfferIds,currentTab){
		$('#repost_form_reject_button').click(function(){
			$('#repost_form_reject_button').attr('disabled',true);
			var repostObj = {};
			repostObj.offerIds = selectedOfferIds;
			repostObj.offerType = currentTab;
			self.common.repostOffersCustomAlert(repostObj,currentTab,"DEALER");
		});	
	}
	
	this.removeOfferValidate = function(selectedOfferIds,selectedTab,isRemove,url){
		$('#delete_form_delete_button').click(function(){
			if($("#remove_offer_form").valid()){
				var deleteObj = self.getDeleteObj(selectedOfferIds,selectedTab);
				self.common.customAlertRemove(deleteObj,selectedTab,"DEALER",url);
		       }
	         });
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
	        $("#remove_offer_form").validate({
	            rules: {
	            },
	            messages: {
	            	
	            },
	            submitHandler: function(form) {
	               return true;
	            }
	        });
	    	$("[name^=comments]").each(function () {
		        $(this).rules("add", {
		            required: true,
		            lengthCheck: true,
		            messages: {
						required: "Required",
						lengthCheck: "Maximum of 200 character",
					}
		        });
		    });
		}

	this.loadEditConfirmedOfferForm = function(offerId){
		self.common.destroyCountdown();
		var selectedTab = "confirmedOffers"
		$(".container").load(BASE_URL+'/getDealerOfferEditForm?offerId='+offerId[0],function(){
			this.expiryField = $("#dealerEditExpiry");
			selectedOfferIds = JSON.parse($("#selected_offer_id").val());
			selectedOffers = JSON.parse($("#selected_offers").val());
			self.common.checkIfCustomTz( this.expiryField,selectedOffers );
			self.common.validateForm();
			self.common.selectOnChange();
			if(selectedOffers[0].offerId !== null){
				self.common.initiateTradeExpiryCountDown("300000");
			}
			$("#id").val(selectedOfferIds);
			$("#heading").html('Edit Confirmed Offer');
			$("#offerTab").val(selectedTab);
			self.common.openDatePicker();
			self.fnResubmit(selectedOffers,'selectedTab');
			self.common.cancelAndReleaseLock();
			$("#offerTab").val(selectedTab);
			$('.header_inner_style')[0].innerHTML = 'Edit Confirmed Offer';
		});
	}
	this.loadEditUnConfirmedOfferForm = function(offerId){
		self.common.destroyCountdown();
		var selectedTab = "unConfirmedOffers"
		$(".container").load(BASE_URL+'/getDealerPreOfferEditForm?offerId='+offerId[0]+'&postOfferType='+postOfferType,function(){
			this.expiryField = $("#dealerEditExpiry");
			selectedOfferIds = JSON.parse($("#selected_offer_id").val());
			selectedOffers = JSON.parse($("#selected_offers").val());
			self.common.checkIfCustomTz( this.expiryField,selectedOffers );
			self.common.validateForm();
			self.common.selectOnChange();
			if(selectedOffers[0].offerId !== null){
				self.common.initiateTradeExpiryCountDown("300000");
			}
			$("#id").val(selectedOfferIds);
			$("#heading").html('Edit Unconfirmed Offer');
			// $("#offerTab").val();
			self.common.openDatePicker();
			self.fnResubmit(selectedOffers,'unConfirmedOffers');
			self.common.cancelAndReleaseLock();
			$("#offerTab").val(selectedTab);
			$('.header_inner_style')[0].innerHTML = 'Edit Unconfirmed Offer';
		});
	}
	
	this.loadInnerTab = function(){
		switch(self.currentInnerTab){
		  case "customerRFQ":
			  $('#customerRFQ').trigger('click');
			  break;
		  case "supplierRFQ":
			  $('#supplierRFQ').trigger('click');
			  break;
		  default:
			  $('#customerRFQ').trigger('click');
		      break;
		}
	}
	
	this.loadInnerGroupTab = function(){
		switch(self.common.getCurrentInnerTab()){
		  case "groups":
			  $('#groups').trigger('click');
			  break;
		  case "cpm":
			  $('#cpm').trigger('click');
			  break;
		  default:
			  $('#groups').trigger('click');
		      break;
		}
	}
	
	this.selectAllCheckBox = function () {
		$('.container').on('click', '.select_all_check', function () {
	        var selectedTabId,
	        selectedTabName = $(".tab.active").attr("id");
			//$("#selected_offers").val([]);
		    //$("#selected_offer_id").val([]);
		    self.common.checkEligibleRows(this,selectedTabName,'D');
	        self.menuValidation();
	    });
	}
	
	this.menuValidation = function(){
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
		selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		var selectedTabName = $(".tab.active").attr("id");
		switch(selectedTabName){
			case 'DO':
				if(selectedOffers.length > 0){
					self.DOValidation(false,true,false);
				}else{
					self.common.disableAllButtons();
				}
			    break;
			case 'RO':
				if(selectedOffers.length > 0){
					self.DOValidation(true,false,true);
				}else{
					self.common.disableAllButtons();
				}
		        break;
			case 'premiums':
				if(self.common.getCurrentInnerTab()=="groups"){
					if(selectedOffers.length > 0){
						if(selectedOffers.length == 1){
							self.groupsValidation(true,true,true);
						}else{
							self.groupsValidation(false,true,true);
						}
					}else{
						self.common.disableAllButtons();
					}
				}else{
				if(selectedOffers.length > 0){
					self.dealerPremium.fnCPMSelectAll(selectedOfferIds);
				}
				}
		        break;
			default:
				if(selectedOffers.length == 1){
					self.common.setButtonBehaviour(true,true,true,true,false);
				}else if(selectedOffers.length > 1){
					self.common.setButtonBehaviour(false,false,true,true,false);
				}else{
					self.common.disableAllButtons();
				}
		        break;
		}
	}
	
	this.singleSelectCheck = function(e){
		self.common.getSetSingleRowData(this);
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
		selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		if(selectedOffers && selectedOffers.length>0){
			var selectedTabName = $(".tab.active").attr("id");
			if((selectedTabName!='trade')&&(selectedTabName!='premiums')){
				var deciderArray = self.offerCreatedCheck(selectedOffers);
			}
			switch(selectedTabName){
			case 'confirmedOffers':
				self.offerValidation(deciderArray,selectedOffers);
		        break;
			case 'unConfirmedOffers':
				self.offerValidation(deciderArray,selectedOffers);
		        break;
			case 'rfq':
				self.dealerRfqSelection(selectedOffers);
		        break;
			case 'DO':
			    self.DOValidation(false,true,false);
			    break;
			case 'RO':
		        self.DOValidation(true,false,true);
		        break;
			case 'trade':
		        self.tradeValidation(selectedOffers);
		        break;
			case 'premiums':
				if(self.common.getCurrentInnerTab()=="groups"){
					if(selectedOffers.length > 0){
						if(selectedOffers.length == 1){
							self.groupsValidation(true,true,true);
						}else{
							self.groupsValidation(false,true,true);
						}
					}else{
						self.common.disableAllButtons();
					}
				}else{
					self.buttonManipulation();
				}
		        break;
			default:
			    self.offerValidation(deciderArray);
		        break;
			}
		}else{
			self.common.disableAllButtons();
		}
	};
	
	this.buttonManipulation = function(){
		var premiumsArray =($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		if(self.selectionContainsExpired()){
			self.common.changeBtnClass('delete','disabled','deleteBtn');
    		self.common.changeBtnClass('edit','disabled','edit_button');
    		self.common.changeBtnClass('customize-btn','disabled','customize-btn');
//    		self.common.changeBtnClass('export-btn','disabled','export-btn');
    		self.common.changeBtnClass('view-btn','disabled','view-btn');
		}else{
			if(premiumsArray.length==1){
	    		if(!self.checkCustomCpmExistsInSelection()){
	    			self.common.changeBtnClass('edit','enabled','edit_button');
	    			self.common.changeBtnClass('customize-btn','enabled','customize-btn');
	    		}else{
	    			self.common.changeBtnClass('view-btn','enabled','view-btn');
	    		}
				self.common.changeBtnClass('delete','enabled','deleteBtn');
				self.common.changeBtnClass('export-btn','enabled','export-btn');
	    	}else if(premiumsArray.length > 0){
	    		self.common.changeBtnClass('delete','enabled','deleteBtn');
	    		self.common.changeBtnClass('edit','disabled','edit_button');
	    		self.common.changeBtnClass('customize-btn','disabled','customize-btn');
	    		self.common.changeBtnClass('export-btn','enabled','export-btn');
	    		self.common.changeBtnClass('view-btn','disabled','view-btn');
	    	}
		}
	}
	
	this.selectionContainsExpired = function(){
		var cpmSelected = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [];
		if(cpmSelected && cpmSelected.length>0){
			for(var key in cpmSelected){
				if(cpmSelected[key].deleted!=0){
					return true;
				}
			}
			return false;
		}
		return false;	
	}
	
	this.checkCustomCpmExistsInSelection = function(){
		var cpmSelected = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [];
    	if(cpmSelected){
    		if(cpmSelected[0].premiumGroup.custom==2){
    			return true;
    		}
    	}
    	return false;
    }
	
	this.dealerRfqSelection = function(selectedOffers){
		var isPostable = self.common.isAllOffersPostable(selectedOffers),
		isDRFQ = self.common.checkIfDRFQExists(selectedOffers); 
		if(selectedOffers.length==1){
			self.common.setButtonBehaviour(true,!isDRFQ,isPostable,isPostable,false);
		}else if(selectedOffers.length>1){
			self.common.setButtonBehaviour(false,false,isPostable,isPostable,false);
		}else{
			self.common.disableAllButtons();
		}
	}
	
	this.offerValidation = function(deciderArray,selectedOffers){
		if (deciderArray[2]) {
            self.common.disableAllButtons();
        }else{
        	if(selectedOffers.length==1){
				if (deciderArray[0]) {
		        	self.common.setButtonBehaviour(true,true,false,false,true);
		        } else if (deciderArray[1]) {
		        	self.common.setButtonBehaviour(true,true,true,self.common.isAllOffersPostable(selectedOffers),false);
		        } 
			}else if(selectedOffers.length > 1){
				if (deciderArray[0]) {
		        	self.common.setButtonBehaviour(false,false,false,false,true);
		        } else if (deciderArray[1]) {
		        	self.common.setButtonBehaviour(false,false,true,true,false);
		        } 
			}
        }
	};
	this.DOValidation = function(rePostBtn,rejectBtn,deleteBtn){
		if(rePostBtn){
			self.common.changeBtnClass('repost-btn','enabled','repost-btn');
		}else{
			self.common.changeBtnClass('repost-btn','disabled','repost-btn');
		}
		if(rejectBtn){
			self.common.changeBtnClass('reject-btn','enabled','reject-btn');
		}else{
			self.common.changeBtnClass('reject-btn','disabled','reject-btn');
		}
		if(deleteBtn){
			self.common.changeBtnClass('delete','enabled','deleteBtn');
		}else{
			self.common.changeBtnClass('delete','disabled','deleteBtn');
		}
	}
	
	this.groupsValidation = function(editBtn,deleteBtn,exportBtn){
		var status=self.dealerPremium.groupEditDeleteEnableDisable();
		if(status){
			if(editBtn){
				self.common.changeBtnClass('edit','enabled','edit_button');
			}else{
				self.common.changeBtnClass('edit','disabled','edit_button');
			}
			if(deleteBtn){
				self.common.changeBtnClass('delete','enabled','deleteBtn');
			}else{
				self.common.changeBtnClass('delete','disabled','deleteBtn');
			}
			
		}else{
			self.common.changeBtnClass('delete','disabled','deleteBtn');
			self.common.changeBtnClass('edit','disabled','edit_button');
			
		}
		if(exportBtn){
			self.common.changeBtnClass('export-btn','enabled','export-btn');
		}else{
			self.common.changeBtnClass('export-btn','disabled','export-btn');
		}
	}
	
	this.tradeValidation = function(selectedOffers){
		if(selectedOffers.length > 1){
			self.common.changeBtnClass('chcklist-btn','disabled','chcklist-btn');
			self.common.changeBtnClass('view-btn','disabled','view-btn');
			self.common.changeBtnClass('export-btn','enabled','export-btn');
			self.common.changeBtnClass('upload-Btn','disabled','upload-Btn');
		}else if(selectedOffers.length==0){
			self.common.changeBtnClass('chcklist-btn','disabled','chcklist-btn');
			self.common.changeBtnClass('view-btn','disabled','view-btn');
			self.common.changeBtnClass('export-btn','disabled','export-btn');
			self.common.changeBtnClass('upload-Btn','disabled','upload-Btn');
		}else{
			self.common.changeBtnClass('chcklist-btn','enabled','chcklist-btn');
			self.common.changeBtnClass('view-btn','enabled','view-btn');
			self.common.changeBtnClass('export-btn','enabled','export-btn');
			self.common.changeBtnClass('upload-Btn','enabled','upload-Btn');
		}
	}

	this.offerCreatedCheck = function(offerDatas){
		var allBySupplier = false,
		allByDealer = false,
		array = [],
		fromOtherInstance = false;
		for(var key in offerDatas){
			if(offerDatas[key].instance.id!=offerDatas[key].offerMaster.instance.id){
				fromOtherInstance = true;
				break;
			}
			if(offerDatas[key].offerMaster.createdBy.userType=='S'){
				allBySupplier=true;
				allByDealer=false;
			}else if(offerDatas[key].offerMaster.createdBy.userType=='D'){
				allByDealer=true;
				allBySupplier=false;
			}
		}
		array.push(allBySupplier);
		array.push(allByDealer);
		array.push(fromOtherInstance);
		return array;
	}
	
	this.loadDealerDeleteOrRemovePage = function(isRemove, selectedTab){
		self.common.destroyCountdown();
		var offerMasterDTO = self.common.getSelectedOfferMasterIdAndType();
		$(".container").load(BASE_URL+'/getDealerDeletePage?isRemove='+isRemove
				+'&offerMasterIds='+offerMasterDTO.offerMasterIdListString
				+'&offerTypeId='+offerMasterDTO.offerType,
				function(){
			selectedOfferIds = JSON.parse($("#selected_offer_id").val());
			selectedOffers = JSON.parse($("#selected_offers").val());
			if(isRemove == true){
				$("#delete_offer_id").val(JSON.stringify(selectedOfferIds));
				$("#delete_offer_type").val('unConfirmedOffers');
			self.removeOfferValidate(selectedOfferIds,selectedTab,isRemove,'/removeOffers');
			}else{
				self.deleteOffersAndRFQ(selectedOfferIds,selectedTab,isRemove,'/doDeleteOffers');
			}
			if(selectedOffers[0].offerId !== null){
				self.common.initiateTradeExpiryCountDown("300000");
			}
			self.common.populatePopupData();
			self.removeOfferValidate(selectedOfferIds,selectedTab,isRemove,'/removeOffers');
			self.common.cancelAndReleaseLock();
			$("#offerTab").val(selectedTab);
		});
	}
	this.loadQueriesPage = function(){
		var accId = $('#account_ddl').val();
		self.primaryNav = $('.primary-nav');
		self.primaryNav.find('li:not(".active_li")').addClass('disabled_buttons');
		self.primaryNav.find('.active_li').css('pointer-events','none');
		$(".container").load(BASE_URL+'/getQueriesResults?aId='+accId,  function(){
			var errorMsgLength = $('.validation_fail_msg')[0].innerHTML.length;
			if(( errorMsgLength !== undefined)&&(errorMsgLength > 0)){
				self.primaryNav.find('li:not(".active_li")').removeClass('disabled_buttons');
				self.primaryNav.find('.active_li a').css('pointer-events','all');
				$('.validation_fail_msg').html("Invalid Credentials");
				self.userSubmitBtn = $('#user_submit_btn');
				self.userSubmitBtn.on('click',function(){
					self.switchUserSubmit();
				});
				$( document ).unbind('keypress');
				$( document ).bind('keypress',function(e) {
					if (e.keyCode == 13) {
						self.switchUserSubmit();
					  }
				});
			}
			else{
				$("#showAccId").html(accId.toUpperCase());
				self.switchUserBtn = $('.switch_user_btn');
				self.signOutBtn = $('.sign_out_btn');
				self.signOutBtn.on('click',function(){
					self.enablePrimaryNav();
				});
				self.dealerQueriesTable=new dealerQueriesTable(self);
				self.secondaryNavTab = $('.secondary-nav .tab');
				self.common=new common(self.rootParent);
				self.secondaryNavTab.on('click',function(){
					var activeTab = this.id;
					if(self.common.advSearchWrap.hasClass('show_advance_search')){
						self.common.resetAdvanceSearchFields();
					};
					self.clearAdvSearchTradeFields();
					self.clearRFQField();
					self.activeNavTab = $('.secondary-nav').find('.active');
					self.activeNavTab.removeClass('active');
					$(this).parent().addClass('active');
					switch (activeTab){
						case 'confirmedOffers':
							self.activeTable(activeTab);
							self.dealerQueriesTable.confirmedOffers(accId);
							self.common.hideLoader();
							self.common.fnResetAllFilters(oTable);
							self.clearResetSearchBtn();
							if($('#userRole').val() == "C"){
								self.common.advanceSearchSubmit("CUSTOMER");
							}else{
								self.common.advanceSearchSubmit("SUPPLIER");
							}
							break;
						case 'unConfirmedOffers':
							self.activeTable(activeTab);
							self.dealerQueriesTable.unConfirmedOffers(accId);
							self.common.hideLoader();
							self.common.fnResetAllFilters(oTable);
							self.clearResetSearchBtn();
							if($('#userRole').val() == "C"){
								self.common.advanceSearchSubmit("CUSTOMER");
							}else{
								self.common.advanceSearchSubmit("SUPPLIER");
							}
							break;
						case 'rfq':
							self.activeTable(activeTab);
							self.dealerQueriesTable.rfq(accId);
							self.common.hideLoader();
							self.common.fnResetAllFilters(oTable);
							self.clearResetSearchBtn();
							if($('#userRole').val() == "C"){
								self.common.advanceSearchSubmit("CUSTOMER_RFQ");
							}else{
								self.common.advanceSearchSubmit("SUPPLIER_RFQ");
							}
							self.common.getRFQFields();
							break;
						case 'DO':
							self.activeTable(activeTab);
							self.dealerQueriesTable.DO(accId);
							self.common.hideLoader();
							self.common.fnResetAllFilters(oTable);
							self.clearResetSearchBtn();
							if($('#userRole').val() == "C"){
								self.common.advanceSearchSubmit("CUSTOMER");
							}else{
								self.common.advanceSearchSubmit("SUPPLIER_RFQ");
							}
							break;
						case 'trade':
							self.activeTable(activeTab);
							self.dealerQueriesTable.trade(accId);
							self.common.hideLoader();
							self.common.fnResetAllFilters(oTable);
							self.clearResetSearchBtn();
							self.common.advanceSearchSubmit("DEALER_TRADE");
							self.common.getAdvSearchTradeFields();
							break;
						default:
							//self.dealerQueriesTable.confirmedOffers(accId, userRole);
					}
				});
			}
			$('.secondary-nav #confirmedOffers').trigger('click');
		});
	}
	this.activeTable = function(activeTab){
			$(".inner_container").find(".activeTable").removeClass("activeTable");
			$(".inner_container").find('.'+activeTab).addClass("activeTable");
	};
	
	this.clearAdvSearchTradeFields = function(){
		if(!$("input[name='tradeId']").parent().hasClass('display_none')){
			$('.advanced_search_element.trade_field').addClass('display_none');
			$("input[name='offerId']").parent().removeClass('display_none');
			$("input[name='availability'],input[name='expiry']").parent().parent().removeClass('display_none');
		}
	}
	
	this.clearRFQField = function(){
		if(!$("input[name='rfqId']").parent().hasClass('display_none')){
			$('.advanced_search_element.rfq_field').addClass('display_none');
			$("input[name='offerId']").parent().removeClass('display_none');
		}
	}
	this.enablePrimaryNav = function(){
		self.primaryNav.find('li:not(".active_li")').removeClass('disabled_buttons');
		self.primaryNav.find('.active_li a').css('pointer-events','all').trigger('click');
	}
	this.clearResetSearchBtn = function(){
		$(".search_reset_btn").css("display", "none");
	}
	this.exportTradesToExcel = function(sheet,tableId,excelTableHeader){
	    	$('.export-btn_enabled_button').click(function(e){
	    		var selectedOffersArray =JSON.parse($("#selected_offers").val());
	   	       self.common.JSONToXLSConvertor(selectedOffersArray, sheet, true,tableId,excelTableHeader);
	  	});
	}
    /*Auto initialize*/
     this.init();
}