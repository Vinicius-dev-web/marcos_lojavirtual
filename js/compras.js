// ADICIONAR AO CARRINHO
document.querySelectorAll(".btn-comprar").forEach(btn => {
    btn.addEventListener("click", function () {

        const nome = this.dataset.produto;
        const preco = this.dataset.preco;
        const imagem = this.dataset.imagem;
        const tamanho = this.dataset.tamanho;

        const slug = document.body.dataset.slug;

        fetch("../php/add_carrinho.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body:
                `nome=${encodeURIComponent(nome)}` +
                `&preco=${encodeURIComponent(preco)}` +
                `&imagem=${encodeURIComponent(imagem)}` +
                `&tamanho=${encodeURIComponent(tamanho)}` +
                `&slug=${encodeURIComponent(slug)}`
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === "ok") {

                    // atualiza contador
                    const contador = document.getElementById("contadorCarrinho");
                    contador.innerText = data.total_itens;
                    contador.classList.add("pop");
                    setTimeout(() => contador.classList.remove("pop"), 300);

                    // 🔔 MOSTRA A PUSH NOTIFICATION
                    showPushNotification();
                }
            });
    });

    function showPushNotification() {
        const push = document.getElementById("pushNotification");

        if (!push) return;

        push.classList.add("show");

        setTimeout(() => {
            push.classList.remove("show");
        }, 2500);
    }

});
