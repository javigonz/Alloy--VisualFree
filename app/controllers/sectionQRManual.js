var managment_View = require('managment_View');
var managment_Data = require('managment_Data');
var utils = require('utils');

var codigoBono = '';
var codigoId = '';

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){
	
	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewSectionQRManual;
	
	//Cambiar título de la cabecera
	var evtData = {
        title: L('text_10')
    };
	Ti.App.fireEvent('changeHeaderTitle', evtData);
	Alloy.Globals.ActualSection = 'sectionQRManual';
	Ti.App.fireEvent('changeSection');
	
	
	Ti.App.fireEvent('closeLoading');
}


function loadQR()
{
	Ti.App.removeEventListener('loadQR', loadQR);
	
	if (datamodel_QR.result === 'ok')
	{
		$.codeQR.value = '';
		$.codeQR.visible = 'false';
		$.styleButton.visible = 'false';
		$.textDescription.visible = 'true';
		$.buttonConsume.visible = 'true';
		$.textDescription.text = L('text_22') + ' ' + codigoBono;
		
		codigoId = datamodel_QR.id;
	}
	else
	{
		managment_View.OpenInfoWindow( datamodel_QR.msg);
	}
	
	Ti.App.fireEvent('closeLoading');

}


function loadQRValidar()
{
	Ti.App.removeEventListener('loadQRValidar', loadQRValidar);
	
	if (datamodel_QRValidar.result === 'ok')
	{
		$.codeQR.value = '';
		$.codeQR.visible = 'true';
		$.styleButton.visible = 'true';
		$.textDescription.visible = 'false';
		$.buttonConsume.visible = 'false';
		$.textDescription.text = '';
		
		managment_View.OpenInfoWindow( L('text_23'));
	}
	else
	{
		managment_View.OpenInfoWindow( datamodel_QR.msg);
	}
	
	Ti.App.fireEvent('closeLoading');

}	
		




/* ***********************************************************
 * Event handlers
 * ***********************************************************/

function handler_ScannerManual(e)
{
	Ti.App.fireEvent('openLoading');
	
	//Carga WebServie
	Ti.App.addEventListener('loadQR', loadQR);
	codigoBono = $.codeQR.value;
	managment_Data.LoadWebService_QR($.codeQR.value);

}

function handler_Consume(e)
{
	Ti.App.fireEvent('openLoading');
	
	//Carga WebServie
	Ti.App.addEventListener('loadQRValidar', loadQRValidar);
	managment_Data.LoadWebService_QRConsumir(codigoId);

}



