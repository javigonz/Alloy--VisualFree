var managment_View = require('managment_View');
var managment_Data = require('managment_Data');
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
	Alloy.Globals.ActualContainer = $.viewSectionBonosConsumed;
	
	//Cambiar título de la cabecera
	var evtData = {
        title: L('text_11')
    };
	Ti.App.fireEvent('changeHeaderTitle', evtData);
	Alloy.Globals.ActualSection = 'sectionBonosConsumed';
	Ti.App.fireEvent('changeSection');
	
	//Carga WebServie
	Ti.App.addEventListener('loadBonosConsumed', loadBonosConsumed);
	managment_Data.LoadWebService_BonosConsumidos();
	
	$.tableView_Bono.height = Alloy.CFG.HeightDeviceIphone - 120;
}



function loadBonosConsumed()
{
	Ti.App.removeEventListener('loadBonosConsumed', loadBonosConsumed);
	
	if (datamodel_BonosConsumed.result === 'ok')
	{
		var rows = [];
		
		//Estilos
		var rowList = $.createStyle({classes: ['rowList']});
		var title = $.createStyle({classes: ['title']});
		var subtitle = $.createStyle({classes: ['subtitle']});
		var styleContainerDate = $.createStyle({classes: ['styleContainerDate']});
		var textDate = $.createStyle({classes: ['textDate']});
		var sytleLine = $.createStyle({classes: ['sytleLine']});
		

		datamodel_BonosConsumed.bonos.forEach(function (element, index, array) {
			
			var containerTableRow = Ti.UI.createTableViewRow({});
			containerTableRow.applyProperties(rowList);
			
			var containerLabelTitle = Ti.UI.createLabel({
				text: element.cliente
			});
			containerLabelTitle.applyProperties(title);
			
			var containerSubLabelTitle = Ti.UI.createLabel({
				text: element.bono + ' ('  + element.codigo + ')'
			});
			containerSubLabelTitle.applyProperties(subtitle);
			
			
			var textDateCompra = Ti.UI.createLabel({
				text: L('text_18') + ' ' + element.fecha_compra
			});
			textDateCompra.applyProperties(textDate);
			
			var textDateConsumo = Ti.UI.createLabel({
				text: L('text_17') + ' ' + element.fecha_consumo
			});
			textDateConsumo.applyProperties(textDate);
			
			var textValidador = Ti.UI.createLabel({
				text: L('text_19') + ' ' + element.validador
			});
			textValidador.applyProperties(textDate);
			
			var line = Ti.UI.createView({});
			line.applyProperties(sytleLine);
			
			
			
			containerTableRow.add(containerLabelTitle);
			containerTableRow.add(containerSubLabelTitle);
			containerTableRow.add(textDateCompra);
			containerTableRow.add(textDateConsumo);
			containerTableRow.add(textValidador);
			containerTableRow.add(line);
			rows.push(containerTableRow);
			
		});
		
		$.tableView_Bono.setData(rows);
	}
	else
	{
		managment_View.OpenInfoWindow( L('text_13'));
	}
	
	Ti.App.fireEvent('closeLoading');
	
}





/* ***********************************************************
 * Event handlers
 * ***********************************************************/




