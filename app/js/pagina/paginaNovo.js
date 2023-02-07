async function paginaSalvaInteracao() {
    carregaSelectConcessionaria()
}

// async function editar() {
    // const ponto = {
    //     IdPonto: document.getElementById('idPonto').value,
    //     NomePonto: document.getElementById('nomePonto').value,
    //     LatitudePonto: document.getElementById('latitude').value,
    //     LongitudePonto: document.getElementById('longitude').value,
    //     IconeId: document.getElementById("icone").value,
    //     PaginaId: document.getElementById("pagina").value
    // }

    // await httpPut("/Ponto/Edita", ponto).then(x => openView("mapa"));
// }



async function paginaNovo() {
    const pagina = {
        "NomePagina": document.getElementById('nomePagina').value,
        "EnderecoPagina": document.getElementById('enderecoPagina').value,
        "ConcessionariaId": document.getElementById('concessionaria').value
    
    }

    await httpPost("/Pagina/Novo", pagina).then(x=>openView("listaPagina"));
}



// async function SavePointInteraction() {
//     fillInputsLatLng();
//     carregaSelectIcone();
//     carregaSelectPagina();
// }