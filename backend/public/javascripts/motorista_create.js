document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form_upload");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        if (form.checkValidity()) {
            const headers = { "Content-Type": "multipart/form-data" };
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/users",
                    formData,
                    {
                        headers: headers
                    }
                );
                console.log(response.data);
                // window.location.href = `http://localhost:3000/`;
            } catch (error) {
                console.log(error.message);
            }
        }
    });
});
