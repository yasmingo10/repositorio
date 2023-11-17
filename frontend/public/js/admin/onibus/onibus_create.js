document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formOnibus");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        if (form.checkValidity()) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/onibus/cadastrar",
                    formData,);
                console.log(response.data);
                form.reset();
                alert(`Onibus cadastrado com sucesso! id=${response.data.motorista.id}`)
                // window.location.href = `http://localhost:4000/admin/motorista/:id`;
            } catch (error) {
                console.log(error.message);
            }
        }
    });
});
