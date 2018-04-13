// Requerir solo el router de express
const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('index.html');
})

// Vamos a exportar para usarla desde el archivo principal
module.exports = router;