/**
 * Created by admin on 2016/11/28.
 */
window.onload=function () {


    var point = document.getElementById("point");

    var Img = point.getElementsByTagName("img");
    var Div = point.getElementsByTagName("div");
    var userName = document.getElementById("user-name");
    var Down_up = userName.getElementsByTagName("i");
    var user_img = document.getElementById("user");
    var user_photo = document.getElementById("user_photo");
    Down_up[0].style.display = "none";

    var hidden = document.getElementById("hidden");
    var judge = true;
    var on = document.getElementById("user-information");
    var waitTime = 150;

    //user-information的出现和隐藏
    userName.onclick = function (e) {
        e = e || window.event;
        var dom = e.srcElement || e.target;
        if (dom.id == "user-name") {
            on.style.display = "none"
        }
        else {
            judge ? on.style.display = "block" : on.style.display = "none";
            judge ? Down_up[0].style.display = "block" : Down_up[0].style.display = "none"

            judge ? judge = false : judge = true;
            e.stopPropagation();
        }
    }
    //点击其他区域会隐藏user-information
    document.onclick = function (e) {
        e = e || window.event;
        var dom = e.srcElement || e.target;
        e.stopPropagation();
        if (dom.id != "user-name" && on.style.display == "block") {
            on.style.display = "none";
            Down_up[0].style.display = "none";
            judge ? judge = false : judge = true;
        }
    }

    //幻灯片的播放
    autoPlay(Img, point, Div);
    point.onmouseover = function () {
        // clearInterval(play);
    }
    point.onmouseout = function () {
        autoPlay(Img, point, Div);
    }

//歌曲的图片用json来存储
    var music=document.getElementById("music");
    var music_img=music.getElementsByTagName("img");
    var audio=music.getElementsByTagName("audio");
// alert(audio.length)
//     alert(audio[0].src)
    console.log(music_img.length);
    var song=new Array();
    music_Img(song);

   function music_Img(song) {
       var xhr=CreateXhr();
       //创建Ajex对象
       xhr.onreadystatechange=function(){
           console.log(xhr.status);
           if(xhr.status== "200" && xhr.readyState=="4"){

               console.log(JSON.parse(xhr.responseText));

               var ArrayMusicImg=JSON.parse(xhr.responseText);
               formatPlayer(ArrayMusicImg)
               var i=music_img.length;
               console.log(ArrayMusicImg[0].src);
               for(var j=0;j<i;j++){
                   music_img[this.index]=i;
                   console.log(ArrayMusicImg[j]);
                   music_img[j].src=ArrayMusicImg[j].src;
                   // song[j]=ArrayMusicImg[j].url;
                   audio[j].src=ArrayMusicImg[j].url;
                   song.push(ArrayMusicImg[j].url);
               }
           }
       }
       xhr.open("GET","../JSON/music_img.json",true);
       xhr.send(null);

   }


//-播放器初始化
    function formatPlayer(song) {
       console.log(song[3].url+"cjkdhjkshsj")       //播放音乐点击图片
        var music_img_play=document.getElementById("music");
        //播放按钮
        var I=music_img_play.getElementsByTagName("i");
        console.log(I.length);
        //显示所播放的音乐的图片
        var picture_img=document.getElementById("picture-ing").getElementsByTagName("img")[0];
        var music_name=document.getElementById("music-name");
        //显示播放音乐的名字，和歌手名
        var music_abbr=music_name.getElementsByTagName("abbr");
        console.log(music_abbr.length);
        //显示播放时间
        var show_time=document.getElementById("show-time");
        //进度条的控制和显示
        var process=document.getElementById("process");
        //底部音乐的播放暂停
        var button=document.getElementById("play");
        var PLAY=document.getElementById("Play");
        var PAUSE=document.getElementById("pause");
        var PRE=document.getElementById("pre");
        var NEXT=document.getElementById("next");
        // var Play=button.getElementsByTagName("i");
        // console.log("Play:"+Play.length)
        //0 :pre 上一首  1：播放  2：暂停 3：下一首 4:minute 5:second;

        //实现函数如下：
       //播放
       //  var Music=new MUSICENGINE(song);//
       //  Play[1].onclick=function () {
       //
       //  }
       //  var AElements=music_img_play.getElementsByTagName('*');
       //
       //  var Arrstart=new Array();
       //  for(i=0;i<AElements.length;i++)
       //  {
       //      if(AElements[i].className=='inco-color')
       //          Arrstart.push(AElements[i]);
       //  }
       //  alert(Arrstart.length)
        var Arrstart=new Array();
        var domn=document.getElementById("start");Arrstart.push(domn);
         var domna=document.getElementById("starta");Arrstart.push(domna);
        var domnb=document.getElementById("startb");Arrstart.push(domnb);
        var domnc=document.getElementById("startc");Arrstart.push(domnc);
        var domnd=document.getElementById("startd");Arrstart.push(domnd);
        var domne=document.getElementById("starte");Arrstart.push(domne);
        var domnf=document.getElementById("startf");Arrstart.push(domnf);
        var domng=document.getElementById("startg");Arrstart.push(domng);
          // console.log(Arrstart[2].src);

        var j=I.length,k=1;
        var processWidth=0;
        var timer;
        for(var i=1;i<j;){
            I[i].index=i;
            I[i].onclick=function () {
                process.style.width="0%";
                processWidth=0;
               switch(this.index)
               {
                   case 1:k=0;break;
                   case 4:k=1;break;
                   case 7:k=2;break;
                   case 10:k=3;break;
                   case 13:k=4;break;
                   case 16:k=5;break;
                   case 19:k=6;break;
                   case 22:k=7;break;
               }
                Arrstart[k].play();
                timer= setInterval(function(){
                    processWidth=processWidth+0.2;
                    process.style.width=processWidth+"%";
                },1000);
                picture_img.src=song[k].src;
                music_abbr[0].innerHTML=song[k].musicname;
                music_abbr[1].innerHTML=song[k].author;
                PLAY.style.display="none";
                PAUSE.style.display="block";
                setTimeout(function () {
                    for(var m=0;m<j/3;m++)
                    {
                        if(k!=m )
                            Arrstart[m].pause();
                    }
                },2000);

                PAUSE.onclick=function () {
                    for(i=0;i<j/3;i++)
                    {

                        Arrstart[i].pause();
                        // setTimeout(function () {
                        //     // Resume play if the element if is paused.
                        //     if (el.p) {
                        //         el.play();
                        //     }
                        // }, waitTime);
                    }
                    PLAY.style.display="block";
                    PAUSE.style.display="none";
                    // clearInterval(timer);
                };
            }
            i=i+3;
        }
        PAUSE.onclick=function () {
            for(i=0;i<j/3;i++)
            {
                Arrstart[i].pause();
            }
            PLAY.style.display="block";
            PAUSE.style.display="none";
            // clearInterval(timer);
        };
        PLAY.onclick=function () {
            Arrstart[k].play();
            PLAY.style.display="none";
            PAUSE.style.display="block";
            timer=setInterval(function(){
                processWidth=processWidth+0.2;
                process.style.width=processWidth+"%";
            },1000);
        }

    }
//寻找class属性为start
//    function  find(music,start) {
//        var AElements=music.getElementsByTagName('*');
//         var Arrstart=new Array();
//         for(i=0;i<AElements.length;i++)
//         {
//             if(AElements[i].className=='start;')
//                 Arrstart.push(AElements[i]);
//
//         }
//         alert(Arrstart.length)
//         return Arrstart;
//    }






//更换头像
    user_img.onclick = function read(e) {
        user_img.style.backgroundImage = "url(" + "../img/2.png" + ")";
        var file = this.files;
        var reader = new FileReader();//声明一个FileReader实例
        //  reader.readAsDataURL(file);  //调用readAsDataURL方法来读取选中的图像文件
        user_img.style.backgroundImage = e.target.result;
        var img_url = e.target.result;
        //user_img.style.backgroundImage="url("+img_url+")";
    }

    //返回上一页：
    var pre=document.getElementById("button1");
    //下一页
    var next=document.getElementById("button2");
    //搜索
    var search=document.getElementById("button3");
    //点击事件

    pre.onclick=function(){
       history.back();返回上一页
    }
    next.onclick=function () {
        window.history.forward();//到下一页
    }
    //点击喜欢新会变红
    var like_heart=document.getElementById("share");
    var share_like=like_heart.getElementsByTagName("i");
    //显示已经加入喜欢的音乐或者收藏成功的提示语
    var show=document.getElementById("show");
   console.log(share_like.length);
    share_like[0].onclick=function () {
        share_like[0].style.color="red";
        $(show).fadeIn(1000);
        show.style.display="block";
        //提示框消失，心的颜色变回原来的颜色
        setTimeout(function(){
            share_like[0].style.color="black";
            $(show).fadeOut(1000)
        },1000);
    }
    share_like[1].onclick=function () {
        console.log("分享");

    }



}



