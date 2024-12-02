// cadastro-2.js

// Quando o botão de Cancelar for clicado, redireciona para a tela de login
document.querySelector('#cancelar').addEventListener('click', function() {
    window.location.href = './login.html';  // Redireciona para o login
});

// Quando o botão de Criar Conta for clicado, executa o código
document.querySelector('#finalizar').addEventListener('click', async function() {
    const nome = sessionStorage.getItem('nome');
    const cpf = sessionStorage.getItem('cpf');
    const data_nascimento = sessionStorage.getItem('data_nascimento');
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Se não tiver digitado, email e senha, manda mensagem e retorna
    if (!email || !senha) {
        alert("Por favor, preencha o email e a senha!");
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('data_nascimento', data_nascimento);
    formData.append('email', email);
    formData.append('senha', senha);

    const finalizarBtn = document.querySelector('#finalizar');
    finalizarBtn.disabled = true; // Evita múltiplos clicks 

    // Try para tentar fazer a conexão com o banco de dados
    try {
        const response = await fetch('../../backend/controllers/create_user.php', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message || "Erro ao cadastrar. Tente novamente!");
            return;
        }

        alert(data.message || "Cadastro feito com sucesso!");
        window.location.href = "./login.html";

    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    } finally {
        finalizarBtn.disabled = false; // Reativar o botão
    }
});
