const numeroWhatsApp = "988671941";

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const iconeCarrinho = document.getElementById("abrirCarrinho");
const painelCarrinho = document.getElementById("carrinho");
const listaCarrinho = document.getElementById("lista-carrinho");
const btnFinalizar = document.getElementById("btnFinalizar");

// Abrir e fechar carrinho
iconeCarrinho.addEventListener("click", () => {
    painelCarrinho.classList.toggle("aberto");
    renderizarCarrinho();
});

// Botões de adicionar
document.querySelectorAll(".btn-comprar").forEach(btn => {
    btn.addEventListener("click", () => {
        const produto = btn.getAttribute("data-produto");

        carrinho.push(produto);
        salvarCarrinho();
        renderizarCarrinho();
        atualizarContador(); 
    });
});

// Salvar no localStorage
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Renderizar carrinho
function renderizarCarrinho() {
    listaCarrinho.innerHTML = "";

    carrinho.forEach((produto, index) => {
        const item = document.createElement("p");
        item.innerHTML = `
            ${produto}
            <button onclick="removerItem(${index})">X</button>
        `;
        listaCarrinho.appendChild(item);
    });

    // 🔥 Ativar/desativar botão finalizar
    btnFinalizar.disabled = carrinho.length === 0;
}

// Remover item
function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    renderizarCarrinho();
    atualizarContador(); 
}

// Finalizar pedido (WhatsApp)
btnFinalizar.addEventListener("click", () => {

    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let mensagem = "Olá! Tenho interesse nesses produtos:\n\n";

    carrinho.forEach(item => {
        mensagem += `• ${item}\n`;
    });

    mensagem += "\nPodemos continuar o atendimento?";

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");

    // ✔ Esvazia o carrinho após enviar o pedido
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
    atualizarContador();
});

// Botão para fechar o carrinho
document.getElementById("fecharCarrinho").addEventListener("click", () => {
    painelCarrinho.classList.remove("aberto");
});

// Contador + animação
function atualizarContador() {
    const contador = document.getElementById("contadorCarrinho");
    contador.textContent = carrinho.length;

    // Animação POP
    contador.classList.remove("pop");
    void contador.offsetWidth; 
    contador.classList.add("pop");
}

// Atualiza contador ao carregar
atualizarContador();
renderizarCarrinho();
