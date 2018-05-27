/* global moment:true */
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
   // '//WebContent/libs/moment',
], function (Controller, JSONModel, momentjs) {
    "use strict";
    

return Controller.extend("zss18_t2_app.technician_main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf t2_service_technician_system_app.technician_main
*/
	onInit : function() {
		var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
		this.getView().setModel(oModel);
		var oGridTicketDetails = this.getView().byId("gridIdTicketTechRead");
		var oGridTicketUpdate = this.getView().byId("gridIdTicketTechUpdate");
		oGridTicketDetails.setVisible(false);
		oGridTicketUpdate.setVisible(false);
		
	},
	
	onReadTicketTech : function() {
		var oTickets = this.getView().byId("service_tickets_technician_id");
		var contexts = oTickets.getSelectedContexts();
		
		if(contexts.length==0){
			alert("Please select a Row from the Service Tickets Table.");
		}
		else{
			oTickets.setBusy(true);
			
			var oGridTicketDetails = this.getView().byId("gridIdTicketTechRead");
			oGridTicketDetails.setVisible(true);
			oGridTicketDetails.focus();
			
			var items = contexts.map(function(c){
				return c.getObject();
			});
			
			var oTicketId = this.getView().byId("ticketId");
			oTicketId.setEditable(false);
			oTicketId.setValue(items[0].Id);
			
			var oPersonName = this.getView().byId("personNameId");
			oPersonName.setEditable(false);
			oPersonName.setValue(items[0].PersonName);
			
			
			var oIssue = this.getView().byId("issueId");
			oIssue.setEditable(false);
			oIssue.setValue(items[0].Issue);
			
			var oMachineId = this.getView().byId("machineId");
			oMachineId.setEnabled(false);
			oMachineId.setValue(items[0].MachineId);
			
			var oPriority = this.getView().byId("priorityId");
			oPriority.setEditable(false);
			oPriority.setValue(items[0].Priority);
			
			
			var oReportOn = this.getView().byId("reportedOnId");
			oReportOn.setEditable(false);
			oReportOn.setValue(items[0].ReportedOn);

			var oExpComplTime = this.getView().byId("expctedCompltDtId");
			oExpComplTime.setEditable(false);
			oExpComplTime.setValue(items[0].ExpctedCompltDt);
			
			var oStatus = this.getView().byId("statusId");
			oStatus.setEnabled(false);
			oStatus.setValue(items[0].Status);

			var oAssignedTo = this.getView().byId("assignedToId");
			oAssignedTo.setEditable(false);
			oAssignedTo.setValue(items[0].AssignedTo);
			
			var oAssignedBy = this.getView().byId("assignedById");
			oAssignedBy.setEditable(false);
			oAssignedBy.setValue(items[0].AssignedBy);
			
			var oTechnicianNote = this.getView().byId("technicianNoteId");
			oTechnicianNote.setEditable(false);
			oTechnicianNote.setValue(items[0].TechnicianNote);
				
		}	
	},
	
	onCloseTechnicianRead : function(){
		
		var oTickets = this.getView().byId("service_tickets_technician_id");
		oTickets.setBusy(false);
		oTickets.focus();
		var oGridTicketsDetails = this.getView().byId("gridIdTicketTechRead");
		oGridTicketsDetails.setVisible(false);
		
	},
	

	onUpdateTicketTech : function(){
		var oTickets = this.getView().byId("service_tickets_technician_id");
		var contexts = oTickets.getSelectedContexts();
		
		if(contexts.length==0){
			alert("Please select a Row from the Service Tickets Table.");
		}
		else{
			oTickets.setBusy(true);
			
			var oGridTicketUpdate = this.getView().byId("gridIdTicketTechUpdate");
			oGridTicketUpdate.setVisible(true);
			oGridTicketUpdate.focus();
			
			var oSave = this.getView().byId("saveBtnTechUpdate");
			oSave.setText("Update");
			oSave.setVisible(true);
			
			var items = contexts.map(function(c){
				return c.getObject();
			});
			
			var oTicketId = this.getView().byId("ticketUpdateId");
			oTicketId.setEditable(false);
			oTicketId.setValue(items[0].Id);
			
			var oPersonName = this.getView().byId("personNameUpdateId");
			oPersonName.setEditable(false);
			oPersonName.setValue(items[0].PersonName);
			
			
			var oIssue = this.getView().byId("issueUpdateId");
			oIssue.setEditable(false);
			oIssue.setValue(items[0].Issue);
			
			var oMachineId = this.getView().byId("machineUpdateId");
			oMachineId.setEnabled(false);
			oMachineId.setValue(items[0].MachineId);
			
			var oPriority = this.getView().byId("priorityUpdateId");
			oPriority.setEnabled(false);
			oPriority.setSelectedKey(items[0].Priority);
			
			
			var oReportOn = this.getView().byId("reportedOnUpdateId");
			oReportOn.setEditable(false);
			oReportOn.setValue(items[0].ReportedOn);

			var oExpComplTime = this.getView().byId("expctedCompltDtUpdateId");
			oExpComplTime.setEditable(true);
			oExpComplTime.setValue(items[0].ExpctedCompltDt);
			
			var oStatus = this.getView().byId("statusUpdateId");
			oStatus.setEnabled(true);
			oStatus.setSelectedKey(items[0].Status);

			var oAssignedTo = this.getView().byId("assignedToUpdateId");
			oAssignedTo.setEditable(false);
			oAssignedTo.setValue(items[0].AssignedTo);
			
			var oAssignedBy = this.getView().byId("assignedByUpdateId");
			oAssignedBy.setEditable(false);
			oAssignedBy.setValue(items[0].AssignedBy);
			
			var oTechnicianNote = this.getView().byId("technicianNoteUpdateId");
			oTechnicianNote.setEditable(true);
			oTechnicianNote.setValue(items[0].TechnicianNote);
				
		}	
	},
	
	onSaveTechnicianUpdate: function(){		
		
			const validateDate = (selectedDate) => {
			
			if(!moment(selectedDate, "DD/MM/YYYY", true).isValid()){
				sap.m.MessageToast.show("The entered date for expected completion is invalid! Please try again with correct format suggested.");
				return false;
			} 
			
			var selectedDate = moment(selectedDate, "DD/MM/YYYY");
			var currentdate = moment(moment(), "DD/MM/YYYY");   
			
			if(selectedDate.isBefore(currentdate) || selectedDate.isSame(currentdate)){
				sap.m.MessageToast.show("The expected completion date must be in future! Please try again.");
				return false;
			} else return true;
		};
		

	var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
	var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
	var view = this.getView();
	var oServiceTicket = view.byId("service_tickets_technician_id");
	

	
	
	var oNewTable = {
			Id : parseInt(view.byId("ticketUpdateId").getValue()),
			PersonName : view.byId("personNameUpdateId").getValue(),
			Issue : view.byId("issueUpdateId").getValue(),
			MachineId : parseInt(view.byId("machineUpdateId").getValue()),
			Priority : view.byId("priorityUpdateId").getSelectedItem().getText(),
			ReportedOn : view.byId("reportedOnUpdateId").getValue(),
			ExpctedCompltDt : view.byId("expctedCompltDtUpdateId").getValue(),
			Status : view.byId("statusUpdateId").getSelectedItem().getText(),
			AssignedTo : view.byId("assignedToUpdateId").getValue(),
			AssignedBy : view.byId("assignedByUpdateId").getValue(),
			TechnicianNote : view.byId("technicianNoteUpdateId").getValue(),
	};

	if(validateDate(oNewTable.ExpctedCompltDt)){
		
			oModel.update("/TicketSet("+oNewTable.Id+")", oNewTable, {
				method: "PUT",
				success: function(oData, oResponse) {
					sap.m.MessageToast.show("Data successfully updated!")
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error during updating data!")
				}
			});	
			
	}



	var oGrid = view.byId("gridIdTicketTechUpdate");
	oGrid.setVisible(false);

	var oSave = view.byId("saveBtnTechUpdate");
	oSave.setText("Save");
	oSave.setVisible(false);

	oServiceTicket.setBusy(false);
	oServiceTicket.focus();
	view.setModel(oModel);
	view.getModel();
},
	
	
	onCloseTechnicianUpdate : function(){
		
		var oTickets = this.getView().byId("service_tickets_technician_id");
		oTickets.setBusy(false);
		oTickets.focus();
		var oGridTicketsUpdate = this.getView().byId("gridIdTicketTechUpdate");
		oGridTicketsUpdate.setVisible(false);
		
	},
	
	
	 onSearch: function(oEvt) {
		 	var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();
			var oFilter = null;
			var sQuery = oEvt.getParameter("query");
			var oGlobalFilter = null;

			if (sQuery) {
				oGlobalFilter = new sap.ui.model.Filter([
					new sap.ui.model.Filter("PersonName", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, sQuery)
				], true);

					oFilter = new sap.ui.model.Filter(oGlobalFilter, true);
					view.byId("service_tickets_technician_id").getBinding("items").filter(oFilter);
					view.getModel()}
	 },
				

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf t2_service_technician_system_app.technician_main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf t2_service_technician_system_app.technician_main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf t2_service_technician_system_app.technician_main
*/
//	onExit: function() {
//
//	}
});
});