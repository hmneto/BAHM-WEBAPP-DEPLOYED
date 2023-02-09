async function contatoEditaInteracao(id) {
    document.getElementById('salvar').hidden = true
    document.getElementById('editar').hidden = false
    const detalhesContato = await httpGet("/Contato/Detalhes?id=" + id)
    document.getElementById('idContato').value = detalhesContato.idContato
    document.getElementById('nomeContato').value = detalhesContato.nomeContato
}

async function contatoEdita() {
    const contato = {
        "idContato": document.getElementById('idContato').value,
        "nomeContato": document.getElementById('nomeContato').value,
        "telefoneContato": document.getElementById('telefoneContato').value,
        "emailContato": document.getElementById('emailContato').value

    }

    await httpPut("/Contato/Edita", contato).then(x => openView("listaContato"));
}