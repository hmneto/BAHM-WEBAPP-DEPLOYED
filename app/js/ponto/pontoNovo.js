async function pontoNovo() {
    const ponto = {
        NomePonto: document.getElementById('nomePonto').value,
        LatitudePonto: document.getElementById('latitude').value,
        LongitudePonto: document.getElementById('longitude').value,
        IconeId: document.getElementById("idIcone").value,
        PaginaId: document.getElementById("idPagina").value
    }

    await httpPost("/Ponto/Novo", ponto)
}



async function pontoNovoInteracao() {
    // fillInputsLatLng();
}