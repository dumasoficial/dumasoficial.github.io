//datos a actualizar
var sabemos = true; //si ya sabemos donde hay ley seca
var txtNoSabemos = 'Todavía no sabemos qué alcaldías tendrán "Ley Seca" este fin de semana. En cuanto lo anuncie el Gobierno de la Ciudad de México o algún periodico se actualizará la página.';
var fechaTxt = "viernes 26 de marzo a las 18:00 horas hasta el domingo 28";
//true indica que alcaldia tiene ley seca
var alcaldias = { "Álvaro Obregón": true, "Benito Juárez": true, "Coyoacán": true, "Cuajimalpa": false, "Cuauhtémoc": true, "Gustavo A. Madero": false, "Iztacalco": true, "Iztapalapa": true };
//
function displayAlcaldiasList() {
    if (!sabemos) {
        var aviso = document.createElement("div");
        aviso.setAttribute("class", "alert alert-info text-center");
        aviso.innerText = txtNoSabemos;
        document.getElementById("main").innerHTML="";
        document.getElementById("main").appendChild(aviso);
    } else {
        var listaAlcaldiasConLeySeca = document.createElement("ul");
        var listaAlcaldiasSinLeySeca = document.createElement("ul");
        listaAlcaldiasConLeySeca.setAttribute("class", "listaAlcaldia");
        listaAlcaldiasSinLeySeca.setAttribute("class", "listaAlcaldia");
        for (alcaldia in alcaldias) {
            var temp = document.createElement("li");
            if (alcaldias[alcaldia] == true) {
                temp.setAttribute("class", "text-danger"); //conLeySeca css
            } else {
                temp.setAttribute("class", "text-success");
            }
            temp.innerHTML = "<strong>" + alcaldia + "</strong>";
            if (alcaldias[alcaldia] == true) {
                listaAlcaldiasConLeySeca.appendChild(temp);
            } else {
                listaAlcaldiasSinLeySeca.appendChild(temp);
            }
        }
        document.getElementById("alcaldiasConLeySeca").appendChild(listaAlcaldiasConLeySeca);
        document.getElementById("alcaldiasSinLeySeca").appendChild(listaAlcaldiasSinLeySeca);
    }
}
function displayFecha() {
    var introTxt = "Las alcaldías seleccionadas para no permitir la venta de alcohol a partir del ";
    var endTxt = " son:";
    document.getElementById("fechaConLeySeca").innerHTML = introTxt + "<strong>" + fechaTxt + "</strong>" + endTxt;
}
displayFecha();
displayAlcaldiasList();
