<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $token = bin2hex(random_bytes(16)); // or use uniqid('', true)

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert into users table
    $sql = "INSERT INTO users (username, email, password,token) VALUES (?, ?, ?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $username, $email, $hashed_password,$token);
    
    // echo "Alreay used email";
    if ($stmt->execute()) {
        $userid = $stmt->insert_id;

        // Insert into user_info table with just user_id for now
        $info_sql = "INSERT INTO user_info (user_id) VALUES (?)";
        $info_stmt = $conn->prepare($info_sql);
        $info_stmt->bind_param("i", $userid);
        $info_stmt->execute();
        $info_stmt->close();

        header("Location: ../index.html");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request!";
}
?>

