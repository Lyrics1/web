<?php require 'db_connect.php'?>
<?php
    $check = $_POST['checkName'];
    $db = new db();
    $db->setString($check);
    $db ->setAttribute(PDO::ATTR_CASE,PDO::CASE_UPPER);
    $statement = $db ->sel("select team_name from signup where team_name = :check;");
    $statement ->bindParam(":check",$check);
    $statement ->execute();
    $statement ->setFetchMode(PDO::FETCH_NUM);
    $result_arr = $statement->fetchAll();
    if($result_arr){
        echo json_encode(1);
    }else{
        echo json_encode(2);
    }





