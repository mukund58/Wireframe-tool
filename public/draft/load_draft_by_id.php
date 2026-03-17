<?php
session_start();
include "../php/config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

if (!isset($_GET['draft_id'])) {
    echo json_encode(["success" => false, "message" => "Missing draft ID"]);
    exit;
}

$draft_id = intval($_GET['draft_id']);
$uid = $_SESSION['user_id'];

// $conn = new mysqli("localhost", "root", "", "wireframe");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database error"]);
    exit;
}

$stmt = $conn->prepare("SELECT content FROM drafts WHERE id = ? AND user_id = ?");
$stmt->bind_param("ii", $draft_id, $uid);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 1) {
    $stmt->bind_result($draft_data);
    $stmt->fetch();
    echo json_encode(["success" => true, "draft_data" => $draft_data]);
} else {
    echo json_encode(["success" => false, "message" => "Draft not found"]);
}

$stmt->close();
$conn->close();
?>