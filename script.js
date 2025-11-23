async function briefErstellen() {
    const briefart = document.getElementById("briefart").value;
    const angaben = document.getElementById("angaben").value;

    document.getElementById("output").innerText = "Bitte warten... KI erstellt deinen Brief 😎";

    const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            briefart: briefart,
            angaben: angaben
        })
    });

    const data = await response.json();
    document.getElementById("output").innerText = data.brief;
}
