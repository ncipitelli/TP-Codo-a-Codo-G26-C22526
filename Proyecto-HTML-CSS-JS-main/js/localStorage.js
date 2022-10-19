window.onload= init;

let lc; 

function init() { 
	lc = new listaContacto();
	
  	lc.agregarEjemplos();
  	lc.printContactsToConsole();

	
	  lc.mostrarComoTabla("contactos");
}

function formSubmitted() {
	
	let nombre = document.querySelector("#nombre");
    let apellido = document.querySelector("#apellido");
    let email = document.querySelector("#email");
  	let fdn = document.querySelector("#fdn");
	let nuevoContacto = new Contacto(nombre.value,  apellido.value, email.value, fdn.value);
	lc.add(nuevoContacto);
	

	nombre.value = "";
    apellido.value = "";
	email.value = "";
	fdn.value = "";
	

	lc.mostrarComoTabla("contactos");
	
	
	return false;
}

function vaciarLista() {
	lc.vaciar();
    lc.mostrarComoTabla("contactos");
}

function cargarLista() {
	lc.cargar();
    lc.mostrarComoTabla("contactos");
}


class Contacto {
	constructor(nombre, apellido, email, fdn) {
		this.nombre = nombre;
		this.apellido = apellido;
        this.email = email;
		this.fdn = fdn;
	}
}

class listaContacto {
	constructor() {
		
		this.listaDeContactos = [];
	}
	
	agregarEjemplos() {
		var c1 = new Contacto("Juan", "Perez", "jimi@ej.com", "1987-10-06");
        var c2 = new Contacto("Rita", "Gonzalez", "ritag@ej.com", "1988-11-07");
        var c3 = new Contacto("Maria", "Gutierrez", "marieg@ej.com", "1987-02-01");
  		
  		
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		
	}
	
	
	vaciar() {
		this.listaDeContactos = [];
	}
	
	add(contacto) {
		this.listaDeContactos.push(contacto);
	}
	

	printContactsToConsole() {
		this.listaDeContactos.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	cargar() {
		if(localStorage.contactos !== undefined) {
			
			this.listaDeContactos = JSON.parse(localStorage.contactos);
		}
	}
	
	salvarLista() {
		
		localStorage.contactos = JSON.stringify(this.listaDeContactos);
	} 
	
  	mostrarComoTabla(idOfContainer) {
		
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listaDeContactos.length === 0) {
			container.innerHTML = "<p>Sin contactos para mostrar</p>";
			
			return;
		}  
  
    	
    	var tabla = document.createElement("table");
          
        var row0 = tabla.insertRow(0);

            row0.innerHTML = "<th>Nombre</th>" +
            "<th> Apellido </th>" +
            "<th>email</th>" 
            + "<th>Fecha de nacimiento</th>";
            
    
    	this.listaDeContactos.forEach(function(currentContact) {
        
            
        	var row = tabla.insertRow();
        
			row.innerHTML = "<td>" + currentContact.nombre + "</td>" +
                            "<td>" + currentContact.apellido + "</td>" +
                            "<td>" + currentContact.email + "</td>" 
							+ "<td>" + currentContact.fdn + "</td>"
     	});
  
   
     	container.appendChild(tabla);
  	}
}