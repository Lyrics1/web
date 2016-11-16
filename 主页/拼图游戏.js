window.onload=function(){

	var zindex=1;
	 var Menu=document.getElementById("menu");
	 var Img=document.getElementsByTagName("img");
	 var Game=document.getElementById("game");
	 var aLi=document.getElementsByTagName("li");
	 var Span=document.getElementsByTagName("span");
	 var aWidth=[];
	var i=0;
	for(i=0 ; i< Img.length ; i++)
	{
		aWidth.push(Img[i].offsetWidth);
		Img[i].width= parseInt(Img[i].offsetWidth/1.5);

	}
	Img[0].width=parseInt(Img[0].offsetWidth/1.2);
	//实现了放大缩小，不太流畅，页面会跳动
	
	for(i=0;i<Img.length;i++)
	{
		Img[i].index=i;
		Img[i].onmousemove = function(){
			this.removeAttribute("width");

		}

		Img[i].onmouseout = function(){
				this.width= parseInt(this.offsetWidth/1.5);				
		}

		Img[i].onclick = function(){
			if(this.index==0)
			{
				Game.style.display="block";

			}
			else {
				Game.style.display="none";

			}
		}
	}


	for( i=0;i<Span.length;i++)
	{
		Span[i].index=i;
		Span[i].onmouseover=function(){		
		Span[0].src=Span[this.index].src;
		}
	}


	var Btn=document.getElementsByTagName("button")[0];
              var k=0;

	Btn.onclick=function(){
		this.innerHTML=="开始游戏"?  ( this.innerHTML= "停止游戏" ): (this.innerHTML= "开始游戏");
		//alert(typeof (Btn.innerHTML=="开始游戏"));
		// if(Btn.innerHTML=="开始游戏"){
		// 	Btn.innerHTML="停止游戏";
		// }else{
		// 	Btn.innerHTML= "开始游戏";
		// }
		
	if(Btn.innerHTML=="停止游戏"){

		for(i=0;i<aLi.length;i++)
		{
			aLi[i].index=i;
			drag(aLi[i]);
			aLi[i].style.cursor="move";
		}
	}
	else {
		
	}
	
		
		
}
	//拖拽函数
	function drag(obj){

	
		// var handle=handle || obj;
		// handle.style.cursor="move";
		obj.onmousedown = function(event){

			var event = event || window.event;
			var disX = event.clientX - this.offsetLeft;
			var disY = event.clientY - this.offsetTop;

			var temp=document.createElement("li");

			temp.style.left= this.currentStyle ? this.currentStyle["left"]:getComputedStyle(this,null)["left"];
			temp.style.top= this.currentStyle ? this.currentStyle["top"]:getComputedStyle(this,null)["top"];
			temp.style.zindex=zindex+1;
			// document.body.appnendChild(temp);

			// var oNear = null;
			// obj.style.zindex = zindex+1;
			// alert("document")
			document.onmousemove = function(event){
				var event = event || window.event;
				var iL=event.clientX - disX;
				var iT=event.clientY - disY;
				var maxL=document.documentElement.clientWidth - obj.offsetWidth;
				var maxT=document.documentElement.clientHeight - obj.offsetHeight;

				iL<0 && (il==0);
				iT<0&& (iT==0);
				iL>maxL && (iL==maxL);
				iT>maxT &&(iT==maxT);

				temp.style.left = iL+"px";
				temp.style.top = iT+"px";

				// for(i=0;i<aLi.length;i++)
				// 	aLi[i].className="";
				// oNear = findNearest(obj);

				return false;

			};

			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
				obj.style.left =temp.style.left
				obj.style.top=temp.style.top;
				obj.style.zindex=temp.style.zindex;
				document.body.removeChild(aLi);
				obj.releaseCapture && obj.releaseCapture();
			};
			this.setCapture && this.setCapture();
			return false;


		}
	}



}