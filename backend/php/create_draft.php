<?php
include 'db_connection.php';

$title = $_POST['title'];
$content = $_POST['content'];

$sql = "INSERT INTO drafts (title, content) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $title, $content);

$response = array();
if ($stmt->execute()) {
    $response['status'] = 'success';
    $response['id'] = $stmt->insert_id;
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to create draft';
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
