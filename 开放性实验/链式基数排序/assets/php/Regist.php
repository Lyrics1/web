<?php require 'db_connect.php';?>
<?php 
// 定义变量并默认设置为空值
    $name = $gender = $sno = $major = $grade = $direction = $phone_number = $status= "";

      // 使用 PHP trim() 函数去除用户输入数据中不必要的字符 (如：空格，tab，换行)。
      // 使用PHP stripslashes()函数去除用户输入数据中的反斜杠 (\)
      function test_input($data)
      {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }


      //方向转换函数
      function dirction_convert($direction)
      {

          switch ($direction) {
            case "1":
              $direction = "安全组";
              break;
            case "2":
              $direction = "Web 前端";
              break;
            case "3":
              $direction = "技术运维";
              break;
            case "4":
              $direction = "视觉设计";
              break;
         default:
           $direction = "null";
        }
      return $direction;

      }

      // 年级转换函数
      function grade_convert($grade)
      {
          switch ($grade) {
            case "13":
              $grade = "大三";
              break;
            case "14":
              $grade = "大二";
              break;
            case "15":
              $grade = "大一";
              break;
         default:
           $grade = "null";
          }
          return $grade;
      }

mysql_select_db("interview", $con);


    if ($_SERVER["REQUEST_METHOD"] == "POST")
{
      $name = test_input($_POST["name"]);
      $gender = test_input($_POST["gender"]);
      $sno = test_input($_POST["sno"]);
      $major = test_input($_POST["major"]);
      $grade = test_input($_POST["grade"]);
      $direction = test_input($_POST["direction"]);
      $phone_number = test_input($_POST["phone_number"]);
   
      if (strlen($sno) != 8 || !is_numeric($sno)){
        # code...
        $regist_status = "失败,学号格式错误";
        //方向以及年级转换
        $direction = dirction_convert($direction);
        $grade = grade_convert($grade);
      } 

        elseif (strlen($phone_number) != 11){
        # code...
        $regist_status = "失败,手机号码格式错误";
        //方向以及年级转换
        $direction = dirction_convert($direction);
        $grade = grade_convert($grade);
      } 

      // elseif (!is_numeric($sno)){
      //   # code...
      //   $regist_status = "失败,学号(输入非数字)格式错误";
      //   //方向以及年级转换
      //   $direction = dirction_convert($direction);
      //   $grade = grade_convert($grade);
      // } 

  else {
         
        //检测学号是否已经存在
        $check_query = mysql_query("SELECT studentid FROM player WHERE studentid='$sno' limit 1");
        if(mysql_fetch_array($check_query)){
          // echo '',$member_username,' 已存在。<a href="javascript:history.back(-1);">返回</a>';
          //报名结果信息和相关提示
          $regist_status = "失败,存在重复报名";
          $regist_info = "如有问题请联系官方人员";
          //方向以及年级转换
          $direction = dirction_convert($direction);
          $grade = grade_convert($grade);
          // exit;
        }

        else {

          //状态码设置为 1:报名
          $status = "1";
          //插入数据库
          $sql = "INSERT INTO player (name,gender,studentid,grade,class,tel,direction,status)
          VALUES ('$name', '$gender', '$sno','$grade','$major','$phone_number','$direction','$status')";
          if (!mysql_query($sql,$con))
            {
            die('Error: ' . mysql_error());
            }
          //报名结果信息和相关提示
          $regist_status = "成功";
          $regist_info = "报名成功,我们会尽快安排面试,请关注微信公众平台留意相关动态";
          //方向以及年级转换
          $direction=dirction_convert($direction);
          $grade = grade_convert($grade);
          //关闭数据库连接
           mysql_close($con);

            }
      }
}


?>