function autoPlay(Img,point,Div){

    play=setInterval(function (){
    var temp=Img[0].src;
    for( var i=0;i<Img.length;i++){
        Img[this.index]=i;
        var j=i+1;
        if(i+1==Img.length) {
            Img[i].src = temp;

        }
       else {
            Img[i].src=Img[j].src;
        }
    }},3000);

}
//用Ajex吧JSON文件里面的信息添加到DOM中

//创建Ajex对象
function CreateXhr() {
    if(window.XMLHttpRequest)
        return  new XMLHttpRequest();
    else return new ActiveXObject();
}
function changeW(Div){
            Div[0].style.paddingLeft =Div[0].style. paddingLeft+"1rem";
            Div[2].style.paddingRight = Div[2].style.paddingRight +"1rem"
            if( Div[4].style.left<="7rem" && Div[5].style.right<="7rem" ){
                Div[4].style.left =  Div[4].offsetLeft+10+"px";
                Div[5].style.left = parseInt(Div[4].offsetLeft)-30+"px";
            }

}


//获取页面视口的大小
function page(i){
    if(document.compatMode == "CSS1Compat"){//如果是标准模式
        pageWidth=document.documentElement.clientWidth;
        pageHeight=document.documentElement.clientHeight;
    }
    else {
        pageWidth=document.body.clientWidth;
        pageHeight=document.body.clientHeight;
    }
    if(i==1)
        return pageWidth;
    else return pageHeight;
}
