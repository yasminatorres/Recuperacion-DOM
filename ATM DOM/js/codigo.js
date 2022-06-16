let oAtm = new Atm();

//OCULTO FORMULARIOS
ocultarFormularios();
function ocultarFormularios(){
    botones.style.display = "none";
    botones1.style.display = "none";
    botonesC.style.display = "none";
    botonesP.style.display = "none";
    oFormularios = document.querySelectorAll("form");

    for (let i = 0; i < oFormularios.length; i++) {
        oFormularios[i].style.display = "none";

    }
}

//GESTION DE FORM PERSONA
document.getElementById("rbtTipoPersona-C").addEventListener("click", mostrarCliente, false);

document.getElementById("rbtTipoPersona-R").addEventListener("click", mostrarPeon, false);

function mostrarCliente(){
  botones.style.display = "block";
  botones1.style.display = "none";
  botonesC.style.display = "block";
  botonesP.style.display = "none";
}

function mostrarPeon(){
  botones1.style.display = "block";
  botones.style.display = "none";
  botonesP.style.display = "block";
  botonesC.style.display = "none";
}


// Gestión de formularios
function gestionFormularios(sFormularioVisible) {
    ocultarFormularios();
  
    // Hacemos visible el formulario que llega como parámetro
    switch (sFormularioVisible) {
      case "frmAltaCategoria":
        listados.innerHTML="";
        frmAltaCategoria.style.display = "block";
        break;
      case "frmAltaPersona":
        listados.innerHTML="";
        frmAltaPersona.style.display = "block";
        break;
      case "frmAnularPersona":
        listados.innerHTML="";
        frmAnularPersona.style.display = "block";
        cargarPeones();
        cargarClientes();
        break;
      case "frmAltaCita":
        listados.innerHTML="";
        frmAltaCita.style.display = "block";
        cargarClientes();
        break;
      case "frmModificarCita":
        listados.innerHTML="";
        cargarCitas();
        cargarTabla();
        break;
      case "listadoCitas":
        cargarCitas();
        listadoCitas();
        break;
      case "listadoCategorias":
        listadoCategorias();
        break;
      case "listadoCitasDia":
        cargarCitas();
        listados.innerHTML="";
        listadoCitasDia.style.display = "block";
        break;
      case "listadoCitasFecha":
        cargarCitas();
        listados.innerHTML="";
        listadoCitasFecha.style.display = "block";
        break;
    }
  }

//------------------ALTAS----------------------------------------------------------------------------------
  document.getElementById("btnAceptarAltaCategoria").addEventListener("click", validarFormularioAltaCategoria, false);

  //Validacion Formulario altaCategoria
  function validarFormularioAltaCategoria() {

    let sErrores = "";
    let bValido = true; // en principio el formulario es válido

    // Validación ID
    let iID = frmAltaCategoria.txtIDCategoria.value.trim();
    oExpReg = /^[1-9\s]{1,2}$/;
    
    if (oExpReg.test(iID) == false) {
    
        if (bValido == true) { // ==> Primer error detectado en este campo
            frmAltaCategoria.txtIDCategoria.focus();
            bValido = false;
        }
    
        frmAltaCategoria.txtIDCategoria.classList.add("error");
        sErrores += "El ID debe contener solo números hasta 2 cifras\n";
    }

    // Validación Nombre
    let sNombre = frmAltaCategoria.txtNombre.value.trim();
    oExpReg = /^[A-Z\s]{1}[a-zA-Z\s]{1,20}$/;
    
    if (oExpReg.test(sNombre) == false) {
    
        if (bValido == true) { // ==> Primer error detectado en este campo
            frmAltaCategoria.txtNombre.focus();
            bValido = false;
        }
    
        frmAltaCategoria.txtNombre.classList.add("error");
        sErrores += "El nombre debe contener la primera letra mayuscula y tener entre 2 y 20 caracteres\n";
    }
        
    // Validación Refresco
    let sExperiencia = frmAltaCategoria.txtExperiencia.value.trim();
    oExpReg = /^[a-zA-Z\s]{2,20}$/;

    if (oExpReg.test(sExperiencia) == false) {

    	if (bValido == true) { // ==> Primer error detectado en este campo
			frmAltaCategoria.txtExperiencia.focus();
	        bValido = false;
	    }

        frmAltaCategoria.txtExperiencia.classList.add("error");
        sErrores += "La experiencia debe contener letras mayúsculas y/o minúsculas y tener entre 2 y 20 caracteres\n";
    }        

    // --------------------------------------------------------------
    // COMPROBACIÓN FINAL
    if (bValido) { // Si todo OK
        let oCategoria;
        oCategoria = new Categoria(iID, sNombre, sExperiencia);
        if (oAtm.altaCategoria(oCategoria)){
            alert("Categoría registrada.");
            frmAltaCategoria.reset(); // Vaciamos los campos del formulario
            frmAltaCategoria.style.display = "none"; 
        //añadir categoria;
        }
        else{
            alert("Categoría registrada previamente.");
        }
    } else {
        //generamos el alert -------
        alert(sErrores);
    }

}

