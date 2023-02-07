async function listaConcessionariaInteracao() {
  console.log('ok')
  const listaConcessionas = await httpGet("/Concessionaria/ListaTodos")
  const tabelaListaConcessionas = document.getElementById('tabelaListaConcessionarias')

  listaConcessionas.forEach(element => {
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')

    td1.innerHTML = element.nomeConcessionaria
    td2.innerHTML = element.infoConcessionaria

    const btnEditar = document.createElement('button')
    btnEditar.innerHTML = "EDITAR"

    btnEditar.addEventListener('click', async function () {
      openView('concessionaria',true, element.idConcessionaria)
    })

    td3.appendChild(btnEditar)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tabelaListaConcessionas.appendChild(tr)
  });
}