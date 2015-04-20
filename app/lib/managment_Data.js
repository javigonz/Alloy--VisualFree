//Manejador de la carga de datos dinámicos (WebServices)

var managment_View = require('managment_View');


//SERVIDOR DE DESARROLLO
//var url_WebService_Login = "http://solbyte.com.es/clientes/visualfree/webService.php";

//SERVIDOR DE PRODUCCIÓN
var url_WebService_Login = "http://intranet.visualfree.es/webService.php";




//************************************************************************************************************************
//Carga WEBSERVICE de Login en la app
//************************************************************************************************************************
exports.LoadWebService_Login = function(dataUser, dataPassword){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
			         datamodel_Login = JSON.parse (this.responseText);
			         Ti.App.fireEvent('loadDataLogin');
	     		}
	     		catch (e){
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_13'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_13'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;

 	client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	//client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
 	

	var dataSend = {
			 			'method': 'login',
			    		'params': {
			    					'user': dataUser,
			    					'pass': dataPassword
			    				  }
			  	   };
			  	
			  	  			  
 	
 	client.open("POST", url_WebService_Login);
	client.send( {data:JSON.stringify(dataSend)});
	
};




//************************************************************************************************************************
//Carga WEBSERVICE de Login con Token en la app
//************************************************************************************************************************
exports.LoadWebService_LoginToken = function(myToken){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
			         datamodel_LoginToken = JSON.parse (this.responseText);
			         datamodel_Login = JSON.parse (this.responseText);
			         Ti.App.fireEvent('loadDataLoginToken');
	     		}
	     		catch (e){
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_13'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_13'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;

 	client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	
	var dataSend = {
			 			'method': 'checkToken',
			    		'params': {
			    					'token': myToken
			    				  }
			  	   };
			  	
			  	  			  
 	
 	client.open("POST", url_WebService_Login);
	client.send( {data:JSON.stringify(dataSend)});
	
};

//************************************************************************************************************************
//Carga WEBSERVICE de Cerrar Sesion
//************************************************************************************************************************
exports.LoadWebService_CloseSession = function(){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
			         datamodel_CloseSession = JSON.parse (this.responseText);
			         Ti.App.fireEvent('loadDataCloseSession');
	     		}
	     		catch (e){
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_13'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_13'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;

 	client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	

	var dataSend = {
			 			'method': 'close'
			  	   };
			  	
			  	  			  
 	
 	client.open("POST", url_WebService_Login);
	client.send( {data:JSON.stringify(dataSend)});
	
};




//************************************************************************************************************************
//Carga WEBSERVICE de BonosConsumidos
//************************************************************************************************************************
exports.LoadWebService_BonosConsumidos = function(){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		//try{
			         datamodel_BonosConsumed = JSON.parse (this.responseText);
					 Ti.App.fireEvent('loadBonosConsumed');
	     		/*}
	     		catch (e){
	     			 console.log('error en el try catch: '+  e.error);
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_13'));
	     		}*/
	        

	     },
	     onerror : function(e) {
	     	 console.log('error en el onerror: ' + e.error);
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_13'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;

 	client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	

	var dataSend = {
			 			'method': 'listBonosConsumidos'
			  	   };
			  	
			  	  			  
 	
 	client.open("POST", url_WebService_Login);
	client.send( {data:JSON.stringify(dataSend)});
	
};



//************************************************************************************************************************
//Carga WEBSERVICE de Bonos Comprados
//************************************************************************************************************************
exports.LoadWebService_BonosBuyed = function(){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
			    datamodel_BonosBuyed = JSON.parse (this.responseText);
				Ti.App.fireEvent('loadBonosBuyed');

	     },
	     onerror : function(e) {
	     	 console.log('error en el onerror: ' + e.error);
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_13'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;

 	client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	

	var dataSend = {
			 			'method': 'listBonosComprados'
			  	   };
			  	
			  	  			  
 	
 	client.open("POST", url_WebService_Login);
	client.send( {data:JSON.stringify(dataSend)});
	
};


//************************************************************************************************************************
//Carga WEBSERVICE de Bonos Comprados
//************************************************************************************************************************
exports.LoadWebService_QR = function(codigo){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
			    datamodel_QR = JSON.parse (this.responseText);
				Ti.App.fireEvent('loadQR');

	     },
	     onerror : function(e) {
	     	 console.log('error en el onerror: ' + e.error);
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_13'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;

 	client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	

	var dataSend = {
			 			'method': 'validar',
			    		'params': {
			    					'codigo': codigo
			    				  }
			  	   };
			  	
			  	  			  
 	
 	client.open("POST", url_WebService_Login);
	client.send( {data:JSON.stringify(dataSend)});
	
};



//************************************************************************************************************************
//Carga WEBSERVICE de Bonos Comprados Validar
//************************************************************************************************************************
exports.LoadWebService_QRConsumir = function(codigo){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
			    datamodel_QRValidar = JSON.parse (this.responseText);
				Ti.App.fireEvent('loadQRValidar');

	     },
	     onerror : function(e) {
	     	 console.log('error en el onerror: ' + e.error);
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_13'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;

 	client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	

	var dataSend = {
			 			'method': 'consumir',
			    		'params': {
			    					'id': codigo
			    				  }
			  	   };
			  	
			  	  			  
 	
 	client.open("POST", url_WebService_Login);
	client.send( {data:JSON.stringify(dataSend)});
	
};

