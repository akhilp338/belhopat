function dealerTable(node){
	var self = this;
//	var oTable=null;
	//var url = "http://localhost:8080/bhp-back-office/dealer";
	self.rootParent = node;
	//self.common=new common(self.rootParent);
	var BASE_URL = self.rootParent.common.urlHash.DEALER;
	 /* Initialize the module */
    	this.init = function() {       
		this.bind();
    	};
    	this.bind = function() {
    	};
	this.confirmedOffers = function () {
		var notificationData = [];
            oTable = $('#listConfirmedOffers').DataTable({
                'ajax': BASE_URL + "/confirmedOffers?cpm="+false,
                'serverSide': true,
                "responsive": true,
                "sScrollX": '100%',
                "bDestroy": true,
                "oLanguage": {
                    "sProcessing": self.rootParent.common.setLoader()
                  },
                 "processing": true,
                "order": [[ 14, "asc" ]],
                "language": {
                    "zeroRecords": "No data to dispay"
                },
                "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    self.rootParent.common.renderCountdown( nRow.lastChild );
                    if (!aData.notified) {
						$('td', nRow).css('background', '#ffcccc');
						notificationData.push(aData.id);
					}
                 },
                "fnDrawCallback": function(settings, ajax) {
                    self.singleCheckBox = $(self.rootParent.rootParent).find('.offer_checkbox')
					self.singleCheckBox.on('click', self.rootParent.singleSelectCheck);
                    self.rootParent.common.checkTableEmpty();
                    self.rootParent.common.checkSelectedOffers();
                    $.fn.dataTable.ext.errMode = 'none';
                    self.rootParent.common.hidePaginate(this);
					self.rootParent.common.updateNotification('confirmedOffers',notificationData);
                },
                "columns": [{
                    data: 'id',
                    "title": "<input type='checkbox' name='offer-id-title' class='select_all_check'>",
                    "bSortable": false,
                    "render": function(data) {
                        return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='" + data + "'>"
                    }
                }, {
                    data: 'accountCode',
                    sClass: 'align-center'
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
                        return data==null?"":data; 
                    }
                }, {
                    data: 'offerMaster.premium',
                    sClass: 'align-right',
	                  render: function(data){
	                        return self.rootParent.common.getNumberWithCommas(data);
	                    }
                }, {
                    data: 'offerMaster.availability',
                    sClass: 'align-center',
                    "render": function(data) {
                        return self.rootParent.common.formatDateddMMYYYY(data)
                    },
                }, {
                    data: 'offerMaster.expiry',
                    sClass: 'align-center',
                    sClass: 'countdown'
                }, {
                    data: 'offerMaster.status',
                    "visible": false
                }, {
                    data: 'read',
                    visible : false
                }],

                "fnCreatedRow": function(nRow, aData, iDataIndex) {
                    $(nRow)[0].id = iDataIndex;
                }
            });
	};
	this.unConfirmedOffers = function () {
			var notificationData = [];
            oTable = $('#listUnConfirmedOffers').DataTable({
                'ajax': BASE_URL + "/unConfirmedOffers?cpm="+false,
                'serverSide': true,
                "responsive": true,
                "sScrollX": '100%',
                "bDestroy": true,
                "order": [[ 14, "asc" ]],
                "language": {
                    "zeroRecords": "No data to dispay"
                },
                "oLanguage": {
                    "sProcessing": self.rootParent.common.setLoader()
                  },
                 "processing": true,
                 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                     self.rootParent.common.renderCountdown( nRow.lastChild );
                     if (!aData.notified) {
							$('td', nRow).css('background', '#ffcccc');
							notificationData.push(aData.id);
						}
                  },
                "fnDrawCallback": function(settings, ajax) {
                    self.singleCheckBox = $(self.rootParent.rootParent).find('.offer_checkbox')
					self.singleCheckBox.on('click', self.rootParent.singleSelectCheck);
                    self.rootParent.common.checkTableEmpty();
                    self.rootParent.common.checkSelectedOffers();
                    $.fn.dataTable.ext.errMode = 'none';
                    self.rootParent.common.hidePaginate(this);
					self.rootParent.common.updateNotification('unConfirmedOffers',notificationData);
                },
                "columns": [{
                    data: 'id',
                    "title": "<input type='checkbox' name='offer-id-title' class='select_all_check'>",
                    "bSortable": false,
                    "render": function(data) {
                        return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='" + data + "'>"
                    }
                },  {
                    data: 'accountCode',
                    sClass: 'align-center'
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
                },{
                	data: 'offerMaster.balanceQuantity',
                    sClass: 'align-right',
	                  render: function(data){
	                        return self.rootParent.common.getNumberWithCommas(data);
	                    }
                }, {
                    data: 'offerMaster.city.description',
                    sClass: 'align-center'
                }, {
                    data: 'offerMaster.premium',
                    sClass: 'align-right',
	                  render: function(data){
	                        return self.rootParent.common.getNumberWithCommas(data);
	                    }
                }, {
                    data: 'offerMaster.availability',
                    sClass: 'align-center',
                    "render": function(data) {
                        return self.rootParent.common.formatDateddMMYYYY(data)
                    },
                }, {
                    data: 'offerMaster.expiry',
                    sClass: 'align-center',
                    sClass: 'countdown'
                }, {
                    data: 'offerMaster.status',
                    "visible": false
                }, {
                    data: 'read',
                    visible : false
                }],

                "fnCreatedRow": function(nRow, aData, iDataIndex) {
                    $(nRow)[0].id = iDataIndex;
                }
            });
	
	};
	this.customerRFQ = function() {

		oTable = $('#listCustomerRFQs')
				.DataTable(
						{
							'ajax' : BASE_URL + "/getCustomerRFQs",
							'serverSide' : true,
							"responsive" : true,
							"sScrollX": '100%',
							"bDestroy" : true,
							"order" : [ [ 15, "asc" ] ],
							"language": {
				                    "zeroRecords": "No data to dispay"
				            },
			                "oLanguage": {
			                    "sProcessing": self.rootParent.common.setLoader()
			                  },
			                 "processing": true,
							"fnRowCallback" : function(nRow, aData,
									iDisplayIndex, iDisplayIndexFull) {
								if (aData.offerMaster.offerType.id == "4") {
									$('td', nRow).css('background', '#D0FFEB');
								}
								self.rootParent.common.renderCountdown( nRow.lastChild );
							},
							"fnDrawCallback" : function() {
								self.singleCheckBox = $(self.rootParent.rootParent).find('.offer_checkbox')
								self.singleCheckBox.on('click',self.rootParent.singleSelectCheck);
								self.rootParent.common.checkTableEmpty();
								self.rootParent.common.checkSelectedOffers();
								$.fn.dataTable.ext.errMode = 'none';
								self.rootParent.common.hidePaginate(this);
								self.rootParent.common.getNotification();
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
									},  {
					                    data: 'accountCode',
					                    sClass: 'align-center'
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
						             },{
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
									} ],

							"fnCreatedRow" : function(nRow, aData, iDataIndex) {
								$(nRow)[0].id = iDataIndex;
							}
						});
	};
	this.supplierRFQ = function () {
		var notificationData = [];
        oTable = $('#listSupplierRFQs').DataTable({
            'ajax': BASE_URL + "/getSupplierRFQs",
            'serverSide': true,
            "responsive": true,
            "sScrollX": '100%',
            "bDestroy": true,
            "order": [[ 14, "asc" ]],
            "language": {
                "zeroRecords": "No data to dispay"
            },
            "oLanguage": {
                "sProcessing": self.rootParent.common.setLoader()
              },
             "processing": true,
            "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            	if ( aData.offerMaster.offerType.id == "4" )
                {
                    $('td', nRow).css('background', '#D0FFEB');
                }
	        	if (!aData.notified) {
						$('td', nRow).css('background', '#ffcccc');
						notificationData.push(aData.id);
				}
	        	self.rootParent.common.renderCountdown(
								nRow.lastChild);
            },
            "fnDrawCallback": function(settings, ajax) {
                self.singleCheckBox = $(self.rootParent.rootParent).find('.offer_checkbox')
               // self.singleCheckBox.on('click', self.rootParent.singleSelectCheck);
                self.rootParent.common.checkTableEmpty();
                self.rootParent.common.checkSelectedOffers();
                $.fn.dataTable.ext.errMode = 'none';
                self.rootParent.common.hidePaginate(this);
				self.rootParent.common.updateNotification('rfq',notificationData);
            },
            "columns": [{
                data: 'id',
                "title": "<input type='checkbox' name='offer-id-title' class='select_all_check'>",
                "bSortable": false,
                "render": function(data) {
                    return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='" + data + "'>"
                }
            },  {
                data: 'accountCode',
                sClass: 'align-center'
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
            },{
            	data: 'offerMaster.quantity',
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
                data: 'offerMaster.premium',
                sClass: 'align-right',
                render: function(data){
                    return data==0?"":self.rootParent.common.getNumberWithCommas(data); 
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
                data: 'offerMaster.offerType.id',
                "visible": false,
            }, {
				data : 'read',
				visible : false
			}],

            "fnCreatedRow": function(nRow, aData, iDataIndex) {
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
            "sScrollX": '100%',
            "order": [[ 13, "asc" ]],
            "language": {
                "zeroRecords": "No data to dispay"
            },
            "oLanguage": {
                "sProcessing": self.rootParent.common.setLoader()
              },
             "processing": true,
            "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            	if (!aData.notified) {
					$('td', nRow).css('background', '#ffcccc');
					notificationData.push(aData.id);
				}
            	self.rootParent.common.renderCountdown( nRow.lastChild );
            },
            "fnDrawCallback": function(settings, ajax) {
                self.singleCheckBox = $(self.rootParent.rootParent).find('.offer_checkbox')
                self.singleCheckBox.on('click', self.rootParent.singleSelectCheck);
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
                data: 'offerMaster.premium',
                sClass: 'align-right',
                render: function(data){
                    return self.rootParent.common.getNumberWithCommas(data);
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
    };
    
    this.RO = function () {
    	var notificationData = [];
        oTable = $('#listRO').DataTable({
            'ajax': BASE_URL + "/getRejectedDOs",
            'serverSide': true,
            "responsive": true,
            "bDestroy": true,
            "sScrollX": '100%',
            "order": [[ 13, "asc" ]],
            "language": {
                "zeroRecords": "No data to dispay"
            },
            "oLanguage": {
                "sProcessing": self.rootParent.common.setLoader()
              },
             "processing": true,
            "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            	if (!aData.notified) {
					$('td', nRow).css('background', '#ffcccc');
					notificationData.push(aData.id);
				}
            	self.rootParent.common.renderCountdown( nRow.lastChild );
            },
            "fnDrawCallback": function(settings, ajax) {
                self.singleCheckBox = $(self.rootParent.rootParent).find('.offer_checkbox')
                self.singleCheckBox.on('click', self.rootParent.singleSelectCheck);
                self.rootParent.common.checkTableEmpty();
                self.rootParent.common.checkSelectedOffers();
                $.fn.dataTable.ext.errMode = 'none';
                self.rootParent.common.hidePaginate(this);
                self.rootParent.common.updateNotification('RO',notificationData);
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
            },  {
               	 data: 'offerMaster.commodity.metal.qtyType',
                sClass: 'align-center'
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
                data: 'offerMaster.premium',
                sClass: 'align-right',
                render: function(data){
                    return self.rootParent.common.getNumberWithCommas(data);
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

            "fnCreatedRow": function(nRow, aData, iDataIndex) {
                $(nRow)[0].id = iDataIndex;
            }
        });
    };
    this.trades = function () {
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
								self.singleCheckBox = $(self.rootParent.rootParent).find('.offer_checkbox')
								self.singleCheckBox.on('click', self.rootParent.singleSelectCheck);
								self.rootParent.common.checkTableEmpty();
								self.rootParent.common.checkSelectedOffers();
								self.rootParent.common.hidePaginate(this);
								self.rootParent.common.updateNotification('trade', notificationData);
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
									},{
										data : 'offer.offerMaster.commodity.metal.qtyType',
										sClass : 'align-center',
										
									},{
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
					                	data : 'calculatedPremium',
										sClass : 'align-right',
						                  render: function(data){
						                	  return data == 0 ? "" : self.rootParent.common.getNumberWithCommas( self.rootParent.common.roundOff2Decimal(data) );
						                    }
					                },
									{
					                	data : 'offer.offerMaster.city.description',
										sClass : 'align-center ellipses_col',	
									},
									{

										data : 'deliveryAddress',
										sClass : 'align-center ellipses_col',
										render : function(data) {
											return data == null ? "" : data;
										}
									},
									{
										data : 'tradeDate',
										"render" : function(data) {
											return self.rootParent.common
													.formatDateddMMYYYY(data)
										},
										sClass : 'align-center'
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
									} , {
										data : 'read',
										visible : false
									}],

							"fnCreatedRow" : function(nRow, aData, iDataIndex) {
								$(nRow)[0].id = iDataIndex;
							}
						});
	};
	this.premiumGroup = function () {
			
			oTable = $('#listgroups')
					.DataTable(
							{
								'ajax' : BASE_URL + "/getpremiumGroup",
								'serverSide' : true,
								"responsive" : true,
								"bDestroy" : true,
								"order": [0, "desc"],
								 "pagingType": "full",
								"language": {
				                    "zeroRecords": "No data to dispay"
				                },
				                "oLanguage": {
				                    "sProcessing": self.rootParent.common.setLoader()
				                  },
				                 "processing": true,
								"fnDrawCallback" : function(oSettings) {
									self.singleCheckBox = $(self.rootParent.rootParent.rootParent).find('.offer_checkbox')
									self.singleCheckBox.on('click', self.rootParent.rootParent.singleSelectCheck);
									self.rootParent.common.checkTableEmpty();
									self.rootParent.common.checkSelectedOffers();
									self.rootParent.common.hidePaginate(this);
									self.clearCheckboxSelection();
									self.rootParent.common.setSelectAll(oSettings.aoData.length);
								},
								"columns" : [
										{
											data : 'id',
											"title" : "<input type='checkbox' name='offer-id-title' class='select_all_check'>",
											"bSortable" : false,
											"render" : function(data) {
												return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='"
														+ data + "'>"
											},
											sClass: 'align-center'
										},
										{
											data : 'groupId',
											sClass : 'align-center'	
										},
										{	
											data: 'metal.metal',
											sClass : 'align-center',
											
										},
										{
											data :  'premium',
											sClass : 'align-center',
										}
										
										],
	
								"fnCreatedRow" : function(nRow, aData, iDataIndex) {
									$(nRow)[0].id = iDataIndex;
								}
							});
		};
		

		this.CPM = function () {
			oTable = $('#listcpm')
					.DataTable(
							{
								'ajax' : BASE_URL + "/getAllCPMs",
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
				                 "fnRowCallback" : function(nRow, aData,
											iDisplayIndex, iDisplayIndexFull) {
//										self.rootParent.common.renderCountdown(
//												nRow.lastChild);
				                 },
								"fnDrawCallback" : function(oSettings) {
									self.singleCheckBox = $(self.rootParent.rootParent.rootParent).find('.offer_checkbox');
									self.singleCheckBox.on('click', self.rootParent.rootParent.singleSelectCheck);
									self.rootParent.common.checkTableEmpty();
									self.rootParent.common.checkSelectedOffers();
									self.rootParent.common.hidePaginate(this);
									self.clearCheckboxSelection();
									self.rootParent.common.setSelectAll(oSettings.aoData.length);
								},
								"columns" : [
										{
											data : 'id',
											"title" : "<input type='checkbox' name='offer-id-title' class='select_all_check'>",
											"bSortable" : false,
											"render" : function(data) {
												return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='"
														+ data + "'>"
											},
											sClass: 'align-center'
										},
										{
											data : 'accountCode',
											sClass : 'align-center'	
										},
										{
											data : 'accountDesc',
											sClass : 'align-center'	
										},
										{
											data : 'premiumGroup.groupId',
											sClass : 'align-center'	
										},
										{	
											data: 'premiumGroup.metal.metal',
											sClass : 'align-center',
											
										},
										{
											data :  'premiumGroup.premium',
											sClass : 'align-center',
						                     render: function(data){
						                         return self.rootParent.common.getNumberWithCommas(data);
						                     }
										},
										{
											data :  'expired',
											sClass : 'align-center',
											visible : false,
										},
										],

								"fnCreatedRow" : function(nRow, aData, iDataIndex) {
									$(nRow)[0].id = iDataIndex;
								}
							});
		};
		
		this.CPMCustomize = function () {
			oTable = $('#listOffers').DataTable({
                'ajax': BASE_URL + "/confirmedOffers?cpm="+true,
                'serverSide': true,
                "responsive": true,
                "sScrollX": '100%',
                "bDestroy": true,
                "oLanguage": {
                    "sProcessing": self.rootParent.common.setLoader()
                  },
                 "processing": true,
                "order": [[ 14, "asc" ]],
                "language": {
                    "zeroRecords": "No data to dispay"
                },
                "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    self.rootParent.common.renderCountdown( nRow.lastChild );
                 },
                "fnDrawCallback": function(oSettings) {
                    self.singleCheckBox = $(self.rootParent.rootParent.rootParent).find('.offer_checkbox')
					self.singleCheckBox.on('click', self.rootParent.customizeSingleSelect);
                    self.rootParent.common.checkTableEmpty();
                    self.rootParent.common.checkSelectedOffers();
                    $.fn.dataTable.ext.errMode = 'none';
                    self.rootParent.common.hidePaginate(this);
                    self.rootParent.common.setRowSelected();
                    self.rootParent.common.setCustomizeSelectAll(oSettings.aoData.length);
                },
                "columns": [{
                    data: 'id',
                    "title": "<input type='checkbox' name='offer-id-title' class='cpm_select_all_check'>",
                    "bSortable": false,
                    "render": function(data) {
                        return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='" + data + "'>"
                    }
                }, {
                    data: 'accountCode',
                    sClass: 'align-center'
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
                    data: 'offerMaster.balanceQuantity',
                    sClass: 'align-right',
                    render: function(data){
                        return self.rootParent.common.getNumberWithCommas(data);
                    }
                }, {
                    data: 'offerMaster.commodity.metal.qtyType',
                    sClass: 'align-center'
                },{
                    data: 'offerMaster.eqOzs',
                    sClass: 'align-right',
                    "bSortable" : false,
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
                    data: 'offerMaster.premium',
                    sClass: 'align-right',
                    render: function(data){
                        return self.rootParent.common.getNumberWithCommas(data);
                    }
                }, {
                    data: 'offerMaster.availability',
                    sClass: 'align-center',
                    "render": function(data) {
                        return self.rootParent.common.formatDateddMMYYYY(data)
                    },
                }, {
                    data: 'offerMaster.expiry',
                    sClass: 'align-center',
                    sClass: 'countdown'
                }, {
                    data: 'offerMaster.status',
                    "visible": false
                }, {
                    data: 'read',
                    visible : false
                }],

                "fnCreatedRow": function(nRow, aData, iDataIndex) {
                    $(nRow)[0].id = iDataIndex;
                }
            });
		};
		this.CUSTOMIZECOLIST = function () {
	            oTable = $('#list_confirmedOffers').DataTable({
	                'ajax': BASE_URL + "/confirmedOffers?cpm="+true,
	                'serverSide': true,
	                "responsive": true,
	                "deferLoading": 0,
	                "sScrollX": '100%',
	                "oLanguage": {
	                    "sProcessing": self.rootParent.common.setLoader()
	                  },
	                 "processing": true,
	                "order": [[ 14, "asc" ]],
	                "language": {
	                    "zeroRecords": "No data to dispay"
	                },
	                "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	                    self.rootParent.common.renderCountdown( nRow.lastChild );
	                 },
	                "fnDrawCallback": function(oSettings) {
	                    self.singleCheckBox = $(self.rootParent.rootParent.rootParent).find('.offer_checkbox')
						self.singleCheckBox.on('click', self.rootParent.customizeSingleSelect);
	                    self.rootParent.common.checkTableEmpty();
	                    self.rootParent.common.checkCustomizedSelectedOffers("confirmedOffers");
	                    $.fn.dataTable.ext.errMode = 'none';
	                    self.rootParent.common.hidePaginate(this);
	                    self.rootParent.common.setCustomizeSelectAll(oSettings.aoData.length,"list_confirmedOffers");
	                },
	                "columns": [{
	                    data: 'id',
	                    "title": "<input type='checkbox' name='offer-id-title' class='cpm_select_all_check'>",
	                    "bSortable": false,
	                    "render": function(data) {
	                        return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='" + data + "'>"
	                    }
	                }, {
	                    data: 'accountCode',
	                    sClass: 'align-center'
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
	                        return data==null?"":data; 
	                    }
	                }, {
	                    data: 'offerMaster.premium',
	                    sClass: 'align-right',
	                     render: function(data){
	                         return self.rootParent.common.getNumberWithCommas(data);
	                     }
	                }, {
	                    data: 'offerMaster.availability',
	                    sClass: 'align-center',
	                    "render": function(data) {
	                        return self.rootParent.common.formatDateddMMYYYY(data)
	                    },
	                }, {
	                    data: 'offerMaster.expiry',
	                    sClass: 'align-center',
	                    sClass: 'countdown'
	                }, {
	                    data: 'offerMaster.status',
	                    "visible": false
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
		this.CUSTOMIZEUCLIST = function () {
	            oTable = $('#list_unConfirmedOffers').DataTable({
	                'ajax': BASE_URL + "/unConfirmedOffers?cpm="+true,
	                'serverSide': true,
	                "responsive": true,
	                "deferLoading": 0,
	                "sScrollX": '100%',
	                "order": [[ 14, "asc" ]],
	                "language": {
	                    "zeroRecords": "No data to dispay"
	                },
	                "oLanguage": {
	                    "sProcessing": self.rootParent.common.setLoader()
	                  },
	                 "processing": true,
	                 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	                     self.rootParent.common.renderCountdown( nRow.lastChild );
	                  },
	                "fnDrawCallback": function(oSettings) {
	                    self.singleCheckBox = $(self.rootParent.rootParent.rootParent).find('.offer_checkbox')
						self.singleCheckBox.on('click', self.rootParent.customizeSingleSelect);
	                    self.rootParent.common.checkTableEmpty();
	                    self.rootParent.common.checkCustomizedSelectedOffers("unConfirmedOffers");
	                    $.fn.dataTable.ext.errMode = 'none';
	                    self.rootParent.common.hidePaginate(this);
	                    self.rootParent.common.setCustomizeSelectAll(oSettings.aoData.length,"list_unConfirmedOffers");
	                },
	                "columns": [{
	                    data: 'id',
	                    "title": "<input type='checkbox' name='offer-id-title' class='cpm_select_all_check'>",
	                    "bSortable": false,
	                    "render": function(data) {
	                        return "<input class='offer_checkbox' type='checkbox' name='offer-id' value='" + data + "'>"
	                    }
	                },  {
	                    data: 'accountCode',
	                    sClass: 'align-center'
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
	                },{
	                	data: 'offerMaster.balanceQuantity',
	                    sClass: 'align-right',
	                     render: function(data){
	                         return self.rootParent.common.getNumberWithCommas(data);
	                     }
	                }, {
	                    data: 'offerMaster.city.description',
	                    sClass: 'align-center'
	                }, {
	                    data: 'offerMaster.premium',
	                    sClass: 'align-right',
	                     render: function(data){
	                         return self.rootParent.common.getNumberWithCommas(data);
	                     }
	                }, {
	                    data: 'offerMaster.availability',
	                    sClass: 'align-center',
	                    "render": function(data) {
	                        return self.rootParent.common.formatDateddMMYYYY(data)
	                    },
	                }, {
	                    data: 'offerMaster.expiry',
	                    sClass: 'align-center',
	                    sClass: 'countdown'
	                }, {
	                    data: 'offerMaster.status',
	                    "visible": false
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
	    this.CUSTOMIZEDOLIST = function () {
	        oTable = $('#list_DO').DataTable({
	            'ajax': BASE_URL + "/getDOs",
	            'serverSide': true,
	            "responsive": true,
	            "deferLoading": 0,
	            "sScrollX": '100%',
	            "order": [[ 13, "asc" ]],
	            "language": {
	                "zeroRecords": "No data to dispay"
	            },
	            "oLanguage": {
	                "sProcessing": self.rootParent.common.setLoader()
	              },
	             "processing": true,
	            "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	            	self.rootParent.common.renderCountdown( nRow.lastChild );
	            },
	            "fnDrawCallback": function(oSettings) {
                    self.singleCheckBox = $(self.rootParent.rootParent.rootParent).find('.offer_checkbox')
					self.singleCheckBox.on('click', self.rootParent.customizeSingleSelect);
                    self.rootParent.common.checkTableEmpty();
                    self.rootParent.common.checkCustomizedSelectedOffers("DO");
                    $.fn.dataTable.ext.errMode = 'none';
                    self.rootParent.common.hidePaginate(this);
                    self.rootParent.common.setCustomizeSelectAll(oSettings.aoData.length,"list_DO");
	            },
	            "columns": [{
	                data: 'id',
	                "title": "<input type='checkbox' name='offer-id-title' class='cpm_select_all_check'>",
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
	                data: 'offerMaster.premium',
	                sClass: 'align-right',
                    render: function(data){
                        return self.rootParent.common.getNumberWithCommas(data);
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
		this.documentApproval = function(criticality) {
			var ajaxUrl = BASE_URL;
			var innerTab = $('#currentInnerTab').val();
			switch( innerTab ){
				case 'SD':
					ajaxUrl += '/getSetDateTasks?criticality='+self.rootParent.common.criticalityHash[criticality];
					oTable = $('#documentApproval').DataTable({
			            'ajax': ajaxUrl,
			            'serverSide': true,
			            "responsive": true,
			            "sScrollX": '100%',
			            "bDestroy": true,
			            "order": [[ 0, "asc" ]],
			            "language": {
			                "zeroRecords": "No data to dispay"
			            },
			            "oLanguage": {
			                "sProcessing": self.rootParent.common.setLoader()
			              },
			             "processing": true,
			             "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
			              },
			            "fnDrawCallback": function(settings, ajax) {
			            	   self.rootParent.common.hidePaginate(this);
			            	   self.rootParent.dealerChecklistAction();
			            },
			            "columns": [{
			                data: 'tradeId',
			                sClass: 'align-center'
			            }, {
			            	data:'pendingAction',
			                orderable : false,
			                searchable : false,
			                sClass: 'align-center',
			                render : function(data, type, row){
			                	return '<u><p class="date_valuation_link" data-id="'+row.id+'" style="color:#003a63;cursor:pointer;">Set Custom Invoice Valuation Date</p></u>';
							}
			            }],
			            "fnCreatedRow": function(nRow, aData, iDataIndex) {
			            }
			        });
					break;
				case 'TT':
					var checkListAction = {
						'Review and Trigger Metal Payment Release':'rev_and_trigger_metal_pay_rel',
						'Review and Release Metal':'review_relese_metal',
				       }
					ajaxUrl += '/getDealerTrackTask?criticality='+self.rootParent.common.criticalityHash[criticality];
					oTable = $('#documentApproval').DataTable({
			            'ajax': ajaxUrl,
			            'serverSide': true,
			            "responsive": true,
			            "sScrollX": '100%',
			            "bDestroy": true,
			            "order": [[ 0, "asc" ]],
			            "language": {
			                "zeroRecords": "No data to dispay"
			            },
			            "oLanguage": {
			                "sProcessing": self.rootParent.common.setLoader()
			              },
			             "processing": true,
			             "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
			              },
			            "fnDrawCallback": function(settings, ajax) {
			            	   self.rootParent.common.hidePaginate(this);
			            	   self.rootParent.dealerChecklistAction();
			            },
			            "columns": [{
			                data: 'trade.tradeId',
			                sClass: 'align-center'
			            }, {
			            	data:'task.taskKey',
			                sClass: 'align-center',
			                render : function(data, type, row){
			                	return '<u><p class="metal_release_instrctn" data-id="'+row.trade.id+'" data-element-id="'+checkListAction[data]+'" style="color:#003a63;cursor:pointer;">'+data+'</p></u>';
							}
			            }],
			            "fnCreatedRow": function(nRow, aData, iDataIndex) {
			            }
			        });
					break;
			}
			
	};
		this.clearCheckboxSelection = function(){
	    	$('.paginate_button ').not(".current").on('click',function(){

	    	   		$('.select_all_check').attr('checked', false);

	    		});
	    }
    /*Auto initialize*/
     this.init();
}