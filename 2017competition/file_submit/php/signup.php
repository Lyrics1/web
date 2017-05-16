<?php
     $tel    =    $_POST['tel'];
     $name    =    $_POST['name'];
     $email    =    $_POST['email'];
    
    //htmlspecialchars 使 > < 转化为html实体
     $tel = htmlspecialchars($tel);
     $name = htmlspecialchars($name);
     $email = htmlspecialchars($email);
    
     if(!get_magic_quotes_gpc()){
            $name    =    addslashes($name);
            $tel    =    addslashes($tel);
            $email    =    addslashes($email);
      }

     //对传送到后台的数据进行过滤
     if(!preg_match("/^1[34578]\d{9}/",$tel)){
         echo "联系方式不正确";
          exit;
     }
    /* if(!preg_match("/^[\x{4e00}-\x{9fa5}]+$/u",$name)){
         echo "姓名格式不正确";
          exit;
     }*/
     if(!preg_match("/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/", $email)){
         echo "邮箱格式不正确";
          exit;        
     }
     //连接到数据库
     $db    =    new mysqli('localhost','root','zcyzf','compition');
     if(mysqli_connect_errno()){
        echo 'Error:Could not connect to databases.Please try again.';
        exit;
     }
     //设置数据库的编码方式，以防造成前端传到数据库的中文乱码
     $db->set_charset("utf8");
     //需要修改 
     $query = "insert into compition values ('".$name."','".$email."','".$tel."')";   
    // $query = "insert into user('name','tel','email') values ('".$name."','".$tel."','".$email."')";   
    
     $result = $db->query($query);
     if($result){
     	echo "恭喜".$name."，报名成功";
     }else{
        echo "报名未成功.";
     }
     $db->close();
?>