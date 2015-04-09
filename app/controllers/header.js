Alloy.Globals.Header = $.viewHeader;

var managment_View = require('managment_View');



Ti.App.addEventListener('changeHeaderTitle', function(evtData){
	$.viewTitleText.text = evtData.title;
	});




/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/



/* ***********************************************************
 * Event handlers
 * ***********************************************************/

function handlerBack(e){
	
	Ti.API.info('Botón Back');
	managment_View.closeActualSection();
}