document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formOnibus");
    console.log(form);
    console.log("ok");
    form.addEventListener("submit", async (event) => {
        
        event.preventDefault();
        const formData = new FormData(form);
        console.log(formData.get("placa"));
        const data = {placa: formData.get("placa")}
        if (form.checkValidity()) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/onibus/cadastrar",
                    data);
                console.log(response.data);
                form.reset();
                alert(`Onibus cadatrado com sucesso! id=${response.data.onibus.id}`)
                // window.location.href = `http://localhost:4000/`;
            } catch (error) {
                console.log(error.message);
            }
        }
    });
});