document.getElementById("btnAceptarAltaPersona").addEventListener("click", validarFormularioAltaPersona, false);

//Validacion Formulario altaCategoria
function validarFormularioAltaPersona() {

    let sErrores = "";
    let bValido = true; // en principio el formulario es válido
  
    // Validación Nombre
    let sNombre = frmAltaPersona.txtNombre.value.trim();
    oExpReg = /^[A-Z\s]{1}[a-zA-Z\s]{1,20}$/;
  
    if (oExpReg.test(sNombre) == false) {
  
        if (bValido == true) { // ==> Primer error detectado en este campo
          frmAltaPersona.txtNombre.focus();
            bValido = false;
        }
  
        frmAltaPersona.txtNombre.classList.add("error");
        sErrores += "El nombre debe contener la primera letra mayuscula y tener entre 2 y 20 caracteres\n";
    }
  
    // Validación Apellido
    let sApellido = frmAltaPersona.txtApellido.value.trim();
    oExpReg = /^[A-Z\s]{1}[a-zA-Z\s]{1,20}$/;
    
    if (oExpReg.test(sApellido) == false) {
    
        if (bValido == true) { // ==> Primer error detectado en este campo
            frmAltaPersona.txtApellido.focus();
            bValido = false;
        }
    
        frmAltaPersona.txtApellido.classList.add("error");
        sErrores += "El apellido debe contener la primera letra mayuscula y tener entre 2 y 20 caracteres\n";
    }
     
    // Validación Telefono
    let iTelefono = frmAltaPersona.txtTelefono.value.trim();
    oExpReg = /^[6\s]{1}[0-9\s]{8}$/;
    
    if (oExpReg.test(iTelefono) == false) {
    
        if (bValido == true) { // ==> Primer error detectado en este campo
            frmAltaPersona.txtTelefono.focus();
            bValido = false;
        }
    
        frmAltaPersona.txtTelefono.classList.add("error");
        sErrores += "El telefono debe tener 9 numeros y empezar por 6\n";
    }    

    // Validación Email
    let sEmail = frmAltaPersona.txtEmail.value.trim();
    oExpReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
    if (oExpReg.test(sEmail) == false) {
    
        if (bValido == true) { // ==> Primer error detectado en este campo
            frmAltaPersona.txtEmail.focus();
            bValido = false;
        }
    
        frmAltaPersona.txtEmail.classList.add("error");
        sErrores += "El email debe cumplir su formato\n";
    } 
  
    //Validar checkbox
    var bCheck = false;
    for(let i = 0; i < frmAltaPersona.rbtTipoPersona.length; i++)
    {
        if(frmAltaPersona.rbtTipoPersona[i].checked)
            bCheck = true;
    }
    console.log(bCheck);
    if(bCheck == false)
    {
        bValido = false;
        frmAltaPersona.rbtTipoPersona[0].focus();
        document.querySelector(".radio").parentNode.classList.add("error");
        sErrores += "Debe marcar una opción en Tipo de Persona\n";
    }
  
    //Validar medio seleccionado
    var radioCliente = document.getElementById("rbtTipoPersona-C");
    var radioPeon = document.getElementById("rbtTipoPersona-R");
   
  
    if(radioCliente.checked)
    {
        //Validar IdCliente
        var iIdCliente = frmAltaPersona.txtIdCliente.value.trim();
        oExpReg = /^[0-9]{3}$/;
        if (oExpReg.test(iIdCliente) == false) {
  
            if (bValido == true) { // ==> Primer error detectado en este campo
                frmAltaPersona.txtIdCliente.focus();
                bValido = false;
            }
  
            frmAltaPersona.txtIdCliente.classList.add("error");
            sErrores += "El Id Cliente deben ser 3 numeros\n";
        }

        //Validar direccion

        var sDireccion = frmAltaPersona.txtDireccion.value.trim();
        oExpReg = /^[A-Z\s]{1}[a-zA-Z\s]{1,20}$/;
    
        if (oExpReg.test(sDireccion) == false) {
    
            if (bValido == true) { // ==> Primer error detectado en este campo
                frmAltaPersona.txtDireccion.focus();
                bValido = false;
            }
    
            frmAltaPersona.txtDireccion.classList.add("error");
            sErrores += "La dirección debe contener la primera letra mayuscula y tener entre 2 y 20 caracteres\n";
        }
    }
    else if(radioPeon.checked)
    {
        //Validar Repartidor
        var iIdPeon = frmAltaPersona.txtIdPeon.value.trim();
        oExpReg = /^[0-9]{3}$/;
  
        if (oExpReg.test(iIdPeon) == false) {
  
            if (bValido == true) { // ==> Primer error detectado en este campo
                frmAltaPersona.txtIdPeon.focus();
                bValido = false;
            }
  
            frmAltaPersona.txtIdPeon.classList.add("error");
            sErrores += "El Id Peon deben ser 3 numeros\n";
        }

        //Validar la categoria
          
        var sCategoria = frmAltaPersona.txtCategoria.value.trim();
        oExpReg = /^[A-Z\s]{1}[a-zA-Z\s]{1,20}$/;
    
        if (oExpReg.test(sCategoria) == false) {
    
            if (bValido == true) { // ==> Primer error detectado en este campo
                frmAltaPersona.txtCategoria.focus();
                bValido = false;
            }
    
            frmAltaPersona.txtCategoria.classList.add("error");
            sErrores += "La categoría debe contener la primera letra mayuscula y tener entre 2 y 20 caracteres\n";
        }
    }
  
    // --------------------------------------------------------------
    // COMPROBACIÓN FINAL
    if (bValido) { // Si todo OK
  
        if(radioCliente.checked){
            oPersona = new Cliente(sNombre, sApellido, iTelefono, sEmail, iIdCliente, sDireccion);
        }
        else{
            oPersona = new Peon(sNombre, sApellido, iTelefono, sEmail, iIdPeon, sCategoria);
        }
  
        if (oAtm.altaPersona(oPersona)){
            alert("Persona dada de alta.");
            frmAltaPersona.reset(); // Vaciamos los campos del formulario
            frmAltaPersona.style.display = "none";
            //AñadirPersona;
        }else{
            alert("Persona registrada previamente");
            frmAltaPersona.reset();
        }
    
    }else {
        //generamos el alert -------
        alert(sErrores);
    }
  
}

