async function paginaEditaInteracao(id) {
    document.getElementById('salvar').hidden = true
    document.getElementById('editar').hidden = false
    const detalhesPagina = await httpGet("/Pagina/Detalhes?id=" + id)
    document.getElementById('idPagina').value = detalhesPagina.idPagina
    document.getElementById('nomePagina').value = detalhesPagina.nomePagina
    document.getElementById('enderecoPagina').value = detalhesPagina.enderecoPagina
    carregaSelectConcessionaria(detalhesPagina.concessionariaId)
}

async function paginaEdita() {
    const pagina = {
        "IdPagina": document.getElementById('idPagina').value,
        "NomePagina": document.getElementById('nomePagina').value,
        "EnderecoPagina": document.getElementById('enderecoPagina').value,
        "ConcessionariaId": document.getElementById('concessionaria').value
    
    }

    await httpPut("/Pagina/Edita", pagina).then(x => openView("listaPagina"));
}