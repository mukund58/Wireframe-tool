<?php
// session_start();
include "../php/config.php";
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();
header("Content-Type: application/json");

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

// Get raw POST data
// $draft = $input['draft'] ?? '';

$input = json_decode(file_get_contents("php://input"), true);
$draft = json_encode($input['draft'] ?? []);
$title = $input['title'] ?? 'Untitled';

if (empty($draft)) {
    echo json_encode(["success" => false, "message" => "No draft data"]);
    exit;
}

// Insert into `drafts` table
$stmt = $conn->prepare("INSERT INTO drafts (user_id,title, content) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $_SESSION['user_id'],$title, $draft);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Insert failed"]);
}

$stmt->close();
$conn->close();
