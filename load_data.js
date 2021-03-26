//datos a actualizar
var avisoHTML=null; //null
var sabemos = false; //si ya sabemos donde hay ley seca
var fechaNoSabemos='26 a 28 de marzo 2021';
var htmlNoSabemos = '<p>Todavía no sabemos qué alcaldías tendrán "Ley Seca" este fin de semana ('+fechaNoSabemos+'). En cuanto lo anuncie el Gobierno de la Ciudad de México o algún periodico (usualmente los viernes por la mañana) se actualizará la página.</p>';
var fechaTxt = "viernes 26 de marzo a las 18:00 horas hasta el domingo 28";
//true indica que alcaldia tiene ley seca
var alcaldias = { "Álvaro Obregón": false,"Azcapotzalco":false, "Benito Juárez": false, "Coyoacán": false, "Cuajimalpa": false, "Cuauhtémoc": false, "Gustavo A. Madero": false, "Iztacalco": false, "Iztapalapa": false ,"Magdalena Contreras":false,"Miguel Hidalgo":false,"Milpa Alta":false,"Tláhuac":false,"Tlalpan":false,"Venustiano Carranza":false,"Xochimilco":false};
//
var htmlAlcaldiasSinLey='<p>Las alcaldias <strong>sin "Ley Seca"</strong> este fin de semana son:</p>';
function displayAlcaldiasList() {
    if (!sabemos) {
        var aviso = document.createElement("div");
        aviso.setAttribute("class", "alert alert-info text-center");
        aviso.innerHTML = htmlNoSabemos;
        document.getElementById("main").innerHTML="";
        document.getElementById("main").appendChild(aviso);
    } else {
        var listaAlcaldiasConLey = Object.keys(alcaldias).filter((k) => alcaldias[k]); //alcaldias con ley seca
        var listaAlcaldiasSinLey = Object.keys(alcaldias).filter((k) => !alcaldias[k]); //alcaldias sin ley seca
        var listaAlcaldiasConLeyDOM = document.createElement("ul");
        var listaAlcaldiasSinLeyDOM = document.createElement("ul");
        listaAlcaldiasConLeyDOM.setAttribute("class", "listaAlcaldia");
        listaAlcaldiasSinLeyDOM.setAttribute("class", "listaAlcaldia");
        for(alcaldia of listaAlcaldiasConLey){
            var temp=document.createElement("li");
            temp.setAttribute("class","text-danger");
            temp.innerHTML="<strong>" + alcaldia + "</strong>";
            listaAlcaldiasConLeyDOM.appendChild(temp);
        }
        for(alcaldia of listaAlcaldiasSinLey){
            var temp=document.createElement("li");
            temp.setAttribute("class","text-success");
            temp.innerHTML="<strong>" + alcaldia + "</strong>";
            listaAlcaldiasSinLeyDOM.appendChild(temp);
        }
        if(listaAlcaldiasConLey.length>0){
            displayFecha();
            document.getElementById("alcaldiasConLeySeca").appendChild(listaAlcaldiasConLeyDOM);
        }
        if(listaAlcaldiasSinLey.length>0){
            document.getElementById("alcaldiasSinLeySeca").innerHTML=htmlAlcaldiasSinLey;
            document.getElementById("alcaldiasSinLeySeca").appendChild(listaAlcaldiasSinLeyDOM);
        }
    }
}
function displayFecha() {
    var introTxt = "Las alcaldías seleccionadas para no permitir la venta de alcohol a partir del ";
    var endTxt = " son:";
    document.getElementById("fechaConLeySeca").innerHTML = introTxt + "<strong>" + fechaTxt + "</strong>" + endTxt;
}
//displayFecha();
displayAlcaldiasList();
