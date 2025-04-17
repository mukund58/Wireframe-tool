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
                $_SESSION['user_id'] = $row['id'];
                if(isset($_POST['remember_me']))
                {
                    setcookie("remember_token", $row['token'], time() + 604800, "/");
                }
                
                header("Location: /wireframe/setting.php");
                exit;
            } else {
                $showError = "Invalid Password";
                $_SESSION['showError'] = $showError;
            }
            
            // $token = row['token'];
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
