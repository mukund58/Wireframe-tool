<?php
include 'db_connection.php';

$sql = "SELECT * FROM drafts";
$result = $conn->query($sql);

$drafts = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $drafts[] = $row;
    }
}

echo json_encode($drafts);

$conn->close();
?>
