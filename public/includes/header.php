<?php
session_start(); // Start session for login status check
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wireframe Tool</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>

<header>
    <nav>
        <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="wireframe/editor.php">Editor</a></li>
            <li><a href="wireframe/profile.php">Profile</a></li>
            <li><a href="wireframe/setting.php">Settings</a></li>
            <?php if (isset($_SESSION['user_id'])): ?>
                <li><a href="auth/logout.php">Logout</a></li>
            <?php else: ?>
                <li><a href="auth/login.php">Login</a></li>
            <?php endif; ?>
        </ul>
    </nav>
</header>

