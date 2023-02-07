async function pontoNovo() {
    const ponto = {
        NomePonto: document.getElementById('nomePonto').value,
        LatitudePonto: document.getElementById('latitude').value,
        LongitudePonto: document.getElementById('longitude').value,
        IconeId: document.getElementById("icone").value,
        PaginaId: document.getElementById("pagina").value
    }
    await httpPost("/Ponto/Novo", ponto).then(x=>openView("mapa"));
}



async function SavePointInteraction() {
    fillInputsLatLng();
    carregaSelectIcone();
    carregaSelectPagina();
}