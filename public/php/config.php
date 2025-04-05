<?php
require '../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable( '../../');
$dotenv->load();

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
