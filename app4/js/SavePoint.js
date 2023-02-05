class SavePoint {
  getValueFromDataList() {
    var shownVal = document.getElementById("answer").value;
    var value2send = document.querySelector(
      "#answers option[value='" + shownVal + "']"
    );
    if (!value2send) return;
    return value2send.dataset.value
  }


  getValueFromDataList2() {
    var shownVal = document.getElementById("answer2").value;
    var value2send = document.querySelector(
      "#answers2 option[value='" + shownVal + "']"
    );
    if (!value2send) return;
    return value2send.dataset.value
  }


  async editPoint(){
    const ponto = {
      IdPonto:  document.getElementById('inputIdPonto').value ,
      nome_ponto: document.getElementById('namePoint').value,
      latitude: document.getElementById('Latitude').value,
      longitude: document.getElementById('Longitude').value,
      IconeId: this.getValueFromDataList(),
      pagina: this.getValueFromDataList2()
    }
        const savePoint = await post("/ponto/EditPoint", ponto);
  }

  async addPoint() {
    const ponto = {
      nome_ponto: document.getElementById('namePoint').value,
      latitude: document.getElementById('Latitude').value,
      longitude: document.getElementById('Longitude').value,
      IconeId: this.getValueFromDataList(),
      pagina: this.getValueFromDataList2()
    }
    const savePoint = await post("/ponto/SavePoint", ponto);
  }


  builtPage(icones) {
    let html = ""
    for (let index = 0; index < icones.length; index++) {
      const element = icones[index];
      html += `<option data-value="${element.idIcone}" value="${element.nomeIcone}"></option>`
    }
    return html
  }


  builtPage2(pages) {
    let html = ""
    for (let index = 0; index < pages.length; index++) {
      const element = pages[index];
      html += `<option data-value="${element.idPagina}" value="${element.nomePagina}"></option>`
    }
    return html
  }

  fillInputsLatLng() {
    const { lat, lng } = window.googleMapsGlobal.get()
    document.getElementById('Latitude').value = lat.toFixed(6)
    document.getElementById('Longitude').value = lng.toFixed(6)
  }
}
