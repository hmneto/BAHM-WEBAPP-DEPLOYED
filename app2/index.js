// const linkApi = "https://0.0.0.0:5001"
// const linkApi = "https://localhost:5001"
const linkApi = "https://bahm2.fly.dev"

let pagina = null
let dadosPonto = null
let edit = false


function openView(page) {
  if (page == "EditPoint") page = "SavePoint"


  fetch(`pages17/${page}.html`)
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
      return x.json()
    }
  });
}

async function MontaDados(mapPage, googleMaps) {
  mapPage.savePositionsInStorage(googleMaps);
  mapPage.setPositionsInInputs(googleMaps);
  const centro = mapPage.centerMap(8, 2, googleMaps);
  if (!centro) return;
  const p = await post("/ponto/GetPontos", {
    Latitude: centro.lat,
    Longitude: centro.lng,
    Zoom: googleMaps.getZoomMap(),
  });

  if (p == undefined) return
  mapPage.mountPointsInTheMap(p.pontos, googleMaps);
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



    pagina = await post('/GetPaginas', dadosPonto.pagina)

    

    const { dados } = pagina

    const { contatos, endereco, info, nome_pagina, sites } = dados


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
    ctx.fillText(nome_pagina, horizontal, altura);
    altura += linhaa;
    ctx.fillText(endereco, horizontal, altura);





    altura += linhaa;

    contatos.forEach((element) => {
      ctx.fillText(
        `${element.nome_contato ? element.nome_contato : ""} 
        ${element.telefone ? element.telefone : ""} 
        ${element.email ? element.email : ""}`,
        horizontal,
        altura
      );
      altura += linhaa;
    });

    ctx.fillText(info, horizontal, altura);

    document.getElementById('pageContainer').appendChild(document.createElement('br'))

    const obj = {};
    for (var i = 0; i < sites.length; i++) {
      if (!obj[sites[i].tipo]) obj[sites[i].tipo] = [];
      obj[sites[i].tipo].push(sites[i].link);
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

    // montaPagina2(FOTO)

    montaPagina(WIKIMAPIA_SAT)

    montaPagina(WIKIMAPIA_FRIO)

    // montaPagina(SITE)

    // montaPagina(ABCR)

    montaPagina(PM)

    montaPagina(CONCESSIONARIA)

    // montaPagina2(FOTO_MAPA)

    // montaPagina(LEI)

    montaPagina(WIKIPEDIA)
  }
}


function montaPagina(array){
  console.log(array)
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
  console.log(array)
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const iframe = document.createElement('img')
    if (element.indexOf('http') === -1)
    {
      iframe.src = linkApi+'/Imagens/teste/?i='+element
    }else{
      iframe.src = element
    }
    iframe.style.width = '100%';
    iframe.style.height = '850px';
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
  fetch(linkApi + "/Authenticate", {
    method: "POST",
    body: JSON.stringify({
      login: document.getElementById('inputEmailLogin').value,
      senha: document.getElementById('inputPasswordLogin').value,
    }),
    headers: new Headers({
      "content-type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }),
  })
    .then((x) => x.json())
    .then((x) => {
      if (x.user) {
        sessionStorage.setItem("loginStore", x.user);
        openView("MapPage");
      } else {
        alert(x.message)
      }
    });
}


