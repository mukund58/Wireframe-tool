<?php
session_start();
include "config.php";

if (!isset($_SESSION['loggedin']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'];
$content = $data['content'];
$user = $_SESSION['id']; // assuming you store user id in session

$stmt = $conn->prepare("INSERT INTO drafts (user_id, title, content) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $user, $title, $content);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
