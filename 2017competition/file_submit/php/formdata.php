<?php require 'db_connect.php'?>
<?php
$data = $_POST['dataName'];
$db = new db();

//后台判断用户名可用�
$data[0] = preg_replace("/\s/","",$data[0]);
//判断用户名是否为空
if(!$data[0]){
      echo json_encode(8);
      exit();
}
for($i=0;$i<8;$i++){
      $db ->setString($data[$i]);
}
$db ->setAttribute(PDO::ATTR_CASE,PDO::CASE_UPPER);
$statement = $db ->sel("select team_name from signup where team_name = :check;");
$statement ->bindParam(":check",$data[0]);
$statement ->execute();
$statement ->setFetchMode(PDO::FETCH_NUM);
$result_arr = $statement->fetchAll();
if($result_arr){
      echo json_encode(0);
      exit();
}

//正则匹配函数���
function regExp($data,$i){
      switch($i){
            case 1:return preg_match("/^[\x{4e00}-\x{9fa5}]{1,4}$/u",$data);
            case 2:return preg_match("/^[\x{4e00}-\x{9fa5}]{0,4}$/u",$data);
            case 3:return preg_match("/^[\x{4e00}-\x{9fa5}]{0,4}$/u",$data);
            case 4:return preg_match("/^[0-9]{11}$/i",$data);
            case 5:return preg_match("/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\.]{1})*[a-zA-Z0-9]{2,3}$/i",$data);
            default :return true;
      }
};
//验证数据
for($i=1;$i<7;$i++){
      $result = regExp($data[$i],$i);
      if(!$result){
            echo json_encode($i);
            exit();
      }
}

$db ->setAttribute(PDO::ATTR_CASE,PDO::CASE_UPPER);
$statement =  $db ->exec("insert into signup (team_name,member_1,member_2,member_3,tel,email,department,info,progress)
      values (:data0,:data1,:data2,:data3,:data4,:data5,:data6,:data7,1);");
$statement ->bindParam(":data0",$data[0]);
$statement ->bindParam(":data1",$data[1]);
$statement ->bindParam(":data2",$data[2]);
$statement ->bindParam(":data3",$data[3]);
$statement ->bindParam(":data4",$data[4]);
$statement ->bindParam(":data5",$data[5]);
$statement ->bindParam(":data6",$data[6]);
$statement ->bindParam(":data7",$data[7]);
$statement ->execute();
echo json_encode(1024);

