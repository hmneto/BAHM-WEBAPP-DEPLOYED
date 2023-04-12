// const linkApi = "https://localhost:7143"
// const linkApi = "http://0.0.0.0"
// const linkApi = "https://localhost:5001"
const linkApi = "https://bahm.fly.dev"

let dadosPonto = null

function openViewTable(page, edita, id) {
  fetch(`pages46/${page}.html`)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      document.getElementById("modalBody").innerHTML = data;
      addInteraction(page, edita, id);
    })
}


function openView(page, edita, id) {

  
  document.getElementById('content').style.display = 'none'

  document.getElementById('loader').style.display = 'block'




  if(page!='ponto'){
    dadosPonto = null
    latLgnii = null
  }
  fetch(`pages46/${page}.html`)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      document.getElementById("content").innerHTML = data;
      addInteraction(page, edita, id);
    }).then(function(){
      setTimeout(function(){
        document.getElementById('loader').style.display = 'none'
        document.getElementById('content').style.display = 'block'
      },1000)



    })
    .catch((error) => {
    });
}

function addInteraction(content, edita, id) {
  if (content === "ponto") {
    if (edita) pontoEditaInteracao(id);
    else pontoNovoInteracao();
  }

  else if (content === "pagina") {
    if (edita) paginaEditaInteracao(id)
  }

  else if (content === "concessionaria") {
    if (edita) concessionariaEditaInteracao(id)
    else concessionariaSalvaInteracao()
  }

  else if (content === "contato") {
    if (edita) contatoEditaInteracao(id)
    else contatoSalvaInteracao()
  }

  else if (content === "icone") {
    if (edita) iconeEditaInteracao(id)
    else iconeSalvaInteracao()
  }

  else if (content === "site") {
    if (edita) siteEditaInteracao(id)
    else siteSalvaInteracao()
  }

  else if (content === "cliente") {
    if (edita) clienteEditaInteracao(id)
    else clienteSalvaInteracao()
  }


  //lista
  else if (content === "listaPagina") {
    listaPaginaInteracao(edita)
  }

  else if (content === "listaConcessionaria") {
    listaConcessionariaInteracao()
  }

  else if (content === "listaCliente") {
    listaClienteInteracao()
  }

  else if (content === "listaContato") {
    listaContatoInteracao()
  }

  else if (content === "listaIcone") {
    listaIconeInteracao()
  }

  else if (content === "listaSite") {
    listaSiteInteracao()
  }

  else if (content === "listaImagens") {
    listaImagemInteracao(edita)
  }
  

  // cliente
  else if (content === "paginaMapa") {
    paginaMapaInteracao(id)
  }

  else if (content === "mapa") {
    mapaInteracao();
  }


  else if (content === "login") {
    loginInteracao();
  }
}
// const aaa = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjQiLCJyb2xlIjoiQURNSU5JU1RSQURPUiIsIm5iZiI6MTY3NTc5MDYxNCwiZXhwIjoxNjc1ODQ0NjE0LCJpYXQiOjE2NzU3OTA2MTR9.gatazrYPVy6uqWGWInA0v-W7laEJLy7sGB5uo_vEscc"


// sessionStorage.setItem("loginStore", aaa)

// openView("mapa");


if(sessionStorage.getItem("loginStore")){
  openView("mapa");
}else{
  openView("login");
}



document.getElementById('loader').style.display = 'none'
document.getElementById('content').style.display = 'block'
