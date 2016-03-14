function common(commonNode){
	var self = this;
	var timeOut;
	var dataArray = [];
	var takenItems = [];
	var pendingItems = [];
	var lastChanged = "";
	//var oTable=null;
	this.urlHash = {
			BASE 		: $('#root_base_url').val(),
			SUPPLIER 	: $('#supplier_base_url').val(),
			CUSTOMER 	: $('#customer_base_url').val(),
			DEALER 		: $('#dealer_base_url').val(),
			OPERATOR 	: $('#operator_base_url').val()
	}
	this.criticalityHash = {
			critical:1,
			mediumCritical:2,
			nonCritical:3
	}
	this.countryCode = 'SZ';
	var baseUrl = self.urlHash.BASE;
	this.customerDatatableColumns = {
			offerId 	:1,
			metal 		:2,
			inventory 	:3,
			brand 		:4,
			purity 		:6,
			location 	:10,
			premium		:11,
			availability:12,
			expiry 		:13,
			weightRange : 9
	}
	this.supplierDatatableColumns = {
			offerId 	:1,
			metal 		:2,
			inventory 	:3,
			brand 		:4,
			purity 		:6,
			location 	:10,
			premium		:11,
			availability:12,
			expiry 		:13,
			weightRange : 9
	}
	this.dealerDatatableColumns = {
			offerId 	:2,
			metal 		:3,
			inventory 	:4,
			brand 		:5,
			purity 		:7,
			location 	:11,
			premium		:12,
			availability:13,
			expiry 		:14,
			weightRange : 10
	}
	this.customerDatatableColumnsRFQ = {
			offerId 	:1,
			metal 		:2,
			inventory 	:3,
			brand 		:4,
			purity 		:6,
			location 	:10,
			premium		:12,
			availability:13,
			expiry 		:14,
			offerType   :15,
			weightRange : 9
	}
	this.supplierDatatableColumnsRFQ = {
			offerId 	:1,
			metal 		:2,
			inventory 	:3,
			brand 		:4,
			purity 		:6,
			location 	:10,
			premium		:11,
			availability:12,
			expiry 		:13,
			offerType   :14,
			weightRange : 9
	}
	this.customerDatatableColumnsTrade = {
			tradeId		:1,
			metal 		:3,
			brand 		:4,
			inventory   :5,
			typeId 		:6,
			purity		:7,
			location	:11,
			premium     :13,
			tradeDate   :14,
			completedDate :15,
			tradeStatus :16 ,
			weightRange : 10
			
	}
	this.dealerDatatableColumnsDO = {
			offerId 	:1,
			metal 		:2,
			inventory 	:3,
			brand 		:4,
			purity 		:6,
			location 	:10,
			premium		:11,
			availability:12,
			expiry 		:13,
			weightRange : 9
	}
	this.dealerRFQDatatableColumnsCus = {
			offerId 	:2,
			metal 		:3,
			inventory 	:4,
			brand 		:5,
			purity 		:7,
			location 	:11,
			premium		:13,
			availability:14,
			expiry 		:15,
			weightRange : 10
	}
	this.dealerRFQDatatableColumnsSup = {
			offerId 	:2,
			metal 		:3,
			inventory 	:4,
			brand 		:5,
			purity 		:7,
			location 	:11,
			premium		:12,
			availability:13,
			expiry 		:14,
			weightRange : 10
	}
	this.dealerTradeDatatableColumns = {
			tradeId     :1,
			metal 		:2,
			brand 		:3,
			inventory 	:4,
			typeId		:5,
			purity 		:6,
			premium     :10,
			location 	:11,
			deliveryAddress:12,
			tradeDate   :13,
			completedDate :14,
			tradeStatus :15,
			weightRange : 9
			
	}
	this.operatorDatatableColumns = {
			offerId 	:1,
			metal 		:2,
			inventory 	:3,
			brand 		:4,
			purity 		:6,
			location 	:8,
			premium		:9,
			availability:10,
			expiry 		:11,
			weightRange : 10
	}
	this.dealerGroupsDataTableColumns = {
			groupId     :1,
			metal		:2,
			groupPremium :3
	}
	this.dealerCpmDataTableColumns = {
			accountId	:1,
			accountDesc	:2,
			groupId     :3,
			metal		:4,
			groupPremium :5,
			deleted		:6
	}
	this.queriesCustomerDatatableColumnsRFQ = {
			offerId 	:1,
			metal 		:2,
			inventory 	:3,
			brand 		:4,
			purity 		:6,
			location 	:10,
			premium		:12,
			availability:13,
			expiry 		:14,
			offerType   :15
	}
	this.tradesTitleDealer="Trade Id\t" +
							"Metal\t" +
							"Brand\t" +
							"Inventory\t" +
							"Type\tPurity\t" +
							"Quantity Type\t" +
							"Ounce Equivalent\t" +
							"Quantity\t" +
							"Source Location\t" +
							"Delivery Location\t" +
							"Trade Date\t" +
							"Completed/ETA Date\t" +
							"Status\t";
	this.tradesTitle="Trade Id\t" +
//							"Offer Id\t" +
							"Metal\t" +
							"Brand\t" +
							"Inventory\t" +
							"Type\tPurity\t" +
							"Quantity Type\t" +
							"Ounce Equivalent\t" +
							"Quantity\t" +
							"Source Location\t" +
							"Delivery Location\t" +
							"Premium($/Ounce)\t" +
							"Trade Date\t" +
							"Completed/ETA Date\t" +
							"Status\t";
	this.rootParent = commonNode;
	this.advSearchBox = $(commonNode).find(".advance_search_button");
	this.advSearchBtn = $(commonNode).find(".search_button_image");
	this.advSearchWrap = $(commonNode).find('.advanced_search_wrap');
	this.datatablePaginate = $(self.rootParent).find('.dataTables_paginate');
	this.advSearchSubmitBtn = $(self.rootParent).find('#advancedSearchSubmitButton');
	this.advanceSearchClose = $('.advanced_search_close');
	this.advancedSearchMetal = $(commonNode).find('#advancedSearchMetal');
	this.advancedSearchInventory = $(commonNode).find('#advancedSearchInventory');
	this.advancedSearchPurity = $(commonNode).find('#advancedSearchPurity');
	this.resetSearchField = $(commonNode).find('.search_reset_btn');

	 /* Initialize the module */
    this.init = function() {       
    	this.bind();
    };
    this.bind = function() {
    	self.loadDigitalClock();
		self.activeTabs();
		self.hiddenUploadBtn();
		self.closeErrorWindow();
		self.clickUpload();
		self.advSearchBtn.on('click',self.advanceSearch);	
		self.datatablePaginate.on('click', self.removeSelectAllCheck);
		self.advanceSearchClose.on('click', self.resetAdvanceSearchFields);
		self.mobileSideNav();
		self.resetSearchField.on('click',self.resetSearchResult);
		//self.clearCheckbox();
		setInterval(self.getNotification, 1000*60*5*10000000); // 5 minute
		self.prependZeroToDecimalInput();
    };
	this.dataTableSearch = function (a) {
		self.searchBtn = $(self.rootParent).find('.search_input');
		self.searchBtn.on("keyup", function() {
			oTable.columns(a).search(this.value).draw();
		});
		
	};
	this.dataTableSelectFilter = function (a) {
		self.selectFilter = $(self.rootParent).find('#statusFilter');
		self.selectFilter.on("change", function() {
			if(this.value == "ALL"){
				oTable.columns(a).search("").draw();
			}else{
				oTable.columns(a).search(this.value).draw();
			}
		});
		
	};
	this.loadDigitalClock = function(){
		$("#clock1").MyDigitClock({
			fontSize:13, 
			fontFamily:"Century gothic", 
			fontColor: "#000", 
			fontWeight:"bold", 
			bAmPm:true,
			background:'#fff',
			bShowHeartBeat:false
			});
	}
	this.setFormDefaults = function(formid){
		$('#'+formid+' input[type=text]').attr('autocomplete', 'off');
	}
	this.setLoader = function(){
		return  '<img src="'+self.urlHash['BASE'] +'/assets/static/images/ajax-loader.gif" style="margin-top:-12px;">';
	}
	this.resetAdvanceSearchFields = function () {
		self.advSearchWrap.find('input').val("");
		self.advSearchWrap.find('select').filter(":not(#advancedSearchMetal,#advancedSearchPurity,#advancedSearchInventory)").val(0);
		self.advSearchWrap.find('#advancedSearchSubmitButton').val("SEARCH");
		self.advSearchWrap.find('#advancedSearchInventory').val('');
		self.advSearchWrap.find('#advancedSearchPurity').val('');
		self.advSearchWrap.find('#advancedSearchPurity').empty();
		self.advancedSearchPurity.append('<option value>SELECT</option>');
		self.advSearchWrap.toggleClass('hide_advance_search');
		self.advSearchWrap.toggleClass('show_advance_search');
		self.advSearchBox.toggleClass('open_advance_search_button');
		self.advanceSearchClose.toggleClass('display_hide');
		self.fnResetAllFilters(oTable);
	}
	this.swLoader=function(){
		swal({
			title:"", 
			html:'<h4><b>Processing...</b></h4>'+
				 '<div id="sw-loading" class="col-md-12 col-sm-12 col-xs-12">'+
                 '<div class="spiner-example">'+
                 '<div class="sk-spinner sk-spinner-three-bounce">'+
                 '<div class="sk-bounce1"></div>'+
                 '<div class="sk-bounce2"></div>'+
                 '<div class="sk-bounce3"></div>'+
                 '</div></div></div>',
			showConfirmButton:false,      
			allowOutsideClick:false
			});
	}
	this.uploadDialog=function(){
		swal({
			title:"", 
			html:'<h4><b>Select the document to upload</b></h4></br></br>'+
				 '<label class="radio-inline"><input type="radio" name="optradio" value="bl" checked>Bar List </label>'+
			     '<label class="radio-inline"><input type="radio" name="optradio" value="co" >Certificate of Origin </label>'+
			     '<label class="radio-inline"><input type="radio" name="optradio" value="ca" >Certificate of Assay </label>',
			showConfirmButton:true,      
			allowOutsideClick:false,
			showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: "Upload",
            closeOnConfirm: false,
		    }, function () {
	        	$('#hiddenTradeDocUploadButton').click();
			});
	}
	this.deleteOfferCallback = function(deleteObj,currentTab,role,url){
		$.ajax({
	 		url : self.urlHash[role]+url,
	 		type: 'post',
	 		contentType: "application/json; charset=utf-8",
            cache: false,
            processData: false,
            data: JSON.stringify(deleteObj),
            dataType: 'json',
	 		success : function(response) {
	 			swal({
	                title: response.actionStatus == true ? "Deleted!" : "Failed",
	                text: response.actionStatus == true ? "Offer has been deleted" : response.msg,
	                type:  response.actionStatus == true ? "success" : "error",
	                confirmButtonColor: "#1ab394",
	                allowOutsideClick:false},
	                function () {
	                	 $('#'+currentTab).trigger('click');
	                });
	 		}, 
	 		error: function (response) {
	 			swal({
	                title: "Failed!",
	                text: "Offer could not be deleted",
	                type: "error",
	                confirmButtonColor: "#1ab394",
	                allowOutsideClick:false},
	                function () {
	                	 $('#'+currentTab).trigger('click');
	                });
	 	   }
	 	});
	}
	
	this.removeOfferCallback = function(removeObj,currentTab,role,url){
		$.ajax({
	 		url : self.urlHash[role]+url,
	 		type: "POST",
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(removeObj),
            dataType: 'json',
	 		success : function(response) {
	 			swal({
	                title: response.actionStatus == true ? "Removed!" : "Failed",
	                text: response.actionStatus == true ? "Offer has been removed" : response.msg,
	                type:  response.actionStatus == true ? "success" : "error",
	                confirmButtonColor: "#1ab394",
	                allowOutsideClick:false},
	                function () {
	                	 $('#'+currentTab).trigger('click');
	                });
	 		}, 
	 		error: function (response) {
	 			swal({
	                title: "Failed!",
	                text: "Offer couldnot be removed",
	                type: "error",
	                confirmButtonColor: "#1ab394",
	                allowOutsideClick:false},
	                function () {
	                	 $('#'+currentTab).trigger('click');
	                });
	 	   }
	 	});
	}
	
	this.customAlert = function(deleteObj,currentTab,role,url){
        swal({
            title: "",
            text: "Are you sure you want to delete the offer(s)?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: "Delete",
            closeOnConfirm: false,
            allowOutsideClick:false
        }, function () {
        	self.deleteOfferCallback(deleteObj,currentTab,role,url);
        });
	}
	
	this.customAlertRemove = function(removeObj,currentTab,role,url){
        swal({
            title: "",
            text: "Are you sure you want to remove the offer(s)?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: "Remove",
            closeOnConfirm: false,
            allowOutsideClick:false
        }, function () {
        	self.removeOfferCallback(removeObj,currentTab,role,url);
        });
	}
	
	this.rejectOffersCustomAlert = function(rejectObj,currentTab,role,url,isDelete){
        swal({
            title: "",
            text: "Are you sure you want to "+(isDelete ? "delete":"reject")+" the offer(s)?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: isDelete ? "Delete": "Reject",
            closeOnConfirm: false,
            allowOutsideClick:false
        }, function () {
        	self.rejectOfferCallback(rejectObj,currentTab,role,url,isDelete);
        });
	}
	
	this.repostOffersCustomAlert = function(selectedOfferIds,currentTab,role){
        swal({
            title: "",
            text: "Are you sure you want to repost the offer(s)?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: "Repost",
            closeOnConfirm: false,
            allowOutsideClick:false,
        }, function (isConfirm) {
        	if(isConfirm){
        		self.repostOfferCallback(selectedOfferIds,currentTab,role);
        	}else{
        		console.log('here');
        		$('#repost_form_reject_button').attr('disabled',false);
        	}
        	
        });
	}
	
	this.rejectOfferCallback = function(rejectObj,currentTab,role,url,isDelete){
		$.ajax({
	 		url : self.urlHash[role]+url,
	 		type: 'post',
	 		contentType: "application/json; charset=utf-8",
            cache: false,
            processData: false,
            data: JSON.stringify(rejectObj),
            dataType: 'json',
	 		success : function(response) {
	 			swal({
	                title: response.actionStatus == true ? (isDelete ? "Deleted!" :"Rejected!") : "Failed",
	                text:  "Offer has been "+(isDelete ? "deleted" :"rejected"),
	                type:  response.actionStatus == true ? "success" : "error",
	                confirmButtonColor: "#1ab394",
	                allowOutsideClick:false},
	                function () {
	                	 $('#'+currentTab).trigger('click');
	                });
	 		}, 
	 		error: function (response) {
	 			swal({
	                title: "Failed!",
	                text: "Offer couldnot be "+(isDelete ? "deleted" :"rejected"),
	                type: "error",
	                confirmButtonColor: "#1ab394",
	                allowOutsideClick:false},
	                function () {
	                	 $('#'+currentTab).trigger('click');
	                });
	 	   }
	 	});
	}
	
	this.repostOfferCallback = function(selectedOfferIds,currentTab,role){
		$.ajax({
	 		url : self.urlHash[role]+"/doRepost",
	 		type: 'post',
	 		contentType: "application/json; charset=utf-8",
            cache: false,
            processData: false,
            data: JSON.stringify(selectedOfferIds),
            dataType: 'json',
	 		success : function(response) {
	 			swal({
	                title: response.actionStatus == true ? "Reposted!" : "Failed",
	                text:  "Offer has been "+ response.statusMessage,
	                type:  response.actionStatus == true ? "success" : "error",
	                confirmButtonColor: "#1ab394",
	                allowOutsideClick:false},
	                function () {
	                	 $('#'+currentTab).trigger('click');
	                });
	 		}, 
	 		error: function (response) {
	 			swal({
	                title: "Failed!",
	                text: "Offer couldnot be reposted",
	                type: "error",
	                confirmButtonColor: "#1ab394",
	                allowOutsideClick:false},
	                function () {
	                	 $('#'+currentTab).trigger('click');
	                });
	 	   }
	 	});
	}
	this.advanceSearchSubmit = function(pageMode){
		self.advSearchSubmitBtn.unbind("click");
		self.advSearchSubmitBtn.on("click", function() {
			$(".search_reset_btn").css("display", "block");
			self.fnResetAllFilters(oTable);
			self.advSearchWrap.toggleClass('hide_advance_search');
			self.advSearchWrap.toggleClass('show_advance_search');
			self.advSearchBox.toggleClass('open_advance_search_button');
			self.advanceSearchClose.toggleClass('display_hide');
			
			switch(pageMode){
			case "CUSTOMER":
				getFiltersForDatatable(self.customerDatatableColumns); 
				break;
			case "CUSTOMER_RFQ":
				getFiltersForDatatable(self.customerDatatableColumnsRFQ);
				break;
			case "SUPPLIER":
				getFiltersForDatatable(self.supplierDatatableColumns);
				break;
			case "SUPPLIER_RFQ":
				getFiltersForDatatable(self.supplierDatatableColumnsRFQ);
				break;
			case "TRADE":
				getFiltersForDatatable(self.customerDatatableColumnsTrade);	
				break;
			case "DEALER_CUS_RFQ":
				getFiltersForDatatable(self.dealerRFQDatatableColumnsCus);	
				break;
			case "DEALER_SUP_RFQ":
				getFiltersForDatatable(self.dealerRFQDatatableColumnsSup);	
				break;
			case "DEALER_TRADE":
				getFiltersForDatatable(self.dealerTradeDatatableColumns);
				break;
			case "OPERATOR":
				getFiltersForDatatable(self.operatorDatatableColumns);	
				break;
			case "GROUPS":
				getFiltersForDatatable(self.dealerGroupsDataTableColumns);
				break;
			case "CPM":
					var activeInnerTab = $('.secondary-nav').find('li.active').attr('id');
					switch(activeInnerTab){
					case "confirmedOffers":
						getFiltersForDatatable(self.dealerDatatableColumns);
						break;
					case "unConfirmedOffers":
						getFiltersForDatatable(self.dealerDatatableColumns);
						break;
					case "DO":
						getFiltersForDatatable(self.dealerDatatableColumnsDO);
						break;
					default:
						getFiltersForDatatable(self.dealerCpmDataTableColumns);	
						break;
					}
				break;
			case "QUERIES_RFQ":
				getFiltersForDatatable(self.queriesCustomerDatatableColumnsRFQ);
				break;
			case "DEALER_DO":
				getFiltersForDatatable(self.dealerDatatableColumnsDO);
				break;
			default:
				getFiltersForDatatable(self.dealerDatatableColumns);
				break;
			}
		});
	};
	this.tradeTableSearch = function(a){
		$("#tradeStatus" ).change(function() {
			if(a=="DEALER_TRADE"){
			self.onTradeFilterSumbit(self.dealerTradeDatatableColumns);
			}else{
			self.onTradeFilterSumbit(self.customerDatatableColumnsTrade);
			}
		});
		$('#bootstrap_from_datetimepicker,#bootstrap_to_datetimepicker').on('dp.change', function() {
			if(a=="DEALER_TRADE"){
			self.onTradeFilterSumbit(self.dealerTradeDatatableColumns);
			}else{
			self.onTradeFilterSumbit(self.customerDatatableColumnsTrade);
			}
		});
	}
		
	this.onTradeFilterSumbit = function(columnMap){
		var tradeStatus=$('#tradeStatus option:selected').text();
		var tradeFrom=($('#from_datepicker').val().trim());
		var tradeTo=($('#to_datepicker').val().trim());
		var filters;
		if(tradeStatus=='ALL TRADES') {
			tradeStatus="";
		}
		if(tradeFrom == undefined || tradeFrom==''){
			tradeFrom = "01-01-1010";
		}
		if(tradeFrom == undefined || tradeFrom==''){
			tradeTo = "31-12-2999";
		}
		filters=oTable.columns(columnMap.tradeStatus).search(tradeStatus);
		filters=oTable.columns(columnMap.tradeDate).search("@"+tradeFrom+"@"+tradeTo.split(" ")[0]);
		
		if(filters) 
            filters.draw();
        
	}
	
	function getFiltersForDatatable(columnMap){
		var offerId = $('#advancedSearchOfferId').val().trim(),
		typeId = $('#advancedSearchTypeId option:selected').val(),
		weightRange = $('#advancedSearchWeight option:selected').val(),
		tradeId = $('#advancedSearchTradeId').val().trim(),
		premium = $('#advancedSearchPremium').val().trim(),
		tradeStatus = $('#advancedSearchTradeStatus option:selected').text(),
		tradeDate = $('#advancedSearchTradeDate').val().trim(),
		completedDate =$('#advancedSearchCompletedDate').val().trim(),
    	expiryDate = $('#advancedSearchExpiry').val().trim(),
    	availDate = $('#advancedSearchAvailability').val().trim(),
    	//Cpm - groups advanced search
    	accountId = $('#advancedSearchAccountId').val().trim(),
    	accountDesc = $('#advancedSearchAccountDescription').val().trim(),
    	groupId = $('#advancedSearchGroups').val().trim(),
    	groupPremium = $('#advancedSearchPremiumGroup').val().trim(),
    	expiryDateUTC = expiryDate,
		filters;
		$('#advancedSearchOfferId').val(offerId);
		$('#advancedSearchTypeId').val(typeId);
    	$('#advancedSearchExpiry').val(expiryDate);
    	$('#advancedSearchCompletedDate').val(completedDate);
    	$('#tradeDate').val(tradeDate);
    	if(!!completedDate){
    		completedDate = self.setDateToUTC(completedDate);
		}
    	$('#advancedSearchAvailability').val(availDate);
		if(!!expiryDate){
			expiryDateUTC = self.setDateToUTC(expiryDate);
		}
		if(tradeStatus=='ALL TRADES') {
			tradeStatus="";
		}
		//Premium Group / Cpm fields
		if(accountId!='') {
    		filters=oTable.columns(columnMap.accountId).search(accountId);
    	}
		if(accountDesc!='') {
    		filters=oTable.columns(columnMap.accountDesc).search(accountDesc);
    	}
		if(groupId!='') {
    		filters=oTable.columns(columnMap.groupId).search(groupId);
    	}
		if(weightRange!='' && weightRange!='0') {
    		filters=oTable.columns(columnMap.weightRange).search(weightRange);
    	}
		if(groupPremium!='') {
    		filters=oTable.columns(columnMap.groupPremium).search(groupPremium);
    	}
		if(offerId!='') {
    		filters=oTable.columns(columnMap.offerId).search(offerId);
    	}
		if(tradeId!=''){
			filters=oTable.columns(columnMap.tradeId).search(tradeId);
		}
		if(premium!=''){
			filters=oTable.columns(columnMap.premium).search(premium);
		}
		if(!!columnMap.tradeStatus && tradeStatus!='SELECT'){
			filters=oTable.columns(columnMap.tradeStatus).search(tradeStatus);
		}
		if(tradeDate!=''){
			filters=oTable.columns(columnMap.tradeDate).search("#"+tradeDate);
		}
		if(completedDate!=''){
			filters=oTable.columns(columnMap.completedDate).search("#"+completedDate);
		}
    	if($('#advancedSearchMetal').val()!='0') {
    		filters=oTable.columns(columnMap.metal).search($('#advancedSearchMetal option:selected').text());
    	}
    	if($('#advancedSearchBrand').val()!='0') {
    		filters=oTable.columns(columnMap.brand).search($('#advancedSearchBrand option:selected').text());
    	}
    	if(!!$('#advancedSearchTypeId').val()) {
    		filters=oTable.columns(columnMap.typeId).search($('#advancedSearchTypeId option:selected').text());
    	}
    	if($('#advancedSearchInventory').val()!='0' && $('#advancedSearchInventory').val()!= "") {
    		filters=oTable.columns(columnMap.inventory).search($('#advancedSearchInventory option:selected').text());
    	}
    	if(!!$('#advancedSearchPurity').val()) {
    		filters=oTable.columns(columnMap.purity).search($('#advancedSearchPurity option:selected').text());
    	}
    	if($('#advancedSearchSourceLocation').val()!='0') {
    		filters=oTable.columns(columnMap.location).search($('#advancedSearchSourceLocation option:selected').text());
    	}
    	if(availDate!='') {
    		filters=oTable.columns(columnMap.availability).search('#'+availDate);
    	}
    	if(expiryDate!='') {
    		filters=oTable.columns(columnMap.expiry).search('#'+expiryDateUTC);
    	}
    	if(filters) {
            filters.draw();
        }else{
        	oTable.columns(columnMap.offerId).search(this.value).draw();
        }
	}
	
	this.fnResetAllFilters = function(oTable) {
	    oTable.columns().eq( 0 ).each( function ( colIdx ) {
	    	if(oTable.column( colIdx ).footer()) 
	            $( 'input', oTable.column( colIdx ).footer() ).val(''); 
	            oTable.columns(colIdx).search( '', true ); 
	        }
	    );
	    oTable.search( '', true ).draw(); 
	}
	
	this.advanceSearch = function(){
		self.advSearchWrap.toggleClass('hide_advance_search');
		self.advSearchWrap.toggleClass('show_advance_search');
		self.advSearchBox.toggleClass('open_advance_search_button');
		self.advanceSearchClose.toggleClass('display_hide');
		self.openDatePickerAdvacned();
		/*self.advancedSearchMetal.on('change', function() {
			  var option = $(this).find('option:selected').val();
			  if(option !== '0'){
				  self.getInventoryData(option,"advancedSearchInventory");
			  }
			  else{
				  $('#advancedSearchPurity').empty();
				  $('#advancedSearchInventory').empty();
				  $('#advancedSearchPurity').append('<option value>SELECT</option>');
				  $('#advancedSearchInventory').append('<option value>SELECT</option>');
			  }
			});*/
		self.advancedSearchInventory.on('change', function() {
			  var inventoryCode = $(this).find('option:selected').val();
			  var metalCode = self.advancedSearchMetal.find('option:selected').val();
			  if(inventoryCode !== '0'){
				  self.getPurityData(inventoryCode,metalCode,"advancedSearchPurity");
			  }else{
				  $('#advancedSearchPurity').empty();
				  $('#advancedSearchPurity').append('<option value>SELECT</option>');
			  }
			});
		self.advancedSearchPurity.on('change', function() {
			  var option = $(this).find('option:selected').val();
			  var metal = $(self.advancedSearchMetal).find('option:selected').val();
			  if((option !== '0') && (option.length !== 0)){
				  self.getInventoryData(option,metal,"advancedSearchInventory");
			  }
			});
		$('.datepicker').hide();
	};
	
	this.openDatePicker = function(){
		$('#bootstrap_datepicker').datetimepicker({
			format: 'DD-MM-YYYY',
			widgetPositioning: {
	            horizontal: 'left',
	            vertical: 'top'
	        },
	        useCurrent: false,
	        minDate: moment(new Date()).startOf('day')
		});
		if($('#bootstrap_datepicker').children().length > 0){
			$('#bootstrap_datepicker').children()[0].value = document.getElementsByName('availability')[0].getAttribute('value');
		}
		$('#bootstrap_datetimepicker').datetimepicker({
			widgetPositioning: {
	            horizontal: 'left',
	            vertical: 'top'
	        },
	        format: 'DD-MM-YYYY HH:mm',
	        useCurrent: false,
	        minDate: moment(new Date()).startOf('day')
		});
		/* ******close of datetimepicker  delete if not need****/
		
		/*$('#bootstrap_datetimepicker').on('click',function(){
			$('.day').on('click',function(){
				$('.bootstrap-datetimepicker-widget').hide();
				//$('.intl-wrapper').trigger('click');
			})
		});*/
		
		/*$("#bootstrap_datepicker").on("dp.change", function (e) {
			var currentDate = moment().format();
            $('#bootstrap_datetimepicker').data("DateTimePicker").minDate(currentDate);
        });*/
        /*$("#bootstrap_datetimepicker").on("dp.change", function (e) {
            $('#bootstrap_datepicker').data("DateTimePicker").maxDate(e.date);
		});*/
    };

		this.openDateTimePicker = function(){
			  var date=new Date();
			  var previousMonthDate=new Date((date.getMonth())+"-"+date.getDate()+"-"+date.getFullYear());
		$('#bootstrap_from_datetimepicker').datetimepicker({
		widgetPositioning: {
		           horizontal: 'left',
		           vertical: 'bottom'
		       },
		       format: 'DD-MM-YYYY',
		       useCurrent: false
		})
		$('#bootstrap_ETAPicker').datetimepicker({
		widgetPositioning: {
		           horizontal: 'left',
		           vertical: 'bottom'
		       },
		       format: 'DD-MM-YYYY',
		       useCurrent: false,
		       minDate: new Date()
		})
		$('#bootstrap_SCDPicker').datetimepicker({
		widgetPositioning: {
		           horizontal: 'left',
		           vertical: 'bottom'
		       },
		       format: 'DD-MM-YYYY',
		       useCurrent: false,
		       minDate: new Date()
		})
		$('#bootstrap_CCDPicker').datetimepicker({
		widgetPositioning: {
		           horizontal: 'left',
		           vertical: 'bottom'
		       },
		       format: 'DD-MM-YYYY',
		       useCurrent: false,
		       minDate: new Date()
		})
			$('#bootstrap_MRDPicker').datetimepicker({
		widgetPositioning: {
		           horizontal: 'left',
		           vertical: 'bottom'
		       },
		       format: 'DD-MM-YYYY',
		       useCurrent: false,
		       minDate: new Date()
		})
		
	   $('#bootstrap_CIVDPicker').datetimepicker({
		widgetPositioning: {
		           horizontal: 'left',
		           vertical: 'bottom'
		       },
		       format: 'DD-MM-YYYY',
		       useCurrent: false,
		       minDate: new Date()
		})
		$('#bootstrap_to_datetimepicker').datetimepicker({
		widgetPositioning: {
		           horizontal: 'left',
		           vertical: 'bottom'
		       },
		       format: 'DD-MM-YYYY',
		       useCurrent: false
		})
		$('#bootstrap_datepicker').datetimepicker({
		widgetPositioning: {
		           horizontal: 'left',
		           vertical: 'bottom'
		       },
		       format: 'DD-MM-YYYY',
		       useCurrent: false
		})
		};
	this.openDatePickerAdvacned = function(){
		$('#bootstrap_datepicker').datetimepicker({
			format: 'DD-MM-YYYY',
			widgetPositioning: {
	            horizontal: 'left',
	            vertical: 'bottom'
	        },
	        useCurrent: false
		});
		$('#bootstrap_trade_datepicker').datetimepicker({
			format: 'DD-MM-YYYY',
			widgetPositioning: {
	            horizontal: 'left',
	            vertical: 'bottom'
	        },
	        useCurrent: false
		});
		$('#bootstrap_eta_datepicker').datetimepicker({
			format: 'DD-MM-YYYY HH:mm',
			widgetPositioning: {
	            horizontal: 'left',
	            vertical: 'bottom'
	        },
	        useCurrent: false
		});
		$('#bootstrap_datetimepicker').datetimepicker({
			widgetPositioning: {
	            horizontal: 'left',
	            vertical: 'bottom'
	        },
	        format: 'DD-MM-YYYY HH:mm',
	        useCurrent: false
		});
		/*$("#bootstrap_datepicker").on("dp.change", function (e) {
            $('#bootstrap_datetimepicker').data("DateTimePicker").minDate(e.date);
        });
        $("#bootstrap_datetimepicker").on("dp.change", function (e) {
            $('#bootstrap_datepicker').data("DateTimePicker").maxDate(e.date);
		});*/
	};
	
	this.openPhysicalCollectionDate = function(){
		$('#bootstrap_PCDPicker').datetimepicker({
			format: 'DD-MM-YYYY',
			widgetPositioning: {
	            horizontal: 'left',
	            vertical: 'top'
	        },
	        useCurrent: false,
	        minDate: moment(new Date()).startOf('day')
		});
		/*$('#bootstrap_newPCDatePicker').datetimepicker({
			format: 'DD-MM-YYYY',
			widgetPositioning: {
	            horizontal: 'left',
	            vertical: 'top'
	        },
	        useCurrent: false,
	        minDate: moment(new Date()).startOf('day')
		});*/
	};
	this.activeTabs = function(){
		$(".primary-nav,.hidden_nav_tabs").find("li").click(function(){
			$(".primary-nav,.hidden_nav_tabs").find(".active").removeClass("active");
			$(".primary-nav,.hidden_nav_tabs").find("li").removeClass("active_li");
			var activeTabId = $(this).children('a').attr('id');
			$(".primary-nav,.hidden_nav_tabs").find('#'+activeTabId).parent().addClass("active_li");
			$(".primary-nav,.hidden_nav_tabs").find('#'+activeTabId).addClass("active");
		});
	};
	this.clickUpload = function() {
		$("#uploadBtn").on('click', function(){ 
			$('#hiddenUploadButton').click();
		});
	}
	this.uploadDoc = function(){
		$("#uploadBtn").on('click', function(){ 
			$('#hiddenDocUploadButton').click();
		});
	} 
	
	this.uploadTradeDoc = function(){
			$('#hiddenDocUploadButton').click();
	}  
	this.airwayBillUpload = function(){
		$('#hiddenDashDocUploadButton').click();
}  
    this.closeErrorWindow = function(){
    	$('.error-window-btn').on('click', function(){
        	$('#error-window').removeClass('display_block');
        	$('#error-window').addClass('display_hide');
        });
    }
    this.hiddenDocUploadBtn = function(){
		$('#hiddenDocUploadButton').change(function() {
			self.generalUplaodAction(this);
		});
    }
    
    
    this.generalUplaodAction = function(buttonId){
		 var fileName = $(buttonId).prop("files")[0].name,
		 fileSize=$(buttonId).prop("files")[0].size,
		 fileNameWithOutExtension = fileName.split('.')[0],
		 fileExtension = buttonId.value,
	     isValidFileName = checkFileNameValid(fileNameWithOutExtension,fileSize),
	     fileExtension = fileExtension.substring(fileExtension.lastIndexOf('.'));
		 tab = $(".primary-nav").find(".active")[0].id;
		if(isValidFileName == true){ 
			var isValidFile = checkFileExtensionValidForDoc(this, fileExtension);
			if(isValidFile == true){
				if(page=="operator"){
					self.operatorPreUploadCheck();
				}else{
					self.fileUploadAction();
				}
			}
		}
    }
    
    this.fileUploadAction = function(){
    	self.swLoader();
    	var tab = $(".primary-nav").find(".active")[0].id;
    	if($('#hiddenDocUploadButton').length > 0){
        	var filePath = $('#hiddenDocUploadButton').val(),
    	    formData = new FormData(),
    	    fileData = $("#hiddenDocUploadButton").prop("files")[0];
    	}else{
        	var filePath = $('#hiddenDashDocUploadButton').val(),
    	    formData = new FormData(),
    	    fileData = $("#hiddenDashDocUploadButton").prop("files")[0];
    	}
	    formData.append("file", fileData);
	    $('#hiddenDashDocUploadButton').val('');
	    self.uploadDocSubmit(formData, getUploadUrl(page,tab), getId(page, tab));
    }
    
    this.fileUploadActionCertificate = function(certificateType){
    	self.swLoader();
    	var tab = $(".primary-nav").find(".active")[0].id;
    	var filePath = $('#hiddenTradeDocUploadButton').val(),
	    formData = new FormData(),
	    fileData = $("#hiddenTradeDocUploadButton").prop("files")[0];
	    formData.append("file", fileData);
	    self.swLoader();
	    self.uploadDocSubmit(formData, getUploadUrlCertificate(page,tab,certificateType), getId(page, tab));
    }
    
	this.operatorPreUploadCheck = function(){
		self.swLoader();
		var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : null;
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: self.urlHash.OPERATOR+"/checkIfAirwayBillExistsForTrade?tradeId="+selectedOfferIds[0],
			success: function(response){
				if(response == false){
					self.fileUploadAction();	
				}else{
					swal({
		                title: "",
		                text: "Airway bill already uploaded for this trade.",
		                type: "error",
		                confirmButtonColor: "#1ab394",
		                allowOutsideClick:false},
					    function(){
		                	swal.closeModal();
		                	  $('#hiddenDashDocUploadButton').val('');
		                	var tabId = $(".tab.active").attr("id");
		                	$("#"+tabId).trigger('click');
		            });
				}
			}
		});
	}
    
    this.tradeDocUploadChange = function(){
    	self.barListUpload();
    	$('#hiddenTradeDocUploadButton').change(function() {
        	var selectedFileType = $("input[name='optradio']:checked").val();
    		var airwayBill = 'airway bill',
    	    barList = 'bar list',
    	    cOfOrigin = 'certificate of origin',
    	    cOfAssay = 'certificate of assay',
    	    returnURL = '';
    		var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : null;
    		if(selectedOfferIds){
    			returnURL = '/checkIfDocExistsForTrade?tradeId='+selectedOfferIds[0]+'&fileType=';
    			switch(selectedFileType){
    				case "bl":
    					returnURL += barList;
    					break;
    				case "co":
    					returnURL += cOfOrigin;
    					break;
    				case "ca":
    					returnURL += cOfAssay;
    					break;
    				default:
    					console.log("Invalid checkbox value");
    					break;
    			}
    			self.manageUpload(returnURL,this)
    		}
		});
    }
    
    this.preFileUploadCheck = function(returnURL,fileType,fileElement,fileExtension){
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: self.urlHash.BASE+returnURL,
			success: function(response){
				if(response == true){
					switch(fileType){
					case 'coo':
						self.fileUploadActionCertificate("coo");
						break
					case 'coa':
						self.fileUploadActionCertificate("coa");
						break
					default:
						self.manageBarlistUpload(fileElement,fileExtension);
						break
					}
				}else{
					swal({
		                title: "",
		                text: "Document already uploaded for this trade.",
		                type: "error",
		                confirmButtonColor: "#1ab394",
		                allowOutsideClick:false},
					    function(){
		                	swal.closeModal();
		                	var tabId = $(".tab.active").attr("id");
		                	$("#"+tabId).trigger('click');
		            });
				}
			}
		});
    }
    
    
    this.manageUpload = function(returnURL,currentElement){
		var selectedFileType = $("input[name='optradio']:checked").val();
		self.swLoader();
		var fileName = $(currentElement).prop("files")[0].name,
		fileSize=$(currentElement).prop("files")[0].size,
		 fileNameWithOutExtension = fileName.split('.')[0],
		 fileExtension = currentElement.value,
	     isValidFileName = checkFileNameValid(fileNameWithOutExtension,fileSize),
	     fileExtension = fileExtension.substring(fileExtension.lastIndexOf('.'));
		if(isValidFileName == true){
			switch(selectedFileType){
			case "co":
				var certificateType = "coo";
				if(isValidFileName === true){
					var isValidFile = checkFileExtensionValidForDoc(currentElement, fileExtension);
					if(isValidFile === true){
						self.preFileUploadCheck(returnURL,"coo",currentElement,fileExtension)
					}
				}
				break;
			case "ca":
				var certificateType = "coa";
				if(isValidFileName === true){
					var isValidFile = checkFileExtensionValidForDoc(currentElement, fileExtension);
					if(isValidFile === true){
						self.preFileUploadCheck(returnURL,"coa",currentElement,fileExtension)
					}
				}
				break;
			default:
				self.preFileUploadCheck(returnURL,"bl",currentElement,fileExtension)
				break;
			  
			}
		}
	
    }
    self.manageBarlistUpload = function(fileElement,fileExtension){
		var validExtensions = new Array(".xls");
		if(self.checkFileIsXLS(fileExtension,validExtensions)){
			 dataArray=[];
			  var file = $(fileElement).prop("files")[0];
			  var files = $(fileElement).prop("files");
			  var tabId = $(".primary-nav").find(".active")[0].id;
			  var i,f;
			  for (i = 0, f = files[i]; i != files.length; ++i) {
			    var reader = new FileReader();
			    var name = f.name;
			    reader.onload = function(e) {
			      var data = e.target.result;
			      try{
			    	  var workbook = XLS.read(data, {type: 'binary'});
				  	  var result = {};
					  workbook.SheetNames.forEach(function(sheetName) {
						var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
						if(roa.length > 0){
							result[sheetName] = roa;
						}
					  });
				      //var csv = XLS.utils.sheet_to_csv(workbook.Sheets[sheetName]);
					  var sheetName = workbook.SheetNames[0];
					  var dataObj =  workbook.Sheets[sheetName];
					  var columnCount =   dataObj['!range'].e.c;
					  var regex = /^[a-zA-Z]+[1]*$/;
					  for(var k in dataObj) {
						  if (regex.test(k)){
							  var item = dataObj[k].v;
							  dataArray.push(item.replace(/\"/g, ""));
						  }
					  }
					  console.log(dataArray);
					  self.getBarlistHeader();
			      }catch(e){
			    	  self.uploadExcptnErr("Unsupported XLS format!",tabId);
			    	  $('#'+tabId).trigger('click');
			      }
			    };
			    reader.readAsBinaryString(f);
			  }
			//self.uploadFile();
		}
    }
    
    this.populateSelectData = function(response){
    	$(".populateArea").html("");
    	var poplateData = "";
    	var i = 0;
    	 for(var k in response) {
				  poplateData = poplateData +' <div class="form-group"> <label class="col-xs-4 control-label">'+k+'</label>'+
				                '<div class="col-xs-6 selectContainer"><select data-attr="'+i+'" key-attr="'+k+'" prev-attr="SELECT" name="colors" class="form-control modal-select">'+
				                ' <option value="">SELECT</option></select></div></div>';
				  i++;
		  }
    	 $(".populateArea").append(poplateData);
    	 for(var loopCount = 0;loopCount < dataArray.length;loopCount++){
    		 $(".modal-select").append('<option value='+dataArray[loopCount]+'>'+dataArray[loopCount].replace(/\"/g, "")+'</option>')
    	 }
    	// var targeted_popup_class = jQuery(this).attr('data-popup-open');
    	 swal.closeModal();
         $('[data-popup="popup-1"]').fadeIn(350);
         self.closeDataModal();
         self.resetModal();
         self.selectModalOnchange();
         //self.barListUpload();
    }
    
    self.barListUpload = function(){
    	$('#bar_upload').unbind('click');
    	$('#bar_upload').on('click', function(e)  {
    		e.preventDefault();
    		var count = 0;
    		var selectList = $(".populateArea").find('select');
    		var keyPair = {};
  			$(selectList).each(function(){
  				var selected = $(this).find('option:selected').text();
  				if(selected == "SELECT"){
  					count++;
  				}else{
  					var key = $(this).attr('key-attr');
  					keyPair[key] = jQuery.inArray(selected,dataArray);
  				}
  			});
  			if(count == 0){
  				$(this).unbind( "click" );
  				self.barListFileUpload(keyPair);
  			}
        });
    }
    self.getBarlistHeader =  function(){
    	self.swLoader();
		$.ajax({
	 		url : baseUrl+'/getBarListHeaders',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			self.populateSelectData(response);
	 		}
	 	});
    }
    
    self.selectModalOnchange=function(){
    	takenItems = [];
    	pendingItems = [];
    	lastChanged = "";
    	 $(".modal-select").on('change', function() {
    		 var selectedVal = $(this).find('option:selected').text();
    		 var currentElement = $(this).attr('data-attr');
    		 if(selectedVal !== "SELECT"){
    			 if(currentElement == lastChanged){
        			 takenItems.pop();
        		 }
    			 takenItems.push(selectedVal);
        		 lastChanged = currentElement;
    			 var lastValue = $(this).find('option:last-child').text();
    			 if((jQuery.inArray(lastValue,pendingItems) == -1)&&(jQuery.inArray(lastValue,takenItems) !== -1)){
    				 var indexId = jQuery.inArray(lastValue,takenItems);
    				 takenItems.splice(indexId, 1);
    				 pendingItems.push(lastValue)
    			 }
    			 for(var loopCount = 0;loopCount < dataArray.length;loopCount++){
    					 if(jQuery.inArray(dataArray[loopCount],pendingItems) == -1){
    						 if(jQuery.inArray(dataArray[loopCount],takenItems) == -1){
    							  pendingItems.push(dataArray[loopCount])
    						 }
    					 }
    					 else if(jQuery.inArray(selectedVal,pendingItems) !== -1){
    						 var indexId = jQuery.inArray(selectedVal,pendingItems);
    						 pendingItems.splice(indexId, 1);
    					 }
    			 }
    			 //console.log(pendingItems);
    			 self.modifySelectData(currentElement);
   			
    		 }else{
    			 //var lastValue = $(this).find('option:last-child').text();
    			 var lastValue = $(this).attr('prev-attr');
    			 var indexId = jQuery.inArray(lastValue,takenItems);
    			 if(indexId !== -1){
    				 takenItems.splice(indexId, 1);
    				 if(jQuery.inArray(lastValue,pendingItems) == -1){
						  pendingItems.push(lastValue)
					 }
    				 //console.log(pendingItems);
    				 self.modifySelectData(currentElement);
    			 }
    		 }
    		 $(this).attr('prev-attr',selectedVal);
    	 });
    }
    
    self.modifySelectData =  function(currentElement){
		   var selectList = $(".populateArea").find('select').filter(":not([data-attr='"+currentElement+"'])");
  			$(selectList).each(function(){
  				var html = ""
  				var selected = $(this).find('option:selected').text();
  				$(this).empty();
  				$(this).append("<option value=''>SELECT</option>");
  				for(var loopCount = 0;loopCount < pendingItems.length;loopCount++){
  					if(selected !== pendingItems[loopCount])
	   				 html = html + '<option value='+pendingItems[loopCount].replace(/\"/g, "")+'>'+pendingItems[loopCount].replace(/\"/g, "")+'</option>'
	   		       }
  				$(this).append(html);
  				if(selected !== 'SELECT'){
  					$(this).append('<option value='+selected+' selected>'+selected.replace(/\"/g, "")+'</option>')
  				}
  			});
    }
    
    self.closeDataModal = function(){
    	$('#close_modal_btn').on('click', function(e)  {
    		self.cancelPopAction();
        });
    	$('#cancel_modal').on('click', function(e)  {
    		self.cancelPopAction();
    		self.resetFields(this);
        });
    }
    
    self.resetModal = function(){
    	$('#reset_modal').on('click', function(e)  {
    		takenItems = [];
        	pendingItems = [];
        	lastChanged = "";
        	var html = "";
        	$(".modal-select").empty();
        	for(var loopCount = 0;loopCount < dataArray.length;loopCount++){
   				 html = html + '<option value='+dataArray[loopCount].replace(/\"/g, "")+'>'+dataArray[loopCount].replace(/\"/g, "")+'</option>'
   		       }
        	$(".modal-select").append("<option value='' selected>SELECT</option>"+html);
        });
    }
    
    self.cancelPopAction = function(){
    	 takenItems = [];
    	 pendingItems = [];
    	 lastChanged = "";
    	 $('[data-popup="popup-1"]').fadeOut(350);
         $('#hiddenTradeDocUploadButton').val("");
    }
    
    this.uploadFile = function(){
    	self.swLoader();
		var filePath = $('#hiddenTradeDocUploadButton').val(),
	    formData = new FormData(),
	    fileData = $("#hiddenTradeDocUploadButton").prop("files")[0];
		var tab = $(".primary-nav").find(".active")[0].id;
	    formData.append("file", fileData);
	    self.uploadDocSubmit(formData, getUploadUrl(page,tab), getId(page, tab));
    }
    
    this.barListFileUpload = function(keyPair){
		var filePath = $('#hiddenTradeDocUploadButton').val(),
	    formData = new FormData(),
	    fileData = $("#hiddenTradeDocUploadButton").prop("files")[0];
		var tab = $(".primary-nav").find(".active")[0].id;
	    formData.append("file", fileData);
	    formData.append("headerMap", JSON.stringify(keyPair));
	    self.cancelPopAction();
	    self.swLoader();
	    if(tab=="dashboard"){
	    	tab = $("#chartElement").val();
	    }
	    self.uploadBarlistDocSubmit(formData, getId(page, tab));
    }
    
	this.hiddenUploadBtn = function(){
		$('#hiddenUploadButton').change(function() {
			var fileName = $(this).prop("files")[0].name,
			 fileNameWithOutExtension = fileName.split('.')[0],
			 fileSize=$(this).prop("files")[0].size,
			 fileExtension = this.value,
		     isValidFileName = checkFileNameValid(fileNameWithOutExtension,fileSize),
		     fileExtension = fileExtension.substring(fileExtension.lastIndexOf('.'));
			 isValidFile = checkFileExtensionValid(this, fileExtension),
			 tab = $(".primary-nav").find(".active")[0].id;
			if(isValidFile == true && isValidFileName == true){ 
				self.swLoader();
				var filePath = $('#hiddenUploadButton').val(),
			    formData = new FormData(),
			    fileData = $("#hiddenUploadButton").prop("files")[0];
			    formData.append("file", fileData);
			    callAjaxToParseExcelFile(formData, getOfferUrl(page,tab), getId(page, tab));
			}
			
		});
		
	}
	
	function getUploadUrl( page, selectedTab, certificateType ){
		var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : null;
		var returnURL = 'docUpload',
		    airwayBill = 'airway bill',
		    barList = 'bar list',
		    cOfOrigin = 'certificate of origin',
		    cOfAssay = 'certificate of assay';
		if(selectedTab=='trade' && page == 'operator')
		   returnURL=returnURL+'?tradeId='+selectedOfferIds[0]+'&fileType='+airwayBill;
		else if(selectedTab=='trade' && page == 'supplier')
		   returnURL = 'supplierBarListUpload?tradeId='+selectedOfferIds[0]+'&fileType='+barList;
		else if(selectedTab=='trade' && page == 'supplier' && certificateType == 'coo')
			returnURL = 'supplierBarListUpload?tradeId='+selectedOfferIds[0]+'&fileType='+cOfOrigin;
		else if(selectedTab=='dashboard' && page == 'operator')
			returnURL=returnURL+'?tradeId='+selectedOfferIds[0]+'&fileType='+airwayBill;
		
		return returnURL;
	}
	
	function getUploadUrlCertificate( page, selectedTab, certificateType ){
		var selectedOfferIds = [];
		if($("#selected_offer_id").val().length > 0){
			selectedOfferIds = JSON.parse($("#selected_offer_id").val());
		}else{
			selectedOfferIds.push($("#selected_upload_id").val());
		}
	    var cOfOrigin = 'certificate of origin',
		    cOfAssay = 'certificate of assay';
		if((selectedTab=='trade' || selectedTab=='dashboard') && page == 'supplier' && certificateType == 'coo')
			returnURL = 'supplierCertificateUpload?tradeId='+selectedOfferIds[0]+'&fileType='+cOfOrigin;
		else if((selectedTab=='trade' || selectedTab=='dashboard') && page == 'supplier' && certificateType == 'coa')
			returnURL = 'supplierCertificateUpload?tradeId='+selectedOfferIds[0]+'&fileType='+cOfAssay;
		else if(selectedTab=='trade' && page == 'dealer' && certificateType == 'coo')
			returnURL = 'dealerCertificateUpload?tradeId='+selectedOfferIds[0]+'&fileType='+cOfOrigin;
		else if(selectedTab=='trade' && page == 'dealer' && certificateType == 'coa')
			returnURL = 'dealerCertificateUpload?tradeId='+selectedOfferIds[0]+'&fileType='+cOfAssay;
		return returnURL;
	}
	
	function checkFileNameValid(fileNameWithOutExtension,fileSize){ 
	    var regArray  = ["|", "?",".", "\"", "*", ":", "<", ">", "\\"];
	    if(fileNameWithOutExtension.trim().length > 0){
	    	 if(fileNameWithOutExtension.trim().length > 40){
	    		 var errMsg = "Filename must be less than 40 characters";
		         self.invalidFileNameAlert(errMsg);
			     return false;
	    	 }else{
	 	    	if(parseInt(fileSize) > 4194304){
		    		var errMsg = "Choose a file less than size 4Mb";
		        	self.invalidFileNameAlert(errMsg);
			    	return false;
		    	}else{
				    for (var i = 0; i < regArray.length; i++) {
				        if(fileNameWithOutExtension.indexOf(regArray[i]) != -1){
				        	var errMsg = "File name should not contain special characters  ? . : * < > | '\'";
				        	self.invalidFileNameAlert(errMsg);
				        	return false;
				        }
				    }
		    	}
	    	 }
	    }else{
	    	var errMsg = "Please enter filename";
        	self.invalidFileNameAlert(errMsg);
	    	return false;
	    }
	    return true;
	}
	
	this.invalidFileNameAlert = function(errMsg){
		swal({
            title: "Invalid file slected",
            text: errMsg,
            type: "error",
            confirmButtonColor: "#1ab394",
            allowOutsideClick:false},
	        function(){
            	 $('#hiddenTradeDocUploadButton').val('');
            	 $('#hiddenDocUploadButton').val('');
          });
	}
	
	function getId(page, selectedTab){ 
		var returnId = '';
		if( (page == 'supplier' || page == 'dealer') && selectedTab=='confirmedOffers' ){ 
			returnId = '#confirmedOffers';
		}else if( (page == 'supplier' || page == 'dealer') && selectedTab=='unConfirmedOffers'){  
			returnId = '#unConfirmedOffers';
		}else if( (page == 'customer' || page == 'dealer') && selectedTab == 'rfq'){
			returnId = '#rfq';
		}else if( (page == 'operator' || page == 'dealer' || 'supplier') && selectedTab == 'trade'){
			returnId = '#trade';
		}else if(selectedTab=="dashboard"){
			returnId = $("#chartElement").val();
		}else{
			returnId = selectedTab;
		}
		return returnId;
	}
	
	function getOfferUrl(page, selectedTab){
		var returnURL = '';
		if(selectedTab=='confirmedOffers' && page == 'supplier'){ 
			returnURL = '/supplierConfirmedUpload';
		}else if( selectedTab=='unConfirmedOffers' && page == 'supplier'){  
			returnURL = '/supplierUnconfirmedUpload';
		}else if(selectedTab == 'rfq' && page == 'customer'){
			returnURL = '/customerRfqUpload';
		}else if(selectedTab=='confirmedOffers' && page == 'dealer'){
			returnURL = '/dealerConfirmedUpload';
		}else if(selectedTab=='unConfirmedOffers' && page == 'dealer'){   
			returnURL = '/dealerUnconfirmedUpload';
		}else if(selectedTab == 'rfq' && page == 'dealer'){  
			returnURL = '/dealerRfqUpload';
		}
		returnURL=returnURL+'?tz='+self.getTZData();
		return returnURL;
	}
	
	this.removeSelectAllCheck = function(){
		$('.select_all_check').removeAttr('checked');
		return false;
	}
	
	function checkFileExtensionValid(thisAtChange, fileExtension) { 
		var validExtensions = new Array(".xls", ".csv");
	    if (validExtensions.indexOf(fileExtension) < 0) {
 			swal({
                title: "Invalid file slected",
                text:"Select files of" +validExtensions.toString()+ " types.",
                type: "error",
                confirmButtonColor: "#1ab394",
                allowOutsideClick:false},
                function(){
               	 $('#hiddenTradeDocUploadButton').val('');
               	 $('#hiddenDocUploadButton').val('');
              });
	        return false;
	      }
	    else return true;
	    
	}
	this.checkFileIsXLS = function(fileExtension,validExtensions){
	    if (validExtensions.indexOf(fileExtension) < 0) {
	    	self.invalodFileNameAlert(validExtensions);
	        return false;
	      }
	    else 
	    	return true;
	}
	
	this.invalodFileNameAlert = function(validExtensions){
			swal({
                title: "Invalid file slected",
                text:"Select files of" +validExtensions.toString()+ " types.",
                type: "error",
                confirmButtonColor: "#1ab394",
                allowOutsideClick:false},
                function(){
                  	 $('#hiddenTradeDocUploadButton').val('');
                  	 $('#hiddenDocUploadButton').val('');
              });
	}
	function checkFileExtensionValidForDoc(thisAtChange, fileExtension) { 
		var validExtensions = new Array(".pdf");
	    if (validExtensions.indexOf(fileExtension) < 0) {
	    	self.invalodFileNameAlert(validExtensions);
	        return false;
	      }
	    else return true;
	    
	}
	this.getInventoryDataList = function(inventoryId){
		var inventoryDataList = [];
		$("#"+inventoryId+" > option").each(function() {
			if(this.value.length > 0)
			    inventoryDataList.push(this.value)
		});
		return inventoryDataList;
	}
	
	this.getInventoryData = function(purityItem,metalItem,inventoryId){
	 	$.ajax({
	 		url : baseUrl+'/getInventories?metalCode='+metalItem+"&purityCode="+purityItem,
	 		type: 'get',
	 		success : function(response) {
	 			var resultData = self.getInventoryDataList(inventoryId);
	 			$('#'+inventoryId).empty();
	 			//$('#'+inventoryId).append('<option value>SELECT</option>');
	 			$('#'+inventoryId).append('<option value>SELECT</option>');
	 			$.each(response, function (i, item) {
	 				var index = jQuery.inArray( item, resultData );
	 				if( index !== -1){
	 					resultData.splice(index, 1);
	 				}
	 				$('#'+inventoryId).append('<option value="'+item+'" selected>'+item+'</option>');
	 			});
	 			$.each(resultData, function (i, item) {
	 				$('#'+inventoryId).append('<option value="'+item+'">'+item+'</option>');
	 			});
	 			//$('#'+inventoryId).fireEvent("onchange");
	 		}, error: function (response) {
	 			console.log(response);
	 	    }
	 	});
	}
	this.getPurityData = function(inventoryCode,metalCode,purityId){
	 	$.ajax({
	 		url : baseUrl+'/getPurities?metalCode='+metalCode+'&inventoryCode='+inventoryCode,
	 		type: 'get',
	 		success : function(response) {
	 			$('#'+purityId).empty();
                if(response.length > 1){
                	$('#'+purityId).append('<option value>SELECT</option>');
                }
	 			$.each(response, function (i, item) {
	 				$('#'+purityId).append('<option value="'+item+'">'+item+'</option>');
	 			});
	 			
	 		}, error: function (response) {
	 			console.log(response);
	 	    }
	 	});
	}
	
	this.selectOnChange = function(){
		//Dynamic dropdown changes
		this.addOfferMetal = $('#offerMetal');
		this.addOfferInventory = $('#offerInventory');
		this.addOfferPurity = $('#offerPurity');
		/*this.addOfferMetal.on('change', function() {
			  var option = $(this).find('option:selected').val();
			  if(option !== '0'){
				  self.getInventoryData(option,"offerInventory");
			  }
			  else{
				  $('#offerPurity').empty();
				  $('#offerInventory').empty();
				  $('#offerPurity').append('<option value>SELECT</option>');
				  $('#offerInventory').append('<option value>SELECT</option>');
			  }
			});*/
		this.addOfferInventory.on('change', function() {
			  var inventory = $(this).find('option:selected').val();
			  var metalCode = $('#offerMetal').val();
			  if(metalCode !== '0'){
				  self.getPurityData(inventory,metalCode,"offerPurity");
			  }
			});
		this.addOfferPurity.on('change', function() {
			  var option = $(this).find('option:selected').val();
			  var metal = $(self.addOfferMetal).find('option:selected').val();
			  if((option !== '0') && (option.length !== 0)){
				  self.getInventoryData(option,metal,"offerInventory");
			  }
			});
		//end
	}
	
	this.getURLValue = function(selectedTab){
		var returnURL = '';
		if(selectedTab=='confirmedOffers'){
			returnURL = '/getDealerOfferEditForm';
		}else if(selectedTab=='unConfirmedOffers'){
			returnURL = '/getDealerPreOfferEditForm';
		}
		return returnURL;
	}
	
	this.uploadDocSubmit = function( formData, url, tabId ){
	 	$.ajax({
	 		url : url,
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            data: formData, 
	 		success : function(response) {
	 			if(response.status == true){
	 				self.successAlert(response,tabId);
	 			}else{
	 				self.errorAlert(response,tabId);
	 			}
	 		},
	 		error:function(err){
	 			self.errorAlert(err,tabId);
	 		}

	 	});
	
	}
	
	this.uploadBarlistDocSubmit = function( formData, tabId ){
		var tradeId = "";
		if($("#selected_offer_id").val().length > 0){
			var tradeIdArray = JSON.parse($("#selected_offer_id").val());
			tradeId = tradeIdArray[0];
		}else{
			tradeId = $("#selected_upload_id").val();
		}
	 	$.ajax({
	 		url : baseUrl+'/getExcelHeaderMap?headerMap='+formData.headerMap+'&tradeId='+tradeId,
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            data: formData,
	 		success : function(response) {
	 			$("#selected_upload_id").val('');
	 			if(response.actionStatus== true)
	 			 self.successAlert(response,tabId);
	 			else
	 			 self.errorAlert(response,tabId);	
	 		},
	 		error: function(response){
	 			$("#selected_upload_id").val('');
	 			self.errorAlert(response,tabId);
	 		}
	 	
	 	});
	}
	self.triggerCurrentTabClick = function(tabId){
		self.getNotification();
		switch(tabId){
		case 'canvas1':
			self.loadCriticalData();
			break;
		case 'canvas2':
			self.loadMediumCriticalData();
			break;
		case 'canvas3':
			self.loadNonCriticalData();
			break;
		default:
			$(tabId).trigger('click');
			break;
		}
	}
	
	self.addClickToChart = function(){
	    $("#canvas1").click(function(evt){
	    	self.loadCriticalData();
	    });
	    $("#canvas2").click(function(evt){
	    	self.loadMediumCriticalData();
	    });
	    $("#canvas3").click(function(evt){
	    	self.loadNonCriticalData();
	    });
	}
	
	this.getCurrentDashboardTab = function(){
		//if ($(".sub_tab_wrap li.active").length > 0) {
		if ($("#dashBard_inner_tab").length > 0) {
			//return $(".sub_tab_wrap li.active").attr("id");
			return $("#dashBard_inner_tab").val();
		}else{
			return "";
		}
	}
	self.setTableHeader = function(){
		var pending_text = "";
		switch($("#dashBard_inner_tab").val()){
		case 'TT':
			pending_text = "Track Tasks";
			break;
		case 'DA':
			pending_text = "Document Approval";
			break;
		case 'DU':
			pending_text = "Document Upload";
			break;
		default :
			pending_text = "Track Tasks";
			break;
		}
		$("#pending_header").html(pending_text);
	}
	
	self.triggerCriticalData = function(){
		$(".inner_container").load(self.urlHash.BASE+'/getPendingActionsTable?criticality=critical&innerTab='+self.getCurrentDashboardTab(), function(){
			$("#dashBard_current_chart").val('canvas1');
			self.setTableHeader();
			self.rootParent.loadPendingActionsTable();
    		self.rootParent.tradeDocUploadChange();
    	});
	}
	
	self.triggerMediumCriticalData = function(){
		$(".inner_container").load(self.urlHash.BASE+'/getPendingActionsTable?criticality=mediumCritical&innerTab='+self.getCurrentDashboardTab(), function(){
			$("#dashBard_current_chart").val('canvas2');
			self.setTableHeader();
			self.rootParent.loadPendingActionsTable();
    		self.rootParent.tradeDocUploadChange();
    	});
	}
	
	self.triggerNonCriticalData = function(){
		$(".inner_container").load(self.urlHash.BASE+'/getPendingActionsTable?criticality=nonCritical&innerTab='+self.getCurrentDashboardTab(), function(){
			$("#dashBard_current_chart").val('canvas3');
			self.setTableHeader();
			self.rootParent.loadPendingActionsTable();
    		self.rootParent.tradeDocUploadChange();
    	});
	}
	
	self.loadCriticalData =  function(){
		if($("#canvas1").attr('data-count') !== undefined){
			if(parseInt($("#canvas1").attr('data-count')) > 0){
				self.triggerCriticalData();
			}
		}else{
			self.triggerCriticalData();
		}
	}
	self.loadMediumCriticalData =  function(){
		if($("#canvas2").attr('data-count') !== undefined){
			if(parseInt($("#canvas2").attr('data-count')) > 0){
				self.triggerMediumCriticalData();
			}
		}else{
			self.triggerMediumCriticalData();
		}
	}
	self.loadNonCriticalData =  function(){
		if($("#canvas3").attr('data-count') !== undefined){
			if(parseInt($("#canvas3").attr('data-count')) > 0){
				self.triggerNonCriticalData();
			}
		}else{
			self.triggerNonCriticalData();
		}
	}
	
	self.successAlert = function(response,tabId){
		swal({
	        title: "Success",
	        text:response.message,
	        type: "success" ,
	        confirmButtonColor: "#1ab394",
	        allowOutsideClick:false},
	        function(){
	        	if ( tabId.indexOf('canvas') !== -1 ){
	        		self.rootParent.goDashBoard($("#dashBard_inner_tab").val(),$("#dashBard_current_chart").val());
	        	}else{
	        		self.triggerCurrentTabClick(tabId);
	        	}
	    });
	}
	self.errorAlert = function(response,tabId){
		swal({
            title: "Failed",
            text:response.message||"File is corrupted. Please clear contents and try again.",
            type: "error" ,
            confirmButtonColor: "#1ab394",
            allowOutsideClick:false},
            function(){
            	self.triggerCurrentTabClick(tabId);
        });
	}
	
	function callAjaxToParseExcelFile(formData, url, tabId) {
	 	$.ajax({
	 		url : baseUrl+url,
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            data: formData, 
	 		success : function(response) {
	 			if(response.status == true){
		 			swal({
		                title: "Success",
		                text:response.message,
		                type: "success" ,
		                confirmButtonColor: "#1ab394",
		                allowOutsideClick:false},
		                function(){
		                	$(tabId).trigger('click');
		                });
	 			}else{
	 				self.uploadExcptnErr(response.message,tabId);
	 			}
	 		},error:function(err){
	 			self.uploadExcptnErr("Something went wrong while uploading...",tabId);
	 		}

	 	});
	};
	
	this.uploadExcptnErr = function(msg,tabId){
			swal({
                title: "Failed",
                text:msg||"File is corrupted. Please clear file contents excluding headers and try again.",
                type: "error" ,
                confirmButtonColor: "#1ab394",
                allowOutsideClick:false},
                function(){
                	$(tabId).trigger('click');
                });
	}
	/*addnew validation and submit*/
	this.validateForm = function(){
	self.setFormDefaults('add_new_offer');
	$('#add_offer_button').click(function(){
		$.validator.addMethod("numberCheck", function (value, element) {
	        return !isNaN(value);
	    });
		$.validator.addMethod("countCheck", function (value, element) {
	        return value > 0;
	    });
		$.validator.addMethod("decimalCheck", function (value, element) {
			var regex = /^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$/g;
		    if (!regex.test(value)) {
		    	return false;
		    }else{
				return true;
			}
	    });
		$.validator.addMethod("expiryCheck", function (value, element) {
			var availability = $('[name="availability"]').val();
			if((availability.trim().length !=0)){
				 return self.validateExpiryAndValidity();
			}else{
				return true;
			}
	    });
		$.validator.addMethod("isExpired", function (value, element) {
			var expiry = $('[name="expiry"]').val();
			if(expiry.trim().length !=0){
				 return self.isExpired();
			}else{
				return true;
			}
	    });
		$.validator.addMethod("isDecimal", function (value, element) {
			if(value % 1 != 0){
				return false;
			}else{
				return true;
			}
	    });	
		$.validator.addMethod("lengthCheck", function (value, element) {
			 var count = value.length;
			if(count != 0){
				if(count > 250){
					return false;
				}else{
					return true;
				}
			}else{
				return true;
			}
	    });	
		
        $("#add_new_offer").validate({
            rules: {
            	account:"required",
            	supplier: "required",
            	metal: "required",
	        	inventory: "required",
	        	brand: "required",
	        	type: "required",
	        	quantity:  {
	        		required: true,
	        		numberCheck: true,
	        		countCheck:true,
	        		maxlength: 6,
	        		isDecimal:true
	            },
	            purity: "required",
	        	deliveryLocation: "required",
	        	sourceLocation: "required",
	        	premium:  {
	        		required: true,
	        		numberCheck: true,
	        		maxlength: 8,
	        		decimalCheck: true
	            },
	        	availability: {
	        		required : true,
	        		expiryCheck:true
	        	},
	        	deliveryAddress:"lengthCheck",
	        	expiry:  {
	        		required: true,
	        		isExpired:true
	            }
            },
            messages: {
            	account:"Required",
	        	supplier: "Required",
	        	metal: "Required",
	        	inventory: "Required",
	        	brand: "Required",
	        	type: "Required",
	        	quantity: {
	                required: "Required",
	                numberCheck: "Please enter a number",
	                countCheck: "Value should be greater than zero",
	                maxlength: "Maximum of 6 digit number is allowed",
	                isDecimal: "Decimal not allowed"
	            },
	            purity: "Required",
	        	deliveryLocation: "Required",
	        	sourceLocation: "Required",
	        	premium: {
	                required: "Required",
	                numberCheck: "Please enter a number",
	                maxlength: "Maximum of 6 digit number is allowed",
	                countCheck: "Value should be greater than zero",
	                decimalCheck: "Only 2 decimal points are allowed"
	            },
	            availability: {
	                required: "Required",
	                expiryCheck: "Availability date should be later than or equal to the Expiry date"
	            },
	        	deliveryAddress:"Maximum of 250 characters",
	        	expiry: {
	                required: "Required",
	                isExpired:"Expiry date should be later than or equal to the Current date"
	            }
            },
           /* errorElement: "p",*/
            tooltip_options: {
            	account: { placement: 'right' },
            	supplier: { placement: 'right' },
            	metal: { placement: 'right' },
            	inventory: { placement: 'right' },
            	brand: { placement: 'top' },
            	type: { placement: 'right' },
            	quantity: { placement: 'right' },
            	purity: { placement: 'top' },
            	deliveryLocation: { placement: 'right' },
            	sourceLocation: { placement: 'top' },
            	premium: { placement: 'top' },
            	availability: { placement: 'top' },
            	deliveryAddress: { placement: 'right' },
            	expiry: { placement: 'top' },
             },
            submitHandler: function(form) {
				$('.instance-timezone').val(self.getTZData());
				if(self.validateExpiryAndValidity()){/*
					swal({
			            title: "",
			            text: "The Expiry date is less than the Availability date, do you wish to continue?",
			            type: "warning",
			            showCancelButton: true,
			            confirmButtonColor: "#1ab394",
			            confirmButtonText: "Yes",
			            cancelButtonText: "No",
			            closeOnConfirm: true,
			            allowOutsideClick:false
			        }, function (isConfirm) {
			        	if(isConfirm){
			        		form.submit();
			        	}else{
			        		return false;
			        	}
			        });
				*/
					form.submit();
					}else{
					return true;
				}
            }
        });
		});
	}
	/*addnew validation and submit*/
	this.validateDRFQForm = function(){
	self.setFormDefaults('add_new_drfq');
	$('#drfq_confirm_button').click(function(){
		var previousquantity = $("#quantity_prev_val").val();
		$.validator.addMethod("prevCheck", function (value, element) {
				 if(parseInt(value) <= parseInt(previousquantity)){
					 return true;
				 }else{
					 return false;
				 }
	    },"DRFQ quantity should be less than or equal to Unconfirmed Offer quantity, "+previousquantity);
		$.validator.addMethod("expiryCheck", function (value, element) {
			var availability = $('[name="availability"]').val();
			//var availability = $("#drfq_availability").html();
			if(availability.trim().length !=0){
				 return self.validateExpiryAndValidity();
			}else{
				return true;
			}
	    });
		$.validator.addMethod("drfqExpiryCheck", function (value, element) {
			var availability = $('[name="availability"]').val();
			//var availability = $("#drfq_availability").html();
			if(availability.trim().length !=0){
				 return self.validateDRFQExpiryAvailability();
			}else{
				return true;
			}
	    });
		$.validator.addMethod("isExpired", function (value, element) {
			var expiry = $('[name="expiry"]').val();
			if(expiry.trim().length !=0){
				 return self.isExpired();
			}else{
				return true;
			}
	    });
		$.validator.addMethod("numberCheck", function (value, element) {
	        return !isNaN(value);
	    });
		$.validator.addMethod("countCheck", function (value, element) {
			if(value.trim().length !=0){
				return value > 0;
			}else{
				return true;
			}
	        
	    });
		$.validator.addMethod("decimalCheck", function (value, element) {
			var regex = /^(?:\d*\.\d{1,2}|\d+)$/;
			if(value.trim().length!=0){
				if (!regex.test(value)) {
			    	return false;
			    }else{
					return true;
				}
			}else{
				return true;
			}
	    });		
		$.validator.addMethod("isDecimal", function (value, element) {
			if(value % 1 != 0){
				return false;
			}else{
				return true;
			}
	    });	
		$.validator.addMethod("premiumMaxPremiumCheck", function (value, element) {
			var premiumVal = $('#drfq_premium').attr('data-attr');
			if(value!=""){
				if(parseFloat(value) <= parseFloat(premiumVal)){
					 return true;
				 }else{
					 return false;
				 }
			}else{
				return true;
			}
		},"Max Premium should not be greater than Offer Premium");
        $("#add_new_drfq").validate({
            rules: {
            	availability:  {
            		required: true,
            		expiryCheck: true
	            },
            	expiry:  {
            		required: true,
            		isExpired:true,
            		drfqExpiryCheck: true
            		//expiryCheck: true
	            },
	        	maxPremium:  {
	        		numberCheck: true,
	        		maxlength: 6,
	        		countCheck:true,
	        		decimalCheck: true,
	        		premiumMaxPremiumCheck:true
	            },
	        	quantity:  {
	        		required: true,
	        		numberCheck: true,
	        		countCheck:true,
	        		maxlength: 6,
	        		isDecimal:true,
	        		prevCheck:true
	            }
            },
            messages: {
            	availability: {
            		required: "Required",
            		expiryCheck: "Availability date should be later than or equal to the Expiry date"
            	
	            },
            	expiry: {
            		required: "Required",
            		isExpired:"Expiry date should be later than or equal to the Current date",
            		drfqExpiryCheck: "DRFQ expiry should be within the expiry of the unconfirmed offer."
	            },
            	maxPremium: {
	                numberCheck: "Please enter a number",
	                maxlength: "Maximum of 6 digit number is allowed",
	                countCheck: "Value should be greater than zero",
	                decimalCheck: "Only 2 decimal points are allowed",
	                countCheck: "Value should be greater than zero",
	            },
	        	quantity: {
	                required: "Required",
	                numberCheck: "Please enter a number",
	                countCheck: "Value should be greater than zero",
	                maxlength: "Maximum of 6 digit number is allowed",
	                isDecimal: "Decimal not allowed"
	            }
            },
            errorElement: "p",
            tooltip_options: {
            	expiry: {
            		required: {placement: 'right'},
            		drfqExpiryCheck: {placement: 'top'}
            		},
            	maxPremium: { placement: 'right' },
            	quantity: { placement: 'right' },
            	
             },
            submitHandler: function(form) {
				$('.instance-timezone').val(self.getTZData());
				if(self.validateExpiryAndValidity()){/*
					swal({
			            title: "",
			            text: "The Expiry date is less than the Availability date, do you wish to continue?",
			            type: "warning",
			            showCancelButton: true,
			            confirmButtonColor: "#1ab394",
			            confirmButtonText: "Yes",
			            cancelButtonText: "No",
			            closeOnConfirm: true,
			            allowOutsideClick:false
			        }, function (isConfirm) {
			        	   if(isConfirm){
			        		 form.submit();
			        	   }else{
			        		 return false;
			        	   }
			        });
				*/
					form.submit();	
				}/*else if(!self.validateDRFQExpiryAvailability()){
					swal({
			            title: "",
			            text: "DRFQ expiry should be within the expiry of the unconfirmed offer.",
			            type: "error",
			            type: "error" ,
		                confirmButtonColor: "#1ab394",
		                allowOutsideClick:false},
		                function(){
		                	swal.closeModal();
		                });
			        
				}*/
				
				else{
					return true;
				}
            }
        });
		});
	}
	/*addnew validation and submit*/
	this.validateSupplierDRFQForm = function(){
	self.setFormDefaults('add_new_drfq');
	$('#drfq_confirm_button').click(function(){
		var previousquantity = $("#prev_quantity").val();
		$.validator.addMethod("prevCheck", function (value, element) {
				 if(parseInt(value) <= parseInt(previousquantity)){
					 return true;
				 }else{
					 return false;
				 }
	    },"Quantity Exceeds Submitted RFQ, "+previousquantity);
		$.validator.addMethod("numberCheck", function (value, element) {
	        return !isNaN(value);
	    });
		$.validator.addMethod("countCheck", function (value, element) {
			if(value.trim().length !=0){
				return value > 0;
			}else{
				return true;
			}
	        
	    });
		$.validator.addMethod("isExpired", function (value, element) {
			var expiry = $('[name="expiry"]').val();
			if(expiry.trim().length !=0){
				 return self.isExpired();
			}else{
				return true;
			}
	    });
		$.validator.addMethod("decimalCheck", function (value, element) {
			if(value !== "0"){
				var regex = /^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$/g;
			    if (!regex.test(value)) {
			    	return false;
			    }else{
					return true;
				}
			}else{
				return true;
			}
	    });		
		$.validator.addMethod("zerocheck", function (value, element) {
			if(value !== "0"){
				return true;
			}else{
				return false;
			}
	    });	
		$.validator.addMethod("isDecimal", function (value, element) {
			if(value % 1 != 0){
				return false;
			}else{
				return true;
			}
	    });	
		$.validator.addMethod("expiryCheck", function (value, element) {
			var availability = $('[name="availability"]').val();
			if(availability.trim().length !=0){
				 return self.validateExpiryAndValidity();
			}else{
				return true;
			}
	    });
        $("#add_new_drfq").validate({
            rules: {
            	premium:  {
            		required: true,
	        		numberCheck: true,
	        		maxlength: 6,
	        		zerocheck:true,
	        		decimalCheck: true
	            },
	        	quantity:  {
	        		required: true,
	        		numberCheck: true,
	        		countCheck:true,
	        		maxlength: 6,
	        		isDecimal:true,
	        		prevCheck:true
	            },
	            availability:{
	            	required: true,
	            	expiryCheck:true
	            },
	            expiry:{
	            	required: true,
	            	isExpired:true
	            }
            },
            messages: {
            	premium: {
            		required: "Required",
	                numberCheck: "Please enter a number",
	                maxlength: "Maximum of 6 digit number is allowed",
	                countCheck: "Value should be greater than zero",
	                zerocheck: "Value must not be equal to zero",
	                decimalCheck: "Only 2 decimal points are allowed"
	            },
	        	quantity: {
	                required: "Required",
	                numberCheck: "Please enter a number",
	                countCheck: "Value should be greater than zero",
	                maxlength: "Maximum of 6 digit number is allowed",
	                isDecimal: "Decimal not allowed"
	            },
	            availability: {
	                required: "Required",
	                expiryCheck: "Availability date should be later than or equal to the Expiry date"
	                
	            },
	            expiry: {
	                required: "Required",
	                isExpired:"Expiry date should be later than or equal to the Current date",
	            }
            },
           // errorElement: "p",
            tooltip_options: {
            	premium: { placement: 'right' },
            	quantity: { placement: 'top' },
             },
            submitHandler: function(form) {
            	$('.instance-timezone').val(self.getTZData());
				if(self.validateExpiryAndValidity()){/*
					swal({
			            title: "",
			            text: "The Expiry date is less than the Availability date, do you wish to continue?",
			            type: "warning",
			            showCancelButton: true,
			            confirmButtonColor: "#1ab394",
			            confirmButtonText: "Yes",
			            cancelButtonText: "No",
			            closeOnConfirm: true,
			            allowOutsideClick:false
			        }, function (isConfirm) {
			        	   if(isConfirm){
			        		 form.submit();
			        	   }else{
			        		 return false;
			        	   }
			        });
				*/
					 form.submit();
					}else{
					return true;
				}
            }
        });
		});
	}
    this.formatDateddMMYYYY = function(dateInMillisecs){
		var date = new Date(Number(dateInMillisecs));
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		month = (month+1).toString().length > 1 ? month+1 : '0' + (month+1);
		day = day.toString().length > 1 ? day : '0' + day;

		return (day + '-' + (month) + '-' + year);
	}
	this.fnResubmit = function(selectedOffers,currentTab){
		if(self.checkIfOfferIdExists(selectedOffers)){
			$("#add_new_offer li").each(function(){
				if(currentTab=='rfq'){
				$(this).find('select, input, textarea').each(function(){
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
					});
			}

	}
	
    /*Get formatted(dd-mm-yyyy hh:mm) date in local TZ from date in millisecs*/
    this.formatDateddMMYYYYHHmm = function(dateInMillisecs){
    	var date = new Date(Number(dateInMillisecs));
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var seconds = date.getSeconds();
		month = (month+1).toString().length > 1 ? month+1 : '0' + (month+1);
		day = day.toString().length > 1 ? day : '0' + day;
		hour = hour.toString().length > 1 ? hour : '0' + hour;
		minute = minute.toString().length > 1 ? minute : '0' + minute;
		return (day + '-' + (month) + '-' + year + " " + hour + ":" + minute);
	}
    
    /* Render function for each expiry field */
    this.renderCountdown = function( selector ){
            self.countDownImpl( selector );
    }

    this.checkTableEmpty = function(){
    	if(oTable.data().length==0){
    		this.datatablePaginate.hide();
    		$('.dataTables_length').hide();
    	}else{
    		this.datatablePaginate.show();
    		$('.dataTables_length').show();
    	}
    }
    
    /* jQuery countdown plugin */
    this.countDownImpl = function( selector ) {
    	var dateInMillisecs = selector.textContent;
    	var serverTimestamp = Number(dateInMillisecs);
    	if(serverTimestamp!=0){
			var serverDate = new Date(serverTimestamp);
			var parsedTime = self.formatDateddMMYYYYHHmm(serverTimestamp);
			var countdownFormat = 'yowDHM';
			var layout;
			$(selector).countdown({
				until:serverDate,
				format: countdownFormat,
			   	significant:3,
			   	labels:['Y', 'M', 'W', 'D', 'H', 'M', 'S'],
			   	labels1:['Y', 'M', 'W', 'D', 'H', 'M', 'S'],
			   	layout:'<span class="count_down_top_span countdown-section"><b>'+
			   	'{y<}{yn}{yl}{y>} {o<}{on}{ol}{o>} {w<}{wn}{wl}{w>} {d<}{dn}{dl}{d>} {h<}{hn}{hl}{h>} {m<}{mn}{ml}{m>} </b></span>'
			   	+'<span class="count_down_bottom_span countdown-section">'+ parsedTime +'</span>',
			   	onTick: function(){
			   		var currentDate = new Date();
			   		if( (serverDate.getTime() - (3600000 * 12)) < currentDate.getTime()){
						$(selector).find('.count_down_top_span').addClass('color-red');
					}
			   		else if( (serverDate.getTime() - (3600000 * 24)) < currentDate.getTime()){
						$(selector).find('.count_down_top_span').addClass('color-amber');
					}
			   	},
				onExpiry: function() { oTable.draw(); }
			});	
    	}
	}
    
    this.populatePopupData = function() {
        var postOfferDiv = $('.offer_wrapper');
        if ($("#selected_offers").val() != "") {
        	var checkedOffers = $("#selected_offers").val().trim().length !=0 ? JSON.parse($("#selected_offers").val()) : null;
            var count = 1;
            var loopCount = 1;
            var errSpan = $('<span class="error-span"/>').appendTo(postOfferDiv);
            $.each(checkedOffers, function(i, v) {
                if (v != null) {
                    var popupData = self.postPopupData(v);
                    var ul = $('<ul class="clear-both populate-div"/>').appendTo(postOfferDiv);
                    var selectedTab = $('.tab.active').attr('id');
                    var offerType;
                    var firstLi = "";
                    if (selectedTab == "rfq") {
                        offerType = "RFQ ";
                        firstLi = $('<li class="col-md-12 col-sm-12 col-xs-12"/>').text(offerType + (count++)).appendTo(ul);
                    } else if(selectedTab == "DO"){
                    	 offerType = "Offer ";
                         firstLi = $('<li class="col-md-12 col-sm-12 col-xs-12"/>').text(offerType + (count++)).appendTo(ul);
                         var offerIdLi = '<li class="col-md-4 col-sm-6 col-xs-12"><label>OfferId</label><h3>'+v.offerId+'</h3></li>';
                         ul.append(offerIdLi);
                    }else {
                        offerType = "Offer ";
                        firstLi = $('<li class="col-md-12 col-sm-12 col-xs-12"/>').text(offerType+(count++)).appendTo(ul);
                    }
                   
                    $.each(popupData, function(key, data) {
                        if (key.substr(0, 1) != "<" && key != "id") {
                            var li;
                            if (key == "Expiry") {
                                li = $('<li class="expr col-md-4 col-sm-6 col-xs-12"/>').appendTo(ul);
                            } else if (key == "Source Location") {
                                li = $('<li class="src col-md-4 col-sm-6 col-xs-12"/>').appendTo(ul);
                            } else if (key == "cmntAtrea") {
                                li = $('<li class="src col-md-12 col-sm-12 col-xs-12" style="border:none;"/>').appendTo(ul);
                            } else if ((key == "") || (key == " ") || (key == "  ")) {
                                li = $('<li class="post_hidden col-md-4 col-sm-6 col-xs-12"/>').appendTo(ul);
                            }else {
                                li = $('<li class="col-md-4 col-sm-6 col-xs-12"/>').appendTo(ul);
                            }
                            if(key !== "cmntAtrea"){
                                var lable = key !== "hiddenLi" ? $('<label/>').text(key == "Premium" ? "Premium ($/Ounce)" : key).appendTo(li) : $('<label/>').text("").appendTo(li) ;
                                var value = $('<h3/>').text(data).appendTo(li);
                            }else{
                            	$('<div class="col-md-2 col-sm-3 col-xs-2" style="padding-left:0px;"/>').text("Comments").appendTo(li)
                            	 var value = $('<span class="col-md-4 col-sm-9 col-xs-10" style="padding-left:0px;"/>').html('<textarea name="comments_'+loopCount+'" class="form-control"></textarea>').appendTo(li);
                            	loopCount++;
                            }
  
                        }
                    });
                    ul.after('</br>');
                    if($("#delete_form_delete_button").val() !=="REMOVE"){
                    	 if((ul[0].childElementCount % 3)==2){
                         	ul.append('<li class="col-md-4 col-sm-6 col-xs-12 post_hidden"><label></label><h3></h3></li>');
                         }
                    }
                }
            });
        }
        var style = $('<span/>').appendTo(postOfferDiv);
    }
	this.postPopupData = function (data){
		var postData,
		userType = $('#userType').val();
		if(userType && userType == 'dealer'){
			postData = {
					"Account ID" : (data.offerMaster.accountCode == null) ? "-" : data.offerMaster.accountCode,
					"Metal" : (data.offerMaster.commodity.metal.metal == null) ? "-" : data.offerMaster.commodity.metal.metal,
					"Inventory" : (data.offerMaster.commodity.metal.inventory == null) ? "-" : data.offerMaster.commodity.metal.inventory,
					"Brand" : (data.offerMaster.commodity.commodityBrand.code == null) ? "-" : data.offerMaster.commodity.commodityBrand.code,
					"Type" : (data.offerMaster.commodity.commodityType.code == null) ? "-" : data.offerMaster.commodity.commodityType.code,
					"Purity" : (data.offerMaster.commodity.metal.purity == null) ? "-" : data.offerMaster.commodity.metal.purity,
					"Quantity" : (data.offerMaster.quantity == null) ? "-" : data.offerMaster.quantity,
					"Source Location" : (data.offerMaster.city.description == null) ? "-" : data.offerMaster.city.description,
					"Premium" : (data.offerMaster.premium == null) ? "-" : data.offerMaster.premium,
					"Availability" : (data.offerMaster.availability == null) ? "-" : self.formatDateddMMYYYY(data.offerMaster.availability),
					"Expiry" : (data.offerMaster.expiry == null) ? "-" : self.formatDateddMMYYYYHHmm(data.offerMaster.expiry),
					"id" : data.id,
					"" : ""
			}
			if($("#delete_form_delete_button").val()=="REMOVE"){
				postData["cmntAtrea"] = "";
			}
			else if($("#reject_form_reject_button").val()=="REJECT"){
				delete postData[""];
			}
		}else{
			postData = {
					"Metal" : (data.offerMaster.commodity.metal.metal == null) ? "-" : data.offerMaster.commodity.metal.metal,
					"Inventory" : (data.offerMaster.commodity.metal.inventory == null) ? "-" : data.offerMaster.commodity.metal.inventory,
					"Brand" : (data.offerMaster.commodity.commodityBrand.code == null) ? "-" : data.offerMaster.commodity.commodityBrand.code,
					"Type" : (data.offerMaster.commodity.commodityType.code == null) ? "-" : data.offerMaster.commodity.commodityType.code,
					"Purity" : (data.offerMaster.commodity.metal.purity == null) ? "-" : data.offerMaster.commodity.metal.purity,
					"Quantity" : (data.offerMaster.quantity == null) ? "-" : data.offerMaster.quantity,
					"Source Location" : (data.offerMaster.city.description == null) ? "-" : data.offerMaster.city.description,
					"Premium" : (data.offerMaster.premium == null) ? "-" : data.offerMaster.premium,
					"Availability" : (data.offerMaster.availability == null) ? "-" : self.formatDateddMMYYYY(data.offerMaster.availability),
					"Expiry" : (data.offerMaster.expiry == null) ? "-" : self.formatDateddMMYYYYHHmm(data.offerMaster.expiry),
					"id" : data.id
			}
			var selectedTab = $('.tab.active').attr('id'),emptykey = null;
			/*if($("#post_form_post_button").val()=="POST"){
				postData[""] = "";
			}*/
			if(selectedTab == 'DO'){
				delete postData[""];
				//delete postData[""];
			}else if(selectedTab == 'rfq'){
				var isDrfqAction = $('#drfq_check').val();
				if(isDrfqAction=="proceed"){
					delete postData["Premium"];
					//postData["hiddenLi"] = "";
				}
			}
		}
		return postData;
	}
	
	this.clearSelectedOffers=function(selectedOffers,selectedOfferIds){
		$("#selected_offers").val("");
	    $("#selected_offer_id").val("");
		selectedOffers = [];
		selectedOfferIds = [];
		$("input[name=offer-id]").each( function () {
		       $(this).prop('checked',false);
		   });
		self.changeBtnClass('delete','enabled','deleteBtn');
		self.changeBtnClass('post','enabled','post_button');
		self.changeBtnClass('edit','enabled','edit_button');
    	$('#listConfirmedOffers .select_all_check, #listUnConfirmedOffers .select_all_check').removeAttr('checked');
		return [selectedOffers,selectedOfferIds];
	}
	this.tradeInvoiceOnChange = function(){
		$('#civd_picker').focusout(function(){
			if($("#civd_picker").val().length == 0){
	        	 $("#civd_picker").tooltip({
	        	        title: 'Please eneter a valid date'
	        	    }).tooltip('show');
	        }else{
	        	 $("#civd_picker").tooltip('destroy');
	        }
		});
		$('#invoice_type_ddl').change(function(){
			var amPmVal = $('#invoice_type_ddl').val();
	        if($("#civd_picker").val().length == 0){
	        	 $("#civd_picker").tooltip({
	        	        title: 'Please enter a valid date'
	        	    }).tooltip('show');
	        }else{
	        	 $("#civd_picker").tooltip('destroy');
				swal({
		            title: "",
		            text: "Customs invoice date and Invoice type are going to save as selected.Do you want to proceed ?",
		            type: "warning",
		            showCancelButton: true,
		            confirmButtonColor: "#1ab394",
		            confirmButtonText: "Confirm",
		            closeOnConfirm: true,
		            allowOutsideClick:false
		        }, function () {
		        });
	        }
		});
	}
	
	this.loadCurrentTab = function() {
		var currentTab = $('#currentTab').val();
		switch( currentTab ) {
		   	case 'confirmedOffers':
		        $('#confirmedOffers').trigger('click');
		       	break;
		   case 'unConfirmedOffers':
		        $('#unConfirmedOffers').trigger('click');
		       break;
		   case 'rfq':
		        $('#rfq').trigger('click');
		       	break;
		   case 'dashboard':
			   $('#dashboard').trigger('click');
		       	break;
		   default:
			   if($('#dashboard').length >0){
				   $('#dashboard').trigger('click');
			   }else{
				   $('#confirmedOffers').trigger('click');
			   }
		}
	}
	
	/*selectall check*/
	this.selectAllCheckBox = function (selectedOffers, selectedOfferIds, needSelectAll) {
	    $('.container').on('click', '.select_all_check', function () {
	        self.changeBtnClass('delete', 'enabled', 'deleteBtn');
	        self.changeBtnClass('post', 'enabled', 'post_button');
	        selectedOfferIds = [];
	        selectedOffers = [];
	        var selectedTabId,
	            selectedTabName = $(".tab.active").attr("id");
	        if (selectedTabName == 'confirmedOffers') {
	            selectedTabId = "#listConfirmedOffers";
	        } else if (selectedTabName == 'unConfirmedOffers') {
	            selectedTabId = "#listUnConfirmedOffers";
	        } else if (selectedTabName == 'rfq') {
	            selectedTabId = "#listRFQs";
	        }else if (selectedTabName == 'DO') {
	            selectedTabId = "#listDO";
	        }
	        if (!needSelectAll) {
	            checkBoxSelectionWithCriteria(selectedTabId, selectedOfferIds, selectedOffers,this,selectedTabName);
	        } else {
	            checkBoxSelectionwithoutCriteria(selectedTabId, selectedOfferIds, selectedOffers,this);
	        }
	        if (selectedOffers.length > 0 || selectedOfferIds.length > 0) {
	            $("#selected_offers").val(JSON.stringify(selectedOffers));
	            $("#selected_offer_id").val(JSON.stringify(selectedOfferIds));
	        }
	    });
	}
	
	function checkBoxSelectionWithCriteria(selectedTabId,selectedOfferIds,selectedOffers,thisAttr,selectedTabName){
		if($(thisAttr).is(":checked")){
			$(selectedTabId+" input[name=offer-id]").each( function () {
				var $row = $(this).closest('tr'),
				rowData = oTable.row($row).data();
			    if((selectedTabName == "confirmedOffers" && rowData.offerId == null) ||
			    	 (selectedTabName == "unConfirmedOffers" && rowData.offerId == null) || 
			    		(selectedTabName == "rfq" && rowData.offerId == null )){
					$(this).prop('checked',true);
					selectedOfferIds.push(rowData.id);
			    	selectedOffers.push(rowData);
				}else{
					$(this).prop('checked',false);
				}
		   });
		} else {
			$(selectedTabId+" input[name=offer-id]").each( function () {
			    $(this).prop('checked',false);
			});
			$("#selected_offers").val('');
            $("#selected_offer_id").val('');
		}
		self.menuValidation(selectedOfferIds,selectedOffers);
	}
	
	function checkBoxSelectionwithoutCriteria(selectedTabId,selectedOfferIds,selectedOffers,thisAttr){
		if($(thisAttr).is(":checked")){
			self.changeBtnClass('reject-btn','enabled','reject-btn');
			$(selectedTabId+" input[name=offer-id]").each( function () {
				var $row = $(this).closest('tr'),
			    rowData = oTable.row($row).data();
					$(this).prop('checked',true);
					selectedOfferIds.push(rowData.id);
					selectedOffers.push(rowData);
		   });
			if(selectedOffers&&selectedOffers.length > 0 && self.checkOffersSelectable(selectedOffers)){
				self.changeBtnClass('tradeDO-btn','enabled','tradeDO-btn');
			}else{
				self.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
			}
		}else {
			self.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
			self.changeBtnClass('reject-btn','disabled','reject-btn');
			$(selectedTabId+" input[name=offer-id]").each( function () {
			    $(this).prop('checked',false);
			});
			$("#selected_offers").val('');
            $("#selected_offer_id").val('');
		}
	}
	
	this.checkOffersSelectable = function(selectedOffers){
		var isAllSwiss = self.checkCountryIsSwiss(selectedOffers);
		for(var key in selectedOffers){
			for(var nextKey in selectedOffers){
				var firstMetal = selectedOffers[key].offerMaster.commodity.metal,
				secondMetal = selectedOffers[nextKey].offerMaster.commodity.metal,
				firstBrand = selectedOffers[key].offerMaster.commodity.commodityBrand,
				secondBrand = selectedOffers[nextKey].offerMaster.commodity.commodityBrand,
				firstType = selectedOffers[key].offerMaster.commodity.commodityType,
				secondType = selectedOffers[nextKey].offerMaster.commodity.commodityType,
				firstAvailObj = selectedOffers[key].offerMaster.availability,
				secondAvailObj = selectedOffers[nextKey].offerMaster.availability,
				firstSourceLocObj = selectedOffers[key].offerMaster.city,
				secondSourceLocObj = selectedOffers[nextKey].offerMaster.city;
				if(firstMetal.id==secondMetal.id){
					if(firstBrand.id==secondBrand.id){
						if(firstType.id==secondType.id){
							if(firstAvailObj==secondAvailObj){
								if(!isAllSwiss){
									if(firstSourceLocObj.id!=secondSourceLocObj.id){
										return false;
									}
								}
							}else{
								return false;
							}
						}else{
							return false;
						}
					}else{
						return false;
					}
				}else{
					return false;
				}
			}
		}
		return true;
	}
	
	this.checkCountryIsSwiss = function(selectedOffers){
		for(var key in selectedOffers){
			if(selectedOffers[key].offerMaster.city.country.code != self.countryCode){
				return false;
			}
		}
		return true;
	}
	
	this.changeBtnClass =  function(field,state,elementid){
		self.customer = $(self.rootParent).find('.menu-icons');
		if(state == "enabled"){
			$('.'+field+'_disabled_button').css("display", "none");
			$('.'+field+'_disabled_button').removeAttr('id');
			$('.'+field+'_enabled_button').attr('id', elementid);
			$('.'+field+'_enabled_button').css("display", "inline-block");
		}else{
			$('.'+field+'_enabled_button').css("display", "none");
			$('.'+field+'_enabled_button').removeAttr('id');
			$('.'+field+'_disabled_button').attr('id', elementid);
			$('.'+field+'_disabled_button').css("display", "inline-block");
		}
	
	}
	/*menu Validation*/
	this.menuValidation = function (selectedOfferIds, selectedOffers) {
	    if (selectedOfferIds.length == 0) {
	        self.disableAllButtons();
	    } else {
            if (!self.checkIfOfferIdExists(selectedOffers)) {
                self.changeBtnClass('delete', 'enabled', 'deleteBtn');
                self.changeBtnClass('post', 'enabled', 'post_button');
                self.changeBtnClass('edit', 'enabled', 'edit_button');
                self.changeBtnClass('replicate', 'enabled', 'replicateBtn');
                self.changeBtnClass('reject-btn', 'enabled', 'reject-btn');
                self.changeBtnClass('remove', 'disabled', 'removeBtn');
            }else {
                self.changeBtnClass('post', 'disabled', 'post_button');
                self.changeBtnClass('edit', 'enabled', 'edit_button');
                if (self.checkIfDRFQExists(selectedOffers)) {
                    self.changeBtnClass('replicate', 'disabled', 'replicateBtn');
                } else {
                    self.changeBtnClass('replicate', 'enabled', 'replicateBtn');
                }
                self.changeBtnClass('drfq', 'enabled', 'drfq-btn');
                self.changeBtnClass('DRfq', 'enabled', 'DRfq-btn');
                self.changeBtnClass('reject-btn', 'enabled', 'reject-btn');
                if (page != "dealer") {
                    self.changeBtnClass('delete', 'disabled', 'deleteBtn');
                }
            }
            if (selectedOfferIds.length > 1) {
	            self.changeBtnClass('edit', 'disabled', 'edit_button');
	            self.changeBtnClass('replicate', 'disabled', 'replicateBtn');
	            self.changeBtnClass('drfq', 'disabled', 'drfq-btn');
	            self.changeBtnClass('DRfq', 'disabled', 'DRfq-btn');
	            self.changeBtnClass('reject-btn', 'enabled', 'reject-btn');
	            self.changeBtnClass('remove', 'disabled', 'removeBtn');
	        }
            if(page == "dealer"){
            	//self.dealerCustomMenuValidation(selectedOffers);
            }
	    }
	}
	
	this.dealerCustomMenuValidation = function(selectedOffers){
		var array = self.offerCreatedCheck(selectedOffers);
        if (array[2]) {
            self.disableAllButtons();
        } else if (array[0]) {
            self.changeBtnClass('remove', 'enabled', 'removeBtn');
            self.changeBtnClass('delete', 'disabled', 'deleteBtn');
            self.changeBtnClass('post', 'disabled', 'post_button');
        } else if (array[1]) {
            self.changeBtnClass('remove', 'disabled', 'removeBtn');
            self.changeBtnClass('delete', 'enabled', 'deleteBtn');
        } else {
            self.changeBtnClass('remove', 'disabled', 'removeBtn');
            self.changeBtnClass('delete', 'disabled', 'deleteBtn');
            self.changeBtnClass('post', 'disabled', 'post_button');
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
	
	this.checkIfDRFQExists = function(selectedOffers){
		var drfqExist = false;
		$.each( selectedOffers, function( indexObject, offerobject ) {
			if(offerobject.offerMaster.offerType.id == 4){
				drfqExist = true;
				return false;
			}
			});
		return drfqExist;
	}
	
	/*offerid check*/
	this.checkIfOfferIdExists = function(selectedOffers){
		var returnVal = false;
		if(selectedOffers.length > 0){
			if(!$('.select_all_check').is(":checked")){
				if(selectedOffers[selectedOffers.length-1].offerId!=null){
					return true;
				}
			}else{
				$.each(selectedOffers, function(i,v){	
					if(v.offerId != null){
						returnVal = true;
						return true;
					}
				});
			}
		}
		return returnVal;
	}
	
	/*single select*/
	this.singleSelectCheck = function(e){
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
			selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		var $row = $(this).closest('tr'),
	     offerData = oTable.row($row).data(),
	     selectedTabName = $("#offerTab").val();
	    if($(this)[0].checked){
	    	selectedOfferIds.push(offerData.id);
	    	selectedOffers.push(offerData);
	    	if(offerData.offerMaster.offerType.id == 4)
	    		 $(".drfq-row").val(true);
	    }else{
	    	$('.select_all_check').removeAttr('checked');
	    	$.each(selectedOffers, function(i,v) {
	    		if(v && (v.id == offerData.id)){
	    			delete selectedOfferIds[i];
	    			delete selectedOffers[i];
	    			$(".drfq-row").val(false);
	    		}
	    	});
	    	selectedOfferIds = jQuery.grep(selectedOfferIds, function(n, i){
	    		  return (n != null);
	    		});
	    	selectedOffers = jQuery.grep(selectedOffers, function(n, i){
	    		  return (n != null);
    		});
	    }
	    self.menuValidation(selectedOfferIds,selectedOffers);
	    if(offerData && offerData.offerMaster.offerType.id == "4"){ 
	    	self.changeBtnClass('replicate','disabled','replicateBtn');
	    }
	    $("#selected_offers").val(JSON.stringify(selectedOffers));
	    $("#selected_offer_id").val(JSON.stringify(selectedOfferIds));
	};
	
    this.setRowSelected = function(){
    	var customOffers ={"confirmedOffers":[],
        		"unConfirmedOffers":[],
        		"DO":[]
        		};
    	var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : customOffers;
    	$.each(selectedOfferIds, function(i,v) {
    		$('#listOffers :input[value="'+ i+'"]').prop('checked',true);
    	});
    }
    
	this.tradeSelector = function(e){
		self.getSetSingleRowData(this);
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
		selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		if(selectedOffers && selectedOffers.length > 0){
			if(selectedOffers.length==1){
				self.changeBtnClass('view-btn','enabled','view-btn');
				self.changeBtnClass('export-btn','enabled','export-btn');
				self.changeBtnClass('upload-Btn','enabled','upload-Btn');
			}else{
				self.changeBtnClass('export-btn','enabled','export-btn');
				self.changeBtnClass('view-btn','disabled','view-btn');
				self.changeBtnClass('upload-Btn','disabled','upload-Btn');
			}
		}else{
			self.disableAllButtons();
		}
	}
	
	
	this.checkSelectedOffers = function (){ 
		var selectedIds=[];
		selectedIds=$("#selected_offer_id").val();
		if(selectedIds.trim().length>0)
		selectedIds=JSON.parse(selectedIds);
		$("input[name=offer-id]").each( function () {
			var arrayIndex = jQuery.inArray( parseInt($(this).val()), selectedIds );
			if(arrayIndex !== -1){
				$(this).prop('checked',true);
			}
		});
	}
	
	this.checkCustomizedSelectedOffers = function (selectedTab){ 
		var selectedIds=[];
		selectedIds=JSON.parse($("#customized_selected_offer_ids").val());
		if(selectedIds[selectedTab].length>0){
		var offerIds = selectedIds[selectedTab];
		$("#list_"+selectedTab+" input[name=offer-id]").each( function () {
			 var arrayIndex = jQuery.inArray( parseInt($(this).val()), offerIds );
				if(arrayIndex !== -1){
					$(this).prop('checked',true);
				}
		});
	}
	}
	
    this.setCustmzdRowSelected = function(offerArrayId){
    	var selectedOfferIds = ($("#customized_selected_offer_ids").val()) ? JSON.parse($("#customized_selected_offer_ids").val()) : [];
    	$.each(selectedOfferIds[offerArrayId], function(i,v) {
    		$('#list_'+offerArrayId+' :input[value="'+ i+'"]').prop('checked',true);
    	});
    }

	this.validateExpiryAndValidity = function(){
		var availDate = $('[name="availability"]').val(),
		expDate = $('[name="expiry"]').val();
		if(availDate==undefined || availDate==""){
			availDate=$("#drfq_availability").html()
		}
		if(availDate.trim().length!=0 && expDate.trim().length!=0){
			var availDateArray = availDate.split("-"),
			convertedAvailDate = new Date(availDateArray[2]+'-'+availDateArray[1]+'-'+availDateArray[0]),
			expiryDateArray = expDate.slice(0,10).split("-"),
			convertedExpiryDate = new Date(expiryDateArray[2]+'-'+expiryDateArray[1]+'-'+expiryDateArray[0]);
			if(convertedExpiryDate > convertedAvailDate){
	            return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
	}
	this.isExpired = function(){
		var expDate = $('[name="expiry"]').val();
		if(expDate.trim().length!=0){
			var expiryDateArray = expDate.slice(0,10).split("-"),
		    expiryTimeArray =     expDate.slice(11,16).split(" "),
			d1 =    expiryTimeArray[0].split(":");
			var date = new Date();
			var currentDate = ("0" + date.getDate().toString()).substr(-2)+"-"+("0" + (date.getMonth() + 1).toString()).substr(-2) + "-"+ (date.getFullYear().toString())+ " "+("0" + date.getHours().toString()).substr(-2)+":"+(date.getMinutes().toString()),
			datestringArray = currentDate.slice(0,10).split("-"),
			datesTimeArray =  currentDate.slice(11,16).split(" "),
			d2 =    datesTimeArray[0].split(":");
			var convertedExpiryDate = new Date(expiryDateArray[2],expiryDateArray[1],expiryDateArray[0]);
			var currentDateArray = new Date(datestringArray[2],datestringArray[1],datestringArray[0]);
			if(convertedExpiryDate.getTime() == currentDateArray.getTime()){
				if(((parseInt(d1[0])*60) + (parseInt(d1[1])*1))>((parseInt(d2[0])*60) + (parseInt(d2[1])*1))){
		            return true;
			     }else{
			    	 return false;
			     }
			}else{
				return true;
			}
		}
		
	}
	this.validateDRFQExpiryAvailability = function(){
		var unconfirmedExpiry = $('#unconfimedOfferExpiry').val(),
		expDate = $('[name="expiry"]').val();
		
		unconfirmedExpiry = self.setExpiryFieldInCurrTZ(unconfirmedExpiry);
		
		if( expDate.trim().length!=0 && unconfirmedExpiry.trim().length!=0){
			var unconfirmedExpiryArray  = unconfirmedExpiry.split(/\-|\s/),
			convertedUnconfExpArray = new Date(unconfirmedExpiryArray.slice(0,3).reverse().join('/')+' '+unconfirmedExpiryArray[3]);
			
			var expiryDateArray  = expDate.split(/\-|\s/),
			convertedExpiryDate = new Date(expiryDateArray.slice(0,3).reverse().join('/')+' '+expiryDateArray[3]);
			
			if(convertedUnconfExpArray < convertedExpiryDate){
	            return false;
			}else{
				return true;
			}
		}
		
	}
	this.confirmDateMismatch = function(varr){
        swal({
            title: "",
            text: "The Expiry date is less than the Availability date, do you wish to continue ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: true,
            allowOutsideClick:false
        }, function (isConfirm) {
        	alert(isConfirm)
        });
	}
	
	/*Get expiry search param in UTC from dateString in local TZ*/
	this.setExpiryFieldInCurrTZ = function( dateString ){
		var dateParams = self.sliceDateParams(dateString);
		var dateInMillisecs = Date.UTC(dateParams.year,dateParams.month,dateParams.date,dateParams.hours,dateParams.mins);
		return( self.formatDateddMMYYYYHHmm( dateInMillisecs ) );
		
	}
	
	/*Get edit form expiry in local TZ from dateString in UTC*/
	this.setDateToUTC = function(dateString){
		var dateParams = self.sliceDateParams(dateString);
		var utcDate = new Date(dateParams.year,dateParams.month,dateParams.date,dateParams.hours,dateParams.mins);
		var dateInMillisecs = Date.parse(utcDate);
		return( self.utcFormattedDate( dateInMillisecs ) );
	}

	/*Get various date attributes from given dateString*/
	this.sliceDateParams = function( dateString ){
		var dateParams = {};
		dateParams.year = dateString.slice(6,10);
		var MMIndex = dateString.slice(3,5);
		dateParams.month = Number( MMIndex ) - 1;
		dateParams.date = dateString.slice(0,2);
		dateParams.hours = dateString.slice(11,13);
		dateParams.mins = dateString.slice(14,16);
		return dateParams;
	}

	/*Get formatted(dd-mm-yyyy hh:mm) date in UTC from date in millisecs*/
	this.utcFormattedDate = function(dateInMillisecs){
		var date = new Date(Number(dateInMillisecs));
		var day = date.getUTCDate();
		var month = date.getUTCMonth();
		var year = date.getUTCFullYear();
		var hour = date.getUTCHours();
		var minute = date.getUTCMinutes();
		month = month.toString().length > 1 ? month+1 : '0' + (month+1);
		day = day.toString().length > 1 ? day : '0' + day;
		hour = hour.toString().length > 1 ? hour : '0' + hour;
		minute = minute.toString().length > 1 ? minute : '0' + minute;
		return (day + '-' + (month) + '-' + year + " " + hour + ":" + minute);
	}
	
	/*Get timezone data in the format GMT+(-)dddd*/
	this.getTZData = function(){
		var date = new Date();
		return (date.toTimeString().slice(9,17) );
	}
	this.cancelBtn = function(){
		$('#cancel_button').click(function(){
			checklistEdited=false;
//			self.resetPopUp();
			$('.primary-nav .active.tab').trigger('click');
		});
	}
	this.destroyCountdown = function(){
		this.countDown = $(".countdown");
		this.countDown.countdown('destroy');
	}
	this.hidePaginate = function(thisAttr){
		if (thisAttr.fnSettings()._iRecordsDisplay <= thisAttr.fnSettings()._iDisplayLength){
		 $(thisAttr).closest('.dataTables_wrapper').find('div.dataTables_paginate').html("<div style='height:30px;'></div>");
	    }
	}
	
	/* set expiry countdown for trade functionality*/
	this.initiateTradeExpiryCountDown = function(expiryTime){
		self.timeOut = setTimeout(self.showTimeElpsdAlert, parseInt(expiryTime));
	};
	
	this.showTimeElpsdAlert = function(){
		swal({
	        title: "Operation Timed out... !!!",
	        text: "You have exceed the time limit for this operation",
	        type:  "error",
	        confirmButtonColor: "#1ab394",
	        allowOutsideClick:false},
	        function () {
	        	$('.primary-nav .active.tab').trigger('click');
	        });
	};

	/*Check if offer is locked by any user*/
	this.getLockStatus = function(offerToCheck, offerId, callback, context ){
		var offerMasterDTO = self.getSelectedOfferMasterIdAndType();
		$.ajax({
	 		url : baseUrl+'/getLockStatus?offerMasterIds='+offerMasterDTO.offerMasterIdListString+'&offerTypeId='+offerMasterDTO.offerType,
	 		type: 'GET',
	 		success : function(response) {
				if ( !! callback ) {
					var content = context || window;
					callback.call(content, response);
				};
	 		}, error: function (response) {
	 			console.log(response);
	 	    }
	 	});
	}
	
	this.getSelectedOfferMasterIdAndType = function() {
        var offerIdsJSON = JSON.parse($("#selected_offers").val());
        var offerMasterDTO = {};
        offerMasterDTO.offerMasterIdList = [];
        offerMasterDTO.offerType = offerIdsJSON[0].offerMaster.offerType.id
        offerIdsJSON.forEach(function(ele) { offerMasterDTO.offerMasterIdList.push(ele.offerMaster.id) });
        offerMasterDTO.offerMasterIdListString = JSON.stringify(offerMasterDTO.offerMasterIdList);
        return offerMasterDTO;
    }

	//TODO convert to post
    this.cancelAndReleaseLock = function() {
        $('#cancel_button').click(function() {
//        	self.resetPopUp();
        	var offerMasterDTO = self.getSelectedOfferMasterIdAndType();
            $.ajax({
                url: baseUrl + '/releaseLock?offerMasterIds='+offerMasterDTO.offerMasterIdListString+'&offerTypeId='+offerMasterDTO.offerType,
                type: 'GET',
                // type: 'POST',
                // contentType: 'text/plain',
                // data: {
                //     offerIds: self.getSelectedOfferIds()
                // },
                failure: function(response) {
                    console.log(response);
                },
            });
            $('.primary-nav .active.tab').trigger('click');
        });
    }
	
	this.fillControlWithResponse = function(response, controlElement) {
	    controlElementId = document.getElementById(controlElement);
	    controlElementId.innerHTML = "<option value>SELECT</option>";
	    for (var key in response) {
            controlElementId[controlElementId.length] = new Option(response[key], key);
        }
	}
	
	this.getMarginStatus = function(baseUrl) {
		$('.account-id').on("click", function() {
			var accountCode = $('#accountId').attr('data-attr');
			$('.status-content').css('display','none');
			$.ajax({
		 		url : baseUrl+'/getMarginStatus',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: accountCode, 
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			if(response){
		 				$('#totalFund')[0].innerHTML = self.getNumberWithCommas(response.totalFund);
			 			$('#revaluation')[0].innerHTML = self.getNumberWithCommas(response.revaluation);
			 			$('#marginVal')[0].innerHTML = self.getNumberWithCommas(response.marginPercentage);
			 			$('#freeEquity')[0].innerHTML = self.getNumberWithCommas(response.freeEquity);
			 			$('#marginPercentage')[0].innerHTML = self.getNumberWithCommas(response.margin);
			 			$('.status-content').css('display','block');
		 			}
		 		}
		 	});
		});
	}
	
	this.getNumberWithCommas =function(x) {
		if(x!==null && x!== undefined){
		 var n= x.toString().split(".");
		    //Comma-fies the first part
		    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    //Combines the two sections
		    return n.join(".");
		}else{
			return x;
		}
	    //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	this.roundOff2Decimal = function(data){
		return +(Math.round(data + "e+2")  + "e-2");
	}
	
	this.tradePopup = function(table){
		$('tbody').on('click','.trade-popup',function(){
			var data= oTable.row( $(this).closest('tr') ).data(),
				quantity = 0,premium= 0, offerCount=0 ;
			$("#tradePopup .trade-id").html("Trade ID: "+data.tradeId);
			$(".list-head").html("<li class='head col-md-4 col-xs-4 col-sm-4'>Offer ID</li>"+
               	"<li class='head col-md-4 col-xs-4 col-sm-4'>Premium</li>"+
               	"<li class='head col-md-4 col-xs-4 col-sm-4'>Quantity</li>");
			var arrOfferId = data.offerId.split(",");
			var arrCusPremium = data.offerCustomerPremium.split(",");
			var arrSupPremium = data.offerSupplierPremium.split(",");
			var arrOfferQuantity = data.tradeOfferQuantity.split(",");
			for(var index=0;index<arrOfferId.length;index++){
				offerCount++;
				if(!!arrOfferQuantity[index])
				quantity+=parseInt(arrOfferQuantity[index].trim());
				if(table=="SUP"){
				$(".list-head").append("<li class='popup-list col-md-4 col-xs-4 col-sm-4'>"+arrOfferId[index]+"</li><li class='popup-list col-md-4 col-xs-4 col-sm-4'>"+arrCusPremium[index]+"</li><li class='popup-list col-md-4 col-xs-4 col-sm-4'>"+arrOfferQuantity[index]+"</li>");
				if(!!arrSupPremium[index])
				premium+=parseFloat(arrSupPremium[index].trim());
				}else{
				$(".list-head").append("<li class='popup-list col-md-4 col-xs-4 col-sm-4'>"+arrOfferId[index]+"</li><li class='popup-list col-md-4 col-xs-4 col-sm-4'>"+arrSupPremium[index]+"</li><li class='popup-list col-md-4 col-xs-4 col-sm-4'>"+arrOfferQuantity[index]+"</li>");
				if(!!arrCusPremium[index])
				premium+=parseFloat(arrCusPremium[index].trim());
				}			
			}
			var totalPremium = premium/offerCount;
			$(".list-head").append("<li class='popup-calc col-md-4 col-xs-4 col-sm-4'>Total</li>"+
					"<li class='popup-calc col-md-4 col-xs-4 col-sm-4'>"+Math.round(totalPremium * 100) / 100+"</li>"+
					"<li class='popup-calc col-md-4 col-xs-4 col-sm-4'>"+quantity+"</li>"+
					"<li class='popup-calc col-md-12 col-xs-12 col-sm-12'>Freight Premium: " +data.freightPremium+ " USD/ounce</li>");
			$(".trade-offer-popup").trigger('click');
		});
	}
	this.getOfferIdList = function(data){
		if(!!data)
		return data.length > 1 ? "<span class='trade-popup'>...</span>" : data[0];
	}
	this.removeunOwnedOffers = function(){
		var userId=$('.user-id').attr('data-attr');
		$('tbody').on('click','.trade-popup',function(){
			var data= oTable.row( $(this).closest('tr') ).data();
			$.each(data.tradeOffers,function(i,e){
				if(userId==(e.offer.offerMaster.createdBy.id)){
					var i = data.tradeOffers.indexOf(tradeOffers);
					if(i != -1) {
						array.splice(i, 1);
					}
				}
			});
		});
	} 
	
    this.viewDealerDetailsFunction = function(userRole){
		var selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		$(".container").load(self.urlHash[userRole]+'/getTradeDetailsViewPage?tradeId='+selectedOfferIds[0],function(){
			self.cancelBtn();
			if(userRole=='SUPPLIER'){
				self.getUploadedDocs(selectedOfferIds[0],userRole);
			}
		});
	}
    
    this.getUploadedDocs = function(tradeId,userRole){
    	$('#uploaded_docs_link').click(function(){
    		self.uploadDocLister(tradeId,userRole);
    	})
    }
    
    this.uploadDocLister = function(tradeId,userRole){
		$(".container").load(self.urlHash[userRole]+'/getUploadedDocsPage?tradeId='+tradeId,function(){
			var ajaxUrl =  self.urlHash.BASE+'/findDocumentEntries?tradeId='+tradeId;
			self.docViewCloseAction();
			$.ajax({
		 		url : ajaxUrl,
		 		type: 'get',
		 		success : function(response) {
		 			self.populateDoccumentData(response,tradeId);
		 		}
		 	});
		});
    }
    
    this.checkEligibleRows = function (thisAttr,selectedTabName,pageMode) {
        switch(selectedTabName){
		  case "confirmedOffers":
			  selectedTabId = "#listConfirmedOffers";
			  if(pageMode!='C'){
				  self.selectUnpostedOffers(selectedTabId, thisAttr,selectedTabName);
			  }else{
				  self.selectAllRows(thisAttr);
			  }
			  break;
		  case "unConfirmedOffers":
			  selectedTabId = "#listUnConfirmedOffers";
			  self.selectUnpostedOffers(selectedTabId, thisAttr,selectedTabName);
			  break;
		  case "rfq":
			  var innerTab = self.getCurrentInnerTab();
			  if(innerTab=='customerRFQ'){
				  selectedTabId = "#listCustomerRFQs";
			  }else if(innerTab == 'supplierRFQ'){
				  selectedTabId = "#listSupplierRFQs";  
			  }else{
				  selectedTabId = "#listRFQs";  
			  }
			  self.selectUnpostedOffers(selectedTabId, thisAttr,selectedTabName);
			  break;
		  case "DO":
			  selectedTabId = "#listDO";
			  if(pageMode=='D' || pageMode=='C'){
				  self.selectAllRows(thisAttr);
			  }
			  break;
		  case "RO":
			  selectedTabId = "#listRO";
			  if(pageMode=='D'){
				  self.selectAllRows(thisAttr);
			  }
			  break;
		  case "premiums":
			  if(self.getCurrentInnerTab()=="groups"){
				  selectedTabId = "#listgroups";
			  }else{
				  selectedTabId = "#listcpm";
			  }
			  self.selectAllRows(thisAttr);
			  break;
		  case "trade":
			  selectedTabId = "#listTrades";
			  self.selectAllRows(thisAttr);
			  break;
		  case "queries":
			  selectedTabId = "#queries";
			  break;
		  case "premiums":
			  if(self.getCurrentInnerTab()=='groups'){
				  selectedTabId = "#listgroups";
			  }else{
				  selectedTabId = "#listcpm";  
			  }
			  self.selectUnpostedOffers(selectedTabId, thisAttr,selectedTabName);
			  break;
		  default:
			  selectedTabId = "#listConfirmedOffers";
		      break;
		}
	}
    
	this.selectUnpostedOffers = function(selectedTabId,thisAttr,selectedTabName){
		var selectedOfferIds = [],
		selectedOffers = [];
		if($(thisAttr).is(":checked")){
			$(selectedTabId+" input[name=offer-id]").each( function () {
				var $row = $(this).closest('tr'),
				rowData = oTable.row($row).data();
			    if((selectedTabName == "confirmedOffers" && rowData.offerId == null) ||
			    	 (selectedTabName == "unConfirmedOffers" && rowData.offerId == null) || 
			    		(selectedTabName == "rfq" && rowData.offerId == null ) || (selectedTabName == "premiums" && rowData.offerId == null)){
					$(this).prop('checked',true);
					selectedOfferIds.push(rowData.id);
			    	selectedOffers.push(rowData);
				}else{
					$(this).prop('checked',false);
				}
		   });
		} else {
			$(selectedTabId+" input[name=offer-id]").each( function () {
			    $(this).prop('checked',false);
			});
			$("#selected_offers").val('');
            $("#selected_offer_id").val('');
		}
		if (selectedOffers.length > 0 || selectedOfferIds.length > 0) {
            $("#selected_offers").val(JSON.stringify(selectedOffers));
            $("#selected_offer_id").val(JSON.stringify(selectedOfferIds));
        }
	}
	
	this.setButtonBehaviour = function(editBtn,replicateBtn,deleteBtn,postBtn,removeBtn){
		if(editBtn){
			self.changeBtnClass('edit','enabled','edit_button');
		}else{
			self.changeBtnClass('edit','disabled','edit_button');
		}
		if(replicateBtn){
			self.changeBtnClass('replicate','enabled','replicateBtn');
		}else{
			self.changeBtnClass('replicate','disabled','replicateBtn');
		}
		if(deleteBtn){
			self.changeBtnClass('delete','enabled','deleteBtn');
		}else{
			self.changeBtnClass('delete','disabled','deleteBtn');
		}
		if(postBtn){
			self.changeBtnClass('post','enabled','post_button');
		}else{
			self.changeBtnClass('post','disabled','post_button');
		}
		if(removeBtn){
			self.changeBtnClass('remove','enabled','removeBtn');
		}else{
			self.changeBtnClass('remove','disabled','removeBtn');
		}
	}
	
	this.disableAllButtons = function(){
		self.changeBtnClass('edit','disabled','edit_button');
		self.changeBtnClass('delete','disabled','deleteBtn');
		self.changeBtnClass('post','disabled','post_button');
		self.changeBtnClass('replicate','disabled','replicateBtn');
		self.changeBtnClass('drfq','disabled','drfq-btn');
		self.changeBtnClass('DRfq','disabled','DRfq-btn');
		self.changeBtnClass('reject-btn','disabled','reject-btn');
		self.changeBtnClass('remove','disabled','removeBtn');
		self.changeBtnClass('repost-btn','disabled','repost-btn');
		self.changeBtnClass('chcklist-btn','disabled','chcklist-btn');
		self.changeBtnClass('view-btn','disabled','view-btn');
		self.changeBtnClass('export-btn','disabled','export-btn');
		self.changeBtnClass('tradeDO-btn','disabled','tradeDO-btn');
		self.changeBtnClass('customize-btn','disabled','customize-btn');
		self.changeBtnClass('upload-Btn','disabled','upload-Btn');
	}
	
	this.getSetSingleRowData = function(thisAttr){
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
		selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [],
		$row = $(thisAttr).closest('tr'),
	    offerData = oTable.row($row).data(),
	    selectedTabName = $("#offerTab").val();
	    if($(thisAttr)[0].checked){
	    	selectedOfferIds.push(offerData.id);
	    	selectedOffers.push(offerData);
	    }else{
	    	$('.select_all_check').removeAttr('checked');
	    	$.each(selectedOffers, function(i,v) {
	    		if(v && (v.id == offerData.id)){
	    			selectedOfferIds.splice(i, 1);
	    			selectedOffers.splice(i, 1);
	    			/*delete selectedOfferIds[i];
	    			delete selectedOffers[i];*/
	    		}
	    	});
	    	selectedOfferIds = jQuery.grep(selectedOfferIds, function(n, i){
	    		  return (n != null);
	    	});
	    	selectedOffers = jQuery.grep(selectedOffers, function(n, i){
	    		  return (n != null);
    		});
	    }
	    $("#selected_offers").val(JSON.stringify(selectedOffers));
	    $("#selected_offer_id").val(JSON.stringify(selectedOfferIds));
	}
	
	this.isAllOffersPostable = function(selectedOffers){
		for(var key in selectedOffers){
			if(selectedOffers[key].offerId!=null){
				return false;
			}
		}
		return true;
	}
	
	this.selectAllRows = function(thisAttr){
		var selectedOffers = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [], 
			selectedOfferIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			
		
		if($(thisAttr).is(":checked")){
			$(selectedTabId+" input[name=offer-id]").each( function () {
				var $row = $(this).closest('tr'),
			    rowData = oTable.row($row).data();
				$(this).prop('checked',true);
				if(jQuery.inArray( rowData.id, selectedOfferIds )== -1){
					selectedOfferIds.push(rowData.id);
					selectedOffers.push(rowData);
				}
		   });
    	
		}else {
			$(selectedTabId+" input[name=offer-id]").each( function () {
				var $row = $(this).closest('tr'),
			    rowData = oTable.row($row).data();
				var arrayIndex = jQuery.inArray( rowData.id, selectedOfferIds );
				if(arrayIndex !== -1){
					selectedOfferIds.splice(arrayIndex, 1);
					selectedOffers.splice(arrayIndex, 1);
				}
			    $(this).prop('checked',false);
			    
			});
		/*$("#selected_offers").val('');
        $("#selected_offer_id").val('');*/
		}
		$("#selected_offers").val(JSON.stringify(selectedOffers));
        $("#selected_offer_id").val(JSON.stringify(selectedOfferIds));
	}
	
	this.mobileSideNav = function(){
		$(".hidden_nav_tab_button").on('click', function(event) {
            $('.hidden_nav_tabs').addClass('hidden_nav_show');
        });
        $(".hidden_nav_tabs").on('click', function(event) {
            $('.hidden_nav_tabs').removeClass('hidden_nav_show');
        });
        $(".hidden_nav_tabs ul").on('click', function(event) {
            event.preventDefault();
        });
	}
	
	this.tradeOfferPopUpData = function(data){
		if(!!data)
		return data.indexOf(',') > -1 ? "<span class='trade-popup'>...</span>" : data;
	}
	
	this.resetSearchResult = function(){
		$('.advanced_search_wrap input[type="text"]').val('');
		self.fnResetAllFilters(oTable);
		var currentInnerTab = self.getCurrentInnerTab();
		if(currentInnerTab !== null){
			if(currentInnerTab === 'cpm'){
				var activeInnerTab = $('.secondary-nav').find('li.active').attr('id');
				switch(activeInnerTab){
				case "confirmedOffers":
					 $('#sub_megamenu #'+activeInnerTab).trigger('click');
					break;
				case "unConfirmedOffers":
					 $('#sub_megamenu #'+activeInnerTab).trigger('click');
					break;
				case "DO":
					 $('#sub_megamenu #'+activeInnerTab).trigger('click');
					break;
				default:
					 $('#'+currentInnerTab).trigger('click');
					break;
				}
			}else{
				$('#'+currentInnerTab).trigger('click');
			}
		}else{
			if(!!self.getQueryInnerTab()){
				$('.secondary-nav .active .tab').trigger('click');
				$(".search_reset_btn").css("display", "none");
			}else{
				$(".primary-nav").find(".active").trigger('click');
			}
		}
	}
	
	this.getCurrentInnerTab = function(){
		if ($(".innerMenu").hasClass("innerMenu-selected")) {
			return $(".innerMenu-selected").attr("id");
		}else{
			return null;
		}
	}
	
	this.getQueryInnerTab = function(){
		return $('.secondary-nav .active .tab').attr('id');
	}
	
	this.checkIfCustomTz = function( selector, selectedOffers ){
		if(!selectedOffers[0].offerMaster.timezone)
			selector.val(self.setExpiryFieldInCurrTZ(selector.val()));
		else{
			self.appendExpiry();
		}
	}
	
	this.clearCheckbox = function(){
		$('.dataTables_paginate').on('click',function(){
			$('.select_all_check').removeAttr('checked');
			$.each('.offer_checkbox',function(){
				this.removeAttr('checked');
			});
		});
	}
	
	this.getNotification = function() {
		$(".badge-notify").css('display','none');
		$(".mobile-badge").css('display','none');
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "/bhp-back-office/getNotification",
			success: self.notificationSuccess
		});
	}
	this.deleteReadNotification = function() {
		$(".badge-notify").css('display','none');
		$(".mobile-badge").css('display','none');
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "/bhp-back-office/deleteReadNotification",
			success: self.notificationSuccess
		});
	}
	
	this.setNotification =function(count,elementId){
		$("#"+elementId+".badge-notify").css('display','inline-block');
		$("#"+elementId).html((parseInt(count) > 99)? '99+' : count);
		$("#"+elementId).parent().css('padding-right','0px');
	}
	
	this.setMobileNotification =function(count,elementId){
		$("#"+elementId+".mobile-badge").css('display','inline-block');
		$("#"+elementId).html(count);
	}
	
	this.notificationSuccess = function(response) {
		if($(window).width() < 690){
			((response.dashboard !== 0)&&(response.dashboard !== null)) ? self.setMobileNotification(response.dashboard,"dashboardMobNotify") :$("#dashboardMobNotify").css('display','none');
			((response.confirmedOffer !== 0)&&(response.confirmedOffer !== null))  ? self.setMobileNotification(response.confirmedOffer,"confirmedMobOffersNotify") :$("#confirmedMobOffersNotify").css('display','none');
			((response.unconfirmedOffer !== 0)&&(response.unconfirmedOffer !== null))  ?self.setMobileNotification(response.unconfirmedOffer,"unConfirmedMobOffersNotify"): $("#unConfirmedMobOffersNotify").css('display','none');
			((response.directOffer !== 0)&&(response.directOffer !== null))  ? self.setMobileNotification(response.directOffer,"DOMobNotify") : $("#DOMobNotify").css('display','none');
			((response.trade !== 0)&&(response.trade !== null)) ? self.setMobileNotification(response.trade,"tradeMobNotify") : $("#tradeMobNotify").css('display','none');
			((response.rfq !== 0)&&(response.rfq !== null)) ? self.setMobileNotification(response.rfq,"rfqMobNotify") : $("#rfqMobNotify").css('display','none');
			((response.rejectedOffer !== 0)&&(response.rejectedOffer !== null)) ? self.setMobileNotification(response.rejectedOffer,"ROMobNotify") : $("#ROMobNotify").css('display','none');
		}else{
			((response.dashboard !== 0)&&(response.dashboard !== null)) ? self.setNotification(response.dashboard,"dashboardNotify") :$("#dashboardNotify").css('display','none');
			((response.confirmedOffer !== 0)&&(response.confirmedOffer !== null)) ? self.setNotification(response.confirmedOffer,"confirmedOffersNotify") :$("#confirmedOffersNotify").css('display','none');
			((response.unconfirmedOffer !== 0)&&(response.unconfirmedOffer !== null))? self.setNotification(response.unconfirmedOffer,"unConfirmedOffersNotify"): $("#unConfirmedOffersNotify").css('display','none');
			((response.directOffer !== 0)&&(response.directOffer !== null)) ? self.setNotification(response.directOffer,"DONotify") : $("#DONotify").css('display','none');
			((response.trade !== 0)&&(response.trade !== null)) ? self.setNotification(response.trade,"tradeNotify") : $("#tradeNotify").css('display','none');
			((response.rfq !== 0)&&(response.rfq !== null))? self.setNotification(response.rfq,"rfqNotify") : $("#rfqNotify").css('display','none');
			((response.rfq !== 0)&&(response.rfq !== null)) ? self.setNotification(response.rfq,"supplierRFQNotify") : $("#supplierRFQNotify").css('display','none');
			((response.rejectedOffer !== 0)&&(response.rejectedOffer !== null)) ? self.setNotification(response.rejectedOffer,"RONotify") : $("#RONotify").css('display','none');
		}
		((response.trackTasks !== 0)&&(response.trackTasks !== null)) ? self.setNotification(response.trackTasks,"trackTaskNotify") : $("#trackTaskNotify").css('display','none');
		((response.documentApproval !== 0)&&(response.documentApproval !== null)) ? self.setNotification(response.documentApproval,"documentApprovalNotify") : $("#documentApprovalNotify").css('display','none');
		((response.documentUpload !== 0)&&(response.documentUpload !== null)) ? self.setNotification(response.documentUpload,"documentUploadNotify") : $("#documentUploadNotify").css('display','none');
	}
	
	this.updateNotification = function(selectedTab,offerIds){
		var requestObject = {};
		requestObject.offerIds = offerIds;
		requestObject.offerType = selectedTab;
		$.ajax({
	 		url : "/bhp-back-office/updateNotification",
	 		type: 'POST',
	 		contentType: "application/json; charset=utf-8",
            data: JSON.stringify(requestObject),
            dataType: 'json',
	 		success : self.notificationSuccess,
		    error: function(){
		    	self.getNotification()
		    }
	 	});
	}
	
	this.hideLoader = function(){
		$('#loading').hide();
	}
	
	this.showLoader = function(){
		$('#loading').show();
		var containerHeight = $('.container').height();
		$('#loading').css("min-height",containerHeight);
	}
	
	this.getCurrentDateFormat = function(){
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd;
	    } 
	    if(mm<10){
	        mm='0'+mm;
	    } 
	    return today = dd+'-'+mm+'-'+yyyy;
	}
	
	this.setSelectAll = function(dataCount){
		if(($("table input[name='offer-id']:checked").length == dataCount)&& (dataCount !== 0)){
			$( ".select_all_check" ).prop( "checked", true );
		}
	}
	
	this.setCustomizeSelectAll = function(dataCount,tabId){
		if(($("#"+tabId+" input[name='offer-id']:checked").length == dataCount)&& (dataCount !== 0)){
			$( ".cpm_select_all_check" ).prop( "checked", true );
		}else{
			$( ".cpm_select_all_check" ).prop( "checked", false );
		}
	}
	
	this.getAdvSearchTradeFields = function(mod){
		$('.advanced_search_element.trade_field').removeClass('display_none');
		if(mod=="DEALER"){
			$("input[name='offerId']").parent().addClass('display_none');
		}
		$("input[name='availability'],input[name='expiry']").parent().parent().addClass('display_none');
		$("input[name='offerId']").parent().addClass('display_none');
	}
	this.getAdvSearchTradeFieldOperator = function(mod){
		$('.advanced_search_element.trade_field').removeClass('display_none');
		$("input[name='offerId']").parent().addClass('display_none');
		$('.advanced_search_element.premium_cpm,.advanced_search_element.premium_groups').addClass('display_none');
		$("input[name='availability'],input[name='expiry']").parent().parent().addClass('display_none');
		$('.advanced_search_element.trade_field').removeClass('display_none');	
	}
	
	this.getRFQFields = function(){
		$('.advanced_search_element.rfq_field').removeClass('display_none');
	}
	
	this.getDateFormatValue = function(timeStamp){
		if(timeStamp !== null){
			var today = new Date(timeStamp);
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd='0'+dd;
			} 

			if(mm<10) {
			    mm='0'+mm;
			} 

			return today = dd+'-'+mm+'-'+yyyy;
		}else{
			return "";
		}
	}
	
	this.getGroupExportData = function(arrData,i){
		return '"'+arrData[i].groupId+'"\t'+
	  		   '"'+arrData[i].metal.metal+'"\t'+
	  		   '"'+arrData[i].premium+'"\t';
	}
	this.getCpmExportData =  function(arrData,i){
		return  '"' + arrData[i].accountCode + '"\t'+
				'"' + arrData[i].accountDesc + '"\t'+
	  			'"' + arrData[i].premiumGroup.groupId + '"\t'+
	  			'"' + arrData[i].premiumGroup.metal.metal + '"\t'+
	  			'"' + arrData[i].premiumGroup.premium + '"\t';
	}
	this.tradeReportData =  function(arrData,i,selectedTrade){
		var rowData =  '"' + arrData[i].tradeId + '"\t';
//				if(selectedTrade == "Trades_Report"){
//					rowData = rowData+'"' + arrData[i].offer.offerId + '"\t';
//				}
				rowData = rowData+'"' + arrData[i].offer.offerMaster.commodity.metal.metal + '"\t'+
				'"' + arrData[i].offer.offerMaster.commodity.commodityBrand.code + '"\t'+
				'"' + arrData[i].offer.offerMaster.commodity.metal.inventory + '"\t'+
				'"' + arrData[i].offer.offerMaster.commodity.commodityType.code + '"\t'+
				'"' + arrData[i].offer.offerMaster.commodity.metal.purity + '"\t'+
				'"' + arrData[i].offer.offerMaster.commodity.metal.qtyType + '"\t'+
				'"' + arrData[i].offer.offerMaster.eqOzs + '"\t'+
				'"' + arrData[i].offer.offerMaster.quantity + '"\t'+
				'"' + arrData[i].offer.offerMaster.city.description + '"\t'+
			    '"' + arrData[i].deliveryAddress + '"\t';
      		    if(selectedTrade == "Trades_Report"){
      		    	rowData = rowData+'"' + arrData[i].supplierPremium + '"\t';	
      		    }
      		    rowData = rowData+'"' + self.getDateFormatValue(arrData[i].tradeDate) + '"\t'+
      		    '"' + self.getDateFormatValue(arrData[i].etaDate) + '"\t'+
      		    '"' + arrData[i].status + '"\t';
      		    return  rowData;
	}
	this.prependZeroToDecimalInput = function(){
		$(".container").on('change',"input[name=premium],input[name=freightPremium],input[name=maxPremium]",function(){
			   var val = this.value;
			   if(val.charAt(0) === '.'){
			     this.value = ('0'+val); 
			   }
			});
	}
	
	this.JSONToXLSConvertor=function (JSONData, ReportTitle, ShowLabel,tableId, tableHeader) {
 	   if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!window.navigator.userAgent.match(/Trident.*rv\:11\./)) {
 		   fnExportHTML(tableId,"#dddd",ReportTitle);
 	    }
 	    else //other browsers : Chrome/FireFox (Supported Data URIs)
 	    {
 	    	var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
     	    var XLS = '';
     	    if (ShowLabel) {
     	        var row = "";
     	        row = tableHeader;
     	        row = row.slice(0, -1);
     	        XLS += row + '\r\n';
     	    }
     	    for (var i = 0; i < arrData.length; i++) {
     	        var row = "";
     	        for (var index in arrData[i]) {
     	        	switch (ReportTitle){
	     	        	case 'Groups_Report': 
     	        		row = self.getGroupExportData(arrData,i);
     	        		break;
	     	        	case 'Cpm_Report':
		                row = self.getCpmExportData(arrData,i);
	                    break;
	     	        	case 'Trades_Report_Dealer':
		                row = self.tradeReportData(arrData,i,"Trades_Report_Dealer");
	                    break;
	     	        	case 'Trades_Report': 
		                row = self.tradeReportData(arrData,i,"Trades_Report");
	                    break;
     	        	}
     	        }
     	        row.slice(0, row.length - 1);
     	        XLS += row + '\r\n';
     	    }
     	    if (XLS == '') {        
     	        alert("Invalid data");
     	        return;
     	    }   
    	    var fileName = "Export";
    	    fileName += ReportTitle.replace(/ /g,"_");   
    	    var uri = 'data:text/xls;charset=utf-8,' + escape(XLS);
    	    var link = document.createElement("a");    
    	    link.href = uri;
    	    link.style = "visibility:hidden";
    	    link.download = fileName + ".xls";
    	    document.body.appendChild(link);
    	    link.click();
    	    document.body.removeChild(link);
 	    }
	}
	////Operator Changes Start
 	  this.getOutGoingInstructions = function(url){
			var tradeId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
			$(".inner_container").load(url+'/getOutgoingInstructionsPage?tradeId='+tradeId,function(){
				self.loadOutgoingInstructions(tradeId);
			});
		}
 	  
 	this.loadOutgoingInstructions = function(tradeId){
 			var ajaxUrl =  self.urlHash.BASE+'/findInstructionEntries?tradeId='+tradeId[0];
 			$.ajax({
 		 		url : ajaxUrl,
 		 		type: 'get',
 		 		success : function(response) {
 		 			self.populateInstructionData(response,tradeId);
 		 			//console.log(response);
 		 		}
 		 	});
 		}
	this.resetDashBoardActions = function(){
		$("#dashBard_current_chart").val('');
		$("#dashBard_inner_tab").val('');
		$("#dash_trade_id").val('');
	}
	this.downloadInstructionFileAction = function(tradeId){
		var downloadLink = self.urlHash.BASE;
		$("#release_metal_link").on("click", function() {
			window.location.href = downloadLink+'/getReleaseInsSupDocument?tradeId='+tradeId[0];
		});
		$("#colln_and_del_instn_link").on("click", function() {
			window.location.href = downloadLink+'/getCandDInsDocument?tradeId='+tradeId[0];
		});
		$("#trigger_metal_link").on("click", function() {
			window.location.href = downloadLink+'/getMetalPaymentRelInsDocument?tradeId='+tradeId[0];
		});
	}
	
 	/*this.getCollectionAndDeliveryInstruction = function(url){
		$("#colln_and_del_instn_link").click(function() {
			var tradeId = $('#header_notification_page').attr('data-tradeId');
			$(".container").load(url+'/getCollectionAndDeliveryInstructionPage?tradeId='+tradeId,function(){
				self.openDateTimePicker(); 
				self.cancelBtn();
			});
		});
	}
 	this.getCollectionAndDeliveryInstruction = function(url){
		$("#colln_and_del_instn_link").click(function() {
			var tradeId = $('#header_notification_page').attr('data-tradeId');
			$(".container").load(url+'/getCollectionAndDeliveryInstructionPage?tradeId='+tradeId,function(){
				self.openDateTimePicker(); 
				self.cancelBtn();
			});
		});
	}*/
 	/*this.getMetalPaymentReleaseInstruction = function(url){
		$("#metal_payment_inst_link").click(function() {
			var tradeId = $('#header_notification_page').attr('data-tradeId');
			$(".container").load(url+'/getMetalPaymentReleaseInstruction?tradeId='+tradeId,function(){
				self.openDateTimePicker(); 
				self.cancelBtn();
			});
		});
	}*/
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
	this.loadDocuments = function(tradeId){
		var ajaxUrl =  self.urlHash.BASE+'/findDocumentEntries?tradeId='+tradeId[0];
		$.ajax({
	 		url : ajaxUrl,
	 		type: 'get',
	 		success : function(response) {
	 			self.populateDoccumentData(response,tradeId);
	 			//console.log(response);
	 		}
	 	});
	}
	
	this.populateDoccumentData = function(response,tradeId){
		var response = JSON.parse(response);
		var docsData = [];

		var loopCount = 1;
        $('#listDocuments').DataTable({
            "data": self.returnTableData(response),
            "bFilter": false,
            "paging": false,
            "bSort": false,
            "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            	self.getRowData(response,nRow,loopCount);
            	loopCount++;
            	},
            "fnDrawCallback": function(settings, ajax) {
            	
            },
        });
    	self.downloadFileAction(tradeId);
    	self.getVersionHistory(tradeId);
    	self.statusOnChange();
	
	}
	
	this.statusOnChange = function(){
		$('select[name="status"]').change(function(e) {
			if($(this).find('option:selected').text() !== "UPLOADED"){
				if($(this).find('option:selected').text() !== "SELECT"){
					var currentSelector = $(this);
				      swal({
				            title: "",
				            text: "Are you sure you want to change the status?",
				            type: "warning",
				            showCancelButton: true,
				            confirmButtonColor: "#1ab394",
				            confirmButtonText: "Ok",
				            closeOnConfirm: false,
				            allowOutsideClick:false
				        }, function (isConfirm) {
				        	if(isConfirm){
				        		self.setDoccumentStatus(currentSelector)
				        	}else{
				        		currentSelector.val(119)
				        	}
				        }); 
				}
			}
		});
	}
	
	this.setDoccumentStatus = function(thisObj){
		self.swLoader();
		$.ajax({
	 		url : self.urlHash.BASE +'/changeDocumentStatus?docId='+$(thisObj).attr('id')+"&status="+$(thisObj).find('option:selected').text(),
	 		type: 'get',
	 		success : function(response) {
	 			self.showStatusUpdate();
	 		}
	 	});
	}
	
	this.showStatusUpdate = function(){
			swal({
 		        title: "Success",
 		        text:"Status changed successfully",
 		        type: "success" ,
 		        confirmButtonColor: "#1ab394",
 		        allowOutsideClick:false,
 		        closeOnConfirm: true},
 		        function(){
 		        	if($("#dashBard_current_chart").val().length > 0){
 		        		self.rootParent.goDashBoard($("#dashBard_inner_tab").val(),$("#dashBard_current_chart").val());
 		        	}else{
 		        		$('#DOCZ').trigger('click');
 		        	}
 		    });
	}
	
	
	
	this.downloadFileAction = function(tradeId){
		var downloadLink = self.urlHash.BASE,
		thisTradeId;
		if(tradeId[0]==undefined){
			thisTradeId = tradeId;
		}else{
			thisTradeId = tradeId[0];
		}
		$("#release_inst_link").on("click", function() {
			window.location.href = downloadLink+'/getBarlistDocument?tradeId='+thisTradeId;
		});
		$("#colln_and_del_instn_link").on("click", function() {
			window.location.href = downloadLink+'/getCooDocument?tradeId='+thisTradeId;
		});
		$("#metal_payment_inst_link").on("click", function() {
			window.location.href = downloadLink+'/getCoaDocument?tradeId='+thisTradeId;
		});
	}
	
	this.versionBackAction =  function(){
		$("#version_back_btn").on("click", function() {
			if($(".inner_container").length > 0){
				$('.secondary-nav .active .tab').trigger('click');
			}else{
				var tradeId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
				self.uploadDocLister(tradeId[0],"SUPPLIER");
			}
		});
	}
	
	this.docViewCloseAction = function(){
		$("#close_documents_view").on("click", function() {
			self.viewDealerDetailsFunction("SUPPLIER");		
		});
	}
	
	this.getVersionHistory = function(tradeId){
		var versionLink = self.urlHash.BASE,
		thisTradeId;
		if(tradeId[0]==undefined){
			thisTradeId = tradeId;
		}else{
			thisTradeId = tradeId[0];
		}
		$("#release_inst_version").on("click", function() {
			if($(this).attr('class') !== "disabled_link"){
				var container = "";
                if($(".inner_container").length > 0){
                	container = ".inner_container"
				}else{
					container = ".container"
				}
				$(container).load(encodeURI(versionLink+'/versionHistoryTab?tradeId='+thisTradeId+"&fileType=Bar List"), function(){
					$("#header_notification_page").html("Bar List Version History");
					self.setVersionHistory($("#tradeId").val(),$("#fileType").val());
					self.versionBackAction();
				});
			}
		});
		$("#colln_and_dlvry_inst_version").on("click", function() {
			if($(this).attr('class') !== "disabled_link"){
				var container = "";
                if($(".inner_container").length > 0){
                	container = ".inner_container"
				}else{
					container = ".container"
				}
                $(container).load(encodeURI(versionLink+'/versionHistoryTab?tradeId='+thisTradeId+"&fileType=Certificate Of Origin"), function(){
                	$("#header_notification_page").html("Certificate Of Origin Version History");
                	self.setVersionHistory($("#tradeId").val(),$("#fileType").val());
                	self.versionBackAction();
				});
			}
		});
		$("#metal_paymnt_inst_version").on("click", function() {
			if($(this).attr('class') !== "disabled_link"){
				var container = "";
                if($(".inner_container").length > 0){
                	container = ".inner_container"
				}else{
					container = ".container"
				}
                $(container).load(encodeURI(versionLink+'/versionHistoryTab?tradeId='+thisTradeId+"&fileType=Certificate Of Assay"), function(){
                	$("#header_notification_page").html("Certificate Of Assay Version History");
                	self.setVersionHistory($("#tradeId").val(),$("#fileType").val());
                	self.versionBackAction();
				});
			}
		});
		$("#release_supplier_inst_version").on("click", function() {
			if($(this).attr('class') !== "disabled_link"){
				var container = "";
                if($(".inner_container").length > 0){
                	container = ".inner_container"
				}else{
					container = ".container"
				}
                $(container).load(encodeURI(versionLink+'/versionHistoryTab?tradeId='+thisTradeId+"&fileType=Release instruction to supplier"), function(){
					$("#header_notification_page").html("Release instruction Version History");
					self.setVersionHistory($("#tradeId").val(),$("#fileType").val());
					self.versionBackAction();
				});
			}
		});
		$("#colln_and_dlvry_shpng_inst_version").on("click", function() {
			if($(this).attr('class') !== "disabled_link"){
				var container = "";
                if($(".inner_container").length > 0){
                	container = ".inner_container"
				}else{
					container = ".container"
				}
				$(container).load(encodeURI(versionLink+'/versionHistoryTab?tradeId='+thisTradeId+"&fileType=Collection and Delivery Instruction To Shipping Agent"), function(){
                	$("#header_notification_page").html("Collection and Delivery Instruction Version History");
                	self.setVersionHistory($("#tradeId").val(),$("#fileType").val());
                	self.versionBackAction();
				});
			}
		});
		$("#review_and_trigger_inst_version").on("click", function() {
			if($(this).attr('class') !== "disabled_link"){
				var container = "";
                if($(".inner_container").length > 0){
                	container = ".inner_container"
				}else{
					container = ".container"
				}
                $(container).load(encodeURI(versionLink+'/versionHistoryTab?tradeId='+thisTradeId+"&fileType=Metal Payment Release Instruction"), function(){
                	$("#header_notification_page").html("Metal Payment Release Version History");
                	self.setVersionHistory($("#tradeId").val(),$("#fileType").val());
                	self.versionBackAction();
				});
			}
		});
	}
	
	this.loadCharts = function(dataCountUrl){
		self.getNotification()
		$(".inner_container").html("");
		var chartArea = '<div class="charts_container col-xs-12 col-md-12 col-sm-12"><div class="chart_top_cover"><p class="total_open_count" id="total_count"></p><div class="chart_label_container">'+
		 '<div><span></span><p>Critical</p></div><div><span></span><p>Medium Criticality</p></div><div><span></span><p>Non Critical</p></div>'+
		 '</div></div><div class="chart_cover col-xs-12 col-md-4 col-sm-6">'+
         '<canvas id="canvas1" height="180" width="180" data-count="" style="cursor:pointer"></canvas><p>Critical</p></div><div class="chart_cover col-xs-12 col-md-4 col-sm-6">'+
         '<canvas id="canvas2" height="180" width="180" data-count="" style="cursor:pointer"></canvas><p>Medium Criticality</p></div><div class="chart_cover col-xs-12 col-md-4 col-sm-6">'+
         '<canvas id="canvas3" height="180" width="180" data-count="" style="cursor:pointer"></canvas><p>Non Critical</p></div></div>';
        $(".inner_container").html(chartArea);
        self.rootParent.getChartData(dataCountUrl);
        self.addClickToChart();
	}
	
	   this.displayChart = function(response){
		   var criticalData = 0;
		   var mediumCriticalData = 0;
		   var nonCriticalData  = 0;
		   if(response.total !== 0){		
			    criticalData = (response.critical/response.total)*100;		
			    mediumCriticalData = (response.mediumCritical/response.total)*100;		
			    nonCriticalData = (response.nonCritical/response.total)*100;		
		   }
    	   var pieData1 = [
    	                  {
    	                    value: parseInt(criticalData),
    	                    serverCount: response.critical,
    	                    color:"#EE7967"
    	                  },
    	                  {
    	                    value : 100-parseInt(criticalData),
    	                    color : "#EAEDF2"
    	                  }
    	                ];
    	   var pieData2 = [
     	                  {
     	                    value: parseInt(mediumCriticalData),
     	                    serverCount: response.mediumCritical,
     	                    color:"#F9BC13"
     	                  },
     	                  {
     	                    value : 100-parseInt(mediumCriticalData),
     	                    color : "#EAEDF2"
     	                  }
     	                ];
    	   var pieData3 = [
     	                  {
     	                    value: parseInt(nonCriticalData),
     	                    serverCount: response.nonCritical,
     	                    color:"#A3D80C"
     	                  },
     	                  {
     	                    value : 100-parseInt(nonCriticalData),
     	                    color : "#EAEDF2"
     	                  }
     	                ];

    	   var options = {
    	            segmentShowStroke : true,
    	            segmentStrokeColor : "#fff",
    	            segmentStrokeWidth : 2,
    	            percentageInnerCutout : 80,
    	            animation : true,
    	            animationSteps : 100,
    	            animationEasing : "easeOutBounce",
    	            animateRotate : true,
    	            animateScale : false,
    	            onAnimationComplete : null,
    	            labelFontFamily : "Arial",
    	            labelFontStyle : "normal",
    	            labelFontSize : 38,
    	            labelFontColor : "#627C8D"
    	        };

    	   var context1 = document.getElementById('canvas1').getContext('2d');
    	   var context2 = document.getElementById('canvas2').getContext('2d');
    	   var context3 = document.getElementById('canvas3').getContext('2d');
    	   var skillsChart1 = new Chart(context1).Doughnut(pieData1,options);
    	   var skillsChart2 = new Chart(context2).Doughnut(pieData2,options);
    	   var skillsChart3 = new Chart(context3).Doughnut(pieData3,options);
    	   $("#total_count").html("Total Open Count Of Items: "+response.total);
    	   $('#canvas1').attr('data-count',response.critical);
    	   $('#canvas2').attr('data-count',response.mediumCritical);
    	   $('#canvas3').attr('data-count',response.nonCritical);
    };
	
	this.setVersionHistory = function (tradeId,fileType) {
		var versionLink = self.urlHash.BASE;
		var loopCount = 1;
		oTable = $('#listVersionHistory')
				.DataTable(
						{
							'ajax' : encodeURI(versionLink+'/getVersionHistory?tradeId='+tradeId+"&fileType="+fileType),
							'serverSide' : true,
							"responsive" : true,
							"bDestroy" : true,
//							"order": [1, "desc"],
							 "pagingType": "full",
							"language": {
			                    "zeroRecords": "No data to dispay"
			                },
			                "oLanguage": {
			                    "sProcessing": self.setLoader()
			                  },
			                 "processing": true,
			                 "fnRowCallback" : function(nRow, aData,
										iDisplayIndex, iDisplayIndexFull) {
								},
							"fnDrawCallback" : function(oSettings) {
								self.downloadVersion()
								self.hidePaginate(this);
								loopCount=1;
							},
							"columns" : [
									{
										data : "instructionStatus",
										"bSortable" : false,
										sClass: 'align-center',
										"render" : function(data) {
											console.log(loopCount)
											return loopCount++;
										}
									},
									{
										data : 'document',
										sClass : 'align-center'	,
										"render" : function(data) {
											return "<center><span class='enabled_table_link' type-attr='"+ data.id + "'>"+data.docName+"</span></center>"
										}
									},
									{	
										data: 'document.createdDate',
										sClass : 'align-center',
										"render": function(data) {
					                        return self.formatDateddMMYYYYHHmm(data)
					                    },
									},
									{
										data :  'document.createdBy.accountCode',
										sClass : 'align-center',
									}
									],

							"fnCreatedRow" : function(nRow, aData, iDataIndex) {
								
							}
						});
	};
	
	this.downloadVersion = function(){
		var downloadLink = self.urlHash.BASE;
		$(".enabled_table_link").on("click", function() {
				window.location.href = downloadLink+'/getVersionHistoryDocument?docId='+$(this).attr('type-attr');
		});
	}
	
	this.getRowData =  function(response,nRow,loopCount){
    	switch(loopCount){
    	case 1:
    		if(response['bar list'] == undefined)
    		     nRow.className = "disabled_row odd";
    		else{
    			if(response['ifOperator'] == true){
    				$(nRow).find('select').find('option:contains('+JSON.parse(response['bar list']).status+')').attr("selected", true);
    				if(JSON.parse(response['bar list']).status == "UPLOADED"){
        		    	$(nRow).find('select').removeAttr("disabled");
        		    	$(nRow).find('select').attr("id",JSON.parse(response['bar list']).document.id);
        		    }	
        		   nRow.className = "odd";
    			}
    		}
    		break;
    	case 2:
    		if(response['Certificate of Origin'] == undefined)
        		nRow.className = "disabled_row even";
    		else{
    			if(response['ifOperator'] == true){
    				$(nRow).find('select').find('option:contains('+JSON.parse(response['Certificate of Origin']).status+')').attr("selected", true);
    				$(nRow).find('select').attr("id","crtfct_origin");
    				if(JSON.parse(response['Certificate of Origin']).status == "UPLOADED"){
    			    	$(nRow).find('select').removeAttr("disabled");
    			    	$(nRow).find('select').attr("id",JSON.parse(response['Certificate of Origin']).document.id);
    			    }	
    			}
    		    nRow.className = "even";
    		}
        		break;
    	case 3:
    		if(response['Certificate of Assay'] == undefined)
        		nRow.className = "disabled_row odd";
    		else{
    			if(response['ifOperator'] == true){
    				$(nRow).find('select').find('option:contains('+JSON.parse(response['Certificate of Assay']).status+')').attr("selected", true);
    				$(nRow).find('select').attr("id","crtfct_assay");
    				if(JSON.parse(response['Certificate of Assay']).status == "UPLOADED"){
    			    	$(nRow).find('select').removeAttr("disabled");
    			    	$(nRow).find('select').attr("id",JSON.parse(response['Certificate of Assay']).document.id);
    			    }	
    			}
    		    nRow.className = "odd";
    		}
        		break;
    	}
    	  return nRow;
	}
	
	this.returnTableData = function(response){
		var docsData = [];
		var instLinkClass = "disabled_link";
		var instOriginClass = "disabled_link";
		var instAssayClass = "disabled_link";
		var statusKeys = [];
		var statusValues = "";
		var barDate = "---";
		var orginDate = "---";
		var assayDate = "---";
		var barDateArray = [];
		var originArray = [];
		var assayArray = [];
		
		if(response['bar list'] !== undefined){
			instLinkClass = "enabled_table_link"
			barDate =  response['bar list date']+'(GMT)';//.split(/(\s+)/);
			//barDate = barDateArray[0]+'</br>'+barDateArray[2]+" (GMT)";
		}
		if(response['Certificate of Origin'] !== undefined){
			instOriginClass = "enabled_table_link";
			orginDate = response['Certificate of Origin date']+'(GMT)';//.split(/(\s+)/);
			//orginDate = originArray[0]+'</br>'+originArray[2]+" (GMT)";
		}
		if(response['Certificate of Assay'] !== undefined){
			instAssayClass = "enabled_table_link";
			assayDate = response['Certificate of Assay date']+'(GMT)';//.split(/(\s+)/);
//			assayDate = assayArray[0]+'</br>'+assayArray[2]+" (GMT)";
		}
		var statusKeyValues = response.getStatusValues;
		if(response['ifOperator'] == true){
		   statusValues = '<center><select name="status" class="form-control" style="width:54%;" disabled><option value="">SELECT</option>'
			
			for (var key in statusKeyValues) {
				statusValues = statusValues +'<option value="'+statusKeyValues[key]+'">'+key+'</option>';
	        }
		   statusValues = statusValues + '</select></center>';
			
		}else{
			if(response['bar list'] !== undefined){
				statusKeys.push('<center>'+JSON.parse(response['bar list']).status+'</center>');
			}else{
				statusKeys.push('<center>---</center>');
			}
			if(response['Certificate of Origin'] !== undefined){
				statusKeys.push('<center>'+JSON.parse(response['Certificate of Origin']).status+'</center>');
			}else{
				statusKeys.push('<center>---</center>');
			}
			if(response['Certificate of Assay'] !== undefined){
				statusKeys.push('<center>'+JSON.parse(response['Certificate of Assay']).status+'</center>');
			}else{
				statusKeys.push('<center>---</center>');
			}
		}
		
		docsData[0] = new Array('<center><span id="release_inst_link" class="'+instLinkClass+'">Bar List</span></center>',
				response['ifOperator'] == true ? statusValues :statusKeys[0],
				'<center>'+barDate+'</center>', 
				'<center><span id="release_inst_version" class="'+instLinkClass+'">Version History</span></center>');
		docsData[1] = new Array('<center><span id="colln_and_del_instn_link" '+
				'class="'+instOriginClass+'">Certificate Of Origin</span></center>', 
				response['ifOperator'] == true ? statusValues :statusKeys[1],
				'<center>'+orginDate+'</center>', 
				'<center><span id="colln_and_dlvry_inst_version" '+
				'class="'+instOriginClass+'">Version History</span></center>');
		docsData[2] = new Array('<center><span id="metal_payment_inst_link" '+
				'class="'+instAssayClass+'">Certificate Of Assay</span></center>',
				response['ifOperator'] == true ? statusValues :statusKeys[2],
				'<center>'+assayDate+'</center>',
				'<center><span id="metal_paymnt_inst_version" '+
				'class="'+instAssayClass+'">Version History</span></center>');
		return docsData;
	}
	
	this.populateInstructionData = function(response,tradeId){
		var docsData = [];
		var instLinkClass = "disabled_link";
		var instOriginClass = "disabled_link";
		var instAssayClass = "disabled_link";
		var statusKeys = [];
		var statusValues = "";
		var barDate = "---";
		var orginDate = "---";
		var assayDate = "---";
		var barDateArray = [];
		var originArray = [];
		var assayArray = [];
		var response = JSON.parse(response);
		if(response['Release instruction to supplier'] !== undefined){
			instLinkClass = "enabled_table_link"
			barDate = response['Release instruction to supplier date']+'(GMT)';//.split(" ");
			//var timeValue = dateValue[1].split(".")
			//barDate = dateValue[0]+'</br>'+timeValue[0]+" (GMT)";
			statusKeys.push('<center>'+JSON.parse(response['Release instruction to supplier']).instructionStatus+'</center>');
		}else{
			statusKeys.push('<center>---</center>');
		}
		if(response['Collection and Delivery Instruction To Shipping Agent'] !== undefined){
			instOriginClass = "enabled_table_link";
			orginDate = response['Collection and Delivery Instruction To Shipping Agent date']+'(GMT)';//.split(" ");
			//var timeValue = dateValue[1].split(".")
			//orginDate = dateValue[0]+'</br>'+timeValue[0]+" (GMT)";
			statusKeys.push('<center>'+JSON.parse(response['Collection and Delivery Instruction To Shipping Agent']).instructionStatus+'</center>');
		}else{
			statusKeys.push('<center>---</center>');
		}
		if(response['Metal Payment Release Instruction'] !== undefined){
			instAssayClass = "enabled_table_link";
			assayDate = response['Metal Payment Release Instruction date']+'(GMT)';//.split(" ");
			//var timeValue = dateValue[1].split(".")
			//assayDate = dateValue[0]+'</br>'+timeValue[0]+" (GMT)";
			statusKeys.push('<center>'+JSON.parse(response['Metal Payment Release Instruction']).instructionStatus+'</center>');
		}else{
			statusKeys.push('<center>---</center>');
		}
		//if(response.)
		var docsData = [];

		var loopCount = 1;
		var demoData = [];
        demoData[0] = new Array('<center><span id="release_metal_link" class="'+instLinkClass+'">Release instruction to supplier</span>'+
        						'</center>', 
        						statusKeys[0],
        						'<center>'+barDate+'</center>', 
        						'<center><span id="release_supplier_inst_version" class="'+instLinkClass+'">Version History</span></center>');
        demoData[1] = new Array('<center><span id="colln_and_del_instn_link" '+
        						'class="'+instOriginClass+'">Collection & Delivery Instruction To Shipping Agent</span></center>',
        						statusKeys[1],
        						'<center>'+orginDate+'</center>', 
        						'<center><span id="colln_and_dlvry_shpng_inst_version" '+
        						'class="'+instOriginClass+'">Version History</span></center>');
        demoData[2] = new Array('<center><span id="trigger_metal_link" '+
        		'class="'+instAssayClass+'">Metal Payment Release Instruction To Shipping Agent</span></center>',
        		statusKeys[2],
				'<center>'+assayDate+'</center>', 
				'<center><span id="review_and_trigger_inst_version" '+
				'class="'+instAssayClass+'">Version History</span></center>');
        $('#listOutInstructions').DataTable({
            "data": demoData,//self.returnTableData(response),
            "bFilter": false,
            "paging": false,
            "bSort": false,
            "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            	//self.getRowData(response,nRow,loopCount);
            	//loopCount++;
            	},
            "fnDrawCallback": function(settings, ajax) {

            },
        });
        self.downloadInstructionFileAction(tradeId);
        self.getVersionHistory(tradeId);
	}
	
 	this.getTradeCheckListMails = function(url){
		var tradeId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		$(".inner_container").load(url+'/getTradeMailsPage?tradeId='+tradeId,function(){
			self.setLastSentDate(tradeId,url);
		});
	}
 	this.setLastSentDate = function(tradeId,url){
		$.ajax({
	 		url : url+'/getLatestMailSentDates',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: tradeId, 
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			self.setDataTableData(response,tradeId);
	 		}
	 	});
	}
 	
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
	    self.reIssueMail(tradeId);
	}
 	
 	this.setReIssueLink = function(){
		var operatorType = $('#operator_type').val();
		if(operatorType=="SUP"){
			$('#reissue_link_to_customer').hide();
		}else if(operatorType=="CUS"){
			$('#reissue_link_to_supplier').hide();
		}
	}
 	this.reIssueMail = function(tradeId){
 		$('#reissue_link_customer').click(function(){
 			self.reIssueRequest(tradeId,"CUS");
 		});
 		$('#reissue_link_to_customer').click(function(){
 			self.reIssueRequest(tradeId,"CUS");
 		});
      $('#reissue_link_supplier').click(function(){
    	  self.reIssueRequest(tradeId,"SUP");
 		});
      $('#reissue_link_to_supplier').click(function(){
    	  self.reIssueRequest(tradeId,"SUP");
 		});
 	}
 	
 	self.reIssueRequest = function(tradeId,userType){
 		self.swLoader();
		$.ajax({
	 		url : baseUrl+'/reIssueMail?tradeId='+tradeId[0]+"&userType="+userType,
	 		type: 'get',
	 		success : function(response) {
	 			swal({
	 		        title: "Success",
	 		        text:"Mail has been re-issued",
	 		        type: "success" ,
	 		        confirmButtonColor: "#1ab394",
	 		        allowOutsideClick:false,
	 		        closeOnConfirm: true
	 		        });
	 		}
	 	});
 	}
 	
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
		});
	}*/
 	this.getcompletedTradeTasks = function(tradeId,BASE_URL){
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
	 			//console.log(response);
	 			self.checkCompletedCheckBoxes(response);
	 		}
	 	});
	}
 	this.checkCompletedCheckBoxes = function(tradeTasks){
		if(tradeTasks && tradeTasks.length > 0){
			for(var key in tradeTasks){
				$( '.checklist_checkbox' ).each(function( index ) {
					var currentAcc = $('.account-id').html();
					if(tradeTasks[key].task.id==parseInt($(this).attr('data-value'))&&tradeTasks[key].taskAssignedTo==currentAcc
							&&tradeTasks[key].completed!='0'){
						//this.setAttribute('checked',true);
						//$(this).attr('disabled',true);
						$(this).addClass('checked_list');
						$(this).parent().find('span').removeClass('glyphicon-unchecked check_disabled').addClass('glyphicon-check');
					}
					if(tradeTasks[key].task.id==parseInt($(this).attr('data-value'))&&tradeTasks[key].task.taskOwner=='D'
						&&tradeTasks[key].completed!='0'){
						//this.setAttribute('checked',true);
						//$(this).attr('disabled',true);
						$(this).addClass('checked_list');
						$(this).parent().find('span').removeClass('glyphicon-unchecked check_disabled').addClass('glyphicon-check');
					}
					if(tradeTasks[key].task.id==parseInt($(this).attr('data-value'))&&tradeTasks[key].taskAssignedTo==currentAcc &&
							tradeTasks[key].completed=='0'){
						//this.removeAttribute('checked');
						//this.removeAttribute('disabled');
						$(this).removeClass('checked_list check_disabled').addClass('check_enabled');
						$(this).parent().find('span').addClass('glyphicon-unchecked').removeClass('glyphicon-check');
					}
					if(tradeTasks[key].task.id==parseInt($(this).attr('data-value'))&&tradeTasks[key].task.checkboxId=='trigger_metal_pay_release'
						    &&tradeTasks[key].completed!='0'){
						//this.setAttribute('checked',true);
						//$(this).attr('disabled',true);
						$(this).addClass('checked_list');
						$(this).parent().find('span').removeClass('glyphicon-unchecked check_disabled').addClass('glyphicon-check');
					}
					
				});
			}
		}
	}
	
	this.setMetalPaymtRelInstn = function(BASE_URL,edited,header){
		self.swLoader();
		var tradeId = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
		$.ajax({
	 		url : BASE_URL+'/getMetalPaymtRelInstn',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            data: tradeId[0], 
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			self.SubmitApproval(response.id,BASE_URL,edited);
	 		}
	 	});
	}
	
	 //new
	/*this.createApprovePopUp = function(tradeObject,BASE_URL,header){
		swal.closeModal();
		self.resetPopUp();
	    $('#popup-2').fadeIn(350);
	    //$('.approve_popup, .RI_popup, .CDI_popup, .MPRI_popup').addClass('hidden');
    	//$('.approve_popup, .approve_field').removeClass('hidden');
    	$('.pcd_edit_field').addClass('hidden');
	    if(header){
	    	$('#confirm_pop_id').html(self.getHeader(header));
	    }
	    if(header == "instruct_metal_release"){
		    $('.popup_currency').css('border-bottom','1px solid #eee');
		    	$('.approve_popup, .RI_popup, .CDI_popup, .MPRI_popup').addClass('hidden');
		    	$('.RI_popup.approve_popup').removeClass('hidden');
		    }
		    else if(header == "instruct_metal_collection"){
		    	$('.approve_popup, .RI_popup, .CDI_popup, .MPRI_popup').addClass('hidden');
		    	$('.CDI_popup.approve_popup').removeClass('hidden');
		    }
		    else if(header == "instruct_metal_pay_release"){
		    	$('.approve_popup, .RI_popup, .CDI_popup, .MPRI_popup').addClass('hidden');
		    	$('.MPRI_popup.approve_popup').removeClass('hidden');
		    	$('.popup_currency').css('border-bottom','none');
		    }
	    self.fillPopUpData(tradeObject,"approve_btn",BASE_URL);
	    $( ".close_modal_btn, #cancel_approve").click(function(){
	    	self.fadeOutPopUp();
	    	$('#rel_inst_comments').val('');
	    });
	    self.SubmitApproval(tradeObject.id,BASE_URL,"approve_btn");
	}
	
	this.createEditPopUp = function(tradeObject,BASE_URL,header){
		swal.closeModal();
		$('#popup-2 .edit_field').removeClass('hidden');
		$('#rel_inst_details').val($('.release_instruction_details p:not(".hidden")').text().trim());
	    $('#popup-2').fadeIn(350);
	    if(header == "instruct_metal_release"){
	    $('.popup_currency').css('border-bottom','1px solid #eee');
	    	$('.approve_popup, .RI_popup, .CDI_popup, .MPRI_popup').addClass('hidden');
	    	$('.RI_popup').removeClass('hidden');
	    }
	    else if(header == "instruct_metal_collection"){
	    	$('.approve_popup, .RI_popup, .CDI_popup, .MPRI_popup').addClass('hidden');
	    	$('.CDI_popup').removeClass('hidden');
	    }
	    else if(header == "instruct_metal_pay_release"){
	    	$('.approve_popup, .RI_popup, .CDI_popup, .MPRI_popup').addClass('hidden');
	    	$('.MPRI_popup').removeClass('hidden');
	    	$('.popup_currency').css('border-bottom','none');
	    }
	    $("#submit_approve, #rel_inst_comments, .approve_field").addClass("hidden");
	    self.fillPopUpData(tradeObject,"edit_btn",BASE_URL);
	    $( ".close_modal_btn,#cancel_approve").click(function(){
	    	$("#DATextArea").val("");
	    	self.fadeOutPopUp();
	    	//hide edit fields
	    	self.resetPopUp();
	    	});
	    if(header){
	    	$('#confirm_pop_id').html(self.getHeader(header));
	    }
	  self.setEditedValues();  
	    
	    //self.SubmitApproval(tradeObject.id,BASE_URL,"edit_btn");
    }
	this.resetPopUp=function(){
		$("#submit_approve, #rel_inst_comments, .sup_acc_id").removeClass("hidden");
		$('#popup-2 .edit_field').addClass("hidden");
	}
	this.setEditedValues = function(){
		$('#submit_edit').click(function(){
			$('#submit_edit').unbind('click');
			$('.destination_address').html($('#DATextArea').val().trim());
			$('.destination_location').html($('#deliveryLoc option:selected').text().trim());
			$('.freight_company').html($('#freight_compny_id').text().trim());
			$('.destination_location').attr('data-locid',$('#deliveryLoc option:selected').val());
			$('#pcd_picker').val($('#new_pcd_picker').val());
			$('.release_instruction_details').html("<p>"+$('#rel_inst_details').val()+"</p>");
			$('.release_instruction_details').addClass("hidden");
			$('.RID_textarea').val($('#rel_inst_details').val()).removeClass('hidden');
			checklistEdited=true;
			$('.destination_location').attr('data-locid',$('.deliveryLoc').val());
			self.resetPopUp();
			self.fadeOutPopUp();
			
		});
		
	}
	this.fillPopUpData = function(tradeObject,btn,BASE_URL){
		var availDate = new Date(tradeObject.tradeMaster.tradeDate),
		setAvai = availDate.getDate()+'-'+parseInt(availDate.getMonth()+1)+'-'+availDate.getFullYear(),
		expDate = new Date(tradeObject.offer.offerMaster.expiry),
		setExp = expDate.getDate()+'-'+parseInt(expDate.getMonth()+1)+'-'+expDate.getFullYear(),
		phyCollnDate = new Date(tradeObject.physicalCollectionDate),
		setPhy = phyCollnDate.getDate()+'-'+parseInt(phyCollnDate.getMonth()+1)+'-'+phyCollnDate.getFullYear();
		var premium=tradeObject.tradeMaster.freightPremium+tradeObject.customerPremium;
		//$('#sup_acc_id').html(tradeObject.offer.accountCode);
		$('#trade_id').html(tradeObject.tradeId);
		$('#trade_date_id').html(setAvai);
		$('#customer_id').html(tradeObject.tradeMaster.createdBy.accountCode);
		$('#release_date_id').html('-');
		//$('#ETA_id').html(tradeObject.tradeId);
		$('#offer_id').html(tradeObject.offer.offerId);
		$('#metal_id').html(tradeObject.offer.offerMaster.commodity.metal.metal);
		$('#inventory_id').html(tradeObject.offer.offerMaster.commodity.metal.inventory);
		$('#brand_id').html(tradeObject.offer.offerMaster.commodity.commodityBrand.code);
		$('#type_id').html(tradeObject.offer.offerMaster.commodity.commodityType.code);
		$('#purity_id').html(tradeObject.offer.offerMaster.commodity.metal.purity);
		$('#qty_id').html(tradeObject.offer.offerMaster.quantity);
		$('#price_id').html($('.price_val').text());
		$('#source_loc_id').html(tradeObject.offer.offerMaster.city.description);
		$('#premium_id').html(premium);
		$('#availabilty_id').html(setAvai);
		$('#expiry_id').html(setExp);
		$('#new_pcd_picker').val($('#pcd_picker').val());
		$('#phy_colln_id').html($('#pcd_picker').val());
		$('#freight_premium_id').html($('.freight_premium').text());
		$('#destination_loc').html($('.destination_location').text().trim());
		$('#DATextArea').val($('.destination_address').text().trim());
		if(tradeObject.freightCompany){
			self.getDeliveryLocations(BASE_URL,tradeObject.freightCompany.city.id);
			$('#freight_compny_id').html(tradeObject.freightCompany.description);
			//$('#DATextArea').html(tradeObject.tradeMaster.deliveryAddress);
		}else{
			$('#freight_compny_id').html('-');
			//$('#DATextArea').attr("disabled",true);
			$('#deliveryLoc').attr("disabled",true);
			$('#freight_compny_id').attr("disabled",true);
		}
		if(checklistEdited){
			$('#destination_addr').html($('.destination_address').text().trim());
			$('#destination_loc').attr('data-locid',$('.destination_location').attr('data-locid'));
			$('.edit_field_final').removeClass("hidden");
		}
		
	}*/
	
