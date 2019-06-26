const express = require('express');
const app = express(); 
const path = require('path');
const morgan = require('morgan');

//setting
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set ('view engine','ejs');

//middleware
app.use(morgan('dev'));

//routes

app.use(require('./route/index.js'));




//static files
app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static(path.join(__dirname,'route/index')));



//para manejar cualquier otra ruta desconocida de mi app
app.use((req,res) => {
    res.status(404).end('404 Not Found Contact Admin');
});



app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
}); 