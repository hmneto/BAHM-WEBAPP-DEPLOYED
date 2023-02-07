function mySubmitFunction(e) {
  e.preventDefault();
  fetch(linkApi + "/usuario/Login", {
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
    .then((x) => {
      if (x.status == 200) return x.json()
      else false
    })
    .then((x) => {
      if (x) {
        sessionStorage.setItem("loginStore", x.token);
        openView("mapa");
      } else {
        alert(x.message)
      }
    });
}