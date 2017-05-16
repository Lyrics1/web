window.onload=function(){
	var asideI = document.getElementsByTagName('i');
	console.log(asideI.length);

	var list = document.getElementsByClassName('fa fa-bars')[0];
	var setup = document.getElementsByClassName('set-up')[0];
	var quit = document.getElementsByClassName('fa fa-arrow-left  quit')[0];


	$(list).click(function(event){
		$(setup).animate({width: 'toggle'});//向左滑动	
		event.stopPropagation();//防止事件 冒泡
	});
	$(quit).click(function(){
		$(setup).animate({width: 'toggle'});	
	})

	

	
}