"use strict";

// Clase Categoria

class Categoria {

    constructor(sidCategoria,sNombre,sExperiencia) {
        this.idCategoria = sidCategoria;
        this.nombre = sNombre;
        this.experiencia = sExperiencia;
    }

    setIdCategoria(sidCategoria){
        this.idCategoria=sidCategoria;
    }

    getIdCategoria(){
        return this.idCategoria;
    }

    setNombre(sNombre){
        this.nombre=sNombre;
    }

    getNombre()
    {
        return this.nombre;
    }
    
    setExperiencia(sExperiencia){
        this.experiencia=sExperiencia;
    }

    getExperiencia()
    {
        return this.experiencia;
    }

    toHTMLRow() {
    let sFila = "<tr>";
    sFila += "<td>" + this.idCategoria + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.experiencia + "</td></tr>";

    return sFila;
}
}

// Clase Persona

class Persona {

    constructor(sNombre,sApellido,iTelefono,sEmail,bVendida) {
        this.nombre = sNombre;
        this.apellido = sApellido;
        this.telefono = iTelefono;
        this.email = sEmail;
        this.vendida = bVendida;
    }

    setNombre(){
        this.nombre = sNombre;
    }

    getNombre(){
        return this.nombre;
    }

    setApellido(){
        this.apellido = sApellido;
    }

    getApellido(){
        return this.apellido;
    }

    setTelefono(){
        this.telefono = iTelefono;
    }

    getTelefono(){
        return this.telefono;
    }

    setEmail(){
        this.email = sEmail;
    }

    getEmail(){
        return this.email;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.nombre + "</td>";
        sFila += "<td>" + this.apellido + "</td>";
        sFila += "<td>" + this.telefono + "</td>";
        sFila += "<td>" + this.email + "</td>";
        sFila += "<td>" + (this.vendida?"SI":"NO") + "</td></tr>";
    
        return sFila;
    }
}

// Clase Cliente

class Cliente extends Persona {
    constructor(sNombre,sApellido,iTelefonos,sEmail,iIdCliente,sDireccion,bVendida) {
      super(sNombre,sApellido,iTelefonos,sEmail,bVendida);
      this.idCliente = iIdCliente;
      this.direccion = sDireccion;
    }

    setIdCliente(){
        this.idCliente = iIdCliente;
    }

    getIdCliente(){
        return this.idCliente;
    }

    setDireccion(){
        this.direccion = sDireccion;
    }

    getDireccion(){
        return this.direccion;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.nombre + "</td>";
        sFila += "<td>" + this.apellido + "</td>";
        sFila += "<td>" + this.telefono + "</td>";
        sFila += "<td>" + this.email + "</td>";
        sFila += "<td>" + this.idCliente + "</td>";
        sFila += "<td>" + this.direccion + "</td>";
        sFila += "<td>" + (this.vendida?"SI":"NO") + "</td></tr>";
    
        return sFila;
}
}

// Clase Peon

class Peon extends Persona {
    constructor(sNombre,sApellido,iTelefonos,sEmail,iIdPeon,sCategoria,bVendida) {
      super(sNombre,sApellido,iTelefonos,sEmail,bVendida);
      this.idPeon = iIdPeon;
      this.categoria = sCategoria;
    }

    setIdPeon(){
        this.idPeon = iIdPeon;
    }

    getIdPeon(){
        return this.idPeon;
    }

    setCategoria(){
        this.categoria = sCategoria;
    }

    getCategoria(){
        return this.categoria;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.nombre + "</td>";
        sFila += "<td>" + this.apellido + "</td>";
        sFila += "<td>" + this.telefono + "</td>";
        sFila += "<td>" + this.email + "</td>";
        sFila += "<td>" + this.idPeon + "</td>";
        sFila += "<td>" + this.categoria + "</td>";
        sFila += "<td>" + (this.vendida?"SI":"NO") + "</td></tr>";
    
        return sFila;
}
}

// Clase Cita