document.getElementById("btnAceptarCita").addEventListener("click", validarFormularioAltaCita, false);

//Validacion Formulario altaCategoria
function validarFormularioAltaCita() {

    let sErrores = "";
    let bValido = true; // en principio el formulario es válido
    let vendida = false;

    // Validación ID cita
    let iIdCita = frmAltaCita.txtIdCita.value.trim();
    oExpReg = /^[1-9\s]{1,2}$/;
  
    if (oExpReg.test(iIdCita) == false) {
  
        if (bValido == true) { // ==> Primer error detectado en este campo
            frmAltaCita.txtIdCita.focus();
            bValido = false;
        }
  
        frmAltaCita.txtIdCita.classList.add("error");
        sErrores += "El ID debe contener solo números hasta 2 cifras\n";
    }

    //Validar IdCliente
    var iIdCliente = frmAltaCita.txtIdCliente.value.trim();
    oExpReg = /^[0-9]{3}$/;
    if (oExpReg.test(iIdCliente) == false) {

        if (bValido == true) { // ==> Primer error detectado en este campo
            frmAltaCita.txtIdCliente.focus();
            bValido = false;
        }

        frmAltaCita.txtIdCliente.classList.add("error");
        sErrores += "El Id Cliente deben ser 3 numeros\n";
    }    
     
    //Validar idPedido
    var dtFecha = frmAltaCita.txtFecha.value.trim();
    let validaFecha = Date.parse(dtFecha);
    if  (isNaN(validaFecha)) {

        if (bValido == true) { // ==> Primer error detectado en este campo
            frmAltaCita.txtFecha.focus();
            bValido = false;
        }

        frmAltaCita.txtFecha.classList.add("error");
        sErrores += "Debe seleccionar una fecha\n";
    }      
     
    // Validación tipo reforma
    var sTipo = frmAltaCita.txtReforma.value.trim();
    oExpReg = /^[A-Z\s]{1}[a-zA-Z\s]{1,20}$/;
  
    if (oExpReg.test(sTipo) == false) {
  
        if (bValido == true) { // ==> Primer error detectado en este campo
            frmAltaCita.txtReforma.focus();
            bValido = false;
        }
  
        frmAltaCita.txtReforma.classList.add("error");
        sErrores += "El tipo de reforma debe contener la primera letra mayuscula y tener entre 2 y 40 caracteres\n";
    }

  // --------------------------------------------------------------
  // COMPROBACIÓN FINAL
  if (bValido) { // Si todo OK
      alert("Cita dada de alta.");
      //altaPedido();
      frmAltaCita.reset(); // Vaciamos los campos del formulario
      frmAltaCita.style.display = "none";
      //AñadirProducto;
  } else {
      //generamos el alert -------
      alert(sErrores);
  }

}

//------------------BAJAS------------------------------------------------------------
document.getElementById("btnAceptarAnular").addEventListener("click", aceptarAnularPersona, false);

function aceptarAnularPersona() {
	let sLocalizador = frmAnularPersona.txtPersona.value.trim();

	if (sLocalizador.length==0){
	  alert("Faltan datos por rellenar");
	}
	else {
	  
	if (oAtm.anularPersona(sLocalizador)) {
		  alert("Persona anulada");
		  frmAnularPersona.reset(); // Vaciamos los campos del formulario
		  frmAnularPersona.style.display = "none";
	  } else {
		  alert("La persona no existe");
          frmAnularPersona.reset();
	  }
	}
}

