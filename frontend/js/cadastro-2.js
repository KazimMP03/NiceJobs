// cadastro-2.js

// Quando o botão de Cancelar for clicado, redireciona para a tela de login
document.querySelector('#cancelar').addEventListener('click', function() {
    window.location.href = './login.html';  // Redireciona para o login
});

document.querySelector('#finalizar').addEventListener('click', async function() {
    const nome = sessionStorage.getItem('nome');
    const cpf = sessionStorage.getItem('cpf');
    const data_nascimento = sessionStorage.getItem('data_nascimento');
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

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

    // Comentei pois response era para debuggar
    try {
        // const response = 
        await fetch('../../backend/controllers/create_user.php', {
            method: 'POST',
            body: formData,
        });

        // Log para ver a resposta bruta
        // const responseText = await response.text();
        // console.log('Resposta bruta do servidor:', responseText);

        // Tente analisar a resposta como JSON
        // const data = JSON.parse(responseText);

    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    }

    alert('Cadastro completo!');

    window.location.href = './login.html';
});