class Cita {

    constructor(iIdCita,oCliente,dFecha,sReforma) {
        this.idCita = iIdCita;
        this.cliente = oCliente;
        this.fecha = dFecha;
        this.reforma = sReforma;
    }

    setIdCita(){
        this.idCita = iIdCita;
    }

    getIdCita(){
        return this.idCita;
    }

    setIdCliente(){
        this.cliente = oCliente;
    }

    getIdCliente(){
        return this.cliente;
    }

    setFecha(){
        this.fecha = dFecha;
    }

    getFecha(){
        return this.fecha;
    }

    setReforma(){
        this.reforma = sReforma;
    }

    getReforma(){
        return this.reforma;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.idCita + "</td>";
        sFila += "<td>" + this.cliente + "</td>";
        sFila += "<td>" + this.fecha.toLocaleDateString() + "</td>";
        sFila += "<td>" + this.reforma + "</td></tr>";

        return sFila;
}
}

// Clase Atm

class Atm {
    
    constructor(){
        this.categorias = [];
        this.personas = [];
        this.citas = [];     
    }


    altaCategoria(oCategoria){
        let bEncontrado = false;
        let bInsertado;

        for(let i=0; i < this.categorias.length && !bEncontrado; i++){
            if(this.categorias[i].nombre == oCategoria.nombre){
                bEncontrado = true;
            }
        }

        if(bEncontrado){ // dado de alta previamente
            bInsertado = false;
        } else {
            bInsertado = true;
            this.categorias.push(oCategoria);
        }

        return bInsertado;
    }

    altaPersona(oPersona){
        let bEncontrado = false;
        let bInsertado;

        console.log(this.personas);

        for(let i=0; i < this.personas.length && !bEncontrado; i++){
            if(this.personas[i].idCliente == oPersona.idCliente){
                bEncontrado = true;
            }
        }

        for(let i=0; i < this.personas.length && !bEncontrado; i++){
            if(this.personas[i].idPeon == oPersona.idPeon){
                bEncontrado = true;
            }
        }

        if(bEncontrado){ // dado de alta previamente
            bInsertado = false;
        } else {
            bInsertado = true;
            this.personas.push(oPersona);
        }

        return bInsertado;
    }

    altaCita(oCita){
        let bEncontrado = false;
        let bInsertado;

        for(let i=0; i < this.citas.length && !bEncontrado; i++){
            if(this.citas[i].idCita == oCita.idCita){
                bEncontrado = true;
            }
        }

        if(bEncontrado){ // dado de alta previamente
            bInsertado = false;
        } else {
            bInsertado = true;
            this.citas.push(oCita);
        }

        return bInsertado;
    }

    listarCitas(){ //Listar todas las citas
        if (oAtm.citas.length > 0)
            return this.citas;
        else
            alert("No hay citas registradas.");
    }

    listarCategorias(){ //Listar todas las categorias
        if (oAtm.categorias.length > 0)
            return this.categorias;
        else
            alert("No hay categorías registradas.");
    }

    listaCitaDias(fecha1)
    {
        let citaAEncontrar;

        for(const cita of this.citas){
            if(cita.fecha==fecha1){
                citaAEncontrar=cita;
            }
        }

        return citaAEncontrar;
    }

    listaCitaFechas(fecha1,fecha2)
    {
        let citaAEncontrar;

        for(const cita of this.citas){
            if(cita.fecha > fecha1 && cita.fecha < fecha2){
                citaAEncontrar=cita;
            }
        }

        return citaAEncontrar;
    }

    anularPersona(loc){
        let encontrado=false;
        console.log(this.personas);
        if(this.personas!=null){
            for(let i=0; i < this.personas.length && !encontrado; i++){
                if(loc==oAtm.personas[i].nombre){
                    console.log(oAtm.personas[i].nombre);
					encontrado=true;
					oAtm.personas[i].vendida = true;
                }
            }
        }
        return encontrado;
    }
    
}



