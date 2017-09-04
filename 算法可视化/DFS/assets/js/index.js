window.onload=function(){
	
	var LINE= create();
	$(".click-random").click(function(){
	
		LINE= create();
	
	

	})
	var speed=1500;
	$(".click-speed-1").RangeSlider({min:0,max:10,step:0.1,callback:change});
	function change(){
	
		window.speed =2500- $('.click-speed-1').val()*200;
		console.log(window.speed,$('.click-speed-1').val())
	}

	//点击GO
	$('.click-freedom-2').click(function(){
		$('#return').html(" ");
		$('#explain').html(" ");
		$('.click-freedom-2').attr('disabled',true);
		clearColor();
		var temp=checkInput();//记录 源点
		
		DFS(temp,speed,LINE);

	})

}

//算法的实现
 function DFS(i,speed,LINE){
 	console.log("O",LINE,i)
 	//刚开始节点（源点 颜色发生改变）
 	changeColor(i,speed);
 	var T= ["A","B","C","D","E","F","G","H","I","J","K","L"];
 	var temp=i;
 	console.log(LINE);
 	var route =[];
 	
 	var circleLen = document.getElementsByTagName('circle').length;
 	var judge =circleLen;
 	var tag=[];//tag进行标记
 	for(var l=0;l<judge;l++){
 		tag[l]=0;
 	}
 	var timer=setInterval(function(){
 		 ClearDemo(parseInt(speed/10));
 		changeDemo(2,parseInt(speed/5))
 		for(var j=0;j<circleLen;j++){
 			
 			if(i==LINE[j].x && tag[j]==0){
 				temp=i;
 				route.push(i);
 				i=LINE[j].y;
 				tag[j]=1;
 				
 				break;
 			}
 		}
 	
 		if(tag[i]==0){

 			
 			changeColor(i,speed);
 			 ClearDemo(parseInt(speed/10));
 			 changeDemo(1,parseInt(speed/5))
 			// changeLineColor(LINE[i].y)
 			judge--;
 		}else{
 			console.log(route)
 			i=route.pop();

 			$('#return').append(T[i]+"  ");
 			 ClearDemo(parseInt(speed/10));
 			changeDemo(6,parseInt(speed/5))
 			for(var j=0;j<circleLen;j++){
 				 ClearDemo(parseInt(speed/10));
 				
	 			if(i==LINE[j].y && tag[j]==0){
	 				 changeDemo(4,parseInt(speed/5))
	 				temp=i;
	 				i=LINE[j].x;
	 				// tag[j]=1;
	 				route.push(temp);
	 				route.push(i);

	 				break;
	 			}
 			}
 			if(tag[i]==0){
 				 tag[i]=1;
 				
	 			changeColor(i,parseInt(speed/5));
	 			 ClearDemo(parseInt(speed/10));
	 			 changeDemo(1,parseInt(speed/5))

	 			// changeLineColor(LINE[i].x)
	 			judge--;
 		}


 		}
 			//改变节点颜色
 		console.log(i,j,tag);
 		var nextT=0;
 		// (temp,i);
 		for(var t=0;t<tag.length;t++){
 			if(tag[t]==1){
 				nextT++;
 			}
 		}
 		if(judge==0 || nextT==tag.length){
 			console.log(judge)
 			ClearDemo();
 			$('.click-freedom-2').attr('disabled',false);
 			clearInterval(timer);
 		}

 		ClearDemo(parseInt(speed/10));
 	}, speed)
 }


 //圆颜色发生变化
 function changeColor(i,speed){
var T= ["A","B","C","D","E","F","G","H","I","J","K","L"];
 		$('circle').eq(i).css("fill","#D1F817");
 		$('#explain').append(T[i]+"  ");
 		changeDemo(i,parseInt(speed/10))

 	
 }
 //清除代码背景颜色
 function ClearDemo(){
 	setTimeout(function(){
 	for(var i=0;i<7;i++){
 		$('#l li').eq(i).css("background","transparent");
 	}
  }, speed)
 }
 function changeDemo(i,speed){
 	setTimeout(function(){$('#l li').eq(i).css("background","#C9FB23");
 }, speed)
 	
 }
 //线的颜色改变
  function changeLineColor(i){
 	// setTimeout(function(){
 		$('line').eq(i-1).css("stroke","#D1F817");
 	// },2000);
 }