//	this.resetPopUp=function(){
//		$("#submit_approve, #rel_inst_comments, .sup_acc_id").removeClass("hidden");
//		$('#popup-2 .edit_field').addClass("hidden");
//	}
	
/*	this.getDeliveryLocations = function(BASE_URL,frieghtId){
		$.ajax({
	 		url : BASE_URL+'/getDeliveryLocs',
	 		type: 'post',
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
	 		success : function(response) {
	 			console.log(response);
	 			if(response && response.length >0){
//	 				$('#deliveryLoc').append("<option>1</option>");
	 				var controlElementId = document.getElementById('deliveryLoc');
	 			    controlElementId.innerHTML = "<option>SELECT</option>";
	 			    for (var key in response) {
	 		            controlElementId[controlElementId.length] = new Option(response[key].description,response[key].id);
	 		        }
	 			}
	 			if(frieghtId!=undefined &&frieghtId!=null)
	 				$('#deliveryLoc').val(frieghtId);
	 			if($('.destination_location').attr('data-locid'))
	 				$('#deliveryLoc').val($('.destination_location').attr('data-locid'));
	 		}
	 	});
	}*/
	
	this.SubmitApproval = function(tradeId,BASE_URL,edited){
			self.swLoader();
			$.ajax({
		 		url : BASE_URL+'/updateCheckListTask',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: JSON.stringify(self.getTradeTaskDTO(tradeId,edited)), 
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			swal({
		 		        title: "Success",
		 		        text:response.message,
		 		        type: "success" ,
		 		        confirmButtonColor: "#1ab394",
		 		        allowOutsideClick:false,
		 		        closeOnConfirm: true},
		 		        function(){
		 		        	$('#rel_inst_comments').val('');
		 		        	$('#cancel_button').trigger('click');
		 		        	//self.rootParent.operatorCheckListFunction();
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
		                	$('#cancel_button').trigger('click');
		                	//self.rootParent.operatorCheckListFunction();
		                });
		 		}
		 	});
	}
    this.getfilterData = function() {
    	$("#cpmStatus" ).change(function() {
    		var cpmStatus=$('#cpmStatus option:selected').text(),
    		filters,
    		columMap = self.dealerCpmDataTableColumns;
    		if(cpmStatus=='ALL') {
    			cpmStatus='';
    		}else if(cpmStatus=='ACTIVE'){
    			cpmStatus = 0;
    		}else{
    			cpmStatus = 1;
    		}
    		filters=oTable.columns(columMap.deleted).search(cpmStatus);
    		if(filters) {
    			filters.draw();
    			//self.clearPreviousSelections();
    		}
		});
    }
    
    this.advanceSearchGroupsFieldUpdate=function(){
    	$('.advanced_search_element').addClass('display_none');
    	$('.advanced_search_element.premium_groups').removeClass('display_none');
    }
    
    this.advanceSearchCpmFieldUpdate=function(){
    	$('.advanced_search_element').addClass('display_none');
    	$('.advanced_search_element.premium_groups,.advanced_search_element.premium_cpm').removeClass('display_none');
    }
    
	this.getTradeTaskDTO=function(tradeId,edited){
		var tradeTaskDTO={};
		//if(checklistEdited)
			tradeTaskDTO.physicalCollectionDate=$("#pcd_picker").val();
		//else
			//tradeTaskDTO.physicalCollectionDate=$("#pcd_picker").val();
			tradeTaskDTO.tradeId=tradeId;
			tradeTaskDTO.destinationAddress=$('#destination_addr').val();
			tradeTaskDTO.insuranceReqmnts=$('#ins_req').val();
			tradeTaskDTO.servcieRequired=$('#service_req').val();
			tradeTaskDTO.instructions=$('.ID_textarea').val();
			//tradeTaskDTO.destinationLocation=$('#destination_loc').attr('data-locid');
			tradeTaskDTO.instructions=$('.RID_textarea').val();
			tradeTaskDTO.comments=$('#rel_inst_comments').val();
		if(edited)
			tradeTaskDTO.edit=true;
		else
			tradeTaskDTO.edit=false;
		return tradeTaskDTO;
	}
	this.fadeOutPopUp = function(){
		$('#popup-2').fadeOut(350);
	}
	this.resetFields = function(form){
		$(form).closest('form').find("input[type=text], textarea").val("");
	}
	//fn also in operator
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
	this.checkReviewed = function(){
		$('.reviewCheck').on('click',function(){
			if($('.reviewCheck').prop('checked')){
				$('.review').attr('disabled',false);
			}
			else
				$('.review').attr('disabled',true);
		});
	}
	////Operator Changes End
	
	this.getParsedCustomTZDate = function ( timeInMillisecs, timezoneOffset ){
    	var curDate = new Date();
    	var browserOffset = curDate.getTimezoneOffset()*60*1000;
    	var timezoneOffset = timezoneOffset;
    	var offsetSign = timezoneOffset.slice(0,1);
    	var offsetHours = Number(timezoneOffset.slice(1,3));
    	var offsetMins = Number(timezoneOffset.slice(4,6));
    	var offsetMilliSecs = ((offsetHours * 3600) + (offsetMins* 60))* 1000;
    	var parsedTimeInMillisecs = (offsetSign == '+') ? 
    			timeInMillisecs + browserOffset + offsetMilliSecs : timeInMillisecs + browserOffset - offsetMilliSecs;
    	var dateString = formatDateddMMYYYYHHmm(parsedTimeInMillisecs);
    	return dateString;
    };
    /*Auto initialize*/
     this.init();
}