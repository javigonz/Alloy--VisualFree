//Manejador de las vistas y ventanas de la app, la manera en qué aparecen se cierran ...

var utils = require('utils');

var FadeOut_Opacity = Titanium.UI.createAnimation({
	    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
	    opacity: 0,
	    duration: 300
});

var FadeIn_Opacity = Titanium.UI.createAnimation({
	    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
	    opacity: 1,
	    duration: 300
});



//************************************************************************************************************************
//Abre una Sección nueva, pasando la ventana a abrir y el objeto de datos que se le envia
//************************************************************************************************************************
exports.OpenSectionParam = function(window,objectAddress)
{
	if (Ti.Platform.osname == "android")
	{
		Ti.UI.Android.hideSoftKeyboard();
	}
	
	var viewData = [{
			section: window,
			objectData: objectAddress,
			container: Alloy.Globals.ActualContainer
	}];
	
	Alloy.Globals.ViewActive.push(viewData);
	Alloy.Globals.ActualSection = window;
	
	if (window == 'login')  //In case login active, header and menu don´t appers
	{
		Alloy.Globals.Header.visible = 'false';
		Alloy.Globals.Menu.visible = 'false';
	}
	else
	{
		Alloy.Globals.Header.visible = 'true';
		Alloy.Globals.Menu.visible = 'true';
	}
		
	
	Ti.App.fireEvent('openLoading');
		
	var miniTimer2 = setTimeout(function () {
					clearInterval( miniTimer2 );
					utils.removeAllChildren(Alloy.Globals.viewContainerPrincipal);
					Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(window, [objectAddress]).getView());
	}, 300);
	


};


//************************************************************************************************************************
//Boton atrás ... cerrar sección actual
//************************************************************************************************************************
exports.closeActualSection = function(){
	
	if (Alloy.Globals.IsLoading == 'false') //Con esto se evita que el usuario de repetidamente al botón de atrás
	{
		if (Ti.Platform.osname == "android")
		{
			Ti.UI.Android.hideSoftKeyboard();
		}
		
		
		console.log('Estoy en la secion: ' +  Alloy.Globals.ActualSection);
		if (Alloy.Globals.ViewActive.length == 2 || Alloy.Globals.ActualSection == 'login' || Alloy.Globals.ActualSection == 'home') 
		{
			//Estoy en la primera página
		}
		else
		{	
			Ti.App.fireEvent('openLoading');
			
			var actualContainer = Alloy.Globals.ActualContainer;
			var i = Alloy.Globals.ViewActive.length-2;
			Alloy.Globals.ActualSection = Alloy.Globals.ViewActive[i][0].section;
			
			if (Alloy.Globals.ActualSection == 'login')  //In case login active, header and menu don´t appers
			{
				Alloy.Globals.Header.visible = 'false';
				Alloy.Globals.Menu.visible = 'false';
			}
			

			var miniTimer = setTimeout(function () {
					clearInterval( miniTimer );
					utils.removeAllChildren(Alloy.Globals.viewContainerPrincipal);
					var section = Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(Alloy.Globals.ViewActive[i][0].section, [Alloy.Globals.ViewActive[i][0].objectData]).getView());
					Alloy.Globals.ViewActive.pop();
					Ti.App.fireEvent('changeSection');
			}, 300);


		}
	
	}
	
	
};





//************************************************************************************************************************
//Abrir una ventana de info
//************************************************************************************************************************
exports.OpenInfoWindow = function(message){
	
	if (Ti.Platform.osname == "iphone")
	{
		var opts = {
		  title: message
		};
		opts.buttonNames = [L('text_8')];
		
		var dialog = Ti.UI.createOptionDialog(opts).show();
	}
	else
	{
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'Info',
		    message: message,
		    buttonNames: [L('text_8')]
		});

		alertDialog.show();
	}
	
};




//************************************************************************************************************************
//Abrir una ventana de info con un listener para el cerrar
//************************************************************************************************************************
exports.OpenInfoWindowWithListener = function(message){
	
	if (Ti.Platform.osname == "iphone")
	{
		var opts = {
		  title: message
		};
		opts.buttonNames = [L('text_4')];
		
		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.show();
		dialog.addEventListener('click', function(e){
			//Ti.API.info('click en cerrar');
			Ti.App.fireEvent('handler_continue');
			});
	}
	else
	{
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'Info',
		    message: message,
		    buttonNames: [L('text_4')]
		});
		
		 alertDialog.addEventListener('click', function(e){
		 	//Ti.API.info('Boton cerrar pulsado: ' + e.index);
		 	Ti.App.fireEvent('handler_continue');
		 });

		alertDialog.show();
	}
	
};


//************************************************************************************************************************
//Abrir una ventana de elección de dos botones para Eliminar
//************************************************************************************************************************
exports.OpenSelectWindow = function(message){
	
	var opts = {
	  title: message,
	  options: [L('text_142'), L('text_14')]
	};
	
	var dialog = Ti.UI.createOptionDialog(opts);
	return dialog;
	
};

//************************************************************************************************************************
//Abrir una ventana de elección de dos botones para salir
//************************************************************************************************************************
exports.OpenSelectWindow2 = function(message){
	
	var opts = {
	  title: message,
	  options: [L('text_142'), L('text_210')]
	};
	
	var dialog = Ti.UI.createOptionDialog(opts);
	return dialog;
	
};

//************************************************************************************************************************
//Muestra el push del carrito con la cantidad de compra
//************************************************************************************************************************
exports.ShowPushCart= function(num){
	
	if (num == 0)
	{
		Alloy.Globals.ActivePush = 'false';
		Alloy.Globals.numPush = num;
	}
	else
	{
		Alloy.Globals.ActivePush = 'true';
		Alloy.Globals.numPush = num;
	}
	
	Ti.App.fireEvent('pushCart_change');
	
};




