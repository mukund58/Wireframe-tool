<?php
//define("BASE_PATH", dirname(__DIR__)); // One level up from /php/
$servername = "localhost";
$username = "root";
$password = "bundb";
$dbname = "wireframedb";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    // echo "Connected successfully";
}

?>
