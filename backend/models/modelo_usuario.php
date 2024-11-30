<?php
require_once '../config/db.php';

class UserModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function create($nome, $cpf, $data_nascimento, $email, $senha) {
        $sql = "INSERT INTO users (nome, cpf, data_nascimento, email, senha) VALUES (:nome, :cpf, :data_nascimento, :email, :senha)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':nome' => $nome,
            ':cpf' => $cpf,
            ':data_nascimento' => $data_nascimento,
            ':email' => $email,
            ':senha' => password_hash($senha, PASSWORD_BCRYPT),
        ]);
    }
}
?>
