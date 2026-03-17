<?php
session_start(); // Start the session at the very top

require_once "config.php";
require '../../vendor/autoload.php';
$envPath = __DIR__ . '/../../';
if (file_exists($envPath . '.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable($envPath);
    $dotenv->load();
} else {
    error_log("⚠️ .env file not found at $envPath.env. Skipping environment load.");
}

// $dotenv = Dotenv\Dotenv::createImmutable( '../');
// $dotenv->load();

// define("BASE_PATH", dirname(__DIR__)); // One level up from /php/
$clientID = $_ENV['CLIENT_ID'];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id_token = $_POST["id_token"];

    $client = new Google_Client(['client_id' => $clientID]); // Replace this
    $payload = $client->verifyIdToken($id_token);

    if ($payload) {
        $email = $payload['email'];
        $name = $payload['name'];
        $token = bin2hex(random_bytes(16));

        // Check if user already exists
        $check_sql = "SELECT id FROM users WHERE email = ?";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bind_param("s", $email);
        $check_stmt->execute();
        $check_stmt->store_result();

        if ($check_stmt->num_rows === 0) {
	       
       
       // Insert new user
            $sql = "INSERT INTO users (username, email, password, token) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $null_password = NULL; // Since password is not used
            $stmt->bind_param("ssss", $name, $email, $null_password, $token);
            
                if ($stmt->execute()) {
                $userid = $stmt->insert_id;

		$_SESSION['username'] = $name;
                $_SESSION['user_id'] = $userid;
                $_SESSION['loggedin'] = true;

                echo "Registered Successfully";
            } else {
                echo "Error: " . $stmt->error;
            }

            $stmt->close();
        } else {
	 // Fetch user ID for session
	    
	$check_stmt->bind_result($userid);
            $check_stmt->fetch();

            $_SESSION['username'] = $name;
            $_SESSION['user_id'] = $userid;
            $_SESSION['loggedin'] = true;


		echo "User already registered.";
        }

        $check_stmt->close();
    } else {
        echo "Invalid ID token";
    }
} else {
    echo "Invalid request method.";
}
header("Location: /wireframe/setting.php");

$conn->close();
?>
