jQuery.sap.declare("ZSS18_T2_APP.Component");
sap.ui.core.UIComponent.extend("ZSS18_T2_APP.Component", {
	
	metadata : {
        stereotype 	: "component", 
        "abstract"	: true,  
        version 	: "1.0",   
        includes	: ["libs/moment.js"],
        dependencies: { 			 //external dependencies
            libs 	: ["sap.m", 
                 	   "sap.ui.commons", 
                 	   "sap.ui.ux3",
                 	   "sap.ui.table", 
                 	   "sap.ui.layout"], 	//the libraries that component will be using            
            library	: "sap.ui.core",	//what library belongs your component to              
        },        
	},	
	
	createContent : function() {
		// create root view
		var oView = sap.ui.view({
			id 		: "app",
			viewName 	: "ZSS18_T2_APP.zss18_t2_app.App",
			type 		: "JS",
			viewData 	: { component : this }
		});
					
		// set device model
		var oDeviceModel = new sap.ui.model.json.JSONModel(sap.ui.Device);
		oDeviceModel.setDefaultBindingMode("OneWay");
		this.setModel(oDeviceModel, "device");
		
		
		return oView;
	}
});

