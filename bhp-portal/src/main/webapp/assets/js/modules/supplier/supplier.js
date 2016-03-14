function supplier(supplierNode) {
    /* Initialize the module */
    var self = this;
    var selectedOfferIds = [];
    var selectedOffers = [];
    var BASE_URL = null;
    this.rootParent = supplierNode;
    this.tabs = $('.tab');
    this.init = function() {
        self.common = new common(self.rootParent);
        BASE_URL = self.common.urlHash.SUPPLIER;
        self.supplierTable = new supplierTable(self);
        this.bind();

        var quantity, premium, availability, expiry, offerId, serverDate, offerTableId;
        var selectedTab;
    };
    this.bind = function() {
        //self.common = new common(self.rootParent);
        self.tabs.on('click', self.loadData);
        self.common.loadCurrentTab();
    	//$('#dashboard').trigger('click');
        self.common.getMarginStatus(BASE_URL);

        var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		$(".hidden_nav_tab_button").on('click', function(event){
			event.preventDefault();
			$('.hidden_nav_tabs').addClass('hidden_nav_show');
		});
		$(".hidden_nav_tabs").on('click', function(event){
			event.preventDefault();
			$('.hidden_nav_tabs').removeClass('hidden_nav_show');
		});
		$(".hidden_nav_tabs ul").on('click', function(event){
			event.preventDefault();
		});

		$(".close-btn").on('click', function() {
			$(".popup-window").hide();
			$(".popup-box").hide();
			$('.error').hide();
			$('.datepicker').hide();
			//Modularize to fn
		});
	}
    this.loadData = function(){
		self.common.destroyCountdown();
		clearTimeout(self.common.timeOut);
		var selectedTab = this.id;
		self.menuIcons = $(self.rootParent).find('.menu-icons');
		if(selectedTab !== ''){
			switch( selectedTab ) {
				case 'employeeManagement':
					$(".container").load(BASE_URL+'/getUserTab', function(){
						self.supplierTable.users();
						//self.tableSearch();
						//Add
						$('#addNewBtn').on("click", function() {
							$(".container").load(BASE_URL+'/getAddEmployeePage',function(){
								self.common.validateForm();
								self.common.cancelBtn();
								self.addEmployee();
							});
					 	});
						//EDIT
						$('#edit_button').on("click", function() {
							var count = self.checkboxCount();
							if(count==1){
								var rowId = JSON.parse($("#selected_offer_id").val());
							$(".container").load(BASE_URL+'/getEditEmployeePage?rowId='+rowId[0],function(){
								self.common.validateForm();
								self.common.cancelBtn();
								self.editEmployee();
							});
							}
					 	});
						//DELETE
						$('#deleteBtn').on("click", function() {
							var count = self.checkboxCount();
								var rowId = JSON.parse($("#selected_offer_id").val());
								var result = confirm("Want to delete?");
								if (result) {
									self.deleteEmployee(rowId);
								}
					 	});
					});
					break;
				}
			
			}
		}
    this.getSelectedRowIds = function(){
    	if(!!($("#selected_offer_id").val()))
    	var selectedIds = ($("#selected_offer_id").val()) ? JSON.parse($("#selected_offer_id").val()) : [];
    	return selectedIds;
    }
    this.getSelectedRows = function(){
    	if(!!($("#selected_offers").val()))
    		var selectedRows = ($("#selected_offers").val()) ? JSON.parse($("#selected_offers").val()) : [];
    	return selectedRows;
    }
    this.checkboxCount = function(){
		var offerId = JSON.parse($("#selected_offer_id").val());
		var count = offerId.length; 
		return count;
	}
    this.deleteEmployee=function(rowId){
			$.ajax({
		 		url : BASE_URL+'/deleteEmployee',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: JSON.stringify(rowId),
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			//self.createApprovePopUp(response,header);
		 			console.log(response);
		 			$("#employeeManagement").trigger("click");
		 		}
		 	});
    }
    this.editEmployee=function(){
		$('#edit_employee_button').on("click",function(){
			var employeeDto=self.getEmployeeDTO();
			$.ajax({
		 		url : BASE_URL+'/editEmployee',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: JSON.stringify(employeeDto),
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			//self.createApprovePopUp(response,header);
		 			if(!!response.id){
		 				alert("Employee"+response.id+" Edited successfully ");
		 			}else{
		 				alert("Error Editing Employee");
		 			}
		 			$("#employeeManagement").trigger("click");
		 		}
		 	});
		})
	}
    this.addEmployee=function(){
		$('#add_employee_button').on("click",function(){
			var employeeDto=self.getEmployeeDTO();
			$.ajax({
		 		url : BASE_URL+'/addEmployee',
		 		type: 'post',
	            cache: false,
	            contentType: false,
	            processData: false,
	            data: JSON.stringify(employeeDto),
	            dataType: 'json',
	            contentType: 'application/json',
	            mimeType: 'application/json',
		 		success : function(response) {
		 			//self.createApprovePopUp(response,header);
		 			if(!!response.id){
		 				alert("New Employee Created with id "+response.id);
		 			}else{
		 				alert("Error Creating Employee");
		 			}
		 			$("#employeeManagement").trigger("click");
		 		}
		 	});
		})
	}
	this.getEmployeeDTO=function(){
		var employeeDTO={};
		employeeDTO.employeeName=$("input[name='name']").val();
		employeeDTO.designation=$("input[name='designation']").val();
		employeeDTO.email=$("input[name='email']").val();
		employeeDTO.id=$("input[name='id']").val();
		return employeeDTO;
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
	
	this.tableSearch=function(){
	// Setup - add a text input to each footer cell
    $('#listUsers tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    });
    // DataTable
    var table = $('#listUsers').DataTable();
    // Apply the search
    table.columns().every( function () {
        var that = this;
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        });
    });
	}
	this.dataTablePaginate=function(){
		    $('#listUsers').DataTable( {
		        "pagingType": "full_numbers"
		    } );
	}
	/* Auto initialize */
	this.init();
}
