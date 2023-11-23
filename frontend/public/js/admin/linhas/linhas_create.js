document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formLinhas");
    console.log(form);
    console.log("ok");
    form.addEventListener("submit", async (event) => {
        
        event.preventDefault();
        const formData = new FormData(form);
        const data = {nome: formData.get("nome"), localsaida: formData.get("localsaida"), localdestino: formData.get("localdestino"), horariosaida: formData.get("horariosaida"), horariochegada: formData.get("horariochegada")}
        if (form.checkValidity()) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/linhas/cadastrar",
                    data);
                console.log(response.data);
                form.reset();
                alert(`Linha cadastrada com sucesso! id=${response.data.linha.id}`)
                // window.location.href = `http://localhost:4000/`;
            } catch (error) {
                console.log(error.message);
            }
        }
    });
});