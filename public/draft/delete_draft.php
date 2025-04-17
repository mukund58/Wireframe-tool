<?php
session_start();
include "../php/config.php";
if (!isset($_SESSION['user_id'])) {
    die("Access denied: not logged in.");
}

if (!isset($_GET['id'])) {
    die("No draft ID provided.");
}

$draft_id = intval($_GET['id']);
$user_id = $_SESSION['user_id'];

// $conn = new mysqli("localhost", "root", "", "wireframe");

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Only delete if the draft belongs to the user
$stmt = $conn->prepare("DELETE FROM drafts WHERE id = ? AND user_id = ?");
$stmt->bind_param("ii", $draft_id, $user_id);

if ($stmt->execute()) {
    // Redirect back to the drafts list or dashboard
    header("Location: ../wireframe/draft.php"); // Change path to your drafts page
    exit;
} else {
    echo "Error deleting draft.";
}

$stmt->close();
$conn->close();
