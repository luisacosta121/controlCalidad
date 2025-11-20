const API_URL = "http://localhost:8081";

export async function guardarControles(data) {
    return fetch(`${API_URL}/controles/guardar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json());
}