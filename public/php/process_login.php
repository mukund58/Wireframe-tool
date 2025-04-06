<?php
session_start(); // Start the session at the very top
$login = false;
$showError = false;

$_SESSION['loggedin'] = $login ;
$_SESSION['showError'] = $showError ;

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
                $showError = "Invalid Password";
                $_SESSION['showError'] = $showError;
            }
            if (isset($row['remember'])) {
                setcookie("username", $username, time() + (86400 * 30), "/"); // 30 days
                // setcookie("password", $password, time() + (86400 * 30), "/"); // Not recommended to store plain password
            } else {
                // Remove cookies if unchecked
                // setcookie("username", "", time() - 3600, "/");
                // setcookie("password", "", time() - 3600, "/");
            }
        } else {
            $showError = "Invalid Username";
            $_SESSION['showError'] = $showError;
        }
        
        $stmt->close();
    } else {
        $showError = "Database error: " . $conn->error;
    }

    header("Location: /wireframe/setting.php");
    $conn->close();
}
?>
