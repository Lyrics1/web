window.onload = function(){
	var change = function($input) {
                /*内容可自行定义*/
         
            }
            
            $('input').RangeSlider({ min: 0,   max: 100,  step: 0.1,  callback: change});
	getRandomArray();

	//随机产生
	$('.click-random').click(function(){
		getRandomArray();

	});
	function  getRandomArray(){
		var RandomArray=[];
		for(var i=0;i<8;i++){
			var temp = parseInt(Math.random()*99+1); 
			RandomArray.push(temp);
		}
		addSvg(RandomArray);
	}

	//获取输入数字
	$('.submit').click(function(){
		$('.submit').attr("disabled",true)
		$(".result").html("");
		 clearAll(); 
		 var numArray=  getNumber();
		addSvg( numArray);
		 clearAll();
		
		var searchNum = $('.search').val(); 
		console.log(searchNum);
		var judge =/^-?\\d+$/　;//整数判断
		var judgef =/^(-?\d+)(\.\d+)?$/;//浮点数判断
		if(judge.test(searchNum) || judgef.test(searchNum) ){

		var result= search(searchNum, numArray)		
		}else{
			alert("请输入合适的数字");
		}
	})

	function addSvg( numArray){
		$('.input').val(numArray);
		var SVG  = document.getElementById('svg');
	
		clearSvgChild();
		for(var i=0;i<numArray.length;i++){

			var rect =createRect(i,numArray[i]);
			SVG.appendChild(rect);
			var text = createText(i,numArray[i]);
			SVG.appendChild(text);

		}
	}
	//判断svg是否存在子元素，存在提交时候进行清除，防止覆盖
	function clearSvgChild(){
		if($('svg').children('rect').length!=0){
			$('svg').empty();
		}
	}
	//获得数组
	function getNumber(){
		var inputNum = $('.input').val();
		// console.log(inputNum);
		var patrn= /^(\d+,?)+$/;  //验证逗号分隔；
		  if(!patrn.test( inputNum)){
		        alert("输入数据格式不正确");
		        return;
		        //737,527,202,345,111,999,435,333
		    }
		    var numArray = inputNum.split(',');
		    if(numArray.length!=8){

			        alert("输入数据格式不正确");
			        return;
			}
		    return numArray;
	}
	//判断最长数字的length
		function maxNumlen(arr){
			// console.log(arr)
		    var max=Math.max.apply(null,arr)
		    var Smax =max +"";
		  if(max==10){
		  	return 1;
		  }	
		    return (Smax.length)
		}
		

	//动态生成矩形
	function createRect(index,number){
		var showWidth = $('.showexe').width();//没有单位  .css("width");有单位
		var showHeight = $('.showexe').height();
		var numArray=  getNumber();
		var Len = maxNumlen(numArray);
		console.log(Len)
		var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
		rect.setAttribute("width",parseInt(showWidth/12) );
		var tag = Math.pow(10,Len);
		rect.setAttribute("height",parseInt((showHeight/tag) *number));
		rect.style.fill= "rgb(173,216,230)";
	
		rect.setAttribute('y',showHeight-parseInt((showHeight/tag) *number));
	
		rect.setAttribute('x',(index+1)*showWidth/12)
		return rect;
	}
	//生成数字显示
	function createText(index,number){
		var showWidth = $('.showexe').width();//没有单位  .css("width");有单位
		var showHeight = $('.showexe').height();
		var numArray=  getNumber();
		var Len = maxNumlen(numArray);
		var text = document.createElementNS("http://www.w3.org/2000/svg","text");
		var textNode = document.createTextNode(number);
		text.style.textAnchor = "middle";//文字上下左右居中
		text.appendChild(textNode);
		text.setAttribute('y',showHeight-5);
		text.setAttribute('x',(index+1.5)*showWidth/12);


		return text;
	}

	//算法
	function search(num,arr){
		var speed = $(".click-speed-1").val();
		if(speed>95) {
			//防止速度过快
			speed = 90;}
		console.log(speed);
		speed =speed*30;
		$('.code-2 p').eq(1).css("background"," #F6F411")
		var i=0;
		var timer = setInterval(function(){

		 clearAll();
		$('rect').eq(i).css('fill',"#5959FF");
		clearBack();
		$('.code-2 p').eq(2).css("background"," #F6F411")
		
			if(num==arr[i]){
				setTimeout(function(){
					console.log(i,arr[i]);
				clearBack()
				$('.code-2 p').eq(3).css("background"," #F6F411")
			
				$('.result').html("下标为："+i);
				$('.moveresult').html("下标为："+i);
				$('.submit').attr("disabled",false)
				clearInterval(timer);
				return i;
			},(3000-speed)/3)
				
				
			}else{setTimeout(function(){
				i++;
				$('.moveresult').html("不相等");
				clearBack()
				$('.code-2 p').eq(1).css("background"," #F6F411")
				},(3000-speed)/3)
			}
			if(i>7){
				// clearBack()
				
			
				$(".result").html("没有找到");

				$('.submit').attr("disabled",false)
				setTimeout(function(){
					$('rect').eq(i-2).css('fill',"rgb(173,216,230)");
					clearBack()
					$('.code-2 p').eq(5).css("background"," #F6F411")
					clearInterval(timer);
				},(3000-speed)/3)

			}
		},3000-speed)
		return -1;

	}
	function clearAll(){
		for(var j=0;j<7;j++){
			$('rect').eq(j).css('fill',"rgb(173,216,230)");
		}
	}
	function clearBack(){
		for(var j=0;j<6;j++){
			$('.code-2 p').eq(j).css("background","transparent")
		}
	}
}


// 11,22,33,44,55,66,77,88
// document.querySelector('svg').innerHTML = ''；清除svg子元素
// 