sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
	], function (Controller, JSONModel) {
	"use strict";


	return Controller.extend("zss18_t2_app.dashboard_manager", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zss18_t2_app.dashboard_manager
*/
	onInit: function() {
	var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
	var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
	this.getView().setModel(oModel);
		
	var oVizFrame = this.getView().byId("idcolumn");

	var oDataset = new sap.viz.ui5.data.FlattenedDataset({
		dimensions : [{
			name : 'Expertise Type',
			value : "{Expertise_Type}"}],
		               
		measures : [{
			name : 'Number of Technicians',
			value : '{Id}'} ],
		             
		data : {
			path : "/d/results"
		}
	});		
	var jsonModelTechExpertise = new sap.ui.model.json.JSONModel();
	jsonModelTechExpertise.setData(this.parseJsonModelForTechnicianExpertise());
	oVizFrame.setDataset(oDataset);
	oVizFrame.setModel(jsonModelTechExpertise);	
	oVizFrame.setVizType('column');
	oVizFrame.setVizProperties({
		title: {
		alignment:"central",
		visible: true,
		text: 'Number of Technicians by Expertise Type'
		},
		plotArea: {
			colorPalette : ["green"],
        	drawingEffect: "glossy"
            },
		legend: {			
			visible: false,
			}
		});
	
	var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "valueAxis",
	      'type': "Measure",
	      'values': ["Number of Technicians"]
	    }), 

	    feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "categoryAxis",
	      'type': "Dimension",
	      'values': ["Expertise Type"]
	    });
	oVizFrame.addFeed(feedValueAxis);
	oVizFrame.addFeed(feedCategoryAxis);
	
	var oVizFrameDash3 = this.getView().byId("iddash3");

	var oDatasetDash3 = new sap.viz.ui5.data.FlattenedDataset({
		dimensions : [{
			name : 'Machine Category',
			value : "{Mac_Cat}"}],
		               
		measures : [{
			name : 'Number of Machines',
			value : '{Id}'} ],
		             
		data : {
			path : "/d/results"
		}
	});		
	var jsonModelMacCar = new sap.ui.model.json.JSONModel();
	jsonModelMacCar.setData(this.parseJsonModelForMacCat());
	oVizFrameDash3.setDataset(oDatasetDash3);
	oVizFrameDash3.setModel(jsonModelMacCar);	
	oVizFrameDash3.setVizType('column');
	oVizFrameDash3.setVizProperties({
		title: {
		alignment:"central",
		visible: true,
		text: 'Machine Quantity By Machine Category'
		},
		plotArea: {
        	drawingEffect: "glossy"
            },
		legend: {			
			visible: false,
			}
		});
	
	
	var feedValueAxisDash3 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "valueAxis",
	      'type': "Measure",
	      'values': ["Number of Machines"]
	    }), 
	    feedCategoryAxisDash3 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "categoryAxis",
	      'type': "Dimension",
	      'values': ["Machine Category"]
	    });
	oVizFrameDash3.addFeed(feedValueAxisDash3);
	oVizFrameDash3.addFeed(feedCategoryAxisDash3);
	
	
	var oVizFrameStatus =  this.getView().byId("iddash4");
	
	 var oDatasetStatus = new sap.viz.ui5.data.FlattenedDataset({
        dimensions: [{
            name: 'Status',
            value: "{Status}"
        }],
        measures: [{
            name: 'Number of Tickets',
            value: '{Id}'
        }],
        data: {
            path: "/d/results"
        }
    });
	 

	 var jsonModel = new sap.ui.model.json.JSONModel();
	 jsonModel.setData(this.parseJsonModel());
	 oVizFrameStatus.setDataset(oDatasetStatus);
	 oVizFrameStatus.setModel(jsonModel);
	 oVizFrameStatus.setVizProperties({
			title: {
			alignment:"central",
			visible: true,
			text: 'Ticket Quantity By Status'
			},
			plotArea: {
				colorPalette : ["sapUiChartPaletteSemanticNeutralLight2", "sapUiChartPaletteSequentialHue2Light1", "sapUiChartPaletteSemanticCriticalLight1", "sapUiChartPaletteSemanticBadLight3"],
	        	drawingEffect: "glossy"
	            },
			legend: {			
				visible: true,
				}
			});

    var feedPrimaryValuesS = new sap.viz.ui5.controls.common.feeds.FeedItem({
        'uid': "size",
        'type': "Measure",
        'values': ["Number of Tickets"]
    });
    var feedAxisLabelsS = new sap.viz.ui5.controls.common.feeds.FeedItem({
        'uid': "color",
        'type': "Dimension",
        'values': ["Status"]
    });

    oVizFrameStatus.addFeed(feedPrimaryValuesS);
    oVizFrameStatus.addFeed(feedAxisLabelsS);

	},
	
	navigate : function() {
		var app = new sap.m.App({
			initialPage : this.createId("idmanager_main1")
		});
		var page = sap.ui.view({
			id : this.createId("idmanager_main1"),
			viewName : "zss18_t2_app.manager_main",
			type : sap.ui.core.mvc.ViewType.XML
		});
		app.addPage(page);
		app.placeAt("content", "only");
	},
	
	toggleServiceNavigation: function(oEvent){
		this.navigate()
		
	},
	
	
	parseJsonModel: function() {
		var subArray=['New','In Progress','Done','Closed'];
		var parsed_json_result="";
		var serviceURL = '/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/TicketQuantityByStatus?$select=Status,Id';
		jQuery.ajax({
			url: serviceURL,
			async: false, 
			method: 'GET',
//				data: {username: "COPS_USER", password: "init123"},
				dataType: "json",
			success: function(data) {
				var parsed_json = JSON.parse(JSON.stringify(data))

				for (var i = 0; i < parsed_json.d.results.length; i++) {
					var status = parsed_json.d.results[i];
					status.Status = subArray[parseInt(status.Status)];					
/*					if (status.Status == '0')
						status.Status = 'New'
						else if (status.Status == '1')
							status.Status = 'In Progress'
								else if (status.Status == '2')
									status.Status = 'Done'
										else 
											status.Status = 'Closed' */
				}
				//console.log(parsed_json)
				parsed_json_result = parsed_json;
			}
		
		});
		return parsed_json_result;
	},
	
	
	parseJsonModelForMacCat: function() {
		var subArray=['Robot','Welding Machine','Koffee Machine'];
		var parsed_json_result="";
		var serviceURL = '/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/MachineQuantityByMachineCategory?$select=Mac_Cat,Id';
		jQuery.ajax({
			url: serviceURL,
			async: false, 
			method: 'GET',
//				data: {username: "COPS_USER", password: "init123"},
				dataType: "json",
			success: function(data) {
				var parsed_json = JSON.parse(JSON.stringify(data))

				for (var i = 0; i < parsed_json.d.results.length; i++) {
					var category = parsed_json.d.results[i];
					category.Mac_Cat = subArray[parseInt(category.Mac_Cat)];					
/*					if (category.Mac_Cat == '0')
						category.Mac_Cat = 'Robot'
						else if (category.Mac_Cat == '1')
							category.Mac_Cat = 'Welding Machine'
								else if (category.Mac_Cat == '2')
									category.Mac_Cat = 'Koffee Machine' */
				}
				//console.log(parsed_json)
				parsed_json_result = parsed_json;
			}
		
		});
		return parsed_json_result;
	},
	
	parseJsonModelForTechnicianExpertise: function() {
		var subArray=['Robot','Welding Machine','Koffee Machine'];
		var parsed_json_result="";
		var serviceURL = '/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/TechnicianQuantityByMachineCategory?$select=Expertise_Type,Id';
		jQuery.ajax({
			url: serviceURL,
			async: false, 
			method: 'GET',
//				data: {username: "COPS_USER", password: "init123"},
				dataType: "json",
			success: function(data) {
				var parsed_json = JSON.parse(JSON.stringify(data))

				for (var i = 0; i < parsed_json.d.results.length; i++) {
					var expertise = parsed_json.d.results[i];
					expertise.Expertise_Type = subArray[parseInt(expertise.Expertise_Type)];
/*					if (expertise.Expertise_Type == '0')
						expertise.Expertise_Type = 'Robot'
						else if (expertise.Expertise_Type == '1')
							expertise.Expertise_Type = 'Welding Machine'
								else if (expertise.Expertise_Type == '2')
									expertise.Expertise_Type = 'Koffee Machine' */
				}
				//console.log(parsed_json)
				
				parsed_json_result = parsed_json;
			}
		
		});
		return parsed_json_result;
	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zss18_t2_app.dashboard_manager
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zss18_t2_app.dashboard_manager
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zss18_t2_app.dashboard_manager
*/
//	onExit: function() {
//
//	}
	});
});