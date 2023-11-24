var express = require('express');
var router = express.Router();

// Rota para enviar o arquivo HTML
router.get('/', function(req, res, next) {
    res.sendFile("index.html", { root: 'views/cliente' });
});

router.get('/recarregar', function(req, res, next) {
    res.sendFile("recarga.html", { root: 'views/cliente' });
});

module.exports = router;