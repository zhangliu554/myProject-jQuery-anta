<?php
  header("Content-Type: text/html; charset=utf8");
  $name=$_POST['username'];//post获取表单里的name
  $password=$_POST['password'];//post获取表单里的password
  // $userID=$_REQUEST['userID'];//post获取的ID
  $server="localhost";//主机的IP地址，也可以选填127.0.0.1
  $db_username="root";//数据库用户名
  $db_password="root";//数据库密码
  $conn = mysql_connect($server,$db_username,$db_password);//连接数据库
  if(!$conn){
    die("can't connect".mysql_error());//如果连接失败输出错误
  }
  mysql_select_db('anta',$conn);//选择数据库
  $result = mysql_query("select * from login where username = '$name' And password = '$password'",$conn);
  // 返回用户名与密码
  if(mysql_num_rows($result) == 1){
    $obj = mysql_fetch_assoc($result);
    echo $obj["username"]." ".$obj["userID"];
    // echo 1;
  }else{
    echo 0;
  }
  mysql_close($conn);//关闭数据库
?>