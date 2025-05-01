<?php
session_start();
require_once '../php/config.php'; // Database connection
require_once '../../vendor/autoload.php'; // PHPMailer autoload

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Check if user is logged in
if (!isset($_SESSION['username'])) {
    echo 'User not logged in. <a href="/index.php">Login</a>';
    exit();
}

$username = $_SESSION['username'];

// Generate a token
$token = bin2hex(random_bytes(16));

// Update token in the database
$update = $conn->prepare("UPDATE users SET token = ? WHERE username = ?");
$update->bind_param("ss", $token, $username);
$update->execute();
$update->close();

// Fetch updated user info
$stmt = $conn->prepare("SELECT email FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "❌ User not found.";
    exit();
}

$user = $result->fetch_assoc();
$email = $user['email'];
$stmt->close();

// Construct verification link
$verifyLink = "http://mukund.xyz/php/verify.php?token=$token";

// Send verification email
$mail = new PHPMailer(true);

try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['GB_EMAIL']; // Gmail address from .env
    $mail->Password   = $_ENV['GB_PASS'];  // App password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom($_ENV['GB_EMAIL'], 'Wireframe Tool');
    $mail->addAddress($email, $username);

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'Verify your email for Wireframe Tool';
    $mail->Body    = "
        <p>Hello <b>$username</b>,</p>
        <p>Thank you for registering. Please click the link below to verify your email:</p>
        <p><a href='$verifyLink'>$verifyLink</a></p>
        <br>
        <p>If you did not sign up, please ignore this email.</p>
        <hr>
        <small>This is an automated message from Wireframe Tool.</small>
    ";
    $mail->AltBody = "Hello $username,\n\nClick the link to verify your email: $verifyLink";

    $mail->send();
    echo "✅ Verification email sent to <b>$email</b>! <a href='/wireframe/setting.php'>Go to Dashboard</a>";
} catch (Exception $e) {
    echo "❌ Email could not be sent. Mailer Error: <b>" . $mail->ErrorInfo . "</b> <a href='/wireframe/setting.php'>Go to Dashboard</a>";
}
?>

