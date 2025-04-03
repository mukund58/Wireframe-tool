<?php
session_start();
include __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (empty($email) || empty($password)) {
        $_SESSION['login_err_msg'] = "Email and Password are required.";
        header("Location: ../index.php");
        exit();
    }

    $password = md5($password);

    $sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $email, $password);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_array($result);
        $_SESSION['username'] = $row['username'];
        $_SESSION['userid'] = $email;
        header("Location: /wireframe/setting.php");
        exit();
    } else {
        $_SESSION['login_err_msg'] = "Incorrect Email id or Password";
        $_SESSION['email'] = $email;
        header("Location: ../index.php");
        exit();
    }
}
?>
