<?php
    
     $name    =    $_POST['name'];
     $pass    =    $_POST['pass'];
    
    //htmlspecialchars 使 > < 转化为html实体

     $name = htmlspecialchars($name);
     $pass = htmlspecialchars($pass);
    
     if(!get_magic_quotes_gpc()){
            $name    =    addslashes($name);
           
            $pass    =    addslashes($pass);
      }

     //对传送到后台的数据进行过滤
    
  
   //  /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/
     if(!preg_match("/^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/",$name)){
         echo "用户名格式不正确";
         exit;
     }
     if(!preg_match("/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$ / ", $pass)){
         echo "密码格式不正确";
          exit;        
     }
     //连接到数据库
     $db    =    new mysqli('localhost','root','zcyzf','ttms');
     if(mysqli_connect_errno()){
        echo 'Error:Could not connect to databases.Please try again.';
        exit;
     }
     //设置数据库的编码方式，以防造成前端传到数据库的中文乱码
     $db->set_charset("utf8");
     //需要修改 
     $state = "1";
     $query = "insert into login values ('".$name."','".$pass."')";   
    
     $result = $db->query($query);
     if($result){
     	echo "成功";
     }else{
        echo "未成功.";
     }
     $db->close();
?>