//Si el valor del select es mayor que 0, cambia los inputs
function rellenarInputs(){
    if (frmModificarCliente.txtIdCliente.selectedIndex > 0){
        frmModificarCliente.txtTelefono.value = frmModificarCliente.txtIdCliente.options[frmModificarCliente.txtIdCliente.selectedIndex].dataset.iTelefono;
        frmModificarCliente.txtEmail.value = frmModificarCliente.txtIdCliente.options[frmModificarCliente.txtIdCliente.selectedIndex].dataset.sEmail;
        frmModificarCliente.txtDireccion.value = frmModificarCliente.txtIdCliente.options[frmModificarCliente.txtIdCliente.selectedIndex].dataset.sDireccion;
    }
}

//-----------------------MODIFICACIONES-----------------------------------------
function cargarTabla(){
    listados.innerHTML="";
    let arrayCitas = oAtm.listarCitas();
    let insertar = document.getElementById('listados');

    var tbThead = document.createElement("thead");
    let trEncabezado = document.createElement("tr");

    let thEncabezadoIdCita = document.createElement("th");
    let thEncabezadoIdCliente = document.createElement("th");
    let thEncabezadoFecha = document.createElement("th");
    let thEncabezadoReforma = document.createElement("th");
    let thEncabezadoEditar = document.createElement("th");

    var textoEncabezadoIdCita = document.createTextNode("ID cita");
    var textoEncabezadoIdCliente = document.createTextNode("ID cliente"); 
    var textoEncabezadoFecha = document.createTextNode("Fecha"); 
    var textoEncabezadoReforma = document.createTextNode("Reforma"); 
    var textoEncabezadoEditar = document.createTextNode("Editar"); 

    thEncabezadoIdCita.appendChild(textoEncabezadoIdCita);
    thEncabezadoIdCliente.appendChild(textoEncabezadoIdCliente);
    thEncabezadoFecha.appendChild(textoEncabezadoFecha);
    thEncabezadoReforma.appendChild(textoEncabezadoReforma);
    thEncabezadoEditar.appendChild(textoEncabezadoEditar);

    trEncabezado.appendChild(thEncabezadoIdCita);
    trEncabezado.appendChild(thEncabezadoIdCliente);
    trEncabezado.appendChild(thEncabezadoFecha);
    trEncabezado.appendChild(thEncabezadoReforma);
    trEncabezado.appendChild(thEncabezadoEditar);
  
    var oTabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    oTabla.appendChild(tblBody);

    tbThead.appendChild(trEncabezado);
    oTabla.appendChild(tbThead);

    if (arrayCitas.length > 0) {

        arrayCitas.forEach(element => {

          let tr = document.createElement("tr");

          var celda1 = document.createElement("td"); 
          var celda2 = document.createElement("td"); 
          var celda3 = document.createElement("td");
          var celda4 = document.createElement("td");  
          var celda5 = document.createElement("td");

          var textoCeldaIdCita = document.createTextNode(element.getIdCita());
          var textoCeldaIdCliente = document.createTextNode(element.getIdCliente()); 
          var textoCeldaFecha = document.createTextNode(element.getFecha());
          var textoCeldaReforma = document.createTextNode(element.getReforma()); 
          var textoCeldaEditar = document.createElement('input');

          textoCeldaEditar.type="button";
          textoCeldaEditar.name="editar";
          textoCeldaEditar.className="editar";
          textoCeldaEditar.value="X";
          textoCeldaEditar.onclick="transformarEnEditable(this)";


          celda1.appendChild(textoCeldaIdCita);
          celda2.appendChild(textoCeldaIdCliente);
          celda3.appendChild(textoCeldaFecha);
          celda4.appendChild(textoCeldaReforma);
          celda5.appendChild(textoCeldaEditar);

          tr.appendChild(celda1);
          tr.appendChild(celda2);
          tr.appendChild(celda3);
          tr.appendChild(celda4);
          tr.appendChild(celda5);

          tblBody.appendChild(tr);

      });

      oTabla.appendChild(tblBody);
      insertar.appendChild(oTabla);
      oTabla.setAttribute("border", "2");
  }

  return oTabla;

}

let botonEditar=document.querySelectorAll("editar");
botonEditar.forEach(element => {
    element.addEventListener("click", transformarEnEditable, false)
});

var editando=false;

