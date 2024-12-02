<?php
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? null;
    $senha = $_POST['senha'] ?? null;

    if (!$email || !$senha) {
        echo json_encode(['success' => false, 'message' => 'Email e senha são obrigatórios.']);
        exit;
    }
    // echo "Email: $email\n";
    // echo "Senha: $senha\n";

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(['success' => false, 'message' => 'Usuário não encontrado.']);
            exit;
        }

        if ($senha !== $user['senha']) {
            echo json_encode(['success' => false, 'message' => 'Senha incorreta.']);
            exit;
        }

        echo json_encode(['success' => true, 'message' => 'Login realizado com sucesso.']);

    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
}
