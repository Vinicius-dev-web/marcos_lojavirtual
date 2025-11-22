<?php
// 🔥 CONEXÃO COM O BANCO
$conn = new mysqli("localhost", "root", "", "sua_loja");

// Verificar conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// ----------- RECEBENDO DADOS DO FORM -----------

$nome = $_POST['nome'];
$preco = $_POST['preco'];

// ----------- UPLOAD DA IMAGEM -----------

$arquivo = $_FILES['imagem'];
$pasta = "uploads/";
$nomeDoArquivo = $arquivo['name'];
$novoNome = uniqid() . "_" . $nomeDoArquivo;
$caminho = $pasta . $novoNome;

// criar pasta se não existir
if (!is_dir($pasta)) {
    mkdir($pasta, 0777, true);
}

// mover imagem
move_uploaded_file($arquivo['tmp_name'], $caminho);

// ----------- SALVAR NO BANCO -----------

$sql = "INSERT INTO produtos (nome, preco, imagem) VALUES ('$nome', '$preco', '$caminho')";

if ($conn->query($sql) === TRUE) {
    echo "Produto cadastrado com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}

$conn->close();
?>
