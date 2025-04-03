<?php
session_start();
session_destroy();
setcookie("user", "", time() - 3600, "/"); // Clear the cookie upon logout

header("Location: ../index.php");
exit();
?>
