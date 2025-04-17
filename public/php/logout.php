<?php
session_start();
session_destroy();

// if (isset($_COOKIE["username"])) {
//     setcookie("username", "", time() - 3600, "/"); // Expire the cookie
// }

header("Location: ../index.php");
exit();
?>