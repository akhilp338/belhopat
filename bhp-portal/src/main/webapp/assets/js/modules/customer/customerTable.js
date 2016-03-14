function customerTable(node){
    var self = this;
    self.rootParent = node;
    //self.common=new common(self.rootParent);
    var BASE_URL = self.rootParent.common.urlHash.CUSTOMER;
     /* Initialize the module */
        this.init = function() {
            this.bind();
        };
        this.bind = function() {
        };
    this.confirmedOffers = function () {
    		var notificationData = [];
            oTable = $('#listConfirmedOffers').DataTable({
                'ajax': BASE_URL + "/getConfirmedOffers",
                'serverSide': true,
                "responsive": true,
                "bDestroy": true,
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
						if (!aData.notified) {
							$('td', nRow).css('background', '#ffcccc');
							notificationData.push(aData.id);
						}
						self.rootParent.common.renderCountdown(
								nRow.lastChild);
					},
                "fnDrawCallback": function(settings, ajax) {
                    self.singleCheckBox = $(self.rootParent.rootParent).find('.offer_checkbox')
                    self.singleCheckBox.on('click', self.rootParent.singleSelectOffers);
                    self.rootParent.common.checkTableEmpty();
                    self.rootParent.common.checkSelectedOffers();
                    self.rootParent.common.hidePaginate(this);
                    self.rootParent.common.updateNotification('confirmedOffers',notificationData);
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
                     	
                },{
                    data: 'offerMaster.city.description',
                    sClass: 'align-center',
                    render: function(data){
                        return data==null?"":data;
                        } 
                }, {
                    data: 'calculatedPremium',
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
	};
	this.unConfirmedOffers = function() {
		var notificationData = [];
		oTable = $('#listUnConfirmedOffers')
				.DataTable(
						{
							'ajax' : BASE_URL + "/getUnConfirmedOffers",
							'serverSide' : true,
							"responsive" : true,
							"bDestroy" : true,
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
									if (!aData.notified) {
										$('td', nRow).css('background', '#ffcccc');
										notificationData.push(aData.id);
									}
									self.rootParent.common.renderCountdown(
											nRow.lastChild);
								},
							"fnDrawCallback" : function(settings, ajax) {
								self.singleCheckBox = $(
										self.rootParent.rootParent).find(
										'.offer_checkbox')
								self.singleCheckBox.on('click',
										self.rootParent.common.singleSelectCheck);
								self.rootParent.common.checkTableEmpty();
								self.rootParent.common.checkSelectedOffers();
								self.rootParent.common.hidePaginate(this);
								self.rootParent.common.updateNotification('unConfirmedOffers',notificationData);
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
										data : 'calculatedPremium',
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
		// self.oTable.fnFilter($(this).val());
	};
	this.rfq = function() {
		var notificationData = [];
		oTable = $('#listRFQs')
				.DataTable(
						{
							'ajax' : BASE_URL + "/getRFQs",
							'serverSide' : true,
							"responsive" : true,
							"bDestroy" : true,
							"order" : [ [ 14, "asc" ] ],
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
								if (aData.offerMaster.offerType.id == "4") {
									$('td', nRow).css('background', '#D0FFEB');
								}
								if (!aData.notified) {
									$('td', nRow).css('background', '#ffcccc');
									notificationData.push(aData.id);
								}
					            self.rootParent.common.renderCountdown( nRow.lastChild );
							},
							"fnDrawCallback" : function() {
								self.singleCheckBox = $(
										self.rootParent.rootParent).find(
										'.offer_checkbox')
								self.singleCheckBox.on('click',
										self.rootParent.common.singleSelectCheck);
								self.rootParent.common.checkTableEmpty();
								self.rootParent.common.checkSelectedOffers();
								self.rootParent.common.hidePaginate(this);
								self.rootParent.common.updateNotification('rfq',notificationData);
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
											return data == 0 ? "" : self.rootParent.common.getNumberWithCommas(data);
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
	};
	this.trade = function() {
		var notificationData = [];
		oTable = $('#listTrades')
				.DataTable(
						{
							'ajax' : BASE_URL + "/getTrades",
							'serverSide' : true,
							"responsive" : true,
							"bDestroy" : true,
							"order": [[ 1, "desc" ]],
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
			 					if (!aData.notified) {
			 						$('td', nRow).css('background', '#ffcccc');
			 						notificationData.push(aData.id);
			 					}
			 				},
							"fnDrawCallback" : function() {
								self.rootParent.common.checkTableEmpty();
								//self.rootParent.common.checkSelectedOffers();
								self.singleCheckBox = $(
										self.rootParent.rootParent).find(
										'.offer_checkbox')
								self.singleCheckBox.on('click',
										self.rootParent.common.tradeSelector);
								self.rootParent.common.hidePaginate(this);
								self.rootParent.common.updateNotification('trade',notificationData);
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
										data : 'offer.offerId',
										sClass : 'align-center',
										 visible : false,
										render : function(data){
											return self.rootParent.common.tradeOfferPopUpData(data);
											
										}
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
										data : 'eqOzs',
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
										data : 'calculatedPremium',
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
										data : 'status',
										sClass : 'align-center',
									}, {
					                    data: 'read',
					                    visible : false
					                } ],

							"fnCreatedRow" : function(nRow, aData, iDataIndex) {
								$(nRow)[0].id = iDataIndex;
							}
						});
	};
	
    this.DO = function () {
    	var notificationData = [];
        oTable = $('#listDO').DataTable({
            'ajax': BASE_URL + "/getDOs",
            'serverSide': true,
            "responsive": true,
            "bDestroy": true,
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
					if (!aData.notified) {
						$('td', nRow).css('background', '#ffcccc');
						notificationData.push(aData.id);
					}
					self.rootParent.common.renderCountdown(
							nRow.lastChild.previousSibling);
				},
            "fnDrawCallback": function(settings, ajax) {
                self.singleCheckBox = $(self.rootParent.rootParent).find('.offer_checkbox')
                self.singleCheckBox.on('click', self.rootParent.singleSelectOffers);
                self.rootParent.common.checkTableEmpty();
                self.rootParent.common.checkSelectedOffers();
                $.fn.dataTable.ext.errMode = 'none';
                self.rootParent.common.hidePaginate(this);
                self.rootParent.common.updateNotification('directOffers',notificationData);
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
            },
            {
                data: 'offerMaster.commodity.metal.qtyType',
                sClass: 'align-right'
            },{
                data: 'offerMaster.eqOzs',
                sClass: 'align-right',
                "bSortable" : false,
                render: function(data){
                    return self.rootParent.common.getNumberWithCommas(data);
                }
            },{
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
                data: 'calculatedPremium',
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
            }, 
            {
				data : 'offerMaster.status',
				sClass : 'align-center',
			},
			{
                data: 'read',
                visible : false
            } ],

            "fnCreatedRow": function(nRow, aData, iDataIndex) {
                $(nRow)[0].id = iDataIndex;
            }
        });
    };
	/* Auto initialize */
	this.init();
}