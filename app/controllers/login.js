var managment_View = require('managment_View');
var managment_Data = require('managment_Data');

var utils = require('utils');
var validate = require('hdjs.validate');
var validator = new validate.FormValidator();
var checking_enable = 'false';

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){

	Ti.App.fireEvent('closeLoading');
	
	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewLogin;
	Alloy.Globals.ActualSection = 'login';
		
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



