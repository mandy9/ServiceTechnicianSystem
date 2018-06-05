/* global moment:true */
sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	// '//WebContent/libs/moment',
	], function (Controller, JSONModel, momentjs) {
	"use strict";


	return Controller.extend("zss18_t2_app.manager_main", {

		/**
		 * Called when a controller is instantiated and its View controls (if available)
		 * are already created. Can be used to modify the View before it is displayed,
		 * to bind event handlers and do other one-time initialization.
		 * 
		 * @memberOf t2_service_technician_system_app.manager_main
		 */
		onInit : function() {
			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			this.getView().setModel(oModel);
			var oGridTicketCreate = this.getView().byId("gridIdTicketManagCreate");
			var oGridTicketDetails = this.getView().byId("gridIdTicketManagRead");
			var oGridTicketUpdate = this.getView().byId("gridIdTicketManagUpdate");
			var oGridTicketChange = this.getView().byId("gridIdTicketManagChange");
			oGridTicketCreate.setVisible(false);
			oGridTicketDetails.setVisible(false);
			oGridTicketUpdate.setVisible(false);
			oGridTicketChange.setVisible(false);

		},


		onCreateTicketManag : function(){
			var oTickets = this.getView().byId("service_tickets_manager_id");
			
			oTickets.setBusy(true);

			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(false);
			readBtn.setEnabled(false);
			updateBtn.setEnabled(false);
			changeBtn.setEnabled(false);
			deleteBtn.setEnabled(false);
			
			var oGridTicketCreate = this.getView().byId("gridIdTicketManagCreate");
			oGridTicketCreate.setVisible(true);
			oGridTicketCreate.focus();
			
			var oSave = this.getView().byId("saveBtnManagCreate");
			oSave.setText("Create");
			oSave.setVisible(true);

			var oTicketId = this.getView().byId("ticketCreateId");
			oTicketId.setEditable(true);
			oTicketId.setValue("");

			var oPersonName = this.getView().byId("personNameCreateId");
			oPersonName.setEditable(true);
			oPersonName.setValue("");

			var oIssue = this.getView().byId("issueCreateId");
			oIssue.setEditable(true);
			oIssue.setValue("");

			var oMachineId = this.getView().byId("machineCreateId");
			oMachineId.setEnabled(true);
			oMachineId.setValue("");

			var oPriority = this.getView().byId("priorityCreateId");
			oPriority.setEnabled(true);
			oPriority.setSelectedKey(2+"");

			var oAssignedTo = this.getView().byId("assignedToCreateId");
			oAssignedTo.setEditable(true);
			oAssignedTo.setValue("");

		},

		onSaveManagerCreate: function(){		


			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();
			var oServiceTicket = view.byId("service_tickets_manager_id");
			var currentManagerName = "Zaeem";		/* Have to change it with the name of logged in manager*/

			var oNewTable = {
					Id : parseInt(view.byId("ticketCreateId").getValue()),
					PersonName : view.byId("personNameCreateId").getValue().toUpperCase(),
					Issue : view.byId("issueCreateId").getValue().toUpperCase(),
					MachineId : parseInt(view.byId("machineCreateId").getValue()),
					Priority : view.byId("priorityCreateId").getSelectedItem().getText(),
					ReportedOn : moment().format('DD/MM/YYYY').toString(),
					ExpctedCompltDt : "",
					Status : "0",
					AssignedTo : view.byId("assignedToCreateId").getValue().toUpperCase(),
					AssignedBy : currentManagerName.toUpperCase(),
					TechnicianNote : "",
			};
			console.log(oNewTable)
			oModel.create("/TicketSet", oNewTable, {
				method: "POST",
				success: function(oData, oResponse) {
					sap.m.MessageToast.show("Data successfully added!")
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error during adding data!")
				}
			});	

			var oGrid = view.byId("gridIdTicketManagCreate");
			oGrid.setVisible(false);
			
			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			oServiceTicket.setBusy(false);
			oServiceTicket.focus();
			view.setModel(oModel);
			view.getModel();
		},		

		onCloseManagerCreate : function(){

			var oGridTicketCreate = this.getView().byId("gridIdTicketManagCreate");
			oGridTicketCreate.setVisible(false);
			
			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			var oTickets = this.getView().byId("service_tickets_manager_id");
			oTickets.setBusy(false);
			oTickets.focus();

		},

		onReadTicketManag : function() {
			var oTickets = this.getView().byId("service_tickets_manager_id");
			var contexts = oTickets.getSelectedContexts();

			if(contexts.length==0){
				alert("Please select a Row from the Service Tickets Table.");
			}
			else{
				oTickets.setBusy(true);
				
				var createBtn = this.getView().byId("idCreateTicketManag");
				var readBtn = this.getView().byId("idReadTicket");
				var updateBtn = this.getView().byId("idUpdateTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(false);
				readBtn.setEnabled(false);
				updateBtn.setEnabled(false);
				changeBtn.setEnabled(false);
				deleteBtn.setEnabled(false);
				
				var oGridTicketDetails = this.getView().byId("gridIdTicketManagRead");
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

		onCloseManagerRead : function(){

			var oGridTicketDetails = this.getView().byId("gridIdTicketManagRead");
			oGridTicketDetails.setVisible(false);
			
			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			var oTickets = this.getView().byId("service_tickets_manager_id");
			oTickets.setBusy(false);
			oTickets.focus();

		},

		onUpdateTicketManag : function(){
			var oTickets = this.getView().byId("service_tickets_manager_id");
			var contexts = oTickets.getSelectedContexts();

			if(contexts.length==0){
				alert("Please select a Row from the Service Tickets Table.");
			}
			else{
				oTickets.setBusy(true);
				
				var createBtn = this.getView().byId("idCreateTicketManag");
				var readBtn = this.getView().byId("idReadTicket");
				var updateBtn = this.getView().byId("idUpdateTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(false);
				readBtn.setEnabled(false);
				updateBtn.setEnabled(false);
				changeBtn.setEnabled(false);
				deleteBtn.setEnabled(false);

				var oGridTicketUpdate = this.getView().byId("gridIdTicketManagUpdate");
				oGridTicketUpdate.setVisible(true);
				oGridTicketUpdate.focus();

				var oSave = this.getView().byId("saveBtnManagUpdate");
				oSave.setText("Update");
				oSave.setVisible(true);

				var items = contexts.map(function(c){
					return c.getObject();
				});

				var oTicketId = this.getView().byId("ticketUpdateId");
				oTicketId.setEditable(false);
				oTicketId.setValue(items[0].Id);

				var oPersonName = this.getView().byId("personNameUpdateId");
				oPersonName.setEditable(true);
				oPersonName.setValue(items[0].PersonName);


				var oIssue = this.getView().byId("issueUpdateId");
				oIssue.setEditable(true);
				oIssue.setValue(items[0].Issue);

				var oMachineId = this.getView().byId("machineUpdateId");
				oMachineId.setEnabled(true);
				oMachineId.setValue(items[0].MachineId);

				var oPriority = this.getView().byId("priorityUpdateId");
				oPriority.setEnabled(true);
				oPriority.setSelectedKey(items[0].Priority);


				var oReportOn = this.getView().byId("reportedOnUpdateId");
				oReportOn.setEditable(false);
				oReportOn.setValue(items[0].ReportedOn);

				var oExpComplTime = this.getView().byId("expctedCompltDtUpdateId");
				oExpComplTime.setEditable(false);
				oExpComplTime.setValue(items[0].ExpctedCompltDt);

				var oStatus = this.getView().byId("statusUpdateId");
				oStatus.setEnabled(false);
				oStatus.setSelectedKey(items[0].Status);

				var oAssignedTo = this.getView().byId("assignedToUpdateId");
				oAssignedTo.setEditable(true);
				oAssignedTo.setValue(items[0].AssignedTo);

				var oAssignedBy = this.getView().byId("assignedByUpdateId");
				oAssignedBy.setEditable(false);
				oAssignedBy.setValue(items[0].AssignedBy);

				var oTechnicianNote = this.getView().byId("technicianNoteUpdateId");
				oTechnicianNote.setEditable(false);
				oTechnicianNote.setValue(items[0].TechnicianNote);

			}	
		},

		onSaveManagerUpdate: function(){		

			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();
			var oServiceTicket = view.byId("service_tickets_manager_id");

			var oNewTable = {
					Id : parseInt(view.byId("ticketUpdateId").getValue()),
					PersonName : view.byId("personNameUpdateId").getValue().toUpperCase(),
					Issue : view.byId("issueUpdateId").getValue().toUpperCase(),
					MachineId : parseInt(view.byId("machineUpdateId").getValue()),
					Priority : view.byId("priorityUpdateId").getSelectedItem().getText(),
					ReportedOn : view.byId("reportedOnUpdateId").getValue(),
					ExpctedCompltDt : view.byId("expctedCompltDtUpdateId").getValue(),
					Status : view.byId("statusUpdateId").getSelectedItem().getText(),
					AssignedTo : view.byId("assignedToUpdateId").getValue().toUpperCase(),
					AssignedBy : view.byId("assignedByUpdateId").getValue().toUpperCase(),
					TechnicianNote : view.byId("technicianNoteUpdateId").getValue().toUpperCase(),
			};

			oModel.update("/TicketSet("+oNewTable.Id+")", oNewTable, {
				method: "PUT",
				success: function(oData, oResponse) {
					sap.m.MessageToast.show("Data successfully updated!")
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error during updating data!")
				}
			});	

			var oGrid = view.byId("gridIdTicketManagUpdate");
			oGrid.setVisible(false);

			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			oServiceTicket.setBusy(false);
			oServiceTicket.focus();
			view.setModel(oModel);
			view.getModel();
		},

		onCloseManagerUpdate : function(){

			var oGridTicketUpdate = this.getView().byId("gridIdTicketManagUpdate");
			oGridTicketUpdate.setVisible(false);
			
			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			var oTickets = this.getView().byId("service_tickets_manager_id");
			oTickets.setBusy(false);
			oTickets.focus();
			
		},

		oldStatus: "",

		onChangeTicketManag : function(){
			var oTickets = this.getView().byId("service_tickets_manager_id");
			var contexts = oTickets.getSelectedContexts();

			if(contexts.length==0){
				alert("Please select a Row from the Service Tickets Table.");
			}
			else{
				oTickets.setBusy(true);
				
				var createBtn = this.getView().byId("idCreateTicketManag");
				var readBtn = this.getView().byId("idReadTicket");
				var updateBtn = this.getView().byId("idUpdateTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(false);
				readBtn.setEnabled(false);
				updateBtn.setEnabled(false);
				changeBtn.setEnabled(false);
				deleteBtn.setEnabled(false);

				var oGridTicketUpdate = this.getView().byId("gridIdTicketManagChange");
				oGridTicketUpdate.setVisible(true);
				oGridTicketUpdate.focus();

				var oSave = this.getView().byId("saveBtnManagChange");
				oSave.setText("Change Status");
				oSave.setVisible(true);

				var items = contexts.map(function(c){
					return c.getObject();
				});

				var oTicketId = this.getView().byId("ticketChangeId");
				oTicketId.setEditable(false);
				oTicketId.setValue(items[0].Id);

				var oPersonName = this.getView().byId("personNameChangeId");
				oPersonName.setEditable(false);
				oPersonName.setValue(items[0].PersonName);


				var oIssue = this.getView().byId("issueChangeId");
				oIssue.setEditable(false);
				oIssue.setValue(items[0].Issue);

				var oMachineId = this.getView().byId("machineChangeId");
				oMachineId.setEnabled(false);
				oMachineId.setValue(items[0].MachineId);

				var oPriority = this.getView().byId("priorityChangeId");
				oPriority.setEnabled(false);
				oPriority.setSelectedKey(items[0].Priority);


				var oReportOn = this.getView().byId("reportedOnChangeId");
				oReportOn.setEditable(false);
				oReportOn.setValue(items[0].ReportedOn);

				var oExpComplTime = this.getView().byId("expctedCompltDtChangeId");
				oExpComplTime.setEditable(false);
				oExpComplTime.setValue(items[0].ExpctedCompltDt);

				var oStatus = this.getView().byId("statusChangeId");
				oStatus.setEnabled(true);
				oStatus.setSelectedKey(items[0].Status);
				this.oldStatus = items[0].Status;

				var oAssignedTo = this.getView().byId("assignedToChangeId");
				oAssignedTo.setEditable(false);
				oAssignedTo.setValue(items[0].AssignedTo);

				var oAssignedBy = this.getView().byId("assignedByChangeId");
				oAssignedBy.setEditable(false);
				oAssignedBy.setValue(items[0].AssignedBy);

				var oTechnicianNote = this.getView().byId("technicianNoteChangeId");
				oTechnicianNote.setEditable(false);
				oTechnicianNote.setValue(items[0].TechnicianNote);

			}	
		},

		onSaveManagerChange: function(){		

			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();
			var oServiceTicket = view.byId("service_tickets_manager_id");

			var oNewTable = {
					Id : parseInt(view.byId("ticketChangeId").getValue()),
					PersonName : view.byId("personNameChangeId").getValue().toUpperCase(),
					Issue : view.byId("issueChangeId").getValue().toUpperCase(),
					MachineId : parseInt(view.byId("machineChangeId").getValue()),
					Priority : view.byId("priorityChangeId").getSelectedItem().getText(),
					ReportedOn : view.byId("reportedOnChangeId").getValue(),
					ExpctedCompltDt : view.byId("expctedCompltDtChangeId").getValue(),
					Status : view.byId("statusChangeId").getSelectedItem().getText(),
					AssignedTo : view.byId("assignedToChangeId").getValue().toUpperCase(),
					AssignedBy : view.byId("assignedByChangeId").getValue().toUpperCase(),
					TechnicianNote : view.byId("technicianNoteChangeId").getValue().toUpperCase(),
			};

			if(oNewTable.Status != this.oldStatus && oNewTable.ExpctedCompltDt != "" && oNewTable.TechnicianNote != ""){

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
			else{
				sap.m.MessageToast.show("Please make sure that technician has given some expected date and notes, and that old status and new status should be different")
			}


			var oGrid = view.byId("gridIdTicketManagChange");
			oGrid.setVisible(false);

			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			oServiceTicket.setBusy(false);
			oServiceTicket.focus();
			view.setModel(oModel);
			view.getModel();
		},


		onCloseManagerChange : function(){

			var oGridTicketChange = this.getView().byId("gridIdTicketManagChange");
			oGridTicketChange.setVisible(false);

			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			var oTickets = this.getView().byId("service_tickets_manager_id");
			oTickets.setBusy(false);
			oTickets.focus();

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
				view.byId("service_tickets_manager_id").getBinding("items").filter(oFilter);
				view.getModel()}
		},

		onDeleteTicketManag : function() {

			var Id;		
			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();

			var deleteButton = new sap.m.Button({
				text : "Delete",
				type : sap.m.ButtonType.Accept,
				press : function() {

					oModel.remove("/TicketSet("+Id+")", {
						success : function(oData, oResponse) {
							sap.m.MessageToast.show("Data successfully deleted!")
							sap.ui.getCore().byId("Popup").destroy();
						},
						error : function(oError) {
							sap.m.MessageToast.show("Error during deleting data")
						}
					});

					view.setModel(oModel);
					view.getModel();			

				}		
			});

			var cancelButton = new sap.m.Button({
				text : "Cancel",
				type : sap.m.ButtonType.Reject,
				press : function() {
					sap.ui.getCore().byId("Popup").destroy();
				}
			});

			var oDialog = new sap.m.Dialog("Popup", {
				title : "Delete Data",
				modal : true,
				contentWidth : "1em",
				buttons : [ deleteButton, cancelButton ],
				content : [ new sap.m.Label({
					text : "Are you sure you want to delete this data?"
				}),]
			});

			var oTickets = this.getView().byId("service_tickets_manager_id");
			var contexts = oTickets.getSelectedContexts();

			if(contexts.length==0){
				alert("Please select a Row");
				sap.ui.getCore().byId("Popup").destroy();
			}
			else{
				var items = contexts.map(function(c){
					return c.getObject();
				});

				Id = parseInt(items[0].Id);
				sap.ui.getCore().byId("Popup").open();
			}

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's
		 * View is re-rendered (NOT before the first rendering! onInit() is used for
		 * that one!).
		 * 
		 * @memberOf t2_service_technician_system_app.manager_main
		 */
//		onBeforeRendering: function() {

//		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document).
		 * Post-rendering manipulations of the HTML could be done here. This hook is the
		 * same one that SAPUI5 controls get after being rendered.
		 * 
		 * @memberOf t2_service_technician_system_app.manager_main
		 */
//		onAfterRendering: function() {

//		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and
		 * finalize activities.
		 * 
		 * @memberOf t2_service_technician_system_app.manager_main
		 */
//		onExit: function() {

//		}
	});
});