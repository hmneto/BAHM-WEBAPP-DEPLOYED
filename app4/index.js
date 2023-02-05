// const linkApi = "https://localhost:7143"
// const linkApi = "http://0.0.0.0"
// const linkApi = "https://localhost:5001"
const linkApi = "https://bahm.fly.dev"

// let pagina = null
let dadosPonto = null
let edit = false


function openView(page) {
  if (page == "EditPoint") page = "SavePoint"


  fetch(`pages22/${page}.html`)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      document.getElementById("content").innerHTML = data;
      addInteraction(page);
    })
    .catch((error) => {
    });
}


topFunction = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


function hoverTop(e){
e.style.backgroundColor = '#555'
}


function hoverTop2(e){
  e.style.backgroundColor = 'red'
  }


function get(link) {
  return fetch(linkApi + link, {
    method: "GET",
    headers: new Headers({
      "content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("loginStore"),
    }),
  }).then(function (x) {
    if (x.status == 401) {
      openView("LoginPage")
    } else {
      return x.json()
    }
  })
}

function post(link, obj) {
  return fetch(linkApi + link, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: new Headers({
      "content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("loginStore"),
    }),
  }).then(function (x) {
    if (x.status == 401) {
      openView("LoginPage")
    } else {
      return x
    }
  });
}

async function MontaDados(mapPage, googleMaps) {
  mapPage.savePositionsInStorage(googleMaps);
  mapPage.setPositionsInInputs(googleMaps);
  const centro = mapPage.centerMap(8, 2, googleMaps);
  if (!centro) return;
  const p = await post("/ponto/GetPontos", {
    LatitudePonto: centro.lat,
    LongitudePonto: centro.lng,
    Zoom: googleMaps.getZoomMap(),
  }).then(x=>x.json());
  if (p == undefined) return
  mapPage.mountPointsInTheMap(p, googleMaps);
}



async function addInteraction(content) {
  if (content === "SavePoint") {
    if (edit) EditPointInteraction()
    else SavePointInteraction();

  } else if (content === "MapPage") {
    MapPageInteraction();
  }
  else if (content === "Page") {



    var mybutton = document.getElementById("myBtn");
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

    const pagina = await get('/pagina/get?PaginaId='+dadosPonto.paginaId)
  
    console.log(pagina)


    const { 
      listContatoDto, 
      enderecoPagina, 
      info, 
      nomePagina, 
      listSiteDto ,
      concessionaria
    } = pagina


    const {
      nomeConcessionaria,
      infoConcessionaria
    } = concessionaria


    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("scream");



    canvas.width = 1150;
    canvas.height = 850;

    canvas.style.width = '100%';
    ctx.drawImage(img, 0, 0);
    ctx.font = "20px Calibri";
    ctx.fillStyle = "white";

    let linhaa = 25;
    let altura = 600;
    let horizontal = 30;
    ctx.fillText(nomePagina, horizontal, altura);
    altura += linhaa;
    ctx.fillText(enderecoPagina, horizontal, altura);





    altura += linhaa;

    listContatoDto.forEach((element) => {
      ctx.fillText(
        `${element.nomeContato ? element.nomeContato : ""} 
        ${element.telefoneContato ? element.telefoneContato : ""} 
        ${element.emailContato ? element.emailContato : ""}`,
        horizontal,
        altura
      );
      altura += linhaa;
    });

    ctx.fillText(infoConcessionaria, horizontal, altura);

    document.getElementById('pageContainer').appendChild(document.createElement('br'))

    const obj = {};
    for (var i = 0; i < listSiteDto.length; i++) {
      if (!obj[listSiteDto[i].tipoSite]) obj[listSiteDto[i].tipoSite] = [];
      obj[listSiteDto[i].tipoSite].push(listSiteDto[i].linkSite);
    }



    const {
      STREET,
      LEI,
      FOTO_MAPA,
      FOTO,
      WIKIMAPIA_FRIO,
      WIKIMAPIA_SAT,
      WIKIPEDIA,
      PM,
      SITE,
      ABCR,
      CONCESSIONARIA,
    } = obj;

    montaPagina(STREET)

    montaPagina2(FOTO)

    montaPagina(WIKIMAPIA_SAT)

    montaPagina(WIKIMAPIA_FRIO)

    montaPagina(PM)

    montaPagina(SITE)

    montaPagina(ABCR)

    montaPagina(CONCESSIONARIA)

    montaPagina2(FOTO_MAPA)

    montaPagina(LEI)

    montaPagina(WIKIPEDIA)
  }
}


