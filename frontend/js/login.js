// Quando o botão de Criar Conta for clicado, redireciona para a tela de login
document.querySelector('#criar').addEventListener('click', function() {
    window.location.href = './cadastro-1.html';  // Redireciona para o login
});

// Quando o botão de Acessar for clicado, redireciona para a tela de login
document.querySelector('#acessar').addEventListener('click', async function() {
    const email = document.querySelector('#login-email').value;
    const senha = document.querySelector('#login-senha').value;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('senha', senha);

    try {
        const response = await fetch('../../backend/controllers/verify_login.php', {
            method: "POST",
            body: formData
        });        

        const data = await response.json();

        if(!data.success) {
            alert(data.message || "Erro ao efetuar login. Tente novamente!");
            return;
        }

        alert(data.message || "Login feito com sucesso!");
        window.location.href = './home.html';

    } catch (error) {
        console.error("Erro ao conectar-se ao servidor", error);
    }
});