<?php
session_start();
include "../php/config.php";
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$draft_id = intval($data['draft_id']);
$draft_data = $data['draft_data'];
$user_id = $_SESSION['user_id'];

// $conn = new mysqli("localhost", "root", "", "wireframe");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB error"]);
    exit;
}

// Update only if draft belongs to current user
$stmt = $conn->prepare("UPDATE drafts SET content = ?, created_at = NOW() WHERE id = ? AND user_id = ?");
$stmt->bind_param("sii", $draft_data, $draft_id, $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update"]);
}

$stmt->close();
$conn->close();

?>