var win= null;
function popupDownload (productid) {
	var mypage = "/popup_download.php?productID=" + productid;
	var w = 290;
	var h = 290;
	var myname = "popupDownload";
	var winl = (screen.width-w)/2;
	var wint = (screen.height-h)/2;
	settings='height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars=no,toolbar=no'
	win=window.open(mypage,myname,settings)
	if(parseInt(navigator.appVersion) >= 4) {
		win.window.focus();
	}
}


/**
 * Assign callback function to window.onload without overriding previously assigned callbacks from other scripts 
 * 
 */
function addLoadEvent(func) {
	var oldonload = window.onload;
	
	if (typeof window.onload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}