<?php
require __DIR__ . '/../../vendor/autoload.php';

$envPath = __DIR__ . '/../../';
if (file_exists($envPath . '.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable($envPath);
    $dotenv->load();
} else {
    error_log("⚠️ .env file not found at $envPath.env. Skipping environment load.");
}

// $dotenv = Dotenv\Dotenv::createImmutable( '../../');
// $dotenv->load();

define("BASE_PATH", dirname(__DIR__)); // One level up from /php/

$servername = $_ENV['DB_HOST'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$dbname = $_ENV['DB_NAME'];
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    // echo "Connected successfully";
}

?>
