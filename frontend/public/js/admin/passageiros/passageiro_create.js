document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formPassageiro");
    console.log(form);
    console.log("ok");
    form.addEventListener("submit", async (event) => {
        
        event.preventDefault();
        const formData = new FormData(form);
        
        const dataNascimento = new Date(formData.get("nascimento"));
        const nascimentoISO = dataNascimento.toISOString();

        const data = {
            nome: formData.get("nome"),
            cpf: formData.get("cpf"),
            nascimento: nascimentoISO,
            telefone: formData.get("telefone"),
            email: formData.get("email"),
            sexo: formData.get("sexo"),
            endereco: formData.get("endereco"),
            cidade: formData.get("cidade"),
            estado: formData.get("estado"),
            saldo: 0,
        };

        if (form.checkValidity()) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/passageiros/cadastrar",
                    data
                );
                console.log(response.data);
                form.reset();
                alert(`Passageiro cadastrado com sucesso! id=${response.data.passageiros.id}`);
            } catch (error) {
                console.log(error.message);
            }
        }
    });
});
