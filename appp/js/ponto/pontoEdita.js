async function pontoEditaInteracao(id) {
    document.getElementById('salvar').hidden = true
    document.getElementById('editar').hidden = false

    let ponto
    if (!id) {
        ponto = await httpGet("/Ponto/Detalhes?id=" + dadosPonto.idPonto);
        fillInputsLatLng();
    }
    else{
        ponto = await httpGet("/Ponto/Detalhes?id=" + id);
        document.getElementById('latitude').value = ponto.latitudePonto.toFixed(6)
        document.getElementById('longitude').value = ponto.longitudePonto.toFixed(6)
    }



    document.getElementById('nomePonto').value = ponto.nomePonto
    document.getElementById('idPonto').value = ponto.idPonto
    document.getElementById('pagina').value = ponto.pagina.nomePagina
    document.getElementById('idPagina').value = ponto.pagina.idPagina
    document.getElementById('icone').value = ponto.icone.nomeIcone
    document.getElementById('idIcone').value = ponto.icone.idIcone
    document.getElementById('observacaoPonto').value = ponto.observacaoPonto

    document.getElementById('btnLinkPaginaPonto').value =  ponto.pagina.nomePagina

    document.getElementById('linkPaginaPonto').value = ponto.pagina.idPagina

    document.getElementById('linkMapaPonto').value  =`${window.location}?lat=${ponto.latitudePonto}&long=${ponto.longitudePonto}&zooml=20`
}


function abrePagina(){
    openView('pagina',true, document.getElementById('linkPaginaPonto').value )
}

function abreMapa(){
    window.open(document.getElementById('linkMapaPonto').value, '_blank');
}

async function pontoEdita() {
    const ponto = {
        IdPonto: document.getElementById('idPonto').value,
        NomePonto: document.getElementById('nomePonto').value,
        LatitudePonto: document.getElementById('latitude').value,
        LongitudePonto: document.getElementById('longitude').value,
        IconeId: document.getElementById("idIcone").value,
        PaginaId: document.getElementById("idPagina").value,
        ObservacaoPonto: document.getElementById('observacaoPonto').value 

    }

    await httpPut("/Ponto/Edita", ponto)
}