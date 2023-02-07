async function concessionariaEditaInteracao(id) {
    document.getElementById('salvar').hidden = true
    document.getElementById('editar').hidden = false
    const detalhesConcessionaria = await httpGet("/Concessionaria/Detalhes?id=" + id)
    document.getElementById('idConcessionaria').value = detalhesConcessionaria.idConcessionaria
    document.getElementById('nomeConcessionaria').value = detalhesConcessionaria.nomeConcessionaria
    document.getElementById('infoConcessionaria').value = detalhesConcessionaria.infoConcessionaria
}

async function concessionariaEdita() {
    const concessionaria = {
        "idConcessionaria": document.getElementById('idConcessionaria').value,
        "nomeConcessionaria": document.getElementById('nomeConcessionaria').value,
        "infoConcessionaria": document.getElementById('infoConcessionaria').value

    }

    await httpPut("/Concessionaria/Edita", concessionaria).then(x => openView("listaConcessionaria"));
}