<?php 
    header("Content-Type: text/html; charset=utf8");
    $name=$_REQUEST['username'];//post获取表单里的name
    $password=$_REQUEST['password'];//post获取表单里的password
    $userID=$_REQUEST['userID'];//post获取的ID
    $server="localhost";//主机的IP地址，也可以选填127.0.0.1
    $db_username="root";//数据库用户名
    $db_password="root";//数据库密码
    $conn = mysql_connect($server,$db_username,$db_password);//连接数据库
    if(!$conn){
      die("can't connect".mysql_error());//如果连接失败输出错误
    }
    mysql_select_db('anta',$conn);//选择数据库
    $result = mysql_query("select * from login where username = '$name'",$conn);
    // $result2 = mysql_query("select * from login where",$conn);
    // 判断用户名是否存在 
    if(mysql_num_rows($result) == 1){
      echo 0;
    }else{
      $result2 = mysql_query("select * from login where userID = '$userID'",$conn);
      while(mysql_num_rows($result2) == 1){
        $userID = $userID+1;
      }
      $q="insert into login(userID,username,password) values ('$userID','$name','$password')";//向数据库插入表单传来的值的sql
      $reslut=mysql_query($q,$conn);//执行sql
      echo 1;
      
    }
    mysql_close($conn);//关闭数据库
?>