function transformarEnEditable(nodo){
    alert("Entra");

    //El nodo recibido es SPAN

    if (editando == false) {

        var nodoTd = nodo.parentNode; //Nodo TD
        var nodoTr = nodoTd.parentNode; //Nodo TR

        var nodoContenedorForm = document.getElementById('formularios'); //Nodo DIV
var nodosEnTr = nodoTr.getElementsByTagName('td');

var idCita = nodosEnTr[0].textContent; 
var idCliente = nodosEnTr[1].textContent;
var fecha = nodosEnTr[2].textContent; 
var reforma = nodosEnTr[3].textContent;

var nuevoCodigoHtml = '<td><input type="text" name="idCita" id="idCita" value="'+idCita+'" size="10"></td>'+
'<td><input type="text" name="idCliente" id="idCliente" value="'+idCliente+'" size="5"</td>'+
'<td><input type="text" name="fecha" id="fecha" value="'+fecha+'" size="5"</td>'+
'<td><input type="text" name="reforma" id="reforma" value="'+reforma+'" size="5"</td> <td>En edición</td>';

nodoTr.innerHTML = nuevoCodigoHtml;

nodoContenedorForm.innerHTML = 'Pulse Aceptar para guardar los cambios o cancelar para anularlos'+

'<form name = "formulario" action="http://aprenderaprogramar.com" method="get" onsubmit="capturarEnvio()" onreset="anular()">'+

'<input class="boton" type = "submit" value="Aceptar"> <input class="boton" type="reset" value="Cancelar">';

editando = "true";}

else {alert ('Solo se puede editar una línea. Recargue la página para poder editar otra');

}

}

 
function capturarEnvio(){

var nodoContenedorForm = document.getElementById('formularios'); //Nodo DIV

nodoContenedorForm.innerHTML = 'Pulse Aceptar para guardar los cambios o cancelar para anularlos'+

'<form name = "formulario" action="http://aprenderaprogramar.com" method="get" onsubmit="capturarEnvio()" onreset="anular()">'+

'<input type="hidden" name="idCita" value="'+document.querySelector('#idCita').value+'">'+

'<input type="hidden" name="idCliente" value="'+document.querySelector('#idCliente').value+'">'+

'<input type="hidden" name="fecha" value="'+document.querySelector('#fecha').value+'">'+

'<input type="hidden" name="reforma" value="'+document.querySelector('#reforma').value+'">'+

'<input class="boton" type = "submit" value="Aceptar"> <input class="boton" type="reset" value="Cancelar">';

document.formulario.submit();

}
 
function anular(){
    window.location.reload();
}

//----------------LISTADOS--------------------------------------
document.getElementById("btnAceptarListadoCitasFecha").addEventListener("click", listaCitaFechaEspecifico);

function listaCitaFechaEspecifico(){
    let fecha1 = listadoCitasFecha.txtFechaInicio.value.trim();
    let fecha2 = listadoCitasFecha.txtFechaFin.value.trim();
    listados.innerHTML="";
    let arrayCitas = oAtm.listarCitas(fecha1,fecha2);
    let insertar = document.getElementById('listados');

    var tbThead = document.createElement("thead");
    let trEncabezado = document.createElement("tr");

    let thEncabezadoIdCita = document.createElement("th");
    let thEncabezadoIdCliente = document.createElement("th");
    let thEncabezadoFecha = document.createElement("th");
    let thEncabezadoReforma = document.createElement("th");

    var textoEncabezadoIdCita = document.createTextNode("ID cita");
    var textoEncabezadoIdCliente = document.createTextNode("ID cliente"); 
    var textoEncabezadoFecha = document.createTextNode("Fecha"); 
    var textoEncabezadoReforma = document.createTextNode("Reforma"); 

    thEncabezadoIdCita.appendChild(textoEncabezadoIdCita);
    thEncabezadoIdCliente.appendChild(textoEncabezadoIdCliente);
    thEncabezadoFecha.appendChild(textoEncabezadoFecha);
    thEncabezadoReforma.appendChild(textoEncabezadoReforma);

    trEncabezado.appendChild(thEncabezadoIdCita);
    trEncabezado.appendChild(thEncabezadoIdCliente);
    trEncabezado.appendChild(thEncabezadoFecha);
    trEncabezado.appendChild(thEncabezadoReforma);
  
    var oTabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    oTabla.appendChild(tblBody);

    tbThead.appendChild(trEncabezado);
    oTabla.appendChild(tbThead);

    if (arrayCitas.length > 0) {

        arrayCitas.forEach(element => {

          let tr = document.createElement("tr");

          var celda1 = document.createElement("td"); 
          var celda2 = document.createElement("td"); 
          var celda3 = document.createElement("td");
          var celda4 = document.createElement("td");  

          var textoCeldaIdCita = document.createTextNode(element.getIdCita());
          var textoCeldaIdCliente = document.createTextNode(element.getIdCliente()); 
          var textoCeldaFecha = document.createTextNode(element.getFecha());
          var textoCeldaReforma = document.createTextNode(element.getReforma()); 

          celda1.appendChild(textoCeldaIdCita);
          celda2.appendChild(textoCeldaIdCliente);
          celda3.appendChild(textoCeldaFecha);
          celda4.appendChild(textoCeldaReforma);

          tr.appendChild(celda1);
          tr.appendChild(celda2);
          tr.appendChild(celda3);
          tr.appendChild(celda4);

          tblBody.appendChild(tr);

      });

      oTabla.appendChild(tblBody);
      insertar.appendChild(oTabla);
      oTabla.setAttribute("border", "2");
  }

  return oTabla;
}

document.getElementById("btnAceptarListadoCitasDia").addEventListener("click", listaCitaEspecifico);

