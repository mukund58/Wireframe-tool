<?php
session_start();

include "../php/config.php"; // Your DB connection

// require '../../vendor/autoload.php'; // Composer autoload
// require_once '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


// Make sure user is logged in
if (!isset($_SESSION['username'])) {
    echo 'User not logged in. <a href="/index.php">Login</a>';
    exit();
}
// if (empty($user['token'])) {
    $token = bin2hex(random_bytes(16));
    // $update = $conn->prepare("UPDATE users SET token = ? WHERE username = ?");
    $username = $_SESSION["username"]; // move this above
$token = bin2hex(random_bytes(16));
$update = $conn->prepare("UPDATE users SET token = ? WHERE username = ?");
$update->bind_param("ss", $token, $username);

    $update->execute();
    
// } else {
    // $token = $user['token'];
// }

$username = $_SESSION["username"];

// Get user info from DB
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "User not found.";
    exit();
}

$user = $result->fetch_assoc();
$email = $user['email'];
$token = $user['token']; // Make sure you store this token during registration
// echo $email;
// Create a verification link
$verifyLink = "http://localhost/php/verify.php?token=$token";

$mail = new PHPMailer(true);
try {
    // SMTP settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['GB_EMAIL']; // Replace with your email
    $mail->Password = $_ENV['GB_PASS'];;    // App password
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('nick2uv@gmail.com', 'Wireframe Tool');
    $mail->addAddress($email, $username); // User’s email from DB

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Please verify your email';
    $mail->Body    = "Click this link to verify your email:<br><a href='$verifyLink'>$verifyLink</a>";

    $mail->send();
    echo "✅ Verification email sent to $email! <a href='/wireframe/setting.php'>Dashboard</a>";} 
    catch (Exception $e) {
    echo '❌ Email could not be sent. Error: {$mail->ErrorInfo} <a href="/wireframe/setting.php">Dashboard</a>';
}

?>
