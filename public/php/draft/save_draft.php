<?php
session_start();
include "../config.php";

if (!isset($_SESSION["loggedin"])) {
    http_response_code(403);
    echo json_encode(["message" => "Not logged in"]);
    exit();
}

$username = $_SESSION["username"];
$data = json_decode(file_get_contents("php://input"), true);

$content = $data["content"];

$stmt = $conn->prepare("INSERT INTO drafts (username, content) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $content);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}
?>
