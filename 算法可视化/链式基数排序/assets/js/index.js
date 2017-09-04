var number = document.getElementsByClassName('number')[0].offsetWidth;

var num = document.getElementsByClassName('num');
changeroof();
//读取输入数据并且显示
var InputNumber = document.getElementsByClassName('input')[0];
var submit = document.getElementsByClassName('run')[0];

$('.click-random').click(function(){
		var arr=getRandomArray();
		 InputNumber.value= arr;
		 clearResult();
	});

$('#kaishi').click(function(){
	run();
})
submit.onclick=function(block){
	 clearResult();
check(block);

};

var speed=1500;
	$(".click-speed-1").RangeSlider({min:0,max:10,step:0.1,callback:change});
	function change(){
	
		window.speed =2800- $('.click-speed-1').val()*200;
		console.log(window.speed,$('.click-speed-1').val())
	}
function check(block){
	var patrn= /^(\d+,?)+$/;  //验证逗号分隔；
console.log(InputNumber.value)
	if(!patrn.test( InputNumber.value)){
		alert("输入数据格式不正确");
		return;
		//737,527,202,345,111,999,435,333
	}
	var numArray = getArray();

	
	if(numArray.length!=8){

		alert("输入数据格式不正确");
		return;
	}
	var block = document.getElementsByClassName('block');
	console.log(block.length)
	var i=0;
	for(i=0;i<block.length;i++){
		block[i].style.display="block";
		block[i].innerHTML = numArray[i];
	}
	
}

function  getRandomArray(){
		var RandomArray=[];
		for(var i=0;i<8;i++){
			var temp = parseInt(Math.random()*999+1); 
			RandomArray.push(temp);
		}
		return RandomArray;
	}
 function run(){
 	$('.click-random').attr('disabled',true);
 	$('.run').attr('disabled',true);
	var Tamp =getArray();
	 numArray =getChangeArray();
	var maxDigit= maxNumlen(numArray);
	// alert(maxDigit)
	radixSort(numArray,maxDigit);
	// console.log("a",lastArray);
	// console.log("b",tempArray);
	console.log("c",resultArray);
	//展示动态效果
	setTimeout(function(){
		moveResult(maxDigit,Tamp,lastArray,tempArray,resultArray);
	}, parseInt((4/3)*speed))	;
	setTimeout(function(){
	var block = document.getElementsByClassName('block');
		
		block[7].style.display="block";
	}, speed*(8.6*maxDigit));
	
	
}
//输入数据转化为数组	
function getArray(){
	return InputNumber.value.split(',');
}
function getChangeArray(){
	var arr = new Array();
	var block = document.getElementsByClassName('block');
	for(var b=0;b<block.length;b++){
		arr.push(block[b].innerHTML)
	}
	return arr;
}

var list = $('.code-2 li');
function moveResult(maxDigit,numArray,lastArray,tempArray,resultArray){
	// var last =0;
	var q=0;//数组下标3位数-》则到24
	var dig =maxDigit;//个十百位的控制变量
	var arr = numArray;
	var tempDig=0;
	var rtemp=0;//记录是blocked的第几个
	var block = document.getElementsByClassName('block');
	// var blockend = document.getElementsByClassName('blockend');
	var i=0;
	var arrlen=0;
	var timer=setInterval(function(){
		if(((q+1)%8) == 1 && q!=0){
			block[7].style.display="block";
			clearBack();
			// $('.Bchange').css("background","#D1F817");
		}
		
		if(q>resultArray.length){return;}	
		console.log("aL",arr.length, "dig",dig);
		for(i;i<arr.length;i++){
			clearBack()
			var temp=arr[i]+"";
			console.log("temp",temp)
			
				console.log(lastArray)
				console.log("q",q)
				console.log(lastArray[q])
			if(temp.length<maxDigit){
				
				temp =PrefixInteger(parseInt(temp),maxDigit).toString();
console.log("temp",temp);
			}
			console.log(parseInt(temp.charAt(dig-1)))
			if(parseInt(temp.charAt(dig-1)) == lastArray[q]){
				rtemp = i;
				i++;	
				// $('.Bchange').css("background","#D1F817");		
				break;	
			}
			
		}
		$(block[rtemp]).hide("slow");
		console.log("rr",rtemp)
		// for(var v=0;v<)
		createElement(tempArray[q],lastArray[q],rtemp,arr);


		if(((q+1)%8) == 0 && q!=0){
			arr=[];
			console.log("arrlen",arrlen)
			$('#tip span').html(arrlen+1);
			for(var T=arrlen*8;T<arrlen*8+8;T++){
				arr.push(resultArray[T])

			};
			console.log("arr",arr);
			showResult(arr);
			arrlen++;
			if(arrlen != maxDigit){
				clearResult();
			}else{
			
				$('.click-random').attr('disabled',false);
 				$('.run').attr('disabled',false);
				clearInterval(timer);

			}
	
			dig--;
			i=0;
		}
		q++;
		// changeBack(3);

	}, speed)
}

