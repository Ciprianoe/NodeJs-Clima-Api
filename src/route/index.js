const express =  require('express');
const router = express.Router();

// conexion a la api de darksky con el modulo forecastio que descargmos previo con npm 1 requerimos o instanciamos
const ForecastIo = require('forecastio');
//luego pasamos nuestro secret key para establecer la conexion 
const weather = new ForecastIo("50fa2f296029968e7127b35f219db1b5");

router.get('/', (req,res) => {
    res.render('index');
});
 
// creando la ruta   endpoint para realizar la conexion a la Api para consumir sus servicios 
// voy a obtener la data o datos solicitados y los vamos agarrar /:nombreparametro
router.get('/latitude/:latitude/longitude/:longitude',(req,res, next) => {    
console.log(req.params.latitude, req.params.longitude);
// aca vamos a tratar de enviarle datos pero primero lo vamos a validar 
    if (!req.params.latitude || !req.params.longitude){
        res.status(404).json({
            msg:'error'
        });
    }
// despues de validarlos voy almacenarlos en una constante antes de enviarlos a la api para convertirlo a entero en caso de ser string
let latitude = parseInt(req.params.latitude, 10);
let longitude = parseInt(req.params.longitude, 10);

weather.forecast(latitude,longitude, (err,data) => {
    console.log(data);
    if (err) {
        next();
        return;
    }
    // con esto funciona obtendremos un json pero su lectura para el usuario es dificil asi que crearemos una interfaz de mejor lectura lo haremos en main.js con js :D
    res.json({
        temperature: data.currently.temperature,
        timezone: data.timezone
    });
});
});
module.exports = router ;