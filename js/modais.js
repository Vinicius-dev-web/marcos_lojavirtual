
function openDestaque(){

    const modal = document.getElementById("edit-destaque-create");

    modal.classList.add("abrir");

    modal.addEventListener("click", (e) =>{

        if(e.target.id == "fechar"){
            modal.classList.remove("abrir")
        }
    })
}

// function infoProd(){

//     const modal = document.getElementById("info-prod-modal")

//     modal.classList.add('abrir')

//     modal.addEventListener("click", (e) =>{

//         if(e.target.id == 'fechar'){
//             modal.classList.remove('abrir')
//         }
//     })
// }