function listaCitaEspecifico(){
    let fecha1 = listadoCitasDia.txtFecha.value.trim();
    console.log(fecha1);
    listados.innerHTML="";
    let arrayCitas = oAtm.listarCitas(fecha1);
    let insertar = document.getElementById('listados');

    var tbThead = document.createElement("thead");
    let trEncabezado = document.createElement("tr");

    let thEncabezadoIdCita = document.createElement("th");
    let thEncabezadoIdCliente = document.createElement("th");
    let thEncabezadoFecha = document.createElement("th");
    let thEncabezadoReforma = document.createElement("th");

    var textoEncabezadoIdCita = document.createTextNode("ID cita");
    var textoEncabezadoIdCliente = document.createTextNode("ID cliente"); 
    var textoEncabezadoFecha = document.createTextNode("Fecha"); 
    var textoEncabezadoReforma = document.createTextNode("Reforma"); 

    thEncabezadoIdCita.appendChild(textoEncabezadoIdCita);
    thEncabezadoIdCliente.appendChild(textoEncabezadoIdCliente);
    thEncabezadoFecha.appendChild(textoEncabezadoFecha);
    thEncabezadoReforma.appendChild(textoEncabezadoReforma);

    trEncabezado.appendChild(thEncabezadoIdCita);
    trEncabezado.appendChild(thEncabezadoIdCliente);
    trEncabezado.appendChild(thEncabezadoFecha);
    trEncabezado.appendChild(thEncabezadoReforma);
  
    var oTabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    oTabla.appendChild(tblBody);

    tbThead.appendChild(trEncabezado);
    oTabla.appendChild(tbThead);

    if (arrayCitas.length > 0) {

        arrayCitas.forEach(element => {

          let tr = document.createElement("tr");

          var celda1 = document.createElement("td"); 
          var celda2 = document.createElement("td"); 
          var celda3 = document.createElement("td");
          var celda4 = document.createElement("td");  

          var textoCeldaIdCita = document.createTextNode(element.getIdCita());
          var textoCeldaIdCliente = document.createTextNode(element.getIdCliente()); 
          var textoCeldaFecha = document.createTextNode(element.getFecha());
          var textoCeldaReforma = document.createTextNode(element.getReforma()); 

          celda1.appendChild(textoCeldaIdCita);
          celda2.appendChild(textoCeldaIdCliente);
          celda3.appendChild(textoCeldaFecha);
          celda4.appendChild(textoCeldaReforma);

          tr.appendChild(celda1);
          tr.appendChild(celda2);
          tr.appendChild(celda3);
          tr.appendChild(celda4);

          tblBody.appendChild(tr);

      });

      oTabla.appendChild(tblBody);
      insertar.appendChild(oTabla);
      oTabla.setAttribute("border", "2");
  }

  return oTabla;
}

//mostrarFiltros
function mostrarFiltros(){
    let oInput1 = document.getElementById("fechaInicioListado");
    let oSpan1 = document.getElementById("lblFechaInicio");
    let oInput2 = document.getElementById("fechaFinListado");
    let oSpan2 = document.getElementById("lblFinInicio");
    let oSpanDNI = document.getElementById("lblDNIBuscar");
    let oInputDNI = document.getElementById("iDNIBuscar")
    if(oInput1==null){
        oInput1= document.createElement("input");
        oSpan1= document.createElement("Span");
        oInput2= document.createElement("input");
        oSpan2= document.createElement("Span");
    }
    if (oInputDNI == null) {
        oInputDNI= document.createElement("input");
        oSpanDNI= document.createElement("Span");
    }
    switch(document.getElementById('comboListados').value){

        case "buscarSocioPorDNI":
            oInput1.remove();
            oSpan1.remove();
            oInput2.remove();
            oSpan2.remove();
            oInputDNI.setAttribute("type","text");
            oInputDNI.setAttribute("id","iDNIBuscar");
            oInputDNI.classList.add("form-control");
            oInputDNI.classList.add("mb-4");
            frmListados.insertBefore(oInputDNI,frmListados.botonEnviar);
            oSpanDNI.setAttribute("id","lblDNIBuscar");
            oSpanDNI.textContent = "DNI";
            oSpanDNI.classList.add("input-group-text");
            frmListados.insertBefore(oSpanDNI,oInputDNI);
            break;

        default:
            oInput1.remove();
            oSpan1.remove();
            oInput2.remove();
            oSpan2.remove();
            oInputDNI.remove();
            oSpanDNI.remove();
            break;
    }
}

