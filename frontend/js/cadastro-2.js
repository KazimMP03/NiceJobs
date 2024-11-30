// cadastro-2.js
document.querySelector('#form2 button:last-child').addEventListener('click', async function() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Verificação dos campos obrigatórios
    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Validação básica do formato do email
    const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    if (!emailValido) {
        alert("Por favor, insira um e-mail válido!");
        return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('senha', senha);

    try {
        // Enviando dados para o backend
        const response = await fetch('../../backend/controllers/create_user.php', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            alert('Cadastro concluído com sucesso!');
            window.location.href = './login.html'; // Direcionar para a tela de login
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    }
});

