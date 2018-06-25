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
			var oGridTicketChangeMT = this.getView().byId("gridIdTicketManagChangeMT");
			var oGridTicketChange = this.getView().byId("gridIdTicketManagChange");
			oGridTicketCreate.setVisible(false);
			oGridTicketDetails.setVisible(false);
			oGridTicketUpdate.setVisible(false);
			oGridTicketChangeMT.setVisible(false);
			oGridTicketChange.setVisible(false);

		},
		
		currentManagerName: "ABAP-09",		/* Manager ID:- Have to change it with the name of logged in manager*/

		onCreateTicketManag : function(){
			this.byId("ManagerPage").scrollTo(300,10);
			var oTickets = this.getView().byId("service_tickets_manager_id");
			
			oTickets.setBusy(true);

			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(false);
			readBtn.setEnabled(false);
			updateBtn.setEnabled(false);
			changeMTBtn.setEnabled(false);
			changeBtn.setEnabled(false);
			deleteBtn.setEnabled(false);
			
			var oGridTicketCreate = this.getView().byId("gridIdTicketManagCreate");
			oGridTicketCreate.setVisible(true);
			oGridTicketCreate.focus();
			
			var oSave = this.getView().byId("saveBtnManagCreate");
			oSave.setText("Create");
			oSave.setVisible(true);

			var oPersonName = this.getView().byId("personNameCreateId");
			oPersonName.setEditable(true);
			oPersonName.setValue("");

			var oIssue = this.getView().byId("issueCreateId");
			oIssue.setEditable(true);
			oIssue.setValue("");

			var oMachineId = this.getView().byId("machineCreateId");
			oMachineId.setEnabled(true);
			oMachineId.setSelectedKey("");
//			oMachineId.setValue("");

			var oPriority = this.getView().byId("priorityCreateId");
			oPriority.setEnabled(true);
			oPriority.setSelectedKey(2+"");

			var oAssignedTo = this.getView().byId("assignedToCreateId");
			oAssignedTo.setEnabled(true);

			var selectedkey = oMachineId.getSelectedKey();
			var mac_cat = "";
			const baseUrl = 'http://i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/';
			const dynamParams = 'MachineSet('+selectedkey+')/Mac_Cat/$value';
			
			jQuery.ajax({
				url: baseUrl+dynamParams,
				method: 'GET',
//					data: {username: "COPS_USER", password: "init123"},
//					dataType: 'json',
				success: function(data) {
					mac_cat = data;
					if(mac_cat != ""){

						var _FilterOnAssignedTo = null;
						_FilterOnAssignedTo = new sap.ui.model.Filter([
						new sap.ui.model.Filter("Role", sap.ui.model.FilterOperator.EQ, "T"),
						new sap.ui.model.Filter("Expertise_Type", sap.ui.model.FilterOperator.EQ, ""+mac_cat)
						], true);

						oAssignedTo.getBinding("items").filter(_FilterOnAssignedTo, "Application");
						oAssignedTo.setSelectedKey("");
					}
				},
				error: function(err) {alert('Error in json call ', err);}
			});	
/*			
			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView().setModel(oModel);
			var _FilterOnAssignedTo = null;
			_FilterOnAssignedTo = new sap.ui.model.Filter([
				new sap.ui.model.Filter("Role", sap.ui.model.FilterOperator.EQ, "T"),
				new sap.ui.model.Filter("Expertise_Type", sap.ui.model.FilterOperator.EQ, "2")
			], true);

			oAssignedTo.getBinding("items").filter(_FilterOnAssignedTo, "Application");

			oAssignedTo.setSelectedKey("");
//			oAssignedTo.setValue("");
*/
			
		},
		
		onSelectMachineCreate: function(oEvent){
//			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
//			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();
			view.getModel();
			
			var mac_cat = "";

			var machineSelect = view.byId("machineCreateId");
			var selectedkey = machineSelect.getSelectedKey();
			
			console.log(selectedkey);
			const baseUrl = 'http://i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/';
			const dynamParams = 'MachineSet('+selectedkey+')/Mac_Cat/$value';
			
			jQuery.ajax({
				url: baseUrl+dynamParams,
				method: 'GET',
//				data: {username: "COPS_USER", password: "init123"},
//				dataType: 'json',
				success: function(data) {
					mac_cat = data;
					if(mac_cat != ""){
						var oAssignedTo = view.byId("assignedToCreateId");
						oAssignedTo.setEnabled(true);

						var _FilterOnAssignedTo = null;
						_FilterOnAssignedTo = new sap.ui.model.Filter([
						new sap.ui.model.Filter("Role", sap.ui.model.FilterOperator.EQ, "T"),
						new sap.ui.model.Filter("Expertise_Type", sap.ui.model.FilterOperator.EQ, ""+mac_cat)
						], true);

						oAssignedTo.getBinding("items").filter(_FilterOnAssignedTo, "Application");

						oAssignedTo.setSelectedKey("");
						machineSelect.setSelectedKey(selectedkey);
					}
				},
				error: function(err) {alert('Error in json call ', err);}
			});	
		},
		
		onSaveManagerCreate: function(){		

			
			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();
			var oServiceTicket = view.byId("service_tickets_manager_id");
			
//			console.log(parseInt(view.byId("machineCreateId").getShowSecondaryValues()));
			
			
			var oNewTable = {
					Person_Name : view.byId("personNameCreateId").getValue().toUpperCase(),
					Issue : view.byId("issueCreateId").getValue(),
					Machine_Id : parseInt(view.byId("machineCreateId").getSelectedKey()),
					Priority : view.byId("priorityCreateId").getSelectedKey(),
					Reported_On : moment().format('DD/MM/YYYY').toString(),
					Expcted_Complt_Dt : "",
					Status : "0",
					Assigned_To : view.byId("assignedToCreateId").getSelectedKey(),
					Assigned_By : this.currentManagerName.toUpperCase(),
					Technician_Note : "",
			};
//			console.log(oNewTable)
			
			if(oNewTable.Person_Name != "" && oNewTable.Issue != ""){
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
				var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");
	
				createBtn.setEnabled(true);			
				readBtn.setEnabled(true);
				updateBtn.setEnabled(true);
				changeMTBtn.setEnabled(true);
				changeBtn.setEnabled(true);
				deleteBtn.setEnabled(true);
				
				oServiceTicket.setBusy(false);
				oServiceTicket.focus();
				view.setModel(oModel);
				view.getModel();
			}
			else{
				sap.m.MessageToast.show("Error! Enter complete data and then try again")				
			}
		},		

		onCloseManagerCreate : function(){

			var oGridTicketCreate = this.getView().byId("gridIdTicketManagCreate");
			oGridTicketCreate.setVisible(false);
			
			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeMTBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			var oTickets = this.getView().byId("service_tickets_manager_id");
			oTickets.setBusy(false);
			oTickets.focus();

		},

		onReadTicketManag : function() {
			this.byId("ManagerPage").scrollTo(500,10);
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
				var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(false);
				readBtn.setEnabled(false);
				updateBtn.setEnabled(false);
				changeMTBtn.setEnabled(false);
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
				oPersonName.setValue(items[0].Person_Name);


				var oIssue = this.getView().byId("issueId");
				oIssue.setEditable(false);
				oIssue.setValue(items[0].Issue);

				var oMachineId = this.getView().byId("machineId");
				oMachineId.setEnabled(false);
				oMachineId.setSelectedKey(items[0].Machine_Id);
//				oMachineId.setValue(items[0].Machine_Id);

				var oPriority = this.getView().byId("priorityId");
				oPriority.setEnabled(false);
				oPriority.setSelectedKey(items[0].Priority);
//				oPriority.setEditable(false);
//				oPriority.setValue(items[0].Priority);


				var oReportOn = this.getView().byId("reportedOnId");
				oReportOn.setEditable(false);
				oReportOn.setValue(items[0].Reported_On);

				var oExpComplTime = this.getView().byId("expctedCompltDtId");
				if(items[0].Expcted_Complt_Dt == ""){
					this.getView().byId("labelExpctedCompltDtId").setVisible(false);
					oExpComplTime.setVisible(false);
				}
				else{
					oExpComplTime.setEditable(false);
					oExpComplTime.setValue(items[0].Expcted_Complt_Dt);
				}
				
				var oStatus = this.getView().byId("statusId");
				oStatus.setEnabled(false);
				oStatus.setSelectedKey(items[0].Status);
//				oStatus.setEditable(false);
//				oStatus.setValue(items[0].Status);

				var oAssignedTo = this.getView().byId("assignedToId");
				oAssignedTo.setEnabled(false);
				oAssignedTo.setSelectedKey(items[0].Assigned_To);
//				oAssignedTo.setEditable(false);
//				oAssignedTo.setValue(items[0].Assigned_To);

				var oAssignedBy = this.getView().byId("assignedById");
				oAssignedBy.setEnabled(false);
				oAssignedBy.setSelectedKey(items[0].Assigned_By);
//				oAssignedBy.setEditable(false);
//				oAssignedBy.setValue(items[0].Assigned_By);

				var oTechnicianNote = this.getView().byId("technicianNoteId");
				if(items[0].Technician_Note == ""){
					this.getView().byId("labelTechnicianNoteId").setVisible(false);
					oTechnicianNote.setVisible(false);
				}
				else{
					oTechnicianNote.setEditable(false);
					oTechnicianNote.setValue(items[0].Technician_Note);
				}
			}	
		},

		onCloseManagerRead : function(){
			
			this.getView().byId("labelExpctedCompltDtId").setVisible(true);
			this.getView().byId("expctedCompltDtId").setVisible(true);
			this.getView().byId("labelTechnicianNoteId").setVisible(true);
			this.getView().byId("technicianNoteId").setVisible(true);
			
			var oGridTicketDetails = this.getView().byId("gridIdTicketManagRead");
			oGridTicketDetails.setVisible(false);
			
			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeMTBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			var oTickets = this.getView().byId("service_tickets_manager_id");
			oTickets.setBusy(false);
			oTickets.focus();

		},

		oldRName: "",
		oldIssue: "",
		oldPriority: "",
		
		onUpdateTicketManag : function(){
			this.byId("ManagerPage").scrollTo(500,10);
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
				var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(false);
				readBtn.setEnabled(false);
				updateBtn.setEnabled(false);
				changeMTBtn.setEnabled(false);
				changeBtn.setEnabled(false);
				deleteBtn.setEnabled(false);

				var oGridTicketUpdate = this.getView().byId("gridIdTicketManagUpdate");
				oGridTicketUpdate.setVisible(true);
				oGridTicketUpdate.focus();

				var oSave = this.getView().byId("saveBtnManagUpdate");
				oSave.setText("Update");
				oSave.setVisible(true);
				oSave.setEnabled(true);

				var items = contexts.map(function(c){
					return c.getObject();
				});

				var oTicketId = this.getView().byId("ticketUpdateId");
				oTicketId.setEditable(false);
				oTicketId.setValue(items[0].Id);

				var oPersonName = this.getView().byId("personNameUpdateId");
				oPersonName.setEditable(true);
				oPersonName.setValue(items[0].Person_Name);
				this.oldRName = items[0].Person_Name;

				var oIssue = this.getView().byId("issueUpdateId");
				oIssue.setEditable(true);
				oIssue.setValue(items[0].Issue);
				this.oldIssue = items[0].Issue;

//				console.log(items[0].Machine_Id);
				var oMachineId = this.getView().byId("machineUpdateId");
				oMachineId.setEnabled(false);
				oMachineId.setSelectedKey(items[0].Machine_Id);
//				oMachineId.setValue(items[0].Machine_Id);

				var oPriority = this.getView().byId("priorityUpdateId");
				oPriority.setEnabled(true);
				oPriority.setSelectedKey(items[0].Priority);
				this.oldPriority = items[0].Priority;

				var oReportOn = this.getView().byId("reportedOnUpdateId");
				oReportOn.setEditable(false);
				oReportOn.setValue(items[0].Reported_On);

				var oExpComplTime = this.getView().byId("expctedCompltDtUpdateId");
				if(items[0].Expcted_Complt_Dt == ""){
					this.getView().byId("labelExpctedCompltDtUpdateId").setVisible(false);
					oExpComplTime.setVisible(false);
				}
				else{
					oExpComplTime.setEditable(false);
					oExpComplTime.setValue(items[0].Expcted_Complt_Dt);
				}

				var oStatus = this.getView().byId("statusUpdateId");
				oStatus.setEnabled(false);
				oStatus.setSelectedKey(items[0].Status);

				var oAssignedTo = this.getView().byId("assignedToUpdateId");
				oAssignedTo.setEnabled(false);
				oAssignedTo.setSelectedKey(items[0].Assigned_To);

				var oAssignedBy = this.getView().byId("assignedByUpdateId");
				oAssignedBy.setEnabled(false);
				oAssignedBy.setSelectedKey(items[0].Assigned_By);

				var oTechnicianNote = this.getView().byId("technicianNoteUpdateId");
				if(items[0].Technician_Note == ""){
					this.getView().byId("labelTechnicianNoteUpdateId").setVisible(false);
					oTechnicianNote.setVisible(false);
				}
				else{
					oTechnicianNote.setEditable(false);
					oTechnicianNote.setValue(items[0].Technician_Note);
				}

				
				if(items[0].Status == 3){
					oPersonName.setEditable(false);
					oIssue.setEditable(false);
					oPriority.setEnabled(false);
					oSave.setEnabled(false);					
				}
				
			}	
		},

		onSaveManagerUpdate: function(){		

			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();
			var oServiceTicket = view.byId("service_tickets_manager_id");

			var oNewTable = {
					Id : parseInt(view.byId("ticketUpdateId").getValue()),
					Person_Name : view.byId("personNameUpdateId").getValue().toUpperCase(),
					Issue : view.byId("issueUpdateId").getValue(),
					Machine_Id : parseInt(view.byId("machineUpdateId").getSelectedKey()),
					Priority : view.byId("priorityUpdateId").getSelectedKey(),
					Reported_On : view.byId("reportedOnUpdateId").getValue(),
					Expcted_Complt_Dt : view.byId("expctedCompltDtUpdateId").getValue(),
					Status : view.byId("statusUpdateId").getSelectedKey(),
					Assigned_To : view.byId("assignedToUpdateId").getSelectedKey(),
					Assigned_By : view.byId("assignedByUpdateId").getSelectedKey(),
					Technician_Note : view.byId("technicianNoteUpdateId").getValue(),
			};

			if(!(oNewTable.Person_Name == this.oldRName && oNewTable.Issue == this.oldIssue && oNewTable.Priority == this.oldPriority)){
				oModel.update("/TicketSet("+oNewTable.Id+")", oNewTable, {
					method: "PUT",
					success: function(oData, oResponse) {
						sap.m.MessageToast.show("Data successfully updated!")
					},
					error: function(oError) {
						sap.m.MessageToast.show("Error during updating data!")
					}
				});	

				this.getView().byId("labelExpctedCompltDtUpdateId").setVisible(true);
				this.getView().byId("expctedCompltDtUpdateId").setVisible(true);
				this.getView().byId("labelTechnicianNoteUpdateId").setVisible(true);
				this.getView().byId("technicianNoteUpdateId").setVisible(true);

				var oGrid = view.byId("gridIdTicketManagUpdate");
				oGrid.setVisible(false);

				var createBtn = this.getView().byId("idCreateTicketManag");
				var readBtn = this.getView().byId("idReadTicket");
				var updateBtn = this.getView().byId("idUpdateTicketManag");
				var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(true);			
				readBtn.setEnabled(true);
				updateBtn.setEnabled(true);
				changeMTBtn.setEnabled(true);
				changeBtn.setEnabled(true);
				deleteBtn.setEnabled(true);
				
				oServiceTicket.setBusy(false);
				oServiceTicket.focus();
				view.setModel(oModel);
				view.getModel();	
			}
			else{
				sap.m.MessageToast.show("Error! Please make sure that atleast something is changed")
			}
			
		},

		onCloseManagerUpdate : function(){

			this.getView().byId("labelExpctedCompltDtUpdateId").setVisible(true);
			this.getView().byId("expctedCompltDtUpdateId").setVisible(true);
			this.getView().byId("labelTechnicianNoteUpdateId").setVisible(true);
			this.getView().byId("technicianNoteUpdateId").setVisible(true);
			
			var oGridTicketUpdate = this.getView().byId("gridIdTicketManagUpdate");
			oGridTicketUpdate.setVisible(false);
			
			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeMTBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			var oTickets = this.getView().byId("service_tickets_manager_id");
			oTickets.setBusy(false);
			oTickets.focus();
			
		},

		oldMachine: "",
		oldTechnician: "",
		
		onChangeMTTicketManag : function(){
			this.byId("ManagerPage").scrollTo(300,10);
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
				var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(false);
				readBtn.setEnabled(false);
				updateBtn.setEnabled(false);
				changeMTBtn.setEnabled(false);
				changeBtn.setEnabled(false);
				deleteBtn.setEnabled(false);

				var oGridTicketUpdate = this.getView().byId("gridIdTicketManagChangeMT");
				oGridTicketUpdate.setVisible(true);
				oGridTicketUpdate.focus();

				var oSave = this.getView().byId("saveBtnManagChangeMT");
				oSave.setText("Change Machine / Technician");
				oSave.setVisible(true);
				oSave.setEnabled(true);

				var items = contexts.map(function(c){
					return c.getObject();
				});

				var oTicketId = this.getView().byId("ticketChangeMTId");
				oTicketId.setEditable(false);
				oTicketId.setValue(items[0].Id);

				var oPersonName = this.getView().byId("personNameChangeMTId");
				oPersonName.setEditable(false);
				oPersonName.setValue(items[0].Person_Name);


				var oIssue = this.getView().byId("issueChangeMTId");
				oIssue.setEditable(false);
				oIssue.setValue(items[0].Issue);

				var oMachineId = this.getView().byId("machineChangeMTId");
				oMachineId.setEnabled(true);
				oMachineId.setSelectedKey(items[0].Machine_Id);
//				oMachineId.setValue(items[0].Machine_Id);
				this.oldMachine = items[0].Machine_Id;
				
				var oPriority = this.getView().byId("priorityChangeMTId");
				oPriority.setEnabled(false);
				oPriority.setSelectedKey(items[0].Priority);

				var oReportOn = this.getView().byId("reportedOnChangeMTId");
				oReportOn.setEditable(false);
				oReportOn.setValue(items[0].Reported_On);
/*
				var oExpComplTime = this.getView().byId("expctedCompltDtChangeMTId");
				oExpComplTime.setEditable(false);
				oExpComplTime.setValue(items[0].Expcted_Complt_Dt);

				var oStatus = this.getView().byId("statusChangeMTId");
				oStatus.setEnabled(false);
				oStatus.setSelectedKey(items[0].Status);
*/
				var oAssignedTo = this.getView().byId("assignedToChangeMTId");
				oAssignedTo.setEnabled(true);
//				oAssignedTo.setEditable(true);
//				oAssignedTo.setValue(items[0].Assigned_To);
				this.oldTechnician = items[0].Assigned_To;
/*
				var oAssignedBy = this.getView().byId("assignedByChangeMTId");
				oAssignedBy.setEditable(false);
				oAssignedBy.setValue(items[0].Assigned_By);

				var oTechnicianNote = this.getView().byId("technicianNoteChangeMTId");
				oTechnicianNote.setEditable(false);
				oTechnicianNote.setValue(items[0].Technician_Note);
*/
				if(items[0].Status== 3){
					oAssignedTo.setSelectedKey(items[0].Assigned_To);
					oAssignedTo.setEnabled(false);
					oMachineId.setEnabled(false);
					oSave.setEnabled(false);
				}
				else{
					var view = this.getView();
					view.getModel();
					
					var mac_cat = "";
	
					var selectedkey = items[0].Machine_Id;
					
					console.log(selectedkey);
					const baseUrl = 'http://i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/';
					const dynamParams = 'MachineSet('+selectedkey+')/Mac_Cat/$value';
					
					jQuery.ajax({
						url: baseUrl+dynamParams,
						method: 'GET',
	//					data: {username: "COPS_USER", password: "init123"},
	//					dataType: 'json',
						success: function(data) {
							mac_cat = data;
							if(mac_cat != ""){

								var _FilterOnAssignedTo = null;
								_FilterOnAssignedTo = new sap.ui.model.Filter([
								new sap.ui.model.Filter("Role", sap.ui.model.FilterOperator.EQ, "T"),
								new sap.ui.model.Filter("Expertise_Type", sap.ui.model.FilterOperator.EQ, ""+mac_cat)
								], true);
	
								oAssignedTo.getBinding("items").filter(_FilterOnAssignedTo, "Application");
								oAssignedTo.setSelectedKey(items[0].Assigned_To);
							}
						},
						error: function(err) {alert('Error in json call ', err);}
					});	
	
				}
				
			}	
		},

		onSelectMachineChangeMT: function(oEvent){

			var view = this.getView();
			view.getModel();

			var mac_cat = "";

			
			var machineSelect = view.byId("machineChangeMTId");
			var selectedkey = machineSelect.getSelectedKey();

//			console.log(selectedkey);
			const baseUrl = 'http://i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/';
			const dynamParams = 'MachineSet('+selectedkey+')/Mac_Cat/$value';
			
			jQuery.ajax({
				url: baseUrl+dynamParams,
				method: 'GET',
//				data: {username: "COPS_USER", password: "init123"},
//				dataType: 'json',
				success: function(data) {
					mac_cat = data;
					if(mac_cat != ""){
						var oAssignedTo = view.byId("assignedToChangeMTId");
						oAssignedTo.setEnabled(true);

						var _FilterOnAssignedTo = null;
						_FilterOnAssignedTo = new sap.ui.model.Filter([
						new sap.ui.model.Filter("Role", sap.ui.model.FilterOperator.EQ, "T"),
						new sap.ui.model.Filter("Expertise_Type", sap.ui.model.FilterOperator.EQ, ""+mac_cat)
						], true);

						oAssignedTo.getBinding("items").filter(_FilterOnAssignedTo, "Application");
						oAssignedTo.setSelectedKey("");
					}
				},
				error: function(err) {alert('Error in json call ', err);}
			});	
		},

		
		onSaveManagerChangeMT: function(){		

			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();
			var oServiceTicket = view.byId("service_tickets_manager_id");

			var oNewTable = {
					Id : parseInt(view.byId("ticketChangeMTId").getValue()),
					Person_Name : view.byId("personNameChangeMTId").getValue().toUpperCase(),
					Issue : view.byId("issueChangeMTId").getValue(),
					Machine_Id : parseInt(view.byId("machineChangeMTId").getSelectedKey()),
					Priority : view.byId("priorityChangeMTId").getSelectedKey(),
					Reported_On : view.byId("reportedOnChangeMTId").getValue(),
					Expcted_Complt_Dt : "",
					Status : "0",
					Assigned_To : view.byId("assignedToChangeMTId").getSelectedKey(),
					Assigned_By : this.currentManagerName.toUpperCase(),
					Technician_Note : "",
			};

			
			if(!(oNewTable.Machine_Id == this.oldMachine && oNewTable.Assigned_To == this.oldTechnician)){
				oModel.update("/TicketSet("+oNewTable.Id+")", oNewTable, {
					method: "PUT",
					success: function(oData, oResponse) {
						sap.m.MessageToast.show("Data successfully updated!")
					},
					error: function(oError) {
						sap.m.MessageToast.show("Error during updating data!")
					}
				});		
				
				var oGrid = view.byId("gridIdTicketManagChangeMT");
				oGrid.setVisible(false);

				var createBtn = this.getView().byId("idCreateTicketManag");
				var readBtn = this.getView().byId("idReadTicket");
				var updateBtn = this.getView().byId("idUpdateTicketManag");
				var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(true);			
				readBtn.setEnabled(true);
				updateBtn.setEnabled(true);
				changeMTBtn.setEnabled(true);
				changeBtn.setEnabled(true);
				deleteBtn.setEnabled(true);
				
				oServiceTicket.setBusy(false);
				oServiceTicket.focus();
				view.setModel(oModel);
				view.getModel();
				
			}
			else{
				sap.m.MessageToast.show("Error! Please make sure that atleast something is changed")
			}

		},


		onCloseManagerChangeMT : function(){

			var oGridTicketChange = this.getView().byId("gridIdTicketManagChangeMT");
			oGridTicketChange.setVisible(false);

			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeMTBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);
			
			var oTickets = this.getView().byId("service_tickets_manager_id");
			oTickets.setBusy(false);
			oTickets.focus();

		},
		
		oldStatus: "",

		onChangeTicketManag : function(){
			this.byId("ManagerPage").scrollTo(500,10);
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
				var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(false);
				readBtn.setEnabled(false);
				updateBtn.setEnabled(false);
				changeMTBtn.setEnabled(false);
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
				oPersonName.setValue(items[0].Person_Name);


				var oIssue = this.getView().byId("issueChangeId");
				oIssue.setEditable(false);
				oIssue.setValue(items[0].Issue);

				var oMachineId = this.getView().byId("machineChangeId");
				oMachineId.setEnabled(false);
				oMachineId.setSelectedKey(items[0].Machine_Id);
//				oMachineId.setValue(items[0].Machine_Id);

				var oPriority = this.getView().byId("priorityChangeId");
				oPriority.setEnabled(false);
				oPriority.setSelectedKey(items[0].Priority);


				var oReportOn = this.getView().byId("reportedOnChangeId");
				oReportOn.setEditable(false);
				oReportOn.setValue(items[0].Reported_On);

				var oExpComplTime = this.getView().byId("expctedCompltDtChangeId");
				if(items[0].Expcted_Complt_Dt == ""){
					this.getView().byId("labelExpctedCompltDtChangeId").setVisible(false);
					oExpComplTime.setVisible(false);
				}
				else{
					oExpComplTime.setEditable(false);
					oExpComplTime.setValue(items[0].Expcted_Complt_Dt);
				}
//				oExpComplTime.setEditable(false);
//				oExpComplTime.setValue(items[0].Expcted_Complt_Dt);

				var oStatus = this.getView().byId("statusChangeId");
				oStatus.setSelectedKey(items[0].Status);

				if(items[0].Status=="0" || items[0].Status=="1" || items[0].Status=="3"){
					oSave.setEnabled(false);	
					oStatus.setEnabled(false);
				}else{
					oSave.setEnabled(true);	
					oStatus.setEnabled(true);		
					this.oldStatus = items[0].Status;
				}					

				var oAssignedTo = this.getView().byId("assignedToChangeId");
				oAssignedTo.setEnabled(false);
				oAssignedTo.setSelectedKey(items[0].Assigned_To);

				var oAssignedBy = this.getView().byId("assignedByChangeId");
				oAssignedBy.setEnabled(false);
				oAssignedBy.setSelectedKey(items[0].Assigned_By);

				var oTechnicianNote = this.getView().byId("technicianNoteChangeId");
				if(items[0].Technician_Note == ""){
					this.getView().byId("labelTechnicianNoteChangeId").setVisible(false);
					oTechnicianNote.setVisible(false);
				}
				else{
					oTechnicianNote.setEditable(false);
					oTechnicianNote.setValue(items[0].Technician_Note);
				}
//				oTechnicianNote.setEditable(false);
//				oTechnicianNote.setValue(items[0].Technician_Note);

			}	
		},
		
		onSaveManagerChange: function(){		

			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView();
			var oServiceTicket = view.byId("service_tickets_manager_id");

			var oNewTable = {
					Id : parseInt(view.byId("ticketChangeId").getValue()),
					Person_Name : view.byId("personNameChangeId").getValue().toUpperCase(),
					Issue : view.byId("issueChangeId").getValue(),
					Machine_Id : parseInt(view.byId("machineChangeId").getSelectedKey()),
					Priority : view.byId("priorityChangeId").getSelectedKey(),
					Reported_On : view.byId("reportedOnChangeId").getValue(),
					Expcted_Complt_Dt : view.byId("expctedCompltDtChangeId").getValue(),
					Status : view.byId("statusChangeId").getSelectedKey(),
					Assigned_To : view.byId("assignedToChangeId").getSelectedKey(),
					Assigned_By : view.byId("assignedByChangeId").getSelectedKey(),
					Technician_Note : view.byId("technicianNoteChangeId").getValue(),
			};

			if(oNewTable.Status == "0"){
				sap.m.MessageToast.show("Error! Ticket's status can not be changed to New")
			}
			else if(oNewTable.Status == this.oldStatus){
				sap.m.MessageToast.show("Error! Old and New status of ticket must be different")
			}
			else if(oNewTable.Status == "1" || oNewTable.Status == "3"){

				oModel.update("/TicketSet("+oNewTable.Id+")", oNewTable, {
					method: "PUT",
					success: function(oData, oResponse) {
						sap.m.MessageToast.show("Status successfully updated!")
					},
					error: function(oError) {
						sap.m.MessageToast.show("Error during updating status!")
					}
				});	
				
				this.getView().byId("labelExpctedCompltDtChangeId").setVisible(true);
				this.getView().byId("expctedCompltDtChangeId").setVisible(true);
				this.getView().byId("labelTechnicianNoteChangeId").setVisible(true);
				this.getView().byId("technicianNoteChangeId").setVisible(true);
				
				var oGrid = view.byId("gridIdTicketManagChange");
				oGrid.setVisible(false);

				var createBtn = this.getView().byId("idCreateTicketManag");
				var readBtn = this.getView().byId("idReadTicket");
				var updateBtn = this.getView().byId("idUpdateTicketManag");
				var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
				var changeBtn = this.getView().byId("idChangeTicketManag");
				var deleteBtn = this.getView().byId("idDeleteTicketManag");

				createBtn.setEnabled(true);			
				readBtn.setEnabled(true);
				updateBtn.setEnabled(true);
				changeMTBtn.setEnabled(true);
				changeBtn.setEnabled(true);
				deleteBtn.setEnabled(true);
				
				oServiceTicket.setBusy(false);
				oServiceTicket.focus();
				view.setModel(oModel);
				view.getModel();

			}
			else{
				sap.m.MessageToast.show("Unforeseen Error")
			}

		},


		onCloseManagerChange : function(){

			this.getView().byId("labelExpctedCompltDtChangeId").setVisible(true);
			this.getView().byId("expctedCompltDtChangeId").setVisible(true);
			this.getView().byId("labelTechnicianNoteChangeId").setVisible(true);
			this.getView().byId("technicianNoteChangeId").setVisible(true);
			
			var oGridTicketChange = this.getView().byId("gridIdTicketManagChange");
			oGridTicketChange.setVisible(false);

			var createBtn = this.getView().byId("idCreateTicketManag");
			var readBtn = this.getView().byId("idReadTicket");
			var updateBtn = this.getView().byId("idUpdateTicketManag");
			var changeMTBtn = this.getView().byId("idChangeMTTicketManag");
			var changeBtn = this.getView().byId("idChangeTicketManag");
			var deleteBtn = this.getView().byId("idDeleteTicketManag");

			createBtn.setEnabled(true);			
			readBtn.setEnabled(true);
			updateBtn.setEnabled(true);
			changeMTBtn.setEnabled(true);
			changeBtn.setEnabled(true);
			deleteBtn.setEnabled(true);

			
			var oTickets = this.getView().byId("service_tickets_manager_id");
			oTickets.setBusy(false);
			oTickets.focus();

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
		
		filterGlobally : function(oEvent) {
			var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var view = this.getView().setModel(oModel);
			var sQuery = oEvent.getParameter("query");
			var _oGlobalFilter = null;
			if(sQuery){
			
				var int = parseInt(sQuery);
				if (isNaN(int) == false) {
				
				_oGlobalFilter = new sap.ui.model.Filter([
					new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.EQ, sQuery),
					new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, sQuery),
					new sap.ui.model.Filter("Priority", sap.ui.model.FilterOperator.EQ, sQuery),
					new sap.ui.model.Filter("Machine_Id", sap.ui.model.FilterOperator.EQ, sQuery)
				], false);
				
			}
			else {
				
				_oGlobalFilter = new sap.ui.model.Filter([
					new sap.ui.model.Filter("Person_Name", sap.ui.model.FilterOperator.EQ, sQuery),
					new sap.ui.model.Filter("Assigned_By", sap.ui.model.FilterOperator.EQ, sQuery),
					new sap.ui.model.Filter("Assigned_To", sap.ui.model.FilterOperator.EQ, sQuery)			
				], false);
				
			}

			this.byId("service_tickets_manager_id").getBinding("items").filter(_oGlobalFilter, "Application");
			}},
			
			clearButtons : function(complete,done,progress,open,asc,desc) {
				var oComplete = this.getView().byId("complete");
				var oDone = this.getView().byId("done");
				var oProgress = this.getView().byId("progress");
				var oNew = this.getView().byId("new");
				var oSortAsc = this.getView().byId("sortasc");
				var oSortDesc = this.getView().byId("sortdesc");
				oComplete.setPressed(complete);
				oDone.setPressed(done);
				oProgress.setPressed(progress);
				oNew.setPressed(open);
				oSortAsc.setPressed(asc);
				oSortDesc.setPressed(desc);
			},
			
		toggleStatusCompleteFilter: function(oEvent) {
			this.clearButtons(true,false,false,false,false,false);
			
			var _oGlobalFilter = null;
						_oGlobalFilter = new sap.ui.model.Filter([
							new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, 3),
							
						], false);
						this.byId("service_tickets_manager_id").getBinding("items").filter(_oGlobalFilter, "Application");},
			
		toggleStatusDoneFilter: function(oEvent) {
			this.clearButtons(false,true,false,false,false,false);

			var _oGlobalFilter = null;
				_oGlobalFilter = new sap.ui.model.Filter([
					new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, 2),
					
				], false);
				this.byId("service_tickets_manager_id").getBinding("items").filter(_oGlobalFilter, "Application");},

		toggleInProgressFilter : function(oEvent) {
			this.clearButtons(false,false,true,false,false,false);

			var _oGlobalFilter = null;
			_oGlobalFilter = new sap.ui.model.Filter([
			new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, 1),
			
		], false);
			this.byId("service_tickets_manager_id").getBinding("items").filter(_oGlobalFilter, "Application");},

		toggleNewFilter: function(oEvent) {
			this.clearButtons(false,false,false,true,false,false);

			var _oGlobalFilter = null;
			_oGlobalFilter = new sap.ui.model.Filter([
			new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, 0),
			
		], false);
			this.byId("service_tickets_manager_id").getBinding("items").filter(_oGlobalFilter, "Application");},
			
			clearAllFilters : function(oEvent) {
				this.clearButtons(false,false,false,false,false,false);
				
				var serviceURL = "/sap/opu/odata/sap/ZSS18_T2_TICKET_SRV/";
				var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
				var view = this.getView().setModel(oModel);
			},
			
			toggleSortPriorityASC : function(oEvent) {
				this.clearButtons(false,false,false,false,true,false);
				
				var oSorter = new sap.ui.model.Sorter("Priority", false);
				this.byId("service_tickets_manager_id").getBinding("items").sort(oSorter);
			},
			
			toggleSortPriorityDESC : function(oEvent) {
				this.clearButtons(false,false,false,false,false,true);
				
				var oSorter = new sap.ui.model.Sorter("Priority", true);
				this.byId("service_tickets_manager_id").getBinding("items").sort(oSorter);
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