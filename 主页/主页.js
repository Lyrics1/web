window.onload=function(){

	// var Img =document.getElementsByTagName("img");

	var timer = play = null;
	//设置定时器
	var index = k=0;
	var judge = true;
	var ppt=document.getElementsByTagName("img");
	var PPT= document.getElementById("power");
	var Next1=document.getElementById("next1");
	var Next2=document.getElementById("Next2");
	var Img =PPT.getElementsByTagName("img");

	PPT.onmouseover = function(){
		
		clearInterval(play);

	};

	PPT.onmouseout=function(){

		autoPlay();
	};

	function autoPlay(){
		play=setInterval(function(){
			
			judge ? index++ : index--;

			index>=Img.length && (index = Img.length -2,judge =false)

			index<=0 && (index==0 ,judge=true)

			for(var i=0;i<=Img.length;i++)
			{	
				Img[index].style.display="block";
				Img[i].style.display="none";			
			}
		},2000)
	};
	autoPlay();

	$(document).scroll( function(){
	  	  var me = arguments.callee; //匿名函数可以 通过 arguments.callee 调用自己

	    	me.doc = me.doc || $(document); //缓存 $(document);

	  	  me.head = me.head || $('#header');

	  	  me.lastTop = me.lastTop || me.doc.scrollTop();

	   	 if( me.doc.scrollTop() < 0 ||  me.doc.scrollTop() > me.lastTop ){

	        //向下 或再 页面顶部，放在 头部
	     	   me.head.css({ position : 'relative' });

	 	   }else if( me.doc.scrollTop() < me.lastTop  ){
	 	   	
	        //向上，悬浮
	        me.head.css({ position : 'fixed' });
	    }
	    me.lastTop = me.doc.scrollTop();
	});

}