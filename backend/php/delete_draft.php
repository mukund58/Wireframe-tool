<?php
include 'db_connection.php';

$id = $_POST['id'];

$sql = "DELETE FROM drafts WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

$response = array();
if ($stmt->execute()) {
    $response['status'] = 'success';
    $response['message'] = 'Draft deleted successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to delete draft';
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
