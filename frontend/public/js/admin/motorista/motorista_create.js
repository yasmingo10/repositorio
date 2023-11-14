document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formMotoristas");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        if (form.checkValidity()) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/motoristas/cadastrar",
                    formData,
                    {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                      });
                console.log(response.data);
                form.reset();
                alert(`Motorista cadatrado com sucesso! id=${response.data.motorista.id}`)
                // window.location.href = `http://localhost:3000/`;
            } catch (error) {
                console.log(error.message);
            }
        }
    });
});