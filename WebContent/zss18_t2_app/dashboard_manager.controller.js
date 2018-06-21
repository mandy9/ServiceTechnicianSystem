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
	
	
	var oVizFrame = this.getView().byId("idpiechart");

	var oDataset = new sap.viz.ui5.data.FlattenedDataset({
		measures : [{
		        name : 'Status',
		        value : "Status"}],
		
		dimensions : [{
			        name : 'Priority',
			        value : "{Priority}"}],              
		
		             
		data : {
			path : "/TicketSet"
		}
	});		
	oVizFrame.setDataset(oDataset);
	oVizFrame.setModel(oModel);	
	
	oVizFrame.setVizProperties({
		title:{
			text : "Status of Tickets"
		},
        plotArea: {
        	colorPalette : d3.scale.category20().range(),
        	drawingEffect: "glossy"
            }});
	
	var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "size",
	      'type': "Measure",
	      'values': ["Status"]
	    }), 
	    feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
	      'uid': "color",
	      'type': "Dimension",
	      'values': ["Priority"]
	    });
	oVizFrame.addFeed(feedSize);
	oVizFrame.addFeed(feedColor);
	},

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