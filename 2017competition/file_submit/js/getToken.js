(function(){
	$.ajax({
        url:'http://www.mperson.club/qiniu/uptoken.php',
        type:'get',
        dataType:'jsonp',
        crossDomain:true,
        jsonp:'callback',
        jsonpCallback:'Alert',
        success:function(data){
        	document.getElementById("id_token").value = data.token;
        },
        error:function(jqxhr,statetext,state){
               alert(statetext);
         }
	})
})();