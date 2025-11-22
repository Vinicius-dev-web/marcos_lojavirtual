const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
    const texto = this.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".cards-prods .card");

    cards.forEach(card => {
        const nomeProduto = card.querySelector("h3").textContent.toLowerCase();

        if (nomeProduto.includes(texto)) {
            card.style.display = "flex"; // exibe
        } else {
            card.style.display = "none"; // esconde
        }
    });
});
