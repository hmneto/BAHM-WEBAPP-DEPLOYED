async function listaPaginaInteracao() {
  const listaPaginas = await httpGet("/Pagina/ListaTodos")
  const tabelaListaPaginas = document.getElementById('tabelaListaPaginas')
  listaPaginas.forEach(element => {
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')

    td1.innerHTML = element.nomePagina
    td2.innerHTML = element.enderecoPagina
    td3.innerHTML = element.concessionaria.nomeConcessionaria

    const btnEditar = document.createElement('button')
    btnEditar.innerHTML = "EDITAR"
    btnEditar.addEventListener('click', async function () {
      openView('pagina',true, element.idPagina)
    })



    const btnUsar = document.createElement('button')
    btnUsar.innerHTML = "USAR"


    btnUsar.addEventListener('click', async function () {
      document.getElementById('pagina').value = element.nomePagina
      document.getElementById('idPagina').value = element.idPagina
      document.getElementById('fechaModal').click()
      
    })



    td4.appendChild(btnEditar)
    td4.appendChild(btnUsar)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tabelaListaPaginas.appendChild(tr)
  });
}
