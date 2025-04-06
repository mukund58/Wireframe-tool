<?php
session_start();
include "config.php";

if (!isset($_SESSION['loggedin']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo json_encode(['success' => false]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id']);
$title = $data['title'];
$content = $data['content'];
$user = $_SESSION['id'];

$stmt = $conn->prepare("UPDATE drafts SET title = ?, content = ? WHERE id = ? AND user_id = ?");
$stmt->bind_param("ssii", $title, $content, $id, $user);

echo json_encode(['success' => $stmt->execute()]);
?>