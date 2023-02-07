async function listPaginaInteraction() {
  const listaPaginas = await httpGet("/Pagina/ListaTodos")
  // console.log(listaPaginas)
  const tabelaListaPaginas = document.getElementById('tabelaListaPaginas')
  // console.log()

  listaPaginas.forEach(element => {
    // console.log(element)
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

    td4.appendChild(btnEditar)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tabelaListaPaginas.appendChild(tr)
  });
}



function buscarPagina() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("buscaPagina");
  filter = input.value.toUpperCase();
  table = document.getElementById("tabelaPagina");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}