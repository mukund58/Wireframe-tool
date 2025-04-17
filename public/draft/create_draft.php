<?php
session_start();
include "../php/config.php";

if (!isset($_SESSION['loggedin'])) {
    header("location:/index.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uid = $_SESSION['user_id'];
    $title = trim($_POST['draft_title']);

    if (!empty($title)) {
        $stmt = $conn->prepare("INSERT INTO drafts (user_id, title, created_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("is", $uid, $title);

        if ($stmt->execute()) {
            header("Location: ../wireframe/draft.php?success=Draft created successfully");
        } else {
            header("Location: ../wireframe/draft.php?error=Failed to create draft");
        }

        $stmt->close();
    } else {
        header("Location: ../wireframe/draft.php?error=Title cannot be empty");
    }
} else {
    header("Location: ../wireframe/draft.php");
}
?>