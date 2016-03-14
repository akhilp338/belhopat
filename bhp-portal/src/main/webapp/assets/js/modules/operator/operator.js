function operator(operatorNode){
	var self = this;
	var selectedOfferIds = [];
	var selectedOffers = [];
	var currentInnerTab;
	var checklistEdited = false;
	this.rootParent = operatorNode;
	var BASE_URL=null;
	this.tabs = $('.menu-li');
	this.advSearchSubmit = $(operatorNode).find('#advancedSearchSubmitButton');
	 /* Initialize the module */
    this.init = function() {       
    	self.common=new common(self.rootParent);
	 	self.operatorTable=new operatorTable(self);
	 	BASE_URL = self.common.urlHash.OPERATOR;
		this.bind();
    };
    
    this.bind = function() {
    	self.tabs.on('click', self.loadData);
    	self.common.loadCurrentTab();
    	//$('#dashboard').trigger('click');
    	self.selectAllCheckBox();
    	self.advSearchSubmit.on('click', self.advanceSearchSubmit);
    	self.currentInnerTab = $("#currentInnerTab").val();
    }
    
    this.loadData = function(){
		var selectedTab = $(this).children('a').attr('id');
		self.common.destroyCountdown();
		self.hiddenDashDocUploadBtn();
		clearTimeout(self.common.timeOut);
		if(selectedTab !== ''){
			self.common.resetDashBoardActions();
			self.common.deleteReadNotification();
			//for clearing the global data 
			var clearData = self.common.clearSelectedOffers(selectedOffers,selectedOfferIds);//
			selectedOffers = clearData[0];
			selectedOfferIds = clearData[1];
			switch( selectedTab ) {
				case 'confirmedOffers':
					$(".container").load(BASE_URL+'/getConfirmedOffersTab', function(){
						$("#offerTab").val(selectedTab);
						self.operatorTable.confirmedOffers();
						self.common=new common(self.rootParent);
						self.common.hideLoader();
						self.common.dataTableSearch(2);
						self.common.advanceSearchSubmit("OPERATOR_CNF");
					});
				break;
				case 'unConfirmedOffers':
					$(".container").load(BASE_URL+'/getUnConfirmedOffersTab',  function(){
						$("#offerTab").val(selectedTab);
						self.operatorTable.unConfirmedOffers();
						self.common=new common(self.rootParent);
						self.common.hideLoader();
						self.common.dataTableSearch(2);
						self.common.advanceSearchSubmit("OPERATOR_UNC");
					});
				break;
				case 'DO':
					$(".container").load(BASE_URL+'/getDOsTab',  function(){
						$("#offerTab").val(selectedTab);
						self.operatorTable.DO();
						self.common=new common(self.rootParent);
						self.common.hideLoader();
						self.common.dataTableSearch(2);
						self.common.advanceSearchSubmit("OPERATOR");
					});
					break;
				case 'RO':
					$(".container").load(BASE_URL+'/getRejectedDOsTab',  function(){
						self.operatorTable.RO();
						self.common=new common(self.rootParent);
						self.common.hideLoader();
						self.common.dataTableSelectFilter(12);
						self.menuIcons = $(self.rootParent).find('.menu-icons');
						self.common.advanceSearchSubmit("OPERATOR");
						//document.getElementsByName('offerId')[0].innerHTML = "RO ID";//for now
					});
				break;
				case 'rfq':
					$(".container").load(BASE_URL+'/getRFQTab',  function(){

						self.common=new common(self.rootParent);
						self.operatorTable.supplierRFQ();
						self.common.dataTableSearch(2);
						self.common.advanceSearchSubmit("DEALER_RFQ");
						$("#offerIdLabel").html("RFQ/DRFQ ID");
					
/*						$('.innerMenu').on('click', function(){
							var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
								selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
								self.common.clearSelectedOffers(selectedOffers,selectedOfferIds);
								$(".inner-container").load(BASE_URL+'/getSupplierRFQTab',  function(){
									self.common=new common(self.rootParent);
									self.operatorTable.supplierRFQ();
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
							//var selectedInnerTab = this.id;
							if(selectedInnerTab == "supplierRFQ"){
								$("#supplierRFQ").addClass("innerMenu-selected");
								$("#customerRFQ").removeClass("innerMenu-selected");
								$(".inner-container").load(BASE_URL+'/getSupplierRFQTab',  function(){
									self.common=new common(self.rootParent);
									self.operatorTable.supplierRFQ();
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
							}else{
								$("#customerRFQ").addClass("innerMenu-selected");
								$("#supplierRFQ").removeClass("innerMenu-selected");
								$(".inner-container").load(BASE_URL+'/getCustomerRFQTab',  function(){
									self.common=new common(self.rootParent);
									self.operatorTable.customerRFQ();
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
								});
							}
						});*/
						//self.loadInnerTab();
					});
				break;
				case 'trade':
				$(".container").load(BASE_URL+'/getTradesTab', function(){
	            $("#offerTab").val(selectedTab);
				self.operatorTable.trade();
				//self.operatorTable.documentApproval();
				self.common=new common(self.rootParent);
				self.common.advanceSearchSubmit("DEALER_TRADE");
				self.common.tradeTableSearch("DEALER_TRADE");
				$('.advanced_search_element').removeClass('display_none');
				$("input[name='availability'],input[name='expiry']").parent().parent().addClass('display_none');
				$("#advancedSearchOfferId").parent().hide()
				self.common.openDateTimePicker();
				$('#advancedSearchExpiry,#advancedSearchAvailability').hide();
				self.checkListBtn = $(self.rootParent).find('.chcklist-btn_enabled_button');
				self.checkListBtn.on("click",self.operatorCheckListFunction);
				self.uploadBtn = $(self.rootParent).find('.upload-Btn_enabled_button');
				self.uploadBtn.on("click",self.common.uploadTradeDoc);
				self.common.hiddenDocUploadBtn();
				self.common.getAdvSearchTradeFieldOperator();
				self.viewBtn = $(self.rootParent).find('.view-btn_enabled_button');
				self.viewBtn.on("click",function(){self.common.viewDealerDetailsFunction('OPERATOR')});
				
			});
				break;
				case 'dashboard':
					self.goDashBoard(null,null);
				break;
				
				case 'premiums':
					$(".container").load(BASE_URL+'/getpremiumTab',  function(){
						self.common.hideLoader();
						$('.innerMenu').on('click', function(){
							self.operatorPremiumActions(this);
						});
						self.loadInnerGroupTab();
					});
				break;
				
				default:
					self.operatorTable.trade();
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
    
    this.operatorPremiumActions = function(that){
    	self.common.showLoader();
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
			selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			self.common.clearSelectedOffers(selectedOffers,selectedOfferIds);
		var selectedInnerTab = that.id;
		if(selectedInnerTab == "cpm"){
			$("#cpm").addClass("innerMenu-selected");
			$("#groups").removeClass("innerMenu-selected");
			$(".inner-container").load(BASE_URL+'/getCPMListPage',  function(){
				self.common.hideLoader();
				self.common=new common(self.rootParent);
				self.common.advanceSearchCpmFieldUpdate();
				self.common.advanceSearchSubmit("CPM");
				self.operatorTable.CPM();
				self.common.getfilterData();
				$('#cpmStatus').change();
			});
		  }else{
				$("#cpm").removeClass("innerMenu-selected"); 
				$("#groups").addClass("innerMenu-selected");
				$(".inner-container").load(BASE_URL+'/getGroupsTab',  function(){
					self.common.hideLoader();
					//self.exportToExcel("Groups_Report","listgroups",groupsExcelTitle);
					self.common=new common(self.rootParent);
					self.common.advanceSearchGroupsFieldUpdate();
					self.common.advanceSearchSubmit("GROUPS");
					self.operatorTable.premiumGroup();
				});
			  }
    }
    
    this.hiddenDashDocUploadBtn = function(){
		$('#hiddenDashDocUploadButton').change(function() {
			self.common.generalUplaodAction(this);
		});
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
					})
				})
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
			$("#id").val(selectedOfferIds);
			$("#heading").html('Edit Confirmed Offer');
			$("#offerTab").val(selectedTab);
			self.common.openDatePicker();
			self.fnResubmit(selectedOffers,'selectedTab');
			self.common.cancelBtn();
			$("#offerTab").val(selectedTab);
			$('.header_inner_style')[0].innerHTML = 'Edit Confirmed Offer';
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
	
	this.selectAllCheckBox = function () {
		$('.container').on('click', '.select_all_check', function () {
	        var selectedTabId,
	        selectedTabName = $(".tab.active").attr("id");
			$("#selected_offers").val([]);
		    $("#selected_offer_id").val([]);
		    self.common.checkEligibleRows(this,selectedTabName,'O');
	        self.menuValidation();
	    });
	}
	
	this.menuValidation = function(){
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
		selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		var selectedTabName = $(".tab.active").attr("id");
		switch(selectedTabName){
			case 'trade':
				 self.tradeValidation(selectedOffers);
			    break;
			default:
		        break;
		}
	}
	
	this.singleSelectCheck = function(e){
		self.common.getSetSingleRowData(this);
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
		selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		if(selectedOffers && selectedOffers.length>0){
			var selectedTabName = $(".tab.active").attr("id");
			if(selectedTabName!='trade'){
				var deciderArray = self.offerCreatedCheck(selectedOffers);
			}
			switch(selectedTabName){
			case 'trade':
		        self.tradeValidation(selectedOffers);
		        break;
			default:
		        break;
			}
		}else{
			self.common.disableAllButtons();
		}
	};
	
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
	
	
	this.tradeValidation = function(selectedOffers){
		if(selectedOffers.length > 1 ||selectedOffers.length==0){
			self.common.changeBtnClass('chcklist-btn','disabled','chcklist-btn');
			self.common.changeBtnClass('upload-Btn','disabled','upload-Btn');
			self.common.changeBtnClass('view-btn','disabled','view-btn');
		}else{
			self.common.changeBtnClass('chcklist-btn','enabled','chcklist-btn');
			self.common.changeBtnClass('upload-Btn','enabled','upload-Btn');
			self.common.changeBtnClass('view-btn','enabled','view-btn');
		}
	}
	
	this.preTabActions = function(activeTab){
		$("#dashBard_inner_tab").val(activeTab);
		self.activeNavTab = $('.secondary-nav').find('.active');
		self.activeNavTab.removeClass('active');
		$("#"+activeTab).addClass('active');
	}

    //new
	this.dashBoardInnerActionPage = function(selectedTab,chartElement){
		self.secondaryNavTab = $('.secondary-nav li');
		self.secondaryNavTab.on('click',function(){
			var activeTab = this.id;
			self.preTabActions(activeTab);
			/*$("#dashBard_inner_tab").val(activeTab);
			self.activeNavTab = $('.secondary-nav').find('.active');
			self.activeNavTab.removeClass('active');
			$(this).addClass('active');*/
			switch (activeTab){
				case 'TT':
					self.common.loadCharts("getOperationsTrackTaskCount");
					break;
				case 'DU':
					self.common.loadCharts("getUploadAirBillCount");
					break;
				case 'DA':
					self.common.loadCharts("getDocsToApproveCount");
					break;
				default:
					self.common.hideLoader();
				    break;
			}
		});
		if(selectedTab !== null){
			self.preTabActions(selectedTab);
			self.trigerTabData(selectedTab,chartElement);
		}else{
			 $('.secondary-nav #TT').trigger('click');
		}
	}
	
	this.loadPendingActionsTable =  function(){
		self.operatorTable.documentApproval($("#criticality").val());
	}
	
	this.trigerTabData = function(selectedTab,chartElement){
		switch(chartElement){
		case 'canvas1':
			self.common.loadCriticalData();
			break;
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
	}
	
	this.operatorChecklistAction=function(){
		$(".date_valuation_link").on('click',function(){
			self.operatorCheckListFunction($(this).attr('data-id'));
		});
		$(".metal_release_instrctn").on('click',function(){
			if($(this).attr('data-element-id') == 'trigger_metal_pay_release'){
				self.dashTriggerConfirmation($(this).attr('data-id'),$(this).attr('data-element-id'));
			}else{
				self.operatorCheckListFunction($(this).attr('data-id'),$(this).attr('data-element-id'));
			}
		});
		$(".airway_upload_link").on('click',function(){
			var custom_offer = [];
			custom_offer.push($(this).attr('data-id'))
			$("#selected_offer_id").val(JSON.stringify(custom_offer));
			self.common.airwayBillUpload();
		});
		$(".doc_aprvl_link").on('click',function(){
			self.operatorCheckListFunction($(this).attr('data-id'),"","DOCZ");
		});
	};
	
	
	this.dashTriggerConfirmation = function(tradeId,elementId){
		swal({
            title: "",
            text: "Trigger Metal Payment Release",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            allowOutsideClick:false
        }, function (isConfirm) {
        	if(isConfirm){
        		$("#trigger_metal_pay_release").addClass('checked_list');
        		$("#trigger_metal_pay_release").parent().find('span').removeClass('glyphicon-unchecked check_disabled').addClass('glyphicon-check');
        		self.SubmitApprovalAjax(tradeId,true);
        	}
        });
		
	
	}
	
	this.operatorCheckListFunction = function(offerId,elementId,checkListTab){
		var selectedOfferIds = [];
		if($("#dashBard_current_chart").val().length == 0 ){
			 selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		}else{
			selectedOfferIds.push(offerId);
			var custom_offer = [];
			custom_offer.push(offerId);
			$("#selected_offer_id").val(JSON.stringify(custom_offer));
		}
		$(".container").load(BASE_URL+'/getDealerCheckListForm?tradeId='+selectedOfferIds[0],function(){
			if((elementId !== undefined) && (elementId.length > 0)){
				$("#dash_trade_id").val(offerId);
				self.viewReleaseInstructionPage(offerId,elementId);
			}else{
				if(checkListTab !== undefined){
					self.checkListInnerActionPage(checkListTab);
				}else{
					self.checkListInnerActionPage();
				}
				//self.common.openPhysicalCollectionDate();
				self.disableCheckLists();
				self.enableNextLevelCheckBoxes();
				self.fnCheckListSubmit();
				self.loadCurrentValues();
				//self.updateCheckBoxStatus();
				self.pickDateCheckBox();
			}
		});
	}
	
	this.tradeDocUploadChange = function(){
		
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
	
	self.loadDA = function(){
		$(".inner_container").load(BASE_URL+'/getDocumentApprovalPage',  function(){
			self.operatorTable.documentApproval();
		});
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
	this.loadCurrentValues = function(){
		$(".trackTracks input:checkbox").each(function(){
			if($(this).val()!=0){
			$(this).prop("checked",true);
			}
			})
			if($('#etaCheck').is(':checked')){
				$("#eta_picker").attr("disabled",false);
	    		$('#scdCheck').attr('disabled',false);
			}
			
			if($('#scdCheck').is(':checked')){
				$("#scd_picker").attr("disabled",false);
	    		$('#ccdCheck').attr('disabled',false);
			}
			if($('#ccdCheck').is(':checked')){
				$("#ccd_picker").attr("disabled",false);
				$("#civd_picker").attr("disabled",false);
			}
	}

	this.checkListInnerActionPage = function(checkListTab){
		var offerId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		self.secondaryNavTab = $('.secondary-nav li');
		self.common=new common(self);
		self.secondaryNavTab.on('click',function(){
			self.common.showLoader();
			var activeTab = this.id;
			self.activeNavTab = $('.secondary-nav').find('.active');
			self.activeNavTab.removeClass('active');
			$(this).addClass('active');
			switch (activeTab){
				case 'DT':
					self.common.hideLoader();
					self.loadDT(offerId);
					break;
				case 'OI':
					self.common.hideLoader();
					self.common.getOutGoingInstructions(BASE_URL);
					break;
				case 'DOCZ':
					self.common.hideLoader();
					self.getTradeChecklistDocs();
					break;
				case 'MAIL':
					self.common.hideLoader();
					self.common.getTradeCheckListMails(BASE_URL);
					break;
				default:
					self.common.hideLoader();
					self.loadDT(offerId);
				    break;
			}
		});
		if(checkListTab !== undefined){
			$('.secondary-nav #'+checkListTab).trigger('click');
		}else{
			$('.secondary-nav #DT').trigger('click');
		}
	}
	
	this.getTradeChecklistDocs = function(){
		var tradeId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		$(".inner_container").load(BASE_URL+'/getTradeDocsPage?tradeId='+tradeId,function(){
			self.common.loadDocuments(tradeId);
			self.doczLinkAction(tradeId);
			if($("#dashBard_current_chart").val().length > 0){
				$("#back_menu").html('<button type="button" class="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4  yellow_button" id="close_documents_view">BACK</button>');
			    self.bckToDashAction();
			}
		});
	}
	
	self.doczLinkAction = function(tradeId){
		$('#custom_invoice_link').click(function(){
			window.location.href = BASE_URL+'/getCustomInvoice?tradeId='+tradeId[0];
		});
       $('#air_way_link').click(function(){
    	   window.location.href = BASE_URL+'/getAirway?tradeId='+tradeId[0];
		});
	}
	
	self.bckToDashAction = function(){
		$('#back_menu').click(function() {
			self.goDashBoard($("#dashBard_inner_tab").val(),$("#dashBard_current_chart").val());
		});
	}
	
	this.loadDT=function(offerId){
		$(".inner_container").load(BASE_URL+'/getDatesAndTasksPage?tradeId='+offerId[0],function(){
			self.common.hideLoader();
			self.common.openDateTimePicker();
			self.fnCheckListSubmit()
			self.pickDateCheckBox();
			self.getInstructions();
			self.common.getcompletedTradeTasks(offerId[0],BASE_URL);
		});
	}
	this.pickDateCheckBox = function () {
		$('#datepicker_ul input[type="checkbox"]').click(function() {
		    switch($(this).attr('id')){
			    case 'etaCheck':
			    	$("#eta_picker").val(self.common.getCurrentDateFormat());
			    	if(!$('#etaCheck').is(':checked')){
			    		$("#eta_picker").val("");
			    		$("#eta_picker").attr("disabled",true);
			    		$("#scd_picker").val("");
			    		$("#scd_picker").attr("disabled",true);
			    		$("#ccd_picker").val("");
			    		$("#ccd_picker").attr("disabled",true);
			    		$('#scdCheck').attr('disabled',true);
			    		$('#scdCheck').prop('checked', false);
			    		$('#ccdCheck').attr('disabled',true);
			    		$('#ccdCheck').prop('checked', false);
			    	}else{
			    		$("#eta_picker").attr("disabled",false);
			    		$('#scdCheck').attr('disabled',false);
			    	}
			    	break;
			    case 'scdCheck':
			    	$("#scd_picker").val(self.common.getCurrentDateFormat());
			    	$('#ccdCheck').attr('disabled',!$('#scdCheck').is(':checked'));
			    	if(!$('#scdCheck').is(':checked')){
			    		$("#scd_picker").val("");
			    		$("#scd_picker").attr("disabled",true);
			    		$("#ccd_picker").val("");
			    		$("#ccd_picker").attr("disabled",true);
			    		$('#ccdCheck').attr('disabled',true);
			    		$('#ccdCheck').prop('checked', false);
			    	}else{
			    		$("#scd_picker").attr("disabled",false);
			    		$('#ccdCheck').attr('disabled',false);
			    	}
			    	break;
			    case 'ccdCheck':
			    	$("#ccd_picker").val(self.common.getCurrentDateFormat());
			    	if(!$('#ccdCheck').is(':checked')){
			    		$("#ccd_picker").val("");
			    		$("#ccd_picker").attr("disabled",true);
			    	}else{
			    		$("#ccd_picker").attr("disabled",false);
			    	}
			    	break;
			    case 'civdCheck':
			    	$("#civd_picker").val(self.common.getCurrentDateFormat());
			    	if(!$('#civdCheck').is(':checked')){
			    		$("#civd_picker").val("");
			    		$("#civd_picker").attr("disabled",true);
			    	}else{
			    		$("#civd_picker").attr("disabled",false);
			    	}
			    	break;
		    }
		});
	}

	this.disableCheckLists = function(){
		$( '.operator_only' ).each(function( index ) {
			this.setAttribute('disabled',true);
		});
		$('#inst_metal_release_chkbox').attr('disabled',false);
		$('#rev_release_chkbox').attr('disabled',true);
		$('#rev_collect_chkbox').attr('disabled',true);
		$('#rev_trigger_chkbox').attr('disabled',true);
		$('#scdCheck').attr('disabled',true);
		$('#ccdCheck').attr('disabled',true);
		$("#eta_picker").attr("disabled",true);
		$("#scd_picker").attr("disabled",true);
		$("#ccd_picker").attr("disabled",true);
		$("#civd_picker").attr("disabled",true);
	}
	
	this.enableNextLevelCheckBoxes = function(){
		$('#inst_metal_release_chkbox').change(function(){
			this.setAttribute('disabled',true);
			$('#inst_metal_colln_chkbox').attr('disabled',false);
		});
		$('#inst_metal_colln_chkbox').change(function(){
			this.setAttribute('disabled',true);
			$('#inst_metal_paymnt_chkbox').attr('disabled',false);
		});
		$('#inst_metal_paymnt_chkbox').change(function(){
			this.setAttribute('disabled',true);
		});
	}
	this.fnCheckListSubmit = function(){
		self.operatorChkLstBtn = $('#operator_check_list_submit_button');
		self.operatorChkLstBtn.unbind('click');
		self.operatorChkLstBtn.click(function(){
			self.operatorChkLstBtn.attr('disabled',true);
			self.common.setMetalPaymtRelInstn(BASE_URL);/*
			$('#operator_check_list_submit_button').attr('disabled',true);
			var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			if(selectedOfferIds && selectedOfferIds.length >0){
				var tradeObj = self.getTradeObject(selectedOfferIds[0]);
				$.ajax({
			 		url : BASE_URL+'/updateTradeCheckLists',
			 		type: 'post',
		            cache: false,
		            contentType: false,
		            processData: false,
		            data: JSON.stringify(tradeObj), 
		            dataType: 'json',
		            contentType: 'application/json',
		            mimeType: 'application/json',
			 		success : function(response) {
			 			console.log(response);
			 		}
			 	});
			}
		*/});
	}
	this.commentAndEditPopupFn = function(header){
		$('.dealer_comments').click(function(){
			$('#popup-4').fadeIn(350);
			$( ".close_modal_btn").click(function(){
				$('#popup-4').fadeOut(350);
			});
//			if(header){
//		    	$('#confirm_pop_id').html(header);
//		    }
		});
		$('.dealer_edit').click(function(){
			$('.edit_field').css({'background':'#F3F3F3','border':'1px solid rgb(66, 166, 229) '});
			$('.edit_field').removeAttr('readonly');
		//	$('.RID_textarea').val($('.release_instruction_details p:not(".hidden")').text().trim()).removeClass('hidden');
			$('.release_instruction_details').addClass('hidden');
			checklistEdited = true;
			//self.common.setMetalPaymtRelInstn(BASE_URL,"edit_btn",header);
		});
		$('#comment_button').on('click',function(){
			$('#comment_popup').fadeIn();
//			$('#rel_inst_comments').val('');
		});
	}
	/*this.fnUpdateReleaseInstruction = function(){
		$('#releaseInstructionSubmit').click(function(){
			$('#releaseInstructionSubmit').attr('disabled',true);
			var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			if(selectedOfferIds && selectedOfferIds.length >0){
				var releaseInstObj = self.getTradeObject(selectedOfferIds[0]);
				$.ajax({
			 		url : BASE_URL+'/updateReleaseInstructionSendMail',
			 		type: 'post',
		            cache: false,
		            contentType: false,
		            processData: false,
		            data: JSON.stringify(releaseInstObj), 
		            dataType: 'json',
		            contentType: 'application/json',
		            mimeType: 'application/json',
			 		success : function(response) {
			 			//alert(response);
			 		}
			 	});
			}
		})
	}*/
//	this.updateCheckBoxStatus = function(){
//		$('#inst_metal_colln_chkbox,#inst_metal_release_chkbox,#inst_metal_paymnt_chkbox,#rev_release_chkbox,#rev_collect_chkbox,#rev_trigger_chkbox').change(function(){
//			var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
//			if(selectedOfferIds && selectedOfferIds.length >0){
//				var releaseInstObj = self.getTradeObject(selectedOfferIds[0]);
//				$.ajax({
//			 		url : BASE_URL+'/updateCheckBoxStatus',
//			 		type: 'post',
//		            cache: false,
//		            contentType: false,
//		            processData: false,
//		            data: JSON.stringify(releaseInstObj), 
//		            dataType: 'json',
//		            contentType: 'application/json',
//		            mimeType: 'application/json',
//			 		success : function(response) {
//			 			//alert(response);
//			 		}
//			 	});
//			}
//		})
//	}

	this.getTradeObject = function(tradeId){
		var tradeObj = {},
		tradeTask={};
		if($('#pcd_picker').val()!="")
		tradeObj.physicalCollectionDate = $('#pcd_picker').val();
		if($("#mrd_picker").val()!="")
			tradeTask.metalReleaseDate = $("#mrd_picker").val();
		if($("#etaCheck").is(':checked')){
			tradeObj.etaDate = $('#eta_picker').val();
		}
		if($("#scdCheck").is(':checked')){
			tradeObj.customerCompletionDate = $('#scd_picker').val();
		}
		if($("#ccdCheck").is(':checked')){
			tradeObj.supplierCompletionDate = $('#ccd_picker').val();
		}
		if($("#civdCheck").is(':checked')){
			tradeObj.invoiceValuationDate = $('#civd_picker').val();
		}
	
		if($("#inst_metal_release_chkbox").is(':checked')){
			tradeTask.instructMetalRelease = true;
		}else{
			tradeTask.instructMetalRelease = false;
		}
		if($("#inst_metal_colln_chkbox").is(':checked')){
			tradeTask.instructMetalCollection = true;
		}else{
			tradeTask.instructMetalCollection = false;
		}
		if($("#inst_metal_paymnt_chkbox").is(':checked')){
			tradeTask.instructMetalPayRelease = true;
		}else{
			tradeTask.instructMetalPayRelease = false;
		}
		if($("#freightCompany").is(':checked')){
			tradeTask.mailFreightCompany = true;
		}else{
			tradeTask.mailFreightCompany = false;
		}
		if($("#freightCompany").is(':checked')||$("#frightComAndCus").is(':checked')){
			tradeTask.mailFreightCompany = true;
		}else{
			tradeTask.mailFreightCompany = false;
		}
		if($("#customer").is(':checked')||$("#frightComAndCus").is(':checked')){
			tradeTask.mailCustomer = true;
		}else{
			tradeTask.mailCustomer = false;
		}
		if(!!($("#customerInvoiceComment").val())){
			tradeTask.customerInvoiceComment = $("#customerInvoiceComment").val();
		}
		tradeObj.id = tradeId;
		tradeObj.tradeTask = tradeTask;
		return tradeObj;
	}
	
	this.viewReleaseInstructionPage  = function(tradeId,_that){
		$(".container").load(BASE_URL+'/getReleaseInstructionPage?tradeId='+tradeId,function(){
			self.updateChecklist(tradeId,_that);
			self.common.checkReviewed();
			self.common.openPhysicalCollectionDate();
			self.dealerComments(tradeId);
			self.commentAndEditPopupFn(_that);
			self.releaseInstructionCancelBtn = $('#cancel_button');
			self.releaseInstructionCancelBtn.on('click',function(){
				if($("#dashBard_inner_tab").val().length > 0){
					var tradeId = [];
					$("#dash_trade_id").val('');
					self.goDashBoard($("#dashBard_inner_tab").val(),$("#dashBard_current_chart").val());
				}else{
					self.operatorCheckListFunction();
				}
			});
			if(_that){
				$('#page_header').html(self.getHeader(_that));
			}
			self.setInstructionFields(_that);
			self.setTradeView(tradeId,_that);
		});
	}
	
	this.setInstructionFields = function(elementId){
		if(elementId=='instruct_metal_release'){
			$('.metal_collection').addClass('hidden');
			$('.metal_payment').addClass('hidden');
			$('.release_instr').removeClass('hidden');
		}else if(elementId=='instruct_metal_collection'){
			$('.metal_payment').addClass('hidden');
			$('.release_instr').addClass('hidden');
			$('.metal_collection').removeClass('hidden');
		}else if(elementId=='instruct_metal_pay_release'){
			$('.release_instr').addClass('hidden');
			$('.metal_collection').addClass('hidden');
			$('.metal_payment').removeClass('hidden');
		}
	}
	this.getHeader = function(elementId){
		if(elementId=='instruct_metal_release'){
			return 'Release Instruction to Supplier';
		}else if(elementId=='instruct_metal_collection'){
			return 'Collection and Delivery Instruction to Freight Company';
		}else if(elementId=='trigger_metal_pay_release'){
			return 'Trigger Metal Payment Release';
		}else if(elementId=='instruct_metal_pay_release'){
			return 'Metal Payment Release Instruction to Freight Company';
		}else{
			return 'Release Instruction to Supplier';
		}
		return null;
	}
	this.getCollectionAndDeliveryInstruction = function(){
		$("#colln_and_del_instn_link").click(function() {
			var tradeId = $('#header_notification_page').attr('data-tradeId');
			$(".container").load(BASE_URL+'/getCollectionAndDeliveryInstructionPage?tradeId='+tradeId,function(){
			});
		});
	}
	/*this.getMetalPaymentReleaseInstruction = function(){
		$("#metal_payment_inst_link").click(function() {
			var tradeId = $('#header_notification_page').attr('data-tradeId');
			$(".container").load(BASE_URL+'/getMetalPaymentReleaseInstruction?tradeId='+tradeId,function(){
			});
		});
	}*/
	this.getInstructions = function(){
		$('.checklist_checkbox:not(.check_disabled)').on('click',function(){
			var tradeId=$('#checklist_header').attr('data-tradeid');
			var header = self.getHeader(this.id);
			var _that=this.id;
			if($(this).attr("id")=="trigger_metal_pay_release"){
				self.triggerMetalConformation(tradeId);
			}
			else{
				self.viewReleaseInstructionPage(tradeId,_that);
			}
		});
		
	}
	this.setTradeView = function(tradeId,_that){
		$('#trade_view_link').click(function(){
			self.operatorCheckListTradeViewAction('OPERATOR',tradeId,_that);
		})
	}
	this.operatorCheckListTradeViewAction = function(userRole,tradeId,_that){
		var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		$(".container").load(self.common.urlHash[userRole]+'/getTradeDetailsViewPage?tradeId='+selectedOfferIds[0],function(){
			self.cancelBtn(tradeId,_that);
		});
	}
	this.cancelBtn = function(tradeId,_that){
		$('#cancel_button').click(function(){
			self.checklistEdited=false;
			if($("#dashBard_inner_tab").val().length > 0){
				var tradeId = [];
				$("#dash_trade_id").val('');
				self.goDashBoard($("#dashBard_inner_tab").val(),$("#dashBard_current_chart").val());
			}else{
				//self.common.resetPopUp();
				self.viewReleaseInstructionPage(tradeId,_that);
			}
		});
	}
	this.triggerMetalConformation=function(tradeId){
		swal({
            title: "",
            text: "Trigger Metal Payment Release",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            allowOutsideClick:false
        }, function (isConfirm) {
        	if(isConfirm){
        		//$(this).attr("disabled",true);
        		$("#trigger_metal_pay_release").addClass('checked_list');
        		$("#trigger_metal_pay_release").parent().find('span').removeClass('glyphicon-unchecked check_disabled').addClass('glyphicon-check');
        		self.SubmitApprovalAjax(tradeId,false);
//        		self.loadDT(tradeId);
        	}/*else{
        		$('#trigger_metal_pay_release').attr('checked', false);
        	}*/
        });
		
	}
	this.SubmitApprovalAjax=function(tradeId,isDashOrgin){
		$.ajax({
 		url : BASE_URL+'/updateCheckListTask',
 		type: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: JSON.stringify(self.common.getTradeTaskDTO(tradeId)), 
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
 		success : function(response) {
 			swal({
 		        title: "Success",
 		        text:"Task Updated",
 		        type: "success" ,
 		        confirmButtonColor: "#1ab394",
 		        allowOutsideClick:false,
 		        closeOnConfirm: true},
 		        function(){
 		        	if(!isDashOrgin){
 		        		$('#cancel_button').trigger('click');
 		        	}else{
 		        		self.goDashBoard($("#dashBard_inner_tab").val(),$("#dashBard_current_chart").val());
 		        	}
 		    });
 		},
		error: function (response) {
 			swal({
                title: "Failed!",
                text: response,
                type: "error",
                confirmButtonColor: "#1ab394",
                allowOutsideClick:false,
                closeOnConfirm: true},
                function () {
                	if(!isDashOrgin){
 		        		$('#cancel_button').trigger('click');
 		        	}else{
 		        		self.goDashBoard($("#dashBard_inner_tab").val(),$("#dashBard_current_chart").val());
 		        	}
                });
 		}
		}); 	
	}
	
	this.updateChecklist = function(tradeId,header){
		$('#operator_check_list_submit_button').click(function(){
			$('#operator_check_list_submit_button').attr('disabled',true);
			self.common.setMetalPaymtRelInstn(BASE_URL,checklistEdited,header);
		})
	}
	this.getTradeTaskDTO=function(tradeId){
		var tradeTaskDTO={};
		tradeTaskDTO.tradeId=tradeId;
		tradeTaskDTO.comments=$('.instructions').val();
		return tradeTaskDTO;
	}
	this.dealerComments=function(tradeId){
		$('.dealer_comments').click(function(){
			$.ajax({
		 		url : BASE_URL+'/dealerComments',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: JSON.stringify(self.getTradeTaskDTO(tradeId)), 
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			self.commentsPopUp(response);
		 		}
		 	});
		});
	}
	this.commentsPopUp=function(tradeTaskList){
		var html = "";
		if(tradeTaskList.length>0){
			$.each(tradeTaskList, function( i, tradeTask ){
				if(!!tradeTask)
					var comment = '-';
				if(tradeTask.comment && tradeTask.comment.trim().length > 0){
					comment = tradeTask.comment;
				}
				  html= html+"<div class='comment_pop_wrap'>" +
				  		"<span class='useridcommentsbox'>"+tradeTask.updatedBy.accountCode+"</span>" +
				  		"<p class='commentsbox''>"+comment+"</p></div>";
				});
		}else{
			html = 'There is no comments.'
		}
		$("#dealer_comments").html(html);
	}
    /*Auto initialize*/
     this.init();
}