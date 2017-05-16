<?php
// 得到进度状态
   $name = $_GET['teamname'];
    $db    =    new mysqli('localhost','root','100100mxh','compition');
    if(mysqli_connect_errno()){
        echo 'Error:Could not connect to databases.Please try again.';
        exit;
     }
   $query = "select * from user where name='".$name."'";
   $result = $db->query($query);
   $nums = $result->num_rows;
   while($row = $result->fetch_assoc()){
    for($i=0;$i<$nums;$i++)
    	if($name == $row['name']){
    		 return $row['process'];
    	}
    } 
?>