sap.ui.controller("zss18_t2_app.dashboard_manager", {

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
			path : "/TechnicianQuantityByMachineCategory"
		}
	});		
	oVizFrame.setDataset(oDataset);
	oVizFrame.setModel(oModel);	
	oVizFrame.setVizType('column');
	oVizFrame.setVizProperties({
		title: {
		alignment:"central",
		visible: true,
		text: 'Number of Technicians by Expertise Type'
		},
		plotArea: {
        	colorPalette : d3.scale.category20().range(),
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
			path : "/MachineQuantityByMachineCategory"
		}
	});		
	oVizFrameDash3.setDataset(oDatasetDash3);
	oVizFrameDash3.setModel(oModel);	
	oVizFrameDash3.setVizType('column');
	oVizFrameDash3.setVizProperties({
		title: {
		alignment:"central",
		visible: true,
		text: 'Machine Quantity By Machine Category'
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
	
	
	var oVizFrameDash4 = this.getView().byId("iddash4");

	var oDatasetDash4 = new sap.viz.ui5.data.FlattenedDataset({
		dimensions : [{
			name : 'Status',
			value : "{Status}"}],
		               
		measures : [{
			name : 'Number of Tickets',
			value : '{Id}'} ],
		             
		data : {
			path : "/TicketQuantityByStatus"
		}
	});		
	oVizFrameDash4.setDataset(oDatasetDash4);
	oVizFrameDash4.setModel(oModel);	
	oVizFrameDash4.setVizType('bar');
	oVizFrameDash4.setVizProperties({
		title: {
		alignment:"central",
		visible: true,
		text: 'Ticket Quantity By Status'
		},
		legend: {			
			visible: false,
			}
		});
	
	
	var feedValueAxisDash4 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "valueAxis",
	      'type': "Measure",
	      'values': ["Number of Tickets"]
	    }), 
	    feedCategoryAxisDash4 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "categoryAxis",
	      'type': "Dimension",
	      'values': ["Status"]
	    });
	oVizFrameDash4.addFeed(feedValueAxisDash4);
	oVizFrameDash4.addFeed(feedCategoryAxisDash4);
	
	var oVizFrameDash2 = this.getView().byId("iddash2");

	var oDatasetDash2 = new sap.viz.ui5.data.FlattenedDataset({
		dimensions : [{
			name : 'Priority',
			value : "{Priority}"}],
		               
		measures : [{
			name : 'Number of Tickets',
			value : '{Id}'} ],
		             
		data : {
			path : "/TicketQuantityByPriority"
		}
	});		
	oVizFrameDash2.setDataset(oDatasetDash2);
	oVizFrameDash2.setModel(oModel);	
	oVizFrameDash2.setVizType('column');
	oVizFrameDash2.setVizProperties({
		title: {
		alignment:"central",
		visible: true,
		text: 'Ticket Quantity By Priority'
		},
		legend: {			
			visible: false,
			}
		});
	
	
	var feedValueAxisDash2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "valueAxis",
	      'type': "Measure",
	      'values': ["Number of Tickets"]
	    }), 
	    feedCategoryAxisDash2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "categoryAxis",
	      'type': "Dimension",
	      'values': ["Priority"]
	    });
	oVizFrameDash2.addFeed(feedValueAxisDash2);
	oVizFrameDash2.addFeed(feedCategoryAxisDash2);
	
	
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