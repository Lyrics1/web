<?php
    $db    =    new mysqli('localhost','root','100100mxh','compition');
    if(mysqli_connect_errno()){
    	echo 'connect fail.';
    	exit;
    }
    $query    =    'select * from user';
    $result    =    $db->query($query);
    $rows    =    $result->num_rows;
    echo "<table border='1'>";
    echo "<tr><th>name</th><th>id</th><th>tel</th><th>email</th><th>major</th><th>class</th></tr>";
    	while($row  =  $result->fetch_assoc())
    		 for($i=0;$i<$rows;$i++){
    	echo "<tr><td>".$row['name']."</td><td>".$row['id']."</td><td>".$row['tel']."</td><td>".$row['email']."</td><td>".$row['major']."</td><td>".$row['class']."</td></tr>";
    }
    echo "</table>";
    $db->close();
?>