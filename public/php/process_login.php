<?php
session_start(); // Start the session at the very top

$login = false;
$showError = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'config.php';

    $username = $_POST["username"];
    $password = $_POST["password"];

    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    if ($stmt) {
        $stmt->bind_param("s", $username);
        $stmt->execute();

        $result = $stmt->get_result();
        $num = $result->num_rows;

        if ($num === 1) {
            $row = $result->fetch_assoc();

            // Verify the hashed password
            if (password_verify($password, $row['password'])) {
                // Password matched, start session
                $_SESSION['loggedin'] = true;
                $_SESSION['username'] = $username;
                header("Location: /wireframe/setting.php");
                exit;
            } else {
                $showError = "Invalid Credentials";
            }
        } else {
            $showError = "Invalid Credentials";
        }

        $stmt->close();
    } else {
        $showError = "Database error: " . $conn->error;
    }

    $conn->close();
}
?>
