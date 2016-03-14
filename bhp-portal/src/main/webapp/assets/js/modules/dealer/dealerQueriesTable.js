function dealerQueriesTable(node){
	var self = this;
	self.rootParent = node;
	//self.common=self.rootParent.common;
	var BASE_URL = self.rootParent.common.urlHash.DEALER;
	var userRole = $(self.rootParent.rootParent).find('#userRole').val();
	 /* Initialize the module */
	 this.confirmedOffers = function (accId) {
     		var url;
     		if(userRole === "C"){
     			url = "/getConfirmedOffersCustomerQueries?aId=";
     		}else{
     			url = "/getConfirmedOffersSupplierQueries?aId=";
     		}
             oTable = $('#listConfirmedOffers').DataTable({
            	 'ajax': BASE_URL + url + accId,
                 'serverSide': true,
                 "responsive": true,
                 "deferLoading": 0,
                 "order": [[ 13, "asc" ]],
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
                 "aoColumns": [{
                     data: 'id',
                     "title": "<input type='checkbox' name='offer-id-title' class='select_all_check'>",
                     "bSortable": false,
                     "render": function(data) {
                         return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='" + data + "'>"
                     }
                 }, {
                     data: 'offerId',
                     sClass: 'align-center'
                 }, {
                     data: 'offerMaster.commodity.metal.metal',
                     sClass: 'align-center'
                 }, {
                     data: 'offerMaster.commodity.metal.inventory',
                     sClass: 'align-center'
                 }, {
                     data: 'offerMaster.commodity.commodityBrand.code',
                     sClass: 'align-center'
                 }, {
                     data: 'offerMaster.commodity.commodityType.code',
                     sClass: 'align-center'
                 }, {
                     data: 'offerMaster.commodity.metal.purity',
                     sClass: 'align-right'
                 }, {
                     data: 'offerMaster.commodity.metal.qtyType',
                     sClass: 'align-center'
                 }, {
                     data: 'offerMaster.eqOzs',
                     sClass: 'align-right',
                     "bSortable" : false,
                     render: function(data){
                         return self.rootParent.common.getNumberWithCommas(data);
                     }
                 }, {
                     data: 'offerMaster.balanceQuantity',
                     sClass: 'align-right',
                     render: function(data){
                         return self.rootParent.common.getNumberWithCommas(data);
                     }
                 }, {
                     data: 'offerMaster.city.description',
                     sClass: 'align-center',
                     render: function(data){
                         return data==null?"":data;
                         } 
                 }, {
                	 data: (userRole == 'C')?'calculatedPremium': 'offerMaster.premium',
                     sClass: 'align-right',
                     render: function(data){
                    	 return data == 0 ? "" : self.rootParent.common.getNumberWithCommas( self.rootParent.common.roundOff2Decimal(data) );
                     }
                 }, {
                     data: 'offerMaster.availability',
                     "render": function(data) {
                         return self.rootParent.common.formatDateddMMYYYY(data)
                     },
                     sClass: 'align-center'
                 }, {
                     data: 'offerMaster.expiry',
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
	
	this.unConfirmedOffers = function(accId) {
 		if(userRole === "C"){
 			url = "/getUnConfirmedOffersCustomerQueries?aId=";
 		}else{
 			url = "/getUnConfirmedOffersSupplierQueries?aId=";
 		}
		oTable = $('#listUnConfirmedOffers')
				.DataTable(
						{
							'ajax' : BASE_URL + url + accId,
							'serverSide' : true,
							"responsive" : true,
							"deferLoading": 0,
							"order" : [ [ 13, "asc" ] ],
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
									    data: 'offerMaster.commodity.metal.qtyType',
						                sClass: 'align-center'
					                },  
					                {
					                    data: 'offerMaster.eqOzs',
						                sClass: 'align-right',
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
										data: (userRole == 'C')?'calculatedPremium': 'offerMaster.premium',
										sClass : 'align-right',
					                     render: function(data){
					                    	 return data == 0 ? "" : self.rootParent.common.getNumberWithCommas( self.rootParent.common.roundOff2Decimal(data) );
					                     }
									},
									{
										data : 'offerMaster.availability',
										"render" : function(data) {
											return self.rootParent.common
													.formatDateddMMYYYY(data);
										},
										sClass : 'align-center'
									}, {
										data : 'offerMaster.expiry',
										sClass : 'countdown'
									}, {
					                    data: 'read',
					                    visible : false
					                } ],

							"fnCreatedRow" : function(nRow, aData, iDataIndex) {
								$(nRow)[0].id = iDataIndex;
							}
						});
		oTable.columns.adjust().draw();
		// self.oTable.fnFilter($(this).val());
	};
	
	this.rfq = function(accId) {
 		if(userRole === "C"){
 			
 			url = "/getRFQsCustomerQueries?aId=";
 		
 		oTable = $('#listRFQs')
		.DataTable(
				{
					'ajax' : BASE_URL +url+accId,
					'serverSide' : true,
					"responsive" : true,
					"deferLoading": 0,
					"order" : [ [ 14, "asc" ] ],
					"language": {
		                    "zeroRecords": "No data to dispay"
		            },
	                "oLanguage": {
	                    "sProcessing": self.rootParent.common.setLoader()
	                  },
	                 "processing": true,
	                 "sScrollX": '100%',
	                 "columnDefs": [
	  				              
	     			               { "title": "RFQ /</br> DRFQ ID","targets": 1},
	     			               { "title": "Metal","targets": 2},
	     			               { "title": "Inventory","targets": 3},
	     			               { "title": "Brand","targets": 4},
	     			               { "title": "Type","targets": 5},
	     			               { "title": "Purity","targets": 6},
	     			               { "title": "Quantity Type","targets": 7},
	     			               { "title": "Ounce Equivalent","targets": 8},
	     			               { "title": "Quantity","targets": 9},
	     			               { "title": "Source / </br>Delivery Location","targets": 10},
	     			               { "title": "Delivery Address","targets": 11},
	     			               { "title": "Premium </br>($/Ounce)","targets": 12},
	     			               { "title": "Availability","targets": 13},
	     			               { "title": "Expiry","targets": 14},
	     			             ],
					"fnRowCallback" : function(nRow, aData,
							iDisplayIndex, iDisplayIndexFull) {
						if (aData.offerMaster.offerType.id == "4") {
							$('td', nRow).css('background', '#D0FFEB');
						}
			            self.rootParent.common.renderCountdown( nRow.lastChild );
					},
					"fnDrawCallback" : function() {
						self.rootParent.common.checkTableEmpty();
						self.rootParent.common.hidePaginate(this);
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
									},{
										 data: 'offerMaster.commodity.metal.qtyType',
						                 sClass: 'align-center'
					                
					                },  {
					                	data: 'offerMaster.eqOzs',
					                    sClass: 'align-right',
					                    "bSortable" : false,
					                    render: function(data){
					                        return self.rootParent.common.getNumberWithCommas(data);
					                    }
					                }, {
					                    data: 'offerMaster.balanceQuantity',
						                sClass: 'align-right',
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
										data : 'offerMaster.address',
										sClass : 'align-center',
										render : function(data) {
											if(data !== null){
												if(data.length > 35)
												  {
												    data = data.substring(0,33) + " ...";
												  }
											}
											return data;
										}
									},
									{
										data : 'offerMaster.premium',
										sClass : 'align-right',
										render : function(data) {
											return data == 0 ? "" : self.rootParent.common.getNumberWithCommas(data);;
										}
									},
									{
										data : 'offerMaster.availability',
										"render" : function(data) {
											return self.rootParent.common
													.formatDateddMMYYYY(data)
										},
										sClass : 'align-center'
									}, {
										data : 'offerMaster.expiry',
										sClass : 'countdown'
									}, {
										data : 'offerMaster.offerType.id',
										"visible" : false,
									}, {
					                    data: 'read',
					                    visible : false
					                } ],

					"fnCreatedRow" : function(nRow, aData, iDataIndex) {
						$(nRow)[0].id = iDataIndex;
					}
				});
 		
 		}else{
 			url = "/getRFQsSupplierQueries?aId=";
 			oTable = $('#listRFQs').DataTable({
 	            'ajax': BASE_URL + url + accId,
 	            'serverSide': true,
 	            "responsive": true,
 	           "deferLoading": 0,
 	            "order": [[ 13, "asc" ]],
 	            "language": {
 	                "zeroRecords": "No data to dispay"
 	            },
 	            "oLanguage": {
 	                "sProcessing": self.rootParent.common.setLoader()
 	              },
 	             "processing": true,
 	             "sScrollX": '100%',
 	            "columnDefs": [
	  				              
     			               { "title": "RFQ /</br> DRFQ ID","targets": 1},
     			               { "title": "Metal","targets": 2},
     			               { "title": "Inventory","targets": 3},
     			               { "title": "Brand","targets": 4},
     			               { "title": "Type","targets": 5},
     			               { "title": "Purity","targets": 6},
     			               { "title": "Quantity Type","targets": 7},
     			               { "title": "Ounce Equivalent","targets": 8},
     			               { "title": "Quantity","targets": 9},
     			               { "title": "Source / </br>Delivery Location","targets": 10},
     			               { "title": "Max Premium </br>($/Ounce)","targets": 11},
     			               { "title": "Availability","targets": 12},
     			               { "title": "Expiry","targets": 13},
     			               { "title": "offer","targets": 14},
     			             ],
 	            "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
 	            	 if ( aData.offerMaster.offerType.id == "4" )
 	                {
 	                    $('td', nRow).css('background', '#D0FFEB');
 	                }
					self.rootParent.common.renderCountdown(
							nRow.lastChild);
 	            },
 	            "fnDrawCallback": function(settings, ajax) {
 	                self.rootParent.common.checkTableEmpty();
 	                self.rootParent.common.hidePaginate(this);
 	                //$.fn.dataTable.ext.errMode = 'none';
 	            },
 	            "columns": [
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
								data : 'offerMaster.quantity',
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
								data : 'calculatedPremium',
								sClass : 'align-right',
								render : function(data) {
									return data == 0 ? "" : self.rootParent.common.getNumberWithCommas(data);;
								}
							},
							{
								data : 'offerMaster.availability',
								"render" : function(data) {
									return self.rootParent.common
											.formatDateddMMYYYY(data)
								},
								sClass : 'align-center'
							}, {
								data : 'offerMaster.expiry',
								sClass : 'countdown'
							}, {
								data : 'offerMaster.offerType.id',
								"visible" : false,
							}, {
								data : 'read',
								visible : false
							} ],

 	            "fnCreatedRow": function(nRow, aData, iDataIndex) {
 	                $(nRow)[0].id = iDataIndex;
 	            }
 	        });
 		}
		
		oTable.columns.adjust().draw();
	};
	this.trade = function(accId) {
 		if(userRole === "C"){
 			url = "/getTradesCustomerQueries?aId=";
 		}else{
 			url = "/getTradesSupplierQueries?aId=";
 		}
		oTable = $('#listTrades')
				.DataTable(
						{
							'ajax' : BASE_URL + url + accId,
							'serverSide' : true,
							"responsive" : true,
							"deferLoading": 0,
							"order": [[ 1, "desc" ]],
							"language": {
			                    "zeroRecords": "No data to dispay"
			                },
			                "oLanguage": {
			                    "sProcessing": self.rootParent.common.setLoader()
			                  },
			                 "processing": true,
			                 "sScrollX": '100%',
							"fnDrawCallback" : function() {
								self.rootParent.common.checkTableEmpty();
								self.rootParent.common.hidePaginate(this);
							},
							"initComplete" : function(){
								self.rootParent.common.tradePopup("CUS");
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
												data : 'tradeId',
												sClass : 'align-center'	
											},
											{	
												data : 'offer.offerMaster.commodity.metal.metal',
												sClass : 'align-center',
												
											},
											{
												data : 'offer.offerMaster.commodity.commodityBrand.code',
												sClass : 'align-center',
											},
											{
												data : 'offer.offerMaster.commodity.metal.inventory',
												sClass : 'align-center',
											},
											
											{
												data : 'offer.offerMaster.commodity.commodityType.code',
												sClass : 'align-center',
											},
											{
												data : 'offer.offerMaster.commodity.metal.purity',
												sClass : 'align-right',
											},
											{
												data : 'offer.offerMaster.commodity.metal.qtyType',
								                sClass: 'align-center'
											},
											 {
												data : 'offer.offerMaster.eqOzs',
							                    sClass: 'align-right',
							                    render: function(data){
							                        return self.rootParent.common.getNumberWithCommas(data);
							                    }
							                },{
							                	data : 'offer.offerMaster.quantity',
												sClass : 'align-right',
							                     render: function(data){
							                         return self.rootParent.common.getNumberWithCommas(data);
							                     }
							                },
											{
												data : 'offer.offerMaster.city.description',
												sClass : 'align-center',
												
											},
											{
												data : 'deliveryAddress',
												sClass : 'align-center',
												render : function(data) {
													return data == null ? "" : data;
												}
											},
											{
												 data: (userRole == 'C')?'calculatedPremium': 'offerMaster.premium',
												sClass : 'align-right',
							                     render: function(data){
							                    	 return data == 0 ? "" : self.rootParent.common.getNumberWithCommas( self.rootParent.common.roundOff2Decimal(data) );
							                     }
											},
											{
												data : 'tradeDate',
												sClass : 'align-center',
												"render" : function(data) {
													return self.rootParent.common
															.formatDateddMMYYYY(data)
												},
											}, {
												data : 'etaDate',
												sClass : 'align-center',
												"render" : function(data) {
													return data == null ? "" : self.rootParent.common
															.formatDateddMMYYYY(data)
												}
											}, {
												data : 'status'
											}, {
							                    data: 'read',
							                    visible : false
							                } ],

							"fnCreatedRow" : function(nRow, aData, iDataIndex) {
								$(nRow)[0].id = iDataIndex;
							}
						});
		oTable.columns.adjust().draw();
	};
	
    this.DO = function (accId) {
 		if(userRole === "C"){
 			url = "/getDirectOffersCustomerQueries?aId=";
 		}else{
 			url = "/getDirectOffersSupplierQueries?aId=";
 		}
        oTable = $('#listDO').DataTable({
            'ajax': BASE_URL + url +accId,
            'serverSide': true,
            "responsive": true,
            "deferLoading": 0,
            "order": [[ 13, "asc" ]],
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
            "columns": [{
                data: 'id',
                "title": "<input type='checkbox' name='offer-id-title' class='select_all_check'>",
                "bSortable": false,
                "render": function(data) {
                    return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='" + data + "'>"
                }
            }, {
                data: 'offerId',
                sClass: 'align-center'
            }, {
                data: 'offerMaster.commodity.metal.metal',
                sClass: 'align-center'
            }, {
                data: 'offerMaster.commodity.metal.inventory',
                sClass: 'align-center'
            }, {
                data: 'offerMaster.commodity.commodityBrand.code',
                sClass: 'align-center'
            }, {
                data: 'offerMaster.commodity.commodityType.code',
                sClass: 'align-center'
            }, {
                data: 'offerMaster.commodity.metal.purity',
                sClass: 'align-right'
            }, {
                data: 'offerMaster.commodity.metal.qtyType',
                sClass: 'align-right'
            }, {
                data: 'offerMaster.eqOzs',
                sClass: 'align-right',
                "bSortable" : false,
                render: function(data){
                    return self.rootParent.common.getNumberWithCommas(data);
                }
            }, {
                data: 'offerMaster.balanceQuantity',
                sClass: 'align-right',
                render: function(data){
                    return self.rootParent.common.getNumberWithCommas(data);
                }
            }, {
                data: 'offerMaster.city.description',
                sClass: 'align-center',
                render: function(data){
                    return data==null?"":data;} 
            }, {
                data: (userRole == 'C')?'calculatedPremium': 'offerMaster.premium',
                sClass: 'align-right',
                render: function(data){
                	return data == 0 ? "" : self.rootParent.common.getNumberWithCommas( self.rootParent.common.roundOff2Decimal(data) );
                }
            }, {
                data: 'offerMaster.availability',
                "render": function(data) {
                    return self.rootParent.common.formatDateddMMYYYY(data)
                },
                sClass: 'align-center'
            }, {
                data: 'offerMaster.expiry',
                sClass: 'countdown'
            }, {
                data: 'read',
                visible : false
            } ],

            "fnCreatedRow": function(nRow, aData, iDataIndex) {
                $(nRow)[0].id = iDataIndex;
            }
        });
        oTable.columns.adjust().draw();
    };

 }
