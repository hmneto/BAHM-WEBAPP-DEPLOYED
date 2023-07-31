function buscarTable(input, table) {
  sessionStorage.setItem(input, document.getElementById(input).value)



  // Obtém o valor do elemento de entrada e divide a consulta em palavras
  var inputValue = document.getElementById(input).value.trim();
  var filterWords = inputValue.toUpperCase().split(" ");

  // Obtém a tabela e as linhas da tabela
  var tableElement = document.getElementById(table);
  var tr = tableElement.getElementsByTagName("tr");

  // Loop através de todas as linhas da tabela, e mostra/esconde as que correspondem à pesquisa
  for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      txtValue = txtValue.toUpperCase();

      // Verifica se cada palavra da consulta é encontrada em alguma parte do valor da célula
      var found = true;
      for (var j = 0; j < filterWords.length; j++) {
        var filterWord = filterWords[j];
        if (txtValue.indexOf(filterWord) === -1) {
          found = false;
          break;
        }
      }

      if (found) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
