<?php
    $name = $_GET['name'];

    $db    =    new mysqli('localhost','root','zcyzf','compition');
     if(mysqli_connect_errno()){
        echo 'Error:Could not connect to databases.Please try again.';
        exit;
     }



     $db -> query("SET　NAMES UTF8");
    $query = 'select name from compition';
    $result = $db->query($query);
    


    $nums = $result->num_rows;
    while($row = $result->fetch_assoc()){
    for($i=0;$i<$nums;)
    	if($name != $row['name']){
    		$i++;
    	}else{
           echo '团队已报名';
           exit;
    	}
    } 
    echo '该团队没有报名,请先报名';
?>