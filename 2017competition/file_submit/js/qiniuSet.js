/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */

//qiniu set
;$(function qiniuSet(){
    var uploader = Qiniu.uploader({
        filters: {
          mime_types : [
            { title : "Zip files", extensions : "zip,rar,7z" }
          ]
        },
        multi_selection: false,
        runtimes: 'html5,flash,html4',
        browse_button: 'file',
        container: 'submit_file',
        drop_element: 'submit_file',
        max_file_size: '100mb',
        flash_swf_url: 'Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        uptoken_url:'http://www.mperson.club/qiniu/uptoken.php?callback=aaa',
       // uptoken:document.getElementById("id_token").value,
        domain:'http://omvyretsx.bkt.clouddn.com/',
        get_new_uptoken: true,
        auto_start: true,
        log_level: 5,
       init: {
            'FilesAdded': function(up, files) {
                
                    $('table').show();
                    $('#success').hide();
                    
                    plupload.each(files, function(file) {
                        var progress = new FileProgress(file, 'fsUploadProgress');
                        progress.setStatus("等待...");
                        progress.bindUploadCancel(up);
                    });
                
            },

            'BeforeUpload': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function() {
                $("#container").hide();
                $(".table-striped td:gt(1)").hide();
                $(".table-striped tr:eq(1)").append("<td>上传成功</td>:");
                $("#checkForm").css({'visibility' : 'visible' ,'background-color' : '#5cb85c', 'border-color' : '#4cae4c','color':'#fff'});
                $("#checkForm .checkInfo").text("请在此平台或者网协微信公众号上及时查询评审结果。");
                $.post("http://www.jaylanme.xyz/write!writeprogress", {'team_name': $(".form-control").val()});
                setProgress(2);
            },
            'FileUploaded': function(up, file, info) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                progress.setComplete(up, info);
            },
            'Error': function(up, err, errTip) {
                $('table').show();
                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            },
         
            'QueueChanged' : function (up, files) {    
                $.each(up.files, function (i, file) {
                    if( i > 0){
                        uploader.removeFile(file);
                        setCheckForm("拖拽多个压缩包，只接收第一个。","red");
                    }                    
                });
            }
          
        }
    });

    uploader.bind('FileUploaded', function() {
        console.log('hello man,a file is uploaded');
    });
    $('#container').on(
        'dragenter',
        function(e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        }
    ).on('drop', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragleave', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragover', function(e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
    });



    $('#show_code').on('click', function() {
        $('#myModal-code').modal();
        $('pre code').each(function(i, e) {
            hljs.highlightBlock(e);
        });
    });


    $('body').on('click', 'table button.btn', function() {
        $(this).parents('tr').next().toggle();
    });


    var getRotate = function(url) {
        if (!url) {
            return 0;
        }
        var arr = url.split('/');
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === 'rotate') {
                return parseInt(arr[i + 1], 10);
            }
        }
        return 0;
    };

    $('#myModal-img .modal-body-footer').find('a').on('click', function() {
        var img = $('#myModal-img').find('.modal-body img');
        var key = img.data('key');
        var oldUrl = img.attr('src');
        var originHeight = parseInt(img.data('h'), 10);
        var fopArr = [];
        var rotate = getRotate(oldUrl);
        if (!$(this).hasClass('no-disable-click')) {
            $(this).addClass('disabled').siblings().removeClass('disabled');
            if ($(this).data('imagemogr') !== 'no-rotate') {
                fopArr.push({
                    'fop': 'imageMogr2',
                    'auto-orient': true,
                    'strip': true,
                    'rotate': rotate,
                    'format': 'png'
                });
            }
        } else {
            $(this).siblings().removeClass('disabled');
            var imageMogr = $(this).data('imagemogr');
            if (imageMogr === 'left') {
                rotate = rotate - 90 < 0 ? rotate + 270 : rotate - 90;
            } else if (imageMogr === 'right') {
                rotate = rotate + 90 > 360 ? rotate - 270 : rotate + 90;
            }
            fopArr.push({
                'fop': 'imageMogr2',
                'auto-orient': true,
                'strip': true,
                'rotate': rotate,
                'format': 'png'
            });
        }

        $('#myModal-img .modal-body-footer').find('a.disabled').each(function() {

            var watermark = $(this).data('watermark');
            var imageView = $(this).data('imageview');
            var imageMogr = $(this).data('imagemogr');

            if (watermark) {
                fopArr.push({
                    fop: 'watermark',
                    mode: 1,
                    image: 'http://www.b1.qiniudn.com/images/logo-2.png',
                    dissolve: 100,
                    gravity: watermark,
                    dx: 100,
                    dy: 100
                });
            }

            if (imageView) {
                var height;
                switch (imageView) {
                    case 'large':
                        height = originHeight;
                        break;
                    case 'middle':
                        height = originHeight * 0.5;
                        break;
                    case 'small':
                        height = originHeight * 0.1;
                        break;
                    default:
                        height = originHeight;
                        break;
                }
                fopArr.push({
                    fop: 'imageView2',
                    mode: 3,
                    h: parseInt(height, 10),
                    q: 100,
                    format: 'png'
                });
            }

            if (imageMogr === 'no-rotate') {
                fopArr.push({
                    'fop': 'imageMogr2',
                    'auto-orient': true,
                    'strip': true,
                    'rotate': 0,
                    'format': 'png'
                });
            }
        });

        var newUrl = Qiniu.pipeline(fopArr, key);

        var newImg = new Image();
        img.attr('src', 'images/loading.gif');
        newImg.onload = function() {
            img.attr('src', newUrl);
            img.parent('a').attr('href', newUrl);
        };
        newImg.src = newUrl;
        return false;
    });

    }//qiniu set end
);

//提示框信息
 /*var checkFormText = [
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
function setCheckForm(text,color){
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
}



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
/*$("#btn").on("click",function(){
       
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
                
    });
  $("#btun").on("click",function(){
       /* if($(".form-control").val() === ""){
                setCheckForm(checkFormText[0],"red");
                }
        else{ //else if(allowUpLoad === true)
                setCheckForm();
                $.ajax({
                    url:'php/getProccess.php',
                    type: "get",
                    data:{
                        teamname:document.getElementById("teamname").value
                    },
                    //url: "http://www.jaylanme.xyz/check!checkname?team_name=" + $(".form-control").val(),
                    success : function(data){
                        var pa_progress = data;
                        if(pa_progress == "0"){

                        }
                        else if(pa_progress == "1"){
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
                        }
                    }
                });
            }
                
    });

});*/
