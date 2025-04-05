<?php

include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    $stmt->execute() or die(mysqli_error($conn));
        header("Location: ../index.html");
      
   

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request!";
}
?>
