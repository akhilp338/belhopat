function dealerTrade(dealerNode){
	var self = this,
	selectedOfferIds = [],
	selectedOffers = [],
	BASE_URL=null;
	this.rootParent = dealerNode;
    this.init = function() {       
    	self.common=self.rootParent.common;
	 	BASE_URL = self.common.urlHash.DEALER;
		this.bind();
    };
    
    this.bind = function() {
    	
    }
    
    this.dealerCheckListFunction = function(criticalOfferId,triggerId){
    	var offerId  = "";
    	if($("#dashBard_current_chart").val().length == 0){
    	   offerId = JSON.parse($("#selected_offer_id").val());
    	}else{
    		var custom_offer = [];
    		custom_offer.push(criticalOfferId)
    		offerId = criticalOfferId;
    		$("#selected_offer_id").val(JSON.stringify(custom_offer));
    	}
		$(".container").load(BASE_URL+'/getDealerCheckListForm',function(){
			if(triggerId !== undefined){
					$("#dash_trade_id").val(offerId);
					 //$('#'+triggerId).trigger('click');
					 self.viewReleaseInstructionPage(offerId,self.getHeader(triggerId),triggerId);
			}else{
				self.checkListInnerActionPage(offerId);
			}
		});
	}
    
    //new
    this.checkListInnerActionPage = function(offerId){
		self.secondaryNavTab = $('.secondary-nav li');
		self.common=new common(self.rootParent);
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
					self.getTradeCheckListMails();
					break;
				default:
					self.common.hideLoader();
					self.loadDT(offerId);
				    break;
			}
		});
	   $('.secondary-nav #DT').trigger('click');
	}
	
    //new
	this.loadDT=function(offerId){
		$(".inner_container").load(BASE_URL+'/getDatesAndTasksPage?tradeId='+offerId,function(){
			$('#checklist_header').html('Checklist-Trade ID : '+$('#setDateHeader').attr('data-tradeid'));
			self.common.hideLoader();
//			self.common.openDateTimePicker();
			self.common.cancelBtn();
			self.setDates(offerId);
//			self.disableOperatorCheckLists();
//			self.setTradeTaskCheckBoxesOnLoad();
//			self.setTradeDatesOnLoad();
//			self.setTradeTaskCheckBoxesOnClick();
//			self.updateTradeTaskOnClick();
//			self.fnCheckListSubmit()
//			self.pickDateCheckBox();
			self.updateChecklistTask(offerId);
			self.getCompletedTradeTasks(offerId);
			//self.common.tradeInvoiceOnChange();
		});
	}
    
    //new
	this.updateChecklistTask = function(tradeId){
		$('.checklist_checkbox:not(.check_disabled)').on('click',function(){
				var _that = self.getHeader(this.id);
				var checkboxId=this.id;
				self.viewReleaseInstructionPage(tradeId,_that,checkboxId);
		});
	}
	
	this.setInstructionFields = function(elementId){
		if(elementId=='review_relese_metal'){
			$('.dealer_trigger_metal_collection').addClass('hidden');
			$('.dealer_release_instruction').removeClass('hidden');
		}else
			{
			$('.dealer_release_instruction').addClass('hidden');
			$('.dealer_trigger_metal_collection').removeClass('hidden');
			}
		}
	
	
	this.viewReleaseInstructionPage  = function(tradeId,_that,checkboxId){
		$(".container").load(BASE_URL+'/getReleaseInstructionPage?tradeId='+tradeId,function(){
			self.common.openDateTimePicker();
			self.cancelReviewAndRelease();
			self.common.checkReviewed();
			self.addComment();
			self.submitReviewAndRelease(_that);
			self.setInstructionFields(checkboxId);
			self.instructionDetailsEdit();
			if(_that){
				$('#page_header').html(_that);
				self.setInstructionFields(_that);
			}
			self.setTradeView(tradeId,_that);
			
		});
	}
	
	this.setInstructionFields = function(elementId){
		if(elementId=='review_relese_metal'){
			$('.metal_paymnt').addClass('hidden');
			$('.release_inst').removeClass('hidden');
		}else if(elementId=='rev_and_trigger_metal_pay_rel'){
			$('.release_inst').addClass('hidden');
			$('.metal_paymnt').removeClass('hidden');
		}
	}
	
	//new
	this.getHeader = function(elementId){
		if(elementId=='rev_and_trigger_metal_pay_rel'){
			return 'Metal Payment Release Instruction';
		}
		return null;
	}
	this.setTradeView = function(tradeId,_that){
		$('#trade_view_link').click(function(){
			self.dealerCheckListTradeViewAction('DEALER',tradeId,_that);
		})
	}
	this.cancelBtn = function(tradeId,_that){
		$('#cancel_button').click(function(){
			self.common.checklistEdited=false;
			self.common.resetPopUp();
			self.viewReleaseInstructionPage(tradeId,_that);
		});
	}
	
    this.dealerCheckListTradeViewAction = function(userRole,tradeId,_that){
		var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		$(".container").load(self.common.urlHash[userRole]+'/getTradeDetailsViewPage?tradeId='+selectedOfferIds[0],function(){
			self.cancelBtn(tradeId,_that);
		});
	}
	
    //new
	this.cancelReviewAndRelease = function(){
		$('#review_release_cancel').click(function(){
			if($("#dashBard_inner_tab").val().length > 0){
				var tradeId = [];
				//self.dealerCheckListFunction($("#dash_main_trade_id").val());
				$("#dash_trade_id").val('');
				//$($("#dashBard_current_chart").val()).trigger('click');
				self.rootParent.goDashBoard($("#dashBard_inner_tab").val(),$("#dashBard_current_chart").val());
			}else{
				self.dealerCheckListFunction();
			}
		})
	}
	this.addComment = function(){
		$('#comment_button').on('click',function(){
			$('#comment_popup').fadeIn();
		});
	}
	 //new
	this.submitReviewAndRelease = function(header){
		$('#review_release_submit').click(function(){
			$('#review_release_submit').attr('disabled',true);
	        $("#release-instruction-form").validate({
	            rules: {
	            	bootstrap_PCDPicker:"required",
	            },
	            messages: {
	            	bootstrap_PCDPicker:"Required",
	            },
	            submitHandler: function(form) {
	               return true;
	            }
	        });
			if($("#release-instruction-form").valid()){
				self.setMetalPaymtRelInstn(header);
		    }
		})
	}
	
	//new
	this.setMetalPaymtRelInstn = function(header){
		self.common.swLoader();
		var tradeId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		$.ajax({
	 		url : BASE_URL+'/getMetalPaymtRelInstn',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: tradeId[0], 
            //data: JSON.stringify(self.common.getTradeTaskDTO(tradeId[0],true)),
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			//self.createApprovePopUp(response,header);
	 			self.SubmitApproval(response.id);
	 		}
	 	});
	}
	
	 //new
	/*this.createApprovePopUp = function(tradeObject,header){
		swal.closeModal();
	    $('#popup-2').fadeIn(350);
	    if(header){
	    	$('#confirm_pop_id').html(header);
	    }
	    $('#popup-2 .RI_popup').removeClass("hidden");
	    self.fillPopUpData(tradeObject);
	    $('#bootstrap_newPCDatePicker,#deliveryLoc ,#freight_premium_id,#destination_loc').parent().addClass('hidden');
	    $( ".close_modal_btn").click(self.fadeOutPopUp);
	    $( '#cancel_approve').click(self.fadeOutPopUp);
	    self.SubmitApproval(tradeObject.id);
	}*/
	
	 //new
	/*this.fillPopUpData = function(tradeObject){
		var availDate = new Date(tradeObject.tradeMaster.tradeDate),
		setAvai = availDate.getDate()+'-'+parseInt(availDate.getMonth()+1)+'-'+availDate.getFullYear(),
		expDate = new Date(tradeObject.offer.offerMaster.expiry),
		setExp = expDate.getDate()+'-'+parseInt(expDate.getMonth()+1)+'-'+expDate.getFullYear(),
		phyCollnDate = new Date(tradeObject.physicalCollectionDate),
		setPhy = phyCollnDate.getDate()+'-'+parseInt(phyCollnDate.getMonth()+1)+'-'+phyCollnDate.getFullYear();
		$('#trade_id').html(tradeObject.tradeId);
		$('#trade_date_id').html(setAvai);
//		$('#sup_acc_id').html(tradeObject.offer.accountCode);
		$('#offer_id').html(tradeObject.offer.offerId);
		$('#metal_id').html(tradeObject.offer.offerMaster.commodity.metal.metal);
//		$('#inventory_id').html(tradeObject.offer.offerMaster.commodity.metal.inventory);
//		$('#brand_id').html(tradeObject.offer.offerMaster.commodity.commodityBrand.code);
//		$('#type_id').html(tradeObject.offer.offerMaster.commodity.commodityType.code);
		$('#purity_id').html(tradeObject.offer.offerMaster.commodity.metal.purity);
		$('#qty_id').html(tradeObject.offer.offerMaster.quantity);
//		$('#source_loc_id').html(tradeObject.offer.offerMaster.city.description);
//		$('#premium_id').html(tradeObject.supplierPremium);
//		$('#availabilty_id').html(setAvai);
//		$('#expiry_id').html(setExp);
		$('#phy_colln_id').html(setPhy);
//		$('#price_id').html(tradeObject.eqOzs * tradeObject.supplierPremium);
		$('#price_id').html($('.price_val').text());
		if(tradeObject.freightCompany){
			$('#freight_compny_id').html(tradeObject.freightCompany.description);
		}else{
			$('#freight_compny_id').html('-');
		}
	}*/
	
	//new
	/*this.fadeOutPopUp = function(){
		$('#popup-2').fadeOut(350);
	}*/
	
	//new
	this.SubmitApproval = function(tradeId){
			self.common.swLoader();
			var object = self.GetTaskObject(tradeId);
			$.ajax({
		 		url : BASE_URL+'/releaseInstructionSubmit',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: JSON.stringify(object), 
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			swal({
		                title: "Success",
		                text:"Task Updated.",
		                type: "success" ,
		                confirmButtonColor: "#1ab394",
		                allowOutsideClick:false,
		                closeOnConfirm: true},
		                function(){
		                	$('#rel_inst_comments').val('');
		                	$('#review_release_cancel').trigger('click');
		                });
		 		}
		 	});
	}
	
	//new
	this.GetTaskObject = function(tradeId){
		var object = {};
		object.comments = $('#rel_inst_comments').val();
		object.instructions = $('.ID_textarea').val();
		object.tradeId = tradeId;
		object.physicalCollectionDate = $('#pcd_picker').val();
		return object;
	}
	
	//new
	this.getCompletedTradeTasks = function(tradeId){
		$.ajax({
	 		url : BASE_URL+'/getcompletedTradeTasks',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: tradeId, 
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			self.checkCompletedCheckBoxes(response);
	 		}
	 	});
	}
	
	//new 
	this.checkCompletedCheckBoxes = function(tradeTasks){
		if(tradeTasks && tradeTasks.length > 0){
			for(var key in tradeTasks){
				$( '.checklist_checkbox' ).each(function( index ) {
					if(tradeTasks[key].task.id==parseInt($(this).attr('data-value'))){
							$(this).parent().find('span').removeClass();
							$(this).parent().find('span').attr('class', 'glyphicon glyphicon-check');
							$(this).addClass('checked_list');
					}
					if(tradeTasks[key].task.id==parseInt($(this).attr('data-value'))&&
							tradeTasks[key].completed=='0'){
						if($(this).hasClass('check_enabled')){
							$(this).parent().find('span').removeClass();
							$(this).parent().find('span').attr('class', 'glyphicon glyphicon-unchecked');
							$(this).removeClass('checked_list');
						}
						else{
							$(this).parent().find('span').removeClass();
							$(this).parent().find('span').attr('class', 'glyphicon glyphicon-unchecked check_disabled');
							$(this).removeClass('checked_list');
						}
					}
				});
			}
		}
	}
	
	//new
    /*this.disableOperatorCheckLists = function(){
		$( '.operator_only' ).each(function( index ) {
			//this.setAttribute('disabled',true);
			$(this).addClass('check_disabled').removeClass('check_enabled');
			$(this).parent().find('span').addClass('check_disabled').removeClass('check_enabled');
		});
	}*/
    
    /*this.setTradeTaskCheckBoxesOnLoad = function(){
		if($('#rev_release_chkbox').val()==1){
			$("#rev_release_chkbox").attr("disabled",true);
			$("#rev_release_chkbox").prop('checked', true);
		}else if($('#rev_release_chkbox').val()==2){
			$("#rev_release_chkbox").attr("disabled",true);
			$("#rev_release_chkbox").prop('checked', true);
			if($('#rev_collect_chkbox').val()==0){
				$("#rev_collect_chkbox").attr("disabled",false);
			}else if($('#rev_collect_chkbox').val()==1){
				$("#rev_collect_chkbox").attr("disabled",true);
				$("#rev_collect_chkbox").prop('checked', true);
			}else if($('#rev_collect_chkbox').val()==2){
				$("#rev_collect_chkbox").attr("disabled",true);
				$("#rev_collect_chkbox").prop('checked', true);
				if($("#rev_trigger_chkbox").val()==0){
					$("#rev_trigger_chkbox").attr("disabled",false);
				}else {
					$("#rev_trigger_chkbox").prop('checked', true);
					$("#rev_trigger_chkbox").attr("disabled",true);
				}
			}
		}
    }*/
		
		this.getTradeChecklistDocs = function(){
			var tradeId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			$(".inner_container").load(BASE_URL+'/getTradeDocsPage?tradeId='+tradeId,function(){
				self.common.loadDocuments(tradeId);
			});
		}
		
		
		this.getTradeCheckListMails = function(){
			var tradeId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			$(".inner_container").load(BASE_URL+'/getTradeMailsPage?tradeId='+tradeId,function(){
		        self.setLastSentDate(tradeId);
			});
		}
		
		//new
		this.setLastSentDate = function(tradeId){
			$.ajax({
		 		url : BASE_URL+'/getLatestMailSentDates',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: tradeId, 
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			console.log(response);
		 			self.setDataTableData(response,tradeId);
		 		}
		 	});
		}
		
		//new
		this.setDataTableData = function(emailData,tradeId){
			if(emailData){
				var mailData = [];
				mailData[0] = new Array('<center>Order Placement Email to Supplier'+
						'<br><span id="reissue_link_to_supplier" class="enabled_table_link">Reissue</span></br>'+
						'</center>',
						'<center>'+emailData[0]+'(GMT)</center>');
				mailData[1] = new Array('<center>Order Confirmation Email to Customer'+
						'<br><span id="reissue_link_to_customer" class="enabled_table_link">Reissue</span></br>'+
						'</center>', 
						'<center>'+emailData[1]+'(GMT)</center>');
		        $('#listEmails').DataTable({
	                "data": mailData,
	                "bFilter": false,
	                "paging": false,
	                "bSort": false,
	                "fnDrawCallback": function(settings, ajax) {
	                	
	                },
		        });
			}
			self.setReIssueLink();
		    self.common.reIssueMail(tradeId);
		}
		
		//new 
		this.setReIssueLink = function(){
			var dealerFlag = parseInt($('#dealer_flag').val());
			if(dealerFlag==0){
				$('#reissue_link_to_customer').hide();
			}else if(dealerFlag==1){
				$('#reissue_link_to_supplier').hide();
			}
		}
		
