/**
 * Created by admin on 2016/11/28.
 */
window.onload=function () {

    alert("1");
    // width.style.minWidth=window.outerWidth;
    //var headW=document.getElementById("header");
    //header.style.width=pageWidth;
    var img=document.getElementById("point").getElementsByTagName("img");
    alert(img.length);


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