function clearColor(){
	var circle = document.getElementsByTagName('circle');
	for(var i=0;i<circle.length;i++){
		$('circle').eq(i).css("fill","rgba(57, 149, 222, 0.84)");
	}
	
}

//检验输入数据合理
function checkInput(){
	var T= ["A","B","C","D","E","F","G","H","I","J","K","L"];
	$(".click-input");
	if($(".click-input").val().length!=1){
		alert("请只输入一个合理的字符");
	}
	var circle = document.getElementsByTagName("circle");
	console.log($(".click-input").val(),circle.length)
	for(var i=0;i<circle.length;i++){
		
		if($(".click-input").val().toUpperCase()==T[i])
			return i;
	}
	if(i==circle.length){
		alert("请输入屏幕上出现的节点的字符");
	}
}

function create(){
	var textI=0;
	var p=0
	var SVG  = document.getElementById('svg');
	clearSvgChild();
		 var showexeH = $('.showexe').height();
 		var showexeW = $('.showexe').width();
		 var Locate=[{x:showexeW*0.4,Y:showexeH*0.4},
			 	{x:showexeW*0.2,Y:showexeH*0.2},
			 	{x:showexeW*0.6,Y:showexeH*0.6},
			 	{x:showexeW*0.4,Y:showexeH*0.1},
			 	{x:showexeW*0.8,Y:showexeH*0.7},
			 	{x:showexeW*0.7,Y:showexeH*0.5},
			 	{x:showexeW*0.1,Y:showexeH*0.6},
			 	{x:showexeW*0.9,Y:showexeH*0.2},
			 	{x:showexeW*0.3,Y:showexeH*0.7},
			 	{x:showexeW*0.5,Y:showexeH*0.8},
			 	{x:showexeW*0.1,Y:showexeH*0.4},
			 	{x:showexeW*0.6,Y:showexeH*0.1}];

		var Len =getRandom(6,12);
		var locate = [];// 存储locate 下标i 
		console.log(Len)
		for(var i=0;i<Len ;i++){
			
			var end = true;
			while(end){
				var locateXY =RandomLocate(); 
				var last = locateXY[2];
				var cx=locateXY[0];
				var cy = locateXY[1];
				var temp= true;
				for(var k=0;k<locate.length;k++){
					if(last==locate[k]){
						// end = true;//再次进行选择
						temp = false;//没有完成
						break;
					}						
				}
				if(temp == true){

					// end =false;
					locate.push(last);
					var circle=createCircle(cx,cy);
					SVG.appendChild(circle);
					var text=createText(cx,cy,textI)
					SVG.appendChild(text);
					textI++;
					// console.log(textI)
					break;
				}

			}

		}
	
		
		var LINE=[];
		var SX = [];
		var SY=[];

		//随机选取两个进行连线.线的条数是按照n  来计算Math.max.apply(null, a)
		for(var lineCount =0 ;lineCount<locate.length;lineCount++){
		while(true){
			// console.log("TT"
			// var o1=getRandom(0,locate.length-1);
			var o2=getRandom(0,locate.length-1);
			var one = locate[p];
			var two = locate[o2];
			// console.log(one,two);
			var next=true;
			
			// console.log(p,o2,SX,SY)
			// 防止重复出现划线，而且保证图是连通的 
			for(var m=0;m<SX.length;m++){
				
				if((p==SY[m] &&o2==SX[m]) || (p==SX[m] &&o2==SY[m]) ||p==o2){
					// console.log("LL")
					next=false;
					break;
				}
			}
			if(p !=o2 && p<locate.length && next){
				
				var storLine = new Array();
				storLine.x=p;
				storLine.y=o2;
				
				SX.push(p);
				SY.push(o2);
				// console.log(p,o2,SX.length)
				LINE.push(storLine);
				// console.log(Locate[one])
				var cx1=parseInt(Locate[one].x);
				var cy1=parseInt(Locate[one].Y);
				var cx2=parseInt(Locate[two].x);
				var cy2=parseInt(Locate[two].Y);
				// console.log(cx1,cy1,cx2,cy2)
				var line = createLine(cx1,cy1,cx2,cy2)
				SVG.appendChild(line);
				p++;
				break;	
			} 
			if(p>=locate.length){
				p=p-getRandom(0,p-2);
			}
		}
	}
	
	return LINE;

}
//svg 圆形
 function createCircle(cx,cy){

 	var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
 	circle.setAttribute('cx',cx);
 	circle.setAttribute('cy',cy);
 	var showexeW = $('.showexe').width();
	circle.setAttribute('stroke',"black");
 	circle.setAttribute('stroke-width',1);
 	circle.setAttribute('r',showexeW/75);
 	circle.style.fill="rgba(57, 149, 222, 0.84)";
 	return circle;

 }
 function createText(x,y,i){
 		var T= ["A","B","C","D","E","F","G","H","I","J","K","L"];
		
		var text = document.createElementNS("http://www.w3.org/2000/svg","text");
		var textNode = document.createTextNode(T[i]);

		text.style.textAnchor = "middle";//文字上下左右居中
		text.appendChild(textNode);
		text.setAttribute('y',y+5);
		text.setAttribute('x',x);
		text.style.fontSize=1+"vw";


		return text;
	}
  //产生随机数
  function getRandom(min,max){
       var rand = 0;
       while(rand == 0){
       	 rand = Math.random();
       }      
       var range = max - min;
       return min+Math.round(rand * range);       
   }  
 //SVG创建两个节点之间的连线
 function createLine(cx1,cy1,cx2,cy2){

 	var line = document.createElementNS("http://www.w3.org/2000/svg","line");
 	line.setAttribute('x1',cx1);
 	line.setAttribute('y1',cy1);
 	line.setAttribute('x2',cx2);
 	line.setAttribute('y2',cy2);
 	line.style.stroke="#7C7C7C";
 	return line;
 }
 // 随机产生在范围之内合理的坐标
 function RandomLocate(){
 

 	// parseInt(Math.random()*(上限-下限+1)+下限);
 	var showexeH = $('.showexe').height();
 	var showexeW = $('.showexe').width();
 	
 	var locateX = parseInt(showexeW*0.4);
 	var locateY= parseInt(showexeH*0.6 );
 	var locateXY=[{x:showexeW*0.4,Y:showexeH*0.4},
 	{x:showexeW*0.2,Y:showexeH*0.2},
 	{x:showexeW*0.6,Y:showexeH*0.6},
 	{x:showexeW*0.4,Y:showexeH*0.1},
 	{x:showexeW*0.8,Y:showexeH*0.7},
 	{x:showexeW*0.7,Y:showexeH*0.5},
 	{x:showexeW*0.1,Y:showexeH*0.6},
 	{x:showexeW*0.9,Y:showexeH*0.2},
 	{x:showexeW*0.3,Y:showexeH*0.7},
 	{x:showexeW*0.5,Y:showexeH*0.8},
 	{x:showexeW*0.1,Y:showexeH*0.4},
 	{x:showexeW*0.6,Y:showexeH*0.1}];
 	//随机选取
 	var Locate=[]; 
 	var i = parseInt(Math.random()*12);
	 Locate.push(locateXY[i].x);
	 Locate.push(locateXY[i].Y);
	  Locate.push(i);
	  // console.log("下标",i,locateXY[i].x,locateXY[i].Y); 
 	return 	Locate;
 }

//清除SVG
function clearSvgChild(){

		if($('svg').children('circle').length!=0){
			$('svg').empty();
		}
	}