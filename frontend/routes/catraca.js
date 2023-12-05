var express = require('express');
var router = express.Router();

// Rota para enviar o arquivo HTML
router.get('/', function(req, res, next) {
    res.sendFile("catraca.html", { root: 'views/catraca' });
});

router.get('/error', function(req, res, next) {
    res.sendFile("erroDesconhecido.html", { root: 'views/catraca' });
});

router.get('/sucesso', function(req, res, next) {
    res.sendFile("passeCatraca.html", { root: 'views/catraca' });
});

router.get('/negado', function(req, res, next) {
    res.sendFile("saldoInsuficiente.html", { root: 'views/catraca' });
});

module.exports = router;