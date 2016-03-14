function dealerPremium(dealerNode){
	var self = this,
	selectedOfferIds = [],
	selectedOffers = [],
	BASE_URL=null;
	this.rootParent = dealerNode;
    this.init = function() {       
    	self.common=self.rootParent.common;
    	self.dealerTable=new dealerTable(self);
	 	BASE_URL = self.common.urlHash.DEALER;
		this.bind();
    };
    var values = new Array("confirmedOffers", "unConfirmedOffers", "DO");
    var tabIds = new Array([], [], []);
    var customOffers ={"confirmedOffers":[],
    		"unConfirmedOffers":[],
    		"DO":[]
    		};
    var offerIds ={"confirmedOffers":[],
    		"unConfirmedOffers":[],
    		"DO":[]
    		};
    this.bind = function() {
    	self.premiumSelectAllCheckBox();
    	self.customizeSelectAllCheckBox();
    }
    var groupsExcelTitle="Group Id\t" +
    		"Metal\t" +
    		"Premium\t";
    var cpmsExcelTitle=
    		"Account Id\t" +
    		"Group Desc\t" +
    		"Group Id\t" +
    		"Metal\t" +
    		"Premium\t";
    
    this.dealerPremiumFunctions = function(that){
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
				self.common=new common(self.rootParent.rootParent);
				self.common.advanceSearchCpmFieldUpdate();
				self.common.advanceSearchSubmit("CPM");
				self.dealerTable.CPM();
				self.innerMenuIcons = $(".inner-container").find('.menu-icons');
				self.innerMenuIcons.find('#addNewBtn').on("click", function() {
					self.common.destroyCountdown();
					self.getAddNewCPM();
			 	});
				self.getCPMEditPage();
				self.deleteCPMCall();
				self.customizeCall();
				self.viewCustomCpmDetails();
				self.exportToExcel("Cpm_Report","listcpm",cpmsExcelTitle);
				self.common.getfilterData();
				$('#cpmStatus').change();
			});
		  }else{
				$("#cpm").removeClass("innerMenu-selected"); 
				$("#groups").addClass("innerMenu-selected");
				$(".inner-container").load(BASE_URL+'/getGroupsTab',  function(){
					self.common.hideLoader();
					self.exportToExcel("Groups_Report","listgroups",groupsExcelTitle);
					self.common=new common(self.rootParent.rootParent);
					self.common.advanceSearchGroupsFieldUpdate();
					self.common.advanceSearchSubmit("GROUPS");
					self.dealerTable.premiumGroup();
					self.innerMenuIcons = $(".inner-container").find('.menu-icons');
					//ADD NEW
					self.innerMenuIcons.find('#addNewBtn').on("click", function() {
						$(".inner-container").load(BASE_URL+'/addNewGroupPage',function(){
							self.innerCancelTab();
							self.addEditClickAction('add');
						});
				 	});
					//EDIT
					self.innerMenuIcons.find('.edit_enabled_button').on("click", function() {
						self.common.hideLoader();
						var count = self.rootParent.checkboxCount();
						if(count == 1){
							var groupId = JSON.parse($("#selected_offer_id").val());
								$(".inner-container").load(BASE_URL+'/editGroupPage?groupId='+groupId[0],function(){
									selectedOfferIds = JSON.parse($("#selected_offer_id").val());
									selectedOffers = JSON.parse($("#selected_offers").val());
									self.innerCancelTab();
									self.addEditClickAction('edit');
								});
							
						}
						else if(count > 1){
							$( "#edit_button" ).prop( "disabled", true );
							$( "#edit_button" ).find("p").prop( "disabled", true );
						}
						
				 	});
					//DELETE
					self.innerMenuIcons.find('.delete_enabled_button').on("click", function() {
							var groupId = JSON.parse($("#selected_offer_id").val());
						swal({
				            title: "Delete Group(s)",
				            text: "Are you sure want to delete these groups?",
				            type: "warning",
				            showCancelButton: true,
				            confirmButtonColor: "#1ab394",
				            confirmButtonText: "Yes",
				            cancelButtonText: "No",
				            closeOnConfirm: false,
				            allowOutsideClick:false
				        }, function (isConfirm) {
				        	if(isConfirm){
				        		self.deleteGroup(groupId);
				        	}
				        });
				 	});
				});
			  }
    }
    this.senseCheckApplyToAll = function(){
    	if(self.senseCheck()){
    		self.warningAlert("","cpm_apply_all","");
    	}
    	else{
    		self.applyToAllAction();
    	}
    }
    this.senseCheckApplyToOffers = function(selectedPremiumId){
    	if(self.senseCheck()){
    		self.warningAlert("","cpm_apply_offers",selectedPremiumId);
    	}
    	else{
    		self.applyToOffersAction(selectedPremiumId);
    	}
    }
    this.senseCheck = function(){
    	var senseCheckVal=parseFloat($('#sense_check').val()),
    	premiumVal=parseFloat($("input[name='premium']").val());
    	var status =(senseCheckVal<premiumVal);
    	return status;
    }
	this.deleteGroup = function(groupId){
		self.common.swLoader();
		$.ajax({
	 		url : BASE_URL+'/deletePremiumGroup?groupId='+groupId,
	 		type: 'GET',
            cache: false,
            contentType: false,
            processData: false,
            contentType: 'application/json',
	 		success : function(response) {
	 			if(!response.actionStatus){
	 				var failureMessage=self.getGroupIdFailureMessage(response.groupIdList,response.statusMessage);
		 			swal({
		                title: "Failed",
		                text:failureMessage,
		                type: "error" ,
		                confirmButtonColor: "#1ab394",
		                allowOutsideClick:false,
		                closeOnConfirm: true
		 			});
	 			}else{
	 				swal({
		                title: "Success",
		                text:"Selected Group deleted successfully",
		                type: "success" ,
		                confirmButtonColor: "#1ab394",
		                allowOutsideClick:false,
		                closeOnConfirm: true
		 			});
	 				self.rootParent.loadInnerGroupTab();
	 			}
	 		}
	 	});
	}
	
	this.customizeCall= function(){
		self.innerMenuIcons.find('.customize-btn_enabled_button').on("click", function() {
			var selectedPremiumId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			self.getCustomizeView(selectedPremiumId[0]);
	 	});
	}
	
	this.getCustomizeView = function(selectedPremiumId){
		$(".inner-container").load(BASE_URL+'/getCpmCustomizePage?premiumId='+selectedPremiumId,function(){
			self.applyToAll();
			self.applyToOffers(selectedPremiumId);
			self.innerCancelTab();
		});
	}
	this.getGroupIdFailureMessage=function(groupIdList,statusMessage){
		var failureMessage = 'The Following Group(s) cannot be deleted : ';
		var groupIds;
		for (var int = 0; int < groupIdList.length; int++) {
			groupIds=groupIds+'<p>'+groupIdList[int]+'</p>';
		}
		return failureMessage+groupIdList;
	}
    
    this.addEditClickAction = function(action){
		$('#add_group_button').click(function(){
			self.validateGroup();
			$(".groupId").tooltip('destroy');
	        if($("#manage_group").valid()){
	        	if(self.senseCheck()){
	        		self.warningAlert(action,"group","");
	        	}else{
	                self.managePremiumGroupAction(action);
	        	}
	        }
		});
    }
    
    this.managePremiumGroupAction = function(action){
		var addNewpremiumDtoect = self.getNewpremiumDtoect(action);
		if(action !== "add"){
			if(addNewpremiumDtoect.premiumGroupName == $("#groupid-prev").val()){
				addNewpremiumDtoect.groupIdCheck = false;
			}
		}
		$.ajax({
	 		url : BASE_URL+'/addNewEditPremiumGroup',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: JSON.stringify(addNewpremiumDtoect), 
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			if(response.actionStatus){
	 				self.updateAlert(action,response);
	 			}else{
	 			   if(!response.groupIdExist){
	 				  if($('.groupId').val().length > 0){
	 					  	self.failureAlert(addNewpremiumDtoect.premiumGroupName);
		 					$('.groupId').attr('title', 'Group ID already exists');
		 					$(".groupId").tooltip('show');
		 				}
	 			   }
	 			}
	 		}
	 	});
    }

    this.groupEditDeleteEnableDisable= function(){
    	var loggedInUserInstanceCode=$("#loggedInInstanceId").attr('data-attr'),
    	selectedOffer = JSON.parse($('#selected_offers').val()),
    	status=false;
    	if(!!selectedOffer)
    	for (var int = 0; int < selectedOffer.length; int++) {
    		if(selectedOffer[int].custom!='0'){
    			return false;
    		}
			if(selectedOffer[int].createdBy.instance.code==loggedInUserInstanceCode){
				status=true;
			}else{
				return false;
			}
		}
    	return status;
    	 
    }
   
    this.updateAlert =  function(action,response){
			swal({
            title: (action=='add') ? "Success" : "Edit Saved",
            text: "Group : "+response.groupId+" "+((action=='add') ? "created" : "edited") +" successfully",
            type: "success" ,
            confirmButtonColor: "#1ab394",
            showCancelButton: false,
            allowOutsideClick:false,
            closeOnConfirm: true
			},function () {
				self.rootParent.loadInnerGroupTab();
	        });
    }
    this.failureAlert =  function(groupId){
		swal({
		title: "",
		type: "error",
        text:"Group ID '"+groupId +"' already exists. Please try a different one !",
        confirmButtonColor: "#1ab394",
        showCancelButton: false,
        allowOutsideClick:false,
        closeOnConfirm: true
		});
}
    this.warningAlert =  function(action,screen,selectedPremiumId){
	   	  swal({
	           title: "",
	           text: "Premium entered is greater than 50.0. Do you wish to continue?",
	           type: "warning",
	           showCancelButton: true,
	           confirmButtonColor: "#1ab394",
	           confirmButtonText: "Proceed",
	           allowOutsideClick:false,
	           closeOnConfirm: false,
	       }, function () {
	    	   if(screen=="group")
	    		   self.managePremiumGroupAction(action);
	    	   else if(screen=="cpm_apply_all")
	    		   self.applyToAllAction();
	    	   else if(screen=="cpm_apply_offers"){
	    		   swal.closeModal();
	    		   self.applyToOffersAction(selectedPremiumId);
	    	   }
	       });
    }
    this.validateGroup = function(){
		$.validator.addMethod("numberCheck", function (value, element) {
	        return !isNaN(value);
	    });
		$.validator.addMethod("countCheck", function (value, element) {
	        return value >= 0;
	    });
		$.validator.addMethod("nullCheck", function (value, element) {
	        return value.trim().length != 0
	    });
		$.validator.addMethod("decimalCheck", function (value, element) {
			var regex = /^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$/g;
		    if (!regex.test(value)) {
		    	return false;
		    }else{
				return true;
			}
	    });
        $("#manage_group").validate({
            rules: {
            	groupId:  {
	        		required: true,
	        		nullCheck:true
	            },
	            premium:{
	            	required: true,
	        		numberCheck: true,
	        		//countCheck:true,
	        		//decimalCheck: true
	            },
            },
            messages: {
            	groupId: {
	                required: "Required",
	                nullCheck: "Required",
	            },
	            premium: {
	                required: "Required",
	                numberCheck: "Please enter a number",
	                countCheck: "Value should be greater than zero",
	                decimalCheck: "Only 2 decimal points are allowed"
	            }
            },
            errorElement: "p",
            tooltip_options: {
            	quantity: { placement: 'right' },
             },
            submitHandler: function(form) {
					            }
        });
    }
	this.getNewpremiumDtoect=function(action){
		var premiumDto = {};
		if(action=='edit'&& $("#selected_offer_id").val()!=""){
			premiumDto.premiumGroupId=JSON.parse($("#selected_offer_id").val())[0];
		}
		premiumDto.groupPremium=($("input[name='premium']").val());
		premiumDto.metalName=$("select[name='metal']").val();
		premiumDto.premiumGroupName=$("input[name='groupId']").val();
		premiumDto.premiumCheck = true;
		premiumDto.groupIdCheck = true;
		
		return premiumDto;
	}
 
    this.accountChange = function(){
    	$('#premium_account').on('change',function(){
    		var accountId = this.value;
    		$.ajax({
		 		url : BASE_URL+'/getAccountDesc',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: accountId, 
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			if(response && response.actionStatus){
		 				$('#account_desc').val(response.statusMessage);
		 			}
		 		}
		 	});
    	});
    }
    
	this.innerCancelTab = function(){
		$('#cancel_button').click(function(){
			self.rootParent.loadInnerGroupTab();
		});
	}
	
    this.addNewCPM = function(isEdit){
    	$('#add_cpm_button').on('click',function(){
    		self.validateCPM();
	        if($("#manage_cpm").valid()){
		    		var premiumCPM = self.getPremiumCPMObject(isEdit);
		    		$.ajax({
				 		url : BASE_URL+premiumCPM.thisUrl,
				 		type: 'post',
			            cache: false,
			            contentType: false,
			            processData: false,
			            data: JSON.stringify(premiumCPM), 
			            dataType: 'json',
			            contentType: 'application/json',
			            mimeType: 'application/json',
				 		success : function(response) {
				 			if(response){
					 			swal({
					 				title: response.actionStatus == true ? "Success" : "Error",
					 				text: response.statusMessage,
					                type:  response.actionStatus == true ? "success" : "error",
					                allowOutsideClick:false,
					                confirmButtonColor: "#1ab394"},
					                function () {
					                	self.rootParent.loadInnerGroupTab();
					                });
				 			}
				 		}
				 	});
    	      }
    	});
    }
    
    this.validateCPM = function(){
		$.validator.addMethod("numberCheck", function (value, element) {
	        return !isNaN(value);
	    });
		$.validator.addMethod("countCheck", function (value, element) {
	        return value >= 0;
	    });
		$.validator.addMethod("decimalCheck", function (value, element) {
			var regex = /^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$/g;
		    if (!regex.test(value)) {
		    	return false;
		    }else{
				return true;
			}
	    });
        $("#manage_cpm").validate({
            rules: {
            	account:  {
	        		required: true,
	            },
	            group:  {
	        		required: true,
	            },
	            metal:  {
	        		required: true,
	            },
	            quantity:{
	            	required: true,
	        		numberCheck: true,
	        		//countCheck:true,
	        		decimalCheck: true
	            },
            },
            messages: {
            	account: {
	                required: "Required",
	            },
	            group: {
	                required: "Required",
	            },
	            metal: {
	                required: "Required",
	            },
	            quantity: {
	                required: "Required",
	                numberCheck: "Please enter a number",
	               // countCheck: "Value should be greater than zero",
	                decimalCheck: "Only 2 decimal points are allowed"
	            }
            },
            errorElement: "p",
            tooltip_options: {
            	quantity: { placement: 'top' },
             },
            submitHandler: function(form) {
					            }
        });
    }
    
    this.groupChange = function(){
    	$('#premium_group').on('change',function(){
    		var groupId = this.value;
    		$.ajax({
		 		url : BASE_URL+'/getGroupPremium',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: groupId, 
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			if(response){
		 				$('#group_premium').val(response.groupPremium);
		 			}
		 			
		 		}
		 	});
    	});
    }
    
    this.getAddNewCPM = function(){
    	$(".inner-container").load(BASE_URL+'/getAddNewCPMPage',function(){
			self.innerCancelTab();
			self.accountChange();
			self.addNewCPM(false);
			self.groupChange();
		});
    }
    
    this.getPremiumCPMObject = function(isEdit){
    	var premiumCPM = {};
    	premiumCPM.premiumGroupId = $('#premium_group').val();
    	if(isEdit){
    		premiumCPM.accountId = $('#premium_account').attr('data-attr');
    		premiumCPM.thisUrl = '/editCPM';
    		premiumCPM.premiumCpmId = $('#premium_account').attr('data-premiumCpmId');
    	}else{
    		premiumCPM.accountId = $('#premium_account').val();
    		premiumCPM.thisUrl = '/addNewCPM';
    	}
    	return premiumCPM;
    }
    
    this.removeFromArray = function(arrayToBeRemoved,removeItem){
    	arrayToBeRemoved = jQuery.grep(arrayToBeRemoved, function(value) {
    		  return value != removeItem;
    	});
    	return arrayToBeRemoved;
    }
    
    this.premiumSelectAllCheckBox = function () {
		$('.container').on('click', '.select_all_check', function () {
			var selectedRows = [];
	        var selectedTabName = $('.secondary-nav .tab').attr("id");
		    if(this.checked){
	    		$("input[name=offer-id]").each( function () {
			       $(this).prop('checked',true);
			       var $row = $(this).closest('tr'),
			       rowData = oTable.row($row).data();
			       selectedRows.push(rowData.id);
				});
	    		 if(selectedTabName=='premiums'){
	 		    	self.fnCPMSelectAll(selectedRows);
	 		    }
	    	}else{
	    		$("input[name=offer-id]").each( function () {
				       $(this).prop('checked',false);
				});
	    		self.common.changeBtnClass('delete','disabled','deleteBtn');
	    		self.common.changeBtnClass('edit','disabled','edit_button');
	    		self.common.changeBtnClass('customize-btn','disabled','customize-btn');
	    		self.common.changeBtnClass('export-btn','disabled','export-btn');
	    		selectedRows=[];
	    	}
	    });
	}
    
    this.customizeSelectAllCheckBox = function () {
		$('.container').on('click', '.cpm_select_all_check', function () {
			var selectedRows = [];
	        var selectedTabName = $('.secondary-nav .active').attr('id');
		    if(this.checked){
	    		$("#list_"+selectedTabName+" input[name=offer-id]").each( function () {
				       $(this).prop('checked',true);
				       var $row = $(this).closest('tr'),
				       rowData = oTable.row($row).data();
				       if(jQuery.inArray( rowData.id, customOffers[selectedTabName] )== -1){
				    	   customOffers[selectedTabName].push(rowData.id);
				    	   offerIds[selectedTabName].push(rowData.offerId)
						}
				});
	    	}else{
	    		$("#list_"+selectedTabName+" input[name=offer-id]").each( function () {
				       $(this).prop('checked',false);
				       var $row = $(this).closest('tr'),
				       rowData = oTable.row($row).data();
				       var arrayIndex = jQuery.inArray( rowData.id, customOffers[selectedTabName] );
						if(arrayIndex !== -1){
							customOffers[selectedTabName].splice(arrayIndex, 1);
							offerIds[selectedTabName].splice(arrayIndex, 1);
						}
				});
	    	}
		    $("#customized_selected_offer_ids").val(JSON.stringify(customOffers));
		    self.setOfferCount();
		    self.displaySelectedOffers(customOffers,offerIds,selectedTabName);
	    });
	}
    
    this.setOfferCount = function(){
    	$('#offer_count').html((customOffers['confirmedOffers'].length+customOffers['unConfirmedOffers'].length+customOffers['DO'].length)+' Offer(s) selected');
    }
    
    this.getCPMEditPage = function(){
    	self.innerMenuIcons.find('.edit_enabled_button').on("click", function() {
    		var selectedPremiumId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
        	$(".inner-container").load(BASE_URL+'/getCpmEditPage?premiumId='+selectedPremiumId[0],  function(){
        		self.groupChange();
        		self.innerCancelTab();
        		self.addNewCPM(true);
        	});
		});
    }
    
    this.fnCPMSelectAll = function(selectedRows){
    	if(selectedRows){
    		if(self.rootParent.selectionContainsExpired()){
    			self.common.changeBtnClass('delete','disabled','deleteBtn');
        		self.common.changeBtnClass('edit','disabled','edit_button');
        		self.common.changeBtnClass('customize-btn','disabled','customize-btn');
        		self.common.changeBtnClass('export-btn','enabled','export-btn');
        		self.common.changeBtnClass('view-btn','disabled','view-btn');
    		}else{
    			if(selectedRows.length==1){
        			self.common.changeBtnClass('edit','enabled','edit_button');
        			self.common.changeBtnClass('delete','enabled','deleteBtn');
        			self.common.changeBtnClass('export-btn','enabled','export-btn');
        		}else if(selectedRows.length>1){
        			self.common.changeBtnClass('edit','disabled','edit_button');
        			self.common.changeBtnClass('delete','enabled','deleteBtn');
//        			self.common.changeBtnClass('delete','disabled','deleteBtn');
        			self.common.changeBtnClass('export-btn','enabled','export-btn');
        		}
    		}
    	}
    }
    
    this.deleteCPMCall = function(){
		self.innerMenuIcons.find('.delete_enabled_button').on("click", function() {
			var cpmId = JSON.parse($("#selected_offer_id").val());
			swal({
	            title: "Delete CPM(s)",
	            text: "Are you sure want to delete these CPM(s)?",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#1ab394",
	            confirmButtonText: "Yes",
	            cancelButtonText: "No",
	            closeOnConfirm: false,
	            allowOutsideClick:false
	        }, function (isConfirm) {
	        	if(isConfirm){
	        		self.deleteCPM(cpmId);
	        	}
	        });
	 	});
    }
    
    this.deleteCPM = function(cpmIds){
    	$.ajax({
	 		url : BASE_URL+'/deleteCpmsWithCpmId',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: JSON.stringify(cpmIds), 
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			if(response && response.actionStatus){
	 				swal({
		 				title: "Success",
		 				text: response.actionStatus == true ?  response.statusMessage: "Unexpected output.",
		                type:  response.actionStatus == true ? "success" : "error",
		                allowOutsideClick:false,
		                confirmButtonColor: "#1ab394"},
		                function () {
		                	self.rootParent.loadInnerGroupTab();
		                });
	 			}
	 		}
	 	});
    }
    
    this.applyToAll = function(){
    	$('#apply_to_all').on('click',function(){
    		self.senseCheckApplyToAll();
    	});
    }
    this.applyToAllAction = function(){
		self.validateCPM();
        if($("#manage_cpm").valid()){
    		var premiumCPM = self.getPremiumCpmToCustomize();
    		$.ajax({
    	 		url : BASE_URL+'/applyCpmToAllOffers',
    	 		type: 'post',
                cache: false,
                contentType: false,
                processData: false,
                data: JSON.stringify(premiumCPM), 
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json',
    	 		success : function(response) {
    	 			if(response && response.actionStatus){
    	 				swal({
    		 				title: "Success",
    		 				text: response.actionStatus == true ?  response.statusMessage: "Unexpected output.",
    		                type:  response.actionStatus == true ? "success" : "error",
    		                closeOnConfirm: true,
    		                allowOutsideClick:false,
    		                confirmButtonColor: "#1ab394"},
    		                function () {
    		                	self.rootParent.loadInnerGroupTab();
    		                });
    	 			}
    	 		}
    	 	});
        }
	
    }
    
    this.getPremiumDtoArray=function(selectedOffersArray){
    	var premiumDtoArray = [];
    	for (var int = 0; int < selectedOffersArray.length; int++) {
    		var premiumDto = {};
    		premiumDto.premiumGroupId=selectedOffersArray[int].id;
    		premiumDto.groupPremium=selectedOffersArray[int].premium;
    		premiumDto.metalName=selectedOffersArray[int].metal.metal;
    		premiumDto.premiumGroupName=selectedOffersArray[int].groupId;
    		premiumDtoArray[int]=premiumDto;
		}
    	return premiumDtoArray;
    }
    
    this.applyToOffers = function(selectedPremiumId){
    	$('#apply_to_offer').on('click',function(){
    		$('#selected_offer_id').attr('data-cpmPremium',$('#group_premium').val());
    		self.senseCheckApplyToOffers(selectedPremiumId);
    	})
    }
    
    this.applyToOffersAction = function(selectedPremiumId){
		self.validateCPM();
        if($("#manage_cpm").valid()){
        	$(".inner-container").load(BASE_URL+'/getCpmCustomizeSpecificCasePage?premiumId='+selectedPremiumId,  function(){
        		/*customOffers= [];
        		offerIds = [];*/
        	    customOffers ={"confirmedOffers":[],
        	    		"unConfirmedOffers":[],
        	    		"DO":[]
        	    		};
        	    offerIds ={"confirmedOffers":[],
        	    		"unConfirmedOffers":[],
        	    		"DO":[]
        	    		};
        		$("#customized_selected_offer_ids").val(JSON.stringify(customOffers));
        		self.loadCustomizeCPMPage();
        		self.common=new common(self.rootParent.rootParent);
        		$("#offer_selected_id").val(selectedPremiumId);
        		self.common.advanceSearchSubmit("CPM");
        		self.applyToOffersSubmit();
        		self.offerCancelAction();
        	});
        }
	
    }
    
	this.activeTable = function(activeTab){
		$(".inner_container").find(".activeTable").removeClass("activeTable");
		$(".inner_container").find('.'+activeTab).addClass("activeTable");
    };
    
	this.clearResetSearchBtn = function(){
		$(".search_reset_btn").css("display", "none");
	}
	
	this.clearAdvSearchTradeFields = function(){
		if(!$("input[name='tradeId']").parent().hasClass('display_none')){
			$('.advanced_search_element.trade_field').addClass('display_none');
			$("input[name='offerId']").parent().removeClass('display_none');
			$("input[name='availability'],input[name='expiry']").parent().parent().removeClass('display_none');
		}
	}
    
	this.loadCustomizeCPMPage = function(){
		self.secondaryNavTab = $('.secondary-nav li');
		self.common=new common(self.rootParent);
		self.secondaryNavTab.on('click',function(){
			var activeTab = this.id;
			if(self.common.advSearchWrap.hasClass('show_advance_search')){
				self.common.resetAdvanceSearchFields();
			};
			self.clearAdvSearchTradeFields();
			self.activeNavTab = $('.secondary-nav').find('.active');
			self.activeNavTab.removeClass('active');
			$(this).addClass('active');
			switch (activeTab){
				case 'confirmedOffers':
					self.activeTable(activeTab);
					self.dealerTable.CUSTOMIZECOLIST();
					self.common.hideLoader();
					self.common.fnResetAllFilters(oTable);
					self.clearResetSearchBtn();
					self.common.advanceSearchSubmit("DEALER");
					break;
				case 'unConfirmedOffers':
					self.activeTable(activeTab);
					self.dealerTable.CUSTOMIZEUCLIST();
					self.common.hideLoader();
					self.common.fnResetAllFilters(oTable);
					self.clearResetSearchBtn();
					self.common.advanceSearchSubmit("DEALER");
					break;
				case 'DO':
					self.activeTable(activeTab);
					self.dealerTable.CUSTOMIZEDOLIST();
					self.common.hideLoader();
					self.common.fnResetAllFilters(oTable);
					self.clearResetSearchBtn();
					self.common.advanceSearchSubmit("DEALER_DO");
					break;
				default:
					//self.dealerQueriesTable.confirmedOffers(accId, userRole);
			}
		});
	   $('.secondary-nav #confirmedOffers').trigger('click');
	}
    
    
    this.offerCancelAction = function(){
    	$('#cancel_button').on('click',function(){
    		self.getCustomizeView(parseInt($("#offer_selected_id").val()));
    	});
    }
    
    this.getPremiumCpmToCustomize = function(){
    	var premiumCPM = {};
    	premiumCPM.premiumGroupId = $('#premium_group').attr('data-attr');
    	premiumCPM.accountId = $('#premium_account').attr('data-attr');
    	premiumCPM.groupPremium = parseFloat($('#group_premium').val());
    	premiumCPM.metalName=$('#premium_metal').val();
    	premiumCPM.premiumCpmId = $('#premium_account').attr('data-premiumcpmid');
    	return premiumCPM;
    }
    
    this.customizeSingleSelect = function(){
    	 var selectedTabName = $('.secondary-nav .active').attr("id");
    	if(this.checked){
    		var $row = $(this).closest('tr'),
    		rowData = oTable.row($row).data();
    		if(jQuery.inArray( parseInt(this.value), customOffers[selectedTabName] )== -1){
    			customOffers[selectedTabName].push(parseInt(this.value));
    			offerIds[selectedTabName].push(rowData.offerId);
			}
    		var html = '<div class="col-md-3 offer_element">'+
    	               '<span style="width:88%;float:left;margin-top:11px">'+
    	               '<h5 style="font-weight:normal;">Offer ID : '+rowData.offerId+'</h5>'+
    	               '</span>'+
    	               '<div class="close_offer" data-attr='+rowData.id+' type-attr='+selectedTabName+'>X</div>'+
    	               '</div>';
    		$("#offer-block").append(html);
    	}else{
    		var $row = $(this).closest('tr'),
    		rowData = oTable.row($row).data();
    		customOffers[selectedTabName] = self.removeFromArray(customOffers[selectedTabName],parseInt(this.value));
    		offerIds[selectedTabName]= self.removeFromArray(offerIds[selectedTabName],rowData.offerId);
    		$(".offer_element h5:contains('Offer ID : "+rowData.offerId+"')").parent().parent().remove();
    		$( ".cpm_select_all_check" ).prop( "checked", false );
    	}
    	self.removeOffer();
    	self.setOfferCount();
    	$("#customized_selected_offer_ids").val(JSON.stringify(customOffers));
	}
    
    this.exportToExcel = function(sheet,tableId,excelTableHeader){
    	$('.export-btn_enabled_button').click(function(e){
    		var selectedOffersArray =JSON.parse($("#selected_offers").val());
    	       self.common.JSONToXLSConvertor(selectedOffersArray, sheet, true,tableId,excelTableHeader);
    	});
    }
    
    this.displaySelectedOffers =  function(selectedIds,offerIds,selectedTabName){
    	 $("#offer-block").html("");
    	 for (var property in selectedIds) {
    			$(selectedIds[property]).each( function (i,v) {
    				var offerid = offerIds[property];
    		    	var html = '<div class="col-md-3 offer_element">'+
    		        '<span style="width:88%;float:left;margin-top:11px">'+
    		        '<h5 style="font-weight:normal;">Offer ID : '+offerid[i]+'</h5>'+
    		        '</span>'+
    		        '<div class="close_offer" data-attr='+v+' type-attr='+property+'>X</div>'+
    		        '</div>';
    		        $("#offer-block").append(html);
    			});
    		}
		self.removeOffer();
    }

    this.applyToOffersSubmit = function(){
    	$('#apply_to_offers_submit').on('click',function(){
    		var premiumCPM = self.validateAndGetSpecificOfferCpm();
    		if(premiumCPM !=null){
    			self.common.swLoader();
    			$('#apply_to_offers_submit').attr('disabled', 'true');
    			$.ajax({
        	 		url : BASE_URL+'/applyCpmToSelectedOffers',
        	 		type: 'post',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: JSON.stringify(premiumCPM), 
                    dataType: 'json',
                    contentType: 'application/json',
                    mimeType: 'application/json',
        	 		success : function(response) {
        	 			$('#apply_to_offers_submit').attr('disabled', 'false');
        	 			if(response && response.actionStatus){
        	 				self.responseHandling(response);
        	 			}
        	 		}
        	 	});
    		}
    	})
    }
    
    this.responseHandling = function(response){
		swal({
			title: "Success",
			text: response.actionStatus == true ?  response.statusMessage: "Unexpected output.",
        type:  response.actionStatus == true ? "success" : "error",
        allowOutsideClick:false,
        confirmButtonColor: "#1ab394"},
        function () {
        	self.rootParent.loadInnerGroupTab();
        });
    }
    
    this.validateAndGetSpecificOfferCpm = function(){
    	var selectedTabName = $('.secondary-nav .active').attr("id");
    	if(customOffers.confirmedOffers.length!=0||customOffers.unConfirmedOffers.length!=0||customOffers.DO.length!=0){
        	var premiumCPM = {};
        	premiumCPM.premiumCpmId = $('#premium_params').attr('data-premiumcpmid');
        	premiumCPM.offerIds = customOffers["confirmedOffers"];
        	premiumCPM.preOfferIds = customOffers["unConfirmedOffers"];
        	premiumCPM.directOfferIds = customOffers["DO"];
        	premiumCPM.groupPremium =parseFloat($('#selected_offer_id').attr('data-cpmPremium'));
    	}else{
              self.rowSelectWarning();
    	}
    	return premiumCPM;
    }
    
    this.rowSelectWarning = function(){
	   	  swal({
  	           title: "",
  	           text: "No rows selected.",
  	           type: "warning",
  	           showCancelButton: false,
  	           confirmButtonColor: "#1ab394",
  	           confirmButtonText: "Ok",
  	           closeOnConfirm: true,
  	           allowOutsideClick:false
  	       });
    }
    
    this.removeOffer = function(){
    	$(".close_offer").on('click',function(e){
			e.preventDefault();
			var removeId = parseInt(this.getAttribute('data-attr'));
			var arrayIndex = jQuery.inArray( removeId, customOffers[this.getAttribute('type-attr')] );
				if(arrayIndex !== -1){
					customOffers[this.getAttribute('type-attr')].splice(arrayIndex, 1);
					offerIds[this.getAttribute('type-attr')].splice(arrayIndex, 1);
				}
			self.setOfferCount();
		    $(this).parent().remove();
		    $('#list_'+this.getAttribute('type-attr')+' :input[value="'+this.getAttribute('data-attr')+'"]').prop('checked',false);
		    $("#customized_selected_offer_ids").val(JSON.stringify(customOffers));
		    $( ".cpm_select_all_check" ).prop( "checked", false );
    	});
    }
    
    this.viewCustomCpmDetails = function(){
    	self.innerMenuIcons.find('.view-btn_enabled_button').on("click", function() {
    		var cpmId = JSON.parse($('#selected_offer_id').val())[0];
    		$(".inner-container").load(BASE_URL+'/getCustomCpmByCpmId?cpmId='+cpmId,  function(){
    			self.dealerPremiumTable=new dealerPremiumTable(self);
				self.secondaryNavTab = $('.secondary-nav .tab');
				//self.common=new common(self.rootParent);
				self.secondaryNavTab.on('click',function(){
					var activeTab = this.id;
					self.activeNavTab = $('.secondary-nav').find('.active');
					self.activeNavTab.removeClass('active');
					$(this).parent().addClass('active');
					self.innerCancelTab();
					switch (activeTab){
						case 'confirmedOffers':
							self.activeTable(activeTab);
							self.dealerPremiumTable.confirmedOffers(cpmId);
							self.common.hideLoader();
							break;
						case 'unConfirmedOffers':
							self.activeTable(activeTab);
							self.dealerPremiumTable.unConfirmedOffers(cpmId);
							self.common.hideLoader();
							break;
						case 'DO':
							self.activeTable(activeTab);
							self.dealerPremiumTable.DO(cpmId);
							self.common.hideLoader();
							break;
					}
				});
				$('.secondary-nav #confirmedOffers').trigger('click');
            });
    	})
    };
    
    
    this.clearPreviousSelections = function(){
    	$(".offer_checkbox").each( function () {
	       $(this).prop('checked',false);
		});
    }
    
    this.init();
}