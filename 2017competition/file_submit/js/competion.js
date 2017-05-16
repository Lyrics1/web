window.onload=function(){
	var sign=document.getElementById('sign');
	var rules=document.getElementById('competition-rules');
	var submit_file=document.getElementById('submit_file');
	var Input=document.getElementsByTagName('input');
    var obtn = document.getElementsByClassName("btn form-control submit")[0];
    var tishi=document.getElementById('tishi');
    var check=document.getElementsByClassName("btn check")[0];
//    var progress=document.getElementsByClassName("progress process-myself")[0];
	// var Team=^/[0-9a-zA-z]*$/;//TeamName验证
	Input[3].onblur = function(){
		
         if(this.value == ''){
          	Input[6].value="请填写团队名称";
          }else{
          	  $.ajax({
          	  	  url: "php/getname.php",
          	  	  async:true,
          	  	  type:'GET',
          	  	  data:{
          	  	  	name:Input[3].value
          	  	  },
          	  	  success:function(data){
          	  	  	console.log(data)
          	  	  	  if(data == "团队已报名"){
          	  	  	  	   Input[3].value="";
                           Input[3].placeholder="该团队已经报名请重新填写";
						   obtn.disabled = true;
					}

					  else{
					  	
					  	obtn.disabled = false;
					  }
          	  	  },
          	  	  error:function(jqxhr,statetext,state){
          	  	  	   alert(state);
          	  	  }
          	  });
          } 
	}
	obtn.onclick=function(){
		Input[6].style.visibility="visible";
        
		if( judge()){
			
						//将数据填入数据库
				         $.ajax({
							url:"php/signup.php",
							type : "POST",
							async : true,
							data:{
								name : Input[3].value,
								tel : Input[4].value,
								email : Input[5].value
							},
							//dataType:'text',
							success: function(data,state,jqxhr){
								Input[6].value=data;
					            obtn.disabled = true;
								
							},
							error:function(jqxhr,stateText,date){
								Input[6].value=data;
								//alert(data);

							}
						});

		}
	}
	
	var Team = document.getElementById('teamname'); 
	Team.onblur = function(){
	
          if(Team.value == ""){
          	 Team.placeholder="请输入团队名称"
          	 check.disabled=true;
          }else{
          	  $.ajax({
          	  	  url: 'php/getname.php',
          	  	  async:true,
          	  	  type:'get',
          	  	  data:{
          	  	  	name:Team.value
          	  	  },
          	  	  success:function(data){
          	  	  	  if(data=='团队已报名'){
          	  	  	  	tishi.style.visibility="visible";
          	  	  	  	tishi.innerHTML="团队已报名";
          	  	  	  	document.getElementsByClassName("file-font").id="file";
          	  	  	  	check.disabled=false;
          	  	  	  //	find();

          	  	  	  }else{
          	  	  	  	tishi.style.visibility="visible";
          	  	  	  	tishi.innerHTML="该团队没有报名,请先报名";
          	  	  	  	check.disabled=true;
          	  	  	  	//修改拖拽的id  避免上传文件
          	  	  	  	document.getElementsByClassName("file-font").id="";
          	  	  	  	progress.style.visibility="hidden";
          	  	  	  }
          	  	  },
          	  	  error:function(jqxhr,statetext,state){
          	  	  	 alert(state);
          	  	  }
          	  });
          } 
	}
/*function find(){
	check.onclick=function(){
	   progress.style.visibility="visible";
	    
  }
}*/


	function judge(){
		var Tel=/^1[34578]\d{9}/;   //验证电话号码
		var Email= /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;   //验证邮箱
		var Tname=/^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/;//验证用户名  允许5-16字节，允许字母数字下划线
		
		if(Input[3].value=="" || Input[4].value=="" || Input[5].value=="") {
			Input[6].value="输入不能为空";
			return false;
		}else if(!(Tname.test(Input[3].value))){
			Input[6].value="团队名称格式错误";

			return false;
		}
		else if( !(Tel.test(Input[4].value))){
			Input[6].value="联系方式格式错误"
			return false;
		}else if( !(Email.test(Input[5].value))){
			Input[6].value="Email格式错误"
			return false;
		}else return true;
	}

//提示框信息
 var checkFormText = [
        "请填写团队名称。",
        "抱歉，此队伍未报名。",//0
        "拖拽初赛压缩文件，提交初赛作品。",//1
        "初赛作品已提交。请在5月5日之后在此平台或者网协微信公众号上及时查询评审结果。",//2
        "初赛作品未提交，提交时间已截至。",//21
        "已过初审，拖拽决赛压缩文件，提交决赛作品。",//3
        "未过初审。加油骚年！",//31
        "决赛作品已提交。请在5月18日准时参加决赛现场。",//4
        "决赛作品未提交，提交时间已截至。"//41
    ];


//进度条信息
var progressText = {
    "0" : "没有此队伍",
    "1":"报名成功",
    "2":"初赛作品提交",
    "21" :"初赛作品未提交",
    "3":"初审过",
    "31" :"初审未过",
    "4":"决赛作品提交",
    "41" :"决赛作品未提交"
};

//进度条代码
var progress = {
        "1" : "",
        "2" : "",
        "21" : "",
        "3" : "",
        "4" : "",
        "41" : ""
    };

 function eachProgress(color,item){
        var progress_div = '<div class="progress-bar progress-bar-' + color +  'progress-bar-striped role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 25%">' + item + '</div>';
        return progress_div;
    }

//组装好progress
(function(){
    progress["1"] = eachProgress("info",progressText["1"]);
    progress["2"] = progress["1"] + eachProgress("warning",progressText["2"]);
    progress["21"] = progress["1"] + eachProgress("danger",progressText["21"]);
    progress["3"] = progress["2"] + eachProgress("success",progressText["3"]);
    progress["31"] = progress["2"] + eachProgress("danger",progressText["31"]);
    progress["4"] = progress["3"] + eachProgress("warning ",progressText["4"]);
    progress["41"] = progress["3"] + eachProgress("danger",progressText["41"]);
})()


//设定进度条
function setProgress(num){
    $('#end').html(progress[num]);
}

//设定提示框
/*function setCheckForm(text,color){
    if(arguments.length !== 0){
        if(color !== "green"){
            $("#checkForm").css({'visibility' : 'visible' ,'background-color' : '#f2dede', 'border-color' : '#ebccd1','color':'#a94442'});
            $("#checkForm .checkInfo").text(text);
        }
        else{
            $("#checkForm").css({'visibility' : 'visible' ,'background-color' : '#5cb85c', 'border-color' : '#4cae4c','color':'#fff'});
            $("#checkForm .checkInfo").text(text);
        }
    }
    else{
        $("#checkForm").css("visibility","hidden");
        $("#checkForm .checkInfo").text("提示区");
    }
}*/



$(function() {
    /*提交作品查询进度按钮
    0：没有此队伍
    1：报名成功
    2：初赛作品提交
    21：初赛作品未提交
    3：初审过
    31：初审未过
    4：决赛作品提交
    41：决赛作品未提交
    初审的日期改1为21，2改为3或者31，决赛前一天3改为41
    */
  /* var checkFormText = [
        "请填写团队名称。",
        "抱歉，此队伍未报名。",//0
        "拖拽初赛压缩文件，提交初赛作品。",//1
        "初赛作品已提交。请在5月5日之后在此平台或者网协微信公众号上及时查询评审结果。",//2
        "初赛作品未提交，提交时间已截至。",//21
        "已过初审，拖拽决赛压缩文件，提交决赛作品。",//3
        "未过初审。加油骚年！",//31
        "决赛作品已提交。请在5月14日准时参加决赛现场。",//4
        "决赛作品未提交，提交时间已截至。"//41
    ];*/
   /* $("#btn").on("click",function(){
       
        if($(".form-control").val() === ""){
                setCheckForm(checkFormText[0],"red");
                }
        else{ //else if(allowUpLoad === true)
                setCheckForm();

               $.ajax({
                    type: "get",
                    url: "http://www.jaylanme.xyz/check!checkname?team_name=" + $(".form-control").val(),
                    success : function(data){
                        var pa_progress = data;
                        if(pa_progress === "0"){
                            setCheckForm(checkFormText[1],"red");
                        }
                        else if(pa_progress === "1"){
                            setCheckForm(checkFormText[2],"green");
                            $(".form-control").attr("disabled","disabled");
                            $("#progress_form").hide();
                            $("#container").show();
                            qiniuSet();
                            setProgress(1);
                        }
                        else if(pa_progress === "2"){
                            setCheckForm(checkFormText[3],"green");
                            setProgress(2);
                        }
                        else if(pa_progress === "21"){
                            setCheckForm(checkFormText[4],"red");
                            setProgress(21);
                        }
                        else if(pa_progress === "3"){
                            setCheckForm(checkFormText[5],"green");
                            $(".form-control").attr("disabled","disabled");
                            $("#progress_form").hide();
                            $("#container").show();
                            qiniuSet();
                            setProgress(3);
                        }
                        else if(pa_progress === "31"){
                            setCheckForm(checkFormText[6],"red");
                            setProgress(31);
                        }
                        else if(pa_progress === "4"){
                            setCheckForm(checkFormText[7],"green");
                            setProgress(4);
                        }
                        else if(pa_progress === "41"){
                            setCheckForm(checkFormText[8],"red");
                            setProgress(41);
                        }
                    }
                });
            }
                
    });*/
    if(document.getElementById("teamname").value == ''){
          document.getElementById("tishi").innerHTML = "请先输入团队名称";
    }else{
          $("#btun").on("click",function(){
       /* if($(".form-control").val() === ""){
                setCheckForm(checkFormText[0],"red");
                }
        else{ //else if(allowUpLoad === true)
                setCheckForm();*/
                $.ajax({
                    url:'php/getProccess.php',
                    type: "get",
                    data:{
                        teamname:document.getElementById("teamname").value
                    },
                    //url: "http://www.jaylanme.xyz/check!checkname?team_name=" + $(".form-control").val(),
                    success : function(data){
                        var pa_progress = data;

                        if(pa_progress == "1"){
                            setProgress(1);
                        }
                        else if(pa_progress == "2"){
                            setProgress(2);
                        }
                        else if(pa_progress === "21"){
                            setProgress(21);
                        }
                        else if(pa_progress === "3"){
                            setProgress(3);
                        }
                        else if(pa_progress === "31"){
                            setProgress(31);
                        }
                        else if(pa_progress === "4"){
                            setProgress(4);
                        }
                        else if(pa_progress === "41"){
                            setProgress(41);
                        }else{
                        	setProgress(0);
                        }
                    }
                });
            //}
                
    });
  }
});



	// var myElement=document.querySelector("header");
	// var headroom=new Headroom(myElement);
	// headroom.init();
	// // $("#header").headroom();
	$(document).scroll( function(){
	  	  var me = arguments.callee; //匿名函数可以 通过 arguments.callee 调用自己

	    	me.doc = me.doc || $(document); //缓存 $(document);

	  	  me.head = me.head || $('.headroom');
	  	  me.lastTop = me.lastTop || me.doc.scrollTop();
	   	 if( me.doc.scrollTop() >100 &&  me.doc.scrollTop() > me.lastTop ){
	        //向下 或再 页面顶部，放在 头部
	     	   me.head.css({ position : 'relative' });
	     // 	   console.log("last:",me.lastTop);
	    	// console.log("scroll",me.doc.scrollTop())
	 	   }else if( me.doc.scrollTop() < me.lastTop  ){
	 	   	
	        //向上，悬浮
	        me.head.css({ position : 'fixed' });
	    }
	    me.lastTop = me.doc.scrollTop();
	});
}



