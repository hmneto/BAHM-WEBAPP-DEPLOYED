async function contatoNovo() {
    const contato = {
        "nomeContato": document.getElementById('nomeContato').value,
        "telefoneContato": document.getElementById('telefoneContato').value,
        "emailContato": document.getElementById('emailContato').value
    }

    await httpPost("/Contato/Novo", contato).then(x=>openView("listaContato"));
}

