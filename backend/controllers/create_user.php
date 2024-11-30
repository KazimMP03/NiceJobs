<?php
require_once '../models/user_model.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? null;
    $cpf = $_POST['cpf'] ?? null;
    $data_nascimento = $_POST['data_nascimento'] ?? null;
    $email = $_POST['email'] ?? null;
    $senha = $_POST['senha'] ?? null;

    // Verificar se o CPF exite no banco de dados
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE cpf = :cpf");
    $stmt->execute([':cpf' => $cpf]);
    $cpf_exists = $stmt->fetchColumn();

    if ($cpf_exists) {
        echo json_encode(['success' => false, 'message' => 'Este CPF já está cadastrado.']);
        exit;  // Impede a execução do código abaixo se o CPF já existir
    }

    try {
        $userModel = new UserModel($pdo);
        $userModel->create($nome, $cpf, $data_nascimento, $email, $senha);
        echo json_encode(['success' => true, 'message' => 'Cadastro completo.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}
?>
