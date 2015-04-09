var managment_View = require('managment_View');
var qr = require('qrLibrary');
var utils = require('utils');

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){
	
	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewHome;
	
	qr.createContentQR_READER($.containerHome);
	
	//Cambiar título de la cabecera
	var evtData = {
        title: L('text_9')
    };
	Ti.App.fireEvent('changeHeaderTitle', evtData);
	Alloy.Globals.ActualSection = 'home';
	Ti.App.fireEvent('changeSection');
	
	Ti.App.fireEvent('closeLoading');
}