//		if($('#etaCheck').is(':checked')){
//			$("#eta_picker").attr("disabled",false);
//    		$('#scdCheck').attr('disabled',false);
//		}
//		if($('#scdCheck').is(':checked')){
//			$("#scd_picker").attr("disabled",false);
//    		$('#ccdCheck').attr('disabled',false);
//		}
//		if($('#ccdCheck').is(':checked')){
//			$("#ccd_picker").attr("disabled",false);
//			$("#civd_picker").attr("disabled",false);
//		}
//	}
    
    /*this.setTradeDatesOnLoad = function(){
		var etaDate = $("#eta_picker").attr('value'),
			scdDate = $("#scd_picker").attr('value'),
			ccdDate = $("#ccd_picker").attr('value'),
			civdDate = $("#civd_picker").attr('value');
		if(etaDate && etaDate.trim().length>0){
			$("#eta_picker").val(etaDate);
			if(scdDate && scdDate.trim().length>0){
				$("#scd_picker").val(scdDate);
				if(ccdDate &&ccdDate.trim().length>0){
					$("#ccd_picker").val(ccdDate);
				}
			}else{
				$('#ccdCheck').attr('disabled',true);
			}
		}else{
			$('#scdCheck').attr('disabled',true);
			$('#ccdCheck').attr('disabled',true);
		}
		$("#civd_picker").val(civdDate);
	}*/
	
	/*this.setTradeTaskCheckBoxesOnClick = function(){
		$('#rev_release_chkbox').change(function(){
			this.setAttribute('disabled',true);
		});
		$('#rev_collect_chkbox').change(function(){
			this.setAttribute('disabled',true);
		});
		$('#rev_trigger_chkbox').change(function(){
			this.setAttribute('disabled',true);
		});
	}*/
	
	/*this.fnCheckListSubmit = function(){
		$('#dealer_check_list_submit_button').click(function(){
			$('#dealer_check_list_submit_button').attr('disabled',true);
			var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			if(selectedOfferIds && selectedOfferIds.length >0){
				var tradeObj = self.getTradeObject(selectedOfferIds[0]);
				$.ajax({
			 		url : BASE_URL+'/updateTradeCompletionDates',
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
		})
	}*/
	
	this.getTradeObject = function(tradeId){
		var tradeObj = {},
		tradeTask={};
		tradeObj.amPmFix = $("select[name='amPmFix']").val();
		tradeObj.tradeInvoice = $("select[name='tradeInvoice']").val();
		tradeObj.physicalCollectionDate = $('#pcd_picker').val();
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
		if($("#rev_release_chkbox").is(':checked')){
			tradeTask.revisionReleaseMetal = true;
		}else{
			tradeTask.revisionReleaseMetal = false;
		}
		if($("#rev_collect_chkbox").is(':checked')){
			tradeTask.revisionCollectMetal = true;
		}else{
			tradeTask.revisionCollectMetal = false;
		}
		if($("#rev_trigger_chkbox").is(':checked')){
			tradeTask.revisionMetalPayRelease = true;
		}else{
			tradeTask.revisionMetalPayRelease = false;
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
		tradeObj.id = tradeId;
		tradeObj.tradeTask = tradeTask;
		return tradeObj;
	}
	
	/*this.setTableVisibility = function(){
		var releaseInstn = $('#table_header').attr('data-releaseinstn'),
		collectionInstn = $('#table_header').attr('data-collectioninstn'),
		paymentInstn = $('#table_header').attr('data-paymentinstn');
		if(releaseInstn==0){
			$('#release_inst_link').addClass('disabled_link');
			$('#release_inst_version').addClass('disabled_link');
			$('#release_inst_link').closest('tr').find('center,center span').addClass('disabled_link');
		}
		if(collectionInstn==0){
			$('#colln_and_del_instn_link').addClass('disabled_link');
			$('#colln_and_dlvry_inst_version').addClass('disabled_link');
			$('#colln_and_del_instn_link').closest('tr').find('center,center span').addClass('disabled_link');
		}
		if(paymentInstn==0){
			$('#metal_payment_inst_link').addClass('disabled_link');
			$('#metal_paymnt_inst_version').addClass('disabled_link');
			$('#metal_payment_inst_link').closest('tr').find('center,center span').addClass('disabled_link');
		}
	}*/
	
	/*this.getReleaseInstructionToSupplier = function(){
		$("#release_inst_link").click(function() {
			var tradeId = $('#header_notification_page').attr('data-tradeId');
			$(".container").load(BASE_URL+'/getReleaseInstructionPage?tradeId='+tradeId,function(){
				self.fnUpdateReleaseInstruction();
				self.common.openDateTimePicker();
			});
		});
	}*/
	
	/*this.getCollectionAndDeliveryInstruction = function(){
		$("#colln_and_del_instn_link").click(function() {
			var tradeId = $('#header_notification_page').attr('data-tradeId');
			$(".container").load(BASE_URL+'/getCollectionAndDeliveryInstructionPage?tradeId='+tradeId,function(){
				self.common.openDateTimePicker(); 
				self.common.cancelBtn();
			});
		});
	}*/
	/*this.fnUpdateReleaseInstruction = function(){
		$('#releaseInstructionSubmit').click(function(){
			$('#releaseInstructionSubmit').attr('disabled',true);
			var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			if(selectedOfferIds && selectedOfferIds.length >0){
				var releaseInstObj = self.getTradeObject(selectedOfferIds[0]);
				$.ajax({
			 		url : BASE_URL+'/updateReleaseInstruction',
			 		type: 'post',
		            cache: false,
		            contentType: false,
		            processData: false,
		            data: JSON.stringify(releaseInstObj), 
		            dataType: 'json',
		            contentType: 'application/json',
		            mimeType: 'application/json',
			 		success : function(response) {
			 			alert(response);
			 		}
			 	});
			}
		})
	}*/
	/*this.getMetalPaymentReleaseInstruction = function(){
		$("#metal_payment_inst_link").click(function() {
			var tradeId = $('#header_notification_page').attr('data-tradeId');
			$(".container").load(BASE_URL+'/getMetalPaymentReleaseInstruction?tradeId='+tradeId,function(){
				self.common.openDateTimePicker(); 
				self.common.cancelBtn();
			});
		});
	}*/
	
	/*this.pickDateCheckBox = function () {
		$('#datepicker_ul input[type="checkbox"]').click(function() {
		    switch($(this).attr('id')){
			    case 'civdCheck':
			    	$("#civd_picker").val(self.common.getCurrentDateFormat());
			    	if(!$('#civdCheck').is(':checked')){
			    		$("#civd_picker").val("");
//			    		$("#civd_picker").attr("disabled",true);
			    	}
			    	break;
		    }
		});
	}*/
	
	/*this.updateTradeTaskOnClick = function(){
		$('#inst_metal_colln_chkbox,#inst_metal_release_chkbox,#inst_metal_paymnt_chkbox,'+
				'#rev_release_chkbox,#rev_collect_chkbox,#rev_trigger_chkbox').change(function(){
			var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			if(selectedOfferIds && selectedOfferIds.length >0){
				var releaseInstObj = self.getTradeObject(selectedOfferIds[0]);
				$.ajax({
			 		url : BASE_URL+'/updateTradeTaskStatus',
			 		type: 'post',
		            cache: false,
		            contentType: false,
		            processData: false,
		            data: JSON.stringify(releaseInstObj), 
		            dataType: 'json',
		            contentType: 'application/json',
		            mimeType: 'application/json',
			 		success : function(response) {
			 			alert(response);
			 		}
			 	});
			}
		})
	}*/
	//new
	this.setDates = function(tradeId){
		self.setDatesCheckbox = $( "#civdCheck" );
		$('#civdCheck:not(.check_disabled)').on('click',function(){
			$('#popup-3').fadeIn(350);
			self.openCIVDate();
			$( ".close_modal_btn, #cancel_setDate_btn" ).click(function() {
		    	$('#popup-3').fadeOut(350);
		    	//self.setDatesCheckbox.prop("checked",false);
			});
		});
		self.saveDateAndInvoice(tradeId);
	}
	
	//new
	this.saveDateAndInvoice = function(tradeId){
		$('#submit_date_and_invoice_type').click(function(){
			if($("#civd_picker").val().length == 0){
	        	 $("#civd_picker").tooltip({
	        	        title: 'Required'
	        	    }).tooltip('show');
	        }else{
        	 	$("#civd_picker").tooltip('destroy');
        	 	var amPmVal = $('#am_pm_fix').val(),
	 			amPmText = $('#am_pm_fix option:selected').text(),
	 			invoiceVal = $('#invoice_type_ddl').val(),
	 			invoiceText = $('#invoice_type_ddl option:selected').text(),
	 			cusInvDate = $('#civd_picker').val(),
	 			thisTradeId;
        	 	self.setDatesCheckbox.prop("checked",false);
	 			$('#popup-3').fadeOut(350);
	 			if(tradeId[0]==undefined){
	 				thisTradeId = tradeId;
	 			}else{
	 				thisTradeId =  tradeId[0];
	 			}
	 			var obj={};
	 			obj['id'] = thisTradeId;
	 			obj['tradeInvoice'] = invoiceVal;
	 			obj['invoiceValuationDate'] = cusInvDate;
	 			obj['amPmFix'] = amPmVal,
	 			obj['amPmText'] = amPmText,
	 			obj['invoiceText'] = invoiceText;
	 			self.saveDatesAndCustomsInvoice(obj);
	        }
		})
	}
	
	//new
	this.saveDatesAndCustomsInvoice = function(obj){
		self.common.swLoader();
		$.ajax({
	 		url : BASE_URL+'/updateDatesAndCustomsInvoice',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: JSON.stringify(obj), 
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			if(response && response.actionStatus){
	 				self.showStatusAndSetFields(obj);
	 			}
	 		}
	 	});
	}
	
	//new
	this.showStatusAndSetFields= function(obj){
		swal({
	        title: "Success",
	        text:'',
	        type: "success" ,
	        confirmButtonColor: "#1ab394",
	        allowOutsideClick:false
	        },
	        function(){
	        	swal.closeModal();
	        	var tradeId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
	        	self.loadDT(tradeId[0]);
	        });
	}
	
	this.openCIVDate = function(){
		$('#bootstrap_CIVDPicker').datetimepicker({
			format: 'DD-MM-YYYY',
			widgetPositioning: {
	            horizontal: 'left',
	            vertical: 'top'
	        },
	        useCurrent: false,
	        minDate: moment(new Date()).startOf('day')
		});
	};
	this.instructionDetailsEdit = function(){
		//$('.ID_textarea').val($('.instruction_details p:not(".hidden")').text().trim());
	}
    this.init();
}