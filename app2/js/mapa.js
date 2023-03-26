class CenterMap {

  _latMax;
  _latMin;
  _longMax;
  _longMin;

  centerMap(zoom, ditancia) {

    let latMax;
    let latMin;
    let longMax;
    let longMin;

    let retorno_dados;

    if (getZoomMap() >= zoom) {
      latMax = Math.round(getCenterLatMap() - ditancia);
      latMin = Math.ceil(getCenterLatMap() + ditancia);
      longMax = Math.round(getCenterLngMap() - ditancia);
      longMin = Math.ceil(getCenterLngMap() + ditancia);

      retorno_dados =
        this._latMax !== latMax ||
        this._latMin !== latMin ||
        this._longMax !== longMax ||
        this._longMin !== longMin;
      if (retorno_dados) {
        this._latMax = latMax;
        this._latMin = latMin;
        this._longMax = longMax;
        this._longMin = longMin;
      }
    }

    if (retorno_dados)
      return {
        lat: getCenterLatMap(),
        lng: getCenterLngMap(),
      };
    else return null;
  }
}


function getUrlParams() {
  const latLongZoom = new getUrlVal(["lat", "long", "zooml"]);
  return latLongZoom.get_list();
}

function getInputSearchMapMemoryOrUrl(lat, long, zooml) {
  let latitude;
  let longitude;
  let zoom;

  if (lat, long, zooml) {
    latitude = lat;
    longitude = long;
    zoom = Number(zooml);
    window.location.search = "";
  } else {
    latitude = localStorage.getItem("lat");
    longitude = localStorage.getItem("long");
    zoom = Number(localStorage.getItem("zoom"));
  }

  return {
    latitude,
    longitude,
    zoom,
  };
}

function savePositionsInStorage(lat, lng, zoom) {
  localStorage.setItem("lat", lat);
  localStorage.setItem("long", lng);
  localStorage.setItem("zoom", zoom);
}



function setPositionsInInputs(lat, lng, zoom) {


  if (document.getElementById("lat"))
    document.getElementById("lat").value = lat;
  if (document.getElementById("long"))
    document.getElementById("long").value = lng;
  if (document.getElementById("zoom"))
    document.getElementById("zoom").value = zoom;
}



function mountPointsInTheMap(list) {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    

    let point = createMark(
      getLatLngMaps(element.latitudePonto, element.longitudePonto), element.icone.linkIcone.indexOf("http") === -1 ? linkApi + "/imagem/Imagem?i=" + element.icone.linkIcone
        : element.icone.linkIcone,
        element.idPonto
    )


    
    // point.id = element.id
    point.setMap(mapiii);
    let infoWindow = new google.maps.InfoWindow({});
    point.addListener("click", () => {



    const markerId = point.get('id');
    console.log(markerId)

      dadosPonto = element
      infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
        position: getLatLngMaps(
          element.latitudePonto,
          element.longitudePonto
        ),
      });

      const div = document.createElement("div");
      const text = document.createElement("text");
      text.innerHTML = element.nomePonto;
      div.appendChild(text);
      if (element.tipo_icone !== "KM") text.style.cursor = "pointer";
      text.addEventListener("click", async function () {
        if (element.icone.acaoIcone === "NÃO") return;
        openView("paginaMapa", false, element.paginaId)
      });

      infoWindow.setContent(div);
      infoWindow.open(this.map, point);
    });
  }
}



function eventFitMap(callback) {
  window.addEventListener("resize", function () {
    callback()
  });
}

function setUpInitalStorage() {
  if (
    !localStorage.getItem("lat") ||
    !localStorage.getItem("long") ||
    !localStorage.getItem("zoom")
  ) {
    localStorage.setItem("lat", "-21");
    localStorage.setItem("long", "-50");
    localStorage.setItem("zoom", "9");
  }
}


function fitMap() {
  const sizeMapInnerHeight = window.innerHeight;
  const sizeMapInnerWidth = window.innerWidth;
  document.getElementById("googleMap").style.height =
    sizeMapInnerHeight + "px";
  document.getElementById("googleMap").style.width = sizeMapInnerWidth + "px";
}



function goToPosition() {
  goToLatLngMap(
    document.getElementById("lat").value,
    document.getElementById("long").value,
    document.getElementById("zoom").value
  );
}

function isPointClicked() {
  if (!dadosPonto) alert("não clicado")
  if (!dadosPonto) return false
  else return true
}

function setLinkLatLng() {
  const { lat, lng, zoom } = getLatLongZoom();
  const link = `${window.location}?lat=${lat}&long=${lng}&zooml=${zoom}`;

  if (document.getElementById("link"))
    document.getElementById("link").value = link;
}


class getUrlVal {
  lista = null;
  constructor(parametros_url) {
    let lista_parametros_url_resolvidas = {};
    const get = (name) => {
      if (
        (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
          window.location.search
        ))
      )
        return decodeURIComponent(name[1]);
    };

    parametros_url.forEach((element) => {
      lista_parametros_url_resolvidas[element] = get(element);
    });
    this.lista = lista_parametros_url_resolvidas;
  }

  get_list() {
    return this.lista;
  }
}


async function MontaDados(centerMap) {
  const { lat, lng, zoom } = getLatLongZoom();
  savePositionsInStorage(lat, lng, zoom);
  setPositionsInInputs(lat, lng, zoom);
  const centro = centerMap.centerMap(8, 2);
  if (!centro) return;
  const pontos = await httpPost("/ponto/Pontos", {
    LatitudePonto: centro.lat,
    LongitudePonto: centro.lng,
    Zoom: getZoomMap(),
  }).then(x => x.json());
  if (pontos == undefined) return
  mountPointsInTheMap(pontos);
}



function mapaInteracao() {
  const centerMap = new CenterMap()
  setUpInitalStorage();
  myMap();
  MontaDados(centerMap);
  eventDragMap(function () {
    MontaDados(centerMap);
  })
  eventZoomMap(function () {
    MontaDados(centerMap);
  });
  eventClickMap();
  fitMap();
  eventFitMap(function () {
    fitMap();
  });
}