// Cadastro-1.js

document.querySelector('#proxima').addEventListener('click', async function() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const data_nascimento = document.getElementById('data_nascimento').value;

    if (!nome || !cpf || !data_nascimento) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('data_nascimento', data_nascimento);

    try {
        // Enviando dados para o backend
        const response = await fetch('../../backend/controllers/create_user.php', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            alert('Dados enviados com sucesso!');
            window.location.href = './cadastro-2.html';
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    }
});