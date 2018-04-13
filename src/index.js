const cors = require('cors');
// Importando express
const express = require('express');
// Inicializando express
const app = express();
// Rutas
//const indexRoutes = require('./routes/index');
const tasksRoutes = require("./routes/tasks");
const path = require('path');

//configuraciones
/* Decimos que use el puerto del S.O ó el puerto 3000 */
app.set('port',process.env.PORT || 3000);
// Configurar vistas
app.set('views',path.join(__dirname,'views')); 
app.engine('html',require('ejs').renderFile);
// Configuración del motor de plantilla
app.set('view engine', 'ejs');

// middlewares
/* Son funciones que se ejecutan antes de recibir información que estan enviando el navegador o los clientes */
app.use(cors());
// para recibir datos en formato json
app.use(express.json());
//recibir datos a traves de la url
app.use(express.urlencoded({extended:false}));

// routes
//app.use(indexRoutes);
app.use('/api',tasksRoutes);

//static files
/*Le pasaremos donde estará el código de archivos estaticos */
app.use(express.static(path.join(__dirname,'dist')));

//start server
/* De esta manera tenemos un servidor y podemos decirle que escuche en un puerto */
app.listen(app.get('port'), () =>{
    console.log('server on port '+ app.get('port') );
});
