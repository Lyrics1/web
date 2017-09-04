<?php require 'assets/php/db_connect.php';?>
<?php mysql_select_db("interview", $con); ?>
<?php 
 $name = $gender = $sno = $major = $grade = $direction = $phone_number = $status= $status_no = $data = "";
 $a = $b = $c = $d = $e = $f = $g = $h = "";

$a = '<div class="progress-bar progress-bar-success progress-bar-striped" style="width: 10%">报名</div>';
$b = '<div class="progress-bar progress-bar-info progress-bar-striped" style="width: 10%">签到</div>';
$c = '<div class="progress-bar progress-bar-info progress-bar-striped" style="width: 20%">一面完</div>';
$d = '<div class="progress-bar progress-bar-success progress-bar-striped" style="width: 15%">一面过</div>';
$e = '<div class="progress-bar progress-bar-danger progress-bar-striped" style="width: 20%">一面未过</div>';
$f = '<div class="progress-bar progress-bar-info progress-bar-striped" style="width: 25%">二面完</div>';
$g = '<div class="progress-bar progress-bar-danger progress-bar-striped" style="width: 20%">二面未过</div>';
$h = '<div class="progress-bar progress-bar-success progress-bar-striped" style="width: 20%">二面过</div>';
$i = '<div class="progress-bar progress-bar-danger progress-bar-striped" style="width: 100%">尚未报名</div>';
$j = '<div class="progress-bar progress-bar-danger progress-bar-striped" style="width: 100%">请补全相关信息</div>';

// 状态码转换函数
function status_convert($data)
{

//使用全局变量
global $a,$b,$c,$d,$e,$f,$g,$h,$i,$j;

		switch ($data) {
					case "1":
						$data = $a;
						break;

					case "2":
						$data = $a.$b;
						break;
					case "3":
						$data = $a.$b;
						break;
					case '4':
						$data = $a.$b;
						break;
					case "5":
						$data = $a.$b;
						break;
					case "6":
						$data = $a.$b;
						break;
					case "7":
						$data = $a.$b;
						break;
					case "8":
						$data = $a.$b.$c;
						break;
					case "9":
						$data = $a.$b.$d;
						break;	
					case "10":
						$data = $a.$b.$d;
						break;	
					case "11":
						$data = $a.$b.$d.$f;
						break;				
					case "12":
						$data = $a.$b.$c.$d;
						break;		
					case "13":
						$data = $a.$b.$c.$e;
						break;	
					case "14":
						$data = $a.$b.$c.$d.$f.$h;
						break;
					case "15":
						$data = $a.$b.$c.$d.$f.$g;
						break;
		default:
		# 尚未报名
		$data = $i;
	}
  		return $data;
}

				
					
				// 如果接收到前台 REQUEST 请求
				if(isset($_REQUEST['name']) && isset($_REQUEST['sno']) && $_REQUEST['sno']!="" && $_REQUEST['name']!="")
						{	



							//接收前台请求数据
								$name = $_REQUEST['name'];
								$sno  = $_REQUEST['sno'];


									//查询状态
									$status_query=mysql_query("SELECT status FROM player WHERE studentid ='$sno' AND name = '$name' ")or die(mysql_error());
									$row=mysql_fetch_array($status_query);
									$num_row = mysql_num_rows($status_query);

							//如果存在该学号和姓名
							if ($num_row > 0) {
									//定义状态码$status_no
									$status_no = $row['status'];	
								
									//打印状态信息							
									$status_info = status_convert($status_no);
									echo $status_info;
									}
							// 否则尚未报名
							else { echo $i;}


					}

				else { echo $j;}
?>