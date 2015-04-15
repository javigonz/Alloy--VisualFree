var managment_View = require('managment_View');
var managment_Data = require('managment_Data');

Alloy.Globals.Menu = $.viewFooter;

Ti.App.addEventListener('changeSection', function(e) {
	changeSection();
});

Ti.App.addEventListener('IsProviderUser', providerConfiguration);



//Estilos
var buttonView = $.createStyle({classes: ['buttonView']});	
var buttonViewOver = $.createStyle({classes: ['buttonViewOver']});	
var buttonImage = $.createStyle({classes: ['buttonImage']});

var view1;
var view2;
var view3;
var view4;
var view5;

show();


/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/
function show(){
	
	if (Ti.Platform.osname == "iphone")
	{
		$.viewFooter.top = Ti.Platform.displayCaps.platformHeight - 50;
		
		var widthButton = Alloy.CFG.WidthDeviceIphone / 5;
	}
	else
	{
		$.viewFooter.top = (Ti.Platform.displayCaps.platformHeight / (Titanium.Platform.displayCaps.dpi / 160)) - 75;
		
		var widthButton = Alloy.CFG.WidthDeviceAndroid / 5;
	}

	
	//Botón de menú para escanear código QR
	view1 = Ti.UI.createView({});
	view1.applyProperties(buttonViewOver);
	view1.width = widthButton;
	view1.addEventListener('click', eventHandlerSection1);
	
	var image1 = Titanium.UI.createImageView({
				image: '/images/qrcode.png'
	});
	image1.applyProperties(buttonImage);
	
	view1.add(image1);		
	$.viewFooter.add(view1);

	//Botón de menú para introducir manualmente el código
	view2 = Ti.UI.createView({});
	view2.applyProperties(buttonView);
	view2.width = widthButton;
	view2.addEventListener('click', eventHandlerSection2);
	
	var image2 = Titanium.UI.createImageView({
				image: '/images/pencil.png'
	});
	image2.applyProperties(buttonImage);
	
	view2.add(image2);		
	$.viewFooter.add(view2);
	
	//Botón de menú para bonos consumidos
	view3 = Ti.UI.createView({});
	view3.applyProperties(buttonView);
	view3.width = widthButton;
	view3.addEventListener('click', eventHandlerSection3);
	var image3 = Titanium.UI.createImageView({
				image: '/images/ticket.png'
	});
	image3.applyProperties(buttonImage);
	
	view3.add(image3);		
	$.viewFooter.add(view3);
	
	//Botón de menú para bonos comprados
	view4 = Ti.UI.createView({});
	view4.applyProperties(buttonView);
	view4.width = widthButton;
	view4.addEventListener('click', eventHandlerSection4);
	
	var image4 = Titanium.UI.createImageView({
				image: '/images/cart.png'
	});
	image4.applyProperties(buttonImage);
	
	view4.add(image4);		
	$.viewFooter.add(view4);
	
	
	//Botón de menú para desconecctar
	view5 = Ti.UI.createView({});
	view5.applyProperties(buttonView);
	view5.width = widthButton;
	view5.addEventListener('click', eventHandlerSection5);
	
	var image5 = Titanium.UI.createImageView({
				image: '/images/exit.png'
	});
	image5.applyProperties(buttonImage);
	
	view5.add(image5);		
	$.viewFooter.add(view5);

}


function changeSection(e)
{
	view1.applyProperties(buttonView);
	view2.applyProperties(buttonView);
	view3.applyProperties(buttonView);
	view4.applyProperties(buttonView);
	view5.applyProperties(buttonView);
	
	switch (Alloy.Globals.ActualSection) 
	{
		case 'home': 							view1.applyProperties(buttonViewOver);
												break;
		case 'sectionQRManual': 	   			view2.applyProperties(buttonViewOver);
												break;
		case 'sectionBonosConsumed':
		case 'sectionBonosConsumed_detail': 	view3.applyProperties(buttonViewOver);
											    break;
		case 'sectionBonosBuyed':
		case 'sectionBonosBuyed_detail':   		view4.applyProperties(buttonViewOver);
												break;										
		default:								view1.applyProperties(buttonViewOver);
												break;																		
	}
	
}


function closeSession(){
	
	Ti.App.removeEventListener('loadDataCloseSession', closeSession);
	
	if (datamodel_CloseSession.result === 'ok')
	{
		managment_View.OpenSectionParam('login',[]);
	}
	else
	{
		Ti.App.fireEvent('closeLoading');
		managment_View.OpenInfoWindow( L('text_13'));
	}
	
	

}

function providerConfiguration()
{
	//Ti.App.removeEventListener('IsProviderUser', providerConfiguration);
	
	if (datamodel_Login.type !== '3')
	{	
		view3.opacity = 0.3;
		view4.opacity = 0.3;
	}
	else
	{
		view3.opacity = 1;
		view4.opacity = 1;
	}
}


/* ***********************************************************
 * Event handlers
 * ***********************************************************/

function eventHandlerSection1(e)
{
	//e.source.removeEventListener('click', eventHandlerSection1);
	Ti.App.fireEvent('changeSection');
	managment_View.OpenSectionParam('home',[]);
}

function eventHandlerSection2(e)
{
	//e.source.removeEventListener('click', eventHandlerSection2);
	managment_View.OpenSectionParam('sectionQRManual',[]);
}

function eventHandlerSection3(e)
{
	if (datamodel_Login.type == '3')
	{
		managment_View.OpenSectionParam('sectionBonosConsumed',[]);
	}
}

function eventHandlerSection4(e)
{
	if (datamodel_Login.type == '3')
	{
		managment_View.OpenSectionParam('sectionBonosBuyed',[]);
	}
}

function eventHandlerSection5(e)
{
	Alloy.Globals.CloseSession = 'true';
	Ti.App.fireEvent('openLoading');
	Ti.App.addEventListener('loadDataCloseSession', closeSession);
	managment_Data.LoadWebService_CloseSession();
}
