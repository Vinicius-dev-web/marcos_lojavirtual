<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "loja";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}


// -------------------------
// LISTAR PRODUTOS (GET)
// -------------------------
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT * FROM produtos";
    $result = $conn->query($sql);

    $produtos = [];
    while($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }

    echo json_encode($produtos);
}


// -------------------------
// CADASTRAR PRODUTO (POST)
// -------------------------
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $nome = $data["nome"];
    $preco = $data["preco"];

    $sql = "INSERT INTO produtos (nome, preco) VALUES ('$nome', '$preco')";

    if ($conn->query($sql)) {
        echo json_encode(["status" => "ok", "id" => $conn->insert_id]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
}
?>
