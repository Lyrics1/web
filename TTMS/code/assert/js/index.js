window.onload=function(){

	var Input=document.getElementsByTagName('input');
	console.log(Input.length)
	// Input[2].onclick=function(){
	// 	alert("1")
	// }
	//正则表达式
	// var Name=/^[A-Za-z0-9]+$///英文或是数字6-11位
	// var Pass=/^\w{6-12}*$/;
	var c=Input[3];
	console.log(Input.length);
	var Button=document.getElementsByTagName('button')[0];
	Input[2].onclick=function(){
		console.log("onclick");

		if(judge(Input)){
			console.log("true")
			// window.location.href="assert/index2.html"
			// window.location.href="../index.html"
			var user={
					name : Input[0].value,
					pass : Input[1].value,		
			}
			$.ajax({
				url:"assert/php/login.php",
				type:"post",
				data : user,
				success:function(data){
					// window.location.href="assert/index2.html"
				 Input[0].placeholder=data;	
				},
				error:function(data){
					 Input[0].placeholder=data;
				}

			})
		}

	}


}

function judge(Input){
	// alert(Input.length);
	var Name=/^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/;//英文或是数字6-11位
	var Pass=/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$ /;

	if(!Name.test(Input[0].value)|| Input[0].value==""){
		Input[0].placeholder="输入格式错误 ！请重新输入";
		Input[0].value="";
		return false;
	}else if((Pass.test(Input[1].value )||  Input[1].value=="")){
		Input[1].placeholder="输入格式错误 ！请重新输入";
		Input[1].value="";
		return false;
	}else {
		console.log("正确");
		return true;
	}
}

