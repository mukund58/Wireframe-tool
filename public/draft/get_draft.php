<?php
session_start();
include "../php/config.php";

if (!isset($_SESSION["loggedin"])) {
    http_response_code(403);
    echo json_encode(["message" => "Not logged in"]);
    exit();
}

$username = $_SESSION["username"];

$stmt = $conn->prepare("SELECT id, content, created_at FROM drafts WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();
$drafts = [];

while ($row = $result->fetch_assoc()) {
    $drafts[] = $row;
}

echo json_encode($drafts);
?>
