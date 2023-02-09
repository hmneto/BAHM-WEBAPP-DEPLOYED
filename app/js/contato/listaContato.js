async function listaContatoInteracao() {
  const listaContatos = await httpGet("/Contato/ListaTodos")
  const tabelaListaContatos = document.getElementById('tabelaListaContatos')

  console.log(listaContatos)

  listaContatos.forEach(element => {
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')

    td1.innerHTML = element.nomeContato

    const btnEditar = document.createElement('button')
    btnEditar.innerHTML = "EDITAR"

    btnEditar.addEventListener('click', async function () {
      openView('contato',true, element.idContato)
    })

    td4.appendChild(btnEditar)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tabelaListaContatos.appendChild(tr)
  });
}