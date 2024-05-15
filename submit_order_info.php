<?php
$email = $_POST['email'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$phone = $_POST['phone'];
$total_price = $_POST['total_price'];
$status = 0;
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "assignment2";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO orders (customer_email, rent_start_date, rent_end_date, price , status, mobile_number, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $email, $start_date, $end_date, $total_price, $status, $phone, $first_name, $last_name);
$stmt->execute();

$stmt->close();
$conn->close();

?>