function listadoCitas(){
    listados.innerHTML="";
    let arrayCitas = oAtm.listarCitas();
    let insertar = document.getElementById('listados');

    var tbThead = document.createElement("thead");
    let trEncabezado = document.createElement("tr");

    let thEncabezadoIdCita = document.createElement("th");
    let thEncabezadoIdCliente = document.createElement("th");
    let thEncabezadoFecha = document.createElement("th");
    let thEncabezadoReforma = document.createElement("th");

    var textoEncabezadoIdCita = document.createTextNode("ID cita");
    var textoEncabezadoIdCliente = document.createTextNode("ID cliente"); 
    var textoEncabezadoFecha = document.createTextNode("Fecha"); 
    var textoEncabezadoReforma = document.createTextNode("Reforma"); 

    thEncabezadoIdCita.appendChild(textoEncabezadoIdCita);
    thEncabezadoIdCliente.appendChild(textoEncabezadoIdCliente);
    thEncabezadoFecha.appendChild(textoEncabezadoFecha);
    thEncabezadoReforma.appendChild(textoEncabezadoReforma);

    trEncabezado.appendChild(thEncabezadoIdCita);
    trEncabezado.appendChild(thEncabezadoIdCliente);
    trEncabezado.appendChild(thEncabezadoFecha);
    trEncabezado.appendChild(thEncabezadoReforma);
  
    var oTabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    oTabla.appendChild(tblBody);

    tbThead.appendChild(trEncabezado);
    oTabla.appendChild(tbThead);

    if (arrayCitas.length > 0) {

        arrayCitas.forEach(element => {

          let tr = document.createElement("tr");

          var celda1 = document.createElement("td"); 
          var celda2 = document.createElement("td"); 
          var celda3 = document.createElement("td");
          var celda4 = document.createElement("td");  

          var textoCeldaIdCita = document.createTextNode(element.getIdCita());
          var textoCeldaIdCliente = document.createTextNode(element.getIdCliente()); 
          var textoCeldaFecha = document.createTextNode(element.getFecha());
          var textoCeldaReforma = document.createTextNode(element.getReforma()); 

          celda1.appendChild(textoCeldaIdCita);
          celda2.appendChild(textoCeldaIdCliente);
          celda3.appendChild(textoCeldaFecha);
          celda4.appendChild(textoCeldaReforma);

          tr.appendChild(celda1);
          tr.appendChild(celda2);
          tr.appendChild(celda3);
          tr.appendChild(celda4);

          tblBody.appendChild(tr);

      });

      oTabla.appendChild(tblBody);
      insertar.appendChild(oTabla);
      oTabla.setAttribute("border", "2");
  }

  return oTabla;
}

function listadoCategorias(){
    listados.innerHTML="";
    let arrayCategorias = oAtm.listarCategorias();
    let insertar = document.getElementById('listados');

    var tbThead = document.createElement("thead");
    let trEncabezado = document.createElement("tr");

    let thEncabezadoIdCategoria = document.createElement("th");
    let thEncabezadoNombre = document.createElement("th");
    let thEncabezadoExperiencia = document.createElement("th");

    var textoEncabezadoIdCategoria = document.createTextNode("ID categoría");
    var textoEncabezadoNombre = document.createTextNode("Nombre"); 
    var textoEncabezadoExperiencia = document.createTextNode("Experiencia"); 

    thEncabezadoIdCategoria.appendChild(textoEncabezadoIdCategoria);
    thEncabezadoNombre.appendChild(textoEncabezadoNombre);
    thEncabezadoExperiencia.appendChild(textoEncabezadoExperiencia);

    trEncabezado.appendChild(thEncabezadoIdCategoria);
    trEncabezado.appendChild(thEncabezadoNombre);
    trEncabezado.appendChild(thEncabezadoExperiencia);
  
    var oTabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    oTabla.appendChild(tblBody);

    tbThead.appendChild(trEncabezado);
    oTabla.appendChild(tbThead);

    if (arrayCategorias.length > 0) {

        arrayCategorias.forEach(element => {

          let tr = document.createElement("tr");

          var celda1 = document.createElement("td"); 
          var celda2 = document.createElement("td"); 
          var celda3 = document.createElement("td"); 

          var textoCeldaIdCategoria = document.createTextNode(element.getIdCategoria());
          var textoCeldaNombre = document.createTextNode(element.getNombre()); 
          var textoCeldaExperiencia = document.createTextNode(element.getExperiencia()); 

          celda1.appendChild(textoCeldaIdCategoria);
          celda2.appendChild(textoCeldaNombre);
          celda3.appendChild(textoCeldaExperiencia);

          tr.appendChild(celda1);
          tr.appendChild(celda2);
          tr.appendChild(celda3);

          tblBody.appendChild(tr);

      });

      oTabla.appendChild(tblBody);
      insertar.appendChild(oTabla);
      oTabla.setAttribute("border", "2");
  }

  return oTabla;
}

