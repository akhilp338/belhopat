function supplierTable(node) {
	var self = this;
	self.rootParent = node;
	// self.common=new common(self.rootParent);
	var BASE_URL = self.rootParent.common.urlHash.SUPPLIER;
	/* Initialize the module */
	this.init = function() {
		this.bind();
	};
	this.bind = function() {
	};
	this.users = function() {
		oTable = $('#listUsers')
				.DataTable(
						{
										'ajax' : BASE_URL + "/getUsers",
										'serverSide' : true,
										"responsive" : true,
										"bDestroy" : true,
										"order": [0, "desc"],
										 "sPaginationType": "full_numbers",
										"language": {
						                    "zeroRecords": "No data to dispay"
						                },
						            	"fnDrawCallback" : function(settings, ajax) {
											self.singleCheckBox = $(
													self.rootParent.rootParent).find(
													'.offer_checkbox')
											self.singleCheckBox.on('click',
													self.rootParent.singleSelectCheck);
											self.rootParent.common.checkTableEmpty();
											self.rootParent.common.checkSelectedOffers();
											self.rootParent.common.hidePaginate(this);
											// $.fn.dataTable.ext.errMode = 'none';
										},
										"columns" : [
												{
										data : 'id',
										"title" : "<input type='checkbox' name='offer-id-title' class='select_all_check'>",
										"bSortable" : false,
										sClass : 'align-center',
										sWidth :"1%",
										"render" : function(data) {
											return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='"
													+ data + "'>"
										}
									},
												{
													data : 'employeeName',
													sClass : 'align-center',
												},
												{
													data : 'designation',
													sClass : 'align-center',
												}],
									});
	};
	this.unConfirmedOffers = function() {
		oTable = $('#listUnConfirmedOffers')
				.DataTable(
						{
							'ajax' : BASE_URL + "/getUnConfirmedOffers",
							'serverSide' : true,
							"responsive" : true,
							"bDestroy" : true,
							"order" : [ [ 13, "asc" ] ],
							"language" : {
								"zeroRecords" : "No data to dispay"
							},
							"oLanguage" : {
								"sProcessing" : self.rootParent.common
										.setLoader()
							},
							"processing" : true,
							"scrollX" : true,
							"fnRowCallback" : function(nRow, aData,
									iDisplayIndex, iDisplayIndexFull) {
								self.rootParent.common.renderCountdown(
										nRow.lastChild );
							},
							"fnDrawCallback" : function(settings, ajax) {
								self.singleCheckBox = $(
										self.rootParent.rootParent).find(
										'.offer_checkbox')
								self.singleCheckBox.on('click',
										self.rootParent.singleSelectCheck);
								self.rootParent.common.checkTableEmpty();
								self.rootParent.common.checkSelectedOffers();
								self.rootParent.common.hidePaginate(this);
								// $.fn.dataTable.ext.errMode = 'none';
							},
							"columns" : [
									{
										data : 'id',
										"title" : "<input type='checkbox' name='offer-id-title' class='select_all_check'>",
										"bSortable" : false,
										"render" : function(data) {
											return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='"
													+ data + "'>"
										}
									},
									{
										data : 'offerId',
										sClass : 'align-center'
									},
									{
										data : 'offerMaster.commodity.metal.metal',
										sClass : 'align-center'
									},
									{
										data : 'offerMaster.commodity.metal.inventory',
										sClass : 'align-center'
									},
									{
										data : 'offerMaster.commodity.commodityBrand.code',
										sClass : 'align-center'
									},
									{
										data : 'offerMaster.commodity.commodityType.code',
										sClass : 'align-center'
									},
									{
										data : 'offerMaster.commodity.metal.purity',
										sClass : 'align-right'
									},
									{
										data : 'offerMaster.commodity.metal.qtyType',
										sClass : 'align-center'
									},
									{
										data : 'offerMaster.eqOzs',
										sClass : 'align-right',
					                     "bSortable" : false,
					                     render: function(data){
					                         return self.rootParent.common.getNumberWithCommas(data);
					                     }
									},
									{
										data : 'offerMaster.balanceQuantity',
										sClass : 'align-right',
					                     render: function(data){
					                         return self.rootParent.common.getNumberWithCommas(data);
					                     }
									},
									{
										data : 'offerMaster.city.description',
										sClass : 'align-center',
										render : function(data) {
											return data == null ? "" : data;
										}
									},
									{
										data : 'offerMaster.premium',
										sClass : 'align-right',
					                     render: function(data){
					                         return self.rootParent.common.getNumberWithCommas(data);
					                     }
									},
									{
										data : 'offerMaster.availability',
										sClass : 'align-center',
										"render" : function(data) {
											return self.rootParent.common
													.formatDateddMMYYYY(data)
										}
									}, {
										data : 'offerMaster.expiry',
										sClass : 'align-center',
										sClass : 'countdown'

									} ],
							"fnCreatedRow" : function(nRow, aData, iDataIndex) {
								$(nRow)[0].id = iDataIndex;
							}
						});
	};
		/* Auto initialize */
	this.init();

}