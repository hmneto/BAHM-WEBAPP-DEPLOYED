async function paginaSalvaInteracao() {
    carregaSelectConcessionaria()
}


async function paginaNovo() {
    const pagina = {
        "NomePagina": document.getElementById('nomePagina').value,
        "EnderecoPagina": document.getElementById('enderecoPagina').value,
        "ConcessionariaId": document.getElementById('concessionaria').value
    }

    await httpPost("/Pagina/Novo", pagina).then(x=>openView("listaPagina"));
}
