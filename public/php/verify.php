<?php
session_start();
include "config.php";

if (!isset($_GET['token'])) {
    echo "❌ Invalid verification link.";
    exit();
}

$token = $_GET['token'];

// Get user with this token
$stmt = $conn->prepare("SELECT * FROM users WHERE token = ?");
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Mark email as verified (you can use a `is_verified` column or clear the token)
    $update = $conn->prepare("UPDATE users SET email_verified = 1  WHERE token = ?");
    $update->bind_param("s", $token);
    $update->execute();

    echo "✅ Email verified successfully! You can now <a href='/index.php'>login</a>.";
} else {
    echo "❌ Invalid or expired token.";
}
?>
