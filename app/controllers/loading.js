
//Listener para abrir los tabs
Ti.App.addEventListener('openLoading', function(e) {
	openLoading();
});

Ti.App.addEventListener('closeLoading', function(e) {
	closeLoading();
});


$.activityIndicator.show();



var FadeIn_Opacity = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 1,
    duration: 300
});

var FadeOut_Opacity = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 0,
    duration: 300
});

var FadeInMid_Opacity = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 0.7,
    duration: 300
});



/* ***********************************************************
 * Public functions
 * ***********************************************************/
function openLoading(){
	
	Ti.App.removeEventListener('openLoading', function(e) {
		openLoading();
	});

	if (Ti.Platform.osname == "iphone")
	{
		
	}
	else
	{
		$.winloading.width = Ti.UI.FILL;
		$.winloading.height = Ti.UI.FILL;
	}
	
	$.winloading.animate(FadeInMid_Opacity);
	
	Alloy.Globals.IsLoading = 'true';
	
}

function closeLoading(){
	
	Ti.App.removeEventListener('closeLoading', function(e) {
		closeLoading();
	});

	if (Ti.Platform.osname == "iphone")
	{
		
	}
	else
	{
		$.winloading.width = 0;
		$.winloading.height = 0;
	}
	
	$.winloading.animate(FadeOut_Opacity);
	
	Alloy.Globals.IsLoading = 'false';
}



/* ***********************************************************
 * Private functions
 * ***********************************************************/


/* ***********************************************************
 * Event handlers
 * ***********************************************************/



