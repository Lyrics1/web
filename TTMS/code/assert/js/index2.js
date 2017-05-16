window.onload=function(){
	var pic = document.getElementById("powerpoint");
	var Img = pic.getElementsByTagName('img');
	var next = document.getElementsByClassName('pagination next')[0];
	var Li = next.getElementsByTagName('li');
	console.log(Li.length)
	console.log(Img.length);
	var search = document.getElementById('search');
	var search_input = search.getElementsByTagName('input')[0];
	var search_button= search.getElementsByClassName("input-group-addon")[0];
	console.log(search.name);
	var login =  document.getElementById('login');

	var down = document.getElementsByClassName('navbar-toggle')[0];
	var dimg = document.getElementsByClassName('container content_show')[0].getElementsByTagName('img');
	console.log(dimg)
	 var line = document.getElementById('listone');



		
	 //隐藏标题
	down.onclick=function(){

		line.style.display = 'block';
		login.style.display="none";
		search.style.display = "none"
		var close = line.getElementsByTagName('li')[4];
		close.onclick = function(){
			line.style.display = 'none';
			login.style.display="block";
			search.style.display = "block"
		}
		
	}
	 //搜索，
	 search_button.onclick = function(){
	 	$.ajax({
	 		url : '',
	 		type : 'GET',
	 		data : {name: search_input.innerHTML},
	 		success: function(){
	 			console.log("success");

	 		},
	 		error : function(){
	 			console.log("error");
	 		}

	 	});
	 }


	var timer = play = null;
	//设置定时器
	var index = k=0;
	var judge = true;
	//ppt正常播放
	autoPlay();





	//header
	$(document).scroll(function(){

		var me = arguments.callee;//匿名函数通过arguments.callee调用和自己
		me.doc = me.doc || $(document)//缓存document
		me.head = me.head || $('.header');
		me.lastTop =  me.lastTop || me.doc.scrollTop();
		// console.log(me.doc.scrollTop());
		// console.log(me.lastTop);
	
		if(me.doc.scrollTop()>150 && me.doc.scrollTop()>me.lastTop){
   			//向下 或再 页面顶部，放在 头部
			me.head.css({display:'none'});
		}else if(me.doc.scrollTop()<me.lastTop){ 
			 //向上，悬浮
			me.head.css({display:'block'});
			  
		}
		me.lastTop = me.doc.scrollTop();
	});




	function autoPlay(){
		play=setInterval(function(){
			judge ? index++ : index--;
			index>=Img.length && (index = Img.length -2,judge =false)
			index<=0 && (index==0 ,judge=true);

			for(var i=0;i<=Img.length;i++)
			 {
				 $(Img[index]).fadeIn(1000);//渐进渐出
				
				Img[index].style.display="block";
				Img[i].style.display="none";
			}
		},3000);
	}
	
}