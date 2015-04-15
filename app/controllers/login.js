var managment_View = require('managment_View');
var managment_Data = require('managment_Data');

var utils = require('utils');
var validate = require('hdjs.validate');
var validator = new validate.FormValidator();
var checking_enable = 'false';
var tokenFile;

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){
	
	
	//Comprobar si ya existe un Token de Login
	tokenFile = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tokenFile.txt');
	
	if (tokenFile.exists() === true)
	{
		var token = tokenFile.read();
		
		if (token.length > 1 && Alloy.Globals.CloseSession == 'false') //Existe un token guardado, entro directamente
		{
			Ti.App.addEventListener('loadDataLoginToken', loginWithToken);
			managment_Data.LoadWebService_LoginToken(token.text);
		}
		else
		{
			console.log('Token con longitud 0, voy a logarme');
			Alloy.Globals.CloseSession = 'false';
			//IR AL LOGIN NORMAL
		}
	}
	else
	{
		console.log('No existe el fichero de token y se crea');
	}


	Ti.App.fireEvent('closeLoading');
	
	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewLogin;
	Alloy.Globals.ActualSection = 'login';
		
}

function loginWithToken(){
	
	Ti.App.removeEventListener('loadDataLoginToken', loginWithToken);
	
	if (datamodel_LoginToken.result === 'ok')
	{
		console.log('LOGIN TOKEN OK');
		Ti.App.fireEvent('IsProviderUser');
		managment_View.OpenSectionParam('home',[]);
	}
	else
	{
		console.log('LOGIN TOKEN KO');
		managment_View.OpenInfoWindow( L('text_13'));
		Ti.App.fireEvent('closeLoading');
	}
}



function validateForm() {
	validator.run([
				{
					id: 'loginName',
				    value: $.loginName.value,
				    display: L('text_1'),    
				    rules: 'required'
				},
				
				{
					id: 'loginPass',
				    value: $.loginPass.value,
				    display: L('text_2'),    
				    rules: 'required'
				}
				
				
			], validationCallback);	
};

var validationCallback = function(errors) {
	if(errors.length > 0) {
		for (var i = 0; i < errors.length; i++) {
			Ti.API.debug(errors[i].message);
		}
		//Muestra la pantalla de Info con los errores
		Ti.App.fireEvent('closeLoading');
		managment_View.OpenInfoWindow(errors[0].message);

		
	} 
	else 
	{
		Ti.App.fireEvent('openLoading');
		Ti.App.addEventListener('loadDataLogin', validateUser);
		managment_Data.LoadWebService_Login($.loginName.value, $.loginPass.value);
	}
};


function validateUser(){
	
	Ti.App.removeEventListener('loadDataLogin', validateUser);
	
	if (datamodel_Login.result === 'ok')
	{
		tokenFile.write(datamodel_Login.token);
		
		// type = 2 -> proveedor    type = 3 -> administrador
		Ti.App.fireEvent('IsProviderUser');
		managment_View.OpenSectionParam('home',[]);
	}
	else
	{
		managment_View.OpenInfoWindow( L('text_13'));
		Ti.App.fireEvent('closeLoading');
	}
	
	
}




/* ***********************************************************
 * Event handlers
 * ***********************************************************/

function handler_login(e)
{
	validateForm();
	//managment_View.OpenSectionParam('home',[]);
}

function handler_Checkin(){
	
	if (checking_enable === 'false')
	{
		
		checking_enable = 'true';
		$.buttonChecking.backgroundImage = '/images/checkin_on.png';
		$.loginPass.passwordMask = 'false';
	}
	else
	{
		checking_enable = 'false';
		$.buttonChecking.backgroundImage = '/images/checkin_off.png';
		$.loginPass.passwordMask = 'true';
	}
}



