// cadastro-1.js

// Função para aplicar a máscara de CPF
function mascaraCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Aplica a máscara
    return cpf;
}

// Função para remover a máscara do CPF
function removerMascaraCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    return cpf;
}

// Adiciona a máscara de CPF no campo de entrada
document.getElementById('cpf').addEventListener('input', function(event) {
    event.target.value = mascaraCPF(event.target.value);
});

document.querySelector('#proxima').addEventListener('click', async function() {
    const nome = document.getElementById('nome').value;
    let cpf = document.getElementById('cpf').value;
    const data_nascimento = document.getElementById('data_nascimento').value;

    // Verifica se os campos estão preenchidos
    if (!nome || !cpf || !data_nascimento) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Remove a máscara do CPF antes de enviar
    cpf = removerMascaraCPF(cpf);

    // Salva os dados na sessionStorage para mandar para cadastro 2
    sessionStorage.setItem('nome', nome);
    sessionStorage.setItem('cpf', cpf);
    sessionStorage.setItem('data_nascimento', data_nascimento);
    
    // Redireciona para cadastro-2
    window.location.href = './cadastro-2.html';
});
