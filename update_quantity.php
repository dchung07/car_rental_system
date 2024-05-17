<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$userQuantity = $data['userQuantity'];

if ($id === null) {
    echo json_encode(['success' => false, 'message' => 'ID is missing']);
    exit();
}

$filePath = 'cars.json';
$jsonData = json_decode(file_get_contents($filePath), true);

$found = false;
foreach ($jsonData as &$item) {
    if ($item['id'] == $id) {
        $item['quantity'] -= $userQuantity;
        if($item['quantity'] <= 0) {
            $item['availability'] = false;
        }
        $found = true;
        break;
    }
}

if ($found) {
    file_put_contents($filePath, json_encode($jsonData, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'ID not found']);
}
?>
