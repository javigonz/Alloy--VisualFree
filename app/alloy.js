
Alloy.Globals.viewContainerPrincipal = [];
Alloy.Globals.WinInitContainer;
Alloy.Globals.ViewActive = [];
Alloy.Globals.ActualContainer;
Alloy.Globals.ActualSection;
Alloy.Globals.IsLoading;
Alloy.Globals.Header;
Alloy.Globals.Menu;
Alloy.Globals.CloseSession = 'false';


//Paleta de Colores
Alloy.CFG.GREY 	 		= "#878787";
Alloy.CFG.GREY_LIGHT	= "#d9d9d9";
Alloy.CFG.WHITE	 		= "#FFFFFF";
Alloy.CFG.BLACK	 		= "#000000";
Alloy.CFG.BLUE	 		= "#0284b2";
Alloy.CFG.BLUE2	 		= "#005f80";
Alloy.CFG.RED      		= "#e42626";
Alloy.CFG.GREEN      	= "#3abd0c";


//Altura y Anchura del Dispositivo
Alloy.CFG.WidthDeviceIphone   = Ti.Platform.displayCaps.platformWidth;
Alloy.CFG.WidthDeviceAndroid   = Ti.Platform.displayCaps.platformWidth / (Titanium.Platform.displayCaps.dpi / 160);
Alloy.CFG.HeightDevice   = Ti.Platform.displayCaps.platformHeight / (Titanium.Platform.displayCaps.dpi / 160);


//Fuentes
if(Ti.Platform.osname =='android') {
	Alloy.CFG.ARIAL_NORMAL = 'Arial';
	Alloy.CFG.FONT_HELVETICA_NEUE_LT_LIGHT = 'HelveticaNeueLTStd-Lt';
	Alloy.CFG.FONT_HELVETICA_NEUE_LT_MED = 'HelveticaNeueLTStd-Md';
}
else{
	Alloy.CFG.ARIAL_NORMAL = 'ArialMT';
	Alloy.CFG.FONT_HELVETICA_NEUE_LT_LIGHT = 'HelveticaNeueLTStd-Lt';
	Alloy.CFG.FONT_HELVETICA_NEUE_LT_MED = 'HelveticaNeueLTStd-Md';
}



/////////////////////////////////////////////////////////////Modelo de Datos

var datamodel_Login = [];
var datamodel_LoginToken = [];
var datamodel_CloseSession = [];
var datamodel_BonosConsumed = [];
var datamodel_BonosBuyed = [];
var datamodel_QR = [];
var datamodel_QRValidar = [];


