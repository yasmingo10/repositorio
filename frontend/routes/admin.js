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

module.exports = router;