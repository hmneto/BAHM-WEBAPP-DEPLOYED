// const linkApi = "https://localhost:7143"
// const linkApi = "http://0.0.0.0"
// const linkApi = "https://localhost:5001"
const linkApi = "https://bahm.fly.dev"

let dadosPonto = null



function openView(page, edita, id) {
  fetch(`pages30/${page}.html`)
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
    if (edita) EditPointInteraction();
    else SavePointInteraction();
  } else if (content === "mapa") {
    mapaInteraction();
  }
  else if (content === "paginaMapa") {
    paginaMapaInteraction(id)
  }
  else if (content === "listaPagina") {
    listPaginaInteraction()
  } else if (content === "pagina") {
    if (edita) paginaEditaInteracao(id)
    else paginaSalvaInteracao()
  }
}

openView("login");