function listadoPersonas(){
    listados.innerHTML="";
    let arrayPersonas = oAtm.listarPersonas();
    let insertar = document.getElementById('listados');

    var tbThead = document.createElement("thead");
    let trEncabezado = document.createElement("tr");

    let thEncabezadoNombre = document.createElement("th");
    let thEncabezadoApellido = document.createElement("th");
    let thEncabezadoTelefono = document.createElement("th");
    let thEncabezadoEmail = document.createElement("th");

    var textoEncabezadoNombre = document.createTextNode("Nombre");
    var textoEncabezadoApellido = document.createTextNode("Apellido"); 
    var textoEncabezadoTelefono = document.createTextNode("Telefono"); 
    var textoEncabezadoEmail = document.createTextNode("Email");

    thEncabezadoNombre.appendChild(textoEncabezadoNombre);
    thEncabezadoApellido.appendChild(textoEncabezadoApellido);
    thEncabezadoTelefono.appendChild(textoEncabezadoTelefono);
    thEncabezadoEmail.appendChild(textoEncabezadoEmail);

    trEncabezado.appendChild(thEncabezadoNombre);
    trEncabezado.appendChild(thEncabezadoApellido);
    trEncabezado.appendChild(thEncabezadoTelefono);
    trEncabezado.appendChild(thEncabezadoEmail);
  
    var oTabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    oTabla.appendChild(tblBody);

    tbThead.appendChild(trEncabezado);
    oTabla.appendChild(tbThead);

    if (arrayPersonas.length > 0) {

        arrayPersonas.forEach(element => {

          let tr = document.createElement("tr");

          var celda1 = document.createElement("td"); 
          var celda2 = document.createElement("td"); 
          var celda3 = document.createElement("td"); 
          var celda4 = document.createElement("td"); 

          var textoCeldaNombre = document.createTextNode(element.getNombre());
          var textoCeldaApellido = document.createTextNode(element.getApellido()); 
          var textoCeldaTelefono = document.createTextNode(element.getTelefono()); 
          var textoCeldaEmail = document.createTextNode(element.getEmail()); 

          celda1.appendChild(textoCeldaNombre);
          celda2.appendChild(textoCeldaApellido);
          celda3.appendChild(textoCeldaTelefono);
          celda4.appendChild(textoCeldaEmail);

          tr.appendChild(celda1);
          tr.appendChild(celda2);
          tr.appendChild(celda3);
          tr.appendChild(celda4);

          tblBody.appendChild(tr);

      });

      oTabla.appendChild(tblBody);
      insertar.appendChild(oTabla);
      oTabla.setAttribute("border", "2");
  }

  return oTabla;
};


// IMPLEMENTACIÓN ARCHIVOs XML ----------------------------------------------------------------------------------------------------------------

function cargarXML(filename) {
    if (window.XMLHttpRequest){
        var xhttp = new XMLHttpRequest();
    } else {// code for IE5 and IE6
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);

    xhttp.send();

    return xhttp.responseXML;
}

function cargarClientes() {
    var oXML = cargarXML("clientes.xml");
    var oClientes = oXML.getElementsByTagName("cliente");
    var select = document.getElementById("selectCliente");

    // Cargo los clientes
    for(var i = 0; i < oClientes.length; i++){
        var sNombre = oClientes[i].getElementsByTagName("nombre")[0].textContent;
        var sApellido = oClientes[i].getElementsByTagName("apellido")[0].textContent;
        var sTelefono = oClientes[i].getElementsByTagName("telefono")[0].textContent;
        var sEmail = oClientes[i].getElementsByTagName("email")[0].textContent;
        var iId = oClientes[i].getElementsByTagName("id")[0].textContent;
        var sDireccion = oClientes[i].getElementsByTagName("direccion")[0].textContent;

        var cliente = new Cliente(sNombre,sApellido,sTelefono,sEmail,iId,sDireccion);

        oAtm.altaPersona(cliente);

        select.appendChild(cliente);
 
        document.body.appendChild(select);
    }
    
}

function cargarPeones() {
    var oXML = cargarXML("peones.xml");
    var oPeones = oXML.getElementsByTagName("peon");

    // Cargo los peones
    for(var i = 0; i < oPeones.length; i++){
        var sNombre = oPeones[i].getElementsByTagName("nombre")[0].textContent;
        var sApellido = oPeones[i].getElementsByTagName("apellido")[0].textContent;
        var sTelefono = oPeones[i].getElementsByTagName("telefono")[0].textContent;
        var sEmail = oPeones[i].getElementsByTagName("email")[0].textContent;
        var iId = oPeones[i].getElementsByTagName("id")[0].textContent;
        var sCategoria = oPeones[i].getElementsByTagName("categoria")[0].textContent;

        var peon = new Peon(sNombre,sApellido,sTelefono,sEmail,iId,sCategoria);

        oAtm.altaPersona(peon);
    }
}

function cargarCitas() {
    var oXML = cargarXML("citas.xml");
    var oCitas = oXML.getElementsByTagName("cita");

    // Cargo los clientes
    for(var i = 0; i < oCitas.length; i++){
        var iIdCita = oCitas[i].getElementsByTagName("idCita")[0].textContent;
        var iIdCliente = oCitas[i].getElementsByTagName("idCliente")[0].textContent;
        var dFecha = oCitas[i].getElementsByTagName("fecha")[0].textContent;
        var sTipo = oCitas[i].getElementsByTagName("tipo")[0].textContent;

        var cita = new Cita(iIdCita,iIdCliente,dFecha,sTipo);

        oAtm.altaCita(cita);
    }
}