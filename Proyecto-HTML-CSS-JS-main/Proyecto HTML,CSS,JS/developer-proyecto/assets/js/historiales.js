function searchU() {    
    var queryURL = "https://jsonplaceholder.typicode.com/users";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', queryURL, true);
    
    xhr.onload = function(e) {
      var usuarios = JSON.parse(xhr.response);
    
      mostrarUsuariosComoTabla(usuarios);
    }
    
    xhr.send();
    
} 
  
function mostrarUsuariosComoTabla(usuarios) {
  
    var tablaDiv = document.querySelector("#tabla");
    tablaDiv.innerHTML = "";
  
    var table = document.createElement("table");
    var row0 = table.insertRow(0);
    row0.innerHTML = "<th>Nombre del usuario</th><th>Email</th><th>Telefono</th><th>Ciudad</th>";
    usuarios.forEach(function(currentUser) {
      var row = table.insertRow();
      row.innerHTML = "<td>"+ currentUser.name+ "</td><td>" 
        + currentUser.email + "</td><td>"+ currentUser.phone+ "</td><td>" 
        + currentUser.address.city + "</td>"
    });
  
    tablaDiv.append(table);
}

function searchC() {    
  var queryURL = "https://jsonplaceholder.typicode.com/posts/1/comments";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', queryURL, true);
  
  xhr.onload = function(e) {
    var comentarios = JSON.parse(xhr.response);
  
    mostrarComentariosComoTabla(comentarios);
  }
  
  xhr.send();
  
} 

function mostrarComentariosComoTabla(comentarios) {


  var tablaDiv = document.querySelector("#tabla");
  tablaDiv.innerHTML = "";

  var table = document.createElement("table");
  var row0 = table.insertRow(0);
  row0.innerHTML = "<th>Nombre del usuario</th><th>Email</th><th>Comentario</th>";
  comentarios.forEach(function(currentUser) {
    var row = table.insertRow();
    row.innerHTML = "<td>"+ currentUser.name+ "</td><td>" 
      + currentUser.email + "</td><td>"+ currentUser.body+ "</td>"
  });

  tablaDiv.append(table);
}
