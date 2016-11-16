window.onresize=function(){
	
change();
}
window.onload=function(){
	change();
}
function change(){
	var pass=document.getElementById("passward");
	var enter=document.getElementById('enter');
	enter.style.width=pass.clientWidth-50+"px";
	window.body.background.opaticy=0.5
}