function montaPagina(array){
  if(!array)return
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const iframe = document.createElement('iframe')
    iframe.src = element
    iframe.style.width = '100%';
    iframe.style.height = '850px';
    document.getElementById('pageContainer').appendChild(iframe)
    document.getElementById('pageContainer').appendChild(document.createElement('br'))
    document.getElementById('pageContainer').appendChild(document.createElement('br'))
  }
}


function montaPagina2(array){
  if(!array)return
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const iframe = document.createElement('img')
    if (element.indexOf('http') === -1)
    {
      iframe.src = linkApi+'/Imagens?i='+element
    }else{
      iframe.src = element
    }
    iframe.style.width = '100%';
    // iframe.style.height = '850px';
    document.getElementById('pageContainer').appendChild(iframe)
    document.getElementById('pageContainer').appendChild(document.createElement('br'))
    document.getElementById('pageContainer').appendChild(document.createElement('br'))
  }
}

async function EditPointInteraction() {
  const savePoint = new SavePoint();
  window.savePointGlobal = savePoint;


  document.getElementById('btnSavePoint').hidden = true
  document.getElementById('btnEditPoint').hidden = false
  const i = await get("/icone/GetIcones");
  const p = await get("/GetPaginass");
  const s = await get("/ponto/GetPont/" + dadosPonto.IdPonto);
  savePoint.fillInputsLatLng();
  document.getElementById("answers").innerHTML = savePoint.builtPage(i);
  document.getElementById("answers2").innerHTML = savePoint.builtPage2(p);
  document.getElementById('namePoint').value = s.nome_ponto
  document.getElementById('answer').value = s.NomeIcone
  document.getElementById('answer2').value = s.NomePagina
  document.getElementById('inputIdPonto').value = s.IdPonto
}



async function SavePointInteraction() {
  const savePoint = new SavePoint();
  window.savePointGlobal = savePoint;
  const i = await get("/icone/GetIcones");
  savePoint.fillInputsLatLng();
  document.getElementById("answers").innerHTML = savePoint.builtPage(i);
  const p = await get("/GetPaginass");
  document.getElementById("answers2").innerHTML = savePoint.builtPage2(p);
}





function MapPageInteraction() {
  const mapPage = new MapPage();
  const googleMaps = new GoogleMaps();
  window.mapPageGlobal = mapPage;
  window.googleMapsGlobal = googleMaps;
  mapPage.setUpInitalStorage();
  googleMaps.myMap(mapPage);
  googleMaps.eventDragMap(mapPage, googleMaps);
  googleMaps.eventZoomMap(mapPage, googleMaps);
  googleMaps.eventClickMap();
  mapPage.fitMap();
  mapPage.eventFitMap(mapPage);
  MontaDados(mapPage, googleMaps);
}

openView("LoginPage");


function mySubmitFunction(e) {
  e.preventDefault();
  fetch(linkApi + "/Login", {
    method: "POST",
    body: JSON.stringify({
      EmailUsuario: document.getElementById('inputEmailLogin').value,
      SenhaUsuario: document.getElementById('inputPasswordLogin').value,
    }),
    headers: new Headers({
      "content-type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }),
  })
    .then((x) => x.text())
    .then((x) => {
      if (x) {
        sessionStorage.setItem("loginStore", x);
        openView("MapPage");
      } else {
        alert(x.message)
      }
    });
}


