<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "assignment2";

$conn = new mysqli($servername, $username, $password, $dbname);

$sql_update = "UPDATE orders SET status = 1 WHERE order_id = (SELECT MAX(order_id) FROM orders)";
$stmt = $conn->prepare($sql_update);

if ($stmt === FALSE) {
    echo json_encode(["error" => "Failed to prepare statement: " . $conn->error]);
} else {
    if ($stmt->execute() === TRUE) {
        echo json_encode(["message" => "Status updated successfully"]);
    } else {
        echo json_encode(["error" => "Failed to update status: " . $stmt->error]);
    }
    $stmt->close();
}


$conn->close();
?>
