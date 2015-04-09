var utils = require('utils');
var managment_View = require('managment_View');


show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){
	
	Alloy.Globals.WinInitContainer = $.winInitContainer;
	
	
	if (Ti.Platform.osname == "iphone")
	{
		$.viewInitContainer.height = Ti.Platform.displayCaps.platformHeight - 70 - 50;
		$.viewInitContainer.top = 70;
		
	}
	else
	{

		//Listener para capturar el botón de Back del propio Dispositivo Android
		Alloy.Globals.WinInitContainer.addEventListener('android:back', function(e){
													Ti.API.info('Botón Back dispositivo Android');	
													managment_View.closeActualSection();
												});
												
		$.viewInitContainer.top = 50;										
		
	}
	
	Alloy.Globals.viewContainerPrincipal = $.viewInitContainer;
	Alloy.Globals.mainContainer = $.mainContainer;
	
	$.winInitContainer.open();
		
	managment_View.OpenSectionParam('login',[], $.viewInitContainer);
	
	
}