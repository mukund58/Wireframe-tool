<?php
include 'db_connection.php';

$id = $_POST['id'];
$title = $_POST['title'];
$content = $_POST['content'];

$sql = "UPDATE drafts SET title = ?, content = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $title, $content, $id);

$response = array();
if ($stmt->execute()) {
    $response['status'] = 'success';
    $response['message'] = 'Draft updated successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to update draft';
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
