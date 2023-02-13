
function montaPaginaContato(element){
    console.log(element)

    const row = document.createElement('div')
    row.id = "contato-"+element.idContato
    row.className="row"
    const colMd10 = document.createElement('div')
    colMd10.className = "col-md-10"

    const button = document.createElement('button')
    button.innerHTML="DELETE"

    button.className="btn btn-danger form-control"

    button.addEventListener('click', function(){
        document.getElementById('contato-'+element.idContato).remove()
    })

    const colMd2 = document.createElement('div')
    colMd2.className = "col-md-2"

    colMd2.appendChild(button)

    const formGroup = document.createElement('div')
    formGroup.className="form-group"
  
    const inputInfoContato = document.createElement('input')
    const inputIdContato = document.createElement('input')
  
    inputInfoContato.className= "form-control"
    inputInfoContato.value=element.infoContato
    inputInfoContato.disabled = true
  
    inputIdContato.value = element.idContato
  
    inputIdContato.className="contatoSelecionadoClass"
  
    inputIdContato.hidden = true
  
    row.appendChild(colMd10)
    row.appendChild(colMd2)
    colMd10.appendChild(formGroup)
  
    formGroup.appendChild(inputInfoContato)
    formGroup.appendChild(inputIdContato)
  
    
    listaContatoSelecionado.appendChild(row)
  
    listaContatoSelecionado.appendChild(document.createElement('br'))
  }



function montaPaginaSite(element){
    console.log(element)

    const row = document.createElement('div')
    row.id = "site-"+element.idSite
    row.className="row"
    const colMd10 = document.createElement('div')
    colMd10.className = "col-md-10"

    const button = document.createElement('button')
    button.innerHTML="DELETE"

    button.className="btn btn-danger form-control"

    button.addEventListener('click', function(){
        document.getElementById('site-'+element.idSite).remove()
    })

    const colMd2 = document.createElement('div')
    colMd2.className = "col-md-2"

    colMd2.appendChild(button)

    const formGroup = document.createElement('div')
    formGroup.className="form-group"
  
    const inputInfoSite = document.createElement('input')
    const inputIdSite = document.createElement('input')
  
    inputInfoSite.className= "form-control"
    inputInfoSite.value=element.nomeSite
    inputInfoSite.disabled = true
  
    inputIdSite.value = element.idSite
  
    inputIdSite.className="siteSelecionadoClass"
  
    inputIdSite.hidden = true
  
    row.appendChild(colMd10)
    row.appendChild(colMd2)
    colMd10.appendChild(formGroup)
  
    formGroup.appendChild(inputInfoSite)
    formGroup.appendChild(inputIdSite)
  
    
    listaSiteSelecionado.appendChild(row)
  
    listaSiteSelecionado.appendChild(document.createElement('br'))
  }


  function carregaTipoSite(){
    const listaTipoSite = ["STREET","FOTO","WIKIMAPIA_SAT","WIKIMAPIA_FRIO","PM","SITE","ABCR","CONCESSIONARIA","FOTO_MAPA","WIKIPEDIA","LEI"]
    const tipoSite = document.getElementById('tipoSite')

    console.log(listaTipoSite)

    for(i=0;i<listaTipoSite.length;i++){
        console.log(listaTipoSite[i])
        const option = document.createElement('option')
        option.value=listaTipoSite[i]
        option.innerHTML=listaTipoSite[i]
        tipoSite.appendChild(option)
    }
  }


  function carregaAcao(){
    const listaAcao = ["SIM","NÃO"]
    const tipoSite = document.getElementById('acaoIcone')

    console.log(listaAcao)

    for(i=0;i<listaAcao.length;i++){
        console.log(listaAcao[i])
        const option = document.createElement('option')
        option.value=listaAcao[i]
        option.innerHTML=listaAcao[i]
        tipoSite.appendChild(option)
    }
  }