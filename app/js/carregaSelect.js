
async function carregaSelectIcone(selected) {
    const icones = await httpGet("/Icone/ListaTodos");
    for (let index = 0; index < icones.length; index++) {
        const element = icones[index];
        let optionDom = document.createElement("option")
        optionDom.value = element.idIcone
        optionDom.innerHTML = element.nomeIcone
        if(selected == element.idIcone) optionDom.selected = true
        document.getElementById("icone").append(optionDom)
    }
}

async function carregaSelectPagina(selected) {
    const pages = await httpGet("/Pagina/ListaTodos");
    for (let index = 0; index < pages.length; index++) {
        const element = pages[index];
        let optionDom = document.createElement("option")
        optionDom.value = element.idPagina
        optionDom.innerHTML = element.nomePagina + " " + element.enderecoPagina
        if(selected == element.idPagina) optionDom.selected = true
        document.getElementById("pagina").append(optionDom)
    }
}


async function carregaSelectConcessionaria(selected) {
    const concessionaria = await httpGet("/Concessionaria/ListaTodos");
    for (let index = 0; index < concessionaria.length; index++) {
        const element = concessionaria[index];
        let optionDom = document.createElement("option")
        optionDom.value = element.idConcessionaria
        optionDom.innerHTML = element.nomeConcessionaria
        if(selected == element.idConcessionaria) optionDom.selected = true
        document.getElementById("concessionaria").append(optionDom)
    }
}


