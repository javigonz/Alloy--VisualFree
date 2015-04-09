// Lector decoder y codificador de código QR
// https://github.com/acktie/Acktie-Mobile-QR-Encoder-Example/blob/master/Resources/app.js
// https://github.com/acktie/Acktie-Mobile-QR-Example/blob/master/Resources/app.js
// https://github.com/acktie/Acktie-Mobile-iOS-QR-Reader

var managment_View = require('managment_View');
var managment_Data = require('managment_Data');

var qrreader = undefined;
var qrCodeWindow = undefined;
var qrCodeView = undefined;
var qrEncoder = undefined;
var codigoBono = '';
var codigoId = '';
var view1;
var labelDescription;
var buttom2;


var self = Ti.UI.createWindow({
	orientationModes : [Ti.UI.PORTRAIT],
	backgroundColor : 'white',
	title : "Lector de código QR",
});


// Depending on the platform, load the appropriate qr module
if (Ti.Platform.osname === 'iphone') {
	qrreader = require('com.acktie.mobile.ios.qr');
	qrEncoder = require('com.acktie.mobile.ios.qr.encoder');
} else if (Ti.Platform.osname === 'android') {
	qrreader = require('com.acktie.mobile.android.qr');
}


exports.createContentQR_READER = function(containerView)
{
	///////////////////////////////////////////////////////////////////////ESCANEAR DESDE LA BIBLIOTECA DE IMÁGENES
	if (Ti.Platform.osname == "iphone")
	{
		var view2 = Titanium.UI.createView({
			borderRadius: '5',
			borderWidth: '0',
			height : '60',
			width : '275',
			backgroundColor: Alloy.CFG.BLUE,
			top : '120',
		});
		
		var icon2 = Titanium.UI.createImageView({
			image: '/images/images.png',
			left: '10',
			width : '40',
			height : '40',
		});
	
		var label2 = Titanium.UI.createLabel({
			text : L('text_5'),
			height : '60',
			width : '200',
			top : '0',
			color: Alloy.CFG.WHITE,
			font: {
				fontFamily: Alloy.CFG.FONT_HELVETICA_NEUE_LT_MED, 
				fontSize: 	14,
				fontWeight: 'normal'
			},
			right: '10',
			textAlign: 'center'
		});
		
		view2.addEventListener('click', function() {
				qrreader.scanQRFromAlbum({
					success : success,
					cancel : cancel,
					error : error,
				});
			
		});
		
		
		view2.add(icon2);
		view2.add(label2);
		containerView.add(view2);
	}
	
	
	
	/////////////////////////////////////////////////////////////////////ESCANEAR DESDE LA CÁMARA
	view1 = Titanium.UI.createView({
		borderRadius: '5',
		borderWidth: '0',
		height : '60',
		width : '275',
		backgroundColor: Alloy.CFG.BLUE,
		top : '40',
	});
	

	labelDescription = Titanium.UI.createLabel({
		visible: 'false',
		width : '90%',
		top : '50',
		color: Alloy.CFG.BLACK,
		font: {
			fontFamily: Alloy.CFG.FONT_HELVETICA_NEUE_LT_LIGHT, 
			fontSize: 	15,
			fontWeight: 'normal'
		},
	});
	
	
	buttom2 = Titanium.UI.createButton({
		title: L('text_21'),
		visible: 'false',
		height: '50',
	    width: '90%',
	    backgroundColor: Alloy.CFG.GREEN,
	    color: Alloy.CFG.WHITE,
		font: {
			fontFamily: Alloy.CFG.FONT_HELVETICA_NEUE_LT_LIGHT, 
			fontSize: 	14,
			fontWeight: 'normal'
		},
		top: '100'
	});
	
	var icon1 = Titanium.UI.createImageView({
		image: '/images/camera.png',
		left: '10',
		width : '40',
		height : '40'
	});
	

	
	var label1 = Titanium.UI.createLabel({
		text: L('text_6'),
		height : '60',
		width : '200',
		top : '0',
		color: Alloy.CFG.WHITE,
		font: {
			fontFamily: Alloy.CFG.FONT_HELVETICA_NEUE_LT_MED, 
			fontSize: 	14,
			fontWeight: 'normal'
		},
		right: 10,
		textAlign: 'center'
		
	});
	
	view1.addEventListener('click', function() {
		Ti.App.fireEvent('openLoading');
		
		var miniTimer = setTimeout(function () {
					clearInterval( miniTimer );
					var options = {
					backgroundColor : 'black',
					width : '100%',
					height : '90%',
					top : 0,
					left : 0,
					useFrontCamera : false,
					success : success,
					cancel : cancel
				};
			
				scanQRFromCamera(options);
			        
		}, 300);
		
	});
	
	view1.add(icon1);
	view1.add(label1);
	containerView.add(view1);
	containerView.add(labelDescription);
	containerView.add(buttom2);
	
	/**
	 * Read QR code from Camera feed continuously until user press the done button.
	 */
	/*var qrFromCameraContButton = Titanium.UI.createButton({
		title : L('text_7'),
		height : '60',
		width : '200',
		top : '120',
		backgroundColor: Alloy.CFG.BLUE,
		color: Alloy.CFG.WHITE,
		font: {
			fontFamily: Alloy.CFG.FONT_HELVETICA_NEUE_LT_MED, 
			fontSize: 	14,
			fontWeight: 'normal'
		},
	});
	
	qrFromCameraContButton.addEventListener('click', function() {
		var options = {
			backgroundColor : 'black',
			width : '100%',
			height : '90%',
			top : 0,
			left : 0,
			success : success,
			cancel : cancel,
		};
	
		scanQRFromCamera(options);
	});
	
	containerView.add(qrFromCameraContButton);*/
};




