$(function(){
//obtenemos el h1 del index.ejs que queremos manejar 
var $h1 = $('h1');
//obtenemos el input de latitude longitud y otros botons y almacenamos en variables 
var $latitude = $("input[name='latitude']");   
var $longitude = $("input[name='longitude']");
var btnLocation = $("input[name='btnLocation']");

// ahora trataremos de procesar nuestros datos para ejecutar y consumir el api 
btnLocation.on('click',obtainPosition)

function obtainPosition(){

    const geoconfig = {
        enableHighAccuracy: true,
        timeout: '10000',
        maximunAge: 60000
    }


        navigator.geolocation.getCurrentPosition(
            mostrar,error,geoconfig
        )
}
function mostrar(position){
    $latitude.val(position.coords.latitude);
    $longitude.val(position.coords.longitude);
}
function error(error){
    alert(`Error: ${error.code} ${error.message}`)
}

$('form').on('submit', function (event) {
event.preventDefault();
var latitude = $.trim($latitude.val());
var longitude = $.trim($longitude.val());

$('h1').text('Loading.....!!');

var req = $.ajax({
 url: `/latitude/${latitude}/longitude/${longitude}`,
 dataType: 'json'
});

req.done(function(data){
var temperature = data.temperature;
$h1.html(`The temperature in ${data.timezone} is ${temperature}&#176 Fahrenheit; in latitude: ${latitude} and longitude: ${longitude}`);

});
    req.fail(function(){
        $h1.text('Error!!!!');
    });
});

});