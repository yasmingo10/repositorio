var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    res.sendFile("index.html", { root: 'views/admin' });
});

router.get('/motorista/cadastrar', function(req, res, next) {
    res.sendFile("cadastrar.html", { root: 'views/admin/motorista' });
});

router.get('/onibus/cadastrar', function(req, res, next) {
    res.sendFile("cadastrar.html", { root: 'views/admin/onibus' });
});

router.get('/linha/cadastrar', function(req, res, next) {
    res.sendFile("cadastrar.html", { root: 'views/admin/linha' });
});

router.get('/passageiro/cadastrar', function(req, res, next) {
    res.sendFile("cadastrar.html", { root: 'views/admin/passageiro' });
});

module.exports = router;