//对不满足位数为最大位数的数字进处理前面加 0
function PrefixInteger(num, length) {
 return (Array(length).join('0') + num).slice(-length);
}


//算法背景改变
function changeBack(){
	$('.code-2 li').eq(i).css("background","#D1F817")
}
function clearBack(){
	for(var i=0;i<17;i++){
		$('.code-2 li').eq(i).css("background","transparent");
	}
}
//排序算法

var counter = [];
var lastArray =[];//保存第i 位的数组
var tempArray =[];//保存第 i 位有几个，自己是第几个，为了高度显示正确
var resultArray = [];//保存每次执行结果
// LiWidth ==length.筒的长度
function radixSort(arr, maxDigit) {
var block = document.getElementsByClassName('block');
    var mod = 10;
    var dev = 1;
  
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    	  var ten =[0,0,0,0,0,0,0,0,0,0];//创建数组0-9
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            console.log(bucket);//分层
            //第 i 位的数字进行操作
            //先消失 
            // block[j].style.display = "none";
            //，在出现createElement();
     
	            	for(var f=0;f<10;f++){
	           		var temp =0
	           		if(bucket == f){
	           			ten[bucket]+=1;          			
	           			temp =ten[bucket];
	           		
	           			lastArray.push(bucket);
	           			tempArray.push(temp)
	           		}
	           	}
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                         console.log("value",value);
                           resultArray.push(value);
                }

          }

        }
          console.log(arr);
    }

}

//判断最长数字的length
function maxNumlen(arr){
	var max=Math.max.apply(null,arr)
	var Smax =max +"";
	return (Smax.length)
}
//动态创建元素
function createElement(temp,mod,j,tempArray){
	// var tempArray=getChangeArray()
	var  showexe = document.getElementsByClassName('showexe')[0];
	var div = document.createElement('div');
	var num = document.getElementsByClassName('num');
	var length = num[0].offsetWidth;
	div.setAttribute("class", "blockend"); 
	div.style.bottom= (temp-1) *9+ '%' ;
	div.style.left = mod*length + 'px' ;
	div.innerHTML = tempArray[j];
	if(j!=7){
		div.style.display = "none";showexe.appendChild(div);
		$(div).show("slow");
	}else{
		showexe.appendChild(div);
	}

	
	

}

function showResult(arr){
	var block = document.getElementsByClassName('block');
	for(var end=0;end<arr.length;end++){
		
		block[end].innerHTML =arr[end];

		$(block[end]).show();
	}
	
	
}
function clearResult(){
	var showexe = document.getElementsByClassName('showexe')[0];
	var blockend = document.getElementsByClassName('blockend');
	setTimeout(function(){
		for(var end=0;end<8;end++){
		showexe.removeChild(blockend[0]);
	
	}
}, 1500)
	
}


//响应式
var block = document.getElementsByClassName('block')[0];
block.style.width=num[0].offsetWidth;
var legth = num[0].offsetWidth;

function changeroof(){
	for(var i =0;i<num.length;i++)
{
	num[i].style.width= number/11.2 + 'px'
}
}
//737,527,202,345,111,999,435,333
//产生随机数
function Random(){
	var num = Math.random()*999;
	var num = parseInt(num,10);

}
function addNum(){
	
}


