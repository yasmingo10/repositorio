document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formPassageiro");
    console.log(form);
    console.log("ok");
    form.addEventListener("submit", async (event) => {
        
        event.preventDefault();
        const formData = new FormData(form);
        const data = {nome: formData.get("nome"), cpf: formData.get("cpf"), nascimento: formData.get("nascimento"), telefone: formData.get("telefone"), email: formData.get("email"), sexo: formData.get("sexo"), endereco: formData.get("endereco"), cidade: formData.get("cidade"), estado: formData.get("estado")}
        if (form.checkValidity()) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/passageiros/cadastrar",
                    data);
                console.log(response.data);
                form.reset();
                alert(`Passageiro cadastrado com sucesso! id=${response.data.passageiro.id}`)
                // window.location.href = `http://localhost:4000/`;
            } catch (error) {
                console.log(error.message);
            }
        }
    });
});