exports.createContentQR_ENCODER = function(viewContainer)
{
	
	// Init QR Encoder (Optional see docs for defaults)
	qrEncoder.init({size: 1000, margin: 1, correction:'Q'});
	
	// Get PNG Blob representing QR Code
	var qrImage = qrEncoder.stringToQR({text: 'http://www.termicadesign.com'});
	
	
	// Once you have the blob you can display it, write it to disk, sent it to a server, etc.
	var image = Ti.UI.createImageView({
		width: 300,
		height: 300,
		image:qrImage,
	});
	
	containerView.add(image);
	
};


function loadQR()
{
	Ti.App.removeEventListener('loadQR', loadQR);
	
	if (datamodel_QR.result === 'ok')
	{
		view1.visible = 'false';
		labelDescription.visible = 'true';
		buttom2.visible = 'true';
		labelDescription.text = L('text_22') + ' ' + codigoBono;
		
		codigoId = datamodel_QR.id;
		
		buttom2.addEventListener('click', handler_Consume);
	}
	else
	{
		managment_View.OpenInfoWindow( datamodel_QR.msg);
	}
	
	Ti.App.fireEvent('closeLoading');

}

function handler_Consume(e)
{
	Ti.App.fireEvent('openLoading');
	
	//Carga WebServie
	Ti.App.addEventListener('loadQRValidar', loadQRValidar);
	managment_Data.LoadWebService_QRConsumir(codigoId);

}

function loadQRValidar()
{
	Ti.App.removeEventListener('loadQRValidar', loadQRValidar);
	
	if (datamodel_QRValidar.result === 'ok')
	{
		view1.visible = 'true';
		labelDescription.visible = 'false';
		buttom2.visible = 'false';
		
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

function success(data) {
	if (data != undefined && data.data != undefined) {
		Titanium.Media.vibrate();
		
		codigoBono = data.data;
		console.log('QR escaneado: ' + codigoBono);
		
		qrCodeView.stop();
		qrCodeWindow.close();
		
		//Carga WebServie
		Ti.App.fireEvent('openLoading');
		Ti.App.addEventListener('loadQR', loadQR);
		managment_Data.LoadWebService_QR(codigoBono);
				
	}
	
};

function cancel() {
	Ti.App.fireEvent('closeLoading');
	Ti.API.info("Cancelled");
};

// Only used with scanning from photo gallery
function error() {
	Ti.App.fireEvent('closeLoading');
	Ti.API.info("error");
};

function scanQRFromCamera(options) {
	qrCodeWindow = Titanium.UI.createWindow({
		navBarHidden: true,
		exitOnClose : false,
		backgroundColor : 'black',
		width : '100%',
		height : '100%',
	});
	qrCodeView = qrreader.createQRCodeView(options);

	var closeButton = Titanium.UI.createButton({
		title : L('text_8'),
		bottom : 0,
		left : 0
	});
	var lightToggle = Ti.UI.createSwitch({
		value : false,
		bottom : 0,
		right : 0
	});

	closeButton.addEventListener('click', function() {
		Ti.App.fireEvent('closeLoading');
		qrCodeView.stop();
		qrCodeWindow.close();
	});

	lightToggle.addEventListener('change', function(event) {
		if (event.value) {
			qrCodeView.turnLightOn();
		} else {
			qrCodeView.turnLightOff();
		}
	});

	qrCodeWindow.add(qrCodeView);
	qrCodeWindow.add(closeButton);

	if (Ti.Platform.osname !== 'ipad' && (options.useFrontCamera === undefined || (options.useFrontCamera != undefined && !options.useFrontCamera))) {
		qrCodeWindow.add(lightToggle);
	}

	// NOTE: Do not make the window Modal for android.  It screws stuff up.  Not sure why
	if (Ti.Platform.osname !== 'android') {
		qrCodeWindow.open({modal:true});
	}
	else
	{
		qrCodeWindow.open();
	}
	
	/*if (Ti.Platform.osname === 'android') {
		var activity = Ti.Android.currentActivity;
		activity.addEventListener('pause', function(e) {
			Ti.API.info('Inside pause');
			if (qrCodeView != undefined) {
				qrCodeView.stop();
			}
	
			if (qrCodeWindow != undefined) {
				qrCodeWindow.close();
			}
		});
	}
	
	if (Ti.Platform.osname === 'android') {
		self.open();
	} else {
		var navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : self
		});
	
		var main = Ti.UI.createWindow();
		main.add(navGroup);
		main.open();
	}*/
}