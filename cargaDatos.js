
//Cargamos Redes
document.getElementById("spotifyButton").href=datos['spotify-link'];
document.getElementById("appleMusicButton").href=datos['apple-link'];
document.getElementById("instagram-link").href=datos['instagram-link'];
document.getElementById("facebook-link").href=datos['facebook-link'];
document.getElementById("youtube-link").href=datos['youtube-link'];
document.getElementById("tiktok-link").href=datos['tiktok-link'];
document.getElementById("mail-link").href='mailto:'+datos['mail'];
document.getElementById("mail-link").innerHTML=datos['mail'];

//Cargamos Fechas
var fechas=datos['fechas'];
var fechasContainer=document.getElementById('fechas-container');
for(var fecha of fechas){
    var tempDiv=document.createElement('DIV');
    tempDiv.className='mb-3';
    var titulo=document.createElement('H4');
    titulo.innerHTML=fecha['titulo'];
    var detalles=document.createElement('p');
    detalles.innerHTML=fecha['detalles'];
    if('link' in fecha){
        console.log("here");
        var link=document.createElement('A');
        link.href=fecha['link'];
        link.target='_blank';
        link.innerHTML=fecha['linkTexto'];
        link.class="link-fecha";
        detalles.appendChild(link);
    }
    console.log(fecha);
    tempDiv.appendChild(titulo);
    tempDiv.appendChild(detalles);
    fechasContainer.appendChild(tempDiv);
}

//Cargamos Video
document.getElementById("video-youtube").src="https://www.youtube.com/embed/"+datos['video-embed'];

//Cargamos Merch
var merch=datos['merch'];
var tempInnerHTML='';
for(var product of merch){
    tempInnerHTML+='<div class="card text-center product-card hover-zoom"><img src="'+product["foto"]+'" class="card-img-top w-100"/><div class="card-footer"><p class="card-text">'+product['texto']+'</p></div></div>';
}
document.getElementById('merch-column').innerHTML=tempInnerHTML;




//Contador EP
// Set the date we're counting down to
var countDownDate = new Date("Jan 28, 2022 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();
  // Find the distance between now and the count down date
  var distance = countDownDate - now; 
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Output the result in an element with id="demo"
  document.getElementById("fechaEP").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s "; 
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("fechaEP").innerHTML = "¡Disponible Ahora!";
  }
}, 1000);
    
