//FORMULARIO DO CPF
const formatarCPF = (campoInput) => {
    let cpf = campoInput.value;
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length > 3 && cpf.length <= 6) {
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    } else if (cpf.length > 6 && cpf.length <= 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    } else if (cpf.length > 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } 
    campoInput.value = cpf;
};
const validarCPF = () => {
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        console.log(ok);
        alert("CPF inválido! Insira o CPF no formato correto: 999.999.999-99");
        return false;
    }
    return true;
};

//FORMULARIO DO VALOR DA RECARGA
const formatarRecarga = (campoInput) => {
    let valor = campoInput.value;
    valor = valor.replace(/[^\d,]/g, ''); 
    valor = valor.replace(/(\.,*)\./g, '$1'); 
    campoInput.value = valor;
};

//ATUALIZAR O VALOR DE ACORDO COM O PACOTE
function atualizarValor(novoValor) {
    document.getElementById('valor').value = novoValor;
}


//COMANDA REALIZAR A RECARGA
async function efetuarRecarga() {
    var cpf = document.getElementById('cpf').value;
    var valor = document.getElementById('valor').value;

    if (!validarCPF(cpf)) {
        alert('CPF inválido. Por favor, verifique e tente novamente.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/recargas/recarregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf, valor }),
        });

        if (response.ok) {
            alert('Recarga efetuada com sucesso!');
        } else {
            alert('Erro ao efetuar recarga. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao enviar dados para o servidor:', error);
        alert('Erro ao efetuar recarga. Por favor, tente novamente.');
    }
}
