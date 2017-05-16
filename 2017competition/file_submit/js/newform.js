window.onload= function () {
    var oinput = document.getElementsByClassName('panel-body')[0].getElementsByTagName('input');
    var oselect = document.getElementById('select');
    var oarea = document.getElementById('info');
    var obtn = document.getElementById('btn');
    var otext = document.getElementsByClassName("panel-body")[0].getElementsByTagName('span');


    oinput[0].onblur = function() {
        var teamName = oinput[0].value.replace(/\s/ig,"");
            $.ajax
            ({
                type:'POST',
                url:'php/formname.php',
                dataType:'json',
                data:{
                    checkName:teamName
                },
                success:function(data)
                {
                    var odata = eval("("+ data +")");
                    if(teamName.length ==0){
                        otext[0].style.color ="red";	
                        otext[0].innerHTML = "\u7528\u6237\u540d\u4e0d\u80fd\u4e3a\u7a7a";
                    }else if(odata!=1){
                        otext[0].style.color ="green";
                        otext[0].innerHTML = "Ok";
                    }else{
                        otext[0].style.color ="red";
                        otext[0].innerHTML = "\u7528\u6237\u540d\u5df2\u6ce8\u518c";
                    }
                }
            });

    };


    for(var i=1;i<oinput.length;i++){
        oinput[i].index = i;
        oinput[i].onblur = function(){
            var check = this.value.replace(/\s/ig,"");
            var pattern = regExp(this.index);
            if(pattern.test(check)){
                otext[this.index].style.color = "green";
                otext[this.index].innerHTML = "Ok";
            }else{
                otext[this.index].style.color ="red";
                errorWhere(this.index);
            }
        }
    }

    obtn.onclick = function(){
        var data = [];
        for(var i=0;i<oinput.length;i++){
            data[i] = oinput[i].value.replace(/\s/ig,"");
        }
        data[6] = oselect.value;
        data[7] = oarea.value;
        $.ajax
        ({
            type:'POST',
            url:'php/formdata.php',
            dataType:'json',
            data:{
                dataName:data
            },
            success:function(data)
            {
                var odata = eval("("+ data +")");
                if(odata!=1024){
                    otext[odata].style.color ="red";
                    errorWhere(odata);
                }else{
                    $('<div class="progress-bar progress-bar-success progress-bar-striped" style="width: 25%">报名</div>').appendTo($('#show_status'));
                    $('#btn').hide();
                    $('.top-margin input').attr('disabled','disabled');
                    $('.top-margin select').attr('disabled','disabled');
                    $('.top-margin textarea').attr('disabled','disabled');
                    $('h3.text-center').html('\u62a5\u540d\u6210\u529f\uff01');
                    $('#pro').after('<div><p class="text-center text-danger">报名成功!请在比赛细则里查看初赛作品提交时间</p></div>');
                }

            }
        });
    };

    //js正则验证函数
    var regExp = function(data){
        switch(data){
            case 1:return new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2D]{1,4}$", "i");
            case 2:return new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2D]{0,4}$", "i");
            case 3:return new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2D]{0,4}$", "i");
            case 4:return new RegExp("^[0-9]{11}$", "i");
            case 5:return new RegExp("^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\.]{1})*[a-zA-Z0-9]{2,3}$", "i");
            default :return false;
        }
    };

    var errorWhere = function(data){
        switch(data){
            case 0:otext[0].innerHTML = "\u7528\u6237\u540d\u5df2\u6ce8\u518c";break;
            case 1:otext[1].innerHTML = "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u56e2\u961f\u6210\u5458";break;
            case 2:otext[2].innerHTML = "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u56e2\u961f\u6210\u5458";break;
            case 3:otext[3].innerHTML = "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u56e2\u961f\u6210\u5458";break;
            case 4:otext[4].innerHTML = "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u7535\u8bdd\u53f7\u7801";break;
            case 5:otext[5].innerHTML = "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1";break;
            case 6:otext[6].innerHTML = "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u9662\u7cfb";break;
            case 7:otext[7].innerHTML = "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u7b80\u4ecb";break;
            case 8:otext[0].innerHTML = "\u7528\u6237\u540d\u4e0d\u80fd\u4e3a\u7a7a";break;
            default :return false;
        }
    }
};