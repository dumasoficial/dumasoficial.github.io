//vamos a tener que def pol para alcaldias, get todos y sortear por distancia.
var map;
var service;
var distanceService;
var infoWindow;
//var alcaldias = { "Álvaro Obregón": true, "Benito Juárez": false, "Coyoacán": true, "Cuajimalpa": false, "Cuauhtémoc": true, "Gustavo A. Madero": false, "Iztacalco": true, "Iztapalapa": true };
var query = "en ";
var posUsuario;
var porAlcaldia = {};
var todos = [];
var aDesplegar = []; //top 5 de resultados x alcaldia. 5xno. de alcandias sin ley seca.
var duraciones = {}; //de aDesplegar;
var duracionesTxt = {};
var distanciasTxt = {};
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 19.428607379617496, lng: -99.16786785469343 },
        zoom: 11,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    });
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Encontrar Chupe Cerca";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) { // Try HTML5 geolocation.
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    createUserPosMarker(pos);
                    map.setCenter(pos);
                    posUsuario = pos;
                    distanceService = new google.maps.DistanceMatrixService();
                    document.getElementById("resultados").innerHTML = "";
                    porAlcaldia = {};
                    todos = [];
                    aDesplegar = [];
                    duraciones = {};
                    duracionesTxt = {};
                    distanciasTxt = {};
                    getBoozeData(map, pos);

                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "No pudimos obtener tu ubicación unu."
            : "Tu dispositivo no soporta geolocalización unu."
    );
    infoWindow.open(map);
}
function createMarker(place) {
    var linkMaps = "https://www.google.com/maps/dir/?api=1&destination=CDMX&destination_place_id=" + place['place_id'] + "&travelmode=car";
    if (!place.geometry || !place.geometry.location) return;
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });
    google.maps.event.addListener(marker, "click", () => {
        infoWindow.setPosition(place.geometry.location);
        infoWindow.setContent("<div><strong>" + place['name'] + "</strong><br>Dirección: " + place['formatted_address'] + "<br><a target='_blank' href=" + linkMaps + ">Abrir en Google Maps</a>");
        infoWindow.open(map);
    });
}
function createUserPosMarker(pos) {
    const markerUsuario = new google.maps.Marker({
        map,
        position: pos,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });
}
function displayResult(resultado) {
    var place_id = resultado['place_id'];
    var duration = duracionesTxt[place_id];
    var distance = distanciasTxt[place_id];
    console.log("displaying:");
    console.log(place_id);
    console.log(resultado);
    console.log("with durations:");
    console.log(duracionesTxt);
    console.log("data:" + duration + "," + distance);
    var linkMaps = "https://www.google.com/maps/dir/?api=1&destination=CDMX&destination_place_id=" + resultado['place_id'] + "&travelmode=car";
    var card = document.createElement("div");
    card.setAttribute("id", place_id);
    card.setAttribute("class", "card");
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    var title = document.createElement("p");
    title.setAttribute("style","font-size:1.23rem;font-weight:500;margin-bottom:0px");
    title.innerHTML = resultado['name'];
    var body = document.createElement("p");
    body.innerHTML = '<span class="badge badge-success">' + duration + '</span> <span class="badge badge-primary">' + distance + '</span><br>' + resultado['formatted_address'] + ".";
    var link = document.createElement("a");
    link.setAttribute("class", "card-link");
    link.setAttribute("href", linkMaps);
    link.setAttribute("target", "_blank");
    link.innerHTML = "Abrir en Google Maps";
    cardBody.appendChild(title);
    cardBody.appendChild(body);
    cardBody.appendChild(link);
    card.appendChild(cardBody);
    console.log(card);
    document.getElementById("resultados").appendChild(card);
}
function getDistanceAndDisplay(resultado) {
    distanceService.getDistanceMatrix(
        {
            origins: [posUsuario],
            destinations: [resultado['geometry']['location']],
            travelMode: 'DRIVING',
        }, (response, status) => {
            if (status !== "OK") {
                console.log("error en " + resultado + status);
                alert("Error: " + staus);
            } else {
                console.log(response);
                duraciones[resultado['place_id']] = response['rows'][0]['elements'][0]['duration']['value'];
                duracionesTxt[resultado['place_id']] = response['rows'][0]['elements'][0]['duration']['text'];
                distanciasTxt[resultado['place_id']] = response['rows'][0]['elements'][0]['distance']['text'];
                if (Object.keys(duraciones).length==aDesplegar.length) {
                    aDesplegar = aDesplegar.sort((f, s) => duraciones[f['place_id']] - duraciones[s['place_id']]);
                    console.log(duracionesTxt);
                    console.log(distanciasTxt);
                    console.log(aDesplegar);
                    for (res of aDesplegar) {
                        displayResult(res);
                    }
                }
            }
        });
}
function showResultados() {
    for (alcaldia in porAlcaldia) {
        aDesplegar = aDesplegar.concat(porAlcaldia[alcaldia].slice(0, 5));
    }
    for (resultado of aDesplegar) {
        getDistanceAndDisplay(resultado); //displayResult
    }
}
function getBoozeData(map, loc, callback) {
    var listaDeAlcaldias = Object.keys(alcaldias).filter((k) => !alcaldias[k]); //alcaldias sin ley seca
    ultimaAlcaldia = listaDeAlcaldias[listaDeAlcaldias.length - 1];
    console.log(listaDeAlcaldias);
    for (alcaldia of listaDeAlcaldias) {
        request = {
            query: query + alcaldia,
            type: ['liquor_store'],
            openNow: true,
            rankBy: google.maps.places.RankBy.DISTANCE,
        };
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    todos.push(results[i]);
                }
                //getAlcaldiaActual by iterating over porAlcaldia and check witch empty
                for(alc of listaDeAlcaldias){
                    if(porAlcaldia[alc]==undefined){
                        alcaldiaActual=alc;
                    }
                };
                porAlcaldia[alcaldiaActual] = results;
                if(Object.keys(porAlcaldia).length==listaDeAlcaldias.length){
                    showResultados();
                }
            }
        });

    }
}

//directions url:
/**
 * https://www.google.com/maps/dir/?api=1&destination=CDMX&destination_place_id=ChIJyxqEYnAB0oUREuiroM4kP0U&travelmode=car
 */