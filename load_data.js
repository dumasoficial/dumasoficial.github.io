
//bool indica si tienen ley seca. true-> alcaldia tiene ley seca
var fechaTxt="19 de marzo a las 18:00 horas hasta el domingo 21";
var alcaldias = {"Álvaro Obregón":true, "Benito Juárez":true, "Coyoacán":true, "Cuajimalpa":false, "Cuauhtémoc":true, "Gustavo A. Madero":false, "Iztacalco":true, "Iztapalapa":true};

function displayAlcaldiasList(){
    var listaAlcaldiasConLeySeca=document.createElement("ul");
    var listaAlcaldiasSinLeySeca=document.createElement("ul");
    listaAlcaldiasConLeySeca.setAttribute("class","listaAlcaldia");
    listaAlcaldiasSinLeySeca.setAttribute("class","listaAlcaldia");
    for(alcaldia in alcaldias){
        var temp=document.createElement("li");
        if(alcaldias[alcaldia]==true){
            temp.setAttribute("class","text-danger"); //conLeySeca css
        }else{
            temp.setAttribute("class","text-success");
        }   
        temp.innerHTML="<strong>" +alcaldia+"</strong>";
        if(alcaldias[alcaldia]==true){
            listaAlcaldiasConLeySeca.appendChild(temp);
        }else{
            listaAlcaldiasSinLeySeca.appendChild(temp);
        } 
    }
    document.getElementById("alcaldiasConLeySeca").appendChild(listaAlcaldiasConLeySeca);  
    document.getElementById("alcaldiasSinLeySeca").appendChild(listaAlcaldiasSinLeySeca);   
}
function displayFecha(){
    var introTxt="Las alcaldías seleccionadas para no permitir la venta de alcohol a partir del ";
    var endTxt=" son:";
    document.getElementById("fechaConLeySeca").innerHTML=introTxt+"<strong>"+fechaTxt+"</strong>"+endTxt;
}
displayFecha();
displayAlcaldiasList();
