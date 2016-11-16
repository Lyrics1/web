window.onload=function(){
	 water('main','box');
	 // var dataInt=('data':[{'src' : '0.jpg'},{'src' : '0.jpg'},{'src' : '0.jpg'},{'src' : '0.jpg'},{'src' : '0.jpg'}]),//接受后台的数据，模拟jeson的数据，
	 // window.onscroll=function(){
	 // 	//拖动滚动条加载图片，要检测是否符合加载图片的条件
	 // 	if(checkscroll){
	 // 		for(var i=0;i<dataInt.data.length;i++){
	 			
	 // 		}
	 		
	 // 	}
	 // }
}


function water(main,box){
	//取出class属性的元素
	var Main=document.getElementById("main");
	
	var ClassArray=new Array();
	var oElement=Main.getElementsByTagName('*');//取出main下的所有class属性
	// console.log(oElement.length)
	for(var i=0;i<oElement.length;i++){
		if(oElement[i].className=='box')
			ClassArray.push(oElement[i]);//取出main下的所有class 为box 的属性
	}

	var boxW=oElement[0].offsetWidth;
	console.log(boxW);
	var windowW=document.documentElement.clientWidth; //得到页面的大小
	var cols=Math.floor(windowW/boxW);

	// alert(windowW)
	// alert(window.innerWidth);
	// 
	// 设置mian的宽度
	Main.style.cssText='width:'+boxW*(cols)+'px';
	var hArray=[ ];
	for(var i=0;i<(ClassArray.length);i++){
		if(i<cols-1){
			hArray.push(ClassArray[i].offsetHeight);
		}
		else{
			var minH=Math.min.apply(null,hArray);
			var index=getMinIndex(hArray,minH);	
			console.log(index)
			ClassArray[i].style.position='absolute';
			ClassArray[i].style.top=minH+'px';
			ClassArray[i].style.left=ClassArray[index].offsetLeft+'px';
			hArray[index]+=ClassArray[i].offsetHeight;
		}

	}
		console.log(minH)
		console.log(hArray)

}

function getMinIndex(hArray,minH){
	for(var i in hArray){
		if(hArray[i]==minH)
			return i;
	}
}


function checkscroll(){
	var Main=document.getElementById("main");
	var ClassArray=new Array();
	var oElement=Main.getElementsByTagName('*');//取出main下的所有class属性
	// console.log(oElement.length)
	for(var i=0;i<oElement.length;i++){
		if(oElement[i].className=='box')
			ClassArray.push(oElement[i]);//取出main下的所有class 为box 的属性
	}

	 var lastboxH=ClassArray[ClassArray.length-1].offsetTop+Math.floor(ClassArray[ClassArray.length-1]/2);

	 //获取滚动条的滚动长度
	 var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;//document.body.scrollTop （标准模式）|| document.documentElement.scrollTop;(混杂模式)

	 //获取页面的高度
	 var Height=document.body.clientHeight || document.documentElement.clientHeight;

	 return(lastboxH<(scrollTop+Height))? true:false;
}

