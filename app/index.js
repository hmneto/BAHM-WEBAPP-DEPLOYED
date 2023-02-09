// const linkApi = "https://localhost:7143"
// const linkApi = "http://0.0.0.0"
// const linkApi = "https://localhost:5001"
const linkApi = "https://bahm.fly.dev"

let dadosPonto = null



function openView(page, edita, id) {
  fetch(`pages33/${page}.html`)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      document.getElementById("content").innerHTML = data;
      addInteraction(page, edita, id);
    })
    .catch((error) => {
    });
}

function addInteraction(content, edita, id) {
  if (content === "ponto") {
    console.log(content, edita, id)
    if (edita) pontoEditaInteracao(id);
    else pontoNovoInteracao();
  }

  else if (content === "pagina") {
    if (edita) paginaEditaInteracao(id)
    else paginaSalvaInteracao()
  }

  else if (content === "concessionaria") {
    if (edita) concessionariaEditaInteracao(id)
    else concessionariaSalvaInteracao()
  }

  else if (content === "contato") {
    if (edita) contatoEditaInteracao(id)
    else contatoSalvaInteracao()
  }

  else if (content === "cliente") {
    if (edita) clienteEditaInteracao(id)
    else clienteSalvaInteracao()
  }


  //lista
  else if (content === "listaPagina") {
    listaPaginaInteracao()
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

  // cliente
  else if (content === "paginaMapa") {
    paginaMapaInteracao(id)
  }

  else if (content === "mapa") {
    mapaInteracao();
  }
}
// const aaa = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjQiLCJyb2xlIjoiQURNSU5JU1RSQURPUiIsIm5iZiI6MTY3NTc5MDYxNCwiZXhwIjoxNjc1ODQ0NjE0LCJpYXQiOjE2NzU3OTA2MTR9.gatazrYPVy6uqWGWInA0v-W7laEJLy7sGB5uo_vEscc"


// sessionStorage.setItem("loginStore", aaa)

// openView("mapa");

openView("login");