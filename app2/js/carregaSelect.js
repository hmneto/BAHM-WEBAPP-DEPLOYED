function rowDOM(tipoDom, id) {
  const row = document.createElement('div')
  row.id = tipoDom +"-" + id
  row.className = "row"
  return row
}


function colMd10DOM() {
  const colMd10 = document.createElement('div')
  colMd10.className = "col-md-10"
  return colMd10
}

function formGroupDOM(){
  const formGroup = document.createElement('div')
  formGroup.className = "form-group"
  return formGroup
}


function buttonDOM(element){
  const button = document.createElement('button')
  button.innerHTML = "DELETE"
  button.className = "btn btn-danger form-control"
  button.addEventListener('click', function () {
    document.getElementById('contato-' + element.idContato).remove()
  })
  return button
}



function buttonColMd2DOM(){
  const colMd2 = document.createElement('div')
  colMd2.className = "col-md-2"
  return colMd2
}

function buttonPaginaExcluirDOM(element, title){

  const buttonPaginaExcluir = document.createElement('button')
  buttonPaginaExcluir.innerHTML = "DELETE"
  buttonPaginaExcluir.className = "btn btn-danger form-control"
  buttonPaginaExcluir.addEventListener('click', function () {
    document.getElementById(title+'-' + element.IdContato).remove()
  })

  return buttonPaginaExcluir
}




function buttonUpDOM(element){
  const buttonUp = document.createElement('button')
  buttonUp.id = "paginaContatoUp-" + element.idContato
  buttonUp.addEventListener('click', function () {
    const collection = document.getElementsByClassName("contatoSelecionadoClass")
    const ListContatoDto = []
    for (let i = 0; i < collection.length; i++) {
      ListContatoDto.push({
        IdContato: collection[i].value
      })
    }
    const ListDOMElements = [];
    for (let index = 0; index < ListContatoDto.length; index++) {
      const elementas = ListContatoDto[index];
      const currentElement = document.getElementById('contato-' + elementas.IdContato);
      ListDOMElements.push(currentElement);
    }
    let aux
    let indexDom
    for (let index = 0; index < ListDOMElements.length; index++) {
      const elementd = ListDOMElements[index];

      if(!elementd.id.indexOf('contato-'+element.idContato)){
        aux = ListDOMElements[index]
        indexDom = index
      }
    }

    if(indexDom<1) return
    ListDOMElements.splice(indexDom, 1);
    document.getElementById('listaContatoSelecionado').innerHTML = ""
    for (let index = 0; index < ListDOMElements.length; index++) {
      const element = ListDOMElements[index];
      if((indexDom-1) == index){
        document.getElementById('listaContatoSelecionado').appendChild(aux)
      }
      document.getElementById('listaContatoSelecionado').appendChild(element)
    }
  })

  buttonUp.innerHTML = "UP"
  return buttonUp
}


function buttonDownDOM(element){



  
  const buttonDown = document.createElement('button')

  buttonDown.innerHTML = "DOWN"


  buttonDown.id = "paginaContatoDown-" + element.idContato
  buttonDown.addEventListener('click', function () {

    // alert('down')

    // const collection = document.getElementsByClassName("contatoSelecionadoClass")

    // const ListContatoDto = []
    // for (let i = 0; i < collection.length; i++) {
    //   ListContatoDto.push({
    //     IdContato: collection[i].value
    //   })
    // }


    // const ListDOMElements = [];
    // for (let index = 0; index < ListContatoDto.length; index++) {
    //   const elementas = ListContatoDto[index];
    //   const currentElement = document.getElementById('contato-' + elementas.IdContato);

    //   ListDOMElements.push(currentElement);
    // }

    // ListDOMElements.reverse();

    // console.log(ListDOMElements);


    // document.getElementById('listaContatoSelecionado').innerHTML = ""


    // for (let index = 0; index < ListDOMElements.length; index++) {
    //   const element = ListDOMElements[index];
    //   document.getElementById('listaContatoSelecionado').appendChild(element)

    // }



    const collection = document.getElementsByClassName("contatoSelecionadoClass")
    const ListContatoDto = []
    for (let i = 0; i < collection.length; i++) {
      ListContatoDto.push({
        IdContato: collection[i].value
      })
    }
    const ListDOMElements = [];
    for (let index = 0; index < ListContatoDto.length; index++) {
      const elementas = ListContatoDto[index];
      const currentElement = document.getElementById('contato-' + elementas.IdContato);
      ListDOMElements.push(currentElement);
    }
    let aux
    let indexDom
    for (let index = 0; index < ListDOMElements.length; index++) {
      const elementd = ListDOMElements[index];

      if(!elementd.id.indexOf('contato-'+element.idContato)){
        aux = ListDOMElements[index]
        indexDom = index
      }
    }

    if(indexDom>=ListDOMElements.length-1) return
    ListDOMElements.splice(indexDom, 1);


    document.getElementById('listaContatoSelecionado').innerHTML = ""



    for (let index = 0; index < ListDOMElements.length; index++) {
      const element = ListDOMElements[index];
      console.log(indexDom ,  ListDOMElements.length-1)
      if((indexDom+1) == index){
        document.getElementById('listaContatoSelecionado').appendChild(aux)

      }



      document.getElementById('listaContatoSelecionado').appendChild(element)
      
      if(indexDom == ListDOMElements.length-1){
        document.getElementById('listaContatoSelecionado').appendChild(aux)
      }
    }



    


  })



return buttonDown
}


