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