async function EditPointInteraction() {
    document.getElementById('salvar').hidden = true
    document.getElementById('editar').hidden = false
    const s = await httpGet("/Ponto/Detalhes?id=" + dadosPonto.idPonto);
    fillInputsLatLng();
    carregaSelectIcone(s.iconeId);
    carregaSelectPagina(s.paginaId)
    document.getElementById('nomePonto').value = s.nomePonto
    document.getElementById('idPonto').value = s.idPonto
}


async function pontoEdita() {
    const ponto = {
        IdPonto: document.getElementById('idPonto').value,
        NomePonto: document.getElementById('nomePonto').value,
        LatitudePonto: document.getElementById('latitude').value,
        LongitudePonto: document.getElementById('longitude').value,
        IconeId: document.getElementById("icone").value,
        PaginaId: document.getElementById("pagina").value
    }

    await httpPut("/Ponto/Edita", ponto).then(x => openView("mapa"));
}