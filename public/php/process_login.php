<?php
session_start();
include __DIR__ . "/php/config.php";

if (isset($_POST['submit'])) {    // if Form is submitted

    $email = trim($_POST['email']);
	$password = trim($_POST['password']);
	$password = md5($password);

	$sql = "select * from users where email = '$email' and password = '$password'";
	$result = mysqli_query($conn,$sql);

    if (mysqli_num_rows($result) > 0) {

        $row = mysqli_fetch_array($result);
		$_SESSION['username'] = $row['username'];
		$_SESSION['userid'] = $email;
		header("location:/wireframe/setting.php");
	}
	else {
		$_SESSION['email'] = $email;
		$_SESSION['login_err_msg'] = "Incorrect Email id or Password";
		header("location:index.php");
	}
}
?>