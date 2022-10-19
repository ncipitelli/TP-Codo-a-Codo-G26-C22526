window.onload= init;

// The contact manager as a global variable
let lc; 

function init() { 
	// create an instance of the contact manager
	lc = new listaContacto();
	
  	lc.agregarEjemplos();
  	lc.printContactsToConsole();

	  // Display contacts in a table
	  // Pass the id of the HTML element that will contain the table
	  lc.mostrarComoTabla("contactos");
}

function formSubmitted() {
	// Get the values from input fields
	let nombre = document.querySelector("#nombre");
    let apellido = document.querySelector("#apellido");
    let email = document.querySelector("#email");
  	let fdn = document.querySelector("#fdn");
	let nuevoContacto = new Contacto(nombre.value,  apellido.value, email.value, fdn.value);
	lc.add(nuevoContacto);
	
	// Empty the input fields
	nombre.value = "";
    apellido.value = "";
	email.value = "";
	fdn.value = "";
	
	// refresh the html table
	lc.mostrarComoTabla("contactos");
	
	// do not let your browser submit the form using HTTP
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
		// when we build the contact manager, it
		// has an empty list of contacts
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
	
	// Will erase all contacts
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
			// the array of contacts is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listaDeContactos = JSON.parse(localStorage.contactos);
		}
	}
	
	salvarLista() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of contacts to JSON
		localStorage.contactos = JSON.stringify(this.listaDeContactos);
	} 
	
  	mostrarComoTabla(idOfContainer) {
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listaDeContactos.length === 0) {
			container.innerHTML = "<p>Sin contactos para mostrar</p>";
			// stop the execution of this method
			return;
		}  
  
    	// creates and populate the table with users
    	var tabla = document.createElement("table");
          
        var row0 = tabla.insertRow(0);

            row0.innerHTML = "<th>Nombre</th>" +
            "<th> Apellido </th>" +
            "<th>email</th>" 
            + "<th>Fecha de nacimiento</th>";
            
    	// iterate on the array of users
    	this.listaDeContactos.forEach(function(currentContact) {
        	// creates a row
            
        	var row = tabla.insertRow();
        
			row.innerHTML = "<td>" + currentContact.nombre + "</td>" +
                            "<td>" + currentContact.apellido + "</td>" +
                            "<td>" + currentContact.email + "</td>" 
							+ "<td>" + currentContact.fdn + "</td>"
     	});
  
     	// adds the table to the div
     	container.appendChild(tabla);
  	}
}