function inputInfoContatoDOM(element){
  const inputInfoContato = document.createElement('input')
  inputInfoContato.className = "form-control"
  inputInfoContato.value = element.infoContato
  inputInfoContato.disabled = true
return inputInfoContato
}





function montaPaginaContato(element) {
  const row = rowDOM("contato",element.idContato)
  const colMd10 = colMd10DOM()
  const formGroup = formGroupDOM()
  const button = buttonDOM(element)
  const colMd2 = buttonColMd2DOM()


  const buttonPaginaExcluir = buttonPaginaExcluirDOM(element,'contato')


  const buttonUp = buttonUpDOM(element)
  const buttonDown = buttonDownDOM(element)


  colMd2.appendChild(buttonUp)
  colMd2.appendChild(buttonDown)
  colMd2.appendChild(button)




  const inputInfoContato = inputInfoContatoDOM(element)



  const inputIdContato = document.createElement('input')
  inputIdContato.value = element.idContato
  inputIdContato.className = "contatoSelecionadoClass"
  inputIdContato.hidden = true









  row.appendChild(colMd10)
  row.appendChild(colMd2)
  colMd10.appendChild(formGroup)
  formGroup.appendChild(inputInfoContato)
  formGroup.appendChild(inputIdContato)
  listaContatoSelecionado.appendChild(row)
  listaContatoSelecionado.appendChild(document.createElement('br'))
}



function montaPaginaSite(element) {
  const row = rowDOM("site",element.idSite)
  const colMd10 = colMd10DOM()

  const formGroup = formGroupDOM()

  const button = buttonDOM()



  const colMd2 = document.createElement('div')
  colMd2.className = "col-md-2"
  // colMd2.appendChild(buttonPaginaExcluir)

  const inputInfoSite = document.createElement('input')
  const inputIdSite = document.createElement('input')
  inputInfoSite.className = "form-control"
  inputInfoSite.value = element.nomeSite
  inputInfoSite.disabled = true
  inputIdSite.value = element.idSite
  inputIdSite.className = "siteSelecionadoClass"
  inputIdSite.hidden = true
  colMd10.appendChild(formGroup)
  row.appendChild(colMd10)
  row.appendChild(colMd2)

  formGroup.appendChild(inputInfoSite)
  formGroup.appendChild(inputIdSite)
  listaSiteSelecionado.appendChild(row)
  listaSiteSelecionado.appendChild(document.createElement('br'))
}


function carregaTipoSite() {
  const listaTipoSite = ["STREET", "FOTO", "WIKIMAPIA_SAT", "WIKIMAPIA_FRIO", "PM", "SITE", "ABCR", "CONCESSIONARIA", "FOTO_MAPA", "WIKIPEDIA", "LEI"]
  const tipoSite = document.getElementById('tipoSite')

  // console.log(listaTipoSite)

  for (i = 0; i < listaTipoSite.length; i++) {
    // console.log(listaTipoSite[i])
    const option = document.createElement('option')
    option.value = listaTipoSite[i]
    option.innerHTML = listaTipoSite[i]
    tipoSite.appendChild(option)
  }
}


function carregaAcao() {
  const listaAcao = ["SIM", "NÃO"]
  const tipoSite = document.getElementById('acaoIcone')

  // console.log(listaAcao)

  for (i = 0; i < listaAcao.length; i++) {
    console.log(listaAcao[i])
    const option = document.createElement('option')
    option.value = listaAcao[i]
    option.innerHTML = listaAcao[i]
    tipoSite.appendChild(option)
  }
}