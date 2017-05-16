window.onload = function(){

	var judge = false;
	var play = document.getElementsByClassName('video')[0];
	var video = document.getElementsByTagName('video')[0];
	var movie = document.getElementsByClassName('team')[0];
	play.onclick=function(){
		if(judge==false){
			console.log("开始播放");
			video.play();
			judge=!judge;
		}
		else {
			video.pause();
			judge=!judge;
		}
	}

	//渐进
	$(".team").show(1000);
	$(".information").show(1000);
}