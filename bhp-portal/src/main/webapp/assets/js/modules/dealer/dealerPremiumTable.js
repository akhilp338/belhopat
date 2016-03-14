function dealerPremiumTable(node){
	var self = this;
	self.rootParent = node;
	//self.common=self.rootParent.common;
	var BASE_URL = self.rootParent.common.urlHash.DEALER;
	var userRole = $(self.rootParent.rootParent).find('#userRole').val();
	 /* Initialize the module */
	 this.confirmedOffers = function (cpmId) {
             oTable = $('#listConfirmedOffers').DataTable({
            	 'ajax': BASE_URL + '/getCustomCpmOffersByCpmId?cpmId='+cpmId,
                 'serverSide': true,
                 "responsive": true,
                 "deferLoading": 0,
                 "order": [[ 11, "asc" ]],
                 "language": {
                     "zeroRecords": "No data to dispay"
                 },
                 "oLanguage": {
                     "sProcessing": self.rootParent.common.setLoader()
                   },
                  "processing": true,
                  "sScrollX": '100%',
                  "fnRowCallback" : function(nRow, aData,
							iDisplayIndex, iDisplayIndexFull) {
						self.rootParent.common.renderCountdown(
								nRow.lastChild);
					},
                 "fnDrawCallback": function(settings, ajax) {
                     self.rootParent.common.checkTableEmpty();
                     self.rootParent.common.hidePaginate(this);
                 },
                 "aoColumns": [ {
                     data: 'offer.offerId',
                     sClass: 'align-center'
                 }, {
                     data: 'offer.offerMaster.commodity.metal.metal',
                     sClass: 'align-center'
                 }, {
                     data: 'offer.offerMaster.commodity.metal.inventory',
                     sClass: 'align-center'
                 }, {
                     data: 'offer.offerMaster.commodity.commodityBrand.code',
                     sClass: 'align-center'
                 }, {
                     data: 'offer.offerMaster.commodity.commodityType.code',
                     sClass: 'align-center'
                 }, {
                     data: 'offer.offerMaster.commodity.metal.purity',
                     sClass: 'align-right'
                 }, {
                     data: 'offer.offerMaster.commodity.metal.qtyType',
                     sClass: 'align-center'
                 }, {
                     data: 'offer.offerMaster.eqOzs',
                     sClass: 'align-right',
                     "bSortable" : false,
                     render: function(data){
                         return self.rootParent.common.getNumberWithCommas(data);
                     }
                 }, {
                     data: 'offer.offerMaster.balanceQuantity',
                     sClass: 'align-right'
                 }, {
                     data: 'offer.offerMaster.city.description',
                     sClass: 'align-center',
                     render: function(data){
                         return data==null?"":data;
                         } 
                 }, {
                     data: 'offer.offerMaster.premium',
                     sClass: 'align-right'
                 }, {
                     data: 'offer.offerMaster.availability',
                     "render": function(data) {
                         return self.rootParent.common.formatDateddMMYYYY(data)
                     },
                     sClass: 'align-center'
                 }, {
                     data: 'offer.offerMaster.expiry',
                     sClass: 'countdown'
                 }, {
                     data: 'read',
                     visible : false
                 }],
 							"fnCreatedRow" : function(nRow, aData, iDataIndex) {
 								$(nRow)[0].id = iDataIndex;
 							}
 						});
             oTable.columns.adjust().draw();
 	
	};
	
	this.unConfirmedOffers = function(cpmId) {
		oTable = $('#listUnConfirmedOffers')
				.DataTable(
						{
							'ajax' : BASE_URL + '/getCustomCpmUnConfOffersByCpmId?cpmId='+cpmId  ,
							'serverSide' : true,
							"responsive" : true,
							"deferLoading": 0,
							"order" : [ [ 11, "asc" ] ],
							"language": {
				                    "zeroRecords": "No data to dispay"
				            },
			                "oLanguage": {
			                    "sProcessing": self.rootParent.common.setLoader()
			                  },
			                 "processing": true,
			                 "sScrollX": '100%',
			                 "fnRowCallback" : function(nRow, aData,
										iDisplayIndex, iDisplayIndexFull) {
									self.rootParent.common.renderCountdown(
											nRow.lastChild);
								},
							"fnDrawCallback" : function(settings, ajax) {
								self.rootParent.common.checkTableEmpty();
								self.rootParent.common.checkSelectedOffers();
								self.rootParent.common.hidePaginate(this);
							},
							"columns" : [ {
			                     data: 'offer.offerId',
			                     sClass: 'align-center'
			                 }, {
			                     data: 'offer.offerMaster.commodity.metal.metal',
			                     sClass: 'align-center'
			                 }, {
			                     data: 'offer.offerMaster.commodity.metal.inventory',
			                     sClass: 'align-center'
			                 }, {
			                     data: 'offer.offerMaster.commodity.commodityBrand.code',
			                     sClass: 'align-center'
			                 }, {
			                     data: 'offer.offerMaster.commodity.commodityType.code',
			                     sClass: 'align-center'
			                 }, {
			                     data: 'offer.offerMaster.commodity.metal.purity',
			                     sClass: 'align-right'
			                 }, {
			                     data: 'offer.offerMaster.commodity.metal.qtyType',
			                     sClass: 'align-center'
			                 }, {
			                     data: 'offer.offerMaster.eqOzs',
			                     sClass: 'align-right',
			                     "bSortable" : false,
			                     render: function(data){
			                         return self.rootParent.common.getNumberWithCommas(data);
			                     }
			                 }, {
			                     data: 'offer.offerMaster.balanceQuantity',
			                     sClass: 'align-right'
			                 }, {
			                     data: 'offer.offerMaster.city.description',
			                     sClass: 'align-center',
			                     render: function(data){
			                         return data==null?"":data;
			                         } 
			                 }, {
			                     data: 'offer.offerMaster.premium',
			                     sClass: 'align-right'
			                 }, {
			                     data: 'offer.offerMaster.availability',
			                     "render": function(data) {
			                         return self.rootParent.common.formatDateddMMYYYY(data)
			                     },
			                     sClass: 'align-center'
			                 }, {
			                     data: 'offer.offerMaster.expiry',
			                     sClass: 'countdown'
			                 }, {
			                     data: 'read',
			                     visible : false
			                 }],

							"fnCreatedRow" : function(nRow, aData, iDataIndex) {
								$(nRow)[0].id = iDataIndex;
							}
						});
		oTable.columns.adjust().draw();
		// self.oTable.fnFilter($(this).val());
	};
	
	 this.DO = function (cpmId) {
	        oTable = $('#listDO').DataTable({
	            'ajax': BASE_URL +'/getCustomCpmDirectOffersByCpmId?cpmId='+cpmId,
	            'serverSide': true,
	            "responsive": true,
	            "deferLoading": 0,
	            "order": [[ 11, "asc" ]],
	            "language": {
	                "zeroRecords": "No data to dispay"
	            },
	            "oLanguage": {
	                "sProcessing": self.rootParent.common.setLoader()
	              },
	             "processing": true,
	             "sScrollX": '100%',
	             "fnRowCallback" : function(nRow, aData,
							iDisplayIndex, iDisplayIndexFull) {
						self.rootParent.common.renderCountdown(
								nRow.lastChild);
					},
	            "fnDrawCallback": function(settings, ajax) {
	                self.rootParent.common.checkTableEmpty();
	                self.rootParent.common.checkSelectedOffers();
	                $.fn.dataTable.ext.errMode = 'none';
	                self.rootParent.common.hidePaginate(this);
	            },
	            "columns": [ {
                    data: 'offer.offerId',
                    sClass: 'align-center'
                }, {
                    data: 'offer.offerMaster.commodity.metal.metal',
                    sClass: 'align-center'
                }, {
                    data: 'offer.offerMaster.commodity.metal.inventory',
                    sClass: 'align-center'
                }, {
                    data: 'offer.offerMaster.commodity.commodityBrand.code',
                    sClass: 'align-center'
                }, {
                    data: 'offer.offerMaster.commodity.commodityType.code',
                    sClass: 'align-center'
                }, {
                    data: 'offer.offerMaster.commodity.metal.purity',
                    sClass: 'align-right'
                }, {
                    data: 'offer.offerMaster.commodity.metal.qtyType',
                    sClass: 'align-center'
                }, {
                    data: 'offer.offerMaster.eqOzs',
                    sClass: 'align-right',
                    "bSortable" : false,
                    render: function(data){
                        return self.rootParent.common.getNumberWithCommas(data);
                    }
                }, {
                    data: 'offer.offerMaster.balanceQuantity',
                    sClass: 'align-right'
                }, {
                    data: 'offer.offerMaster.city.description',
                    sClass: 'align-center',
                    render: function(data){
                        return data==null?"":data;
                        } 
                }, {
                    data: 'offer.offerMaster.premium',
                    sClass: 'align-right'
                }, {
                    data: 'offer.offerMaster.availability',
                    "render": function(data) {
                        return self.rootParent.common.formatDateddMMYYYY(data)
                    },
                    sClass: 'align-center'
                }, {
                    data: 'offer.offerMaster.expiry',
                    sClass: 'countdown'
                }, {
                    data: 'read',
                    visible : false
                }],

	            "fnCreatedRow": function(nRow, aData, iDataIndex) {
	                $(nRow)[0].id = iDataIndex;
	            }
	        });
	        oTable.columns.adjust().draw();
	    };
	
}